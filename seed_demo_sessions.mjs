#!/usr/bin/env node
// seed_demo_sessions.mjs — fixed (no cardio column)
const SB_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMjI0NjQsImV4cCI6MjA5MTU5ODQ2NH0.46rZOEMUKoZCyL8eKzob8FDuOoFiA2LHbr2ZoKW-HrM';
const H = { 'Content-Type':'application/json','apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Prefer':'return=representation' };
const q = async (method, path, body) => {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, { method, headers:H, body: body ? JSON.stringify(body) : undefined });
  return { ok:r.ok, status:r.status, data: await r.json().catch(()=>null) };
};

const PUSH_A=[
  {n:'Développé couché barre',    sets:'4×8',  cues:'Descente contrôlée 3s',rest:120},
  {n:'Développé incliné haltères',sets:'3×10', cues:'Contraction au sommet', rest:90},
  {n:'Écarté câble bas',          sets:'3×12', cues:'Arc léger',             rest:75},
  {n:'Développé militaire barre', sets:'3×10', cues:'Core serré',            rest:90},
  {n:'Élévations latérales',      sets:'4×15', cues:'Lent en descente',      rest:60},
  {n:'Extension triceps poulie',  sets:'3×12', cues:'Coude fixe',            rest:60},
  {n:'🏃 Tapis roulant incliné',  sets:'15min',cues:'7% pente · 5.5 km/h',  rest:0},
];
const PUSH_B=[
  {n:'Développé incliné barre',   sets:'4×8',  cues:'Descente contrôlée 3s',rest:120},
  {n:'Pompes lestées',            sets:'3×12', cues:'Full ROM',              rest:90},
  {n:'Fly machine',               sets:'3×12', cues:'Contraction peak',      rest:75},
  {n:'Élévations frontales',      sets:'3×12', cues:'Prise neutre',          rest:60},
  {n:'Dips',                      sets:'3×10', cues:'Légèrement penché',     rest:90},
  {n:'Kickback triceps',          sets:'3×15', cues:'Bras parallèle au sol', rest:60},
];
const PULL_A=[
  {n:'Tractions pronation',       sets:'4×8',  cues:'Full ROM',              rest:120},
  {n:'Rowing barre Pendlay',      sets:'4×8',  cues:'Explosion concentrique',rest:120},
  {n:'Tirage vertical serré',     sets:'3×10', cues:'Rétraction omoplate',   rest:90},
  {n:'Curl barre EZ',             sets:'3×10', cues:'Supination au sommet',  rest:75},
  {n:'Curl marteau',              sets:'3×12', cues:'Prise neutre',          rest:60},
  {n:'Gainage planche',           sets:'3×45s',cues:'Respirez normalement',  rest:60},
];
const PULL_B=[
  {n:'Tirage vertical large',     sets:'4×10', cues:'Coudes vers le bas',    rest:90},
  {n:'Rowing machine',            sets:'4×10', cues:'Pause 1s au milieu',    rest:90},
  {n:'Face pull',                 sets:'3×15', cues:'Mains oreilles en fin', rest:60},
  {n:'Curl incliné haltères',     sets:'3×12', cues:'Étirement bicep',       rest:75},
  {n:'Shrugs haltères',           sets:'3×15', cues:'Trap supérieur',        rest:60},
];
const LEGS_A=[
  {n:'Squat barre',               sets:'4×8',  cues:'Descente 3s / pause',   rest:150},
  {n:'Presse à cuisses',          sets:'3×12', cues:'Pied milieu plateau',   rest:120},
  {n:'Fentes marchées haltères',  sets:'3×12', cues:'Genou avant ≥90°',      rest:90},
  {n:'Leg curl couché',           sets:'3×12', cues:'Full ROM',              rest:75},
  {n:'Mollets debout',            sets:'4×15', cues:'Pause 1s en bas',       rest:60},
];
const LEGS_B=[
  {n:'Soulevé de terre roumain',  sets:'4×10', cues:'Hanches arrière',       rest:120},
  {n:'Hack squat',                sets:'3×10', cues:'Largeur épaule',        rest:120},
  {n:'Leg extension',             sets:'3×15', cues:'Contraction peak 1s',   rest:75},
  {n:'Glute bridge barre',        sets:'4×12', cues:'Poussée via talons',    rest:90},
  {n:'Mollets assis',             sets:'4×20', cues:'Amplitude maximale',    rest:60},
  {n:'🚴 HIIT vélo',              sets:'12min',cues:'20s sprint / 40s récup',rest:0},
];
const UPPER=[
  {n:'Développé couché haltères', sets:'4×10', cues:'Descente contrôlée',    rest:90},
  {n:'Rowing haltères',           sets:'4×10', cues:'Coude 45° du corps',    rest:90},
  {n:'Développé militaire assis', sets:'3×10', cues:'Regard frontal',        rest:90},
  {n:'Tirage vertical',           sets:'3×12', cues:'Coudes vers sol',       rest:75},
  {n:'Curl barre',                sets:'3×12', cues:'Pas de balancement',    rest:60},
  {n:'Triceps poulie corde',      sets:'3×12', cues:'Flaire les poignets',   rest:60},
  {n:'🏃 Tapis roulant incliné',  sets:'15min',cues:'7% pente · finisher',   rest:0},
];
const LOWER=[
  {n:'Squat gobelet',             sets:'4×12', cues:'Talons à plat',         rest:90},
  {n:'Soulevé de terre',          sets:'4×8',  cues:'Dos neutre obligatoire',rest:150},
  {n:'Leg press',                 sets:'3×15', cues:'Profondeur ≥90°',       rest:90},
  {n:'Leg curl assis',            sets:'3×15', cues:'Full ROM',              rest:75},
  {n:'Abducteur machine',         sets:'3×20', cues:'Lent en retour',        rest:60},
  {n:'Mollets debout',            sets:'4×20', cues:'Amplitude complète',    rest:60},
];
const FULL_A=[
  {n:'Squat barre',               sets:'4×8',  cues:'Descente 3s',           rest:120},
  {n:'Développé couché haltères', sets:'4×10', cues:'Contrôlé',              rest:90},
  {n:'Soulevé de terre roumain',  sets:'3×10', cues:'Hanches arrière',       rest:120},
  {n:'Rowing haltères',           sets:'3×10', cues:'Coude haut',            rest:90},
  {n:'Développé militaire',       sets:'3×10', cues:'Core serré',            rest:90},
  {n:'Curl + extension poulie',   sets:'3×12', cues:'Superset',              rest:75},
  {n:'🏃 Tapis roulant incliné',  sets:'15min',cues:'7% pente · finisher',   rest:0},
];
const FULL_B=[
  {n:'Gobelet squat',             sets:'4×12', cues:'Profondeur maximale',   rest:90},
  {n:'Pompes',                    sets:'4×15', cues:'Full ROM',              rest:75},
  {n:'Hip thrust',                sets:'4×12', cues:'Poussée via talons',    rest:90},
  {n:'Tirage poulie basse',       sets:'3×12', cues:'Pause 1s au milieu',    rest:90},
  {n:'Planche dynamique',         sets:'3×45s',cues:'Hanches stables',       rest:60},
  {n:'Fentes latérales',          sets:'3×12', cues:'Genou au-dessus pied',  rest:75},
  {n:'🚴 HIIT vélo',              sets:'12min',cues:'20s sprint / 40s récup',rest:0},
];
const FULL_C=[
  {n:'Box squat barre',           sets:'4×8',  cues:'Explosion concentrique',rest:120},
  {n:'Incliné haltères',          sets:'4×10', cues:'Pause 1s bas',          rest:90},
  {n:'Fentes bulgares',           sets:'3×10', cues:'Arrière pied surélevé', rest:100},
  {n:'Rowing cable',              sets:'3×12', cues:'Rétraction omoplate',   rest:90},
  {n:'Arnold press',              sets:'3×12', cues:'Rotation fluide',       rest:90},
  {n:'Abdos rouleau',             sets:'3×10', cues:'Core engagé',           rest:60},
  {n:'🏃 Tapis roulant incliné',  sets:'15min',cues:'7% pente · finisher',   rest:0},
];

