/* ═══════════════════════════════════════════════════════
   PHASE 6 — COACH INSIGHTS
   Exposes:
     window.coachInsightsRender(el)           — full insights page
     window.coachClientCardsRender(el)         — dashboard cards only
     window.coachActivityFeedRender(el)        — activity feed only
     window.coachClientPerformanceRender(id,el)— per-client performance
   ═══════════════════════════════════════════════════════ */

(function(){
  'use strict';

  // ─── Globals / refs ────────────────────────────────────
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
  function _coachId(){
    return window.coachAuthUser?.id || window._coachId || window.coachId || window.CURRENT_COACH_ID
        || '391148f1-7211-4bfb-adb7-a12af2e0e5cb';
  }

  // ─── Utilities ─────────────────────────────────────────
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,
    c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);

  function timeAgo(d){
    if(!d) return '—';
    const ms = Date.now() - new Date(d).getTime();
    const min = Math.floor(ms/60000);
    if(min < 1)  return "à l'instant";
    if(min < 60) return `il y a ${min} min`;
    const h = Math.floor(min/60);
    if(h < 24)   return `il y a ${h}h`;
    const dy = Math.floor(h/24);
    if(dy < 7)   return `il y a ${dy} j`;
    const w = Math.floor(dy/7);
    if(w < 4)    return `il y a ${w} sem`;
    return new Date(d).toLocaleDateString('fr-FR',{day:'numeric',month:'short'});
  }

  function statusFor(lastDate){
    if(!lastDate) return {key:'lost', label:'Jamais', color:'#ef4444',
                           bg:'rgba(239,68,68,.15)'};
    const days = Math.floor((Date.now()-new Date(lastDate).getTime())/86400000);
    if(days <= 2)  return {key:'active', label:'Actif',   color:'#4ade80', bg:'rgba(74,222,128,.15)'};
    if(days <= 6)  return {key:'slow',   label:'Ralentit',color:'#fbbf24', bg:'rgba(251,191,36,.15)'};
    if(days <= 14) return {key:'cold',   label:'Froid',   color:'#fb923c', bg:'rgba(251,146,60,.15)'};
    return                {key:'lost',   label:'Perdu',   color:'#ef4444', bg:'rgba(239,68,68,.15)'};
  }

  // ─── Data fetchers (defensive — many tables/columns vary) ──
  async function fetchClients(){
    const sb = _sb(); if(!sb) return [];
    try {
      const {data} = await sb.from('clients')
        .select('id, name, photo_url, client_type, created_at')
        .eq('coach_id', _coachId())
        .order('created_at', {ascending:false});
      return data || [];
    } catch(e){ console.warn('[ci] fetchClients', e); return []; }
  }

  async function fetchLastSessionMap(clientIds){
    const sb = _sb(); if(!sb || !clientIds.length) return {};
    try {
      const {data} = await sb.from('exercise_logs')
        .select('client_id, logged_at, created_at')
        .in('client_id', clientIds)
        .order('logged_at', {ascending:false})
        .limit(500);
      const map = {};
      for(const l of (data||[])){
        const when = l.logged_at || l.created_at;
        if(!map[l.client_id] || new Date(when) > new Date(map[l.client_id])) map[l.client_id] = when;
      }
      return map;
    } catch(e){ console.warn('[ci] fetchLastSessionMap', e); return {}; }
  }

  async function fetchSessionsCountThisWeek(clientIds){
    const sb = _sb(); if(!sb || !clientIds.length) return {};
    const since = new Date(Date.now()-7*86400000).toISOString();
    try {
      const {data} = await sb.from('exercise_logs')
        .select('client_id, session_name, logged_at, created_at')
        .in('client_id', clientIds)
        .gte('logged_at', since);
      const map = {};
      const seen = {};
      for(const l of (data||[])){
        const day = new Date(l.logged_at || l.created_at).toDateString();
        const key = l.client_id + '_' + (l.session_name || '') + '_' + day;
        if(seen[key]) continue;
        seen[key] = 1;
        map[l.client_id] = (map[l.client_id] || 0) + 1;
      }
      return map;
    } catch(e){ console.warn('[ci] fetchSessionsCount', e); return {}; }
  }

  async function fetchPRsCount(clientIds){
    const sb = _sb(); if(!sb || !clientIds.length) return {};
    const since = new Date(Date.now()-30*86400000).toISOString();
    try {
      const {data} = await sb.from('personal_bests')
        .select('client_id, set_at, created_at')
        .in('client_id', clientIds)
        .gte('set_at', since);
      const map = {};
      for(const p of (data||[])) map[p.client_id] = (map[p.client_id]||0) + 1;
      return map;
    } catch(e){ return {}; }
  }

  async function fetchClientLogs(clientId, days=30){
    const sb = _sb(); if(!sb) return [];
    const since = new Date(Date.now()-days*86400000).toISOString();
    try {
      const {data} = await sb.from('exercise_logs')
        .select('*')
        .eq('client_id', clientId)
        .gte('logged_at', since)
        .order('logged_at', {ascending:false})
        .limit(100);
      return data || [];
    } catch(e){ console.warn('[ci] fetchClientLogs', e); return []; }
  }

  async function fetchClientPRs(clientId, limit=10){
    const sb = _sb(); if(!sb) return [];
    try {
      const {data} = await sb.from('personal_bests')
        .select('*')
        .eq('client_id', clientId)
        .order('set_at', {ascending:false})
        .limit(limit);
      return data || [];
    } catch(e){ return []; }
  }

  async function fetchClientMeals(clientId, days=7){
    const sb = _sb(); if(!sb) return {meals:[], goal:null};
    const since = new Date(Date.now()-days*86400000).toISOString();
    try {
      const [mealsRes, goalRes] = await Promise.all([
        sb.from('meal_entries').select('*').eq('client_id', clientId)
          .gte('created_at', since).order('created_at',{ascending:false}),
        sb.from('client_goals').select('*').eq('client_id', clientId).maybeSingle()
      ]);
      return {meals: mealsRes.data || [], goal: goalRes.data || null};
    } catch(e){ console.warn('[ci] fetchClientMeals', e); return {meals:[], goal:null}; }
  }

  async function fetchActivityFeed(hours=72, clientFilter=null){
    const sb = _sb(); if(!sb) return [];
    const since = new Date(Date.now()-hours*3600000).toISOString();

    const clients = await fetchClients();
    const cmap = {}; clients.forEach(c => cmap[c.id] = c);
    let ids = clients.map(c => c.id);
    if(clientFilter) ids = ids.filter(x => x === clientFilter);
    if(!ids.length) return [];
    const scope = (q) => ids.length === 1 ? q.eq('client_id', ids[0]) : q.in('client_id', ids);

    const queries = [
      scope(sb.from('exercise_logs')
        .select('client_id, exercise_name, weight_kg, reps, sets, logged_at, created_at, session_name'))
        .gte('logged_at', since)
        .order('logged_at',{ascending:false}).limit(80),
      scope(sb.from('meal_entries')
        .select('client_id, name, calories, log_date, created_at'))
        .gte('created_at', since)
        .order('created_at',{ascending:false}).limit(80),
      scope(sb.from('personal_bests')
        .select('client_id, exercise_name, weight_kg, reps, set_at'))
        .gte('set_at', since)
        .order('set_at',{ascending:false}).limit(40),
      scope(sb.from('weight_logs')
        .select('client_id, weight, logged_at, created_at'))
        .gte('logged_at', since)
        .order('logged_at',{ascending:false}).limit(40),
      scope(sb.from('daily_logs')
        .select('client_id, mood_score, energy_score, log_date'))
        .gte('created_at', since)
        .order('created_at',{ascending:false}).limit(40),
      scope(sb.from('day_type_overrides')
        .select('client_id, day_type, date, created_at, source'))
        .gte('created_at', since)
        .order('created_at',{ascending:false}).limit(40),
      scope(sb.from('client_goals')
        .select('client_id, training_day_calories, updated_at'))
        .gte('updated_at', new Date(Date.now()-7*24*3600000).toISOString())
        .order('updated_at',{ascending:false}).limit(20),
      scope(sb.from('coach_notifications')
        .select('client_id, type, title, body, created_at'))
        .eq('type', 'login')
        .gte('created_at', since)
        .order('created_at',{ascending:false}).limit(40),
      scope(sb.from('progress_photos')
        .select('client_id, photo_url, taken_at, created_at'))
        .gte('created_at', since)
        .order('created_at',{ascending:false}).limit(20)
    ];

    const results = await Promise.allSettled(queries);
    const safe = i => results[i].status === 'fulfilled' ? (results[i].value.data || []) : [];

    const feed = [];
    safe(0).forEach(l => feed.push({type:'exercise',    date: l.logged_at || l.created_at, client: cmap[l.client_id], data: l}));
    safe(1).forEach(m => feed.push({type:'meal',        date: m.created_at,                client: cmap[m.client_id], data: m}));
    safe(2).forEach(p => feed.push({type:'pr',          date: p.set_at,                    client: cmap[p.client_id], data: p}));
    safe(3).forEach(w => feed.push({type:'weight',      date: w.logged_at || w.created_at, client: cmap[w.client_id], data: w}));
    safe(4).forEach(c => feed.push({type:'checkin',     date: c.log_date || c.created_at,  client: cmap[c.client_id], data: c}));
    safe(5).forEach(d => feed.push({type:'day_type',    date: d.created_at,                client: cmap[d.client_id], data: d}));
    safe(6).forEach(g => feed.push({type:'macro_change',date: g.updated_at,                client: cmap[g.client_id], data: g}));
    safe(7).forEach(n => feed.push({type:'login',       date: n.created_at,                client: cmap[n.client_id], data: n}));
    safe(8).forEach(ph => feed.push({type:'photo',      date: ph.taken_at || ph.created_at,client: cmap[ph.client_id],data: ph}));

    feed.sort((a,b) => new Date(b.date) - new Date(a.date));
    return feed.slice(0, 200);
  }

  // ═══════════════════════════════════════════════════════
  // PRIORITY 2 — Client Dashboard Cards
  // ═══════════════════════════════════════════════════════
  window.coachClientCardsRender = async function(containerEl){
    if(!containerEl) return;
    containerEl.innerHTML = '<div class="ci-loading">Chargement des clients…</div>';

    const clients = await fetchClients();
    if(!clients.length){
      containerEl.innerHTML = '<div class="ci-empty">Aucun client pour le moment.</div>';
      return;
    }

    const ids = clients.map(c => c.id);
    const [lastMap, sessionsMap, prsMap] = await Promise.all([
      fetchLastSessionMap(ids),
      fetchSessionsCountThisWeek(ids),
      fetchPRsCount(ids)
    ]);

    const enriched = clients.map(c => ({
      ...c,
      lastSession: lastMap[c.id],
      sessionsWeek: sessionsMap[c.id] || 0,
      prsMonth: prsMap[c.id] || 0,
      status: statusFor(lastMap[c.id])
    }));

    const order = {lost:0, cold:1, slow:2, active:3};
    enriched.sort((a,b) => (order[a.status.key]||9) - (order[b.status.key]||9));

    // Filter counts
    const counts = {all: enriched.length, active:0, slow:0, cold:0, lost:0};
    enriched.forEach(e => counts[e.status.key] = (counts[e.status.key]||0)+1);

    containerEl.innerHTML = `
      <div class="ci-filters">
        <div class="ci-filter active" data-f="all">Tous <span class="ci-filter-count">${counts.all}</span></div>
        <div class="ci-filter" data-f="active">🟢 Actifs <span class="ci-filter-count">${counts.active}</span></div>
        <div class="ci-filter" data-f="slow">🟡 Ralentissent <span class="ci-filter-count">${counts.slow}</span></div>
        <div class="ci-filter" data-f="cold">🟠 Froids <span class="ci-filter-count">${counts.cold}</span></div>
        <div class="ci-filter" data-f="lost">🔴 Perdus <span class="ci-filter-count">${counts.lost}</span></div>
      </div>
      <div class="ci-grid">
        ${enriched.map(c => cardHTML(c)).join('')}
      </div>
    `;

    function cardHTML(c){
      const initial = (c.name || '?')[0].toUpperCase();
      return `
        <div class="ci-card" data-status-key="${c.status.key}"
             style="--ci-status-color:${c.status.color};--ci-status-bg:${c.status.bg}"
             onclick="ciOpenClient('${c.id}')">
          <div class="ci-card-top">
            ${c.photo_url
              ? `<img src="${esc(c.photo_url)}" class="ci-avatar" alt=""/>`
              : `<div class="ci-avatar ci-avatar-fallback">${esc(initial)}</div>`}
            <div class="ci-card-info">
              <div class="ci-card-name">${esc(c.name||'Sans nom')}</div>
              <div class="ci-card-meta">${esc(c.client_type||'client')}</div>
            </div>
            <div class="ci-status-pill">${c.status.label}</div>
          </div>
          <div class="ci-card-stats">
            <div class="ci-mini-stat">
              <div class="ci-mini-stat-num">${c.sessionsWeek}</div>
              <div class="ci-mini-stat-label">Séances 7j</div>
            </div>
            <div class="ci-mini-stat">
              <div class="ci-mini-stat-num">${c.prsMonth}</div>
              <div class="ci-mini-stat-label">PRs 30j</div>
            </div>
            <div class="ci-mini-stat">
              <div class="ci-mini-stat-num" style="font-size:11px;font-weight:500">${c.lastSession ? timeAgo(c.lastSession) : 'Jamais'}</div>
              <div class="ci-mini-stat-label">Dernière</div>
            </div>
          </div>
          <div class="ci-card-foot">
            <span>Ouvrir le profil</span>
            <span class="ci-card-action">→</span>
          </div>
        </div>
      `;
    }

    // Wire filters
    containerEl.querySelectorAll('.ci-filter').forEach(btn => {
      btn.onclick = () => {
        containerEl.querySelectorAll('.ci-filter').forEach(b => b.classList.toggle('active', b===btn));
        const f = btn.dataset.f;
        containerEl.querySelectorAll('.ci-card').forEach(card => {
          card.style.display = (f==='all' || card.dataset.statusKey===f) ? '' : 'none';
        });
      };
    });
  };

  // Open client profile — defensive, tries multiple known function names
  window.ciOpenClient = function(id){
    const fns = ['openClientProfile','openClient','cpOpen','cpOpenClient','navigateClient'];
    for(const fn of fns){
      if(typeof window[fn] === 'function'){ window[fn](id); return; }
    }
    // Fallback: just set hash and let router handle
    window.location.hash = '#client/' + id;
    console.warn('[ci] no openClient function found, used hash fallback');
  };

  // ═══════════════════════════════════════════════════════
  // PRIORITY 4 — Activity Feed
  // ═══════════════════════════════════════════════════════
  // Accepts (containerEl) for backwards-compat OR (clientFilter, containerEl) for per-client scope.
  window.coachActivityFeedRender = async function(arg1, arg2){
    let clientFilter = null, containerEl = null;
    if(arg2 !== undefined){ clientFilter = arg1; containerEl = arg2; }
    else { containerEl = arg1; }
    if(!containerEl) return;
    containerEl.innerHTML = '<div class="ci-loading">Chargement de l\'activité…</div>';

    const feed = await fetchActivityFeed(72, clientFilter);
    if(!feed.length){
      containerEl.innerHTML = '<div class="ci-empty">Aucune activité récente (72h).<br/>Quand tes clients s\'entraînent, mangent ou se pèsent, ça apparaît ici en temps réel.</div>';
      return;
    }

    // Group by day
    const groups = {};
    feed.forEach(item => {
      const day = new Date(item.date).toDateString();
      (groups[day] ||= []).push(item);
    });
    const days = Object.keys(groups).sort((a,b) => new Date(b)-new Date(a));

    containerEl.innerHTML = `
      <div class="ci-feed">
        ${days.map(day => `
          <div class="ci-feed-day">
            <div class="ci-feed-day-title">${dayLabel(day)}</div>
            <div class="ci-feed-day-items">${groups[day].map(itemHTML).join('')}</div>
          </div>
        `).join('')}
      </div>
    `;

    function dayLabel(s){
      const today = new Date().toDateString();
      const yest  = new Date(Date.now()-86400000).toDateString();
      if(s === today) return "Aujourd'hui";
      if(s === yest)  return "Hier";
      return new Date(s).toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'});
    }

    function itemHTML(item){
      const name = esc(item.client?.name || 'Client');
      const time = new Date(item.date).toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
      const d = item.data;
      switch(item.type){
        case 'exercise':
          return `<div class="ci-feed-item ci-feed-exercise">
            <div class="ci-feed-icon">💪</div>
            <div class="ci-feed-body">
              <div class="ci-feed-text"><b>${name}</b> a fait <i>${esc(d.exercise_name||'un exercice')}</i> · ${d.weight_kg||0}kg × ${d.reps||0}${d.sets ? ' (×'+d.sets+' séries)' : ''}</div>
              <div class="ci-feed-time">${time}${d.session_name ? ' · '+esc(d.session_name) : ''}</div>
            </div>
          </div>`;
        case 'pr':
          return `<div class="ci-feed-item ci-feed-pr">
            <div class="ci-feed-icon">🏆</div>
            <div class="ci-feed-body">
              <div class="ci-feed-text"><b>${name}</b> a battu un PR sur <i>${esc(d.exercise_name||'')}</i> · ${d.weight_kg||0}kg × ${d.reps||0}</div>
              <div class="ci-feed-time">${time}</div>
            </div>
          </div>`;
        case 'meal':
          return `<div class="ci-feed-item ci-feed-meal">
            <div class="ci-feed-icon">🍽️</div>
            <div class="ci-feed-body">
              <div class="ci-feed-text"><b>${name}</b> a loggé <i>${esc(d.name||'un repas')}</i> · ${d.calories||0} kcal</div>
              <div class="ci-feed-time">${time}${d.meal_type ? ' · '+esc(d.meal_type) : ''}</div>
            </div>
          </div>`;
        case 'weight':
          return `<div class="ci-feed-item ci-feed-weight">
            <div class="ci-feed-icon">⚖️</div>
            <div class="ci-feed-body">
              <div class="ci-feed-text"><b>${name}</b> s'est pesé · <i>${d.weight||d.weight_kg||0}kg</i></div>
              <div class="ci-feed-time">${time}</div>
            </div>
          </div>`;
        case 'checkin':
          return `<div class="ci-feed-item ci-feed-checkin">
            <div class="ci-feed-icon">📝</div>
            <div class="ci-feed-body">
              <div class="ci-feed-text"><b>${name}</b> a fait son check-in · humeur ${d.mood_score||'?'}/5${d.energy_score ? ' · énergie '+d.energy_score+'/5' : ''}</div>
              <div class="ci-feed-time">${time}</div>
            </div>
          </div>`;
        default: return '';
      }
    }
  };

  // ═══════════════════════════════════════════════════════
  // PRIORITY 1 + 3 — Client Performance (training log + meal log)
  // ═══════════════════════════════════════════════════════
  window.coachClientPerformanceRender = async function(clientId, containerEl){
    if(!containerEl || !clientId) return;
    containerEl.innerHTML = '<div class="ci-loading">Chargement des performances…</div>';

    const [logs, prs, mealData] = await Promise.all([
      fetchClientLogs(clientId, 30),
      fetchClientPRs(clientId, 8),
      fetchClientMeals(clientId, 7)
    ]);

    // Group logs by session+day
    const sessionGroups = {};
    logs.forEach(l => {
      const day = new Date(l.logged_at || l.created_at).toDateString();
      const key = (l.session_name || 'Séance') + '|' + day;
      (sessionGroups[key] ||= {
        name: l.session_name || 'Séance libre',
        date: l.logged_at || l.created_at,
        exercises: []
      }).exercises.push(l);
    });
    const sessions = Object.values(sessionGroups)
      .sort((a,b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    // Stats
    const weekAgo = Date.now() - 7*86400000;
    const sessionsThisWeek = sessions.filter(s => new Date(s.date).getTime() > weekAgo).length;
    const totalExercisesWeek = logs.filter(l => new Date(l.logged_at || l.created_at).getTime() > weekAgo).length;

    // Meal stats — 7 day strip
    const today = new Date(); today.setHours(0,0,0,0);
    const dayStrip = [];
    for(let i = 6; i >= 0; i--){
      const d = new Date(today); d.setDate(d.getDate() - i);
      const dayMeals = mealData.meals.filter(m => {
        const md = new Date(m.created_at); md.setHours(0,0,0,0);
        return md.getTime() === d.getTime();
      });
      const kcal = dayMeals.reduce((s,m) => s + (m.calories||0), 0);
      dayStrip.push({date: d, kcal, count: dayMeals.length});
    }
    const goalKcal = mealData.goal?.calorie_target || mealData.goal?.target_calories || mealData.goal?.calories || 0;

    function dayClass(kcal){
      if(!goalKcal || kcal === 0) return '';
      const pct = kcal / goalKcal;
      if(pct < 0.85) return 'under';
      if(pct > 1.15) return 'over';
      return 'on-target';
    }
    function dayPct(kcal){
      if(!goalKcal || kcal === 0) return '';
      return Math.round((kcal / goalKcal) * 100) + '%';
    }
    function dayShort(d){
      return d.toLocaleDateString('fr-FR',{weekday:'short'}).slice(0,3);
    }

    const recentMeals = mealData.meals.slice(0, 5);

    containerEl.innerHTML = `
      <div class="ci-perf">
        <!-- Stats grid -->
        <div class="ci-perf-stats">
          <div class="ci-stat">
            <div class="ci-stat-num">${sessionsThisWeek}</div>
            <div class="ci-stat-label">Séances cette sem.</div>
          </div>
          <div class="ci-stat">
            <div class="ci-stat-num">${totalExercisesWeek}</div>
            <div class="ci-stat-label">Exos enregistrés 7j</div>
          </div>
          <div class="ci-stat">
            <div class="ci-stat-num">${prs.length}</div>
            <div class="ci-stat-label">PRs récents</div>
          </div>
          <div class="ci-stat">
            <div class="ci-stat-num">${mealData.meals.length}</div>
            <div class="ci-stat-label">Repas loggés 7j</div>
          </div>
        </div>

        <!-- Training log -->
        <div class="ci-section-title">📊 Sessions des 30 derniers jours</div>
        ${sessions.length === 0
          ? '<div class="ci-empty">Pas encore de sessions enregistrées par ce client.</div>'
          : sessions.map(s => `
              <div class="ci-log-session">
                <div class="ci-log-head">
                  <div class="ci-log-name">${esc(s.name)}</div>
                  <div class="ci-log-date">${timeAgo(s.date)}</div>
                </div>
                <div class="ci-log-exos">
                  ${s.exercises.slice(0,12).map(e => `
                    <div class="ci-log-exo">
                      <span class="ci-log-exo-name">${esc(e.exercise_name||'Exercice')}</span>
                      <span class="ci-log-exo-meta">${e.weight_kg||0}kg × ${e.reps||0}${e.sets ? ' (×'+e.sets+')' : ''}</span>
                    </div>
                  `).join('')}
                  ${s.exercises.length > 12 ? `<div style="font-size:11px;color:rgba(255,255,255,.4);text-align:center;padding-top:4px">+${s.exercises.length-12} autres exercices</div>` : ''}
                </div>
              </div>
            `).join('')
        }

        <!-- PRs -->
        ${prs.length > 0 ? `
          <div class="ci-section-title">🏆 Records personnels</div>
          <div class="ci-pr-list">
            ${prs.map(p => `
              <div class="ci-pr-item">
                <div class="ci-pr-trophy">🏆</div>
                <div class="ci-pr-name">${esc(p.exercise_name||'')}</div>
                <div class="ci-pr-val">${p.weight_kg||0}kg × ${p.reps||0}</div>
                <div class="ci-pr-date">${timeAgo(p.set_at)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Meal log strip -->
        <div class="ci-section-title">🍽️ Nutrition · 7 derniers jours</div>
        <div class="ci-meal-strip">
          ${dayStrip.map(d => `
            <div class="ci-meal-day ${dayClass(d.kcal)}">
              <div class="ci-meal-day-label">${dayShort(d.date)}</div>
              <div class="ci-meal-day-kcal">${d.kcal || '—'}</div>
              <div class="ci-meal-day-pct">${dayPct(d.kcal)}</div>
            </div>
          `).join('')}
        </div>
        ${goalKcal ? `<div style="font-size:10px;color:rgba(255,255,255,.4);text-align:right;margin-top:4px">Objectif: ${goalKcal} kcal/jour</div>` : ''}

        ${recentMeals.length > 0 ? `
          <div class="ci-meal-recent">
            ${recentMeals.map(m => `
              <div class="ci-meal-recent-item">
                <span class="ci-meal-recent-name">${esc(m.name||'Repas')}</span>
                <span class="ci-meal-recent-kcal">${m.calories||0} kcal · ${timeAgo(m.created_at)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  };

  // ═══════════════════════════════════════════════════════
  // MAIN — Combined Insights view (tab on coach dashboard)
  // ═══════════════════════════════════════════════════════
  window.coachInsightsRender = async function(containerEl){
    containerEl = containerEl
      || document.querySelector('#coach-insights-pane')
      || document.querySelector('#insights-content')
      || document.querySelector('[data-tab-content="insights"]');
    if(!containerEl) return;

    containerEl.innerHTML = `
      <div class="ci-wrap">
        <div class="ci-header">
          <h2 class="ci-title"><span class="ci-title-icon">📊</span> Insights</h2>
          <div class="ci-tabs">
            <button class="ci-tab active" data-tab="cards">👥 Clients</button>
            <button class="ci-tab" data-tab="feed">⚡ Activité</button>
          </div>
        </div>
        <div class="ci-content">
          <div class="ci-pane ci-pane-cards active"></div>
          <div class="ci-pane ci-pane-feed"></div>
        </div>
      </div>
    `;

    const cardsPane = containerEl.querySelector('.ci-pane-cards');
    const feedPane  = containerEl.querySelector('.ci-pane-feed');

    coachClientCardsRender(cardsPane);
    let feedRendered = false;

    containerEl.querySelectorAll('.ci-tab').forEach(btn => {
      btn.onclick = () => {
        containerEl.querySelectorAll('.ci-tab').forEach(b => b.classList.toggle('active', b===btn));
        containerEl.querySelectorAll('.ci-pane').forEach(p => p.classList.remove('active'));
        containerEl.querySelector('.ci-pane-' + btn.dataset.tab).classList.add('active');
        if(btn.dataset.tab === 'feed' && !feedRendered){
          feedRendered = true;
          coachActivityFeedRender(feedPane);
        }
      };
    });
  };

  console.log('[Phase 6] Coach Insights loaded — coachInsightsRender, coachClientCardsRender, coachActivityFeedRender, coachClientPerformanceRender exposed.');
})();
