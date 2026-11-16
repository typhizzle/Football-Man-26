// ===== 📈 RATINGS UPDATES REACH EVERY SAVE =====
// Tyler, 2026-11-16: "None of my other player ratings that I gave you have been updated ... Kirko Chainz ... Jack Mascott. Where are
// all those at? ... You can give Femmifer Allen a +1 on your own, as well as No Pix. I also told you to lower Drako ... Joseph Shiesty +1."
// The Nov 15 list was only built into new save files. Now every rating update is applied to every existing save as well, once per
// save and per change (marked in the save, so it never repeats), and new saves get it from the start.
window.RUPD4=[['Femmifer Allen',1],['No Pix',1],['DaSettlement Won',1]];   // DaSettlement Won: Tyler 2026-11-16 "Mr. Settlement one should be +1"
try{RUPD4.forEach(([n,d])=>{if(!RUPD3||RUPD3.L.some(x=>x[0]===n))return;let o=null,pos='';const q=PKS.find(x=>x[2]===n);if(q){o=q[3];q[3]+=d;pos=POSL[q[1]]||''}else{const p=QBP.find(x=>x[0]===n);if(p){o=p[1];p[1]+=d;pos='QB'}else{const b_=QBB.find(x=>x[0]===n);if(b_){o=b_[1];b_[1]+=d;pos='QB'}}}
 if(o!=null){RUPD3.L.push([n,pos,o,o+d]);RUPD3D.push([n,d])}});if(RUPD3)RUPD3.d='Nov 16, 2026'}catch(e){}
window.RUPDALL=function(){return (RUPD3D||[]).concat(RUPD4.filter(e=>!(RUPD3D||[]).some(x=>x[0]===e[0])))};
// a save made by this build already has the changes in its players: mark them done
(()=>{try{const _p=proStart;proStart=function(){const r=_p.apply(this,arguments);try{if(S&&!S.rupdA){S.rupdA={};RUPDALL().forEach(([n,d])=>S.rupdA[n+'|'+d]=1)}}catch(e){}return r}}catch(e){}})();
window.rupdApply=function(s){try{if(!s||!s.ro)return 0;s.rupdA=s.rupdA||{};let n=0;RUPDALL().forEach(([nm,d])=>{const key=nm+'|'+d;if(s.rupdA[key])return;let hit=0;
  for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(x&&x.n===nm&&x.n!==s.name&&typeof x.ovr==='number'){x.ovr=Math.max(40,Math.min(99,x.ovr+d));if(x.pk!=null)x.pk=Math.max(x.pk,x.ovr);hit++}})}
  if(hit||s.stage==='pro'){s.rupdA[key]=1;n+=hit}});return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r&&r.stage==='pro')rupdApply(r)}catch(e){}return r}}catch(e){}})();
// Tyler, 2026-11-16: "remember to put that icon whether they went up or down. put it all in one ratings update ... they're one rating
// update together". One card with every change (Oct 24, Oct 30, Nov 15-16), each with ▲ / ▼.
window.rupdAll=function(){const out=[],seen=new Set();const add=x=>{if(!x||seen.has(x[0]))return;seen.add(x[0]);out.push(x)};
 try{(RUPD3&&RUPD3.L||[]).forEach(add)}catch(e){}try{(RUPD2&&RUPD2.L||[]).forEach(add)}catch(e){}try{(RUPD||[]).forEach(u=>u.L.forEach(add))}catch(e){}return out};
(()=>{try{const _v=rupdV;rupdV=function(){const r=_v.apply(this,arguments);try{const L=rupdAll();
 // the separate update cards (Oct 24, Oct 30, Nov 15) and the old "new save files only" note become ONE card
 [...ui.querySelectorAll('.card')].forEach(c=>{const b=c.querySelector('b'),t=(b?b.textContent:'')+'|'+c.textContent.slice(0,90);if(/Ratings update · (Oct|Nov)|^Oct \d+, 2026|Updates apply to new save files only/.test(t)&&!/throwing power|Exact ratings/i.test(t))c.remove()});
 const h=`<div class=card data-rupd1=1><b>📈 Ratings update · Oct 24 · Oct 30 · Nov 15–16, 2026</b><br><small>The Nov 15–16 changes are in every save (applied once). The Oct 24 and Oct 30 changes are in every save started after those dates.</small>${L.map(x=>{const df=x[3]-x[2];return `<div class=row style="font-size:16px"><span>${esc(x[0])} <small>${x[1]}</small></span><span>${x[2]} → <b>${x[3]}</b> <b style="color:${df>0?'#7bed9f':'#ff6b6b'}">${df>0?'▲ +':'▼ '}${df}</b></span></div>`}).join('')}</div>`;
 const h2=ui.querySelector('h2');if(h2)h2.insertAdjacentHTML('afterend',h);else (ui.firstElementChild||ui).insertAdjacentHTML('afterbegin',h);const bk=[...ui.querySelectorAll('button')].find(x=>/^Back$/.test(x.textContent.trim()));if(bk&&bk.parentNode)bk.parentNode.appendChild(bk)}catch(e){}return r};window.rupdV=rupdV}catch(e){}})();

// Tyler, 2026-11-16: "you don't need to display their arm strength whenever you're picking a Pro QB ... unnecessary to show one
// attribute" / "if it's an update already applied, just go ahead and leave the symbol anyways". The picker shows the ratings arrow
// (▲ / ▼) for anyone on the ratings update, nothing else.
rupdTag=function(n){try{const x=rupdAll().find(y=>y[0]===n);if(!x)return '';const d=x[3]-x[2];return ` <b style="color:${d>0?'#7bed9f':'#ff6b6b'}">${d>0?'▲ +':'▼ '}${d}</b>`}catch(e){return ''}};
