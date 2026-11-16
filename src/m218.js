// ===== 📺 WATCHED DRIVES: NO MORE STUTTERING TACKLES =====
// Tyler, 2026-11-15/16: "whenever I'm watching drive and my team is trying to tackle. They'll kind of stutter and run in place whenever
// the tackle should probably be made ... very shaky and stuttery" / "Still a stuttering tackle glitch when watching drives".
// WHY: a watched play is already decided (how far it goes); one defender is steered to make the tackle at that spot. But the normal
// tackle check kept running too: every other defender who touched the carrier on the way "missed" a tackle, which stumbled the
// carrier and froze the defender, again and again (measured: the carrier was stumbling 70-90% of the time he had the ball).
// NOW: while watching, a defender who reaches the carrier before the planned spot glances off (no stumble, no freeze, he can't touch
// him again for a moment); the planned tackler makes the tackle at the spot, as before. Sacks and the QB are left to the script.
(()=>{try{const _h=hit;hit=function(d){try{const P=g.pl;if(g&&g.ph==='watch'&&P&&P.e){const c=P.car;if(!c||c===P.qb){d.cd=Math.max(d.cd||0,.8);return}
  if(d!==P.wTk&&!(P.endY!=null&&c.y>=P.endY-.6)){d.cd=1.4;d.stun=.45;const dx=d.x-c.x,dy=d.y-c.y,l=Math.hypot(dx,dy)||1;d.x+=dx/l*.8;d.y+=dy/l*.8-.3;c.stum=0;return}
  d.cd=Math.max(d.cd||0,.5);c.stum=0;return}}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
