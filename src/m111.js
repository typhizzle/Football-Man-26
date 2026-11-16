// ============ 🎯 swipe to throw: it follows your finger ============
// Tyler drew seven screenshots of how he actually swipes. Every line started at the ball
// and ENDED on the man he wanted. The old code never read that: it turned the gesture
// into a direction and a distance, then threw into open grass and hoped somebody was
// standing there. The release point is the instruction now.
//
// 1. Every eligible receiver gets a hit box on screen, sized to how big he looks from
//    where you are. Lift your finger inside one and he gets the ball.
// 2. Nobody under your finger? The line you drew is extended, and the receiver closest
//    to it (and out ahead of the swipe) gets it.
// 3. Still nobody? It falls through to the old behaviour and the ball lands where your
//    finger did.
// Your arm still decides how far it goes, and whether he holds on is still the catch
// contest between his hands and the defender's coverage.

// how big this man looks on screen, in pixels: his own height, a bit of margin
window.swHitR=function(w){try{
 const a=pj(w.x,w.y,0),b=pj(w.x,w.y,2.2);
 if(!a||!b)return 0;
 return cl(Math.abs(b[1]-a[1])*1.3,36,160);
}catch(e){return 0}};

// who did he point at?
window.swPick=function(rx,ry,ox,oy){try{
 const P=g.pl;if(!P||rx==null)return null;
 const q=P.qb;
 // a man behind the camera can project onto the screen in front of you, so only
 // receivers who are actually out in front are eligible to be pointed at
 const el=(P.wr||[]).filter(w=>w&&!w.out&&(!q||w.y>q.y-4));
 if(!el.length)return null;
 // 1 — under the finger
 let hit=null,bd=1e9;
 el.forEach(w=>{const s=pj(w.x,w.y,1.0);if(!s)return;
  const d=Math.hypot(s[0]-rx,s[1]-ry),R=swHitR(w);
  if(R>0&&d<R&&d<bd){bd=d;hit=w}});
 if(hit)return{w:hit,how:'box',off:bd};
 // 2 — on the line the finger drew
 const vx=rx-ox,vy=ry-oy,vl=Math.hypot(vx,vy);
 if(vl<20)return null;
 const ux=vx/vl,uy=vy/vl;
 let best=null,bs=1e9;
 el.forEach(w=>{const s=pj(w.x,w.y,1.0);if(!s)return;
  const ax=s[0]-ox,ay=s[1]-oy,along=ax*ux+ay*uy;
  if(along<vl*.45)return;                       // he has to be out ahead of the swipe
  const perp=Math.abs(ax*uy-ay*ux);
  if(Math.atan2(perp,along)>.40)return;         // and within about 23 degrees of it
  const sc=perp+Math.abs(along-vl)*.2;
  if(sc<bs){bs=sc;best=w}});
 return best?{w:best,how:'ray',off:bs}:null;
}catch(e){return null}};

(()=>{try{const _s=swThrow;
 window.swThrow=function(sx,sy,p,x0,y0,pts,rx,ry){
  try{
   const P=g.pl,q=P&&P.qb;
   if(!P||!q||P.air||P.car!==q||rx==null)return _s.apply(this,arguments);
   // where the ball sits on screen — the start of the line you drew
   let O=null;
   try{O=(CAMI==1&&!g.sw)?[W/2,H*.84]:(swBall()||pj(q.x,q.y,1.4))}catch(e){}
   if(!O)O=[x0,y0];
   const hit=swPick(rx,ry,O[0],O[1]);
   if(!hit)return _s.apply(this,arguments);
   const w=hit.w;

   // where he will be when it gets there
   const v=16+((S.q&&S.q.pow)||60)*.1;
   let T=Math.hypot(w.x-q.x,w.y-q.y)/v;
   for(let k=0;k<3;k++){T=Math.hypot(w.x+(w.vx||0)*T-q.x,w.y+(w.vy||0)*T-q.y)/v}
   let lx=w.x+(w.vx||0)*T,ly=w.y+(w.vy||0)*T;
   const dist=Math.hypot(lx-q.x,ly-q.y);

   // a flick is still a flick: a lazy swipe cannot carry a deep ball
   const M=Math.min(W,H),Ln=Math.hypot(rx-O[0],ry-O[1]);
   if(dist>19&&Ln<M*.24)return _s.apply(this,arguments);

   // and your arm is still your arm
   const Rg=thrR();
   if(dist>Rg){const f=Rg/dist;lx=q.x+(lx-q.x)*f;ly=q.y+(ly-q.y)*f}

   // accuracy shows up as scatter, never as picking someone else
   const aF=accF(),R_=(typeof R=='function')?R:Math.random;
   const sc=(1-aF)*cl(dist/34,.28,1.5)*(hit.how=='ray'?1.7:1)*1.15;
   lx=cl(lx+(R_()-.5)*sc*2,1.4,51.9);
   ly=ly+(R_()-.5)*sc*1.2;

   P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};
   doThrow(w,lx,ly);
   const A=P.air;if(A)A.hz=cl(1.05-Math.min(1,p)*.45,.55,1);
   return;
  }catch(e){}
  return _s.apply(this,arguments);
 }}catch(e){}})();
