// ===== 🚪🏠 LOCKER ROOM + HOME RIGHT UNDER PLAY / SIM =====
// Tyler, 2026-11-14: "move [Enter the] locker room [and Walk around] your house at the top where you play your
// games or sim games in the same section ... put it under. Just make their icons blue because the play game
// icon will already be green". Both buttons move from lower in the player menu to just under Play game /
// Sim game, in blue. Same buttons, same actions.
window.lrMoveUp=function(){try{const root=ui&&ui.firstElementChild;if(!root)return;
 const B=[...root.querySelectorAll('button')];const anchor=B.find(b=>/simUser\(\)/.test(b.getAttribute('onclick')||''))||B.find(b=>/^play\(\)/.test(b.getAttribute('onclick')||''));
 const mv=B.filter(b=>/^(lroom|homeWalk)\(\)$/.test(b.getAttribute('onclick')||''));if(!anchor||!mv.length)return;
 let at=anchor;mv.forEach(b=>{b.classList.remove('g');b.style.background='#2f6fd6';b.style.color='#fff';b.setAttribute('data-blue','1');at.insertAdjacentElement('afterend',b);at=b})}catch(e){}};
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{if(S&&ui&&ui.style.display!='none')lrMoveUp()}catch(e){}return r}}catch(e){}})();
