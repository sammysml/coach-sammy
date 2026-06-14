// seed_cookbook_v2_african.mjs
// Cookbook v2 — Batch 8 (FINAL): African non-Algerian cuisine (25 recipes)
// Marocain, Tunisien, Égyptien, Sénégalais, Ivoirien, Éthiopien, Malagasy
// Run with: node seed_cookbook_v2_african.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [
  // ═══════════════════════════════
  // MAROCAIN (6)
  // ═══════════════════════════════
  {
    title: 'Tajine Poulet aux Olives et Citron Confit',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 2,
    total_calories: 520,
    total_protein: 44,
    total_carbs: 18,
    total_fat: 30,
    ingredients: [
      { name: 'Poulet entier découpé', qty: '1 (1.2kg)' },
      { name: 'Oignons', qty: '2' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Citron confit', qty: '½' },
      { name: 'Olives vertes', qty: '80g' },
      { name: 'Gingembre frais', qty: '1 c.à.s' },
      { name: 'Curcuma', qty: '1 c.à.c' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Coriandre fraîche', qty: '½ bouquet' },
      { name: 'Persil frais', qty: '½ bouquet' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Safran', qty: '1 pincée' }
    ],
    steps: [
      'Marine le poulet avec ail râpé, gingembre, curcuma, cumin, safran, huile, sel, poivre.',
      'Dans un tajine ou cocotte, fais revenir les oignons émincés 5 min.',
      'Ajoute le poulet, fais dorer toutes les faces.',
      'Ajoute un verre d\'eau, couvre.',
      'Mijote 45 min à feu doux.',
      'Ajoute olives et citron confit coupé en lamelles. Cuis encore 15 min.',
      'Parsème de coriandre et persil. Sers avec du pain marocain ou couscous.'
    ],
    substitutions: [
      { from: 'Citron confit', to: 'Zeste de citron + jus + 1 c.à.c sel' }
    ],
    coach_note: 'Le tajine marocain est plus parfumé que l\'algérien. Le citron confit apporte une note acidulée unique.',
    photo_url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Pastilla au Poulet (B\'stilla)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 3,
    total_calories: 580,
    total_protein: 36,
    total_carbs: 52,
    total_fat: 28,
    ingredients: [
      { name: 'Blanc de poulet', qty: '300g' },
      { name: 'Feuilles de brick ou filo', qty: '12' },
      { name: 'Oignons', qty: '2' },
      { name: 'Œufs', qty: '3' },
      { name: 'Amandes effilées', qty: '80g' },
      { name: 'Sucre glace', qty: '30g' },
      { name: 'Cannelle', qty: '1 c.à.c' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Safran', qty: '1 pincée' },
      { name: 'Beurre fondu', qty: '60g' }
    ],
    steps: [
      'Fais mijoter le poulet avec oignons, safran, gingembre, herbes, sel 30 min. Effiloche.',
      'Ajoute les œufs battus dans le jus réduit. Brouille pour lier.',
      'Fais dorer les amandes, mélange avec sucre glace + cannelle.',
      'Dans un moule beurré : 6 feuilles brick beurrées en rosace.',
      'Couche : amandes sucrées, puis poulet-œuf.',
      'Referme avec les 6 autres feuilles, beurre.',
      'Enfourne 25 min à 190°C.',
      'À la sortie : sucre glace + cannelle par-dessus.'
    ],
    substitutions: [
      { from: 'Feuilles de brick', to: 'Pâte filo' }
    ],
    coach_note: 'La pastilla marocaine — le mélange sucré-salé-amande est déroutant mais inoubliable.',
    photo_url: 'https://images.unsplash.com/photo-1606851181064-32afd5c34d4a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Harira Marocaine',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 320,
    total_protein: 18,
    total_carbs: 48,
    total_fat: 8,
    ingredients: [
      { name: 'Pois chiches cuits', qty: '150g' },
      { name: 'Lentilles vertes', qty: '80g' },
      { name: 'Viande d\'agneau en petits dés', qty: '100g' },
      { name: 'Tomates concassées', qty: '300g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Céleri', qty: '2 branches' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Concentré de tomate', qty: '2 c.à.s' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Curcuma', qty: '1 c.à.c' },
      { name: 'Cannelle', qty: '½ c.à.c' },
      { name: 'Coriandre, persil frais', qty: '1 bouquet' },
      { name: 'Jus de citron', qty: '1' },
      { name: 'Vermicelles', qty: '40g' }
    ],
    steps: [
      'Fais revenir oignon + céleri + ail + viande 5 min.',
      'Ajoute tomates + concentré + épices. Mélange.',
      'Ajoute lentilles, 1.5L d\'eau. Mijote 30 min.',
      'Ajoute pois chiches et vermicelles. Cuis 10 min.',
      'Termine par jus de citron, coriandre, persil.',
      'Sers avec des dattes et des chebakia (tradition ramadan).'
    ],
    substitutions: [
      { from: 'Agneau', to: 'Bœuf ou poulet' }
    ],
    coach_note: 'La harira marocaine — différente de la nôtre. Plus d\'épices, plus de citron, et les vermicelles en font un plat complet.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Couscous Marocain Royal',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 2,
    total_calories: 680,
    total_protein: 42,
    total_carbs: 82,
    total_fat: 18,
    ingredients: [
      { name: 'Semoule de couscous', qty: '300g' },
      { name: 'Épaule d\'agneau en morceaux', qty: '300g' },
      { name: 'Merguez de bœuf', qty: '4' },
      { name: 'Carottes', qty: '3' },
      { name: 'Navets', qty: '2' },
      { name: 'Courgettes', qty: '2' },
      { name: 'Pois chiches', qty: '150g' },
      { name: 'Tomates concassées', qty: '200g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ras el hanout', qty: '2 c.à.s' },
      { name: 'Harissa', qty: '1 c.à.s' },
      { name: 'Beurre', qty: '30g' }
    ],
    steps: [
      'Fais revenir oignon et agneau, ajoute ras el hanout.',
      'Ajoute tomates, carottes, navets, pois chiches. Couvre d\'eau. Mijote 45 min.',
      'Ajoute courgettes et merguez les 15 dernières minutes.',
      'Cuis le couscous : verse bouillon chaud dessus, couvre 5 min, égrène avec beurre.',
      'Sers couscous dans un plat, viandes et légumes au centre, bouillon à part.'
    ],
    substitutions: [
      { from: 'Merguez', to: 'Kefta de bœuf ou brochettes' }
    ],
    coach_note: 'Le couscous marocain "royal" a les merguez en plus. Festif et généreux.',
    photo_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Zaalouk (Caviar d\'Aubergine Marocain)',
    category: 'snacks',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 40,
    difficulty: 1,
    total_calories: 180,
    total_protein: 4,
    total_carbs: 18,
    total_fat: 10,
    ingredients: [
      { name: 'Aubergines', qty: '2' },
      { name: 'Tomates', qty: '3' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Coriandre fraîche', qty: '½ bouquet' },
      { name: 'Persil', qty: '½ bouquet' },
      { name: 'Citron', qty: '½' }
    ],
    steps: [
      'Cuis les aubergines entières au four 40 min à 200°C. Laisse refroidir, pèle, hache la chair.',
      'Pèle les tomates (plonge dans l\'eau bouillante 30 sec), hache-les.',
      'Dans une poêle, fais revenir ail haché, tomates, épices 10 min.',
      'Ajoute la chair d\'aubergine. Mélange, mash, cuis encore 10 min à sec.',
      'Ajoute herbes, jus de citron, huile.',
      'Sers à température ambiante avec du pain.'
    ],
    substitutions: [],
    coach_note: 'La cousine marocaine de notre chermoula. Plus cuite, plus concentrée.',
    photo_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Briouates au Poulet (Triangles Frits)',
    category: 'snacks',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 50,
    difficulty: 2,
    total_calories: 280,
    total_protein: 16,
    total_carbs: 28,
    total_fat: 12,
    ingredients: [
      { name: 'Feuilles de brick', qty: '10' },
      { name: 'Blanc de poulet', qty: '200g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Champignons', qty: '80g' },
      { name: 'Fromage fondu', qty: '40g' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' },
      { name: 'Gingembre', qty: '½ c.à.c' },
      { name: 'Cumin', qty: '½ c.à.c' },
      { name: 'Huile de cuisson', qty: '2 c.à.s' }
    ],
    steps: [
      'Cuis le poulet en petits dés avec oignon, champignons, épices, coriandre.',
      'Laisse refroidir. Ajoute le fromage fondu coupé en dés.',
      'Coupe les feuilles de brick en bandes.',
      'Pose la farce en bas, plie en triangle ascendant.',
      'Scelle avec blanc d\'œuf.',
      'Fais dorer à la poêle avec peu d\'huile ou enfourne 15 min à 200°C.'
    ],
    substitutions: [],
    coach_note: 'Briouates marocaines — nos boureks en version triangulaire. La garniture au fromage fondu c\'est notre touche.',
    photo_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════
  // TUNISIEN (4)
  // ═══════════════════════════════
  {
    title: 'Lablabi (Soupe Pois Chiches Tunisienne)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 380,
    total_protein: 18,
    total_carbs: 52,
    total_fat: 12,
    ingredients: [
      { name: 'Pois chiches cuits', qty: '300g' },
      { name: 'Bouillon', qty: '600ml' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Harissa', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Œufs', qty: '2' },
      { name: 'Pain rassis (baguette)', qty: '2 tranches' },
      { name: 'Câpres', qty: '1 c.à.s' },
      { name: 'Thon (facultatif)', qty: '60g' }
    ],
    steps: [
      'Chauffe le bouillon avec ail haché, cumin, harissa.',
      'Ajoute les pois chiches, mijote 10 min.',
      'Fais des œufs pochés (dans l\'eau bouillante + vinaigre, 3 min).',
      'Dans des bols : pain rassis brisé, verse le bouillon brûlant.',
      'Ajoute œuf poché, câpres, thon, jus de citron, filet d\'huile.'
    ],
    substitutions: [
      { from: 'Thon', to: 'Rien (facultatif)' }
    ],
    coach_note: 'Street food tunisien. Soupe populaire reconstituante, servie à toute heure.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Brik à l\'Œuf Tunisien',
    category: 'snacks',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 280,
    total_protein: 14,
    total_carbs: 22,
    total_fat: 16,
    ingredients: [
      { name: 'Feuilles de brick', qty: '2' },
      { name: 'Œufs', qty: '2' },
      { name: 'Thon en boîte égoutté', qty: '60g' },
      { name: 'Câpres', qty: '1 c.à.c' },
      { name: 'Oignon vert haché', qty: '1 c.à.s' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Harissa', qty: '½ c.à.c' },
      { name: 'Huile pour frire', qty: '3 c.à.s' }
    ],
    steps: [
      'Mélange thon, câpres, oignon, persil, harissa.',
      'Pose une feuille de brick à plat. Au centre, mets la farce avec un creux.',
      'Casse un œuf dans le creux.',
      'Plie la feuille en demi-lune, scelle les bords.',
      'Fais frire dans l\'huile chaude 1 min par côté — le jaune doit rester coulant.',
      'Sers avec quartier de citron.'
    ],
    substitutions: [],
    coach_note: 'Le brik tunisien — il faut manger ça en une bouchée pour que le jaune d\'œuf coule. Rituel.',
    photo_url: 'https://images.unsplash.com/photo-1625938145744-e380515399b7?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Shakshuka Tunisienne',
    category: 'breakfast',
    cuisine: 'african',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'spicy',
    prep_time: 25,
    difficulty: 1,
    total_calories: 320,
    total_protein: 18,
    total_carbs: 22,
    total_fat: 18,
    ingredients: [
      { name: 'Œufs', qty: '4' },
      { name: 'Poivrons rouge et vert', qty: '1 de chaque' },
      { name: 'Tomates mûres', qty: '4' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Harissa', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Paprika', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Coriandre fraîche', qty: '2 c.à.s' }
    ],
    steps: [
      'Fais revenir oignon haché dans l\'huile.',
      'Ajoute poivrons en dés, puis ail, harissa, épices.',
      'Ajoute tomates concassées, mijote 15 min jusqu\'à sauce épaisse.',
      'Fais 4 creux dans la sauce, casse un œuf dans chaque.',
      'Couvre, cuis 5 min — le blanc cuit mais le jaune reste coulant.',
      'Parsème de coriandre. Sers avec pain pita.'
    ],
    substitutions: [
      { from: 'Harissa', to: 'Piment doux pour moins relevé' }
    ],
    coach_note: 'Shakshuka version tunisienne avec harissa — plus relevée que la version israélienne. 18g protéines.',
    photo_url: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Mechouia (Salade de Légumes Grillés)',
    category: 'salads',
    cuisine: 'african',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 30,
    difficulty: 1,
    total_calories: 220,
    total_protein: 8,
    total_carbs: 18,
    total_fat: 12,
    ingredients: [
      { name: 'Poivrons rouge et vert', qty: '2 de chaque' },
      { name: 'Tomates', qty: '3' },
      { name: 'Piments verts doux', qty: '3' },
      { name: 'Ail', qty: '4 gousses (entiers)' },
      { name: 'Thon en boîte', qty: '80g' },
      { name: 'Câpres', qty: '1 c.à.s' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Citron', qty: '1' },
      { name: 'Cumin', qty: '½ c.à.c' }
    ],
    steps: [
      'Grille au four (gril) ou directement sur la flamme : poivrons, tomates, piments, ail.',
      'Laisse noircir la peau, mets dans un sac plastique 10 min pour transpirer.',
      'Pèle tout. Hache en petits morceaux (ne pas mixer).',
      'Mélange avec huile, citron, cumin, sel.',
      'Ajoute thon et câpres par-dessus.',
      'Sers à température ambiante.'
    ],
    substitutions: [],
    coach_note: 'Salade tunisienne de légumes grillés. La cuisson sur flamme directe donne un goût fumé incomparable.',
    photo_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#588157)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════
  // ÉGYPTIEN (4)
  // ═══════════════════════════════
  {
    title: 'Kushari (Plat National Égyptien)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'lunch',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 2,
    total_calories: 580,
    total_protein: 20,
    total_carbs: 98,
    total_fat: 12,
    ingredients: [
      { name: 'Riz', qty: '150g' },
      { name: 'Lentilles vertes', qty: '100g' },
      { name: 'Pâtes coudes (macaroni)', qty: '100g' },
      { name: 'Oignons', qty: '2' },
      { name: 'Tomates concassées', qty: '300g' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Vinaigre', qty: '2 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Coriandre poudre', qty: '1 c.à.c' },
      { name: 'Piment doux', qty: '½ c.à.c' },
      { name: 'Huile végétale', qty: '4 c.à.s' }
    ],
    steps: [
      'Cuis riz, lentilles et pâtes séparément.',
      'Émince les oignons finement, fais-les frire dans l\'huile jusqu\'à brun croustillant. Égoutter.',
      'Sauce tomate : fais revenir ail, ajoute tomates, vinaigre, épices. Mijote 15 min.',
      'Dans un bol ou assiette creuse : riz, lentilles, pâtes mélangés.',
      'Nappe de sauce tomate.',
      'Oignons frits croustillants par-dessus.',
      'Sers avec piment supplémentaire et vinaigre à part.'
    ],
    substitutions: [],
    coach_note: 'Le kushari est LE plat national égyptien. Street food qui nourrit tout Le Caire pour quelques centimes.',
    photo_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Ful Medames (Fèves Égyptiennes)',
    category: 'breakfast',
    cuisine: 'african',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 320,
    total_protein: 18,
    total_carbs: 48,
    total_fat: 8,
    ingredients: [
      { name: 'Fèves cuites (en boîte)', qty: '400g' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Jus de citron', qty: '2 c.à.s' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Persil haché', qty: '2 c.à.s' },
      { name: 'Tomate', qty: '1' },
      { name: 'Piment vert (facultatif)', qty: '1' },
      { name: 'Œufs durs (facultatif)', qty: '2' }
    ],
    steps: [
      'Égoutte et rince les fèves. Mets dans une casserole avec un peu d\'eau.',
      'Chauffe 5 min, ajoute ail râpé.',
      'Écrase grossièrement à la fourchette — laisse des morceaux.',
      'Ajoute jus de citron, cumin, sel, huile d\'olive.',
      'Sers avec tomate en dés, persil, piment, et œufs durs.'
    ],
    substitutions: [
      { from: 'Fèves', to: 'Haricots blancs (plus facile à trouver)' }
    ],
    coach_note: 'Petit-déj égyptien servi depuis des millénaires. 18g de protéines végétales, économique.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Feteer Meshaltet (Feuilleté Égyptien)',
    category: 'breakfast',
    cuisine: 'african',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 60,
    difficulty: 2,
    total_calories: 380,
    total_protein: 8,
    total_carbs: 52,
    total_fat: 16,
    ingredients: [
      { name: 'Farine', qty: '300g' },
      { name: 'Eau tiède', qty: '150ml' },
      { name: 'Sel', qty: '5g' },
      { name: 'Beurre clarifié (ghee) ou beurre', qty: '100g' },
      { name: 'Huile végétale', qty: '2 c.à.s' },
      { name: 'Miel', qty: '4 c.à.s' },
      { name: 'Fromage blanc (pour garnir)', qty: '100g' }
    ],
    steps: [
      'Mélange farine, sel, eau + huile. Pétris 10 min. Repose 30 min.',
      'Étale très finement (aussi fin que possible).',
      'Badigeonne de beurre. Replie en rectangle.',
      'Répète : étale, beurre, replie. 3-4 fois.',
      'Pose dans un plat, enfourne 25 min à 200°C.',
      'Sers chaud avec miel + fromage blanc.'
    ],
    substitutions: [
      { from: 'Ghee', to: 'Beurre fondu' }
    ],
    coach_note: 'Pain feuilleté égyptien au beurre. Petit-déj du Nil — croustillant dehors, fondant dedans.',
    photo_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Om Ali (Bread Pudding Égyptien)',
    category: 'desserts',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 1,
    total_calories: 380,
    total_protein: 10,
    total_carbs: 48,
    total_fat: 18,
    ingredients: [
      { name: 'Croissants rassis ou pain feuilleté', qty: '3' },
      { name: 'Lait entier', qty: '500ml' },
      { name: 'Crème liquide', qty: '200ml' },
      { name: 'Sucre', qty: '60g' },
      { name: 'Noix concassées', qty: '40g' },
      { name: 'Raisins secs', qty: '30g' },
      { name: 'Noix de coco râpée', qty: '20g' },
      { name: 'Pistaches', qty: '20g' },
      { name: 'Vanille', qty: '1 c.à.c' }
    ],
    steps: [
      'Brise les croissants en morceaux dans un plat à four.',
      'Parsème de noix, raisins, coco, pistaches.',
      'Chauffe lait + crème + sucre + vanille jusqu\'à frémissement.',
      'Verse sur le pain.',
      'Laisse imprégner 5 min.',
      'Enfourne 20 min à 180°C jusqu\'à doré et bullant.',
      'Sers chaud.'
    ],
    substitutions: [
      { from: 'Croissants', to: 'Pain de mie brioché rassis' }
    ],
    coach_note: 'Dessert égyptien populaire — pain perdu de luxe. Utilise tes croissants qui deviennent rassis.',
    photo_url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════
  // SÉNÉGALAIS (4)
  // ═══════════════════════════════
  {
    title: 'Thiéboudienne (Riz au Poisson Sénégalais)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 3,
    total_calories: 620,
    total_protein: 42,
    total_carbs: 72,
    total_fat: 18,
    ingredients: [
      { name: 'Filets de poisson ferme (thon, mérou)', qty: '400g' },
      { name: 'Riz brisé (ou riz ordinaire)', qty: '300g' },
      { name: 'Tomates concassées', qty: '300g' },
      { name: 'Oignon', qty: '2' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Concentré de tomate', qty: '2 c.à.s' },
      { name: 'Carottes', qty: '2' },
      { name: 'Aubergine', qty: '½' },
      { name: 'Piment (facultatif)', qty: '1' },
      { name: 'Coriandre, persil', qty: '1 bouquet' },
      { name: 'Huile végétale', qty: '4 c.à.s' },
      { name: 'Bouillon de poisson', qty: '600ml' }
    ],
    steps: [
      'Farcis les poissons d\'un mélange ail-coriandre-piment.',
      'Fais dorer dans l\'huile. Réserve.',
      'Fais revenir oignons hachés, concentré, tomates 10 min.',
      'Ajoute bouillon, carottes, aubergine. Mijote 20 min.',
      'Sors les légumes. Mets le poisson dans le bouillon 10 min. Sors le poisson.',
      'Verse le riz dans le bouillon, cuis à absorption 25 min.',
      'Sers : riz dans le plat, poisson + légumes par-dessus.'
    ],
    substitutions: [
      { from: 'Riz brisé', to: 'Riz ordinaire' }
    ],
    coach_note: 'Thiébou dienne — LE plat national du Sénégal. Inscription au patrimoine mondial de l\'UNESCO.',
    photo_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#588157)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Yassa Poulet',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 60,
    difficulty: 2,
    total_calories: 480,
    total_protein: 46,
    total_carbs: 28,
    total_fat: 18,
    ingredients: [
      { name: 'Cuisses de poulet', qty: '4 morceaux' },
      { name: 'Oignons', qty: '4 gros' },
      { name: 'Citrons', qty: '3' },
      { name: 'Moutarde', qty: '2 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Piment vert (facultatif)', qty: '1' },
      { name: 'Huile végétale', qty: '3 c.à.s' },
      { name: 'Bouillon', qty: '200ml' },
      { name: 'Olives vertes (facultatif)', qty: '40g' }
    ],
    steps: [
      'Marine le poulet avec jus de 2 citrons, moutarde, ail haché, sel, poivre. 1h minimum.',
      'Grille le poulet mariné à la poêle ou au four 15 min. Réserve.',
      'Dans la même poêle, fais revenir les oignons émincés très longuement — 20 min — jusqu\'à confits.',
      'Ajoute la marinade, le bouillon, piment, olives.',
      'Remets le poulet. Mijote 20 min.',
      'Sers avec du riz blanc.'
    ],
    substitutions: [],
    coach_note: 'Le yassa — marinade citron-moutarde-oignon. Acidulé, parfumé, 46g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1604908554007-fdca4f4b1de1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Mafé (Ragoût à la Pâte d\'Arachide)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 75,
    difficulty: 2,
    total_calories: 620,
    total_protein: 38,
    total_carbs: 32,
    total_fat: 38,
    ingredients: [
      { name: 'Épaule d\'agneau ou poulet', qty: '400g' },
      { name: 'Beurre de cacahuète nature', qty: '4 c.à.s' },
      { name: 'Tomates concassées', qty: '300g' },
      { name: 'Oignons', qty: '2' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Carottes', qty: '2' },
      { name: 'Patate douce', qty: '1' },
      { name: 'Bouillon', qty: '500ml' },
      { name: 'Piment vert', qty: '1' },
      { name: 'Concentré de tomate', qty: '2 c.à.s' }
    ],
    steps: [
      'Fais dorer la viande en morceaux. Réserve.',
      'Fais revenir oignons, ail. Ajoute tomates + concentré. Cuis 5 min.',
      'Délaye le beurre de cacahuète dans un peu de bouillon chaud. Verse.',
      'Ajoute le reste du bouillon, carottes, patate douce en morceaux, piment.',
      'Remets la viande.',
      'Mijote 45 min à feu doux en remuant régulièrement.',
      'Sers avec riz blanc.'
    ],
    substitutions: [
      { from: 'Beurre de cacahuète', to: 'Pâte de sésame (tahini) — goût différent mais fonctionne' }
    ],
    coach_note: 'Le mafé — plat d\'Afrique de l\'Ouest avec la sauce arachide. Riche, réconfortant, unique.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#588157)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Accara (Beignets de Niébé Sénégalais)',
    category: 'snacks',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 2,
    total_calories: 280,
    total_protein: 14,
    total_carbs: 32,
    total_fat: 12,
    ingredients: [
      { name: 'Haricots blancs ou cornille (niébé) trempés', qty: '200g' },
      { name: 'Oignon', qty: '½' },
      { name: 'Piment vert', qty: '½' },
      { name: 'Sel', qty: '1 c.à.c' },
      { name: 'Huile pour friture', qty: '500ml' }
    ],
    steps: [
      'Trempe les haricots 4h, frotte-les pour enlever les peaux. Rince.',
      'Mixe haricots avec oignon, piment, sel et un tout petit peu d\'eau — pâte épaisse.',
      'Fouette vigoureusement 5 min pour aérer (incorpore de l\'air).',
      'Fais chauffer l\'huile. Forme des petites boules à la cuillère.',
      'Fais frire 3-4 min jusqu\'à doré.',
      'Égoutter sur papier absorbant.',
      'Sers avec sauce piquante ou tamarin.'
    ],
    substitutions: [
      { from: 'Cornille (niébé)', to: 'Haricots blancs classiques' }
    ],
    coach_note: 'Street food sénégalais du matin. Beignets légers à l\'intérieur, croustillants dehors.',
    photo_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════
  // ÉTHIOPIEN (3)
  // ═══════════════════════════════
  {
    title: 'Injera au Doro Wat (Poulet Éthiopien)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'spicy',
    prep_time: 60,
    difficulty: 2,
    total_calories: 540,
    total_protein: 42,
    total_carbs: 48,
    total_fat: 20,
    ingredients: [
      { name: 'Cuisses de poulet', qty: '4 morceaux' },
      { name: 'Oignons', qty: '3' },
      { name: 'Beurre', qty: '50g' },
      { name: 'Berbere (mélange : paprika + cumin + coriandre + piment + cannelle)', qty: '3 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Gingembre', qty: '1 c.à.s' },
      { name: 'Tomates', qty: '2' },
      { name: 'Œufs durs', qty: '4' },
      { name: 'Galettes (injera : crêpes teff ou blé)', qty: '4' }
    ],
    steps: [
      'Hache finement les oignons, fais-les cuire À SEC dans une poêle 10 min — technique éthiopienne.',
      'Ajoute beurre, berbere, ail, gingembre. Cuis 5 min.',
      'Ajoute poulet et tomates concassées.',
      'Couvre d\'eau, mijote 35 min.',
      'Ajoute les œufs durs entiers les 5 dernières minutes.',
      'Sers sur les galettes — on mange avec les doigts, en déchirant la galette.'
    ],
    substitutions: [
      { from: 'Berbere', to: '1 c.à.s paprika + ½ c.à.c piment + cumin + coriandre + cannelle' }
    ],
    coach_note: 'Doro wat — le plat national éthiopien. La technique "oignon à sec" crée un fond de sauce profond.',
    photo_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Misir Wat (Lentilles Éthiopiennes)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 1,
    total_calories: 320,
    total_protein: 16,
    total_carbs: 48,
    total_fat: 8,
    ingredients: [
      { name: 'Lentilles corail', qty: '200g' },
      { name: 'Oignon', qty: '2' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Gingembre', qty: '1 c.à.c' },
      { name: 'Berbere (ou paprika+piment+cumin)', qty: '2 c.à.s' },
      { name: 'Concentré de tomate', qty: '1 c.à.s' },
      { name: 'Beurre ou huile', qty: '2 c.à.s' }
    ],
    steps: [
      'Cuis oignons hachés À SEC dans la poêle 8 min (technique éthiopienne).',
      'Ajoute beurre, ail, gingembre, berbere. Cuis 3 min.',
      'Ajoute concentré + lentilles rincées + 400ml eau.',
      'Mijote 25 min en remuant souvent.',
      'Les lentilles doivent être fondues et épaisses.',
      'Sers sur injera ou avec riz.'
    ],
    substitutions: [],
    coach_note: 'Plat végétarien éthiopien. 16g de protéines végétales pour 320 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Fitfit (Salade Éthiopienne au Pain)',
    category: 'breakfast',
    cuisine: 'african',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 320,
    total_protein: 10,
    total_carbs: 48,
    total_fat: 12,
    ingredients: [
      { name: 'Pain pita ou galette rassis', qty: '2' },
      { name: 'Berbere (ou paprika+piment+cumin)', qty: '1 c.à.s' },
      { name: 'Beurre clarifié', qty: '2 c.à.s' },
      { name: 'Oignon rouge haché', qty: '¼' },
      { name: 'Tomate', qty: '1' },
      { name: 'Jus de citron', qty: '1 c.à.s' },
      { name: 'Coriandre', qty: '1 c.à.s' }
    ],
    steps: [
      'Brise le pain en morceaux dans un bol.',
      'Fais fondre le beurre avec berbere.',
      'Verse sur le pain, mélange pour imprégner.',
      'Ajoute oignon, tomate en dés, citron, coriandre.',
      'Mélange. Sers immédiatement.'
    ],
    substitutions: [],
    coach_note: 'Petit-déj éthiopien du matin. Pain, beurre épicé, légumes frais. Simple et savoureux.',
    photo_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },

  // ═══════════════════════════════
  // IVOIRIEN / AFRICAIN WEST (4)
  // ═══════════════════════════════
  {
    title: 'Aloko (Bananes Plantains Frites)',
    category: 'snacks',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 320,
    total_protein: 3,
    total_carbs: 52,
    total_fat: 12,
    ingredients: [
      { name: 'Bananes plantains mûres (peau noire)', qty: '2' },
      { name: 'Huile végétale', qty: '400ml' },
      { name: 'Sel', qty: 'au goût' },
      { name: 'Piment en poudre (facultatif)', qty: '½ c.à.c' }
    ],
    steps: [
      'Pèle les plantains, coupe en rondelles biais de 1.5cm.',
      'Chauffe l\'huile à 170°C.',
      'Fais frire les rondelles 4-5 min jusqu\'à dorées.',
      'Égoutter sur papier absorbant.',
      'Sale, piment.',
      'Sers chaud comme snack ou accompagnement.'
    ],
    substitutions: [
      { from: 'Banane plantain', to: 'Banane normale (plus sucrée, différente)' }
    ],
    coach_note: 'Snack Côte d\'Ivoire incontournable. La banane plantain mûre est naturellement sucrée et fondante.',
    photo_url: 'https://images.unsplash.com/photo-1571197119282-7c4e2c2d8f4b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poulet Braisé Africain',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 50,
    difficulty: 2,
    total_calories: 420,
    total_protein: 48,
    total_carbs: 12,
    total_fat: 20,
    ingredients: [
      { name: 'Cuisses de poulet', qty: '4' },
      { name: 'Oignons', qty: '2' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Gingembre frais', qty: '1 c.à.s' },
      { name: 'Piment vert', qty: '1' },
      { name: 'Tomates', qty: '2' },
      { name: 'Citron', qty: '1' },
      { name: 'Paprika fumé', qty: '1 c.à.s' },
      { name: 'Cumin', qty: '1 c.à.c' },
      { name: 'Huile végétale', qty: '2 c.à.s' },
      { name: 'Bouillon de cube', qty: '1' }
    ],
    steps: [
      'Mixe oignons, ail, gingembre, piment, citron, épices en marinade.',
      'Fais des entailles dans le poulet, marine 30 min.',
      'Chauffe une poêle, fais griller le poulet 5 min par côté jusqu\'à bien coloré.',
      'Ajoute tomates concassées et bouillon.',
      'Couvre, laisse mijoter 25 min.',
      'Découverts les 5 dernières minutes pour réduire la sauce.',
      'Sers avec riz, attiéké ou plantains.'
    ],
    substitutions: [],
    coach_note: 'Poulet braisé style Afrique de l\'Ouest — marinade parfumée, cuisson lente. 48g protéines.',
    photo_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Kedjenou de Poulet (Côte d\'Ivoire)',
    category: 'main_meals',
    cuisine: 'african',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 70,
    difficulty: 1,
    total_calories: 460,
    total_protein: 44,
    total_carbs: 16,
    total_fat: 24,
    ingredients: [
      { name: 'Poulet découpé', qty: '1 (1.2kg)' },
      { name: 'Tomates', qty: '3' },
      { name: 'Poivrons verts', qty: '2' },
      { name: 'Oignons', qty: '2' },
      { name: 'Aubergine', qty: '½' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Gingembre', qty: '1 c.à.s' },
      { name: 'Piment végétarien (ou doux)', qty: '1' },
      { name: 'Thym', qty: '1 c.à.c' },
      { name: 'Laurier', qty: '2 feuilles' }
    ],
    steps: [
      'Coupe tous les légumes grossièrement.',
      'Dans une cocotte hermétique : dispose le poulet et tous les légumes, ail, gingembre, thym, laurier, sel.',
      'PAS D\'EAU, PAS D\'HUILE — les légumes créent le jus.',
      'Ferme hermétiquement.',
      'Cuis au four 1h à 200°C (ou sur le feu à 140°C pendant 1h).',
      'Secoue la cocotte toutes les 15 min sans ouvrir.',
      'Sers avec riz ou attiéké (semoule de manioc).'
    ],
    substitutions: [],
    coach_note: 'Kedjenou = "ça remue" en Baoulé. Plat ivoirien cuit dans son jus, sans ajout de liquide. Saveur concentrée.',
    photo_url: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Thiakry (Dessert Sénégalais au Couscous)',
    category: 'desserts',
    cuisine: 'african',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 20,
    difficulty: 1,
    total_calories: 280,
    total_protein: 8,
    total_carbs: 42,
    total_fat: 8,
    ingredients: [
      { name: 'Couscous fin ou mil', qty: '100g' },
      { name: 'Yaourt nature', qty: '200g' },
      { name: 'Lait concentré sucré', qty: '3 c.à.s' },
      { name: 'Sucre', qty: '2 c.à.s' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Raisins secs', qty: '20g' },
      { name: 'Noix de coco râpée', qty: '1 c.à.s' }
    ],
    steps: [
      'Cuis le couscous (verse eau bouillante, couvre 5 min, égrène).',
      'Laisse refroidir complètement.',
      'Mélange yaourt + lait concentré + sucre + vanille.',
      'Incorpore le couscous froid dans la crème yaourt.',
      'Ajoute raisins secs et coco.',
      'Réfrigère 1h.',
      'Sers bien frais.'
    ],
    substitutions: [
      { from: 'Lait concentré sucré', to: 'Miel + crème fraîche' }
    ],
    coach_note: 'Dessert sénégalais léger et frais. Le couscous dans le yaourt c\'est surprenant mais très bon.',
    photo_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  }
]

console.log(`Seeding ${recipes.length} African (non-Algerian) recipes...`)

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
console.log('\n🎉 COOKBOOK V2 COMPLETE — All 200 recipes across 8 cuisines are done.')
console.log('Italian ✓ | Asian ✓ | Tex-Mex ✓ | Mediterranean ✓ | Indian ✓ | American ✓ | French ✓ | African ✓')
