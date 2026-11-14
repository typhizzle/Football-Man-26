// ===== ⏱ ONE CLOCK SPEED IN YOUR GAMES · 👕 AWAY WHITES THAT LOOK WHITE =====
// Tyler, 2026-11-14: "are all the times matching up ... no matter where you're watching playing or simming it ... Not the
// exact same amount of time, but they should move as fast as each other." Before: your plays ran the clock at your own
// pace, the other team's drives copied your pace but were capped (about 41 seconds a play at most), and "Sim to the end" /
// the injured-QB sims used a flat ~23 seconds a play. Now every simulated or watched drive in your game uses YOUR pace
// (seconds of game clock per play you actually run; before you've run 3 plays in a game, your average from earlier games).
// Hurry-up and clock-killing at the end of halves still speed up / slow down like before. CPU-vs-CPU games are unchanged.
window.sdtNow=function(){try{let p=null;if(g&&g.ptN>=3)p=g.ptS/g.ptN;else if(S&&S.pace)p=S.pace;return p?cl(p/23,.7,3):1}catch(e){return 1}};
['simRest','injRest','injOwn'].forEach(n=>{try{const f=window[n];if(typeof f!=='function')return;window[n]=function(){const o=SDT;SDT=sdtNow();try{return f.apply(this,arguments)}finally{SDT=o}}}catch(e){}});
(()=>{try{const _e=endGame;endGame=function(){try{if(g&&g.ptN>=3){const p=g.ptS/g.ptN;S.pace=S.pace?Math.round((S.pace*.7+p*.3)*10)/10:Math.round(p*10)/10}}catch(e){}return _e.apply(this,arguments)}}catch(e){}})();
// Tyler, 2026-11-14: "I haven't noticed home and away jerseys yet ... Still see color jerseys between two teams". The away
// team WAS in white, but the jersey number was drawn bigger than the chest, in the team colour, so from any distance the
// whole jersey read as that colour. Away numbers are now jersey-sized, so the white shows (home jerseys look the same).
(()=>{try{const _a=hmAway;window.hmAway=function(j){const r=_a.apply(this,arguments);r.aw=1;r.d=0;return r}}catch(e){}})();   /* plain white body: no chest band */
// Tyler, 2026-11-14: "home team wears home jerseys away team wears away jerseys except for the Cowboys. The Cowboys are the
// only team ... where is the opposite." Dallas (Wildcatters) already wore white at home. On the road they wore white too;
// now they wear their colours on the road (the opposite of everyone). The home team stays in its colours, unless the two
// look alike, then the home team switches to white (Dallas never changes).
(()=>{try{const _s=setMJ;setMJ=function(){const r=_s.apply(this,arguments);try{const ot=g.o,me=S.T[0],home=g.home===0;const visDal=home?hmWhiteHome(ot):hmWhiteHome(me);if(!visDal)return r;
 const cd=(a,b)=>{const p=h=>[1,3,5].map(i=>parseInt(String(h).slice(i,i+2),16)||0),A=p(a),B=p(b);return Math.hypot(A[0]-B[0],A[1]-B[1],A[2]-B[2])};
 const mjH={...S.jy,pc:S.jy.pc||'#f2f2f2',hc:myHc()},ojH={c1:ot.c1,c2:ot.c2,d:ot.d,hc:hcOf(ot),pc:ot.pc||0xdcdcdc};ojH.nc=lum(ojH.c1)>.5?'#000':'#fff';
 let mj,oj;if(home){mj=mjH;oj=ojH}else{mj=mjH;oj=ojH}   /* both in colours: the visitor is Dallas */
 if(cd(mj.c1,oj.c1)<110){if(home)mj=hmAway(mjH);else oj=hmAway(ojH)}   /* too alike: the HOME team goes white */
 g.mj=mj;g.oj=oj}catch(e){}return r}}catch(e){}})();
