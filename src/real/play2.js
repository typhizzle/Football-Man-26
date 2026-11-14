// THE TEST THAT MATTERS: aim at a SPECIFIC receiver, then check who actually caught it.
// Completions alone prove nothing - the ball must go to the man you threw to.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  startGame0(1,'reg');
  const passPlays=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')passPlays.push([c,i])});
  const R={att:0,caught:0,rightMan:0,wrongMan:0,wrongDetail:[],aimErr:[],inc:0,pick:0,err:[]};

  for(let n=0;n<60;n++){
   try{
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;
    setup(0);snap(passPlays[n%passPlays.length][0],passPlays[n%passPlays.length][1]);
    CAMI=1;g.sw=0;LY=0;
    let P=g.pl;if(!P||!P.qb)continue;
    for(let k=0;k<55;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
    P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;
    const q=P.qb;
    // eligible targets downfield
    const elig=(P.wr||[]).map((w,i)=>({w,i})).filter(o=>o.w&&!o.w.out&&o.w.y>q.y-2);
    if(elig.length<2)continue;
    // deliberately rotate WHICH receiver we aim at - not always the most open.
    // this is the hard case: can the ball find the man you actually picked?
    const pick=elig[n%elig.length];
    const tgt=pick.w, tgtIdx=pick.i;
    const v=16+(S.q.pow||60)*.1;
    const T=Math.max(.25,Math.hypot(tgt.x-q.x,tgt.y-q.y)/v);
    const tx=tgt.x+(tgt.vx||0)*T, ty=tgt.y+(tgt.vy||0)*T;
    if(tx<1||tx>52)continue;                       // skip throws that lead out of bounds
    const dx=tx-q.x,dy=ty-q.y,d=Math.hypot(dx,dy);
    if(!(d>1))continue;
    const a=Math.atan2(dx,dy);
    const p=Math.max(.05,Math.min(1,d/thrR()));
    // how far is the NEXT nearest receiver? (tight = the hard case)
    let crowd=1e9;elig.forEach(o=>{if(o.i!==tgtIdx)crowd=Math.min(crowd,Math.hypot(o.w.x-tgt.x,o.w.y-tgt.y))});
    try{swThrow(Math.sin(a),-Math.cos(a),p,q.x,q.y,null,null,null)}catch(e){R.err.push(e.message);continue}
    if(!P.air)continue;
    R.att++;
    R.aimErr.push(+Math.hypot(P.air.lx-tx,P.air.ly-ty).toFixed(2));
    const cmp0=(g.st&&g.st.cmp)||0,int0=(g.st&&g.st.int)||0;
    for(let k=0;k<260;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
    const cmp1=(g.st&&g.st.cmp)||0,int1=(g.st&&g.st.int)||0;
    if(int1>int0){R.pick++;continue}
    if(cmp1>cmp0){
     R.caught++;
     const catcher=g.pl&&g.pl.car;
     const ci=(P.wr||[]).indexOf(catcher);
     if(ci===tgtIdx)R.rightMan++;
     else{R.wrongMan++;R.wrongDetail.push({aimedAt:'WR'+tgtIdx,caughtBy:'WR'+ci,crowd:+crowd.toFixed(1)})}
    } else R.inc++;
   }catch(e){R.err.push(String(e.message).slice(0,60))}
  }
  R.avgAimErr=R.aimErr.length?+(R.aimErr.reduce((x,y)=>x+y,0)/R.aimErr.length).toFixed(3):null;
  R.maxAimErr=R.aimErr.length?Math.max(...R.aimErr):null;
  return R;
 },save);
 console.log('throws at a SPECIFIC receiver :',out.att);
 console.log('completions                   :',out.caught);
 console.log('  caught by the INTENDED man  :',out.rightMan, out.caught?`(${Math.round(out.rightMan/out.caught*100)}%)`:'');
 console.log('  caught by the WRONG man     :',out.wrongMan);
 console.log('incomplete / intercepted      :',out.inc,'/',out.pick);
 console.log('aim error  avg / worst (yd)   :',out.avgAimErr,'/',out.maxAimErr);
 if(out.wrongDetail.length)console.log('wrong-man cases:',out.wrongDetail.slice(0,10));
 if(out.err.length)console.log('errors:',out.err.slice(0,4));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
