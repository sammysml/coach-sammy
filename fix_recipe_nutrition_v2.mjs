import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const ai = new Anthropic({ apiKey: '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' })
const sb = createClient(
  'https://korektlpnwuefsagfuvq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'
)

const DRY = process.argv[2] !== '--commit'
const MODE = process.argv.includes('--verify') ? 'verify' : 'compute'

const NUTRITION_REFERENCE = `
REFERENCE PER 100G RAW (unless cooked specified):

PROTEINS:
- Poulet entier (whole chicken, edible portion): 215kcal, 26p, 0c, 12f
- Poulet (poitrine/blanc, breast): 165kcal, 31p, 0c, 3.6f
- Poulet (cuisse, thigh w/skin): 209kcal, 26p, 0c, 11f
- Bœuf bourguignon/braiser: 250kcal, 26p, 0c, 16f
- Viande hachée 15%: 215kcal, 18p, 0c, 15f
- Viande hachée 5%: 137kcal, 22p, 0c, 5f
- Agneau (épaule/lamb shoulder): 282kcal, 17p, 0c, 23f
- Mouton: 294kcal, 25p, 0c, 21f
- Saumon: 208kcal, 20p, 0c, 13f
- Thon en conserve eau: 116kcal, 26p, 0c, 1f
- Poisson blanc (cabillaud/dorade): 100kcal, 22p, 0c, 1f
- Crevettes: 99kcal, 24p, 0c, 0.3f
- Œuf (1 œuf=50g): 155kcal, 13p, 1c, 11f
- Tofu ferme: 144kcal, 17p, 3c, 9f
- Merguez: 380kcal, 16p, 1c, 34f

DAIRY:
- Lait entier: 61kcal, 3.2p, 4.8c, 3.3f
- Lait demi-écrémé: 47kcal, 3.3p, 4.8c, 1.6f
- Yaourt nature: 61kcal, 3.5p, 5c, 3.3f
- Yaourt grec 0%: 59kcal, 10p, 4c, 0f
- Yaourt grec 5%: 95kcal, 9p, 4c, 5f
- Fromage frais 0%: 50kcal, 12p, 3c, 0f
- Feta: 264kcal, 14p, 4c, 21f
- Mozzarella: 280kcal, 28p, 3c, 17f
- Parmesan: 392kcal, 36p, 4c, 25f
- Beurre: 717kcal, 0.9p, 0.1c, 81f
- Crème 30%: 290kcal, 2p, 3c, 30f
- Crème 15%: 161kcal, 3p, 4c, 15f
- Ricotta: 174kcal, 11p, 3c, 13f

GRAINS/STARCH:
- Riz blanc cru: 360kcal, 7p, 80c, 0.6f (cuit: 130kcal/100g)
- Riz brun cru: 370kcal, 7.5p, 77c, 2.7f (cuit: 110kcal/100g)
- Pâtes sèches: 370kcal, 13p, 75c, 1.5f (cuites: 130kcal/100g)
- Pain blanc: 265kcal, 9p, 49c, 3.2f
- Pain complet: 247kcal, 13p, 41c, 4f
- Couscous sec: 376kcal, 13p, 77c, 0.6f (cuit: 112kcal/100g)
- Boulgour sec: 342kcal, 12p, 76c, 1.3f (cuit: 83kcal/100g)
- Quinoa sec: 368kcal, 14p, 64c, 6f (cuit: 120kcal/100g)
- Lentilles sèches: 353kcal, 25p, 60c, 1f (cuites: 116kcal/100g)
- Pois chiches secs: 364kcal, 19p, 61c, 6f (cuits: 164kcal/100g)
- Pois chiches conserve: 119kcal, 5p, 20c, 1f
- Haricots/niébé secs: 343kcal, 21p, 60c, 1f (trempés/cuits: 116kcal/100g)
- Farine de blé: 364kcal, 10p, 76c, 1f
- Semoule fine: 360kcal, 12p, 73c, 1f
- Avoine flocons: 389kcal, 17p, 66c, 7f
- Pomme de terre: 77kcal, 2p, 17c, 0.1f
- Patate douce: 86kcal, 1.6p, 20c, 0.1f
- Banane plantain mûre: 122kcal, 1.3p, 32c, 0.4f

VEGETABLES (raw):
- Oignon: 40kcal, 1.1p, 9c, 0.1f
- Tomate: 18kcal, 0.9p, 3.9c, 0.2f
- Tomate concassée conserve: 32kcal, 1.6p, 7c, 0.3f
- Carotte: 41kcal, 0.9p, 10c, 0.2f
- Épinard frais: 23kcal, 2.9p, 3.6c, 0.4f
- Courgette: 17kcal, 1.2p, 3.1c, 0.3f
- Aubergine: 25kcal, 1p, 6c, 0.2f
- Poivron: 31kcal, 1p, 6c, 0.3f
- Concombre: 16kcal, 0.7p, 4c, 0.1f
- Champignon: 22kcal, 3.1p, 3.3c, 0.3f
- Brocoli: 34kcal, 2.8p, 7c, 0.4f
- Chou-fleur: 25kcal, 1.9p, 5c, 0.3f
- Haricot vert: 31kcal, 1.8p, 7c, 0.2f
- Petits pois: 81kcal, 5.4p, 14c, 0.4f
- Maïs: 86kcal, 3.3p, 19c, 1.4f
- Ail (1 gousse=5g): 149kcal/100g
- Persil/coriandre frais: 36kcal, 3p, 6c, 0.8f
- Citron jus: 22kcal, 0.4p, 7c, 0.2f
- Olives: 145kcal, 1p, 4c, 15f

FRUITS:
- Pomme: 52kcal, 0.3p, 14c, 0.2f
- Banane: 89kcal, 1.1p, 23c, 0.3f
- Orange: 47kcal, 0.9p, 12c, 0.1f
- Fraise: 32kcal, 0.7p, 8c, 0.3f
- Avocat: 160kcal, 2p, 9c, 15f
- Datte sèche: 277kcal, 1.8p, 75c, 0.2f
- Figue fraîche: 74kcal, 0.8p, 19c, 0.3f
- Raisin: 69kcal, 0.7p, 18c, 0.2f
- Mangue: 60kcal, 0.8p, 15c, 0.4f
- Ananas: 50kcal, 0.5p, 13c, 0.1f
- Pastèque: 30kcal, 0.6p, 8c, 0.2f
- Melon: 34kcal, 0.8p, 8c, 0.2f

OILS/FATS:
- Huile olive/végétale: 884kcal, 0p, 0c, 100f
- Beurre (see dairy above)

NUTS/SEEDS:
- Amandes: 579kcal, 21p, 22c, 50f
- Cacahuètes: 567kcal, 26p, 16c, 49f
- Noix: 654kcal, 15p, 14c, 65f
- Sésame: 573kcal, 18p, 23c, 50f
- Pignons: 673kcal, 14p, 13c, 68f
- Chia: 486kcal, 17p, 42c, 31f
- Lin moulu: 534kcal, 18p, 29c, 42f

SWEETENERS:
- Sucre blanc: 387kcal, 0p, 100c, 0f
- Miel: 304kcal, 0.3p, 82c, 0f
- Sirop d'érable: 260kcal, 0p, 67c, 0f
- Chocolat noir 70%: 546kcal, 8p, 46c, 31f
- Cacao en poudre: 228kcal, 20p, 58c, 14f

STANDARD WEIGHTS (vague quantities):
- 1 oignon moyen: 150g
- 1 oignon gros: 200g
- 1 tomate moyenne: 120g
- 1 carotte: 60g
- 1 pomme de terre moyenne: 150g
- 1 pomme/banane: 120g
- 1 gousse ail: 5g
- 1 citron (jus): 30ml
- 1 œuf: 50g
- 1 poivron moyen: 150g
- 1 courgette: 200g
- 1 c.à.s liquide: 15g (huile, sirop)
- 1 c.à.s sec: 12g (sucre, farine)
- 1 c.à.c liquide: 5g
- 1 c.à.c sec: 4g
- 1 tasse liquide: 240ml
- 1 tasse riz/pâtes sec: 200g
- 1 tasse farine: 120g
- 1 bouquet herbes: 10g
- 1 piment vert: 10g
- 1 poulet entier: 1500g (1000g édible après désossage)
- 1 blanc de poulet: 200g
- 1 banane plantain: 200g
- 1 morceau pain: 30-40g

COOKING ADJUSTMENTS (CRITICAL):
- Friture profonde (deep frying): aliments absorbent ~10% du poids de l'huile utilisée
  Example: 200g bananes plantain frites dans 400ml huile → +40g huile absorbée → +354 kcal du fat
- Poêlée légère (pan-frying): aliments absorbent l'huile utilisée (généralement 5-15g)
- Cuisson vapeur/bouillie: 0 fat ajouté
- Rôtissage avec beurre: viande absorbe ~70% du beurre étalé
- Mijoté/braisé: jus consommés en grande partie

EDIBLE WEIGHT YIELD (eaten portion vs raw):
- Poulet entier: ~65% édible (os+peau retirés en partie)
- Poisson entier: ~60% édible
- Crevettes avec carapaces: ~50% édible
- Viande désossée: 100% édible

PORTION SIZE GUIDANCE:
- Salade entrée: 100-150g
- Soupe: 250ml
- Plat principal viande+féculents: 400-500g total
- Dessert: 100-150g
- Petit-déjeuner: 250-400g
- Snack: 100-200g
- Smoothie/boisson: 250-350ml

SERVINGS DETERMINATION:
- Quick mono-portion (smoothies, snacks, single sandwiches): 1
- Salades familiales, plats type 4-personnes traditionnels: 4
- Grandes recettes (tagines, paellas, rôtis entiers): 6-8
- Pâtisseries (tartes, gâteaux): 6-8
- Cakes/pains: 8-10
- Boissons individuelles: 1
- Apero/finger food (beignets, samosas par recette): 4-6
`

