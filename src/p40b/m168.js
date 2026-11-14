// ===== 🎯 SWIPE: a deep swipe never dumps it to the running back =====
// Tyler, 2026-11-14: "I did throw an interception earlier when I was aiming for the end zone and it threw it to my
// running back instead." Two ways a deep swipe could end up on a short man: (1) the "line you drew" pick took the man
// closest to the line, and a back sitting on that line short of the target beat the deep receiver; (2) with nobody
// near the line, the old fallback handed the ball to whoever was nearest the landing spot, however far away.
// Now: where your finger let go is read as a spot on the field. If that spot is 15+ yards downfield (or above the
// horizon = as deep as you can throw), only receivers at least ~half that deep can be picked; the one nearest the spot
// wins. If nobody at all is that deep, it works as before. Short swipes work exactly as before.
window.swAimD=function(rx,ry){try{const q=g.pl&&g.pl.qb;if(!q)return null;if(typeof cm=='undefined'||!cm)return null;const G=upj(rx,ry);if(!G||!isFinite(G[1]))return {d:99,G:null};return {d:G[1]-q.y,G}}catch(e){return null}};
// r = what the normal pick chose, A = how deep you aimed (swAimD), P = the play
window.swDeepFix=function(r,A,P){try{const q=P&&P.qb;if(!A||!q||A.d<15)return r;
 const deep=w=>(w.y+(w.vy||0)*.8-q.y)>=Math.min(A.d,40)*.45;
 if(r&&deep(r.w))return r;
 const el=(P.wr||[]).filter(w=>w&&!w.out&&deep(w));if(!el.length)return r;
 let best=null,bd=1e9;el.forEach(w=>{const tx=A.G?A.G[0]:w.x,ty=A.G?A.G[1]:q.y+60,d=Math.hypot(w.x-tx,(w.y-ty)*.6);if(d<bd){bd=d;best=w}});
 return best?{w:best,how:'deep',off:bd}:r}catch(e){return r}};
(()=>{try{const _p=swPick;window.swPick=function(rx,ry,ox,oy){const r=_p.apply(this,arguments);try{return swDeepFix(r,swAimD(rx,ry),g.pl)}catch(e){return r}}}catch(e){}})();
// the old fallback (nearest man to where the ball lands): on a deep ball, a man in the backfield can't be the target
window.swOkT=function(w,L,q,ws){try{const dL=L[1]-q.y;if(dL<15)return true;const deep=x=>(x.y-q.y)>=Math.min(dL,40)*.45;if(!ws.some(x=>x&&!x.out&&deep(x)))return true;return deep(w)}catch(e){return true}};
