// ===== 🔒 EVERY PLAYER'S LIFE MATTERS — the record is sealed =====
// Up to now the history was defended at the DISPLAY layer: a screen was stopped from
// printing something wrong. That is not the same as the record being safe, because the
// game could still write over it. Two things did:
//
//  1. seasonEnd capped a career at 14 rows and threw the OLDEST away:
//        x.h.push([yr,pi,...v]); if(x.h.length>14) x.h.splice(0,x.h.length-14);
//     Play a fifteenth year and your rookie season is deleted forever. 142 players in
//     Tyler's save are sitting exactly on that cap, losing a season every year they
//     play. That is the lost-season bug, written into the game. The cap is gone.
//
//  2. nothing stopped any later code from rewriting a season already in the books.
//
// So the record is now SEALED. The first time the game sees a player's career it takes a
// snapshot. From then on a sealed season may not be altered and may not disappear: if
// one does, it is put straight back, and the save counts it. Growth is untouched — a new
// season, a new club, a new award are all allowed. Only rewriting the past is refused.
//
// What this deliberately does NOT do: invent anything. A season whose numbers the game
// never computed is restored as a season PLAYED, with the club his own record names and
// no stat line, rather than filled with figures I made up. Made-up figures would be the
// very thing Tyler is trying to stop.

window.SEALV=2;

// A NAME IS NOT AN IDENTITY. Tyler's rule is that two different men may share a name,
// and his save has exactly that: a Bacon Miller on Las Vegas and a Bacon Miller on
// Washington, two real careers. Keying the record by name merged them — one man's
// thirteen seasons were written onto the other, which is the very thing the seal exists
// to stop. So every player carries a permanent id of his own. The id is ADDED to him and
// never replaces anything; if a roster is regenerated and the id is lost, he is matched
// back to his own record by name AND position AND the year his career starts, and only
// when exactly one record fits. Otherwise he is a new man with a new id, never someone
// else's history.
window.firstYr=function(x){try{
 const ys=(x.h||[]).map(r=>r&&r[0]).filter(y=>y!=null);
 return ys.length?Math.min.apply(null,ys):null;   // x.hx is deliberately excluded: it
 // can grow after the seal is taken, and an identity key must never move
}catch(e){return null}};

window.pidOf=function(s,x,claimed){try{
 if(x.pid&&s.seal&&s.seal[x.pid]){claimed&&claimed.add(x.pid);return x.pid}
 if(x.pid){claimed&&claimed.add(x.pid);return x.pid}
 const fy=firstYr(x),pos=x.pos||'';
 const fit=Object.keys(s.seal||{}).filter(k=>{
  const o=s.seal[k];
  return o&&o.n===x.n&&(o.p||'')===pos&&o.fy===fy&&!(claimed&&claimed.has(k));
 });
 if(fit.length===1){x.pid=fit[0];claimed&&claimed.add(fit[0]);return fit[0]}
 const id='p'+(s.pidN=(s.pidN||0)+1);
 x.pid=id;claimed&&claimed.add(id);return id;
}catch(e){return null}};

// a career, reduced to exactly what must never change
window.sealOf=function(x){try{
 if(!x||!x.n)return null;
 const h={};
 (x.h||[]).forEach(r=>{if(r&&r[0]!=null)h[r[0]]=r.slice()});
 const hx={};(x.hx||[]).forEach(r=>{if(r&&r[0]!=null)hx[r[0]]=r.slice()});
 // A YEAR IS NOT A KEY. A man traded mid-season has TWO rows for that year, on two
 // different clubs, each with its own stat line. Keying the record by year collapsed
 // them and overwrote the first with the second — my own seal destroying a season,
 // caught by the gate. Rows are held as an ordered LIST of exact rows instead.
 const hL=(x.h||[]).filter(r=>r&&r[0]!=null).map(r=>JSON.stringify(r));
 return {n:x.n,p:x.pos||'',fy:firstYr(x),tm:(x.tm||[]).filter(Boolean).slice(),h,hL,hx,v:SEALV};
}catch(e){return null}};

// every man in the save, wherever he is standing
window.sealWalk=function(s,fn){try{
 for(let i=0;i<(s.T||[]).length;i++){
  let L=null;
  try{const o=S;S=s;L=rost('h.'+i);S=o}catch(e){continue}
  (L||[]).forEach(x=>{if(x&&x.n)fn(x,i)});
 }
 try{((s.ro||{}).fa||[]).forEach(x=>{if(x&&x.n)fn(x,-1)})}catch(e){}
 try{(s.retd||[]).forEach(x=>{if(x&&x.n)fn(x,-1)})}catch(e){}
 try{(s.svRet||[]).forEach(x=>{if(x&&x.n)fn(x,-1)})}catch(e){}
}catch(e){}};

// the year now, so the season being played is not sealed while it is still moving
window.sealNow=function(s){try{
 const o=S;S=s;const y=(typeof yrN=='function')?yrN():0;S=o;return y||0;
}catch(e){return 0}};

