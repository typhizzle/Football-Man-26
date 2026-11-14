
// ---------------- quarterback mechanics: elbows + knees, two-bone IK and a real throwing motion ----------------
// Stafford-style over the top, Mahomes-style sidearm and throws on the run. Used in games, on the title screen, the practice field and at the combine.
function artArm(a,c1,tc,sk){const s=b=>{b.castShadow=true;return b};s(bx(.26,.5,.3,c1,0,-.24,0,a));const F=new T3.Group();F.position.set(0,-.46,0);a.add(F);a.F=F;
 s(bx(.27,.27,.31,c1,0,0,0,F));s(bx(.25,.36,.29,c1,0,-.17,0,F));bx(.28,.12,.32,tc,0,-.14,0,F);bx(.26,.2,.3,sk,0,-.4,0,F);return a}
function artLeg(l,x,pc,tc){const o=x<0?-.18:.18,s=b=>{b.castShadow=true;return b};l.rotation.order='YXZ';s(bx(.34,.56,.4,pc,0,-.27,0,l));bx(.06,.48,.42,tc,o,-.27,0,l);
 const K=new T3.Group();K.position.set(0,-.52,0);l.add(K);l.S=K;bx(.35,.2,.41,pc,0,0,0,K);s(bx(.34,.5,.4,pc,0,-.25,0,K));bx(.06,.4,.42,tc,o,-.18,0,K);bx(.38,.2,.44,tc,0,-.3,0,K);bx(.4,.14,.56,0x222222,0,-.48,-.06,K);return l}
function artRst(m){if(!m||!m.ar)return;for(const a of m.A){a.rotation.set(0,0,0);a.F.rotation.set(0,0,0)}for(const l of m.L){l.rotation.set(0,0,0);l.S.rotation.set(0,0,0)}}
const QV=()=>new T3.Vector3(),QI={d:QV(),p:QV(),e:QV(),h:QV(),q1:new T3.Quaternion(),q2:new T3.Quaternion(),dn:new T3.Vector3(0,-1,0)};
// two-bone IK: from joint S toward target H (segments L1, L2), the middle joint bends toward 'pole'. Writes both segment directions and the reached end point
function ik2(S0,H,L1,L2,pole,oU,oF,oH){const K=QI,d=K.d.subVectors(H,S0);let n=d.length();if(n<1e-4){d.set(0,-1,0);n=1e-4}else d.divideScalar(n);
 n=Math.min(Math.max(n,Math.abs(L1-L2)+.02),L1+L2-.001);const a=(L1*L1-L2*L2+n*n)/(2*n),h=Math.sqrt(Math.max(0,L1*L1-a*a)),p=K.p.copy(pole).addScaledVector(d,-pole.dot(d));
 if(p.lengthSq()<1e-6){p.set(d.y,-d.x,0);if(p.lengthSq()<1e-6)p.set(0,d.z,-d.y)}p.normalize();
 const e=K.e.copy(S0).addScaledVector(d,a).addScaledVector(p,h);oU.subVectors(e,S0).normalize();K.h.copy(S0).addScaledVector(d,n);oF.subVectors(K.h,e).normalize();if(oH)oH.copy(K.h)}
