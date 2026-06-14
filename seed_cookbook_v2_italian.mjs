// seed_cookbook_v2_italian.mjs
// Cookbook v2 — Batch 1: Italian cuisine (25 recipes)
// Run with: node seed_cookbook_v2_italian.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
// ⚠️ Replace SUPABASE_KEY with your SERVICE_ROLE key (NOT anon)
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [
  {
    title: 'Spaghetti Carbonara Authentique',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 2,
    total_calories: 580,
    total_protein: 32,
    total_carbs: 65,
    total_fat: 22,
    ingredients: [
      { name: 'Spaghetti', qty: '100g' },
      { name: 'Œufs', qty: '2 jaunes + 1 entier' },
      { name: 'Viande hachée fumée (kalbass)', qty: '50g' },
      { name: 'Parmesan râpé', qty: '40g' },
      { name: 'Poivre noir', qty: 'au goût' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Cuis les spaghetti dans l\'eau salée selon le paquet (al dente).',
      'Pendant ce temps, fais revenir la viande fumée dans une poêle à sec jusqu\'à doré.',
      'Dans un bol, fouette les œufs avec le parmesan et beaucoup de poivre noir.',
      'Égoutte les pâtes en gardant 1 verre d\'eau de cuisson.',
      'Hors du feu, mélange les pâtes avec la viande, puis verse les œufs en remuant rapidement. Ajoute un peu d\'eau de cuisson si trop sec.',
      'Sers immédiatement avec plus de parmesan et poivre.'
    ],
    substitutions: [
      { from: 'Viande fumée', to: 'Dinde fumée tranchée' },
      { from: 'Parmesan', to: 'Gruyère râpé' }
    ],
    coach_note: 'Pas de crème dans la vraie carbonara. Le secret c\'est de retirer du feu avant d\'ajouter les œufs sinon ils cuisent et tu obtiens des œufs brouillés.',
    photo_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#f4d35e,#ee964b)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pizza Margherita Maison',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 2,
    total_calories: 620,
    total_protein: 26,
    total_carbs: 78,
    total_fat: 22,
    ingredients: [
      { name: 'Farine type 00', qty: '250g' },
      { name: 'Eau tiède', qty: '160ml' },
      { name: 'Levure boulangère', qty: '5g' },
      { name: 'Sel', qty: '5g' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Sauce tomate concassée', qty: '100g' },
      { name: 'Mozzarella', qty: '125g' },
      { name: 'Basilic frais', qty: '6 feuilles' }
    ],
    steps: [
      'Mélange farine, levure et sel. Ajoute l\'eau tiède et l\'huile. Pétris 10 min.',
      'Laisse reposer 1h dans un endroit chaud (la pâte doit doubler).',
      'Préchauffe le four à 250°C max avec une plaque dedans.',
      'Étale la pâte fine sur du papier cuisson.',
      'Étale la sauce tomate, ajoute la mozzarella déchirée.',
      'Enfourne 8-10 min jusqu\'à ce que la croûte dore. Ajoute le basilic à la sortie.'
    ],
    substitutions: [
      { from: 'Mozzarella', to: 'Fromage râpé classique' },
      { from: 'Basilic frais', to: 'Origan séché' }
    ],
    coach_note: 'Le four doit être brûlant. 250°C minimum. Si ton four monte plus haut, encore mieux.',
    photo_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#f1faee)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Lasagnes Bolognaises',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 75,
    difficulty: 3,
    total_calories: 680,
    total_protein: 42,
    total_carbs: 58,
    total_fat: 28,
    ingredients: [
      { name: 'Plaques de lasagnes', qty: '250g' },
      { name: 'Viande hachée 5%', qty: '500g' },
      { name: 'Sauce tomate', qty: '500g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Carotte', qty: '1' },
      { name: 'Lait', qty: '500ml' },
      { name: 'Beurre', qty: '30g' },
      { name: 'Farine', qty: '30g' },
      { name: 'Fromage râpé', qty: '100g' }
    ],
    steps: [
      'Fais revenir oignon, ail, carotte hachés dans un peu d\'huile.',
      'Ajoute la viande, fais cuire jusqu\'à doré.',
      'Verse la sauce tomate, sale, poivre. Laisse mijoter 30 min à feu doux.',
      'Pour la béchamel : fais fondre le beurre, ajoute la farine, mélange 1 min. Verse le lait petit à petit en fouettant. Sale, muscade.',
      'Dans un plat, alterne : sauce → lasagnes → béchamel → fromage. Répète 3-4 fois.',
      'Finis par béchamel + fromage. Cuis 30 min à 180°C.'
    ],
    substitutions: [
      { from: 'Lait entier', to: 'Lait demi-écrémé pour moins de calories' }
    ],
    coach_note: 'Tu peux préparer la veille — les lasagnes sont meilleures réchauffées le lendemain.',
    photo_url: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc4749,#f2e8cf)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Risotto aux Champignons',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 35,
    difficulty: 2,
    total_calories: 480,
    total_protein: 14,
    total_carbs: 72,
    total_fat: 14,
    ingredients: [
      { name: 'Riz arborio (ou riz rond)', qty: '180g' },
      { name: 'Champignons de Paris', qty: '300g' },
      { name: 'Bouillon de volaille', qty: '700ml' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Parmesan', qty: '40g' },
      { name: 'Beurre', qty: '20g' },
      { name: 'Persil frais', qty: '1 c.à.s' }
    ],
    steps: [
      'Fais revenir les champignons émincés dans une poêle chaude jusqu\'à dorés. Réserve.',
      'Dans la même poêle, fais suer l\'oignon et l\'ail hachés.',
      'Ajoute le riz, mélange 1 min pour le nacrer.',
      'Verse le bouillon une louche à la fois en remuant constamment. Attends qu\'il soit absorbé avant la suivante.',
      'Après 18-20 min, le riz doit être crémeux. Ajoute champignons, parmesan, beurre.',
      'Mélange vigoureusement, parsème de persil et sers.'
    ],
    substitutions: [
      { from: 'Riz arborio', to: 'Riz rond classique' }
    ],
    coach_note: 'Le risotto demande de la patience — remue souvent et ajoute le bouillon petit à petit. C\'est ça qui donne le crémeux.',
    photo_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#a98467,#dde5b6)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pasta Aglio e Olio',
    category: 'quick_meals',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 420,
    total_protein: 12,
    total_carbs: 68,
    total_fat: 12,
    ingredients: [
      { name: 'Spaghetti', qty: '100g' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Piment rouge sec', qty: '1 pincée' },
      { name: 'Persil frais', qty: '2 c.à.s' },
      { name: 'Parmesan', qty: '20g' }
    ],
    steps: [
      'Cuis les pâtes dans l\'eau bien salée selon le paquet.',
      'Pendant ce temps, fais chauffer l\'huile à feu doux avec l\'ail tranché fin et le piment.',
      'L\'ail doit dorer doucement sans brûler — 4-5 min.',
      'Égoutte les pâtes en gardant un peu d\'eau de cuisson.',
      'Verse les pâtes dans la poêle d\'huile aillée. Ajoute 2-3 c.à.s d\'eau de cuisson.',
      'Mélange, parsème de persil et parmesan, sers immédiatement.'
    ],
    substitutions: [
      { from: 'Piment sec', to: 'Harissa douce' }
    ],
    coach_note: 'Recette de 15 min, parfaite quand tu rentres tard du gym. L\'ail ne doit JAMAIS brûler — sinon c\'est amer.',
    photo_url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#ffd60a,#003566)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poulet Parmigiana',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 40,
    difficulty: 2,
    total_calories: 650,
    total_protein: 55,
    total_carbs: 35,
    total_fat: 28,
    ingredients: [
      { name: 'Escalopes de poulet', qty: '250g' },
      { name: 'Chapelure', qty: '60g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Farine', qty: '30g' },
      { name: 'Sauce tomate', qty: '200g' },
      { name: 'Mozzarella', qty: '100g' },
      { name: 'Parmesan', qty: '20g' },
      { name: 'Origan', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' }
    ],
    steps: [
      'Aplatis les escalopes au rouleau. Sale, poivre.',
      'Passe-les dans la farine, puis l\'œuf battu, puis la chapelure.',
      'Fais dorer dans l\'huile chaude 3 min par côté.',
      'Dépose dans un plat. Couvre de sauce tomate, mozzarella, parmesan, origan.',
      'Enfourne à 200°C pendant 15 min jusqu\'à ce que le fromage soit fondu et doré.',
      'Sers chaud avec une salade verte.'
    ],
    substitutions: [
      { from: 'Mozzarella', to: 'Fromage râpé' }
    ],
    coach_note: 'Parfait après une grosse séance. 55g de protéines pour reconstruire.',
    photo_url: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#d62828,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bruschetta Tomate Basilic',
    category: 'snacks',
    cuisine: 'italian',
    meal_type: 'snack',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 220,
    total_protein: 6,
    total_carbs: 30,
    total_fat: 9,
    ingredients: [
      { name: 'Pain de campagne', qty: '2 tranches' },
      { name: 'Tomates mûres', qty: '2' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Basilic frais', qty: '6 feuilles' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Coupe les tomates en petits dés, mélange avec basilic ciselé, huile, sel et poivre.',
      'Laisse mariner 5 min.',
      'Toaste les tranches de pain.',
      'Frotte chaque tranche encore chaude avec la gousse d\'ail coupée en deux.',
      'Garnis de tomates et sers immédiatement.'
    ],
    substitutions: [
      { from: 'Pain de campagne', to: 'Baguette' }
    ],
    coach_note: 'Snack rapide et frais, parfait avant un repas léger.',
    photo_url: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#a8dadc)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Penne Arrabiata',
    category: 'quick_meals',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'spicy',
    prep_time: 20,
    difficulty: 1,
    total_calories: 460,
    total_protein: 14,
    total_carbs: 72,
    total_fat: 12,
    ingredients: [
      { name: 'Penne', qty: '100g' },
      { name: 'Sauce tomate', qty: '200g' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Piment rouge frais ou sec', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Parmesan', qty: '20g' }
    ],
    steps: [
      'Cuis les penne dans l\'eau salée.',
      'Pendant ce temps, fais revenir l\'ail haché et le piment dans l\'huile à feu moyen.',
      'Ajoute la sauce tomate, sale, laisse mijoter 8 min.',
      'Égoutte les pâtes, mélange dans la sauce.',
      'Parsème de persil et parmesan.'
    ],
    substitutions: [
      { from: 'Piment frais', to: 'Harissa' }
    ],
    coach_note: 'Pour ceux qui aiment ça relevé. Le piment booste légèrement le métabolisme.',
    photo_url: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#d62828,#f77f00)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Tiramisu Léger Protéiné',
    category: 'desserts',
    cuisine: 'italian',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 20,
    difficulty: 1,
    total_calories: 290,
    total_protein: 22,
    total_carbs: 28,
    total_fat: 10,
    ingredients: [
      { name: 'Fromage blanc 0%', qty: '250g' },
      { name: 'Whey vanille', qty: '30g' },
      { name: 'Boudoirs (biscuits cuiller)', qty: '60g' },
      { name: 'Café fort', qty: '150ml' },
      { name: 'Cacao non sucré', qty: '1 c.à.s' },
      { name: 'Édulcorant', qty: 'au goût' }
    ],
    steps: [
      'Mélange le fromage blanc avec la whey et l\'édulcorant.',
      'Trempe rapidement les boudoirs dans le café tiède.',
      'Alterne dans un verre : couche de boudoirs → crème → boudoirs → crème.',
      'Saupoudre de cacao.',
      'Réfrigère minimum 2h avant de manger.'
    ],
    substitutions: [
      { from: 'Whey', to: 'Plus de fromage blanc + miel' }
    ],
    coach_note: 'Mon tiramisu version cut. 22g de protéines pour un dessert qui satisfait sans culpabilité.',
    photo_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f4518,#fefae0)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Minestrone Légumes',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 40,
    difficulty: 1,
    total_calories: 320,
    total_protein: 16,
    total_carbs: 48,
    total_fat: 6,
    ingredients: [
      { name: 'Haricots blancs cuits', qty: '150g' },
      { name: 'Carottes', qty: '2' },
      { name: 'Courgettes', qty: '1' },
      { name: 'Céleri', qty: '2 branches' },
      { name: 'Oignon', qty: '1' },
      { name: 'Tomates pelées', qty: '400g' },
      { name: 'Petites pâtes', qty: '60g' },
      { name: 'Bouillon de légumes', qty: '1L' },
      { name: 'Parmesan', qty: '20g' }
    ],
    steps: [
      'Coupe tous les légumes en petits dés.',
      'Fais revenir l\'oignon dans un peu d\'huile, ajoute les carottes et le céleri.',
      'Ajoute les tomates, le bouillon, sale et poivre. Mijote 20 min.',
      'Ajoute les courgettes et les haricots. Cuis 10 min.',
      'Ajoute les pâtes, cuis encore 8 min.',
      'Sers avec parmesan râpé sur le dessus.'
    ],
    substitutions: [
      { from: 'Haricots blancs', to: 'Pois chiches ou lentilles' }
    ],
    coach_note: 'Soupe complète : protéines (haricots), glucides (pâtes), fibres (légumes). Top pour la cut.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Caprese',
    category: 'salads',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 5,
    difficulty: 1,
    total_calories: 280,
    total_protein: 16,
    total_carbs: 8,
    total_fat: 21,
    ingredients: [
      { name: 'Tomates mûres', qty: '2 grosses' },
      { name: 'Mozzarella di bufala', qty: '125g' },
      { name: 'Basilic frais', qty: '10 feuilles' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Vinaigre balsamique', qty: '1 c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Coupe les tomates et la mozzarella en tranches épaisses.',
      'Dispose en alternance sur une assiette : tomate, mozzarella, basilic.',
      'Arrose d\'huile d\'olive et de balsamique.',
      'Sale, poivre. Sers immédiatement.'
    ],
    substitutions: [
      { from: 'Mozzarella di bufala', to: 'Mozzarella classique' }
    ],
    coach_note: 'Le secret c\'est la qualité — tomates mûres, mozzarella fraîche, basilic odorant. Simple = parfait.',
    photo_url: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#e63946,#06a77d)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Gnocchi à la Sauge',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 2,
    total_calories: 520,
    total_protein: 14,
    total_carbs: 78,
    total_fat: 18,
    ingredients: [
      { name: 'Pommes de terre', qty: '500g' },
      { name: 'Farine', qty: '150g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Beurre', qty: '30g' },
      { name: 'Sauge fraîche', qty: '8 feuilles' },
      { name: 'Parmesan', qty: '30g' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Cuis les pommes de terre entières avec la peau 25 min. Épluche-les chaudes et écrase-les.',
      'Mélange avec la farine, l\'œuf et le sel. Forme une pâte souple.',
      'Forme des boudins, coupe en petits cubes, marque-les avec une fourchette.',
      'Plonge-les dans l\'eau bouillante salée. Ils sont prêts quand ils remontent (2-3 min).',
      'Dans une poêle, fais fondre le beurre avec la sauge.',
      'Égoutte les gnocchis, mélange dans la poêle, parsème de parmesan.'
    ],
    substitutions: [
      { from: 'Sauge', to: 'Romarin ou thym' }
    ],
    coach_note: 'Les gnocchis maison c\'est un tout autre niveau. Plus dense en calories — parfait pour journée training.',
    photo_url: 'https://images.unsplash.com/photo-1633436374961-09b92742047b?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Calzone au Poulet',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 590,
    total_protein: 38,
    total_carbs: 62,
    total_fat: 20,
    ingredients: [
      { name: 'Pâte à pizza', qty: '200g' },
      { name: 'Blanc de poulet', qty: '150g' },
      { name: 'Sauce tomate', qty: '80g' },
      { name: 'Mozzarella', qty: '80g' },
      { name: 'Champignons', qty: '50g' },
      { name: 'Origan', qty: '1 c.à.c' },
      { name: 'Œuf battu pour dorer', qty: '1' }
    ],
    steps: [
      'Cuis le poulet en dés, assaisonne sel, poivre, origan.',
      'Étale la pâte en cercle. Sur une moitié, mets sauce, poulet, mozzarella, champignons.',
      'Rabats l\'autre moitié, scelle bien les bords en pinçant.',
      'Badigeonne d\'œuf battu pour dorer.',
      'Enfourne 20 min à 220°C.',
      'Sers avec une salade verte.'
    ],
    substitutions: [
      { from: 'Poulet', to: 'Viande hachée maigre' }
    ],
    coach_note: 'Le calzone c\'est la pizza pliée. Idéal en prise de masse — 38g de protéines.',
    photo_url: 'https://images.unsplash.com/photo-1654375108445-d96a5cfa6e4e?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Spaghetti Bolognaise Light',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 1,
    total_calories: 520,
    total_protein: 38,
    total_carbs: 62,
    total_fat: 14,
    ingredients: [
      { name: 'Spaghetti complets', qty: '80g' },
      { name: 'Viande hachée 5% MG', qty: '150g' },
      { name: 'Sauce tomate', qty: '200g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Carotte', qty: '1' },
      { name: 'Céleri', qty: '1 branche' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Origan', qty: '1 c.à.c' },
      { name: 'Parmesan', qty: '15g' }
    ],
    steps: [
      'Hache finement oignon, carotte, céleri, ail.',
      'Fais revenir dans un peu d\'huile 5 min.',
      'Ajoute la viande, fais cuire jusqu\'à doré.',
      'Verse la sauce tomate, origan, sel, poivre. Mijote 25 min à feu doux.',
      'Cuis les spaghetti al dente.',
      'Mélange, parsème de parmesan.'
    ],
    substitutions: [
      { from: 'Spaghetti complets', to: 'Spaghetti normaux' }
    ],
    coach_note: 'Version light avec viande maigre + pâtes complètes. Tu peux en manger souvent.',
    photo_url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc4749,#f2e8cf)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Focaccia Romarin',
    category: 'breakfast',
    cuisine: 'italian',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 80,
    difficulty: 2,
    total_calories: 380,
    total_protein: 9,
    total_carbs: 58,
    total_fat: 12,
    ingredients: [
      { name: 'Farine', qty: '250g' },
      { name: 'Eau tiède', qty: '180ml' },
      { name: 'Levure', qty: '5g' },
      { name: 'Sel', qty: '5g' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Romarin frais', qty: '2 brins' },
      { name: 'Fleur de sel', qty: '1 pincée' }
    ],
    steps: [
      'Mélange farine, levure, sel, eau, 2 c.à.s d\'huile. Pétris 10 min.',
      'Laisse lever 1h.',
      'Étale dans un plat huilé. Fais des creux avec tes doigts.',
      'Arrose d\'huile, parsème de romarin et fleur de sel.',
      'Laisse repousser 20 min, puis enfourne à 220°C pendant 18 min.'
    ],
    substitutions: [
      { from: 'Romarin', to: 'Thym ou origan' }
    ],
    coach_note: 'La focaccia c\'est le pain idéal pour accompagner ton petit déjeuner ou snack. Garde 1-2 jours.',
    photo_url: 'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#606c38)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Saltimbocca de Poulet',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'protein',
    prep_time: 20,
    difficulty: 2,
    total_calories: 420,
    total_protein: 52,
    total_carbs: 4,
    total_fat: 18,
    ingredients: [
      { name: 'Escalopes de poulet fines', qty: '250g' },
      { name: 'Dinde fumée tranchée', qty: '50g' },
      { name: 'Sauge fraîche', qty: '6 feuilles' },
      { name: 'Beurre', qty: '20g' },
      { name: 'Bouillon de volaille', qty: '100ml' },
      { name: 'Farine', qty: '20g' }
    ],
    steps: [
      'Pose une tranche de dinde fumée et une feuille de sauge sur chaque escalope. Fixe avec un cure-dent.',
      'Farine légèrement le côté poulet.',
      'Fais dorer côté farine dans le beurre, 3 min.',
      'Retourne, cuis 2 min.',
      'Déglace au bouillon. Laisse réduire 2 min pour avoir une sauce.',
      'Sers immédiatement, nappé de sauce.'
    ],
    substitutions: [
      { from: 'Sauge', to: 'Romarin' }
    ],
    coach_note: 'Plat classique romain. 52g de protéines, parfait soir de training.',
    photo_url: 'https://images.unsplash.com/photo-1604908554007-fdca4f4b1de1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Panini Mozzarella Tomate',
    category: 'quick_meals',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 8,
    difficulty: 1,
    total_calories: 450,
    total_protein: 22,
    total_carbs: 48,
    total_fat: 20,
    ingredients: [
      { name: 'Pain ciabatta', qty: '1 pain' },
      { name: 'Mozzarella', qty: '80g' },
      { name: 'Tomate', qty: '1' },
      { name: 'Basilic', qty: '4 feuilles' },
      { name: 'Huile d\'olive', qty: '1 c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Ouvre le ciabatta en deux.',
      'Garnis de mozzarella en tranches, tomate, basilic, sel, poivre, filet d\'huile.',
      'Referme. Fais griller dans un grille-panini ou poêle avec couvercle.',
      'Quand le fromage est fondu et le pain doré, c\'est prêt.'
    ],
    substitutions: [
      { from: 'Ciabatta', to: 'Baguette' }
    ],
    coach_note: 'Le panini italien original. Rien à voir avec ce qu\'on mange dans les fast food.',
    photo_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#e63946)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Osso Buco de Veau',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 120,
    difficulty: 3,
    total_calories: 580,
    total_protein: 52,
    total_carbs: 18,
    total_fat: 28,
    ingredients: [
      { name: 'Jarret de veau (osso buco)', qty: '2 tranches' },
      { name: 'Oignon', qty: '1' },
      { name: 'Carotte', qty: '1' },
      { name: 'Céleri', qty: '1 branche' },
      { name: 'Tomates pelées', qty: '400g' },
      { name: 'Bouillon de bœuf', qty: '300ml' },
      { name: 'Farine', qty: '30g' },
      { name: 'Zeste de citron', qty: '1 c.à.c' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Ail', qty: '2 gousses' }
    ],
    steps: [
      'Farine légèrement les tranches de veau. Fais-les dorer dans l\'huile chaude.',
      'Réserve. Fais revenir oignon, carotte, céleri hachés.',
      'Remets le veau, ajoute les tomates et le bouillon.',
      'Couvre et laisse mijoter 1h30 à feu très doux.',
      'À la fin, mélange zeste de citron, ail haché et persil. Saupoudre sur le plat.',
      'Sers avec un risotto à la milanaise ou de la polenta.'
    ],
    substitutions: [
      { from: 'Jarret de veau', to: 'Jarret de bœuf' }
    ],
    coach_note: 'Plat du dimanche en famille. Long mais simple. La viande tombe de l\'os.',
    photo_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bb9457)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Aubergines Parmigiana',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 480,
    total_protein: 22,
    total_carbs: 32,
    total_fat: 30,
    ingredients: [
      { name: 'Aubergines', qty: '2 grosses' },
      { name: 'Sauce tomate', qty: '400g' },
      { name: 'Mozzarella', qty: '150g' },
      { name: 'Parmesan', qty: '50g' },
      { name: 'Basilic', qty: '10 feuilles' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Ail', qty: '2 gousses' }
    ],
    steps: [
      'Tranche les aubergines en rondelles de 1cm. Sale-les et laisse dégorger 30 min, sèche-les.',
      'Fais-les griller à la poêle avec un peu d\'huile, 3 min par côté.',
      'Dans un plat, étale sauce tomate, aubergines, mozzarella, parmesan, basilic. Répète.',
      'Termine par parmesan. Enfourne 25 min à 180°C.',
      'Laisse reposer 10 min avant de servir.'
    ],
    substitutions: [
      { from: 'Mozzarella', to: 'Fromage râpé' }
    ],
    coach_note: 'Version végétarienne riche en goût. L\'aubergine absorbe la sauce et devient fondante.',
    photo_url: 'https://images.unsplash.com/photo-1625944525533-473e1e6cc4b9?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6a040f,#9d4edd)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pasta al Pesto',
    category: 'quick_meals',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'fresh',
    prep_time: 15,
    difficulty: 1,
    total_calories: 510,
    total_protein: 16,
    total_carbs: 65,
    total_fat: 22,
    ingredients: [
      { name: 'Pâtes (trofie ou penne)', qty: '100g' },
      { name: 'Basilic frais', qty: '50g' },
      { name: 'Pignons de pin', qty: '20g' },
      { name: 'Parmesan', qty: '30g' },
      { name: 'Ail', qty: '1 gousse' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Sel', qty: 'au goût' }
    ],
    steps: [
      'Cuis les pâtes al dente.',
      'Pendant ce temps, mixe basilic, pignons, parmesan, ail, huile et sel pour faire le pesto.',
      'Égoutte les pâtes, garde un peu d\'eau de cuisson.',
      'Mélange le pesto avec les pâtes et une c.à.s d\'eau de cuisson.',
      'Sers immédiatement avec du parmesan en plus.'
    ],
    substitutions: [
      { from: 'Pignons', to: 'Amandes ou noix' }
    ],
    coach_note: 'Le pesto frais c\'est incomparable. Tu peux faire un gros bocal et le garder 1 semaine au frigo (couvert d\'huile).',
    photo_url: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#a3b18a)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Polpette in Sugo (Boulettes Sauce Tomate)',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 2,
    total_calories: 540,
    total_protein: 42,
    total_carbs: 28,
    total_fat: 28,
    ingredients: [
      { name: 'Viande hachée bœuf', qty: '200g' },
      { name: 'Chapelure', qty: '30g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Parmesan', qty: '30g' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Sauce tomate', qty: '400g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Origan', qty: '1 c.à.c' }
    ],
    steps: [
      'Mélange viande, chapelure, œuf, parmesan, persil, ail haché, sel, poivre.',
      'Forme des boulettes de la taille d\'une balle de golf.',
      'Fais-les dorer dans une poêle avec un peu d\'huile.',
      'Réserve. Fais revenir oignon haché, ajoute sauce tomate et origan.',
      'Remets les boulettes dans la sauce, mijote 20 min.',
      'Sers avec du pain ou des pâtes.'
    ],
    substitutions: [
      { from: 'Bœuf', to: 'Mélange bœuf-veau ou agneau' }
    ],
    coach_note: 'Les boulettes c\'est ce que ma mama nous faisait. 42g de protéines. Réchauffe encore meilleur le lendemain.',
    photo_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Pizza Bianca au Thon',
    category: 'main_meals',
    cuisine: 'italian',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 2,
    total_calories: 560,
    total_protein: 38,
    total_carbs: 60,
    total_fat: 18,
    ingredients: [
      { name: 'Pâte à pizza', qty: '200g' },
      { name: 'Thon à l\'huile égoutté', qty: '120g' },
      { name: 'Mozzarella', qty: '80g' },
      { name: 'Oignon rouge', qty: '½' },
      { name: 'Câpres', qty: '1 c.à.s' },
      { name: 'Olives noires', qty: '40g' },
      { name: 'Origan', qty: '1 c.à.c' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' }
    ],
    steps: [
      'Étale la pâte sur du papier cuisson.',
      'Badigeonne d\'huile (pas de sauce tomate, c\'est une pizza blanche).',
      'Garnis de mozzarella, thon, oignon, câpres, olives.',
      'Saupoudre d\'origan.',
      'Enfourne à 250°C pendant 10 min.'
    ],
    substitutions: [
      { from: 'Thon', to: 'Sardines' }
    ],
    coach_note: 'Pizza protéinée — 38g de protéines avec le thon. Sans sauce tomate c\'est encore plus léger.',
    photo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#283618)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Panna Cotta Légère aux Fruits Rouges',
    category: 'desserts',
    cuisine: 'italian',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 15,
    difficulty: 1,
    total_calories: 220,
    total_protein: 7,
    total_carbs: 22,
    total_fat: 12,
    ingredients: [
      { name: 'Crème liquide légère', qty: '200ml' },
      { name: 'Lait', qty: '100ml' },
      { name: 'Gélatine en feuilles', qty: '3 feuilles' },
      { name: 'Vanille', qty: '1 c.à.c extrait' },
      { name: 'Édulcorant ou sucre', qty: '2 c.à.s' },
      { name: 'Fruits rouges (fraises, mûres)', qty: '150g' }
    ],
    steps: [
      'Trempe la gélatine dans l\'eau froide 5 min.',
      'Chauffe la crème + lait + vanille + sucre sans bouillir.',
      'Hors du feu, ajoute la gélatine essorée. Mélange bien.',
      'Verse dans des verrines. Réfrigère 4h minimum.',
      'Au moment de servir, garnis de fruits rouges écrasés.'
    ],
    substitutions: [
      { from: 'Crème', to: 'Crème végétale (amande)' }
    ],
    coach_note: 'Dessert italien classique en version allégée. Tu peux préparer la veille.',
    photo_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fffacd,#ff6b6b)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Insalata Mista Italiana',
    category: 'salads',
    cuisine: 'italian',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 10,
    difficulty: 1,
    total_calories: 320,
    total_protein: 18,
    total_carbs: 16,
    total_fat: 22,
    ingredients: [
      { name: 'Roquette', qty: '50g' },
      { name: 'Tomates cerises', qty: '150g' },
      { name: 'Mozzarella billes', qty: '80g' },
      { name: 'Olives noires', qty: '40g' },
      { name: 'Concombre', qty: '½' },
      { name: 'Oignon rouge', qty: '¼' },
      { name: 'Huile d\'olive', qty: '1 c.à.s' },
      { name: 'Vinaigre balsamique', qty: '1 c.à.c' }
    ],
    steps: [
      'Dans un grand saladier, mélange roquette, tomates coupées en deux, mozzarella, olives, concombre tranché, oignon rouge émincé.',
      'Arrose d\'huile et balsamique.',
      'Sale, poivre. Mélange et sers.'
    ],
    substitutions: [
      { from: 'Roquette', to: 'Mâche ou jeunes pousses' }
    ],
    coach_note: 'Salade complète qui te tient au corps. Légère mais nourrissante.',
    photo_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#e63946)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Cannoli Légers à la Ricotta',
    category: 'desserts',
    cuisine: 'italian',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 20,
    difficulty: 2,
    total_calories: 280,
    total_protein: 14,
    total_carbs: 28,
    total_fat: 12,
    ingredients: [
      { name: 'Coques de cannoli (ou crêpes croustillantes)', qty: '4' },
      { name: 'Ricotta', qty: '200g' },
      { name: 'Sucre glace', qty: '30g' },
      { name: 'Pépites de chocolat noir', qty: '20g' },
      { name: 'Zeste d\'orange', qty: '1 c.à.c' },
      { name: 'Cannelle', qty: '1 pincée' }
    ],
    steps: [
      'Mélange ricotta, sucre glace, zeste, cannelle. Réfrigère.',
      'Ajoute les pépites de chocolat au mélange.',
      'Garnis les coques de cannoli juste avant de servir (sinon ça ramollit).',
      'Saupoudre de sucre glace.'
    ],
    substitutions: [
      { from: 'Ricotta', to: 'Fromage blanc épais' }
    ],
    coach_note: 'Dessert sicilien classique. Si tu trouves pas les coques, tu peux les remplacer par des crêpes roulées et passées 5 min au four.',
    photo_url: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  }
]

console.log(`Seeding ${recipes.length} Italian recipes...`)

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
