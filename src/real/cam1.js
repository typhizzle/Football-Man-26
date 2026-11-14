// CAMERA-VIEW passing test. The game loop runs first so the 3D camera is live and
// pj()/upj() are valid. The swipe is built the way a thumb does it: from the QB on
// screen toward the receiver on screen.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const R={};
  for(const cam of [0,3,5]){
   const A={att:0,comp:0,right:0,wrong:0,aim:[],oob:0,back:0,noThrow:0};
   startGame0(1,'reg');
   const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
   for(let n=0;n<55;n++){
    try{
     g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
     snap(pp[n%pp.length][0],pp[n%pp.length][1]);
     CAMI=cam;g.sw=0;
     let P=g.pl;if(!P||!P.qb)continue;
     // run the loop so the camera settles on the play
     for(let k=0;k<55;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
     P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;
     const q=P.qb;
     const el=(P.wr||[]).map((w,i)=>({w,i})).filter(o=>o.w&&!o.w.out&&o.w.y>q.y-2);
     if(!el.length)continue;
     const pick=el[n%el.length],t=pick.w;
     const v=16+(S.q.pow||60)*.1,T=Math.max(.25,Math.hypot(t.x-q.x,t.y-q.y)/v);
     const tx=t.x+(t.vx||0)*T,ty=t.y+(t.vy||0)*T;
     // where are they ON SCREEN?
     let qp,tp;
     try{qp=pj(q.x,q.y,1.6);tp=pj(tx,ty,1.0)}catch(e){continue}
     if(!qp||!tp)continue;
     const dx=tp[0]-qp[0],dy=tp[1]-qp[1],L=Math.hypot(dx,dy);
     if(!(L>12))continue;
     // a thumb swipe from low-centre toward the receiver
     // thumb starts low, finger lifts ON the receiver (what a player actually does)
     const x0=W/2,y0=H*0.86;
     const rx=tp[0],ry=tp[1];
     const gx=rx-x0,gy=ry-y0,gl=Math.hypot(gx,gy);
     if(!(gl>20))continue;
     const sx=gx/gl,sy=gy/gl;
     const p=Math.max(.08,Math.min(1,gl/(Math.min(W,H)*0.55)));
     const pts=[{x:x0,y:y0,t:performance.now()-140},{x:rx,y:ry,t:performance.now()}];
     const c0=(g.st&&g.st.cmp)||0;
     try{swThrow(sx,sy,p,x0,y0,pts,rx,ry)}catch(e){continue}
     if(!P.air){A.noThrow++;continue}
     A.att++;
     const err=Math.hypot(P.air.lx-tx,P.air.ly-ty);
     A.aim.push(+err.toFixed(1));
     if(P.air.ly<q.y)A.back++;                       // thrown BEHIND the quarterback
     if(P.air.lx<0||P.air.lx>53.3)A.oob++;
     for(let k=0;k<260;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
     if(((g.st&&g.st.cmp)||0)>c0){A.comp++;
      if((P.wr||[]).indexOf(g.pl&&g.pl.car)===pick.i)A.right++;else A.wrong++}
    }catch(e){}
   }
   const avg=X=>X.length?+(X.reduce((a,b)=>a+b,0)/X.length).toFixed(1):0;
   R['cam'+cam]={att:A.att,comp:A.comp,right:A.right,wrong:A.wrong,
     avgAim:avg(A.aim),worstAim:A.aim.length?Math.max(...A.aim):0,
     backwards:A.back,oob:A.oob,noThrow:A.noThrow};
  }
  return R;
 },save);
 Object.keys(out).forEach(k=>{const r=out[k];
  console.log(`${k}  throws ${r.att}  completions ${r.comp} (intended ${r.right}, WRONG MAN ${r.wrong})  aim err avg ${r.avgAim}yd worst ${r.worstAim}yd  thrown BACKWARDS ${r.backwards}  out-of-bounds ${r.oob}`);
 });
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
