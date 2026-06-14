// MARKER: WORKLIST_V2 — merged coach home worklist (renders above existing feed; nothing removed)
const _WL_SEV={critical:3,warning:2,info:1,positive:0};
function _wlReasons(c,ctx){
  if(!c)return[];
  const now=ctx.now||new Date();const reasons=[];
  if(c.membership_expiry){
    const days=Math.ceil((new Date(c.membership_expiry)-now)/86400000);
    if(days>=0&&days<=7)reasons.push({type:'renew',label:days===0?'Expires today':'Expires in '+days+'d',severity:'warning'});
  }
  const last=ctx.lastCheckinByClient?ctx.lastCheckinByClient[c.id]:null;
  const wkAgo=new Date(now);wkAgo.setDate(now.getDate()-7);
  if(!last){reasons.push({type:'no_checkin',label:'Never checked in',severity:'critical'});}
  else{const lastD=new Date(last);if(lastD<wkAgo){const d=Math.floor((now-lastD)/86400000);reasons.push({type:'no_checkin',label:'No check-in '+d+'d',severity:'critical'});}}
  if(typeof c.last_compliance_score==='number'&&c.last_compliance_score<50)reasons.push({type:'low_compliance',label:'Low compliance ('+Math.round(c.last_compliance_score)+'%)',severity:'warning'});
  const unread=ctx.unreadByClient?(ctx.unreadByClient[c.id]||0):0;
  if(unread>0)reasons.push({type:'unread',label:unread===1?'Unread message':unread+' unread',severity:'info'});
  return reasons;
}
function _wlPriority(rs){if(!rs||!rs.length)return 0;let s=0,a=0;for(const r of rs){const v=_WL_SEV[r.severity]||0;if(v>0){s+=v;a++;}}if(a>1)s+=(a-1)*0.5;return s;}
function _wlOnTrack(rs){return !rs.some(r=>(_WL_SEV[r.severity]||0)>0);}
function _wlIni(n){return (n||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();}
function _wlTag(sev){
  if(sev==='critical')return'background:rgba(255,71,87,.12);color:#ff5757';
  if(sev==='warning')return'background:rgba(251,191,36,.14);color:#fbbf24';
  if(sev==='positive')return'background:rgba(74,222,128,.12);color:#4ade80';
  return'background:rgba(78,168,222,.14);color:#4EA8DE';
}
function _wlAvatar(rs){const t=rs.slice().sort((a,b)=>(_WL_SEV[b.severity]||0)-(_WL_SEV[a.severity]||0))[0];return _wlTag(t?t.severity:'info');}
function _wlRow(c,reasons){
  const tags=reasons.map(r=>'<span style="'+_wlTag(r.severity)+';font-size:11px;padding:2px 8px;border-radius:99px;white-space:nowrap">'+r.label+'</span>').join(' ');
  const safe=(c.name||'—').replace(/'/g,"&#39;");
  return '<div onclick="openCoachClient(\''+c.id+'\')" style="background:rgba(255,255,255,.04);border:0.5px solid rgba(255,255,255,.08);border-radius:14px;padding:12px 13px;cursor:pointer;-webkit-tap-highlight-color:transparent">'
    +'<div style="display:flex;align-items:center;gap:11px">'
    +'<div style="width:40px;height:40px;border-radius:50%;'+_wlAvatar(reasons)+';display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0">'+_wlIni(c.name)+'</div>'
    +'<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:15px;color:#fff">'+safe+'</div>'
    +'<div style="display:flex;gap:5px;margin-top:3px;flex-wrap:wrap">'+tags+'</div></div>'
    +'<i class="ti ti-chevron-right" style="font-size:18px;color:rgba(255,255,255,.3);flex-shrink:0"></i></div></div>';
}
async function renderCoachWorklist(){
  const wrap=document.getElementById('cd-worklist');
  if(!wrap)return;
  if(typeof isWorklistActive!=='function')return;
  const active=(coachClients||[]).filter(isWorklistActive);
  // unread messages per client (one query)
  let unreadByClient={};
  try{
    const {data}=await sb.from('client_comments').select('client_id').eq('sender','client').eq('is_read',false);
    (data||[]).forEach(r=>{unreadByClient[r.client_id]=(unreadByClient[r.client_id]||0)+1;});
  }catch(e){}
  const ctx={now:new Date(),lastCheckinByClient:(typeof lastCheckinByClient!=='undefined'?lastCheckinByClient:{}),unreadByClient};
  let rows=active.map(c=>({c,reasons:_wlReasons(c,ctx)}));
  rows.forEach(r=>r.priority=_wlPriority(r.reasons));
  rows.sort((a,b)=>b.priority-a.priority);
  const actionable=rows.filter(r=>!_wlOnTrack(r.reasons));
  const onTrackCount=rows.length-actionable.length;
  const rowsHtml=actionable.map(r=>_wlRow(r.c,r.reasons)).join('');
  const headline=actionable.length>0
    ? actionable.length+' client'+(actionable.length!==1?'s':'')+' need you'
    : 'Everyone\'s on track';
  wrap.innerHTML=
    '<div style="font-family:var(--font-serif,Georgia,serif);font-style:italic;font-weight:300;font-size:24px;color:#fff;margin:4px 0 14px">'+headline+'</div>'
    +(actionable.length>0
      ? '<div style="display:flex;flex-direction:column;gap:8px">'+rowsHtml+'</div>'
      : '<div style="text-align:center;padding:30px 20px;color:rgba(255,255,255,.4);font-size:13px"><i class="ti ti-circle-check" style="font-size:28px;color:#4ade80;display:block;margin-bottom:8px"></i>All clients are on track today.</div>')
    +(onTrackCount>0&&actionable.length>0
      ? '<div style="text-align:center;padding:14px 0 4px;color:rgba(255,255,255,.35);font-size:12px"><i class="ti ti-check" style="font-size:13px"></i> '+onTrackCount+' other client'+(onTrackCount!==1?'s':'')+' on track</div>'
      : '');
}
