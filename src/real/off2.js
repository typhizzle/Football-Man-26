// Does the league offseason actually run? Finish the season, tap "Start the offseason",
// then walk every week and watch transactions / free agents / retirements / draft class.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const steps=[],warn=[];
  const snapshot=()=>({tx:(S.tx||[]).length,fa:((S.ro||{}).fa||[]).length,
                       retd:(S.retd||[]).length,dc:Object.keys(S.dc||{}).length});
  steps.push('start: yr='+yrN()+' wk='+S.wk+' psum='+(!!S.psum)+' '+JSON.stringify(snapshot()));
  // push to the end of the regular season quickly, then let it finish
  let g2=0;
  while(g2++<900 && !S.psum && S.stage=='pro'){
   try{const e=pevt();if(e&&e.o!=null)simUser();else pNext()}catch(err){try{pNext()}catch(e2){warn.push(String(err.message).slice(0,60));break}}
  }
  steps.push('season over? psum='+(!!S.psum)+' guard='+g2+' yr='+yrN());
  if(!S.psum)return{steps,warn,note:'could not finish the season'};
  if(!S.ofs){try{offStart()}catch(e){warn.push('offStart '+e.message)}}
  steps.push('offseason started='+(!!S.ofs)+' offOn='+offOn());
  for(let i=0;i<12 && S.ofs;i++){
   const w=S.ofs.w,bf=snapshot();
   try{offNext()}catch(e){warn.push('offNext w'+w+': '+e.message)}
   const af=snapshot();
   steps.push(`  w${w} ${(typeof OFFW!='undefined'&&OFFW[w]?OFFW[w][0]:'')} -> tx ${bf.tx}->${af.tx} | fa ${bf.fa}->${af.fa} | retired ${bf.retd}->${af.retd} | draftClasses ${bf.dc}->${af.dc}`);
  }
  return{steps,warn,final:snapshot(),
         dcYears:Object.keys(S.dc||{}).sort(),
         retSample:(S.retd||[]).slice(0,5).map(p=>`${p.n} ${p.pos} ${p.age}`)};
 },save);
 (out.steps||[]).forEach(l=>console.log(l));
 if(out.note)console.log('NOTE:',out.note);
 console.log('FINAL:',JSON.stringify(out.final));
 console.log('draft classes:',out.dcYears);
 console.log('retired sample:',out.retSample);
 console.log('warn:',(out.warn||[]).slice(0,5));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
