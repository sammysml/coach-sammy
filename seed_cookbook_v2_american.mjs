// seed_cookbook_v2_american.mjs
// Cookbook v2 — Batch 6: American cuisine (25 recipes)
// Run with: node seed_cookbook_v2_american.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [
  {
    title: 'Smash Burger Maison',
    category: 'main_meals',
    cuisine: 'american',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 680,
    total_protein: 42,
    total_carbs: 42,
    total_fat: 38,
    ingredients: [
      { name: 'Viande hachée bœuf 15% MG', qty: '200g' },
      { name: 'Pain à burger brioché', qty: '1' },
      { name: 'Cheddar (ou fromage fondu)', qty: '2 tranches' },
      { name: 'Tomate', qty: '2 tranches' },
      { name: 'Salade', qty: '2 feuilles' },
      { name: 'Oignon rouge', qty: '2 rondelles' },
      { name: 'Cornichons', qty: '4 tranches' },
      { name: 'Mayonnaise', qty: '1 c.à.s' },
      { name: 'Ketchup', qty: '1 c.à.c' },
      { name: 'Moutarde', qty: '1 c.à.c' }
    ],
    steps: [
      'Forme 2 boulettes de viande (100g chacune). Sale, poivre.',
      'Chauffe une poêle à blanc, sans huile.',
      'Pose les boulettes, écrase fortement avec une spatule pendant 60 sec (= smash).',
      'Retourne, pose le fromage, cuis 1 min de plus.',
      'Toaste le pain dans la même poêle.',
      'Mélange mayo, ketchup, moutarde = sauce burger.',
      'Monte : pain, sauce, salade, tomate, steaks fromage, oignon, cornichons, pain.'
    ],
    substitutions: [
      { from: 'Cheddar', to: 'Fromage râpé ou mozzarella' }
    ],
    coach_note: 'La technique "smash" = beaucoup plus de croûte caramélisée = goût explosif. Ma technique signature.',
    photo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Burger Protéiné Light',
    category: 'main_meals',
    cuisine: 'american',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 1,
    total_calories: 480,
    total_protein: 48,
    total_carbs: 32,
    total_fat: 16,
    ingredients: [
      { name: 'Viande hachée 5% MG (ou dinde)', qty: '180g' },
      { name: 'Pain complet à burger', qty: '1' },
      { name: 'Fromage allégé', qty: '1 tranche' },
      { name: 'Tomate', qty: '2 tranches' },
      { name: 'Salade', qty: '2 feuilles' },
      { name: 'Oignon rouge', qty: '2 rondelles' },
      { name: 'Yaourt grec', qty: '1 c.à.s' },
      { name: 'Moutarde de Dijon', qty: '1 c.à.c' },
      { name: 'Aneth ou ciboulette', qty: '1 c.à.c' },
      { name: 'Cornichons', qty: '3' }
    ],
    steps: [
      'Forme un steak avec la viande, sale, poivre.',
      'Cuis dans une poêle 4 min par côté.',
      'Pose le fromage à la fin, couvre 1 min pour fondre.',
      'Toaste le pain.',
      'Sauce light : yaourt + moutarde + herbes hachées.',
      'Monte avec tous les ingrédients.'
    ],
    substitutions: [
      { from: 'Bœuf 5%', to: 'Dinde hachée' }
    ],
    coach_note: 'Burger sans culpabilité — 48g de protéines, 480 kcal. Tu peux en manger 2 jours par semaine.',
    photo_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#bc6c25)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Mac & Cheese Crémeux',
    category: 'main_meals',
    cuisine: 'american',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 1,
    total_calories: 620,
    total_protein: 28,
    total_carbs: 68,
    total_fat: 28,
    ingredients: [
      { name: 'Macaroni (ou coquillettes)', qty: '180g' },
      { name: 'Cheddar râpé', qty: '120g' },
      { name: 'Mozzarella', qty: '60g' },
      { name: 'Lait', qty: '400ml' },
      { name: 'Beurre', qty: '40g' },
      { name: 'Farine', qty: '30g' },
      { name: 'Moutarde de Dijon', qty: '1 c.à.c' },
      { name: 'Muscade', qty: '1 pincée' },
      { name: 'Chapelure', qty: '20g' },
      { name: 'Paprika', qty: 'pincée' }
    ],
    steps: [
      'Cuis les pâtes al dente. Égoutte.',
      'Fais fondre le beurre, ajoute la farine, mélange 1 min.',
      'Verse le lait progressivement en fouettant pour faire une béchamel.',
      'Hors du feu, ajoute fromages, moutarde, muscade, sel, poivre.',
      'Mélange jusqu\'à crémeux et fondu.',
      'Ajoute les pâtes, mélange.',
      'Transvase dans un plat, parsème chapelure + paprika.',
      'Gratine 12 min à 200°C.'
    ],
    substitutions: [
      { from: 'Cheddar', to: 'Emmental + gruyère' }
    ],
    coach_note: 'Plat américain comfort food. Le mélange cheddar + moz donne le bon stretch quand tu prends une bouchée.',
    photo_url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#fb8500)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Pancakes Fluffy Américains',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'bulk',
    craving_tag: 'sweet',
    prep_time: 20,
    difficulty: 1,
    total_calories: 480,
    total_protein: 14,
    total_carbs: 68,
    total_fat: 18,
    ingredients: [
      { name: 'Farine', qty: '150g' },
      { name: 'Lait', qty: '200ml' },
      { name: 'Œufs', qty: '2' },
      { name: 'Sucre', qty: '2 c.à.s' },
      { name: 'Levure chimique', qty: '2 c.à.c' },
      { name: 'Sel', qty: '1 pincée' },
      { name: 'Beurre fondu', qty: '30g' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Sirop d\'érable ou miel', qty: '3 c.à.s' },
      { name: 'Beurre (pour cuisson)', qty: 'noisette' }
    ],
    steps: [
      'Mélange farine, sucre, levure, sel (ingrédients secs).',
      'Dans un autre bol : lait, œufs, beurre fondu, vanille.',
      'Mélange humide → sec. Remue juste assez (grumeaux OK).',
      'Repose 5 min — c\'est CA qui les rend fluffy.',
      'Chauffe une poêle, beurre. Verse une louche par pancake.',
      'Cuis 2 min jusqu\'à bulles, retourne, 1 min.',
      'Sers avec sirop d\'érable, fruits, ou yaourt.'
    ],
    substitutions: [
      { from: 'Sirop d\'érable', to: 'Miel ou confiture' }
    ],
    coach_note: 'Le secret des pancakes hyper fluffy : ne PAS trop mélanger. Les grumeaux c\'est l\'ami.',
    photo_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Pancakes Protéinés Banane',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'sweet',
    prep_time: 12,
    difficulty: 1,
    total_calories: 340,
    total_protein: 28,
    total_carbs: 42,
    total_fat: 6,
    ingredients: [
      { name: 'Banane mûre', qty: '1' },
      { name: 'Œufs', qty: '2' },
      { name: 'Whey vanille', qty: '30g' },
      { name: 'Flocons d\'avoine', qty: '40g' },
      { name: 'Levure chimique', qty: '½ c.à.c' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Fruits rouges', qty: '50g (déco)' }
    ],
    steps: [
      'Mixe banane, œufs, whey, flocons, levure, cannelle.',
      'Chauffe une poêle antiadhésive sans matière grasse (ou très peu).',
      'Verse de petites portions.',
      'Cuis 2 min par face.',
      'Sers avec miel et fruits rouges.'
    ],
    substitutions: [
      { from: 'Whey', to: 'Plus de flocons + 1 c.à.s lait écrémé' }
    ],
    coach_note: '28g de protéines, 340 kcal — pancakes que tu peux manger en cut. Mon petit-déj favori.',
    photo_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'BBQ Pulled Chicken',
    category: 'main_meals',
    cuisine: 'american',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 90,
    difficulty: 2,
    total_calories: 540,
    total_protein: 52,
    total_carbs: 38,
    total_fat: 18,
    ingredients: [
      { name: 'Cuisses de poulet désossées', qty: '400g' },
      { name: 'Sauce BBQ', qty: '120ml' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Paprika fumé', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Ail en poudre', qty: '1 c.à.c' },
      { name: 'Cassonade', qty: '1 c.à.s' },
      { name: 'Vinaigre de cidre', qty: '2 c.à.s' },
      { name: 'Bouillon', qty: '200ml' },
      { name: 'Pains à burger', qty: '2' }
    ],
    steps: [
      'Mélange paprika, cumin, ail poudre, cassonade, sel = rub d\'épices.',
      'Enrobe le poulet du rub.',
      'Pose dans une casserole avec oignon haché, ail, vinaigre, bouillon, moitié sauce BBQ.',
      'Couvre, mijote 1h à très feu doux jusqu\'à très tendre.',
      'Effiloche le poulet à la fourchette dans la sauce.',
      'Ajoute le reste de sauce BBQ.',
      'Sers dans des pains à burger avec coleslaw.'
    ],
    substitutions: [
      { from: 'Sauce BBQ achetée', to: 'Maison : ketchup + sirop d\'érable + vinaigre + épices' }
    ],
    coach_note: 'Le poulet effiloché BBQ — base de plein de repas. 52g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1547043091-cc5b03d4f0b9?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Buffalo Wings Maison',
    category: 'snacks',
    cuisine: 'american',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'spicy',
    prep_time: 45,
    difficulty: 2,
    total_calories: 520,
    total_protein: 38,
    total_carbs: 12,
    total_fat: 32,
    ingredients: [
      { name: 'Ailes de poulet', qty: '500g' },
      { name: 'Sauce piquante (Tabasco ou similaire)', qty: '60ml' },
      { name: 'Beurre fondu', qty: '40g' },
      { name: 'Ail en poudre', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Vinaigre blanc', qty: '1 c.à.c' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Céleri (déco)', qty: '2 branches' },
      { name: 'Sauce yaourt-bleu (yaourt + ail + persil)', qty: '4 c.à.s' }
    ],
    steps: [
      'Préchauffe le four à 220°C.',
      'Séche bien les ailes au papier absorbant.',
      'Pose sur grille, sale, cuis 35 min en retournant à mi-cuisson.',
      'Mélange beurre fondu, sauce piquante, ail, paprika, vinaigre, miel.',
      'Sors les ailes, plonge dans la sauce, enrobe bien.',
      'Sers avec céleri et sauce yaourt-bleu.'
    ],
    substitutions: [
      { from: 'Sauce piquante', to: 'Harissa délayée + un peu de vinaigre' }
    ],
    coach_note: 'Cuisson au four au lieu de friture = 30% moins de calories pour le même goût.',
    photo_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#fb8500)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Caesar Salad',
    category: 'salads',
    cuisine: 'american',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 380,
    total_protein: 32,
    total_carbs: 18,
    total_fat: 22,
    ingredients: [
      { name: 'Laitue romaine', qty: '1' },
      { name: 'Blanc de poulet grillé', qty: '150g' },
      { name: 'Parmesan râpé', qty: '30g' },
      { name: 'Croûtons (ou pain grillé en dés)', qty: '40g' },
      { name: 'Œuf', qty: '1 jaune' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Citron', qty: '½' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Câpres', qty: '1 c.à.c (facultatif)' }
    ],
    steps: [
      'Sauce : mixe jaune d\'œuf, ail, moutarde, jus de citron. Verse l\'huile en filet pour émulsionner. Ajoute parmesan.',
      'Coupe la laitue grossièrement.',
      'Tranche le poulet.',
      'Mélange salade, poulet, sauce.',
      'Ajoute croûtons, parmesan en plus, câpres.'
    ],
    substitutions: [
      { from: 'Jaune d\'œuf cru', to: 'Mayo light (1 c.à.s)' }
    ],
    coach_note: 'La vraie Caesar à l\'américaine. 32g de protéines, et la sauce maison fait toute la différence.',
    photo_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Cookies Choco Géants',
    category: 'desserts',
    cuisine: 'american',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 25,
    difficulty: 1,
    total_calories: 240,
    total_protein: 4,
    total_carbs: 32,
    total_fat: 12,
    ingredients: [
      { name: 'Farine', qty: '180g' },
      { name: 'Beurre', qty: '100g' },
      { name: 'Cassonade', qty: '80g' },
      { name: 'Sucre', qty: '40g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Bicarbonate', qty: '½ c.à.c' },
      { name: 'Sel', qty: '1 pincée' },
      { name: 'Pépites de chocolat noir', qty: '120g' }
    ],
    steps: [
      'Fais fondre le beurre et laisse tiédir.',
      'Mélange beurre fondu, cassonade, sucre, œuf, vanille.',
      'Ajoute farine, bicarbonate, sel. Mélange.',
      'Ajoute pépites.',
      'Repose 30 min au frigo.',
      'Forme 8 grosses boules, espace-les sur la plaque.',
      'Enfourne 11 min à 180°C — les cookies doivent rester moelleux au centre.',
      'Laisse refroidir sur la plaque 5 min avant de manipuler.'
    ],
    substitutions: [
      { from: 'Pépites', to: 'Chocolat noir haché' }
    ],
    coach_note: 'Le secret de cookies moelleux : sortir à 11 min, ils ont l\'air pas cuits — c\'est parfait. Ils finissent de cuire en refroidissant.',
    photo_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f4518,#dda15e)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Brownie Fondant',
    category: 'desserts',
    cuisine: 'american',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 1,
    total_calories: 320,
    total_protein: 6,
    total_carbs: 38,
    total_fat: 18,
    ingredients: [
      { name: 'Chocolat noir 70%', qty: '180g' },
      { name: 'Beurre', qty: '100g' },
      { name: 'Sucre', qty: '120g' },
      { name: 'Œufs', qty: '3' },
      { name: 'Farine', qty: '60g' },
      { name: 'Cacao non sucré', qty: '20g' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Noix (facultatif)', qty: '60g' },
      { name: 'Sel', qty: '1 pincée' }
    ],
    steps: [
      'Fais fondre chocolat + beurre au bain-marie ou micro-ondes.',
      'Mélange avec sucre, œufs, vanille.',
      'Ajoute farine + cacao + sel, mélange juste assez.',
      'Ajoute noix concassées si tu veux.',
      'Verse dans un moule (carré 20cm) chemisé.',
      'Enfourne 20 min à 180°C — le centre doit rester un peu humide.',
      'Laisse refroidir avant de couper.'
    ],
    substitutions: [
      { from: 'Noix', to: 'Pépites de chocolat blanc' }
    ],
    coach_note: 'Le brownie qui colle à la dent. Sors-le à 20 min même s\'il a l\'air pas cuit.',
    photo_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f4518,#9d4edd)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Philly Cheesesteak (Sandwich Bœuf-Fromage)',
    category: 'main_meals',
    cuisine: 'american',
    meal_type: 'lunch',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 25,
    difficulty: 1,
    total_calories: 720,
    total_protein: 46,
    total_carbs: 58,
    total_fat: 32,
    ingredients: [
      { name: 'Faux-filet ou rumsteck en lanières fines', qty: '250g' },
      { name: 'Pain baguette ou ciabatta', qty: '1' },
      { name: 'Oignons', qty: '1' },
      { name: 'Poivron vert', qty: '½' },
      { name: 'Champignons', qty: '100g' },
      { name: 'Fromage fondu (cheddar ou emmental)', qty: '4 tranches' },
      { name: 'Beurre', qty: '20g' },
      { name: 'Sauce Worcestershire (facultatif)', qty: '1 c.à.c' }
    ],
    steps: [
      'Fais sauter oignon et poivron en lanières dans le beurre.',
      'Ajoute les champignons, cuis 3 min.',
      'Pousse sur le côté, ajoute la viande, fais saisir 2 min.',
      'Sale, poivre, sauce Worcestershire.',
      'Mélange tout dans la poêle. Pose le fromage par-dessus, couvre 1 min pour fondre.',
      'Ouvre le pain, garnis avec la préparation fondante.'
    ],
    substitutions: [
      { from: 'Sauce Worcestershire', to: 'Sauce soja + un peu de vinaigre' }
    ],
    coach_note: 'Sandwich de Philadelphia. Une fois goûté, tu comprends pourquoi c\'est culte.',
    photo_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pulled Beef Chili (Texan)',
    category: 'main_meals',
    cuisine: 'american',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 2,
    total_calories: 580,
    total_protein: 46,
    total_carbs: 32,
    total_fat: 28,
    ingredients: [
      { name: 'Paleron de bœuf', qty: '400g' },
      { name: 'Oignons', qty: '2' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Tomates concassées', qty: '400g' },
      { name: 'Haricots rouges cuits', qty: '200g' },
      { name: 'Paprika fumé', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.s' },
      { name: 'Coriandre poudre', qty: '1 c.à.c' },
      { name: 'Piment doux', qty: '1 c.à.c' },
      { name: 'Concentré tomate', qty: '2 c.à.s' },
      { name: 'Bouillon', qty: '300ml' },
      { name: 'Cassonade', qty: '1 c.à.s' }
    ],
    steps: [
      'Coupe le bœuf en gros cubes. Fais-le saisir bien sur toutes les faces.',
      'Réserve. Fais revenir oignons hachés, puis ail.',
      'Ajoute épices, concentré, mélange 1 min.',
      'Remets la viande, ajoute tomates, bouillon, cassonade.',
      'Couvre, mijote 1h15 à feu doux.',
      'Effiloche la viande à la fourchette.',
      'Ajoute haricots, mijote 15 min.',
      'Sers sur du riz ou avec du pain.'
    ],
    substitutions: [
      { from: 'Paleron', to: 'Macreuse ou jarret' }
    ],
    coach_note: 'Le chili texan c\'est plus riche que le mexicain. 46g de protéines, plat parfait pour la prise de masse.',
    photo_url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Coleslaw (Salade de Chou Mayo)',
    category: 'salads',
    cuisine: 'american',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 180,
    total_protein: 4,
    total_carbs: 18,
    total_fat: 10,
    ingredients: [
      { name: 'Chou blanc', qty: '300g' },
      { name: 'Carottes', qty: '2' },
      { name: 'Oignon nouveau', qty: '2' },
      { name: 'Yaourt grec', qty: '3 c.à.s' },
      { name: 'Mayonnaise', qty: '1 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Vinaigre de cidre', qty: '1 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Persil', qty: '1 c.à.s' }
    ],
    steps: [
      'Râpe finement chou et carottes.',
      'Émince les oignons nouveaux.',
      'Sauce : mélange yaourt, mayo, moutarde, vinaigre, miel, sel, poivre.',
      'Verse sur les légumes, mélange.',
      'Réfrigère 30 min avant de servir.'
    ],
    substitutions: [
      { from: 'Mayo classique', to: 'Yaourt grec seul (encore plus light)' }
    ],
    coach_note: 'Version light avec plus de yaourt que de mayo. Accompagne parfaitement burgers et BBQ.',
    photo_url: 'https://images.unsplash.com/photo-1571689936114-b16146c9570a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Banana Bread',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 75,
    difficulty: 1,
    total_calories: 280,
    total_protein: 6,
    total_carbs: 42,
    total_fat: 10,
    ingredients: [
      { name: 'Bananes très mûres', qty: '3' },
      { name: 'Farine', qty: '200g' },
      { name: 'Beurre fondu', qty: '60g' },
      { name: 'Sucre', qty: '80g' },
      { name: 'Œufs', qty: '2' },
      { name: 'Levure chimique', qty: '1 c.à.c' },
      { name: 'Bicarbonate', qty: '½ c.à.c' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Cannelle', qty: '1 c.à.c' },
      { name: 'Noix concassées', qty: '40g' },
      { name: 'Sel', qty: '1 pincée' }
    ],
    steps: [
      'Écrase 2 bananes à la fourchette. Garde 1 pour le dessus.',
      'Mélange beurre fondu, sucre, œufs, vanille.',
      'Ajoute bananes écrasées.',
      'Incorpore farine, levure, bicarbonate, cannelle, sel.',
      'Ajoute noix.',
      'Verse dans un moule à cake.',
      'Pose la dernière banane coupée en deux dans la longueur sur le dessus.',
      'Enfourne 50 min à 170°C.'
    ],
    substitutions: [
      { from: 'Noix', to: 'Pépites de chocolat' }
    ],
    coach_note: 'La meilleure façon d\'utiliser les bananes trop mûres. Tiens 5 jours dans une boîte.',
    photo_url: 'https://images.unsplash.com/photo-1606101206233-5550c4c52a8c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade de Pommes de Terre Américaine',
    category: 'salads',
    cuisine: 'american',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 1,
    total_calories: 320,
    total_protein: 8,
    total_carbs: 42,
    total_fat: 14,
    ingredients: [
      { name: 'Pommes de terre', qty: '600g' },
      { name: 'Œufs durs', qty: '3' },
      { name: 'Yaourt grec', qty: '4 c.à.s' },
      { name: 'Mayonnaise', qty: '2 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.s' },
      { name: 'Cornichons hachés', qty: '40g' },
      { name: 'Oignon nouveau', qty: '3' },
      { name: 'Aneth ou ciboulette', qty: '2 c.à.s' },
      { name: 'Vinaigre', qty: '1 c.à.s' },
      { name: 'Paprika', qty: '½ c.à.c' }
    ],
    steps: [
      'Cuis les patates en cubes 12 min dans l\'eau salée. Égoutte.',
      'Mélange chaud avec vinaigre (pour qu\'elles absorbent).',
      'Laisse refroidir.',
      'Mélange yaourt, mayo, moutarde, sel, paprika = sauce.',
      'Ajoute aux patates : œufs durs hachés, cornichons, oignons, herbes.',
      'Verse la sauce, mélange.',
      'Réfrigère 1h avant de servir.'
    ],
    substitutions: [],
    coach_note: 'Salade BBQ classique. Tu peux en faire un gros saladier le dimanche pour la semaine.',
    photo_url: 'https://images.unsplash.com/photo-1604908554049-c9f6e9c1c3b3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Sandwich Club',
    category: 'quick_meals',
    cuisine: 'american',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 580,
    total_protein: 38,
    total_carbs: 52,
    total_fat: 22,
    ingredients: [
      { name: 'Pain de mie complet', qty: '3 tranches' },
      { name: 'Blanc de poulet cuit', qty: '120g' },
      { name: 'Dinde fumée tranchée', qty: '40g' },
      { name: 'Tomate', qty: '4 tranches' },
      { name: 'Salade', qty: '2 feuilles' },
      { name: 'Œuf dur', qty: '1' },
      { name: 'Cornichons', qty: '4' },
      { name: 'Mayonnaise', qty: '2 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' }
    ],
    steps: [
      'Toaste les 3 tranches de pain.',
      'Tartine de mayo + moutarde.',
      'Pain 1 : salade, poulet, tomate.',
      'Pain 2 (au milieu) : dinde, œuf en rondelles.',
      'Pain 3 : pose dessus.',
      'Coupe en triangles, pique avec des cure-dents.',
      'Sers avec cornichons.'
    ],
    substitutions: [
      { from: 'Dinde fumée', to: 'Poulet rôti supplémentaire' }
    ],
    coach_note: 'Sandwich à 3 étages classique. Repas complet équilibré.',
    photo_url: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Œufs Bénédicte Light',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 2,
    total_calories: 380,
    total_protein: 28,
    total_carbs: 22,
    total_fat: 22,
    ingredients: [
      { name: 'Muffins anglais (ou pain rond)', qty: '2' },
      { name: 'Œufs', qty: '4' },
      { name: 'Dinde fumée', qty: '60g' },
      { name: 'Épinards frais', qty: '50g' },
      { name: 'Yaourt grec', qty: '4 c.à.s' },
      { name: 'Beurre fondu', qty: '20g' },
      { name: 'Jaune d\'œuf', qty: '1' },
      { name: 'Jus de citron', qty: '1 c.à.c' },
      { name: 'Moutarde', qty: '½ c.à.c' },
      { name: 'Paprika', qty: 'pincée' },
      { name: 'Vinaigre blanc', qty: '1 c.à.s' }
    ],
    steps: [
      'Sauce hollandaise light : fouette jaune + jus citron + moutarde au bain-marie. Incorpore beurre fondu + yaourt. Sel, paprika.',
      'Toaste les muffins.',
      'Fais tomber les épinards à la poêle 1 min.',
      'Pocher les œufs : eau bouillante + vinaigre, fais un tourbillon, casse l\'œuf, cuis 3 min.',
      'Monte : muffin, épinards, dinde, œuf poché, sauce.',
      'Saupoudre de paprika.'
    ],
    substitutions: [
      { from: 'Muffins anglais', to: 'Pain rond ou baguette' }
    ],
    coach_note: 'Brunch américain classique en version allégée (sauce avec yaourt). 28g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#fb8500)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Frites Maison Croustillantes',
    category: 'snacks',
    cuisine: 'american',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 1,
    total_calories: 380,
    total_protein: 6,
    total_carbs: 62,
    total_fat: 12,
    ingredients: [
      { name: 'Grosses pommes de terre', qty: '4' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Paprika fumé', qty: '1 c.à.c' },
      { name: 'Ail en poudre', qty: '1 c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' },
      { name: 'Persil frais (déco)', qty: '1 c.à.s' }
    ],
    steps: [
      'Coupe les patates en bâtonnets de 1cm.',
      'Trempe dans l\'eau froide 20 min (enlève l\'amidon).',
      'Sèche très bien avec un torchon.',
      'Mélange avec huile, paprika, ail, sel, poivre.',
      'Étale sur une plaque sans qu\'elles se touchent.',
      'Enfourne 25 min à 220°C en remuant à mi-cuisson.',
      'Pour plus croustillant : finis 5 min sous le grill.'
    ],
    substitutions: [
      { from: 'Paprika fumé', to: 'Paprika classique' }
    ],
    coach_note: 'Frites au four 70% moins grasses que la friture. Le secret : sécher avant et ne pas les entasser.',
    photo_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#fb8500)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Cobb',
    category: 'salads',
    cuisine: 'american',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 25,
    difficulty: 1,
    total_calories: 480,
    total_protein: 42,
    total_carbs: 18,
    total_fat: 28,
    ingredients: [
      { name: 'Salade verte mélangée', qty: '100g' },
      { name: 'Blanc de poulet grillé', qty: '150g' },
      { name: 'Œufs durs', qty: '2' },
      { name: 'Avocat', qty: '½' },
      { name: 'Tomates cerises', qty: '120g' },
      { name: 'Dinde fumée', qty: '40g' },
      { name: 'Fromage bleu (roquefort) ou feta', qty: '30g' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Vinaigre de cidre', qty: '1 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' }
    ],
    steps: [
      'Étale la salade dans une grande assiette.',
      'Dispose les ingrédients en lignes séparées : poulet, œufs en quartiers, avocat, tomates, dinde, fromage.',
      'Sauce : huile + vinaigre + moutarde + sel + poivre.',
      'Sers la sauce à part, mélange au moment de manger.'
    ],
    substitutions: [
      { from: 'Bleu', to: 'Feta ou parmesan' }
    ],
    coach_note: 'Salade californienne style assiette composée. 42g de protéines pour 480 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bagel Saumon Cream Cheese',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 8,
    difficulty: 1,
    total_calories: 420,
    total_protein: 22,
    total_carbs: 48,
    total_fat: 16,
    ingredients: [
      { name: 'Bagel (ou petit pain rond)', qty: '1' },
      { name: 'Saumon fumé', qty: '60g' },
      { name: 'Fromage frais (style Philadelphia)', qty: '40g' },
      { name: 'Câpres', qty: '1 c.à.c' },
      { name: 'Oignon rouge', qty: '2 rondelles' },
      { name: 'Aneth ou ciboulette', qty: '1 c.à.c' },
      { name: 'Citron', qty: '½' },
      { name: 'Poivre noir', qty: 'au goût' }
    ],
    steps: [
      'Coupe le bagel en deux, toaste.',
      'Tartine généreusement de fromage frais.',
      'Pose le saumon fumé.',
      'Ajoute câpres, oignon rouge, aneth.',
      'Presse un peu de citron, poivre.'
    ],
    substitutions: [
      { from: 'Bagel', to: 'Pain de mie ou pain rond toasté' }
    ],
    coach_note: 'Petit-déj New-Yorkais classique. Le saumon fumé apporte des oméga 3.',
    photo_url: 'https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fb8500)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Steak & Eggs (Petit-Déj Power)',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 15,
    difficulty: 1,
    total_calories: 580,
    total_protein: 52,
    total_carbs: 8,
    total_fat: 38,
    ingredients: [
      { name: 'Steak haché ou faux-filet', qty: '180g' },
      { name: 'Œufs', qty: '3' },
      { name: 'Beurre', qty: '20g' },
      { name: 'Champignons (facultatif)', qty: '80g' },
      { name: 'Tomate cerise', qty: '6' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Sale le steak, fais-le saisir dans une poêle chaude 3 min par côté pour saignant (5 min pour à point).',
      'Réserve, laisse reposer 5 min.',
      'Dans la même poêle, fais sauter champignons et tomates.',
      'Cuis les œufs au plat dans le beurre.',
      'Sers steak + œufs + légumes + persil. Sel, poivre.'
    ],
    substitutions: [],
    coach_note: 'Petit-déj musclé. 52g de protéines pour démarrer. Idéal jour de gros training.',
    photo_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Yogurt Parfait Granola',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'sweet',
    prep_time: 5,
    difficulty: 1,
    total_calories: 320,
    total_protein: 22,
    total_carbs: 42,
    total_fat: 8,
    ingredients: [
      { name: 'Yaourt grec', qty: '250g' },
      { name: 'Granola', qty: '40g' },
      { name: 'Fruits rouges', qty: '100g' },
      { name: 'Banane', qty: '½' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Graines de chia (facultatif)', qty: '1 c.à.c' }
    ],
    steps: [
      'Dans un verre ou bol : couche de yaourt, granola, fruits.',
      'Répète une fois.',
      'Termine par miel, chia, et quelques fruits.'
    ],
    substitutions: [
      { from: 'Granola', to: 'Flocons d\'avoine + miel + noix' }
    ],
    coach_note: '22g de protéines pour 320 kcal. Sain, beau, rapide. Le combo gagnant.',
    photo_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Wrap au Poulet Ranch',
    category: 'quick_meals',
    cuisine: 'american',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 520,
    total_protein: 38,
    total_carbs: 48,
    total_fat: 18,
    ingredients: [
      { name: 'Tortilla grand format', qty: '1' },
      { name: 'Blanc de poulet grillé', qty: '150g' },
      { name: 'Yaourt grec', qty: '3 c.à.s' },
      { name: 'Mayo light', qty: '1 c.à.s' },
      { name: 'Aneth, ciboulette, persil', qty: '2 c.à.s mélange' },
      { name: 'Ail en poudre', qty: '½ c.à.c' },
      { name: 'Salade', qty: '2 feuilles' },
      { name: 'Tomate', qty: '½' },
      { name: 'Bacon de dinde (facultatif)', qty: '2 tranches' },
      { name: 'Fromage râpé', qty: '20g' }
    ],
    steps: [
      'Sauce ranch : yaourt + mayo + herbes + ail + sel + poivre.',
      'Étale la sauce sur la tortilla.',
      'Garnis avec salade, tomate, poulet en lanières, bacon, fromage.',
      'Roule serré, coupe en deux.'
    ],
    substitutions: [
      { from: 'Bacon de dinde', to: 'Rien' }
    ],
    coach_note: 'La sauce ranch maison c\'est l\'âme de ce wrap. 38g de protéines portables.',
    photo_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Cheesecake New York Léger',
    category: 'desserts',
    cuisine: 'american',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 90,
    difficulty: 2,
    total_calories: 320,
    total_protein: 12,
    total_carbs: 32,
    total_fat: 16,
    ingredients: [
      { name: 'Biscuits sablés écrasés', qty: '150g' },
      { name: 'Beurre fondu', qty: '60g' },
      { name: 'Fromage frais (Philadelphia ou St Môret)', qty: '300g' },
      { name: 'Yaourt grec', qty: '150g' },
      { name: 'Sucre', qty: '80g' },
      { name: 'Œufs', qty: '2' },
      { name: 'Vanille', qty: '1 c.à.s' },
      { name: 'Zeste de citron', qty: '1' },
      { name: 'Fruits rouges (déco)', qty: '100g' }
    ],
    steps: [
      'Mélange biscuits écrasés + beurre fondu. Tasse dans un moule rond.',
      'Enfourne 8 min à 180°C. Laisse refroidir.',
      'Fouette fromage + yaourt + sucre + œufs + vanille + zeste.',
      'Verse sur la base.',
      'Cuis 45 min à 160°C — le centre doit trembler légèrement.',
      'Laisse refroidir, puis 4h au frigo.',
      'Garnis de fruits rouges avant de servir.'
    ],
    substitutions: [
      { from: 'Philadelphia', to: 'Mascarpone ou ricotta égouttée' }
    ],
    coach_note: 'Version avec yaourt grec = moins riche que l\'original mais aussi crémeux.',
    photo_url: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#e63946)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Avocado Toast (3 Versions)',
    category: 'breakfast',
    cuisine: 'american',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 380,
    total_protein: 18,
    total_carbs: 32,
    total_fat: 22,
    ingredients: [
      { name: 'Pain complet ou de campagne', qty: '2 tranches' },
      { name: 'Avocat mûr', qty: '1' },
      { name: 'Œuf', qty: '1' },
      { name: 'Tomates cerises', qty: '4' },
      { name: 'Saumon fumé (facultatif)', qty: '40g' },
      { name: 'Citron', qty: '½' },
      { name: 'Piment d\'Espelette ou paprika', qty: '½ c.à.c' },
      { name: 'Graines de sésame', qty: '1 c.à.c' },
      { name: 'Sel en flocons', qty: 'au goût' }
    ],
    steps: [
      'Toaste le pain.',
      'Écrase l\'avocat avec jus de citron, sel.',
      'Tartine sur le pain.',
      'Version 1 : œuf poché ou plat dessus + paprika.',
      'Version 2 : saumon fumé + sésame.',
      'Version 3 : tomates cerises + flocons sel + piment.'
    ],
    substitutions: [],
    coach_note: 'Le petit-déj brunch tendance. Bonnes graisses + protéines + glucides complexes.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a3b18a,#588157)',
    membership_required: 'cookbook',
    featured: false
  }
]

console.log(`Seeding ${recipes.length} American recipes...`)

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