function limbQ(G,F,dU,dF){const K=QI;K.q1.setFromUnitVectors(K.dn,dU);G.quaternion.copy(K.q1);K.q2.setFromUnitVectors(K.dn,dF);F.quaternion.copy(K.q1.invert()).multiply(K.q2)}
// key poses for a right-hander. [twist, lean, tilt | pelvis x,y,z | throwing-side foot | glove-side foot | throwing hand | glove hand | elbow poles x2 | ball (0 both hands, 1 throwing hand, 2 tucked, -1 none) | ball nose-up]
// feet are on the ground in the heading frame (target straight ahead = -z); hands and elbows are in the body frame
const QKF={
 rdy:[-.12,-.06,0, 0,-.07,0, .3,.06,.1, -.28,.06,-.12, .16,1.6,-.43, -.08,1.55,-.46, .7,-.7,.25, -.7,-.7,.25, 0,.25],
 gun:[0,-.3,0, 0,-.17,.05, .34,.06,.08, -.34,.06,.08, .24,1.3,-.56, -.24,1.3,-.56, .6,-.6,.4, -.6,-.6,.4, 0,0],
 hof:[.35,-.18,0, 0,-.12,0, .3,.06,.15, -.25,.06,-.2, .62,1.42,-.6, .3,1.4,-.62, .7,-.6,.3, -.3,-.8,.4, 0,0],
 ld:[-1.12,.05,-.1, .04,-.1,.16, .3,.06,.32, -.12,.06,-.42, .92,2.3,.22, -1.08,2.0,-.32, 1,-.4,.4, 0,-1,-.2, 1,.55],
 ql:[-.8,.02,-.08, .02,-.1,.1, .3,.06,.25, -.2,.06,-.35, .85,2.28,.2, -.95,1.85,-.4, 1,-.4,.35, -.2,-1,-.2, 1,.5],
 st:[-.6,-.02,-.16, 0,-.16,-.08, .3,.08,.32, -.18,.06,-.78, .72,2.45,.38, -.8,1.78,-.42, 1,-.1,-.5, -.6,-.8,.4, 1,.6],
 rl:[.12,-.2,.2, -.02,-.2,-.32, .26,.14,.28, -.18,.06,-.78, .72,2.72,-.62, -.38,1.55,-.33, 1,0,.3, -.6,-.9,.5, 1,.15],
 fn:[.62,-.34,.06, -.06,-.22,-.48, .12,.3,-.12, -.18,.06,-.78, -.42,1.12,-.5, -.72,1.32,.12, 1,.3,-.4, -.5,-.5,.8, -1,0],
 po:[.25,-.1,0, -.04,-.08,-.42, .14,.06,-.38, -.22,.06,-.62, .62,1.1,-.25, -.6,1.08,-.2, .3,0,1, -.3,0,1, -1,0],
 rc:[.05,-.06,0, 0,-.07,-.2, .28,.06,0, -.24,.22,-.4, .5,1.3,-.38, -.3,1.36,-.46, .7,-.7,.25, -.7,-.7,.25, -1,0],
 sl:[-1.0,.04,-.24, .05,-.14,.12, .32,.06,.3, -.18,.06,-.4, .78,1.98,.38, -1.0,1.9,-.38, 1,-.5,.2, 0,-1,-.2, 1,.2],
 ss:[-.5,-.04,-.28, 0,-.18,-.08, .32,.08,.3, -.2,.06,-.7, .9,1.95,.2, -.75,1.7,-.4, 1,-.3,-.4, -.6,-.8,.4, 1,.1],
 sr:[.1,-.12,-.3, -.02,-.2,-.28, .28,.12,.28, -.2,.06,-.7, .98,1.92,-.62, -.35,1.55,-.35, 0,-1,.3, -.6,-.9,.5, 1,0],
 sf:[.6,-.3,-.12, -.05,-.22,-.42, .12,.26,-.1, -.2,.06,-.7, -.3,1.38,-.62, -.7,1.35,.1, .4,-1,-.2, -.5,-.5,.8, -1,0],
 rL:[-.7,-.12,-.12, 0,0,0, .2,.05,0, -.2,.05,0, .85,2.25,.18, -.9,1.85,-.45, 1,-.4,.3, -.2,-1,-.2, 1,.4],
 rR:[.15,-.25,-.12, 0,0,0, .2,.05,0, -.2,.05,0, .75,2.45,-.6, -.4,1.6,-.35, 1,-.2,.3, -.6,-.9,.5, 1,.1],
 rF:[.5,-.3,0, 0,0,0, .2,.05,0, -.2,.05,0, -.3,1.3,-.55, -.6,1.4,0, 1,0,-.4, -.5,-.5,.8, -1,0],
 rh:[0,-.22,0, 0,0,0, .2,.05,0, -.2,.05,0, .2,1.68,-.42, -.06,1.62,-.45, .7,-.7,.3, -.7,-.7,.3, 0,.3],
 tk:[0,-.3,0, 0,0,0, .2,.05,0, -.2,.05,0, .42,1.55,-.3, -.6,1.4,-.5, .4,-1,.6, -.5,-.6,.6, 2,.2],
 pf:[-.3,-.08,0, 0,-.15,-.15, .3,.06,.32, -.15,.06,-.6, .7,2.45,-.3, -.6,1.7,-.4, 1,0,.1, -.6,-.8,.4, 1,.3],
 sw:[-.55,0,-.12, .03,-.1,.06, .31,.06,.2, -.22,.06,-.26, .92,1.82,-.22, -.55,1.72,-.42, 1,-.5,.1, -.3,-.9,0, 1,.2],
 nu:[0,0,0, 0,0,0, .2,.05,0, -.2,.05,0, .64,.99,0, -.64,.99,0, .3,0,1, -.3,0,1, -1,0]};
