// ===== 📋 YOUR SIMMED GAMES GET A REAL BOX SCORE (so your season stats and the league's agree) =====
// Tyler, 2026-11-15: "None of my stats are translating ... Literally with your game stats to your season stats, they should all be
// connected ... Every game that happens, that needs to be logged, like it happens."
// WHAT HAPPENED: when you simmed your own game, your line (att/cmp/yds/TD/INT) went into your season totals, but no box score was
// kept for that game. Every stats page that reads box scores (league leaders, player cards, "Full game stats") then made up a fresh
// line for that game, so your season page said 921 yards while the league page said 821. And when you sat behind the veteran, the
// made-up box score still named YOU as the passer.
// NOW: the exact line the sim gave you is stored as that game's box score; if you sat, the veteran (or the backup who started) is
// the passer in it and you are not in it at all.
(()=>{try{const _p=psim;psim=function(e){let st=null,wk=S?S.wk||0:0,sat=false;const _a=addStats;
 try{sat=!(pStarter()&&!injOut())}catch(_){}
 addStats=function(x){st=x;return _a.apply(this,arguments)};let r;try{r=_p.apply(this,arguments)}finally{addStats=_a}
 try{if(!e||e.t==='pbw'||!g||!g.s||g.oi==null)return r;const k=bxKey(wk,0,g.oi);S.bx=S.bx||{};if(S.bx[k])return r;
  const bx=bxMake(wk,0,g.oi,g.s[0],g.s[1],st&&!sat?st:null);
  if(sat){const L=rost('h.0'),v=(typeof injSub=='function'?injSub(L,0):null);const nm=(v&&v.n!==S.name?v.n:null)||S.vet||((L.slice(1).find(x=>x&&x.pos==='QB')||{}).n)||'Backup QB';
   const A=bx.A;(A.pass||[]).forEach(p=>{if(p.n===S.name)p.n=nm});(A.rush||[]).forEach(p=>{if(p.n===S.name)p.n=nm});(A.rec||[]).forEach(p=>{if(p.n===S.name)p.n=nm})}
  S.bx[k]=bx;const ks=Object.keys(S.bx);if(ks.length>60)ks.slice(0,ks.length-60).forEach(q=>delete S.bx[q]);try{szCache=null}catch(_){}save()}catch(err){console.warn('simbox',err)}return r}}catch(e){}})();
