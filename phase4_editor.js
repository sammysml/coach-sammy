// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PHASE 4 — SESSION EDITOR
// Depends on Phase 3 (renderMuscleSvg + MUSCLE_LABELS_FR)
// Depends on globals: sb (supabase client), CC (coach client cache),
//                     coachClients (array)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let _seState=null;          // session being edited
let _seLibCache=null;       // cached exercise_library
let _seAcTimer=null;        // autocomplete debounce
let _seAcOpenFor=null;      // index of exercise whose autocomplete is open
let _seClientId=null;       // client we're building for

const SE_CATEGORIES=[
  {slug:'push',label:'Push'},{slug:'pull',label:'Pull'},{slug:'legs',label:'Jambes'},
  {slug:'upper',label:'Haut'},{slug:'lower',label:'Bas'},{slug:'full',label:'Full body'},
  {slug:'core',label:'Core'},{slug:'cardio',label:'Cardio'},{slug:'mobility',label:'Mobilité'}
];
const SE_GOALS=[
  {slug:'force',label:'Force'},{slug:'hypertrophie',label:'Hypertrophie'},
  {slug:'endurance',label:'Endurance'},{slug:'seche',label:'Sèche'},
  {slug:'volume',label:'Volume'},{slug:'maintien',label:'Maintien'}
];
const SE_MUSCLE_SLUGS=[
  'chest','deltoids','biceps','triceps','forearm','abs','obliques','trapezius',
  'upper-back','lower-back','quadriceps','hamstring','gluteal','calves','adductors','tibialis'
];

async function seOpenEditor(clientId, sessionId){
  _seClientId=clientId;
  if(sessionId){
    const {data}=await sb.from('training_sessions').select('*').eq('id',sessionId).single();
    if(!data){seToast('Séance introuvable','err');return;}
    _seState={
      id:data.id,
      name:data.name||'',
      category:data.category||'',
      goal:data.goal||'',
      duration_min:data.duration_min||45,
      difficulty:data.difficulty||2,
      muscle_groups:Array.isArray(data.muscle_groups)?data.muscle_groups:[],
      coach_note:data.coach_note||'',
      exercises:Array.isArray(data.exercises)?data.exercises:[],
      status:data.status||'draft',
      featured:!!data.featured,
      order_index:data.order_index||0,
      photo_gradient:data.photo_gradient||''
    };
  } else {
    _seState={
      id:null,name:'',category:'',goal:'',duration_min:45,difficulty:2,
      muscle_groups:[],coach_note:'',exercises:[],
      status:'draft',featured:false,order_index:0,photo_gradient:''
    };
  }
  if(!document.getElementById('se-overlay')){
    const ov=document.createElement('div');
    ov.id='se-overlay';
    ov.className='se-overlay';
    document.body.appendChild(ov);
  }
  if(!_seLibCache){
    try{const {data:lib}=await sb.from('exercise_library').select('*').order('name_fr');_seLibCache=lib||[];}
    catch(e){_seLibCache=[];}
  }
  document.getElementById('se-overlay').classList.add('se-open');
  document.body.style.overflow='hidden';
  seRender();
}

function seClose(){
  const ov=document.getElementById('se-overlay');
  if(ov)ov.classList.remove('se-open');
  document.body.style.overflow='';
  _seState=null;_seClientId=null;_seAcOpenFor=null;
}