for(const k in QKF)QKF[k]=Float32Array.from(QKF[k]);
// lift keys: the ball comes up in front of the shoulder before it goes back to the ear (a straight line would pass through the shoulder and flip the elbow)
{const lift=(b,c,o)=>{const k=Float32Array.from(b);for(let i=0;i<12;i++)k[i]=b[i]+(c[i]-b[i])*o.f;k[12]=.6;k[13]=2.05;k[14]=-.42;k[15]=.38;k[16]=1.98;k[17]=-.5;k[18]=1;k[19]=-.6;k[20]=-.1;k[24]=o.ball;k[25]=.4;return k};
 QKF.lf=lift(QKF.rdy,QKF.ld,{f:.45,ball:0});QKF.lfR=lift(QKF.rh,QKF.rL,{f:.45,ball:1})}
const AIMQ=[[QKF.rdy,0],[QKF.lf,.45],[QKF.ld,1]],AIMR=[[QKF.rh,0],[QKF.lfR,.45],[QKF.rL,1]];
// from wherever the QB is: add the lift when the ball is still low in front
const qkLift=(k0,L)=>k0[14]<-.15&&k0[13]<2?[[k0,0],[L,.04]]:[[k0,0]];
// a shorter stride for quick throws
const qkS=(k,f)=>{const o=Float32Array.from(k);o[5]*=f;o[8]*=f;o[11]*=f;return o},QKQ={st:qkS(QKF.st,.65),rl:qkS(QKF.rl,.65),fn:qkS(QKF.fn,.65)};
// throw types: release time and the key sequence from wherever the QB was when he started
const QSQ={over:{rel:.11,s:k0=>[...qkLift(k0,QKF.lf),[QKF.st,.06],[QKF.rl,.11],[QKF.fn,.33],[QKF.po,.75]]},
 quick:{rel:.19,s:k0=>[...qkLift(k0,QKF.lf),[QKF.ql,.09],[QKQ.st,.14],[QKQ.rl,.19],[QKQ.fn,.4],[QKF.po,.8]]},
 side:{rel:.2,s:k0=>[[k0,0],[QKF.sw,.05],[QKF.sl,.1],[QKF.ss,.15],[QKF.sr,.2],[QKF.sf,.42],[QKF.po,.8]]},
 run:{rel:.14,s:k0=>[...qkLift(k0,QKF.lfR),[QKF.rL,.08],[QKF.rR,.14],[QKF.rF,.34],[QKF.nu,.6]]}};
