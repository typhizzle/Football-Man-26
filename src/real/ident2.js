// The harder audit: advance the world, then check identity again.
// Nobody may be renamed or vanish. Moving teams is allowed — but it must be RECORDED.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const snap=()=>{const m={};
   (S.T||[]).forEach((t,i)=>{let L;try{L=rost('h.'+i)}catch(e){return}
    (L||[]).forEach(x=>{if(x&&x.n)m[x.n]='team'+i})});
   try{(S.ro&&S.ro.fa||[]).forEach(x=>{if(x&&x.n)m[x.n]='FA'})}catch(e){}
   try{(S.retd||[]).forEach(x=>{if(x&&x.n)m[x.n]='retired'})}catch(e){}
   try{(S.svRet||[]).forEach(x=>{if(x&&x.n)m[x.n]=m[x.n]||'retired'})}catch(e){}
   return m};
  const out={};
  const before=snap();out.before=Object.keys(before).length;
  // advance several weeks
  let weeks=0;
  for(let i=0;i<6;i++){try{pNext();weeks++}catch(e){break}}
  out.weeksAdvanced=weeks;
  const mid=snap();out.afterWeeks=Object.keys(mid).length;
  const lostMid=Object.keys(before).filter(n=>!mid[n]);
  out.vanishedAfterWeeks=lostMid.slice(0,8);
  // now run a whole season end + offseason if we can
  let off=0;
  try{for(let i=0;i<30&&!offOn();i++){pNext()}
      if(offOn()){offStart();off=1}}catch(e){}
  out.reachedOffseason=!!off;
  if(off){try{for(let i=0;i<40&&offOn();i++)offNext()}catch(e){}}
  const after=snap();out.afterOffseason=Object.keys(after).length;
  const lost=Object.keys(before).filter(n=>!after[n]);
  out.vanishedTotal=lost.length;out.vanishedNames=lost.slice(0,10);
  const movedTeam=Object.keys(before).filter(n=>after[n]&&before[n]!==after[n]);
  out.movedTeam=movedTeam.length;
  out.movedSample=movedTeam.slice(0,6).map(n=>n+': '+before[n]+' -> '+after[n]);
  out.transactionsRecorded=(S.txn&&S.txn.length)||0;
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(22),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
