// ===== 🏟️ THE SIDELINE: YOUR TEAM ON IT, YOU WALKING IT, WATCHING FROM IT =====
// Tyler, 2026-11-15: "where you stand with your team on the sideline and can watch it from the sideline. and third person view
// ... Make sure all times move the same for each play, no matter what angle it is. Each is literally just being interpreted as a
// camera angle, but you could walk around on the sideline".
// Both teams stand on their sidelines (yours on the near side, between the 25s). When a drive is watched you stand with them and the
// camera button cycles: 👀 Sideline (your eyes) -> 🧍 Third person (behind you) -> 📺 TV broadcast. Sideline is the default.
// Joystick (bottom-left) walks you along the sideline; drag anywhere else to look around (it drifts back to the ball).
// Only the camera changes: the play, its speed and the clock run exactly the same in every view.
window.SLV={m:'third',x:-31.2,z:-50,yo:0,po:0,lt:0,lk:null,av:null,lastT:0};
const SLX0=-33.4,SLX1=-28.4,SLZ0=-88,SLZ1=-12;
window.slOnSide=function(){try{return !!(g&&g.watch&&SLV.m!='tv'&&cv.style.display=='block')}catch(e){return false}};
window.slMe=function(){return !(W_&&W_.own&&!g.injW)};   // you're on the sideline unless it's your own drive and you're the one playing
// both benches: 18 a side, two rows, between the 25s, facing the field
window.SDL=new T3.Group();
window.slBuild=function(){try{if(!SDL.parent)scn.add(SDL);clr(SDL);SLV.av=null;const mk=(j,X,z,ry,num,sk)=>{const m=mk3(j,1.1,sk,{nm:'',num},null,1);m.position.set(X,0,z);m.rotation.y=ry;m.ph=Math.random()*6;try{mrgM(m)}catch(e){}SDL.add(m);return m};
 const used=new Set([S.num]);const nb=()=>{let n;do n=1+Math.floor(Math.random()*98);while(used.has(n));used.add(n);return n};
 [[g.mj,-1],[g.oj,1]].forEach(([j,sd])=>{for(let i=0;i<18;i++){const row=i%2,X=sd*(31.6+row*1.9),z=-30-(i>>1)*4.6-row*2.3;mk(j,X,z,sd<0?-Math.PI/2:Math.PI/2,nb(),SK[(i*7+(sd>0?3:0))%6])}});
 // the head coaches, out front of their benches (same look as on the field walk); they follow the ball up and down the sideline
 try{const cj=[{c1:'#23232f',c2:'#555555',d:0,pc:'#3a3a3a'},{c1:(g.o&&g.o.c1)||'#333333',c2:'#333333',d:0,pc:'#3a3a3a'}],ca=[{sk:1,hr:1,hcl:'#bbbbbb',fh:2,ht:1,bd:1},{sk:4,hr:3,hcl:'#777777',fh:2,ht:1,bd:1}];
  [-1,1].forEach((sd,i)=>{const m=mk3(cj[i],1.2,0,null,ca[i],1);m.position.set(sd*29.4,0,-50);m.rotation.y=sd<0?-Math.PI/2:Math.PI/2;m.coach=sd;m.ph=i*2;SDL.add(m);if(sd<0)SLV.coach=m})}catch(e){}
 // you
 const me=mk3(g.mj,1.1,0,{nm:g.mj.nm,num:S.num},S.ap,0,1);me.visible=false;SDL.add(me);SLV.av=me;SLV.x=-31.2;SLV.z=-50}catch(e){console.warn(e)}};
(()=>{try{const _c=cheerBuild;cheerBuild=function(){const r=_c.apply(this,arguments);try{slBuild()}catch(e){}return r}}catch(e){}})();
// each watched drive starts with you on the sideline where the ball is
window.slStart=function(){try{SLV.m=SLV.m0||'third';const y=(g.y||50);SLV.z=cl(-y,SLZ0,SLZ1);SLV.x=-31.2;SLV.yo=0;SLV.po=0;slCamTxt();
 // the coach is right there with you, a few steps up the sideline; the Skip button moves to the corner so it never covers you
 SDL.children.forEach(c=>{if(c.coach)c.position.z=cl(-y-3.5*(c.coach<0?1:-1),-88,-12)});
 ovHide();let k=document.getElementById('slskip');if(!k){k=document.createElement('button');k.id='slskip';k.className='g';k.textContent='Skip drive ⏭';k.setAttribute('onclick','skipW()');k.style.cssText='position:fixed;right:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);width:auto;padding:8px 12px;font-size:10px;z-index:6';document.body.appendChild(k)}k.style.display='block'}catch(e){}};