const qE=x=>x<=0?0:x>=1?1:x*x*(3-2*x),QK0=new Float32Array(26),QK1=new Float32Array(26);
function qkMix(out,a,b,f){for(let i=0;i<26;i++)out[i]=a[i]+(b[i]-a[i])*f;return out}
// keyframes are joined with a monotone cubic (smooth speed through each key, no overshoot, still stops at holds and turnarounds)
function qkSlope(dp,dc,dn){if(dp*dc<=0)return 0;const m=(dp+dc)/2,l=3*Math.min(Math.abs(dp),Math.abs(dc));return Math.sign(m)*Math.min(Math.abs(m),l)}
function qkSeq(out,sq,u){const N=sq.length;if(u<=sq[0][1])return qkMix(out,sq[0][0],sq[0][0],0);if(u>=sq[N-1][1]){const z=sq[N-1][0];return qkMix(out,z,z,0)}
 let i=1;while(i<N-1&&u>sq[i][1])i++;const A=sq[i-1],B=sq[i],P=i>1?sq[i-2]:null,Q=i<N-1?sq[i+1]:null,t0=A[1],t1=B[1],h=Math.max(1e-4,t1-t0),s_=(u-t0)/h,s2=s_*s_,s3=s2*s_,h00=2*s3-3*s2+1,h10=s3-2*s2+s_,h01=-2*s3+3*s2,h11=s3-s2,fe=qE(s_);
 const herm=(p0,p1,pp,pn)=>{const dc=(p1-p0)/h,dp=P&&A[1]-P[1]>1e-4?(p0-pp)/(A[1]-P[1]):0,dn=Q&&Q[1]-t1>1e-4?(pn-p1)/(Q[1]-t1):0,m0=P?qkSlope(dp,dc):0,m1=Q?qkSlope(dc,dn):0;return h00*p0+h10*h*m0+h01*p1+h11*h*m1};
 for(let c=0;c<26;c++){const p0=A[0][c],p1=B[0][c];if(c==24){out[c]=p0+(p1-p0)*fe;continue}out[c]=herm(p0,p1,P?P[0][c]:0,Q?Q[0][c]:0)}
 // hands travel around the shoulder (direction + reach), never through it: a straight line from chest to ear passes the shoulder joint and flips the elbow
 for(const hc of [12,15]){const sx=hc==12?.64:-.64,rel=K=>{const x=K[hc]-sx,y=K[hc+1]-1.85,z=K[hc+2],l=Math.hypot(x,y,z)||1;return[x/l,y/l,z/l,l]},ra=rel(A[0]),rb=rel(B[0]),rp=P?rel(P[0]):ra,rq=Q?rel(Q[0]):rb,v=[0,1,2,3].map(j=>herm(ra[j],rb[j],rp[j],rq[j])),n=Math.hypot(v[0],v[1],v[2]);
  if(n>.05){out[hc]=sx+v[0]/n*v[3];out[hc+1]=1.85+v[1]/n*v[3];out[hc+2]=v[2]/n*v[3]}}return out}
const angD=(a,b)=>{let d=(a-b)%(2*Math.PI);if(d>Math.PI)d-=2*Math.PI;if(d<-Math.PI)d+=2*Math.PI;return d};
const QA={v:QV(),w:QV(),u:QV(),f:QV(),hT:QV(),hG:QV(),fT:QV(),pl:QV(),m4:new T3.Matrix4()};
// pose the whole body: root (twist / lean / tilt / pelvis), planted feet (IK), both arms (IK) and where the ball sits
function qbApply(m,ia,k,head,base,legs){const A=QA,o=ia==1?1:-1,sx=m.scale.x,sy=m.scale.y,sz=m.scale.z,ch=Math.cos(head),sh=Math.sin(head),tw=k[0]*o;
 m.rotation.set(k[1],head+tw,k[2]*o);const px=k[3]*o*sx,pz=k[5]*sz,py=(1.05+k[4])*sy;A.v.set(0,1.05*sy,0).applyEuler(m.rotation);
 m.position.set(base[0]+px*ch+pz*sh-A.v.x,base[1]+py-A.v.y,base[2]-px*sh+pz*ch-A.v.z);m.updateMatrix();
 if(legs){A.m4.copy(m.matrix).invert();for(let s=0;s<2;s++){const L=m.L[s?ia:1-ia],i=s?6:9,fx=k[i]*o*sx,fy=k[i+1]*sy,fz=k[i+2]*sz;
  A.w.set(base[0]+fx*ch+fz*sh,base[1]+fy,base[2]-fx*sh+fz*ch).applyMatrix4(A.m4);
  if(s)A.pl.set(.25*o,0,-1);else A.pl.set(Math.sin(tw)*.8,0,-Math.cos(tw)*.8-.2);ik2(L.position,A.w,.52,.48,A.pl,A.u,A.f);limbQ(L,L.S,A.u,A.f)}}
 for(let s=0;s<2;s++){const a=m.A[s?ia:1-ia],i=s?12:15,e=s?18:21;A.w.set(k[i]*o,k[i+1],k[i+2]);A.pl.set(k[e]*o,k[e+1],k[e+2]);
  ik2(a.position,A.w,.46,.4,A.pl,A.u,A.f,s?A.hT:A.hG);limbQ(a,a.F,A.u,A.f);if(s)A.fT.copy(A.f)}
 const bw=k[24];m.bv=bw>-.5;if(m.bv){const b=m.bp||(m.bp=QV());if(bw<=1){A.w.copy(A.hT).add(A.hG).multiplyScalar(.5);A.w.z-=.1;A.w.y+=.02;A.v.copy(A.hT).addScaledVector(A.fT,.17);const sep=A.hT.distanceTo(A.hG),tw_=Math.max(Math.max(0,bw),cl((sep-.3)/.25,0,1));b.copy(A.w).lerp(A.v,tw_)}else b.copy(A.hT).addScaledVector(A.fT,.17*(2-Math.min(2,bw)))}
 m.bpch=k[25];m.btw=tw;const q=m.qk||(m.qk=new Float32Array(26));q.set(k)}
