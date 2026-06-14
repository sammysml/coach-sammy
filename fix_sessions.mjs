import { createClient } from '@supabase/supabase-js'
const sb = createClient(
  'https://korektlpnwuefsagfuvq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'
)

const DRY = process.argv[2] !== '--commit'
console.log(DRY ? '🔍 DRY RUN' : '⚡ COMMITTING')

const {data:lib} = await sb.from('exercise_library').select('slug,name_fr,muscle_groups,default_rest_seconds')
const {data:sessions} = await sb.from('training_sessions').select('id,name,exercises,muscle_groups')
console.log(`${lib.length} lib entries · ${sessions.length} sessions\n`)

// Normalize for matching
const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()

function libMatch(rawName) {
  if (!rawName) return null
  const n = norm(rawName)
  // Exact
  let m = lib.find(l => norm(l.name_fr) === n)
  if (m) return {m, score:'exact'}
  // One contains the other
  m = lib.find(l => { const ln=norm(l.name_fr); return ln===n||ln.includes(n)||n.includes(ln) })
  if (m) return {m, score:'contains'}
  // Word overlap (≥50%)
  const nw = n.split(' ').filter(w=>w.length>2)
  if (nw.length) {
    let best = null, bestScore = 0
    lib.forEach(l => {
      const lw = norm(l.name_fr).split(' ').filter(w=>w.length>2)
      const hits = nw.filter(w => lw.some(lword => lword.includes(w)||w.includes(lword))).length
      const score = hits / Math.max(nw.length, lw.length)
      if (score > bestScore && score >= 0.5) { bestScore=score; best=l }
    })
    if (best) return {m:best, score:'fuzzy:'+bestScore.toFixed(2)}
  }
  return null
}

// Session name → muscle group fallback
const SESSION_MUSCLE_KEYWORDS = [
  {k:['push','poitrine','pec','chest'],m:['chest','deltoids','triceps']},
  {k:['pull','dos','bicep','back','rowing'],m:['upper-back','biceps','trapezius','forearm']},
  {k:['legs','jambes','cuisses','quad','squat'],m:['quadriceps','hamstring','gluteal','calves']},
  {k:['lower','bas du corps','bas corps','glute','fessier','posterior','ischios','hams'],m:['gluteal','hamstring','quadriceps','calves']},
  {k:['upper','haut du corps','haut corps'],m:['chest','upper-back','deltoids','biceps','triceps']},
  {k:['full body','fullbody','full'],m:['chest','upper-back','deltoids','quadriceps','gluteal','abs']},
  {k:['cardio','marche','walking','velo','bike','incline','inclinee'],m:['calves','quadriceps']},
  {k:['core','abdos','abs','gainage'],m:['abs','obliques','lower-back']},
  {k:['epaule','shoulder','deltoid'],m:['deltoids','trapezius']},
  {k:['repos','rest','recovery','actif'],m:[]},
]

function inferSessionMuscles(sessionName) {
  const sn = norm(sessionName)
  const muscles = new Set()
  for (const {k,m} of SESSION_MUSCLE_KEYWORDS) {
    if (k.some(kw => sn.includes(norm(kw)))) {
      m.forEach(mu => muscles.add(mu))
      break // take first match
    }
  }
  return Array.from(muscles)
}

let totalEx=0, fixed=0, libHits=0
const updates=[]

for (const s of sessions) {
  if (!Array.isArray(s.exercises) || !s.exercises.length) continue
  const newEx = []
  const sMuscles = new Set()

  for (const e of s.exercises) {
    if (!e || typeof e !== 'object') { newEx.push(e); continue }
    totalEx++

    // The real name is in `n`, cues in `cues`
    const realName = (e.n || '').trim() || null
    const realRest = typeof e.rest === 'number' ? e.rest : (parseInt(e.rest)||0)
    
    const ne = {
      n: e.n,                          // keep original field
      name: realName || 'Sans nom',    // fix the bad name
      sets: e.sets || 3,
      reps: e.reps || '8-12',
      rest_seconds: realRest || e.rest_seconds || 90,
      notes: e.cues || e.notes || '',  // coaching cue
      weight_hint: e.weight_hint || e.poids || '',
    }

    // Library match
    const lm = libMatch(realName)
    if (lm) {
      libHits++
      ne.library_slug = lm.m.slug
      ne.muscle_groups = lm.m.muscle_groups || []
      ;(lm.m.muscle_groups||[]).forEach(m => sMuscles.add(m))
    } else {
      // No match — keep whatever muscle_groups existed on the exercise (not presse-jambes fake ones)
      ne.muscle_groups = []
    }

    newEx.push(ne)
  }

  // Session muscle_groups: from library matches, or infer from session name
  let sessionMuscles = Array.from(sMuscles)
  if (!sessionMuscles.length) {
    sessionMuscles = inferSessionMuscles(s.name)
  }

  updates.push({ id: s.id, exercises: newEx, muscle_groups: sessionMuscles })
  fixed++
}

// Sample report
console.log(`Sessions: ${fixed}/${sessions.length}`)
console.log(`Exercises: ${totalEx}`)
console.log(`Library matched: ${libHits}/${totalEx} (${(libHits/totalEx*100).toFixed(0)}%)`)
console.log(`\n📋 SAMPLE (first 5):`)
updates.slice(0,5).forEach((u,i) => {
  const s = sessions.find(x=>x.id===u.id)
  console.log(`\n${i+1}. "${s.name}" → muscles: [${u.muscle_groups.join(', ')||'none'}]`)
  u.exercises.slice(0,3).forEach(e => {
    const lib = e.library_slug ? ` ✓[${e.library_slug}]` : ' ✗(no match)'
    console.log(`   • "${e.name}"${lib} — ${e.sets}×${e.reps} rest:${e.rest_seconds}s`)
  })
  if (u.exercises.length>3) console.log(`   ... +${u.exercises.length-3} more`)
})

if (DRY) {
  console.log('\n✋ Dry run done. Run with --commit to apply.')
} else {
  console.log(`\n💾 Writing ${updates.length} sessions…`)
  let ok=0, fail=0
  for (const u of updates) {
    const {error} = await sb.from('training_sessions')
      .update({ exercises: u.exercises, muscle_groups: u.muscle_groups })
      .eq('id', u.id)
    if (error) { fail++; console.error(`❌ ${u.id.slice(0,8)}: ${error.message}`) }
    else ok++
  }
  console.log(`✨ ${ok} updated, ${fail} failed.`)
}
