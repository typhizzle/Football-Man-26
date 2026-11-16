// ===== 📊 YOUR GAMES RECORD WHO REALLY HAD THE BALL =====
// Tyler, 2026-11-14: "running backs, receivers, tight ends: all of their catches and rushing attempts should be
// recorded properly in the game stats. Sometimes they kind of inflate those even though they only got a couple
// carries or catches" + "make sure the end game stats ... translate to the season stats".
// The game counted how many carries/catches each of your teammates had, but the box score then SPLIT your
// completions among the receivers by fixed shares (30% / 22% / 14% / 18% / 16%) and made up running-back
// yards from carries. Now every play you run is written down as it happens: who caught it (catch, yards, TD),
// who ran it (carry, yards, TD). Your game's box score is built from those real plays, and because season
// stats are the sum of the box scores, the real numbers flow into everyone's season line. Two-point tries
// don't count (like the real stat book). CPU-vs-CPU games are unchanged.
window.pstAdd=function(ri,k,v){g.pst=g.pst||{};const e=g.pst[ri]=g.pst[ri]||{rec:0,recy:0,rectd:0,car:0,ry:0,rtd:0};e[k]+=v};
(()=>{try{const _e=endPlay;endPlay=function(ye,tx,o){let P=null,was=true;try{P=g&&g.pl;was=!!(P&&P.done)}catch(e){}
 const r=_e.apply(this,arguments);
 try{if(P&&!was&&P.done&&!g.two){o=o||{};if(!o.int&&!o.inc&&!o.sk){const gn=Math.round(Math.min(ye,100)-g.los),td=ye>=100?1:0;
  if(P.passed&&P.car&&P.car!==P.qb&&P.car.ri!=null){pstAdd(P.car.ri,'rec',1);pstAdd(P.car.ri,'recy',gn);pstAdd(P.car.ri,'rectd',td)}
  else if(!P.passed&&P.car&&P.car===P.rb&&P.rb.ri!=null){pstAdd(P.rb.ri,'car',1);pstAdd(P.rb.ri,'ry',gn);pstAdd(P.rb.ri,'rtd',td)}}}}catch(e){}
 return r}}catch(e){}})();
// rebuild your side of your game's box score from the real plays
window.bxReal=function(bx,pre){try{const T=pre&&pre.pst;if(!bx||!T||!Object.keys(T).length)return bx;const A=bx.A,L=rost('h.0')||[];
 const rec=[],rush=[];Object.keys(T).forEach(ri=>{const e=T[ri],x=L[+ri];if(!x)return;
  if(e.rec>0)rec.push({n:x.n,p:x.pos,c:e.rec,y:e.recy,td:e.rectd});if(e.car>0)rush.push({n:x.n,p:x.pos,c:e.car,y:e.ry,td:e.rtd})});
 const qb=(A.rush||[]).find(z=>z.p==='QB');A.rec=rec.sort((a,b)=>b.y-a.y);A.rush=[...rush.sort((a,b)=>b.y-a.y),...(qb?[qb]:[])];
 A.ry=A.rush.reduce((s,z)=>s+(z.y||0),0);A.tot=(A.py||0)+A.ry;A.real=1;
 try{bx.B.def=bxDef(pre.oi,A,bxRng(bxHash(bxKey(pre.w,0,pre.oi)+'|real')))}catch(e){}
 return bx}catch(e){return bx}};
