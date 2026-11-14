// Does the equipped hat/shoe actually show on the walking-around model, including plain team gear?
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';S.cash=9e9;
  ['wh_cow','ft_purp'].forEach(id=>shopBuy(id,SHOP.find(x=>x[0]==id)[1]));
  const out={};const cnt=m=>{let n=0;m.traverse(()=>n++);return n};
  S.hat='';S.shoe='';lroom();out.lockPlain=LR&&LR.pm?cnt(LR.pm):0;
  S.hat='wh_cow';S.shoe='ft_purp';if(LR&&LR.pm)LR.pm.__fx=null;lrOutfit('lock');
  out.lockDressed=LR&&LR.pm?cnt(LR.pm):0;
  out.lockGearGetsExtras=out.lockDressed>out.lockPlain;
  // casual walk
  S.wear=S.wear||{};S.wear.cas='cas';S.hat='';S.shoe='';
  if(LR&&LR.pm)LR.pm.__fx=null;lrOutfit('cas');out.casPlain=cnt(LR.pm);
  S.hat='wh_cow';S.shoe='ft_purp';if(LR&&LR.pm)LR.pm.__fx=null;lrOutfit('cas');
  out.casDressed=cnt(LR.pm);out.casGetsExtras=out.casDressed>out.casPlain;
  // hdSet from inside the walk overlay must not blow up
  WRFROM='walk';try{hdSet('');out.hdSetWalkOk=true}catch(e){out.hdSetWalkOk=String(e)}
  WRFROM='';
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(20),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
