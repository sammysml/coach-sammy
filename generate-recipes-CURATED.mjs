// generate-recipes-CURATED.mjs
// De-rutted recipe generator. The anti-rut trick: we pass the AI an EXPLICIT
// named dish for each recipe (curated below), so it fills in macros/steps for
// THAT dish instead of freely inventing — which is what caused 38 identical bowls.
//
// TARGET (per your pick): sides & snacks · anabolic + cut/fat-loss ·
// international variety + quick/cheap everyday. Halal, Algeria-available ingredients.
//
// SETUP (run from /Users/mac/Downloads/coach-sammy/):
//   export OPENAI_API_KEY=sk-proj-...
//   export SUPABASE_URL=https://korektlpnwuefsagfuvq.supabase.co
//   export SUPABASE_SERVICE_KEY=eyJ...
//   node generate-recipes-CURATED.mjs
//
// Safe to re-run: skips any title that already exists (live OR draft).
// Drafts: coach_note starts "[DRAFT]" + trial_visible=false. Review, then flip live.

import { createClient } from '@supabase/supabase-js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://korektlpnwuefsagfuvq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const MODEL = 'gpt-4o-mini';
if (!OPENAI_API_KEY || !SUPABASE_SERVICE_KEY) { console.error('Missing env vars.'); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ============================================================
// THE CURATED DISH LIST — each is a specific, distinct dish.
// This is what prevents ruts: named dishes, spread across cuisines.
// Format: [title_FR, meal_type, category, goal_tag, craving_tag, hint]
// ============================================================
const DISHES = [
  // ---------- SIDES (you had only 4 — big gap) ----------
  ['Salade de pois chiches à la marocaine','side','Sides','high_protein','savory','chickpea salad, cumin, lemon, herbs, quick'],
  ['Edamame au sel de mer','side','Sides','high_protein','salty','steamed edamame, sea salt, 3-min snack-side'],
  ['Haricots verts sautés à l\'ail','side','Sides','cut','savory','green beans, garlic, olive oil, light'],
  ['Chou-fleur rôti épicé','side','Sides','cut','savory','roasted spiced cauliflower, paprika, cheap'],
  ['Lentilles vertes citronnées','side','Sides','high_protein','savory','green lentils, lemon, parsley, cheap protein'],
  ['Concombre yaourt à la grecque (Tzatziki léger)','side','Sides','cut','savory','light tzatziki, greek yogurt 0%, cucumber'],
  ['Carottes rôties au cumin','side','Sides','cut','savory','cumin roasted carrots, cheap, quick'],
  ['Riz de chou-fleur sauté','side','Sides','cut','savory','cauliflower rice stir-fry, low cal volume'],
  ['Betteraves rôties et feta light','side','Sides','maintain','savory','roasted beets, light feta'],
  ['Épinards à la crème de yaourt','side','Sides','high_protein','savory','creamed spinach with greek yogurt, quick'],
  ['Taboulé de quinoa','side','Sides','high_protein','fruity','quinoa tabbouleh, herbs, lemon, meal-prep'],
  ['Purée de patate douce épicée','side','Sides','maintain','savory','spiced sweet potato mash, cheap'],
  ['Aubergines grillées au yaourt','side','Sides','cut','savory','grilled eggplant, yogurt drizzle'],
  ['Maïs grillé épicé façon mexicaine (Elote léger)','side','Sides','maintain','savory','light elote, lime chili, quick'],
  ['Salade de betterave et pois chiches','side','Sides','high_protein','savory','beet chickpea salad, cheap protein'],
  ['Brocoli vapeur à l\'huile de sésame','side','Sides','cut','savory','steamed broccoli sesame, 5-min'],

  // ---------- SNACKS — international + quick/cheap ----------
  ['Roulés de dinde et fromage frais','snack','snacks','high_protein','savory','turkey cheese roll-ups, no-cook, 2-min'],
  ['Pudding de chia protéiné','snack','snacks','high_protein','sweet','protein chia pudding, overnight, cheap'],
  ['Boules d\'énergie dattes-cacahuète','snack','snacks','bulk','sweet','date peanut energy balls, no-bake'],
  ['Toast de patate douce au fromage blanc','snack','snacks','high_protein','savory','sweet potato toast, fromage blanc'],
  ['Œufs durs épicés (style harissa)','snack','snacks','high_protein','savory','harissa deviled-style eggs, cheap'],
  ['Mug cake protéiné au chocolat','snack','snacks','high_protein','chocolate','90-sec protein mug cake'],
  ['Yaourt grec, miel et noix','snack','snacks','high_protein','sweet','greek yogurt honey walnuts, 1-min'],
  ['Houmous express et bâtonnets de légumes','snack','snacks','cut','savory','quick hummus veg sticks, cheap'],
  ['Galettes de thon express','snack','snacks','high_protein','savory','quick tuna patties, canned, cheap'],
  ['Smoothie banane-épinards protéiné','snack','snacks','high_protein','fruity','green protein smoothie, 2-min'],
  ['Pop-corn maison épicé','snack','snacks','cut','salty','air-popped spiced popcorn, very cheap'],
  ['Barre granola maison aux flocons d\'avoine','snack','snacks','bulk','sweet','homemade oat granola bar, meal-prep'],
  ['Fromage blanc, fruits rouges et graines','snack','snacks','high_protein','fruity','fromage blanc berries seeds, quick'],
  ['Wrap léger dinde-crudités','snack','snacks','cut','savory','light turkey veg wrap, quick'],
  ['Chips de pois chiches rôtis','snack','snacks','high_protein','salty','roasted chickpea crisps, cheap'],
  ['Glace protéinée minute (banane congelée)','snack','snacks','cut','sweet','1-ingredient banana protein nicecream'],
  ['Toast complet à l\'avocat et œuf','snack','snacks','maintain','savory','avocado egg toast, 5-min'],
  ['Dattes fourrées au beurre de cacahuète','snack','snacks','bulk','sweet','PB-stuffed dates, no-cook'],
  ['Cottage cheese et ananas','snack','snacks','high_protein','fruity','cottage cheese pineapple, 1-min'],
  ['Mini-pizzas sur pain pita complet','snack','snacks','high_protein','savory','whole-wheat pita mini pizzas, quick'],
  ['Smoothie bowl protéiné à la mangue','snack','snacks','high_protein','fruity','mango protein smoothie bowl'],
  ['Crackers complets et thon','snack','snacks','high_protein','savory','whole-grain crackers tuna, no-cook'],
  ['Compote pomme-cannelle et whey','snack','snacks','cut','fruity','apple cinnamon compote w/ whey, cheap'],
  ['Edamame épicé au piment','snack','snacks','high_protein','salty','chili edamame, quick'],
];

const SYSTEM = `You are a fitness nutrition chef. You are given a SPECIFIC named dish.
Your job is to write the realistic recipe for THAT exact dish — do not substitute a different dish.
RULES (strict):
- Halal only (no pork, no alcohol). Ingredients must be buyable in an Algerian supermarket.
- All text in FRENCH. End coach_note with a short Arabic (Darija) note.
- Macros MUST add up: sum of ingredient calories ≈ total_calories (±5%); same for protein/carbs/fat. Per single serving.
- Respect the goal: 'cut'/'fat_loss' = lower calorie, high volume; 'high_protein'/'anabolic' = high protein density; 'bulk' = higher calorie energy-dense.
- Keep it true to the dish's cuisine and the hint. Prefer quick & cheap where the hint says so.
Return ONLY valid JSON (no markdown) with this exact shape:
{
  "coach_note": "1 sentence FR why-it-works + space + Arabic Darija note",
  "total_calories": int, "total_protein": int, "total_carbs": int, "total_fat": int,
  "prep_time": int, "difficulty": 1|2|3,
  "ingredients": [ {"name":"FR","qty":"e.g. 100g / 1 c. à soupe","calories":int,"protein":int,"carbs":int,"fat":int} ],
  "steps": ["FR step", ...]
}`;

async function genOne(dish) {
  const [title, meal_type, category, goal_tag, craving_tag, hint] = dish;
  const user = `Dish: "${title}". Cuisine/hint: ${hint}. Meal type: ${meal_type}. Goal: ${goal_tag}. Craving: ${craving_tag}. Write the recipe for THIS dish. Return only the JSON object.`;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const obj = JSON.parse(data.choices[0].message.content);

  // Validate macros add up (±25% tolerance on the sum)
  const sumCal = (obj.ingredients||[]).reduce((s,i)=>s+(+i.calories||0),0);
  if (obj.total_calories && sumCal && Math.abs(sumCal-obj.total_calories)/obj.total_calories > 0.25) {
    obj.total_calories = Math.round(sumCal); // trust the ingredient sum
  }
  return {
    title, meal_type, category, goal_tag, craving_tag,
    coach_note: '[DRAFT] ' + (obj.coach_note||''),
    total_calories: obj.total_calories||sumCal||0,
    total_protein: obj.total_protein||0,
    total_carbs: obj.total_carbs||0,
    total_fat: obj.total_fat||0,
    prep_time: obj.prep_time||10,
    difficulty: [1,2,3].includes(obj.difficulty)?obj.difficulty:1,
    ingredients: obj.ingredients||[],
    steps: obj.steps||[],
    trial_visible: false,
    photo_url: null,
  };
}

(async () => {
  // Skip titles already in DB (live or draft)
  const { data: existing } = await sb.from('cookbook_recipes').select('title');
  const have = new Set((existing||[]).map(r=>r.title.toLowerCase().trim()));
  const todo = DISHES.filter(d => !have.has(d[0].toLowerCase().trim()));
  console.log(`${DISHES.length} curated dishes, ${todo.length} new to generate (${DISHES.length-todo.length} already exist).`);

  let ok=0, fail=0;
  for (const dish of todo) {
    try {
      const recipe = await genOne(dish);
      const { error } = await sb.from('cookbook_recipes').insert(recipe);
      if (error) throw error;
      ok++; console.log(`✓ ${recipe.title}  (${recipe.total_calories}kcal P${recipe.total_protein})`);
    } catch (e) {
      fail++; console.error(`✗ ${dish[0]}: ${e.message}`);
    }
    await new Promise(r=>setTimeout(r, 400)); // gentle rate limit
  }
  console.log(`\nDone. ${ok} inserted as DRAFTS, ${fail} failed.`);
  console.log(`Review them (coach_note starts [DRAFT]), then flip keepers:`);
  console.log(`  update cookbook_recipes set coach_note=replace(coach_note,'[DRAFT] ',''), trial_visible=true where coach_note like '[DRAFT]%';`);
  console.log(`Then run generate-recipe-images-FULL.mjs to image the new ones.`);
})();
