// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PHASE 5 — CLIENT PLAN PLAYER
// Depends on: Phase 3 (renderMuscleSvg, MUSCLE_LABELS_FR), global sb, CC
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let _plSessions=[];
let _plTodayIdx=0;
let _plOpenSession=null;
let _plActiveTab='exec';
let _plSetForm=null;
let _plRestState=null;
let _plRestTouchStartY=null;

const PL_DAY_LABELS=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
const PL_DAY_FULL=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const PL_CAT_LABELS={push:'Push',pull:'Pull',legs:'Jambes',upper:'Haut',lower:'Bas',full:'Full body',core:'Core',cardio:'Cardio',mobility:'Mobilité'};

function plEscape(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

async function plRenderPlan(){
  const container=document.getElementById('tab-plan');
  if(!container)return;
  if(typeof CC==='undefined'||!CC||!CC.id){
    container.innerHTML='<div class="pl-empty"><div class="pl-empty-icon">🔒</div><div class="pl-empty-title">Connecte-toi</div><div class="pl-empty-sub">Tu dois être connecté pour voir ton programme.</div></div>';
    return;
  }
  container.innerHTML='<div class="pl-wrap"><div style="padding:40px 20px;text-align:center;color:rgba(240,237,232,0.4);font-size:13px">Chargement de ton programme…</div></div>';
  try{
    const {data,error}=await sb.from('training_sessions')
      .select('*').eq('client_id',CC.id)
      .order('order_index',{ascending:true}).order('created_at',{ascending:true});
    if(error)throw error;
    _plSessions=(data||[]).filter(s=>!s.status||s.status==='published');
    if(!_plSessions.length){
      container.innerHTML=`<div class="pl-wrap">
        <div class="pl-empty">
          <div class="pl-empty-icon">💪</div>
          <div class="pl-empty-title">Pas encore de programme</div>
          <div class="pl-empty-sub">Coach Sammy te prépare ton plan d'entraînement.<br>Ça arrive très bientôt.</div>
        </div>
      </div>`;
      return;
    }
    const start=CC.membership_start||CC.created_at||new Date().toISOString();
    const days=Math.max(0,Math.floor((Date.now()-new Date(start).getTime())/86400000));
    _plTodayIdx=days%_plSessions.length;
    plRenderPlanContent();
  } catch(e){
    container.innerHTML='<div class="pl-empty"><div class="pl-empty-icon">⚠️</div><div class="pl-empty-title">Erreur</div><div class="pl-empty-sub">'+plEscape(e.message||e)+'</div></div>';
  }
}

function plRenderPlanContent(){
  const container=document.getElementById('tab-plan');
  if(!container)return;
  const today=_plSessions[_plTodayIdx];
  const now=new Date();
  const todayLabel=PL_DAY_FULL[now.getDay()];
  const upcoming=[];
  for(let i=1;i<Math.min(_plSessions.length,5);i++){
    const s=_plSessions[(_plTodayIdx+i)%_plSessions.length];
    const d=new Date(now);d.setDate(d.getDate()+i);
    upcoming.push({sess:s,dayShort:PL_DAY_LABELS[d.getDay()]});
  }
  container.innerHTML=`
    <div class="pl-wrap">
      ${plRenderHero(today,todayLabel)}
      ${upcoming.length?`
        <div class="pl-section-label">À venir</div>
        <h2 class="pl-section-title">Le reste de la semaine</h2>
        <div class="pl-carousel">
          ${upcoming.map(u=>plRenderMiniCard(u.sess,u.dayShort)).join('')}
        </div>
      `:''}
    </div>
  `;
}

function plRenderHero(s,dayLabel){
  const muscles=Array.isArray(s.muscle_groups)?s.muscle_groups:[];
  const exCount=Array.isArray(s.exercises)?s.exercises.length:0;
  const diff=s.difficulty||2;
  const dur=s.duration_min||45;
  const svgHtml=window.renderMuscleSvg?window.renderMuscleSvg(muscles,{side:'front',maxHeight:'260px',showLabels:false}):'';
  return `
    <div class="pl-hero">
      <div class="pl-hero-eyebrow">Aujourd'hui · ${dayLabel}</div>
      <h1 class="pl-hero-title">${plEscape(s.name)}</h1>
      <div class="pl-hero-sub">${s.category?PL_CAT_LABELS[s.category]||s.category:''}${s.goal?' · '+plEscape(s.goal):''}</div>
      <div class="pl-hero-body">
        <div class="pl-hero-svg">${svgHtml}</div>
        <div>
          <div class="pl-hero-stats">
            <div class="pl-stat"><div class="pl-stat-val">${dur}</div><div class="pl-stat-lbl">Minutes</div></div>
            <div class="pl-stat"><div class="pl-stat-val">${exCount}</div><div class="pl-stat-lbl">Exercices</div></div>
            <div class="pl-stat"><div class="pl-stat-val">${'💪'.repeat(diff)}</div><div class="pl-stat-lbl">Difficulté</div></div>
            <div class="pl-stat"><div class="pl-stat-val">${muscles.length}</div><div class="pl-stat-lbl">Muscles</div></div>
          </div>
          <button class="pl-hero-cta" onclick="plOpenSession('${s.id}')">Démarrer la séance →</button>
        </div>
      </div>
    </div>
  `;
}

function plRenderMiniCard(s,dayShort){
  const muscles=Array.isArray(s.muscle_groups)?s.muscle_groups:[];
  const svgHtml=window.renderMuscleSvg?window.renderMuscleSvg(muscles,{side:'front',maxHeight:'120px',showLabels:false}):'';
  const exCount=Array.isArray(s.exercises)?s.exercises.length:0;
  return `<div class="pl-mini-card" onclick="plOpenSession('${s.id}')">
    <div class="pl-mini-day">${dayShort}</div>
    <div class="pl-mini-name">${plEscape(s.name)}</div>
    <div class="pl-mini-svg">${svgHtml}</div>
    <div class="pl-mini-meta">
      <span>⏱ ${s.duration_min||45}min</span>
      <span>·</span>
      <span>${exCount} exos</span>
    </div>
  </div>`;
}

async function plOpenSession(sessionId){
  const s=_plSessions.find(x=>x.id===sessionId);
  if(!s){return;}
  _plOpenSession=s;
  _plActiveTab='exec';
  if(!document.getElementById('pl-detail')){
    const d=document.createElement('div');d.id='pl-detail';d.className='pl-detail';document.body.appendChild(d);
  }
  document.getElementById('pl-detail').classList.add('pl-open');
  document.body.style.overflow='hidden';
  plRenderDetail();
}

function plCloseSession(){
  const d=document.getElementById('pl-detail');if(d)d.classList.remove('pl-open');
  document.body.style.overflow='';
  _plOpenSession=null;
}

function plRenderDetail(){
  const d=document.getElementById('pl-detail');
  const s=_plOpenSession;if(!d||!s)return;
  const muscles=Array.isArray(s.muscle_groups)?s.muscle_groups:[];
  const exCount=Array.isArray(s.exercises)?s.exercises.length:0;
  const diff=s.difficulty||2;
  const svgHtml=window.renderMuscleSvg?window.renderMuscleSvg(muscles,{maxHeight:'200px'}):'';
  d.innerHTML=`
    <div class="pl-detail-top">
      <button class="pl-detail-close" onclick="plCloseSession()">✕</button>
      <div class="pl-detail-name">${plEscape(s.name)}</div>
    </div>
    <div class="pl-detail-body">
      <div class="pl-detail-band">
        ${svgHtml}
        <div class="pl-hero-stats" style="margin-top:14px">
          <div class="pl-stat"><div class="pl-stat-val">${s.duration_min||45}</div><div class="pl-stat-lbl">Min</div></div>
          <div class="pl-stat"><div class="pl-stat-val">${exCount}</div><div class="pl-stat-lbl">Exos</div></div>
          <div class="pl-stat"><div class="pl-stat-val">${'💪'.repeat(diff)}</div><div class="pl-stat-lbl">Niveau</div></div>
          <div class="pl-stat"><div class="pl-stat-val">${muscles.length}</div><div class="pl-stat-lbl">Muscles</div></div>
        </div>
      </div>
      <div class="pl-detail-tabs">
        <button class="pl-tab ${_plActiveTab==='exec'?'pl-tab-on':''}" onclick="plSetDetailTab('exec')">Exécution</button>
        <button class="pl-tab ${_plActiveTab==='var'?'pl-tab-on':''}" onclick="plSetDetailTab('var')">Variations</button>
        <button class="pl-tab ${_plActiveTab==='note'?'pl-tab-on':''}" onclick="plSetDetailTab('note')">Note coach</button>
        <button class="pl-tab ${_plActiveTab==='hist'?'pl-tab-on':''}" onclick="plSetDetailTab('hist')">Historique</button>
      </div>
      <div id="pl-detail-pane">${plRenderDetailPane()}</div>
    </div>
  `;
}

function plSetDetailTab(t){_plActiveTab=t;const p=document.getElementById('pl-detail-pane');if(p)p.innerHTML=plRenderDetailPane();document.querySelectorAll('.pl-tab').forEach(el=>el.classList.toggle('pl-tab-on',el.textContent.toLowerCase().includes(({exec:'exéc',var:'var',note:'note',hist:'hist'})[_plActiveTab])));}

function plRenderDetailPane(){
  const s=_plOpenSession;if(!s)return'';
  if(_plActiveTab==='exec')return plRenderExecPane();
  if(_plActiveTab==='var')return plRenderVarPane();
  if(_plActiveTab==='note')return plRenderNotePane();
  if(_plActiveTab==='hist')return plRenderHistPane();
  return'';
}

function plRenderExecPane(){
  const s=_plOpenSession;if(!s)return'';
  const ex=Array.isArray(s.exercises)?s.exercises:[];
  if(!ex.length)return '<div class="pl-empty"><div class="pl-empty-sub">Aucun exercice dans cette séance.</div></div>';
  if(!window._plSessSets)window._plSessSets={};
  if(!window._plSessSets[s.id])window._plSessSets[s.id]={};
  const sets=window._plSessSets[s.id];
  return ex.map((e,i)=>{
    const setCount=parseInt(e.sets)||3;
    const muscles=Array.isArray(e.muscle_groups)?e.muscle_groups:[];
    const muscleLbl=muscles.slice(0,2).map(m=>window.MUSCLE_LABELS_FR&&window.MUSCLE_LABELS_FR[m]||m).join(' · ');
    return `<div class="pl-ex">
      <div class="pl-ex-hdr">
        <div class="pl-ex-num">${i+1}</div>
        <div style="flex:1">
          <div class="pl-ex-name">${plEscape(e.name||'Exercice')}</div>
          <div class="pl-ex-meta">${e.reps||'8-12'} reps${e.weight_hint?' · '+plEscape(e.weight_hint):''}${e.rest_seconds?' · '+e.rest_seconds+'s repos':''}${muscleLbl?' · '+plEscape(muscleLbl):''}</div>
        </div>
      </div>
      <div class="pl-sets">
        ${Array.from({length:setCount},(_,si)=>{
          const k=i+'_'+si;
          const st=sets[k]||{};
          const done=!!st.done;
          const repsShow=st.reps||e.reps||'—';
          const wShow=st.weight||e.weight_hint||'—';
          return `<div class="pl-set ${done?'pl-set-done':''}" onclick="plSetTap(${i},${si})">
            <div class="pl-set-num">Set ${si+1}</div>
            <div class="pl-set-vals">${plEscape(String(repsShow))} × ${plEscape(String(wShow))}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');
}

function plRenderVarPane(){
  const s=_plOpenSession;if(!s)return'';
  const ex=Array.isArray(s.exercises)?s.exercises:[];
  const withVars=ex.filter(e=>Array.isArray(e.substitutions)&&e.substitutions.length);
  if(!withVars.length)return '<div class="pl-empty"><div class="pl-empty-sub">Pas de variations renseignées.</div></div>';
  return withVars.map(e=>`<div style="margin-bottom:16px">
    <div class="pl-ex-name" style="margin-bottom:8px">${plEscape(e.name||'')}</div>
    ${e.substitutions.map(v=>`<div class="pl-var">
      <span class="pl-var-arrow">↔</span>
      <span>${plEscape(v.from||v.original||e.name||'')} → <strong>${plEscape(v.to||v.alternative||'')}</strong>${v.reason?'<br><span style="font-size:11px;color:rgba(240,237,232,0.4)">'+plEscape(v.reason)+'</span>':''}</span>
    </div>`).join('')}
  </div>`).join('');
}

function plRenderNotePane(){
  const s=_plOpenSession;if(!s)return'';
  if(!s.coach_note)return '<div class="pl-empty"><div class="pl-empty-sub">Pas de note coach pour cette séance.</div></div>';
  return `<div class="pl-coach-note">${plEscape(s.coach_note)}</div>`;
}

function plRenderHistPane(){
  setTimeout(async()=>{
    const s=_plOpenSession;const pane=document.getElementById('pl-detail-pane');if(!s||!pane)return;
    try{
      const ex=Array.isArray(s.exercises)?s.exercises:[];
      const names=ex.map(e=>e.name).filter(Boolean);
      if(!names.length){pane.innerHTML='<div class="pl-empty"><div class="pl-empty-sub">Pas d\'historique.</div></div>';return;}
      const {data}=await sb.from('exercise_logs').select('exercise_name,weight_kg,reps,sets,logged_at').eq('client_id',CC.id).in('exercise_name',names).order('logged_at',{ascending:false}).limit(100);
      const logs=data||[];
      if(!logs.length){pane.innerHTML='<div class="pl-empty"><div class="pl-empty-sub">Aucune session de cette séance terminée pour le moment.</div></div>';return;}
      const byEx={};
      logs.forEach(l=>{const n=l.exercise_name;if(!byEx[n])byEx[n]=[];byEx[n].push(l);});
      let html='';
      Object.keys(byEx).forEach(name=>{
        const items=byEx[name].slice(0,8).reverse();
        const points=items.map(l=>parseFloat(l.weight_kg)||0);
        html+=`<div style="margin-bottom:18px">
          <div class="pl-ex-name" style="margin-bottom:6px">${plEscape(name)}</div>
          ${plSparkline(points)}
          <div style="margin-top:8px">
            ${items.slice(-5).reverse().map(l=>{
              const d=new Date(l.logged_at);
              const dlbl=d.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
              return `<div class="pl-hist-row"><div class="pl-hist-date">${dlbl}</div><div class="pl-hist-vol">${l.weight_kg||'—'}kg × ${l.reps||'—'}</div></div>`;
            }).join('')}
          </div>
        </div>`;
      });
      pane.innerHTML=html||'<div class="pl-empty"><div class="pl-empty-sub">Pas d\'historique.</div></div>';
    } catch(e){pane.innerHTML='<div class="pl-empty"><div class="pl-empty-sub">Erreur chargement.</div></div>';}
  },50);
  return '<div style="padding:30px 20px;text-align:center;color:rgba(240,237,232,0.4);font-size:12px">Chargement…</div>';
}

function plSparkline(points){
  if(!points.length)return'';
  const w=200,h=40,pad=4;
  const max=Math.max.apply(null,points),min=Math.min.apply(null,points);
  const range=Math.max(1,max-min);
  const step=points.length>1?(w-2*pad)/(points.length-1):0;
  const coords=points.map((v,i)=>[pad+i*step,h-pad-((v-min)/range)*(h-2*pad)]);
  const path='M'+coords.map(c=>c[0].toFixed(1)+','+c[1].toFixed(1)).join(' L');
  const area=path+` L${coords[coords.length-1][0]},${h} L${coords[0][0]},${h} Z`;
  const last=coords[coords.length-1];
  return `<svg class="pl-spark" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="plSparkGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c9a84c" stop-opacity="0.3"/><stop offset="100%" stop-color="#c9a84c" stop-opacity="0"/></linearGradient></defs>
    <path class="pl-spark-area" d="${area}"/>
    <path class="pl-spark-line" d="${path}"/>
    <circle class="pl-spark-dot" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3"/>
  </svg>`;
}

function plSetTap(exIdx,setIdx){
  const s=_plOpenSession;if(!s)return;
  const ex=s.exercises[exIdx];if(!ex)return;
  if(!window._plSessSets)window._plSessSets={};
  if(!window._plSessSets[s.id])window._plSessSets[s.id]={};
  const k=exIdx+'_'+setIdx;
  const cur=window._plSessSets[s.id][k]||{};
  const prevSet=setIdx>0?(window._plSessSets[s.id][exIdx+'_'+(setIdx-1)]||{}):{};
  const repsStr=ex.reps||'8-12';
  const repsParts=repsStr.match(/\d+/g)||[8];
  const presReps=repsParts.length>1?Math.round((parseInt(repsParts[0])+parseInt(repsParts[1]))/2):parseInt(repsParts[0]);
  const presWeightMatch=(ex.weight_hint||'').match(/[\d.]+/);
  const presWeight=presWeightMatch?presWeightMatch[0]:'';
  _plSetForm={
    exIdx,setIdx,exObj:ex,
    weight:cur.weight||prevSet.weight||presWeight,
    reps:cur.reps||prevSet.reps||presReps
  };
  let f=document.getElementById('pl-set-form');
  if(!f){f=document.createElement('div');f.id='pl-set-form';f.className='pl-set-form';document.body.appendChild(f);}
  f.innerHTML=`
    <div class="pl-form-title">${plEscape(ex.name)} · Set ${setIdx+1}</div>
    <div class="pl-form-row">
      <div class="pl-form-field">
        <label class="pl-form-field-lbl">Reps</label>
        <input id="pl-form-reps" type="number" inputmode="numeric" value="${_plSetForm.reps}" />
      </div>
      <div class="pl-form-field">
        <label class="pl-form-field-lbl">Poids (kg)</label>
        <input id="pl-form-weight" type="number" inputmode="decimal" step="0.5" value="${_plSetForm.weight}" />
      </div>
    </div>
    <div class="pl-form-actions">
      <button class="pl-form-skip" onclick="plSetFormClose()">Plus tard</button>
      <button class="pl-form-done" onclick="plSetFormDone()">✓ Set terminé</button>
    </div>
  `;
  setTimeout(()=>f.classList.add('pl-form-on'),10);
  setTimeout(()=>{const r=document.getElementById('pl-form-reps');if(r){r.focus();r.select();}},250);
}

function plSetFormClose(){
  const f=document.getElementById('pl-set-form');
  if(f)f.classList.remove('pl-form-on');
  _plSetForm=null;
}

async function plSetFormDone(){
  if(!_plSetForm)return;
  const {exIdx,setIdx,exObj}=_plSetForm;
  const reps=parseInt(document.getElementById('pl-form-reps').value)||0;
  const weight=parseFloat(document.getElementById('pl-form-weight').value)||0;
  const s=_plOpenSession;if(!s)return;
  const k=exIdx+'_'+setIdx;
  window._plSessSets[s.id][k]={done:true,reps,weight,when:Date.now()};
  if(navigator.vibrate)navigator.vibrate([15,30,15]);
  try{
    await sb.from('exercise_logs').insert({
      client_id:CC.id,
      exercise_name:exObj.name||'',
      weight_kg:weight,
      reps:reps,
      sets:1,
      logged_at:new Date().toISOString()
    });
    plCheckPR(exObj.name,weight,reps);
  } catch(e){console.error('[logSet]',e);}
  plSetFormClose();
  const pane=document.getElementById('pl-detail-pane');
  if(pane&&_plActiveTab==='exec')pane.innerHTML=plRenderExecPane();
  const rest=parseInt(exObj.rest_seconds)||90;
  plRestStart(rest,exObj.name);
}

async function plCheckPR(exerciseName,weight,reps){
  if(!exerciseName||!weight||!reps)return;
  const newVol=weight*reps;
  if(newVol<=0)return;
  try{
    const {data}=await sb.from('exercise_logs').select('weight_kg,reps').eq('client_id',CC.id).eq('exercise_name',exerciseName).order('logged_at',{ascending:false}).range(1,500);
    if(!data||!data.length)return;
    let maxPrior=0;
    data.forEach(l=>{const v=(parseFloat(l.weight_kg)||0)*(parseFloat(l.reps)||0);if(v>maxPrior)maxPrior=v;});
    if(newVol>maxPrior&&maxPrior>0){
      plCelebratePR(exerciseName,weight,reps);
      try{
        if(typeof notifyCoach==='function'){
          notifyCoach('pr',CC.name+' — Nouveau PR 🏆',exerciseName+': '+weight+'kg × '+reps,CC?.id);
        }
      }catch(e){}
    }
  } catch(e){}
}

function plCelebratePR(name,weight,reps){
  let t=document.getElementById('pl-pr-toast');
  if(!t){t=document.createElement('div');t.id='pl-pr-toast';t.className='pl-pr-toast';document.body.appendChild(t);}
  t.textContent='🏆 NOUVEAU PR · '+name+' '+weight+'kg × '+reps;
  setTimeout(()=>t.classList.add('pl-pr-on'),50);
  setTimeout(()=>t.classList.remove('pl-pr-on'),3500);
  const colors=['#e0bc5c','#c9a84c','#a8893a','#f3d678'];
  for(let i=0;i<40;i++){
    const p=document.createElement('div');
    p.className='pl-confetti';
    p.style.background=colors[i%colors.length];
    p.style.left=(50+(Math.random()-0.5)*40)+'%';
    p.style.animationDelay=(Math.random()*0.2)+'s';
    p.style.animationDuration=(1.6+Math.random()*0.8)+'s';
    p.style.transform='rotate('+(Math.random()*360)+'deg)';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),2800);
  }
  if(navigator.vibrate)navigator.vibrate([50,30,50,30,80]);
  plPlayBell();
}

function plPlayBell(){
  try{
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
    const ctx=new C();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sine';osc.frequency.value=880;
    gain.gain.value=0.25;
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+1.4);
    osc.stop(ctx.currentTime+1.4);
  } catch(e){}
}

