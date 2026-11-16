// ===== 🏈 FUMBLES FOLLOW CARRYING =====
// Tyler, 2026-11-14: "if your carrying is in the 60s ... it would make sense if you just fumbled every three or four
// games or so ... 99 carrying means you almost never fumble, but it is possible, so adjust all ratings accordingly".
// Per hit on the ball carrier (you or a back): 0.03 x ((100 - carrying) / 35) ^ 1.6, a little more on sacks and big
// hitters. With ~10 hits a game: carrying 65 ~ one fumble every 3-4 games, 80 ~ every 8, 90 ~ every 25, 99 ~ every
// 1,000 games. Simmed games use the same chance over the same number of hits (they were a flat 12-15% a game).
window.fumHit=function(sec){return .03*Math.pow(Math.max(.4,100-(sec||60))/35,1.6)};
window.simFum=function(){try{const p=1-Math.pow(1-fumHit(S.q.sec),10);return R()<p?1:0}catch(e){return 0}};
