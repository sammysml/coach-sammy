import { createClient } from '@supabase/supabase-js'
const sb = createClient(
  'https://korektlpnwuefsagfuvq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'
)

const {data:clients}=await sb.from('clients').select('id,name,client_type')
const {data:sess}=await sb.from('training_sessions').select('client_id,name,status,exercises,muscle_groups')

const byClient={}
clients.forEach(c=>byClient[c.id]={name:c.name,type:c.client_type,sessions:[]})
sess.forEach(s=>{
  if(byClient[s.client_id]){
    const exCount=Array.isArray(s.exercises)?s.exercises.length:0
    const exNamed=Array.isArray(s.exercises)?s.exercises.filter(e=>e&&e.name).length:0
    const mg=Array.isArray(s.muscle_groups)?s.muscle_groups.length:0
    byClient[s.client_id].sessions.push({name:s.name,status:s.status,ex:exCount,exNamed,mg})
  }
})

console.log('═══════════════════════════════════════════════')
console.log('CLIENTS WITH SESSIONS')
console.log('═══════════════════════════════════════════════')
Object.entries(byClient).forEach(([id,c])=>{
  if(!c.sessions.length)return
  console.log(`\n${c.name} (${c.type||'?'}) — ${id.slice(0,8)}…`)
  c.sessions.forEach(s=>{
    const flag=s.exNamed===0?'❌ no named exos':s.mg===0?'⚠️  no muscles':'✓'
    console.log(`  ${flag} ${s.name||'(no name)'} · ${s.ex}exos (${s.exNamed} named) · ${s.mg}muscles · ${s.status||'?'}`)
  })
})

console.log('\n═══════════════════════════════════════════════')
console.log('CLIENTS WITHOUT SESSIONS')
console.log('═══════════════════════════════════════════════')
Object.entries(byClient).forEach(([id,c])=>{
  if(c.sessions.length)return
  console.log(`• ${c.name} (${c.type||'?'}) — ${id.slice(0,8)}…`)
})
