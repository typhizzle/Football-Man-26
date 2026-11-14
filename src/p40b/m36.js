
// ===================== PUNT RETURNS: the whole field plays it out (coverage, blocks, missed tackles, touchdowns) =====================
function prCovL(P){const kk=P.rb;return[P.wr[0],P.wr[1],P.wr[2],P.wr[3],...(P.ol||[])].filter(o=>o&&o!==kk&&o!==P.qb)}
function prBlkL(P,r){return[...P.dl,...P.lb,...P.db].filter(d=>d&&d!==r)}
// after the kick: everybody covers, the return team peels back to block
function prCov(P,o,r,t,dt){if(!r||t<o.tk+.15)return;const C=prCovL(P),B=prBlkL(P,r),lx=o.lx,ly=Math.min(o.ly,107);
 if(!o.asg){o.asg=1;const used=new Set();B.slice().sort((a,b)=>b.y-a.y).forEach(b=>{let best=null,bd=1e9;C.forEach(c=>{if(used.has(c))return;const d=Math.hypot(c.x-b.x,c.y-b.y);if(d<bd){bd=d;best=c}});if(best){used.add(best);b.prT=best}});C.forEach(c=>{c.prE=0;c.prI=0})}
 const gun=[P.wr[0],P.wr[1]];
 C.forEach((c,i)=>{if(o.dec==2)return;if(gun.includes(c))return;if(c.prE>0){c.prE-=dt;c.vx*=.5;c.vy*=.5;return}const sp=(P.ol.includes(c)?5.6:c===P.qb?6.6:(c.sp||7.5)*.86),tx=cl(lx+(i-3.5)*3.2,3,50),ty=ly-4-(P.ol.includes(c)?2:0);mv(c,tx,ty,sp,dt)});
 B.forEach(b=>{const c=b.prT;if(!c)return;if(b.prL){b.x=c.x+(r.x-c.x)*.06;b.y=c.y+1.0;b.vx=c.vx;b.vy=c.vy;if(c.prE<=0){b.prL=0;b.prT=null}return}const dx=r.x-c.x,dy=r.y-c.y,dd=Math.hypot(dx,dy)||1,tx=c.x+dx/dd*1.4,ty=c.y+dy/dd*1.4;mv(b,tx,ty,(b.sp||6.6)*.95,dt);if(Math.hypot(b.x-c.x,b.y-c.y)<1.3&&!(c.prI>0)){c.prI=2.6;if(R()<.55){b.prL=1;c.prE=.35+R()*.7*(b.str||70)/75}}});
 C.forEach(c=>{if(c.prI>0)c.prI-=dt})}
