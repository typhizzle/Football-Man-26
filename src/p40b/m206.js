// ===== 🪪 ONE MAN, ONE RECORD (Player Lives Matter audit, 2026-11-16) =====
// The audit over Tyler's real saves found:
//  1. When a star retired, the quarterback who took his job was a COPY of him: same registry id, and the star's last season sitting
//     in the new man's history (Makai Neal carried Jarsh Fallon's 2036; Jimmy Cattle carried Ricky MaClones's 2036). On load, the
//     copy gets his own id and keeps only the seasons that are his; the original keeps everything.
//  2. The guard against stat lines from unplayed seasons ran before the free-agent-career calendar fix, so on a 2022-dated save it
//     could strip real 2022-2024 seasons (Kenny Fallon lost three). The calendar is now fixed first; Kenny Fallon's seasons are
//     restored from his record if a save lost them.
(()=>{try{const _g=statGuard;window.statGuard=function(s){try{if(typeof faYearFix=='function')faYearFix(s||S)}catch(e){}return _g.apply(this,arguments)}}catch(e){}})();
window.kfRestore=function(s){try{s=s||S;if(!s||!s.ro)return 0;let n=0;for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x||x.n!==KF26.n||!x.kf26)return;const have=new Set((x.h||[]).map(r=>r[0]));const miss=KF26.h.filter(r=>!have.has(r[0]));if(!miss.length)return;x.h=[...(x.h||[]),...miss.map(r=>r.slice())].sort((a,b)=>a[0]-b[0]);x.cs={};x.tm=[];x.h.forEach(r=>{csAdd(x,'w',r.slice(2));tmAdd(x,r[1])});tmAdd(x,9);x.ny=x.h.length;n++})}return n}catch(e){return 0}};
window.dupFix=function(s){try{s=s||S;if(!s||!s.ro)return 0;const by={};for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L)||k==='fa')continue;L.forEach((x,i)=>{if(x&&x.pid)(by[x.pid]=by[x.pid]||[]).push(x)})}let n=0;
 Object.keys(by).forEach(pid=>{const A=by[pid];if(A.length<2)return;const sealN=s.seal&&s.seal[pid]&&s.seal[pid].n;let keep=A.find(x=>x.n===sealN)||A.slice().sort((a,b)=>(b.ny||0)-(a.ny||0))[0];
  A.forEach(x=>{if(x===keep)return;const theirs=new Set((keep.h||[]).map(r=>JSON.stringify(r)));x.h=(x.h||[]).filter(r=>!theirs.has(JSON.stringify(r)));delete x.pid;try{const g=SG(x.pos);if(g){x.cs={};x.tm=[];x.h.forEach(r=>{csAdd(x,g,r.slice(2));tmAdd(x,r[1])})}}catch(e){}x.ny=x.h.length;try{if(typeof pcId=='function'){const S0=S;S=s;try{pcId(x)}finally{S=S0}}}catch(e){}n++})});
 if(n)s.dupfx=(s.dupfx||0)+n;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r){kfRestore(r);dupFix(r)}}catch(e){}return r}}catch(e){}})();
