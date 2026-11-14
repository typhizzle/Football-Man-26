// ============ a name, once made, is that player's name forever ============
// Tyler's rule: anyone the game creates exists in that save permanently — their stats,
// their record, their name. They can retire, they are never erased and never renamed.
//
// The duplicate-name fixer broke that rule. It took two players who happened to share a
// name and gave one of them a new one. That is a name changing after it was made, which
// is exactly what must never happen. It is switched off here, and every name it already
// changed is put back from the copy it kept.

// ---- put back anyone who was renamed ----
window.nmRestore=function(s){try{
 if(!s||!s.ro)return 0;let n=0;
 const back=p=>{if(p&&p.on&&p.n!==p.on){p.n=p.on;n++}if(p&&p.on)delete p.on};
 Object.keys(s.ro).forEach(k=>{const L=s.ro[k];if(Array.isArray(L))L.forEach(back)});
 try{(s.ro.fa||[]).forEach(back)}catch(e){}
 try{(s.retd||[]).forEach(back)}catch(e){}
 try{(s.svRet||[]).forEach(back)}catch(e){}
 return n}catch(e){return 0}};

// ---- and stop it renaming anybody ever again ----
// Two players sharing a name is a cosmetic coincidence. Rewriting one of them is data
// loss. Duplicates are left exactly as they are; only NEW players avoid taken names,
// which lgClass already does when it generates them.
window.nmFixDupes=function(){return 0};

(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);
  try{if(s){nmRestore(s);s.nmdup=1}}catch(e){}
  return s}}catch(e){}})();

// ============ a draft class is generated once and never again ============
// lgClass(Y) builds a year's class from a seed, so it is stable for a given save — but
// only as long as the generator itself never changes. Freezing each class into the save
// the first time it is built means a past, present or future class can never come back
// with different people in it, whatever happens to the code later.
window.CLFZV=1;
(()=>{try{if(typeof lgClass!='function')return;const _c=lgClass;
 window.lgClass=function(Y){
  try{
   if(typeof S=='undefined'||!S)return _c.apply(this,arguments);
   S.clFz=S.clFz||{};
   const key=''+Y,hit=S.clFz[key];
   if(hit&&hit.v===CLFZV&&Array.isArray(hit.p)&&hit.p.length)return hit.p.map(p=>({...p}));
   const made=_c.apply(this,arguments);
   if(Array.isArray(made)&&made.length){
    S.clFz[key]={v:CLFZV,p:made.map(p=>({...p}))};
    try{save()}catch(e){}
   }
   return made;
  }catch(e){return _c.apply(this,arguments)}
 }}catch(e){}})();
