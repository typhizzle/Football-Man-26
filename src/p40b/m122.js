// ===== 🏅 THE AWARDS ARE SEALED TOO =====
// Tyler: "all awards stick with them. The awards never change." And: "examples would be
// players losing their awards, Super Bowls being lost".
//
// Two stores hold an award and neither was protected:
//   • x.aw — a player's own count: r (rings), mvp, opoy, dpoy, sbm, oroy, droy.
//     A count may only ever GO UP. A ring once won is never un-won.
//   • S.law[py].w — who won each award in a season. Once that season is over it is
//     history and may never change again.
//
// The one thing deliberately left open: Tyler can override a winner himself, and the
// game offers that on the CURRENT season's ballot. So the current season stays open to
// him, and every season before it is sealed. That is also how football works — last
// year's MVP is not reopened.

window.AWSEALV=1;

// ---- a player's award counts may only grow ----
window.awSealOf=function(x){try{
 const a=x&&x.aw;if(!a)return null;
 const o={};Object.keys(a).forEach(k=>{if(typeof a[k]==='number'&&a[k]>0)o[k]=a[k]});
 return Object.keys(o).length?o:null;
}catch(e){return null}};

window.awSealCheck=function(s){try{
 if(!s)return {restored:0,notes:[]};
 s.awSeal=s.awSeal||{};
 let restored=0;const notes=[];
 const claimed=new Set();
 if(typeof sealWalk!='function')return {restored:0,notes:[]};
 sealWalk(s,(x)=>{
  const k=(typeof pidOf=='function')?pidOf(s,x,claimed):x.n;
  if(!k)return;
  const now=awSealOf(x),old=s.awSeal[k];
  if(!old){if(now)s.awSeal[k]=now;return}
  // every award he ever had, he still has
  Object.keys(old).forEach(c=>{
   const had=old[c],has=(x.aw&&x.aw[c])||0;
   if(has<had){
    x.aw=x.aw||{};x.aw[c]=had;restored++;
    if(notes.length<40)notes.push(x.n+': '+c+' put back to '+had+' (was showing '+has+')');
   }
  });
  // and anything new he has won joins the record
  if(now)Object.keys(now).forEach(c=>{if(!(old[c]>=now[c]))old[c]=now[c]});
 });
 if(restored){s.awFix=(s.awFix||0)+restored;
  try{if(typeof txAdd=='function')txAdd(s,'awards','lost','restored',restored+' award(s) put back')}catch(e){}}
 return {restored,notes};
}catch(e){return {err:e.message}}};

// ---- a finished season's winners never change ----
window.lawSealCheck=function(s){try{
 if(!s||!s.law)return {restored:0,sealed:0,notes:[]};
 s.lawSeal=s.lawSeal||{};
 const cur=s.py;
 let restored=0,sealed=0;const notes=[];
 Object.keys(s.law).forEach(k=>{
  const A=s.law[k];if(!A||!A.w)return;
  // the season being played now stays open: Tyler may override a winner himself
  if(cur!=null&&String(k)===String(cur))return;
  const old=s.lawSeal[k];
  if(!old){
   const snap={yr:A.yr};
   Object.keys(A.w).forEach(c=>{const w=A.w[c];if(w)snap[c]={n:w.n,tm:w.tm,pos:w.pos}});
   s.lawSeal[k]=snap;sealed++;return;
  }
  Object.keys(old).forEach(c=>{
   if(c==='yr')return;
   const want=old[c],got=A.w[c];
   if(!want)return;
   if(!got||got.n!==want.n){
    A.w[c]=Object.assign({},got||{},{n:want.n,tm:want.tm,pos:want.pos});
    restored++;
    if(notes.length<40)notes.push((old.yr||k)+' '+c+': put back to '+want.n+
      (got&&got.n?' (was showing '+got.n+')':' (it had gone)'));
   }else if(want.tm&&got.tm!==want.tm){
    got.tm=want.tm;restored++;
    if(notes.length<40)notes.push((old.yr||k)+' '+c+': '+want.n+"'s team put back to "+want.tm);
   }
  });
 });
 if(restored){s.lawFix=(s.lawFix||0)+restored;
  try{if(typeof txAdd=='function')txAdd(s,'league awards','changed','restored',restored+' winner(s) put back')}catch(e){}}
 return {restored,sealed,notes};
}catch(e){return {err:e.message}}};

// ---- run with the rest of the seal: every load, every save ----
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);
  try{if(s){awSealCheck(s);lawSealCheck(s)}}catch(e){console.warn('awSeal',e)}
  return s}}catch(e){}})();
(()=>{try{const _sv=save;save=function(){
 try{if(typeof S!='undefined'&&S&&!(typeof RSEDIT!='undefined'&&RSEDIT)){awSealCheck(S);lawSealCheck(S)}}catch(e){}
 return _sv.apply(this,arguments)}}catch(e){}})();

// ---- and the seal report covers awards too ----
(()=>{try{if(typeof sealReport!='function')return;const _r=sealReport;
 window.sealReport=function(){
  const o=_r.apply(this,arguments)||{};
  try{
   o.playersWithAwardsSealed=Object.keys(S.awSeal||{}).length;
   o.seasonsOfWinnersSealed=Object.keys(S.lawSeal||{}).length;
   o.awardsPutBack=S.awFix||0;
   o.winnersPutBack=S.lawFix||0;
  }catch(e){}
  return o;
 }}catch(e){}})();
