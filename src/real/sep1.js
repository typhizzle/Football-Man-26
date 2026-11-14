// Spec section 11: measure separation, open vs contested catches, and completion %
// at EACH level. High school must be clearly easier than college, college than pro.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const res={};
  for(const lv of ['hs','col','pro']){
   startGame0(1,'reg');
   g.lv=lv;
   const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
   const R={att:0,comp:0,open:0,openComp:0,cont:0,contComp:0,seps:[],maxSep:[]};
   for(let n=0;n<70;n++){
    try{
     g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
     g.lv=lv;
     snap(pp[n%pp.length][0],pp[n%pp.length][1]);
     CAMI=1;g.sw=0;LY=0;
     let P=g.pl;if(!P||!P.qb)continue;
     for(let k=0;k<62;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
     P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;
     const q=P.qb;
     // best separation available anywhere on the field at the throw
     let best=null,bs=-1;
     (P.wr||[]).forEach(w=>{if(!w||w.out||w.y<q.y-2)return;
      const sep=Math.min(...(P.def||[]).map(d=>Math.hypot(d.x-w.x,d.y-w.y)));
      if(sep>bs){bs=sep;best=w}});
     if(!best)continue;
     R.maxSep.push(+bs.toFixed(2));
     const v=16+(S.q.pow||60)*.1,T=Math.max(.25,Math.hypot(best.x-q.x,best.y-q.y)/v);
     const tx=best.x+(best.vx||0)*T,ty=best.y+(best.vy||0)*T;
     if(tx<1||tx>52)continue;
     const dx=tx-q.x,dy=ty-q.y,d=Math.hypot(dx,dy);if(!(d>1))continue;
     const a=Math.atan2(dx,dy),p=Math.max(.05,Math.min(1,d/thrR()));
     const c0=(g.st&&g.st.cmp)||0;
     const wasOpen=bs>=2.6;
     try{swThrow(Math.sin(a),-Math.cos(a),p,q.x,q.y,null,null,null)}catch(e){continue}
     if(!P.air)continue;
     R.att++;R.seps.push(+bs.toFixed(2));
     if(wasOpen)R.open++;else R.cont++;
     for(let k=0;k<260;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
     if(((g.st&&g.st.cmp)||0)>c0){R.comp++;if(wasOpen)R.openComp++;else R.contComp++}
    }catch(e){}
   }
   const avg=A=>A.length?+(A.reduce((x,y)=>x+y,0)/A.length).toFixed(2):0;
   res[lv]={att:R.att,comp:R.comp,
     pct:R.att?Math.round(R.comp/R.att*100):0,
     avgSep:avg(R.seps),
     openThrows:R.open,openPct:R.open?Math.round(R.openComp/R.open*100):0,
     contested:R.cont,contPct:R.cont?Math.round(R.contComp/R.cont*100):0,
     pctOfThrowsOpen:R.att?Math.round(R.open/R.att*100):0};
  }
  return res;
 },save);
 ['hs','col','pro'].forEach(lv=>{
  const r=out[lv];if(!r)return;
  console.log(`${lv.toUpperCase().padEnd(4)} completions ${String(r.pct).padStart(3)}%  avg separation ${r.avgSep}yd  |  throws to OPEN men ${r.pctOfThrowsOpen}% (caught ${r.openPct}%)  contested ${r.contested} (caught ${r.contPct}%)  n=${r.att}`);
 });
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
