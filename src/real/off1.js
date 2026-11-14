// Drive Tyler's real save to the offseason and see if the league system engages.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const warn=[],T_=(n,f)=>{try{return f()}catch(e){warn.push(n+': '+e.message);return null}};
  const before={dc:Object.keys(S.dc||{}).length,tx:(S.tx||[]).length,fa:((S.ro||{}).fa||[]).length,lgPh:S.lgPh,yr:yrN(),wk:S.wk,py:S.py};
  // advance to the end of this season and through the offseason
  let g=0;const y0=yrN();
  while(g++<4000&&(yrN()-y0)<2){
   const e=T_('pevt',()=>pevt());
   if(!e){T_('pNext',()=>pNext());continue}
   if(e.o!=null)T_('simUser',()=>simUser()); else T_('pNext',()=>pNext());
  }
  const after={dc:Object.keys(S.dc||{}).length,dcYears:Object.keys(S.dc||{}).sort(),
    dcPicks:Object.keys(S.dc||{}).map(y=>y+':'+((S.dc[y].picks||[]).length)),
    tx:(S.tx||[]).length,fa:((S.ro||{}).fa||[]).length,lgPh:S.lgPh,yr:yrN(),py:S.py,guard:g};
  let faPoolN=null;try{faPoolN=faPool().length}catch(e){faPoolN='ERR'}
  return {before,after,faPoolN,warn:warn.slice(0,8)};
 },save);
 console.log('BEFORE:',JSON.stringify(out.before));
 console.log('AFTER :',JSON.stringify(out.after,null,1));
 console.log('faPool now:',out.faPoolN);
 console.log('warn:',out.warn);
 console.log('JS ERRORS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));
 await b.close();
})();
