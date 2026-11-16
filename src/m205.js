// ===== ⚡ QUICK FIXES, 2026-11-16 (Tyler's batch) =====
// 1. A free-agent career (Play as an existing QB → free agents) starts in 2026, not 2022: the calendar was never set, so the week-1
//    games were filed under 2022 and the league stats page (which shows the season being played) said "Nothing yet". Fixed for
//    new careers and repaired on load for the one already started (its games are re-filed under 2026).
// 2. Locker room: the controller's Start/Options button opens the player menu (same as the ☰ button).
// 3. Moving the mouse no longer switches the controller off (Mac trackpads jitter), so the receiver buttons stay on screen.
// 4. The throwing-power list is off the "Play as an existing QB" page; it lives on the Ratings updates page with the Nov 15 list.
// 5. Ratings, all saves: Cameron Nugent (acc 67 · pow 83 · awr 63 · spd 83 · car 70 · trk 84, overall stays 68), Johnny Football
//    (53 · 75 · 46 · 90 · 74 · 49, overall stays 57). New worlds: Doobie Emmanuel +1, Kirko Chainz +1, Franklin Lawford +1,
//    Number Nine +1, Drako September −1, Jack Mascott −1 (shown with ▲▼ on the Ratings updates page until Tyler says otherwise).
// 6. Free agents look like themselves (Cam Newton is not white).  7. Real awards in the trophy case (Cam: OROY, MVP; RG3: OROY;
//    Tannehill: Comeback Player of the Year).  8. Free agents always get an offer from the team they played for longest (Tannehill:
//    Miami and Tennessee).  9. Exotic skins cost millions.  10. No backwards throws; a slingshot pull-back that ends in a forward
//    flick still throws the pull-back.  11. One transactions button (the league office one).  12. Kenny Fallon (Keenan Allen) WR 81
//    joins the 49ers with his real seasons; Daejon Love WR 86 (35) enters free agency in new worlds.
const RCODE={TEN:'NSH',CAR:'CHA',NE:'BOS',LAR:'LAG',LAC:'LA',ARI:'PHX',NYJ:'NYS',NYG:'NYE'};window.gCode=c=>RCODE[c]||c;
// ---- 1. the free-agent career calendar ----
window.faYearFix=function(s){try{if(!s||s.stage!=='pro'||!s.tk||s.fayf)return 0;const isFA=(typeof FA26!='undefined')&&FA26.some(e=>e[0]===s.tk);if(!isFA)return 0;s.fayf=1;
 if((s.y0||2022)<2026&&!(s.hist||[]).length){s.y0=2026;const S0=S;S=s;let Y;try{Y=yrN()}finally{S=S0}
  if(s.gr&&s.grk&&s.grk!=='pro'+Y){s.grk='pro'+Y}if(s.bxv&&s.bxv.y<Y)s.bxv.y=Y-1;if(s.bxv2&&s.bxv2.y<Y)s.bxv2.y=Y-1;['evc','pbv'].forEach(k=>{if(s[k]&&s[k].y<2026)s[k].y=Y});return 1}return 0}catch(e){return 0}};
