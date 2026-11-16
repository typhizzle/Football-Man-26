// ============ 🔁 rosters filed under the wrong team ============
// `rost('h.'+i)` means team i, plainly: there is no special case for slot 0. So when a
// save holds Houston's roster under New York's key, that is simply misfiling — and in
// Tyler's save it ran three deep: Houston's roster at New York's key, Las Vegas's at
// Houston's, New York's at Las Vegas's. Axel Jean never moved to Houston. He is a Las
// Vegas player, and the Las Vegas roster was sitting in Houston's drawer.
//
// Every player carries `tm`, the list of teams he has played for, and his history rows
// carry a team index per season. That is the evidence of where a roster belongs, and it
// cannot be faked by a mis-keyed container. This reads that evidence, works out the
// permutation, and files every roster back where it belongs.
//
// It refuses to act unless the whole thing is a clean swap. A half-applied rotation
// would be far worse than the bug.

// which team does this roster say it is?
window.roClaim=function(L,TAr){try{
 if(!L||!L.length)return null;
 const c={};let votes=0;
 L.forEach(x=>{
  if(!x)return;
  let t=null;
  if(Array.isArray(x.tm)&&x.tm.length)t=x.tm[x.tm.length-1];
  if(!t&&Array.isArray(x.h)&&x.h.length){const ti=x.h[x.h.length-1][1];if(TAr[ti])t=TAr[ti]}
  if(!t)return;
  c[t]=(c[t]||0)+1;votes++;
 });
 if(!votes)return null;
 const best=Object.keys(c).sort((a,b)=>c[b]-c[a])[0];
 return {ab:best,share:c[best]/votes,votes};
}catch(e){return null}};

// work out the whole permutation, or decide it is not safe to touch
window.roPlan=function(s){try{
 if(!s||!s.T||!s.ro)return null;
 const TAr=(typeof TA!='undefined')?TA:[];
 if(!TAr.length)return null;
 const claim={},need={};
 let anyWrong=false;
 for(let i=0;i<s.T.length;i++){
  const L=s.ro['h.'+i];
  if(!Array.isArray(L)||!L.length)continue;          // never generated: nothing to move
  const c=roClaim(L,TAr);
  if(!c||c.share<0.8)return {safe:false,why:'roster h.'+i+' does not clearly claim a team'};
  const want=TAr.indexOf(c.ab);
  if(want<0)return {safe:false,why:'unknown abbreviation '+c.ab+' on h.'+i};
  claim[i]=want;
  if(need[want]!=null)return {safe:false,why:'two rosters both claim '+c.ab};
  need[want]=i;
  if(want!==i)anyWrong=true;
 }
 if(!anyWrong)return {safe:true,moves:[],already:true};
 // every displaced roster must have somewhere to go, and every vacated slot must be filled
 const moves=Object.keys(claim).map(Number).filter(i=>claim[i]!==i)
   .map(i=>({from:i,to:claim[i]}));
 const froms=new Set(moves.map(m=>m.from)),tos=new Set(moves.map(m=>m.to));
 if(froms.size!==tos.size)return {safe:false,why:'the moves are not a clean swap'};
 for(const t of tos)if(!froms.has(t))return {safe:false,why:'slot '+t+' would be overwritten'};
 return {safe:true,moves};
}catch(e){return {safe:false,why:'plan failed: '+e.message}}};

// apply it in one go, from a snapshot, so nothing can be half-moved
window.roRepair=function(s){try{
 const p=roPlan(s);
 if(!p||!p.safe||!p.moves||!p.moves.length)return {done:0,plan:p};
 const snap={};p.moves.forEach(m=>{snap[m.from]=s.ro['h.'+m.from]});
 const before=p.moves.reduce((n,m)=>n+((snap[m.from]||[]).length),0);
 p.moves.forEach(m=>{s.ro['h.'+m.to]=snap[m.from]});
 const after=p.moves.reduce((n,m)=>n+((s.ro['h.'+m.to]||[]).length),0);
 if(before!==after)return {done:0,plan:p,why:'headcount changed, refused'};
 try{s.roFix=(s.roFix||0)+1}catch(e){}
 try{p.moves.forEach(m=>{
  const nm=(s.T[m.to]&&s.T[m.to].n)||('team '+m.to);
  if(typeof txAdd=='function')txAdd(s,nm+' roster','h.'+m.from,'h.'+m.to,'filed correctly');
 })}catch(e){}
 return {done:p.moves.length,plan:p};
}catch(e){return {done:0,why:e.message}}};

