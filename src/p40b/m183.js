// ===== ➕ EXISTING ROSTER ADDITIONS (21 real-life counterparts) =====
// Tyler, 2026-11-15 ("FOOTBALL MAN — EXISTING ROSTER ADDITIONS"): "have these players and make sure they have the right player
// history. They obviously have counterparts ... they should not replace anyone already made unless their character is someone
// that are already made, then they should replace that version of them ... current saves too? ... player lives matter. Just
// needs to be preserved".
// None of the 21 already exists in the game (checked against every named player), so nobody is replaced.
// New saves: each one is placed on his team when that roster is first built (like every other named player).
// Current saves: each one joins his team; the generic player in that spot moves to free agency (nobody deleted, no name changes).
// History: his real draft (year, round, pick, team, college) and the teams he really played for. The game does not have his
// real season-by-season stats, so none are made up: his stat lines start in this save. (The usual history generator would
// have given him random former teams.)
// [pro team index (league order), roster slot, name, ovr, age (2026), number, draft {y,r,p,tm,col}, teams before]
window.ADD26=[
 [22,1,'Joshua Jackrabbit',94,28,8,{y:2019,r:1,p:24,tm:'LV',col:'Alabama'},'LV, GB'],
 [21,2,'Apollo St. Gold',96,27,14,{y:2021,r:4,p:112,tm:'DET',col:'USC'},'DET'],
 [24,2,'Blake Paris',91,25,5,{y:2022,r:1,p:8,tm:'ATL',col:'USC'},'ATL'],
 [4,2,'Clay Roses',90,26,4,{y:2023,r:1,p:22,tm:'BAL',col:'Boston College'},'BAL'],
 [25,2,'Krispo Wave',92,26,12,{y:2022,r:1,p:11,tm:'NO',col:'Ohio State'},'NO'],
 [0,2,'Gavin Whistle',91,26,17,{y:2022,r:1,p:10,tm:'NYJ',col:'Ohio State'},'NYJ'],
 [30,5,'Troy McKnight',98,27,85,{y:2022,r:2,p:55,tm:'ARI',col:'Colorado State'},'ARI'],
 [4,5,'Marcus Endzone',84,31,89,{y:2018,r:3,p:86,tm:'BAL',col:'Oklahoma'},'BAL'],
 [3,18,'Christopher Gonzalez',91,24,0,{y:2023,r:1,p:17,tm:'NE',col:'Oregon'},'NE'],
 [27,12,'Derek Black',87,28,95,{y:2020,r:1,p:7,tm:'CAR',col:'Auburn'},'CAR'],
 [12,12,'Chris Bones',94,32,95,{y:2016,r:2,p:37,tm:'KC',col:'Mississippi State'},'KC'],
 [26,12,'Vito Ve',93,31,50,{y:2018,r:1,p:12,tm:'TB',col:'Washington'},'TB'],
 [4,16,'Rohan Steele',93,29,0,{y:2018,r:1,p:8,tm:'CHI',col:'Georgia'},'CHI, BAL'],
 [6,18,'Darius Guard',92,29,21,{y:2018,r:1,p:4,tm:'CLE',col:'Ohio State'},'CLE'],
 [24,20,'Jesse Baits III',95,29,3,{y:2018,r:2,p:54,tm:'CIN',col:'Wake Forest'},'CIN, ATL'],
 [15,20,'Darwin Games',93,30,3,{y:2018,r:1,p:17,tm:'LAC',col:'Florida State'},'LAC'],
 [4,20,'Kyler Hambleton',95,25,14,{y:2022,r:1,p:14,tm:'BAL',col:'Notre Dame'},'BAL'],
 [26,20,'Antonio Windfield Jr.',91,28,31,{y:2020,r:2,p:45,tm:'TB',col:'Minnesota'},'TB'],
 [13,6,'Garrett Brickwall',94,34,72,{y:2017,r:1,p:20,tm:'DEN',col:'Utah'},'DEN'],
 [20,7,'Joey Tune',96,34,62,{y:2016,r:3,p:78,tm:'NE',col:'NC State'},'NE, KC, CHI'],
 [26,6,'Tristan Whirley',96,27,78,{y:2020,r:1,p:13,tm:'TB',col:'Iowa'},'TB']];
