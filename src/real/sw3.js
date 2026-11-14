// Flick-QB swipe: landing lies on the flicked line; power from speed; curve. args: W H cam
const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,CAM=+process.argv[4]||0,tag=process.argv[5]||'';const {b,pg,errs}=await H.open({w:W,h:Hh});
const wait=ms=>new Promise(r=>setTimeout(r,ms));const res=[];
await pg.evaluate(()=>{cv.setPointerCapture=()=>{};window.SWP=async(pts,ms)=>{const ev=(t,x,y)=>cv.dispatchEvent(new PointerEvent(t,{pointerId:7,clientX:x,clientY:y,bubbles:true}));ev('pointerdown',pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++){await new Promise(r=>setTimeout(r,ms/(pts.length-1)));ev('pointermove',pts[i][0],pts[i][1])}ev('pointerup',pts[pts.length-1][0],pts[pts.length-1][1])}});
for(const trial of ['onTarget','curveR','long']){
 const info=await pg.evaluate(async(CAM)=>{SLOT=1;if(!S){newC();start()}startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));CAMI=CAM;LY=0;LP=-.04;hut();await new Promise(r=>setTimeout(r,1250));
  const P=g.pl,q=P.qb;const C_=P.wr.filter(w=>Math.abs(w.x-q.x)<20&&w.y-q.y>8);const w=(C_.length?C_:P.wr).slice().sort((a,b)=>(b.y-a.y))[0];const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T;
  if(CAM==1){LY=Math.atan2(ex-q.x,ey-q.y);LP=-.12;await new Promise(r=>setTimeout(r,400))}const sp=pj(ex,ey,0);let O=CAM==1?[W/2,H]:pj(q.x,q.y,0);return{wi:P.wr.indexOf(w),lead:[ex,ey],need:Math.hypot(ex-q.x,ey-q.y),sp,O,R:thrR(),M:Math.min(W,H)}},CAM);
 const dx=info.sp[0]-info.O[0],dy=info.sp[1]-info.O[1],l=Math.hypot(dx,dy),ux=dx/l,uy=dy/l,M=info.M,Lpx=M*.45,pn=Math.min(1,(trial=='long'?info.need*1.6:info.need)/info.R),v=Math.max(.3,(pn-Lpx/(M*.9)*.25)/.75*M*.0095),ms=Lpx/v;
 const x0=W*.5,y0=Hh*.8;let pts=[];for(let i=0;i<=10;i++){const f=i/10;let px=x0+ux*Lpx*f,py=y0+uy*Lpx*f;if(trial=='curveR'){const off=Math.sin(Math.PI*f)*0;px+=(-uy)*0;py+=0;const bend=(f*f-f)*M*.12;px+=-uy*bend;py+=ux*bend}pts.push([px,py])}
 await pg.evaluate((a)=>SWP(a[0],a[1]),[pts,ms]);await wait(30);
 const r=await pg.evaluate(()=>{const P=g.pl,a=P.air;if(!a)return{none:1,flash:g.flash};const sp=pj(a.lx,a.ly,0);return{land:[+a.lx.toFixed(1),+a.ly.toFixed(1)],d:+Math.hypot(a.lx-a.x0,a.ly-a.y0).toFixed(1),swp:g.swp&&g.swp.p,cx:a.cx!=null,lsp:sp.map(Math.round),tgt:P.wr.indexOf(a.tgt)}});
 // how far the landing spot's screen position is from the flicked line through O
 let off=null;if(r.lsp){const vx=r.lsp[0]-info.O[0],vy=r.lsp[1]-info.O[1];off=Math.round(Math.abs(vx*uy-vy*ux))}
 res.push({trial,cam:CAM,need:+info.need.toFixed(1),R:+info.R.toFixed(1),wi:info.wi,lead:info.lead.map(v=>+v.toFixed(1)),...r,lineOffPx:off,miss:r.land?+Math.hypot(r.land[0]-info.lead[0],r.land[1]-info.lead[1]).toFixed(1):null});
 if(tag&&trial=='curveR'){for(const t of [0,.15,.3,.45,.6,.75]){await pg.evaluate(t=>{g.paused=1;const P=g.pl;if(P.air){P.t=P.tw+t;P.air.t=t}},t);await wait(300);await pg.screenshot({path:`/home/claude/real/thr/fl_${tag}_${CAM}_${t.toFixed(2)}.png`})}}
 await pg.evaluate(()=>{g.paused=1})}
res.forEach(x=>console.log(JSON.stringify(x)));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