// ---- the seal: take it, hold it, and put back anything that breaks it ----
window.sealCheck=function(s,opts){try{
 if(!s)return {sealed:0,restored:0,added:0,notes:[]};
 opts=opts||{};
 s.seal=s.seal||{};
 const nowY=sealNow(s);
 let sealed=0,restored=0,added=0,grew=0;
 const notes=[];
 const claimed=new Set();
 sealWalk(s,(x)=>{
  const cur=sealOf(x);if(!cur)return;
  const k=pidOf(s,x,claimed);if(!k)return;
  const old=s.seal[k];
  if(!old||old.v!==SEALV){
   // first sight of this man: his career as it stands becomes the record
   s.seal[k]=cur;sealed++;return;
  }
  // position is part of who he is
  if(old.p&&x.pos!==old.p){x.pos=old.p;restored++;
   if(notes.length<40)notes.push(x.n+': position put back to '+old.p)}
  // a club he played for is never un-played
  try{
   const have=(x.tm||[]).filter(Boolean);
   const miss=(old.tm||[]).filter(a=>have.indexOf(a)<0);
   if(miss.length){x.tm=(old.tm||[]).concat(have.filter(a=>(old.tm||[]).indexOf(a)<0));
    restored++;if(notes.length<40)notes.push(x.n+': teams put back — '+miss.join(', '))}
  }catch(e){}
  // every sealed season must still be there, exactly as it was. Matched as a MULTISET
  // of exact rows, so two rows for the same year both survive and neither is mistaken
  // for the other.
  const rows=x.h=x.h||[];
  const sealedL=(old.hL||Object.keys(old.h||{}).map(y=>JSON.stringify(old.h[y])))
    .filter(sr=>{try{const r=JSON.parse(sr);return !(nowY&&r[0]>=nowY)}catch(e){return false}});
  const curL=rows.map(r=>JSON.stringify(r));
  const used=curL.map(()=>false);
  const orphan=[];
  // pass 1: an exact row still present is accounted for
  sealedL.forEach(sr=>{
   let i=-1;
   for(let k=0;k<curL.length;k++){if(!used[k]&&curL[k]===sr){i=k;break}}
   if(i>=0)used[i]=true;else orphan.push(sr);
  });
  // pass 2: a sealed row with no exact match — if a row for the SAME year and SAME club
  // is sitting there with different numbers, that row was altered; otherwise it is gone
  orphan.forEach(sr=>{
   let want;try{want=JSON.parse(sr)}catch(e){return}
   let i=-1;
   for(let k=0;k<rows.length;k++){
    if(used[k]||!rows[k])continue;
    if(rows[k][0]===want[0]&&rows[k][1]===want[1]){i=k;break}
   }
   if(i>=0){
    rows[i]=want.slice();used[i]=true;restored++;
    if(notes.length<40)notes.push(x.n+': season '+want[0]+' had been altered — put back');
   }else{
    rows.push(want.slice());used.push(true);added++;
    if(notes.length<40)notes.push(x.n+': season '+want[0]+' was gone — put back');
   }
  });
  // a recovered season must not vanish either
  if(old.hx)Object.keys(old.hx).forEach(y=>{
   x.hx=x.hx||[];
   if(!x.hx.some(r=>r&&r[0]==y)){x.hx.push(old.hx[y].slice());added++;
    if(notes.length<40)notes.push(x.n+': recovered season '+y+' was gone — put back')}
  });
  if(x.hx&&x.hx.length){old.hx=old.hx||{};x.hx.forEach(r=>{if(r&&r[0]!=null&&!old.hx[r[0]])old.hx[r[0]]=r.slice()})}
  // a season he has newly played joins the seal. The past grows; it never changes.
  old.hL=old.hL||[];
  rows.forEach(r=>{
   if(!r||r[0]==null)return;
   const sr=JSON.stringify(r);
   if(old.hL.indexOf(sr)<0){old.hL.push(sr);grew++}
   if(old.h&&old.h[r[0]]==null)old.h[r[0]]=r.slice();
  });
  if(x.pos&&!old.p)old.p=x.pos;
  try{(x.tm||[]).forEach(a=>{if(a&&(old.tm||[]).indexOf(a)<0)(old.tm=old.tm||[]).push(a)})}catch(e){}
  rows.sort((a,b)=>(a[0]||0)-(b[0]||0));
 });
 if(restored||added){
  s.sealFix=(s.sealFix||0)+restored+added;
  try{if(typeof txAdd=='function')txAdd(s,'the record','altered','restored',
       'history restored: '+(added?added+' season(s) put back, ':'')+restored+' correction(s)')}catch(e){}
 }
 return {sealed,restored,added,grew,notes};
}catch(e){return {err:e.message}}};

