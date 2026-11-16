// ===== 🎯 SWIPE: back to how it felt, plus throwaways and the flick to a nearby back =====
// Tyler, 2026-11-15: "I feel like Swipe to Throw actually just took a step back. The game I played last time, I felt like
// almost every throw went to where I was going ... I'm not asking for a switch up, I'm asking for a fix" + "I was running all
// the way to the left and I like swiped to the left as fast as I can ... I was trying to throw that away, but I ended up just
// throwing to a receiver ... I was obviously throwing it to the left and for whatever reason it threw it all the way to the
// right" + "The running back dump off fucked up on me on my 2-point conversions ... it's obvious I'm going to him".
// What I broke (m168, the "deep swipe never goes to the back" fix): when your finger let go above the horizon it picked the
// deepest man ANYWHERE, so a hard swipe left could go right; and it overrode picks that weren't backs at all.
//  1. The deep fix now only steps in when your finger let go ON the field 15+ yards out and the pick was a short man; it
//     can only switch to a deep man on that side (within 12 yards of where you aimed), never across the field. Everything else is the swipe you liked.
//  2. A flick in a man's direction that overshoots him (short dump-offs, the 2-point flick to the back) now goes to him: if
//     nobody is under your finger or out along the line, the man most in line with the swipe (within ~17°) gets it.
//  3. Throwaway: let go past the sideline and the ball goes out of bounds (incomplete), unless your finger is on a man.
window.swDeepFix=function(r,A,P){try{const q=P&&P.qb;if(!r||!A||!A.G||!q||A.d<15)return r;const back=w=>(w.y+(w.vy||0)*.8-q.y)<Math.min(A.d,40)*.45;if(!back(r.w))return r;
 const el=(P.wr||[]).filter(w=>w&&!w.out&&!back(w)&&Math.abs(w.x-A.G[0])<12);if(!el.length)return r;
 let best=null,bd=1e9;el.forEach(w=>{const d=Math.hypot(w.x-A.G[0],(w.y-A.G[1])*.6);if(d<bd){bd=d;best=w}});return best?{w:best,how:'deep',off:bd}:r}catch(e){return r}};
window.swOkT=function(w,L,q,ws){try{const dL=L[1]-q.y;if(dL<15)return true;const back=x=>(x.y-q.y)<Math.min(dL,40)*.45;if(!back(w))return true;return !ws.some(x=>x&&!x.out&&!back(x)&&Math.abs(x.x-L[0])<12)}catch(e){return true}};
// 2: the man most in line with the swipe, when nothing else claimed the throw
window.swDirPick=function(rx,ry,ox,oy){try{const P=g.pl,q=P&&P.qb;if(!P||!q)return null;const vx=rx-ox,vy=ry-oy,vl=Math.hypot(vx,vy);if(vl<25)return null;const ux=vx/vl,uy=vy/vl;
 let best=null,ba=1e9;(P.wr||[]).filter(w=>w&&!w.out&&w.y>q.y-4).forEach(w=>{const s=pj(w.x,w.y,1.0);if(!s||!swOnScr(s))return;const ax=s[0]-ox,ay=s[1]-oy,al=ax*ux+ay*uy;if(al<8)return;const an=Math.atan2(Math.abs(ax*uy-ay*ux),al);if(an<=.30&&an<ba){ba=an;best=w}});
 return best?{w:best,how:'dir',off:ba}:null}catch(e){return null}};
// the swipe pick, in order: (1) the man under your finger, (2) the man out along the line you drew, (3) the man most in
// line with the flick. Rules 1-2 are the m111 swipe Tyler liked, unchanged, except that a man who is OFF your screen can't
// be picked by the line (Tyler: "I could only see the running back on my screen").
window.swOnScr=s=>!!s&&s[0]>=-12&&s[0]<=W+12&&s[1]>=-12&&s[1]<=H+12;
window.swPickCore=function(rx,ry,ox,oy){try{const P=g.pl;if(!P||rx==null)return null;const q=P.qb;const el=(P.wr||[]).filter(w=>w&&!w.out&&(!q||w.y>q.y-4));if(!el.length)return null;
 let hit=null,bd=1e9;el.forEach(w=>{const s=pj(w.x,w.y,1.0);if(!s)return;const d=Math.hypot(s[0]-rx,s[1]-ry),R_=swHitR(w);if(R_>0&&d<R_&&d<bd){bd=d;hit=w}});if(hit)return{w:hit,how:'box',off:bd};
 const vx=rx-ox,vy=ry-oy,vl=Math.hypot(vx,vy);if(vl<20)return null;const ux=vx/vl,uy=vy/vl;let best=null,bs=1e9;
 el.forEach(w=>{const s=pj(w.x,w.y,1.0);if(!s||!swOnScr(s))return;const ax=s[0]-ox,ay=s[1]-oy,along=ax*ux+ay*uy;if(along<vl*.45)return;const perp=Math.abs(ax*uy-ay*ux);if(Math.atan2(perp,along)>.40)return;const sc=perp+Math.abs(along-vl)*.2;if(sc<bs){bs=sc;best=w}});
 return best?{w:best,how:'ray',off:bs}:null}catch(e){return null}};
window.swPick=function(rx,ry,ox,oy){let r=swPickCore(rx,ry,ox,oy);try{r=swDeepFix(r,swAimD(rx,ry),g.pl)}catch(e){}if(r)return r;return swDirPick(rx,ry,ox,oy)};
// 3: throwaway
window.swAway=function(rx,ry){try{const P=g.pl,q=P&&P.qb;if(!P||!q||rx==null||typeof cm=='undefined'||!cm)return null;const G=upj(rx,ry);if(!G)return null;if(G[0]>-0.5&&G[0]<53.8)return null;return G}catch(e){return null}};
(()=>{try{const _s=swThrow;swThrow=function(sx,sy,p,x0,y0,pts,rx,ry){try{const P=g.pl,q=P&&P.qb;
 if(P&&q&&!P.air&&P.car===q&&rx!=null){const G=swAway(rx,ry);if(G){let box=null;try{let O=(CAMI==1&&!g.sw)?[W/2,H*.84]:(swBall()||pj(q.x,q.y,1.4));const h=O&&_pBox(rx,ry,O);box=h}catch(e){}
  if(!box){const w=(P.wr||[]).filter(x=>x&&!x.out).sort((a,b)=>Math.abs(a.x-G[0])-Math.abs(b.x-G[0]))[0];if(w){const ly=Math.min(G[1],q.y+thrR()*.8);P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};doThrow(w,G[0]<0?-3:56.5,ly);return}}}}}catch(e){}
 return _s.apply(this,arguments)}}catch(e){}})();
// "under the finger" only (the first rule of swPick): a man right where you let go always wins over a throwaway
window._pBox=function(rx,ry){try{const P=g.pl,q=P.qb;let hit=null,bd=1e9;(P.wr||[]).filter(w=>w&&!w.out&&(!q||w.y>q.y-4)).forEach(w=>{const s=pj(w.x,w.y,1.0);if(!s)return;const d=Math.hypot(s[0]-rx,s[1]-ry),R_=swHitR(w);if(R_>0&&d<R_&&d<bd){bd=d;hit=w}});return hit}catch(e){return null}};
