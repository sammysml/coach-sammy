
import Anthropic from '@anthropic-ai/sdk'

import { createClient } from '@supabase/supabase-js'

const ai = new Anthropic({ apiKey: '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' })

const sb = createClient(

  'https://korektlpnwuefsagfuvq.supabase.co',

  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'

)

const DRY = process.argv[2] !== '--commit'

console.log(DRY ? '🔍 DRY RUN (first 3 recipes only)' : '⚡ COMMITTING ALL')

const {data:recipes} = await sb

  .from('cookbook_recipes')

  .select('id, title, ingredients, total_calories, total_protein, total_carbs, total_fat')

  .order('title')

const toProcess = DRY ? recipes.slice(0, 3) : recipes

console.log(`Processing ${toProcess.length}/${recipes.length} recipes\n`)

let updated = 0, failed = 0

for (const r of toProcess) {

  const ingredientText = Array.isArray(r.ingredients)

    ? r.ingredients.map(i => {

        if (typeof i === 'string') return i

        const qty = i.quantity || i.amount || i.qty || ''

        const unit = i.unit || ''

        const name = i.name || i.ingredient || i.item || JSON.stringify(i)

        return `${qty}${unit} ${name}`.trim()

      }).join(', ')

    : JSON.stringify(r.ingredients)

  console.log(`\n📋 ${r.title}`)

  console.log(`   Ingredients: ${ingredientText.slice(0, 120)}…`)

  try {

    const msg = await ai.messages.create({

      model: 'claude-sonnet-4-20250514',

      max_tokens: 300,

      messages: [{

        role: 'user',

        content: `Recipe: "${r.title}"

Ingredients: ${ingredientText}

Calculate accurate nutrition for this recipe. Consider standard French/North African cooking portions.

Reply with ONLY valid JSON, no explanation:

{

  "servings": <integer, how many people this serves>,

  "calories_per_serving": <integer kcal>,

  "protein_per_serving": <integer grams>,

  "carbs_per_serving": <integer grams>,

  "fat_per_serving": <integer grams>

}`

      }]

    })

    const raw = msg.content[0].text.trim()

    const json = JSON.parse(raw.replace(/```json?|```/g, '').trim())

    console.log(`   → ${json.servings} portions · ${json.calories_per_serving}kcal · ${json.protein_per_serving}p ${json.carbs_per_serving}c ${json.fat_per_serving}f`)

    console.log(`   Was: ${r.total_calories}kcal · ${r.total_protein}p ${r.total_carbs}c ${r.total_fat}f`)

    if (!DRY) {

      const {error} = await sb.from('cookbook_recipes').update({

        total_calories: json.calories_per_serving,

        total_protein: json.protein_per_serving,

        total_carbs: json.carbs_per_serving,

        total_fat: json.fat_per_serving,

        servings: json.servings

      }).eq('id', r.id)

      if (error) { console.error(`   ❌ ${error.message}`); failed++ }

      else { updated++; console.log(`   ✓ Updated`) }

    }

    // Rate limit: 1 request/second

    await new Promise(r => setTimeout(r, 1000))

  } catch(e) {

    console.error(`   ❌ ${e.message}`)

    failed++

  }

}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)

console.log(DRY

  ? `Dry run done. Looked good? Run: node fix_recipe_nutrition.mjs --commit`

  : `✨ ${updated} updated, ${failed} failed.`)

