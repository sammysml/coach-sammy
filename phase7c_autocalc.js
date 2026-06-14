/* ═══════════════════════════════════════════════════════
   PHASE 7c — CALORIE AUTO-CALCULATOR
   Adds an ✨ Auto-calculer button to the macro editor (Phase 7).
   Uses Mifflin-St Jeor (or Katch-McArdle if body fat known),
   applies activity multiplier from training_days,
   then adjusts based on main_objective + aggressiveness.
   
   Exposes:
     window.macroAutoCalcButtonRender(clientId, hostEl, onApply)
     window.macroAutoCalc(clientId, opts)  — pure calc, returns numbers
   ═══════════════════════════════════════════════════════ */

(function(){
  'use strict';

  function _sb(){
    const tryCandidate = (c) => {
      try { return (c && typeof c.from === 'function') ? c : null; } catch(e){ return null; }
    };
    // Try bare global first (lexical reference)
    try {
      if(typeof sb !== 'undefined'){
        const r = tryCandidate(sb);
        if(r) return r;
      }
    } catch(e){}
    // Try various window keys
    const keys = ['sb','supabase','_sb','_supa','SUPABASE','supabaseClient','_supabase'];
    for(const k of keys){
      try {
        const r = tryCandidate(window[k]);
        if(r) return r;
      } catch(e){}
    }
    return null;
  }

  // ─── Helpers ───
  function findField(obj, names){
    if(!obj) return null;
    for(const n of names){
      if(obj[n] != null && obj[n] !== '' && obj[n] !== 0) return obj[n];
    }
    return null;
  }

  function ageFromDOB(dob){
    if(!dob) return null;
    const birth = new Date(dob);
    if(isNaN(birth.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if(m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age > 0 && age < 120 ? age : null;
  }

  function normalizeGender(g){
    if(!g) return null;
    const s = String(g).toLowerCase().trim();
    if(['male','homme','h','m','masculin','man'].includes(s)) return 'male';
    if(['female','femme','f','feminin','féminin','woman'].includes(s)) return 'female';
    return null;
  }

  // ─── Fetch all client physical data across possible tables ───
  async function fetchClientPhysical(clientId){
    const sb = _sb();
    if(!sb) return {error:'no_sb'};

    const out = {weight:null, height:null, age:null, gender:null, bodyFat:null,
                  objective:null, trainingDaysCount:0, dob:null, sources:[]};

    // 1) clients
    try {
      const {data} = await sb.from('clients').select('*').eq('id', clientId).maybeSingle();
      if(data){
        out.sources.push('clients');
        out.weight  = out.weight  ?? findField(data, ['weight','weight_kg','poids','current_weight']);
        out.height  = out.height  ?? findField(data, ['height','height_cm','taille','taille_cm']);
        out.gender  = out.gender  ?? normalizeGender(findField(data, ['gender','sex','sexe','genre']));
        out.dob     = out.dob     ?? findField(data, ['date_of_birth','dob','birthday','birth_date','naissance','date_naissance']);
        out.bodyFat = out.bodyFat ?? findField(data, ['body_fat_percentage','body_fat','bf','bf_percentage','taux_gras']);
        const ageDirect = findField(data, ['age']);
        if(ageDirect) out.age = ageDirect;
      }
    } catch(e){}

    // 2) client_goals (start_weight + goal weight + objective + training_days)
    try {
      const {data} = await sb.from('client_goals').select('*').eq('client_id', clientId).maybeSingle();
      if(data){
        out.sources.push('client_goals');
        out.weight  = out.weight  ?? findField(data, ['start_weight','current_weight','weight','poids']);
        out.height  = out.height  ?? findField(data, ['height','taille']);
        out.bodyFat = out.bodyFat ?? findField(data, ['body_fat_percentage','body_fat']);
        out.objective = out.objective ?? findField(data, ['main_objective','objective','goal_type','pack']);
        if(Array.isArray(data.training_days)) out.trainingDaysCount = data.training_days.length;
      }
    } catch(e){}

    // 3) profiles
    try {
      const {data} = await sb.from('profiles').select('*').eq('id', clientId).maybeSingle();
      if(data){
        out.sources.push('profiles');
        out.height  = out.height  ?? findField(data, ['height','height_cm','taille']);
        out.weight  = out.weight  ?? findField(data, ['weight','weight_kg','poids']);
        out.gender  = out.gender  ?? normalizeGender(findField(data, ['gender','sex','sexe']));
        out.dob     = out.dob     ?? findField(data, ['date_of_birth','dob','birthday']);
        out.bodyFat = out.bodyFat ?? findField(data, ['body_fat_percentage','body_fat']);
      }
    } catch(e){}

    // 4) intake_forms (most recent)
    try {
      const {data} = await sb.from('intake_forms').select('*').eq('client_id', clientId)
        .order('created_at',{ascending:false}).limit(1);
      if(data && data.length){
        out.sources.push('intake_forms');
        const i = data[0];
        out.height  = out.height  ?? findField(i, ['height','height_cm','taille']);
        out.weight  = out.weight  ?? findField(i, ['weight','weight_kg','poids']);
        out.gender  = out.gender  ?? normalizeGender(findField(i, ['gender','sex','sexe']));
        out.dob     = out.dob     ?? findField(i, ['date_of_birth','dob','birthday','naissance']);
        out.bodyFat = out.bodyFat ?? findField(i, ['body_fat_percentage','body_fat']);
        // Some intake forms store age directly
        const ageDirect = findField(i, ['age']);
        if(ageDirect && !out.age) out.age = ageDirect;
      }
    } catch(e){}

    // 5) Latest weight_log if no current weight
    if(!out.weight){
      try {
        const {data} = await sb.from('weight_logs').select('weight, weight_kg').eq('client_id', clientId)
          .order('logged_at',{ascending:false}).limit(1);
        if(data && data.length){
          out.sources.push('weight_logs');
          out.weight = data[0].weight ?? data[0].weight_kg;
        }
      } catch(e){}
    }

    // Compute age from DOB if not directly available
    if(!out.age && out.dob) out.age = ageFromDOB(out.dob);

    return out;
  }

  // ─── Core calculation ───
  function calculateBMR(weight, height, age, gender, bodyFat){
    // Katch-McArdle (most accurate with body fat)
    if(bodyFat && bodyFat > 0 && bodyFat < 60 && weight){
      const leanMass = weight * (1 - bodyFat/100);
      return Math.round(370 + 21.6 * leanMass);
    }
    // Mifflin-St Jeor
    if(weight && height && age && gender){
      const base = 10 * weight + 6.25 * height - 5 * age;
      return Math.round(gender === 'male' ? base + 5 : base - 161);
    }
    // Weight-only fallback (rough)
    if(weight) return Math.round(weight * 22);
    return 1600;
  }

  function getActivityMultiplier(daysCount){
    if(daysCount <= 0) return 1.2;
    if(daysCount <= 2) return 1.375;
    if(daysCount <= 4) return 1.55;
    if(daysCount <= 6) return 1.725;
    return 1.9;
  }

  // Returns adjustment percentages by goal × aggressiveness
  function getAdjustments(objective, aggressiveness){
    const obj = String(objective || '').toLowerCase();
    const isSeche = obj.includes('sèche') || obj.includes('seche') || obj.includes('cut')
                 || obj.includes('perte') || obj.includes('loss') || obj.includes('mincir');
    const isMasse = obj.includes('masse') || obj.includes('bulk') || obj.includes('prise')
                 || obj.includes('gain') || obj.includes('grow');

    const idx = aggressiveness === 'conservative' ? 0
              : aggressiveness === 'aggressive'   ? 2 : 1;

    if(isSeche){
      return {training: [-10,-15,-20][idx], rest: [-20,-25,-30][idx], type:'sèche'};
    }
    if(isMasse){
      return {training: [+5,+10,+15][idx], rest: [0,+3,+5][idx], type:'masse'};
    }
    // Métamorphose / recomp / default
    return {training: [0,0,-5][idx], rest: [-5,-10,-15][idx], type:'recomp'};
  }

  // ─── Public: compute targets for given options ───
  window.macroAutoCalc = async function(clientId, opts){
    opts = opts || {};
    const physical = await fetchClientPhysical(clientId);
    if(!physical || physical.error) return {error: physical?.error || 'no_data'};

    const bodyFat = opts.bodyFat ?? physical.bodyFat;
    const aggr = opts.aggressiveness || 'moderate';

    const bmr = calculateBMR(physical.weight, physical.height, physical.age, physical.gender, bodyFat);
    const activityMult = getActivityMultiplier(physical.trainingDaysCount);
    const tdee = Math.round(bmr * activityMult);
    const adj = getAdjustments(physical.objective, aggr);

    return {
      bmr, tdee, activityMult,
      trainingDayCalories: Math.round(tdee * (1 + adj.training/100)),
      restDayCalories: Math.round(tdee * (1 + adj.rest/100)),
      adjustments: adj,
      bodyFatUsed: !!(bodyFat && bodyFat > 0),
      bmrFormula: (bodyFat && bodyFat > 0) ? 'Katch-McArdle' : 'Mifflin-St Jeor',
      data: physical
    };
  };

  // ─── UI: Auto-calc button + panel ───
  window.macroAutoCalcButtonRender = function(clientId, hostEl, onApply){
    if(!hostEl) return;
    let isOpen = false;
    let bodyFatOverride = '';
    let aggressiveness = 'moderate';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ac-btn';
    btn.innerHTML = '<span class="ac-btn-icon">✨</span> Auto-calculer les calories';
    btn.onclick = () => { isOpen = !isOpen; render(); };

    const panelWrap = document.createElement('div');
    hostEl.appendChild(btn);
    hostEl.appendChild(panelWrap);

    async function render(){
      if(!isOpen){ panelWrap.innerHTML = ''; return; }
      panelWrap.innerHTML = '<div class="ac-panel"><div style="text-align:center;color:rgba(255,255,255,.5);padding:20px;font-size:13px">Chargement des données client…</div></div>';

      const physical = await fetchClientPhysical(clientId);
      if(!physical || physical.error){
        panelWrap.innerHTML = '<div class="ac-panel"><div class="ac-missing-data">❌ Impossible de récupérer les données client.</div></div>';
        return;
      }

      const missing = [];
      if(!physical.weight) missing.push('poids');
      if(!physical.height) missing.push('taille');
      if(!physical.age)    missing.push('âge');
      if(!physical.gender) missing.push('sexe');

      const calc = await macroAutoCalc(clientId, {
        bodyFat: bodyFatOverride ? Number(bodyFatOverride) : null,
        aggressiveness
      });

      const dataCells = `
        <div class="ac-data-cell">
          <div class="ac-data-label">Poids</div>
          <div class="ac-data-val${physical.weight ? '' : ' missing'}">${physical.weight ? physical.weight + ' kg' : '—'}</div>
        </div>
        <div class="ac-data-cell">
          <div class="ac-data-label">Taille</div>
          <div class="ac-data-val${physical.height ? '' : ' missing'}">${physical.height ? physical.height + ' cm' : '—'}</div>
        </div>
        <div class="ac-data-cell">
          <div class="ac-data-label">Âge</div>
          <div class="ac-data-val${physical.age ? '' : ' missing'}">${physical.age || '—'} ${physical.age ? 'ans' : ''}</div>
        </div>
        <div class="ac-data-cell">
          <div class="ac-data-label">Sexe</div>
          <div class="ac-data-val${physical.gender ? '' : ' missing'}">${physical.gender === 'male' ? 'Homme' : physical.gender === 'female' ? 'Femme' : '—'}</div>
        </div>
      `;

      const missingBanner = missing.length > 0
        ? `<div class="ac-missing-data">⚠️ Données manquantes: <b>${missing.join(', ')}</b>. Le calcul utilisera une estimation par poids — moins précis. Demande au client de compléter son profil.</div>`
        : '';

      const aggPills = `
        <div class="ac-agg-pills">
          <div class="ac-agg-pill ${aggressiveness==='conservative'?'active':''}" data-a="conservative">
            Conservateur
            <span class="ac-agg-desc">${calc.adjustments?.type === 'sèche' ? '-10%' : calc.adjustments?.type === 'masse' ? '+5%' : '0%'} entraînement</span>
          </div>
          <div class="ac-agg-pill ${aggressiveness==='moderate'?'active':''}" data-a="moderate">
            Modéré
            <span class="ac-agg-desc">${calc.adjustments?.type === 'sèche' ? '-15%' : calc.adjustments?.type === 'masse' ? '+10%' : '0%'} entraînement</span>
          </div>
          <div class="ac-agg-pill ${aggressiveness==='aggressive'?'active':''}" data-a="aggressive">
            Agressif
            <span class="ac-agg-desc">${calc.adjustments?.type === 'sèche' ? '-20%' : calc.adjustments?.type === 'masse' ? '+15%' : '-5%'} entraînement</span>
          </div>
        </div>
      `;

      const goalLabel = calc.adjustments?.type === 'sèche' ? '🔥 Sèche (perte de gras)'
                      : calc.adjustments?.type === 'masse' ? '💪 Masse (prise de muscle)'
                      : '⚖️ Recomp/Métamorphose';

      panelWrap.innerHTML = `
        <div class="ac-panel">
          <div class="ac-panel-title">✨ Calcul automatique — ${goalLabel}</div>
          
          ${missingBanner}
          
          <div class="ac-data-grid">${dataCells}</div>
          
          <div class="ac-bf-row">
            <label>Body Fat % <span class="ac-bf-hint">(optionnel, plus précis)</span></label>
            <input type="number" id="ac-bf-input" min="3" max="60" step="0.5" placeholder="${physical.bodyFat || '—'}" value="${bodyFatOverride}"/>
          </div>
          
          <div class="ac-agg-row">
            <div class="ac-agg-label">Agressivité de l'objectif</div>
            ${aggPills}
          </div>
          
          <div class="ac-preview">
            <div class="ac-preview-stats">
              <span>BMR (${calc.bmrFormula}): <b>${calc.bmr}</b> kcal</span>
              <span>TDEE (×${calc.activityMult}): <b>${calc.tdee}</b> kcal</span>
            </div>
            <div class="ac-preview-targets">
              <div class="ac-preview-target training">
                <div class="ac-preview-target-label">💪 Jour d'entraînement</div>
                <div class="ac-preview-target-val">${calc.trainingDayCalories}</div>
              </div>
              <div class="ac-preview-target rest">
                <div class="ac-preview-target-label">😴 Jour de repos</div>
                <div class="ac-preview-target-val">${calc.restDayCalories}</div>
              </div>
            </div>
          </div>
          
          <div class="ac-actions">
            <button type="button" class="ac-cancel" id="ac-cancel">Annuler</button>
            <button type="button" class="ac-apply" id="ac-apply">✓ Appliquer aux champs</button>
          </div>
        </div>
      `;

      // Wire events
      panelWrap.querySelectorAll('.ac-agg-pill').forEach(p => {
        p.onclick = () => { aggressiveness = p.dataset.a; render(); };
      });

      const bfInput = panelWrap.querySelector('#ac-bf-input');
      if(bfInput){
        let dT = null;
        bfInput.oninput = () => {
          bodyFatOverride = bfInput.value;
          clearTimeout(dT);
          dT = setTimeout(render, 350);
        };
      }

      panelWrap.querySelector('#ac-cancel').onclick = () => { isOpen = false; render(); };
      panelWrap.querySelector('#ac-apply').onclick = () => {
        if(typeof onApply === 'function'){
          onApply({
            trainingDayCalories: calc.trainingDayCalories,
            restDayCalories: calc.restDayCalories,
            tdee: calc.tdee,
            bmr: calc.bmr,
            bodyFat: bodyFatOverride ? Number(bodyFatOverride) : null,
            aggressiveness
          });
        }
        try {
          if(typeof notifyCoach === 'function'){
            notifyCoach('macro_change', 'Macros ajustés', `Auto-calc appliqué: ${calc.trainingDayCalories} kcal training / ${calc.restDayCalories} kcal repos`, clientId);
          }
        } catch(_){}
        isOpen = false;
        render();
      };
    }
  };

  console.log('[Phase 7c] Calorie auto-calculator loaded — macroAutoCalcButtonRender, macroAutoCalc exposed.');
})();