// ---- recovering seasons the game dropped before the seal existed ----
// A player's own `ny` is the number of seasons he has played. Where he has fewer rows
// than that, seasons were destroyed — by the 14-row cap, or never written at all. The
// year and the club can be recovered from his own record. The STAT LINE cannot: it was
// never computed, and the game keeps no log of a finished season. So the season is
// restored as having been played, with no invented numbers in it.
window.sealRecover=function(s){try{
 if(!s)return {added:0,players:0,unknown:0};
 let add=0,pl=0,unknown=0;const sample=[];
 sealWalk(s,(x,slot)=>{
  if(!x||!x.h||x.ny==null)return;
  const g=(typeof SG=='function')?SG(x.pos):null;
  if(!g)return;                               // no stat line by design (the O line)
  const ys=x.h.map(r=>r&&r[0]).filter(y=>y!=null).sort((a,b)=>a-b);
  if(!ys.length)return;
  const miss=[];
  for(let y=ys[0];y<=ys[ys.length-1];y++)if(ys.indexOf(y)<0)miss.push(y);
  if(!miss.length)return;
  // the club for a missing year: the club his neighbouring seasons name. If the seasons
  // either side disagree, we do not know, and nothing is invented.
  let any=0;
  miss.forEach(y=>{
   let before=null,after=null;
   x.h.forEach(r=>{if(!r||r[0]==null)return;
    if(r[0]<y&&(before==null||r[0]>before[0]))before=r;
    if(r[0]>y&&(after==null||r[0]<after[0]))after=r});
   const ti=(before&&after&&before[1]===after[1])?before[1]:(before?before[1]:(after?after[1]:null));
   if(ti==null||(before&&after&&before[1]!==after[1])){unknown++;return}
   // a recovered season goes in its OWN list, never into x.h. A stat-less row inside
   // x.h was picked up by an older backfill and FILLED WITH INVENTED NUMBERS, which is
   // the one thing this must never do. x.hx is display-only: it records that the season
   // was played and for whom, and no stat code can reach it.
   x.hx=x.hx||[];
   if(!x.hx.some(r=>r&&r[0]===y))x.hx.push([y,ti]);
   add++;any=1;
  });
  if(any){pl++;x.hx.sort((a,b)=>(a[0]||0)-(b[0]||0));
   if(sample.length<10)sample.push(x.n+': '+miss.join(', '))}
 });
 return {added:add,players:pl,unknown,sample};
}catch(e){return {err:e.message}}};

// ---- run the seal on every load and every save ----
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);
  try{
   if(s){
    // recovery runs once per save, before the first seal is taken, so the seasons that
    // were already lost are inside the record the seal then protects
    if(!s.sealRec){const r=sealRecover(s);s.sealRec={v:SEALV,added:r.added,players:r.players,unknown:r.unknown}}
    sealCheck(s);
   }
  }catch(e){console.warn('seal',e)}
  return s}}catch(e){}})();
(()=>{try{const _sv=save;save=function(){
 try{if(typeof S!='undefined'&&S&&!(typeof RSEDIT!='undefined'&&RSEDIT))sealCheck(S)}catch(e){}
 return _sv.apply(this,arguments)}}catch(e){}})();

// ---- and a report anyone can read ----
window.sealReport=function(){try{
 const n=Object.keys((S.seal||{})).length;
 let rows=0,capped=0,rec=0;
 sealWalk(S,x=>{const h=(x.h||[]).length;rows+=h;if(h>14)capped++;rec+=(x.hx||[]).length});
 return {playersSealed:n,historyRows:rows,playersPast14Seasons:capped,recoveredSeasons:rec,
         correctionsEverMade:S.sealFix||0,recoveredAtImport:S.sealRec||null};
}catch(e){return {err:e.message}}};

// the career card shows every season he played, recovered ones included, newest first
window.hxMerge=function(x){try{
 const a=(x.h||[]).slice();
 (x.hx||[]).forEach(r=>{if(r&&r[0]!=null&&!a.some(q=>q&&q[0]===r[0]))a.push(r.slice())});
 return a.sort((p,q)=>(q[0]||0)-(p[0]||0));
}catch(e){return (x.h||[]).slice().reverse()}};

// ---- a detector for the damage seal v1 could do, so it can be reported not guessed ----
// Seal v1 keyed a season by its year, so a man with two rows for one year had the first
// overwritten by the second. Only players who were traded mid-season are affected. This
// finds them and reports; it changes nothing, because the overwritten numbers are gone
// and inventing replacements is exactly what must never happen.
window.sealDupScan=function(){try{
 const hit=[];
 sealWalk(S,x=>{
  const byY={};
  (x.h||[]).forEach(r=>{if(r&&r[0]!=null)(byY[r[0]]=byY[r[0]]||[]).push(JSON.stringify(r))});
  Object.keys(byY).forEach(y=>{
   const L=byY[y];if(L.length<2)return;
   if(new Set(L).size<L.length)hit.push(x.n+' — '+y+' appears twice with identical numbers');
  });
 });
 return {suspect:hit.length,players:hit.slice(0,30)};
}catch(e){return {err:e.message}}};
