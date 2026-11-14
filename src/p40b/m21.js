
// ---------------- kicks you can actually see: snap, hold, kicker, the ball over the crossbar; punts with a punter and a returner ----------------
// o: {kind:'fg'|'punt', los, ok, d (fg distance), net (punt), sd (miss side), short}
function kScene(P,o,t,dt){const q=o.kind=='fg'?(P.wr[2]||P.wr[0]||P.qb):P.qb,kk=P.rb,C=P.ol&&P.ol[2],fg=o.kind=='fg';
 if(!o.init){o.init=1;P.car=null;P.air=null;P.passed=true;q.vx=q.vy=0;o.hy=fg?o.los-7:o.los-13;q.x=26.5;q.y=o.hy;q.kn=fg?1:0;if(!fg){q.x=-2.6;q.y=o.los-2;q.kn=0;q.vx=q.vy=0}else if(q!==P.qb){const Q=P.qb;Q.x=-2.6;Q.y=o.los-2;Q.kn=0;Q.vx=Q.vy=0;o.hold=q;q.wp=[]}
  P.wr.forEach(w=>{w.wp=[];w.vx=w.vy=0});[...P.dl,...P.lb,...P.db].forEach(d=>{d.vx=d.vy=0});
  try{const L_=rost(g.sw?'h.'+g.oi:'h.0'),K=L_&&L_[22];if(K){kk.nm=K.n.split(' ').pop().toUpperCase().slice(0,9);kk.num=K.num;if(kk.m&&kk.m.parent){kk.m.parent.remove(kk.m);kk.m=null}}}catch(e){}
  if(fg){kk.x=24.4;kk.y=o.hy-2.6;o.Tf=.9+o.d*.012;o.tk=.62;o.yE=o.short?107.5:118;o.hc=o.short?2.2:5.4;o.fc=(110-o.hy)/(o.yE-o.hy);o.Hp=Math.min(24,Math.max(3,(o.hc-1)/(4*o.fc*(1-o.fc))))}
  else{kk.x=26.5;kk.y=o.hy;o.tk=.85;o.Tf=2.05;o.ly=Math.min(118,o.los+o.net);o.lx=cl(26.5+(R()-.5)*18,8,45);const r=P.db[3]||P.db[0];o.ret=r;r.x=o.lx+(R()-.5)*6;r.y=Math.min(o.ly+4,107)}}
 const snapT=fg?.4:.55,cy=C?C.y+.6:o.los,pn=fg?q:kk;let msg=null,end=false;
 // snap
 if(t<snapT){const f=t/snapT;P.wb=[(pn.x+.3-26.5)*f,.4+Math.sin(Math.PI*f)*(fg?.5:.9),-(cy+(o.hy-cy)*f)];P.fy=o.los}
 else if(t<o.tk){P.wb=fg?[.2,.35,-o.hy]:[pn.x-26.5+.25,1.25,-(o.hy+.3)];P.fy=o.los}
 if(fg){// kicker: steps up and swings through
  if(t<o.tk){const f=cl((t-.22)/(o.tk-.22),0,1);const tx=24.4+(26.1-24.4)*f,ty=o.hy-2.6+(2.0)*f;kk.vx=(tx-kk.x)/Math.max(dt,1e-3);kk.vy=(ty-kk.y)/Math.max(dt,1e-3);if(f<=0)kk.vx=kk.vy=0;kk.x=tx;kk.y=ty;kk.kl=f>.6?(f-.6)/.4*.45:null}
  else{kk.vx=kk.vy=0;kk.kl=Math.min(1,.45+(t-o.tk)/.25*.55);if(t>o.tk+.6)kk.kl=null}
  if(t>=o.tk){const f=Math.min(1,(t-o.tk)/o.Tf),y=o.hy+(o.yE-o.hy)*f,dr=o.ok||o.short?Math.sin(f*9)*.25:o.sd*4.4*Math.pow(f/o.fc,1.5),h=1+4*o.Hp*f*(1-f);
   P.wb=[dr,Math.max(.2,h),-y];P.fy=Math.min(y,104);
   if(!o.cr&&y>=110){o.cr=1;msg=o.ok?'IT\'S GOOD! ('+o.d+' yds)':o.short?'NO GOOD: short ('+o.d+' yds)':'NO GOOD: wide '+(o.sd<0?'left':'right')+' ('+o.d+' yds)'}
   if(o.short&&!o.cr&&f>=1){o.cr=1;msg='NO GOOD: short ('+o.d+' yds)'}
   if(f>=1&&t>o.tk+o.Tf+.9)end=true}}
 else{// punter drops it and boots it; gunners run; the returner settles under it
  if(t>=o.tk-.15&&t<o.tk+.5)kk.kl=cl((t-o.tk+.15)/.65,0,1);else kk.kl=null;
  const r=o.ret;if(r&&!o.dec){const f=Math.min(1,t/2.2),tx=o.lx,ty=Math.min(o.ly,107);r.vx=(tx-r.x)*1.2;r.vy=(ty-r.y)*1.2;r.x+=(tx-r.x)*Math.min(1,dt*1.6);r.y+=(ty-r.y)*Math.min(1,dt*1.6)}
  const gun=[P.wr[0],P.wr[1]].filter(Boolean);
  if(t>=o.tk){gun.forEach(w=>{if(!r)return;const dx=r.x-w.x,dy=r.y-(o.dec?0:2)-w.y,dd=Math.hypot(dx,dy);if(dd>(o.dec==2?.9:3)){const sp=o.dec==2?8.6:8.2;w.vx=dx/dd*sp;w.vy=dy/dd*sp;w.x+=w.vx*dt;w.y+=w.vy*dt}else w.vx=w.vy=0});
   const f=Math.min(1,(t-o.tk)/o.Tf),x0=kk.x+.4,y0=o.hy+1.2,y=y0+(o.ly-y0)*f,x=x0+(o.lx-x0)*f,h=1.6+4*17*f*(1-f);if(!o.dec){P.wb=[x-26.5,Math.max(.3,h),-y];P.fy=Math.min(y,104)}
   if(f>=1&&!o.dec){const gd=r?Math.min(...gun.map(w=>Math.hypot(w.x-r.x,w.y-r.y)),99):99;o.dec=o.ly>=100?3:(gd<5.5||R()<.22||o.nr)?1:2;o.rs=t;
    o.rety=o.dec==2?(R()<.07?ri(20,45):ri(2,13)):0;o.y1=o.ly-o.rety;
    msg=o.dec==3?'Punt into the end zone: touchback':o.dec==1?'Fair catch at the '+(o.ly>=50?'own '+Math.round(100-o.ly):'opp '+Math.round(o.ly))+' ('+Math.round(o.ly-o.los)+' yds)':'He brings it out!'}
   if(o.dec==1&&r){P.wb=[r.x-26.5,1.3,-(r.y-.3)];r.vx=r.vy=0}
   if(o.dec==2&&r){const go=t-o.rs;if(r.y>o.y1+.2&&go<6){r.vy=-7.6;r.vx=Math.sin(go*2.2)*2.2;r.y+=r.vy*dt;r.x=cl(r.x+r.vx*dt,2,51.3);P.wb=[r.x-26.5+.3,1.2,-r.y]}
    else{r.vx=r.vy=0;P.wb=[r.x-26.5+.3,.6,-r.y];if(!o.dn){const gn_=gun.slice().sort((a,b)=>Math.hypot(a.x-r.x,a.y-r.y)-Math.hypot(b.x-r.x,b.y-r.y))[0];if(gn_){gn_.x=r.x+.5;gn_.y=r.y+.9;gn_.vx=gn_.vy=0}r.kd=1;r.stun=6;r.kdr=Math.PI;o.dn=1;o.de=t;msg='Returned '+o.rety+' yds'+(o.rety>=20?' — big return!':'')}}}
   if(o.dec&&o.dec!=2&&t>o.rs+.9)end=true;if(o.dec==2&&o.dn&&t>o.de+.8)end=true}}
 return{msg,end}}
