// ===== ⏱ A WATCHED DRIVE'S CLOCK NEVER FREEZES · PRO BOWL WATCHED DRIVES SHOW THE SCHEDULED QB (Tyler 2026-11-17) =====
// "I'm watching it and the clock is not moving. It needs to move just like the player clock." The watched clock ran only while
// the ball was live and stopped once a play used its share; between plays it froze. Now: during a play it runs at game speed
// (like yours), between plays it keeps running down to where the play really ended (like your huddle/play clock), and it never
// goes backwards. The drive's total time is still exactly the simulated drive's.
(()=>{try{const _s=wStart;wStart=function(){const ck=W_&&W_.ck;const r=_s.apply(this,arguments);try{if(W_&&g.ph==='watch'){if(ck!=null&&ck>g.clk){g.clk=ck;W_.ca=ck;if(W_.cb<ck)W_.cb=ck}W_.ck=g.clk;W_.lt=performance.now()}}catch(e){}return r};window.wStart=wStart}catch(e){}})();
(()=>{try{const _t=wTick;wTick=function(dt){const r=_t.apply(this,arguments);try{if(W_&&W_.ck!=null&&g.ph==='watch'){const P=g.pl,dead=P&&(P.endAt||(P.e&&P.e.k==='inc'&&P.passed&&!P.air&&!P.car));const qEnd=(Math.floor(W_.ck/900)+1)*900;if(!dead)W_.ck=Math.min(qEnd,W_.ck+dt*(g.rate||12));g.clk=W_.ck}}catch(e){}return r};window.wTick=wTick}catch(e){}})();
window.wDeadClk=function(){try{if(!W_||W_.ck==null||g.ph!=='wdead')return;const now=performance.now(),dt=Math.min(.2,(now-(W_.lt||now))/1000);W_.lt=now;const left=Math.max(.05,g.dt||0);
 const e=g.pl&&g.pl.e,stop=e&&(['inc','int','fg','punt'].includes(e.k)||e.td||e.fum);   /* incompletion, score, turnover, kick: the clock stops until the snap */
 const qEnd=(Math.floor(W_.ck/900)+1)*900;   /* and at the end of a quarter */
 if(!stop&&W_.cb>W_.ck)W_.ck=Math.min(W_.cb,qEnd,W_.ck+(W_.cb-W_.ck)*Math.min(1,dt/left));g.clk=W_.ck}catch(e){}};
(()=>{try{const _d=draw;draw=function(){try{if(typeof W_!=='undefined'&&W_){if(g.ph==='watch')W_.lt=performance.now();else wDeadClk()}}catch(e){}return _d.apply(this,arguments)}}catch(e){}})();
// Pro Bowl: your team's watched drive shows the QB the rotation put in (not your team's backup)
(()=>{try{const _q=injQB;injQB=function(q){try{if(typeof PBGM!=='undefined'&&PBGM&&g&&g.kind==='pbg'){const c=pbLine(PBGM.me,pbQ(),0)[0];if(c){q.nm=String(c.n).split(' ').lnPop().toUpperCase().slice(0,13);const x=pbCopy(c);if(x&&x.num!=null)q.num=x.num;return}}}catch(e){}return _q.apply(this,arguments)};window.injQB=injQB}catch(e){}})();
// when the watched drive ends the clock stays where you saw it (no jump back to the simulated time)
(()=>{try{const _f=wFin;wFin=function(){try{window._wck=W_&&W_.ck}catch(e){}return _f.apply(this,arguments)};window.wFin=wFin}catch(e){}})();
['applyO','applyU'].forEach(n=>{try{const f=window[n];window[n]=function(){try{const ck=window._wck;window._wck=null;if(ck!=null&&g&&g.r){const base=g.clk<1800?1800:3600;g.r.sec=Math.max(0,base-ck)   /* the drive used exactly the time you watched */}}catch(e){}return f.apply(this,arguments)}}catch(e){}});
// ===== PRO PLAYOFF STATS ARE THEIR OWN LINE (Tyler 2026-11-17: "don't put playoff stats in your 2026 season stats") =====
// In the pros a playoff game goes only to your postseason totals (Career → Pro → Postseason), not to the season line or the
// regular-season career line, the way the NFL keeps them. High school and college are unchanged.
(()=>{try{const _a=addStats;addStats=function(st,w,post){if(post&&S&&S.stage==='pro'){const ss=JSON.stringify(S.ss),cs=JSON.stringify(S.cs);const r=_a.apply(this,arguments);try{S.ss=JSON.parse(ss);S.cs=JSON.parse(cs)}catch(e){}return r}return _a.apply(this,arguments)};window.addStats=addStats}catch(e){}})();
// a first pro season already holding playoff games in its season line: take them back out (they stay in the postseason totals)
window.ppStatFix=function(s){try{if(!s||s.stage!=='pro'||s.ppsf||(s.py||0)!==1)return;s.ppsf=1;const B=s.cst&&s.cst.pro&&s.cst.pro.post;if(!B||!B.g)return;
 for(const k in B){if(typeof B[k]!=='number')continue;if(typeof s.ss[k]==='number')s.ss[k]=Math.max(0,s.ss[k]-B[k]);if(typeof s.cs[k]==='number')s.cs[k]=Math.max(0,s.cs[k]-B[k])}}catch(e){}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{ppStatFix(r)}catch(e){}return r};window.mig=mig}catch(e){}})();
