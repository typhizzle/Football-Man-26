// ===== 🎯 LOB · TOUCH · BULLET RATINGS =====
// Tyler 2026-11-16: "every meter has gotta be different ... start making a bullet pass rating, lob pass rating, and touch pass rating,
// and obviously the higher the rating, the bigger the meter and window is for it ... judge that off of their throwing attributes ...
// Cam ... 66 lob ... 62 for his bullets and 52 for his touch ... you can make an attribute that you upgrade as well" / "there should be
// some black space that makes it inaccurate. Everyone should have at least a little bit of black space".
// Kept apart from the six ratings that make the overall (S.qp), so no overall changes. Start values come from throwing (accuracy,
// power, awareness), shaped so Cam lands on Tyler's 66/52/62; Tyler's named QBs use his exact numbers. Upgrade with training points.
// On the meter, each pass's colored window is its rating; the rest of that section is black (off target); a 99 still has black.
window.PTN={'Cameron Nugent':{lob:66,tch:52,blt:62},'Ricky MaClones':{lob:97,tch:99,blt:97},'Jarsh Fallon':{lob:98,tch:99,blt:97}};
window.ptBase=function(q){q=q||{};const a=q.acc||60,p=q.pow||60,w=q.awr||60;const c=v=>Math.max(30,Math.min(99,Math.round(v)));
 return {lob:c(.4*p+.35*a+.25*w-6),tch:c(.6*a+.4*w-13),blt:c(.5*p+.4*a+.1*w-12)}};
window.ptGet=function(){try{if(!S)return {lob:60,tch:60,blt:60};if(!S.qp){S.qp=PTN[S.name]?{...PTN[S.name]}:ptBase(S.q)}return S.qp}catch(e){return {lob:60,tch:60,blt:60}}};
window.ptWin=function(kind){const k={lob:'lob',touch:'tch',bullet:'blt'}[kind]||'tch',r=ptGet()[k]||60;return Math.max(.1,Math.min(.8,.1+(r-40)*.0118))};   // 99 -> .80 (20% black), 52 -> .24
window.ptUp=function(k){try{const P=ptGet();if(S.pts>=2&&P[k]<99){S.pts-=2;P[k]++;save();hub()}}catch(e){}};
window.ptCard=function(){try{if(!S||!(S.stage==='pro'||S.stage==='col'||S.stage==='hs'))return '';const P=ptGet(),N={lob:'🟢 Lob pass',tch:'🔵 Touch pass',blt:'🟣 Bullet pass'};
 return `<div class=card data-pt=1><b>🎯 Pass types</b> <small>(bigger = bigger target on the controller meter; not part of your overall)</small>${Object.keys(N).map(k=>`<div class=row><span>${N[k]}</span><b>${P[k]}</b>${P[k]>=99?'<small>MAX</small>':`<button class=g onclick="ptUp('${k}')">+1 (2 pts)</button>`}</div>`).join('')}</div>`}catch(e){return ''}};
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{if(typeof ui!='undefined'&&ui&&!ui.querySelector('[data-pt]')&&S&&(S.stage==='pro'||S.stage==='col'||S.stage==='hs')){const cards=[...ui.querySelectorAll('.card')];const tc=cards.find(c=>/Training points/.test(c.textContent));if(tc)tc.insertAdjacentHTML('afterend',ptCard())}}catch(e){}return r}}catch(e){}})();
