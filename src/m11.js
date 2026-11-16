// ---------------- game cameras: framed default, flick cam (left / middle / right), first person ----------------
let CZ=1,FLK=(()=>{try{const v=localStorage.getItem('fm_flk');return v==null?-1:+v}catch(e){return -1}})(),FLKV=null;
const flk=()=>FLK>=0&&FLK<=2?FLK:(S&&S.hand=='Left'?0:2);
function flkSet(k){FLK=k;try{localStorage.setItem('fm_flk',k)}catch(e){}FLKV=null;flkUI()}
// the L / M / R picker only shows with the flick cam during your own snaps
function flkUI(){const on=!!(g&&g.st&&CAMI==2&&!g.watch&&cv.style.display=='block'),k=on?flk():-1,key=on+':'+k;if(FLKV===key)return;FLKV=key;let e=$('#flk');
if(!e){e=document.createElement('div');e.id='flk';document.body.appendChild(e)}e.style.display=on?'flex':'none';if(on)e.innerHTML=['Left','Mid','Right'].map((n,i)=>`<button class="${i==k?'':'g'}" onclick="flkSet(${i})">${n}</button>`).join('')}
// main game camera; returns the field of view
function camGame(qq,qx,por){const asp=W/H;let fv;
if(qq&&CAMI==1){fv=por?92:78;fpCam(qq,qx);return fv}
if(qq&&CAMI==2){fv=por?80:64;const k=flk(),ox=[-1.55,0,1.55][k],up=k==1?.95:0,bk=k==1?5.3:4.6,ly=LY,f=[Math.sin(ly),-Math.cos(ly)],rt=[Math.cos(ly),Math.sin(ly)],px=qx-f[0]*bk+rt[0]*ox,pz=-qq.y-f[1]*bk+rt[1]*ox,py=4.3+up,lp=LP-.18-(k==1?.06:0),cp=Math.cos(lp);
 cm.position.set(px,py,pz);cm.lookAt(px+f[0]*cp*30,py+Math.sin(lp)*30,pz+f[1]*cp*30);return fv}
if(CAMI==5){fv=por?60:30;cm.position.set(por?60:72,por?44:27,-cam+(por?4:2));cm.lookAt(0,0,-cam-(por?0:1));return fv}
if(CAMI==4){fv=por?72:52;cm.position.set(fxs*.6,por?22:9,-cam-(por?26:15));cm.lookAt(fxs*.6,0,-cam+10);return fv}
if(CAMI==3){fv=por?75:48;cm.position.set(fxs*.4,24,-cam+16);cm.lookAt(fxs*.4,0,-cam-12);return fv}
// behind the QB: pulled back and raised so both wideouts and the routes downfield stay on screen while you read the defense; it eases in closer once someone is running with the ball
const P=g&&g.pl,wide=!P||g.ph=='pre'||P.air||(P.car===P.qb&&!(P.call&&P.call.t=='run'))||!P.car;CZ+=((wide?1:.6)-CZ)*.05;
if(por){fv=76;const hf=Math.atan(Math.tan(fv*Math.PI/360)*asp),D=cl(22/Math.tan(hf),30,72)*CZ,pt=.9-(1-CZ)*.35,fz=-cam-9*CZ,fx=fxs*(.45+(1-CZ));cm.position.set(fx,Math.sin(pt)*D,fz+Math.cos(pt)*D);cm.lookAt(fx,0,fz)}
else{fv=50;const hf=Math.atan(Math.tan(fv*Math.PI/360)*asp),D=cl(28/Math.tan(hf),20,44)*(.45+.55*CZ),pt=.6-(1-CZ)*.15,fz=-cam-8*CZ,fx=fxs*(.55+(1-CZ)*.8);cm.position.set(fx,Math.sin(pt)*D+1.5,fz+Math.cos(pt)*D);cm.lookAt(fx,0,fz)}
return fv}
// first person: eye height above the linemen, a little head bob and sway when you move, you go down when you get hit
const FPS={b:0,fall:0,snap:null};
function fpCam(q,qx){const t=performance.now()/1000,P=g.pl,v=Math.hypot(q.vx||0,q.vy||0),mv=Math.min(1,v/5);
const hit=(g.ph=='dead'||g.ph=='wdead')&&P&&P.car===q&&!(g.out&&g.out.k=='td');FPS.fall+=((hit?1:0)-FPS.fall)*Math.min(1,(hit?7:3)*(1/60));
const bob=mv>.05?Math.abs(Math.sin(t*10.5))*.075*mv:Math.sin(t*1.7)*.012,sw=mv>.05?Math.sin(t*5.25)*.055*mv:0,ey=3.7+bob-FPS.fall*2.3,ly=LY,lp=LP-.05+FPS.fall*.5,cp=Math.cos(lp),
px=qx+sw*Math.cos(ly),pz=-q.y-.25+sw*Math.sin(ly);cm.position.set(px,ey,pz);cm.lookAt(px+Math.sin(ly)*cp*30,ey+Math.sin(lp)*30,pz-Math.cos(ly)*cp*30);const roll=sw*.35+FPS.fall*.55;if(roll)cm.rotateZ(roll)}

