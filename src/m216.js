// ===== 🛡 NOBODY RUNS FREE: AN IDLE DEFENDER PICKS UP THE OPEN MAN =====
// Tyler, 2026-11-16: "DBs come off WRs sometimes, they should at least try to guard them, otherwise I'm getting an open pass
// everytime. But obviously still create separation so passes can be completed, football logic".
// In zone, a defender whose area is empty used to stand on his spot while a receiver ran free past him (now more often, since
// routes run all the way to the sideline). Now an idle zone defender takes the nearest receiver nobody is guarding (within 20 yds)
// and trails him: a step behind, closing at a speed set by his coverage against the receiver's route running, so good routes
// still get open and passes are still completed.
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
 if(d.pk&&(P.passed||!P.wr.includes(d.pk)||!zcFree(d.pk,P,d)&&Math.hypot(d.pk.x-d.x,d.pk.y-d.y)>4))d.pk=null;
 if(!d.pk&&idle&&!P.passed){let b=null,bd=20;P.wr.forEach(w=>{if(w.hold||w.y<g.los+2)return;const dd=Math.hypot(w.x-d.x,w.y-d.y);if(dd<bd&&zcFree(w,P,d)){bd=dd;b=w}});if(b){d.pk=b;d.pkT=P.t}}
 if(d.pk){const w=d.pk,lag=.35,tx=w.x+(w.vx||0)*.3,ty=w.y+(w.vy||0)*.25+(d.dz?1.6:.9),s_=Math.hypot(tx-d.x,ty-d.y);
  if(P.t-(d.pkT||0)<lag)return r;   // a beat to react
  d.cbB=s_>2.2?cl((w.sp||8)*(.9+((d.cov||70)-(w.rr||w.elu||70))/260)/d.sp,.95,1.06):0;return [tx,ty]}
}catch(e){}return r}}catch(e){}})();
// the end on the side you roll to sheds his block to set the edge (an end, or the outside rusher on that side)
(()=>{try{const _r=rushP;rushP=function(d,b,P){const r=_r.apply(this,arguments);try{if(zcScr(P)){const q=P.qb,side=Math.sign(q.x-26.5)||1;if((d.x-26.5)*side>2)return Math.max(r,1.6*cl(((S.q&&S.q.mob)||60)-40,15,50)/50)}}catch(e){}return r}}catch(e){}})();
