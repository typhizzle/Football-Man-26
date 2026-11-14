// ===== 🏈 A CARD ONLY LISTS CLUBS A PLAYER REALLY PLAYED FOR =====
// Tyler, 2026-11-14: "we making sure Miles Garrett's not playing for the Chiefs when he never played for
// the Chiefs. You might want to make sure that doesn't happen to any other player ... Don't want that to
// happen again ever."
// Measured on his slot 4 (cloud copy, 2035): Meters Ferret's card read "KC, CLE, LAG" but every season he
// has is CLE (2022-25) and LAG (2026-34). Same for 8 more stars (Lamarcus Action "DEN", Daryl Henny "LV,
// MIA", Joseph Shiesty "IND", Ricky MaClones "MIA", Gene Smothers "IND, LA, LAG", Jack Mascott "HOU",
// Jack Goff "IND"). Cause: when a league is created the game makes up earlier clubs for every player
// (genHist), and the card printed that list (x.tm) instead of the seasons.
// Ferret's KC came from a made-up 2021 season row. Now the club list is worked out from what is RECORDED since 2022: every season row he has, every move in the
// transactions log, and the club he is on now. A made-up club is never shown. The stored list is not
// changed or deleted (nothing in the save is touched); it is only no longer trusted for display.

window.PLCUR={at:0,m:null};
window.plCurOf=function(x){try{if(!PLCUR.m||Date.now()-PLCUR.at>1500||PLCUR.s!==S){const m=new Map();
  if(S&&S.T)S.T.forEach((t,i)=>{try{(rost('h.'+i)||[]).forEach(y=>{if(y)m.set(y,i)})}catch(e){}});PLCUR={at:Date.now(),m,s:S}}
 const i=PLCUR.m.get(x);return i==null?null:i}catch(e){return null}};
window.plTxClubs=function(x){try{const out=new Set();(S.tx||[]).forEach(e=>{if(e&&e.n===x.n){if(e.from&&TA.includes(e.from))out.add(e.from);if(e.to&&TA.includes(e.to))out.add(e.to)}});return out}catch(e){return new Set()}};
window.plClubs=function(x,T){try{if(!x)return [];
 // seasons before the league's first real year (2022) were made up when the league was created (genHist): not proof
 const y0=(typeof uY0=='function'?uY0():2022);
 const rows=((typeof hxMerge=='function'?hxMerge(x):x.h)||[]).filter(r=>r&&r[0]!=null&&r[0]>=y0).slice().sort((a,b)=>a[0]-b[0]);
 const ok=[];const push=a=>{if(a&&ok[ok.length-1]!==a){const k=ok.indexOf(a);if(k>=0)ok.splice(k,1);ok.push(a)}};
 rows.forEach(r=>push(typeof r[1]=='number'?TA[r[1]]:r[1]));
 const tx=plTxClubs(x);
 // keep the stored order for clubs the log proves, so a traded man reads in the order he moved
 (x.tm||[]).forEach(a=>{if(tx.has(a)&&ok.indexOf(a)<0)ok.push(a)});
 let cur=null;if(T)cur=tAb(T);else{const i=plCurOf(x);if(i!=null&&S.T[i])cur=tAb(S.T[i])}
 if(cur)push(cur);
 return ok}catch(e){return (x&&x.tm)||[]}};
// how many listed clubs were dropped because nothing records them (for the gate and the audit)
window.plUnproven=function(x,T){const s=new Set(plClubs(x,T));return (x.tm||[]).filter(a=>!s.has(a))};