// ---------------- first-person hands and ball ----------------
let FPB=null;
function fpHand(c1,c2,sk,glove,lefty){const H=new T3.Group(),hc=glove||sk;bx(.17,.07,.19,hc,0,0,0,H);[-.06,-.02,.02,.06].forEach((x,i)=>{const f=bx(.036,.045,.12,hc,x,.005,-.14+(i==0||i==3?.015:0),H);f.castShadow=false});
const th=bx(.045,.045,.11,hc,lefty?-.1:.1,.015,-.05,H);th.rotation.y=lefty?-.5:.5;bx(.15,.14,.06,glove?c2:0xf2f2f2,0,-.02,.1,H);bx(.13,.12,.42,sk,0,-.03,.34,H);bx(.2,.19,.34,c1,0,-.03,.7,H);bx(.205,.05,.345,c2,0,.07,.7,H);
H.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false}});mrg(H);H.scale.setScalar(.72);return H}
function fpBall(){const B=new T3.Group();bx(.17,.17,.28,0x7a3f17,0,0,0,B);bx(.12,.12,.06,0x6b3512,0,0,-.17,B);bx(.12,.12,.06,0x6b3512,0,0,.17,B);bx(.03,.012,.15,0xffffff,0,.09,0,B);[-.05,-.017,.017,.05].forEach(z=>bx(.06,.012,.014,0xffffff,0,.09,z,B));[-.12,.12].forEach(z=>bx(.175,.02,.02,0xf2f2f2,0,0,z,B));B.traverse(o=>{if(o.isMesh)o.castShadow=false});mrg(B);B.scale.setScalar(.8);return B}
function fpBuild(j){if(!FPA){FPA=new T3.Group();cm.add(FPA);if(!cm.parent)scn.add(cm)}dsp(FPA);clr(FPA);const sk=SK[S.ap?S.ap.sk:1],lefty=S.hand=='Left',c1=j.c1,c2=j.c2||'#ffffff';
FPA.R=fpHand(c1,c2,sk,null,lefty);FPA.Lh=fpHand(c1,c2,sk,0x1b1b1b,!lefty);FPA.add(FPA.R,FPA.Lh);FPA.ball=fpBall();FPA.add(FPA.ball);FPA.A=[FPA.Lh,FPA.R];FPA.visible=false;FPA.st={};
// your own chest and legs, so looking down feels like standing in the pocket
if(FPB&&FPB.parent)FPB.parent.remove(FPB);FPB=new T3.Group();const pc=j.pc||'#f2f2f2';bx(.8,.8,.5,c1,0,1.5,0,FPB);bx(1.12,.3,.6,c1,0,1.8,0,FPB);bx(1.14,.06,.62,0xffffff,0,1.96,0,FPB);if(j.d==1)bx(.22,.82,.52,c2,0,1.5,0,FPB);
FPB.L=[-.2,.2].map(x=>{const l=new T3.Group();l.position.set(x,1.05,0);bx(.34,1.05,.4,pc,0,-.52,0,l);bx(.4,.14,.56,0x222222,0,-1,.06,l);FPB.add(l);return l});mrgM(FPB);FPB.scale.set(1.1,1.1,1.1);FPB.rotation.order='YXZ';FPB.traverse(o=>{if(o.isMesh)o.castShadow=false});FPB.visible=false;scn.add(FPB)}
// target poses in camera space: [x,y,z, rx,ry,rz]  (hand: palm up at rest, fingers forward, forearm runs back toward you)
const FPP={
 ready:{R:[.1,-.37,-.72,.8,0,-.15],L:[-.1,-.37,-.72,.8,0,.15]},
 hold:{R:[.088,-.33,-.6,.55,0,1.35],L:[-.082,-.315,-.63,.55,0,-1.35],B:[0,-.3,-.62,-.45,.25,0]},
 tuck:{R:[.19,-.47,-.47,.75,0,1.4],L:[-.2,-.5,-.55,.95,0,-.3],B:[.15,-.45,-.48,-.15,.1,0]},
 aim:{R:[.155,-.11,-.42,.9,.15,3],L:[-.12,-.24,-.86,.35,-.2,-1.1],B:[.15,-.05,-.5,-1,.15,0]},
 rel:{R:[.075,-.1,-.86,.55,0,2.4],L:[-.2,-.46,-.46,.9,0,-.3],B:[.075,-.04,-.97,.2,0,0]},
 fin:{R:[-.13,-.48,-.6,1,0,2.9],L:[-.25,-.55,-.38,1,0,-.4]},
 empty:{R:[.2,-.6,-.5,1.1,0,.5],L:[-.2,-.6,-.5,1.1,0,-.5]},
 hand:{R:[.18,-.36,-.62,.6,-.5,1.4],L:[.05,-.34,-.66,.6,-.3,-1.3],B:[.21,-.33,-.64,-.3,.5,0]}};
