// FULL CAREER SOAK v2 — brand-new career, forced through to the pros, 10 pro seasons.
const H=require('/home/claude/real/h.js');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const out=await pg.evaluate(async()=>{
  const log=[],warn=[],T_=(s,f)=>{try{return f()}catch(e){warn.push(s+': '+e.message);return null}};
  T_('newC',()=>newC());
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v};
  set('nm','Soak Tester');set('nu','7');set('ht','Dallas');
  T_('start',()=>start());
  if(typeof S=='undefined'||!S||!S.seed)return{fatal:'no career',log,warn};
  log.push('career started, seed '+S.seed);

  // HS -> college
  T_('jumpCol',()=>jumpCol());
  T_('enroll',()=>{const L=colPick();enroll(L&&L.length?L[0].n:undefined)});
  log.push('stage after enroll: '+S.stage);

  // college: play out up to 4 seasons
  let g=0;
  while(S.stage=='col'&&g++<600){
   const e=T_('cevt',()=>cevt());
   if(!e)break;
   if(e.t=='sum'){ if((S.cy||1)>=3)break; T_('colNext',()=>colNext()); }
   else if(e.o!=null){ T_('simUser',()=>simUser()); }
   else { T_('cWeek',()=>cWeek(null,null)); }
  }
  log.push('college done cy='+S.cy+' guard='+g);

  // force into the draft and then the pros
  T_('declare',()=>{S.cdone=1;if(S.stage=='col')declare()});
  T_('draftStart',()=>{if(S.stage!='pro')draftStart()});
  T_('proStart',()=>{if(S.stage!='pro')proStart(5,10)});
  log.push('stage now '+S.stage+' year '+(typeof yrN=='function'?yrN():'?'));
  if(S.stage!='pro')return{fatal:'never reached pro',log,warn};

  // 10 pro seasons
  const y0=yrN(); g=0;
  while(S.stage=='pro'&&g++<6000&&(yrN()-y0)<10){
   const e=T_('pevt',()=>pevt());
   if(!e){T_('pNext',()=>pNext());continue}
   if(e.o!=null)T_('simUser',()=>simUser()); else T_('pNext',()=>pNext());
  }
  log.push('pro sim: '+(yrN()-y0)+' seasons, guard='+g+', now '+yrN());

  // ---- invariants ----
  const res={log,warn:warn.slice(0,10),badConf:[],blankMvp:[],ubRows:[]};
  for(let Y=2026;Y<=yrN()-1;Y++){
   try{const c=uChamp(Y);if(!c||c.ub==null)continue;
    const same=(c.ub<16)===(c.ru<16);
    const m=(c.sbm?String(c.sbm).trim():'');
    if(same)res.badConf.push(Y+' '+TA[c.ub]+'/'+TA[c.ru]);
    if(!m||m=='-'||m=='—')res.blankMvp.push(Y);
    res.ubRows.push(Y+': '+TA[c.ub]+' over '+TA[c.ru]+' — MVP '+(m||'BLANK'));
   }catch(e){res.badConf.push(Y+' ERR')}
  }
  res.dcYears=Object.keys(S.dc||{}).sort();
  res.dcSizes=res.dcYears.map(y=>y+':'+((S.dc[y].picks||[]).length)+'picks');
  try{res.faCount=faPool().length}catch(e){res.faCount='ERR'}
  try{res.retired=(S.retd||[]).length}catch(e){}
  try{res.txRows=(S.tx||[]).length}catch(e){}
  return res;
 });
 if(out.fatal){console.log('FATAL:',out.fatal);(out.log||[]).forEach(l=>console.log('  '+l));console.log('WARN:',out.warn);await b.close();return}
 console.log('--- LOG ---');out.log.forEach(l=>console.log('  '+l));
 console.log('\n--- ULTRA BOWLS (brand-new career) ---');out.ubRows.forEach(r=>console.log('  '+r));
 console.log('\nSame-conference finals :',out.badConf.length?out.badConf:'NONE');
 console.log('Blank Ultra Bowl MVPs :',out.blankMvp.length?out.blankMvp:'NONE');
 console.log('Draft classes generated:',out.dcSizes.length?out.dcSizes:'(none)');
 console.log('Free agent pool size  :',out.faCount);
 console.log('Retired players kept  :',out.retired);
 console.log('Transaction rows      :',out.txRows);
 console.log('Warnings:',out.warn);
 console.log('JS ERRORS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));
 await b.close();
})();
