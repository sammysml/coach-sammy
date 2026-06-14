#!/usr/bin/env node
// seed_cookbook.mjs — Coach Sammy Kitchen — 40 recipes
// Run: node seed_cookbook.mjs

const SB_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMjI0NjQsImV4cCI6MjA5MTU5ODQ2NH0.46rZOEMUKoZCyL8eKzob8FDuOoFiA2LHbr2ZoKW-HrM';
const H = {
  'Content-Type': 'application/json',
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Prefer': 'return=representation'
};

const q = async (method, path, body) => {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
    method, headers: H,
    body: body ? JSON.stringify(body) : undefined
  });
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => null) };
};

// ── MACRO CALCULATOR (from Algerian food database) ──────
// poulet: 100g = 120kcal P:22 C:0 F:2
// dinde:  100g = 110kcal P:22 C:0 F:1
// steak:  100g = 250kcal P:26 C:0 F:17
// poisson:100g = 85kcal  P:20 C:0 F:1
// thon:   100g = 116kcal P:26 C:0 F:1
// oeuf:   1(60g)= 70kcal P:6  C:1 F:5
// ffr:    100g = 89kcal  P:8.6 C:4.3 F:3.5 (fromage frais)
// riz:    100g = 360kcal P:7  C:78 F:1  (cru)
// pates:  100g = 350kcal P:12 C:72 F:2  (cru)
// pdt:    100g = 80kcal  P:2  C:18 F:0
// arrupan:45g  = 120kcal P:4  C:22 F:1.5
// avoine: 100g = 380kcal P:13 C:60 F:7
// banane: 100g = 89kcal  P:1  C:23 F:0
// pomme:  100g = 52kcal  P:0  C:14 F:0
// huile:  10g  = 90kcal  P:0  C:0  F:10
// beurre cacahuète: 10g = 60kcal P:2.5 C:2 F:5

