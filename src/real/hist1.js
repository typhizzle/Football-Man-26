// The invariant: the past stays the past, and what is happening now becomes the past
// EXACTLY as it happened.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  // 1) snapshot every archived season row BEFORE anything runs
  const snap=()=>{const m={};(S.T||[]).forEach((t,i)=>{let L;try{L=rost('h.'+i)}catch(e){return}
    (L||[]).forEach(x=>{if(x&&x.h)x.h.forEach(h=>{m[x.n+'|'+h[0]]=h.join(',')})})});return m};
  const before=snap();
  out.archivedRowsBefore=Object.keys(before).length;

  // 2) the live season, as the ledger sees it
  const live=szFlat().filter(x=>x.ti===0&&(x.recy>0||x.ry>0||x.py>0));
  out.liveTracked=live.length;
  const sample=live.slice(0,3).map(x=>({n:x.n,py:x.py,ry:x.ry,recy:x.recy,rectd:x.rectd}));
  out.liveSample=sample;

  // 3) what WOULD be archived for those men
  out.wouldArchive=sample.map(x=>{
   const p=(rost('h.0')||[]).find(z=>z.n===x.n);
   const g=p?SG(p.pos):'?';
   const v=szArchiveV(0,p||{n:x.n},g);
   return x.n+' ['+g+'] -> '+(v?JSON.stringify(v):'NULL (falls back to formula)');
  });
  // a running back's archived row must carry all FOUR numbers
  const rb=live.find(x=>{const p=(rost('h.0')||[]).find(z=>z.n===x.n);return p&&SG(p.pos)=='r'});
  if(rb){const p=(rost('h.0')||[]).find(z=>z.n===rb.n);
   const v=szArchiveV(0,p,'r');
   out.rbArchive={name:rb.n,values:v,
     matchesLedger:!!(v&&v[0]===rb.ry&&v[1]===rb.rtd&&v[2]===rb.recy&&v[3]===rb.rectd),
     receivingIncluded:!!(v&&v.length===4)};
  }
  // 4) nothing already in the books may have moved
  const after=snap();
  const changed=Object.keys(before).filter(k=>before[k]!==after[k]);
  out.archivedRowsChanged=changed.length;
  out.whatChanged=changed.slice(0,5);
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(20),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
