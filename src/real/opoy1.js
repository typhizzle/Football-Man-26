// Every statistical leader must be on the ballot, with his real numbers, and nothing
// may be truncated away. RB receiving must count.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  const yrs=Object.keys(S.law||{});
  out.seasonsWithBallots=yrs.length;
  if(!yrs.length)return out;
  const py=yrs[yrs.length-1],A0=S.law[py];
  out.before={OPOY:(A0.c.OPOY||[]).length,DPOY:(A0.c.DPOY||[]).length};
  out.beforeBlankLines=(A0.c.OPOY||[]).filter(z=>!z.ln).length;
  awFillAll();
  const A=S.law[py];
  out.after={OPOY:(A.c.OPOY||[]).length,DPOY:(A.c.DPOY||[]).length};
  out.afterBlankLines=(A.c.OPOY||[]).filter(z=>!z.ln).length;
  // every offensive category must have its leader present
  const C=awRanks(A.yr);
  const missing=[];
  AWOFF.concat(AWDEF).forEach(k=>{
   const L=C[k];if(!L||!L.length)return;
   const cat=AWOFF.includes(k)?'OPOY':'DPOY';
   if(!(A.c[cat]||[]).some(z=>z.n===L[0].x.n))missing.push(k+' -> '+L[0].x.n);
  });
  out.leadersMissing=missing;
  out.categoriesFound=Object.keys(C).map(k=>k+':'+C[k].length);
  // a running back's receiving must appear
  const rb=(C['receiving yards']||[]).find(e=>SG(e.x.pos)=='r');
  out.topRBinReceiving=rb?(rb.x.n+' ('+rb.x.pos+') '+awLine(rb.x,A.yr)):'none';
  out.sampleOPOY=(A.c.OPOY||[]).slice(0,6).map(z=>z.n+' ['+z.pos+'] '+(z.ln||'NO LINE'));
  out.sampleDPOY=(A.c.DPOY||[]).slice(0,4).map(z=>z.n+' ['+z.pos+'] '+(z.ln||'NO LINE'));
  // running it twice must not duplicate anyone
  A.ldr=0;awFillAll();
  const names=(S.law[py].c.OPOY||[]).map(z=>z.n);
  out.noDuplicatesAfterRerun=(new Set(names).size===names.length);
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(20),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
