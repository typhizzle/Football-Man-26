// Verify Ultra Bowl integrity: correct winners + no same-conference finals, ever
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const r=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={years:[],badConf:[],hOv:JSON.parse(JSON.stringify(S.hOv||{}))};
  const last=yrN()-1;
  for(let Y=2026;Y<=last;Y++){
   try{const c=uChamp(Y);if(!c){out.years.push(Y+': none');continue}
    const w=TA[c.ub],l=TA[c.ru];
    const sameConf=(c.ub<16)===(c.ru<16);
    if(sameConf)out.badConf.push(Y+': '+w+' vs '+l+' (BOTH '+(c.ub<16?'AFC':'NFC')+')');
    out.years.push(Y+': '+w+' over '+l+(sameConf?'  <-- IMPOSSIBLE':''));
   }catch(e){out.years.push(Y+': ERR '+e)}
  }
  // prove the validator repairs a deliberately corrupted final (any save, any year)
  S.hOv=S.hOv||{};S.hOv[2030]={ub:'BUF',ru:'KC'};           // both AFC
  try{const c=uChamp(2030);out.injectedRepair=TA[c.ub]+' over '+TA[c.ru]+' (conf '+(c.ub<16?'AFC':'NFC')+' vs '+(c.ru<16?'AFC':'NFC')+')'}catch(e){out.injectedRepair='ERR '+e}
  return out;
 },save);
 console.log('--- Ultra Bowls by season ---');
 r.years.forEach(y=>console.log('  '+y));
 console.log('\nSAME-CONFERENCE FINALS:',r.badConf.length?r.badConf:'NONE ✓');
 console.log('Injected-corruption repair test:',r.injectedRepair);
 console.log('hOv 2026/2027/2028:',JSON.stringify({2026:r.hOv[2026],2027:r.hOv[2027],2028:r.hOv[2028]}));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
