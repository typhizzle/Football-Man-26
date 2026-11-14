// THE test: put my finger on a man and the ball must go to THAT man.
// The 3D camera has to be live for pj() to mean anything, so the play is run and
// rendered before the swipe is built from the ball on screen to the receiver on screen.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({w:390,h:844,dpr:1});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const R_={};
  for(const cam of [0,1]){                       // 0 = camera view, 1 = first person
   const A={tries:0,noThrow:0,right:0,wrong:0,fellThrough:0,comp:0,byBox:0,byRay:0,offPx:[],aimYd:[],pickedWrongMan:0};
   startGame0(1,'reg');
   const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
   for(let n=0;n<48;n++){
    try{
     g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
     snap(pp[n%pp.length][0],pp[n%pp.length][1]);
     CAMI=cam;g.sw=0;if(cam==1)LY=0;
     // let the routes develop and the camera settle
     for(let k=0;k<46;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
     const P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;
     cm.updateMatrixWorld(true);rd.render(scn,cm);
     const q=P.qb;
     // pick a receiver downfield and aim AT HIM on screen
     const el=(P.wr||[]).map((w,i)=>({w,i})).filter(o=>o.w&&!o.w.out&&o.w.y>q.y+3);
     if(!el.length)continue;
     const pick=el[n%el.length],t=pick.w;
     const sp0=pj(t.x,t.y,1.0);if(!sp0)continue;
     // a real thumb is sloppy: land somewhere near him, not on his exact pixel
     const JIT=46,jr=()=>(Math.random()-.5)*2*JIT;
     const sp=[sp0[0]+jr(),sp0[1]+jr()];
     let O=(cam==1)?[W/2,H*.84]:(swBall()||pj(q.x,q.y,1.4));if(!O)continue;
     const gl=Math.hypot(sp[0]-O[0],sp[1]-O[1]);if(gl<30)continue;
     // what the targeting decides, before throwing
     const hit=swPick(sp[0],sp[1],O[0],O[1]);
     A.tries++;
     if(!hit){A.fellThrough++;continue}
     if(hit.w!==t){A.pickedWrongMan=(A.pickedWrongMan||0)+1}
     if(hit.how=='box')A.byBox++;else A.byRay++;
     A.offPx.push(+hit.off.toFixed(0));
     // now actually swipe it
     const ux=(sp[0]-O[0])/gl,uy=(sp[1]-O[1])/gl;
     const p=Math.max(.25,Math.min(1,gl/(Math.min(W,H)*.5)));
     const pts=[{x:O[0],y:O[1],t:performance.now()-150},{x:sp[0],y:sp[1],t:performance.now()}];
     const c0=(g.st&&g.st.cmp)||0;
     try{swThrow(ux,uy,p,O[0],O[1],pts,sp[0],sp[1])}catch(e){continue}
     if(!P.air){A.noThrow++;continue}
     const aimed=P.air.tgt||null;
     if(aimed===t)A.right++;else A.wrong++;
     A.aimYd.push(+Math.hypot(P.air.lx-t.x,P.air.ly-t.y).toFixed(1));
     for(let k=0;k<300;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
     if(((g.st&&g.st.cmp)||0)>c0)A.comp++;
    }catch(e){}
   }
   const avg=X=>X.length?+(X.reduce((a,b)=>a+b,0)/X.length).toFixed(0):0,avg2=X=>X.length?+(X.reduce((a,b)=>a+b,0)/X.length).toFixed(1):0;
   R_[cam==1?'firstPerson':'cameraView']={
    aimedAt:A.tries,pickedSomeone:A.byBox+A.byRay,underFinger:A.byBox,alongTheLine:A.byRay,
    noTargetFound:A.fellThrough,threwToTheRightMan:A.right,threwToSomeoneElse:A.wrong,
    didNotRelease:A.noThrow,completions:A.comp,targetingChoseWrongMan:A.pickedWrongMan,avgYdsFromHim:avg2(A.aimYd)};
  }
  return R_;
 },save);
 Object.keys(out).forEach(k=>{console.log('\n'+k.toUpperCase());
  Object.keys(out[k]).forEach(x=>console.log('  '+x.padEnd(22)+out[k][x]))});
 console.log('\nERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