// the return itself
function prRet(P,o,r,t,dt){const C=prCovL(P),go=t-o.rs;if(o.dn){r.vx=r.vy=0;return}
 if(!o.rInit){o.rInit=1;o.wall=R()<.13;o.tkM=o.wall?.5:1;o.rsp=cl((r.sp||7.4)+(R()-.5)*1.2,6.6,8.2)}
 // the returner: north-south, slipping away from the closest free tacklers, away from the sideline
 if(!(r.stun>0)){let ax=0,ay=-1.5;C.forEach(c=>{if(c.prE>0)return;const dx=r.x-c.x,dy=r.y-c.y,dd=Math.hypot(dx,dy)||.1;if(dd<8&&dy<2){ax+=dx/dd*2.4/dd;ay+=.25/dd}});if(r.x<8)ax+=2.4*(8-r.x)/8;if(r.x>45.3)ax-=2.4*(r.x-45.3)/8;ay=Math.min(ay,-.35);const l=Math.hypot(ax,ay),sp=o.rsp*(go<.4?.6:1);r.vx=ax/l*sp;r.vy=ay/l*sp;r.x=cl(r.x+r.vx*dt,.5,52.8);r.y+=r.vy*dt}else{r.stun-=dt;r.vx*=.4;r.vy*=.4}
 // coverage closes in (engaged players are stuck on their blocker)
 C.forEach(c=>{if(c.prE>0){c.prE-=dt;return}const isOL=P.ol.includes(c),sp=isOL?6:c===P.qb?7:(c.sp||7.6)*.97,dd=Math.hypot(r.x-c.x,r.y-c.y),ld=c.y<r.y?Math.min(.45,dd/16):0;mv(c,r.x+(r.vx||0)*ld,r.y+(r.vy||0)*ld,sp,dt)});
 // blockers stay on their man while they can
 prBlkL(P,r).forEach(b=>{const c=b.prT;if(b.prL&&c){if(c.prE>0){b.x=c.x+(r.x-c.x)*.06;b.y=c.y+1.0;b.vx=c.vx;b.vy=c.vy;return}b.prL=0;b.prT=null}const tgt=C.filter(x=>!(x.prE>0)).sort((a,bb)=>Math.hypot(a.x-r.x,a.y-r.y)-Math.hypot(bb.x-r.x,bb.y-r.y))[0];if(!tgt){b.vx=b.vy=0;return}if(!b.prL&&Math.hypot(b.x-tgt.x,b.y-tgt.y)<1.3&&!(tgt.prI>.8)){b.prT=tgt;b.prL=1;tgt.prE=(.3+R()*.6)*(o.wall?3.2:1);tgt.prI=2.2;return}mv(b,(tgt.x+r.x)/2,(tgt.y+r.y)/2,(b.sp||6.6)*.9,dt)});
 C.forEach(c=>{if(c.prI>0)c.prI-=dt;if(c.icd>0)c.icd-=dt});
 const fin=(m,td)=>{o.dn=1;o.de=t;o.rety=td?Math.round(o.ly):Math.round(o.ly-r.y);if(td)o.td=1;o.pe=m;r.vx=r.vy=0};
 if(r.y<=0)return fin('PUNT RETURN TOUCHDOWN!',1);
 if(r.x<=.6||r.x>=52.7)return fin('Returned '+Math.max(0,Math.round(o.ly-r.y))+' yds, out of bounds');
 for(const c of C){if(c.prE>0||c.icd>0)continue;if(Math.hypot(c.x-r.x,c.y-r.y)<1.1){if(R()<(P.ol.includes(c)?.5:.6)*o.tkM){c.x=r.x+.4;c.y=r.y-.7;c.vx=c.vy=0;r.kd=1;r.stun=6;r.kdr=Math.PI;const n=Math.round(o.ly-r.y);return fin('Returned '+n+' yds'+(n>=20?' — big return!':''))}c.icd=1.2;r.stun=.16}}
 if(go>9)return fin('Returned '+Math.round(o.ly-r.y)+' yds')}

// ===================== RECEIVERS WHEN THE PLAY BREAKS DOWN: work back to open grass instead of jogging in place =====================
function scrSpot(w,P){const q=P.qb,D=P.def||[];if(w.ss&&P.t<w.ssT){const near=Math.min(...D.map(d=>Math.hypot(d.x-w.x,d.y-w.y)),99);if(near>1.6||P.t<w.ssT-.7)return w.ss}
 const sgn=Math.abs(q.vx||0)>1.5?Math.sign(q.vx):0,segD=(px,py)=>{let m=9;D.forEach(d=>{const vx=px-q.x,vy=py-q.y,L=vx*vx+vy*vy||1,u=cl(((d.x-q.x)*vx+(d.y-q.y)*vy)/L,0,1),hx=q.x+vx*u,hy=q.y+vy*u;m=Math.min(m,Math.hypot(d.x-hx,d.y-hy))});return m};
 let best=null,bs=-1e9;for(let k=0;k<16;k++)for(const rr of[4.5,7.5]){const a=k*Math.PI/8,x=cl(w.x+Math.cos(a)*rr,3,50.3),y=cl(w.y+Math.sin(a)*rr,g.los+1.5,106);if(Math.hypot(x-w.x,y-w.y)<2.5)continue;
  const op=Math.min(8,...D.map(d=>Math.hypot(d.x-x,d.y-y))),ln=Math.min(5,segD(x,y)),spc=Math.min(5,...P.wr.filter(o=>o!==w).map(o=>Math.hypot(o.x-x,o.y-y))),dq=Math.hypot(x-q.x,y-q.y);
  const s=op+ln*.6+spc*.3+(sgn?(x-w.x)*sgn*.18:0)-Math.max(0,dq-26)*.35-Math.max(0,5-(y-g.los))*.4;if(s>bs){bs=s;best=[x,y]}}
 const near=Math.min(...D.map(d=>Math.hypot(d.x-w.x,d.y-w.y)),99);w.ss=best||[w.x,w.y+3];w.ssT=P.t+(near<2.2?.6:1.3);return w.ss}