// the kicker's leg and the holder's knee on the model
function kPose(o,m){if(o.kl!=null){const s=qE(cl(o.kl,0,1));m.L[1].rotation.x=-.7+2.2*s;m.L[0].rotation.x=.15*s;m.rotation.x=-.15*s;if(m.ar)for(const l of m.L)if(l.S)l.S.rotation.x=-.3*(1-s)}
 if(o.kn){m.position.y=-.42;m.L[1].rotation.x=-1.35;m.L[0].rotation.x=.25;if(m.ar){m.L[1].S.rotation.x=-1.9;m.L[0].S.rotation.x=-.4}}}
// watch mode: kicks
function wKick(P,e,t,dt){P.t+=dt;if(P.endAt){if(t>=P.endAt){P.endAt=0;wEnd(P.endTxt,P.endK)}return}
 if(!P.ko&&e.k=='fg'){P.kc=CAMI;CAMI=0}const o=P.ko||(P.ko={kind:e.k,los:e.y0,ok:e.ok,d:Math.round(100-e.y0+17),net:e.net||40,nr:1,sd:e.sd<0?-1:1,short:e.k=='fg'&&!e.ok&&R()<.35});const r=kScene(P,o,t,dt);if(r.msg)g.msg=r.msg;
 if(r.end){P.wr.forEach(w=>{w.kn=0});if(P.kc!=null){CAMI=P.kc;P.kc=null}P.endAt=t+.05;P.endTxt=e.k=='fg'?(e.ok?'FIELD GOAL IS GOOD!':'NO GOOD'):'Punt';P.endK=e.k;P.car=null}}