window.ADD26N=new Set(ADD26.map(e=>e[2]));
window.add26Fix=function(x,e){x.h=[];x.cs={};x.tm=[];x.aw={};x.ny=0;x.dr={...e[6]};x.prevTeams=e[7];x.num=e[5];x.add26=1};
// new saves: the normal named-player path (PKS), then his history is set to the real one
try{ADD26.forEach(e=>{if(!PKS.some(q=>q[2]===e[2]))PKS.push([e[0],e[1],e[2],e[3],e[4],e[5]])})}catch(e){}   /* PKS fills only rosters built fresh (new saves) */
(()=>{try{const _f=proFill;proFill=function(a,t,L){let held=null;try{const SS=window._MIGS||S;if(SS&&(SS.y0||2022)+((SS.hist||[]).length)>2028){held=PKS.filter(q=>ADD26N.has(q[2]));for(let i=PKS.length-1;i>=0;i--)if(ADD26N.has(PKS[i][2]))PKS.splice(i,1)}}catch(e){}let r;try{r=_f.apply(this,arguments)}finally{if(held)held.forEach(q=>PKS.push(q))}try{const SS=window._MIGS||S,late=SS&&(SS.y0||2022)+((SS.hist||[]).length)>2028;(L||[]).forEach(x=>{if(x&&!x.add26&&ADD26N.has(x.n)){if(late){let n,g=0;do n=NF[Math.random()*NF.length|0]+' '+NL[Math.random()*NL.length|0];while(ADD26N.has(n)&&g++<20);x.n=n;return}const e=ADD26.find(q=>q[2]===x.n);if(e)add26Fix(x,e)}})}catch(e){}return r}}catch(e){}})();
// current saves: join the team once; the generic player in that spot goes to free agency
window.add26Join=function(s){try{s=s||S;if(!s||s.add26||!s.pro||!s.ro)return 0;if((s.y0||2022)+((s.hist||[]).length)>2028){s.add26=1;return 0}   /* 2026 ages: not dropped into a save years later */
 let n=0;const all=new Set();for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach(x=>x&&all.add(x.n))}
 ADD26.forEach(e=>{const[pi,slot,name,ovr,age]=e;if(all.has(name))return;const t=s.pro[pi];if(!t)return;let key='p.'+pi;if(s.stage==='pro'&&Array.isArray(s.T)){const ix=s.T.indexOf(t)>=0?s.T.indexOf(t):s.T.findIndex(x=>x.n===t.n&&(x.city||'')===(t.city||''));if(ix>=0)key='h.'+ix}
  const L=s.ro[key];if(!Array.isArray(L)||!L.length)return;   /* roster not built yet: he joins when it is (new-save path above) */
  let k=slot;const me=key==='h.0'&&s.stage==='pro';const okSlot=j=>{const x=L[j];return x&&!(me&&j===0)&&isGen(x.n)&&!x.add26};
  if(!okSlot(k)){k=L.findIndex((x,j)=>j>0&&POSL[j]===POSL[slot]&&okSlot(j))}
  const nx={n:name,pos:POSL[slot],ovr,pot:ovr,age,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{}};add26Fix(nx,e);
  if(k<0){L.push(nx);n++;return}
  const old=L[k];if(old){old.prev=(t.ab||t.code||tn(t));old.fa=(s.y0||2022)+((s.hist||[]).length);old.why='roster spot taken by '+name;s.ro.fa=Array.isArray(s.ro.fa)?s.ro.fa:[];s.ro.fa.push(old)}
  L[k]=nx;n++});s.add26=1;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const was=window._MIGS;window._MIGS=s;try{s=_m.apply(this,arguments)}finally{window._MIGS=was}try{add26Join(s)}catch(e){}return s}}catch(e){}})();
// his card shows where he came from
(()=>{try{const _p=pCard;pCard=function(i,j){const r=_p.apply(this,arguments);try{const x=rost('h.'+i)[j];if(x&&x.add26&&!ui.querySelector('[data-add26]')){const d=ui.firstElementChild||ui,c=document.createElement('div');c.className='card';c.setAttribute('data-add26','1');
 c.innerHTML=`<b>📜 Before this save</b><br><small>Drafted ${x.dr.y}, round ${x.dr.r}, pick ${x.dr.p} by ${esc(x.dr.tm)} out of ${esc(x.dr.col)}. Teams: ${esc(x.prevTeams||x.dr.tm)}. His stats here start in this save.</small>`;const h=d.querySelector('h2');if(h)h.after(c);else d.prepend(c)}}catch(e){}return r}}catch(e){}})();