// the ball in the QB's hands, in world space (the model's parent sits at the origin)
function qbBallW(m,out){return(out||QV()).copy(m.bp).applyMatrix4(m.matrix)}
function qbBallR(m,b){b.rotation.order='YXZ';b.rotation.set(m.bpch||0,m.rotation.y-(m.btw||0),0)}
// ---- in a game: snap, handoffs, ball security, the wind-up while you aim, the throw and the follow-through ----
function qbGame(o,m,ia,P,tw,pl,v){if(!m.ar)return qbPose(m,ia,tw!=null&&tw<.95?tw:null,pl,v>.3);
 const now=performance.now()/1000,dt=Math.min(.05,now-(m.lt||now))||.016;m.lt=now;const mov=v>.3,has=P.car===o&&!P.air,base=m.qb0||(m.qb0=[0,0,0]),runH=m.rotation.y;
 base[0]=o.x-26.5;base[1]=mov?m.position.y:0;base[2]=-o.y;let tgt=null,k=null,legs=!mov,hd=runH;m.tx=0;
 if(tw!=null){if(m.twid!==P.tw){m.twid=P.tw;const a=P.air,T=a?a.T:1,d=a?Math.hypot(a.lx-o.x,a.ly-o.y):20;m.tg=a?[a.lx,a.ly]:null;m.k0=Float32Array.from(m.qk||QKF.rdy);
   m.tv=mov?'run':(m.ck||0)>=.5?'over':R()<(d<14?.55:.25)?'side':'quick';const V=QSQ[m.tv];m.seq=V.s(m.k0);m.relS=V.rel;m.relT=V.rel*Math.min(1,.45*T/V.rel);if(P.swq)m.relT=Math.min(m.relT,.06);if(CAMI==1&&!g.sw)m.relT=Math.min(m.relT,.07);m.tsc=m.relT/V.rel;m.relDone=0}
  tgt=m.tg;const u=tw/m.tsc,end=m.seq[m.seq.length-1][1];if(u<end)k=qkSeq(QK0,m.seq,u);else if(!mov&&m.tv!='run')k=qkMix(QK0,QKF.po,QKF.po,0)}
 else{m.twid=null;if(g.ph=='pre')k=qkMix(QK0,QKF.gun,QKF.gun,0);
  else if(has){const sn=P.t<.22&&!P.handed;m.ck=pl;if(pl>0&&aim&&aim.t)tgt=aim.t;
   if(sn)k=qkMix(QK0,QKF.gun,QKF.rdy,qE(P.t/.22));
   else if(P.call&&P.call.t=='run'&&!P.handed){const r=P.rb;if(r)tgt=[r.x,r.y];k=qkMix(QK0,QKF.rdy,QKF.hof,qE((P.t-.22)/Math.max(.1,(P.hd||.5)-.3)))}
   else if(P.pa&&P.t<.95){const r=P.rb;if(r&&P.t<.6)tgt=[r.x,r.y];const f=P.t<.55?qE((P.t-.22)/.3):1-qE((P.t-.55)/.35);k=qkMix(QK0,QKF.rdy,QKF.hof,f)}
   else if(mov){const pass=o.y<=g.los+.6;k=pass?qkSeq(QK0,AIMR,qE(Math.min(1,pl*1.2))):qkMix(QK0,QKF.tk,QKF.tk,0)}
   else k=qkSeq(QK0,AIMQ,qE(Math.min(1,pl*1.15)))}
  else{m.ck=0;if(P.handed&&P.call&&P.call.t=='run'&&P.t<(P.hd||.5)+.35&&!mov)k=qkMix(QK0,QKF.hof,QKF.nu,qE((P.t-(P.hd||.5))/.35))}}
 if(!k){m.hd=runH;return false}
 if(tgt){const th=Math.atan2(-(tgt[0]-o.x),tgt[1]-o.y);if(mov)m.tx=cl(angD(th,runH),-1.25,1.25)*.75;else hd=th}
 if(!mov){m.hd=m.hd==null?hd:m.hd+angD(hd,m.hd)*Math.min(1,dt*(tw!=null?18:9));hd=m.hd}else{m.hd=runH;hd=runH+m.tx}
 if(tw!=null&&tw>=m.relT&&!m.relDone){m.relDone=1;qkSeq(QK1,m.seq,m.relS);qbApply(m,ia,QK1,hd,base,legs);m.relP=qbBallW(m,m.relP||QV())}
 qbApply(m,ia,k,hd,base,legs);if(mov){const tt=-(k[0]*(ia==1?1:-1)+m.tx);for(const l of m.L)l.rotation.y=tt}return true}
