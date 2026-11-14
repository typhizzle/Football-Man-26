// Team sack rate per dropback at REALISTIC throw timing (2.6-3.2s), bucketed by
// how good the defensive line actually is. This is the number the player feels.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const res={};
  for(const lv of ['hs','col','pro']){
   const B={elite:{n:0,s:0},avg:{n:0,s:0},weak:{n:0,s:0}};
   startGame0(1,'reg');g.lv=lv;
   const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
   for(let n=0;n<270;n++){
    try{
     g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);g.lv=lv;
     snap(pp[n%pp.length][0],pp[n%pp.length][1]);
     CAMI=1;g.sw=0;LY=0;
     let P=g.pl;if(!P||!P.qb)continue;
     // force a spread of d-line quality so every bucket gets samples
     const tier=n%3;
     const RU=tier==0?92:tier==1?74:58;
     (P.dl||[]).forEach(d=>{d.rush=RU+Math.round((Math.random()-.5)*6)});
     const avgRush=(P.dl||[]).reduce((a,d)=>a+(d.rush||70),0)/Math.max(1,(P.dl||[]).length);
     const k=avgRush>=85?'elite':avgRush>=68?'avg':'weak';
     // hold the ball a realistic amount of time, then get rid of it
     const hold=2.6+Math.random()*0.6;
     let t=0,sacked=false;
     for(let f=0;f<400;f++){
      try{upd(0.03)}catch(e){}
      t+=0.03;
      if(!g.pl){sacked=true;break}
      if(g.pl.done){sacked=(g.pl.car===g.pl.qb);break}
      if(g.pl.car!==g.pl.qb){break}
      if(t>=hold)break;
     }
     B[k].n++; if(sacked)B[k].s++;
    }catch(e){}
   }
   res[lv]=Object.fromEntries(Object.keys(B).map(k=>[k,{n:B[k].n,sacks:B[k].s,pct:B[k].n?+(B[k].s/B[k].n*100).toFixed(1):0}]));
  }
  return res;
 },save);
 ['hs','col','pro'].forEach(lv=>{
  const r=out[lv];if(!r)return;
  console.log(`${lv.toUpperCase().padEnd(4)} elite ${String(r.elite.pct).padStart(5)}% (n=${r.elite.n})   average ${String(r.avg.pct).padStart(5)}% (n=${r.avg.n})   weak ${String(r.weak.pct).padStart(5)}% (n=${r.weak.n})`);
 });
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
