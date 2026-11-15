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
// current saves: join the team once; the generic player in that spot goes to free agency
window.add26Late=s=>(s.y0||2022)+((s.hist||[]).length)>2028;
// one team: its additions join (the generic player in each spot goes to free agency, nobody deleted, no names changed)
window.add26Team=function(s,pi,key){try{s.add26t=s.add26t||{};if(s.add26t[pi])return 0;const L=s.ro&&s.ro[key];if(!Array.isArray(L)||!L.length)return 0;s.add26t[pi]=1;if(add26Late(s))return 0;
 const t=s.pro[pi];let n=0;const me=key==='h.0'&&s.stage==='pro';
 ADD26.filter(e=>e[0]===pi).forEach(e=>{const[,slot,name,ovr,age]=e;for(const k in s.ro){if((s.ro[k]||[]).some(x=>x&&x.n===name))return}
  const okSlot=j=>{const x=L[j];return x&&!(me&&j===0)&&isGen(x.n)&&!x.add26};let k=slot;if(!okSlot(k))k=L.findIndex((x,j)=>j>0&&POSL[j]===POSL[slot]&&okSlot(j));
  const nx={n:name,pos:POSL[slot],ovr,pot:ovr,age,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{}};add26Fix(nx,e);
  if(k<0){L.push(nx);n++;return}const old=L[k];if(old){old.prev=(t&&(t.ab||t.code))||'';old.fa=(s.y0||2022)+((s.hist||[]).length);old.why='roster spot taken by '+name;s.ro.fa=Array.isArray(s.ro.fa)?s.ro.fa:[];s.ro.fa.push(old)}L[k]=nx;n++});return n}catch(e){return 0}};
window.add26Key=function(s,pi){const t=s.pro&&s.pro[pi];if(!t)return null;if(s.stage==='pro'&&Array.isArray(s.T)){const ix=s.T.indexOf(t)>=0?s.T.indexOf(t):s.T.findIndex(x=>x.n===t.n&&(x.city||'')===(t.city||''));if(ix>=0)return 'h.'+ix}return 'p.'+pi};
// current saves: every team whose roster is already built gets its additions now; the rest when their roster is built
window.add26Join=function(s){try{s=s||S;if(!s||!s.pro||!s.ro)return 0;let n=0;[...new Set(ADD26.map(e=>e[0]))].forEach(pi=>{const key=add26Key(s,pi);if(key)n+=add26Team(s,pi,key)});s.add26=1;return n}catch(e){return 0}};
(()=>{try{const _r=rost;rost=function(a){const L=_r.apply(this,arguments);try{if(S&&S.pro&&typeof a==='string'){let pi=-1;if(a[0]==='p')pi=+a.slice(2);else if(a[0]==='h'&&S.stage==='pro'&&S.T){pi=pIdx(S.T[+a.slice(2)])}else if(a[0]==='h'){pi=-1}
  if(pi>=0&&!(S.add26t&&S.add26t[pi])&&ADD26.some(e=>e[0]===pi)){const key=add26Key(S,pi);if(key&&S.ro[key]===L)add26Team(S,pi,key)}}}catch(e){}return L}}catch(e){}})();
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{add26Join(s)}catch(e){}return s}}catch(e){}})();
// his card shows where he came from
(()=>{try{const _p=pCard;pCard=function(i,j){const r=_p.apply(this,arguments);try{const x=rost('h.'+i)[j];if(x&&x.add26&&!ui.querySelector('[data-add26]')){const d=ui.firstElementChild||ui,c=document.createElement('div');c.className='card';c.setAttribute('data-add26','1');
 c.innerHTML=`<b>📜 Before this save</b><br><small>Drafted ${x.dr.y}, round ${x.dr.r}, pick ${x.dr.p} by ${esc(x.dr.tm)} out of ${esc(x.dr.col)}. Teams: ${esc(x.prevTeams||x.dr.tm)}. His stats here start in this save.</small>`;const h=d.querySelector('h2');if(h)h.after(c);else d.prepend(c)}}catch(e){}return r}}catch(e){}})();
