#!/usr/bin/env node
// seed_cookbook_batch_4.mjs — Recipes 146-200 (FINAL — reach 200)
// Ramadan + Eating Out + Algerian + Fast Food + Desserts
// Run: node seed_cookbook_batch_4.mjs

const SB_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcmVrdGxwbnd1ZWZzYWdmdXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMjI0NjQsImV4cCI6MjA5MTU5ODQ2NH0.46rZOEMUKoZCyL8eKzob8FDuOoFiA2LHbr2ZoKW-HrM';
const H = {'Content-Type':'application/json','apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Prefer':'return=representation'};
const q = async (m,p,b) => { const r = await fetch(`${SB_URL}/rest/v1/${p}`,{method:m,headers:H,body:b?JSON.stringify(b):undefined}); return {ok:r.ok,status:r.status,data:await r.json().catch(()=>null)}; };

const RECIPES = [
  // 🌙 RAMADAN (15)
  {title:"F'tor Light Soupe Poulet Légumes",category:'Ramadan',meal_type:'dinner',goal_tag:'fat_loss',craving_tag:'chaud',prep_time:25,difficulty:2,total_calories:385,total_protein:38,total_carbs:42,total_fat:8,featured:true,photo_gradient:'linear-gradient(135deg,#1a0a00,#D2691E)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'150g',calories:180,protein:33,carbs:0,fat:3},{name:'Riz cru',quantity:'50g',calories:180,protein:3.5,carbs:39,fat:0.5},{name:'Tomates',quantity:'150g',calories:27,protein:1.4,carbs:5.9,fat:0.3},{name:'Carottes',quantity:'80g',calories:33,protein:0.7,carbs:7.7,fat:0.2},{name:"Huile d'olive",quantity:'5g',calories:45,protein:0,carbs:0,fat:5}],
    steps:['Cuire poulet en morceaux avec oignon, ail.','Tomates concassées, ras el hanout, sel.','1L eau, mijoter 15 min.','Riz et carottes, cuire 12 min.','Citron + persil frais.'],
    substitutions:[{original:'Riz',alternative:'Frik concassé'}],coach_note:"Le f'tor parfait — commence léger. Hydratation prioritaire après le jeûne."},

  {title:"S'hour Avoine Banane Protéiné",category:'Ramadan',meal_type:'breakfast',goal_tag:'all',craving_tag:'sucré',prep_time:8,difficulty:1,total_calories:445,total_protein:24,total_carbs:62,total_fat:12,featured:true,photo_gradient:'linear-gradient(135deg,#1a0800,#A0522D)',membership_required:'cookbook',
    ingredients:[{name:"Flocons d'avoine",quantity:'70g',calories:266,protein:9.1,carbs:42,fat:4.9},{name:'Fromage frais 0%',quantity:'100g',calories:89,protein:8.6,carbs:4.3,fat:3.5},{name:'Banane',quantity:'100g',calories:89,protein:1,carbs:23,fat:0},{name:'Beurre cacahuète',quantity:'10g',calories:60,protein:2.5,carbs:2,fat:5}],
    steps:['Avoine + 250ml lait écrémé.','Hors feu : fromage frais.','Banane écrasée + cannelle.','PB en topping.','500ml eau juste avant.'],
    substitutions:[{original:'Banane',alternative:'Dattes 40g'}],coach_note:"Le s'hour parfait : avoine = libération lente. Tu tiens jusqu'au f'tor sans crash."},

  {title:'Bourek Four Ramadan Light',category:'Ramadan',meal_type:'dinner',goal_tag:'all',craving_tag:'salé',prep_time:20,difficulty:2,total_calories:385,total_protein:32,total_carbs:32,total_fat:14,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Steak haché',quantity:'120g',calories:300,protein:31.2,carbs:0,fat:20.4},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'30g',calories:27,protein:2.6,carbs:1.3,fat:1.1}],
    steps:['Cuire steak haché émietté avec oignon, persil.','Incorporer œuf battu.','Étaler pain ARRUPAN, garnir, rouler en cigare.','Four 200°C 12 min — pas de friture.'],
    substitutions:[{original:'Steak',alternative:'Poulet effiloché 150g'}],coach_note:'Le bourek de Ramadan — au four. 70% moins de calories.'},

  {title:'Zlabia Protéinée Maison',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:15,difficulty:3,total_calories:225,total_protein:14,total_carbs:30,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FFD700)',membership_required:'cookbook',
    ingredients:[{name:'Avoine mixée',quantity:'40g',calories:152,protein:5.2,carbs:24,fat:2.8},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'60g',calories:53,protein:5.2,carbs:2.6,fat:2.1},{name:'Miel',quantity:'5g',calories:15,protein:0,carbs:4,fat:0}],
    steps:['Avoine en farine fine.','Pâte : avoine + œuf + fromage frais fluide.','Poche à douille fine, formes torsadées.','Four 180°C 12 min.','Tremper dans sirop miel + eau chaude.'],
    substitutions:[{original:'Miel',alternative:"Sirop d'érable"}],coach_note:'La zlabia — sans bain d\'huile. 225 kcal au lieu de 600.'},

  {title:'Makroud Datte Avoine Fit',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:20,difficulty:2,total_calories:265,total_protein:8,total_carbs:42,total_fat:8,featured:false,photo_gradient:'linear-gradient(135deg,#1a0a00,#A0522D)',membership_required:'cookbook',
    ingredients:[{name:'Avoine mixée',quantity:'30g',calories:114,protein:3.9,carbs:18,fat:2.1},{name:'Dattes Medjool',quantity:'60g',calories:165,protein:1.1,carbs:44.7,fat:0.2},{name:'Beurre cacahuète',quantity:'10g',calories:60,protein:2.5,carbs:2,fat:5},{name:'Œuf',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5}],
    steps:['Dattes en pâte avec eau.','Pâte : avoine + œuf + 1cc fleur d\'oranger.','Étaler, garnir de pâte dattes.','Rouler, couper losanges.','Four 180°C 15 min.'],
    substitutions:[{original:'PB',alternative:'Amandes effilées 5g'}],coach_note:'Le makroud — sans friture. L\'avoine remplace la semoule.'},

  {title:'Brick Œuf Light',category:'Ramadan',meal_type:'dinner',goal_tag:'all',craving_tag:'salé',prep_time:10,difficulty:2,total_calories:295,total_protein:24,total_carbs:24,total_fat:14,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'45g',calories:120,protein:4,carbs:22,fat:1.5},{name:'Œufs',quantity:'2 (120g)',calories:140,protein:12,carbs:2,fat:10},{name:'Thon naturel',quantity:'40g',calories:46,protein:10.4,carbs:0,fat:0.4},{name:'Fromage frais 0%',quantity:'30g',calories:27,protein:2.6,carbs:1.3,fat:1.1}],
    steps:['Triangle de pain ARRUPAN.','Garnir : thon + fromage frais + œuf entier.','Replier, sceller bords.','Poêle spray huile 2 min/côté.','Jaune coulant garanti.'],
    substitutions:[{original:'Pain ARRUPAN',alternative:'Feuille de brick'}],coach_note:'Le brick à l\'œuf — version fit.'},

  {title:'Chorba Beida Algéroise Fit',category:'Ramadan',meal_type:'dinner',goal_tag:'fat_loss',craving_tag:'chaud',prep_time:25,difficulty:2,total_calories:345,total_protein:34,total_carbs:38,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#F5DEB3)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'150g',calories:180,protein:33,carbs:0,fat:3},{name:'Vermicelles cru',quantity:'40g',calories:140,protein:4.8,carbs:28.8,fat:0.8},{name:'Pommes de terre',quantity:'100g',calories:80,protein:2,carbs:18,fat:0},{name:"Huile d'olive",quantity:'5g',calories:45,protein:0,carbs:0,fat:5}],
    steps:['Poulet en cubes + oignon + cannelle + gingembre.','1L eau, mijoter 15 min.','PDT en dés.','5 min avant fin : vermicelles.','Citron + coriandre + menthe.'],
    substitutions:[{original:'Vermicelles',alternative:'Frik concassé'}],coach_note:'La chorba blanche algéroise — délicate, parfumée.'},

  {title:'Boureks Pommes de Terre Œuf',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'salé',prep_time:18,difficulty:2,total_calories:335,total_protein:24,total_carbs:36,total_fat:10,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FFD700)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Pommes de terre',quantity:'150g',calories:120,protein:3,carbs:27,fat:0},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4}],
    steps:['PDT cuites, écrasées.','Mélanger persil, ail, sel, poivre, cumin.','Étaler pain ARRUPAN, garnir, rouler.','Four 200°C 12 min.','Servir avec citron.'],
    substitutions:[{original:'PDT',alternative:'Patate douce'}],coach_note:'Les boureks de PDT — accompagnement typique.'},

  {title:'Mhalbi Pudding Ramadan',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:10,difficulty:1,total_calories:285,total_protein:14,total_carbs:42,total_fat:7,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FAEBD7)',membership_required:'cookbook',
    ingredients:[{name:'Riz cru',quantity:'40g',calories:144,protein:2.8,carbs:31.2,fat:0.4},{name:'Lait écrémé',quantity:'300ml',calories:105,protein:10.5,carbs:15,fat:0.3},{name:'Fromage frais 0%',quantity:'50g',calories:45,protein:4.3,carbs:2.2,fat:1.8},{name:'Beurre cacahuète',quantity:'8g',calories:48,protein:2,carbs:1.6,fat:4}],
    steps:['Riz en farine grossière.','Farine + lait + fleur d\'oranger.','Cuire 5 min en remuant.','Hors feu : fromage frais.','Verres, frigo. Pistaches.'],
    substitutions:[{original:'Pistaches',alternative:'Cannelle'}],coach_note:'Le mhalbi — crème classique de Ramadan.'},

  {title:'Lentilles Soupe Ramadan',category:'Ramadan',meal_type:'dinner',goal_tag:'fat_loss',craving_tag:'chaud',prep_time:20,difficulty:1,total_calories:325,total_protein:22,total_carbs:48,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a0800,#CD853F)',membership_required:'cookbook',
    ingredients:[{name:'Lentilles cuites',quantity:'180g',calories:207,protein:16.2,carbs:34.2,fat:0.9},{name:'Tomates',quantity:'150g',calories:27,protein:1.4,carbs:5.9,fat:0.3},{name:'Pommes de terre',quantity:'100g',calories:80,protein:2,carbs:18,fat:0},{name:"Huile d'olive",quantity:'5g',calories:45,protein:0,carbs:0,fat:5}],
    steps:['Oignon + ail + tomates dans huile.','Lentilles + 800ml eau + cumin + paprika.','Mijoter 10 min.','PDT, cuire 10 min.','Citron + coriandre + harissa.'],
    substitutions:[{original:'Lentilles vertes',alternative:'Corail (cuisson rapide)'}],coach_note:'La soupe de lentilles — protéine végétale parfaite.'},

  {title:'Sambousek Viande Four',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'salé',prep_time:20,difficulty:2,total_calories:325,total_protein:26,total_carbs:30,total_fat:12,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'70g',calories:187,protein:6.2,carbs:34.2,fat:2.3},{name:'Steak haché',quantity:'100g',calories:250,protein:26,carbs:0,fat:17},{name:'Œuf',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5},{name:'Fromage frais 0%',quantity:'20g',calories:18,protein:1.7,carbs:0.9,fat:0.7}],
    steps:['Steak haché + oignon + persil + épices.','Cercles de pain ARRUPAN.','Garnir, demi-lune, sceller.','Badigeonner œuf battu.','Four 200°C 15 min.'],
    substitutions:[{original:'Bœuf',alternative:'Poulet effiloché 100g'}],coach_note:'Le sambousek levantin — adopté au Maghreb.'},

  {title:'Mehchi Courgettes Ramadan',category:'Ramadan',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:25,difficulty:3,total_calories:445,total_protein:38,total_carbs:42,total_fat:14,featured:true,photo_gradient:'linear-gradient(135deg,#0a1a00,#9ACD32)',membership_required:'cookbook',
    ingredients:[{name:'Dinde hachée',quantity:'150g',calories:165,protein:33,carbs:0,fat:1.5},{name:'Courgettes',quantity:'300g',calories:51,protein:3.9,carbs:7.5,fat:0.9},{name:'Riz cru',quantity:'40g',calories:144,protein:2.8,carbs:31.2,fat:0.4},{name:'Tomates',quantity:'150g',calories:27,protein:1.4,carbs:5.9,fat:0.3},{name:"Huile d'olive",quantity:'6g',calories:54,protein:0,carbs:0,fat:6}],
    steps:['Vider courgettes, garder pulpe.','Farce : dinde + riz cru + pulpe + épices + persil.','Farcir aux 3/4.','Cocotte sur lit tomates + eau.','Mijoter 30 min couvert.'],
    substitutions:[{original:'Courgettes',alternative:'Aubergines'}],coach_note:'Le mehchi — patience récompensée.'},

  {title:'Bourek Fromage Persil',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'salé',prep_time:15,difficulty:1,total_calories:285,total_protein:22,total_carbs:30,total_fat:9,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#F0E68C)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'70g',calories:187,protein:6.2,carbs:34.2,fat:2.3},{name:'Fromage frais 0%',quantity:'120g',calories:107,protein:10.3,carbs:5.2,fat:4.2},{name:'Œuf',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5},{name:'Persil',quantity:'10g',calories:4,protein:0.3,carbs:0.6,fat:0.1}],
    steps:['Fromage frais + persil + ail + sel.','Étaler pain ARRUPAN.','Garnir, rouler.','Dorer œuf.','Four 200°C 12 min.'],
    substitutions:[{original:'Persil',alternative:'Menthe (libanais)'}],coach_note:'Le bourek au fromage — pour accompagner la chorba.'},

  {title:"Salade Variée F'tor",category:'Ramadan',meal_type:'side',goal_tag:'fat_loss',craving_tag:'frais',prep_time:10,difficulty:1,total_calories:195,total_protein:8,total_carbs:18,total_fat:11,featured:false,photo_gradient:'linear-gradient(135deg,#0a1a00,#556B2F)',membership_required:'cookbook',
    ingredients:[{name:'Tomates',quantity:'150g',calories:27,protein:1.4,carbs:5.9,fat:0.3},{name:'Concombre',quantity:'150g',calories:24,protein:1.1,carbs:5.4,fat:0.2},{name:'Œuf dur',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:"Huile d'olive",quantity:'8g',calories:72,protein:0,carbs:0,fat:8}],
    steps:['Tomates + concombre en dés.','Œuf dur en quartiers.','Persil + menthe + oignon rouge.','Vinaigrette : huile + citron + ail + cumin.','Servir frais.'],
    substitutions:[{original:'Œuf',alternative:'Thon 60g'}],coach_note:"La salade obligatoire du f'tor."},

  {title:'Datte Lait Amande Énergie',category:'Ramadan',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:3,difficulty:1,total_calories:225,total_protein:8,total_carbs:38,total_fat:6,featured:true,photo_gradient:'linear-gradient(135deg,#1a0800,#8B4513)',membership_required:'cookbook',
    ingredients:[{name:'Dattes Medjool',quantity:'60g (3)',calories:165,protein:1.1,carbs:44.7,fat:0.2},{name:'Lait écrémé',quantity:'200ml',calories:70,protein:7,carbs:10,fat:0.2},{name:'Beurre cacahuète',quantity:'5g',calories:30,protein:1.25,carbs:1,fat:2.5}],
    steps:['Dénoyauter dattes, fourrer PB.','Verre de lait tiède.','Boire eau, manger dattes après.','Tradition prophétique : 3 dattes.','Tiède = digestion.'],
    substitutions:[{original:'PB',alternative:'Amandes entières'}],coach_note:'Le f\'tor traditionnel — 3 dattes + lait.'},

  // 🗺 EATING OUT (10)
  {title:"McDonald's Algérie — Les Vrais Chiffres",category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:true,photo_gradient:'linear-gradient(135deg,#1a0000,#FFD700)',membership_required:'cookbook',
    ingredients:[],
    steps:['BIG MAC : 540kcal / 25P / 45C / 28F. 1x/semaine en cut.','MCCHICKEN : 400kcal / 14P / 40C / 18F. Mieux en cut.','MCCHICKEN GRILLÉ : 350kcal / 28P / 30C / 12F. LE meilleur.','FRITES MOYENNES : 340kcal. Jamais grandes.','SAUCE : Ketchup gratuit. Mayo +90kcal.'],
    substitutions:[],coach_note:'Grillé > pané > burger. Petite frites + eau. 1x/mois max.'},

  {title:'KFC Algérie — Le Guide',category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#DC143C)',membership_required:'cookbook',
    ingredients:[],
    steps:['BUCKET 8 : 2400kcal total. 1 piece = 300kcal. Max 2.','GRILLED CHICKEN : 200kcal / 28P. LE meilleur.','TWISTER : 480kcal. OK occasion.','FRIES MOYENNES : 320kcal.','COLESLAW : 130kcal — meilleur side.'],
    substitutions:[],coach_note:'1 piece grillé + coleslaw + eau = correct. 1 bucket pour 1 = catastrophe.'},

  {title:"Domino's Pizza — Les Macros",category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#0000CD)',membership_required:'cookbook',
    ingredients:[],
    steps:['PIZZA MOYENNE 1 PART : 250-300kcal. Max 3 parts.','THIN CRUST : -30% vs épaisse.','CHEESE + 1 PROTÉINE : meilleur ratio.','GARLIC BREAD : 200kcal/part. Évite.','WINGS : 60-80kcal/aile. Mieux que pizza si grosse faim.'],
    substitutions:[],coach_note:'Pizza = 1x/semaine OK. Fine, 2 toppings max, 3 parts max. Boisson : eau.'},

  {title:'Burger King Algérie — Choix',category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#FF4500)',membership_required:'cookbook',
    ingredients:[],
    steps:['WHOPPER : 660kcal / 28P / 49C / 40F. Éviter en cut.','CHICKEN ROYAL : 580kcal. OK occasion.','CHICKEN GRILLED : 300kcal / 31P. LE meilleur.','HALLOUMI : 540kcal. Acceptable.','MILKSHAKE : 400-500kcal. Eau.'],
    substitutions:[],coach_note:'Grillé > pané. Whopper = exceptionnel, pas habitude.'},

  {title:'Subway — Le Sub Parfait',category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:true,photo_gradient:'linear-gradient(135deg,#001a00,#228B22)',membership_required:'cookbook',
    ingredients:[],
    steps:['PAIN : 9 grains > Italien > Honey oat. 200-230kcal/30cm.','PROTÉINE : Grilled chicken / Turkey. Évite : meatball.','FROMAGE : Skip ou demi. -80kcal.','LÉGUMES : TOUS. Free.','SAUCE : Moutarde / Vinaigre. Évite : ranch, mayo (+150kcal).'],
    substitutions:[],coach_note:'Subway = ton ami. Sub poulet + légumes + moutarde = 400-450kcal repas équilibré.'},

  {title:'Café Algérois — Tasses et Macros',category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#0a0800,#3D2B1F)',membership_required:'cookbook',
    ingredients:[],
    steps:['CAFÉ NOIR : 5kcal. Sucre = +20kcal/cuillère.','CAFÉ AU LAIT : 60-80kcal.','CAPPUCCINO : 100-120kcal. +200 si sirop.','THÉ MENTHE : 80-120kcal (sucre). Demande sans.','EAU 50cl : Toujours avec ta boisson.'],
    substitutions:[],coach_note:'3-4 cafés sucrés = 200-300 kcal invisibles. Noir + édulcorant.'},

  {title:'Pâtisserie Orientale — Pires et Meilleurs',category:'Eating Out',meal_type:'guide',goal_tag:'fat_loss',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[],
    steps:['MAKROUD : 130-150kcal. OK.','BAKLAWA : 100-120kcal. 2 max.','DZIRIYAT : 70-90kcal. La moins pire.','M\'HANNCHA : 200-250kcal. À éviter en cut.','GHRIBIYA : 80-100kcal. Sablés gras mais petits.'],
    substitutions:[],coach_note:'1-2x/semaine OK. 3+ par jour de mariage = catastrophe.'},

  {title:'Pizzeria Locale — Bien Choisir',category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#B22222)',membership_required:'cookbook',
    ingredients:[],
    steps:['MARGHERITA : 200-250kcal/part. La moins.','REINE : 280-320kcal/part. OK.','4 FROMAGES : 350-400kcal/part. À éviter.','AMÉRICAINE : 350-400kcal. Calorique mais OK occasion.','TIRAMISU : 350-450kcal. Pas en dessert si pizza.'],
    substitutions:[],coach_note:'Margherita ou Reine, 3 parts max, salade. 1x/semaine sans problème.'},

  {title:'Rôtisserie — Le Vrai Choix Sain',category:'Eating Out',meal_type:'guide',goal_tag:'fat_loss',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:true,photo_gradient:'linear-gradient(135deg,#1a0800,#FF8C00)',membership_required:'cookbook',
    ingredients:[],
    steps:['POULET RÔTI 1/4 : 250-300kcal / 35P. EXCELLENT.','SANS PEAU : -100kcal.','SALADE VERTE : 50-100kcal.','RIZ : 250-300kcal/portion.','SAUCE AIL : 200-300kcal. Limiter.'],
    substitutions:[],coach_note:'LE meilleur fast food. 1/4 poulet sans peau + salade + petit riz = 500kcal de qualité.'},

  {title:'Restaurant Italien — Naviguer la Carte',category:'Eating Out',meal_type:'guide',goal_tag:'all',craving_tag:'guide',prep_time:0,difficulty:1,total_calories:0,total_protein:0,total_carbs:0,total_fat:0,featured:false,photo_gradient:'linear-gradient(135deg,#001a00,#006400)',membership_required:'cookbook',
    ingredients:[],
    steps:['ENTRÉE : Caprese 250 > Bruschetta 200kcal.','PÂTES : Primavera < Carbonara < 4 fromages.','PIZZA : Margherita < Reine < toppings multiples.','PROTÉINE : Milanaise > Tagliata (grillée).','TIRAMISU : 350-400kcal. Partager.'],
    substitutions:[],coach_note:'1 entrée + 1 plat. Saute le dessert. L\'huile du pain table = piège silencieux.'},

  // 🍽 ALGERIAN CLASSICS (10)
  {title:'Couscous Méchoui Maigre',category:'Algerian Classics',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:30,difficulty:3,total_calories:545,total_protein:48,total_carbs:62,total_fat:12,featured:false,photo_gradient:'linear-gradient(135deg,#1a0800,#A0522D)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'200g',calories:240,protein:44,carbs:0,fat:4},{name:'Couscous cru',quantity:'80g',calories:285,protein:9.6,carbs:59.2,fat:0.8},{name:'Tomates',quantity:'80g',calories:14,protein:0.7,carbs:3.1,fat:0.2},{name:"Huile d'olive",quantity:'6g',calories:54,protein:0,carbs:0,fat:6}],
    steps:['Mariner poulet : huile + paprika fumé + ail + cumin 30 min.','Four 200°C 25 min.','Semoule en parallèle.','Bouillon léger : tomates + oignon.','Servir : semoule + méchoui + bouillon + harissa.'],
    substitutions:[{original:'Poulet',alternative:'Vrai mouton'}],coach_note:'Le méchoui des fêtes — version poulet.'},

  {title:'Hrira Marocaine Algérienne',category:'Algerian Classics',meal_type:'dinner',goal_tag:'fat_loss',craving_tag:'chaud',prep_time:30,difficulty:3,total_calories:365,total_protein:32,total_carbs:48,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a0a00,#CD853F)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'120g',calories:144,protein:26.4,carbs:0,fat:2.4},{name:'Pois chiches cuits',quantity:'100g',calories:164,protein:8.9,carbs:27.4,fat:2.6},{name:'Tomates',quantity:'200g',calories:36,protein:1.8,carbs:7.8,fat:0.4},{name:'Riz cru',quantity:'15g',calories:54,protein:1.05,carbs:11.7,fat:0.15}],
    steps:['Poulet + oignon + céleri + persil.','Tomates + gingembre + curcuma.','1L eau + bouillon poulet.','Mijoter 20 min + pois chiches + riz.','Citron + coriandre.'],
    substitutions:[{original:'Pois chiches',alternative:'Lentilles 100g'}],coach_note:'La hrira marocaine — plat ultra complet.'},

  {title:'Mtwam Boulettes Sauce Blanche',category:'Algerian Classics',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:25,difficulty:2,total_calories:485,total_protein:42,total_carbs:38,total_fat:18,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#F5DEB3)',membership_required:'cookbook',
    ingredients:[{name:'Steak haché',quantity:'150g',calories:375,protein:39,carbs:0,fat:25.5},{name:'Vermicelles cru',quantity:'40g',calories:140,protein:4.8,carbs:28.8,fat:0.8},{name:'Pommes de terre',quantity:'80g',calories:64,protein:1.6,carbs:14.4,fat:0},{name:'Fromage frais 0%',quantity:'80g',calories:71,protein:6.9,carbs:3.4,fat:2.8},{name:'Œuf',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5}],
    steps:['Boulettes : steak + œuf + persil + sel.','Vermicelles à part al dente.','Sauce : oignon + cannelle + 500ml eau, boulettes 15 min.','PDT, cuire 10 min.','Fromage frais pour sauce blanche.'],
    substitutions:[{original:'Vermicelles',alternative:'Riz 40g'}],coach_note:'Le mtwam algérois — boulettes cannelle. Cuisine de mère.'},

  {title:'Charchara Couscous Sucré',category:'Algerian Classics',meal_type:'dinner',goal_tag:'all',craving_tag:'sucré',prep_time:20,difficulty:2,total_calories:425,total_protein:24,total_carbs:62,total_fat:10,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DEB887)',membership_required:'cookbook',
    ingredients:[{name:'Couscous cru',quantity:'80g',calories:285,protein:9.6,carbs:59.2,fat:0.8},{name:'Poulet',quantity:'100g',calories:120,protein:22,carbs:0,fat:2},{name:'Fromage frais 0%',quantity:'80g',calories:71,protein:6.9,carbs:3.4,fat:2.8},{name:'Beurre cacahuète',quantity:'5g',calories:30,protein:1.25,carbs:1,fat:2.5},{name:'Cannelle',quantity:'2g',calories:6,protein:0.2,carbs:1.6,fat:0.1}],
    steps:['Poulet + oignon + cannelle.','Semoule classique.','Poulet sur semoule.','Cannelle généreuse.','Fromage frais + raisins secs.'],
    substitutions:[{original:'Cannelle',alternative:'Ras el hanout'}],coach_note:'La charchara — couscous sucré-salé algérois. Surprenant.'},

  {title:'Galette Kabyle Œuf Tomate',category:'Algerian Classics',meal_type:'breakfast',goal_tag:'all',craving_tag:'salé',prep_time:15,difficulty:2,total_calories:395,total_protein:26,total_carbs:42,total_fat:14,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FFD700)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Œufs',quantity:'2 (120g)',calories:140,protein:12,carbs:2,fat:10},{name:'Tomates',quantity:'80g',calories:14,protein:0.7,carbs:3.1,fat:0.2},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4}],
    steps:['Pain ARRUPAN sur poêle sèche.','Œufs au plat.','Tomates râpées + sel + huile.','Servir : galette + œufs + tomates râpées.','Filet huile + sel.'],
    substitutions:[{original:'Pain ARRUPAN',alternative:'Vraies galettes kabyles'}],coach_note:'Le petit déj kabyle.'},

  {title:'Tahboul Salade Verte',category:'Algerian Classics',meal_type:'side',goal_tag:'fat_loss',craving_tag:'frais',prep_time:15,difficulty:1,total_calories:285,total_protein:24,total_carbs:18,total_fat:14,featured:false,photo_gradient:'linear-gradient(135deg,#001a00,#7CFC00)',membership_required:'cookbook',
    ingredients:[{name:'Thon naturel',quantity:'100g',calories:116,protein:26,carbs:0,fat:1},{name:'Tomates',quantity:'150g',calories:27,protein:1.4,carbs:5.9,fat:0.3},{name:'Concombre',quantity:'100g',calories:16,protein:0.7,carbs:3.6,fat:0.1},{name:"Huile d'olive",quantity:'8g',calories:72,protein:0,carbs:0,fat:8},{name:'Œuf dur',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5}],
    steps:['Tomates + concombre en mini dés.','Mélanger avec thon émietté.','Persil + menthe + oignon rouge.','Vinaigrette : huile + citron + sumac.','Œuf dur en quartiers.'],
    substitutions:[{original:'Thon',alternative:'Poulet froid 100g'}],coach_note:'Le tahboul — salade haché libano-algérienne.'},

  {title:'Soupe Frikha Maigre',category:'Algerian Classics',meal_type:'dinner',goal_tag:'fat_loss',craving_tag:'chaud',prep_time:20,difficulty:2,total_calories:295,total_protein:28,total_carbs:34,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'120g',calories:144,protein:26.4,carbs:0,fat:2.4},{name:'Frik cru',quantity:'30g',calories:105,protein:4.2,carbs:21,fat:0.6},{name:'Tomates',quantity:'100g',calories:18,protein:0.9,carbs:3.9,fat:0.2},{name:"Huile d'olive",quantity:'3g',calories:27,protein:0,carbs:0,fat:3}],
    steps:['Poulet + oignon + ail + ras el hanout.','Tomates 5 min.','1L eau + persil + sel, mijoter 10 min.','Frik 15 min jusqu\'à tendre.','Citron + menthe + coriandre.'],
    substitutions:[{original:'Frik',alternative:'Boulgour'}],coach_note:'La frikha — version aurassienne.'},

  {title:'Mhamssa Pâtes Couscous',category:'Algerian Classics',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:25,difficulty:2,total_calories:495,total_protein:42,total_carbs:62,total_fat:8,featured:false,photo_gradient:'linear-gradient(135deg,#1a0800,#A0522D)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'150g',calories:180,protein:33,carbs:0,fat:3},{name:'Pâtes cru',quantity:'80g',calories:280,protein:9.6,carbs:57.6,fat:1.6},{name:'Tomates',quantity:'150g',calories:27,protein:1.4,carbs:5.9,fat:0.3},{name:"Huile d'olive",quantity:'2g',calories:18,protein:0,carbs:0,fat:2}],
    steps:['Poulet + oignon + ail + paprika fort.','Tomates + 600ml eau.','Mijoter 15 min.','Mhamssa, cuire 10 min.','Persil + harissa.'],
    substitutions:[{original:'Mhamssa',alternative:'Pâtes courtes orientales'}],coach_note:'La mhamssa de Sétif — tradition constantinoise.'},

  {title:'Dolma Pommes de Terre Viande',category:'Algerian Classics',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:30,difficulty:3,total_calories:485,total_protein:42,total_carbs:48,total_fat:12,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[{name:'Steak haché',quantity:'150g',calories:375,protein:39,carbs:0,fat:25.5},{name:'Pommes de terre',quantity:'200g',calories:160,protein:4,carbs:36,fat:0},{name:'Riz cru',quantity:'30g',calories:108,protein:2.1,carbs:23.4,fat:0.3},{name:'Tomates',quantity:'100g',calories:18,protein:0.9,carbs:3.9,fat:0.2},{name:"Huile d'olive",quantity:'5g',calories:45,protein:0,carbs:0,fat:5}],
    steps:['Évider PDT (garder pulpe).','Farce : steak + riz cru + pulpe + oignon + œuf + épices.','Farcir PDT.','Cocotte sur lit tomates + eau.','Mijoter 30 min couvert.'],
    substitutions:[{original:'Bœuf',alternative:'Dinde hachée'}],coach_note:'La dolma PDT — encore plus dense.'},

  {title:'Plat Bouchaouia Légumes',category:'Algerian Classics',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:30,difficulty:3,total_calories:445,total_protein:42,total_carbs:48,total_fat:10,featured:false,photo_gradient:'linear-gradient(135deg,#0a1a00,#556B2F)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'180g',calories:216,protein:39.6,carbs:0,fat:3.6},{name:'Riz cru',quantity:'50g',calories:180,protein:3.5,carbs:39,fat:0.5},{name:'Pois chiches cuits',quantity:'80g',calories:131,protein:7.1,carbs:21.9,fat:2.1},{name:'Carottes',quantity:'80g',calories:33,protein:0.7,carbs:7.7,fat:0.2},{name:"Huile d'olive",quantity:'6g',calories:54,protein:0,carbs:0,fat:6}],
    steps:['Poulet + oignon + gingembre + safran.','Tomates + carottes + courgettes + navets.','1L eau, mijoter 20 min.','Pois chiches + riz.','Soupe-plat + citron.'],
    substitutions:[{original:'Safran',alternative:'Curcuma'}],coach_note:'Le bouchaouia constantinois — plat dominical.'},

  // 🍔 FAST FOOD (10)
  {title:'Whopper Maison Fit',category:'Fast Food Remakes',meal_type:'dinner',goal_tag:'muscle',craving_tag:'fast food',prep_time:15,difficulty:2,total_calories:585,total_protein:48,total_carbs:42,total_fat:25,featured:true,photo_gradient:'linear-gradient(135deg,#1a0000,#FF4500)',membership_required:'cookbook',
    ingredients:[{name:'Steak haché',quantity:'180g',calories:450,protein:46.8,carbs:0,fat:30.6},{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4},{name:'Tomates',quantity:'60g',calories:11,protein:0.5,carbs:2.3,fat:0.2}],
    steps:['Steak large et fin (Whopper).','Poêle 3 min/côté.','Pain toasté.','Sauce : fromage frais + mayo light + moutarde + relish.','Empiler.'],
    substitutions:[{original:'1 steak',alternative:'2 steaks fins (double)'}],coach_note:'Le Whopper — 300 kcal de moins. Sauce = tout.'},

  {title:'KFC Original Recipe Fit',category:'Fast Food Remakes',meal_type:'dinner',goal_tag:'all',craving_tag:'fast food',prep_time:20,difficulty:2,total_calories:425,total_protein:46,total_carbs:32,total_fat:12,featured:true,photo_gradient:'linear-gradient(135deg,#1a0000,#DC143C)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'200g',calories:240,protein:44,carbs:0,fat:4},{name:'Avoine mixée',quantity:'40g',calories:152,protein:5.2,carbs:24,fat:2.8},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:"Huile d'olive",quantity:'4g spray',calories:36,protein:0,carbs:0,fat:4}],
    steps:['Poulet en morceaux KFC.','Panure ÉPICÉE : avoine + 11 épices (paprika, sel, ail, oignon, poivre, thym, basilic, origan, céleri, gingembre, moutarde).','Œuf + panure double couche.','Spray huile, four 200°C 20 min.','Croustillant identique.'],
    substitutions:[{original:'Avoine',alternative:'Chapelure + farine maïs'}],coach_note:'Les 11 épices KFC. Au four = 60% moins de gras.'},

  {title:'Pizza Hut Stuffed Crust Fit',category:'Fast Food Remakes',meal_type:'dinner',goal_tag:'all',craving_tag:'fast food',prep_time:18,difficulty:2,total_calories:465,total_protein:38,total_carbs:42,total_fat:16,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#B22222)',membership_required:'cookbook',
    ingredients:[{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Fromage frais 0%',quantity:'120g',calories:107,protein:10.3,carbs:5.2,fat:4.2},{name:'Poulet',quantity:'120g',calories:144,protein:26.4,carbs:0,fat:2.4},{name:'Tomates',quantity:'60g',calories:11,protein:0.5,carbs:2.3,fat:0.2}],
    steps:['Pain ARRUPAN, bords repliés (stuffed crust).','Bords farcis fromage frais.','Reste fromage au centre.','Poulet précuit + tomates.','Four 200°C 12 min.'],
    substitutions:[{original:'Bords FF',alternative:'30g mozzarella +100kcal'}],coach_note:'La Stuffed Crust — bords farcis = détail qui change tout.'},

  {title:"Domino's Chicken Wings",category:'Fast Food Remakes',meal_type:'snack',goal_tag:'all',craving_tag:'fast food',prep_time:15,difficulty:1,total_calories:345,total_protein:38,total_carbs:8,total_fat:18,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#FF4500)',membership_required:'cookbook',
    ingredients:[{name:'Ailes de poulet',quantity:'200g',calories:340,protein:36,carbs:0,fat:22},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4},{name:"Huile d'olive",quantity:'2g',calories:18,protein:0,carbs:0,fat:2}],
    steps:['Mariner : paprika + ail + sel + cumin.','Four 200°C 25 min.','3 min avant fin : badigeonner sauce piquante.','Sauce piquante : harissa + miel + ail + citron.','Dip : fromage frais + ail + ciboule.'],
    substitutions:[{original:'Ailes peau',alternative:'Sans peau (plus light)'}],coach_note:'Les Buffalo wings — au four sans friture.'},

  {title:'Subway Meatball Fit',category:'Fast Food Remakes',meal_type:'lunch',goal_tag:'all',craving_tag:'fast food',prep_time:18,difficulty:2,total_calories:495,total_protein:46,total_carbs:42,total_fat:14,featured:false,photo_gradient:'linear-gradient(135deg,#1a0000,#8B0000)',membership_required:'cookbook',
    ingredients:[{name:'Steak haché',quantity:'150g',calories:375,protein:39,carbs:0,fat:25.5},{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Tomates',quantity:'100g',calories:18,protein:0.9,carbs:3.9,fat:0.2},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4}],
    steps:['6 mini boulettes 25g.','Poêle 5 min en roulant.','Sauce marinara : tomates + ail + basilic + origan.','Pocher boulettes 5 min.','Pain ARRUPAN + fromage frais.'],
    substitutions:[{original:'Bœuf',alternative:'Dinde hachée'}],coach_note:'Le Subway Meatball — maison plus protéiné.'},

  {title:'Chicken Caesar Wrap Fit',category:'Fast Food Remakes',meal_type:'lunch',goal_tag:'fat_loss',craving_tag:'fast food',prep_time:12,difficulty:1,total_calories:445,total_protein:46,total_carbs:38,total_fat:12,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#F0E68C)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'180g',calories:216,protein:39.6,carbs:0,fat:3.6},{name:'Pain ARRUPAN',quantity:'90g',calories:240,protein:8,carbs:44,fat:3},{name:'Fromage frais 0%',quantity:'50g',calories:45,protein:4.3,carbs:2.2,fat:1.8},{name:'Œuf dur',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5}],
    steps:['Poulet aux herbes italiennes.','Sauce César : fromage frais + œuf dur écrasé + moutarde + ail + citron + parmesan 5g.','Étaler sauce sur pain.','Poulet + salade + tomates.','Rouler serré.'],
    substitutions:[{original:'Sauce César',alternative:'Yaourt + ail + moutarde'}],coach_note:'Le wrap César — sauce maison sans mayo.'},

  {title:'Chicken Nuggets Style McDo',category:'Fast Food Remakes',meal_type:'lunch',goal_tag:'all',craving_tag:'fast food',prep_time:15,difficulty:2,total_calories:325,total_protein:36,total_carbs:18,total_fat:12,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FFD700)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'180g',calories:216,protein:39.6,carbs:0,fat:3.6},{name:'Avoine mixée',quantity:'25g',calories:95,protein:3.25,carbs:15,fat:1.75},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:"Huile d'olive",quantity:'3g spray',calories:27,protein:0,carbs:0,fat:3}],
    steps:['Hacher poulet finement au robot.','Boulettes plates 25g (forme nugget).','Panure : avoine + sel + paprika + ail.','Œuf + panure double.','Four 200°C 18 min.'],
    substitutions:[{original:'Hacher',alternative:'Poulet en morceaux (chunks)'}],coach_note:'Les nuggets McDo — sans conservateurs.'},

  {title:'Pad Thai Express Fit',category:'Fast Food Remakes',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:15,difficulty:2,total_calories:465,total_protein:38,total_carbs:52,total_fat:12,featured:true,photo_gradient:'linear-gradient(135deg,#1a0a00,#FF8C00)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'150g',calories:180,protein:33,carbs:0,fat:3},{name:'Pâtes cru',quantity:'60g',calories:210,protein:7.2,carbs:43.2,fat:1.2},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Beurre cacahuète',quantity:'5g',calories:30,protein:1.25,carbs:1,fat:2.5}],
    steps:['Pâtes très al dente, rincer.','Poulet en lamelles feu vif.','Pousser, brouiller œuf.','Sauce : soja + PB + ail + gingembre + lime + 30ml eau.','Mélanger + germes optionnel.'],
    substitutions:[{original:'Pâtes',alternative:'Nouilles riz pad thaï'}],coach_note:'Le pad thaï — version fit.'},

  {title:'Chinese Stir Fry Poulet',category:'Fast Food Remakes',meal_type:'dinner',goal_tag:'all',craving_tag:'chaud',prep_time:12,difficulty:1,total_calories:425,total_protein:42,total_carbs:48,total_fat:8,featured:false,photo_gradient:'linear-gradient(135deg,#1a0a00,#D2691E)',membership_required:'cookbook',
    ingredients:[{name:'Poulet',quantity:'180g',calories:216,protein:39.6,carbs:0,fat:3.6},{name:'Riz cru',quantity:'60g',calories:216,protein:4.2,carbs:46.8,fat:0.6},{name:'Poivrons',quantity:'100g',calories:23,protein:0.8,carbs:5.3,fat:0.3},{name:"Huile d'olive",quantity:'3g',calories:27,protein:0,carbs:0,fat:3}],
    steps:['Riz à part.','Poulet en lamelles, mariner soja + gingembre + ail.','Wok ultra chaud.','Sauter poulet + poivrons + brocoli 5 min.','Sauce : soja + miel + vinaigre + maïzena.'],
    substitutions:[{original:'Soja',alternative:'Tamari'}],coach_note:'Le stir fry chinois — wok ultra chaud = secret asiatique.'},

  {title:'Falafel Bowl Sans Friture',category:'Fast Food Remakes',meal_type:'lunch',goal_tag:'all',craving_tag:'fast food',prep_time:18,difficulty:2,total_calories:425,total_protein:24,total_carbs:48,total_fat:14,featured:false,photo_gradient:'linear-gradient(135deg,#001a00,#228B22)',membership_required:'cookbook',
    ingredients:[{name:'Pois chiches cuits',quantity:'200g',calories:328,protein:17.8,carbs:54.8,fat:5.2},{name:'Avoine mixée',quantity:'15g',calories:57,protein:1.95,carbs:9,fat:1.05},{name:'Œuf',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4},{name:'Pain ARRUPAN',quantity:'45g',calories:120,protein:4,carbs:22,fat:1.5}],
    steps:['Mixer pois chiches + avoine + œuf + ail + persil + cumin.','Boulettes plates.','Four 200°C 20 min.','Sauce tahini : fromage frais + tahini + citron + ail.','Bowl : pain + falafels + sauce + tomates + concombre.'],
    substitutions:[{original:'Tahini',alternative:'Beurre cacahuète'}],coach_note:'Le falafel sans friture — révélation.'},

  // 🍫 DESSERTS (10)
  {title:'Donut Protéiné Four',category:'Desserts',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:18,difficulty:2,total_calories:235,total_protein:14,total_carbs:30,total_fat:6,featured:true,photo_gradient:'linear-gradient(135deg,#1a0800,#FF6B9D)',membership_required:'cookbook',
    ingredients:[{name:'Avoine mixée',quantity:'40g',calories:152,protein:5.2,carbs:24,fat:2.8},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'60g',calories:53,protein:5.2,carbs:2.6,fat:2.1},{name:'Banane',quantity:'30g',calories:27,protein:0.3,carbs:6.9,fat:0}],
    steps:['Avoine en farine fine.','Œuf + fromage frais + banane + cannelle.','Moule à donuts ou ronds troués.','Four 180°C 15 min.','Glaçage : FF + cacao + édulcorant.'],
    substitutions:[{original:'Banane',alternative:'10g miel'}],coach_note:'Le donut Dunkin\' — au four. 700kcal de moins.'},

  {title:'Flan Light Caramel',category:'Desserts',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:25,difficulty:3,total_calories:185,total_protein:14,total_carbs:18,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DEB887)',membership_required:'cookbook',
    ingredients:[{name:'Œufs',quantity:'2 (120g)',calories:140,protein:12,carbs:2,fat:10},{name:'Lait écrémé',quantity:'200ml',calories:70,protein:7,carbs:10,fat:0.2},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4},{name:'Miel',quantity:'5g',calories:15,protein:0,carbs:4,fat:0}],
    steps:['Caramel : 5g miel + 2cs eau, doré.','Ramequins.','Œufs + lait + FF + vanille.','Verser sur caramel.','Bain-marie 35 min 160°C. Frigo 4h.'],
    substitutions:[{original:'Lait écrémé',alternative:'Lait coco light'}],coach_note:'Le flan caramel — 250 kcal de moins.'},

  {title:'Basbousa Fit Semoule Avoine',category:'Desserts',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:25,difficulty:2,total_calories:215,total_protein:10,total_carbs:34,total_fat:5,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#DAA520)',membership_required:'cookbook',
    ingredients:[{name:'Avoine mixée',quantity:'40g',calories:152,protein:5.2,carbs:24,fat:2.8},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'60g',calories:53,protein:5.2,carbs:2.6,fat:2.1},{name:'Banane',quantity:'40g',calories:36,protein:0.4,carbs:9.2,fat:0}],
    steps:['Avoine en farine grossière.','Œuf + FF + banane + 1cc fleur d\'oranger.','Petit plat.','Four 180°C 25 min.','Sirop : 5g miel + eau + citron.'],
    substitutions:[{original:'Banane',alternative:'5g miel + vanille'}],coach_note:'La basbousa — 60% moins de calories.'},

  {title:'Cake Citron Protéiné',category:'Desserts',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:30,difficulty:2,total_calories:225,total_protein:12,total_carbs:30,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FFFF00)',membership_required:'cookbook',
    ingredients:[{name:'Avoine mixée',quantity:'40g',calories:152,protein:5.2,carbs:24,fat:2.8},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'60g',calories:53,protein:5.2,carbs:2.6,fat:2.1},{name:'Citron',quantity:'1 zeste + jus',calories:15,protein:0.5,carbs:5,fat:0}],
    steps:['Avoine + œuf + FF + zeste + jus.','Levure chimique.','Moule individuel.','Four 175°C 25 min.','Glaçage : FF + zeste + édulcorant.'],
    substitutions:[{original:'Citron',alternative:'Orange'}],coach_note:'Le cake citron — sans sucre raffiné.'},

  {title:'Coulant Chocolat Cœur Fondant',category:'Desserts',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:15,difficulty:3,total_calories:195,total_protein:14,total_carbs:18,total_fat:7,featured:true,photo_gradient:'linear-gradient(135deg,#0a0000,#1a0000)',membership_required:'cookbook',
    ingredients:[{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Fromage frais 0%',quantity:'80g',calories:71,protein:6.9,carbs:3.4,fat:2.8},{name:'Cacao',quantity:'15g',calories:37,protein:1.5,carbs:5.3,fat:1.2},{name:'Banane',quantity:'20g',calories:18,protein:0.2,carbs:4.6,fat:0}],
    steps:['Œuf + FF + cacao + banane.','Ramequin + pépites chocolat noir centre.','Four 220°C 8 min EXACTEMENT.','Extérieur cuit, intérieur coulant.','Démouler immédiatement.'],
    substitutions:[{original:'Banane',alternative:'5g miel'}],coach_note:'Le coulant de chef. 8 min pas plus.'},

  {title:'Tarte Pomme Cannelle Light',category:'Desserts',meal_type:'snack',goal_tag:'all',craving_tag:'sucré',prep_time:35,difficulty:2,total_calories:245,total_protein:8,total_carbs:42,total_fat:6,featured:false,photo_gradient:'linear-gradient(135deg,#1a0a00,#CD853F)',membership_required:'cookbook',
    ingredients:[{name:'Pomme',quantity:'200g',calories:104,protein:0,carbs:28,fat:0},{name:'Avoine mixée',quantity:'30g',calories:114,protein:3.9,carbs:18,fat:2.1},{name:'Œuf',quantity:'1/2 (30g)',calories:35,protein:3,carbs:0.5,fat:2.5},{name:'Fromage frais 0%',quantity:'40g',calories:36,protein:3.4,carbs:1.7,fat:1.4}],
    steps:['Pâte : avoine + œuf + 1cs eau. Tasser.','Four 10 min pré-cuire.','Pommes finement + cannelle + 3g miel.','Rosace sur pâte.','Four 25 min 180°C. Glaçage FF.'],
    substitutions:[{original:'Pommes',alternative:'Poires'}],coach_note:'La tarte aux pommes — sans beurre, sans sucre raffiné.'},

  {title:'Gateau Yaourt Banane',category:'Desserts',meal_type:'snack',goal_tag:'muscle',craving_tag:'sucré',prep_time:35,difficulty:1,total_calories:265,total_protein:14,total_carbs:42,total_fat:5,featured:false,photo_gradient:'linear-gradient(135deg,#1a0800,#DEB887)',membership_required:'cookbook',
    ingredients:[{name:'Avoine mixée',quantity:'50g',calories:190,protein:6.5,carbs:30,fat:3.5},{name:'Fromage frais 0%',quantity:'100g',calories:89,protein:8.6,carbs:4.3,fat:3.5},{name:'Banane',quantity:'100g',calories:89,protein:1,carbs:23,fat:0},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5}],
    steps:['Avoine + FF + banane + œuf.','Levure chimique.','Moule à cake.','Four 175°C 30 min.','Refroidir avant démoulage.'],
    substitutions:[{original:'Banane',alternative:'Compote pomme 100g'}],coach_note:'Le gâteau au yaourt — version musclée.'},

  {title:'Pots de Crème Vanille',category:'Desserts',meal_type:'snack',goal_tag:'fat_loss',craving_tag:'sucré',prep_time:15,difficulty:2,total_calories:165,total_protein:14,total_carbs:14,total_fat:5,featured:false,photo_gradient:'linear-gradient(135deg,#1a1000,#FAEBD7)',membership_required:'cookbook',
    ingredients:[{name:'Jaune œuf',quantity:'1 (20g)',calories:55,protein:2.7,carbs:0.5,fat:4.5},{name:'Lait écrémé',quantity:'150ml',calories:53,protein:5.25,carbs:7.5,fat:0.15},{name:'Fromage frais 0%',quantity:'60g',calories:53,protein:5.2,carbs:2.6,fat:2.1}],
    steps:['Jaune + lait tiède + FF + vanille gousse.','Pots individuels.','Bain-marie 100°C four 25 min.','Refroidir, frigo 4h.','Cacao avant service.'],
    substitutions:[{original:'Vanille',alternative:'Cacao'}],coach_note:'Les pots de crème — élégance française.'},

  {title:'Cookies Géants Chocolat',category:'Desserts',meal_type:'snack',goal_tag:'muscle',craving_tag:'sucré',prep_time:15,difficulty:1,total_calories:285,total_protein:14,total_carbs:32,total_fat:11,featured:false,photo_gradient:'linear-gradient(135deg,#1a0800,#8B4513)',membership_required:'cookbook',
    ingredients:[{name:"Flocons d'avoine",quantity:'40g',calories:152,protein:5.2,carbs:24,fat:2.8},{name:'Beurre cacahuète',quantity:'15g',calories:90,protein:3.75,carbs:3,fat:7.5},{name:'Œuf',quantity:'1 (60g)',calories:70,protein:6,carbs:1,fat:5},{name:'Banane',quantity:'40g',calories:36,protein:0.4,carbs:9.2,fat:0},{name:'Cacao',quantity:'5g',calories:12,protein:0.5,carbs:1.8,fat:0.4}],
    steps:['Mélanger tout.','Pépites chocolat noir 5g optionnel.','1 ÉNORME cookie.','Four 175°C 15 min.','Refroidir 5 min — croustillant après.'],
    substitutions:[{original:'Cacao',alternative:'Cannelle'}],coach_note:'Le cookie XXL — plus impressionnant que 3 petits.'},

  {title:'Affogato Café Glace Banane',category:'Desserts',meal_type:'snack',goal_tag:'fat_loss',craving_tag:'frais',prep_time:5,difficulty:1,total_calories:185,total_protein:12,total_carbs:30,total_fat:3,featured:false,photo_gradient:'linear-gradient(135deg,#0a0800,#3D2B1F)',membership_required:'cookbook',
    ingredients:[{name:'Banane congelée',quantity:'120g',calories:107,protein:1.2,carbs:27.6,fat:0},{name:'Fromage frais 0%',quantity:'80g',calories:71,protein:6.9,carbs:3.4,fat:2.8},{name:'Café espresso',quantity:'30ml',calories:5,protein:0.3,carbs:0.5,fat:0}],
    steps:['Espresso fort chaud.','Mixer banane congelée + FF pour glace.','Glace dans verre.','Verser espresso CHAUD dessus.','Effet affogato italien.'],
    substitutions:[{original:'Banane',alternative:'Mangue congelée'}],coach_note:"L'affogato italien — contraste chaud-froid fascinant."}
];

async function main(){
  console.log(`\n🍳  BATCH 4 FINAL — Adding ${RECIPES.length} recipes — Reaching 200!\n`);
  let inserted = 0;
  for(let i=0;i<RECIPES.length;i+=10){
    const batch = RECIPES.slice(i,i+10);
    const ins = await q('POST','cookbook_recipes',batch);
    if(!ins.ok){
      console.error(`❌ Batch ${i/10+1}: ${ins.status}`,JSON.stringify(ins.data?.message||ins.data));
    } else {
      const rows = Array.isArray(ins.data)?ins.data:[];
      rows.forEach(r=>console.log(`  ✅ ${r.title}`));
      inserted += rows.length;
    }
  }
  console.log(`\n🎉  Batch 4 done — ${inserted}/${RECIPES.length} recipes added.`);
  console.log(`\n🏆  COOKBOOK COMPLETE — 200 recipes deployed.\n`);
}
main().catch(e=>{console.error(e);process.exit(1);});
