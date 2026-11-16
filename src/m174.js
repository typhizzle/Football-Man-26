// ===== 🔍 POTENTIAL: random once per save, hidden until someone spends time on the player =====
// Tyler, 2026-11-14: "if the coaches don't spend time into learning them ... they shouldn't even know the player's
// potential ... Or maybe it should be hidden to me too. I did say I want all potentials randomized, so it creates the most
// variety in these saves ... They can know potential if they spend time on the player. Just make sure potentials are
// random, always. Not each season, just randomize it at the beginning of the save, and that's their potential for that
// save throughout the career."
// - Potentials were already rolled from each save's own random seed (a new save = new potentials). Now they also stay
//   put: a player's potential is set once and doesn't shrink as he ages (the age slowdown still happens, but it lives in a
//   hidden growth limit instead of rewriting his potential).
// - YOU see "?" for a potential until you study the player: "🔍 Study his film" on his card (3 players a week). Draft
//   boards show "?🔍" you can tap. Once learned it stays learned for that save.
// - CPU coaches: every team has studied only some players (about 1 in 3 of a class, its own picks). For the rest it
//   drafts on its own guess, which can be off by up to 10 either way, so teams disagree and some reach or miss.
window.POTWK=3;
window.potKey=x=>String((x&&x.n)||'');
window.potKnown=function(x){try{return !!(S&&S.pkn&&S.pkn[potKey(x)])}catch(e){return false}};
window.potVis=function(x,tap){if(!x||x.pot==null)return '';if(potKnown(x))return String(x.pot);if(!tap)return '?';
 return `<a style="cursor:pointer;text-decoration:none" onclick="event.stopPropagation();potStudyN('${encodeURIComponent(potKey(x))}')">?🔍</a>`};
window.potLeft=function(){const k=wkKey();return Math.max(0,POTWK-(S.stu&&S.stu.k===k?S.stu.n:0))};   /* read-only: looking at a card never changes the save */
window.potLearn=function(name){if(!name)return 'none';S.pkn=S.pkn||{};if(S.pkn[name])return 'known';if(potLeft()<=0)return 'out';{const k=wkKey();if(!S.stu||S.stu.k!==k)S.stu={k,n:0}}S.stu.n++;S.pkn[name]=1;save();return 'ok'};
window.potMsg=function(r){return r==='out'?'🔍 You\'ve already studied '+POTWK+' players this week. More next week.':r==='ok'?'🔍 Film study done: you know his potential now.':''};
window.potStudy=function(i,j){const x=rost('h.'+i)[j];const r=potLearn(potKey(x));HM=potMsg(r);pCard(i,j)};
window.potStudyN=function(n){const r=potLearn(decodeURIComponent(n));const m=potMsg(r);try{if(m)alert(m)}catch(e){}try{if(typeof dhub=='function'&&S.stage=='draft')return dhub()}catch(e){}try{hub()}catch(e){}};
// the study button on a player's card
(()=>{try{const _p=pCard;pCard=function(i,j){const r=_p.apply(this,arguments);try{const x=rost('h.'+i)[j];if(!x||x.pot==null||potKnown(x)||(i==0&&j==0))return r;const host=ui.firstElementChild||ui;
 if(!host.querySelector('[data-potst]')){const b=document.createElement('button');b.className='g';b.setAttribute('data-potst','1');const n=potLeft();b.textContent=n?`🔍 Study his film (learn his potential) · ${n} left this week`:'🔍 Film study: no more this week';b.setAttribute('onclick',`potStudy(${i},${j})`);
  const p=host.querySelector('p small');const at=p&&p.closest('p');if(at)at.after(b);else host.appendChild(b)}}catch(e){}return r}}catch(e){}})();
// CPU coaches: known (studied) or their own guess
window.potH=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)};
window.potKnowAdj=function(team,p,w){try{if(!p||p.pot==null)return 0;const k=String(team)+'|'+potKey(p)+'|'+(S.seed||1);if(potH(k+'s')%100<34)return 0;const err=(potH(k+'e')%21)-10;return err*(w||.4)}catch(e){return 0}};
// potential stays put for the career (the age slowdown moves to a hidden growth limit, x.gcap)
(()=>{try{const _c=cpuDev;cpuDev=function(x,wins){if(!x)return _c.apply(this,arguments);if(x.pot0==null)x.pot0=x.pot;const P0=x.pot0;if(x.gcap!=null&&x.pot!=null)x.pot=Math.min(x.pot,x.gcap);
 const r=_c.apply(this,arguments);try{x.gcap=x.pot;x.pot=Math.max(P0==null?x.pot:P0,x.ovr||0);if(x.ovr>=100)x.pot=100;x.pot0=x.pot}catch(e){}return r}}catch(e){}})();
