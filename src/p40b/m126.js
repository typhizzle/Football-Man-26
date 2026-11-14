// ===== 👕 Clothing brands are rivals: one at a time, their own events, their own celebrities =====
// Tyler, 2026-11-14: "only one brand can sign you at a time, especially because clothing brands
// are rivals" … "if they're signed with Goaty's then they should only be able to go to Goatie's
// events" … "If you're not signed though, you can get invites to go to their events from the
// people from their brands. Make sure every celebrity is with the right brand." Other brands:
// "only if they're live big time deals … multi-years … big signings".
// Measured on the 11-07 save: signed with Goatie's AND Jorton at once. Deals already signed are
// honoured until they run out — nothing in a save is cancelled. The rule applies to new signings.

window.BRCLOTH=["Goatie's",'Jorton','Nyk','Over Armored','Liger','Yawnverse','Sharts'];
window.brFam=function(b){try{let k=brKey(b);if(k==='Shart Shoes')k='Sharts';return BRCLOTH.includes(k)?k:null}catch(e){return null}};
// the clothing houses you are signed with right now (old saves may hold two; both honoured)
window.brMine=function(){try{return [...new Set((S.spc||[]).filter(c=>c.cat!=='celeb'&&c.cat!=='event').map(c=>brFam(c.b)).filter(Boolean))]}catch(e){return []}};
// the clothing house a celebrity reps (a celebrity reps one house at most)
window.brCelFams=function(id){try{return [...new Set(brOf(id).map(brFam).filter(Boolean))]}catch(e){return []}};
window.brEvFam=function(v){try{if(v&&typeof v==='object')return brFam(v.brand)||({goat:"Goatie's",nyk:'Nyk',jor:'Jorton'})[v.v]||null;
 if(v==='spn'||v==='party')return (typeof EV_X!='undefined'&&EV_X&&EV_X.brand)?brFam(EV_X.brand):null;
 return ({goat:"Goatie's",nyk:'Nyk',jor:'Jorton'})[v]||((typeof EV_X!='undefined'&&EV_X&&EV_X.brand)?brFam(EV_X.brand):null)}catch(e){return null}};
// may this celebrity be at this brand's event? Only that house's people, or people with no house.
window.brOkAt=function(v,id){try{const f=brEvFam(v);if(!f)return true;const c=brCelFams(id);return !c.length||c.includes(f)}catch(e){return true}};
// is this offer from a rival of the house you are with?
window.brRival=function(o){try{const f=brFam(o&&(o.brand||o.b));if(!f)return false;const m=brMine();return m.length>0&&!m.includes(f)}catch(e){return false}};

// ---- signing: a rival house can't sign you while you're with another ----
(()=>{try{const _ok=spOk;spOk=function(o){if(o&&o.cat!=='celeb'&&brRival(o))return false;return _ok.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _s=spSign;spSign=function(i){try{const o=spEns().L[i];if(o&&o.cat!=='celeb'&&brRival(o)){HM='You are signed with '+brMine().join(' and ')+'. Rival clothing brands can\'t sign you until that deal ends.';return spV()}}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _r=spRenSign;spRenSign=function(i,yes){try{const o=(S.spRen||[])[i];
 if(yes&&o){const f=brFam(o.b),m=brMine().filter(x=>x!==f);if(f&&m.length){HM='You are signed with '+m.join(' and ')+'. A rival clothing brand can\'t re-sign you until that deal ends.';return spV()}}}catch(e){}
 return _r.apply(this,arguments)}}catch(e){}})();

// ---- offers: other (non-clothing) brands only come as big multi-year deals ----
(()=>{try{const _e=spEns;spEns=function(){const k0=S&&S.spo&&S.spo.k;const O=_e.apply(this,arguments);
 try{if(O&&O.k!==k0&&!O.big){O.big=1;(O.L||[]).forEach(o=>{if(o.t||o.cat==='celeb'||o.cat==='event'||brFam(o.b))return;
  o.yrs=Math.max(2,o.yrs||1);o.tier=Math.max(2,o.tier||0)})}}catch(e){}
 return O}}catch(e){}})();

// ---- paid one-night appearances: the brand's own celebrity, and never a rival house ----
(()=>{try{const _o=spEvOffers;spEvOffers=function(r,L){const n0=L.length;const res=_o.apply(this,arguments);
 try{const mine=brMine();
  for(let i=L.length-1;i>=n0;i--){const o=L[i];if(o.cat!=='event')continue;
   if(mine.length&&!mine.includes(brFam(o.brand))){o.brand=mine[0]}
   const f=brFam(o.brand);
   if(f&&!brOkAt({brand:f},o.cel)){const alt=brEvCel(f);if(!alt||L.some(x=>x.cel===alt&&x!==o)){L.splice(i,1);continue}o.cel=alt;o.id='ev_'+alt}
   const c=celBy(o.cel);if(!c){L.splice(i,1);continue}
   o.b=o.brand+' x '+c.n;o.what='one-night appearance at a '+o.brand+' event with '+c.n+' (you meet '+(c.fem?'her':'him')+')';
  }}catch(e){}
 return res}}catch(e){}})();

// ---- weekly invites: no rival house parties while signed; every celebrity at a brand event is that brand's ----
window.brWeekFilter=function(L){try{const mine=brMine();
 for(let i=L.length-1;i>=0;i--){const e=L[i];if(!e||e.k!=='party')continue;
  const f=brEvFam(e);if(!f)continue;
  if(mine.length&&!mine.includes(f)){L.splice(i,1);continue}
  if(e.cel&&!brOkAt(e,e.cel)){const alt=brEvCel(f);
   if(!alt){delete e.cel;if(e.v==='spn'){L.splice(i,1);continue}}
   else{e.cel=alt;const c=celBy(alt);if(c){e.n=(e.brand||f)+' event with '+c.n;e.d='Your sponsor '+(e.brand||f)+' is throwing an event. '+c.n+' ('+f+' family) will be there.'}}}
 }}catch(e){}return L};

// ---- the Sponsors screen says why rival offers are locked (added without re-parsing the page) ----
(()=>{try{const _v=spV;spV=function(){const r=_v.apply(this,arguments);
 try{const m=brMine(),d=ui.firstElementChild;if(m.length&&d&&!d.querySelector('[data-brx]'))
  d.insertAdjacentHTML('afterbegin',`<div class=card data-brx=1 style="border-color:#e8730c"><b>👕 Signed with ${m.join(' and ')}</b><br><small>Clothing brands are rivals. Others can't sign you, and you only go to ${m.join(' and ')} events, until this deal ends.</small></div>`)}catch(e){}
 return r}}catch(e){}})();
