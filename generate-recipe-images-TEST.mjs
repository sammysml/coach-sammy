// generate-recipe-images-TEST.mjs
// Generates AI food photos for 10 test recipes, uploads to Supabase Storage,
// and updates photo_url for ONLY those 10. The other recipes are untouched.
//
// SETUP (run from /Users/mac/Downloads/coach-sammy/):
//   1. Create a PUBLIC Supabase Storage bucket named:  recipe-images
//   2. export OPENAI_API_KEY="sk-..."          (your OpenAI key)
//   3. export SUPABASE_URL="https://korektlpnwuefsagfuvq.supabase.co"
//   4. export SUPABASE_SERVICE_KEY="..."       (service_role key, same one your seed scripts use)
//   5. npm i @supabase/supabase-js            (if not already installed)
//   6. node generate-recipe-images-TEST.mjs
//
// Cost: 10 images on gpt-image-1-mini ≈ $0.05 total.

import { createClient } from '@supabase/supabase-js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://korektlpnwuefsagfuvq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = 'recipe-images';
const MODEL = 'gpt-image-1-mini';   // cheap; swap to 'gpt-image-1' for higher quality
const SIZE = '1024x1024';

if (!OPENAI_API_KEY || !SUPABASE_SERVICE_KEY) {
  console.error('Missing env vars. Need OPENAI_API_KEY and SUPABASE_SERVICE_KEY.');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// The 10 test recipes (by id, copied from your DB export)
const TEST = [
  { id: '0748dfd0-cb7c-4e98-a3a5-fb894b6d1c32', title: 'Berkoukes Légumes Poulet', cuisine: 'algerian' },
  { id: '910b3a54-1a5d-4b3b-9668-2dd3ebbb701a', title: 'Baghrir Protéiné Miel Yaourt', cuisine: 'algerian' },
  { id: '29caa08f-b1df-4f7d-90db-51a580a8665a', title: 'Bourek Four Poulet Fromage', cuisine: 'algerian' },
  { id: '956679c9-47d5-459a-bcb2-47273de48a9f', title: 'Bowl Thon Méditerranéen', cuisine: 'mediterranean' },
  { id: 'e5361277-c2eb-4915-b035-b3df4287e410', title: 'Bowl Poulet Teriyaki', cuisine: 'asian' },
  { id: '85b60511-28ec-4969-915d-9b0b09598fa3', title: 'Biryani au Poulet', cuisine: 'indian' },
  { id: 'c676159d-84e4-427e-a58e-2332dfb3509e', title: 'Bœuf Bourguignon (Sans Alcool)', cuisine: 'french' },
  { id: 'da51ebb6-2313-458d-a797-c620c8df4681', title: 'Buffalo Wings Maison', cuisine: 'american' },
  { id: '3dc9d6e4-5cb5-431a-8045-4f8eff3cbc58', title: 'Aubergines Parmigiana', cuisine: 'italian' },
  { id: '7ac7710a-c9e8-4da5-bda8-e49793644ff8', title: 'Aloko (Bananes Plantains Frites)', cuisine: 'african' },
];

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
  diet: 'clean healthy-eating styling, bright fresh look',
};

function buildPrompt(r) {
  const clean = r.title.replace(/\([^)]*\)/g, '').replace(/Protéiné|Light|Fit|Maison|Sans Alcool/gi, '').trim();
  const style = CUISINE_STYLE[r.cuisine] || CUISINE_STYLE.diet;
  return `Professional overhead food photography of "${clean}", a real ${r.cuisine} dish. ${style}. `
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
    throw new Error(`OpenAI ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image returned: ' + JSON.stringify(data).slice(0, 200));
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
  console.log(`Generating ${TEST.length} test images with ${MODEL}...\n`);
  let ok = 0, fail = 0;
  for (const r of TEST) {
    try {
      process.stdout.write(`• ${r.title} ... `);
      const prompt = buildPrompt(r);
      const buf = await genImage(prompt);
      const url = await uploadAndGetUrl(r.id, buf);
      const { error: updErr } = await sb.from('cookbook_recipes')
        .update({ photo_url: url }).eq('id', r.id);
      if (updErr) throw new Error('DB update failed: ' + updErr.message);
      console.log('done');
      ok++;
    } catch (e) {
      console.log('FAILED — ' + e.message);
      fail++;
    }
    await new Promise(res => setTimeout(res, 1500)); // gentle rate-limit
  }
  console.log(`\nDone. ${ok} succeeded, ${fail} failed.`);
  console.log('Open the cookbook (fresh incognito) and check these 10 recipes.');
})();
