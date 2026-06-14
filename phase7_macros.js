/* ═══════════════════════════════════════════════════════
   PHASE 7 — DUAL MACRO TARGETS + 3-LAYER DAY DETECTION
   Exposes:
     window.getTodayDayType(clientId)      — returns {type, source}
     window.getTodayTargets(clientId)       — returns {type, source, calories, protein, carbs, fat}
     window.toggleDayType(clientId, type)   — manual override for today
     window.dayTypeBadgeRender(cid, el)     — client-side badge widget
     window.macroEditorRender(cid, el)      — coach-side editor
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

  const DAY_KEYS  = ['sun','mon','tue','wed','thu','fri','sat'];
  const DAY_LABEL = {mon:'Lun',tue:'Mar',wed:'Mer',thu:'Jeu',fri:'Ven',sat:'Sam',sun:'Dim'};

  function todayDateStr(){
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function todayDayKey(){ return DAY_KEYS[new Date().getDay()]; }
  function startOfTodayISO(){
    const d = new Date(); d.setHours(0,0,0,0);
    return d.toISOString();
  }

  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,
    c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

  // ═══════════════════════════════════════════════════════
  // CORE — 3-layer day type detection
  // Priority: manual override > today's session log > weekly schedule > default rest
  // ═══════════════════════════════════════════════════════
  window.getTodayDayType = async function(clientId){
    const sb = _sb();
    if(!sb || !clientId) return {type:'rest', source:'default'};

    // Layer 1 — manual override for today
    try {
      const {data: override} = await sb.from('day_type_overrides')
        .select('day_type')
        .eq('client_id', clientId)
        .eq('date', todayDateStr())
        .maybeSingle();
      if(override?.day_type) return {type: override.day_type, source: 'override'};
    } catch(e){ /* silent */ }

    // Layer 2 — auto-detect from any exercise log today
    try {
      const {data: logs} = await sb.from('exercise_logs')
        .select('id')
        .eq('client_id', clientId)
        .gte('completed_at', startOfTodayISO())
        .limit(1);
      if(logs && logs.length) return {type: 'training', source: 'auto-session'};
    } catch(e){ /* silent */ }

    // Layer 3 — coach-set weekly schedule
    try {
      const {data: goal} = await sb.from('client_goals')
        .select('training_days')
        .eq('client_id', clientId)
        .maybeSingle();
      const days = goal?.training_days || [];
      const isTraining = days.includes(todayDayKey());
      return {type: isTraining ? 'training' : 'rest', source: 'schedule'};
    } catch(e){ /* silent */ }

    return {type: 'rest', source: 'default'};
  };

  // ═══════════════════════════════════════════════════════
  // CORE — get today's macro targets (training or rest set)
  // ═══════════════════════════════════════════════════════
  window.getTodayTargets = async function(clientId){
    const sb = _sb();
    if(!sb || !clientId) return null;

    const dayType = await getTodayDayType(clientId);

    try {
      const {data: goal} = await sb.from('client_goals')
        .select('*')
        .eq('client_id', clientId)
        .maybeSingle();

      if(!goal){
        return {type: dayType.type, source: dayType.source, calories:0, protein:0, carbs:0, fat:0};
      }

      const isTraining = dayType.type === 'training';
      const prefix = isTraining ? 'training_day_' : 'rest_day_';

      // Use dual-target if set; fall back to legacy single-target columns
      const cal  = goal[prefix+'calories'] ?? goal.calorie_target ?? 0;
      const prot = goal[prefix+'protein']  ?? goal.protein_target ?? 0;
      const carb = goal[prefix+'carbs']    ?? goal.carbs_target   ?? 0;
      const fat  = goal[prefix+'fat']      ?? goal.fats_target    ?? 0;

      return {
        type: dayType.type,
        source: dayType.source,
        calories: cal,
        protein:  prot,
        carbs:    carb,
        fat:      fat
      };
    } catch(e){
      console.warn('[phase7] getTodayTargets', e);
      return {type: dayType.type, source: dayType.source, calories:0, protein:0, carbs:0, fat:0};
    }
  };

  // ═══════════════════════════════════════════════════════
  // CORE — manual override for today
  // ═══════════════════════════════════════════════════════
  window.toggleDayType = async function(clientId, newType){
    const sb = _sb();
    if(!sb || !clientId) return {ok:false, error:'no_sb_or_client'};
    try {
      const {error} = await sb.from('day_type_overrides')
        .upsert({
          client_id: clientId,
          date: todayDateStr(),
          day_type: newType,
          source: 'manual'
        }, {onConflict: 'client_id,date'});
      if(error){
        console.error('[phase7] toggle err', error);
        return {ok:false, error: error.message || JSON.stringify(error)};
      }
      try {
        if(typeof notifyCoach === 'function'){
          const cname = (typeof CC !== 'undefined' && CC?.name) ? CC.name : 'Client';
          notifyCoach('day_type', 'Changement de jour', `${cname} a basculé en jour de ${newType}`, clientId);
        }
      } catch(_){}
      return {ok:true};
    } catch(e){
      console.error('[phase7] toggle ex', e);
      return {ok:false, error: e.message || String(e)};
    }
  };

  // ═══════════════════════════════════════════════════════
  // CLIENT UI — day type badge with tap-to-override
  // ═══════════════════════════════════════════════════════
  window.dayTypeBadgeRender = async function(clientId, containerEl){
    if(!containerEl) return;
    containerEl.dataset.dayBadge = '1';
    containerEl.dataset.clientId = clientId;

    const targets = await getTodayTargets(clientId);
    if(!targets){ containerEl.innerHTML = ''; return; }

    const isTraining = targets.type === 'training';
    const icon = isTraining ? '💪' : '😴';
    const label = isTraining ? "Aujourd'hui · Entraînement" : "Aujourd'hui · Repos";
    const otherLabel = isTraining ? 'repos' : 'training';
    const sourceText = {
      'override':     '· défini par toi',
      'auto-session': '· séance détectée',
      'schedule':     '· planning coach',
      'default':      ''
    }[targets.source] || '';

    containerEl.innerHTML = `
      <div class="dt-badge ${isTraining ? '' : 'rest'}" onclick="dtPromptToggle('${clientId}','${targets.type}')">
        <div class="dt-badge-icon">${icon}</div>
        <div class="dt-badge-body">
          <div class="dt-badge-title">${label}<span class="dt-badge-source">${sourceText}</span></div>
          <div class="dt-badge-target">Objectif: <b>${targets.calories}</b> kcal</div>
          <div class="dt-badge-macros">${targets.protein}g protéines · ${targets.carbs}g glucides · ${targets.fat}g lipides</div>
        </div>
        <div class="dt-badge-toggle">↻ ${otherLabel}</div>
      </div>
    `;
  };

  // ─── Override prompt ───
  window.dtPromptToggle = function(clientId, currentType){
    const newType = currentType === 'training' ? 'rest' : 'training';
    const newLabel = newType === 'training' ? "d'entraînement" : 'de repos';
    const icon = newType === 'training' ? '💪' : '😴';

    const modal = document.createElement('div');
    modal.className = 'dt-modal';
    modal.innerHTML = `
      <div class="dt-modal-inner">
        <div class="dt-modal-icon">${icon}</div>
        <div class="dt-modal-title">Passer en jour ${newLabel} ?</div>
        <div class="dt-modal-text">Ton objectif calorique du jour va changer. Cette modification ne s'applique qu'à aujourd'hui.</div>
        <div class="dt-modal-btns">
          <button class="dt-modal-btn" onclick="this.closest('.dt-modal').remove()">Annuler</button>
          <button class="dt-modal-btn primary" onclick="dtConfirmToggle('${clientId}','${newType}', this.closest('.dt-modal'))">Confirmer</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  window.dtConfirmToggle = async function(clientId, newType, modal){
    const result = await toggleDayType(clientId, newType);
    modal.remove();
    if(result.ok){
      // Re-render any visible day badges for this client
      document.querySelectorAll('[data-day-badge="1"]').forEach(el => {
        if(el.dataset.clientId === clientId){
          dayTypeBadgeRender(clientId, el);
        }
      });
      // Notify the rest of the app (Kitchen tab, dashboard, etc.) to refresh macros
      window.dispatchEvent(new CustomEvent('dayTypeChanged', {detail: {clientId, newType}}));
    } else {
      alert("Erreur lors du changement: " + (result.error || 'inconnu') + "\n\nFais une capture du message et envoie au support.");
    }
  };

  // ═══════════════════════════════════════════════════════
  // COACH UI — macro editor (training + rest day macros + weekly schedule)
  // ═══════════════════════════════════════════════════════
  window.macroEditorRender = async function(clientId, containerEl){
    if(!containerEl || !clientId) return;
    containerEl.innerHTML = '<div style="padding:30px;color:rgba(255,255,255,.5);text-align:center;font-size:13px">Chargement…</div>';

    const sb = _sb();
    if(!sb){ containerEl.innerHTML = '<div style="padding:20px;color:#f87171">Supabase non disponible</div>'; return; }

    let goal = {};
    try {
      const {data} = await sb.from('client_goals').select('*').eq('client_id', clientId).maybeSingle();
      goal = data || {};
    } catch(e){
      goal = {};
    }

    const training = {
      cal: goal.training_day_calories ?? '',
      p:   goal.training_day_protein  ?? '',
      c:   goal.training_day_carbs    ?? '',
      f:   goal.training_day_fat      ?? ''
    };
    const rest = {
      cal: goal.rest_day_calories ?? '',
      p:   goal.rest_day_protein  ?? '',
      c:   goal.rest_day_carbs    ?? '',
      f:   goal.rest_day_fat      ?? ''
    };
    const trainingDays = goal.training_days || ['mon','wed','fri','sat'];

    containerEl.innerHTML = `
      <div class="mc-editor">
        <div class="mc-section-title">🎯 Objectifs nutritionnels</div>
        <div id="ac-host"></div>

        <div class="mc-cols">
          <div class="mc-col training">
            <div class="mc-col-title">💪 Jour d'entraînement</div>
            <div class="mc-field"><label>Calories (kcal)</label><input type="number" id="mc-t-cal" value="${esc(training.cal)}" placeholder="2800"/></div>
            <div class="mc-field"><label>Protéines (g)</label><input type="number" id="mc-t-p" value="${esc(training.p)}" placeholder="180"/></div>
            <div class="mc-field"><label>Glucides (g)</label><input type="number" id="mc-t-c" value="${esc(training.c)}" placeholder="320"/></div>
            <div class="mc-field"><label>Lipides (g)</label><input type="number" id="mc-t-f" value="${esc(training.f)}" placeholder="80"/></div>
          </div>
          <div class="mc-col rest">
            <div class="mc-col-title">😴 Jour de repos</div>
            <div class="mc-field"><label>Calories (kcal)</label><input type="number" id="mc-r-cal" value="${esc(rest.cal)}" placeholder="2200"/></div>
            <div class="mc-field"><label>Protéines (g)</label><input type="number" id="mc-r-p" value="${esc(rest.p)}" placeholder="180"/></div>
            <div class="mc-field"><label>Glucides (g)</label><input type="number" id="mc-r-c" value="${esc(rest.c)}" placeholder="180"/></div>
            <div class="mc-field"><label>Lipides (g)</label><input type="number" id="mc-r-f" value="${esc(rest.f)}" placeholder="80"/></div>
          </div>
        </div>

        <div class="mc-section-title">📅 Jours d'entraînement</div>
        <div class="mc-days" id="mc-days">
          ${['mon','tue','wed','thu','fri','sat','sun'].map(d => `
            <div class="mc-day-pill ${trainingDays.includes(d) ? 'active' : ''}" data-day="${d}">${DAY_LABEL[d]}</div>
          `).join('')}
        </div>
        <div class="mc-hint">Le client verra automatiquement le bon objectif selon le jour. Une séance loggée sur un jour de repos bascule en jour d'entraînement.</div>

        <button class="mc-save" id="mc-save-btn">💾 Enregistrer les objectifs</button>
        <div class="mc-msg" id="mc-msg" style="display:none"></div>
      </div>
    `;

    // Phase 7c — auto-calc button (mounts into #ac-host placeholder above the macro grid)
    const acHost = containerEl.querySelector('#ac-host');
    if(acHost && typeof window.macroAutoCalcButtonRender === 'function'){
      window.macroAutoCalcButtonRender(clientId, acHost, (result) => {
        // Fill the kcal fields when Appliquer is clicked
        const tCal = containerEl.querySelector('#mc-t-cal');
        const rCal = containerEl.querySelector('#mc-r-cal');
        if(tCal) tCal.value = result.trainingDayCalories;
        if(rCal) rCal.value = result.restDayCalories;
        // Flash highlight
        [tCal, rCal].forEach(el => {
          if(!el) return;
          el.style.transition = 'background .6s';
          el.style.background = 'rgba(212,175,55,.25)';
          setTimeout(()=>{ el.style.background = ''; }, 800);
        });
      });
    }

    // Day pills toggle
    containerEl.querySelectorAll('.mc-day-pill').forEach(p => {
      p.onclick = () => p.classList.toggle('active');
    });

    // Save handler
    containerEl.querySelector('#mc-save-btn').onclick = async () => {
      const btn = containerEl.querySelector('#mc-save-btn');
      const msg = containerEl.querySelector('#mc-msg');
      btn.disabled = true;
      btn.textContent = 'Enregistrement…';
      msg.style.display = 'none';

      const intOrNull = v => v === '' || v == null ? null : parseInt(v, 10);

      const payload = {
        client_id: clientId,
        training_day_calories: intOrNull(containerEl.querySelector('#mc-t-cal').value),
        training_day_protein:  intOrNull(containerEl.querySelector('#mc-t-p').value),
        training_day_carbs:    intOrNull(containerEl.querySelector('#mc-t-c').value),
        training_day_fat:      intOrNull(containerEl.querySelector('#mc-t-f').value),
        rest_day_calories:     intOrNull(containerEl.querySelector('#mc-r-cal').value),
        rest_day_protein:      intOrNull(containerEl.querySelector('#mc-r-p').value),
        rest_day_carbs:        intOrNull(containerEl.querySelector('#mc-r-c').value),
        rest_day_fat:          intOrNull(containerEl.querySelector('#mc-r-f').value),
        training_days: Array.from(containerEl.querySelectorAll('.mc-day-pill.active')).map(p => p.dataset.day)
      };

      try {
        const _db = (function(){
          const candidates = [];
          try { if(typeof sb !== 'undefined' && sb && typeof sb.from === 'function') candidates.push(sb); } catch(e){}
          if(typeof window !== 'undefined'){
            ['sb','supabase','_sb','_supa','SUPABASE','supabaseClient'].forEach(k => {
              try { if(window[k] && typeof window[k].from === 'function') candidates.push(window[k]); } catch(e){}
            });
          }
          return candidates[0] || null;
        })();
        if(!_db) console.error('[macro-save] No Supabase client found. Available globals:',
          Object.keys(window).filter(k => /^(sb|supa|client)/i.test(k)));
        else console.log('[macro-save] Using DB client:', _db);
        if(!_db || typeof _db.from !== 'function'){
          msg.className = 'mc-msg err';
          msg.textContent = '❌ Base de données indisponible';
          msg.style.display = 'block';
          btn.disabled = false;
          btn.textContent = '💾 Enregistrer les objectifs';
          return;
        }
        const {error} = await _db.from('client_goals').upsert(payload, {onConflict: 'client_id'});
        if(error){
          msg.className = 'mc-msg err';
          msg.textContent = '❌ ' + error.message;
        } else {
          msg.className = 'mc-msg ok';
          msg.textContent = '✓ Objectifs enregistrés';
          // Notify
          window.dispatchEvent(new CustomEvent('macroGoalsUpdated', {detail: {clientId}}));
        }
      } catch(e){
        msg.className = 'mc-msg err';
        msg.textContent = '❌ ' + (e.message || 'Erreur inconnue');
      }
      msg.style.display = 'block';
      btn.disabled = false;
      btn.textContent = '💾 Enregistrer les objectifs';

      setTimeout(() => { msg.style.display = 'none'; }, 3500);
    };
  };

  console.log('[Phase 7] Macro Day Targets loaded — getTodayDayType, getTodayTargets, toggleDayType, dayTypeBadgeRender, macroEditorRender exposed.');
})();
