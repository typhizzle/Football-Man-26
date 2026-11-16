// ===== 🤝 ENDORSEMENT OFFERS COME ONE AT A TIME, A FEW A SEASON =====
// Tyler, 2026-11-15: "Instead of popping up all the endorsements at once, I think they should just show up week by week, and I
// don't think it's as many as you should that you are showing, maybe just a couple of those a year."
// The sponsorship meter now means offers per SEASON: Very few 1 · Fewer than average 2 · Average 3 · More than average 5 · As many
// as possible 7. They arrive one at a time (week 1, then every third week in the pros, every other week in college). Goaty's is
// still first. Brand-event invites and celebrity offers are not changed.
try{SPLV[0].offers=1;SPLV[1].offers=2;SPLV[2].offers=3;SPLV[3].offers=5;SPLV[4].offers=7}catch(e){}
(()=>{try{const _e=spEns;spEns=function(){const O=_e.apply(this,arguments);try{if(!O||!Array.isArray(O.L)||O.k==='off'||!O.k)return O;
 if(!O.all||O.allK!==O.k){const gap=S.stage==='pro'?3:2;let n=0;const g0=O.L.find(o=>o.id==='goat_ap');O.all=[...(g0?[g0]:[]),...O.L.filter(o=>o!==g0)].map(o=>{if(o.cat==='event'||o.cat==='celeb')return o;o.wk=1+(n++)*gap;return o});O.allK=O.k}
 const wk=(S.wk||0)+1;O.L=O.all.filter(o=>o.t||o.cat==='event'||o.cat==='celeb'||(o.wk||1)<=wk)}catch(e){}return O}}catch(e){}})();
(()=>{try{const _v=spV;spV=function(){const r=_v.apply(this,arguments);try{const O=spEns(),later=(O.all||[]).filter(o=>!O.L.includes(o)).length;const c=[...ui.querySelectorAll('.card')].find(x=>/Offers this season/.test(x.textContent));if(c){const s=document.createElement('small');s.innerHTML='<br>Offers come one at a time during the season'+(later?': '+later+' more may still come.':'.');c.appendChild(s)}}catch(e){}return r}}catch(e){}})();