// live: your field goal and punt
function kTick(dt){const K=g.kk,P=g.pl;if(!K)return;K.t+=dt;if(!P){g.kk=null;return}if(K.c0==null){K.c0=CAMI;CAMI=0}
 const o=K.o||(K.o={kind:K.pt?'punt':'fg',los:g.los,ok:K.ok,d:K.d,net:K.net||40,sd:K.sd,short:!K.pt&&!K.ok&&R()<.35});const r=kScene(P,o,K.t,dt);if(r.msg){g.msg=r.msg;K.sh=1}
 if(r.end){if(K.c0!=null)CAMI=K.c0;if(K.o&&K.o.ret){K.o.ret.kd=0;K.o.ret.stun=0}g.kk=null;g.ph='pre';g.msg='';P.wb=null;P.fy=null;P.qb.kn=0;P.qb.kl=null;if(P.rb)P.rb.kl=null;P.wr.forEach(w=>{w.kn=0});
  if(K.pt){const y=g.y+K.net-((K.o&&K.o.rety)||0);drvEnd(y>=100?20:100-y,(K.o&&K.o.rety)?'Punt returned '+K.o.rety+' yds':'Punt')}else if(K.ok){g.s[0]+=3;drvEnd(25,'Field goal good ('+K.d+' yds)')}else drvEnd(Math.max(100-g.los,20),'Field goal missed ('+K.d+' yds)')}}
function punt(){ovHide();$('#lb').style.display='none';$('#spk').style.display='none';g.tk=0;g.ph='kick';g.kk={t:0,pt:1,net:ri(36,46)};g.msg=''}
// ---------------- watch mode: whoever makes the tackle actually gets there (no more teleporting) ----------------
function wSteer(d,tx,ty,sp,dt){const dx=tx-d.x,dy=ty-d.y,dd=Math.hypot(dx,dy);if(dd<.05){d.vx=d.vy=0;return}const k=Math.min(dd,sp*dt);d.x+=dx/dd*k;d.y+=dy/dd*k;d.vx=dx/dd*sp;d.vy=dy/dd*sp}
function wConvPre(P){const m=new Map();[P.wTk,P.wInt].forEach(d=>{if(d)m.set(d,[d.x,d.y])});return m}
function wConvPost(P,e,dt,sv){const c=P.car,q=P.qb;
 if(P.air&&P.wf=='int'){const a=P.air;if(!P.wInt)P.wInt=[...P.db,...P.lb].sort((x,y)=>Math.hypot(x.x-a.lx,x.y-a.ly)-Math.hypot(y.x-a.lx,y.y-a.ly))[0];const d=P.wInt;if(d){const s=sv.get(d);if(s){d.x=s[0];d.y=s[1]}const rem=Math.max(.05,a.T-a.t);wSteer(d,a.lx,a.ly,Math.min(13,Math.max(6,Math.hypot(a.lx-d.x,a.ly-d.y)/rem)),dt)}}
 if(c&&c!==q&&P.endY!=null&&!e.td&&(e.k=='run'||e.k=='pass')&&!P.endAt&&!P.air){const toGo=P.endY-c.y,vy=Math.max(1.5,c.vy||c.sp||5);
  if(!P.wTk&&toGo<Math.max(4,vy*1.4)){const tau=Math.max(.3,toGo/vy),Mx=c.x+(c.vx||0)*tau;P.wTk=P.def.slice().sort((x,y)=>Math.hypot(x.x-Mx,x.y-P.endY)-Math.hypot(y.x-Mx,y.y-P.endY))[0]}
  const d=P.wTk;if(d){const s=sv.get(d);if(s){d.x=s[0];d.y=s[1]}const tau=Math.max(.08,toGo/vy),Mx=cl(c.x+(c.vx||0)*Math.min(tau,.6),2,51.3),My=P.endY+.4,dist=Math.hypot(Mx-d.x,My-d.y),need=dist/tau;if(need>12.5&&c.sp>5.6){P.wSlow=1;c.sp=Math.max(5.6,c.sp*.95)}wSteer(d,Mx,My,Math.min(13.5,Math.max(d.sp||7,need)),dt)}}
 if(c&&c!==q)c.x=cl(c.x,1.5,51.8)}
