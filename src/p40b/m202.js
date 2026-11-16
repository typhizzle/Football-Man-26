// ===== 🎯 THE SWIPE IS THE THROW; HELP ONLY AS GOOD AS YOUR QUARTERBACK =====
// Tyler, 2026-11-15: "I don't think the swipe should automatically go to the players anyways. They just should help if your
// quarterback has the ability to do it based on attributes ... sometimes it throws it deep when I'm trying to throw it short.
// It should be pretty obvious when I'm throwing it short too ... there's a few where it throws out of bounds where it shouldn't be."
// Rules (nothing else about the swipe changes):
//  1. Your finger ON a man = that man (your intent). Unchanged.
//  2. A man out along the line you drew only gets the ball if he is about as far as the swipe says. A short swipe is a short
//     throw: the ball lands where the swipe says instead of jumping to a deep man on that line. How far "about as far" stretches
//     depends on your QB's accuracy and awareness: a 60 gets about ±25-30% of the distance, a 95 gets about ±60-80%.
//  3. Out of bounds only when your finger clearly left the field (more than 2.5 yards past the sideline), never from the sideline
//     stripe itself.
window.SWI=null;
window.swHelp=function(){try{const q=S&&S.q||{};return cl((((q.acc||60)+(q.awr||60))/2-60)/35,0,1)}catch(e){return .3}};
window.swMeant=function(p,rx,ry){try{const P=g.pl,q=P&&P.qb;if(!q)return null;const Rg=thrR();let d=Math.max(5,typeof thrD=='function'?thrD(p):Math.min(1,p)*Rg);
 const G=(rx!=null&&typeof upj=='function')?upj(rx,ry):null;if(G){const rel=Math.hypot(G[0]-q.x,G[1]-q.y);if(rel>2)d=cl(Math.min(rel*.45+d*.55,d*1.5),5,Rg)}return d}catch(e){return null}};
(()=>{try{const _t=swThrow;window.swThrow=function(sx,sy,p,x0,y0,pts,rx,ry){SWI={d:swMeant(p,rx,ry),p};try{return _t.apply(this,arguments)}finally{SWI=null}}}catch(e){}})();
(()=>{try{const _p=swPick;window.swPick=function(rx,ry,ox,oy){const r=_p.apply(this,arguments);try{if(!r||!r.w||r.how==='box'||!SWI||!(SWI.d>0))return r;const P=g.pl,q=P&&P.qb;if(!q)return r;
 const h=swHelp(),D=SWI.d,dist=Math.hypot(r.w.x-q.x,r.w.y-q.y),lo=D*(.7-.3*h)-3,hi=D*(1.25+.55*h)+3;if(dist<lo||dist>hi)return null}catch(e){}return r}}catch(e){}})();
(()=>{try{const _a=swAway;window.swAway=function(rx,ry){const G=_a.apply(this,arguments);try{if(G&&G[0]>-2.5&&G[0]<56.3)return null}catch(e){}return G}}catch(e){}})();