const DEMO_PROGRAMS=[
  {
    id:'2b574ba9-d502-4922-8f40-c4ca327ea67d', label:'Sammy ⭐ — PPL+Upper (4j)',
    sessions:[
      {name:'Push — Poitrine & Épaules & Triceps', type:'Hypertrophie', exercises:PUSH_A, rest_time:90},
      {name:'Pull — Dos & Biceps',                 type:'Hypertrophie', exercises:PULL_A, rest_time:90},
      {name:'Legs — Quadriceps & Ischios',         type:'Hypertrophie', exercises:LEGS_A, rest_time:90},
      {name:'Upper — Full Haut du Corps',          type:'Hypertrophie', exercises:UPPER,  rest_time:90},
    ],
  },
  {
    id:'ea6d0c3a-5777-4aec-b153-e428c01c73a7', label:'Amine 🔥 — Full Body (3j)',
    sessions:[
      {name:'Full Body A — Force',     type:'Force',        exercises:FULL_A, rest_time:90},
      {name:'Full Body B — Volume',    type:'Hypertrophie', exercises:FULL_B, rest_time:75},
      {name:'Full Body C — Intensité', type:'Hypertrophie', exercises:FULL_C, rest_time:75},
    ],
  },
  {
    id:'343d2ddc-9b6b-4a80-ac69-dcce65663b57', label:'Yasmine ✨ — Upper/Lower/Full (3j)',
    sessions:[
      {name:'Upper — Haut du Corps',           type:'Hypertrophie', exercises:UPPER,  rest_time:75},
      {name:'Lower — Jambes & Fessiers',       type:'Hypertrophie', exercises:LOWER,  rest_time:75},
      {name:'Full Body — Récupération active', type:'Circuit',      exercises:FULL_B, rest_time:60},
    ],
  },
  {
    id:'4dcaa588-6914-49be-80de-0d9f45d1625b', label:'Rayan 💪 — PPL×2 (4j)',
    sessions:[
      {name:'Push A — Poitrine focus',     type:'Hypertrophie', exercises:PUSH_A, rest_time:90},
      {name:'Pull A — Dos & Biceps',       type:'Hypertrophie', exercises:PULL_A, rest_time:90},
      {name:'Push B — Épaules focus',      type:'Hypertrophie', exercises:PUSH_B, rest_time:90},
      {name:'Legs B — Postérieure chaîne', type:'Force',        exercises:LEGS_B, rest_time:120},
    ],
  },
  {
    id:'b68d1dd9-572a-4ed0-9051-5949d879713b', label:'Lina ⚡ — Full Body (3j)',
    sessions:[
      {name:'Full Body A — Lundi',    type:'Hypertrophie', exercises:FULL_A, rest_time:75},
      {name:'Full Body B — Mercredi', type:'Hypertrophie', exercises:FULL_B, rest_time:75},
      {name:'Full Body C — Vendredi', type:'Circuit',      exercises:FULL_C, rest_time:60},
    ],
  },
  {
    id:'5e48c03b-1ef5-4651-82b5-9e578e97d56d', label:'Karim ⚖️ — Upper/Lower (3j)',
    sessions:[
      {name:'Upper — Haut du Corps',   type:'Hypertrophie', exercises:UPPER,  rest_time:90},
      {name:'Lower — Jambes',          type:'Force',        exercises:LOWER,  rest_time:120},
      {name:'Full Body — Performance', type:'Circuit',      exercises:FULL_A, rest_time:75},
    ],
  },
  {
    id:'049fc750-716f-482c-83ff-1999b672a510', label:'Sarah 🏆 — PPL+L (4j)',
    sessions:[
      {name:'Push — Force & Volume',       type:'Force', exercises:PUSH_A, rest_time:120},
      {name:'Pull — Dos & Biceps',         type:'Force', exercises:PULL_B, rest_time:120},
      {name:'Legs A — Quadriceps',         type:'Force', exercises:LEGS_A, rest_time:150},
      {name:'Legs B — Postérieure chaîne', type:'Force', exercises:LEGS_B, rest_time:120},
    ],
  },
];

let totalInserted=0;
for(const profile of DEMO_PROGRAMS){
  console.log(`\n── ${profile.label}`);
  const del=await q('DELETE',`training_sessions?client_id=eq.${profile.id}`);
  console.log(del.ok||del.status===204 ? '   🗑  Cleared' : `   ⚠  Delete ${del.status}`);
  const rows=profile.sessions.map(s=>({client_id:profile.id,name:s.name,type:s.type,exercises:s.exercises,rest_time:s.rest_time}));
  const ins=await q('POST','training_sessions',rows);
  if(!ins.ok){console.error(`   ❌  (${ins.status})`,JSON.stringify(ins.data?.message||ins.data));}
  else{(ins.data||[]).forEach(r=>console.log(`   ✅  ${r.name}`));totalInserted+=(ins.data||[]).length;}
}
console.log(`\n🎉  Done — ${totalInserted} sessions inserted across ${DEMO_PROGRAMS.length} profiles.\n`);