const fpL=(a,b,f)=>a.map((v,i)=>v+(b[i]-v)*f),fpE=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
function fpSet(o,p,k,mir){const x=mir?-p[0]:p[0],ry=mir?-p[4]:p[4],rz=mir?-p[5]:p[5],y=p[1]+(W<H?0:.075);if(k>=1){o.position.set(x,y,p[2]);o.rotation.set(p[3],ry,rz)}else{o.position.x+=(x-o.position.x)*k;o.position.y+=(y-o.position.y)*k;o.position.z+=(p[2]-o.position.z)*k;o.rotation.x+=(p[3]-o.rotation.x)*k;o.rotation.y+=(ry-o.rotation.y)*k;o.rotation.z+=(rz-o.rotation.z)*k}}
function fpArms(P){if(!FPA||!FPA.R)return;const on=CAMI==1&&g&&g.pl&&!g.sw&&cv.style.display=='block';FPA.visible=!!on;if(FPB)FPB.visible=!!on&&!!(g.pl&&g.pl.qb);if(!on)return;
const q=P.qb,t=performance.now()/1000,dt=Math.min(.05,t-(FPA.lt||t))||.016;FPA.lt=t;const mir=S.hand=='Left',v=Math.hypot(q.vx||0,q.vy||0),mv=Math.min(1,v/5),has=P.car===q&&!P.air;
if(P.tw!=null&&(FPA.twP!==P||FPA.twV!==P.tw)){FPA.twP=P;FPA.twV=P.tw;FPA.tws=t}const tw=P.tw==null||FPA.twP!==P?null:t-FPA.tws,mg=aim&&has?Math.min(1,Math.hypot(aim.px,aim.py)/(Math.min(W,H)*.36)):0;
let R=FPP.empty.R,L=FPP.empty.L,B=null,k=Math.min(1,dt*14),ball=false;
if(FPA.force){({R,L,B,ball}=FPA.force);k=1}
else if(g.ph=='pre'){R=FPP.ready.R;L=FPP.ready.L}
else if(tw!=null&&tw<.75&&!P.wf){const a=FPP.aim,r=FPP.rel,f=FPP.fin;if(tw<.12){const u=fpE(tw/.12);R=fpL(a.R,r.R,u);L=fpL(a.L,r.L,u);B=fpL(a.B,r.B,u);ball=tw<.07}else{const u=fpE((tw-.12)/.42);R=fpL(r.R,f.R,u);L=fpL(r.L,f.L,u)}k=1}
else if(P.spk){R=FPP.fin.R;L=FPP.fin.L}
else if(P.call&&P.call.t=='run'&&P.car!==q&&P.t<(P.hd||.5)+.45){R=FPP.hand.R;L=FPP.hand.L}
else if(has){const st=P.t<.22&&!P.handed?P.t/.22:1;if(st<1){ball=true;const h=FPP.hold.B,e=fpE(st);B=[h[0]*e,-1.3+(h[1]+1.3)*e,-4.5+(h[2]+4.5)*e,h[3],h[4],P.t*30];R=fpL(FPP.ready.R,FPP.hold.R,e);L=fpL(FPP.ready.L,FPP.hold.L,e);k=1}
 else if(mg>0){const h=mv>.6?FPP.tuck:FPP.hold,a=FPP.aim,u=fpE(Math.min(1,mg*1.2));R=fpL(h.R,a.R,u);L=fpL(h.L,a.L,u);B=fpL(h.B,a.B,u);ball=true}
 else{const h=mv>.6?FPP.tuck:FPP.hold;R=h.R.slice();L=h.L.slice();B=h.B.slice();ball=true;if(mv>.6){const s=Math.sin(t*10.5);L[1]+=s*.06;L[2]+=Math.cos(t*10.5)*.07}}}
const bb=mv>.05?Math.abs(Math.sin(t*10.5))*.02*mv:Math.sin(t*1.7)*.005;fpSet(FPA.R,R,k,mir);fpSet(FPA.Lh,L,k,mir);FPA.R.position.y+=bb;FPA.Lh.position.y+=bb;
FPA.ball.visible=!!ball;if(ball&&B){fpSet(FPA.ball,B,k,mir);FPA.ball.position.y+=bb}
if(FPB&&FPB.visible){FPB.position.set(q.x-26.5,0,-q.y);FPB.rotation.y=-LY;const s=Math.sin(t*10.5)*mv;FPB.L[0].rotation.x=s*.9;FPB.L[1].rotation.x=-s*.9}}

// ---------------- linemen get down in their stance (so you can see over them from the pocket) ----------------
const LNP={LT:1,LG:1,C:1,RG:1,RT:1,DE:1,DT:1};
function lnSt(o,m,v){if(!LNP[o.pos]||!g||g.ph=='dead'||g.ph=='wdead')return;const pre=g.ph=='pre',k=pre?1:v>2.6?.5:.9,dl=o.pos=='DE'||o.pos=='DT';m.rotation.x-=(pre&&dl?.85:.7)*k;m.position.y-=(pre?.4:.32)*k;
if(pre){m.A[0].rotation.x=m.A[1].rotation.x=dl?.35:.25;if(dl){m.A[1].rotation.x=-.1}}else if(v<2.6){const s=Math.sin(performance.now()/90+o.x)*.25;m.A[0].rotation.x=1.25+s;m.A[1].rotation.x=1.25-s}}
// spike: offered inside the play-call card, and as the floating button only once the play is called
const spkOk=()=>!!(g&&g.cr&&g.dn<4&&!g.two&&!g.ot&&g.ph=='pre'&&g.tk&&g.pl);
