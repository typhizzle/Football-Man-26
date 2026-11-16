// ===== 🧢 COACHES' LIVES MATTER — every coach has a permanent career record =====
// Tyler, 2026-11-14: "coaches their lives matter as well. Keep up with everything for them
// too. They shouldn't be fucked up."
// What the game did (measured on the 11-07 save): 212 head coaches + 32 GMs, none with an
// id or a season-by-season record. staffYear() REPLACED a retiring coach and he was gone
// from the save forever; fired coaches went to a pool trimmed to 60 (the rest erased).
//
// Now:
//  - every coach gets a permanent id (c.cid), added to him, never reused. A NAME IS NOT AN
//    IDENTITY: two coaches may share a name. Copies the game makes of him keep the id.
//  - S.cr.c[cid] is his record: every season he coached [year, level, club, W, L], every
//    job he was hired to, every exit (fired / retired / replaced) with the year. It only
//    ever GROWS. Nobody is removed from it, whatever happens to the pool.
//  - seasons are written from the game's own W-L at the moment it closes the season
//    (staffYear). Nothing he coached before this existed is invented: the old totals he
//    carries (c.w / c.l) are shown as "before records began", never split into fake years.

window.crS=function(s){s=s||S;if(!s)return null;s.cr=s.cr||{N:0,c:{},tm:{}};s.cr.c=s.cr.c||{};s.cr.tm=s.cr.tm||{};return s.cr};
window.crLbl=function(t){try{return (t.city?t.city+' ':'')+t.n}catch(e){return '?'}};
window.crLv=function(t){try{return t.dv?'pro':(typeof lvOf=='function'?lvOf(t):'')}catch(e){return ''}};
window.crId=function(c,s,st){try{if(!c||!c.n)return null;const R_=crS(s);
 if(!c.cid||!R_.c[c.cid]){if(!c.cid)c.cid='c'+(++R_.N);
  R_.c[c.cid]={n:c.n,g:c.gm?1:0,rows:[],hired:[],out:[],st:st||'active',
   pre:(c.w||c.l)?[c.w||0,c.l||0]:null}}       // what he had before records began
 return c.cid}catch(e){return null}};

// every coach in the save, wherever he is
window.crWalk=function(s,fn){try{
 const seen=new Set(),T=[];
 (s.pro||[]).forEach(t=>T.push(t));
 (s.col||[]).forEach(c=>(c.t||[]).forEach(t=>T.push(t)));
 ((s.hs&&s.hs.T)||[]).forEach(t=>T.push(t));
 (s.T||[]).forEach(t=>T.push(t));
 T.forEach(t=>{if(!t||seen.has(t))return;seen.add(t);
  if(t.cch)fn(t.cch,t,'hc');if(t.gmr)fn(t.gmr,t,'gm')});
 for(const k in (s.cpool||{}))(s.cpool[k]||[]).forEach(c=>fn(c,null,'pool'));
}catch(e){}};

// who is in each job now; any change since we last looked is written down
window.crSync=function(s,yr){try{const R_=crS(s);if(!R_)return;
 crWalk(s,(c,t,role)=>{
  const id=crId(c,s,role=='pool'?'free':'active');if(!id||!t)return;
  const key=role+'|'+crLbl(t),was=R_.tm[key],e=R_.c[id];
  if(was!==id){
   if(was&&R_.c[was]){const o=R_.c[was];
    if(!o.out.some(q=>q[0]===yr&&q[3]===crLbl(t)))o.out.push([yr,o.st==='retired'?'retired':'left',crLv(t),crLbl(t)]);
    if(o.st==='active')o.st='free'}
   if(was||R_.init)e.hired.push([yr,crLv(t),crLbl(t)]);
   R_.tm[key]=id;e.st='active'}
 });
 R_.init=1;
}catch(e){}};

