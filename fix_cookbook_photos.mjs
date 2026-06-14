// fix_cookbook_photos.mjs — keyword-mapped photo assignment.
// Re-uses photo IDs from the known-good pool (already loading in production).
// Reverts SB_KEY to placeholder after run.
const SB_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SB_KEY = 'YOUR_SERVICE_ROLE_KEY_HERE';
const H = {'Content-Type':'application/json','apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Prefer':'return=representation'};
const q = async (m,p,b) => {
  const r = await fetch(`${SB_URL}/rest/v1/${p}`,{method:m,headers:H,body:b?JSON.stringify(b):undefined});
  return {ok:r.ok,status:r.status,data:await r.json().catch(()=>null)};
};

// Photo banks — all IDs reused from the previously-loaded CATEGORY_PHOTOS map.
const P = {
  // Breakfast staples
  oats:       ['photo-1484723091739-30a097e8f929','photo-1517673400267-0251440c45dc'],
  pancake:    ['photo-1504674900247-0877df9cc836','photo-1517673400267-0251440c45dc'],
  eggs:       ['photo-1525351484163-7529414344d8','photo-1490323526832-41a3af5c3d30'],
  toast:      ['photo-1490323526832-41a3af5c3d30','photo-1525351484163-7529414344d8'],
  yogurt:     ['photo-1517673400267-0251440c45dc','photo-1484723091739-30a097e8f929'],
  smoothie:   ['photo-1565958011703-44f9829ba187','photo-1546069901-ba9599a7e63c'],

  // Algerian classics
  shakshuka:  ['photo-1604329760661-e71dc83f8f26','photo-1525351484163-7529414344d8'],
  tajine:     ['photo-1547592166-23ac45744acd','photo-1601050690597-df0568f70950','photo-1604329760661-e71dc83f8f26'],
  couscous:   ['photo-1541518763669-27fef04b14ea','photo-1604329760661-e71dc83f8f26','photo-1601050690597-df0568f70950'],
  bourek:     ['photo-1601050690597-df0568f70950','photo-1547592166-23ac45744acd'],
  chorba:     ['photo-1559181567-c3190bac0f08','photo-1547592166-23ac45744acd','photo-1590779033100-9f17a1ba4b94'],
  rechta:     ['photo-1547592166-23ac45744acd','photo-1601050690597-df0568f70950'],
  dolma:      ['photo-1547592166-23ac45744acd','photo-1604329760661-e71dc83f8f26'],
  mhajeb:     ['photo-1504674900247-0877df9cc836','photo-1490323526832-41a3af5c3d30'],
  lentilles:  ['photo-1547592166-23ac45744acd','photo-1559181567-c3190bac0f08'],
  loubia:     ['photo-1547592166-23ac45744acd','photo-1601050690597-df0568f70950'],
  brochette:  ['photo-1547592166-23ac45744acd','photo-1574894709920-11b28e7367e3'],

  // Sweets / desserts
  cheesecake: ['photo-1606313564200-e75d5e30476c','photo-1499636136210-6f4ee915583e'],
  mousse:     ['photo-1606313564200-e75d5e30476c','photo-1499636136210-6f4ee915583e'],
  tiramisu:   ['photo-1606313564200-e75d5e30476c','photo-1533134242443-d4fd215305ad'],
  cookies:    ['photo-1499636136210-6f4ee915583e','photo-1606313564200-e75d5e30476c'],
  brownie:    ['photo-1606313564200-e75d5e30476c','photo-1511381939415-e44571e3eb2e'],
  cake:       ['photo-1499636136210-6f4ee915583e','photo-1606313564200-e75d5e30476c','photo-1558961363-fa8fdf82db35'],
  glace:      ['photo-1499636136210-6f4ee915583e','photo-1533134242443-d4fd215305ad'],
  pudding:    ['photo-1533134242443-d4fd215305ad','photo-1606313564200-e75d5e30476c'],
  flan:       ['photo-1533134242443-d4fd215305ad','photo-1606313564200-e75d5e30476c'],
  tarte:      ['photo-1499636136210-6f4ee915583e','photo-1606313564200-e75d5e30476c'],
  crumble:    ['photo-1499636136210-6f4ee915583e','photo-1606313564200-e75d5e30476c'],
  truffes:    ['photo-1558961363-fa8fdf82db35','photo-1499636136210-6f4ee915583e'],
  oriental:   ['photo-1558961363-fa8fdf82db35','photo-1606313564200-e75d5e30476c'],
  coffee:     ['photo-1606313564200-e75d5e30476c','photo-1499636136210-6f4ee915583e'],

  // Fast food
  burger:     ['photo-1568901346375-23c9450c58cd','photo-1550317138-10000687a72b'],
  pizza:      ['photo-1565299624946-b28f40a0ae38','photo-1568901346375-23c9450c58cd'],
  hotdog:     ['photo-1562967914-608f82629710'],
  kebab:      ['photo-1565299624946-b28f40a0ae38','photo-1547592166-23ac45744acd'],
  wrap:       ['photo-1565958011703-44f9829ba187','photo-1509722747041-616f39b57569'],
  tacos:      ['photo-1565299624946-b28f40a0ae38','photo-1565958011703-44f9829ba187'],
  sandwich:   ['photo-1509722747041-616f39b57569','photo-1568901346375-23c9450c58cd'],
  nuggets:    ['photo-1562967914-608f82629710','photo-1568901346375-23c9450c58cd'],
  lasagne:    ['photo-1550317138-10000687a72b','photo-1568901346375-23c9450c58cd'],
  mac:        ['photo-1568901346375-23c9450c58cd','photo-1551248429-40975aa4de74'],
  bagel:      ['photo-1490323526832-41a3af5c3d30','photo-1509722747041-616f39b57569'],

  // Mains
  pasta:      ['photo-1551248429-40975aa4de74','photo-1546069901-ba9599a7e63c'],
  rice:       ['photo-1603133872878-684f208fb84b','photo-1509722747041-616f39b57569'],
  steak:      ['photo-1574894709920-11b28e7367e3','photo-1432139555190-58524dae6a55'],
  fish:       ['photo-1535400255456-984e8a1a1b8a','photo-1546069901-ba9599a7e63c'],
  chicken:    ['photo-1547592166-23ac45744acd','photo-1574894709920-11b28e7367e3','photo-1603133872878-684f208fb84b'],
  stirfry:    ['photo-1509722747041-616f39b57569','photo-1546069901-ba9599a7e63c'],

  // Cold/fresh
  poke:       ['photo-1546069901-ba9599a7e63c','photo-1535400255456-984e8a1a1b8a'],
  raw:        ['photo-1535400255456-984e8a1a1b8a','photo-1546069901-ba9599a7e63c'],
  salad:      ['photo-1546069901-ba9599a7e63c','photo-1512621776951-a57141f2eefd'],
  bowl:       ['photo-1546069901-ba9599a7e63c','photo-1603133872878-684f208fb84b'],

  // Restaurant guides
  resto:      ['photo-1517248135467-4c7edcad34c4','photo-1414235077428-338989a2e8c0','photo-1552566626-52f8b828a9b6','photo-1537047902294-62a40c20a6ae','photo-1424847651672-bf20a4b0982b'],
};

