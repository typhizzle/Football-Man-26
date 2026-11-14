// ===== ⏱ A WATCHED DRIVE RUNS THE SAME CLOCK, PLAY BY PLAY, AS THE SIMULATED ONE =====
// Tyler, 2026-11-14: "Make sure when you're simming drives that they take just as long as if you would watch them.
// Make sure the clock moves the same on each play." Simulating and watching a drive already used the same total time
// (both come from one simDrive result), but a WATCHED drive split that time into equal slices per play, so a 3-second
// incompletion and a 40-second run took the same time on screen. Each play now remembers how much clock it used in
// the simulation, and the watched drive runs exactly that, play by play. (Opponent drives already use your own pace
// from the plays you run yourself.)
window.wClk=function(i){try{const L=W_.pl,end=g.r&&g.r.sec!=null?g.r.sec:0;if(!L.length||!L.every(e=>e.s!=null))return W_.c0+W_.dc*(i/Math.max(1,L.length));
 const r0=W_.dc+end,sAt=i<=0?r0:Math.max(end,L[Math.min(i,L.length)-1].s);return W_.c0+(r0-sAt)}catch(e){return W_.c0+W_.dc*(i/Math.max(1,W_.pl.length))}};