// a season closes: record every coach at the level being played, then let the game move them
(()=>{try{const _sy=staffYear;
 staffYear=function(){
  let yr=0,lv='',pre={},poolBefore={};
  try{if(S&&S.T&&S.stage!='hs'){
   yr=yrN();lv=S.stage=='pro'?'pro':'col';crSync(S,yr);const R_=crS(S);
   S.T.forEach(t=>{[['hc',t.cch],['gm',t.gmr]].forEach(([role,c])=>{if(!c)return;
    const id=crId(c,S);const e=R_.c[id];pre[role+'|'+crLbl(t)]=id;
    if(!e.rows.some(q=>q[0]===yr&&q[2]===crLbl(t)))e.rows.push([yr,lv,crLbl(t),t.w||0,t.l||0])})});
   for(const k in (S.cpool||{}))(S.cpool[k]||[]).forEach(c=>{if(c&&c.cid)poolBefore[c.cid]=1});
  }}catch(e){}
  const r=_sy.apply(this,arguments);
  try{if(yr){const R_=crS(S);
   S.T.forEach(t=>{[['hc',t.cch],['gm',t.gmr]].forEach(([role,c])=>{const key=role+'|'+crLbl(t),old=pre[key];
    if(!old||!c||c.cid===old)return;
    const inPool=Object.values(S.cpool||{}).some(P=>(P||[]).some(x=>x&&x.cid===old));
    const o=R_.c[old];if(o){o.out.push([yr,inPool?'fired':'retired',lv,crLbl(t)]);o.st=inPool?'free':'retired'}
    const id=crId(c,S);R_.c[id].hired.push([yr+1,lv,crLbl(t)]);R_.c[id].st='active';R_.tm[key]=id})});
  }}catch(e){}
  return r};
}catch(e){}})();

// on every load: give every coach his id (additive only)
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);
 try{if(s&&s.T){const o=S;S=s;let y=0;try{y=yrN()}catch(e){}S=o;crSync(s,y)}}catch(e){}
 return s}}catch(e){}})();

// ---- screens: every coach, every season, Back on each ----
window.coachCard=function(id){const R_=crS(S),e=R_&&R_.c[id];if(!e)return coachV();
 const W=e.rows.reduce((a,q)=>a+q[3],0),L=e.rows.reduce((a,q)=>a+q[4],0);
 const ev=[...e.rows.map(q=>[q[0],`<span>${q[0]} ${q[2]} <small>(${q[1]})</small></span><b>${q[3]}-${q[4]}</b>`]),
  ...e.hired.map(q=>[q[0],`<span>${q[0]} <small>hired by ${q[2]}</small></span><b></b>`]),
  ...e.out.map(q=>[q[0],`<span>${q[0]} <small>${q[1]} — ${q[3]}</small></span><b></b>`])].sort((a,b)=>b[0]-a[0]);
 ui.innerHTML=`<div><h2>🧢 ${e.n}</h2><div class=card><b>${e.g?'General manager':'Head coach'}</b> · <small>${e.st==='retired'?'retired':e.st==='free'?'out of work':'working'}</small><br>
  <small>Recorded seasons ${e.rows.length} · ${W}-${L}${e.pre?` · before records began: ${e.pre[0]}-${e.pre[1]} (years not recorded)`:''}</small></div>
  <div class=card><b>Career</b>${ev.length?ev.map(x=>`<div class=row style="font-size:16px">${x[1]}</div>`).join(''):'<br><small>No season recorded yet.</small>'}</div>
  <button class=g onclick="coachV()">Back</button><button class=g onclick="hub()">✖ Leave</button></div>`;ui.scrollTop=0};

window.coachV=function(){const R_=crS(S);if(!R_)return hub();
 const all=Object.keys(R_.c).map(k=>[k,R_.c[k]]);
 const row=([k,e])=>`<div class=row onclick="coachCard('${k}')"><span>${e.n} <small>${e.g?'GM':'HC'}${e.rows.length?' · '+e.rows.length+' season'+(e.rows.length>1?'s':''):''}</small></span><b>${e.st==='retired'?'retired':e.st==='free'?'free':''}</b></div>`;
 const cur=all.filter(([k,e])=>e.st==='active'&&e.rows.length),gone=all.filter(([k,e])=>e.st!=='active');
 ui.innerHTML=`<div><h2>📜 Coach history</h2><div class=card><small>Every coach the league has had. Nobody is ever removed.</small></div>
  <div class=card><b>Coaching now (${cur.length})</b>${cur.map(row).join('')||'<br><small>Seasons are recorded from the end of this season on.</small>'}</div>
  <div class=card><b>Retired or out of work (${gone.length})</b>${gone.map(row).join('')||'<br><small>None yet.</small>'}</div>
  <button class=g onclick="hub()">✖ Leave</button></div>`;ui.scrollTop=0};

// a button on the coaches screen (added without re-parsing it, so its own buttons keep working)
(()=>{try{const _v=staffV;staffV=function(){const r=_v.apply(this,arguments);
 try{const d=ui.firstElementChild;if(d&&!d.querySelector('[data-crv]'))d.insertAdjacentHTML('beforeend','<button class=g data-crv=1 onclick="coachV()">📜 Coach history — every coach, every season</button>')}catch(e){}
 return r}}catch(e){}})();