function seEscape(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function seRender(){
  const ov=document.getElementById('se-overlay');if(!ov||!_seState)return;
  const s=_seState;
  const isEdit=!!s.id;
  ov.innerHTML=`
    <div class="se-topbar">
      <button class="se-close" onclick="seClose()" aria-label="Fermer">✕</button>
      <div class="se-title">${isEdit?'Modifier séance':'Nouvelle séance'}</div>
      <span class="se-status-pill ${s.status==='published'?'se-status-pub':'se-status-draft'}">${s.status==='published'?'Publié':'Brouillon'}</span>
      <button class="se-btn se-btn-ghost" onclick="seSave('draft')">Brouillon</button>
      <button class="se-btn se-btn-gold" onclick="seSave('published')">Publier →</button>
    </div>
    <div class="se-body">

      <div class="se-section">
        <div class="se-section-label">Identité</div>
        <input class="se-input se-input-lg" id="se-name" placeholder="Séance A — Push" value="${seEscape(s.name)}" oninput="_seState.name=this.value"/>
        <div class="se-row" style="margin-top:14px">
          <div class="se-col">
            <div class="se-label">Catégorie</div>
            <div class="se-pills" id="se-cat-pills">
              ${SE_CATEGORIES.map(c=>`<button class="se-pill ${s.category===c.slug?'se-pill-on':''}" onclick="seSetCategory('${c.slug}')">${c.label}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="se-row" style="margin-top:14px">
          <div class="se-col">
            <div class="se-label">Objectif</div>
            <div class="se-pills" id="se-goal-pills">
              ${SE_GOALS.map(g=>`<button class="se-pill ${s.goal===g.slug?'se-pill-on':''}" onclick="seSetGoal('${g.slug}')">${g.label}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="se-row" style="margin-top:14px">
          <div class="se-col">
            <div class="se-label">Durée (min)</div>
            <input class="se-input" type="number" min="10" max="180" value="${s.duration_min}" oninput="_seState.duration_min=parseInt(this.value)||45"/>
          </div>
          <div class="se-col">
            <div class="se-label">Difficulté</div>
            <div class="se-difficulty">
              ${[1,2,3].map(n=>`<button class="se-diff-btn ${s.difficulty>=n?'se-on':''}" onclick="seSetDifficulty(${n})" aria-label="Difficulté ${n}">💪</button>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="se-section">
        <div class="se-section-label">Muscles ciblés</div>
        <div class="se-section-title">Anatomie de la séance</div>
        <div class="se-muscle-builder">
          <div id="se-svg-preview">${window.renderMuscleSvg?window.renderMuscleSvg(s.muscle_groups,{maxHeight:'320px'}):'<div style="padding:20px;color:#999;font-size:12px">renderMuscleSvg manquant (Phase 3)</div>'}</div>
          <div class="se-muscle-checks">
            ${SE_MUSCLE_SLUGS.map(slug=>{
              const lbl=(window.MUSCLE_LABELS_FR&&window.MUSCLE_LABELS_FR[slug])||slug;
              const on=s.muscle_groups.indexOf(slug)!==-1;
              return `<label class="se-mcheck ${on?'se-on':''}"><input type="checkbox" ${on?'checked':''} onchange="seToggleMuscle('${slug}')"/>${lbl}</label>`;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="se-section">
        <div class="se-section-label">Note coach</div>
        <div class="se-coach-note">
          <textarea class="se-textarea" placeholder="Ce que tu veux que ton client garde en tête pour cette séance — focus, technique, mindset…" oninput="_seState.coach_note=this.value">${seEscape(s.coach_note)}</textarea>
        </div>
      </div>

      <div class="se-section">
        <div class="se-section-label">Exercices · ${s.exercises.length}</div>
        <div class="se-section-title">Le programme</div>
        <div id="se-exercises">${seRenderExercises()}</div>
        <button class="se-add-ex" onclick="seAddExercise()">+ Ajouter un exercice</button>
      </div>

      ${isEdit?`<div style="text-align:center;margin-top:40px">
        <button class="se-btn se-btn-danger" onclick="seDelete()">Supprimer cette séance</button>
      </div>`:''}

    </div>
  `;
}

function seRenderExercises(){
  if(!_seState||!_seState.exercises.length)return '<div style="padding:24px;text-align:center;color:rgba(240,237,232,0.4);font-size:13px;font-style:italic">Aucun exercice. Clique sur « Ajouter un exercice » pour commencer.</div>';
  return _seState.exercises.map((ex,i)=>{
    const acOpen=_seAcOpenFor===i;
    return `<div class="se-exercise">
      <div class="se-exercise-hdr">
        <div class="se-exercise-num">${i+1}</div>
        <div class="se-exercise-search">
          <input class="se-input" placeholder="Tape pour chercher (ex: dévelop, squat, curl…)" value="${seEscape(ex.name||'')}" oninput="seAcInput(${i},this.value)" onfocus="seAcInput(${i},this.value)" onblur="setTimeout(()=>seAcClose(${i}),200)"/>
          ${acOpen?seRenderAutocomplete(i):''}
        </div>
        <button class="se-ex-del" onclick="seDeleteExercise(${i})" aria-label="Supprimer">×</button>
      </div>
      <div class="se-ex-fields">
        <div class="se-ex-field">
          <label class="se-ex-field-lbl">Séries</label>
          <input type="number" min="1" max="20" value="${ex.sets||3}" oninput="_seState.exercises[${i}].sets=parseInt(this.value)||3"/>
        </div>
        <div class="se-ex-field">
          <label class="se-ex-field-lbl">Reps</label>
          <input value="${seEscape(ex.reps||'8-12')}" oninput="_seState.exercises[${i}].reps=this.value" placeholder="8-12"/>
        </div>
        <div class="se-ex-field">
          <label class="se-ex-field-lbl">Charge</label>
          <input value="${seEscape(ex.weight_hint||'')}" oninput="_seState.exercises[${i}].weight_hint=this.value" placeholder="70kg / BW"/>
        </div>
        <div class="se-ex-field">
          <label class="se-ex-field-lbl">Repos (s)</label>
          <input type="number" min="0" max="600" value="${ex.rest_seconds||90}" oninput="_seState.exercises[${i}].rest_seconds=parseInt(this.value)||90"/>
        </div>
      </div>
    </div>`;
  }).join('');
}

function seRenderAutocomplete(idx){
  const q=(_seState.exercises[idx]&&_seState.exercises[idx].name||'').toLowerCase().trim();
  if(!_seLibCache||!_seLibCache.length)return '';
  const matches=q?_seLibCache.filter(e=>(e.name_fr||'').toLowerCase().includes(q)||(e.slug||'').toLowerCase().includes(q)).slice(0,8):_seLibCache.slice(0,8);
  if(!matches.length)return '<div class="se-autocomplete"><div style="padding:14px;color:rgba(240,237,232,0.4);font-size:12px;text-align:center">Aucun résultat</div></div>';
  return `<div class="se-autocomplete">
    ${matches.map(m=>{
      const cat=m.category?m.category.toUpperCase():'';
      const groups=Array.isArray(m.muscle_groups)?m.muscle_groups.slice(0,3).join(' · '):'';
      return `<div class="se-ac-item" onclick="seAcPick(${idx},'${m.slug}')">
        <div class="se-ac-name">${seEscape(m.name_fr||m.slug)}</div>
        <div class="se-ac-meta">${cat}${groups?' · '+seEscape(groups):''}</div>
      </div>`;
    }).join('')}
  </div>`;
}

function seSetCategory(slug){if(_seState){_seState.category=slug;seRender();}}
function seSetGoal(slug){if(_seState){_seState.goal=slug;seRender();}}
function seSetDifficulty(n){if(_seState){_seState.difficulty=n;seRender();}}
function seToggleMuscle(slug){
  if(!_seState)return;
  const i=_seState.muscle_groups.indexOf(slug);
  if(i===-1)_seState.muscle_groups.push(slug);
  else _seState.muscle_groups.splice(i,1);
  const prev=document.getElementById('se-svg-preview');
  if(prev&&window.renderMuscleSvg)prev.innerHTML=window.renderMuscleSvg(_seState.muscle_groups,{maxHeight:'320px'});
  document.querySelectorAll('.se-mcheck').forEach(el=>{
    const cb=el.querySelector('input');
    if(!cb)return;
    el.classList.toggle('se-on',cb.checked);
  });
}

function seAddExercise(){
  if(!_seState)return;
  _seState.exercises.push({name:'',sets:3,reps:'8-12',weight_hint:'',rest_seconds:90});
  seRender();
}
function seDeleteExercise(i){
  if(!_seState)return;
  if(!confirm('Supprimer cet exercice ?'))return;
  _seState.exercises.splice(i,1);
  seRender();
}

function seAcInput(i,val){
  if(!_seState||!_seState.exercises[i])return;
  _seState.exercises[i].name=val;
  _seAcOpenFor=i;
  const exDiv=document.getElementById('se-exercises');
  if(exDiv){
    exDiv.innerHTML=seRenderExercises();
    const inp=exDiv.querySelectorAll('.se-exercise-search input')[i];
    if(inp){inp.focus();inp.setSelectionRange(val.length,val.length);}
  }
}
function seAcClose(i){
  if(_seAcOpenFor===i){
    _seAcOpenFor=null;
    const exDiv=document.getElementById('se-exercises');
    if(exDiv)exDiv.innerHTML=seRenderExercises();
  }
}
function seAcPick(i,slug){
  if(!_seState||!_seLibCache)return;
  const lib=_seLibCache.find(x=>x.slug===slug);
  if(!lib)return;
  _seState.exercises[i]={
    name:lib.name_fr,
    library_slug:lib.slug,
    sets:lib.default_sets||3,
    reps:lib.default_reps||'8-12',
    weight_hint:'',
    rest_seconds:lib.default_rest_seconds||90,
    tempo:lib.default_tempo||null,
    notes:lib.form_cue||'',
    muscle_groups:lib.muscle_groups||[]
  };
  _seAcOpenFor=null;
  seRender();
}

async function seSave(status){
  if(!_seState||!_seClientId){seToast('Erreur état','err');return;}
  if(!_seState.name.trim()){seToast('Donne un nom à la séance','err');return;}
  const payload={
    client_id:_seClientId,
    name:_seState.name.trim(),
    category:_seState.category||null,
    goal:_seState.goal||null,
    duration_min:_seState.duration_min||45,
    difficulty:_seState.difficulty||2,
    muscle_groups:_seState.muscle_groups,
    coach_note:_seState.coach_note||null,
    exercises:_seState.exercises,
    status:status,
    featured:_seState.featured||false,
    type:_seState.category||'general'
  };
  try{
    if(_seState.id){
      const {error}=await sb.from('training_sessions').update(payload).eq('id',_seState.id);
      if(error)throw error;
      seToast(status==='published'?'✓ Publié':'✓ Sauvegardé','ok');
      _seState.status=status;
    } else {
      const {data,error}=await sb.from('training_sessions').insert(payload).select().single();
      if(error)throw error;
      _seState.id=data.id;_seState.status=status;
      seToast(status==='published'?'✓ Séance publiée':'✓ Brouillon créé','ok');
    }
    seRender();
    if(typeof _cpState!=='undefined'&&_cpState&&_cpState.tabs){
      _cpState.tabs[2]=null;_cpState.tabs[7]=null;
    }
  } catch(e){
    console.error('[seSave]',e);
    seToast('Erreur: '+(e.message||e),'err');
  }
}

async function seDelete(){
  if(!_seState||!_seState.id){seToast('Pas d\'ID','err');return;}
  if(!confirm('Supprimer définitivement cette séance ?'))return;
  try{
    const {error}=await sb.from('training_sessions').delete().eq('id',_seState.id);
    if(error)throw error;
    seToast('Séance supprimée','ok');
    setTimeout(()=>{seClose();if(typeof _cpState!=='undefined'&&_cpState&&_cpState.tabs){_cpState.tabs[2]=null;if(typeof cpSetTab==='function')cpSetTab(2);}},400);
  } catch(e){seToast('Erreur: '+(e.message||e),'err');}
}

function seToast(msg,kind){
  let t=document.getElementById('se-toast');
  if(!t){t=document.createElement('div');t.id='se-toast';t.className='se-toast';document.body.appendChild(t);}
  t.textContent=msg;
  t.className='se-toast '+(kind==='ok'?'se-toast-ok':kind==='err'?'se-toast-err':'');
  setTimeout(()=>t.classList.add('se-toast-on'),10);
  setTimeout(()=>t.classList.remove('se-toast-on'),2400);
}

window.seOpenEditor=seOpenEditor;
window.seClose=seClose;
window.seSetCategory=seSetCategory;
window.seSetGoal=seSetGoal;
window.seSetDifficulty=seSetDifficulty;
window.seToggleMuscle=seToggleMuscle;
window.seAddExercise=seAddExercise;
window.seDeleteExercise=seDeleteExercise;
window.seAcInput=seAcInput;
window.seAcClose=seAcClose;
window.seAcPick=seAcPick;
window.seSave=seSave;
window.seDelete=seDelete;
