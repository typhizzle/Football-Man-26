// Clothing sections + main-menu keepsake. Logic only; screenshots come after.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const out={};
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  // make this save look like it took part in the event, with nothing picked yet
  S.hwd={c:[0]};delete S.hwHat;delete S.hwHats;delete S.hwX2;
  S.cash=9e9;save();

  out.picksOwed=hwPicksOwed(S);out.picksLeft=hwPicksLeft(S);
  out.slotsWaiting=hwkSlots().map(x=>x.i+':'+x.n);

  // ---- the three keepsake steps ----
  HWKS=0;HWPICK=null;
  const bar0=hwkBar();
  out.step0_hasOpen=/hwkOpen\(/.test(bar0);
  out.step0_thanks=/Thanks for trick-or-treating/.test(bar0);
  out.step0_showsHatsEarly=/hwkFlip/.test(bar0);        // must be FALSE: message first

  hwkOpen(1);
  const bar1=hwkBar();
  out.step1_exactWording=/Pick one of these to keep in your locker forever\. The rest will vanish\./.test(bar1);
  out.step1_hatIsOff=(HWPICK===null);
  out.step1_hasShow=/hwkShow\(/.test(bar1);
  out.step1_hasLater=/hwkLater\(/.test(bar1);
  out.step1_showsHats=/hwkFlip/.test(bar1);              // must be FALSE

  hwkShow();
  out.step2_wearing=HWPICK;
  out.step2_hasFlip=/hwkFlip/.test(hwkBar());
  const seen=[];for(let i=0;i<9;i++){seen.push(HWPICK);hwkFlip(1)}
  out.step2_cycle=seen.join(',');
  out.step2_noHelmet=!seen.includes('helmet');

  // pick the 3rd one
  HWKI=2;HWPICK=hwHatList()[2][0];const want=HWPICK;
  hwkKeep();
  const after=load(1);
  out.kept=hwHats(after).join(',');out.keptWanted=want;
  out.keptIntoSlot=(hwHats(after)[0]===want);
  out.barGoneAfter=(hwkBar()==='');
  out.picksLeftAfter=hwPicksLeft(after);

  // ---- the extra pick is NOT automatic ----
  out.extraAutomatic=(hwPicksOwed(after)>1);             // must be FALSE

  // ---- clothing sections ----
  S=load(1);SLOT=1;S.cash=9e9;
  ['wh_band','wh_cow','wh_billie','wh_ice','wh_helm','ft_rain','ft_cow','ft_neon','ft_purp','ft_jorton','ft_nyk','ft_ua','ft_liger','ft_goat'].forEach(id=>shopBuy(id,SHOP.find(x=>x[0]==id)[1]));
  out.bought=(S.inv||[]).filter(i=>/^(wh|ft)_/.test(i)).length;
  out.headList=hdOpts().map(x=>x[1]);
  out.footList=ftOpts().map(x=>x[1]);

  WRSEC='head';wardV('cas','');
  out.headScreen=/Headwear/.test(ui.innerHTML)&&/hdSet\(/.test(ui.innerHTML);
  hdSet('wh_cow');out.hatEquipped=S.hat;
  WRSEC='foot';wardV('cas','');
  out.footScreen=/ftSet\(/.test(ui.innerHTML);
  ftSet('ft_purp');out.shoeEquipped=S.shoe;
  WRSEC='fit';wardV('cas','');
  out.fitHasSections=/wrSec\('head'\)/.test(ui.innerHTML)&&/wrSec\('foot'\)/.test(ui.innerHTML);
  out.fitStillHasOutfits=/wrSet\(/.test(ui.innerHTML)||/Equipped/.test(ui.innerHTML);

  // ---- shop sections exist and owned items offer Wear ----
  shopV('head');out.shopHeadTab=/👟 Footwear|🧢 Headwear/.test(ui.innerHTML);
  out.shopHeadWear=(ui.querySelectorAll('.shwear').length);
  shopV('foot');out.shopFootWear=(ui.querySelectorAll('.shwear').length);

  // ---- the extras actually land on a model ----
  const cnt=m=>{let n=0;m.traverse(()=>n++);return n};
  S.hat='';S.shoe='';const plain=outfitM('cas');
  S.hat='wh_cow';S.shoe='ft_purp';const dressed=outfitM('cas');
  out.plainParts=cnt(plain);out.dressedParts=cnt(dressed);
  out.extrasRender=cnt(dressed)>cnt(plain);
  // keepsake hats render too
  S.hat='pumpkin';S.shoe='';out.keepsakeRenders=cnt(outfitM('cas'))>cnt(plain);
  // no double-stacking when dressed twice
  S.hat='wh_cow';S.shoe='ft_purp';const d2=outfitM('cas');fitExtras(d2);fitExtras(d2);
  out.noStack=(cnt(d2)===cnt(dressed));
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(22),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
