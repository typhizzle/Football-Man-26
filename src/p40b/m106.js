// ============ 👕 Clothing: Outfits · 🧢 Headwear · 👟 Footwear ============
// Headwear and footwear were buyable but there was nowhere to put them on. Clothing now
// opens on three sections. Headwear and footwear are worn with EVERY outfit, in the locker
// room and around town, so you pick a hat once and it stays on until you take it off.

window.WRSEC='fit';

// ---------- what you own ----------
window.hdOpts=function(){const o=[['','🚫 No headwear']];
 try{hwHats(S).forEach(k=>{const h=HATS.find(x=>x[0]==k);o.push([k,(h?h[1]:k)+' 🎃 keepsake'])})}catch(e){}
 try{SHOP.filter(x=>x[1]=='head'&&owns(x[0])).forEach(x=>o.push([x[0],'🧢 '+x[2]]))}catch(e){}
 return o};
window.ftOpts=function(){const o=[['','👟 Team cleats (default)']];
 try{SHOP.filter(x=>x[1]=='foot'&&owns(x[0])).forEach(x=>o.push([x[0],(/^[A-Za-z0-9]/.test(x[2])?'👟 ':'')+x[2]]))}catch(e){}
 return o};
window.hdName=k=>{if(!k)return 'No headwear';const h=HATS.find(x=>x[0]==k);if(h)return h[1];const s=SHOP.find(x=>x[0]==k);return s?s[2]:k};
window.ftName=k=>{if(!k)return 'Team cleats';const s=SHOP.find(x=>x[0]==k);return s?s[2]:k};

// ---------- footwear geometry, in the game's block style ----------
// [main colour, trim colour, boot shaft?]
window.FTC={
 ft_rain :[0xf4d13d,0x2b2b2b,1],
 ft_cow  :[0x8a5a2b,0x5a3718,1],
 ft_neon :[0xff6a00,0xffffff,0],
 ft_purp :[0x5b1fb5,0xf2c94c,0],
 ft_jorton:[0xe8e8e8,0xd0001e,0],
 ft_nyk  :[0x1b1b1b,0x8cff3a,0],
 ft_ua   :[0x2d3a46,0xd9d9d9,0],
 ft_liger:[0xffffff,0x1b6ce8,0],
 ft_goat :[0xd9b43a,0x1b1b1b,0],
 ft_hw   :[0xff7518,0x1b1b1b,0]
};
window.fitShoe=function(m,k){
 try{const C=FTC[k];if(!C||!m||!m.L)return;
  // the game's own shoe block sits half under the turf, so the part you actually see
  // has to be the upper and the ankle, not the sole
  m.L.forEach(l=>{
   // the leg already has a white cuff at -.82 and a dark shoe at -1.00, so every piece
   // here has to be plainly bigger than those or it z-fights and disappears inside them
   bx(.50,.19,.70,C[0],0,-1.00,-.08,l);   // sole and toe
   bx(.48,.34,.58,C[0],0,-.80,-.04,l);    // the upper: the bit you see above the grass
   bx(.52,.08,.30,C[1],0,-.84,-.26,l);    // stripe across the toe
   bx(.52,.07,.62,C[1],0,-.62,-.03,l);    // collar
   if(C[2])bx(.40,.44,.46,C[0],0,-.52,.00,l);   // boot shaft
  });
 }catch(e){}
};
window.fitHat=function(m,k){try{if(k&&typeof hatOn=='function')hatOn(m,k)}catch(e){}};

// one call that dresses any finished model in whatever is equipped
window.fitExtras=function(m){try{if(!m||!S)return m;
 const h=S.hat||'',f=S.shoe||'',tag=h+'|'+f;
 if(m.__fx===tag)return m;m.__fx=tag;
 fitHat(m,h);fitShoe(m,f);return m}catch(e){return m}};

// every outfit model gets them
(()=>{try{if(typeof outfitM!='function')return;const _o=outfitM;
 outfitM=function(){const m=_o.apply(this,arguments);try{fitExtras(m)}catch(e){}return m}}catch(e){}})();
// so does the plain team-gear look in the locker room, which outfitM never builds
(()=>{try{if(typeof lrOutfit!='function')return;const _l=lrOutfit;
 lrOutfit=function(){const r=_l.apply(this,arguments);try{if(LR&&LR.pm)fitExtras(LR.pm)}catch(e){}return r}}catch(e){}})();

// ---------- putting them on ----------
window.hdSet=function(k){try{S.hat=k||'';save();
 HM=k?('Wearing the '+hdName(k)+'.'):'Headwear off.';
 if(WRFROM=='walk'&&LR){try{if(LR.pm)LR.pm.__fx=null;lrOutfit(LR.home?'cas':(LR.ev||LR.studio||LR.pot)?'ev':'lock')}catch(e){}}
 }catch(e){}wardV()};
