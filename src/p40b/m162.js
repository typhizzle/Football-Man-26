// ===== 👕 CLOTHING: "Equip everywhere" up top · Halloween costumes off the fancy-event list =====
// Tyler, 2026-11-14: "Up here at the top where it says what you have equipped, you should have an equip everywhere
// button." + "I'm going to remove the Halloween suits from special events now, fancy events, just because Halloween
// event is over. So they can't wear their Halloween outfits to fancy events ... if they want to wear it to locker
// room or house or wherever else, that's fine." (He may change his mind later: it is one switch, HWEV.)
window.HWEV=false;   // Halloween costumes allowed at fancy events?
window.isHwId=function(id){return /^h[wx]\d/.test(String(id||''))};
(()=>{try{const _o=wrOpts;wrOpts=function(tab){const o=_o.apply(this,arguments);return tab==='ev'&&!HWEV?o.filter(x=>!isHwId(x[0])):o}}catch(e){}})();
(()=>{try{const _a=wrAll;wrAll=function(id){const ev=S&&S.wear&&S.wear.ev;const r=_a.apply(this,arguments);
 try{if(isHwId(id)&&!HWEV){S.wear.ev=isHwId(ev)?'cas':(ev||'cas');save();HM='🌐 Wearing it in the locker room and around town. (Halloween costumes aren\'t allowed at fancy events.)';wardV(WRT)}}catch(e){}return r}}catch(e){}})();
// a save still dressed in a costume for fancy events goes back to its regular clothes (the costume stays owned)
window.hwEvFix=function(s){try{if(!HWEV&&s&&s.wear&&isHwId(s.wear.ev)){s.wear.ev='cas';return 1}}catch(e){}return 0};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{hwEvFix(s)}catch(e){}return s}}catch(e){}})();
// the button up top, next to what's equipped
(()=>{try{const _w=wardV;wardV=function(){const r=_w.apply(this,arguments);try{const host=WRFROM=='walk'?ov:ui;const card=[...host.querySelectorAll('.card')].find(c=>/Equipped:/.test(c.textContent));const cur=S.wear&&S.wear[WRT];
 if(card&&cur&&!card.querySelector('[data-eqall]')){const b=document.createElement('button');b.className='g';b.setAttribute('data-eqall','1');b.style.marginTop='6px';b.textContent='🌐 Equip everywhere';b.setAttribute('onclick',`wrAll('${String(cur).replace(/'/g,'')}')`);card.appendChild(b)}}catch(e){}return r}}catch(e){}})();
