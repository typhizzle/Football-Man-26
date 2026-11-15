// ===== 🪪 MADE-UP PLAYERS NEVER GET THE NAME OF ONE OF TYLER'S PLAYERS (2026-11-15 audit) =====
// The audit of every roster found made-up high school / college players who had been randomly given the exact names of Tyler's stars
// (a 75 OVR left tackle at Burger King University named Christopher McCunngingham, a center named Kyle Chriss...). They are different
// people, but it looks like your RB is playing tackle. From now on a made-up player never gets a name on Tyler's lists.
// (Players already made keep their names: names only change when Tyler says so.)
window.MYNAMES=null;window.myNames=function(){if(MYNAMES)return MYNAMES;const s=new Set();try{(PKS||[]).forEach(q=>s.add(q[2]))}catch(e){}try{(QBB||[]).forEach(b=>s.add(b[0]))}catch(e){}try{(QBP||[]).forEach(q=>s.add(q[0]))}catch(e){}
 try{(ADD26||[]).forEach(e=>s.add(e[2]))}catch(e){}try{(FA26||[]).forEach(e=>s.add(e.n||e[0]))}catch(e){}try{Object.keys(PKC||{}).forEach(n=>s.add(n))}catch(e){}return MYNAMES=s};
(()=>{try{const _u=uNm;uNm=function(r){let n=_u.apply(this,arguments),k=0;try{const M=myNames();while(M.has(n)&&k++<25)n=_u.apply(this,arguments)}catch(e){}return n}}catch(e){}})();
