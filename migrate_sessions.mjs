import { createClient } from '@supabase/supabase-js'
const sb = createClient(
  'https://korektlpnwuefsagfuvq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'
)

const DRY_RUN = process.argv[2] !== '--commit'
console.log(DRY_RUN ? '🔍 DRY RUN MODE — no DB writes' : '⚡ COMMIT MODE — writing to DB')
console.log()

console.log('Loading library + sessions…')
const {data:lib}=await sb.from('exercise_library').select('slug,name_fr,muscle_groups,default_sets,default_reps,default_rest_seconds')
const {data:sessions}=await sb.from('training_sessions').select('id,client_id,name,exercises,muscle_groups')
console.log(`  ${lib.length} library entries · ${sessions.length} sessions`)

const norm=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim()
const NAME_FIELDS=['name','exercise_name','nom','title','exo_name','exercice','exo','libelle','label']

function findField(ex){
  for(const f of NAME_FIELDS) if(ex[f]&&typeof ex[f]==='string'&&ex[f].trim()) return f
  return null
}

function libMatch(name){
  if(!name)return null
  const n=norm(name)
  let m=lib.find(l=>norm(l.name_fr)===n)
  if(m)return {m,score:'exact'}
  m=lib.find(l=>norm(l.name_fr).includes(n)||n.includes(norm(l.name_fr)))
  if(m)return {m,score:'contains'}
  const words=n.split(' ').filter(w=>w.length>3)
  if(words.length){
    const candidates=lib.map(l=>{
      const ln=norm(l.name_fr).split(' ')
      const hits=words.filter(w=>ln.some(lw=>lw.includes(w)||w.includes(lw))).length
      return {l,hits}
    }).filter(c=>c.hits>=Math.max(1,words.length-1)).sort((a,b)=>b.hits-a.hits)
    if(candidates.length)return {m:candidates[0].l,score:'fuzzy'}
  }
  return null
}

// First: introspect what field is used
const fieldsUsed={}
sessions.forEach(s=>{
  if(!Array.isArray(s.exercises))return
  s.exercises.forEach(e=>{
    if(!e||typeof e!=='object')return
    const f=findField(e)
    if(f)fieldsUsed[f]=(fieldsUsed[f]||0)+1
  })
})
console.log('\nField usage across all exercises:')
Object.entries(fieldsUsed).sort((a,b)=>b[1]-a[1]).forEach(([f,n])=>console.log(`  ${f}: ${n}`))

let totalEx=0,renamed=0,matched={exact:0,contains:0,fuzzy:0,none:0},sessionsUpdated=0
const updates=[]

for(const s of sessions){
  if(!Array.isArray(s.exercises)||!s.exercises.length)continue
  const newEx=[]
  const sMuscles=new Set()
  let changed=false
  for(const e of s.exercises){
    if(!e||typeof e!=='object'){newEx.push(e);continue}
    totalEx++
    const ne={...e}
    const f=findField(e)
    if(f&&f!=='name'){ne.name=e[f];renamed++;changed=true}
    else if(!ne.name)ne.name='Exercice sans nom'
    const lm=libMatch(ne.name)
    if(lm){
      matched[lm.score]++
      if(!ne.library_slug){ne.library_slug=lm.m.slug;changed=true}
      if(!Array.isArray(ne.muscle_groups)||!ne.muscle_groups.length){ne.muscle_groups=lm.m.muscle_groups||[];changed=true}
      if(!ne.rest_seconds&&lm.m.default_rest_seconds){ne.rest_seconds=lm.m.default_rest_seconds;changed=true}
      ;(lm.m.muscle_groups||[]).forEach(m=>sMuscles.add(m))
    } else {
      matched.none++
      if(Array.isArray(ne.muscle_groups))ne.muscle_groups.forEach(m=>sMuscles.add(m))
    }
    // Normalize sets/reps fields
    if(typeof ne.sets==='string')ne.sets=parseInt(ne.sets)||3
    if(!ne.sets)ne.sets=3
    if(!ne.reps)ne.reps='8-12'
    if(!ne.rest_seconds)ne.rest_seconds=90
    newEx.push(ne)
  }
  const newSessionMuscles=Array.from(sMuscles)
  const sessionMusclesChanged=newSessionMuscles.length>(s.muscle_groups||[]).length
  if(changed||sessionMusclesChanged){
    updates.push({id:s.id,exercises:newEx,muscle_groups:newSessionMuscles.length?newSessionMuscles:(s.muscle_groups||[])})
    sessionsUpdated++
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`📊 PLAN`)
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
console.log(`Sessions to update: ${sessionsUpdated}/${sessions.length}`)
console.log(`Total exercises: ${totalEx}`)
console.log(`Renamed to .name: ${renamed}`)
console.log(`Library matches:`)
console.log(`  exact:    ${matched.exact}`)
console.log(`  contains: ${matched.contains}`)
console.log(`  fuzzy:    ${matched.fuzzy}`)
console.log(`  no match: ${matched.none}`)

console.log(`\n🔬 Sample of first 3 updates (preview):`)
updates.slice(0,3).forEach((u,i)=>{
  const s=sessions.find(x=>x.id===u.id)
  console.log(`\n  ${i+1}. "${s.name}" — muscles: [${u.muscle_groups.join(', ')}]`)
  u.exercises.slice(0,3).forEach(e=>{
    console.log(`     • ${e.name}${e.library_slug?' ['+e.library_slug+']':''} — ${e.sets}×${e.reps}`)
  })
  if(u.exercises.length>3)console.log(`     ... +${u.exercises.length-3} more`)
})

if(DRY_RUN){
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`DRY RUN COMPLETE — no DB writes.`)
  console.log(`To commit, run:  node migrate_sessions.mjs --commit`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
} else {
  console.log(`\n💾 Writing ${updates.length} updates to DB…`)
  let ok=0,fail=0
  for(const u of updates){
    const {error}=await sb.from('training_sessions').update({exercises:u.exercises,muscle_groups:u.muscle_groups}).eq('id',u.id)
    if(error){fail++;console.error(`  ❌ ${u.id.slice(0,8)}: ${error.message}`)}
    else ok++
  }
  console.log(`\n✨ ${ok} sessions updated, ${fail} failed.`)
}
