// ===== 🧾 REAL PLAYERS CARRY ONLY REAL SEASONS (PLM audit, 2026-11-17) =====
// The game holds real stats for Tyler's real-counterpart players from 2022 on. For any earlier year it MADE UP seasons on random teams
// (genHist): in Tyler's Cam save 136 real players carried 721 invented pre-2022 seasons, some impossible (a 23-year-old with a
// 1,470-yard 2021). Same rule as when invented 2026-2029 seasons were removed: a real player keeps only real seasons. Made-up seasons
// before 2022 are taken off (career totals and teams recomputed from what remains); a hidden copy is kept (x.pre22x) so nothing is
// lost for good. Auto-generated players keep their backstories (they are fictional by design). New worlds never create them.
window.realSet=function(){if(window._RS)return _RS;const R=new Set();try{PKS.forEach(q=>R.add(q[2]))}catch(e){}try{QBX.forEach(q=>R.add(q[0]))}catch(e){}try{QBP.forEach(q=>R.add(q[0]))}catch(e){}try{(NPX0||[]).forEach(q=>R.add(q[0]))}catch(e){}try{if(typeof DKX!='undefined')R.add(DKX.n)}catch(e){}return window._RS=R};
window.pre22Fix=function(x,y0){try{if(!x||!x.n||!realSet().has(x.n))return 0;y0=2022;   /* the real data always starts in 2022 (uY0 is the save's own start year: 2026 in some saves, which would wipe real 2022-2025) */const bad=(x.h||[]).filter(r=>r[0]<y0),badP=(x.hp||[]).filter(r=>r[0]<y0);if(!bad.length&&!badP.length)return 0;
 x.pre22x={h:bad,hp:badP.length?badP:undefined,tm:(x.tm||[]).slice()};x.h=(x.h||[]).filter(r=>r[0]>=y0);if(x.hp)x.hp=x.hp.filter(r=>r[0]>=y0);
 const g=SG(x.pos);x.cs={};x.tm=[];x.h.forEach(r=>{if(g)csAdd(x,g,r.slice(2));tmAdd(x,r[1])});(x.hp||[]).forEach(r=>tmAdd(x,r[1]));x.ny=x.h.length+((x.hp||[]).length);
 try{const SE=S&&S.seal;if(SE){const ids=Object.keys(SE).filter(id=>SE[id]&&(id===x.pid||SE[id].n===x.n));ids.forEach(id=>{const e=SE[id];if(e.h)Object.keys(e.h).forEach(y=>{if(+y<y0)delete e.h[y]});if(Array.isArray(e.hL))e.hL=e.hL.filter(r=>{try{return JSON.parse(r)[0]>=y0}catch(_){return true}});if(Array.isArray(e.hpL))e.hpL=e.hpL.filter(r=>{try{return (typeof r==='string'?JSON.parse(r):r)[0]>=y0}catch(_){return true}});if(e.hx)Object.keys(e.hx).forEach(y=>{if(+y<y0)delete e.hx[y]});if(e.fy!=null&&e.fy<y0)e.fy=null;e.tm=(x.tm||[]).slice()})}}catch(e){}   /* the seal records the corrected history (it would put the made-up rows back) */
 return 1}catch(e){return 0}};
window.pre22All=function(s){try{s=s||S;if(!s||!s.ro||s.p22)return 0;const o=S;S=s;let n=0;try{const y0=2022;for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach(x=>{n+=pre22Fix(x,y0)})}}finally{S=o}s.p22=1;s.p22n=n;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)pre22All(r)}catch(e){}return r}}catch(e){}})();
// new rosters: whenever a real player's history is (re)built, nothing before the real window is kept
['uHist','uHistS'].forEach(f=>{try{const _f=window[f]||eval(f);const w=function(x){const r=_f.apply(this,arguments);try{pre22Fix(x)}catch(e){}return r};window[f]=w;try{eval(f+'=w')}catch(e){}}catch(e){}});
