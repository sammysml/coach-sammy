// generate-recipe-images-FULL.mjs
// Generates AI food photos for ALL cookbook recipes, uploads to Supabase Storage,
// updates photo_url. Safe to re-run — skips recipes whose photo_url already points
// at the Supabase bucket (so your 10 test images and any prior progress are skipped).
//
// SETUP (run from /Users/mac/Downloads/coach-sammy/):
//   export OPENAI_API_KEY=sk-proj-...          (no quotes needed)
//   export SUPABASE_URL=https://korektlpnwuefsagfuvq.supabase.co
//   export SUPABASE_SERVICE_KEY=eyJ...
//   node generate-recipe-images-FULL.mjs
//
// Cost: ~414 images on gpt-image-1-mini ≈ $2 total.
// If it stops for any reason, just run it again — it resumes.

import { createClient } from '@supabase/supabase-js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://korektlpnwuefsagfuvq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = 'recipe-images';
const MODEL = 'gpt-image-1-mini';
const SIZE = '1024x1024';

if (!OPENAI_API_KEY || !SUPABASE_SERVICE_KEY) {
  console.error('Missing env vars. Need OPENAI_API_KEY and SUPABASE_SERVICE_KEY.');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Cuisine-aware styling so dishes feel authentic to an Algerian client base
const CUISINE_STYLE = {
  algerian: 'traditional Algerian/Maghrebi home presentation, served in authentic North African tableware, warm natural light',
  mediterranean: 'fresh Mediterranean styling, bright daylight, rustic ceramic plate',
  asian: 'East-Asian styling, served in a bowl with chopsticks nearby, clean minimal background',
  indian: 'authentic Indian presentation, served on a metal thali or bowl, warm spices visible',
  french: 'classic French bistro plating, elegant white plate, soft restaurant light',
  american: 'American casual-dining styling, on a wooden board or diner plate',
  italian: 'rustic Italian trattoria styling, on a ceramic plate with fresh herbs',
  african: 'authentic West-African presentation, vibrant colours, served simply',
  texmex: 'Tex-Mex styling, colourful, served casually',
  diet: 'clean healthy-eating styling, bright fresh look',
};

function buildPrompt(r) {
  const clean = (r.title || '').replace(/\([^)]*\)/g, '').replace(/Protéiné|Light|Fit|Maison|Sans Alcool/gi, '').trim();
  const style = CUISINE_STYLE[r.cuisine] || CUISINE_STYLE.diet;
  return `Professional overhead food photography of "${clean}", a real ${r.cuisine || ''} dish. ${style}. `
       + `Appetizing, realistic, high detail, shallow depth of field, soft natural lighting, `
       + `no text, no people, no hands, single plated portion centered. Cookbook-quality.`;
}

async function genImage(prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, size: SIZE, n: 1 }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image returned');
  return Buffer.from(b64, 'base64');
}

async function uploadAndGetUrl(id, buf) {
  const path = `recipes/${id}.png`;
  const { error: upErr } = await sb.storage.from(BUCKET)
    .upload(path, buf, { contentType: 'image/png', upsert: true });
  if (upErr) throw new Error('Upload failed: ' + upErr.message);
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

(async () => {
  // Pull every recipe
  const { data: recipes, error } = await sb.from('cookbook_recipes')
    .select('id, title, cuisine').order('title');
  if (error) { console.error('Failed to load recipes:', error.message); process.exit(1); }

  // Resume: skip recipes whose photo_url already points at our bucket
  const { data: done } = await sb.from('cookbook_recipes')
    .select('id, photo_url');
  const doneSet = new Set(
    (done || [])
      .filter(r => (r.photo_url || '').includes('/storage/v1/object/public/' + BUCKET))
      .map(r => r.id)
  );

  const todo = recipes.filter(r => !doneSet.has(r.id));
  console.log(`Total: ${recipes.length} | Already done: ${doneSet.size} | To generate: ${todo.length}`);
  console.log(`Model: ${MODEL} · est. cost: $${(todo.length * 0.005).toFixed(2)}\n`);

  let ok = 0, fail = 0;
  const failed = [];
  for (let i = 0; i < todo.length; i++) {
    const r = todo[i];
    const pos = `[${i + 1}/${todo.length}]`;
    try {
      process.stdout.write(`${pos} ${r.title} ... `);
      const buf = await genImage(buildPrompt(r));
      const url = await uploadAndGetUrl(r.id, buf);
      const { error: updErr } = await sb.from('cookbook_recipes')
        .update({ photo_url: url }).eq('id', r.id);
      if (updErr) throw new Error('DB update failed: ' + updErr.message);
      console.log('done');
      ok++;
    } catch (e) {
      console.log('FAILED — ' + e.message);
      failed.push(r.title);
      fail++;
      // If we hit rate limits, back off a bit longer
      if (String(e.message).includes('429')) await new Promise(res => setTimeout(res, 8000));
    }
    await new Promise(res => setTimeout(res, 1200)); // gentle pacing
  }

  console.log(`\n=== Done. ${ok} succeeded, ${fail} failed. ===`);
  if (failed.length) {
    console.log('Failed recipes (re-run the script to retry just these):');
    failed.forEach(t => console.log('  - ' + t));
  } else {
    console.log('All recipes now have AI images. Open the cookbook in a fresh incognito window.');
  }
})();
