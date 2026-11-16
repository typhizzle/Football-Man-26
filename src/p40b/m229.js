// ===== 🎯 EXACT OVERALLS (Tyler 2026-11-16) =====
// "Could you make LaMarcus Action a 94 overall? ... Femmifer Allen an 89 overall ... Jay Copyright an 89 overall, keeping the same
// rating adjustments." Set once in every save (and for new worlds); the ▲▼ ratings-update card stays exactly as it was.
window.OVSET=[['Lamarcus Action',94],['Femmifer Allen',89],['Jay Copyright',89]];
try{OVSET.forEach(([n,v])=>{[typeof QBP!='undefined'?QBP:[],typeof QBB!='undefined'?QBB:[]].forEach(T=>T.forEach(r=>{if(r[0]===n&&typeof r[1]==='number')r[1]=v}))})}catch(e){}
window.ovSetApply=function(s){try{if(!s||!s.ro)return 0;s.ovSetA=s.ovSetA||{};let n=0;OVSET.forEach(([nm,v])=>{const key=nm+'|'+v;if(s.ovSetA[key])return;
  for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(x&&x.n===nm&&x.n!==s.name&&typeof x.ovr==='number'){x.ovr=v;if(x.pk!=null)x.pk=Math.max(x.pk,v);n++}})}
  s.ovSetA[key]=1});return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)ovSetApply(r)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(S&&ovSetApply(S))save()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// ===== 🏈 THE OTHER TEAM SCORES LIKE A REAL TEAM IN YOUR GAMES =====
// Tyler 2026-11-16: "for a short 5 minute game. An average offense should score about 16.5 pts per game on an average defense ...
// just for the five-minute player games ... it should apply to every drive ... whether you watch it or you simulate it."
// Their drive is decided once (watching replays that same drive), so this covers both. Measured: an average-vs-average drive scored
// 36% of the time (2.1 pts); with ~7 of their drives a game that's well under 16.5. Now a drive that came up empty gets one more
// honest roll (same teams, same spot, same clock) 30% of the time: ~43% of drives score. Better offenses still score more, better
// defenses less. League games are not touched.
window.OPPX=.3;
(()=>{try{const _d=simDrive;simDrive=function(){const sv=!!window._rsR;const r=_d.apply(this,arguments);try{if(!sv&&window._oppD&&r&&!(r.pts>0)&&R()<OPPX){const r2=_d.apply(this,arguments);if(r2&&r2.pts>0)return r2}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _o=oppBall;oppBall=function(){window._oppD=1;try{return _o.apply(this,arguments)}finally{window._oppD=0}}}catch(e){}})();
// ===== 🏆 REAL COLLEGE AWARDS FOR REAL COUNTERPARTS =====
// Tyler 2026-11-16: "College awards should show up for the pro players, the ones with counterparts. Example: Cam Newton, he has a
// Heisman and national championship. Where it at though". Real, verified ones only (college year = his playing year):
// Cam Newton: Heisman + national title (Auburn 2010, his 4th college season); Johnny Manziel: Heisman (2012, 2nd season, redshirt
// freshman); Robert Griffin III: Heisman (2011, 4th season). Added once to those careers' trophy cases (saves already made too).
window.FACAW={'Cameron Nugent':['College yr 4: Heisman Trophy','College yr 4: National Champions'],'Johnny Football':['College yr 2: Heisman Trophy'],'Rob Griffith III':['College yr 4: Heisman Trophy']};
window.faCol=function(s){try{s=s||S;if(!s||!s.tk||s.facaw===s.tk)return 0;const A=FACAW[s.tk];if(!A){s.facaw=s.tk;return 0}s.aw=s.aw||[];let n=0;A.forEach(a=>{if(!s.aw.includes(a)){s.aw.push(a);n++}});s.facaw=s.tk;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)faCol(r)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(S&&faCol(S))save()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// ===== Ricky MaClones / Jarsh Fallon exact ratings (Tyler 2026-11-16) =====
// Ricky: acc 97 · pow 98 · spd 87 · car 92 · awr 97 · trk 83 (avg 92) — Jarsh: acc 95 · pow 98 · spd 89 · trk 96 · car 87 · awr 93 (avg 93).
// "if their ratings don't match their overall, just make it match the ones I gave you that were specific or stay the same": the overall
// (98 / 97) is kept (Tyler: "Overall stayed the same as I gave you, just adjust ratings according to what I'm giving you"): all six rise
// evenly from his numbers to reach it, so each keeps his shape (Ricky's truck and speed stay his lowest). Used whenever a
// career plays as them; league ratings unchanged.
try{QBX26['Ricky MaClones']={s:[97,98,97,87,92,83],fix:[],ovr:null,v:3};QBX26['Jarsh Fallon']={s:[95,98,93,89,87,96],fix:[],ovr:null,v:3}}catch(e){}
// Tyler 2026-11-16 (later): "just get it closer to what I have. There's no reason to give him max ... I didn't give him max". So a career
// playing as them gets his numbers exactly (Ricky avg 92, Jarsh 93); the league keeps their 98 / 97.
(()=>{try{const _q=qbExact;qbExact=function(n,ovr){if(n==='Ricky MaClones'||n==='Jarsh Fallon'){const X=QBX26[n];const k=['acc','pow','awr','mob','sec','trk'],q={};k.forEach((x,i)=>q[x]=X.s[i]);return q}return _q.apply(this,arguments)};window.qbExact=qbExact}catch(e){}})();
// ===== 📌 TYLER'S OVERALL + TYLER'S RATINGS, BOTH KEPT =====
// Tyler 2026-11-16: "I want to maintain my ratings too" (after keep the overall). A career playing as Ricky MaClones or Jarsh Fallon gets
// his exact ratings AND the overall Tyler set (98 / 97); the overall is pinned to that, and every upgrade still moves it as it would
// move his average (overall = pinned + (average now - average at the start)). Nobody else's overall changes.
window.OVPIN={};   // superseded by the weighted QB overall (m233): Ricky and Jarsh reach 98 / 97 from Tyler's exact ratings
const _avg6=q=>[q.acc,q.pow,q.awr,q.mob,q.sec,q.trk==null?q.sec:q.trk].reduce((a,b)=>a+(b||0),0)/6;
(()=>{try{const _q=qo;qo=function(q){const r=_q.apply(this,arguments);try{if(S&&q===S.q&&S.ovPin){return Math.max(1,Math.min(99,Math.round(S.ovPin.o+(_avg6(q)-S.ovPin.b))))}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _a=qbx26Apply;window.qbx26Apply=qbx26Apply=function(s,fresh){const r=_a.apply(this,arguments);try{s=s||S;const n=s&&(s.tk||s.name);if(n&&OVPIN[n]&&!s.ovPin&&s.q){s.ovPin={o:OVPIN[n],b:_avg6(s.q)};try{const L=s.ro&&s.ro['h.0'];if(L&&L[0]&&L[0].n===s.name)L[0].ovr=OVPIN[n]}catch(e){}}}catch(e){}return r}}catch(e){}})();
