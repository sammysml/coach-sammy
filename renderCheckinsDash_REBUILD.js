async function renderCheckinsDash(){
  // MARKER: CHECKINS_REBUILD_V1 — unified one-row-per-client layout, inline actions, English, no duplicate rosters
  const root=document.getElementById('ccx-root');
  if(!root)return;
  root.innerHTML='<div class="ccx-skeleton"></div><div class="ccx-skeleton"></div><div class="ccx-skeleton"></div>';
  const weekStart=getMondayISO();
  const [week]=await Promise.all([loadWeekCheckins()]);
  _ccxWeekCache=week;
  const active=(coachClients||[]).filter(c=>c.status==='active'&&c.client_type!=='programme');
  if(!active.length){
    root.innerHTML=`<div class="ccx-hdr"><div class="ccx-title">My Check-ins</div><div class="ccx-sub">Week of ${_ccxFormatMonday(weekStart)}</div></div><div class="ccx-empty">No active clients. Add a client to get started.</div>`;
    updateCcxNavDot();
    return;
  }
  // which clients get bilan/AI actions: active coaching clients, valid non-expired membership
  const _today=new Date();_today.setHours(0,0,0,0);
  const COACHING_TAGS=['1month','2months','3months','6months','online'];
  const _eligible=id=>{
    const c=(coachClients||[]).find(x=>x.id===id);
    if(!c)return false;
    if(!COACHING_TAGS.includes(c.membership_tag))return false;
    if(!c.membership_expiry)return false;
    const exp=new Date(c.membership_expiry);exp.setHours(23,59,59,999);
    return exp>=_today;
  };
  const rows=active.map(c=>{
    const count=countWeekCheckins(c.id,week);
    const days=_ccxLastSeenDays(c.last_seen_at);
    return{c,count,days,bucket:_ccxBucketRank(count,days),eligible:_eligible(c.id)};
  });
  rows.sort((a,b)=>{
    if(a.bucket!==b.bucket)return a.bucket-b.bucket;
    return (a.c.name||'').localeCompare(b.c.name||'');
  });
  const seen=rows.filter(r=>r.count>=1).length;
  const total=rows.length;
  const pct=total?Math.round((seen/total)*100):0;
  const nComplete=rows.filter(r=>r.bucket===3).length;
  const nProgress=rows.filter(r=>r.bucket===1).length;
  const nOverdue=rows.filter(r=>r.bucket===0).length;
  const BUCKETS=[
    {key:'overdue',rank:0,label:'Overdue'},
    {key:'progress',rank:1,label:'In progress'},
    {key:'fresh',rank:2,label:'Not yet seen this week'},
    {key:'complete',rank:3,label:'Complete'}
  ];
  const rowsHtml=BUCKETS.map(b=>{
    const inBucket=rows.filter(r=>r.bucket===b.rank);
    if(!inBucket.length)return '';
    return `<div class="ccx-bucket-lbl">${b.label} · ${inBucket.length}</div>`+inBucket.map(r=>{
      const stCls=b.rank===0?'ccx-st-overdue':b.rank===1?'ccx-st-progress':b.rank===3?'ccx-st-complete':'ccx-st-fresh';
      const metaCls=b.rank===0?'ccx-c-overdue':b.rank===1?'ccx-c-progress':b.rank===3?'ccx-c-complete':'';
      const safeName=(r.c.name||'').replace(/'/g,"&#39;").replace(/"/g,'&quot;');
      let meta;
      if(b.rank===3)meta='<i class="ti ti-check"></i> Done this week';
      else if(b.rank===0)meta=r.c.last_seen_at?`Seen ${r.days}d ago`:'Never logged in';
      else if(b.rank===1)meta=`Checked in ${r.count}x this week`;
      else meta=r.c.last_seen_at?`Seen ${r.days}d ago`:'Never logged in';
      const checkAction=r.count>0
        ? `<span class="ccx-vu-badge"><i class="ti ti-check"></i> Seen</span>`
        : `<button class="ccx-plus-btn" aria-label="Check-in" onclick="event.stopPropagation();openCheckinSheet('${r.c.id}','${safeName}')" style="touch-action:manipulation">${CCX_PLUS_SVG}</button>`;
      const bilanAction=r.eligible
        ? `<button class="ccx-row-act" title="Weekly report" aria-label="Weekly report" onclick="event.stopPropagation();openWeeklyReportFor('${r.c.id}')"><i class="ti ti-chart-bar"></i></button>`
        : '';
      const aiAction=r.eligible
        ? `<button class="ccx-row-act" title="AI message" aria-label="AI message" onclick="event.stopPropagation();openAIMessageModal('${r.c.id}')">✦</button>`
        : '';
      return `<div class="ccx-row${b.rank===3?' ccx-dim':''}" data-cid="${r.c.id}">
        <div class="ccx-avatar ${stCls}">${ini(r.c.name)}</div>
        <div class="ccx-id" onclick="openCoachClient('${r.c.id}');setTimeout(()=>loadCoachTab(5,'${r.c.id}'),120)">
          <div class="ccx-name">${r.c.name||'—'}</div>
          <div class="ccx-meta ${metaCls}">${meta}</div>
        </div>
        <div class="ccx-row-actions">${bilanAction}${aiAction}${checkAction}</div>
      </div>`;
    }).join('');
  }).join('');
  const roundsBtn=nOverdue+nProgress>0?`
    <button type="button" onclick="openDailyRounds()" style="width:100%;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(78,168,222,.14),rgba(78,168,222,.06));border:1px solid rgba(78,168,222,.35);border-radius:12px;padding:18px 20px;margin-bottom:16px;cursor:pointer;touch-action:manipulation;font-family:inherit;color:inherit;transition:transform .15s" ontouchstart="this.style.transform='scale(.98)'" ontouchend="this.style.transform='scale(1)'">
      <div style="text-align:left">
        <div style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#4EA8DE;font-weight:700;margin-bottom:6px">DAILY ROUNDS</div>
        <div style="font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;font-size:26px;color:#fff;line-height:1;margin-bottom:4px">${nOverdue+nProgress} clients to check in</div>
        <div style="font-size:12px;color:rgba(255,255,255,.4)">Tap to start your rounds →</div>
      </div>
      <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#D4B556,#4EA8DE);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;box-shadow:0 6px 20px rgba(78,168,222,.35)"><i class="ti ti-run" style="color:#001a2e"></i></div>
    </button>`:`
    <div style="width:100%;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,rgba(74,222,128,.08),rgba(74,222,128,.03));border:1px solid rgba(74,222,128,.2);border-radius:12px;padding:18px 20px;margin-bottom:16px">
      <div>
        <div style="font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#4ade80;font-weight:700;margin-bottom:6px">DAILY ROUNDS</div>
        <div style="font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;font-size:26px;color:#fff;line-height:1;margin-bottom:4px">All done today 🎉</div>
        <div style="font-size:12px;color:rgba(255,255,255,.4)">All ${seen} clients checked in this week</div>
      </div>
      <div style="font-size:40px"><i class="ti ti-circle-check"></i></div>
    </div>`;
  root.innerHTML=`
    <div class="ccx-hdr">
      <div class="ccx-title">My Check-ins</div>
      <div class="ccx-sub">Week of ${_ccxFormatMonday(weekStart)}</div>
    </div>
    <div id="tb-coach-wrap" style="margin-bottom:16px"></div>
    <div id="duel-coach-wrap" style="margin-bottom:16px"></div>
    ${roundsBtn}
    <div class="ccx-progress-card">
      <div class="ccx-progress-row">
        <div><span class="ccx-progress-num">${seen}</span><span style="font-size:18px;color:rgba(255,255,255,.35);margin:0 4px">/</span><span style="font-size:18px;color:rgba(255,255,255,.5);font-weight:600">${total}</span></div>
        <div class="ccx-progress-lbl">coaching clients seen</div>
      </div>
      <div class="ccx-bar"><div class="ccx-bar-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="ccx-stats-row">
      <span class="ccx-stat-chip ccx-c-complete"><span class="ccx-pip"></span>${nComplete} complete</span>
      <span class="ccx-stat-chip ccx-c-progress"><span class="ccx-pip"></span>${nProgress} in progress</span>
      <span class="ccx-stat-chip ccx-c-overdue"><span class="ccx-pip"></span>${nOverdue} overdue</span>
    </div>
    ${rowsHtml||'<div class="ccx-empty">All caught up.</div>'}
  `;
  updateCcxNavDot();
  setTimeout(()=>{const wrap=document.getElementById('tb-coach-wrap');if(wrap)renderTeamBattleCoach(wrap);},100);
  setTimeout(()=>{
    const wrap=document.getElementById('duel-coach-wrap');
    if(wrap)renderDuelCoach(wrap);
  },150);
}
