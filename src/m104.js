// ===================== 👟 Footwear & 🧢 Headwear =====================
// Two new shop sections. The game's own brands sell their merch, plus the pieces
// Tyler specced: cowboy boots, rain boots, royal purple shiny cleats (a flex item),
// neon orange cleats, cowboy hat, the Billie Eyelash and Ice Slice wigs, a headband,
// and the plain helmet (which is NOT a Halloween gift, so it's bought here instead).
try{
 SHC.foot='👟 Footwear';
 SHC.head='🧢 Headwear';
 const FOOT=[
  ['ft_rain','Rain boots',400,'Not fast. Very dry.'],
  ['ft_cow','Cowboy boots',1000,'Real leather, real loud on tile.'],
  ['ft_neon','Neon orange cleats',3500,'Visible from the upper deck.'],
  ['ft_purp','Royal purple shiny cleats',333000,'If you have to ask.'],
  ['ft_jorton','Jorton game cleats',9000,'The ones everybody wants.'],
  ['ft_nyk','Nyk speed cleats',6500,'Light as nothing.'],
  ['ft_ua','Over Armored cleats',3000,'Built like a toolbox.'],
  ['ft_liger','Liger sprint cleats',2600,'Loud stripes, louder owner.'],
  ['ft_goat',"Goatie's turf shoes",2200,'For the guy who already made it.']];
 const HEAD=[
  ['wh_band','Headband',150,'Keeps the sweat out of your reads.'],
  ['wh_helm','Football helmet',900,'The classic. Always fits.'],
  ['wh_cow','Cowboy hat',1200,'Ten gallons of confidence.'],
  ['wh_billie','Billie Eyelash wig',14000,'Two-tone roots, the whole look.'],
  ['wh_ice','Ice Slice wig',14000,'Big orange curls. Unmistakable.']];
 FOOT.forEach(f=>SHOP.push([f[0],'foot',f[1],f[2],f[2],0,{desc:f[3]}]));
 HEAD.forEach(h=>SHOP.push([h[0],'head',h[1],h[2],h[2],0,{desc:h[3]}]));
}catch(e){}

// ---- the Halloween cleats owed to anyone who signed an endorsement ----
// Promised during the live event and never delivered. Granted once, on load, to any
// save that actually signed a deal. Nothing is taken away and it can't double up.
window.hwShoeGrant=function(s){
 try{
  if(!s||s.hwshoe)return 0;
  const signed=Array.isArray(s.deals)&&s.deals.some(d=>d&&d.t);
  if(!signed)return 0;
  s.inv=s.inv||[];
  if(!s.inv.includes('ft_hw'))s.inv.push('ft_hw');
  s.hwshoe=1;
  return 1;
 }catch(e){return 0}
};
try{SHOP.push(['ft_hw','foot','🎃 Halloween cleats (endorsement exclusive)',0,0,0,{desc:'Jack-o-lantern orange on black. Yours from the deal you signed.',excl:1}])}catch(e){}
(()=>{if(typeof mig!='function')return;
 const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{hwShoeGrant(s)}catch(e){}return s};
})();

// ---- geometry so the new headwear actually renders, in the game's block style ----
(()=>{if(typeof hatOn!='function')return;
 const _h=hatOn;
 hatOn=function(m,k){
  const B=(w,h,d,c,x,y,z)=>bx(w,h,d,c,x,y,z,m);
  try{
   if(k=='wh_band'){B(.92,.16,.92,0xd93b3b,0,2.74,0);return}
   if(k=='wh_cow'){
    B(1.45,.06,1.25,0x6b4a2a,0,2.70,0);          // brim
    B(.80,.34,.80,0x6b4a2a,0,2.88,0);            // crown
    B(.84,.07,.84,0x2b1d10,0,2.74,0);            // band
    B(.30,.10,.84,0x8a6436,0,3.06,0);return}     // crease
   if(k=='wh_billie'){
    B(.74,.40,.74,0x1b1b1b,0,2.56,0);            // dark hair, sitting ON the head
    B(.72,.11,.72,0x6fe36f,0,2.76,0);            // green roots at the crown
    B(.17,.54,.20,0x1b1b1b,-.33,2.24,.12);
    B(.17,.54,.20,0x1b1b1b,.33,2.24,.12);return}
   if(k=='wh_ice'){
    B(.92,.46,.92,0xd9611f,0,2.70,0);            // big orange curls
    B(.30,.30,.30,0xe8762f,-.44,2.84,.16);
    B(.30,.30,.30,0xe8762f,.44,2.84,.16);
    B(.30,.30,.30,0xe8762f,0,2.84,-.44);
    B(.28,.28,.28,0xc9551a,-.36,2.42,.30);
    B(.28,.28,.28,0xc9551a,.36,2.42,.30);return}
   if(k=='wh_helm')return;   // the standard helmet is the default model, nothing to add
  }catch(e){}
  return _h.apply(this,arguments);
 };
})();
