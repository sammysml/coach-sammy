// seed_cookbook_v2_french.mjs
// Cookbook v2 — Batch 7: French classics (25 recipes)
// Run with: node seed_cookbook_v2_french.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://korektlpnwuefsagfuvq.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'PASTE_SERVICE_ROLE_HERE'

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

const recipes = [
  {
    title: 'Quiche Lorraine (Version Halal)',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 520,
    total_protein: 24,
    total_carbs: 38,
    total_fat: 30,
    ingredients: [
      { name: 'Pâte brisée', qty: '1 (250g)' },
      { name: 'Dinde fumée en lardons', qty: '150g' },
      { name: 'Œufs', qty: '4' },
      { name: 'Crème liquide', qty: '200ml' },
      { name: 'Lait', qty: '100ml' },
      { name: 'Gruyère râpé', qty: '80g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Muscade', qty: '1 pincée' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Étale la pâte dans un moule, pique avec une fourchette.',
      'Précuis 10 min à 180°C (à blanc).',
      'Fais revenir oignon haché et dinde fumée à la poêle 5 min.',
      'Bats œufs + crème + lait + muscade + sel + poivre.',
      'Garnis la pâte avec oignon-dinde, verse l\'appareil, ajoute le gruyère.',
      'Enfourne 35 min à 180°C jusqu\'à doré et pris.',
      'Laisse tiédir 10 min avant de couper.'
    ],
    substitutions: [
      { from: 'Lardons fumés (haram)', to: 'Dinde fumée en allumettes (notre version)' }
    ],
    coach_note: 'Version halal de la quiche lorraine. Notre dinde fumée locale (kalbass) fait des merveilles.',
    photo_url: 'https://images.unsplash.com/photo-1591985666643-1ecc67616216?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#dda15e)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Blanquette de Veau',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 120,
    difficulty: 3,
    total_calories: 620,
    total_protein: 48,
    total_carbs: 18,
    total_fat: 38,
    ingredients: [
      { name: 'Veau à blanquette (épaule)', qty: '400g' },
      { name: 'Carottes', qty: '3' },
      { name: 'Poireau', qty: '1' },
      { name: 'Oignon', qty: '1 piqué de 2 clous de girofle' },
      { name: 'Champignons de Paris', qty: '200g' },
      { name: 'Bouquet garni (thym, laurier, persil)', qty: '1' },
      { name: 'Beurre', qty: '40g' },
      { name: 'Farine', qty: '30g' },
      { name: 'Crème fraîche', qty: '150ml' },
      { name: 'Jaunes d\'œufs', qty: '2' },
      { name: 'Jus de citron', qty: '1 c.à.s' }
    ],
    steps: [
      'Mets le veau dans une casserole, couvre d\'eau froide. Porte à ébullition. Écume.',
      'Ajoute carottes, poireau, oignon piqué, bouquet garni, sel.',
      'Mijote 1h30 à feu doux jusqu\'à viande tendre.',
      'Sors la viande et les légumes, garde le bouillon.',
      'Fais sauter les champignons dans le beurre. Réserve.',
      'Sauce : beurre + farine, mélange 1 min. Verse le bouillon (500ml) en fouettant.',
      'Hors du feu, mélange crème + jaunes + citron. Verse dans la sauce en fouettant.',
      'Remets viande, légumes, champignons. Réchauffe sans bouillir. Sers avec riz.'
    ],
    substitutions: [
      { from: 'Veau', to: 'Poulet (cuisson plus courte, 45 min)' }
    ],
    coach_note: 'Le plat français bourgeois par excellence. Long mais ça te transporte directement à Paris.',
    photo_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Gratin Dauphinois',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 80,
    difficulty: 1,
    total_calories: 480,
    total_protein: 14,
    total_carbs: 48,
    total_fat: 26,
    ingredients: [
      { name: 'Pommes de terre', qty: '800g' },
      { name: 'Crème liquide', qty: '300ml' },
      { name: 'Lait', qty: '300ml' },
      { name: 'Ail', qty: '3 gousses' },
      { name: 'Beurre', qty: '20g' },
      { name: 'Muscade', qty: '1 pincée' },
      { name: 'Sel, poivre', qty: 'au goût' },
      { name: 'Gruyère râpé (facultatif)', qty: '50g' }
    ],
    steps: [
      'Pèle et tranche les pommes de terre TRÈS finement (2-3mm).',
      'Frotte le plat avec une gousse d\'ail, beurre généreusement.',
      'Mélange crème + lait + ail haché + muscade + sel + poivre.',
      'Dispose les patates en couches dans le plat.',
      'Verse le mélange crémeux par-dessus (doit recouvrir).',
      'Optionnel : gruyère sur le dessus pour gratiner.',
      'Enfourne 1h à 160°C.',
      'Laisse reposer 10 min avant de servir.'
    ],
    substitutions: [
      { from: 'Crème liquide', to: 'Lait entier (moins riche)' }
    ],
    coach_note: 'La pomme de terre française dans sa version la plus crémeuse. Côté gym, on prend une portion raisonnable.',
    photo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Ratatouille',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 1,
    total_calories: 220,
    total_protein: 6,
    total_carbs: 28,
    total_fat: 10,
    ingredients: [
      { name: 'Aubergine', qty: '1' },
      { name: 'Courgettes', qty: '2' },
      { name: 'Poivrons (rouge, jaune)', qty: '2' },
      { name: 'Tomates', qty: '4' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Thym, romarin, laurier', qty: '1 brin chaque' },
      { name: 'Huile d\'olive', qty: '4 c.à.s' },
      { name: 'Basilic frais', qty: '½ bouquet' }
    ],
    steps: [
      'Coupe tous les légumes en cubes de 2cm.',
      'Fais sauter aubergine 5 min dans l\'huile, réserve.',
      'Idem pour courgettes, idem pour poivrons (séparément).',
      'Dans la même casserole, fais revenir oignon et ail.',
      'Ajoute tomates pelées en dés, herbes, sel.',
      'Mijote 15 min.',
      'Remets tous les légumes, mélange.',
      'Cuis encore 25 min à feu doux.',
      'Sers chaud ou froid avec basilic frais.'
    ],
    substitutions: [],
    coach_note: 'Plat provençal végétarien. Léger, plein de fibres. Tu peux le manger 3 jours d\'affilée.',
    photo_url: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#588157)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Coq au Vin (Version Sans Alcool)',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 2,
    total_calories: 540,
    total_protein: 48,
    total_carbs: 22,
    total_fat: 24,
    ingredients: [
      { name: 'Cuisses de poulet', qty: '4 morceaux' },
      { name: 'Champignons de Paris', qty: '250g' },
      { name: 'Oignons grelots ou petits oignons', qty: '15' },
      { name: 'Dinde fumée en allumettes', qty: '100g' },
      { name: 'Bouillon de volaille', qty: '500ml' },
      { name: 'Jus de raisin sans alcool', qty: '200ml' },
      { name: 'Concentré de tomate', qty: '1 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Bouquet garni', qty: '1' },
      { name: 'Farine', qty: '2 c.à.s' },
      { name: 'Beurre', qty: '30g' }
    ],
    steps: [
      'Fais dorer les cuisses dans le beurre. Réserve.',
      'Dans la même cocotte, fais revenir dinde fumée, oignons, champignons. Réserve.',
      'Saupoudre la farine dans le fond, remue.',
      'Ajoute bouillon, jus de raisin, concentré, ail, bouquet garni.',
      'Remets poulet et garniture.',
      'Couvre, mijote 1h à feu doux.',
      'Sers avec pommes vapeur ou tagliatelles.'
    ],
    substitutions: [
      { from: 'Vin rouge (haram)', to: 'Jus de raisin rouge sans alcool + 1 c.à.s vinaigre balsamique' }
    ],
    coach_note: 'Coq au vin halal — le jus de raisin avec un peu de vinaigre balsamique remplace très bien le vin rouge.',
    photo_url: 'https://images.unsplash.com/photo-1604908554007-fdca4f4b1de1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Crêpes Sucrées Classiques',
    category: 'desserts',
    cuisine: 'french',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 1,
    total_calories: 280,
    total_protein: 8,
    total_carbs: 38,
    total_fat: 10,
    ingredients: [
      { name: 'Farine', qty: '200g' },
      { name: 'Œufs', qty: '3' },
      { name: 'Lait', qty: '500ml' },
      { name: 'Sucre', qty: '30g' },
      { name: 'Beurre fondu', qty: '40g' },
      { name: 'Sel', qty: '1 pincée' },
      { name: 'Vanille ou fleur d\'oranger', qty: '1 c.à.s' }
    ],
    steps: [
      'Mélange farine, sucre, sel.',
      'Ajoute œufs, mélange au centre.',
      'Verse le lait progressivement en fouettant pour éviter les grumeaux.',
      'Ajoute beurre fondu et vanille.',
      'Repose 30 min minimum (1h c\'est mieux).',
      'Chauffe une poêle, verse une louche, étale.',
      'Cuis 1 min par face.',
      'Garnis : confiture, miel, chocolat, fruits, sucre.'
    ],
    substitutions: [
      { from: 'Vanille', to: 'Eau de fleur d\'oranger' }
    ],
    coach_note: 'La base. Repose la pâte minimum 30 min — c\'est ça le secret des crêpes fines.',
    photo_url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Soupe à l\'Oignon Gratinée',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 380,
    total_protein: 14,
    total_carbs: 42,
    total_fat: 18,
    ingredients: [
      { name: 'Oignons jaunes', qty: '4 gros' },
      { name: 'Beurre', qty: '40g' },
      { name: 'Farine', qty: '1 c.à.s' },
      { name: 'Bouillon de bœuf', qty: '1L' },
      { name: 'Thym', qty: '1 c.à.c' },
      { name: 'Laurier', qty: '1 feuille' },
      { name: 'Tranches de baguette', qty: '4' },
      { name: 'Gruyère râpé', qty: '120g' },
      { name: 'Ail', qty: '1 gousse' }
    ],
    steps: [
      'Émince les oignons finement.',
      'Fais-les fondre dans le beurre à feu doux 30 min en remuant — ils doivent caraméliser.',
      'Saupoudre la farine, mélange 1 min.',
      'Verse le bouillon chaud, thym, laurier. Mijote 15 min.',
      'Toaste les tranches de pain, frotte d\'ail.',
      'Verse la soupe dans des bols allant au four.',
      'Pose le pain dessus, couvre généreusement de gruyère.',
      'Gratine 10 min à 220°C jusqu\'à fromage doré.'
    ],
    substitutions: [],
    coach_note: 'La technique : caraméliser longtemps les oignons. C\'est ça qui donne le goût profond, sucré.',
    photo_url: 'https://images.unsplash.com/photo-1547308283-b941b6e95cb1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Tartiflette (Halal au Poulet Fumé)',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 70,
    difficulty: 2,
    total_calories: 620,
    total_protein: 28,
    total_carbs: 48,
    total_fat: 36,
    ingredients: [
      { name: 'Pommes de terre', qty: '700g' },
      { name: 'Dinde fumée en allumettes', qty: '150g' },
      { name: 'Oignons', qty: '2' },
      { name: 'Reblochon (ou camembert)', qty: '200g' },
      { name: 'Crème fraîche', qty: '150ml' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Beurre', qty: '20g' },
      { name: 'Thym', qty: '1 c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Cuis les patates en cubes à l\'eau 12 min jusqu\'à juste tendres. Égoutte.',
      'Fais revenir oignons émincés dans le beurre 10 min.',
      'Ajoute dinde fumée, fais dorer.',
      'Dans un plat à gratin : patates, ail haché, mélange oignons-dinde, thym.',
      'Arrose de crème fraîche.',
      'Pose le reblochon coupé en deux dans la longueur, croûte vers le haut.',
      'Enfourne 25 min à 200°C.'
    ],
    substitutions: [
      { from: 'Reblochon (rare en Algérie)', to: 'Camembert + un peu de gruyère' },
      { from: 'Lardons (haram)', to: 'Dinde fumée' }
    ],
    coach_note: 'Plat savoyard halal. Le fromage qui fond sur les patates = bonheur.',
    photo_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Croque-Monsieur (Halal)',
    category: 'quick_meals',
    cuisine: 'french',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 480,
    total_protein: 26,
    total_carbs: 42,
    total_fat: 22,
    ingredients: [
      { name: 'Pain de mie', qty: '4 tranches' },
      { name: 'Blanc de poulet ou dinde tranchée', qty: '80g' },
      { name: 'Gruyère râpé', qty: '80g' },
      { name: 'Lait', qty: '150ml' },
      { name: 'Beurre', qty: '30g' },
      { name: 'Farine', qty: '20g' },
      { name: 'Muscade', qty: 'pincée' },
      { name: 'Moutarde', qty: '1 c.à.c' }
    ],
    steps: [
      'Béchamel : fais fondre beurre, ajoute farine 1 min. Verse lait en fouettant. Sale, muscade.',
      'Tartine 2 tranches de pain de moutarde + béchamel.',
      'Pose dinde + gruyère, referme avec les autres tranches.',
      'Tartine le dessus de béchamel, couvre de gruyère.',
      'Enfourne 12 min à 200°C jusqu\'à doré et bullant.'
    ],
    substitutions: [
      { from: 'Jambon de Paris (haram)', to: 'Dinde tranchée halal' }
    ],
    coach_note: 'Le croque-monsieur français version halal. Réconfort total.',
    photo_url: 'https://images.unsplash.com/photo-1573821663912-6df460f9c684?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade Niçoise',
    category: 'salads',
    cuisine: 'french',
    meal_type: 'lunch',
    goal_tag: 'cut',
    craving_tag: 'fresh',
    prep_time: 25,
    difficulty: 1,
    total_calories: 420,
    total_protein: 32,
    total_carbs: 28,
    total_fat: 20,
    ingredients: [
      { name: 'Thon en boîte au naturel', qty: '120g' },
      { name: 'Œufs durs', qty: '2' },
      { name: 'Pommes de terre nouvelles', qty: '200g' },
      { name: 'Haricots verts', qty: '120g' },
      { name: 'Tomates', qty: '2' },
      { name: 'Anchois (facultatif)', qty: '4' },
      { name: 'Olives noires', qty: '40g' },
      { name: 'Oignon rouge', qty: '½' },
      { name: 'Salade verte', qty: '50g' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Vinaigre de vin', qty: '1 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Basilic frais', qty: '½ bouquet' }
    ],
    steps: [
      'Cuis patates et haricots verts séparément.',
      'Dans un grand plat : salade au fond.',
      'Dispose en quartiers : tomates, œufs durs, patates tièdes, haricots verts.',
      'Émiette le thon au centre, ajoute olives, oignon rouge.',
      'Pose les anchois si tu en mets.',
      'Sauce : huile + vinaigre + moutarde + sel. Verse à la fin.',
      'Parsème de basilic frais.'
    ],
    substitutions: [
      { from: 'Anchois', to: 'Rien (facultatif)' }
    ],
    coach_note: 'Salade complète niçoise. 32g de protéines pour 420 kcal. Top pour midi.',
    photo_url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Bœuf Bourguignon (Sans Alcool)',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 180,
    difficulty: 3,
    total_calories: 580,
    total_protein: 48,
    total_carbs: 18,
    total_fat: 32,
    ingredients: [
      { name: 'Paleron ou macreuse de bœuf', qty: '500g' },
      { name: 'Carottes', qty: '3' },
      { name: 'Oignons', qty: '2' },
      { name: 'Champignons', qty: '250g' },
      { name: 'Dinde fumée', qty: '100g' },
      { name: 'Bouillon de bœuf', qty: '500ml' },
      { name: 'Jus de raisin rouge sans alcool', qty: '300ml' },
      { name: 'Vinaigre balsamique', qty: '2 c.à.s' },
      { name: 'Concentré de tomate', qty: '2 c.à.s' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Bouquet garni', qty: '1' },
      { name: 'Farine', qty: '2 c.à.s' },
      { name: 'Beurre, huile', qty: '2 c.à.s chaque' }
    ],
    steps: [
      'Coupe le bœuf en gros cubes. Sale, farine.',
      'Fais-le saisir bien sur toutes les faces dans le mélange beurre-huile.',
      'Réserve. Fais revenir dinde fumée, oignons, carottes en rondelles.',
      'Ajoute ail, concentré, mélange 1 min.',
      'Remets la viande, verse bouillon + jus de raisin + vinaigre balsamique.',
      'Ajoute bouquet garni.',
      'Couvre, mijote 2h30 à très feu doux.',
      'Aux 20 dernières minutes, ajoute les champignons.',
      'Sers avec pommes vapeur ou pâtes fraîches.'
    ],
    substitutions: [
      { from: 'Vin rouge', to: 'Jus de raisin rouge + vinaigre balsamique' }
    ],
    coach_note: 'Notre bourguignon halal. Le secret c\'est le temps — 2h30 minimum. La viande doit fondre.',
    photo_url: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f1d1b,#bc6c25)',
    membership_required: 'cookbook',
    featured: true
  },
  {
    title: 'Omelette Aux Fines Herbes',
    category: 'breakfast',
    cuisine: 'french',
    meal_type: 'breakfast',
    goal_tag: 'cut',
    craving_tag: 'protein',
    prep_time: 8,
    difficulty: 1,
    total_calories: 280,
    total_protein: 22,
    total_carbs: 4,
    total_fat: 18,
    ingredients: [
      { name: 'Œufs', qty: '3' },
      { name: 'Beurre', qty: '15g' },
      { name: 'Persil', qty: '1 c.à.s' },
      { name: 'Ciboulette', qty: '1 c.à.s' },
      { name: 'Cerfeuil ou estragon (facultatif)', qty: '1 c.à.c' },
      { name: 'Sel, poivre', qty: 'au goût' },
      { name: 'Crème (facultatif)', qty: '1 c.à.s' }
    ],
    steps: [
      'Bats les œufs avec sel, poivre, herbes hachées.',
      'Fais fondre le beurre dans une poêle à feu moyen-vif.',
      'Verse les œufs.',
      'Avec une spatule, remue doucement les bords vers le centre.',
      'Quand encore légèrement baveux, plie en trois.',
      'Sers immédiatement sur assiette chaude.'
    ],
    substitutions: [
      { from: 'Cerfeuil', to: 'Plus de persil' }
    ],
    coach_note: 'L\'omelette française parfaite c\'est encore baveuse à l\'intérieur. Surtout pas trop cuite.',
    photo_url: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Tarte Tatin (Pommes Caramélisées)',
    category: 'desserts',
    cuisine: 'french',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 60,
    difficulty: 2,
    total_calories: 320,
    total_protein: 4,
    total_carbs: 48,
    total_fat: 14,
    ingredients: [
      { name: 'Pâte feuilletée', qty: '1' },
      { name: 'Pommes (golden, reinette)', qty: '6' },
      { name: 'Sucre', qty: '120g' },
      { name: 'Beurre', qty: '60g' },
      { name: 'Cannelle (facultatif)', qty: '½ c.à.c' },
      { name: 'Jus de citron', qty: '1 c.à.s' }
    ],
    steps: [
      'Pèle et coupe les pommes en quartiers.',
      'Dans un moule allant au four et au gaz, fais un caramel avec sucre + 2 c.à.s eau.',
      'Quand ambré, hors du feu, ajoute le beurre. Mélange.',
      'Dispose les pommes en rosace, serrées, côté bombé contre le caramel.',
      'Saupoudre de cannelle, jus de citron.',
      'Couvre de pâte feuilletée, rentre les bords.',
      'Pique avec fourchette.',
      'Enfourne 35 min à 200°C.',
      'Démoule rapidement (pâte dessous) en retournant sur un plat.'
    ],
    substitutions: [],
    coach_note: 'Le démoulage est le moment magique. Attends 5 min après cuisson, puis retourne d\'un coup sec.',
    photo_url: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Mousse au Chocolat',
    category: 'desserts',
    cuisine: 'french',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 2,
    total_calories: 280,
    total_protein: 8,
    total_carbs: 24,
    total_fat: 18,
    ingredients: [
      { name: 'Chocolat noir 70%', qty: '200g' },
      { name: 'Œufs', qty: '6' },
      { name: 'Sucre', qty: '40g' },
      { name: 'Beurre', qty: '30g' },
      { name: 'Sel', qty: '1 pincée' }
    ],
    steps: [
      'Séparé les blancs des jaunes.',
      'Fais fondre chocolat + beurre au bain-marie. Laisse tiédir.',
      'Incorpore les jaunes un par un dans le chocolat tiède.',
      'Monte les blancs en neige avec une pincée de sel. Quand mousseux, ajoute le sucre, continue de battre jusqu\'à ferme.',
      'Incorpore ⅓ des blancs dans le chocolat pour détendre.',
      'Ajoute le reste délicatement en soulevant la masse.',
      'Verse dans des ramequins.',
      'Réfrigère minimum 4h (idéal 6h).'
    ],
    substitutions: [],
    coach_note: 'La mousse française pure et sublime. Incorpore les blancs très délicatement — c\'est ça qui donne la légèreté.',
    photo_url: 'https://images.unsplash.com/photo-1551529834-525807d6b4f3?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#6f4518,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Crème Brûlée',
    category: 'desserts',
    cuisine: 'french',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 75,
    difficulty: 2,
    total_calories: 320,
    total_protein: 6,
    total_carbs: 22,
    total_fat: 24,
    ingredients: [
      { name: 'Crème liquide entière', qty: '500ml' },
      { name: 'Jaunes d\'œufs', qty: '6' },
      { name: 'Sucre', qty: '80g' },
      { name: 'Gousse de vanille', qty: '1 (ou 1 c.à.s extrait)' },
      { name: 'Cassonade (pour caraméliser)', qty: '6 c.à.s' }
    ],
    steps: [
      'Fais infuser vanille dans la crème chaude 10 min.',
      'Fouette jaunes + sucre jusqu\'à blanchi.',
      'Verse la crème chaude (filtre la vanille) en fouettant.',
      'Répartis dans 6 ramequins.',
      'Cuis au bain-marie 40 min à 100°C — le centre doit trembler.',
      'Réfrigère minimum 4h.',
      'Avant de servir, saupoudre cassonade.',
      'Caramélise au chalumeau ou sous le grill très chaud 2 min.'
    ],
    substitutions: [
      { from: 'Vanille en gousse', to: 'Extrait de vanille (moins parfumé mais marche)' }
    ],
    coach_note: 'Le moment "casse de la croûte caramel" est sacré. Si t\'as pas de chalumeau, gril du four à fond.',
    photo_url: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#bc6c25)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Magret de Canard à l\'Orange',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'protein',
    prep_time: 30,
    difficulty: 2,
    total_calories: 480,
    total_protein: 42,
    total_carbs: 18,
    total_fat: 26,
    ingredients: [
      { name: 'Magret de canard', qty: '1 (300g)' },
      { name: 'Oranges', qty: '2' },
      { name: 'Miel', qty: '2 c.à.s' },
      { name: 'Vinaigre balsamique', qty: '1 c.à.s' },
      { name: 'Bouillon de volaille', qty: '100ml' },
      { name: 'Beurre', qty: '15g' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Quadrille la peau du magret au couteau (sans entamer la chair).',
      'Pose côté peau dans une poêle FROIDE. Allume à feu moyen.',
      'Laisse fondre la graisse 8 min jusqu\'à peau bien dorée.',
      'Retourne, cuis 4 min côté chair.',
      'Réserve, laisse reposer 5 min couvert.',
      'Dans la même poêle, verse jus de 2 oranges + miel + vinaigre + bouillon.',
      'Fais réduire 5 min jusqu\'à sirupeux.',
      'Hors du feu, ajoute beurre froid en fouettant.',
      'Tranche le magret, nappe de sauce.'
    ],
    substitutions: [
      { from: 'Magret', to: 'Cuisses de canard ou poulet (cuisson plus longue)' }
    ],
    coach_note: 'Le canard à l\'orange — classique bistrot. La technique : poêle FROIDE au départ pour que la graisse fonde lentement.',
    photo_url: 'https://images.unsplash.com/photo-1604908554007-fdca4f4b1de1?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fb8500,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Hachis Parmentier',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'bulk',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 540,
    total_protein: 32,
    total_carbs: 52,
    total_fat: 22,
    ingredients: [
      { name: 'Pommes de terre', qty: '700g' },
      { name: 'Viande hachée bœuf', qty: '300g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Carotte', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Concentré de tomate', qty: '1 c.à.s' },
      { name: 'Bouillon', qty: '100ml' },
      { name: 'Lait', qty: '100ml' },
      { name: 'Beurre', qty: '30g' },
      { name: 'Gruyère râpé', qty: '40g' },
      { name: 'Thym, persil', qty: '1 c.à.s chaque' }
    ],
    steps: [
      'Cuis les patates 20 min à l\'eau, écrase en purée avec lait + beurre. Sale.',
      'Fais revenir oignon haché + carotte en dés + ail.',
      'Ajoute la viande, fais cuire jusqu\'à dorée.',
      'Ajoute concentré, bouillon, thym, sel, poivre. Mijote 10 min.',
      'Dans un plat : viande au fond, purée par-dessus, gruyère.',
      'Fais des stries à la fourchette sur la purée.',
      'Enfourne 25 min à 180°C, puis 5 min sous le grill pour gratiner.'
    ],
    substitutions: [],
    coach_note: 'Le shepherd\'s pie français. Plat familial parfait. Réchauffe encore meilleur le lendemain.',
    photo_url: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Soupe de Poisson Provençale',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 320,
    total_protein: 28,
    total_carbs: 22,
    total_fat: 12,
    ingredients: [
      { name: 'Poissons à soupe (rascasse, vive, ou poissons mixtes)', qty: '500g' },
      { name: 'Tomates', qty: '4' },
      { name: 'Oignon', qty: '1' },
      { name: 'Poireau', qty: '1' },
      { name: 'Fenouil (facultatif)', qty: '½' },
      { name: 'Ail', qty: '4 gousses' },
      { name: 'Safran', qty: '1 pincée' },
      { name: 'Concentré de tomate', qty: '1 c.à.s' },
      { name: 'Pastis sans alcool ou anis étoilé', qty: '1 pincée' },
      { name: 'Bouquet garni', qty: '1' },
      { name: 'Huile d\'olive', qty: '3 c.à.s' },
      { name: 'Pain grillé, ail, rouille', qty: 'pour servir' }
    ],
    steps: [
      'Fais revenir oignon, poireau, fenouil, ail dans l\'huile 5 min.',
      'Ajoute tomates en dés, concentré, safran, anis. Cuis 5 min.',
      'Ajoute les poissons coupés en morceaux, bouquet garni.',
      'Couvre d\'eau (1.5L), sale.',
      'Mijote 30 min.',
      'Mixe le tout, passe au tamis pour retirer arêtes.',
      'Sers très chaud avec tranches de pain frottées d\'ail et rouille (mayo safran-piment).'
    ],
    substitutions: [
      { from: 'Rascasse', to: 'Mélange de poissons blancs du marché' }
    ],
    coach_note: 'Soupe provençale typique. Notre version de la bouillabaisse light. 28g de protéines pour 320 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1606851181064-32afd5c34d4a?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bb3e03,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Quiche aux Légumes',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 60,
    difficulty: 2,
    total_calories: 420,
    total_protein: 18,
    total_carbs: 38,
    total_fat: 22,
    ingredients: [
      { name: 'Pâte brisée', qty: '1' },
      { name: 'Épinards frais (ou surgelés)', qty: '300g' },
      { name: 'Champignons', qty: '150g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Œufs', qty: '4' },
      { name: 'Crème liquide', qty: '200ml' },
      { name: 'Gruyère râpé', qty: '60g' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Muscade', qty: 'pincée' }
    ],
    steps: [
      'Étale pâte dans un moule, précuis 10 min à 180°C.',
      'Fais tomber épinards à la poêle 2 min. Réserve.',
      'Fais sauter champignons + oignon + ail 6 min.',
      'Bats œufs + crème + muscade + sel + poivre.',
      'Garnis la pâte : épinards, champignons, gruyère.',
      'Verse l\'appareil.',
      'Enfourne 30 min à 180°C.'
    ],
    substitutions: [],
    coach_note: 'Version végétarienne tout aussi bonne. Tu peux varier avec poireaux, courgettes selon saison.',
    photo_url: 'https://images.unsplash.com/photo-1605910394116-3d77c84b8a31?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Gratin de Courgettes',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'cut',
    craving_tag: 'comfort',
    prep_time: 45,
    difficulty: 1,
    total_calories: 280,
    total_protein: 14,
    total_carbs: 18,
    total_fat: 18,
    ingredients: [
      { name: 'Courgettes', qty: '4' },
      { name: 'Œufs', qty: '3' },
      { name: 'Crème liquide', qty: '150ml' },
      { name: 'Gruyère râpé', qty: '60g' },
      { name: 'Oignon', qty: '1' },
      { name: 'Ail', qty: '2 gousses' },
      { name: 'Persil', qty: '2 c.à.s' },
      { name: 'Muscade', qty: 'pincée' }
    ],
    steps: [
      'Tranche les courgettes en rondelles.',
      'Fais sauter oignon haché, puis courgettes et ail 10 min — elles doivent rendre l\'eau.',
      'Bats œufs + crème + muscade + sel + poivre.',
      'Dans un plat : courgettes-oignons, verse l\'appareil aux œufs.',
      'Parsème gruyère + persil.',
      'Enfourne 25 min à 180°C jusqu\'à doré.'
    ],
    substitutions: [],
    coach_note: 'Léger, peu de glucides. Parfait pour le soir en cut. 14g de protéines pour 280 kcal.',
    photo_url: 'https://images.unsplash.com/photo-1625944525533-473e1e6cc4b9?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Madeleines au Citron',
    category: 'desserts',
    cuisine: 'french',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 30,
    difficulty: 1,
    total_calories: 140,
    total_protein: 3,
    total_carbs: 18,
    total_fat: 6,
    ingredients: [
      { name: 'Œufs', qty: '3' },
      { name: 'Sucre', qty: '120g' },
      { name: 'Farine', qty: '150g' },
      { name: 'Beurre fondu', qty: '120g' },
      { name: 'Levure chimique', qty: '1 c.à.c' },
      { name: 'Zeste de citron', qty: '1' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Sel', qty: '1 pincée' }
    ],
    steps: [
      'Fouette œufs + sucre jusqu\'à mousseux et clair.',
      'Ajoute farine, levure, sel. Mélange.',
      'Incorpore beurre fondu tiède + zeste + vanille.',
      'Repose la pâte 1h au frigo (c\'est essentiel pour la bosse).',
      'Beurre des moules à madeleine, remplis aux ¾.',
      'Enfourne 4 min à 240°C puis baisse à 200°C pendant 6 min.',
      'Démoule chaud.'
    ],
    substitutions: [
      { from: 'Citron', to: 'Orange ou fleur d\'oranger' }
    ],
    coach_note: 'La fameuse "bosse" des madeleines vient du choc thermique : pâte froide + four chaud.',
    photo_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fefae0,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Croque-Madame',
    category: 'breakfast',
    cuisine: 'french',
    meal_type: 'breakfast',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 20,
    difficulty: 1,
    total_calories: 580,
    total_protein: 32,
    total_carbs: 42,
    total_fat: 28,
    ingredients: [
      { name: 'Pain de mie', qty: '2 tranches' },
      { name: 'Dinde tranchée', qty: '60g' },
      { name: 'Gruyère râpé', qty: '60g' },
      { name: 'Œuf', qty: '1' },
      { name: 'Béchamel maison', qty: '4 c.à.s' },
      { name: 'Beurre', qty: '15g' }
    ],
    steps: [
      'Comme un croque-monsieur : pain + béchamel + dinde + gruyère + pain + béchamel + gruyère.',
      'Enfourne 12 min à 200°C.',
      'Pendant ce temps, fais un œuf au plat dans le beurre.',
      'Pose l\'œuf sur le croque.',
      'Sers immédiatement.'
    ],
    substitutions: [],
    coach_note: 'Croque-monsieur + œuf au plat = croque-madame. Petit-déj qui te tient au corps.',
    photo_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#fcbf49,#bb3e03)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Salade de Chèvre Chaud',
    category: 'salads',
    cuisine: 'french',
    meal_type: 'lunch',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 15,
    difficulty: 1,
    total_calories: 480,
    total_protein: 22,
    total_carbs: 32,
    total_fat: 28,
    ingredients: [
      { name: 'Salade mélangée', qty: '100g' },
      { name: 'Crottin de chèvre (ou bûche de chèvre)', qty: '120g' },
      { name: 'Tranches de baguette', qty: '4' },
      { name: 'Noix', qty: '30g' },
      { name: 'Miel', qty: '2 c.à.c' },
      { name: 'Vinaigre balsamique', qty: '1 c.à.s' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Moutarde', qty: '1 c.à.c' },
      { name: 'Lardons de dinde (facultatif)', qty: '40g' }
    ],
    steps: [
      'Toaste les tranches de baguette. Pose un crottin coupé en deux sur chaque.',
      'Arrose chaque toast d\'1 filet de miel.',
      'Gratine 5 min au four jusqu\'à doré.',
      'Pendant ce temps, mélange salade + noix + dinde fumée.',
      'Sauce : huile + vinaigre + moutarde + sel + poivre.',
      'Dispose les toasts chauds sur la salade.'
    ],
    substitutions: [
      { from: 'Crottin', to: 'Bûche de chèvre en tranches' }
    ],
    coach_note: 'Salade bistrot classique. Le chèvre chaud + miel + noix = combinaison parfaite.',
    photo_url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#588157,#dda15e)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Crêpes Salées Complètes',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 30,
    difficulty: 1,
    total_calories: 480,
    total_protein: 24,
    total_carbs: 48,
    total_fat: 22,
    ingredients: [
      { name: 'Farine de sarrasin (ou blé)', qty: '200g' },
      { name: 'Eau', qty: '400ml' },
      { name: 'Sel', qty: '1 c.à.c' },
      { name: 'Œufs (1 dans la pâte + 2 pour garnir)', qty: '3' },
      { name: 'Dinde tranchée', qty: '60g' },
      { name: 'Gruyère râpé', qty: '60g' },
      { name: 'Champignons sautés', qty: '80g' },
      { name: 'Beurre', qty: '20g' }
    ],
    steps: [
      'Pâte : farine + eau + sel + 1 œuf. Repose 1h.',
      'Cuis une crêpe dans une grande poêle.',
      'Quand elle est presque cuite, casse un œuf au centre.',
      'Étale autour : dinde, gruyère, champignons.',
      'Plie les 4 côtés vers le centre pour former un carré.',
      'Cuis encore 2 min pour faire fondre le fromage et cuire l\'œuf.'
    ],
    substitutions: [
      { from: 'Sarrasin', to: 'Farine blanche classique' }
    ],
    coach_note: 'La galette bretonne complète. Repas équilibré et savoureux.',
    photo_url: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#dda15e,#fcbf49)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Clafoutis aux Cerises',
    category: 'desserts',
    cuisine: 'french',
    meal_type: 'snack',
    goal_tag: 'maintain',
    craving_tag: 'sweet',
    prep_time: 50,
    difficulty: 1,
    total_calories: 220,
    total_protein: 6,
    total_carbs: 28,
    total_fat: 8,
    ingredients: [
      { name: 'Cerises (avec ou sans noyaux)', qty: '500g' },
      { name: 'Œufs', qty: '3' },
      { name: 'Lait', qty: '300ml' },
      { name: 'Farine', qty: '80g' },
      { name: 'Sucre', qty: '80g' },
      { name: 'Vanille', qty: '1 c.à.c' },
      { name: 'Beurre (pour moule)', qty: '15g' },
      { name: 'Sel', qty: 'pincée' }
    ],
    steps: [
      'Beurre un plat à four.',
      'Dispose les cerises dans le fond.',
      'Mélange œufs + sucre + sel.',
      'Ajoute farine, puis lait progressivement + vanille.',
      'Verse sur les cerises.',
      'Enfourne 35 min à 180°C jusqu\'à doré et pris.',
      'Saupoudre sucre glace, sers tiède ou froid.'
    ],
    substitutions: [
      { from: 'Cerises', to: 'Prunes, abricots, mirabelles' }
    ],
    coach_note: 'Dessert facile à faire entre la pâte à crêpe et le flan. Tradition limousine.',
    photo_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#9d0208,#fefae0)',
    membership_required: 'cookbook',
    featured: false
  },
  {
    title: 'Poulet Rôti aux Herbes',
    category: 'main_meals',
    cuisine: 'french',
    meal_type: 'dinner',
    goal_tag: 'maintain',
    craving_tag: 'comfort',
    prep_time: 90,
    difficulty: 1,
    total_calories: 520,
    total_protein: 56,
    total_carbs: 4,
    total_fat: 30,
    ingredients: [
      { name: 'Poulet entier', qty: '1 (1.5kg)' },
      { name: 'Beurre mou', qty: '60g' },
      { name: 'Ail', qty: '6 gousses' },
      { name: 'Thym, romarin frais', qty: '1 bouquet chaque' },
      { name: 'Citron', qty: '1' },
      { name: 'Huile d\'olive', qty: '2 c.à.s' },
      { name: 'Sel, poivre', qty: 'au goût' }
    ],
    steps: [
      'Sors le poulet du frigo 1h avant la cuisson.',
      'Mélange beurre mou + ail râpé + herbes hachées + sel + poivre.',
      'Glisse cette pommade SOUS la peau du poulet (essentiel).',
      'Frotte l\'extérieur d\'huile et sel.',
      'Glisse le citron coupé en deux + herbes restantes dans la cavité.',
      'Pose dans un plat, sur le dos.',
      'Enfourne 1h15 à 200°C en arrosant 2-3 fois avec le jus.',
      'Repose 15 min couvert avant de découper.'
    ],
    substitutions: [],
    coach_note: 'Le poulet rôti dimanche. La technique du beurre sous la peau = chair ultra-juteuse.',
    photo_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
    photo_gradient: 'linear-gradient(135deg,#bc6c25,#fcbf49)',
    membership_required: 'cookbook',
    featured: true
  }
]

console.log(`Seeding ${recipes.length} French recipes...`)

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
