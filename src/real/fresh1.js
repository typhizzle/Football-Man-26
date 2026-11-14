// Decisive: in a BRAND NEW career with no legacy data, which key does the game file
// the user's own team roster under? That settles whether h.0 means "team 0" or "my team".
const H=require('/home/claude/real/h.js');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const o=await pg.evaluate(async()=>{
  const out={};
  SLOT=1;LASTJ='';
  try{newC();start()}catch(e){out.startErr=e.message}
  out.stage=S.stage;
  // drive the career to the pros
  let guard=0;
  while(S.stage!='pro'&&guard++<400){try{pNext()}catch(e){break}}
  out.reachedPro=(S.stage=='pro');out.steps=guard;
  if(!out.reachedPro)return out;
  out.myName=S.name;
  // which roster key actually contains ME?
  const found=[];
  for(let i=0;i<(S.T||[]).length;i++){
   let L;try{L=rost('h.'+i)}catch(e){continue}
   if((L||[]).some(x=>x&&x.n===S.name))found.push({key:'h.'+i,ab:TA[i],team:S.T[i].n});
  }
  out.iAmOn=found;
  // and what team does the game SAY I play for?
  out.saysMyTeam=(()=>{try{return S.T[S.ti!=null?S.ti:0].n}catch(e){return '?'}})();
  // do the rosters line up with their own slots in a clean save?
  out.auditFresh=roAudit();
  // what does h.0 claim?
  const L0=S.ro&&S.ro['h.0'];
  out.h0Claims=L0?roClaim(L0,TA):null;
  out.h0Slot=TA[0];
  return out;
 });
 Object.keys(o).forEach(k=>console.log(k.padEnd(16),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
