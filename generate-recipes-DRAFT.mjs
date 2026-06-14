// generate-recipes-DRAFT.mjs
// AI-drafts Doucette-style anabolic recipes into cookbook_recipes as DRAFTS.
// Drafts are tagged: coach_note starts with "[DRAFT]" and trial_visible=false,
// so you can review, bulk-delete junk, then flip the keepers live.
//
// SETUP (run from /Users/mac/Downloads/coach-sammy/):
//   export OPENAI_API_KEY=sk-proj-...
//   export SUPABASE_URL=https://korektlpnwuefsagfuvq.supabase.co
//   export SUPABASE_SERVICE_KEY=eyJ...
//   node generate-recipes-DRAFT.mjs
//
// Re-run safely: it skips titles that already exist (live OR draft).
// Cost: text generation is cheap (~$0.01-0.03 per recipe on gpt-5.4-mini).

import { createClient } from '@supabase/supabase-js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://korektlpnwuefsagfuvq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const MODEL = 'gpt-4o-mini';   // cheap, good at structured JSON. Swap if you prefer.
if (!OPENAI_API_KEY || !SUPABASE_SERVICE_KEY) { console.error('Missing env vars.'); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ===== HOW MANY + SPREAD (this batch = 50) =====
const PLAN = [
  { category: 'main_meals', meal_type: 'lunch',     count: 18, kind: 'high-protein savory main meal or bowl' },
  { category: 'Breakfasts', meal_type: 'breakfast', count: 8,  kind: 'high-protein anabolic breakfast' },
  { category: 'Desserts',   meal_type: 'dessert',   count: 8,  kind: 'high-protein anabolic dessert or protein treat' },
  { category: 'snacks',     meal_type: 'snack',     count: 8,  kind: 'high-protein anabolic snack' },
  { category: 'Fast Food Remakes', meal_type: 'lunch', count: 8, kind: 'anabolic fast-food remake (burger, pizza, fried chicken, wrap, etc.) made lean and high-protein' },
];

const SYSTEM = `You are a fitness nutrition chef creating recipes in the style of Greg Doucette's anabolic cookbook.
RULES (strict):
- High protein, low-to-moderate calories, high volume/satiety. Protein density should be high relative to calories.
- Use Doucette-style ingredients freely: whey/protein powder, egg whites, fat-free Greek yogurt (yaourt grec 0%), fromage blanc 0%, oats, PB2/light peanut butter, lean meats, lots of vegetables, zero-calorie sweetener.
- Halal only (no pork, no alcohol).
- All text in FRENCH. Add a short Arabic transliteration/note at the end of coach_note.
- Macros must be realistic and ADD UP: the sum of ingredient calories ≈ total_calories (±5%). Protein/carbs/fat similarly consistent.
- Per single serving.
Return ONLY valid JSON (no markdown, no commentary) with this exact shape:
{
  "title": "string (French, descriptive, appetizing)",
  "coach_note": "string (1 sentence French why-it-works + space + Arabic note)",
  "total_calories": int, "total_protein": int, "total_carbs": int, "total_fat": int,
  "prep_time": int (minutes), "difficulty": 1|2|3,
  "goal_tag": "anabolic"|"high_protein"|"low_cal",
  "craving_tag": "sweet"|"savory"|"chocolate"|"fruity"|"salty",
  "ingredients": [ {"name":"string (French)","qty":"string e.g. 30g / 1 scoop","calories":int,"protein":int,"carbs":int,"fat":int} ],
  "steps": ["string (French step)", ...]
}`;

async function genOne(kind, existingTitles) {
  const avoid = existingTitles.slice(-60).join('; ');
  const user = `Create ONE ${kind}. Make it distinct from these existing recipes: ${avoid}. Return only the JSON object.`;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
      response_format: { type: 'json_object' },
      temperature: 0.9,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0,150)}`);
  const data = await res.json();
  const txt = data?.choices?.[0]?.message?.content;
  if (!txt) throw new Error('No content');
  return JSON.parse(txt);
}

function validate(r) {
  if (!r.title || !Array.isArray(r.ingredients) || !Array.isArray(r.steps)) return 'missing fields';
  if (!r.total_calories || !r.total_protein) return 'missing macros';
  // macro sum sanity: ingredient cal sum within 20% of stated total
  const sum = r.ingredients.reduce((a,i)=>a+(i.calories||0),0);
  if (sum > 0 && Math.abs(sum - r.total_calories) / r.total_calories > 0.25) return `macro mismatch (ing ${sum} vs total ${r.total_calories})`;
  // anabolic gate: at least 6g protein per 100 cal (drop obvious junk)
  if (r.total_protein / r.total_calories * 100 < 6) return 'protein density too low';
  return null;
}

(async () => {
  // Load all existing titles (live + draft) to avoid duplicates
  const { data: existing } = await sb.from('cookbook_recipes').select('title');
  const existingTitles = (existing || []).map(r => r.title);
  const seen = new Set(existingTitles.map(t => t.toLowerCase().trim()));

  let ok = 0, fail = 0, skip = 0;
  const total = PLAN.reduce((a,p)=>a+p.count,0);
  let n = 0;
  console.log(`Drafting ${total} recipes with ${MODEL}...\n`);

  for (const block of PLAN) {
    for (let i = 0; i < block.count; i++) {
      n++;
      const pos = `[${n}/${total}]`;
      try {
        let r, attempts = 0, vErr;
        do {
          r = await genOne(block.kind, existingTitles);
          vErr = validate(r);
          attempts++;
        } while (vErr && attempts < 3);
        if (vErr) { console.log(`${pos} ${block.kind} — SKIP (${vErr})`); skip++; continue; }
        if (seen.has(r.title.toLowerCase().trim())) { console.log(`${pos} ${r.title} — SKIP (duplicate)`); skip++; continue; }

        const row = {
          title: r.title,
          coach_note: '[DRAFT] ' + (r.coach_note || ''),
          cuisine: 'algerian',
          category: block.category,
          meal_type: block.meal_type,
          goal_tag: r.goal_tag || 'high_protein',
          craving_tag: r.craving_tag || 'savory',
          total_calories: Math.round(r.total_calories),
          total_protein: Math.round(r.total_protein),
          total_carbs: Math.round(r.total_carbs || 0),
          total_fat: Math.round(r.total_fat || 0),
          servings: 1,
          prep_time: r.prep_time || 10,
          difficulty: [1,2,3].includes(r.difficulty) ? r.difficulty : 1,
          ingredients: r.ingredients,
          steps: r.steps,
          featured: false,
          trial_visible: false,   // draft = hidden
          photo_url: null,
        };
        const { error } = await sb.from('cookbook_recipes').insert(row);
        if (error) throw new Error(error.message);
        seen.add(r.title.toLowerCase().trim());
        existingTitles.push(r.title);
        console.log(`${pos} ${r.title} — ${row.total_calories}cal/${row.total_protein}p ✓`);
        ok++;
      } catch (e) {
        console.log(`${pos} ${block.kind} — FAILED: ${e.message}`);
        fail++;
        if (String(e.message).includes('429')) await new Promise(r=>setTimeout(r,8000));
      }
      await new Promise(r => setTimeout(r, 800));
    }
  }

  console.log(`\n=== Done. ${ok} drafted, ${skip} skipped, ${fail} failed. ===`);
  console.log('\nReview drafts with this SQL:');
  console.log(`  select title, total_calories, total_protein, category from cookbook_recipes where coach_note like '[DRAFT]%' order by category, title;`);
  console.log('\nDelete a bad one:  delete from cookbook_recipes where title = \'...\';');
  console.log('Approve ALL drafts (make live): update cookbook_recipes set trial_visible=true, coach_note=replace(coach_note,\'[DRAFT] \',\'\') where coach_note like \'[DRAFT]%\';');
})();
