// swipe-to-throw + slingshot checks in a real game (page-side pointer events with real timing). args: W H cam
const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,CAM=+process.argv[4]||0;const {b,pg,errs}=await H.open({w:W,h:Hh});
const wait=ms=>new Promise(r=>setTimeout(r,ms));const res=[];
await pg.evaluate(()=>{cv.setPointerCapture=()=>{};const o=window.swThrow;window.swThrow=(sx,sy,p,x0,y0,...rest)=>{const P=g.pl,q=P.qb,b=[x0,y0],sa=Math.atan2(sx,-sy);window.__d={sa:+sa.toFixed(2),b:b.map(Math.round),dir:swDir(sx,sy).map(v=>+v.toFixed(2)),W:P.wr.map(w=>{const D=Math.hypot(w.x-q.x,w.y-q.y),T=D/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T,sp=pj(ex,ey,1.2),bk=v3.z>1,ra=Math.atan2(sp[0]-b[0],-(sp[1]-b[1]));return[+ra.toFixed(2),sp.map(Math.round),bk]})};return o(sx,sy,p,x0,y0,...rest)};window.SWP=async(x0,y0,x1,y1,ms,n)=>{const ev=(t,x,y)=>cv.dispatchEvent(new PointerEvent(t,{pointerId:7,clientX:x,clientY:y,bubbles:true}));ev('pointerdown',x0,y0);for(let i=1;i<=n;i++){await new Promise(r=>setTimeout(r,ms/n));ev('pointermove',x0+(x1-x0)*i/n,y0+(y1-y0)*i/n)}ev('pointerup',x1,y1)}});
const trials=['swipeWR','swipeHard','swipeSoft','swipeOff','sling','slingHalf'];
for(const trial of trials){
 const info=await pg.evaluate(async(CAM)=>{SLOT=1;if(!S){newC();start()}startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));CAMI=CAM;LY=0;LP=-.04;hut();await new Promise(r=>setTimeout(r,1250));
  const P=g.pl,q=P.qb;const C_=P.wr.filter(w=>Math.abs(w.x-q.x)<20&&w.y-q.y>8);const w=(C_.length?C_:P.wr).slice().sort((a,b)=>(b.y-a.y))[0];const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T;
  if(CAM==1){LY=Math.atan2(ex-q.x,ey-q.y);LP=-.12;await new Promise(r=>setTimeout(r,400))}const sp=pj(ex,ey,1.2),bb=swBall();return{wi:P.wr.indexOf(w),lead:[ex,ey],dist:Math.hypot(ex-q.x,ey-q.y),sp,bb,R:thrR()}},CAM);
 let x0=CAM==1?W/2:info.bb[0],y0=CAM==1?Hh*.62:Math.min(Hh-40,info.bb[1]+30);
 let dx=info.sp[0]-x0,dy=info.sp[1]-y0;const l=Math.hypot(dx,dy);let ux=dx/l,uy=dy/l;if(trial=='swipeOff'){const a=Math.atan2(uy,ux)+.6;ux=Math.cos(a);uy=Math.sin(a)}
 const M=Math.min(W,Hh);
 if(trial.startsWith('sling')){const sx=CAM==1||CAM==2?W*.72:x0,sy=CAM==1||CAM==2?Hh*.74:y0,k=trial=='sling'?.3:.13;await pg.evaluate((a)=>SWP(...a),[sx,sy,sx-ux*M*k,sy-uy*M*k,320,12])}
 else{const L=trial=='swipeSoft'?M*.28:trial=='swipeHard'?M*.7:M*.5,ms=trial=='swipeSoft'?240:trial=='swipeHard'?90:150;await pg.evaluate((a)=>SWP(...a),[x0,y0,x0+ux*L,y0+uy*L,ms,9])}
 await wait(40);const r=await pg.evaluate(()=>{const P=g.pl,a=P.air;const o=a?{tgt:P.wr.indexOf(a.tgt),land:[+a.lx.toFixed(1),+a.ly.toFixed(1)],d:+Math.hypot(a.lx-a.x0,a.ly-a.y0).toFixed(1),swp:g.swp&&g.swp.p}:{none:1,flash:g.flash};g.paused=1;return o});
 res.push({trial,sp0:info.sp.map(Math.round),st:[Math.round(x0),Math.round(y0)],sw:[+ux.toFixed(2),+uy.toFixed(2)],wi:info.wi,lead:info.lead.map(v=>+v.toFixed(1)),need:+info.dist.toFixed(1),R:+info.R.toFixed(1),...r,miss:r.land?+Math.hypot(r.land[0]-info.lead[0],r.land[1]-info.lead[1]).toFixed(1):null})}
console.log('CAM',CAM,W+'x'+Hh);res.forEach(x=>console.log(JSON.stringify(x)));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
