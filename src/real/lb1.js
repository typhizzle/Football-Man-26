// Linebackers must be slower than corners, and NOBODY should be standing still.
// Measures speeds by position and how long defenders spend frozen on a stale spot.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  startGame0(1,'reg');
  const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
  const spd={},lagMax=[],stand={n:0,frames:0},sepAt=[];
  for(let n=0;n<34;n++){
   try{
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
    snap(pp[n%pp.length][0],pp[n%pp.length][1]);
    CAMI=1;g.sw=0;LY=0;
    let P=g.pl;if(!P||!P.qb)continue;
    // record speeds by position once
    [...(P.db||[]),...(P.lb||[])].forEach(d=>{
     const k=d.pos||'?';(spd[k]=spd[k]||[]).push(+(d.sp||0).toFixed(2));
    });
    (P.wr||[]).forEach(w=>{(spd['WR/'+(w.pos||'?')]=spd['WR/'+(w.pos||'?')]||[]).push(+(w.sp||0).toFixed(2))});
    for(let k=0;k<70;k++){
     try{upd(0.03)}catch(e){}
     if(!g.pl||g.pl.done)break;
     [...(g.pl.db||[]),...(g.pl.lb||[])].forEach(d=>{
      if(d.lag>0){stand.frames++;lagMax.push(+d.lag.toFixed(2))}
      const v=Math.hypot(d.vx||0,d.vy||0);
      if(v<0.4)stand.n++;
     });
    }
    const P2=g.pl;if(!P2||!P2.qb)continue;
    (P2.wr||[]).forEach(w=>{if(!w||w.out)return;
     sepAt.push(+Math.min(...(P2.def||[]).map(d=>Math.hypot(d.x-w.x,d.y-w.y))).toFixed(2))});
   }catch(e){}
  }
  const avg=A=>A.length?+(A.reduce((x,y)=>x+y,0)/A.length).toFixed(2):0;
  const out={speeds:{},maxLag:lagMax.length?Math.max(...lagMax):0,
             avgSepAllReceivers:avg(sepAt),
             nearStillSamples:stand.n,laggingFrames:stand.frames};
  Object.keys(spd).forEach(k=>out.speeds[k]=avg(spd[k]));
  return out;
 },save);
 console.log('speeds by position:');
 Object.keys(o.speeds).sort().forEach(k=>console.log('   '+k.padEnd(10)+o.speeds[k]));
 console.log('\nlongest bite (s):',o.maxLag,'  (must be <= 0.42)');
 console.log('frames a defender was mid-bite:',o.laggingFrames);
 console.log('samples where a defender was nearly motionless:',o.nearStillSamples);
 console.log('avg separation, ALL receivers:',o.avgSepAllReceivers,'yd');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
