// ===== 🧬 ONE resolver for "what club is this man's, this year" =====
// With TA in step, a slot finally means what it says. What remains is that different
// screens answered the team question in different ways, and each had a hole:
//   • the ballot sweep demanded an archived history row for that year, so a player with
//     no row yet — anyone in the season currently being played, and every player whose
//     season has not been archived — kept whatever label was stored when TA was broken.
//   • some screens read a roster slot, some a `tm` list, some a history row.
// There is now ONE answer, and every screen asks for it. In order of authority:
//   1. the season he actually played that year, from his own history row
//   2. the last club on his own `tm` list — his own record of where he has been
//   3. the roster he is standing on right now
// If all three are silent, nothing is printed rather than a guess. A guess is how
// Houston happened.

window.plFind=function(name){try{
 if(!name)return null;
 if(typeof taSync=='function')taSync();
 for(let i=0;i<(S.T||[]).length;i++){
  let L;try{L=rost('h.'+i)}catch(e){continue}
  const p=(L||[]).find(q=>q&&q.n===name);
  if(p)return {p,slot:i};
 }
 // not on a roster: free agency, then the retired list. He still exists.
 try{const f=((S.ro||{}).fa||[]).find(q=>q&&q.n===name);if(f)return {p:f,slot:-1}}catch(e){}
 try{const rt=(S.retd||[]).find(q=>q&&q.n===name);if(rt)return {p:rt,slot:-1}}catch(e){}
 return null;
}catch(e){return null}};

// the club, as his own record has it
// A history row stores h[1] as a SLOT NUMBER, and a slot number is only meaningful in
// the league ordering that was in force when the row was written. S.T is reordered when
// a career starts (the user's club is swapped to slot 0) and again whenever the college
// game contracts, so an old row's index silently comes to mean a different club. That is
// how Axel Jean, whose own record says Las Vegas and nothing else, came to be printed as
// a New York player: a row from an earlier ordering read through today's.
//
// So an index is EVIDENCE, not authority. A season may only be attributed to a club the
// player's own `tm` record says he played for. When the index names a club that is not
// in his record, the index is stale and is thrown away — never his record.
window.plTeam=function(name,yr){try{
 const f=plFind(name);if(!f)return null;
 const p=f.p;
 const tms=Array.isArray(p.tm)?p.tm.filter(Boolean):[];
 if(yr!=null&&Array.isArray(p.h)){
  const h=p.h.find(q=>q&&q[0]==yr);
  if(h&&h[1]!=null&&S.T[h[1]]){
   const ab=TA[h[1]];
   if(ab&&(!tms.length||tms.indexOf(ab)>=0))return {ab,pi:h[1],via:'season'};
  }
 }
 if(tms.length){
  const ab=tms[tms.length-1],pi=TA.indexOf(ab);
  return {ab,pi:pi>=0?pi:f.slot,via:'record'};
 }
 if(f.slot>=0&&tSlot(f.slot))return {ab:tSlot(f.slot),pi:f.slot,via:'roster'};
 return null;
}catch(e){return null}};

// ---- the ballot's stored labels, corrected with no holes ----
// awAddLeaders' own sweep is replaced wholesale: it runs after the original so the stat
// lines and leader tags are already in place, and then every stored candidate's team is
// set from plTeam. A candidate the resolver cannot place keeps what he had rather than
// being handed a club he never played for.
(()=>{try{if(typeof awAddLeaders!='function')return;const _a=awAddLeaders;
 window.awAddLeaders=function(py){
  const n=_a.apply(this,arguments);
  try{
   const A=S&&S.law&&S.law[py];if(!A||!A.c)return n;
   const yr=A.yr;
   ['OPOY','DPOY','MVP','OROY','DROY'].forEach(cat=>{
    const L=A.c[cat];if(!Array.isArray(L))return;
    L.forEach(z=>{
     if(!z||!z.n)return;
     const t=plTeam(z.n,yr);
     if(t&&t.ab){z.tm=t.ab;if(t.pi!=null)z.pi=t.pi}
    });
   });
  }catch(e){}
  return n;
 }}catch(e){}})();

// a ballot stored before this version re-fills once
try{window.AWFIXV=4}catch(e){}

// ---- a standing check: does any screen print a club the man's own record denies? ----
// This is the guarantee Tyler asked for, as something that can be run and read rather
// than something I say. It reports; it changes nothing.
window.plVerify=function(){try{
 if(typeof taSync=='function')taSync(1);
 const bad=[];
 // every stored award label must agree with the player's own record
 Object.keys(S.law||{}).forEach(k=>{
  const A=S.law[k];if(!A||!A.c)return;
  Object.keys(A.c).forEach(cat=>{
   const L=A.c[cat];if(!Array.isArray(L))return;
   // checked against the player's OWN `tm` record, not against plTeam — a verifier
   // that asks the resolver it is auditing proves nothing
   L.forEach(z=>{
    if(!z||!z.n||!z.tm)return;
    const f=plFind(z.n);if(!f)return;
    const tms=Array.isArray(f.p.tm)?f.p.tm.filter(Boolean):[];
    if(!tms.length)return;
    if(tms.indexOf(z.tm)<0)
     bad.push(cat+' '+A.yr+': '+z.n+' printed '+z.tm+' but his record is '+tms.join('/'));
   });
  });
 });
 // and every history row must name a club that exists in this save
 let rows=0,orphan=0;
 for(let i=0;i<(S.T||[]).length;i++){
  let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{(x&&x.h||[]).forEach(h=>{rows++;
   if(h[1]!=null&&!S.T[h[1]])orphan++});});
 }
 return {awardMismatches:bad,historyRows:rows,rowsNamingAMissingTeam:orphan,
         misfiledRosters:(typeof roAudit=='function')?roAudit():'n/a'};
}catch(e){return {err:e.message}}};
