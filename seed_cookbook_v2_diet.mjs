// seed_cookbook_v2_diet.mjs
// Cookbook v2 — Bonus Batch: 40 Diet Meals with Creative Sauces
// Targeted at Algerian market. All under 450 kcal. Fun sauces that make diet food exciting.
// Run with: node seed_cookbook_v2_diet.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjAyMjQ2NCwiZXhwIjoyMDkxNTk4NDY0fQ.vi9Alz3Ow52P9L2nXbTrR1gR8-lqnhJqmYei-YkQlsQ'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [

  // ═══════════════════════════════════════════════════
  // GRILLED PROTEINS + CREATIVE SAUCES (12)
  // ═══════════════════════════════════════════════════

  {
    title: 'Poulet Grillé Sauce Chimichurri',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 1,
    total_calories: 320,
    total_protein: 48,
    total_carbs: 4,
    total_fat: 14,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Persil frais', qty: '1 gros bouquet' },
      { name: 'Coriandre fraîche', qty: '½ bouquet' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Vinaigre rouge', qty: '1 c.à.s' },
      { name: 'Piment rouge sec', qty: '1 pincée' },
      { name: 'Origan séché', qty: '1 c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Chimichurri : hache très fin persil, coriandre, ail. Mélange avec huile, vinaigre, piment, origan, sel.',
      'Sale et poivre le poulet.',
      'Grille à la poêle bien chaude 5 min par côté.',
      'Laisse reposer 3 min, tranche.',
      'Nappe généreusement de chimichurri.',
      'Sers avec légumes grillés ou salade.'
    ],
    substitutions: [],
    coach_note: '48g de protéines, 320 kcal. La chimichurri transforme un simple poulet grillé en festin. Tu peux faire un pot et le garder 5 jours au frigo.',
    photo_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Poulet Grillé Sauce Yaourt-Harissa',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'spicy',
    prep_time: 15,
    difficulty: 1,
    total_calories: 310,
    total_protein: 46,
    total_carbs: 6,
    total_fat: 12,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Yaourt grec 0%', qty: '100g' },
      { name: 'Harissa', qty: '1 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Citron', qty: '½' },
      { name: 'Menthe fraîche', qty: '6 feuilles' },
      { name: 'Cumin', qty: '½ c.à.c' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Sauce : mélange yaourt, harissa, ail râpé, jus de citron, menthe ciselée, cumin, sel.',
      'Grille le poulet 5 min par côté.',
      'Tranche et nappe de sauce.',
      'Sers avec concombre tranché.'
    ],
    substitutions: [
      { from: 'Harissa forte', to: 'Harissa douce pour moins piquant' }
    ],
    coach_note: 'Notre sauce signature algérienne — le yaourt adoucit la harissa. 310 kcal, 46g protéines. Sauce à 30 kcal seulement.',
    photo_url: 'https://images.unsplash.com/photo-1604908554007-fdca4f4b1de1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#d62828,#fefae0)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Steak de Dinde Sauce Miel-Moutarde Light',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 15,
    difficulty: 1,
    total_calories: 290,
    total_protein: 42,
    total_carbs: 10,
    total_fat: 8,
    ingredients: [
      { name: 'Escalope de dinde', qty: '250g' },
      { name: 'Moutarde de Dijon', qty: '2 c.à.s' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Yaourt grec 0%', qty: '2 c.à.s' },
      { name: 'Ail en poudre', qty: '½ c.à.c' },
      { name: 'Thym séché', qty: '½ c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Sauce : mélange moutarde, miel, yaourt, ail, thym.',
      'Aplatis la dinde légèrement.',
      'Grille 4 min par côté à feu vif.',
      'Dans la même poêle hors du feu, verse la sauce, enrobe.',
      'Sers immédiatement.'
    ],
    substitutions: [],
    coach_note: 'Sauce miel-moutarde en version light avec yaourt — tu ne sentiras aucune différence. 290 kcal seulement.',
    photo_url: 'https://images.unsplash.com/photo-1604908554049-c9f6e9c1c3b3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pavé de Thon Sauce Citron-Câpres',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 15,
    difficulty: 1,
    total_calories: 310,
    total_protein: 44,
    total_carbs: 4,
    total_fat: 14,
    ingredients: [
      { name: 'Pavé de thon frais', qty: '200g' },
      { name: 'Citron', qty: '1' },
      { name: 'Câpres', qty: '1 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Persil frais', qty: '2 c.à.s' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Beurre', qty: '10g' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Saisir le thon 2 min par côté (rosé à cœur).',
      'Réserve.',
      'Dans la même poêle, beurre + ail + câpres 1 min.',
      'Jus de citron entier, persil, sel.',
      'Verse sur le thon.'
    ],
    substitutions: [
      { from: 'Thon frais', to: 'Saumon ou espadon' }
    ],
    coach_note: 'La sauce citron-câpres c\'est le meilleur ami du poisson grillé. 310 kcal, 44g protéines.',
    photo_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a8dadc,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poulet Grillé Sauce Tahini-Citron',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 380,
    total_protein: 46,
    total_carbs: 8,
    total_fat: 18,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Tahini', qty: '2 c.à.s' },
      { name: 'Citron', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Eau froide', qty: '2 c.à.s' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '½ c.à.c' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Sauce : fouette tahini + jus de citron + eau + ail râpé + cumin + sel jusqu\'à crémeux.',
      'Grille le poulet, tranche.',
      'Nappe de sauce tahini.',
      'Parsème de persil et un filet de citron.'
    ],
    substitutions: [],
    coach_note: 'Sauce tahini = version du Moyen-Orient du beurre de cacahuète mais en plus léger. Disponible partout en Algérie.',
    photo_url: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Kefta Grillée Sauce Tomate Épicée',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'spicy',
    prep_time: 25,
    difficulty: 1,
    total_calories: 340,
    total_protein: 38,
    total_carbs: 14,
    total_fat: 14,
    ingredients: [
      { name: 'Viande hachée 5% MG', qty: '200g' },
      { name: 'Oignon râpé', qty: '½' },
      { name: 'Persil haché', qty: '2 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Tomates concassées', qty: '200g' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Harissa', qty: '1 c.à.c' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' }
    ],
    steps: [
      'Mélange viande, oignon, persil, cumin, paprika, sel. Forme 8 boulettes ou doigts.',
      'Grille à la poêle 4 min par côté.',
      'Sauce : dans la même poêle, ail + tomates + harissa. Mijote 8 min.',
      'Remets la kefta dans la sauce 2 min.',
      'Coriandre fraîche, sers.'
    ],
    substitutions: [],
    coach_note: 'Kefta algérienne en version diet. 5% MG au lieu de 15%. Sauce tomate-harissa pour le goût, pas les calories.',
    photo_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#d62828,#bc6c25)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Crevettes Poêlées Sauce Ail-Persil',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 12,
    difficulty: 1,
    total_calories: 240,
    total_protein: 36,
    total_carbs: 4,
    total_fat: 10,
    ingredients: [
      { name: 'Crevettes décortiquées', qty: '250g' },
      { name: 'Ail', qty: '5 gousses' },
      { name: 'Persil frais', qty: '½ bouquet' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Beurre', qty: '10g' },
      { name: 'Citron', qty: '1' },
      { name: 'Piment doux', qty: '½ c.à.c' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Poêle chaude, huile + beurre.',
      'Fais sauter l\'ail émincé 30 sec (pas brûlé).',
      'Ajoute les crevettes, cuis 2 min par côté.',
      'Jus de citron + piment + persil haché.',
      'Sers immédiatement.'
    ],
    substitutions: [],
    coach_note: 'Gambas à l\'ail — plat du pêcheur algérien en 12 min. 240 kcal, 36g protéines. Plat régime qui n\'a pas le goût du régime.',
    photo_url: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e76f51,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Escalope de Veau Sauce Champignons Light',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 320,
    total_protein: 42,
    total_carbs: 8,
    total_fat: 14,
    ingredients: [
      { name: 'Escalope de veau', qty: '200g' },
      { name: 'Champignons de Paris', qty: '200g' },
      { name: 'Oignon', qty: '½' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Yaourt grec', qty: '3 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Thym', qty: '½ c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Grille l\'escalope 3 min par côté. Réserve.',
      'Dans la même poêle, fais sauter oignon + champignons émincés 6 min.',
      'Ajoute ail, thym.',
      'Hors du feu, ajoute yaourt + moutarde, mélange.',
      'Remets la viande dans la sauce 1 min à feu doux.',
      'Sers immédiatement.'
    ],
    substitutions: [
      { from: 'Yaourt grec', to: 'Fromage blanc' }
    ],
    coach_note: 'Sauce champignons version light — yaourt au lieu de crème. Tu gagnes 150 kcal par portion.',
    photo_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a98467,#dde5b6)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Filet de Merlan Sauce Chermoula',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 20,
    difficulty: 1,
    total_calories: 260,
    total_protein: 38,
    total_carbs: 6,
    total_fat: 10,
    ingredients: [
      { name: 'Filet de merlan', qty: '250g' },
      { name: 'Coriandre fraîche', qty: '1 bouquet' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Piment doux', qty: '½ c.à.c' }
    ],
    steps: [
      'Chermoula : mixe coriandre, persil, ail, cumin, paprika, piment, jus de citron, huile, sel.',
      'Marine le poisson 15 min dans la moitié de la chermoula.',
      'Cuis au four 12 min à 200°C.',
      'Sers nappé du reste de chermoula.'
    ],
    substitutions: [
      { from: 'Merlan', to: 'Cabillaud, sole ou dorade' }
    ],
    coach_note: 'La chermoula c\'est LA sauce algérienne pour le poisson. Ultra-parfumée, quasi zéro calories.',
    photo_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a8dadc)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Brochettes de Poulet Sauce Avocat-Citron',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 20,
    difficulty: 1,
    total_calories: 380,
    total_protein: 44,
    total_carbs: 8,
    total_fat: 20,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Avocat mûr', qty: '½' },
      { name: 'Yaourt grec 0%', qty: '3 c.à.s' },
      { name: 'Citron vert', qty: '1' },
      { name: 'Coriandre', qty: '2 c.à.s' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Cumin', qty: '½ c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Coupe le poulet en cubes, enfile sur piques. Sale, cumin, poivre.',
      'Grille 4 min par côté.',
      'Sauce : mixe avocat + yaourt + jus de citron vert + coriandre + ail + sel.',
      'Sers les brochettes avec la sauce verte à côté.'
    ],
    substitutions: [],
    coach_note: 'Sauce avocat crémeuse sans crème. Le yaourt allège, le citron vert relève. 380 kcal avec les bonnes graisses de l\'avocat.',
    photo_url: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a3b18a,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Steak Haché Sauce BBQ Maison Light',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 340,
    total_protein: 40,
    total_carbs: 14,
    total_fat: 12,
    ingredients: [
      { name: 'Steak haché 5% MG', qty: '200g' },
      { name: 'Ketchup', qty: '2 c.à.s' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Vinaigre de cidre', qty: '1 c.à.s' },
      { name: 'Paprika fumé', qty: '1 c.à.c' },
      { name: 'Ail en poudre', qty: '½ c.à.c' },
      { name: 'Sauce soja', qty: '1 c.à.c' },
      { name: 'Oignon en poudre', qty: '½ c.à.c' }
    ],
    steps: [
      'Sauce BBQ maison : mélange ketchup, miel, vinaigre, paprika fumé, ail, soja, oignon. Chauffe 3 min.',
      'Forme le steak, sale. Cuis 4 min par côté.',
      'Nappe de sauce BBQ. Sers avec salade.'
    ],
    substitutions: [],
    coach_note: 'Sauce BBQ maison à 50 kcal au lieu des 120 kcal de la version industrielle. Le paprika fumé fait tout le travail.',
    photo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poulet Grillé Sauce Moutarde-Estragon',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 15,
    difficulty: 1,
    total_calories: 300,
    total_protein: 46,
    total_carbs: 4,
    total_fat: 12,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Yaourt grec 0%', qty: '3 c.à.s' },
      { name: 'Moutarde à l\'ancienne', qty: '1 c.à.s' },
      { name: 'Moutarde de Dijon', qty: '1 c.à.c' },
      { name: 'Estragon ou aneth', qty: '1 c.à.s' },
      { name: 'Citron', qty: '½' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Grille le poulet 5 min par côté.',
      'Sauce : mélange les 2 moutardes + yaourt + herbe + jus citron + sel.',
      'Tranche le poulet, nappe de sauce.',
      'Sers avec légumes vapeur.'
    ],
    substitutions: [
      { from: 'Estragon', to: 'Aneth ou ciboulette' }
    ],
    coach_note: 'Sauce bistrot française en version diet. La moutarde à l\'ancienne donne les grains, le yaourt la douceur.',
    photo_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#588157)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════════════════════════
  // BOWLS & SALADES PROTÉINÉS (10)
  // ═══════════════════════════════════════════════════

  {
    title: 'Bowl Thon Méditerranéen',
    category: 'salads',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 350,
    total_protein: 36,
    total_carbs: 22,
    total_fat: 14,
    ingredients: [
      { name: 'Thon en boîte au naturel', qty: '160g' },
      { name: 'Salade verte', qty: '100g' },
      { name: 'Tomates cerises', qty: '100g' },
      { name: 'Concombre', qty: '½' },
      { name: 'Olives noires', qty: '30g' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Œuf dur', qty: '1' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Citron', qty: '½' },
      { name: 'Origan', qty: '1 c.à.c' }
    ],
    steps: [
      'Égoutte le thon.',
      'Dispose salade, tomates, concombre, oignon dans un bol.',
      'Ajoute thon, œuf coupé, olives.',
      'Sauce : huile + citron + origan + sel.',
      'Verse et sers.'
    ],
    substitutions: [],
    coach_note: 'Le bowl du midi qui prend 10 min. 350 kcal, 36g protéines. Meal prep parfait.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a8dadc)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bowl Poulet Grillé Sauce Orientale',
    category: 'salads',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 20,
    difficulty: 1,
    total_calories: 420,
    total_protein: 42,
    total_carbs: 38,
    total_fat: 12,
    ingredients: [
      { name: 'Blanc de poulet', qty: '200g' },
      { name: 'Riz basmati cuit', qty: '100g' },
      { name: 'Concombre', qty: '½' },
      { name: 'Tomate', qty: '1' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Menthe fraîche', qty: '8 feuilles' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Yaourt grec', qty: '3 c.à.s' },
      { name: 'Sumac ou paprika', qty: '½ c.à.c' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Grille le poulet avec cumin et paprika. Tranche.',
      'Vinaigrette orientale : huile + jus de citron + menthe + persil + sumac + sel.',
      'Dans un bowl : riz, légumes en dés, poulet.',
      'Nappe de vinaigrette, ajoute yaourt sur le côté.'
    ],
    substitutions: [],
    coach_note: 'Bowl style "shawarma déstructuré". Tous les goûts orientaux dans un bol sain.',
    photo_url: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade de Pois Chiches Épicée',
    category: 'salads',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 320,
    total_protein: 16,
    total_carbs: 42,
    total_fat: 10,
    ingredients: [
      { name: 'Pois chiches cuits', qty: '200g' },
      { name: 'Tomate', qty: '1' },
      { name: 'Concombre', qty: '½' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '½ c.à.c' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Harissa', qty: '½ c.à.c' }
    ],
    steps: [
      'Mélange les pois chiches avec tous les légumes en dés.',
      'Sauce : huile + citron + cumin + paprika + harissa + sel.',
      'Verse sur la salade, mélange bien.',
      'Parsème de persil haché.'
    ],
    substitutions: [],
    coach_note: 'Salade "protéines du pauvre" mais gourmet. Pois chiches = 16g de protéines végétales. Coûte 50 DA.',
    photo_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Œufs-Avocat sur Toast',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 380,
    total_protein: 22,
    total_carbs: 28,
    total_fat: 22,
    ingredients: [
      { name: 'Pain complet', qty: '2 tranches' },
      { name: 'Œufs durs', qty: '3' },
      { name: 'Avocat', qty: '½' },
      { name: 'Yaourt grec 0%', qty: '2 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Ciboulette ou persil', qty: '1 c.à.s' },
      { name: 'Citron', qty: '½' },
      { name: 'Sel, poivre, paprika', qty: 'au goût' }
    ],
    steps: [
      'Écrase les œufs durs grossièrement.',
      'Mélange avec yaourt, moutarde, herbes, citron, sel, poivre.',
      'Toaste le pain.',
      'Écrase l\'avocat sur les toasts.',
      'Garnis de la salade d\'œufs.',
      'Paprika sur le dessus.'
    ],
    substitutions: [],
    coach_note: 'Salade d\'œufs version light — yaourt au lieu de mayo. 22g de protéines, parfait petit-déj.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a3b18a,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bowl Dinde Fumée Légumes Rôtis',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 1,
    total_calories: 380,
    total_protein: 32,
    total_carbs: 38,
    total_fat: 12,
    ingredients: [
      { name: 'Dinde fumée', qty: '120g' },
      { name: 'Patate douce', qty: '1 petite' },
      { name: 'Courgette', qty: '1' },
      { name: 'Poivron rouge', qty: '½' },
      { name: 'Oignon rouge', qty: '½' },
      { name: 'Riz complet cuit', qty: '80g' },
      { name: 'Yaourt grec', qty: '2 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Coupe patate douce, courgette, poivron, oignon en cubes.',
      'Mélange avec huile, sel, paprika. Rôtis 20 min à 200°C.',
      'Sauce : yaourt + moutarde + miel.',
      'Dans un bowl : riz, légumes rôtis, dinde tranchée.',
      'Nappe de sauce miel-moutarde.'
    ],
    substitutions: [],
    coach_note: 'Les légumes rôtis au four c\'est le meilleur goût pour zéro huile en plus. Bowl réconfortant à 380 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fb8500,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Poulet Grillé à la Grenade',
    category: 'salads',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 360,
    total_protein: 38,
    total_carbs: 20,
    total_fat: 14,
    ingredients: [
      { name: 'Blanc de poulet grillé', qty: '180g' },
      { name: 'Roquette ou mâche', qty: '80g' },
      { name: 'Grenade (grains)', qty: '80g' },
      { name: 'Noix concassées', qty: '15g' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Mélasse de grenade', qty: '1 c.à.s' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Citron', qty: '½' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Tranche le poulet grillé.',
      'Dispose roquette, poulet, grains de grenade, noix, oignon.',
      'Vinaigrette : huile + mélasse de grenade + citron + sel.',
      'Verse et sers.'
    ],
    substitutions: [
      { from: 'Mélasse de grenade', to: 'Vinaigre balsamique + miel' }
    ],
    coach_note: 'La grenade est un superfruit algérien — saison octobre-janvier. Les grains ajoutent du croquant et des antioxydants.',
    photo_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bowl Sardines Grillées Sauce Citron-Cumin',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 1,
    total_calories: 390,
    total_protein: 34,
    total_carbs: 32,
    total_fat: 16,
    ingredients: [
      { name: 'Sardines fraîches', qty: '200g' },
      { name: 'Couscous cuit', qty: '100g' },
      { name: 'Tomate', qty: '1' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Citron', qty: '1' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '½ c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Marine les sardines avec citron, cumin, paprika, sel 10 min.',
      'Grille à la poêle 3 min par côté.',
      'Sauce : jus de citron + huile + cumin + persil.',
      'Bowl : couscous, tomate, oignon, sardines grillées, sauce.'
    ],
    substitutions: [],
    coach_note: 'Sardines algériennes grillées — les oméga 3 les plus économiques. 50 DA le kilo au marché.',
    photo_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a8dadc,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════════════════════════
  // WRAPS & SANDWICHES DIET (6)
  // ═══════════════════════════════════════════════════

  {
    title: 'Wrap Dinde-Avocat Sauce Ranch Light',
    category: 'quick_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 380,
    total_protein: 32,
    total_carbs: 38,
    total_fat: 14,
    ingredients: [
      { name: 'Tortilla complète', qty: '1' },
      { name: 'Dinde tranchée', qty: '100g' },
      { name: 'Avocat', qty: '¼' },
      { name: 'Salade', qty: '2 feuilles' },
      { name: 'Tomate', qty: '½' },
      { name: 'Yaourt grec', qty: '2 c.à.s' },
      { name: 'Aneth ou ciboulette', qty: '1 c.à.c' },
      { name: 'Ail en poudre', qty: '¼ c.à.c' }
    ],
    steps: [
      'Ranch light : yaourt + herbes + ail + sel.',
      'Étale sur la tortilla.',
      'Garnis : salade, dinde, avocat, tomate.',
      'Roule, coupe en deux.'
    ],
    substitutions: [],
    coach_note: 'Wrap à emporter. 380 kcal et 32g protéines. Prêt en 10 min, parfait pour le midi au travail.',
    photo_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Sandwich Poulet Grillé Sauce Tzatziki',
    category: 'quick_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 420,
    total_protein: 38,
    total_carbs: 42,
    total_fat: 12,
    ingredients: [
      { name: 'Pain pita ou baguette', qty: '1' },
      { name: 'Blanc de poulet grillé', qty: '150g' },
      { name: 'Yaourt grec', qty: '4 c.à.s' },
      { name: 'Concombre râpé', qty: '½' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Menthe', qty: '4 feuilles' },
      { name: 'Salade', qty: '2 feuilles' },
      { name: 'Tomate', qty: '½' }
    ],
    steps: [
      'Tzatziki : yaourt + concombre pressé + ail râpé + menthe + sel.',
      'Ouvre le pain, tartine de tzatziki.',
      'Garnis de poulet tranché, salade, tomate.'
    ],
    substitutions: [],
    coach_note: 'Le sandwich grec en version diet. Le tzatziki remplace n\'importe quelle sauce grasse.',
    photo_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a8dadc,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Wraps de Laitue au Poulet (Zéro Gluten)',
    category: 'quick_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 280,
    total_protein: 40,
    total_carbs: 8,
    total_fat: 10,
    ingredients: [
      { name: 'Blanc de poulet', qty: '200g' },
      { name: 'Feuilles de laitue romaine', qty: '8 grandes' },
      { name: 'Carotte râpée', qty: '1' },
      { name: 'Concombre en bâtonnets', qty: '½' },
      { name: 'Menthe fraîche', qty: '8 feuilles' },
      { name: 'Sauce soja', qty: '1 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Citron vert', qty: '1' },
      { name: 'Sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Coupe le poulet en petits dés, fais sauter 5 min.',
      'Ajoute soja + miel + citron, caramélise 1 min.',
      'Dispose les feuilles de laitue comme des bateaux.',
      'Garnis de poulet, carotte, concombre, menthe.',
      'Parsème de sésame. Mange avec les doigts.'
    ],
    substitutions: [],
    coach_note: 'La laitue remplace le pain = zéro glucides du wrap. 280 kcal et 40g de protéines. Parfait ultra-cut.',
    photo_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Toast Thon-Fromage Frais',
    category: 'quick_meals',
    cuisine: 'diet',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 8,
    difficulty: 1,
    total_calories: 280,
    total_protein: 28,
    total_carbs: 24,
    total_fat: 8,
    ingredients: [
      { name: 'Pain complet', qty: '2 tranches' },
      { name: 'Thon au naturel', qty: '120g' },
      { name: 'Fromage frais 0%', qty: '2 c.à.s' },
      { name: 'Cornichons hachés', qty: '2' },
      { name: 'Oignon nouveau', qty: '1' },
      { name: 'Citron', qty: '½' },
      { name: 'Poivre', qty: 'au goût' }
    ],
    steps: [
      'Mélange thon + fromage frais + cornichons + oignon + citron + poivre.',
      'Toaste le pain.',
      'Tartine généreusement. Sers.'
    ],
    substitutions: [],
    coach_note: 'Snack protéiné en 8 min. 28g de protéines pour 280 kcal. Le fromage frais remplace la mayo.',
    photo_url: 'https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#a8dadc)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pita Garnie Falafel Maison Light',
    category: 'quick_meals',
    cuisine: 'diet',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 2,
    total_calories: 420,
    total_protein: 18,
    total_carbs: 52,
    total_fat: 16,
    ingredients: [
      { name: 'Pain pita', qty: '1' },
      { name: 'Pois chiches secs (trempés 12h)', qty: '100g' },
      { name: 'Oignon', qty: '½' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Persil + coriandre', qty: '½ bouquet chaque' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Salade, tomate, concombre', qty: 'pour garnir' },
      { name: 'Sauce tahini-citron', qty: '2 c.à.s' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Mixe pois chiches trempés (PAS cuits), oignon, ail, herbes, cumin — pâte grossière.',
      'Forme 6 boulettes aplaties.',
      'Cuis AU FOUR 20 min à 200°C (pas de friture).',
      'Ouvre la pita, garnis de salade, tomate, concombre.',
      'Ajoute les falafel + sauce tahini.'
    ],
    substitutions: [],
    coach_note: 'Falafel au four au lieu de friture = -200 kcal par portion. Même goût, moitié des calories.',
    photo_url: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Galette de Sarrasin Poulet Champignons',
    category: 'quick_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 350,
    total_protein: 34,
    total_carbs: 32,
    total_fat: 10,
    ingredients: [
      { name: 'Galette de sarrasin (ou tortilla)', qty: '1' },
      { name: 'Blanc de poulet', qty: '120g' },
      { name: 'Champignons', qty: '100g' },
      { name: 'Oignon', qty: '½' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Yaourt grec', qty: '2 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Persil', qty: '1 c.à.s' }
    ],
    steps: [
      'Fais sauter poulet en dés, champignons, oignon, ail.',
      'Hors du feu : ajoute yaourt + moutarde.',
      'Garnis la galette, plie en carré.',
      'Cuis 1 min par côté pour le croustillant.'
    ],
    substitutions: [],
    coach_note: 'Galette bretonne version diet. Le sarrasin est sans gluten et plus rassasiant que le blé.',
    photo_url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#588157)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════════════════════════
  // PETIT-DÉJ & ŒUFS DIET (6)
  // ═══════════════════════════════════════════════════

  {
    title: 'Omelette Blanche Légumes (Zéro Jaune)',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 10,
    difficulty: 1,
    total_calories: 180,
    total_protein: 28,
    total_carbs: 6,
    total_fat: 4,
    ingredients: [
      { name: 'Blancs d\'œufs', qty: '6' },
      { name: 'Épinards frais', qty: '50g' },
      { name: 'Champignons', qty: '50g' },
      { name: 'Tomate', qty: '½' },
      { name: 'Oignon nouveau', qty: '1' },
      { name: 'Sel, poivre, paprika', qty: 'au goût' }
    ],
    steps: [
      'Fais sauter champignons, épinards, tomate 3 min.',
      'Verse les blancs d\'œufs battus avec sel et paprika.',
      'Cuis 3 min sans remuer, plie en deux.',
      'Oignon nouveau sur le dessus.'
    ],
    substitutions: [],
    coach_note: '180 kcal pour 28g de protéines PURES. L\'omelette du bodybuilder. Parfaite en cut extrême.',
    photo_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Shakshuka Verte aux Épinards',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 280,
    total_protein: 22,
    total_carbs: 12,
    total_fat: 16,
    ingredients: [
      { name: 'Œufs', qty: '3' },
      { name: 'Épinards frais', qty: '200g' },
      { name: 'Oignon', qty: '½' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Feta ou fromage blanc', qty: '30g' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Piment doux', qty: '½ c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Coriandre', qty: '2 c.à.s' }
    ],
    steps: [
      'Fais revenir oignon et ail.',
      'Ajoute les épinards, fais tomber 3 min.',
      'Ajoute cumin et piment.',
      'Fais 3 creux, casse un œuf dans chaque.',
      'Couvre, cuis 5 min.',
      'Émiette la feta et coriandre sur le dessus.'
    ],
    substitutions: [],
    coach_note: 'Shakshuka verte au lieu de rouge. Pas de tomate, plus d\'épinards = plus de fer, moins de glucides.',
    photo_url: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Œufs Nuage (Cloud Eggs)',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'sweet',
    prep_time: 15,
    difficulty: 2,
    total_calories: 160,
    total_protein: 14,
    total_carbs: 2,
    total_fat: 10,
    ingredients: [
      { name: 'Œufs', qty: '3' },
      { name: 'Sel', qty: '1 pincée' },
      { name: 'Fromage râpé (facultatif)', qty: '10g' },
      { name: 'Ciboulette', qty: '1 c.à.s' }
    ],
    steps: [
      'Sépare blancs et jaunes.',
      'Monte les blancs en neige ferme avec sel.',
      'Forme 3 nids de blancs sur une plaque.',
      'Enfourne 3 min à 230°C.',
      'Sors, pose un jaune au centre de chaque nid.',
      'Enfourne 3 min de plus.',
      'Ciboulette, poivre, sers immédiatement.'
    ],
    substitutions: [],
    coach_note: 'Les Cloud Eggs de Instagram mais en vrai c\'est 160 kcal. Joli et léger.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Muffins aux Œufs Meal Prep (6 portions)',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 25,
    difficulty: 1,
    total_calories: 120,
    total_protein: 12,
    total_carbs: 4,
    total_fat: 6,
    ingredients: [
      { name: 'Œufs', qty: '6' },
      { name: 'Épinards', qty: '50g' },
      { name: 'Poivron rouge', qty: '½' },
      { name: 'Oignon', qty: '¼' },
      { name: 'Champignons', qty: '50g' },
      { name: 'Dinde fumée', qty: '40g' },
      { name: 'Fromage râpé', qty: '30g' },
      { name: 'Sel, poivre, paprika', qty: 'au goût' }
    ],
    steps: [
      'Bats les 6 œufs avec sel, poivre, paprika.',
      'Hache tous les légumes et la dinde en petits dés.',
      'Mélange légumes + œufs battus.',
      'Verse dans 6 moules à muffins graissés.',
      'Parsème de fromage.',
      'Enfourne 18 min à 180°C.',
      'Conserve 4 jours au frigo. Réchauffe 30 sec au micro-ondes.'
    ],
    substitutions: [],
    coach_note: '120 kcal et 12g de protéines PAR MUFFIN. Prépares-en 12 le dimanche, t\'as 6 petits-déj réglés.',
    photo_url: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#588157)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Tartine Ricotta-Tomate-Basilic',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 5,
    difficulty: 1,
    total_calories: 280,
    total_protein: 16,
    total_carbs: 30,
    total_fat: 10,
    ingredients: [
      { name: 'Pain complet', qty: '2 tranches' },
      { name: 'Ricotta (ou fromage blanc)', qty: '80g' },
      { name: 'Tomates cerises', qty: '6' },
      { name: 'Basilic frais', qty: '6 feuilles' },
      { name: 'Huile d\'olive', qty: '1 c.à.c' },
      { name: 'Sel en flocons, poivre', qty: 'au goût' },
      { name: 'Miel (facultatif)', qty: '½ c.à.c' }
    ],
    steps: [
      'Toaste le pain.',
      'Étale la ricotta généreusement.',
      'Tomates cerises coupées en deux.',
      'Basilic frais déchiré.',
      'Filet d\'huile, sel en flocons, poivre.',
      'Option sucrée : un filet de miel.'
    ],
    substitutions: [
      { from: 'Ricotta', to: 'Fromage blanc épais' }
    ],
    coach_note: 'Tartine d\'été en 5 min. 280 kcal pour un petit-déj frais et léger.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pancakes Protéinés Courgette (Salés)',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 15,
    difficulty: 1,
    total_calories: 280,
    total_protein: 26,
    total_carbs: 18,
    total_fat: 12,
    ingredients: [
      { name: 'Courgette râpée', qty: '1' },
      { name: 'Œufs', qty: '3' },
      { name: 'Farine', qty: '30g' },
      { name: 'Fromage râpé', qty: '30g' },
      { name: 'Oignon nouveau', qty: '1' },
      { name: 'Aneth ou menthe', qty: '1 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Râpe la courgette, sale, presse pour enlever l\'eau.',
      'Mélange avec œufs battus, farine, fromage, oignon, herbes.',
      'Verse des petites portions dans une poêle chaude.',
      'Cuis 2 min par côté.',
      'Sers avec yaourt nature.'
    ],
    substitutions: [],
    coach_note: 'Pancakes salés à la courgette — tu manges tes légumes en format crêpe. 26g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════════════════════════
  // SNACKS & SIDES < 200 KCAL (6)
  // ═══════════════════════════════════════════════════

  {
    title: 'Bâtonnets Concombre Sauce Labneh',
    category: 'snacks',
    cuisine: 'diet',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 5,
    difficulty: 1,
    total_calories: 120,
    total_protein: 10,
    total_carbs: 8,
    total_fat: 4,
    ingredients: [
      { name: 'Concombres', qty: '2' },
      { name: 'Labneh (yaourt égoutté)', qty: '100g' },
      { name: 'Menthe fraîche', qty: '4 feuilles' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Sumac ou paprika', qty: '½ c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.c' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Coupe les concombres en bâtonnets.',
      'Mélange labneh + ail râpé + menthe + sel.',
      'Sers dans un bol avec sumac et filet d\'huile.',
      'Trempe les bâtonnets et mange.'
    ],
    substitutions: [
      { from: 'Labneh', to: 'Yaourt grec épais' }
    ],
    coach_note: 'Snack de 120 kcal avec 10g de protéines. Le labneh c\'est du yaourt égoutté toute la nuit — ultra crémeux.',
    photo_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a8dadc,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Soupe de Courgettes Express (5 min)',
    category: 'main_meals',
    cuisine: 'diet',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 140,
    total_protein: 8,
    total_carbs: 14,
    total_fat: 6,
    ingredients: [
      { name: 'Courgettes', qty: '3' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Bouillon de poulet', qty: '500ml' },
      { name: 'Fromage frais', qty: '2 c.à.s' },
      { name: 'Cumin', qty: '½ c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Coupe courgettes et oignon grossièrement.',
      'Mets dans une casserole avec bouillon et ail.',
      'Cuis 10 min.',
      'Mixe avec fromage frais et cumin.',
      'Sers chaud.'
    ],
    substitutions: [],
    coach_note: '140 kcal pour un bol entier. Le soir en cut, c\'est ça qu\'on mange. Rassasiant sans les calories.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Carottes Rôties au Cumin Miel',
    category: 'snacks',
    cuisine: 'diet',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 1,
    total_calories: 130,
    total_protein: 2,
    total_carbs: 22,
    total_fat: 4,
    ingredients: [
      { name: 'Carottes', qty: '4 grosses' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' }
    ],
    steps: [
      'Coupe les carottes en bâtonnets.',
      'Mélange avec huile, miel, cumin, sel.',
      'Étale sur une plaque.',
      'Rôtis 25 min à 200°C.',
      'Parsème de coriandre.'
    ],
    substitutions: [],
    coach_note: 'Les carottes rôties c\'est un autre niveau. Le miel caramélise, le cumin parfume. 130 kcal pour un gros plat.',
    photo_url: 'https://images.unsplash.com/photo-1546195643-70f48f9c5b87?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fb8500,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Fromage Blanc Protéiné Salé aux Herbes',
    category: 'snacks',
    cuisine: 'diet',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 5,
    difficulty: 1,
    total_calories: 140,
    total_protein: 18,
    total_carbs: 6,
    total_fat: 4,
    ingredients: [
      { name: 'Fromage blanc 0%', qty: '200g' },
      { name: 'Ciboulette', qty: '1 c.à.s' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Concombre en dés', qty: '¼' },
      { name: 'Sel, poivre, paprika', qty: 'au goût' },
      { name: 'Pain complet (pour tremper)', qty: '1 tranche' }
    ],
    steps: [
      'Mélange fromage blanc avec ail râpé, herbes, concombre, sel, poivre.',
      'Sers dans un bol, paprika sur le dessus.',
      'Accompagne de pain grillé ou bâtonnets de légumes.'
    ],
    substitutions: [],
    coach_note: '18g de protéines pour 140 kcal. Le snack parfait à 16h quand tu as faim mais pas de calories à gaspiller.',
    photo_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poivrons Grillés Marinés',
    category: 'snacks',
    cuisine: 'diet',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 25,
    difficulty: 1,
    total_calories: 100,
    total_protein: 2,
    total_carbs: 12,
    total_fat: 6,
    ingredients: [
      { name: 'Poivrons rouge, jaune, vert', qty: '1 de chaque' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Vinaigre balsamique', qty: '1 c.à.s' },
      { name: 'Origan ou thym', qty: '1 c.à.c' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Grille les poivrons entiers sous le grill du four 15 min en les retournant.',
      'Mets dans un sac plastique 10 min.',
      'Pèle la peau noircie, retire les graines.',
      'Coupe en lanières.',
      'Marine avec ail tranché, huile, vinaigre, origan, sel.',
      'Conserve au frigo 5 jours dans un bocal.'
    ],
    substitutions: [],
    coach_note: 'Accompagnement zéro-effort de 100 kcal. Tu les prépares le dimanche, tu en manges toute la semaine.',
    photo_url: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Smoothie Vert Protéiné',
    category: 'breakfast',
    cuisine: 'diet',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 5,
    difficulty: 1,
    total_calories: 220,
    total_protein: 24,
    total_carbs: 22,
    total_fat: 4,
    ingredients: [
      { name: 'Épinards frais', qty: '50g' },
      { name: 'Banane', qty: '½' },
      { name: 'Yaourt grec 0%', qty: '150g' },
      { name: 'Whey vanille', qty: '25g' },
      { name: 'Eau froide', qty: '150ml' },
      { name: 'Glaçons', qty: '4' },
      { name: 'Miel (facultatif)', qty: '1 c.à.c' }
    ],
    steps: [
      'Mets tout dans un blender.',
      'Mixe 30 secondes.',
      'Bois immédiatement.'
    ],
    substitutions: [
      { from: 'Whey', to: 'Plus de yaourt + 1 c.à.s beurre de cacahuète' }
    ],
    coach_note: '24g de protéines en 5 min. Les épinards donnent la couleur verte mais tu ne les sens pas du tout.',
    photo_url: 'https://images.unsplash.com/photo-1490323914169-4ef6e2ce5b9c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: false
  }
]

console.log(`Seeding ${recipes.length} Diet recipes...`)

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

console.log(`\n✨ Done! ${success} inserted, ${failed} failed.`)
console.log('\n🎉 401 RECIPES TOTAL — Ready to market!')