const RECIPES = [

  // ════════════════════════════════════════════
  // 🌅 BREAKFASTS (10)
  // ════════════════════════════════════════════
  {
    title: 'Pain ARRUPAN Œufs Brouillés Fromage Frais',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'all',
    craving_tag: 'salé',
    prep_time: 8,
    difficulty: 1,
    total_calories: 422,
    total_protein: 32,
    total_carbs: 28,
    total_fat: 19,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#2d1b00,#8B4513)',
    membership_required: 'all',
    ingredients: [
      {name:'Pain ARRUPAN complet', quantity:'45g', calories:120, protein:4, carbs:22, fat:1.5},
      {name:'Œufs entiers', quantity:'3 œufs (180g)', calories:210, protein:18, carbs:3, fat:15},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Tomates', quantity:'100g', calories:18, protein:0.9, carbs:3.9, fat:0.2},
      {name:'Huile d\'olive', quantity:'3g', calories:27, protein:0, carbs:0, fat:3}
    ],
    steps: [
      'Faire chauffer une poêle à feu doux avec l\'huile d\'olive.',
      'Battre les œufs avec le fromage frais et une pincée de sel.',
      'Verser dans la poêle et remuer doucement jusqu\'à texture crémeuse.',
      'Toaster le pain ARRUPAN.',
      'Servir les œufs sur le pain avec les tomates coupées.'
    ],
    substitutions: [
      {original:'Œufs entiers', alternative:'4 blancs d\'œufs + 1 entier pour moins de gras'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% même quantité'},
      {original:'Pain ARRUPAN', alternative:'2 galettes de riz pour version sans gluten'}
    ],
    coach_note: 'Le fromage frais dans les œufs brouillés les rend crémeux sans crème. Protéines le matin = moins de fringales toute la journée.'
  },

  {
    title: 'Overnight Oats Banane Beurre de Cacahuète',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'muscle',
    craving_tag: 'sucré',
    prep_time: 5,
    difficulty: 1,
    total_calories: 478,
    total_protein: 23,
    total_carbs: 61,
    total_fat: 15,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0a00,#D2691E)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Flocons d\'avoine', quantity:'80g', calories:304, protein:10.4, carbs:48, fat:5.6},
      {name:'Fromage frais Lactel 0%', quantity:'100g', calories:89, protein:8.6, carbs:4.3, fat:3.5},
      {name:'Banane', quantity:'100g', calories:89, protein:1, carbs:23, fat:0},
      {name:'Beurre de cacahuète', quantity:'10g', calories:60, protein:2.5, carbs:2, fat:5},
      {name:'Eau ou lait', quantity:'100ml', calories:0, protein:0, carbs:0, fat:0}
    ],
    steps: [
      'Mélanger les flocons d\'avoine avec le fromage frais et l\'eau dans un bocal.',
      'Écraser la banane et l\'incorporer au mélange.',
      'Couvrir et laisser au réfrigérateur toute la nuit.',
      'Le matin, ajouter le beurre de cacahuète par-dessus.',
      'Consommer froid ou légèrement réchauffé au micro-ondes 1 minute.'
    ],
    substitutions: [
      {original:'Banane', alternative:'100g de pomme râpée pour moins de sucres'},
      {original:'Beurre de cacahuète', alternative:'10g d\'huile de coco pour variation'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% même quantité'}
    ],
    coach_note: 'Prépare la veille — zéro excuse le matin. Ce repas tient 4h facilement grâce à l\'avoine et la protéine combinées.'
  },

  {
    title: 'Omelette Blanche Fromage Frais Tomates',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'fat_loss',
    craving_tag: 'salé',
    prep_time: 10,
    difficulty: 1,
    total_calories: 298,
    total_protein: 36,
    total_carbs: 7,
    total_fat: 14,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#0a1a00,#556B2F)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Blancs d\'œufs', quantity:'6 blancs (180g)', calories:94, protein:19.8, carbs:1.2, fat:0.4},
      {name:'Œuf entier', quantity:'1 (60g)', calories:70, protein:6, carbs:1, fat:5},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Tomates', quantity:'150g', calories:27, protein:1.3, carbs:5.9, fat:0.3},
      {name:'Huile d\'olive', quantity:'4g', calories:36, protein:0, carbs:0, fat:4}
    ],
    steps: [
      'Séparer les blancs d\'œufs et battre avec l\'œuf entier.',
      'Ajouter une pincée de sel, poivre, et herbes au choix.',
      'Chauffer la poêle avec l\'huile à feu moyen.',
      'Verser les œufs et cuire 2 minutes, ajouter le fromage frais au centre.',
      'Plier l\'omelette, servir avec les tomates fraîches.'
    ],
    substitutions: [
      {original:'Blancs d\'œufs', alternative:'Œufs entiers x3 pour plus de goût et gras sains'},
      {original:'Tomates fraîches', alternative:'Tomates séchées pour saveur plus intense'},
      {original:'Fromage frais', alternative:'Thon en conserve 50g pour variation protéinée'}
    ],
    coach_note: 'L\'omelette blanche c\'est le plat du cut par excellence. Le fromage frais dedans empêche le côté caoutchouteux habituel des blancs seuls.'
  },

  {
    title: 'Crêpes Protéinées Avoine Banane',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'all',
    craving_tag: 'sucré',
    prep_time: 15,
    difficulty: 2,
    total_calories: 392,
    total_protein: 27,
    total_carbs: 52,
    total_fat: 9,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#CD853F)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Flocons d\'avoine mixés', quantity:'60g', calories:228, protein:7.8, carbs:36, fat:4.2},
      {name:'Banane', quantity:'100g', calories:89, protein:1, carbs:23, fat:0},
      {name:'Œufs entiers', quantity:'2 (120g)', calories:140, protein:12, carbs:2, fat:10},
      {name:'Fromage frais Lactel 0%', quantity:'50g', calories:45, protein:4.3, carbs:2.2, fat:1.8},
      {name:'Huile d\'olive', quantity:'3g', calories:27, protein:0, carbs:0, fat:3}
    ],
    steps: [
      'Mixer les flocons d\'avoine en farine fine.',
      'Écraser la banane et mélanger avec les œufs et le fromage frais.',
      'Incorporer la farine d\'avoine pour obtenir une pâte lisse.',
      'Cuire dans une poêle légèrement huilée, 2 minutes par côté.',
      'Servir avec beurre de cacahuète ou fruits.'
    ],
    substitutions: [
      {original:'Banane', alternative:'80g de pomme cuite cannelle pour version moins sucrée'},
      {original:'Avoine', alternative:'Son d\'avoine pour version plus fibreuse'},
      {original:'Œufs entiers', alternative:'3 blancs + 1 entier pour version plus légère'}
    ],
    coach_note: 'Ces crêpes ont le goût du vrai mais les macros du fit. La banane sucre naturellement — aucun ajout de sucre nécessaire.'
  },

  {
    title: 'Toast ARRUPAN Thon Avocat',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'all',
    craving_tag: 'salé',
    prep_time: 8,
    difficulty: 1,
    total_calories: 432,
    total_protein: 38,
    total_carbs: 26,
    total_fat: 18,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#001a0a,#2E8B57)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Pain ARRUPAN complet', quantity:'90g (2 tranches)', calories:240, protein:8, carbs:44, fat:3},
      {name:'Thon naturel', quantity:'120g', calories:139, protein:31.2, carbs:0, fat:1.2},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Tomates', quantity:'100g', calories:18, protein:0.9, carbs:3.9, fat:0.2},
      {name:'Huile d\'olive', quantity:'4g', calories:36, protein:0, carbs:0, fat:4}
    ],
    steps: [
      'Toaster le pain ARRUPAN.',
      'Mélanger le thon égoutté avec le fromage frais et l\'huile d\'olive.',
      'Assaisonner avec sel, poivre, citron selon goût.',
      'Étaler généreusement sur le pain toasté.',
      'Garnir de tomates fraîches en rondelles.'
    ],
    substitutions: [
      {original:'Thon', alternative:'Poulet effiloché froid même quantité'},
      {original:'Pain ARRUPAN', alternative:'2 galettes de riz pour version légère'},
      {original:'Fromage frais', alternative:'Humus maison 40g pour variation végétarienne'}
    ],
    coach_note: 'Le combo thon + fromage frais donne une texture crémeuse qui remplace parfaitement la mayo classique avec 3x moins de calories.'
  },

  {
    title: 'Shakshuka Blanche Dinde et Fromage',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'fat_loss',
    craving_tag: 'salé',
    prep_time: 15,
    difficulty: 2,
    total_calories: 374,
    total_protein: 42,
    total_carbs: 12,
    total_fat: 18,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0000,#8B0000)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de dinde', quantity:'150g', calories:165, protein:33, carbs:0, fat:1.5},
      {name:'Œufs entiers', quantity:'2 (120g)', calories:140, protein:12, carbs:2, fat:10},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Tomates', quantity:'200g', calories:36, protein:1.8, carbs:7.8, fat:0.4},
      {name:'Huile d\'olive', quantity:'5g', calories:45, protein:0, carbs:0, fat:5}
    ],
    steps: [
      'Faire revenir la dinde coupée en dés dans l\'huile d\'olive.',
      'Ajouter les tomates coupées, cumin, paprika, sel, poivre.',
      'Laisser mijoter 5 minutes à feu moyen.',
      'Faire des espaces dans la sauce et casser les œufs dedans.',
      'Couvrir 3-4 minutes jusqu\'à cuisson des œufs. Ajouter le fromage frais.'
    ],
    substitutions: [
      {original:'Dinde', alternative:'Poulet ou thon en conserve égoutté'},
      {original:'Tomates fraîches', alternative:'Tomates pelées en boîte 200g'},
      {original:'Œufs entiers', alternative:'3 blancs + 1 entier pour version légère'}
    ],
    coach_note: 'La version algérienne du brunch fit. Prépare la sauce la veille, le matin tu ajoutes juste les œufs. 10 minutes chrono.'
  },

  {
    title: 'Bol Avoine Chaud Pomme Cannelle',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'all',
    craving_tag: 'sucré',
    prep_time: 7,
    difficulty: 1,
    total_calories: 362,
    total_protein: 15,
    total_carbs: 61,
    total_fat: 8,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#A0522D)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Flocons d\'avoine', quantity:'80g', calories:304, protein:10.4, carbs:48, fat:5.6},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Pomme', quantity:'100g', calories:52, protein:0, carbs:14, fat:0},
      {name:'Beurre de cacahuète', quantity:'5g', calories:30, protein:1.25, carbs:1, fat:2.5},
      {name:'Cannelle', quantity:'1g', calories:3, protein:0, carbs:1, fat:0}
    ],
    steps: [
      'Cuire les flocons d\'avoine avec 200ml d\'eau ou lait 3-4 minutes.',
      'Couper la pomme en petits dés, faire revenir à sec 2 minutes avec cannelle.',
      'Mélanger le fromage frais dans l\'avoine cuite hors du feu.',
      'Verser dans le bol, garnir avec la pomme caramélisée.',
      'Finir avec le beurre de cacahuète en filet.'
    ],
    substitutions: [
      {original:'Pomme', alternative:'Banane pour plus de calories et goût plus doux'},
      {original:'Beurre de cacahuète', alternative:'10g de noix concassées pour variation'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% pour plus de protéines'}
    ],
    coach_note: 'Le porridge est le petit déj le plus sous-estimé. Ajouter le fromage frais après cuisson = texture crémeuse + protéines sans effort.'
  },

  {
    title: 'Msemen Protéiné Œuf Fromage',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'muscle',
    craving_tag: 'salé',
    prep_time: 12,
    difficulty: 2,
    total_calories: 448,
    total_protein: 34,
    total_carbs: 38,
    total_fat: 18,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a1000,#B8860B)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Œufs entiers', quantity:'2 (120g)', calories:140, protein:12, carbs:2, fat:10},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Escalope de dinde', quantity:'50g', calories:55, protein:11, carbs:0, fat:0.5},
      {name:'Huile d\'olive', quantity:'4g', calories:36, protein:0, carbs:0, fat:4}
    ],
    steps: [
      'Chauffer une poêle antiadhésive à feu moyen.',
      'Faire revenir la dinde émincée 2-3 minutes.',
      'Battre les œufs avec le fromage frais, sel et poivre.',
      'Verser sur la dinde et cuire comme une omelette.',
      'Servir dans/sur le pain ARRUPAN légèrement toasté.'
    ],
    substitutions: [
      {original:'Dinde', alternative:'Thon 50g pour version rapide sans cuisson viande'},
      {original:'Pain ARRUPAN', alternative:'Galettes de maïs pour version sans gluten'},
      {original:'Fromage frais', alternative:'20g de fromage fondu allégé'}
    ],
    coach_note: 'Le msemen du dimanche matin mais en version qui te rapproche de ton objectif. Même satisfaction, 60% moins de calories que l\'original.'
  },

  {
    title: 'Pancakes Avoine Beurre de Cacahuète',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'muscle',
    craving_tag: 'sucré',
    prep_time: 12,
    difficulty: 2,
    total_calories: 462,
    total_protein: 29,
    total_carbs: 54,
    total_fat: 15,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#8B4513)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Flocons d\'avoine mixés', quantity:'80g', calories:304, protein:10.4, carbs:48, fat:5.6},
      {name:'Œufs entiers', quantity:'2 (120g)', calories:140, protein:12, carbs:2, fat:10},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Banane', quantity:'50g', calories:45, protein:0.5, carbs:11.5, fat:0},
      {name:'Beurre de cacahuète', quantity:'10g', calories:60, protein:2.5, carbs:2, fat:5}
    ],
    steps: [
      'Mixer les flocons en farine, mélanger avec œufs et fromage frais.',
      'Écraser la demi banane et intégrer à la pâte.',
      'Cuire des petits pancakes épais 2-3 min chaque côté à feu doux.',
      'Empiler et finir avec le beurre de cacahuète en topping.',
      'Option : ajouter banane fraîche en tranches par-dessus.'
    ],
    substitutions: [
      {original:'Banane', alternative:'100g compote de pomme sans sucre ajouté'},
      {original:'Beurre de cacahuète', alternative:'Miel 10g pour version plus sucrée'},
      {original:'Œufs entiers', alternative:'3 blancs pour version plus légère'}
    ],
    coach_note: 'Le dimanche fit. Fais une double dose et congèle les extras — 30 secondes au micro-ondes le matin suivant.'
  },

  {
    title: 'Smoothie Bol Fromage Frais Avoine Banane',
    category: 'Breakfasts',
    meal_type: 'breakfast',
    goal_tag: 'all',
    craving_tag: 'sucré',
    prep_time: 5,
    difficulty: 1,
    total_calories: 418,
    total_protein: 24,
    total_carbs: 58,
    total_fat: 10,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#000a1a,#4169E1)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Fromage frais Lactel 0%', quantity:'150g', calories:134, protein:12.9, carbs:6.5, fat:5.3},
      {name:'Banane congelée', quantity:'120g', calories:107, protein:1.2, carbs:27.6, fat:0},
      {name:'Flocons d\'avoine', quantity:'40g', calories:152, protein:5.2, carbs:24, fat:2.8},
      {name:'Beurre de cacahuète', quantity:'10g', calories:60, protein:2.5, carbs:2, fat:5},
      {name:'Pomme', quantity:'50g', calories:26, protein:0, carbs:7, fat:0}
    ],
    steps: [
      'Mixer fromage frais + banane congelée jusqu\'à texture crémeuse.',
      'Verser dans un bol large.',
      'Garnir avec les flocons d\'avoine, pomme coupée en dés.',
      'Finir avec le beurre de cacahuète en filet.',
      'Consommer immédiatement avant que la banane dégèle trop.'
    ],
    substitutions: [
      {original:'Banane congelée', alternative:'100g mangue congelée pour variation estivale'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% pour texture plus liquide'},
      {original:'Avoine', alternative:'Granola maison pour plus de croquant'}
    ],
    coach_note: 'La texture crémeuse vient de la banane congelée — aucun besoin de crème. Visuellement magnifique, macro parfaites.'
  },

  // ════════════════════════════════════════════
  // 🍔 FAST FOOD REMAKES (10)
  // ════════════════════════════════════════════
  {
    title: 'Big Mac Maison Fit',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'all',
    craving_tag: 'fast food',
    prep_time: 15,
    difficulty: 2,
    total_calories: 522,
    total_protein: 46,
    total_carbs: 40,
    total_fat: 20,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#8B0000)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Steak haché', quantity:'150g', calories:375, protein:39, carbs:0, fat:25.5},
      {name:'Pain ARRUPAN complet', quantity:'90g (2 tranches)', calories:240, protein:8, carbs:44, fat:3},
      {name:'Fromage frais Lactel 0%', quantity:'40g', calories:36, protein:3.4, carbs:1.7, fat:1.4},
      {name:'Tomates', quantity:'80g', calories:14, protein:0.7, carbs:3.1, fat:0.2},
      {name:'Salade verte', quantity:'30g', calories:5, protein:0.4, carbs:0.9, fat:0.1}
    ],
    steps: [
      'Former 2 steaks hachés fins de 75g, assaisonner sel et poivre.',
      'Cuire à la poêle très chaude 2-3 min par côté.',
      'Mixer fromage frais avec moutarde, ail, cornichons pour sauce Big Mac fit.',
      'Toaster le pain ARRUPAN.',
      'Assembler : pain, sauce, salade, tomate, steak, sauce, steak, pain.'
    ],
    substitutions: [
      {original:'Steak haché', alternative:'150g poulet haché pour version plus légère'},
      {original:'Pain ARRUPAN', alternative:'Feuilles de laitue iceberg pour version sans glucides'},
      {original:'Fromage frais sauce', alternative:'Yaourt grec 0% + moutarde + ail en poudre'}
    ],
    coach_note: 'Exactement comme un Big Mac — double steak, sauce spéciale — mais avec 40% moins de calories. La sauce fromage frais est le secret.'
  },

  {
    title: 'Wrap Poulet Crispy Remake',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'all',
    craving_tag: 'fast food',
    prep_time: 12,
    difficulty: 2,
    total_calories: 484,
    total_protein: 44,
    total_carbs: 46,
    total_fat: 13,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a1200,#DAA520)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'180g', calories:216, protein:39.6, carbs:0, fat:3.6},
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Tomates', quantity:'80g', calories:14, protein:0.7, carbs:3.1, fat:0.2},
      {name:'Salade verte', quantity:'40g', calories:7, protein:0.5, carbs:1.2, fat:0.1}
    ],
    steps: [
      'Couper le poulet en lamelles, assaisonner avec paprika, ail, sel.',
      'Cuire à la poêle très chaude pour effet "crispy" — feu fort, peu d\'huile.',
      'Préparer la sauce : fromage frais + paprika fumé + citron + ail.',
      'Réchauffer le pain ARRUPAN à la poêle sèche pour l\'assouplir.',
      'Assembler et rouler serré.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'Dinde en lamelles même quantité'},
      {original:'Pain ARRUPAN', alternative:'Tortilla complète du commerce'},
      {original:'Sauce fromage frais', alternative:'Yaourt grec + herbes + ail'}
    ],
    coach_note: 'Le wrap crispy du fast food — version maison fait à la maison avec de vrais ingrédients. Cuisson à feu fort = texture croustillante sans friture.'
  },

  {
    title: 'Pizza Pain ARRUPAN Poulet',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'all',
    craving_tag: 'fast food',
    prep_time: 10,
    difficulty: 1,
    total_calories: 438,
    total_protein: 40,
    total_carbs: 38,
    total_fat: 14,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0000,#DC143C)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Escalope de poulet', quantity:'120g', calories:144, protein:26.4, carbs:0, fat:2.4},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Tomates', quantity:'100g', calories:18, protein:0.9, carbs:3.9, fat:0.2},
      {name:'Poivrons', quantity:'80g', calories:18, protein:0.6, carbs:4.2, fat:0.2}
    ],
    steps: [
      'Préchauffer le four à 200°C ou utiliser une poêle avec couvercle.',
      'Étaler le fromage frais (sauce base) sur le pain ARRUPAN.',
      'Ajouter tomates coupées, poulet cuit préalablement en dés, poivrons.',
      'Assaisonner origan, herbes de Provence, sel, poivre.',
      'Four 8 minutes jusqu\'à bords dorés. Poêle : couvrir 5 minutes à feu doux.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'Thon en boîte 100g pour version express'},
      {original:'Fromage frais sauce', alternative:'Coulis de tomates 50g pour version rouge classique'},
      {original:'Poivrons', alternative:'Courgettes, champignons au choix'}
    ],
    coach_note: 'La pizza du dimanche soir sans culpabilité. Pain ARRUPAN = base parfaite, fromage frais = mozzarella protéinée. Résultat bluffant.'
  },

  {
    title: 'Hot Dog Dinde Fit',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'fat_loss',
    craving_tag: 'fast food',
    prep_time: 8,
    difficulty: 1,
    total_calories: 382,
    total_protein: 36,
    total_carbs: 32,
    total_fat: 12,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#FF6347)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de dinde', quantity:'150g', calories:165, protein:33, carbs:0, fat:1.5},
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Fromage frais Lactel 0%', quantity:'40g', calories:36, protein:3.4, carbs:1.7, fat:1.4},
      {name:'Tomates', quantity:'60g', calories:11, protein:0.5, carbs:2.3, fat:0.2},
      {name:'Cornichons', quantity:'30g', calories:4, protein:0.2, carbs:0.9, fat:0}
    ],
    steps: [
      'Couper la dinde en forme de saucisse longue ou en lamelles épaisses.',
      'Assaisonner avec paprika fumé, sel, ail en poudre.',
      'Griller à la poêle 3-4 minutes par côté à feu moyen-fort.',
      'Préparer sauce : fromage frais + moutarde + cornichons hachés.',
      'Assembler dans le pain ARRUPAN ouvert en deux.'
    ],
    substitutions: [
      {original:'Dinde', alternative:'Steak haché 120g pour version plus riche'},
      {original:'Sauce fromage frais', alternative:'Ketchup maison tomates 30g + épices'},
      {original:'Cornichons', alternative:'Oignons marinés pour variation'}
    ],
    coach_note: 'Hot dog de stade mais version coaching. La dinde grillée avec paprika fumé donne exactement le goût de la saucisse sans les additifs.'
  },

  {
    title: 'Chicken Strips Four Épicés',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'all',
    craving_tag: 'fast food',
    prep_time: 15,
    difficulty: 2,
    total_calories: 354,
    total_protein: 42,
    total_carbs: 20,
    total_fat: 10,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a0a00,#FF8C00)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'200g', calories:240, protein:44, carbs:0, fat:4},
      {name:'Flocons d\'avoine mixés', quantity:'40g', calories:152, protein:5.2, carbs:24, fat:2.8},
      {name:'Œuf entier', quantity:'1 (60g)', calories:70, protein:6, carbs:1, fat:5},
      {name:'Fromage frais Lactel 0%', quantity:'40g', calories:36, protein:3.4, carbs:1.7, fat:1.4},
      {name:'Épices', quantity:'5g', calories:15, protein:0.5, carbs:3, fat:0.2}
    ],
    steps: [
      'Couper le poulet en lanières de 2cm d\'épaisseur.',
      'Préparer panure : avoine mixée + paprika + ail + sel + poivre.',
      'Tremper chaque lanière dans l\'œuf battu puis dans la panure avoine.',
      'Disposer sur plaque huilée, four 200°C 15-18 minutes. Retourner à mi-cuisson.',
      'Servir avec sauce fromage frais + citron + ail.'
    ],
    substitutions: [
      {original:'Avoine panure', alternative:'Son d\'avoine pour version plus fibreuse'},
      {original:'Four', alternative:'Airfryer 190°C 12 minutes pour version encore plus croustillante'},
      {original:'Poulet', alternative:'Dinde même quantité pour variation'}
    ],
    coach_note: 'La panure avoine donne un croustillant incroyable sans friture. Prépare en double et congèle — réchauffage four 5 minutes.'
  },

  {
    title: 'Burger Steak Haché Maison',
    category: 'Fast Food Remakes',
    meal_type: 'dinner',
    goal_tag: 'muscle',
    craving_tag: 'fast food',
    prep_time: 15,
    difficulty: 2,
    total_calories: 558,
    total_protein: 50,
    total_carbs: 42,
    total_fat: 22,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0000,#B22222)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Steak haché', quantity:'180g', calories:450, protein:46.8, carbs:0, fat:30.6},
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Fromage frais Lactel 0%', quantity:'40g', calories:36, protein:3.4, carbs:1.7, fat:1.4},
      {name:'Tomates', quantity:'80g', calories:14, protein:0.7, carbs:3.1, fat:0.2},
      {name:'Salade verte', quantity:'30g', calories:5, protein:0.4, carbs:0.9, fat:0.1}
    ],
    steps: [
      'Former un steak épais de 180g, assaisonner généreusement.',
      'Poêle en fonte très chaude — cuire 3-4 min par côté pour saignant/médium.',
      'Laisser reposer 2 minutes hors du feu.',
      'Toaster le pain à la poêle avec une goutte d\'huile.',
      'Sauce : fromage frais + moutarde + cornichons + ail. Assembler.'
    ],
    substitutions: [
      {original:'Steak haché', alternative:'160g poulet haché pour version plus légère (-100kcal)'},
      {original:'Pain ARRUPAN', alternative:'Feuilles de laitue pour version keto'},
      {original:'Sauce', alternative:'Avocat écrasé 40g pour sauce guacamole fit'}
    ],
    coach_note: 'Le vrai burger maison — steak épais, cuisson à point, pain toasté. Pas de compromis sur le goût. Juste des ingrédients propres.'
  },

  {
    title: 'Sandwich Club Poulet Grillé',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'fat_loss',
    craving_tag: 'fast food',
    prep_time: 10,
    difficulty: 1,
    total_calories: 424,
    total_protein: 40,
    total_carbs: 34,
    total_fat: 14,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#001a00,#228B22)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'160g', calories:192, protein:35.2, carbs:0, fat:3.2},
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Tomates', quantity:'80g', calories:14, protein:0.7, carbs:3.1, fat:0.2},
      {name:'Œuf entier', quantity:'1 dur (60g)', calories:70, protein:6, carbs:1, fat:5}
    ],
    steps: [
      'Griller le poulet assaisonné avec herbes, sel, poivre, citron.',
      'Cuire l\'œuf dur 8 minutes, refroidir et couper en rondelles.',
      'Préparer sauce : fromage frais + moutarde + herbes fraîches.',
      'Toaster le pain ARRUPAN.',
      'Assembler en couches : pain, sauce, laitue, poulet, œuf, tomate, pain.'
    ],
    substitutions: [
      {original:'Poulet grillé', alternative:'Thon 120g pour version rapide'},
      {original:'Œuf dur', alternative:'Supprimer pour version moins calorique'},
      {original:'Pain ARRUPAN', alternative:'Pain de seigle pour variation'}
    ],
    coach_note: 'Le classic club sandwich remis au goût du jour. Double protéines (poulet + œuf) dans un seul repas.'
  },

  {
    title: 'Tacos Poulet Fromage Frais',
    category: 'Fast Food Remakes',
    meal_type: 'dinner',
    goal_tag: 'all',
    craving_tag: 'fast food',
    prep_time: 12,
    difficulty: 2,
    total_calories: 494,
    total_protein: 46,
    total_carbs: 44,
    total_fat: 14,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a0a00,#FF7F50)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'180g', calories:216, protein:39.6, carbs:0, fat:3.6},
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Fromage frais Lactel 0%', quantity:'100g', calories:89, protein:8.6, carbs:4.3, fat:3.5},
      {name:'Tomates', quantity:'80g', calories:14, protein:0.7, carbs:3.1, fat:0.2},
      {name:'Épices tacos', quantity:'5g', calories:15, protein:0.5, carbs:3, fat:0.3}
    ],
    steps: [
      'Couper le poulet en dés, assaisonner avec épices tacos (cumin, paprika, ail, origan).',
      'Faire revenir à feu vif jusqu\'à légèrement caramélisé.',
      'Chauffer le pain ARRUPAN à la poêle sèche pour assouplir.',
      'Mélanger fromage frais avec citron, coriandre, sel pour sauce.',
      'Garnir le pain : sauce, poulet épicé, tomates, salade.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'Steak haché 150g version texane'},
      {original:'Épices tacos', alternative:'Harissa 5g + cumin pour version algérienne'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% + ail + citron'}
    ],
    coach_note: 'Le tacos façon fast food algérien — le poulet caramélisé avec les épices est le secret. Ne pas lésiner sur le feu fort pour la réaction de Maillard.'
  },

  {
    title: 'Nuggets Maison Panure Avoine',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'all',
    craving_tag: 'fast food',
    prep_time: 15,
    difficulty: 2,
    total_calories: 362,
    total_protein: 38,
    total_carbs: 24,
    total_fat: 10,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a1000,#FFD700)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'180g', calories:216, protein:39.6, carbs:0, fat:3.6},
      {name:'Flocons d\'avoine mixés', quantity:'40g', calories:152, protein:5.2, carbs:24, fat:2.8},
      {name:'Œuf entier', quantity:'1 (60g)', calories:70, protein:6, carbs:1, fat:5},
      {name:'Épices', quantity:'3g', calories:10, protein:0.3, carbs:2, fat:0.1},
      {name:'Huile d\'olive', quantity:'4g spray', calories:36, protein:0, carbs:0, fat:4}
    ],
    steps: [
      'Couper le poulet en morceaux nuggets de 3cm.',
      'Préparer panure : avoine mixée fine + sel + poivre + ail + paprika.',
      'Tremper chaque morceau dans l\'œuf battu puis rouler dans panure.',
      'Disposer sur plaque, vaporiser légèrement d\'huile.',
      'Four 200°C 15 minutes, retourner à mi-cuisson pour dorer les deux côtés.'
    ],
    substitutions: [
      {original:'Avoine panure', alternative:'Chapelure complète pour texture plus classique'},
      {original:'Four', alternative:'Airfryer 190°C 10 min pour version ultra croustillante'},
      {original:'Poulet', alternative:'Filets de poisson blanc 180g pour fish fingers'}
    ],
    coach_note: 'Tes enfants peuvent les manger aussi. Prépare 500g de poulet le dimanche, congèle en portions, chauffe au four 5 min les jours de flemme.'
  },

  {
    title: 'Croque Fit ARRUPAN Dinde Fromage',
    category: 'Fast Food Remakes',
    meal_type: 'lunch',
    goal_tag: 'fat_loss',
    craving_tag: 'fast food',
    prep_time: 8,
    difficulty: 1,
    total_calories: 398,
    total_protein: 38,
    total_carbs: 32,
    total_fat: 13,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#0a0a1a,#4682B4)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Escalope de dinde', quantity:'120g', calories:132, protein:26.4, carbs:0, fat:1.2},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Tomates', quantity:'60g', calories:11, protein:0.5, carbs:2.3, fat:0.2},
      {name:'Moutarde', quantity:'10g', calories:10, protein:0.6, carbs:0.8, fat:0.6}
    ],
    steps: [
      'Cuire la dinde à la poêle 3 min par côté, assaisonner.',
      'Tartiner le pain ARRUPAN de fromage frais + moutarde.',
      'Ajouter la dinde chaude et les tomates.',
      'Fermer le sandwich, cuire à la poêle chaude légèrement huilée 2 min côté.',
      'Appuyer légèrement pour effet croque-monsieur. Servir chaud.'
    ],
    substitutions: [
      {original:'Dinde', alternative:'Poulet grillé froid pour version froide'},
      {original:'Fromage frais', alternative:'20g comté râpé pour version plus indulgente +50kcal'},
      {original:'Moutarde', alternative:'Pesto maison pour variation italienne'}
    ],
    coach_note: 'Le croque-monsieur de bureau. Se prépare en 8 minutes exactement. La moutarde + fromage frais = béchamel protéinée sans les calories.'
  },

  // ════════════════════════════════════════════
  // 🍽 ALGERIAN CLASSICS REMADE (10)
  // ════════════════════════════════════════════
  {
    title: 'Couscous Poulet Légumes Fit',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'all',
    craving_tag: 'chaud',
    prep_time: 20,
    difficulty: 2,
    total_calories: 554,
    total_protein: 48,
    total_carbs: 62,
    total_fat: 12,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a1000,#C8A415)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'200g', calories:240, protein:44, carbs:0, fat:4},
      {name:'Couscous cru', quantity:'80g', calories:285, protein:9.6, carbs:59.2, fat:0.8},
      {name:'Courgettes', quantity:'200g', calories:34, protein:2.6, carbs:5, fat:0.6},
      {name:'Carottes', quantity:'100g', calories:41, protein:0.9, carbs:9.6, fat:0.2},
      {name:'Huile d\'olive', quantity:'10g', calories:90, protein:0, carbs:0, fat:10}
    ],
    steps: [
      'Cuire le poulet avec épices (ras el hanout, curcuma, sel) et légumes à l\'eau.',
      'Préparer la semoule : eau bouillante 1:1, huile d\'olive, égrainer à la fourchette.',
      'Laisser gonfler 5 minutes, couvrir d\'un torchon humide.',
      'Servir la semoule en dôme, légumes dessus, bouillon à côté.',
      'Poulet présenté entier ou effiloché selon préférence.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'200g dinde pour variation'},
      {original:'Couscous', alternative:'Quinoa 70g pour version sans gluten et plus protéinée'},
      {original:'Légumes', alternative:'Potiron + navets pour version automnale authentique'}
    ],
    coach_note: 'Le couscous n\'est pas l\'ennemi — c\'est le beurre et la quantité qui font mal. Cette version est exactement ce que mangeaient nos grands-mères : simple, équilibré, nourrissant.'
  },

  {
    title: 'Chakhchoukha Dinde Remade',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'muscle',
    craving_tag: 'chaud',
    prep_time: 20,
    difficulty: 3,
    total_calories: 518,
    total_protein: 44,
    total_carbs: 56,
    total_fat: 12,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#B8560B)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de dinde', quantity:'200g', calories:220, protein:44, carbs:0, fat:2},
      {name:'Pain ARRUPAN émietté', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Tomates', quantity:'200g', calories:36, protein:1.8, carbs:7.8, fat:0.4},
      {name:'Pois chiches cuits', quantity:'100g', calories:164, protein:8.9, carbs:27.4, fat:2.6},
      {name:'Huile d\'olive', quantity:'10g', calories:90, protein:0, carbs:0, fat:10}
    ],
    steps: [
      'Faire revenir la dinde coupée en morceaux avec oignon, tomates, épices.',
      'Ajouter pois chiches et eau, laisser mijoter 10 minutes.',
      'Émietter finement le pain ARRUPAN dans un grand bol.',
      'Verser la sauce chaude par-dessus pour hydrater le pain.',
      'Mélanger délicatement, ajuster sel et poivre. Repos 2 minutes avant service.'
    ],
    substitutions: [
      {original:'Dinde', alternative:'Poulet rôti effiloché pour version express avec restes'},
      {original:'Pain ARRUPAN', alternative:'Galette de semoule pour version plus authentique'},
      {original:'Pois chiches', alternative:'Supprimer pour version moins glucidique'}
    ],
    coach_note: 'La chakhchoukha de ta mère mais avec des macros que tu peux tracker. Le pain ARRUPAN absorbe la sauce exactement comme les feuilles traditionnelles.'
  },

  {
    title: 'Rechta Blanche Poulet Fit',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'all',
    craving_tag: 'chaud',
    prep_time: 15,
    difficulty: 2,
    total_calories: 502,
    total_protein: 46,
    total_carbs: 54,
    total_fat: 10,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#0a0a0a,#C0C0C0)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'180g', calories:216, protein:39.6, carbs:0, fat:3.6},
      {name:'Pâtes', quantity:'80g cru', calories:280, protein:9.6, carbs:57.6, fat:1.6},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Carottes', quantity:'100g', calories:41, protein:0.9, carbs:9.6, fat:0.2},
      {name:'Huile d\'olive', quantity:'6g', calories:54, protein:0, carbs:0, fat:6}
    ],
    steps: [
      'Cuire le poulet avec oignon, cannelle, sel à l\'eau — garder le bouillon.',
      'Cuire les pâtes dans le bouillon pour qu\'elles absorbent les saveurs.',
      'Cuire carottes et navets dans le bouillon restant.',
      'Mélanger fromage frais avec un peu de bouillon pour sauce blanche légère.',
      'Assembler : pâtes, sauce blanche, légumes, poulet effiloché dessus.'
    ],
    substitutions: [
      {original:'Pâtes', alternative:'Couscous fin 70g pour version plus authentique'},
      {original:'Fromage frais sauce', alternative:'Yaourt grec 0% chauffé doucement'},
      {original:'Poulet', alternative:'Dinde même quantité'}
    ],
    coach_note: 'La rechta — plat algérois par excellence. La sauce blanche au fromage frais remplace la crème traditionnelle avec le même goût et 70% moins de gras.'
  },

  {
    title: 'Bourek Four Poulet Fromage',
    category: 'Algerian Classics',
    meal_type: 'lunch',
    goal_tag: 'all',
    craving_tag: 'salé',
    prep_time: 15,
    difficulty: 2,
    total_calories: 418,
    total_protein: 38,
    total_carbs: 32,
    total_fat: 16,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a1000,#DAA520)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'150g', calories:180, protein:33, carbs:0, fat:3},
      {name:'Pain ARRUPAN complet', quantity:'90g', calories:240, protein:8, carbs:44, fat:3},
      {name:'Œuf entier', quantity:'1 (60g)', calories:70, protein:6, carbs:1, fat:5},
      {name:'Fromage frais Lactel 0%', quantity:'80g', calories:71, protein:6.9, carbs:3.4, fat:2.8},
      {name:'Huile d\'olive', quantity:'6g', calories:54, protein:0, carbs:0, fat:6}
    ],
    steps: [
      'Cuire le poulet et hacher finement ou effilocher.',
      'Mélanger poulet + fromage frais + œuf battu + sel + poivre + persil.',
      'Étaler le pain ARRUPAN, garnir au centre avec la farce.',
      'Rouler serré en formant un cylindre, badigeonner d\'huile d\'olive.',
      'Four 200°C 12-15 minutes jusqu\'à doré et croustillant.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'Thon + fromage frais pour version express sans cuisson'},
      {original:'Pain ARRUPAN', alternative:'Feuilles de brick pour version plus croustillante authentique'},
      {original:'Four', alternative:'Airfryer 190°C 10 minutes pour résultat identique plus vite'}
    ],
    coach_note: 'Le bourek de Ramadan mais au four — sans bain d\'huile. Le pain ARRUPAN devient croustillant exactement comme la feuille de brick. Essaie pour te convaincre.'
  },

  {
    title: 'Tajine Zitoune Poulet Fit',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'all',
    craving_tag: 'chaud',
    prep_time: 20,
    difficulty: 2,
    total_calories: 476,
    total_protein: 46,
    total_carbs: 24,
    total_fat: 22,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#0a1a00,#556B2F)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'200g', calories:240, protein:44, carbs:0, fat:4},
      {name:'Pommes de terre', quantity:'150g', calories:120, protein:3, carbs:27, fat:0},
      {name:'Tomates', quantity:'150g', calories:27, protein:1.4, carbs:5.9, fat:0.3},
      {name:'Huile d\'olive', quantity:'10g', calories:90, protein:0, carbs:0, fat:10},
      {name:'Olives vertes', quantity:'30g', calories:35, protein:0.4, carbs:1.8, fat:3}
    ],
    steps: [
      'Faire revenir le poulet dans l\'huile avec oignon, ail, citron.',
      'Ajouter tomates, curcuma, gingembre, sel, poivre.',
      'Incorporer les pommes de terre en morceaux.',
      'Mijoter à couvert 15 minutes à feu moyen.',
      'Ajouter les olives les 3 dernières minutes. Servir avec pain ou seul.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'Lapin ou dinde pour variation'},
      {original:'Pommes de terre', alternative:'Courgettes pour version moins glucidique'},
      {original:'Olives', alternative:'Câpres pour version plus méditerranéenne'}
    ],
    coach_note: 'Le tajine est naturellement fit — peu de matière grasse, plein de légumes, protéine maigre. Le seul ajustement : l\'huile mesurée au gramme, pas au feeling.'
  },

  {
    title: 'Riz Berbère Poulet Épices',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'muscle',
    craving_tag: 'chaud',
    prep_time: 15,
    difficulty: 2,
    total_calories: 542,
    total_protein: 48,
    total_carbs: 58,
    total_fat: 12,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#A0522D)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'180g', calories:216, protein:39.6, carbs:0, fat:3.6},
      {name:'Riz blanc', quantity:'80g cru', calories:288, protein:5.6, carbs:62.4, fat:0.8},
      {name:'Carottes', quantity:'100g', calories:41, protein:0.9, carbs:9.6, fat:0.2},
      {name:'Tomates', quantity:'100g', calories:18, protein:0.9, carbs:3.9, fat:0.2},
      {name:'Huile d\'olive', quantity:'10g', calories:90, protein:0, carbs:0, fat:10}
    ],
    steps: [
      'Faire revenir le poulet coupé en dés avec oignon, cumin, coriandre.',
      'Ajouter tomates, carottes, poivrons — cuire 5 minutes.',
      'Incorporer le riz lavé, mélanger pour enrober dans les épices.',
      'Couvrir d\'eau bouillante 1.5x le volume de riz. Cuire à couvert 12 min.',
      'Laisser reposer 5 minutes, égrainer à la fourchette.'
    ],
    substitutions: [
      {original:'Riz blanc', alternative:'Riz complet pour version plus fibreuse (+20 min cuisson)'},
      {original:'Poulet', alternative:'Thon en boîte 200g pour version express 10 minutes'},
      {original:'Légumes', alternative:'Tout légume de saison que tu as'}
    ],
    coach_note: 'Le riz berbère — riz cuit directement dans le bouillon et les épices. Infiniment plus savoureux que le riz bouilli nature. Même macros, 10x plus de goût.'
  },

  {
    title: 'Dolma Poivrons Dinde Riz',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'all',
    craving_tag: 'chaud',
    prep_time: 20,
    difficulty: 3,
    total_calories: 462,
    total_protein: 40,
    total_carbs: 50,
    total_fat: 12,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#001a00,#006400)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de dinde hachée', quantity:'150g', calories:165, protein:33, carbs:0, fat:1.5},
      {name:'Riz blanc', quantity:'60g cru', calories:216, protein:4.2, carbs:46.8, fat:0.6},
      {name:'Poivrons', quantity:'300g (3 moyens)', calories:69, protein:2.3, carbs:16.2, fat:0.6},
      {name:'Tomates', quantity:'150g', calories:27, protein:1.4, carbs:5.9, fat:0.3},
      {name:'Huile d\'olive', quantity:'10g', calories:90, protein:0, carbs:0, fat:10}
    ],
    steps: [
      'Évider les poivrons proprement, garder les chapeaux.',
      'Mélanger dinde hachée + riz cru + oignon + persil + sel + épices.',
      'Farcir les poivrons aux 3/4 (le riz gonfle à la cuisson).',
      'Disposer dans une cocotte sur lit de tomates + eau 200ml.',
      'Cuire à couvert 25-30 minutes à feu moyen. Vérifier cuisson riz.'
    ],
    substitutions: [
      {original:'Dinde', alternative:'Poulet haché pour même résultat'},
      {original:'Poivrons', alternative:'Courgettes ou tomates vidées même méthode'},
      {original:'Riz', alternative:'Quinoa pour version plus protéinée'}
    ],
    coach_note: 'La dolma — plat de patience mais les macros sont incroyables. Prépare 6 poivrons, mange-en 3 ce soir, 3 demain midi. Le riz maigre en farce change tout.'
  },

  {
    title: 'Steak Haché Pommes de Terre Four',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'muscle',
    craving_tag: 'chaud',
    prep_time: 20,
    difficulty: 1,
    total_calories: 524,
    total_protein: 46,
    total_carbs: 38,
    total_fat: 20,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0000,#8B0000)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Steak haché', quantity:'180g', calories:450, protein:46.8, carbs:0, fat:30.6},
      {name:'Pommes de terre', quantity:'200g', calories:160, protein:4, carbs:36, fat:0},
      {name:'Tomates', quantity:'150g', calories:27, protein:1.4, carbs:5.9, fat:0.3},
      {name:'Huile d\'olive', quantity:'8g', calories:72, protein:0, carbs:0, fat:8},
      {name:'Épices algériennes', quantity:'5g', calories:15, protein:0.5, carbs:3, fat:0.2}
    ],
    steps: [
      'Couper les pommes de terre en rondelles fines, assaisonner et huiler.',
      'Former les steaks, assaisonner avec ras el hanout, sel, poivre.',
      'Disposer les PDT dans le plat, steaks dessus, tomates autour.',
      'Four 200°C 20-25 minutes. Les PDT absorbent le jus de viande.',
      'Griller 3 dernières minutes pour caraméliser le dessus.'
    ],
    substitutions: [
      {original:'Steak haché', alternative:'Poulet haché pour version plus légère'},
      {original:'Pommes de terre', alternative:'Patate douce pour version plus micronutriments'},
      {original:'Four', alternative:'Poêle + couvercle 15 minutes si pas de four'}
    ],
    coach_note: 'La recette du dimanche soir — tout dans un plat, four, repos. Les PDT au four sont infiniment meilleures que frites. Et tes macros restent propres.'
  },

  {
    title: 'Poisson Chermoula Riz Blanc',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'fat_loss',
    craving_tag: 'chaud',
    prep_time: 15,
    difficulty: 2,
    total_calories: 458,
    total_protein: 48,
    total_carbs: 48,
    total_fat: 10,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#001010,#008B8B)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Poisson blanc', quantity:'200g', calories:170, protein:40, carbs:0, fat:2},
      {name:'Riz blanc', quantity:'80g cru', calories:288, protein:5.6, carbs:62.4, fat:0.8},
      {name:'Tomates', quantity:'100g', calories:18, protein:0.9, carbs:3.9, fat:0.2},
      {name:'Huile d\'olive', quantity:'8g', calories:72, protein:0, carbs:0, fat:8},
      {name:'Épices chermoula', quantity:'5g', calories:15, protein:0.5, carbs:3, fat:0.2}
    ],
    steps: [
      'Préparer chermoula : coriandre + persil + ail + cumin + paprika + huile + citron.',
      'Mariner le poisson 15 minutes dans la chermoula.',
      'Cuire le riz à l\'eau bouillante salée 12 minutes.',
      'Griller le poisson à la poêle chaude 3-4 min par côté.',
      'Servir poisson sur riz avec reste de chermoula en sauce.'
    ],
    substitutions: [
      {original:'Poisson blanc', alternative:'Thon frais 200g pour version plus riche'},
      {original:'Riz', alternative:'Couscous fin 70g pour version plus rapide'},
      {original:'Chermoula maison', alternative:'Chermoula en conserve + citron frais'}
    ],
    coach_note: 'Le poisson est le roi du fat loss — protéine maximale, gras minimal. La chermoula algérienne est une des meilleures marinades au monde. Profite-en.'
  },

  {
    title: 'Lentilles Poulet Cumin',
    category: 'Algerian Classics',
    meal_type: 'dinner',
    goal_tag: 'all',
    craving_tag: 'chaud',
    prep_time: 15,
    difficulty: 1,
    total_calories: 478,
    total_protein: 42,
    total_carbs: 52,
    total_fat: 10,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#8B4513)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Escalope de poulet', quantity:'150g', calories:180, protein:33, carbs:0, fat:3},
      {name:'Lentilles vertes cuites', quantity:'150g', calories:173, protein:13.5, carbs:28.5, fat:0.8},
      {name:'Tomates', quantity:'150g', calories:27, protein:1.4, carbs:5.9, fat:0.3},
      {name:'Huile d\'olive', quantity:'10g', calories:90, protein:0, carbs:0, fat:10},
      {name:'Carottes', quantity:'100g', calories:41, protein:0.9, carbs:9.6, fat:0.2}
    ],
    steps: [
      'Faire revenir le poulet en dés avec oignon et ail dans l\'huile.',
      'Ajouter tomates, carottes, cumin, curcuma, sel.',
      'Incorporer les lentilles cuites (ou cru + eau, +20 min).',
      'Laisser mijoter ensemble 10 minutes pour marier les saveurs.',
      'Ajuster consistance avec eau si nécessaire. Servir avec pain.'
    ],
    substitutions: [
      {original:'Poulet', alternative:'Thon 150g pour version express sans cuisson viande'},
      {original:'Lentilles vertes', alternative:'Lentilles corail pour cuisson plus rapide'},
      {original:'Légumes', alternative:'Ajouter courgettes, poivrons selon saison'}
    ],
    coach_note: 'Lentilles + poulet = combo protéine complète. Les lentilles sont le légume le plus sous-estimé en musculation. 13g de protéines par 150g cuit, prix dérisoire.'
  },

  // ════════════════════════════════════════════
  // 🍫 HIGH PROTEIN DESSERTS (5)
  // ════════════════════════════════════════════
  {
    title: 'Mousse Chocolat Fromage Frais',
    category: 'Desserts',
    meal_type: 'snack',
    goal_tag: 'fat_loss',
    craving_tag: 'sucré',
    prep_time: 5,
    difficulty: 1,
    total_calories: 218,
    total_protein: 19,
    total_carbs: 16,
    total_fat: 8,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#0a0000,#3D0000)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Fromage frais Lactel 0%', quantity:'200g', calories:178, protein:17.2, carbs:8.6, fat:7},
      {name:'Cacao en poudre', quantity:'15g', calories:37, protein:1.5, carbs:5.3, fat:1.2},
      {name:'Banane', quantity:'30g', calories:27, protein:0.3, carbs:6.9, fat:0},
      {name:'Beurre de cacahuète', quantity:'5g', calories:30, protein:1.25, carbs:1, fat:2.5},
      {name:'Cannelle', quantity:'1g', calories:3, protein:0, carbs:0.7, fat:0}
    ],
    steps: [
      'Mixer banane avec fromage frais jusqu\'à texture lisse.',
      'Incorporer le cacao tamisé et mélanger vigoureusement.',
      'Ajouter cannelle, une pincée de sel pour rehausser le chocolat.',
      'Verser dans un bol ou verrines, réfrigérer 30 minutes minimum.',
      'Finir avec beurre de cacahuète en filet avant service.'
    ],
    substitutions: [
      {original:'Banane', alternative:'10g de miel pour sucrerie différente'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% pour texture plus légère'},
      {original:'Cacao', alternative:'Poudre de caroube pour version sans caféine'}
    ],
    coach_note: 'La mousse au chocolat de ta mère mais avec 18g de protéines. Le secret : banane écrasée comme sucrant naturel + sel pour intensifier le chocolat.'
  },

  {
    title: 'Cookies Avoine Beurre de Cacahuète',
    category: 'Desserts',
    meal_type: 'snack',
    goal_tag: 'muscle',
    craving_tag: 'sucré',
    prep_time: 12,
    difficulty: 1,
    total_calories: 276,
    total_protein: 17,
    total_carbs: 28,
    total_fat: 11,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a0800,#8B4513)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Flocons d\'avoine', quantity:'60g', calories:228, protein:7.8, carbs:36, fat:4.2},
      {name:'Beurre de cacahuète', quantity:'20g', calories:120, protein:5, carbs:4, fat:10},
      {name:'Banane', quantity:'80g', calories:71, protein:0.8, carbs:18.4, fat:0},
      {name:'Œuf entier', quantity:'1 (60g)', calories:70, protein:6, carbs:1, fat:5},
      {name:'Cacao en poudre', quantity:'10g', calories:25, protein:1, carbs:3.5, fat:0.8}
    ],
    steps: [
      'Écraser la banane à la fourchette jusqu\'à consistance de purée.',
      'Mélanger avec beurre de cacahuète et œuf.',
      'Incorporer avoine et cacao, bien mélanger.',
      'Former des cookies épais sur plaque recouverte papier cuisson.',
      'Four 175°C, 10-12 minutes. Laisser refroidir — ils se rafferment en refroidissant.'
    ],
    substitutions: [
      {original:'Banane', alternative:'80g compote de pomme pour version différente'},
      {original:'Cacao', alternative:'Pépites de chocolat 15g pour version plus indulgente +30kcal'},
      {original:'Avoine', alternative:'Son d\'avoine pour version plus fibreuse'}
    ],
    coach_note: 'Recette 5 ingrédients, 0 sucre ajouté. La banane sucre naturellement. Fais 8 cookies le dimanche, 2 par jour toute la semaine. Congèle si besoin.'
  },

  {
    title: 'Banana Nice Cream Protéiné',
    category: 'Desserts',
    meal_type: 'snack',
    goal_tag: 'fat_loss',
    craving_tag: 'sucré',
    prep_time: 5,
    difficulty: 1,
    total_calories: 242,
    total_protein: 15,
    total_carbs: 36,
    total_fat: 5,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a1000,#FFD700)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Banane congelée', quantity:'150g', calories:134, protein:1.5, carbs:34.5, fat:0},
      {name:'Fromage frais Lactel 0%', quantity:'100g', calories:89, protein:8.6, carbs:4.3, fat:3.5},
      {name:'Beurre de cacahuète', quantity:'10g', calories:60, protein:2.5, carbs:2, fat:5},
      {name:'Cacao en poudre', quantity:'5g', calories:12, protein:0.5, carbs:1.8, fat:0.4},
      {name:'Cannelle', quantity:'1g', calories:3, protein:0, carbs:0.7, fat:0}
    ],
    steps: [
      'Congeler les bananes pelées la veille minimum (mûres de préférence).',
      'Casser en morceaux et mixer avec fromage frais.',
      'Texture crémeuse type glace — ajouter cacao si version chocolat.',
      'Verser dans un bol, garnir avec beurre de cacahuète.',
      'Consommer immédiatement ou remettre 20 min au congélateur pour texture plus ferme.'
    ],
    substitutions: [
      {original:'Banane', alternative:'Mangue congelée 150g pour version tropicale'},
      {original:'Cacao', alternative:'Fraises congelées pour version fraise'},
      {original:'Fromage frais', alternative:'Yaourt grec congelé pour plus de protéines'}
    ],
    coach_note: '0 crème, 0 sucre, 0 culpabilité. Exactement la texture de la vraie glace. Le secret : bananes bien mûres et bien congelées.'
  },

  {
    title: 'Mug Cake Avoine Chocolat',
    category: 'Desserts',
    meal_type: 'snack',
    goal_tag: 'all',
    craving_tag: 'sucré',
    prep_time: 3,
    difficulty: 1,
    total_calories: 258,
    total_protein: 19,
    total_carbs: 27,
    total_fat: 8,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#0a0000,#1a0800)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Flocons d\'avoine mixés', quantity:'40g', calories:152, protein:5.2, carbs:24, fat:2.8},
      {name:'Œuf entier', quantity:'1 (60g)', calories:70, protein:6, carbs:1, fat:5},
      {name:'Fromage frais Lactel 0%', quantity:'60g', calories:53, protein:5.2, carbs:2.6, fat:2.1},
      {name:'Cacao en poudre', quantity:'10g', calories:25, protein:1, carbs:3.5, fat:0.8},
      {name:'Beurre de cacahuète', quantity:'5g', calories:30, protein:1.25, carbs:1, fat:2.5}
    ],
    steps: [
      'Mixer avoine en farine, mélanger tous les ingrédients dans un mug.',
      'Bien mélanger jusqu\'à pâte homogène — ajouter 30ml d\'eau si trop épais.',
      'Micro-ondes 90 secondes puissance maximale.',
      'Laisser reposer 1 minute — continue de cuire après le micro-ondes.',
      'Vérifier cuisson : centre légèrement moelleux = parfait.'
    ],
    substitutions: [
      {original:'Cacao', alternative:'Cannelle + pomme pour version apple crumble'},
      {original:'Fromage frais', alternative:'Yaourt grec 0% même quantité'},
      {original:'Beurre cacahuète', alternative:'Banane 30g écrasée pour sucrant naturel'}
    ],
    coach_note: '3 minutes de préparation. Exactement le temps d\'attendre l\'envie de commander quelque chose. Toujours avoir ces ingrédients chez toi.'
  },

  {
    title: 'Truffes Datte Beurre de Cacahuète',
    category: 'Desserts',
    meal_type: 'snack',
    goal_tag: 'muscle',
    craving_tag: 'sucré',
    prep_time: 10,
    difficulty: 1,
    total_calories: 184,
    total_protein: 7,
    total_carbs: 22,
    total_fat: 9,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#0a0800,#4a2800)',
    membership_required: 'cookbook',
    ingredients: [
      {name:'Dattes Medjool', quantity:'60g (4 dattes)', calories:165, protein:1.1, carbs:44.7, fat:0.2},
      {name:'Beurre de cacahuète', quantity:'20g', calories:120, protein:5, carbs:4, fat:10},
      {name:'Flocons d\'avoine', quantity:'20g', calories:76, protein:2.6, carbs:12, fat:1.4},
      {name:'Cacao en poudre', quantity:'10g', calories:25, protein:1, carbs:3.5, fat:0.8},
      {name:'Noix de coco râpée', quantity:'10g', calories:35, protein:0.3, carbs:1.5, fat:3.5}
    ],
    steps: [
      'Dénoyauter les dattes et mixer avec beurre de cacahuète.',
      'Incorporer avoine et cacao, mélanger jusqu\'à pâte compacte.',
      'Former des boules de 20g avec les mains légèrement humides.',
      'Rouler dans la noix de coco râpée ou cacao.',
      'Réfrigérer 30 minutes pour raffermir. Conservation 1 semaine frigo.'
    ],
    substitutions: [
      {original:'Dattes Medjool', alternative:'Dattes ordinaires trempées 10 min eau chaude'},
      {original:'Beurre de cacahuète', alternative:'Tahini 20g pour version orientale'},
      {original:'Avoine', alternative:'Son d\'avoine pour version plus fibreuse'}
    ],
    coach_note: 'L\'énergie du Ramadan encapsulée dans une bouchée. Dattes + beurre de cacahuète = satiété garantie 2h. Idéal pré-entraînement naturel.'
  },

  // ════════════════════════════════════════════
  // 🗺 EATING OUT GUIDES (5)
  // ════════════════════════════════════════════
  {
    title: 'Manger au Restaurant Algérien — Le Guide',
    category: 'Eating Out',
    meal_type: 'guide',
    goal_tag: 'all',
    craving_tag: 'guide',
    prep_time: 0,
    difficulty: 1,
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#0a0a1a,#1a1a3a)',
    membership_required: 'cookbook',
    ingredients: [],
    steps: [
      'ENTRÉES : Chorba = 120-180kcal. Salade méchouia = 80kcal. Évite les bricks frits (200kcal chacune).',
      'PLATS : Couscous poulet = 550-700kcal selon portion. Grillades seules = 300-400kcal. Demand sauce à part.',
      'GLUCIDES : Couscous petit = 200kcal. Riz = 200kcal. Évite le pain offert à table (200kcal invisible).',
      'PROTÉINES : Toujours demander plus de viande, moins de légumes en sauce. Grillé > en sauce.',
      'BOISSONS : Eau plate = 0. Jus de fruits = 150-200kcal invisible. Soda = à éviter.'
    ],
    substitutions: [],
    coach_note: 'Au restaurant tu ne contrôles pas les ingrédients — tu contrôles les choix et les portions. Mange lentement, arrête à 80% de satiété. La grille de lecture compte plus que la perfection.'
  },

  {
    title: 'Fast Food Algérie — Les Meilleurs Choix',
    category: 'Eating Out',
    meal_type: 'guide',
    goal_tag: 'fat_loss',
    craving_tag: 'guide',
    prep_time: 0,
    difficulty: 1,
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#1a0000,#3a0000)',
    membership_required: 'cookbook',
    ingredients: [],
    steps: [
      'PIZZA : 1 part = 250-320kcal. Maximum 2 parts. Évite les pizzas farcies (+150kcal).',
      'BURGER : Choisir poulet grillé > poulet frit > bœuf. Supprimer les frites, remplacer salade.',
      'SHAWARMA : Poulet = 400-500kcal. Agneau = 600-700kcal. Demander sauce à part, moitié quantité.',
      'SANDWICH : Pain seul = 200-250kcal. Thon/poulet > kefta. Pas de sauce mayo.',
      'RÈGLE D\'OR : Commander en premier dans le groupe — tu résistes moins aux commandes des autres si tu as déjà choisi.'
    ],
    substitutions: [],
    coach_note: 'Le fast food ne ruine pas un programme — la fréquence et les choix le font. Une fois par semaine, bons choix = zéro problème. La vie sociale fait partie du programme.'
  },

  {
    title: 'Mariage et Fête — Survivre Sans Ruiner',
    category: 'Eating Out',
    meal_type: 'guide',
    goal_tag: 'all',
    craving_tag: 'guide',
    prep_time: 0,
    difficulty: 1,
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#1a1000,#C8A415)',
    membership_required: 'cookbook',
    ingredients: [],
    steps: [
      'AVANT : Mange une protéine + légumes 1h avant d\'y aller. Tu seras moins affamé à table.',
      'PENDANT : Viande grillée en priorité. Couscous en petite quantité. Évite chaque plat en sauce.',
      'LES PIÈGES : Gâteaux traditionnels = 80-150kcal chacun. Pas plus de 2. Bourek = 200kcal pièce.',
      'ALCOOL : Verre de bière = 150kcal, vin = 120kcal, cocktail = 200-300kcal. Eau entre chaque verre.',
      'LENDEMAIN : Retour normal au programme. Une fête ne défait pas 3 semaines de travail — sauf si tu la prolonges 3 jours.'
    ],
    substitutions: [],
    coach_note: 'Les fêtes algériennes sont des tests de volonté sociale, pas nutritionnelle. Personne ne remarque que tu manges peu — tout le monde est concentré sur sa propre assiette.'
  },

  {
    title: 'Ramadan — Manger Intelligent en Ieûne',
    category: 'Eating Out',
    meal_type: 'guide',
    goal_tag: 'all',
    craving_tag: 'guide',
    prep_time: 0,
    difficulty: 1,
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    featured: true,
    photo_gradient: 'linear-gradient(135deg,#0a0010,#1a0030)',
    membership_required: 'all',
    ingredients: [],
    steps: [
      'F\'TOR : Dattes 2-3 (150kcal) + eau + chorba légère (150kcal). STOP. Attends 20 min avant le reste.',
      'PLAT PRINCIPAL F\'TOR : Protéine + légumes + petite portion glucides. Évite la friture (bricks, bourek frit).',
      'HYDRATATION : 2L entre F\'tor et Shour. Pas de jus sucrés — eau plate + citron.',
      'SHOUR : Repas le plus important. Avoine + protéine = satiété maximale pendant le jeûne.',
      'ENTRAÎNEMENT : 1-2h avant F\'tor (meilleure énergie) ou 2h après F\'tor (plein de carburant).'
    ],
    substitutions: [],
    coach_note: 'Ramadan est une opportunité de recomposition. Le jeûne intermittent naturel + les bons choix = résultats accélérés. Beaucoup de mes meilleurs transformations ont lieu en Ramadan.'
  },

  {
    title: 'Café et Pâtisserie — Les Vrais Chiffres',
    category: 'Eating Out',
    meal_type: 'guide',
    goal_tag: 'fat_loss',
    craving_tag: 'guide',
    prep_time: 0,
    difficulty: 1,
    total_calories: 0,
    total_protein: 0,
    total_carbs: 0,
    total_fat: 0,
    featured: false,
    photo_gradient: 'linear-gradient(135deg,#0a0800,#3a2800)',
    membership_required: 'cookbook',
    ingredients: [],
    steps: [
      'CAFÉ : Espresso = 5kcal. Café au lait = 60-80kcal. Cappuccino = 100-120kcal. Café sucré +15kcal par sucre.',
      'PÂTISSERIES ALGÉRIENNES : Makroud = 120-140kcal. Baklawa = 100-120kcal pièce. Dziriyat = 80kcal. Chrik = 200kcal.',
      'GLACES : Boule standard = 100-150kcal. Coupe 2 boules = 250-350kcal avec sauce.',
      'CRÊPES : Simple beurre sucre = 200kcal. Nutella = 350kcal. Savoureuse = 250-280kcal.',
      'RÈGLE : 1 douceur = acceptable. C\'est la 2e et 3e qui font la différence annuelle.'
    ],
    substitutions: [],
    coach_note: 'Connaître les chiffres n\'est pas une obsession — c\'est une liberté. Quand tu sais que 1 makroud = 130kcal, tu peux décider en connaissance de cause. Sans culpabilité ni ignorance.'
  }
];

