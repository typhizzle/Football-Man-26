// ===== 🎯 TYLER'S EXACT RATINGS (2026-11-16) =====
// "Cameron Nugent ... 83 speed plz" · "Manziel's attributes haven't changed. 90 spd" · "Joe Milton is Jacque Hilton III" (acc 62,
// power 99, awareness 57, speed 84, truck 73, carrying 68 — a 73/74) · "Give Joseph Shiesty a +1".
// Overall is the average of the six ratings. A rating Tyler pins (speed) is kept EXACTLY; the others keep his shape and move together
// so the overall is what he asked for. All saves (his careers as these men, and anyone who takes them over later).
// Tyler 2026-11-16 (later): "mainly the high ones I would keep and I would lower the lower ones". So the HIGH ratings on his list (70+)
// stay exactly as he gave them and only the low ones move to reach the overall; an upgraded career's extra points go onto the low ones,
// so every rating stays at or above the starting version.
window.QBX26={'Cameron Nugent':{s:[67,83,63,83,70,84],fix:['pow','mob','trk'],ovr:68,v:3},'Johnny Football':{s:[53,75,46,90,74,49],fix:['pow','mob','sec'],ovr:57,v:3},
 'Jacque Hilton III':{s:[62,99,57,84,68,73],fix:['pow','mob','trk'],ovr:null,v:3},'Jacque Hilton':{s:[62,99,57,84,68,73],fix:['pow','mob','trk'],ovr:null,v:3}};
window.qbExact=function(n,ovr){const X=QBX26[n];if(!X)return null;const k=['acc','pow','awr','mob','sec','trk'],q={};k.forEach((x,i)=>q[x]=X.s[i]);
 const tgt=ovr!=null?ovr:(X.ovr!=null?X.ovr:Math.round(X.s.reduce((a,b)=>a+b,0)/6));let d=tgt*6-k.reduce((a,x)=>a+q[x],0);const free=k.filter(x=>!X.fix.includes(x));let g=0;
 while(d!==0&&g++<400){let moved=0;for(const x of free){if(d===0)break;if(d>0&&q[x]<99){q[x]++;d--;moved++}else if(d<0&&q[x]>25){q[x]--;d++;moved++}}if(!moved)break}
 g=0;while(d!==0&&g++<400){let moved=0;for(const x of X.fix){if(d===0)break;if(d>0&&q[x]<99){q[x]++;d--;moved++}else if(d<0&&q[x]>25){q[x]--;d++;moved++}}if(!moved)break}return q};
(()=>{try{const _s=qbShape;qbShape=function(n,ovr){if(QBX26[n])return qbExact(n,ovr);return _s.apply(this,arguments)}}catch(e){}})();
// Tyler 2026-11-16: "make sure whatever ratings you fix for me are adjusted to my overall ... The overall is the most important thing ... If I
// gave you a specific attribute to keep, then keep it ... pre-existing saves ... can keep their overalls". So: an existing career
// ALWAYS keeps the overall it has (his upgrades stay); only the pinned rating is exact. The list's overall is only for a brand-new start.
window.qbx26Apply=function(s,fresh){try{s=s||S;if(!s||!s.q)return 0;const n=s.tk||s.name;const X=QBX26[n];if(!X)return 0;s.qx26=s.qx26||{};if(s.qx26[n]===X.v+10)return 0;
 const cur=(()=>{const v=[s.q.acc,s.q.pow,s.q.awr,s.q.mob,s.q.sec,s.q.trk==null?s.q.sec:s.q.trk];return Math.round(v.reduce((a,b)=>a+b,0)/6)})();
 s.qx26pre=s.qx26pre||{};if(!s.qx26pre[n])s.qx26pre[n]={...s.q};
 const q=qbExact(n,fresh&&X.ovr!=null?X.ovr:cur);if(!q)return 0;s.q={...s.q,...q};s.qx26[n]=X.v+10;try{const L=s.ro&&s.ro['h.0'];if(L&&L[0]&&L[0].n===s.name)L[0].ovr=Math.round(Object.values(q).reduce((a,b)=>a+b,0)/6)}catch(e){}return 1}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)qbx26Apply(r)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _f=faqSign;window.faqSign=function(){const r=_f.apply(this,arguments);try{if(S&&qbx26Apply(S,1))save()}catch(e){}return r}}catch(e){}})();
(()=>{try{const _t=tkGo;tkGo=function(){const r=_t.apply(this,arguments);try{if(S&&qbx26Apply(S,1))save()}catch(e){}return r}}catch(e){}})();
// Shiesty +1 (new worlds), shown with the Nov 15 list
try{RUPD3D.push(['Joseph Shiesty',1]);const q=QBP.find(x=>x[0]==='Joseph Shiesty');if(q&&RUPD3&&!RUPD3.L.some(x=>x[0]==='Joseph Shiesty')){RUPD3.L.push(['Joseph Shiesty','QB',q[1],q[1]+1]);q[1]+=1}}catch(e){}
// the ratings page: every list there is, plus the exact-rating changes
(()=>{try{const _v=rupdV;rupdV=function(){const r=_v.apply(this,arguments);try{const bk=[...ui.querySelectorAll('button')].find(b=>(b.getAttribute('onclick')||'')==='hub()');const d=document.createElement('div');
 const k=['Accuracy','Throw power','Awareness','Speed','Carrying','Truck'],ks=['acc','pow','awr','mob','sec','trk'];
 d.innerHTML=`<div class=card><b>📈 Exact ratings · Nov 16, 2026</b><br><small>All saves. Overall is the average of the six. Your high ratings (★) stay exact; the low ones move to reach the overall.</small>${['Cameron Nugent','Johnny Football','Jacque Hilton III'].map(n=>{const X=QBX26[n],q=qbExact(n,X.ovr);const o=Math.round(Object.values(q).reduce((a,b)=>a+b,0)/6);return `<div class=row style="font-size:15px;align-items:flex-start;gap:6px"><span><b>${esc(n)}</b> <small>${o} OVR</small><br><small>${ks.map((x,i)=>(X.fix.includes(x)?'★':'')+k[i]+' '+q[x]).join(' · ')}</small></span></div>`}).join('')}</div>`;
 if(bk)bk.parentNode.insertBefore(d,bk);else(ui.firstElementChild||ui).appendChild(d)}catch(e){}return r}}catch(e){}})();
