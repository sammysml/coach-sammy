// seed-anabolic-desserts.mjs
// Adds 20 Algerian-adapted ANABOLIC desserts & protein treats to cookbook_recipes.
// High protein, low-to-moderate calorie, halal, ingredients available in Algerian
// supermarkets (Carrefour, Ardis, Family Shop, Numidis).
//
// SETUP (run from /Users/mac/Downloads/coach-sammy/):
//   export SUPABASE_URL=https://korektlpnwuefsagfuvq.supabase.co
//   export SUPABASE_SERVICE_KEY=eyJ...        (service_role)
//   node seed-anabolic-desserts.mjs
//
// NOTE: difficulty is INTEGER (1=facile, 2=moyen, 3=difficile). cuisine='algerian'.
// After seeding, run generate-recipe-images-FULL.mjs again — it will auto-generate
// images for these new recipes (they have no bucket image yet).

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://korektlpnwuefsagfuvq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SUPABASE_SERVICE_KEY) { console.error('Missing SUPABASE_SERVICE_KEY'); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Each recipe: title (FR + arabic subtitle in description), macros are PER SERVING,
// ingredients[] = {name, qty, calories, protein, carbs, fat}, steps[] = strings.
const RECIPES = [
  {
    title: 'Glace Protéinée Banane Choco (Anabolic Ice Cream)',
    description: 'Glace anabolique crémeuse, riche en protéines et faible en calories. آيس كريم بروتيني',
    total_calories: 210, total_protein: 32, total_carbs: 18, total_fat: 2,
    servings: 1, prep_time: 5, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Banane congelée', qty:'1 moyenne (100g)', calories:89, protein:1, carbs:23, fat:0},
      {name:'Whey chocolat', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Lait écrémé', qty:'80ml', calories:30, protein:3, carbs:4, fat:0},
      {name:'Cacao non sucré', qty:'1 c.à.c', calories:12, protein:1, carbs:3, fat:0},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Congeler la banane en rondelles la veille.','Mettre tous les ingrédients dans un blender.','Mixer jusqu\'à texture crémeuse de glace.','Servir immédiatement ou congeler 30 min pour plus ferme.'],
  },
  {
    title: 'Cheesecake Protéiné Fromage Blanc',
    description: 'Cheesecake léger sans cuisson, riche en protéines. تشيز كيك بروتيني',
    total_calories: 230, total_protein: 28, total_carbs: 20, total_fat: 5,
    servings: 1, prep_time: 10, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Fromage blanc 0%', qty:'200g', calories:100, protein:16, carbs:8, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Biscuit sec écrasé', qty:'1 (10g)', calories:45, protein:1, carbs:7, fat:2},
      {name:'Miel', qty:'1 c.à.c', calories:21, protein:0, carbs:5, fat:0},
      {name:'Vanille', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Écraser le biscuit au fond d\'un ramequin.','Mélanger fromage blanc, whey et vanille jusqu\'à lisse.','Verser sur la base de biscuit.','Réfrigérer 2h. Napper de miel avant de servir.'],
  },
  {
    title: 'Mousse Protéinée au Chocolat',
    description: 'Mousse aérienne et chocolatée, haute en protéines. موس بروتيني بالشوكولاتة',
    total_calories: 180, total_protein: 26, total_carbs: 12, total_fat: 4,
    servings: 1, prep_time: 8, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Fromage blanc 0%', qty:'150g', calories:75, protein:12, carbs:6, fat:0},
      {name:'Whey chocolat', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Cacao non sucré', qty:'1 c.à.s', calories:24, protein:2, carbs:4, fat:1},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Fouetter le fromage blanc jusqu\'à aérer.','Incorporer whey, cacao et édulcorant.','Mélanger délicatement.','Réfrigérer 1h avant de servir.'],
  },
  {
    title: 'Dattes Fourrées Beurre de Cacahuète',
    description: 'Snack sucré-salé énergétique, classique revisité. تمر محشي',
    total_calories: 200, total_protein: 9, total_carbs: 28, total_fat: 7,
    servings: 1, prep_time: 5, difficulty: 1, category: 'Desserts', goal_tag: 'high_protein', craving_tag: 'sweet',
    ingredients: [
      {name:'Dattes Deglet Nour', qty:'3 (45g)', calories:130, protein:1, carbs:32, fat:0},
      {name:'Beurre de cacahuète', qty:'1 c.à.s (15g)', calories:94, protein:4, carbs:3, fat:8},
      {name:'Whey vanille (saupoudrée)', qty:'1/4 scoop (8g)', calories:30, protein:6, carbs:1, fat:0},
    ],
    steps: ['Dénoyauter les dattes.','Remplir chaque datte de beurre de cacahuète.','Saupoudrer légèrement de whey vanille.','Réfrigérer 15 min pour raffermir.'],
  },
  {
    title: 'Riz au Lait Protéiné Cannelle',
    description: 'Version anabolique du riz au lait traditionnel. روز بالحليب بروتيني',
    total_calories: 250, total_protein: 24, total_carbs: 35, total_fat: 2,
    servings: 1, prep_time: 20, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Riz rond', qty:'40g cru', calories:140, protein:3, carbs:31, fat:0},
      {name:'Lait écrémé', qty:'200ml', calories:70, protein:7, carbs:10, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Cannelle', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Cuire le riz dans le lait à feu doux 15 min.','Laisser tiédir.','Incorporer la whey hors du feu (sinon elle coagule).','Ajouter cannelle et édulcorant. Servir chaud ou froid.'],
  },
  {
    title: 'Brownie Protéiné Express',
    description: 'Brownie fondant au micro-ondes, prêt en 2 min. براوني بروتيني',
    total_calories: 220, total_protein: 25, total_carbs: 18, total_fat: 6,
    servings: 1, prep_time: 5, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'chocolate',
    ingredients: [
      {name:'Whey chocolat', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Cacao non sucré', qty:'1 c.à.s', calories:24, protein:2, carbs:4, fat:1},
      {name:'Banane écrasée', qty:'1/2 (50g)', calories:45, protein:1, carbs:11, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mélanger tous les ingrédients dans un mug.','Micro-ondes 60-90 secondes.','Laisser reposer 1 min.','Démouler et déguster tiède.'],
  },
  {
    title: 'Pana Cotta Protéinée Vanille',
    description: 'Crème prise légère et protéinée. بانا كوتا بروتيني',
    total_calories: 160, total_protein: 22, total_carbs: 10, total_fat: 3,
    servings: 1, prep_time: 10, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Lait écrémé', qty:'150ml', calories:53, protein:5, carbs:7, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Fromage blanc 0%', qty:'80g', calories:40, protein:6, carbs:3, fat:0},
      {name:'Gélatine', qty:'2g', calories:7, protein:2, carbs:0, fat:0},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Hydrater la gélatine dans un peu d\'eau froide.','Chauffer le lait sans bouillir, dissoudre la gélatine.','Hors du feu, incorporer whey et fromage blanc.','Verser en ramequin, réfrigérer 4h.'],
  },
  {
    title: 'Crêpes Protéinées Algériennes',
    description: 'Crêpes moelleuses riches en protéines, façon goûter. كريب بروتيني',
    total_calories: 280, total_protein: 30, total_carbs: 30, total_fat: 4,
    servings: 1, prep_time: 10, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Flocons d\'avoine', qty:'40g', calories:150, protein:5, carbs:27, fat:3},
      {name:'Blanc d\'œuf', qty:'3 (99g)', calories:51, protein:11, carbs:1, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Lait écrémé', qty:'50ml', calories:18, protein:2, carbs:2, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mixer l\'avoine en farine.','Ajouter blancs d\'œuf, whey, lait et levure. Mixer.','Cuire à la poêle antiadhésive 2 min par face.','Garnir de fruits ou sirop sans sucre.'],
  },
  {
    title: 'Yaourt Glacé Fraise Protéiné',
    description: 'Frozen yogurt minute, crémeux et fruité. زبادي مثلج بروتيني',
    total_calories: 170, total_protein: 24, total_carbs: 16, total_fat: 1,
    servings: 1, prep_time: 5, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'fruity',
    ingredients: [
      {name:'Yaourt grec 0%', qty:'150g', calories:90, protein:15, carbs:6, fat:0},
      {name:'Fraises congelées', qty:'100g', calories:32, protein:1, carbs:8, fat:0},
      {name:'Whey vanille', qty:'1/4 scoop (8g)', calories:30, protein:6, carbs:1, fat:0},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mettre fraises congelées et yaourt dans un blender.','Ajouter whey et édulcorant.','Mixer jusqu\'à texture de glace italienne.','Servir aussitôt.'],
  },
  {
    title: 'Basbousa Protéinée (Semoule)',
    description: 'Gâteau de semoule traditionnel allégé et protéiné. بسبوسة بروتيني',
    total_calories: 240, total_protein: 20, total_carbs: 32, total_fat: 4,
    servings: 1, prep_time: 25, difficulty: 2, category: 'Desserts', goal_tag: 'high_protein', craving_tag: 'sweet',
    ingredients: [
      {name:'Semoule fine', qty:'40g', calories:140, protein:4, carbs:29, fat:0},
      {name:'Yaourt grec 0%', qty:'80g', calories:48, protein:8, carbs:3, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
      {name:'Sirop sans sucre', qty:'1 c.à.s', calories:10, protein:0, carbs:2, fat:0},
    ],
    steps: ['Mélanger semoule, yaourt, whey et levure.','Étaler dans un petit moule.','Cuire au four 20 min à 180°C.','Arroser de sirop sans sucre à la sortie.'],
  },
  {
    title: 'Pudding Chia Protéiné Choco',
    description: 'Pudding de chia riche en fibres et protéines. بودينغ شيا',
    total_calories: 230, total_protein: 22, total_carbs: 16, total_fat: 9,
    servings: 1, prep_time: 5, difficulty: 1, category: 'Desserts', goal_tag: 'high_protein', craving_tag: 'chocolate',
    ingredients: [
      {name:'Graines de chia', qty:'2 c.à.s (24g)', calories:115, protein:4, carbs:10, fat:7},
      {name:'Lait écrémé', qty:'150ml', calories:53, protein:5, carbs:7, fat:0},
      {name:'Whey chocolat', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Cacao non sucré', qty:'1 c.à.c', calories:12, protein:1, carbs:3, fat:0},
    ],
    steps: ['Mélanger chia, lait, whey et cacao.','Bien remuer pour éviter les grumeaux.','Réfrigérer toute la nuit.','Remuer et servir avec des fruits.'],
  },
  {
    title: 'Cookie Géant Protéiné',
    description: 'Cookie moelleux au four, un seul gros cookie. كوكي بروتيني',
    total_calories: 250, total_protein: 24, total_carbs: 22, total_fat: 7,
    servings: 1, prep_time: 12, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Flocons d\'avoine', qty:'30g', calories:113, protein:4, carbs:20, fat:2},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Blanc d\'œuf', qty:'1 (33g)', calories:17, protein:4, carbs:0, fat:0},
      {name:'Beurre de cacahuète', qty:'1 c.à.c (8g)', calories:50, protein:2, carbs:2, fat:4},
      {name:'Pépites choco noir', qty:'8g', calories:40, protein:1, carbs:4, fat:2},
    ],
    steps: ['Mixer l\'avoine en farine.','Mélanger tous les ingrédients en pâte.','Former un gros cookie sur papier cuisson.','Cuire 10 min à 180°C. Laisser refroidir.'],
  },
  {
    title: 'Smoothie Bowl Protéiné Banane',
    description: 'Bol smoothie épais à la cuillère, façon petit-déj sucré. سموذي بول',
    total_calories: 290, total_protein: 30, total_carbs: 32, total_fat: 4,
    servings: 1, prep_time: 6, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'fruity',
    ingredients: [
      {name:'Banane congelée', qty:'1 (100g)', calories:89, protein:1, carbs:23, fat:0},
      {name:'Yaourt grec 0%', qty:'100g', calories:60, protein:10, carbs:4, fat:0},
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Flocons d\'avoine (topping)', qty:'10g', calories:38, protein:1, carbs:7, fat:1},
    ],
    steps: ['Mixer banane, yaourt et whey en texture épaisse.','Verser dans un bol.','Garnir de flocons d\'avoine et fruits frais.','Déguster à la cuillère.'],
  },
  {
    title: 'Flan Protéiné Vanille',
    description: 'Flan onctueux cuit au four, sans sucre ajouté. فلان بروتيني',
    total_calories: 150, total_protein: 20, total_carbs: 9, total_fat: 3,
    servings: 1, prep_time: 30, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Lait écrémé', qty:'150ml', calories:53, protein:5, carbs:7, fat:0},
      {name:'Œuf entier', qty:'1 (50g)', calories:72, protein:6, carbs:0, fat:5},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Battre œuf, lait et whey.','Verser en ramequin.','Cuire au bain-marie 25 min à 160°C.','Réfrigérer avant de servir.'],
  },
  {
    title: 'Barres Protéinées Maison Dattes',
    description: 'Barres énergétiques sans cuisson aux dattes. بارات بروتين',
    total_calories: 220, total_protein: 18, total_carbs: 26, total_fat: 5,
    servings: 1, prep_time: 10, difficulty: 1, category: 'Desserts', goal_tag: 'high_protein', craving_tag: 'sweet',
    ingredients: [
      {name:'Dattes', qty:'2 (30g)', calories:87, protein:1, carbs:21, fat:0},
      {name:'Flocons d\'avoine', qty:'20g', calories:75, protein:3, carbs:13, fat:1},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Beurre de cacahuète', qty:'1 c.à.c (8g)', calories:50, protein:2, carbs:2, fat:4},
    ],
    steps: ['Mixer les dattes en pâte.','Ajouter avoine, whey et beurre de cacahuète.','Presser en barres.','Réfrigérer 1h avant de couper.'],
  },
  {
    title: 'Crème Dessert Café Protéinée',
    description: 'Crème type liégeois au café, légère. كريم قهوة بروتيني',
    total_calories: 140, total_protein: 22, total_carbs: 8, total_fat: 2,
    servings: 1, prep_time: 8, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Fromage blanc 0%', qty:'150g', calories:75, protein:12, carbs:6, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Café soluble', qty:'1 c.à.c', calories:2, protein:0, carbs:0, fat:0},
      {name:'Édulcorant', qty:'au goût', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Dissoudre le café dans un peu d\'eau chaude.','Mélanger fromage blanc, whey et café.','Fouetter jusqu\'à onctueux.','Réfrigérer 30 min.'],
  },
  {
    title: 'Gaufres Protéinées',
    description: 'Gaufres croustillantes hautes en protéines. غوفر بروتيني',
    total_calories: 270, total_protein: 28, total_carbs: 28, total_fat: 5,
    servings: 1, prep_time: 12, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Flocons d\'avoine', qty:'35g', calories:131, protein:4, carbs:23, fat:3},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Lait écrémé', qty:'40ml', calories:14, protein:1, carbs:2, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mixer l\'avoine en farine.','Mélanger tous les ingrédients.','Cuire dans un gaufrier 4-5 min.','Servir avec sirop sans sucre.'],
  },
  {
    title: 'Tiramisu Protéiné',
    description: 'Tiramisu allégé sans mascarpone, version fit. تيراميسو بروتيني',
    total_calories: 240, total_protein: 26, total_carbs: 20, total_fat: 5,
    servings: 1, prep_time: 15, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Fromage blanc 0%', qty:'150g', calories:75, protein:12, carbs:6, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Biscuit sec', qty:'2 (20g)', calories:90, protein:2, carbs:14, fat:3},
      {name:'Café fort', qty:'50ml', calories:2, protein:0, carbs:0, fat:0},
      {name:'Cacao (saupoudrage)', qty:'1 c.à.c', calories:12, protein:1, carbs:3, fat:0},
    ],
    steps: ['Mélanger fromage blanc et whey en crème.','Tremper rapidement les biscuits dans le café.','Alterner couches de biscuit et de crème.','Saupoudrer de cacao. Réfrigérer 2h.'],
  },
  {
    title: 'Glace Protéinée Café Moka',
    description: 'Glace onctueuse au café, faible en calories. آيس كريم موكا',
    total_calories: 180, total_protein: 28, total_carbs: 12, total_fat: 2,
    servings: 1, prep_time: 5, difficulty: 1, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'sweet',
    ingredients: [
      {name:'Yaourt grec 0% congelé', qty:'150g', calories:90, protein:15, carbs:6, fat:0},
      {name:'Whey chocolat', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Café soluble', qty:'1 c.à.c', calories:2, protein:0, carbs:0, fat:0},
      {name:'Lait écrémé', qty:'40ml', calories:14, protein:1, carbs:2, fat:0},
    ],
    steps: ['Congeler le yaourt en cubes.','Mixer avec whey, café et lait.','Texture de glace crémeuse.','Servir immédiatement.'],
  },
  {
    title: 'Muffin Protéiné Myrtille',
    description: 'Muffin moelleux aux myrtilles, riche en protéines. مافن بروتيني',
    total_calories: 230, total_protein: 24, total_carbs: 24, total_fat: 4,
    servings: 1, prep_time: 18, difficulty: 2, category: 'Desserts', goal_tag: 'anabolic', craving_tag: 'fruity',
    ingredients: [
      {name:'Flocons d\'avoine', qty:'30g', calories:113, protein:4, carbs:20, fat:2},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Myrtilles', qty:'30g', calories:17, protein:0, carbs:4, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mixer l\'avoine en farine.','Mélanger avec whey, blancs et levure.','Incorporer les myrtilles.','Cuire 15 min à 180°C en moule à muffin.'],
  },
];

