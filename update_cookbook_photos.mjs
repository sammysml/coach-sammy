const SB_URL = 'https://korektlpnwuefsagfuvq.supabase.co';
const SB_KEY = 'YOUR_SERVICE_ROLE_KEY_HERE';
const H = {'Content-Type':'application/json','apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Prefer':'return=representation'};
const q = async (m,p,b) => { const r = await fetch(`${SB_URL}/rest/v1/${p}`,{method:m,headers:H,body:b?JSON.stringify(b):undefined}); return {ok:r.ok,status:r.status,data:await r.json().catch(()=>null)}; };

const CATEGORY_PHOTOS = {
  'Breakfasts': ['photo-1525351484163-7529414344d8','photo-1504674900247-0877df9cc836','photo-1484723091739-30a097e8f929','photo-1517673400267-0251440c45dc','photo-1490323526832-41a3af5c3d30'],
  'Fast Food Remakes': ['photo-1568901346375-23c9450c58cd','photo-1550317138-10000687a72b','photo-1562967914-608f82629710','photo-1509722747041-616f39b57569','photo-1565299624946-b28f40a0ae38'],
  'Algerian Classics': ['photo-1541518763669-27fef04b14ea','photo-1604329760661-e71dc83f8f26','photo-1547592166-23ac45744acd','photo-1601050690597-df0568f70950','photo-1563379926898-05f4575a45d8'],
  'Desserts': ['photo-1511381939415-e44571e3eb2e','photo-1499636136210-6f4ee915583e','photo-1606313564200-e75d5e30476c','photo-1533134242443-d4fd215305ad','photo-1558961363-fa8fdf82db35'],
  'Summer Shred': ['photo-1546069901-ba9599a7e63c','photo-1512621776951-a57141f2eefd','photo-1535400255456-984e8a1a1b8a','photo-1565958011703-44f9829ba187','photo-1551248429-40975aa4de74'],
  'Lean Bulk': ['photo-1546069901-ba9599a7e63c','photo-1568901346375-23c9450c58cd','photo-1574894709920-11b28e7367e3','photo-1563379926898-05f4575a45d8','photo-1432139555190-58524dae6a55'],
  'Ramadan': ['photo-1547592166-23ac45744acd','photo-1601050690597-df0568f70950','photo-1558961363-fa8fdf82db35','photo-1559181567-c3190bac0f08','photo-1590779033100-9f17a1ba4b94'],
  'Eating Out': ['photo-1517248135467-4c7edcad34c4','photo-1414235077428-338989a2e8c0','photo-1552566626-52f8b828a9b6','photo-1537047902294-62a40c20a6ae','photo-1424847651672-bf20a4b0982b'],
  '15 Min Meals': ['photo-1603133872878-684f208fb84b','photo-1546069901-ba9599a7e63c','photo-1563379926898-05f4575a45d8','photo-1509722747041-616f39b57569','photo-1510693206972-df098062cb71'],
};

async function main(){
  console.log('\n📸 Updating cookbook photos...\n');
  const res = await q('GET','cookbook_recipes?select=id,title,category&limit=300');
  if(!res.ok){console.error('Failed:',res.data);process.exit(1);}
  const recipes = res.data||[];
  console.log(`Found ${recipes.length} recipes\n`);
  let updated=0;
  for(const recipe of recipes){
    const photos = CATEGORY_PHOTOS[recipe.category]||['photo-1504674900247-0877df9cc836'];
    const hash = recipe.title.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
    const photoId = photos[hash%photos.length];
    const photoUrl = `https://images.unsplash.com/${photoId}?w=600&q=80&fit=crop`;
    const upd = await q('PATCH',`cookbook_recipes?id=eq.${recipe.id}`,{photo_url:photoUrl});
    if(upd.ok||upd.status===204){console.log(`  ✅ ${recipe.title}`);updated++;}
    else{console.log(`  ❌ ${recipe.title}`);}
    await new Promise(r=>setTimeout(r,50));
  }
  console.log(`\n🎉 Done — ${updated} photos updated\n`);
}
main().catch(e=>{console.error(e);process.exit(1);});
