import { createClient } from '@supabase/supabase-js'
const sb = createClient(
  'https://korektlpnwuefsagfuvq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'
)

const {data}=await sb.from('training_sessions').select('id,name,exercises').not('exercises','is',null).limit(8)

console.log('═══ RAW EXERCISE OBJECTS — current state ═══\n')
data.forEach((s,i)=>{
  console.log(`SESSION ${i+1}: "${s.name}"`)
  if(Array.isArray(s.exercises)&&s.exercises.length){
    console.log(`  Length: ${s.exercises.length}`)
    console.log(`  ALL keys in first ex: [${Object.keys(s.exercises[0]).join(', ')}]`)
    console.log(`  First ex (raw JSON):`)
    console.log('  '+JSON.stringify(s.exercises[0],null,2).split('\n').join('\n  '))
  }
  console.log()
})
