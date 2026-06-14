import { createClient } from '@supabase/supabase-js'
const sb = createClient(
  'https://korektlpnwuefsagfuvq.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'
)

const {data,error} = await sb.from('cookbook_recipes').select('id,title,total_calories,total_protein,total_carbs,total_fat,category,cuisine').order('title')
if(error){console.error('❌',error.message);process.exit(1)}

console.log('Auditing',data.length,'recipes...\n')

const bad=[],suspicious=[],ok=[]
for(const r of data){
  const kcal=parseFloat(r.total_calories)||0
  const p=parseFloat(r.total_protein)||0
  const c=parseFloat(r.total_carbs)||0
  const f=parseFloat(r.total_fat)||0
  const calculated=p*4+c*4+f*9
  const diff=Math.abs(kcal-calculated)
  const pct=kcal>0?(diff/kcal*100):100

  const issues=[]
  if(!kcal)issues.push('zero kcal')
  if(!p&&!c&&!f)issues.push('all macros zero')
  if(pct>15&&kcal>0)issues.push(`macros don't match kcal (calc:${calculated.toFixed(0)} vs shown:${kcal}, ${pct.toFixed(0)}% off)`)
  if(p>100)issues.push(`protein suspiciously high: ${p}g`)
  if(f>100)issues.push(`fat suspiciously high: ${f}g`)
  if(c>200)issues.push(`carbs suspiciously high: ${c}g`)
  if(kcal>1500)issues.push(`kcal suspiciously high: ${kcal}`)
  if(kcal<50&&kcal>0&&r.category!=='snacks'&&r.category!=='drinks')issues.push(`kcal suspiciously low: ${kcal}`)

  const row={n:r.title,cat:r.category,cu:r.cuisine,k:kcal,p,carbs:c,f,calc:calculated.toFixed(0),pct:pct.toFixed(0)}
  if(issues.length){
    if(issues.some(i=>i.includes('zero')||i.includes('suspiciously'))){
      bad.push({...row,issues})
    }else{
      suspicious.push({...row,issues})
    }
  } else {ok.push(row)}
}

console.log('═══════════════════════════════════════════════════════')
console.log('SUMMARY')
console.log('═══════════════════════════════════════════════════════')
console.log(`✓ Healthy:    ${ok.length}`)
console.log(`⚠ Suspicious: ${suspicious.length}`)
console.log(`❌ Bad:        ${bad.length}`)

console.log('\n— Cuisine breakdown —')
const byCuisine={}
data.forEach(r=>{const c=r.cuisine||'(none)';byCuisine[c]=(byCuisine[c]||0)+1})
Object.entries(byCuisine).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>console.log(`  ${c}: ${n}`))

if(bad.length){
  console.log('\n❌ BAD RECIPES (showing first 40):')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  bad.slice(0,40).forEach(r=>{
    console.log(`\n• ${r.n} [${r.cu||'-'}/${r.cat||'-'}]`)
    console.log(`  ${r.k}kcal | ${r.p}p ${r.carbs}c ${r.f}f`)
    r.issues.forEach(i=>console.log(`  ⚠️  ${i}`))
  })
  if(bad.length>40)console.log(`\n  ... +${bad.length-40} more`)
}

if(suspicious.length){
  console.log('\n\n⚠ SUSPICIOUS (macros mismatch, first 15):')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  suspicious.slice(0,15).forEach(r=>{
    console.log(`• ${r.n} [${r.cu||'-'}]: ${r.k}kcal but macros calculate to ${r.calc} (${r.pct}% off)`)
  })
  if(suspicious.length>15)console.log(`  ... +${suspicious.length-15} more`)
}

console.log('\n\n📊 SANITY SAMPLE — 5 random healthy recipes:')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
ok.sort(()=>Math.random()-0.5).slice(0,5).forEach(r=>{
  console.log(`• ${r.n} [${r.cu||'-'}/${r.cat||'-'}]: ${r.k}kcal · ${r.p}p ${r.carbs}c ${r.f}f`)
})

console.log('\n\nNote: `servings` column does not exist on cookbook_recipes.')
console.log('Every recipe falls back to "4 portions" in the UI via `||4`.')
