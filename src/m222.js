// ===== 🏷 NAME TAGS TOGGLE · 👀 FREE LOOK ON THE SIDELINE · 🚶 A LIVING BENCH =====
// Tyler, 2026-11-16: "There should also be a way to toggle name tags off, cause name tags can get in the way on the field." /
// "on sideline ... you should have more control on where you're looking around, because it just kind of auto locks on things and
// then maybe players should move around a little bit too. Some of them are obviously gonna be standing still watching the game,
// but maybe some are moving around as well."
// - Name tags: Names + numbers / Numbers only / Off. In Settings and in the pause menu during a game. Saved with your career.
// - Sideline look: free look. Drag (or the right stick) turns you anywhere, all the way around, and it stays where you leave it.
//   Double-tap looks back at the ball.
// - The bench: about a third of each team moves around (paces, wanders a few steps and back); the rest stand and turn to watch the ball.
window.NTAGS=[['all','Names + numbers'],['num','Numbers only'],['off','Off']];
window.ntagSet=function(v,back){S.ntag=v;try{save()}catch(e){}if(back==='pm')return pm();if(back==='set')return settings()};
window.ntagRow=function(back){const cur=S.ntag||'all';return `<div class=card data-ntag=1><b>🏷 Name tags on the field</b><p class=tabs>${NTAGS.map(([k,l])=>`<button class="${k===cur?'':'g'}" onclick="ntagSet('${k}','${back}')">${l}</button>`).join('')}</p></div>`};
(()=>{try{const _s=settings;settings=function(){const r=_s.apply(this,arguments);try{const d=ui.firstElementChild;if(d&&!d.querySelector('[data-ntag]')){const c=d.querySelector('.card');(c||d).insertAdjacentHTML(c?'afterend':'beforeend',ntagRow('set'))}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _p=pm;pm=function(){const r=_p.apply(this,arguments);try{if(ov&&!ov.querySelector('[data-ntag]')){const bs=[...ov.querySelectorAll('button')];const last=bs[bs.length-1];const h=ntagRow('pm');if(last)last.insertAdjacentHTML('beforebegin',h);else ov.insertAdjacentHTML('beforeend',h)}}catch(e){}return r}}catch(e){}})();
// ---- free look on the sideline ----
window.slLookBall=function(){SLV.ay=null;SLV.yo=0;SLV.po=0};
(()=>{let lastTap=0;cv.addEventListener('pointerdown',e=>{try{if(!slOnSide())return;const now=performance.now();if(now-lastTap<300&&!(e.clientX<W*.38&&e.clientY>H*.6))slLookBall();lastTap=now}catch(_){}})})();
// ---- the bench moves ----
window.slWander=function(c,t,dt){if(c.wd==null){c.wd=Math.random()<.33?1:0;c.bx=c.position.x;c.bz=c.position.z;c.tx=c.bx;c.tz=c.bz;c.nt=t+1+Math.random()*4}
 if(!c.wd){return false}
 if(t>c.nt){const sd=Math.sign(c.bx)||1;c.tx=c.bx+sd*(Math.random()*1.6-.8);c.tz=c.bz+(Math.random()*6-3);c.nt=t+3+Math.random()*6}
 const dx=c.tx-c.position.x,dz=c.tz-c.position.z,d=Math.hypot(dx,dz);if(d<.15)return false;const sp=Math.min(d,1.1*dt);c.position.x+=dx/d*sp;c.position.z+=dz/d*sp;c.rotation.y=Math.atan2(dx,dz);
 const s=Math.sin(t*9+c.ph)*.55;try{c.L[0].rotation.x=s;c.L[1].rotation.x=-s;c.A[0].rotation.x=-s*.5;c.A[1].rotation.x=s*.5}catch(e){}return true};
(()=>{try{let lt=performance.now()/1000;const _t=slTick;window.slTick=function(){const r=_t.apply(this,arguments);try{if(!SDL.children.length)return r;const t=performance.now()/1000,dt=Math.min(.1,t-lt);lt=t;const ballZ=-(cam-3);
  SDL.children.forEach(c=>{if(c===SLV.av||c.coach||!c.A||c.position.y>.05)return;if(slWander(c,t,dt))return;   // walking
   // watching: turn toward the ball, slowly
   const want=Math.atan2(26.5*0-c.position.x*0+(0-c.position.x),ballZ-c.position.z);let a=c.rotation.y,d=((want-a+Math.PI*3)%(Math.PI*2))-Math.PI;c.rotation.y=a+d*Math.min(1,dt*1.5);try{c.L[0].rotation.x=c.L[1].rotation.x=0}catch(e){}})}catch(e){}return r}}catch(e){}})();
