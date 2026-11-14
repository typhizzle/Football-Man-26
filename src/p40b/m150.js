// ===== 📺 EVERY DRAFT, WATCHABLE — AND LIVE WHEN IT HAPPENS =====
// Tyler, 2026-11-14: "if you can watch the first two, you should be able to watch all of them, right? Should
// show all of them ... should be able to watch any of the drafts happen live, not just the later."
// The draft list only offered the future boards (S.npb). Every draft the league has actually held (S.dc, one
// per pro offseason) is now listed too and can be watched from its real picks; and when the offseason draft
// happens, the player menu offers it live (watch it right then, or later from the list).
window.drYears=function(){const y=new Set([...Object.keys(S.npb||{}),...Object.keys(S.dc||{}).filter(k=>S.dc[k]&&S.dc[k].done)]);return [...y].map(Number).sort((a,b)=>a-b)};
(()=>{try{const _r=npbRows;npbRows=function(yr){try{const dc=S.dc&&S.dc[yr];if(dc&&Array.isArray(dc.picks)&&dc.picks.length){
  return dc.picks.slice().sort((a,b)=>a.p-b.p).map(p=>({pk:p.p,ti:Math.max(0,TA.indexOf(p.tm)),n:p.n,pos:p.pos,s:p.col||'',me:p.n===S.name?1:0}))}}catch(e){}
 return _r.apply(this,arguments)}}catch(e){}})();
window.drBtns=function(){try{return drYears().map(y=>`<button onclick="drWatch(${y})">📺 Watch the ${y} draft${S.dcLive===y&&!(S.dcSeen||{})[y]?' (LIVE)':''}</button><button class=g onclick="npbV(${y},1)">📋 ${y} draft: all 7 rounds (224 picks)</button>`).join('')}catch(e){return ''}};
window.drWatch=function(y){S.dcSeen=S.dcSeen||{};S.dcSeen[y]=1;try{save()}catch(e){}return dnWatch(y)};
(()=>{try{const _d=lgDraft;lgDraft=function(){const Y=yrN(),had=!!(S.dc&&S.dc[Y]&&S.dc[Y].done);const r=_d.apply(this,arguments);try{if(!had&&S.dc&&S.dc[Y]&&S.dc[Y].done){S.dcLive=Y}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{const Y=S&&S.dcLive;if(Y&&!(S.dcSeen||{})[Y]&&S.stage=='pro'&&ui.style.display!='none'){const d=ui.firstElementChild;if(d&&!d.querySelector('[data-drlive]')){const c=document.createElement('div');c.className='card';c.setAttribute('data-drlive','1');
 c.innerHTML=`<b>📺 The ${Y} PFL Draft is on now</b><br><small>Every pick, live from the stage.</small><button onclick="drWatch(${Y})">Watch it live</button><button class=g onclick="S.dcSeen=S.dcSeen||{};S.dcSeen[${Y}]=1;save();hub()">Not now (it stays in the draft list)</button>`;
 const h2=d.querySelector('h2');if(h2&&h2.nextSibling)d.insertBefore(c,h2.nextSibling);else d.prepend(c)}}}catch(e){}return r}}catch(e){}})();