(()=>{try{const _f=faqSign;window.faqSign=function(){const r=_f.apply(this,arguments);try{if(S&&S.tk){S.y0=2026-((S.hist||[]).length);S.fayf=1;faLook();faAwards();faShape();save()}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r&&faYearFix(r)){const S0=S;S=r;try{faLook();faAwards();faShape()}finally{S=S0}}else if(r&&r.tk){const S0=S;S=r;try{faShape();faAwards();faLook()}finally{S=S0}}}catch(e){}return r}}catch(e){}})();
// ---- 5/6/7. who the free agents are ----
window.FAQSH={'Cameron Nugent':[67,83,63,83,70,84],'Johnny Football':[53,75,46,90,74,49]};
window.FALOOK={'Cameron Nugent':4,'Johnny Football':0,'Rylan Tannen':0,'Kellen Kapper':4,'Rob Griffith III':4,'James Garo':0,'Taylen Hills':0,'Devin Turner-Robertson':4,'Mike Coral':0,'Jake Portals':0,'Nick Parkerman':0,'Tyron Hills':4,'Raymond Monster':4,'Kerry Hunter':4,'Mason Latimer':4,'Brett Waggoner':4};
window.FAAW={'Cameron Nugent':['Pro yr 1: Offensive Rookie of the Year','Pro yr 5: MVP','Pro yr 5: Ultra Bowl appearance'],'Rob Griffith III':['Pro yr 1: Offensive Rookie of the Year'],'Rylan Tannen':['Pro yr 8: Comeback Player of the Year']};
window.faShape=function(){try{const sh=FAQSH[S.tk];if(!sh||S.shp26===S.tk||(typeof QBX26!='undefined'&&QBX26[S.tk]))return;   /* m207 handles these, keeping the overall */QBSH[S.tk]=sh;const q=qbShape(S.tk,qo(S.q));if(q){S.q={...S.q,...q};S.shp26=S.tk;const L=S.ro&&S.ro['h.0'];if(L&&L[0]&&L[0].n===S.name)L[0].ovr=qo(S.q)}}catch(e){}};
window.faLook=function(){try{const sk=FALOOK[S.tk];if(sk==null||S.look26===S.tk)return;S.ap={...(S.ap||{}),sk};S.look26=S.tk;if(sk>=4&&!(S.ap.hcl))S.ap.hcl='#1b1b1b'}catch(e){}};
window.faAwards=function(){try{const A=FAAW[S.tk];if(!A||S.faaw===S.tk)return;S.aw=S.aw||[];A.forEach(a=>{if(!S.aw.includes(a))S.aw.push(a)});S.faaw=S.tk}catch(e){}};
try{Object.keys(FAQSH).forEach(n=>{QBSH[n]=FAQSH[n]})}catch(e){}
try{Object.keys(FALOOK).forEach(n=>{if(typeof PLK!='undefined'&&!PLK[n])PLK[n]={s:FALOOK[n],h:'#1b1b1b',hr:'short'}})}catch(e){}
// ---- 8. the team he played for longest always calls ----
window.FAHOME={'Rylan Tannen':['MIA','TEN']};window.FAQN=null;
(()=>{try{const _g=faqGo;window.faqGo=function(nEnc){FAQN=decodeURIComponent(nEnc);try{return _g.apply(this,arguments)}finally{FAQN=null}}}catch(e){}})();
(()=>{try{const _t=faqTeams;window.faqTeams=function(ovr,age){let L=_t.apply(this,arguments)||[];try{const n=FAQN;if(!n)return L;const e=FA26.find(x=>x[0]===n);if(!e)return L;const homes=FAHOME[n]||[String(e[4]||'').split(',')[0].trim()];
 homes.forEach(c=>{const code=gCode(c),i=TA.indexOf(code);if(i<0||L.some(o=>o.i===i))return;const t=S.pro[i];const R=(S.ro&&S.ro['p.'+i])||[];const st=R[0]&&R[0].pos==='QB'?R[0]:(QBP[pIdx(t)]?{n:QBP[pIdx(t)][0],ovr:QBP[pIdx(t)][1]}:null);const so=st?st.ovr:75;
  const comp=ovr>=so-3,role=comp?'Compete for the starting job':'Backup QB',sal=+(comp?Math.max(1.5,(ovr-55)*.45):Math.max(1.2,(ovr-55)*.2)).toFixed(1);L.push({i,team:tn(t),code:tAb(t),role,yrs:age<30?2:1,sal,why:'Where he made his name: the fans want him back.',fit:999,home:1})});L.sort((a,b)=>b.fit-a.fit);while(L.length>4){const k=L.map((o,i)=>o.home?-1:i).filter(i=>i>=0).pop();if(k==null)break;L.splice(k,1)}}catch(e){}return L}}catch(e){}})();
// ---- 9. exotic skins ----
try{for(let i=0;i<SKP.length;i++)if(SKP[i]>0)SKP[i]=Math.max(1000000,SKP[i]*500)}catch(e){}
// ---- 10. no backwards throws ----
(()=>{try{const _d=doThrow;doThrow=function(w,lx,ly){let q=null;try{q=g&&g.pl&&g.pl.qb;if(q&&ly<q.y+1)ly=q.y+1}catch(e){}const r=_d.call(this,w,lx,ly);try{const A=g&&g.pl&&g.pl.air;if(A&&q&&A.ly<A.y0+1){A.ly=A.y0+1}}catch(e){}return r}}catch(e){}})();   /* accuracy scatter can't push it behind him either */
// ---- 11. one transactions button ----
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{const b=[...ui.querySelectorAll('button')].find(x=>(x.getAttribute('onclick')||'')==='txV()');const lo=document.getElementById('lgob');if(b&&lo){b.textContent='🧾 Transactions & league office';b.setAttribute('onclick','lgV()');lo.remove()}}catch(e){}return r}}catch(e){}})();
// ---- 4/5. ratings updates page ----
window.RUPD3D=[['Doobie Emmanuel',1],['Kirko Chainz',1],['Franklin Lawford',1],['Number Nine',1],['Drako September',-1],['Jack Mascott',-1]];window.RUPD3=null;
(()=>{try{const L=[];RUPD3D.forEach(([n,d])=>{let o=null,pos='';try{const q=PKS.find(x=>x[2]===n);if(q){o=q[3];q[3]+=d;pos=POSL[q[1]]||''}}catch(e){}if(o==null)try{const b=QBB.find(x=>x[0]===n);if(b){o=b[1];b[1]+=d;pos='QB'}}catch(e){}if(o==null)try{const p=QBP.find(x=>x[0]===n);if(p){o=p[1];p[1]+=d;pos='QB'}}catch(e){}if(o!=null)L.push([n,pos,o,o+d])});RUPD3={d:'Nov 15, 2026',L}}catch(e){}})();
(()=>{try{const _t=tkPick;tkPick=function(){const r=_t.apply(this,arguments);try{[...ui.querySelectorAll('.card')].forEach(c=>{if(/Ratings update · Nov 14, 2026 · throwing power/.test(c.textContent))c.remove()})}catch(e){}return r}}catch(e){}})();
(()=>{try{const _v=rupdV;rupdV=function(){const r=_v.apply(this,arguments);try{const bk=[...ui.querySelectorAll('button')].find(b=>(b.getAttribute('onclick')||'')==='hub()');const d=document.createElement('div');
 d.innerHTML=(RUPD3&&RUPD3.L.length?`<div class=card><b>📈 Ratings update · ${RUPD3.d}</b><br><small>Every save (applied once).</small>${RUPD3.L.map(x=>{const df=x[3]-x[2];return `<div class=row style="font-size:16px"><span>${esc(x[0])} <small>${x[1]}</small></span><span>${x[2]} → <b>${x[3]}</b> <b style="color:${df>0?'#7bed9f':'#ff6b6b'}">${df>0?'▲ +':'▼ '}${df}</b></span></div>`}).join('')}</div>`:'')+(typeof rupdCard=='function'?rupdCard():'');
 if(bk)bk.parentNode.insertBefore(d,bk);else(ui.firstElementChild||ui).appendChild(d)}catch(e){}return r}}catch(e){}})();