// Ordered priority — first match wins. Specific terms first, generic last.
// Each rule: [regex (case-insensitive, accent-stripped), photo bank key]
const RULES = [
  // Restaurant/store guides
  [/mcdo|kfc|burger king|domino|subway|pizza hut|pizzeria|rotisserie|restaurant|cafe algerois|cafe algerois|patisserie orientale|fast food algerie|cafe et patisserie|manger au restaurant|mariage et fete/i, 'resto'],

  // Algerian classics (specific terms first)
  [/shakshuka|chakhchoukha/i, 'shakshuka'],
  [/tajine|chtitha|tagine/i, 'tajine'],
  [/couscous|seksou|mhamssa|charchara/i, 'couscous'],
  [/chorba|hrira|soupe frikha|soupe poulet|soupe ramadan|soupe froide|lablabi|soupe pois chiches/i, 'chorba'],
  [/bourek|sambousek|brick|sfenj/i, 'bourek'],
  [/rechta|tlitli|berkoukes|frikha|trida|mhamssa/i, 'rechta'],
  [/dolma|mehchi/i, 'dolma'],
  [/mhajeb|msemen|baghrir|galette kabyle|pain arrupan|f'tor light/i, 'mhajeb'],
  [/lentilles|loubia/i, 'lentilles'],
  [/brochette|mtwam|boulettes|chtitha|pkaila|maakouda|tahboul|hmiss|tabouleh|salade mechouia|chermoula|chakhchoukha|bouchaouia/i, 'chicken'],
  [/mhalbi|basbousa|makroud|zlabia|datte|truffes datte|energy ball|donut/i, 'oriental'],

  // Sweets/desserts (specific)
  [/cheesecake/i, 'cheesecake'],
  [/tiramisu|trifle|affogato/i, 'tiramisu'],
  [/mousse/i, 'mousse'],
  [/brownie/i, 'brownie'],
  [/cookie/i, 'cookies'],
  [/mug cake|cake citron|cake banane|banana bread|gateau yaourt|gateau mug|coulant|cake citron protein/i, 'cake'],
  [/glace|nice cream|sorbet|yaourt glace|granité|frozen/i, 'glace'],
  [/pudding|chia/i, 'pudding'],
  [/flan|panna cotta|pots de creme|mhalbi|basbousa/i, 'flan'],
  [/tarte|cake pomme|crumble|souffle/i, 'tarte'],
  [/truffes|energy ball/i, 'truffes'],

  // Breakfasts
  [/avoine|oat|overnight|granola|porridge|bowl avoine|flocons/i, 'oats'],
  [/pancake|crepe|crepes|pain perdu|baghrir|french toast/i, 'pancake'],
  [/omelette|oeufs|oeuf|shakshuka blanche|benedicte|cocotte|brouille|brouilles|sloppy/i, 'eggs'],
  [/toast|pain|sandwich club|bagel/i, 'toast'],
  [/yaourt|cottage|fromage frais bowl/i, 'yogurt'],
  [/smoothie/i, 'smoothie'],

  // Fast food
  [/big mac|mcchicken|whopper|cheeseburger|burger|sloppy joe|hamburger/i, 'burger'],
  [/pizza|calzone/i, 'pizza'],
  [/hot dog/i, 'hotdog'],
  [/kebab|shawarma/i, 'kebab'],
  [/wrap|fajita|burrito|quesadilla/i, 'wrap'],
  [/tacos|taco/i, 'tacos'],
  [/sandwich|club|croque|sub|subway|panini|baguette/i, 'sandwich'],
  [/nuggets|strips|chicken wing|wings|chicken nuggets/i, 'nuggets'],
  [/lasagne|lasagna/i, 'lasagne'],
  [/mac and cheese|mac n cheese|mac & cheese/i, 'mac'],
  [/bagel/i, 'bagel'],

  // Cold/fresh
  [/poke/i, 'poke'],
  [/ceviche|tartare|carpaccio|cru/i, 'raw'],
  [/salade|salad|nicoise|cesar|caesar|tahboul|tabouleh/i, 'salad'],

  // Mains
  [/pasta|pates|carbonara|bolognaise|spaghetti|pad thai/i, 'pasta'],
  [/riz|rice|cantonais/i, 'rice'],
  [/steak|boeuf|hamburger steak|sloppy|tartare boeuf/i, 'steak'],
  [/saumon|poisson|thon|crevettes|crevette|filet de poisson/i, 'fish'],
  [/stir fry|chinois|nouilles asiatiques/i, 'stirfry'],
  [/falafel/i, 'chicken'], // re-use chicken bank for falafel

  // Bowls + chicken catch-alls
  [/bowl/i, 'bowl'],
  [/poulet|dinde|escalope|chicken/i, 'chicken'],
];

const DEFAULT_PHOTO = 'photo-1504674900247-0877df9cc836';

function stripAccents(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,''); }

