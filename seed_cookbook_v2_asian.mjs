// seed_cookbook_v2_asian.mjs
// Cookbook v2 — Batch 2: Asian cuisine (25 recipes)
// Run with: node seed_cookbook_v2_asian.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [
  {
    title: 'Riz Sauté au Poulet Style Chinois',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 25,
    difficulty: 1,
    total_calories: 520,
    total_protein: 36,
    total_carbs: 65,
    total_fat: 12,
    ingredients: [
      { name: 'Riz cuit (de la veille c\'est mieux)', qty: '200g' },
      { name: 'Blanc de poulet', qty: '150g' },
      { name: 'Œufs', qty: '2' },
      { name: 'Petits pois surgelés', qty: '60g' },
      { name: 'Carotte', qty: '1' },
      { name: 'Oignon nouveau', qty: '2' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Huile de sésame', qty: '1 c.à.c' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Gingembre frais', qty: '1 c.à.c' }
    ],
    steps: [
      'Coupe le poulet en dés. Marine 5 min dans 1 c.à.s sauce soja.',
      'Dans un wok ou grande poêle bien chaude, fais cuire le poulet 4-5 min. Réserve.',
      'Bats les œufs, verse dans la poêle, fais cuire en remuant pour avoir des morceaux. Réserve.',
      'Fais sauter ail, gingembre, carotte en dés, petits pois 3 min.',
      'Ajoute le riz, écrase les grumeaux. Mélange 2 min.',
      'Remets poulet et œufs. Ajoute sauce soja et huile de sésame.',
      'Termine par les oignons nouveaux émincés.'
    ],
    substitutions: [
      { from: 'Huile de sésame', to: 'Huile végétale neutre' }
    ],
    coach_note: 'Le secret du riz sauté c\'est le riz froid de la veille. S\'il est tout chaud, il devient collant.',
    photo_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#d62828)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Bowl Poulet Teriyaki',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 25,
    difficulty: 1,
    total_calories: 560,
    total_protein: 48,
    total_carbs: 62,
    total_fat: 10,
    ingredients: [
      { name: 'Blanc de poulet', qty: '200g' },
      { name: 'Riz basmati cuit', qty: '180g' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Miel', qty: '2 c.à.s' },
      { name: 'Vinaigre de cidre', qty: '1 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Gingembre frais', qty: '1 c.à.c' },
      { name: 'Brocoli', qty: '150g' },
      { name: 'Graines de sésame', qty: '1 c.à.c' },
      { name: 'Oignon nouveau', qty: '1' }
    ],
    steps: [
      'Mélange sauce soja, miel, vinaigre, ail et gingembre hachés. C\'est ta sauce teriyaki.',
      'Coupe le poulet en cubes. Fais-le dorer dans une poêle 5 min.',
      'Verse la sauce, laisse réduire 5 min jusqu\'à ce qu\'elle nappe le poulet.',
      'Cuis le brocoli à la vapeur 4 min.',
      'Dans un bowl : riz, poulet teriyaki, brocoli.',
      'Parsème de sésame et oignon nouveau émincé.'
    ],
    substitutions: [
      { from: 'Brocoli', to: 'Haricots verts' }
    ],
    coach_note: 'Repas idéal post-séance : 48g de protéines, glucides parfaits pour recharger.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fb8500,#023047)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Nouilles Sautées aux Légumes (Chow Mein)',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 470,
    total_protein: 18,
    total_carbs: 72,
    total_fat: 12,
    ingredients: [
      { name: 'Nouilles chinoises (ou spaghetti)', qty: '120g' },
      { name: 'Carotte', qty: '1' },
      { name: 'Poivron rouge', qty: '½' },
      { name: 'Chou blanc', qty: '100g' },
      { name: 'Champignons', qty: '80g' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Huile végétale', qty: '1 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Huile de sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Cuis les nouilles selon le paquet, égoutte.',
      'Coupe tous les légumes en julienne.',
      'Dans un wok très chaud, fais sauter ail et gingembre.',
      'Ajoute les légumes les plus durs (carotte) en premier, 2 min.',
      'Puis poivron, champignons, chou. Saute 3 min à feu vif.',
      'Ajoute les nouilles, sauce soja, huile de sésame. Mélange 2 min.',
      'Sers immédiatement.'
    ],
    substitutions: [
      { from: 'Nouilles chinoises', to: 'Spaghetti ou linguine' }
    ],
    coach_note: 'Plat 100% végétarien mais qui rassasie. Tu peux ajouter du poulet ou du tofu pour 25g de protéines en plus.',
    photo_url: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#ffb703,#fb8500)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Curry Vert Thaï au Poulet',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'spicy',
    prep_time: 30,
    difficulty: 2,
    total_calories: 580,
    total_protein: 42,
    total_carbs: 48,
    total_fat: 24,
    ingredients: [
      { name: 'Blanc de poulet', qty: '200g' },
      { name: 'Lait de coco', qty: '200ml' },
      { name: 'Pâte de curry vert', qty: '2 c.à.s' },
      { name: 'Riz basmati cuit', qty: '150g' },
      { name: 'Aubergine', qty: '½' },
      { name: 'Poivron vert', qty: '½' },
      { name: 'Haricots verts', qty: '100g' },
      { name: 'Sauce soja', qty: '1 c.à.s' },
      { name: 'Citron vert', qty: '½' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' }
    ],
    steps: [
      'Fais chauffer la pâte de curry dans une casserole 1 min.',
      'Ajoute le lait de coco, mélange.',
      'Ajoute le poulet en dés, mijote 5 min.',
      'Ajoute les légumes en morceaux, sauce soja. Mijote 12 min.',
      'Termine par jus de citron vert et coriandre.',
      'Sers avec le riz basmati.'
    ],
    substitutions: [
      { from: 'Pâte de curry vert', to: 'Curry en poudre + un peu d\'harissa' }
    ],
    coach_note: 'Le lait de coco contient des bonnes graisses. Plat parfait pour recharger après une grosse séance.',
    photo_url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Soupe Pho Vietnamienne au Bœuf',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 1,
    total_calories: 380,
    total_protein: 32,
    total_carbs: 48,
    total_fat: 6,
    ingredients: [
      { name: 'Filet de bœuf très fin', qty: '120g' },
      { name: 'Nouilles de riz', qty: '80g' },
      { name: 'Bouillon de bœuf', qty: '800ml' },
      { name: 'Gingembre frais', qty: '1 morceau (3cm)' },
      { name: 'Anis étoilé', qty: '2' },
      { name: 'Cannelle', qty: '1 bâton' },
      { name: 'Oignon', qty: '1' },
      { name: 'Citron vert', qty: '½' },
      { name: 'Coriandre, basilic frais', qty: '1 poignée' },
      { name: 'Pousses de soja', qty: '50g' }
    ],
    steps: [
      'Fais griller à sec gingembre tranché, anis et cannelle 2 min jusqu\'à parfumé.',
      'Ajoute le bouillon, l\'oignon coupé en deux. Mijote 20 min.',
      'Pendant ce temps, cuis les nouilles selon le paquet.',
      'Filtre le bouillon.',
      'Dans un bol, mets les nouilles, ajoute les tranches de bœuf cru très fines.',
      'Verse le bouillon brûlant qui cuira le bœuf instantanément.',
      'Sers avec citron vert, herbes fraîches, pousses de soja.'
    ],
    substitutions: [
      { from: 'Nouilles de riz', to: 'Vermicelles de riz ou pâtes fines' }
    ],
    coach_note: 'Soupe complète, légère mais protéinée. Parfaite quand tu sors du gym le soir.',
    photo_url: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bœuf aux Oignons Style Chinois',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 1,
    total_calories: 520,
    total_protein: 38,
    total_carbs: 12,
    total_fat: 32,
    ingredients: [
      { name: 'Bavette ou rumsteck', qty: '200g' },
      { name: 'Oignons', qty: '2 gros' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Sauce huître (ou plus soja)', qty: '1 c.à.s' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Maïzena', qty: '1 c.à.c' },
      { name: 'Huile végétale', qty: '2 c.à.s' },
      { name: 'Huile de sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Coupe le bœuf en lanières fines. Marine avec 1 c.à.s soja + maïzena 10 min.',
      'Émince les oignons en lamelles épaisses.',
      'Wok bien chaud, fais sauter le bœuf 2 min à feu très vif. Réserve.',
      'Dans le même wok, fais revenir ail, gingembre, puis oignons 4 min.',
      'Remets le bœuf. Ajoute soja, huître. Mélange 1 min.',
      'Termine par huile de sésame. Sers avec du riz.'
    ],
    substitutions: [
      { from: 'Sauce huître', to: 'Plus de sauce soja + un peu de miel' }
    ],
    coach_note: 'Cuisson rapide à feu très vif = bœuf tendre, oignons croquants. C\'est ça le secret du wok.',
    photo_url: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bb9457)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Sushi Bowl Saumon',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 20,
    difficulty: 1,
    total_calories: 510,
    total_protein: 32,
    total_carbs: 58,
    total_fat: 18,
    ingredients: [
      { name: 'Saumon frais ou en filet', qty: '150g' },
      { name: 'Riz à sushi cuit (ou riz rond)', qty: '150g' },
      { name: 'Avocat', qty: '½' },
      { name: 'Concombre', qty: '½' },
      { name: 'Carotte râpée', qty: '50g' },
      { name: 'Edamame ou petits pois', qty: '50g' },
      { name: 'Vinaigre de riz', qty: '1 c.à.s' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Graines de sésame', qty: '1 c.à.c' },
      { name: 'Algue nori (facultatif)', qty: '1 feuille' }
    ],
    steps: [
      'Assaisonne le riz cuit chaud avec le vinaigre de riz. Laisse refroidir.',
      'Coupe le saumon en cubes (si tu utilises du saumon cru frais).',
      'Mélange le saumon avec 1 c.à.s sauce soja.',
      'Dans un bol : riz, saumon, avocat tranché, concombre, carotte, edamame.',
      'Arrose du reste de sauce soja, parsème de sésame.',
      'Ajoute des morceaux de nori découpés.'
    ],
    substitutions: [
      { from: 'Saumon cru', to: 'Saumon cuit (poêlé)' }
    ],
    coach_note: 'Bol équilibré, frais et coloré. Si tu prends du saumon cru, vérifie qu\'il soit ultra frais.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fb8500,#a3b18a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Ramen Maison au Poulet',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 2,
    total_calories: 540,
    total_protein: 36,
    total_carbs: 68,
    total_fat: 12,
    ingredients: [
      { name: 'Nouilles ramen (ou spaghetti)', qty: '100g' },
      { name: 'Blanc de poulet', qty: '150g' },
      { name: 'Bouillon de volaille', qty: '700ml' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Miso (si disponible) ou sauce soja', qty: '1 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Œuf', qty: '1' },
      { name: 'Pousses de soja', qty: '50g' },
      { name: 'Oignon nouveau', qty: '1' }
    ],
    steps: [
      'Cuis l\'œuf 6 min dans l\'eau bouillante. Plonge dans l\'eau glacée, écale, coupe en deux.',
      'Fais cuire le poulet à la poêle. Tranche-le.',
      'Dans une casserole, mélange bouillon + sauce soja + miso + ail + gingembre. Chauffe.',
      'Cuis les nouilles séparément.',
      'Dans un bol : nouilles, bouillon brûlant, poulet, œuf, pousses de soja, oignon nouveau.'
    ],
    substitutions: [
      { from: 'Miso', to: 'Plus de sauce soja + 1 c.à.c sucre' }
    ],
    coach_note: 'Mon ramen maison rapide. Pour un vrai bouillon profond, tu peux mijoter avec des os de poulet 2h.',
    photo_url: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Crevettes Sautées Sauce Soja',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 15,
    difficulty: 1,
    total_calories: 320,
    total_protein: 38,
    total_carbs: 14,
    total_fat: 12,
    ingredients: [
      { name: 'Crevettes décortiquées', qty: '200g' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Citron', qty: '½' },
      { name: 'Piment frais', qty: '1' },
      { name: 'Huile de sésame', qty: '1 c.à.c' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' }
    ],
    steps: [
      'Mélange sauce soja, miel, jus de citron pour la marinade.',
      'Wok bien chaud, fais sauter ail, gingembre, piment haché 30 sec.',
      'Ajoute les crevettes, fais cuire 3 min jusqu\'à rosées.',
      'Verse la sauce, mélange 1 min.',
      'Termine par huile de sésame et coriandre.',
      'Sers avec du riz ou des légumes vapeur.'
    ],
    substitutions: [
      { from: 'Crevettes', to: 'Calamars ou poulet en lanières' }
    ],
    coach_note: '38g de protéines pour seulement 320 kcal. Idéal en cut.',
    photo_url: 'https://images.unsplash.com/photo-1633237308525-cd587cf71926?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e76f51,#f4a261)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Tofu Sauté à l\'Asiatique',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 1,
    total_calories: 420,
    total_protein: 28,
    total_carbs: 38,
    total_fat: 18,
    ingredients: [
      { name: 'Tofu ferme', qty: '200g' },
      { name: 'Riz cuit', qty: '120g' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Maïzena', qty: '1 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Brocoli', qty: '100g' },
      { name: 'Huile de sésame', qty: '1 c.à.c' },
      { name: 'Graines de sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Coupe le tofu en cubes, presse pour enlever l\'eau, passe dans la maïzena.',
      'Fais dorer dans une poêle huilée, toutes faces, jusqu\'à croustillant.',
      'Réserve. Fais sauter ail, gingembre, puis brocoli en bouquets.',
      'Remets le tofu. Ajoute soja, miel. Mélange.',
      'Termine par huile de sésame. Sers sur le riz, parsème de sésame.'
    ],
    substitutions: [
      { from: 'Tofu', to: 'Pois chiches cuits' }
    ],
    coach_note: 'Plat végétarien complet. Le tofu croustillant à l\'extérieur, fondant à l\'intérieur — c\'est la maïzena qui fait ça.',
    photo_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e9c46a,#2a9d8f)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Gyozas Maison au Poulet',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 2,
    total_calories: 380,
    total_protein: 22,
    total_carbs: 42,
    total_fat: 12,
    ingredients: [
      { name: 'Pâte à raviolis chinois', qty: '20 disques' },
      { name: 'Poulet haché', qty: '150g' },
      { name: 'Chou chinois', qty: '100g' },
      { name: 'Oignon nouveau', qty: '2' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Huile de sésame', qty: '1 c.à.c' },
      { name: 'Huile végétale', qty: '1 c.à.s' }
    ],
    steps: [
      'Hache finement chou, oignons. Sale-les 10 min puis presse l\'eau.',
      'Mélange avec poulet, ail, gingembre, 1 c.à.s soja, huile de sésame.',
      'Sur chaque disque, dépose 1 c.à.c de farce. Humidifie les bords, plie en demi-lune en faisant des plis.',
      'Dans une poêle chaude avec huile, dispose les gyozas debout. Fais dorer le dessous 2 min.',
      'Verse 80ml d\'eau, couvre, cuis 5 min jusqu\'à évaporation.',
      'Sers avec sauce soja + vinaigre pour tremper.'
    ],
    substitutions: [
      { from: 'Pâte à raviolis chinois', to: 'Pâte à dim sum ou pâte fine maison' }
    ],
    coach_note: 'Long à préparer mais tellement satisfaisant. Tu peux congeler les gyozas crus et les cuire plus tard.',
    photo_url: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Thaï au Poulet et Cacahuètes',
    category: 'salads',
    cuisine: 'asian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 20,
    difficulty: 1,
    total_calories: 420,
    total_protein: 36,
    total_carbs: 28,
    total_fat: 18,
    ingredients: [
      { name: 'Blanc de poulet', qty: '150g' },
      { name: 'Chou rouge', qty: '100g' },
      { name: 'Carotte râpée', qty: '1' },
      { name: 'Concombre', qty: '½' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' },
      { name: 'Menthe fraîche', qty: '8 feuilles' },
      { name: 'Cacahuètes nature', qty: '20g' },
      { name: 'Jus de citron vert', qty: '2 c.à.s' },
      { name: 'Sauce soja', qty: '1 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Piment frais', qty: '½' }
    ],
    steps: [
      'Cuis le poulet à la poêle. Effiloche-le.',
      'Mélange tous les légumes en julienne fine.',
      'Fais la sauce : citron vert, soja, miel, piment haché.',
      'Mélange tout, ajoute herbes et cacahuètes concassées sur le dessus.',
      'Sers froid ou tiède.'
    ],
    substitutions: [
      { from: 'Cacahuètes', to: 'Amandes ou noix de cajou' }
    ],
    coach_note: 'Salade explosive en goût. Le combo croquant-tendre-épicé-frais te scotche.',
    photo_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#e9c46a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Curry Japonais au Poulet',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 40,
    difficulty: 2,
    total_calories: 620,
    total_protein: 38,
    total_carbs: 78,
    total_fat: 18,
    ingredients: [
      { name: 'Blanc de poulet', qty: '200g' },
      { name: 'Riz blanc cuit', qty: '180g' },
      { name: 'Carottes', qty: '2' },
      { name: 'Pommes de terre', qty: '2' },
      { name: 'Oignon', qty: '1' },
      { name: 'Curry en poudre', qty: '2 c.à.s' },
      { name: 'Farine', qty: '2 c.à.s' },
      { name: 'Bouillon de volaille', qty: '500ml' },
      { name: 'Sauce soja', qty: '1 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Beurre', qty: '20g' }
    ],
    steps: [
      'Coupe poulet, carottes, pommes de terre, oignon en cubes.',
      'Fais dorer le poulet. Réserve.',
      'Dans le même fond, fais revenir oignons, puis ajoute carottes et patates.',
      'Saupoudre de farine, mélange 1 min.',
      'Verse le bouillon. Ajoute curry, soja, miel, beurre.',
      'Remets le poulet. Mijote 25 min à feu doux.',
      'Sers sur le riz.'
    ],
    substitutions: [
      { from: 'Curry japonais en bloc', to: 'Curry en poudre + 2 c.à.s farine + beurre' }
    ],
    coach_note: 'Le curry japonais c\'est plus doux et plus épais que l\'indien. Réconfort total.',
    photo_url: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fb8500)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Brochettes de Poulet Satay (Sauce Cacahuète)',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 30,
    difficulty: 2,
    total_calories: 520,
    total_protein: 48,
    total_carbs: 14,
    total_fat: 30,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Beurre de cacahuète', qty: '3 c.à.s' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Lait de coco', qty: '4 c.à.s' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Curry', qty: '1 c.à.c' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Citron vert', qty: '½' },
      { name: 'Coriandre', qty: '1 c.à.s' }
    ],
    steps: [
      'Coupe le poulet en cubes. Marine 15 min dans 1 c.à.s soja + 1 c.à.s lait coco + curry + ail.',
      'Pendant ce temps, prépare la sauce : beurre de cacahuète + lait coco + soja restant + miel + jus de citron. Mélange.',
      'Enfile le poulet sur des piques.',
      'Grille à la poêle ou au four (4 min par côté).',
      'Sers avec la sauce satay, parsème de coriandre.'
    ],
    substitutions: [
      { from: 'Beurre de cacahuète', to: 'Beurre d\'amande' }
    ],
    coach_note: 'Brochettes asiatiques avec la fameuse sauce satay. 48g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1604908554049-c9f6e9c1c3b3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#e9c46a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Wraps Vietnamiens aux Crevettes',
    category: 'snacks',
    cuisine: 'asian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 25,
    difficulty: 2,
    total_calories: 280,
    total_protein: 24,
    total_carbs: 32,
    total_fat: 4,
    ingredients: [
      { name: 'Galettes de riz (papier de riz)', qty: '6' },
      { name: 'Crevettes cuites', qty: '120g' },
      { name: 'Vermicelles de riz cuits', qty: '60g' },
      { name: 'Salade verte', qty: '6 feuilles' },
      { name: 'Concombre', qty: '½' },
      { name: 'Carotte râpée', qty: '1' },
      { name: 'Menthe, coriandre fraîches', qty: '1 poignée' },
      { name: 'Sauce hoisin (ou soja+miel)', qty: '3 c.à.s' }
    ],
    steps: [
      'Trempe une galette de riz dans l\'eau tiède 10 sec jusqu\'à souple.',
      'Pose à plat sur un torchon humide.',
      'Au centre : salade, vermicelles, légumes, herbes, 2 crevettes coupées en deux.',
      'Roule comme un wrap, en repliant les côtés.',
      'Répète. Sers avec la sauce.'
    ],
    substitutions: [
      { from: 'Sauce hoisin', to: '2 c.à.s sauce soja + 1 c.à.s miel + un peu d\'ail' }
    ],
    coach_note: 'Frais, croquant, et seulement 280 kcal. Parfait été ou en entrée.',
    photo_url: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a3b18a,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Riz Cantonais',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 490,
    total_protein: 22,
    total_carbs: 70,
    total_fat: 12,
    ingredients: [
      { name: 'Riz cuit (froid)', qty: '200g' },
      { name: 'Œufs', qty: '2' },
      { name: 'Crevettes décortiquées', qty: '80g' },
      { name: 'Dinde fumée en dés', qty: '50g' },
      { name: 'Petits pois', qty: '60g' },
      { name: 'Sauce soja', qty: '2 c.à.s' },
      { name: 'Oignon nouveau', qty: '1' },
      { name: 'Huile végétale', qty: '1 c.à.s' },
      { name: 'Ail', qty: '1 gousse' }
    ],
    steps: [
      'Bats les œufs. Fais une omelette plate, coupe en lanières.',
      'Wok chaud, fais sauter ail puis crevettes 2 min. Réserve.',
      'Ajoute riz et petits pois, mélange 3 min.',
      'Ajoute dinde fumée, œufs, crevettes. Mélange.',
      'Ajoute sauce soja, oignon nouveau émincé. Sers.'
    ],
    substitutions: [
      { from: 'Dinde fumée', to: 'Poulet cuit' }
    ],
    coach_note: 'Le riz cantonais c\'est l\'invention du restaurant chinois algérien — adapté avec ce qu\'on a. Parfait.',
    photo_url: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e9c46a,#f4a261)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Œufs Brouillés Style Chinois aux Tomates',
    category: 'breakfast',
    cuisine: 'asian',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 12,
    difficulty: 1,
    total_calories: 280,
    total_protein: 18,
    total_carbs: 12,
    total_fat: 18,
    ingredients: [
      { name: 'Œufs', qty: '3' },
      { name: 'Tomates mûres', qty: '2' },
      { name: 'Oignon nouveau', qty: '1' },
      { name: 'Sauce soja', qty: '1 c.à.s' },
      { name: 'Sucre', qty: '1 pincée' },
      { name: 'Huile végétale', qty: '1 c.à.s' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Bats les œufs avec sel.',
      'Coupe les tomates en quartiers.',
      'Wok chaud, fais cuire les œufs comme une omelette pas trop cuite, casse en gros morceaux. Réserve.',
      'Dans le même wok, fais sauter les tomates 3 min.',
      'Ajoute sauce soja et sucre. Mélange.',
      'Remets les œufs, mélange 30 sec. Sers avec oignon nouveau.'
    ],
    substitutions: [],
    coach_note: 'Plat chinois populaire qu\'on mange au petit-déj ou en dîner rapide. Simple mais délicieux.',
    photo_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#f4a261)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Aubergine Sichuan',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'spicy',
    prep_time: 25,
    difficulty: 2,
    total_calories: 320,
    total_protein: 10,
    total_carbs: 32,
    total_fat: 16,
    ingredients: [
      { name: 'Aubergines', qty: '2' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Vinaigre de riz (ou cidre)', qty: '1 c.à.s' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Piment rouge sec', qty: '1' },
      { name: 'Huile végétale', qty: '2 c.à.s' },
      { name: 'Oignon nouveau', qty: '1' },
      { name: 'Sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Coupe les aubergines en bâtonnets. Sale-les 10 min, sèche.',
      'Fais-les sauter dans l\'huile chaude 8 min jusqu\'à fondantes. Réserve.',
      'Dans le wok, fais revenir ail, gingembre, piment 30 sec.',
      'Mélange soja, vinaigre, miel. Verse dans le wok.',
      'Remets les aubergines, mélange 2 min.',
      'Garnis d\'oignon nouveau et sésame.'
    ],
    substitutions: [],
    coach_note: 'Plat sichuanais, légèrement épicé. L\'aubergine devient fondante et caramélisée.',
    photo_url: 'https://images.unsplash.com/photo-1625938145744-e380515399b7?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poulet Général Tao',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 2,
    total_calories: 580,
    total_protein: 42,
    total_carbs: 52,
    total_fat: 22,
    ingredients: [
      { name: 'Blanc de poulet', qty: '250g' },
      { name: 'Maïzena', qty: '3 c.à.s' },
      { name: 'Œuf', qty: '1' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Miel', qty: '2 c.à.s' },
      { name: 'Vinaigre de riz ou cidre', qty: '1 c.à.s' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Piment sec', qty: '1' },
      { name: 'Riz cuit', qty: '150g' },
      { name: 'Huile végétale', qty: '3 c.à.s' }
    ],
    steps: [
      'Coupe le poulet en dés. Bat l\'œuf, mélange avec poulet, passe dans la maïzena.',
      'Fais frire dans l\'huile chaude jusqu\'à doré et croustillant. Égoutte sur papier.',
      'Dans la poêle, fais revenir ail, gingembre, piment 30 sec.',
      'Mélange soja, miel, vinaigre. Verse dans la poêle, fais réduire 2 min.',
      'Remets le poulet, enrobe bien.',
      'Sers sur le riz.'
    ],
    substitutions: [
      { from: 'Friture', to: 'Cuisson à la poêle avec moins d\'huile' }
    ],
    coach_note: 'Le poulet du resto chinois en mieux à la maison. Saint-Bernard-style à mâcher avec un verre d\'eau.',
    photo_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#ee9b00)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Soupe Miso aux Légumes',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 180,
    total_protein: 14,
    total_carbs: 18,
    total_fat: 6,
    ingredients: [
      { name: 'Pâte de miso (ou sauce soja x3)', qty: '2 c.à.s' },
      { name: 'Tofu soyeux', qty: '100g' },
      { name: 'Algue wakame séchée (facultatif)', qty: '1 c.à.s' },
      { name: 'Champignons shiitake (ou Paris)', qty: '50g' },
      { name: 'Oignon nouveau', qty: '2' },
      { name: 'Eau', qty: '700ml' },
      { name: 'Sauce soja', qty: '1 c.à.s' },
      { name: 'Gingembre', qty: '1 c.à.c' }
    ],
    steps: [
      'Réhydrate l\'algue dans l\'eau froide 5 min.',
      'Fais chauffer l\'eau avec gingembre et champignons tranchés 8 min.',
      'Hors du feu, dissous le miso dans une louche de bouillon, puis remets.',
      'Ajoute le tofu en cubes, l\'algue égouttée, la sauce soja.',
      'Sers avec oignon nouveau émincé sur le dessus. NE PAS faire bouillir le miso.'
    ],
    substitutions: [
      { from: 'Miso', to: 'Plus de sauce soja' }
    ],
    coach_note: 'Soupe de 180 kcal qui réchauffe. Le miso contient des probiotiques bons pour la digestion.',
    photo_url: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bo Bun Vietnamien',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 25,
    difficulty: 2,
    total_calories: 460,
    total_protein: 32,
    total_carbs: 52,
    total_fat: 14,
    ingredients: [
      { name: 'Bœuf en lanières (rumsteck)', qty: '150g' },
      { name: 'Vermicelles de riz cuits', qty: '80g' },
      { name: 'Salade verte', qty: '50g' },
      { name: 'Concombre', qty: '½' },
      { name: 'Carotte râpée', qty: '1' },
      { name: 'Cacahuètes nature', qty: '20g' },
      { name: 'Menthe, coriandre fraîches', qty: '1 poignée' },
      { name: 'Sauce nuoc-mâm (ou soja)', qty: '3 c.à.s' },
      { name: 'Jus de citron vert', qty: '2 c.à.s' },
      { name: 'Miel', qty: '1 c.à.c' },
      { name: 'Ail', qty: '1 gousse' }
    ],
    steps: [
      'Marine le bœuf avec sauce soja, ail haché, miel 10 min.',
      'Fais-le sauter dans une poêle bien chaude 2-3 min.',
      'Dans un grand bol : salade, vermicelles, carotte, concombre.',
      'Pose le bœuf chaud par-dessus.',
      'Mélange sauce : nuoc-mâm, citron vert, eau (3 c.à.s), un peu de sucre.',
      'Arrose le bowl, ajoute herbes et cacahuètes concassées.'
    ],
    substitutions: [
      { from: 'Nuoc-mâm', to: 'Sauce soja' }
    ],
    coach_note: 'Bowl asiatique typique. Frais, croquant, savoureux.',
    photo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a3b18a,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Brochettes Yakitori',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 25,
    difficulty: 1,
    total_calories: 380,
    total_protein: 42,
    total_carbs: 22,
    total_fat: 12,
    ingredients: [
      { name: 'Cuisses de poulet désossées', qty: '200g' },
      { name: 'Oignon nouveau', qty: '4' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Mirin (ou miel + vinaigre)', qty: '2 c.à.s' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Coupe le poulet en cubes. Coupe les oignons nouveaux en tronçons de 3cm.',
      'Enfile poulet et oignons en alternance sur les piques.',
      'Mélange soja, mirin, miel, ail, gingembre pour la sauce yakitori.',
      'Grille les brochettes 6-8 min en les retournant. Badigeonne de sauce 3-4 fois pendant la cuisson.',
      'Saupoudre de sésame avant de servir.'
    ],
    substitutions: [
      { from: 'Cuisses', to: 'Blancs de poulet (un peu plus secs)' }
    ],
    coach_note: 'Snack japonais des izakayas. 42g de protéines pour 380 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#ee9b00)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Korean BBQ Beef (Bulgogi)',
    category: 'main_meals',
    cuisine: 'asian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 30,
    difficulty: 2,
    total_calories: 580,
    total_protein: 46,
    total_carbs: 38,
    total_fat: 24,
    ingredients: [
      { name: 'Bœuf en tranches fines (rumsteck)', qty: '250g' },
      { name: 'Sauce soja', qty: '3 c.à.s' },
      { name: 'Miel ou sucre brun', qty: '2 c.à.s' },
      { name: 'Huile de sésame', qty: '1 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Poire ou pomme râpée', qty: '½' },
      { name: 'Oignon', qty: '½' },
      { name: 'Riz cuit', qty: '150g' },
      { name: 'Oignon nouveau', qty: '2' },
      { name: 'Sésame', qty: '1 c.à.c' }
    ],
    steps: [
      'Mélange soja, miel, huile de sésame, ail, gingembre, poire râpée, oignon haché.',
      'Marine le bœuf au minimum 30 min (idéalement 2h).',
      'Fais sauter dans une poêle très chaude 3 min par paquets pour bien colorer.',
      'Sers sur le riz, parsème de sésame et oignon nouveau.'
    ],
    substitutions: [
      { from: 'Poire', to: 'Pomme ou un peu plus de sucre' }
    ],
    coach_note: 'Le bulgogi coréen — la poire ou pomme attendrit la viande naturellement. Astuce de chef coréen.',
    photo_url: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Mochi Glacé Maison (Boules Coco)',
    category: 'desserts',
    cuisine: 'asian',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 2,
    total_calories: 180,
    total_protein: 3,
    total_carbs: 32,
    total_fat: 6,
    ingredients: [
      { name: 'Farine de riz gluant (mochiko)', qty: '100g' },
      { name: 'Sucre', qty: '40g' },
      { name: 'Eau', qty: '120ml' },
      { name: 'Noix de coco râpée', qty: '40g' },
      { name: 'Garniture : confiture, chocolat ou pâte de haricot rouge', qty: '4 c.à.c' }
    ],
    steps: [
      'Mélange farine de riz, sucre, eau dans un bol. Couvre, micro-ondes 3 min en remuant à mi-cuisson.',
      'La pâte doit être translucide et collante.',
      'Saupoudre ton plan de travail de noix de coco. Sors la pâte, sépare en 4 boules.',
      'Aplatis chaque boule, mets une c.à.c de garniture, referme en boule.',
      'Roule dans la noix de coco.',
      'Réfrigère 30 min avant de servir.'
    ],
    substitutions: [
      { from: 'Farine de riz gluant', to: 'Difficile à substituer — c\'est l\'ingrédient clé' }
    ],
    coach_note: 'Mochi japonais simplifié. Pas trop sucré, texture unique.',
    photo_url: 'https://images.unsplash.com/photo-1591985666643-1ecc67616216?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pancakes Banane Style Hong Kong',
    category: 'breakfast',
    cuisine: 'asian',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 15,
    difficulty: 1,
    total_calories: 380,
    total_protein: 14,
    total_carbs: 58,
    total_fat: 10,
    ingredients: [
      { name: 'Farine', qty: '80g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Lait', qty: '100ml' },
      { name: 'Banane', qty: '1' },
      { name: 'Miel', qty: '1 c.à.s' },
      { name: 'Levure chimique', qty: '½ c.à.c' },
      { name: 'Beurre', qty: '10g' }
    ],
    steps: [
      'Écrase la banane à la fourchette.',
      'Mélange farine, levure. Ajoute œuf, lait, banane écrasée, miel.',
      'Fais chauffer une poêle avec un peu de beurre.',
      'Verse des petites louches. Cuis 2 min jusqu\'à ce que des bulles se forment, retourne 1 min.',
      'Sers chaud avec miel ou banane fraîche.'
    ],
    substitutions: [
      { from: 'Banane', to: 'Pomme râpée' }
    ],
    coach_note: 'Pancakes asiatiques épais et moelleux. La banane remplace une partie du sucre.',
    photo_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#e9c46a)',
    membership_required: 'cookbook',
    featured: false
  }
]

console.log(`Seeding ${recipes.length} Asian recipes...`)

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