window.ftSet=function(k){try{S.shoe=k||'';save();
 HM=k?('Wearing the '+ftName(k)+'.'):'Back in team cleats.';
 if(WRFROM=='walk'&&LR){try{if(LR.pm)LR.pm.__fx=null;lrOutfit(LR.home?'cas':(LR.ev||LR.studio||LR.pot)?'ev':'lock')}catch(e){}}
 }catch(e){}wardV()};

// ---------- the three sections ----------
(()=>{try{if(typeof wardV!='function')return;const _w=wardV;
 wardV=function(tab,from){
  if(from!=null)WRFROM=from;
  if(WRSEC=='fit')return _w.apply(this,arguments);
  try{wrEns()}catch(e){}
  const head=WRSEC=='head';
  const O=head?hdOpts():ftOpts(),cur=head?(S.hat||''):(S.shoe||'');
  const secs=[['fit','👕 Outfits'],['head','🧢 Headwear'],['foot','👟 Footwear']]
   .map(([k,n])=>`<button class="${k==WRSEC?'':'g'}" style="flex:1;padding:10px 4px;font-size:14px" onclick="wrSec('${k}')">${n}</button>`).join('');
  const body=O.map(([id,n])=>`<div class=row style="font-size:16px;gap:6px"><span style="flex:1">${n}${cur==id?' <b style="color:#7bed9f">✔ Equipped</b>':''}</span>${cur==id?'':`<button class=g style="width:auto;flex:none" onclick="${head?'hdSet':'ftSet'}('${id}')">Wear</button>`}</div>`).join('');
  const none=O.length<2?`<div class=card><small>You don't own any ${head?'headwear':'footwear'} yet. It's in the 🛍️ Shop under ${head?'🧢 Headwear':'👟 Footwear'}.</small></div>`:'';
  const html=`<h2>👕 Clothing</h2><div class=row style="gap:4px">${secs}</div>
   <div class=card><small>${head?'Worn with every outfit, everywhere. Pick 🚫 No headwear to take it off.':'Worn with every outfit. Games are always in team cleats.'}</small><br><b>Equipped:</b> ${head?hdName(cur):ftName(cur)}</div>
   <div class=card>${body}</div>${none}`;
  if(WRFROM=='walk'){ovShow(html+`<button class=g onclick="ovHide()">Done</button>`)}
  else{ui.style.display='block';ui.innerHTML=`<div>${html}<button class=g onclick="${WRFROM=='shop'?"shopV('head')":'hub()'}">Back</button></div>`;ui.scrollTop=0}
 }}catch(e){}})();

window.wrSec=function(k){WRSEC=k||'fit';wardV(WRT)};

// the Outfits section needs the same three buttons on top of its own tabs
(()=>{try{if(typeof wardV!='function')return;const _w=wardV;
 wardV=function(){const r=_w.apply(this,arguments);
  if(WRSEC!='fit')return r;
  try{const host=(WRFROM=='walk')?ov:ui;const h2=host.querySelector('h2');
   if(h2&&!host.querySelector('.wrsec')){
    const d=document.createElement('div');d.className='row wrsec';d.style.cssText='gap:4px;margin-bottom:6px';
    d.innerHTML=[['fit','👕 Outfits'],['head','🧢 Headwear'],['foot','👟 Footwear']]
     .map(([k,n])=>`<button class="${k==WRSEC?'':'g'}" style="flex:1;padding:10px 4px;font-size:14px" onclick="wrSec('${k}')">${n}</button>`).join('');
    h2.parentNode.insertBefore(d,h2.nextSibling);
   }}catch(e){}
  return r}}catch(e){}})();

// ---------- the Shop sends you straight to where you put them on ----------
(()=>{try{if(typeof shopV!='function')return;const _s=shopV;
 shopV=function(cat){const r=_s.apply(this,arguments);
  try{if(cat!='foot'&&cat!='head')return r;
   const head=cat=='head';
   const c=ui.querySelector('.card');
   if(c&&!ui.querySelector('.shjump')){
    const d=document.createElement('div');d.className='card shjump';
    d.innerHTML=`<small>Bought something? Put it on in 👕 Clothing → ${head?'🧢 Headwear':'👟 Footwear'}.</small><button class=g onclick="WRSEC='${cat}';wardV(null,'shop')">👕 Open Clothing</button>`;
    c.parentNode.insertBefore(d,c);
   }
   // a Wear button beside anything already owned
   ui.querySelectorAll('.card .row').forEach(row=>{
    const b=row.querySelector('button[onclick^="shopBuy("]');
    if(b||row.querySelector('.shwear'))return;
    if(!/Owned/.test(row.textContent))return;
    const nm=(row.querySelector('span')||{textContent:''}).textContent;
    const it=SHOP.find(x=>x[1]==cat&&nm.indexOf(x[2])>=0);if(!it)return;
    const w=document.createElement('button');w.className='g shwear';
    w.style.cssText='width:auto;flex:none;padding:6px 10px';
    const on=head?(S.hat==it[0]):(S.shoe==it[0]);
    w.textContent=on?'Take off':'Wear';
    w.setAttribute('onclick',`${head?'hdSet':'ftSet'}('${on?'':it[0]}')`);
    const o=row.querySelector('small');if(o&&/^Owned$/.test(o.textContent.trim()))o.remove();
    row.appendChild(w);
   });
  }catch(e){}
  return r}}catch(e){}})();