function plRestStart(seconds,exerciseName){
  if(!seconds||seconds<=0)return;
  let r=document.getElementById('pl-rest');
  if(!r){r=document.createElement('div');r.id='pl-rest';r.className='pl-rest';document.body.appendChild(r);}
  const C=240,R=110,CIRC=2*Math.PI*R;
  r.innerHTML=`
    <div class="pl-rest-eyebrow">Récupération</div>
    <div class="pl-rest-sub">Après ${plEscape(exerciseName||'')}</div>
    <div class="pl-rest-ring">
      <svg viewBox="0 0 ${C} ${C}">
        <defs><linearGradient id="plRestGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e0bc5c"/><stop offset="100%" stop-color="#a8893a"/></linearGradient></defs>
        <circle class="pl-rest-ring-bg" cx="${C/2}" cy="${C/2}" r="${R}"/>
        <circle id="pl-rest-circle" class="pl-rest-ring-fg" cx="${C/2}" cy="${C/2}" r="${R}" stroke-dasharray="${CIRC}" stroke-dashoffset="0"/>
      </svg>
      <div class="pl-rest-time" id="pl-rest-time">${seconds}s</div>
    </div>
    <div class="pl-rest-hint">Glisse vers le haut pour passer</div>
  `;
  r.classList.add('pl-rest-on');
  _plRestState={remaining:seconds,total:seconds,circ:CIRC};
  if(_plRestState.timer)clearInterval(_plRestState.timer);
  _plRestState.timer=setInterval(()=>{
    if(!_plRestState)return;
    _plRestState.remaining--;
    const t=document.getElementById('pl-rest-time');
    const c=document.getElementById('pl-rest-circle');
    if(t)t.textContent=Math.max(0,_plRestState.remaining)+'s';
    if(c)c.setAttribute('stroke-dashoffset',((_plRestState.total-_plRestState.remaining)/_plRestState.total*_plRestState.circ).toFixed(1));
    if(_plRestState.remaining<=0){
      plRestDone();
    }
  },1000);
  r.addEventListener('touchstart',plRestTouchStart,{passive:true});
  r.addEventListener('touchend',plRestTouchEnd,{passive:true});
}

function plRestTouchStart(e){_plRestTouchStartY=e.touches[0]?e.touches[0].clientY:null;}
function plRestTouchEnd(e){
  if(_plRestTouchStartY==null)return;
  const endY=e.changedTouches[0]?e.changedTouches[0].clientY:0;
  if(_plRestTouchStartY-endY>50){plRestDone(true);}
  _plRestTouchStartY=null;
}

function plRestDone(skipped){
  if(_plRestState&&_plRestState.timer)clearInterval(_plRestState.timer);
  _plRestState=null;
  if(!skipped)plPlayBell();
  const r=document.getElementById('pl-rest');
  if(r)setTimeout(()=>r.classList.remove('pl-rest-on'),skipped?0:600);
}

window.plRenderPlan=plRenderPlan;
window.plOpenSession=plOpenSession;
window.plCloseSession=plCloseSession;
window.plSetDetailTab=plSetDetailTab;
window.plSetTap=plSetTap;
window.plSetFormClose=plSetFormClose;
window.plSetFormDone=plSetFormDone;