(async () => {
  console.log(`Seeding ${RECIPES.length} anabolic dessert recipes...\n`);
  let ok = 0, fail = 0;
  for (const r of RECIPES) {
    try {
      process.stdout.write(`• ${r.title} ... `);
      const row = {
        title: r.title,
        coach_note: r.description,         // arabic subtitle / note (real column)
        cuisine: 'algerian',
        category: r.category,
        meal_type: 'dessert',
        goal_tag: r.goal_tag,
        craving_tag: r.craving_tag,
        total_calories: r.total_calories,
        total_protein: r.total_protein,
        total_carbs: r.total_carbs,
        total_fat: r.total_fat,
        servings: r.servings,
        prep_time: r.prep_time,
        difficulty: r.difficulty,         // INTEGER 1/2/3
        ingredients: r.ingredients,        // JSONB array
        steps: r.steps,                    // JSONB array of strings
        featured: false,
        trial_visible: false,
        photo_url: null,                   // image script fills this later
      };
      const { error } = await sb.from('cookbook_recipes').insert(row);
      if (error) throw new Error(error.message);
      console.log('done');
      ok++;
    } catch (e) {
      console.log('FAILED — ' + e.message);
      fail++;
    }
  }
  console.log(`\nDone. ${ok} inserted, ${fail} failed.`);
  if (ok) console.log('Next: run generate-recipe-images-FULL.mjs to add AI images to these new recipes.');
})();
