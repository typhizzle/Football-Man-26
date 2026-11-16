// ============ 🎃 Halloween keepsake: ONE gift, remembered by the SAVE ============
// Tyler, 2026-11-14: "It's supposed to be a one time gift. I was just given another."
// "The reward must be kept in the menu, ready to claim until one of them is claim, they
// cannot claim all of them".
// Cause: picks-left was counted ONLY from browser storage (fm_hwkeep). Any copy of the
// game whose storage did not have it (Home Screen vs Safari, friends copy, Netlify, a cloud
// code on a fresh device) saw 0 picks used and offered the treat again.
// Fix: a pick already written into ANY of your saves counts as used. Read-only: this
// writes nothing to any save, and every keepsake already owned stays owned.
(()=>{try{
 const owned=s=>{try{if(!s||!hwTook(s))return 0;const L=[];
  (Array.isArray(s.hwHats)?s.hwHats:[]).forEach(k=>{if(k&&!L.includes(k))L.push(k)});
  if(s.hwHat&&!L.includes(s.hwHat))L.push(s.hwHat);return L.length}catch(e){return 0}};
 window.hwPicksUsed=function(){let n=hwKept().length;
  try{if(typeof S!='undefined'&&S)n=Math.max(n,owned(S))}catch(e){}
  for(let i=1;i<=NSLOT;i++){let d=null;try{d=load(i)}catch(e){d=null}n=Math.max(n,owned(d))}
  return n};
 window.hwPicksLeft=()=>Math.max(0,hwPicksOwed()-hwPicksUsed());
}catch(e){}})();