// ---------- costumes that come with their own hat ----------
// A suit's hat has to come OFF when you equip different headwear, or you get a wig
// stacked on a cowboy hat. Both cowboy suits build their hat as direct children of the
// model at y>=2.62; everything else (the skeleton skull, the pumpkin head, the horse
// head) sits at head height or inside its own group, so a hat already clears it.
window.OUTHAT={hx1:['wh_cow','🤠 Cowboy hat'],hx7:['wh_gcow','🤠 Golden cowboy hat']};
window.outHatOff=function(m,id){try{
 if(!m||!OUTHAT[id])return 0;
 const kill=(m.children||[]).filter(c=>c&&c.position&&c.position.y>=2.62);
 kill.forEach(c=>m.remove(c));
 return kill.length}catch(e){return 0}};

// the golden cowboy's own hat, kept as headwear. Not for sale: it comes with the suit.
try{if(!SHOP.some(x=>x[0]=='wh_gcow'))SHOP.push(['wh_gcow','head','🤠 Golden cowboy hat (comes with the suit)',0,0,0,{desc:'Taken off your Golden Cowboy suit. Yours to wear with anything.',excl:1}])}catch(e){}
// own a cowboy suit, own its hat
window.cowHatGrant=function(s){try{if(!s)return 0;s.inv=s.inv||[];let n=0;
 if(s.inv.includes('hx1')&&!s.inv.includes('wh_cow')){s.inv.push('wh_cow');n++}
 if(s.inv.includes('hx7')&&!s.inv.includes('wh_gcow')){s.inv.push('wh_gcow');n++}
 return n}catch(e){return 0}};
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);try{cowHatGrant(s)}catch(e){}return s}}catch(e){}})();

// hatOn needs to know how to draw the golden one
(()=>{try{if(typeof hatOn!='function')return;const _h=hatOn;
 hatOn=function(m,k){try{if(k=='wh_gcow'){const B=(w,h,d,c,x,y,z)=>bx(w,h,d,c,x,y,z,m);
  B(1.36,.06,1.36,0xf5f0e1,0,2.68,0);B(.68,.38,.68,0xf5f0e1,0,2.89,0);B(.7,.07,.7,0xb8860b,0,2.74,0);return}}catch(e){}
  return _h.apply(this,arguments)}}catch(e){}})();

// take the suit's hat off before putting the new one on
(()=>{try{if(typeof outfitM!='function')return;const _o=outfitM;
 outfitM=function(id){const m=_o.apply(this,arguments);
  try{if(m&&S&&S.hat&&OUTHAT[id]){outHatOff(m,id);m.__fx=null;fitExtras(m)}}catch(e){}
  return m}}catch(e){}})();

// ---------- masks stay on; the hat rides higher so it sits ON them ----------
// Looked at every hat on every costume. The big-headed ones (horse, both Pumpkin Men)
// swallowed the hat — brim straight through the snout. They keep their head and the hat
// is raised to rest on top instead. The werewolf needs a nudge so his ears still show.
// Vampire, Scary Clown, Night Runner and the skeletons already looked right: untouched.
window.HATLIFT={hx2:.30,hx3:.22,hw6:.28,hw3:.13};
(()=>{try{const _f=fitHat;
 window.fitHat=function(m,k,id){try{if(!k||typeof hatOn!='function')return;
  const up=(id&&HATLIFT[id])||0;
  if(!up)return hatOn(m,k);
  const g=new T3.Group();g.position.y=up;m.add(g);hatOn(g,k);
 }catch(e){}}}catch(e){}})();
// fitExtras has to know which outfit it is dressing
(()=>{try{const _fe=fitExtras;
 window.fitExtras=function(m,id){try{if(!m||!S)return m;
  const h=S.hat||'',f=S.shoe||'',tag=h+'|'+f+'|'+(id||'');
  if(m.__fx===tag)return m;m.__fx=tag;
  fitHat(m,h,id);fitShoe(m,f);return m}catch(e){return m}}}catch(e){}})();
(()=>{try{const _o=outfitM;
 outfitM=function(id){const m=_o.apply(this,arguments);
  try{if(m){m.__fx=null;fitExtras(m,id)}}catch(e){}
  return m}}catch(e){}})();
