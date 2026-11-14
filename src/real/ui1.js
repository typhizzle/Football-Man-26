// What Tyler actually sees: the keepsake panel on the main menu, and the clothing sections.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({w:390,h:844,dpr:2});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  S.hwd={c:[0]};delete S.hwHat;delete S.hwHats;S.cash=9e9;
  ['wh_band','wh_cow','wh_billie','wh_ice','wh_helm','ft_rain','ft_cow','ft_neon','ft_purp','ft_jorton','ft_nyk','ft_ua','ft_liger','ft_goat'].forEach(id=>{try{shopBuy(id,SHOP.find(x=>x[0]==id)[1])}catch(e){}});
  save();menu();menuMain();
 },save);
 const shot=async(n)=>{await new Promise(r=>setTimeout(r,500));await pg.screenshot({path:'/home/claude/real/shots/ui_'+n+'.png'})};
 await shot('menu0');
 await pg.evaluate(()=>hwkOpen(1));await shot('menu1_message');
 await pg.evaluate(()=>hwkShow());await shot('menu2_tryon');
 await pg.evaluate(()=>{hwkFlip(1);hwkFlip(1)});await shot('menu2_third');
 await pg.evaluate(()=>{hwkKeep();});await shot('menu3_after');
 await pg.evaluate(()=>{S=load(1);SLOT=1;WRSEC='fit';wardV('cas','')});await shot('cloth_fit');
 await pg.evaluate(()=>{WRSEC='head';wardV('cas','')});await shot('cloth_head');
 await pg.evaluate(()=>{WRSEC='foot';wardV('cas','')});await shot('cloth_foot');
 await pg.evaluate(()=>shopV('head'));await shot('shop_head');
 await pg.evaluate(()=>shopV('foot'));await shot('shop_foot');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