const SYSTEM_PROMPT = `You are a clinical nutritionist with USDA-level precision. Calculate nutrition for recipes using the reference data below. Be a calculator, not an estimator — work step by step.

${NUTRITION_REFERENCE}

WORKFLOW for each recipe:
1. Parse each ingredient: extract weight in grams (use reference weights for vague quantities)
2. Multiply (weight ÷ 100) × per-100g values from reference to get ingredient's contribution
3. Sum all ingredients
4. Apply cooking adjustment if needed (frying oil absorption is the big one)
5. Adjust for edible yield if relevant (whole chicken, etc.)
6. Determine appropriate servings count based on recipe type
7. Divide totals by servings

Round to integers. Be rigorous.`

const {data:recipes} = await sb
  .from('cookbook_recipes')
  .select('id, title, ingredients, total_calories, total_protein, total_carbs, total_fat, servings')
  .order('title')

const toProcess = DRY ? recipes.slice(0, 5) : recipes
console.log(DRY ? `🔍 DRY RUN (5 recipes)` : `⚡ COMMITTING ALL ${recipes.length}`)
console.log(`Using Claude Opus 4.7\n`)

let updated = 0, failed = 0

for (const r of toProcess) {
  const ingredientText = Array.isArray(r.ingredients)
    ? r.ingredients.map(i => {
        if (typeof i === 'string') return i
        const qty = i.quantity || i.amount || i.qty || ''
        const unit = i.unit || ''
        const name = i.name || i.ingredient || i.item || JSON.stringify(i)
        return `${qty}${unit} ${name}`.trim()
      }).join(' | ')
    : JSON.stringify(r.ingredients)

  console.log(`\n📋 ${r.title}`)

  try {
    const msg = await ai.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `Recipe: "${r.title}"
Ingredients: ${ingredientText}

Calculate the nutrition. Show brief reasoning then reply with ONLY this JSON at the end (no markdown fences):
{
  "reasoning": "1-2 sentences explaining calculation",
  "servings": <integer>,
  "calories_per_serving": <integer>,
  "protein_per_serving": <integer>,
  "carbs_per_serving": <integer>,
  "fat_per_serving": <integer>
}`
      }]
    })

    const raw = msg.content[0].text.trim()
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')
    const json = JSON.parse(jsonMatch[0])

    console.log(`   💭 ${json.reasoning}`)
    console.log(`   → ${json.servings}p · ${json.calories_per_serving}kcal · ${json.protein_per_serving}g prot · ${json.carbs_per_serving}g carb · ${json.fat_per_serving}g fat`)
    console.log(`   ⏪ Was: ${r.total_calories}kcal · ${r.total_protein}p · ${r.total_carbs}c · ${r.total_fat}f · ${r.servings || '?'}p`)

    if (!DRY) {
      const {error} = await sb.from('cookbook_recipes').update({
        total_calories: json.calories_per_serving,
        total_protein: json.protein_per_serving,
        total_carbs: json.carbs_per_serving,
        total_fat: json.fat_per_serving,
        servings: json.servings
      }).eq('id', r.id)

      if (error) { console.error(`   ❌ ${error.message}`); failed++ }
      else { updated++; console.log(`   ✓ Saved`) }
    }

    await new Promise(r => setTimeout(r, 1200))

  } catch(e) {
    console.error(`   ❌ ${e.message}`)
    failed++
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(DRY
  ? `Dry run done. If numbers look right: node fix_recipe_nutrition_v2.mjs --commit`
  : `✨ ${updated} updated, ${failed} failed.`)
