// seed-anabolic-breakfasts.mjs
// Adds 20 Algerian-adapted ANABOLIC high-protein breakfasts to cookbook_recipes.
// High protein, low-to-moderate calorie, halal, ingredients available in Algerian
// supermarkets. Matches REAL schema (coach_note, meal_type, no description column).
//
// SETUP (run from /Users/mac/Downloads/coach-sammy/):
//   export SUPABASE_URL=https://korektlpnwuefsagfuvq.supabase.co
//   export SUPABASE_SERVICE_KEY=eyJ...
//   node seed-anabolic-breakfasts.mjs
//
// After seeding, run generate-recipe-images-FULL.mjs — it auto-generates images
// for these new recipes (they have photo_url null).

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://korektlpnwuefsagfuvq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
if (!SUPABASE_SERVICE_KEY) { console.error('Missing SUPABASE_SERVICE_KEY'); process.exit(1); }
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const RECIPES = [
  {
    title: 'Pancakes Protéinés Avoine Banane',
    note: 'Pancakes moelleux riches en protéines pour le petit-déj. بانكيك بروتيني',
    total_calories: 320, total_protein: 32, total_carbs: 38, total_fat: 5,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 12,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'50g', calories:188, protein:6, carbs:34, fat:3},
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Banane', qty:'1/2 (50g)', calories:45, protein:1, carbs:11, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mixer avoine, whey, blancs et banane.','Ajouter la levure, mélanger.','Cuire des petites pancakes à la poêle 2 min/face.','Servir avec sirop sans sucre.'],
  },
  {
    title: 'Pain Perdu Protéiné (French Toast)',
    note: 'Pain perdu version fit, croustillant et protéiné. بان بيردو بروتيني',
    total_calories: 290, total_protein: 28, total_carbs: 30, total_fat: 6,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 10,
    ingredients: [
      {name:'Pain complet', qty:'2 tranches (60g)', calories:140, protein:6, carbs:26, fat:2},
      {name:'Blanc d\'œuf', qty:'3 (99g)', calories:51, protein:11, carbs:1, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Lait écrémé', qty:'50ml', calories:18, protein:2, carbs:2, fat:0},
      {name:'Cannelle', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Battre blancs, whey, lait et cannelle.','Tremper les tranches de pain.','Cuire à la poêle antiadhésive 2 min/face.','Servir tiède.'],
  },
  {
    title: 'Overnight Oats Beurre de Cacahuète',
    note: 'Avoine de nuit prête au réveil, sans cuisson. أوفرنايت أوتس',
    total_calories: 350, total_protein: 30, total_carbs: 40, total_fat: 9,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 5,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'50g', calories:188, protein:6, carbs:34, fat:3},
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Lait écrémé', qty:'120ml', calories:42, protein:4, carbs:6, fat:0},
      {name:'Beurre de cacahuète', qty:'1 c.à.c (8g)', calories:50, protein:2, carbs:2, fat:4},
    ],
    steps: ['Mélanger avoine, whey et lait dans un bocal.','Ajouter le beurre de cacahuète.','Réfrigérer toute la nuit.','Déguster froid au réveil.'],
  },
  {
    title: 'Msemen Protéiné Œuf Fromage',
    note: 'Msemen revisité protéiné, petit-déj algérien fit. مسمن بروتيني',
    total_calories: 340, total_protein: 30, total_carbs: 32, total_fat: 9,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 2, prep_time: 20,
    ingredients: [
      {name:'Semoule fine', qty:'40g', calories:140, protein:4, carbs:29, fat:0},
      {name:'Œuf entier', qty:'1 (50g)', calories:72, protein:6, carbs:0, fat:5},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Fromage frais light', qty:'40g', calories:60, protein:8, carbs:2, fat:2},
      {name:'Huile d\'olive', qty:'1/2 c.à.c', calories:20, protein:0, carbs:0, fat:2},
    ],
    steps: ['Préparer la pâte de semoule, étaler fin.','Garnir d\'œuf battu et fromage.','Plier en carré et cuire à la poêle.','Servir chaud.'],
  },
  {
    title: 'Bol Avoine Chaud Pomme Cannelle',
    note: 'Porridge chaud réconfortant et protéiné. عصيدة الشوفان',
    total_calories: 310, total_protein: 26, total_carbs: 42, total_fat: 4,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 8,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'45g', calories:169, protein:5, carbs:31, fat:3},
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Lait écrémé', qty:'150ml', calories:53, protein:5, carbs:7, fat:0},
      {name:'Pomme', qty:'1/2 (60g)', calories:31, protein:0, carbs:8, fat:0},
      {name:'Cannelle', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Cuire l\'avoine dans le lait 5 min.','Hors du feu, incorporer la whey.','Ajouter pomme en dés et cannelle.','Servir chaud.'],
  },
  {
    title: 'Omelette Blanche Légumes Fromage',
    note: 'Omelette riche en protéines, zéro jaune. أومليت بياض البيض',
    total_calories: 200, total_protein: 30, total_carbs: 8, total_fat: 5,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 1, prep_time: 10,
    ingredients: [
      {name:'Blanc d\'œuf', qty:'5 (165g)', calories:85, protein:18, carbs:2, fat:0},
      {name:'Fromage frais light', qty:'40g', calories:60, protein:8, carbs:2, fat:2},
      {name:'Poivron', qty:'50g', calories:15, protein:1, carbs:3, fat:0},
      {name:'Tomate', qty:'50g', calories:9, protein:0, carbs:2, fat:0},
      {name:'Huile d\'olive', qty:'1/2 c.à.c', calories:20, protein:0, carbs:0, fat:2},
    ],
    steps: ['Faire revenir poivron et tomate.','Verser les blancs battus.','Ajouter le fromage frais.','Plier et cuire à point.'],
  },
  {
    title: 'Gaufres Protéinées Petit-Déj',
    note: 'Gaufres croustillantes hautes en protéines. غوفر الفطور',
    total_calories: 300, total_protein: 30, total_carbs: 32, total_fat: 6,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 2, prep_time: 12,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'45g', calories:169, protein:5, carbs:31, fat:3},
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Lait écrémé', qty:'40ml', calories:14, protein:1, carbs:2, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mixer l\'avoine en farine.','Mélanger tous les ingrédients.','Cuire au gaufrier 4-5 min.','Garnir de fruits frais.'],
  },
  {
    title: 'Baghrir Protéiné Miel Yaourt',
    note: 'Crêpes mille trous algériennes version protéinée. بغرير بروتيني',
    total_calories: 300, total_protein: 24, total_carbs: 40, total_fat: 4,
    goal_tag: 'high_protein', craving_tag: 'sweet', difficulty: 2, prep_time: 25,
    ingredients: [
      {name:'Semoule fine', qty:'40g', calories:140, protein:4, carbs:29, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Yaourt grec 0%', qty:'80g', calories:48, protein:8, carbs:3, fat:0},
      {name:'Levure boulangère', qty:'2g', calories:6, protein:1, carbs:1, fat:0},
      {name:'Miel', qty:'2 c.à.c', calories:42, protein:0, carbs:11, fat:0},
    ],
    steps: ['Mixer semoule, whey, levure et eau tiède.','Laisser lever 20 min.','Cuire les baghrir côté trous uniquement.','Servir avec yaourt et un filet de miel.'],
  },
  {
    title: 'Smoothie Petit-Déj Protéiné Fruits',
    note: 'Smoothie complet à boire, rapide et rassasiant. سموذي الفطور',
    total_calories: 280, total_protein: 32, total_carbs: 30, total_fat: 3,
    goal_tag: 'anabolic', craving_tag: 'fruity', difficulty: 1, prep_time: 5,
    ingredients: [
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Banane', qty:'1 (100g)', calories:89, protein:1, carbs:23, fat:0},
      {name:'Yaourt grec 0%', qty:'100g', calories:60, protein:10, carbs:4, fat:0},
      {name:'Lait écrémé', qty:'100ml', calories:35, protein:3, carbs:5, fat:0},
    ],
    steps: ['Mettre tous les ingrédients au blender.','Mixer jusqu\'à onctueux.','Ajouter des glaçons si désiré.','Boire frais.'],
  },
  {
    title: 'Œufs Brouillés Crémeux Fromage Frais',
    note: 'Œufs brouillés onctueux et protéinés. بيض مخفوق',
    total_calories: 240, total_protein: 26, total_carbs: 4, total_fat: 13,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 1, prep_time: 8,
    ingredients: [
      {name:'Œuf entier', qty:'2 (100g)', calories:144, protein:12, carbs:0, fat:10},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Fromage frais light', qty:'40g', calories:60, protein:8, carbs:2, fat:2},
      {name:'Ciboulette', qty:'au goût', calories:2, protein:0, carbs:0, fat:0},
    ],
    steps: ['Battre œufs et blancs.','Cuire à feu doux en remuant.','Hors du feu, ajouter le fromage frais.','Parsemer de ciboulette.'],
  },
  {
    title: 'Mug Cake Avoine Chocolat Protéiné',
    note: 'Gâteau express au micro-ondes pour le matin. كيك الكوب',
    total_calories: 300, total_protein: 28, total_carbs: 32, total_fat: 6,
    goal_tag: 'anabolic', craving_tag: 'chocolate', difficulty: 1, prep_time: 4,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'40g', calories:150, protein:5, carbs:27, fat:3},
      {name:'Whey chocolat', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Blanc d\'œuf', qty:'1 (33g)', calories:17, protein:4, carbs:0, fat:0},
      {name:'Cacao non sucré', qty:'1 c.à.c', calories:12, protein:1, carbs:3, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mélanger tous les ingrédients dans un mug.','Micro-ondes 70-90 secondes.','Laisser reposer 1 min.','Déguster tiède.'],
  },
  {
    title: 'Toast Avocat Œuf Poché',
    note: 'Toast complet équilibré, protéines et bons gras. توست أفوكادو',
    total_calories: 290, total_protein: 18, total_carbs: 26, total_fat: 13,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 2, prep_time: 10,
    ingredients: [
      {name:'Pain complet', qty:'1 tranche (30g)', calories:70, protein:3, carbs:13, fat:1},
      {name:'Avocat', qty:'1/4 (40g)', calories:64, protein:1, carbs:3, fat:6},
      {name:'Œuf entier', qty:'1 (50g)', calories:72, protein:6, carbs:0, fat:5},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
    ],
    steps: ['Toaster le pain.','Écraser l\'avocat dessus.','Pocher l\'œuf 3 min dans l\'eau frémissante.','Déposer sur le toast, assaisonner.'],
  },
  {
    title: 'Crêpes Protéinées Fines',
    note: 'Crêpes fines style algérien, riches en protéines. كريب رقيق',
    total_calories: 270, total_protein: 28, total_carbs: 28, total_fat: 5,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 12,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'35g', calories:131, protein:4, carbs:23, fat:3},
      {name:'Blanc d\'œuf', qty:'3 (99g)', calories:51, protein:11, carbs:1, fat:0},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Lait écrémé', qty:'80ml', calories:28, protein:3, carbs:4, fat:0},
    ],
    steps: ['Mixer tous les ingrédients en pâte fluide.','Cuire des crêpes fines à la poêle.','Garnir au choix (fruits, miel léger).','Rouler et servir.'],
  },
  {
    title: 'Yaourt Grec Granola Maison Fruits',
    note: 'Bol de yaourt grec croustillant et protéiné. زبادي يوناني',
    total_calories: 290, total_protein: 26, total_carbs: 32, total_fat: 6,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 5,
    ingredients: [
      {name:'Yaourt grec 0%', qty:'200g', calories:120, protein:20, carbs:8, fat:0},
      {name:'Flocons d\'avoine grillés', qty:'25g', calories:94, protein:3, carbs:17, fat:2},
      {name:'Fruits rouges', qty:'60g', calories:34, protein:1, carbs:8, fat:0},
      {name:'Amandes', qty:'5g', calories:30, protein:1, carbs:1, fat:3},
    ],
    steps: ['Griller légèrement l\'avoine à sec.','Verser le yaourt dans un bol.','Garnir d\'avoine, fruits et amandes.','Servir aussitôt.'],
  },
  {
    title: 'Pancakes Salés Courgette Protéinés',
    note: 'Pancakes salés aux courgettes, riches en protéines. بانكيك مالح',
    total_calories: 260, total_protein: 30, total_carbs: 16, total_fat: 8,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 2, prep_time: 15,
    ingredients: [
      {name:'Courgette râpée', qty:'150g', calories:25, protein:2, carbs:5, fat:0},
      {name:'Œuf entier', qty:'1 (50g)', calories:72, protein:6, carbs:0, fat:5},
      {name:'Blanc d\'œuf', qty:'2 (66g)', calories:34, protein:7, carbs:1, fat:0},
      {name:'Flocons d\'avoine', qty:'25g', calories:94, protein:3, carbs:17, fat:2},
      {name:'Fromage frais light', qty:'25g', calories:38, protein:5, carbs:1, fat:1},
    ],
    steps: ['Râper et essorer la courgette.','Mélanger avec œufs, avoine et fromage.','Former des galettes à la poêle.','Cuire 3 min par face.'],
  },
  {
    title: 'S\'hour Avoine Banane Protéiné',
    note: 'Petit-déj de s\'hour rassasiant pour le jeûne. سحور بروتيني',
    total_calories: 360, total_protein: 30, total_carbs: 44, total_fat: 8,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 1, prep_time: 6,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'50g', calories:188, protein:6, carbs:34, fat:3},
      {name:'Whey vanille', qty:'1 scoop (30g)', calories:113, protein:24, carbs:3, fat:2},
      {name:'Banane', qty:'1/2 (50g)', calories:45, protein:1, carbs:11, fat:0},
      {name:'Beurre de cacahuète', qty:'1/2 c.à.s (8g)', calories:50, protein:2, carbs:2, fat:4},
    ],
    steps: ['Mélanger avoine, whey et lait.','Ajouter banane écrasée et beurre de cacahuète.','Laisser reposer 5 min.','Manger lentement avant l\'aube.'],
  },
  {
    title: 'Shakshuka Blanche Dinde Fromage',
    note: 'Shakshuka allégée à la dinde, haute en protéines. شكشوكة',
    total_calories: 280, total_protein: 32, total_carbs: 10, total_fat: 12,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 2, prep_time: 18,
    ingredients: [
      {name:'Blanc de dinde haché', qty:'80g', calories:88, protein:18, carbs:0, fat:1},
      {name:'Œuf entier', qty:'1 (50g)', calories:72, protein:6, carbs:0, fat:5},
      {name:'Blanc d\'œuf', qty:'1 (33g)', calories:17, protein:4, carbs:0, fat:0},
      {name:'Fromage frais light', qty:'40g', calories:60, protein:8, carbs:2, fat:2},
      {name:'Oignon + poivron', qty:'60g', calories:25, protein:1, carbs:5, fat:0},
    ],
    steps: ['Faire revenir oignon, poivron et dinde.','Creuser des puits, casser les œufs.','Ajouter le fromage frais.','Couvrir et cuire 5 min.'],
  },
  {
    title: 'Banana Bread Protéiné (1 part)',
    note: 'Part de cake à la banane riche en protéines. خبز الموز',
    total_calories: 250, total_protein: 22, total_carbs: 30, total_fat: 5,
    goal_tag: 'anabolic', craving_tag: 'sweet', difficulty: 2, prep_time: 30,
    ingredients: [
      {name:'Flocons d\'avoine', qty:'30g', calories:113, protein:4, carbs:20, fat:2},
      {name:'Whey vanille', qty:'1/2 scoop (15g)', calories:57, protein:12, carbs:2, fat:1},
      {name:'Banane mûre', qty:'1/2 (60g)', calories:53, protein:1, carbs:14, fat:0},
      {name:'Blanc d\'œuf', qty:'1 (33g)', calories:17, protein:4, carbs:0, fat:0},
      {name:'Levure chimique', qty:'1/2 c.à.c', calories:0, protein:0, carbs:0, fat:0},
    ],
    steps: ['Mixer l\'avoine en farine.','Mélanger avec banane, whey, blanc et levure.','Verser en petit moule.','Cuire 25 min à 180°C.'],
  },
  {
    title: 'Bowl Fromage Blanc Avoine Fruits',
    note: 'Bol de fromage blanc épais, protéines au réveil. بول الجبن',
    total_calories: 280, total_protein: 30, total_carbs: 30, total_fat: 4,
    goal_tag: 'anabolic', craving_tag: 'fruity', difficulty: 1, prep_time: 5,
    ingredients: [
      {name:'Fromage blanc 0%', qty:'250g', calories:125, protein:20, carbs:10, fat:0},
      {name:'Flocons d\'avoine', qty:'30g', calories:113, protein:4, carbs:20, fat:2},
      {name:'Whey vanille', qty:'1/4 scoop (8g)', calories:30, protein:6, carbs:1, fat:0},
      {name:'Fruits rouges', qty:'50g', calories:28, protein:1, carbs:7, fat:0},
    ],
    steps: ['Mélanger fromage blanc et whey.','Ajouter l\'avoine.','Garnir de fruits rouges.','Déguster frais.'],
  },
  {
    title: 'Wrap Petit-Déj Œuf Dinde',
    note: 'Wrap salé du matin, portable et protéiné. راب الفطور',
    total_calories: 320, total_protein: 32, total_carbs: 26, total_fat: 9,
    goal_tag: 'high_protein', craving_tag: 'savory', difficulty: 1, prep_time: 10,
    ingredients: [
      {name:'Tortilla complète', qty:'1 (45g)', calories:130, protein:4, carbs:22, fat:3},
      {name:'Blanc d\'œuf', qty:'3 (99g)', calories:51, protein:11, carbs:1, fat:0},
      {name:'Blanc de dinde', qty:'40g', calories:44, protein:9, carbs:0, fat:1},
      {name:'Fromage frais light', qty:'30g', calories:45, protein:6, carbs:2, fat:1},
      {name:'Tomate + salade', qty:'40g', calories:10, protein:0, carbs:2, fat:0},
    ],
    steps: ['Cuire les blancs d\'œuf en omelette.','Réchauffer la tortilla.','Garnir d\'œuf, dinde, fromage et crudités.','Rouler serré et couper en deux.'],
  },
];

(async () => {
  console.log(`Seeding ${RECIPES.length} anabolic breakfast recipes...\n`);
  let ok = 0, fail = 0;
  for (const r of RECIPES) {
    try {
      process.stdout.write(`• ${r.title} ... `);
      const row = {
        title: r.title,
        coach_note: r.note,
        cuisine: 'algerian',
        category: 'Breakfasts',
        meal_type: 'breakfast',
        goal_tag: r.goal_tag,
        craving_tag: r.craving_tag,
        total_calories: r.total_calories,
        total_protein: r.total_protein,
        total_carbs: r.total_carbs,
        total_fat: r.total_fat,
        servings: 1,
        prep_time: r.prep_time,
        difficulty: r.difficulty,
        ingredients: r.ingredients,
        steps: r.steps,
        featured: false,
        trial_visible: false,
        photo_url: null,
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
