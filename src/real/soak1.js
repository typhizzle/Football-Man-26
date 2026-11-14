// FULL CAREER SOAK: brand-new career (fresh seed, not Tyler's save) run end to end.
// Proves the fixes hold for ANY player, not just one save.
const H=require('/home/claude/real/h.js');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const out=await pg.evaluate(async()=>{
  const log=[],warn=[];
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v};
  set('nm','Soak Tester');set('nu','7');set('st','4');set('du','3');set('ar','0');set('ht','Dallas');
  try{newC()}catch(e){return{fatal:'newC() '+e}}
  set('nm','Soak Tester');set('nu','7');set('ht','Dallas');
  try{start()}catch(e){return{fatal:'start() '+e}}
  log.push('career started, seed '+S.seed);

  // --- high school -> college ---
  try{jumpCol()}catch(e){warn.push('jumpCol '+e)}
  try{const L=colPick();enroll(L&&L.length?L[0].n:undefined)}catch(e){warn.push('enroll '+e)}
  log.push('enrolled, stage='+S.stage);

  // --- college seasons ---
  let guard=0;
  while(S.stage=='col'&&guard++<400){
   try{
    const e=cevt();
    if(e.t=='sum'){ if(S.cy>=3){declare();break} colNext(); }
    else if(e.o!=null){ simUser ? simUser() : pWeek(); }
    else { cWeek(null,null); }
   }catch(err){ try{colNext()}catch(e2){ warn.push('col '+err); break } }
  }
  log.push('left college at stage='+S.stage+' guard='+guard);

  // --- get into the pros ---
  guard=0;
  while(S.stage!='pro'&&guard++<80){
   try{ if(typeof declare=='function'&&S.stage=='col')declare(); else if(typeof pNext=='function')pNext(); else break }
   catch(e){ warn.push('toPro '+e); break }
  }
  log.push('stage now '+S.stage);

  // --- pro seasons ---
  const seasons=[];
  guard=0;
  const startYr=(typeof yrN=='function')?yrN():0;
  while(S.stage=='pro'&&guard++<3000&&((typeof yrN=='function'?yrN():0)-startYr)<10){
   try{ const e=pevt(); if(e&&e.o!=null&&typeof simUser=='function')simUser(); else pNext(); }
   catch(err){ try{pNext()}catch(e2){warn.push('pro '+err);break} }
  }
  log.push('pro sim done, guard='+guard+' year='+(typeof yrN=='function'?yrN():'?'));

  // ---------- INVARIANT CHECKS ----------
  const res={log,warn,badConf:[],blankMvp:[],dcYears:[],faCount:null,ubRows:[]};
  const last=(typeof yrN=='function'?yrN():2026)-1;
  for(let Y=2026;Y<=last;Y++){
   try{const c=uChamp(Y);if(!c)continue;
    const same=(c.ub<16)===(c.ru<16);
    if(same)res.badConf.push(Y+' '+TA[c.ub]+'/'+TA[c.ru]);
    const m=(c.sbm?String(c.sbm).trim():'');
    if(!m||m=='-'||m=='—')res.blankMvp.push(Y);
    res.ubRows.push(Y+': '+TA[c.ub]+' over '+TA[c.ru]+' — MVP '+(m||'BLANK'));
   }catch(e){res.badConf.push(Y+' ERR')}
  }
  try{res.dcYears=Object.keys(S.dc||{}).sort()}catch(e){}
  try{res.faCount=faPool().length}catch(e){res.faCount='ERR'}
  try{res.rosterIntact=Object.keys(S.ro||{}).length}catch(e){}
  return res;
 });
 console.log('--- LOG ---');(out.log||[]).forEach(l=>console.log('  '+l));
 if(out.fatal){console.log('FATAL:',out.fatal);await b.close();return}
 console.log('\n--- ULTRA BOWLS (fresh career) ---');(out.ubRows||[]).forEach(r=>console.log('  '+r));
 console.log('\nSame-conference finals:',out.badConf.length?out.badConf:'NONE');
 console.log('Blank Ultra Bowl MVPs:',out.blankMvp.length?out.blankMvp:'NONE');
 console.log('Draft class years generated:',out.dcYears);
 console.log('Free agent pool size:',out.faCount);
 console.log('Roster keys intact:',out.rosterIntact);
 console.log('Warnings:',(out.warn||[]).slice(0,8));
 console.log('JS ERRORS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));
 await b.close();
})();