// ── SEED ─────────────────────────────────────────────────────────
async function main(){
  console.log(`\n🍳  Coach Sammy Kitchen — Seeding ${RECIPES.length} recipes\n`);

  // Delete existing
  const del = await q('DELETE','cookbook_recipes?id=neq.00000000-0000-0000-0000-000000000000');
  if(del.ok||del.status===204) console.log('🗑  Cleared existing recipes\n');

  let inserted = 0;
  // Insert in batches of 10
  for(let i=0;i<RECIPES.length;i+=10){
    const batch = RECIPES.slice(i,i+10);
    const ins = await q('POST','cookbook_recipes',batch);
    if(!ins.ok){
      console.error(`❌  Batch ${i/10+1} failed (${ins.status}):`,JSON.stringify(ins.data?.message||ins.data));
    } else {
      const rows = Array.isArray(ins.data)?ins.data:[];
      rows.forEach(r=>console.log(`  ✅  ${r.title}`));
      inserted+=rows.length;
    }
  }

  console.log(`\n🎉  Done — ${inserted}/${RECIPES.length} recipes seeded.\n`);
  console.log(`Categories:`);
  const cats = {};
  RECIPES.forEach(r=>{cats[r.category]=(cats[r.category]||0)+1;});
  Object.entries(cats).forEach(([c,n])=>console.log(`  ${c}: ${n} recipes`));
}

main().catch(err=>{console.error('Fatal:',err);process.exit(1);});
