// ===== 🎯 ACCURACY MOVES SEASON TO SEASON (resets at each new level) =====
// Tyler, 2026-11-14: "I want to make sure that accuracy can be lowered even by each season. If they're 100 overall
// quarterback, then obviously there should be something to make them lose that 100 overall first before just
// automatically lowering it. But accuracy is something that doesn't have to be consistent throughout the college,
// pros, high school, all that it can reset after each level of play."
// After every season you finish (high school, college, pro), your accuracy moves with how you threw that season
// (passer rating): 105+ can earn +1, 90-105 holds (sometimes slips 1), 80-90 costs 1, under 80 costs 2-3. A season
// with fewer than 60 passes doesn't count. A 100 OVR is never touched (it has to be lost first: rough stretch or age).
// The swing never goes past -6 / +3 at one level, and when you move up a level (HS -> college -> pros) it resets:
// your accuracy goes back to what you trained it to. Training points you spent on accuracy always stay yours.
// Starts with the next season you finish; seasons already played are not re-judged.
window.passRtg=function(e){const a=e.att||0;if(!a)return 0;const c=x=>cl(x,0,2.375),A=c((e.cmp/a-.3)*5),B=c(((e.yds||0)/a-3)*.25),C=c((e.td||0)/a*20),D=c(2.375-(e.int||0)/a*25);return (A+B+C+D)/6*100};
window.accSwing=function(e){if(!e||(e.att||0)<60)return 0;const r=passRtg(e);let d;
 if(r>=105)d=R()<.5?1:0;else if(r>=90)d=R()<.2?-1:0;else if(r>=80)d=-1;else d=R()<.5?-2:-3;return d};
window.accTick=function(){try{if(!S||!S.q||!Array.isArray(S.hist))return;const st=S.stage=='draft'?'col':S.stage;
 if(S.accH==null){S.accH=S.hist.length;S.accSt=st;S.accSw=0;return}
 if(S.accSt!==st&&st){const back=S.accSw||0;if(back){S.q.acc=cl(S.q.acc-back,25,Math.min(99,ageCap(S.age||0)));S.fmsg=(S.fmsg?S.fmsg+' ':'')+`🎯 New level, fresh start: your accuracy is back to what you trained it to (${back>0?'-':'+'}${Math.abs(back)}).`}S.accSw=0;S.accSt=st}
 while(S.accH<S.hist.length){const e=S.hist[S.accH++];if(qo(S.q)>=100)continue;let d=accSwing(e);const sw=S.accSw||0;d=cl(sw+d,-6,3)-sw;
  const cap=Math.min(99,ageCap(S.age||0)),a0=S.q.acc;S.q.acc=cl(a0+d,25,Math.max(cap,a0));d=S.q.acc-a0;if(!d)continue;S.accSw=sw+d;
  const r=passRtg(e).toFixed(1);S.fmsg=(S.fmsg?S.fmsg+' ':'')+(d>0?`🎯 Accuracy +${d}: a sharp season (${r} passer rating).`:`🎯 Accuracy ${d} after an off season (${r} passer rating). You can train it back.`)}}catch(e){}};
(()=>{try{const _s=save;save=function(){try{accTick()}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
