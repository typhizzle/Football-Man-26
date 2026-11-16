// ===================== 🏈 passing game: route cuts create separation, shovels hit the back, swipes follow the finger =====================
// route running: WR/TE/RB get a route rating from their overall; on a hard cut the man (or nearby zone defender) bites for a moment
(()=>{const _r=rateApply;rateApply=function(o,x,i){const r=_r.apply(this,arguments);try{const v=x&&x.ovr;if(v>0&&i>=1&&i<=5){o.rr=cl(v+(R()-.5)*6,35,99);if(i>=2&&i<=4)o.sp=Math.max(o.sp||0,7.25+(v-60)*.045)}}catch(e){}return r}})();
function wrCut(w,P){const nx=w.wp&&w.wp[0];if(!nx)return;const dx=nx[0]-w.x,dy=nx[1]-w.y,l=Math.hypot(dx,dy),v=Math.hypot(w.vx||0,w.vy||0);if(l<1||v<2)return;
 const ang=Math.acos(cl((w.vx*dx+w.vy*dy)/(v*l),-1,1));if(ang<.5)return;const rr=w.rr||w.elu||70;
 P.db.concat(P.lb).forEach(d=>{if(d.stun>0||d.spy)return;const man=d.w===w,near=!d.w&&Math.hypot(d.x-w.x,d.y-w.y)<5;if(!man&&!near)return;
  const cov=d.cov||d.tkl||70;let L=(.12+(rr-cov)/100*1.3+(R()-.5)*.12)*cl(ang/1.57,.45,1.2)*(man?1:.6);L=cl(L,.03,.6);
  d.lag=L;d.lgx=d.x+w.vx/v*6;d.lgy=d.y+w.vy/v*6})}
// short throws: a soft toss toward a back or receiver close by goes to HIM (where he'll be), not 10 yards past him
(()=>{const _d=doThrow;doThrow=function(w,lx,ly){try{const P=g.pl,q=P&&P.qb;if(P&&q&&g.ph=='live'&&!P.air&&P.car===q){const ad=Math.hypot(lx-q.x,ly-q.y)||1,ax=(lx-q.x)/ad,ay=(ly-q.y)/ad,v=16+S.q.pow*.1;
  const wT=w?Math.max(.25,Math.hypot(w.x-q.x,w.y-q.y)/v):0,wOk=w&&Math.hypot(w.x+(w.vx||0)*wT-lx,w.y+(w.vy||0)*wT-ly)<4;if(ad<18&&!wOk){let best=null,bs=-9;P.wr.forEach(r=>{const wd=Math.hypot(r.x-q.x,r.y-q.y);if(wd>13)return;const T=Math.max(.25,wd/v),ex=r.x+(r.vx||0)*T-(q.vx||0)*T*.3,ey=r.y+(r.vy||0)*T-(q.vy||0)*T*.3,rx=ex-q.x,ry=ey-q.y,rl=Math.hypot(rx,ry)||1,c=(ax*rx+ay*ry)/rl;if(c>.85&&ad<rl*1.5+4){const sc=c-rl/60;if(sc>bs){bs=sc;best={r,ex,ey}}}});
   if(best){w=best.r;lx=best.ex;ly=best.ey;P.shov=1}}}}catch(e){}return _d.call(this,w,lx,ly)}})();
