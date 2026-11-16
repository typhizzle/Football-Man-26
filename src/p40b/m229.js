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
