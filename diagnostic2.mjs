// diagnostic2.mjs — Coach Sammy: corrected diagnostic (auto-discover columns)
// Run from /Users/mac/Downloads/coach-sammy/

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ';
const SAMMY_ID = '2b574ba9-d502-4922-8f40-c4ca327ea67d';

const db = createClient(SUPABASE_URL, SERVICE_ROLE);

console.log('\n========================================');
console.log('  COACH SAMMY — DIAGNOSTIC v2');
console.log('========================================\n');

// ─── 1. cookbook_recipes: discover columns + count ───────────────
console.log('[1] cookbook_recipes — schema + counts');
const { data: sample, error: sErr } = await db
  .from('cookbook_recipes')
  .select('*')
  .limit(1);

if (sErr) {
  console.log('    ❌ Cannot read table:', sErr.message);
} else if (sample.length === 0) {
  console.log('    ⚠️  Table is EMPTY — seed never ran');
} else {
  const cols = Object.keys(sample[0]);
  console.log('    Columns:', cols.join(', '));

  // total count
  const { count: total } = await db
    .from('cookbook_recipes')
    .select('*', { count: 'exact', head: true });
  console.log(`    Total rows: ${total}`);

  // meal_type populated?
  if (cols.includes('meal_type')) {
    const { count: mt } = await db
      .from('cookbook_recipes')
      .select('*', { count: 'exact', head: true })
      .not('meal_type', 'is', null);
    console.log(`    With meal_type populated: ${mt}`);
  } else {
    console.log('    ⚠️  meal_type column MISSING — needs ALTER TABLE');
  }

  // membership_required populated?
  if (cols.includes('membership_required')) {
    const { count: mr } = await db
      .from('cookbook_recipes')
      .select('*', { count: 'exact', head: true })
      .not('membership_required', 'is', null);
    console.log(`    With membership_required populated: ${mr}`);
  } else {
    console.log('    ⚠️  membership_required column MISSING — needs ALTER TABLE');
  }

  // show a sample row's identifying fields
  const titleField = cols.find(c => ['title','nom','recipe_name','name_fr'].includes(c)) || cols[1];
  console.log(`    Sample row [${titleField}]:`, sample[0][titleField]);
}

// ─── 2. training_sessions: count for ALL demo profiles ───────────
console.log('\n[2] training_sessions — all clients with sessions');
const { data: tsRows, error: tsErr } = await db
  .from('training_sessions')
  .select('client_id');

if (tsErr) {
  console.log('    ❌ ERROR:', tsErr.message);
} else {
  const byClient = {};
  for (const r of tsRows) byClient[r.client_id] = (byClient[r.client_id] || 0) + 1;
  const entries = Object.entries(byClient).sort((a,b) => b[1]-a[1]);
  console.log(`    Total sessions in DB: ${tsRows.length}`);
  console.log(`    Distinct clients with sessions: ${entries.length}`);
  for (const [cid, n] of entries.slice(0, 10)) {
    const tag = cid === SAMMY_ID ? ' ← Sammy' : '';
    console.log(`      ${cid}  ${n} sessions${tag}`);
  }
}

// ─── 3. demo profiles: how many exist? ───────────────────────────
console.log('\n[3] demo profiles registered');
const { data: profiles, error: pErr } = await db
  .from('profiles')
  .select('id, full_name, is_demo')
  .or('is_demo.eq.true,id.eq.' + SAMMY_ID);

if (pErr) {
  console.log('    ❌ ERROR:', pErr.message);
  console.log('    (profiles table may use different column names — try clients table)');
  const { data: clients, error: cErr } = await db
    .from('clients')
    .select('*')
    .limit(2);
  if (!cErr && clients.length > 0) {
    console.log('    clients table columns:', Object.keys(clients[0]).join(', '));
  }
} else {
  console.log(`    Found: ${profiles.length}`);
  for (const p of profiles) console.log(`      ${p.id}  ${p.full_name || '(no name)'}`);
}

console.log('\n========================================');
console.log('  DONE');
console.log('========================================\n');
