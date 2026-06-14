/* ═══════════════════════════════════════════════════════
   PHASE 7.5 — MACRO ENHANCEMENTS
   Exposes:
     window.macroProgressRender(clientId, el)    — client daily progress card
     window.macroAdherenceRender(clientId, el)   — coach weekly adherence heatmap
   Auto-refreshes on dayTypeChanged / mealLogged events.
   Requires Phase 7 (getTodayTargets).
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

  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,
    c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

  const DAY_KEYS = ['sun','mon','tue','wed','thu','fri','sat'];
  const DAY_LABEL_SHORT = {mon:'L', tue:'M', wed:'M', thu:'J', fri:'V', sat:'S', sun:'D'};

  function todayBounds(){
    const start = new Date(); start.setHours(0,0,0,0);
    const end = new Date(start); end.setDate(end.getDate()+1);
    return {start: start.toISOString(), end: end.toISOString()};
  }

  function statusFor(actual, target){
    if(!target || target === 0) return 'no-data';
    const pct = actual / target;
    if(pct > 1.20) return 'over';
    return 'normal';
  }

  function adherenceStatusFor(actual, target){
    if(!target || target === 0) return 'no-data';
    if(actual === 0) return 'no-data';
    const pct = actual / target;
    if(pct >= 0.85 && pct <= 1.15) return 'hit';
    if((pct >= 0.70 && pct < 0.85) || (pct > 1.15 && pct <= 1.25)) return 'close';
    if(pct > 1.25 && pct <= 1.50) return 'over';
    return 'miss';
  }

  // ─── Data fetchers (defensive across column name variants) ───
  async function fetchMealsForRange(clientId, startISO, endISO){
    const sb = _sb(); if(!sb) return [];
    try {
      // Derive date strings from the ISO timestamps for log_date filter
      const startDate = (startISO || '').slice(0,10);
      const endDate = endISO ? new Date(new Date(endISO).getTime() - 1).toISOString().slice(0,10) : startDate;
      const q = sb.from('meal_entries')
        .select('id, name, calories, protein, carbs, fat, log_date, created_at')
        .eq('client_id', clientId)
        .gte('log_date', startDate)
        .lte('log_date', endDate)
        .order('created_at', {ascending: false});
      const res = await q;
      return res.data || [];
    } catch(e){ console.warn('[7.5] fetchMeals', e); return []; }
  }

  function sumMeals(meals){
    return meals.reduce((a, m) => ({
      calories: a.calories + (Number(m.calories) || 0),
      protein:  a.protein  + (Number(m.protein  ?? m.protein_g) || 0),
      carbs:    a.carbs    + (Number(m.carbs    ?? m.carbs_g)   || 0),
      fat:      a.fat      + (Number(m.fat      ?? m.fat_g)     || 0)
    }), {calories:0, protein:0, carbs:0, fat:0});
  }

  async function fetchClientGoal(clientId){
    const sb = _sb(); if(!sb) return null;
    try {
      const {data} = await sb.from('client_goals').select('*').eq('client_id', clientId).maybeSingle();
      return data;
    } catch(e){ return null; }
  }

  async function fetchSessionDaysLastWeek(clientId){
    const sb = _sb(); if(!sb) return new Set();
    const start = new Date(); start.setDate(start.getDate()-6); start.setHours(0,0,0,0);
    try {
      const {data} = await sb.from('exercise_logs')
        .select('logged_at, created_at')
        .eq('client_id', clientId)
        .gte('logged_at', start.toISOString());
      const days = new Set();
      (data||[]).forEach(l => {
        const d = new Date(l.logged_at || l.created_at);
        d.setHours(0,0,0,0);
        days.add(d.toDateString());
      });
      return days;
    } catch(e){ return new Set(); }
  }

  async function fetchOverridesLastWeek(clientId){
    const sb = _sb(); if(!sb) return {};
    const start = new Date(); start.setDate(start.getDate()-6);
    const startStr = start.toISOString().split('T')[0];
    try {
      const {data} = await sb.from('day_type_overrides')
        .select('date, day_type')
        .eq('client_id', clientId)
        .gte('date', startStr);
      const m = {};
      (data||[]).forEach(o => m[o.date] = o.day_type);
      return m;
    } catch(e){ return {}; }
  }

  // ═══════════════════════════════════════════════════════
  // CLIENT — Daily Macro Progress Card
  // ═══════════════════════════════════════════════════════
  window.macroProgressRender = async function(clientId, containerEl){
    if(!containerEl || !clientId) return;
    containerEl.dataset.macroProgress = '1';
    containerEl.dataset.clientId = clientId;

    if(typeof window.getTodayTargets !== 'function'){
      containerEl.innerHTML = '<div style="padding:14px;color:rgba(255,255,255,.4);font-size:12px">Phase 7 requis pour afficher la progression.</div>';
      return;
    }

    const {start, end} = todayBounds();
    const [targets, meals] = await Promise.all([
      getTodayTargets(clientId),
      fetchMealsForRange(clientId, start, end)
    ]);

    if(!targets){ containerEl.innerHTML = ''; return; }

    const eaten = sumMeals(meals);
    const remaining = (targets.calories || 0) - eaten.calories;
    const over = remaining < 0;
    const closeToGoal = !over && Math.abs(remaining) < (targets.calories * 0.10);
    const remClass = over ? 'over' : closeToGoal ? 'good' : '';

    const today = new Date().toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'});

    function bar(name, colorKey, current, target){
      const status = statusFor(current, target);
      const pct = target ? (current / target) * 100 : 0;
      const pctDisplay = target ? Math.round(pct) : 0;
      const width = Math.min(100, pct);
      return `
        <div class="mp-bar-row" data-color="${colorKey}" data-status="${status}">
          <div class="mp-bar-label">
            <span class="mp-bar-name">${name}</span>
            <span class="mp-bar-vals"><b>${Math.round(current)}</b> / ${target}g<span class="mp-pct">${pctDisplay}%</span></span>
          </div>
          <div class="mp-bar-track">
            <div class="mp-bar-fill" style="width:${width}%"></div>
          </div>
        </div>
      `;
    }

    containerEl.innerHTML = `
      <div class="mp-card">
        <div class="mp-header">
          <div class="mp-title">Progression du jour</div>
          <div class="mp-day-stamp">${esc(today)}</div>
        </div>
        <div class="mp-cal-big">
          <span class="mp-cal-current">${Math.round(eaten.calories)}</span>
          <span class="mp-cal-target">/ ${targets.calories} kcal</span>
          <span class="mp-cal-remaining ${remClass}">${over ? '+' : ''}${Math.abs(Math.round(remaining))} ${over ? 'kcal au-dessus' : 'kcal restant'}</span>
        </div>
        ${bar('Protéines','protein',eaten.protein,targets.protein)}
        ${bar('Glucides','carbs',eaten.carbs,targets.carbs)}
        ${bar('Lipides','fat',eaten.fat,targets.fat)}
        ${meals.length > 0 ? `
          <div style="margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.06)">
            <div style="font-size:10px;font-weight:600;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Repas du jour · ${meals.length}</div>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${meals.map(m => {
                const time = m.created_at ? new Date(m.created_at).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) : '';
                const name = esc(m.name || m.food_name || 'Repas');
                return `
                  <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:rgba(255,255,255,.03);border-radius:10px;font-size:12px">
                    <div style="flex:1;min-width:0">
                      <div style="color:#fff;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
                      <div style="color:rgba(255,255,255,.5);font-size:10px;margin-top:2px;font-variant-numeric:tabular-nums">${m.calories||0} kcal · ${m.protein||m.protein_g||0}p · ${m.carbs||m.carbs_g||0}c · ${m.fat||m.fat_g||0}f · ${time}</div>
                    </div>
                    <button onclick="(typeof CC !== 'undefined' && CC?.id === '${clientId}') ? ntDeleteMeal('${m.id}') : deleteMealEntry('${m.id}','${clientId}')"
                            style="background:none;border:none;color:rgba(255,255,255,.35);cursor:pointer;font-size:14px;padding:4px 8px;border-radius:6px"
                            onmouseover="this.style.color='#f87171';this.style.background='rgba(239,68,68,.1)'"
                            onmouseout="this.style.color='rgba(255,255,255,.35)';this.style.background='none'">🗑️</button>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  };

  // ═══════════════════════════════════════════════════════
  // COACH — Weekly Macro Adherence Heatmap
  // ═══════════════════════════════════════════════════════
  window.macroAdherenceRender = async function(clientId, containerEl){
    if(!containerEl || !clientId) return;
    containerEl.innerHTML = '<div class="ma-card"><div class="ma-title">📊 Adherence 7 jours</div><div class="ma-empty">Chargement…</div></div>';

    const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate()-6); sevenDaysAgo.setHours(0,0,0,0);

    const [goal, meals, sessionDays, overrides] = await Promise.all([
      fetchClientGoal(clientId),
      fetchMealsForRange(clientId, sevenDaysAgo.toISOString(), null),
      fetchSessionDaysLastWeek(clientId),
      fetchOverridesLastWeek(clientId)
    ]);

    if(!goal){
      containerEl.innerHTML = '<div class="ma-card"><div class="ma-title">📊 Adherence 7 jours</div><div class="ma-empty">Pas d\'objectifs définis pour ce client.</div></div>';
      return;
    }

    const trainingDays = goal.training_days || [];
    const days = [];

    for(let i = 6; i >= 0; i--){
      const d = new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const dayKey = DAY_KEYS[d.getDay()];

      // Resolve day type using the exact same logic as getTodayDayType
      let dayType;
      if(overrides[dateStr]) dayType = overrides[dateStr];
      else if(sessionDays.has(d.toDateString())) dayType = 'training';
      else dayType = trainingDays.includes(dayKey) ? 'training' : 'rest';

      const prefix = dayType === 'training' ? 'training_day_' : 'rest_day_';
      const tgt = {
        cal: goal[prefix+'calories'] ?? goal.calorie_target ?? 0,
        p:   goal[prefix+'protein']  ?? goal.protein_target ?? 0,
        c:   goal[prefix+'carbs']    ?? goal.carbs_target   ?? 0,
        f:   goal[prefix+'fat']      ?? goal.fats_target    ?? 0
      };

      const dayMeals = meals.filter(m => {
        const md = new Date(m.created_at); md.setHours(0,0,0,0);
        return md.getTime() === d.getTime();
      });
      const actual = sumMeals(dayMeals);

      days.push({
        date: d,
        dayKey,
        dayType,
        target: tgt,
        actual: {cal: actual.calories, p: actual.protein, c: actual.carbs, f: actual.fat}
      });
    }

    // Hit counts
    let hitCal=0, hitP=0, hitC=0, hitF=0;
    days.forEach(d => {
      if(adherenceStatusFor(d.actual.cal, d.target.cal) === 'hit') hitCal++;
      if(adherenceStatusFor(d.actual.p,   d.target.p)   === 'hit') hitP++;
      if(adherenceStatusFor(d.actual.c,   d.target.c)   === 'hit') hitC++;
      if(adherenceStatusFor(d.actual.f,   d.target.f)   === 'hit') hitF++;
    });

    const daysWithData = days.filter(d => d.actual.cal > 0).length;

    function cell(actual, target){
      const status = adherenceStatusFor(actual, target);
      const pct = target ? Math.round((actual/target)*100) : 0;
      const tooltip = `${Math.round(actual)}/${target} · ${pct}%`;
      const display = status === 'no-data' ? '–' : pct + '%';
      return `<div class="ma-cell ${status}" title="${tooltip}">${display}</div>`;
    }

    function statClass(n){
      if(n >= 5) return 'good';
      if(n >= 3) return 'ok';
      return 'bad';
    }

    containerEl.innerHTML = `
      <div class="ma-card">
        <div class="ma-title">📊 Adherence 7 jours</div>
        <div class="ma-grid">
          <div></div>
          ${days.map(d => `<div class="ma-day-header ${d.dayType}">${DAY_LABEL_SHORT[d.dayKey]}<b>${d.date.getDate()}</b></div>`).join('')}

          <div class="ma-row-label">Cal</div>
          ${days.map(d => cell(d.actual.cal, d.target.cal)).join('')}

          <div class="ma-row-label">Prot</div>
          ${days.map(d => cell(d.actual.p, d.target.p)).join('')}

          <div class="ma-row-label">Carb</div>
          ${days.map(d => cell(d.actual.c, d.target.c)).join('')}

          <div class="ma-row-label">Lip</div>
          ${days.map(d => cell(d.actual.f, d.target.f)).join('')}
        </div>
        <div class="ma-summary">
          <div class="ma-stat">
            <div class="ma-stat-num ${statClass(hitCal)}">${hitCal}<span>/7</span></div>
            <div class="ma-stat-label">Calories</div>
          </div>
          <div class="ma-stat">
            <div class="ma-stat-num ${statClass(hitP)}">${hitP}<span>/7</span></div>
            <div class="ma-stat-label">Protéines</div>
          </div>
          <div class="ma-stat">
            <div class="ma-stat-num ${statClass(hitC)}">${hitC}<span>/7</span></div>
            <div class="ma-stat-label">Glucides</div>
          </div>
          <div class="ma-stat">
            <div class="ma-stat-num ${statClass(hitF)}">${hitF}<span>/7</span></div>
            <div class="ma-stat-label">Lipides</div>
          </div>
        </div>
        ${daysWithData === 0 ? '<div class="ma-empty" style="margin-top:14px;padding:10px">Aucun repas loggé cette semaine.</div>' : ''}
      </div>
    `;
  };

  // ─── Auto-refresh on events ───
  window.addEventListener('dayTypeChanged', (e) => {
    const cid = e.detail?.clientId;
    if(!cid) return;
    document.querySelectorAll('[data-macro-progress="1"]').forEach(el => {
      if(el.dataset.clientId === cid) macroProgressRender(cid, el);
    });
  });

  window.addEventListener('mealLogged', (e) => {
    console.log('[7.5 listener] mealLogged fired:', e.detail);
    const eventCid = e.detail?.clientId;
    const containers = document.querySelectorAll('[data-macro-progress]');
    containers.forEach(host => {
      const cid = host.getAttribute('data-client-id');
      if(cid && (!eventCid || eventCid === cid)){
        try { window.macroProgressRender(cid, host); }
        catch(err){ console.warn('[7.5] re-render fail', err); }
      }
    });
  });

  window.addEventListener('macroGoalsUpdated', (e) => {
    const cid = e.detail?.clientId;
    if(!cid) return;
    document.querySelectorAll('[data-macro-progress="1"]').forEach(el => {
      if(el.dataset.clientId === cid) macroProgressRender(cid, el);
    });
  });

  console.log('[Phase 7.5] Macro enhancements loaded — macroProgressRender, macroAdherenceRender exposed.');
})();
