// ===================== 📣 top-of-screen notifications + HS scholarship offers up top =====================
function topNote(msg,act){try{let d=document.getElementById('tnote');if(!d){d=document.createElement('div');d.id='tnote';d.style.cssText='position:fixed;left:8px;right:8px;top:calc(8px + env(safe-area-inset-top));z-index:9999;background:#14233f;color:#fff;border:2px solid #ffe93b;border-radius:14px;padding:12px 40px 12px 14px;font:600 16px system-ui;box-shadow:0 6px 24px #0008;transition:transform .3s;transform:translateY(-140%);cursor:pointer';document.body.appendChild(d)}
 d.innerHTML=msg+'<span style="position:absolute;right:12px;top:8px;font-size:22px" onclick="event.stopPropagation();tnHide()">✕</span>';d.onclick=()=>{tnHide();try{if(act)(typeof act=='function'?act:new Function(act))()}catch(e){}};
 requestAnimationFrame(()=>d.style.transform='translateY(0)');clearTimeout(topNote._t);topNote._t=setTimeout(tnHide,5500)}catch(e){}}
function tnHide(){const d=document.getElementById('tnote');if(d)d.style.transform='translateY(-140%)'}
(()=>{const _a=addOffers;addOffers=function(force){const got=_a.apply(this,arguments);try{if(!force&&got&&got.length&&(S.stage||'hs')=='hs'){const top=got.slice().sort((a,b)=>b.ovr-a.ovr)[0];S.offNew=(S.offNew||0)+got.length;
 topNote(`🏈 ${got.length==1?'New scholarship offer':got.length+' new scholarship offers'}: <b>${esc(top.n)}</b>${got.length>1?' and '+(got.length-1)+' more':''}. Tap to view.`,'offers()')}}catch(e){}return got}})();
(()=>{const _o=offers;offers=function(){try{S.offNew=0}catch(e){}return _o.apply(this,arguments)}})();
// the recruiting card: count, best offers, and the newest messages, right under the play button
function offTop(){try{if(S.stage=='col'||S.stage=='pro')return '';fixOff();const L=(S.off||[]).slice().sort((a,b)=>b.ovr-a.ovr);
 if(!L.length)return `<div class=card style="border-color:#ffe93b"><b>🎓 Scholarship offers: 0</b><br><small>No offers yet. Coaches are watching your games; offers usually start in year 2.</small><button class=g onclick=colList()>College programs</button></div>`;
 return `<div class=card style="border-color:#ffe93b"><b>🎓 Scholarship offers: ${L.length}</b>${S.offNew?' <span class=gnew>'+S.offNew+' NEW</span>':''}<br><small>prospect rank #${prospectRank()}${S.commit?' · committed to '+esc(S.commit):''}${S.dream?' · dream: '+esc(S.dream):''}</small>`+
  L.slice(0,3).map(o=>`<div class=row style="font-size:16px"><span>${S.commit==o.n?'✔ ':''}${esc(o.n)} <small>${esc(o.conf||'')}</small></span><b>${o.ovr}</b></div>`).join('')+
  `<button onclick=offers()>View all ${L.length} offers, pay & rosters</button><button class=g onclick=colList()>College programs</button></div>`}catch(e){return ''}}
