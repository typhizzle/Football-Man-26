// ===== 🧱 A JUMP BALL IS CONTESTED AFTER THE CATCH TOO =====
// Tyler 2026-11-16: "when you launch up a jump ball, the guy catches it and just is able to run straight to the end zone. There needs to
// be some kind of tackle animation or broken tackle animation." WHY: the defender who went up for it and lost was still in his
// recovery beat, so he couldn't tackle, and with nobody else close the receiver walked in. NOW: on a downfield catch (12+ yds) with a
// defender right there (within 2.2 yds), that defender gets one real tackle try a quarter-second after the catch: the game's own
// tackle (his tackling, +25 because he's already on him, vs the receiver's elusiveness; measured ~2 of 3 tackled): tackled on the spot, or he breaks it (stagger + "BROKE THE TACKLE!") and runs.
(()=>{try{const _l=land;land=function(){const P=g.pl,a=P&&P.air,w=a&&a.tgt;const r=_l.apply(this,arguments);try{if(P&&w&&P.car===w&&!P.done&&a.ly-g.los>=4){
  const D=P.db.concat(P.lb).map(d=>({d,e:Math.hypot(d.x-w.x,d.y-w.y)})).sort((x,y)=>x.e-y.e)[0];if(D&&D.e<2.2)P.jbT={d:D.d,t:P.t+.25,w}}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _u=upd;upd=function(dt){const r=_u.apply(this,arguments);try{const P=g&&g.pl,J=P&&P.jbT;if(J&&g.ph==='live'&&!P.done&&P.car===J.w&&P.t>=J.t){P.jbT=null;const d=J.d;
  if(Math.hypot(d.x-J.w.x,d.y-J.w.y)<3.2){d.cd=0;d.stun=0;d.x+=(J.w.x-d.x)*.5;d.y+=(J.w.y-d.y)*.5;const t0=d.tkl;d.tkl=(d.tkl||60)+25;try{hit(d)}finally{d.tkl=t0}if(!P.done&&P.car===J.w){g.flash='BROKE THE TACKLE!';g.ft=.8;try{const c=J.w;d.kbFrom=[d.x,d.y];d.kdS=performance.now();d.kdF=1;d.x+=(c.x-d.x)*.6;d.y+=(c.y-d.y)*.6;d.stun=.55;d.kdU=.55;d.kd=1;d.kdr=Math.atan2(c.x-d.x,c.y-d.y);d.cd=.6}catch(e){}}   /* Tyler 2026-11-17: a missed tackle is a dive: he lays out and hits the ground */}}else if(J&&(P.done||P.car!==J.w))P.jbT=null}catch(e){}return r}}catch(e){}})();
// after the catch the defenders close: anyone within 8 yds of the ball carrier gets up to an 8% burst, never more than the carrier's own
// speed, so only a truly faster man pulls away (Tyler 2026-11-17: "after the catch, the defender should be able to catch up")
(()=>{try{const _u=upd;upd=function(dt){try{const P=g&&g.pl;if(P&&g.ph==='live'&&P.passed&&!P.air&&P.car&&P.car!==P.qb&&!P.done&&!P.ir){const c=P.car;P.db.concat(P.lb).forEach(d=>{if(d.kd&&!(d.stun>0))d.kd=0;if(d.sp0==null)d.sp0=d.sp;const dd=Math.hypot(d.x-c.x,d.y-c.y);d.sp=dd<8?Math.max(d.sp0,Math.min((c.sp||d.sp0)*.99,d.sp0*1.08)):d.sp0})}}catch(e){}return _u.apply(this,arguments)}}catch(e){}})();
