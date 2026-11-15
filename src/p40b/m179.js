// ===== 🏈 FUMBLES: rare, the way they are in real games =====
// Tyler, 2026-11-15: "I feel like I'm seeing too many fumbles. They don't fumble every game ... quarterbacks with good
// carrying don't usually fumble more than 3 or 4 times a year ... compare that to mid carrying and below average
// carrying. Definitely should not be a once a game thing."
// Why it happened: the fumble chance (m165) is rolled on EVERY tackle of whoever has the ball. I had sized it for a QB's
// ~10 hits a game, but backs and receivers are tackled ~40 times a game, so the team fumbled about once a game.
// Now the chance per tackle depends on who has the ball:
//   your QB (carrying):   2% x ((100 - carrying) / 35)^1.6 per tackle (x1.5 on a sack), ~7 tackles a game
//                         -> carrying 99: almost never · 90: ~0.5 a season · 80: ~1.5 · 65: ~3 · 50: ~5
//   backs / receivers (hands): 0.6% x ((100 - hands) / 35)^1.6 per tackle -> the whole group ~1 fumble every 4 games
// Simulated games use the QB numbers. Recovery, returns and everything after a fumble are unchanged.
window.FUMQB=0;
fumHit=function(sec){const base=window.FUMQB?.02:.006;return base*Math.pow(Math.max(.4,100-(sec||60))/35,1.6)};
(()=>{try{const _h=hit;hit=function(d){try{window.FUMQB=!!(g&&g.pl&&g.pl.car&&g.pl.car===g.pl.qb)}catch(e){}try{return _h.apply(this,arguments)}finally{window.FUMQB=0}}}catch(e){}})();
simFum=function(){try{window.FUMQB=1;const p=1-Math.pow(1-fumHit(S.q.sec)*1.15,7);return R()<p?1:0}catch(e){return 0}finally{window.FUMQB=0}};
