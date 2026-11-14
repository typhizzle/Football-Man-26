// Count defenders that are MOTIONLESS for a meaningful stretch, by position.
// A linebacker standing still for more than half a second should be rare.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  startGame0(1,'reg');
  const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
  const still={},tot={},worstPlay={n:0,who:[]};
  for(let n=0;n<30;n++){
   try{
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
    snap(pp[n%pp.length][0],pp[n%pp.length][1]);
    CAMI=1;g.sw=0;LY=0;
    let P=g.pl;if(!P||!P.qb)continue;
    const runSt={};
    for(let k=0;k<80;k++){
     try{upd(0.03)}catch(e){}
     if(!g.pl||g.pl.done)break;
     if(k<8)continue;                       // ignore the snap itself
     [...(g.pl.db||[]),...(g.pl.lb||[])].forEach(d=>{
      const p=d.pos||'?';tot[p]=(tot[p]||0)+1;
      const v=Math.hypot(d.vx||0,d.vy||0);
      if(v<0.5){still[p]=(still[p]||0)+1;runSt[d.pos+(d.x|0)]=(runSt[d.pos+(d.x|0)]||0)+1}
      else runSt[d.pos+(d.x|0)]=0;
     });
    }
    // how many defenders were frozen 0.5s+ at the same time on this play
    const frozen=Object.keys(runSt).filter(k=>runSt[k]>=17);
    if(frozen.length>worstPlay.n)worstPlay={n:frozen.length,who:frozen};
   }catch(e){}
  }
  const pct={};Object.keys(tot).forEach(p=>pct[p]=+(100*(still[p]||0)/tot[p]).toFixed(1));
  return {pctOfTimeStill:pct,worstPlay};
 },save);
 console.log('percent of snapshots a defender was motionless, by position:');
 Object.keys(o.pctOfTimeStill).sort().forEach(k=>console.log('  '+k.padEnd(5)+o.pctOfTimeStill[k]+'%'));
 console.log('\nworst play: '+o.worstPlay.n+' defender(s) frozen half a second or more');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