function pickPhotoId(title){
  const norm = stripAccents(title).toLowerCase();
  for(const [re, key] of RULES){
    if(re.test(norm)){
      const photos = P[key] || [DEFAULT_PHOTO];
      const hash = title.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
      return photos[hash % photos.length];
    }
  }
  return DEFAULT_PHOTO;
}

async function main(){
  console.log('\n📸 Fixing cookbook photos (keyword-mapped)...\n');
  const res = await q('GET','cookbook_recipes?select=id,title,category&limit=300');
  if(!res.ok){console.error('Fetch failed:',res.data);process.exit(1);}
  const recipes = res.data||[];
  console.log(`Found ${recipes.length} recipes\n`);

  const matchCounts = {};
  let updated = 0;

  for(const recipe of recipes){
    const photoId = pickPhotoId(recipe.title);
    const photoUrl = `https://images.unsplash.com/${photoId}?w=600&q=80&fit=crop`;
    const upd = await q('PATCH',`cookbook_recipes?id=eq.${recipe.id}`,{photo_url:photoUrl});
    if(upd.ok || upd.status===204){
      console.log(`  ✅ ${recipe.title.padEnd(50)} → ${photoId.slice(6,16)}…`);
      updated++;
      matchCounts[photoId]=(matchCounts[photoId]||0)+1;
    } else {
      console.log(`  ❌ ${recipe.title} (${upd.status})`);
    }
    await new Promise(r=>setTimeout(r,40));
  }

  console.log(`\n🎉 Done — ${updated}/${recipes.length} photos updated.`);
  console.log(`Unique photos used: ${Object.keys(matchCounts).length}`);
}
main().catch(e=>{console.error(e);process.exit(1);});
