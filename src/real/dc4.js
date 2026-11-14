// Correct test: finish the season (so S.psum exists, which offOn() requires),
// THEN start the offseason and walk all 8 weeks like a player.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const steps=[],warn=[];
  steps.push(`start: year=${yrN()} py=${S.py} wk=${S.wk} psum=${!!S.psum} dc=${Object.keys(S.dc||{}).length} tx=${(S.tx||[]).length}`);
  // play out the rest of this season until the season summary exists
  let g=0;
  while(g++<3000 && !S.psum && S.stage=='pro'){
   try{const e=pevt(); if(e&&e.o!=null)simUser(); else pNext();}
   catch(err){ try{pNext()}catch(e2){warn.push('adv: '+err.message);break} }
  }
  steps.push(`season finished: psum=${!!S.psum} offOn=${(typeof offOn=='function')?offOn():'?'} guard=${g} year=${yrN()}`);
  if(!S.psum)return{steps,warn,note:'could not reach end of season'};
  if(!S.ofs){try{offStart()}catch(e){warn.push('offStart: '+e.message)}}
  steps.push(`offseason started: ${!!S.ofs} w=${S.ofs?S.ofs.w:'-'} offOn=${offOn()}`);
  for(let i=0;i<14 && S.ofs;i++){
   const bw=S.ofs.w,bdc=Object.keys(S.dc||{}).length,btx=(S.tx||[]).length,bfa=((S.ro||{}).fa||[]).length;
   try{offNext()}catch(e){warn.push('offNext w'+bw+': '+e.message)}
   const aw=S.ofs?S.ofs.w:'ENDED';
   steps.push(`  w${bw} ${(typeof OFFW!='undefined'&&OFFW[bw]?OFFW[bw][0]:'')} -> w${aw} | dc ${bdc}->${Object.keys(S.dc||{}).length} | tx ${btx}->${(S.tx||[]).length} | fa ${bfa}->${((S.ro||{}).fa||[]).length}`);
  }
  return {steps,warn,
   dcYears:Object.keys(S.dc||{}).sort(),
   dcPicks:Object.keys(S.dc||{}).map(y=>y+':'+((S.dc[y].picks||[]).length)+' picks'),
   tx:(S.tx||[]).length, fa:((S.ro||{}).fa||[]).length, lgPh:S.lgPh,
   faPool:(()=>{try{return faPool().length}catch(e){return 'ERR'}})()};
 },save);
 (out.steps||[]).forEach(s=>console.log(s));
 if(out.note)console.log('NOTE:',out.note);
 console.log('\ndraft classes:',out.dcYears,out.dcPicks);
 console.log('transactions:',out.tx,'| FA list:',out.fa,'| faPool():',out.faPool,'| lgPh:',JSON.stringify(out.lgPh));
 console.log('warn:',(out.warn||[]).slice(0,6));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