// THE ROTATION IS OFF, DELIBERATELY.
// proFill (line 147 of the source) reads: const me = a=='h.0' && S.stage=='pro'. The pro
// game hardcodes slot 0 as the user's own team. So a roster at h.0 whose players claim
// another club is the DESIGN, not a misfiling — and rotating it away put the user on two
// rosters at once. The audit below still reports, and roRepair can still be called by
// hand, but nothing moves a roster automatically. The Axel Jean display was already fixed
// the right way, by reading each player's own record for the team shown beside his name.
window.roAutoFix=false;

// and a standing check anyone can run
window.roAudit=function(){try{
 const TAr=(typeof TA!='undefined')?TA:[],bad=[];
 for(let i=0;i<(S.T||[]).length;i++){
  if(i===0&&S.stage=='pro')continue;   // h.0 is the user's own team by design
  const L=S.ro&&S.ro['h.'+i];if(!Array.isArray(L)||!L.length)continue;
  const c=roClaim(L,TAr);
  if(c&&c.ab!==TAr[i])bad.push('h.'+i+' ('+TAr[i]+') holds '+c.ab);
 }
 return bad;
}catch(e){return ['audit failed']}};

// ---- one person cannot be on two rosters ----
// Two different men sharing a name is fine and is left alone — that is Tyler's rule and
// Bacon Miller (NYS) and Bacon Miller (WAS) are two real, separate players with their own
// careers. What is NOT fine is the same person appearing twice, which the roster shuffle
// left behind: the user on both New York and Houston, one of them an empty shell with no
// career at all. Only the empty shell goes, and only when a real copy of that same person
// exists elsewhere. Nobody with a career is ever removed.
window.roGhosts=function(s){try{
 if(!s||!s.T||!s.ro)return {removed:0,names:[]};
 const seen={};
 for(let i=0;i<s.T.length;i++){
  const L=s.ro['h.'+i];if(!Array.isArray(L))continue;
  L.forEach((x,k)=>{if(!x||!x.n)return;
   (seen[x.n]=seen[x.n]||[]).push({i,k,rows:(x.h||[]).length,tms:(x.tm||[]).length,x});
  });
 }
 const out=[];
 Object.keys(seen).forEach(n=>{
  const C=seen[n];if(C.length<2)return;
  const real=C.filter(c=>c.rows>0||c.tms>0);
  const shells=C.filter(c=>c.rows===0&&c.tms===0);
  // every copy has a career: two different men with the same name. Leave them.
  if(!real.length||!shells.length)return;
  shells.forEach(sh=>{
   const L=s.ro['h.'+sh.i];const ix=L.indexOf(sh.x);
   if(ix>=0){L.splice(ix,1);out.push(n+' (empty copy on '+((s.T[sh.i]||{}).n||sh.i)+')')}
  });
 });
 return {removed:out.length,names:out};
}catch(e){return {removed:0,names:[]}}};
(()=>{try{if(typeof mig!='function')return;const _m=mig;
 mig=function(s){s=_m.apply(this,arguments);try{roGhosts(s)}catch(e){}return s}}catch(e){}})();
(()=>{try{const _sv=save;save=function(){
 try{if(typeof S!='undefined'&&S&&!(typeof RSEDIT!='undefined'&&RSEDIT))roGhosts(S)}catch(e){}
 return _sv.apply(this,arguments)}}catch(e){}})();
