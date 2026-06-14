// seed_cookbook_v2_mediterranean.mjs
// Cookbook v2 — Batch 4: Mediterranean (Greek/Lebanese/Turkish/Spanish) — 25 recipes
// Run with: node seed_cookbook_v2_mediterranean.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [
  {
    title: 'Hummus Authentique',
    category: 'snacks',
    cuisine: 'mediterranean',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 280,
    total_protein: 10,
    total_carbs: 28,
    total_fat: 14,
    ingredients: [
      { name: 'Pois chiches cuits', qty: '250g' },
      { name: 'Tahini (purée de sésame)', qty: '3 c.à.s' },
      { name: 'Citron', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '½ c.à.c' },
      { name: 'Sel', qty: 'au goût' },
      { name: 'Eau glacée', qty: '3 c.à.s' }
    ],
    steps: [
      'Mixe tahini avec jus de citron 1 min jusqu\'à crémeux (c\'est le secret).',
      'Ajoute ail, cumin, sel. Mixe.',
      'Ajoute les pois chiches égouttés, mixe 3 min en versant l\'eau glacée petit à petit.',
      'Goûte, ajuste sel et citron.',
      'Sers en bol, fais un creux au centre, arrose d\'huile d\'olive, saupoudre de paprika.'
    ],
    substitutions: [
      { from: 'Tahini', to: 'Beurre de cacahuète non sucré (goût différent mais ça marche)' }
    ],
    coach_note: 'Le secret du hummus crémeux : fouetter le tahini avec le citron AVANT d\'ajouter les pois chiches. Trust me.',
    photo_url: 'https://images.unsplash.com/photo-1571197119282-7c4e2c2d8f4b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Falafel Maison au Four',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 40,
    difficulty: 2,
    total_calories: 380,
    total_protein: 18,
    total_carbs: 42,
    total_fat: 16,
    ingredients: [
      { name: 'Pois chiches secs (trempés 12h)', qty: '200g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Persil frais', qty: '½ bouquet' },
      { name: 'Coriandre fraîche', qty: '½ bouquet' },
      { name: 'Cumin', qty: '1 c.à.s' },
      { name: 'Coriandre en poudre', qty: '1 c.à.c' },
      { name: 'Levure chimique', qty: '½ c.à.c' },
      { name: 'Farine de pois chiches ou farine', qty: '2 c.à.s' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' }
    ],
    steps: [
      'IMPORTANT : utiliser pois chiches SECS trempés 12h, pas en boîte (sinon ça s\'effrite).',
      'Mixe pois chiches, oignon, ail, herbes, épices jusqu\'à pâte grossière (pas en purée).',
      'Ajoute farine et levure. Repose 30 min au frigo.',
      'Forme des boulettes, aplatis légèrement.',
      'Pose sur plaque, badigeonne d\'huile.',
      'Enfourne 25 min à 200°C en retournant à mi-cuisson.',
      'Sers avec hummus, tahini ou dans une pita.'
    ],
    substitutions: [
      { from: 'Pois chiches secs', to: 'Pois chiches en boîte (ajouter 4 c.à.s farine en plus)' }
    ],
    coach_note: 'Cuisson au four = moins de gras que la friture. 18g de protéines végétales.',
    photo_url: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Tabbouleh Authentique',
    category: 'salads',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 20,
    difficulty: 1,
    total_calories: 220,
    total_protein: 5,
    total_carbs: 28,
    total_fat: 10,
    ingredients: [
      { name: 'Persil plat', qty: '2 gros bouquets' },
      { name: 'Menthe fraîche', qty: '½ bouquet' },
      { name: 'Boulgour fin', qty: '40g' },
      { name: 'Tomates fermes', qty: '3' },
      { name: 'Oignon nouveau', qty: '4' },
      { name: 'Citron', qty: '2' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Trempe le boulgour dans le jus d\'1 citron 15 min jusqu\'à ramolli.',
      'Hache TRÈS finement le persil et la menthe (c\'est principalement des herbes, pas du boulgour).',
      'Coupe les tomates en tout petits dés, retire les graines.',
      'Émince finement les oignons nouveaux.',
      'Mélange tout avec le boulgour ramolli.',
      'Assaisonne : huile, jus de l\'autre citron, sel, poivre.',
      'Laisse reposer 10 min au frais avant de servir.'
    ],
    substitutions: [
      { from: 'Boulgour fin', to: 'Quinoa ou couscous fin' }
    ],
    coach_note: 'Le vrai tabouleh libanais c\'est 80% herbes, pas l\'inverse. Surtout pas la version française pleine de boulgour.',
    photo_url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Fattoush Salade Libanaise',
    category: 'salads',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 240,
    total_protein: 6,
    total_carbs: 28,
    total_fat: 12,
    ingredients: [
      { name: 'Pain pita rassis', qty: '1' },
      { name: 'Laitue romaine', qty: '½' },
      { name: 'Tomates', qty: '2' },
      { name: 'Concombre', qty: '1' },
      { name: 'Radis', qty: '4' },
      { name: 'Oignon nouveau', qty: '2' },
      { name: 'Menthe fraîche', qty: '10 feuilles' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Sumac (ou jus de citron + paprika)', qty: '1 c.à.c' },
      { name: 'Mélasse de grenade (facultatif)', qty: '1 c.à.s' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' }
    ],
    steps: [
      'Coupe la pita en morceaux, fais-la dorer au four 8 min à 180°C jusqu\'à croustillante.',
      'Coupe tous les légumes en gros morceaux.',
      'Hache herbes.',
      'Mélange dans un saladier.',
      'Vinaigrette : huile + jus de citron + sumac + mélasse de grenade + sel.',
      'Ajoute la pita grillée juste avant de servir pour qu\'elle reste croustillante.'
    ],
    substitutions: [
      { from: 'Sumac', to: 'Zeste de citron + pincée de paprika' }
    ],
    coach_note: 'Salade libanaise pleine de croquant et de fraîcheur. Le sumac apporte une note acidulée unique.',
    photo_url: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Shawarma de Poulet',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 35,
    difficulty: 2,
    total_calories: 580,
    total_protein: 48,
    total_carbs: 52,
    total_fat: 18,
    ingredients: [
      { name: 'Cuisses de poulet désossées', qty: '300g' },
      { name: 'Yaourt nature', qty: '3 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Citron', qty: '1' },
      { name: 'Cumin', qty: '1 c.à.s' },
      { name: 'Paprika', qty: '1 c.à.s' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Curcuma', qty: '½ c.à.c' },
      { name: 'Pain pita', qty: '2' },
      { name: 'Tomate, concombre, oignon', qty: 'pour garnir' },
      { name: 'Sauce blanche : yaourt + ail + citron', qty: '4 c.à.s' }
    ],
    steps: [
      'Marine le poulet 20 min avec yaourt, ail râpé, jus de citron, toutes les épices.',
      'Cuis à la poêle bien chaude 6 min par côté.',
      'Tranche en fines lamelles.',
      'Mélange yaourt + ail haché + citron + sel = sauce blanche.',
      'Réchauffe les pita, garnis avec poulet, légumes, sauce blanche.',
      'Roule serré.'
    ],
    substitutions: [
      { from: 'Cuisses', to: 'Blancs de poulet (un peu plus secs)' }
    ],
    coach_note: 'Le shawarma c\'est tout dans la marinade — minimum 20 min, idéalement 2h. 48g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#dda15e)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Kibbeh Boulettes Libanaises',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 3,
    total_calories: 540,
    total_protein: 38,
    total_carbs: 42,
    total_fat: 22,
    ingredients: [
      { name: 'Boulgour fin', qty: '150g' },
      { name: 'Viande hachée agneau ou bœuf', qty: '300g' },
      { name: 'Oignon', qty: '2' },
      { name: 'Pignons de pin', qty: '30g' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: '7 épices libanaises ou ras el hanout', qty: '1 c.à.c' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Huile végétale', qty: 'pour cuisson' }
    ],
    steps: [
      'Trempe le boulgour 15 min, presse pour enlever l\'eau.',
      'Pour la coque : mixe ⅔ de la viande avec 1 oignon, boulgour, épices. C\'est une pâte malléable.',
      'Pour la farce : fais revenir l\'autre oignon haché, ajoute le reste de viande, pignons, persil.',
      'Forme des boulettes : prends une boule de pâte, creuse, mets la farce, referme en ovale pointu.',
      'Fais frire dans l\'huile chaude 4 min ou cuis au four 25 min à 200°C.',
      'Sers avec yaourt et salade.'
    ],
    substitutions: [
      { from: 'Agneau', to: 'Bœuf haché 5% MG' }
    ],
    coach_note: 'Plat libanais traditionnel. Long à faire mais ça en vaut la peine — le contraste coque croustillante / farce moelleuse.',
    photo_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Mutabbal d\'Aubergines (Caviar d\'Aubergine)',
    category: 'snacks',
    cuisine: 'mediterranean',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 40,
    difficulty: 1,
    total_calories: 180,
    total_protein: 4,
    total_carbs: 14,
    total_fat: 12,
    ingredients: [
      { name: 'Aubergines', qty: '2 grosses' },
      { name: 'Tahini', qty: '2 c.à.s' },
      { name: 'Yaourt nature', qty: '2 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Cumin', qty: '½ c.à.c' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Grenade en grains (déco)', qty: '2 c.à.s' }
    ],
    steps: [
      'Cuis les aubergines entières au four 40 min à 200°C, ou directement sur la flamme du gaz pour goût fumé.',
      'Laisse refroidir, enlève la peau, écrase la chair à la fourchette.',
      'Mélange avec tahini, yaourt, ail râpé, jus de citron, cumin, sel.',
      'Sers en bol, arrose d\'huile, parsème de persil et grains de grenade.'
    ],
    substitutions: [
      { from: 'Grenade', to: 'Rien (juste décoratif)' }
    ],
    coach_note: 'Si tu peux cuire l\'aubergine sur la flamme, fais-le. Le goût fumé fait toute la différence.',
    photo_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6a040f,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Manakish au Za\'atar',
    category: 'breakfast',
    cuisine: 'mediterranean',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 2,
    total_calories: 360,
    total_protein: 8,
    total_carbs: 52,
    total_fat: 12,
    ingredients: [
      { name: 'Farine', qty: '250g' },
      { name: 'Eau tiède', qty: '150ml' },
      { name: 'Levure boulangère', qty: '5g' },
      { name: 'Sel', qty: '5g' },
      { name: 'Huile d\'olive', qty: '2 c.à.s + 4 c.à.s' },
      { name: 'Za\'atar (mélange d\'épices libanaises)', qty: '4 c.à.s' }
    ],
    steps: [
      'Mélange farine, levure, sel. Ajoute eau et 2 c.à.s d\'huile. Pétris 10 min.',
      'Laisse lever 1h.',
      'Divise en 4 boules. Étale chaque boule en cercle fin.',
      'Mélange za\'atar + 4 c.à.s huile d\'olive = pâte épaisse.',
      'Étale sur chaque cercle de pâte.',
      'Enfourne à 220°C pendant 8 min jusqu\'à doré.'
    ],
    substitutions: [
      { from: 'Za\'atar', to: 'Thym + sumac + sésame + sel (à parts égales)' }
    ],
    coach_note: 'Le petit-déj de Beyrouth. Tu peux préparer le za\'atar maison : thym séché + sumac + sésame + sel.',
    photo_url: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Tzatziki Grec',
    category: 'snacks',
    cuisine: 'mediterranean',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 120,
    total_protein: 8,
    total_carbs: 8,
    total_fat: 6,
    ingredients: [
      { name: 'Yaourt grec épais', qty: '250g' },
      { name: 'Concombre', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Aneth ou menthe', qty: '2 c.à.s' },
      { name: 'Citron', qty: '½' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Râpe le concombre. Sale-le, laisse dégorger 10 min, presse pour enlever l\'eau.',
      'Mélange yaourt avec ail râpé, jus de citron, herbes hachées, sel, poivre.',
      'Ajoute le concombre essoré.',
      'Arrose d\'huile d\'olive.',
      'Sers frais avec pita, légumes, ou en accompagnement.'
    ],
    substitutions: [
      { from: 'Yaourt grec', to: 'Yaourt nature égoutté 30 min dans un linge' }
    ],
    coach_note: 'Le secret c\'est d\'enlever l\'eau du concombre — sinon ça devient liquide.',
    photo_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a8dadc,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Grecque (Horiatiki)',
    category: 'salads',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 320,
    total_protein: 12,
    total_carbs: 18,
    total_fat: 22,
    ingredients: [
      { name: 'Tomates mûres', qty: '3' },
      { name: 'Concombre', qty: '1' },
      { name: 'Oignon rouge', qty: '½' },
      { name: 'Poivron vert', qty: '1' },
      { name: 'Olives noires (kalamata si possible)', qty: '60g' },
      { name: 'Feta', qty: '80g' },
      { name: 'Origan séché', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Vinaigre de vin rouge', qty: '1 c.à.c' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Coupe tomates et concombre en gros morceaux.',
      'Émince finement oignon rouge.',
      'Coupe poivron en lanières.',
      'Dispose dans un saladier avec olives.',
      'Pose la feta en gros bloc ou émiettée par-dessus.',
      'Arrose d\'huile, vinaigre, sel et origan.',
      'NE PAS mélanger — sers tel quel.'
    ],
    substitutions: [
      { from: 'Feta', to: 'Fromage blanc épais ou ricotta salée' }
    ],
    coach_note: 'La vraie salade grecque : pas de salade verte, gros morceaux, feta en bloc. Simple = parfait.',
    photo_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#06a77d)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Souvlaki de Poulet',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 25,
    difficulty: 1,
    total_calories: 420,
    total_protein: 48,
    total_carbs: 8,
    total_fat: 20,
    ingredients: [
      { name: 'Blanc de poulet', qty: '300g' },
      { name: 'Yaourt nature', qty: '3 c.à.s' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Citron', qty: '1' },
      { name: 'Origan séché', qty: '1 c.à.s' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Coupe le poulet en cubes de 3cm.',
      'Marine avec yaourt, ail râpé, jus de citron, origan, huile, sel, poivre.',
      'Laisse mariner minimum 30 min (idéalement 2h).',
      'Enfile sur des piques.',
      'Grille au barbecue ou à la plancha 4 min par côté.',
      'Sers avec tzatziki, pita, salade.'
    ],
    substitutions: [],
    coach_note: 'Brochette grecque classique. 48g de protéines pour 420 kcal — top en cut.',
    photo_url: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Gyros Assiette Complète',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 2,
    total_calories: 620,
    total_protein: 48,
    total_carbs: 52,
    total_fat: 24,
    ingredients: [
      { name: 'Cuisses de poulet désossées', qty: '300g' },
      { name: 'Yaourt grec', qty: '4 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Citron', qty: '1' },
      { name: 'Origan, paprika, cumin', qty: '1 c.à.s de chaque' },
      { name: 'Pita', qty: '2' },
      { name: 'Tomate', qty: '1' },
      { name: 'Oignon rouge', qty: '½' },
      { name: 'Tzatziki maison', qty: '4 c.à.s' },
      { name: 'Frites maison (facultatif)', qty: '100g' }
    ],
    steps: [
      'Marine le poulet 30 min avec yaourt, ail, citron, épices.',
      'Cuis à la poêle ou au four 25 min à 200°C.',
      'Tranche finement.',
      'Réchauffe les pita.',
      'Assemble : pita + poulet + tomate + oignon + tzatziki + frites au choix.',
      'Roule ou sers en assiette.'
    ],
    substitutions: [
      { from: 'Cuisses', to: 'Blancs de poulet' }
    ],
    coach_note: 'Le gyros grec — version maison plus saine que le resto. 48g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Moussaka Aubergine-Bœuf',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 3,
    total_calories: 580,
    total_protein: 32,
    total_carbs: 38,
    total_fat: 32,
    ingredients: [
      { name: 'Aubergines', qty: '3' },
      { name: 'Viande hachée bœuf', qty: '300g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Tomates concassées', qty: '400g' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Lait', qty: '500ml' },
      { name: 'Beurre', qty: '40g' },
      { name: 'Farine', qty: '40g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Fromage râpé', qty: '60g' },
      { name: 'Muscade', qty: '1 pincée' }
    ],
    steps: [
      'Tranche les aubergines en rondelles de 1cm. Sale, dégorge 30 min, sèche.',
      'Fais-les griller au four 20 min à 200°C avec un peu d\'huile.',
      'Fais revenir oignon, ail, viande. Ajoute tomates, cannelle. Mijote 20 min.',
      'Béchamel : beurre + farine, ajoute lait progressivement en fouettant. Hors du feu, ajoute œuf battu, muscade.',
      'Monte le plat : aubergines, viande, aubergines, béchamel, fromage.',
      'Enfourne 40 min à 180°C. Laisse reposer 15 min avant de couper.'
    ],
    substitutions: [
      { from: 'Aubergines', to: 'Courgettes (cuisson plus courte)' }
    ],
    coach_note: 'Plat grec emblématique. Long mais sublime — réchauffé le lendemain c\'est encore meilleur.',
    photo_url: 'https://images.unsplash.com/photo-1625944525533-473e1e6cc4b9?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6a040f,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Spanakopita (Feuilleté Épinards-Feta)',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 50,
    difficulty: 2,
    total_calories: 420,
    total_protein: 18,
    total_carbs: 38,
    total_fat: 22,
    ingredients: [
      { name: 'Pâte filo (ou feuilles de brick)', qty: '8 feuilles' },
      { name: 'Épinards frais', qty: '500g' },
      { name: 'Feta', qty: '150g' },
      { name: 'Œufs', qty: '2' },
      { name: 'Oignon nouveau', qty: '3' },
      { name: 'Aneth ou persil', qty: '½ bouquet' },
      { name: 'Beurre fondu', qty: '50g' },
      { name: 'Muscade', qty: '1 pincée' }
    ],
    steps: [
      'Fais tomber les épinards à la poêle. Laisse refroidir, presse l\'eau, hache.',
      'Mélange épinards avec feta émiettée, œufs battus, oignons nouveaux, herbes, muscade.',
      'Dans un plat beurré, dispose 4 feuilles filo en les beurrant entre chaque.',
      'Étale le mélange épinards.',
      'Recouvre des 4 autres feuilles filo en beurrant.',
      'Coupe en carrés. Enfourne 30 min à 180°C jusqu\'à doré.'
    ],
    substitutions: [
      { from: 'Pâte filo', to: 'Feuilles de brick (algérienne)' }
    ],
    coach_note: 'Tu peux remplacer la pâte filo par des feuilles de brick algériennes. Même résultat.',
    photo_url: 'https://images.unsplash.com/photo-1606851181064-32afd5c34d4a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Yaourt Grec Miel Noix',
    category: 'breakfast',
    cuisine: 'mediterranean',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'sweet',
    prep_time: 5,
    difficulty: 1,
    total_calories: 320,
    total_protein: 22,
    total_carbs: 28,
    total_fat: 12,
    ingredients: [
      { name: 'Yaourt grec 0% ou 2%', qty: '250g' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Noix concassées', qty: '20g' },
      { name: 'Amandes', qty: '10g' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Banane (facultatif)', qty: '1' }
    ],
    steps: [
      'Verse le yaourt dans un bol.',
      'Arrose de miel.',
      'Saupoudre de noix, amandes, cannelle.',
      'Ajoute des rondelles de banane si tu veux plus de glucides.'
    ],
    substitutions: [
      { from: 'Yaourt grec', to: 'Fromage blanc épais' }
    ],
    coach_note: 'Petit-déj méditerranéen 5 minutes. 22g de protéines, parfait pour démarrer.',
    photo_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Kebab d\'Agneau Turc',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 30,
    difficulty: 2,
    total_calories: 580,
    total_protein: 42,
    total_carbs: 12,
    total_fat: 38,
    ingredients: [
      { name: 'Épaule d\'agneau désossée', qty: '300g' },
      { name: 'Yaourt nature', qty: '3 c.à.s' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Cumin', qty: '1 c.à.s' },
      { name: 'Paprika fumé', qty: '1 c.à.c' },
      { name: 'Coriandre en poudre', qty: '1 c.à.c' },
      { name: 'Citron', qty: '1' },
      { name: 'Oignon rouge', qty: '1' },
      { name: 'Sumac (facultatif)', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Coupe l\'agneau en cubes de 3cm.',
      'Marine 1h avec yaourt, ail râpé, jus de citron, toutes les épices, huile.',
      'Enfile sur des piques avec quartiers d\'oignon entre les morceaux.',
      'Grille au barbecue ou plancha 4 min par côté pour rosé à point.',
      'Saupoudre de sumac à la sortie.',
      'Sers avec riz, salade et pain.'
    ],
    substitutions: [
      { from: 'Agneau', to: 'Bœuf en cubes' }
    ],
    coach_note: 'Le yaourt attendrit la viande naturellement. Mariné au moins 1h pour une viande fondante.',
    photo_url: 'https://images.unsplash.com/photo-1602253057119-44d745d9b860?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Köfte Boulettes Turques',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 25,
    difficulty: 1,
    total_calories: 480,
    total_protein: 42,
    total_carbs: 18,
    total_fat: 28,
    ingredients: [
      { name: 'Viande hachée bœuf-agneau', qty: '300g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Chapelure', qty: '2 c.à.s' },
      { name: 'Œuf', qty: '1' },
      { name: 'Sumac (déco)', qty: '1 c.à.c' }
    ],
    steps: [
      'Râpe oignon finement (presse l\'eau).',
      'Mélange viande, oignon, ail haché, persil, œuf, chapelure, épices, sel.',
      'Pétris bien 3 min pour que la viande devienne collante (= boulettes qui tiennent).',
      'Forme des boulettes ovales aplaties.',
      'Cuis à la poêle 4 min par côté ou au grill 6 min par face.',
      'Sers avec riz, salade, yaourt à l\'ail.'
    ],
    substitutions: [
      { from: 'Mélange bœuf-agneau', to: 'Bœuf seul' }
    ],
    coach_note: 'Le secret : pétrir longtemps pour activer les protéines de la viande. C\'est ça qui les rend tendres.',
    photo_url: 'https://images.unsplash.com/photo-1542528180-a1208c5169a5?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Iskender Kebab (Poulet sur Pita)',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 2,
    total_calories: 680,
    total_protein: 48,
    total_carbs: 58,
    total_fat: 26,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Pita', qty: '2' },
      { name: 'Sauce tomate', qty: '200g' },
      { name: 'Beurre', qty: '30g' },
      { name: 'Yaourt nature épais', qty: '150g' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Origan, paprika, cumin', qty: '1 c.à.c chaque' },
      { name: 'Citron', qty: '½' },
      { name: 'Persil', qty: '2 c.à.s' }
    ],
    steps: [
      'Marine le poulet en tranches fines avec ail, citron, épices.',
      'Cuis à la poêle 6 min jusqu\'à doré.',
      'Coupe la pita en cubes, fais-les dorer au four 5 min.',
      'Dans la même poêle, fais chauffer sauce tomate avec un peu d\'origan.',
      'Dans une assiette : pita en cubes au fond, poulet par-dessus, sauce tomate, beurre fondu.',
      'À côté, yaourt épais. Persil sur le tout.'
    ],
    substitutions: [
      { from: 'Pita', to: 'Pain pita ou kesra coupée en dés' }
    ],
    coach_note: 'Iskender — invention turque géniale. Le mélange beurre + sauce tomate + yaourt est dingue.',
    photo_url: 'https://images.unsplash.com/photo-1606851181064-32afd5c34d4a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Lahmacun (Pizza Turque)',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 2,
    total_calories: 480,
    total_protein: 22,
    total_carbs: 58,
    total_fat: 18,
    ingredients: [
      { name: 'Pâte à pizza', qty: '300g (4 petites)' },
      { name: 'Viande hachée', qty: '200g' },
      { name: 'Tomate', qty: '1' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Poivron rouge', qty: '½' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Cumin, paprika, piment doux', qty: '1 c.à.c chaque' },
      { name: 'Citron', qty: '1' }
    ],
    steps: [
      'Mixe finement tomate, oignon, ail, poivron, persil.',
      'Mélange avec la viande, épices, sel.',
      'Étale 4 disques de pâte très fins.',
      'Étale une fine couche de viande sur chaque disque (la pâte doit rester visible par endroits).',
      'Enfourne 10 min à 250°C.',
      'Sers avec quartiers de citron à presser dessus.'
    ],
    substitutions: [
      { from: 'Pâte à pizza', to: 'Tortillas fines (cuisson plus courte)' }
    ],
    coach_note: 'Pizza turque ultra-fine, comme du papier. Tu la roules en cornet et tu la manges en marchant.',
    photo_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Soupe Mercimek (Lentilles Rouges)',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 1,
    total_calories: 320,
    total_protein: 18,
    total_carbs: 48,
    total_fat: 6,
    ingredients: [
      { name: 'Lentilles rouges (corail)', qty: '200g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Carotte', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Concentré de tomate', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Menthe séchée', qty: '½ c.à.c' },
      { name: 'Bouillon', qty: '1L' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Fais revenir oignon haché, ail, carotte en dés.',
      'Ajoute lentilles, concentré tomate, épices. Mélange 1 min.',
      'Verse le bouillon. Mijote 25 min jusqu\'à ce que les lentilles se défassent.',
      'Mixe pour obtenir une soupe lisse (ou laisse texturée selon préférence).',
      'Sers avec menthe séchée, quartiers de citron à presser dessus.'
    ],
    substitutions: [
      { from: 'Lentilles rouges', to: 'Lentilles vertes (cuisson plus longue)' }
    ],
    coach_note: 'Soupe turque classique des restos. 18g de protéines végétales pour 320 kcal. Top en cut.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Dolmas Feuilles de Vigne',
    category: 'snacks',
    cuisine: 'mediterranean',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 80,
    difficulty: 3,
    total_calories: 280,
    total_protein: 8,
    total_carbs: 38,
    total_fat: 10,
    ingredients: [
      { name: 'Feuilles de vigne en saumure', qty: '30 feuilles' },
      { name: 'Riz', qty: '150g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Menthe fraîche', qty: '10 feuilles' },
      { name: 'Citron', qty: '2' },
      { name: 'Huile d\'olive', qty: '4 c.à.s' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Pignons de pin', qty: '30g' }
    ],
    steps: [
      'Rince les feuilles à l\'eau froide pour enlever le sel.',
      'Mélange riz cru, oignon haché, herbes, pignons, cannelle, sel, jus d\'1 citron, 2 c.à.s huile.',
      'Pose une feuille à plat, mets 1 c.à.c de farce, replie côtés puis roule serré.',
      'Range serré dans une casserole, en couches.',
      'Couvre d\'eau, du reste d\'huile et de jus de citron. Pose une assiette dessus pour maintenir.',
      'Cuis 45 min à feu doux.',
      'Sers chaud ou froid avec yaourt.'
    ],
    substitutions: [
      { from: 'Feuilles de vigne', to: 'Feuilles de chou blanchies' }
    ],
    coach_note: 'Tu trouves les feuilles de vigne en bocal au Carrefour. Long mais addictif — on en mange 5 d\'affilée.',
    photo_url: 'https://images.unsplash.com/photo-1606851181064-32afd5c34d4a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Gazpacho Andalou',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 180,
    total_protein: 4,
    total_carbs: 22,
    total_fat: 8,
    ingredients: [
      { name: 'Tomates mûres', qty: '6' },
      { name: 'Concombre', qty: '1' },
      { name: 'Poivron rouge', qty: '½' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Pain rassis trempé', qty: '2 tranches' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Vinaigre de xérès ou rouge', qty: '1 c.à.s' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Mixe tous les ingrédients ensemble jusqu\'à très lisse.',
      'Filtre dans une passoire fine (facultatif mais ça donne une texture velours).',
      'Goûte, ajuste sel, vinaigre, huile.',
      'Réfrigère au moins 1h.',
      'Sers très froid avec dés de concombre, croutons sur le dessus.'
    ],
    substitutions: [
      { from: 'Vinaigre de xérès', to: 'Vinaigre de vin rouge' }
    ],
    coach_note: 'Soupe espagnole froide pour les chaleurs algériennes. Hydratant, frais, et seulement 180 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1606851181064-32afd5c34d4a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#a8dadc)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Paella Valenciana Light',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 50,
    difficulty: 2,
    total_calories: 540,
    total_protein: 38,
    total_carbs: 62,
    total_fat: 14,
    ingredients: [
      { name: 'Riz rond (paella) ou riz arborio', qty: '200g' },
      { name: 'Blanc de poulet', qty: '150g' },
      { name: 'Crevettes', qty: '100g' },
      { name: 'Moules nettoyées (facultatif)', qty: '150g' },
      { name: 'Tomate', qty: '1' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Poivron rouge', qty: '½' },
      { name: 'Petits pois', qty: '80g' },
      { name: 'Safran ou curcuma', qty: '1 pincée' },
      { name: 'Paprika fumé', qty: '1 c.à.c' },
      { name: 'Bouillon de volaille chaud', qty: '500ml' },
      { name: 'Citron', qty: '1' }
    ],
    steps: [
      'Fais dorer le poulet en morceaux dans une grande poêle (ou paellera).',
      'Ajoute oignon, ail, poivron. Cuis 5 min.',
      'Ajoute tomate râpée, paprika, safran. Cuis 3 min.',
      'Verse le riz, mélange 1 min.',
      'Ajoute le bouillon chaud. Sale.',
      'NE PLUS MÉLANGER. Laisse cuire 18 min à feu doux.',
      'Aux 5 dernières min, ajoute crevettes, moules, petits pois.',
      'Repose 5 min hors du feu, sers avec citron.'
    ],
    substitutions: [
      { from: 'Safran', to: 'Curcuma + paprika' }
    ],
    coach_note: 'La règle d\'or de la paella : ne JAMAIS mélanger le riz une fois le bouillon ajouté. C\'est ça qui crée le socarrat (croûte) du dessous.',
    photo_url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#bb3e03)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Tortilla Espagnole (Omelette Patate)',
    category: 'main_meals',
    cuisine: 'mediterranean',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 2,
    total_calories: 420,
    total_protein: 18,
    total_carbs: 38,
    total_fat: 22,
    ingredients: [
      { name: 'Pommes de terre', qty: '400g' },
      { name: 'Oignon', qty: '1 grand' },
      { name: 'Œufs', qty: '5' },
      { name: 'Huile d\'olive', qty: '5 c.à.s' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Pèle et tranche les patates en rondelles fines.',
      'Émince l\'oignon.',
      'Fais cuire patates + oignon dans l\'huile à feu moyen, couvert, 15 min jusqu\'à fondantes (sans dorer).',
      'Égoutte (garde l\'huile pour une autre fois).',
      'Bats les œufs, mélange avec patates-oignon. Sale.',
      'Verse dans une poêle bien chaude avec 1 c.à.s huile.',
      'Cuis 4 min à feu moyen. Retourne avec une grande assiette.',
      'Glisse à nouveau dans la poêle, cuis 3 min de l\'autre côté.'
    ],
    substitutions: [],
    coach_note: 'Le geste de retourner la tortilla est intimidant mais c\'est ça la fierté espagnole. Sers tiède ou froide.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Baklava Léger aux Pistaches',
    category: 'desserts',
    cuisine: 'mediterranean',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 60,
    difficulty: 2,
    total_calories: 320,
    total_protein: 6,
    total_carbs: 38,
    total_fat: 18,
    ingredients: [
      { name: 'Pâte filo (ou feuilles de brick)', qty: '12 feuilles' },
      { name: 'Pistaches non salées', qty: '150g' },
      { name: 'Beurre fondu', qty: '60g' },
      { name: 'Miel', qty: '4 c.à.s' },
      { name: 'Eau de fleur d\'oranger', qty: '1 c.à.s' },
      { name: 'Cannelle', qty: '½ c.à.c' }
    ],
    steps: [
      'Mixe les pistaches en poudre grossière, mélange avec cannelle.',
      'Dans un plat beurré, dispose 6 feuilles filo en beurrant entre chaque.',
      'Étale la moitié des pistaches.',
      'Couvre de 3 feuilles filo beurrées, étale le reste des pistaches.',
      'Termine par 3 feuilles filo beurrées.',
      'Pré-coupe en losanges. Enfourne 30 min à 180°C jusqu\'à doré.',
      'À la sortie, arrose de miel + eau de fleur d\'oranger.',
      'Laisse imprégner au moins 2h avant de servir.'
    ],
    substitutions: [
      { from: 'Pistaches', to: 'Noix ou amandes' }
    ],
    coach_note: 'Version avec miel au lieu de sirop de sucre = un peu plus léger. Reste un dessert riche, à savourer en petite portion.',
    photo_url: 'https://images.unsplash.com/photo-1625938145744-e380515399b7?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#588157)',
    membership_required: 'cookbook',
    featured: false
  }
]

console.log(`Seeding ${recipes.length} Mediterranean recipes...`)

let success = 0
let failed = 0

for (const r of recipes) {
  const { error } = await sb.from('cookbook_recipes').insert(r)
  if (error) {
    console.error(`❌ ${r.title}:`, error.message)
    failed++
  } else {
    console.log(`✓ ${r.title}`)
    success++
  }
}

console.log(`\n✨ Done. ${success} inserted, ${failed} failed.`)