// the game ball while the QB has it: on the ground at the snap, flying into his hands, held, cocked, released from the hand
function qbBallG(P,a,c){const q=P.qb,m=q&&q.m,B=P.bm;if(!m||!m.ar)return false;const fp=CAMI==1&&!g.sw;
 if(g.ph=='pre'){const C=P.ol&&P.ol[2];if(!C)return false;B.position.set(C.x-26.5,.2,-(C.y+.62));B.rotation.set(0,0,0);return true}
 if(a){if(P.tw==null||m.twid!==P.tw||m.relT==null)return false;const u=P.t-P.tw;
  if(u<m.relT){if(!m.bv)return false;qbBallW(m,B.position);qbBallR(m,B);B.visible=!fp;return true}
  const f=Math.min(1,(u-m.relT)/Math.max(.05,a.T-m.relT)),d=(1-f)*(1-f);B.position.set(a.x0+(a.lx-a.x0)*f-26.5,1.6+.9*(1-f)*(1-f)+Math.sin(Math.PI*f)*Math.min(6,a.T*5),-(a.y0+(a.ly-a.y0)*f));
  if(m.relP)B.position.add(QA.v.set(m.relP.x-(a.x0-26.5),m.relP.y-2.5,m.relP.z+a.y0).multiplyScalar(d));B.rotation.order='YXZ';B.rotation.set(0,Math.atan2(-(a.lx-a.x0),a.ly-a.y0),performance.now()/50);return true}
 if(c!==q||!m.bv)return false;qbBallW(m,B.position);qbBallR(m,B);
 if(P.t<.22&&!P.handed&&P.ol&&P.ol[2]){const C=P.ol[2],f=P.t/.22;B.position.lerp(QA.w.set(C.x-26.5,.2,-(C.y+.62)),1-qE(f));B.position.y+=Math.sin(Math.PI*f)*.45;B.rotation.set(0,0,P.t*30)}
 B.visible=!fp;return true}
// ---- title screen: Jarsh runs through the full motion; the style rotates (over the top, sidearm, pump fake then throw) ----
let CVS=null;const CVB=[0,0,-46];
function cvSeq(){const K=QKF,tail=[[K.po,2.75],[K.po,3.15],[K.rc,3.6],[K.rdy,4.15],[K.rdy,5.4]];return[
 {rel:2.19,s:[[K.rdy,0],[K.rdy,1.2],[K.lf,1.55],[K.ld,1.85],[K.ld,2.0],[K.st,2.1],[K.rl,2.19],[K.fn,2.45],...tail]},
 {rel:2.13,s:[[K.rdy,0],[K.rdy,1.2],[K.sw,1.5],[K.sl,1.8],[K.sl,1.95],[K.ss,2.04],[K.sr,2.13],[K.sf,2.4],...tail]},
 {rel:2.19,s:[[K.rdy,0],[K.rdy,.85],[K.lf,1.1],[K.ld,1.35],[K.pf,1.55],[K.ld,1.8],[K.ld,2.0],[K.st,2.1],[K.rl,2.19],[K.fn,2.45],...tail]}]}
