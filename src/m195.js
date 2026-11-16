// ===== 🧍 EVERY PLAYER KEEPS HIS SPOT AND HIS POSITION (Tyler, 2026-11-15: "why the hell is Godfrey my running back? I made a running
// back for the Eagles. It was not Godfrey. I made him tight end ... All players should keep their own positions no matter what. Any
// players I made should not be removed.") =====
// WHAT HAPPENED: a roster is a list where the spot IS the job (0 QB, 1 RB, 2-4 WR, 5 TE, 6-10 line, 11-14 DL, 15-17 LB, 18-21 DB, 22 K,
// 23-24 backup QBs, then the bench). Taking over Jacque Hilton III left two "Jacque Hilton III" on the Eagles, and the duplicate
// cleaner (roGhosts) cut the "empty" one out of the list three times. Everyone behind him slid up a spot: Godfrey (TE) landed in the
// RB spot, Jaquan Barker (RB) fell to spot 22, the line and defense all shifted.
// NOW: (1) nothing is ever cut out of the starting spots; you are never treated as a duplicate of yourself.
//      (2) any roster whose starting spots don't match their positions is put back in order: each spot gets the player of that
//          position (the one already there if he fits, else the best of that position on the roster), backups behind them.
//          Nobody leaves the roster, nobody's position changes, nobody is made up. Runs on every load and after a takeover.
window.posG=function(p){try{return lgGrp(p)}catch(e){return p}};
window.POSFIX=function(L,keep0){try{if(!Array.isArray(L)||L.length<23)return 0;const P=POSL.map(posG);const gp=x=>x&&posG(x.pos);let bad=0;for(let j=keep0?1:0;j<P.length;j++){const x=L[j];if(x&&gp(x)!==P[j])bad++}
 const bq=[23,24].filter(j=>L[j]&&gp(L[j])!=='QB').length;if(!bad&&!bq)return 0;
 const all=L.filter(Boolean);const me=keep0?L[0]:null;const pool=all.filter(x=>x!==me);const used=new Set();const out=new Array(Math.max(L.length,25)).fill(null);if(me){out[0]=me;used.add(me)}
 // keep everyone who is already in the right spot
 for(let j=keep0?1:0;j<P.length;j++){const x=L[j];if(x&&gp(x)===P[j]&&!used.has(x)){out[j]=x;used.add(x)}}
 for(let j=keep0?1:0;j<P.length;j++){if(out[j])continue;const c=pool.filter(x=>!used.has(x)&&gp(x)===P[j]).sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];if(c){out[j]=c;used.add(c)}}
 // backup QBs
 [23,24].forEach(j=>{const x=L[j];if(x&&gp(x)==='QB'&&!used.has(x)){out[j]=x;used.add(x)}});
 [23,24].forEach(j=>{if(out[j])return;const c=pool.filter(x=>!used.has(x)&&gp(x)==='QB').sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];if(c){out[j]=c;used.add(c)}});
 // a spot nobody of that position can fill keeps whoever was there (no one is invented)
 for(let j=0;j<25;j++){if(out[j])continue;const x=L[j];if(x&&!used.has(x)){out[j]=x;used.add(x)}}
 // everyone else: the bench, in the order they were
 // still empty (nobody of that position on the roster): the first bench player stands in, never a hole
 for(let j=0;j<25;j++){if(out[j]||j>=L.filter(Boolean).length)continue;const x=L.filter(y=>y&&!used.has(y)).slice(-1)[0];if(x){out[j]=x;used.add(x)}}
 const rest=L.filter(x=>x&&!used.has(x));let w=25;const fin=out.slice(0,25);rest.forEach(x=>fin.push(x));
 for(let j=0;j<25;j++)if(!fin[j]){const x=rest.length?null:null;fin[j]=fin[j]||null}
 const before=all.length,after=fin.filter(Boolean).length;if(before!==after)return 0;   /* never lose anyone */
 L.length=0;fin.forEach(x=>L.push(x));while(L.length&&L[L.length-1]==null)L.pop();return bad+bq}catch(e){return 0}};
window.posFixAll=function(s){try{s=s||S;if(!s||!s.ro)return 0;let n=0;for(const k in s.ro){if(!/^[hp]\.\d+$/.test(k))continue;const L=s.ro[k];const mine=k==='h.0'&&L&&L[0]&&L[0].n===s.name;n+=POSFIX(L,mine)?1:0}if(n){s.posfix=(s.posfix||0)+n}return n}catch(e){return 0}};
// the duplicate cleaner: never cuts a starting spot, never touches you
(()=>{try{const _g=roGhosts;window.roGhosts=function(s){try{if(!s||!s.T||!s.ro)return {removed:0,names:[]};const seen={};
 for(let i=0;i<s.T.length;i++){const L=s.ro['h.'+i];if(!Array.isArray(L))continue;L.forEach((x,k)=>{if(!x||!x.n)return;(seen[x.n]=seen[x.n]||[]).push({i,k,rows:(x.h||[]).length,tms:(x.tm||[]).length,x})})}
 const out=[];Object.keys(seen).forEach(n=>{const C=seen[n];if(C.length<2||n===s.name)return;const real=C.filter(c=>c.rows>0||c.tms>0),shells=C.filter(c=>c.rows===0&&c.tms===0);if(!real.length||!shells.length)return;
  shells.forEach(sh=>{const L=s.ro['h.'+sh.i];const ix=L.indexOf(sh.x);if(ix>=25){L.splice(ix,1);out.push(n+' (empty bench copy on '+((s.T[sh.i]||{}).n||sh.i)+')')}})});return {removed:out.length,names:out}}catch(e){return {removed:0,names:[]}}}}catch(e){}})();
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r&&!r._noro)posFixAll(r)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _t=tkGo;tkGo=function(){const r=_t.apply(this,arguments);try{if(posFixAll(S))save()}catch(e){}return r}}catch(e){}})();
(()=>{try{const _p=proStart;proStart=function(){const r=_p.apply(this,arguments);try{posFixAll(S)}catch(e){}return r}}catch(e){}})();