window.slCamTxt=function(){try{const b=$('#camb');if(!b||!g||!g.watch)return;b.textContent=SLV.m=='third'?'🧍 Sideline':SLV.m=='side'?'👀 Your eyes':'📺 TV broadcast'}catch(e){}};
(()=>{try{const _o=watchO;watchO=function(){const r=_o.apply(this,arguments);slStart();return r}}catch(e){}})();
(()=>{try{const _u=watchU;watchU=function(){const r=_u.apply(this,arguments);slStart();return r}}catch(e){}})();
(()=>{try{const _b=camb;camb=function(){if(g&&g.watch){const L=['third','side','tv'];SLV.m=L[(L.indexOf(SLV.m)+1)%3];SLV.m0=SLV.m;slCamTxt();return}return _b.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _f=wFin;wFin=function(){try{if(SLV.av)SLV.av.visible=false;const k=document.getElementById('slskip');if(k)k.style.display='none'}catch(e){}return _f.apply(this,arguments)}}catch(e){}})();
// walking + looking (only while watching from the sideline)
cv.addEventListener('pointerdown',e=>{try{if(!slOnSide())return;const x=e.clientX,y=e.clientY;if(x<W*.38&&y>H*.6&&!joy&&slMe()){joy={id:e.pointerId,ox:x,oy:y,x:0,y:0};try{cv.setPointerCapture(e.pointerId)}catch(_){}return}SLV.lk={id:e.pointerId,x,y};SLV.lt=performance.now()/1000}catch(_){}});
cv.addEventListener('pointermove',e=>{try{const L=SLV.lk;if(!L||e.pointerId!=L.id||!slOnSide())return;SLV.yo=cl(SLV.yo-(e.clientX-L.x)*.006,-1.6,1.6);SLV.po=cl(SLV.po-(e.clientY-L.y)*.004,-.5,.6);L.x=e.clientX;L.y=e.clientY;SLV.lt=performance.now()/1000}catch(_){}});
['pointerup','pointercancel'].forEach(k=>cv.addEventListener(k,e=>{try{if(SLV.lk&&e.pointerId==SLV.lk.id)SLV.lk=null;if(joy&&e.pointerId==joy.id&&g&&g.watch)joy=null}catch(_){}}));
// nobody stands in the lens: bench players and cheerleaders right at the camera (or between it and you) step out of the shot
window.slNear=function(cx,cz,R,mx,mz){try{SLV.hid=R>0?1:0;[SDL,CHR].forEach(G=>G.children.forEach(c=>{if(c===SLV.av)return;if(R<=0){c.visible=true;return}const x=c.position.x,z=c.position.z;
 const vx=mx-cx,vz=mz-cz,L2=vx*vx+vz*vz||1,t=Math.max(0,Math.min(1,((x-cx)*vx+(z-cz)*vz)/L2)),d=Math.hypot(x-(cx+vx*t),z-(cz+vz*t));c.visible=d>R*.55&&Math.hypot(x-cx,z-cz)>R}))}catch(e){}};
// the camera: the play is untouched; only where we look from changes
(()=>{try{const _g=camGame;camGame=function(qq,qx,por){try{
 const av=SLV.av,me=slMe();if(av)av.visible=!!(g&&g.watch&&me&&SLV.m=='third');if(!slOnSide()){if(SLV.hid){SLV.hid=0;slNear(0,0,0,0,0)}return _g.apply(this,arguments)}
 const now=performance.now()/1000,dt=Math.min(.05,Math.max(0,now-(SLV.lastT||now)));SLV.lastT=now;
 // where the action is (same smoothing the TV camera uses)
 const tx=fxs,tz=-(cam-3);
 // walk
 const ix=(joy&&me?joy.x:0)+(kb.x||0),iy=(joy&&me?joy.y:0)+(kb.y||0);let mv=0;
 const ya=Math.atan2(tz-SLV.z,tx-SLV.x)+SLV.yo,fx=Math.cos(ya),fz=Math.sin(ya);   // facing
 if(me&&(ix||iy)){const sp=5.5*dt,rx=-fz,rz=fx;SLV.x=cl(SLV.x+(fx*iy+rx*ix)*sp,SLX0,SLX1);SLV.z=cl(SLV.z+(fz*iy+rz*ix)*sp,SLZ0,SLZ1);mv=1}
 if(!me){SLV.x=-31.2;SLV.z+=(cl(tz,SLZ0,SLZ1)-SLV.z)*.03}   // your own drive: a sideline camera keeps up with the ball
 if(!SLV.lk&&now-SLV.lt>2.2){SLV.yo*=.96;SLV.po*=.96}   // drift back to the ball
 if(av){av.position.set(SLV.x,mv?Math.abs(Math.sin(now*12))*.1:0,SLV.z);av.rotation.y=-ya-Math.PI/2;const s=mv?Math.sin(now*12)*.7:0;try{av.L[0].rotation.x=s;av.L[1].rotation.x=-s;av.A[0].rotation.x=-s*.6;av.A[1].rotation.x=s*.6}catch(e){}}
 const lp=SLV.po-.06;let px,py,pz,fv;
 if(SLV.m=='third'&&me){const bk=Math.min(4,Math.max(1.2,(SLV.x+35.2)/Math.max(.2,Math.abs(fx))));px=SLV.x-fx*bk;pz=SLV.z-fz*bk;py=5.4;fv=por?78:58}else{px=SLV.x;pz=SLV.z;py=2.75;fv=por?82:60}
 cm.position.set(px,py,pz);slNear(px,pz,SLV.m=='third'&&me?3.6:2.4,me?SLV.x:px,me?SLV.z:pz);const D=30;cm.lookAt(px+fx*D*Math.cos(lp),py+Math.sin(lp)*D-(SLV.m=="third"?4.6:1.6),pz+fz*D*Math.cos(lp));return fv
}catch(e){return _g.apply(this,arguments)}}}catch(e){}})();
// benches breathe a little; they cheer a touchdown for their side
window.slTick=function(){try{if(!(g&&g.watch)){const k=document.getElementById('slskip');if(k&&k.style.display!=='none')k.style.display='none'}if(!SDL.children.length)return;const t=performance.now()/1000,td=g&&(g.ph=='dead'||g.ph=='wdead')&&g.out&&g.out.k=='td';
 SDL.children.forEach(c=>{if(c===SLV.av||!c.A)return;if(c.coach){const tz=cl(-(cam-3)-3.5*(c.coach<0?1:-1),-88,-12),dz=tz-c.position.z,mv=Math.abs(dz)>1.2;if(mv)c.position.z+=Math.sign(dz)*Math.min(Math.abs(dz),.11);const s=mv?Math.sin(t*10)*.6:0;try{c.L[0].rotation.x=s;c.L[1].rotation.x=-s}catch(e){}c.rotation.y=mv?(dz<0?Math.PI:0):(c.coach<0?-Math.PI/2:Math.PI/2)}const home=c.position.x<0,hype=td&&(home?!g.sw:!!g.sw);if(hype){const s=Math.abs(Math.sin(t*7+c.ph));c.position.y=s*.7;c.A[0].rotation.x=c.A[1].rotation.x=2.8}else{c.position.y=0;c.A[0].rotation.x=c.A[1].rotation.x=Math.sin(t*1.3+c.ph)*.08}})}catch(e){}};
(()=>{try{const _t=cheerTick;cheerTick=function(){const r=_t.apply(this,arguments);slTick();return r}}catch(e){}})();
(()=>{try{const _s=scene;scene=function(m){const r=_s.apply(this,arguments);try{SDL.visible=m=='game';if(m!='game'){const k=document.getElementById('slskip');if(k)k.style.display='none'}}catch(e){}return r}}catch(e){}})();
