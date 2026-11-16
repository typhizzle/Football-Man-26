// ===== ▶ RESUME RIGHT WHERE YOU LEFT =====
// Tyler, 2026-11-16: "when you leave, sometimes it doesn't leave on the player on. sometimes it'll give them the ball, even though you
// were on like a second down ... it should resume game on whatever play you were on and it shouldn't restart drives".
// WHY: the game's resume point was only written after one of your plays finished (and not when a play ended a quarter). After the
// other team's drive, or after a quarter change, it still said "their ball" at the old spot, so leaving then gave them the ball
// back and re-rolled their drive. NOW: the resume point is written every time you line up to call a play (your ball, this down,
// this spot, this clock), and when the other team gets the ball their drive is kept, so a resume shows that same drive, never a
// new one.
(()=>{try{const _p=pre;pre=function(){const r=_p.apply(this,arguments);try{if(g&&g.ph==='pre'&&!g.watch&&S){gsnap();save()}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _o=oppBall;oppBall=function(){const r=_o.apply(this,arguments);try{if(g&&g.ph==='opp'&&g.r&&S&&S.gsave&&S.gsave.opp){S.gsave.r=g.r;save()}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _d=simDrive;simDrive=function(){if(window._rsR){const r=window._rsR;window._rsR=null;return r}return _d.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _r=resumeG;resumeG=function(){try{const s=S&&S.gsave;window._rsR=s&&s.opp&&s.r?s.r:null}catch(e){}try{return _r.apply(this,arguments)}finally{window._rsR=null}}}catch(e){}})();
// ===== 🏈 SWIPE AT 70-75% =====
// Tyler, 2026-11-16: "60 was a bit low, I would say it's about 70 to 75% where I like it on swipe to throw". Measured on his save,
// 600 swipes at every receiver: 65-68% complete before; 137 of 168 misses were pass breakups. A contested catch (defender within
// 1.7 yds) is now a bit more often caught: 72-76% complete, picks unchanged (12-27 per 600). Test swp1 keeps it in 68-79%.
window.CTC={r:1.7,b:.75};
