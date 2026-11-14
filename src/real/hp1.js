// EVERY PLAYER'S LIFE MATTERS — offensive linemen and kickers get a career.
// seasonEnd() did `if(!g)return;` before writing anything for a position with no stat
// group, so 160 linemen and 32 kickers in Tyler's save have NO season on record, ever.
// Fix (m124): each season they play is written to x.hp as [year, club] — never into x.h
// (a stat-less row in x.h once got filled with invented numbers). Sealed row by row.
// Every check CAN fail; A/B/F fail on V231.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const NOST=p=>!SG(p);
 const walk=fn=>{for(let i=0;i<S.T.length;i++)rost('h.'+i).forEach((x,k)=>x&&x.n&&fn(x,i,k))};
 // ---- baseline: every man's record as it stands ----
 const before={};walk(x=>{before[x.pid]=JSON.stringify({h:x.h||[],hx:x.hx||[],tm:x.tm||[],p:x.pos,aw:x.aw||{}})});
 // ---- play the season out through the game's own season end ----
 const yr=yrN();S.sled=null;seasonEnd();
 // A: every lineman and kicker on a pro roster now has this season, on his club
 let ol=0,olRow=0,olRight=0,statless=0,qbRows=0,qbs=0;const pick={};
 walk((x,i,k)=>{
  if(i==0&&k==0)return;
  if(NOST(x.pos)){ol++;
   const row=(x.hp||[]).find(q=>q[0]===yr);if(row)olRow++;
   if(row&&row[1]===pIdx(S.T[i]))olRight++;
   if((x.h||[]).some(q=>q.length<3))statless++;
   if(x.pos=='LT'&&!pick.ol)pick.ol=[i,k,x.pid];if(x.pos=='K'&&!pick.k)pick.k=[i,k,x.pid];
  }else if(x.pos=='QB'){qbs++;if((x.h||[]).some(q=>q[0]===yr))qbRows++}
 });
 out.A_linemenAndKickers=ol;out.A_gotThisSeason=olRow;out.A_onTheirOwnClub=olRight;
 out.B_noStatlessRowInH=statless===0;
 out.B_qbsStillRecorded=qbs>0&&qbRows===qbs;
 // C: nothing anyone already owned changed — old rows all present and unaltered
 let lost=0,alt=0;
 walk(x=>{const o=before[x.pid];if(!o)return;const O=JSON.parse(o);
  const cur=(x.h||[]).map(q=>JSON.stringify(q)),used=cur.map(()=>0);
  O.h.forEach(q=>{const sq=JSON.stringify(q);const i=cur.findIndex((c,n)=>!used[n]&&c===sq);if(i<0)lost++;else used[i]=1});
  if(JSON.stringify(x.hx||[])!==JSON.stringify(O.hx))alt++;
  if(O.tm.some(t=>(x.tm||[]).indexOf(t)<0))alt++;
  if(x.pos!==O.p)alt++;
  if(JSON.stringify(x.aw||{})!==JSON.stringify(O.aw))alt++;
 });
 out.C_oldRowsLost=lost;out.C_recordsAltered=alt;
 // F: the career card SHOWS it (rendered screen, not the function)
 const card=p=>{if(!p)return '';pCard(p[0],p[1]);return ui.innerText||ui.textContent||''};
 const t1=card(pick.ol),t2=card(pick.k);
 out.F_linemanCardShowsSeason=(t1.includes('Season by season')||t1.includes('📇 Career'))&&t1.includes(String(yr))&&/no stats kept/i.test(t1);
 out.F_kickerCardShowsSeason=(t2.includes('Season by season')||t2.includes('📇 Career'))&&t2.includes(String(yr))&&/no stats kept/i.test(t2);
 out.F_noInventedNumbers=!/\d+\s*\/\s*\d+/.test((t1.split('Season by season')[1]||'').split('Back')[0]);
 // D: the seal holds the new season. Seal a past row, then attack it.
 const find=pid=>{let f=null;walk(x=>{if(x.pid===pid)f=x});return f};
 const L=find(pick.ol&&pick.ol[2]);
 if(L){
  const ti=L.hp[0][1];
  L.hp.unshift([yr-1,ti]);sealCheck(S);              // a season from last year, sealed
  L.hp=L.hp.filter(q=>q[0]!==yr-1);sealCheck(S);      // deleted
  out.D_deletedSeasonBack=L.hp.some(q=>q[0]===yr-1&&q[1]===ti);
  L.hp=[];sealCheck(S);                               // wiped completely
  out.D_wipedCareerBack=L.hp.some(q=>q[0]===yr-1);
  L.hp.push([yr-1,(ti+1)%32]);sealCheck(S);           // a traded man: two clubs, one year
  out.D_twoClubsOneYearBothKept=L.hp.filter(q=>q[0]===yr-1).length===2;
  const f1=S.sealFix;sealCheck(S);sealCheck(S);
  out.E_settles=S.sealFix===f1;
 }
 // G: identity key untouched by the new list
 out.G_firstYrIgnoresHp=L?firstYr(L)===((L.h||[]).length?firstYr(L):null):true;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
