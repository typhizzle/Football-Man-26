// Walk the offseason week-by-week (like a player tapping) and watch S.dc / S.tx.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const warns=[];pg.on('console',m=>{if(/warn/i.test(m.type()))warns.push(m.text().slice(0,160))});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const steps=[],warn=[];
  // finish the current season so the offseason opens naturally
  let g=0;const y0=yrN();
  while(g++<3000&&!S.ofs&&(yrN()-y0)<2){
   try{const e=pevt();if(e&&e.o!=null)simUser();else pNext()}catch(err){try{pNext()}catch(e2){warn.push(String(err));break}}
  }
  steps.push('offseason open? '+(!!S.ofs)+' week='+(S.ofs?S.ofs.w:'-')+' year='+yrN());
  if(!S.ofs)return{steps,warn,note:'never reached an offseason'};
  // now tap through every offseason week
  for(let i=0;i<12 && S.ofs;i++){
   const before={w:S.ofs.w,dc:Object.keys(S.dc||{}).length,tx:(S.tx||[]).length,fa:((S.ro||{}).fa||[]).length};
   try{offNext()}catch(e){warn.push('offNext w'+before.w+': '+e.message)}
   const after={w:S.ofs?S.ofs.w:'ended',dc:Object.keys(S.dc||{}).length,tx:(S.tx||[]).length,fa:((S.ro||{}).fa||[]).length};
   steps.push(`w${before.w} -> w${after.w} | dc ${before.dc}->${after.dc} | tx ${before.tx}->${after.tx} | fa ${before.fa}->${after.fa}`);
  }
  return {steps,warn,
    dcYears:Object.keys(S.dc||{}).sort(),
    dcPicks:Object.keys(S.dc||{}).map(y=>y+':'+((S.dc[y].picks||[]).length)),
    tx:(S.tx||[]).length, lgPh:S.lgPh,
    faPool:(()=>{try{return faPool().length}catch(e){return 'ERR'}})()};
 },save);
 (out.steps||[]).forEach(s=>console.log('  '+s));
 console.log('\ndraft class years:',out.dcYears,out.dcPicks);
 console.log('transactions:',out.tx,' lgPh:',JSON.stringify(out.lgPh),' faPool:',out.faPool);
 console.log('warn:',(out.warn||[]).slice(0,6));
 console.log('console.warn:',warns.slice(0,6));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
