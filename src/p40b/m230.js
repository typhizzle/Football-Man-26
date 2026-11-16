// ===== 🧱 A JUMP BALL IS CONTESTED AFTER THE CATCH TOO =====
// Tyler 2026-11-16: "when you launch up a jump ball, the guy catches it and just is able to run straight to the end zone. There needs to
// be some kind of tackle animation or broken tackle animation." WHY: the defender who went up for it and lost was still in his
// recovery beat, so he couldn't tackle, and with nobody else close the receiver walked in. NOW: on a downfield catch (12+ yds) with a
// defender right there (within 2.2 yds), that defender gets one real tackle try a quarter-second after the catch: the game's own
// tackle (his tackling, +25 because he's already on him, vs the receiver's elusiveness; measured ~2 of 3 tackled): tackled on the spot, or he breaks it (stagger + "BROKE THE TACKLE!") and runs.
(()=>{try{const _l=land;land=function(){const P=g.pl,a=P&&P.air,w=a&&a.tgt;const r=_l.apply(this,arguments);try{if(P&&w&&P.car===w&&!P.done&&a.ly-g.los>=12){
  const D=P.db.concat(P.lb).map(d=>({d,e:Math.hypot(d.x-w.x,d.y-w.y)})).sort((x,y)=>x.e-y.e)[0];if(D&&D.e<2.2)P.jbT={d:D.d,t:P.t+.25,w}}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _u=upd;upd=function(dt){const r=_u.apply(this,arguments);try{const P=g&&g.pl,J=P&&P.jbT;if(J&&g.ph==='live'&&!P.done&&P.car===J.w&&P.t>=J.t){P.jbT=null;const d=J.d;
  if(Math.hypot(d.x-J.w.x,d.y-J.w.y)<3.2){d.cd=0;d.stun=0;d.x+=(J.w.x-d.x)*.5;d.y+=(J.w.y-d.y)*.5;const t0=d.tkl;d.tkl=(d.tkl||60)+25;try{hit(d)}finally{d.tkl=t0}if(!P.done&&P.car===J.w){g.flash='BROKE THE TACKLE!';g.ft=.8}}}else if(J&&(P.done||P.car!==J.w))P.jbT=null}catch(e){}return r}}catch(e){}})();