function coverQB(m,t){if(!CVS)CVS=cvSeq();const n=Math.floor(t/5.4),u=t-n*5.4,V=CVS[n%3],head=PL.cry+.2;
 if(u>=V.rel&&PL.fbN!==n){PL.fbN=n;qkSeq(QK0,V.s,V.rel);qbApply(m,1,QK0,head,CVB,1);PL.fbS=qbBallW(m).toArray()}
 qkSeq(QK0,V.s,u);qbApply(m,1,QK0,head,CVB,1);{const bw=u<1.2?1:u<1.5?1-(u-1.2)/.3:u>4.15?Math.min(1,(u-4.15)/.4):0;m.position.y+=Math.sin(t*2.4)*.012*bw}
 const cb=PL.cb,fly=u>=V.rel&&u<V.rel+1.6;cb.visible=m.bv&&!(u>=V.rel&&u<3.9);if(cb.visible){cb.position.copy(m.bp);cb.rotation.order='YXZ';cb.rotation.set(m.bpch,-m.btw,0);const sc=u>=3.9&&u<4.2?.35+.65*qE((u-3.9)/.3):1;cb.scale.setScalar(sc)}
 if(fly&&PL.fbS){const f=u-V.rel,d=[-Math.sin(head),-Math.cos(head)],S0=PL.fbS;PL.fb.visible=true;PL.fb.position.set(S0[0]+d[0]*f*28,S0[1]+f*7-f*f*4.6,S0[2]+d[1]*f*28);PL.fb.rotation.set(0,head,t*25);PL.fb.scale.setScalar(f>1.35?Math.max(.01,1-(f-1.35)/.25):1)}else PL.fb.visible=false}
// ---- practice field behind the career screens: the QB throws to the receiver on a loop ----
let PRS=null;const PRB=[0,0,-46];
function practQB(t){const q=PL.q,c=t%2.4,n=Math.floor(t/2.4),w=PL.w,hd=.66,K=QKF;if(!PRS)PRS=[[K.ld,0],[K.st,.06],[K.rl,.11],[K.fn,.33],[K.po,.75],[K.po,.95],[K.rc,1.3],[K.rdy,1.6],[K.rdy,1.75],[K.lf,2.02],[K.ld,2.25],[K.ld,2.4]];
 if(c>=.11&&PL.prN!==n){PL.prN=n;qkSeq(QK0,PRS,.11);qbApply(q,1,QK0,hd,PRB,1);PL.prS=qbBallW(q,PL.prS||QV())}
 qkSeq(QK0,PRS,c);qbApply(q,1,QK0,hd,PRB,1);const b=PL.b;
 if(c>=.11&&c<1.71&&PL.prS){const f=(c-.11)/1.6,S0=PL.prS;b.visible=true;b.position.set(S0.x+(w.position.x-S0.x)*f,S0.y+(2.1-S0.y)*f+Math.sin(Math.PI*f)*3,S0.z+(w.position.z-S0.z)*f);b.rotation.set(0,hd,t*20)}
 else if(q.bv){b.visible=true;qbBallW(q,b.position);qbBallR(q,b)}else b.visible=false}
// ---- combine throwing drill ----
const QCB=[0,0,-30];
function qbCmb(m,ia,C,wr,tw){const hd=Math.atan2(-wr.position.x,-(wr.position.z+30));
 if(tw==null){qkMix(QK0,QKF.rdy,QKF.rdy,0);qbApply(m,ia,QK0,hd,QCB,1)}
 else{const id=C.ti+':'+C.thr.n;if(m.twid!==id){m.twid=id;m.k0=Float32Array.from(m.qk||QKF.rdy);m.tv=R()<.3?'side':'quick';const V=QSQ[m.tv];m.seq=V.s(m.k0);m.relT=V.rel;m.cmh=hd}
  const end=m.seq[m.seq.length-1][1];if(tw<end)qkSeq(QK0,m.seq,tw);else qkMix(QK0,QKF.po,QKF.po,0);qbApply(m,ia,QK0,m.cmh,QCB,1)}
 if(C.hb.visible&&m.bv){C.hb.position.copy(m.bp);C.hb.rotation.order='YXZ';C.hb.rotation.set(m.bpch,-m.btw,0)}}
