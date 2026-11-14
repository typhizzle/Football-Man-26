// ============ ✏️ roster edits survive leaving the editor ============
// In roster-edit mode save() is deliberately a no-op, so nothing you change is written
// anywhere until you press "Save roster" and give the set a name. Leave the editor, or
// let it re-initialise, and every edit is gone. save() now writes a WORKING copy of the
// rosters instead of doing nothing, and the editor picks that copy back up on entry.
// Named roster sets are untouched: this is the autosave underneath them.
window.RSWK='fm_rswork';window.RSINIT=0;
window.rsWorkPut=function(){try{
 // the editor calls save() while it is still building the DEFAULT rosters. Writing
 // then would overwrite your edits with defaults, which is exactly what was happening.
 if(window.RSINIT)return 0;
 if(typeof S=='undefined'||!S||!S.pro)return 0;
 const ro={},tm={};
 S.pro.forEach((t,i)=>{const k='p.'+i;
  try{ro[k]=rost(k).map(x=>({...x}))}catch(e){}
  tm[k]={n:t.n,city:t.city,c1:t.c1,c2:t.c2,d:t.d,pc:t.pc,ovr:t.ovr};
 });
 localStorage.setItem(RSWK,ez(JSON.stringify({ts:Date.now(),ro,tm})));
 return 1}catch(e){return 0}};
window.rsWorkGet=function(){try{const v=localStorage.getItem(RSWK);return v?JSON.parse(dz(v)):null}catch(e){return null}};
window.rsWorkClear=function(){try{localStorage.removeItem(RSWK);return 1}catch(e){return 0}};
window.rsWorkApply=function(){try{
 const W=rsWorkGet();if(!W||!W.ro||!S||!S.pro)return 0;let n=0;
 S.ro=S.ro||{};
 // exactly what rsLoad does: the ed:1 flag is what stops the generator rebuilding
 // over an edited player, and the key depends on the stage
 S.pro.forEach((t,i)=>{const k='p.'+i;
  if(W.tm[k]){Object.assign(t,W.tm[k]);n++}
  if(W.ro[k]){const ix=S.stage=='pro'?S.T.indexOf(t):-1,key=ix>=0?'h.'+ix:k;
   S.ro[key]=W.ro[k].map(x=>({...x,ed:1}));n++}
 });
 return n}catch(e){return 0}};

// in edit mode, save() keeps the working copy instead of throwing the change away
(()=>{try{const _sv=save;save=function(){
 if(typeof RSEDIT!='undefined'&&RSEDIT){try{rsWorkPut()}catch(e){}return}
 return _sv.apply(this,arguments)}}catch(e){}})();

// opening the editor restores whatever you were last working on
(()=>{try{if(typeof menuEdit!='function')return;const _m=menuEdit;
 menuEdit=function(){
  window.RSINIT=1;
  let r;try{r=_m.apply(this,arguments)}finally{window.RSINIT=0}
  try{if(RSEDIT&&rsWorkGet()){rsWorkApply();if(typeof rsHome=='function')rsHome()}}catch(e){}
  return r}}catch(e){}})();
// naming and saving a set clears the scratch copy: that work is now kept properly
(()=>{try{if(typeof rsSave!='function')return;const _s=rsSave;
 rsSave=function(){const r=_s.apply(this,arguments);try{rsWorkClear()}catch(e){}return r}}catch(e){}})();
