// RB receiving + QB rushing must now appear on the OPOY ballot, and Axel Jean
// specifically must show rushing, receiving and total yards.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  const key=Object.keys(S.law||{}).sort((a,b)=>b-a)[0];
  const A=S.law[key];out.year=A.yr;
  A.ldr=0;awAddLeaders(key);
  out.opoy=(A.c.OPOY||[]).map(c=>`${c.n} ${c.pos} — ${c.ln}`);
  // Axel Jean specifically
  (S.T||[]).forEach((t,i)=>{let L;try{L=rost('h.'+i)}catch(e){return}
   (L||[]).forEach(x=>{if(x&&x.n&&/Axel Jean/.test(x.n)){
     const h=(x.h||[]).find(e=>e[0]==A.yr);
     if(h)out.axel={raw:h,line:awLine(x,A.yr),career:{rush:x.cs&&x.cs.ryd,rec:x.cs&&x.cs.cyd}};
   }})});
  // a QB's line should now carry rushing
  const qb=(A.c.OPOY||[]).find(c=>c.pos=='QB');
  out.qbLine=qb?`${qb.n}: ${qb.ln}`:'(none)';
  // stability: backfill twice must not double anything
  const before=JSON.stringify((S.ro&&S.ro['h.0']||[]).filter(x=>x&&x.pos=='RB').map(x=>x.h));
  rbRecFill(S);
  const after=JSON.stringify((S.ro&&S.ro['h.0']||[]).filter(x=>x&&x.pos=='RB').map(x=>x.h));
  out.stableBackfill=(before===after);
  return out;
 },save);
 console.log('year:',o.year);
 console.log('\nAxel Jean:',JSON.stringify(o.axel));
 console.log('\nQB line  :',o.qbLine);
 console.log('\nOPOY ballot:');(o.opoy||[]).forEach(r=>console.log('  '+r));
 console.log('\nBackfill idempotent:',o.stableBackfill);
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
