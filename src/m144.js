// ===== 📈 GOOD YEARS AND OFF YEARS: nobody owns the sim =====
// Tyler, 2026-11-14: "make sure that that's not OP ... other players actually at least have a chance to win
// MVP in the sim ... a 99 overall quarterback might score just as much as another, just depending on the
// teams and such too, and what kind of season they're having." (He may lead passing TDs; not every year.)
// Measured before (16 simmed seasons from his 2035 save): Drako September (99 QB on the league's best
// team) won MVP 9 of 16 and threw up to 52 TD; nothing changed year to year, so the best QB on the best
// team led every season. Now every team's passing game has a form for the season (a pass-heavy year or a
// run-heavy year, a hot year or an off year), the same for the CPU and for your simmed games. Team points
// are unchanged; only how the touchdowns are split between passing and rushing moves.
// It starts with the first season that begins after this update: seasons already played are not touched.
window.bxForm=function(ti){try{const v=S.sfv;if(!v)return 1;const y=yrN();if(y<=v.y)return 1;
 const t=S.T[ti];const pi=typeof pIdx=='function'?pIdx(t):ti;const r=rng((S.seed||1)*7717+y*131+(pi+1)*977);r();
 return cl((.78+r()*.44)*(typeof bxRecv=='function'?bxRecv(ti):1),.75,1.2)}catch(e){return 1}};   // form x receivers, never more than +20%
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&!s.sfv){const o=S;S=s;let y=0;try{y=yrN()}catch(e){}S=o;s.sfv={y}}}catch(e){}return s}}catch(e){}})();
// Your simmed games turned points into passing TDs at points/12 a game: at 99 OVR with a hot team that gave
// 54-60 TD seasons (the real record is 55). The league's own split gave a 99 only ~25, which is wrong the
// other way. From the next season your simmed games use points/14 with the same season form as everyone:
// a 99 on a ~30-point team averages high 30s, a great year reaches the high 40s, an off year the low 30s.
window.simTd=function(pts,gsv,old){try{const v=S.sfv;if(!v||yrN()<=v.y)return old;
 return Math.max(0,Math.min(5,Math.round((pts/15+(gsv||0)*.5)*bxForm(0))))}catch(e){return old}};
// Tyler, 2026-11-14: "receivers and tight ends really do play a big part on the quarterback success ... even a
// mid quarterback could be up there in stats because they have good receivers". In simmed games the passing
// share of a team's touchdowns and yards now also follows its pass catchers (WR1-3 + TE) against the league:
// the best corps adds up to ~12%, the worst takes off up to ~12%. Same rule for CPU and your simmed games;
// games you play yourself keep exactly what happened. From the next season on (S.sfv), like the form.
window.RCV={k:null,avg:70};
window.bxRecvQ=function(ti){try{const L=rost('h.'+ti)||[];const v=[2,3,4,5].map(k=>L[k]&&L[k].ovr||60);return v[0]*.32+v[1]*.26+v[2]*.16+v[3]*.26}catch(e){return 70}};
window.bxRecv=function(ti){try{const v=S.sfv;if(!v)return 1;const y=yrN();if(y<=v.y)return 1;
 const k=y+'|'+S.T.length;if(RCV.k!==k){let s=0;S.T.forEach((t,i)=>s+=bxRecvQ(i));RCV.k=k;RCV.avg=s/S.T.length}
 return cl(1+(bxRecvQ(ti)-RCV.avg)/60,.88,1.12)}catch(e){return 1}};
