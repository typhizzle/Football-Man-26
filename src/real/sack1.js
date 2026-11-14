// How much TIME does the quarterback actually get, and how often is he sacked?
// Also: completion % when throwing to a RANDOM eligible receiver (a human read)
// rather than always the most open man.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const res={};
  for(const lv of ['hs','pro']){
   const R={plays:0,sacked:0,times:[],pressAt:[],randAtt:0,randComp:0};
   const pp=[];
   startGame0(1,'reg');g.lv=lv;
   for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
   for(let n=0;n<70;n++){
    try{
     g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);g.lv=lv;
     snap(pp[n%pp.length][0],pp[n%pp.length][1]);
     CAMI=1;g.sw=0;LY=0;
     let P=g.pl;if(!P||!P.qb)continue;
     R.plays++;
     // hold the ball and see how long before a rusher is on top of him
     let t=0,press=null;
     for(let k=0;k<200;k++){
      try{upd(0.03)}catch(e){}
      t+=0.03;
      if(!g.pl||g.pl.done)break;
      const q=g.pl.qb;
      if(press===null&&q){
       const near=Math.min(...(g.pl.dl||g.pl.def||[]).map(d=>Math.hypot(d.x-q.x,d.y-q.y)));
       if(near<2.2)press=+t.toFixed(2);
      }
      if(g.pl.car!==g.pl.qb)break;      // sacked / handed off / scrambled past
      if(t>4.2)break;
     }
     if(press!=null)R.pressAt.push(press);
     if(g.pl&&g.pl.done){R.sacked++;R.times.push(+t.toFixed(2))}
     else R.times.push(+t.toFixed(2));
    }catch(e){}
   }
   // second pass: throw to a RANDOM receiver (a human read, not the best one)
   for(let n=0;n<60;n++){
    try{
     g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);g.lv=lv;
     snap(pp[n%pp.length][0],pp[n%pp.length][1]);
     CAMI=1;g.sw=0;LY=0;
     let P=g.pl;if(!P||!P.qb)continue;
     for(let k=0;k<55;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
     P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;
     const q=P.qb;
     const el=(P.wr||[]).filter(w=>w&&!w.out&&w.y>q.y-2);
     if(!el.length)continue;
     const t=el[n%el.length];
     const v=16+(S.q.pow||60)*.1,T=Math.max(.25,Math.hypot(t.x-q.x,t.y-q.y)/v);
     const tx=t.x+(t.vx||0)*T,ty=t.y+(t.vy||0)*T;
     if(tx<1||tx>52)continue;
     const dx=tx-q.x,dy=ty-q.y,d=Math.hypot(dx,dy);if(!(d>1))continue;
     const a=Math.atan2(dx,dy),p=Math.max(.05,Math.min(1,d/thrR()));
     const c0=(g.st&&g.st.cmp)||0;
     try{swThrow(Math.sin(a),-Math.cos(a),p,q.x,q.y,null,null,null)}catch(e){continue}
     if(!P.air)continue;R.randAtt++;
     for(let k=0;k<260;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
     if(((g.st&&g.st.cmp)||0)>c0)R.randComp++;
    }catch(e){}
   }
   const avg=A=>A.length?+(A.reduce((x,y)=>x+y,0)/A.length).toFixed(2):0;
   res[lv]={plays:R.plays,sacked:R.sacked,
     sackPct:R.plays?Math.round(R.sacked/R.plays*100):0,
     avgTime:avg(R.times),avgPressure:avg(R.pressAt),pressured:R.pressAt.length,
     randAtt:R.randAtt,randPct:R.randAtt?Math.round(R.randComp/R.randAtt*100):0};
  }
  return res;
 },save);
 ['hs','pro'].forEach(lv=>{const r=out[lv];if(!r)return;
  console.log(`${lv.toUpperCase()}  sacked ${r.sacked}/${r.plays} (${r.sackPct}%)  avg time with ball ${r.avgTime}s  pressure arrives ${r.avgPressure}s (${r.pressured} plays)  |  throwing to a RANDOM receiver: ${r.randPct}% of ${r.randAtt}`);
 });
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
