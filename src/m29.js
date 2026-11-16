
// ===================== interceptions you can see: the defender returns it, you (and everyone) can chase him down =====================
function intStart(d,a,vis){const P=g.pl;d.x=a.lx;d.y=a.ly;d.vx=d.vy=0;d.stun=0;d.cd=0;P.car=d;P.ir={d,vis:vis?1:0,t:0,tk:0};P.run=true;g.flash='INTERCEPTED!';g.ft=1.4;g.sh=.3}
function intTick(P,dt){const I=P.ir,r=I.d,q=P.qb;I.t+=dt;
 const off=[q,...P.wr,...P.ol].filter(Boolean),chs=(o,sp)=>{if(I.t<.45)sp*=.35;if(P.def.some(d=>d!==r&&Math.hypot(d.x-o.x,d.y-o.y)<1.3)){sp*=.45;o.blk_=1}else o.blk_=0;if(o.icd>0)sp*=.5;const dd=Math.hypot(o.x-r.x,o.y-r.y),ld=(o.y<r.y?0:Math.min(.5,dd/14));mv(o,r.x+(r.vx||0)*ld,r.y+(r.vy||0)*ld,sp,dt)};
 // the returner heads for the end zone (y = 0 here), slipping away from the closest chasers
 if(!I.tk&&!(r.stun>0)){let ax=0,ay=-1.4;off.forEach(o=>{const dx=r.x-o.x,dy=r.y-o.y,dd=Math.hypot(dx,dy)||.1;if(dd<7&&dy>-1.5){ax+=dx/dd*2.6/dd;ay+=.15/dd}});if(r.x<9)ax+=2.6*(9-r.x)/9;if(r.x>44.3)ax-=2.6*(r.x-44.3)/9;ay=Math.min(ay,-.3);const l=Math.hypot(ax,ay),sp=(r.sp||7)*.84;r.vx=ax/l*sp;r.vy=ay/l*sp;r.x=cl(r.x+r.vx*dt,.6,52.7);r.y+=r.vy*dt}
 else{r.vx=r.vy=0;if(r.stun>0)r.stun-=dt}
 // you: steer the QB with the joystick; with no input he chases on his own
 const l=Math.hypot(inp.x,inp.y);if(l>.05&&!I.vis){const s=q.sp*Math.min(1,l);q.vx=inp.x/l*s;q.vy=inp.y/l*s;q.x+=q.vx*dt;q.y+=q.vy*dt}else chs(q,q.sp*.92);
 P.wr.forEach(w=>chs(w,(w.sp||7.6)*.97));P.ol.forEach(o=>chs(o,5.4));
 // the rest of the defense escorts him
 P.def.forEach(d=>{if(d===r)return;const tgt=off.reduce((b,o)=>Math.hypot(o.x-r.x,o.y-r.y)<Math.hypot(b.x-r.x,b.y-r.y)?o:b,off[0]);mv(d,(tgt.x+r.x)/2,(tgt.y+r.y)/2-1,(d.sp||6.6)*.9,dt)});
 if(I.tk)return;
 // tackles: anyone who gets there has a good chance; a missed tackle trips him up for a moment
 for(const o of off){if(Math.hypot(o.x-r.x,o.y-r.y)<1.15&&!(o.icd>0)&&!o.blk_){if(R()<(o===q?.5:.6)){I.tk=1;r.vx=r.vy=0;if(I.vis)return;return endPlay(cl(r.y,1,99),'INTERCEPTED! Returned to the '+fp(Math.round(cl(r.y,1,99))),{int:1})}o.icd=1.3;r.stun=.12}}
 off.forEach(o=>{if(o.icd>0)o.icd-=dt});
 if(r.y<=0){I.tk=1;if(I.vis)return;return endPlay(0,'PICK SIX!',{int:1,p6:1})}
 if(r.x<=.7||r.x>=52.6){I.tk=1;if(!I.vis)return endPlay(cl(r.y,1,99),'INTERCEPTED! Run out of bounds',{int:1})}}
