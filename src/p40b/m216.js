// ===== 🛡 NOBODY RUNS FREE: AN IDLE DEFENDER PICKS UP THE OPEN MAN =====
// Tyler, 2026-11-16: "DBs come off WRs sometimes, they should at least try to guard them, otherwise I'm getting an open pass
// everytime. But obviously still create separation so passes can be completed, football logic".
// In zone, a defender whose area is empty used to stand on his spot while a receiver ran free past him (now more often, since
// routes run all the way to the sideline). Now an idle zone defender takes the nearest receiver nobody is guarding (within 20 yds)
// and trails him: a step behind, closing at a speed set by his coverage against the receiver's route running, so good routes
// still get open and passes are still completed.
// Tyler 2026-11-16 (later): "Swipe to throw is oddly downgraded again ... I had it like 91%". Measured on his Simmons save, 600 identical
// swipes per version: the 91% version 69-71% complete / 20-22 picks; after this module and the curl change 62-65% / 29-30 picks
// (the picked-up defender sat in FRONT of the receiver, in the throwing lane). Now he trails a step BEHIND and reacts a beat later
// (still guards him), and receivers run their routes the way they did in the 91% version (ROLD): 69-71% / 16-21 picks again.
// Test swp1 holds this in every update.
// Tyler 2026-11-16 (later): "DBs are still leaving receivers wide open when they go deep. They're supposed to stay on them and play over."
// Deep (12+ yds past the line): the man on him plays OVER the top; underneath he still trails behind (the swipe fix).
window.ZC={dh:0,lag:.7,top:-1,k:.9,lo:.95,hi:1.06,off:0};window.ROLD=0;   /* 2026-11-17: Tyler: a slant stopped after the break (interception) and receivers come open if you just wait: routes run all the way through again */
window.zcFree=function(w,P,me){try{return !P.db.concat(P.lb).some(o=>o!==me&&(o.w===w||o.mw===w||o.pk===w||Math.hypot(o.x-w.x,o.y-w.y)<3.2))}catch(e){return false}};
// Tyler, 2026-11-16: "Qb rushing seems to be the dominant way to play, maybe find different ways for the defense to stop it" / "If anyone
// is taking off for a deep play ... they can still be caught". Measured: a 99-speed QB running wide behind the line then up the
// sideline averaged 19-24 yards a scramble. Now the defense contains: once you leave the pocket (outside the tackles, moving), zone
// defenders on that side and the underneath ones stop dropping and come up to cut you off; deep defenders come down to the edge.
window.zcScr=function(P){try{const q=P.qb;return P.car===q&&!P.passed&&!P.air&&P.t>.8&&(Math.abs(q.x-26.5)>6.5||q.y>g.los+.3)&&Math.hypot(q.vx||0,q.vy||0)>3}catch(e){return false}};
window.zcCut=function(d,P){const q=P.qb,side=Math.sign(q.x-26.5)||1,ahead=d.y-q.y,lat=(d.x-26.5)*side;
 if(d.dz){if(Math.abs(d.x-q.x)>22)return null;const lead=.8;return [cl(q.x+(q.vx||0)*lead,2,51.3),Math.max(g.los+6,Math.min(d.y,q.y+10))]}
 if(lat<-8&&Math.abs(d.x-q.x)>16)return null;const dd=Math.hypot(q.x-d.x,q.y-d.y),ld=cl(dd/(d.sp+.1)*.6,.3,1.2);return [cl(q.x+(q.vx||0)*ld,1,52.3),Math.max(g.los+.5,q.y+(q.vy||0)*ld+.6)]};
(()=>{try{const _z=zoneT;zoneT=function(d,P){const r=_z.apply(this,arguments);try{
 if(zcScr(P)){d.pk=null;const c=zcCut(d,P);if(c){d.cbB=1.04;return c}}
 const idle=r&&Math.abs(r[0]-d.zx)<.01&&Math.abs(r[1]-d.zy)<.01;
 if(d.pk&&d.dz&&d.pk.y<g.los+8&&P.wr.some(x=>x!==d.pk&&x.y>g.los+12))d.pk=null;   /* a deep man appears: back to depth */if(d.pk&&(P.passed||!P.wr.includes(d.pk)||!zcFree(d.pk,P,d)&&Math.hypot(d.pk.x-d.x,d.pk.y-d.y)>4))d.pk=null;
 if(!d.pk&&idle&&!P.passed){let b=null,bd=20;P.wr.forEach(w=>{if(w.hold||w.y<g.los+2)return;if(d.dz&&w.y<g.los+10&&(P.t<(ZC.dh!=null?ZC.dh:2.5)||P.wr.some(x=>x.y>g.los+12)))return;   /* Tyler 2026-11-17: a deep defender doesn't leave his depth to chase a short man while anyone is threatening deep (that left deep receivers wide open); once nobody is deep he comes up to help */const dd=Math.hypot(w.x-d.x,w.y-d.y)*(w.y-g.los>12?.75:1);if(dd<bd&&zcFree(w,P,d)){bd=dd;b=w}});if(b){d.pk=b;d.pkT=P.t-(b.y-g.los>12?ZC.lag*.7:0)}   /* a deep man nobody has is seen from farther and picked up faster */}
 if(d.pk){if(ZC.off)return r;const w=d.pk,lag=ZC.lag,tx=w.x+(w.vx||0)*.3,ty=w.y+(w.vy||0)*.25+(d.dz?1.6:.9)*(w.y-g.los>12?1:ZC.top),s_=Math.hypot(tx-d.x,ty-d.y);
  if(P.t-(d.pkT||0)<lag)return r;   // a beat to react
  d.cbB=s_>2.2?cl((w.sp||8)*(ZC.k+((d.cov||70)-(w.rr||w.elu||70))/260)/d.sp,ZC.lo,ZC.hi):0;return [tx,ty]}
}catch(e){}return r}}catch(e){}})();
// the end on the side you roll to sheds his block to set the edge (an end, or the outside rusher on that side)
(()=>{try{const _r=rushP;rushP=function(d,b,P){const r=_r.apply(this,arguments);try{if(zcScr(P)){const q=P.qb,side=Math.sign(q.x-26.5)||1;if((d.x-26.5)*side>2)return Math.max(r,1.6*cl(((S.q&&S.q.mob)||60)-40,15,50)/50)}}catch(e){}return r}}catch(e){}})();