// ---- 12. Kenny Fallon (49ers) · Daejon Love (free agent, new worlds) ----
window.KF26={n:'Kenny Fallon',pos:'WR',num:13,ovr:81,age:34,dr:{y:2013,r:3,p:76,tm:'LA',col:'California'},h:[[2013,15,1046,8],[2014,15,783,4],[2015,15,725,4],[2016,15,63,0],[2017,15,1393,6],[2018,15,1196,6],[2019,15,1199,6],[2020,15,992,8],[2021,15,1138,6],[2022,15,752,4],[2023,15,1243,7],[2024,20,744,7]],prev:'LA, CHI, IND'};
window.kfJoin=function(s){try{s=s||S;if(!s||!s.ro||s.kf26)return 0;const y=(s.y0||2022)+((s.hist||[]).length);if(s.stage==='pro'&&y>2028){s.kf26=1;return 0}
 for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L)&&L.some(x=>x&&x.n===KF26.n)){s.kf26=1;return 0}}
 const key=typeof add26Key=='function'?add26Key(s,28):'p.28';const L=s.ro[key];if(!Array.isArray(L)||!L.length)return 0;   /* joins when the 49ers roster exists */
 const x={n:KF26.n,pos:'WR',num:KF26.num,ovr:KF26.ovr,pot:KF26.ovr,age:KF26.age,cls:0,qp:1,qn:1,ny:KF26.h.length,h:KF26.h.map(r=>r.slice()),cs:{},tm:[],aw:{},dr:{...KF26.dr},prev:KF26.prev,kf26:1};
 try{x.h.forEach(r=>{csAdd(x,'w',r.slice(2));tmAdd(x,r[1])});tmAdd(x,9)}catch(e){}
 const isG=p=>typeof isGen=='function'?isGen(p.n):true;let j=[3,4,2].find(i=>L[i]&&isG(L[i]));if(j==null){L.push(x)}else{const old=L[j];old.prev='SF';old.fa=y;old.why='roster spot taken by Kenny Fallon';s.ro.fa=Array.isArray(s.ro.fa)?s.ro.fa:[];s.ro.fa.push(old);L[j]=x}
 s.kf26=1;try{lgTx({t:'trade',n:x.n,pos:'WR',ovr:x.ovr,age:x.age,from:'IND',to:'SF',d:'Traded from the Colts to the 49ers',big:true})}catch(e){}return 1}catch(e){return 0}};
(()=>{try{const _r=rost;rost=function(a){const L=_r.apply(this,arguments);try{if(S&&!S.kf26&&S.pro){const key=typeof add26Key=='function'?add26Key(S,28):'p.28';if(S.ro[key]===L)kfJoin(S)}}catch(e){}return L}}catch(e){}})();
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)kfJoin(r)}catch(e){}return r}}catch(e){}})();
window.DL26={n:'Daejon Love',pos:'WR',num:11,ovr:86,age:35,spd:94};
(()=>{try{const _s=start;start=function(){const r=_s.apply(this,arguments);try{if(S&&!S.dl26){S.ro=S.ro||{};if(!Array.isArray(S.ro.fa))S.ro.fa=[];if(!S.ro.fa.some(x=>x&&x.n===DL26.n))S.ro.fa.push({...DL26,pot:86,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},prev:'',fa:2026,story:'A 35-year-old burner (94 speed) looking for one more big year.'});S.dl26=1}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _p=proStart;proStart=function(){const r=_p.apply(this,arguments);try{if(S&&S.ro&&Array.isArray(S.ro.fa)&&S.dl26){/* the pool survives proStart (m182) */}}catch(e){}return r}}catch(e){}})();
