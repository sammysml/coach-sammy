// diagnostic.mjs — Coach Sammy: confirm seed + notifications pipeline
// Run from /Users/mac/Downloads/coach-sammy/ (same folder as seed_cookbook_v2_diet.mjs)
//
// Usage:
//   sed -i '' "s|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ|<YOUR_KEY>|" diagnostic.mjs
//   node diagnostic.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ';
const DEMO_CLIENT_ID = '2b574ba9-d502-4922-8f40-c4ca327ea67d';

const db = createClient(SUPABASE_URL, SERVICE_ROLE);

console.log('\n========================================');
console.log('  COACH SAMMY — DIAGNOSTIC');
console.log('========================================\n');

// ─── 1. cookbook_recipes ──────────────────────────────────────────
console.log('[1] cookbook_recipes table');
const { data: recipes, error: rErr, count } = await db
  .from('cookbook_recipes')
  .select('id, name, meal_type, membership_required', { count: 'exact' });

if (rErr) {
  console.log('    ❌ ERROR:', rErr.message);
  if (rErr.message.includes('meal_type') || rErr.message.includes('membership_required')) {
    console.log('    ⚠️  Missing columns — ALTER TABLE needed before seeding');
  }
} else {
  console.log(`    Total recipes:          ${count}`);
  const withMeal = recipes.filter(r => r.meal_type).length;
  const withMember = recipes.filter(r => r.membership_required !== null && r.membership_required !== undefined).length;
  console.log(`    With meal_type:         ${withMeal}`);
  console.log(`    With membership_required: ${withMember}`);
  console.log(`    Expected after seed:    37+`);

  if (count >= 37 && withMeal >= 37) {
    console.log('    ✅ Seed appears to have run successfully');
  } else if (count > 0 && withMeal === 0) {
    console.log('    ⚠️  Recipes exist but meal_type empty — seed did NOT run');
  } else if (count === 0) {
    console.log('    ⚠️  Table is empty — seed never ran');
  } else {
    console.log('    ⚠️  Partial state — seed may have failed mid-run');
  }
}

// ─── 2. coach_notifications insert probe ──────────────────────────
console.log('\n[2] coach_notifications insert probe');
const { data: notif, error: nErr } = await db
  .from('coach_notifications')
  .insert({
    client_id: DEMO_CLIENT_ID,
    type: 'probe',
    title: 'Diagnostic probe',
    body: 'Test at ' + new Date().toISOString(),
    is_read: false,
    priority: false
  })
  .select();

if (nErr) {
  console.log('    ❌ INSERT FAILED');
  console.log('    Message:', nErr.message);
  if (nErr.details) console.log('    Details:', nErr.details);
  if (nErr.hint)    console.log('    Hint:   ', nErr.hint);
} else {
  console.log('    ✅ Insert succeeded — row id:', notif?.[0]?.id);
  if (notif?.[0]?.id) {
    await db.from('coach_notifications').delete().eq('id', notif[0].id);
    console.log('    🧹 Probe row cleaned up');
  }
}

// ─── 3. coach_notifications schema ────────────────────────────────
console.log('\n[3] coach_notifications schema');
const { data: existing, error: eErr } = await db
  .from('coach_notifications')
  .select('*')
  .limit(1);

if (eErr) {
  console.log('    ❌ Cannot read table:', eErr.message);
} else if (existing.length === 0) {
  console.log('    (table empty — nothing to inspect)');
} else {
  console.log('    Columns:', Object.keys(existing[0]).join(', '));
}

// ─── 4. training_sessions row counts ──────────────────────────────
console.log('\n[4] training_sessions for demo profiles');
const { count: tsCount, error: tsErr } = await db
  .from('training_sessions')
  .select('*', { count: 'exact', head: true })
  .eq('client_id', DEMO_CLIENT_ID);

if (tsErr) {
  console.log('    ❌ ERROR:', tsErr.message);
} else {
  console.log(`    Sammy demo profile sessions: ${tsCount}`);
}

console.log('\n========================================');
console.log('  DONE');
console.log('========================================\n');
