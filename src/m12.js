// ---------------- Gatorade bath, the team celebrating, and the trophy stage going up piece by piece ----------------
const GBM={};
function gbBucket(){const B=new T3.Group(),o=new T3.Mesh(new T3.CylinderGeometry(.44,.36,.8,12,1,true),new T3.MeshLambertMaterial({color:0xff7a00,side:T3.DoubleSide}));o.position.y=.4;B.add(o);
const bt=new T3.Mesh(new T3.CircleGeometry(.36,12),new T3.MeshLambertMaterial({color:0xff7a00}));bt.rotation.x=Math.PI/2;bt.position.y=.01;B.add(bt);
const rim=new T3.Mesh(new T3.CylinderGeometry(.46,.46,.09,12,1,true),new T3.MeshLambertMaterial({color:0xffffff,side:T3.DoubleSide}));rim.position.y=.78;B.add(rim);
const lq=new T3.Mesh(new T3.CircleGeometry(.41,12),new T3.MeshLambertMaterial({color:0xffa31a}));lq.rotation.x=-Math.PI/2;lq.position.y=.7;B.add(lq);B.lq=lq;
bx(.34,.2,.02,0xffffff,0,.42,.43,B);[-1,1].forEach(s=>bx(.06,.06,.3,0x333333,s*.47,.6,0,B));B.traverse(m=>{if(m.isMesh)m.castShadow=true});return B}
// liquid + ice: one instanced mesh
function gbDrops(n){const D=new T3.InstancedMesh(new T3.BoxGeometry(.13,.13,.13),new T3.MeshLambertMaterial({}),n),c=new T3.Color();D.ps=[];for(let i=0;i<n;i++){const ice=i%6==0;c.set(ice?'#e8f6ff':i%5==0?'#ffd23f':'#ff8a00');if(D.setColorAt)D.setColorAt(i,c);D.ps.push({on:0,ice})}D.dm=new T3.Object3D();D.frustumCulled=false;D.n=0;PL.add(D);gbDropUpd(D,0);return D}
function gbEmit(D,x,y,z,vx,vy,vz,spr){const p=D.ps[D.n%D.ps.length];D.n++;Object.assign(p,{on:1,x,y,z,vx:vx+(Math.random()-.5)*spr,vy:vy+(Math.random()-.5)*spr*.5,vz:vz+(Math.random()-.5)*spr,l:0,s:p.ice?1:.7+Math.random()*.6})}
function gbDropUpd(D,dt,co){const d=D.dm;D.ps.forEach((p,i)=>{if(p.on){p.l+=dt;p.vy-=14*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
 if(co&&p.y<2.9&&p.y>.6&&Math.hypot(p.x-co.x,p.z-co.z)<.55&&p.vy<0){const a=Math.atan2(p.z-co.z,p.x-co.x)+(Math.random()-.5);p.vx=Math.cos(a)*2.4;p.vz=Math.sin(a)*2.4;p.vy*=.15}
 if(p.y<.07){p.y=.07;p.vy=0;p.vx*=.8;p.vz*=.8;p.s*=.92;if(p.s<.08)p.on=0}if(p.l>4)p.on=0}
 d.position.set(p.x||0,p.on?p.y:-50,p.z||0);d.scale.setScalar(p.on?p.s:.001);d.rotation.set(p.l*7,p.l*5,0);d.updateMatrix();D.setMatrixAt(i,d.matrix)});if(D.instanceMatrix)D.instanceMatrix.needsUpdate=true}
const gbE=x=>x<=0?0:x>=1?1:x*x*(3-2*x),gbV=(a,b,f)=>[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f];
function gbStart(ch){const L=LR;if(!L||L.gb||!L.field)return;ovHide();const co=L.O.find(o=>o.k=='fcoach');if(!co||!co.m)return;g.fw.gat=1;const T=S.T[0],R0=rost('h.0'),C={x:-7,z:-47},tj={c1:T.c1,c2:T.c2,d:T.d||0,pc:S.jy.pc||'#e8e8e8',nc:lum(T.c1)>.5?'#000':'#fff'};
co.x=C.x;co.z=C.z;co.m.position.set(C.x,0,C.z);co.m.rotation.set(0,-Math.PI/2,0);
const big=(i,s)=>{const x=R0[i]||{n:'Big Man',num:70+i},m=mk3(tj,1.27,0,{nm:x.n.split(' ').pop().toUpperCase(),num:x.num},{sk:(i*5)%6,hr:i%5,hcl:'#1b1b1b',fh:i%3,ht:1,bd:2},1);m.position.set(C.x-6.5,0,C.z+s*.8);m.rotation.y=-Math.PI/2;PL.add(m);return m};
const b1=big(6,-1),b2=big(9,1),bk=gbBucket();PL.add(bk);
// the team gathers in front of coach, trying not to give it away
const ring=L.O.filter(o=>o.k=='fmate'),sp=[[3.6,-1.9],[4.5,-.5],[3.7,1.1],[5.4,-1.4],[5.4,.6]];ring.forEach((o,i)=>{const s=sp[i%sp.length];o.x=C.x+s[0];o.z=C.z+s[1];if(o.m){o.m.position.set(o.x,0,o.z);o.m.rotation.y=Math.PI/2}o.act='cel';o.cm=['jump','wave','jump','clap','dance'][i%5]});
L.p.x=C.x+2.7;L.p.z=C.z-.3;L.p.ry=Math.PI/2;const hid=[];PL.traverse(o=>{if(o.isSprite&&o.visible){o.visible=false;hid.push(o)}});
L.gb={t:0,ch:!!ch,co,b1,b2,bk,C,D:gbDrops(150),cap:'',hid};L.near=null;['#lra'].forEach(s=>{const e=$(s);if(e)e.innerHTML=''});const tp=$('#lrw .top');if(tp)tp.style.display='none';const hh=$('#lrh');if(hh)hh.style.display='none';
$('#lrcap').innerHTML=`<div id=gbx style="position:absolute;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 10px);text-align:center;font:700 22px VT323,monospace;color:#fff;text-shadow:2px 2px #000;background:#0008;padding:8px;pointer-events:none"></div><button id=gbk onclick=gbEnd() style="position:absolute;right:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);width:auto;margin:0;pointer-events:auto">Skip ⏭</button>`}
function gbTick(dt){const L=LR,G=L.gb;if(!G)return;G.t+=dt;const t=G.t,C=G.C,co=G.co.m,b1=G.b1,b2=G.b2,bk=G.bk,now=performance.now()/1000,por=W<H;
const walk=(m,ph)=>{const s=Math.sin(now*9+ph);m.L[0].rotation.x=s*.5;m.L[1].rotation.x=-s*.5},still=m=>{m.L[0].rotation.x=m.L[1].rotation.x=0};
// carriers sneak up (crouched), lift, tip, then drop the bucket and celebrate
[b1,b2].forEach((m,i)=>{const s=i?1:-1;m.rotation.set(0,-Math.PI/2,0);m.A[0].rotation.z=m.A[1].rotation.z=0;
 if(t<2.2){const f=gbE(t/2.2);m.position.set(C.x-6.5+5.3*f,0,C.z+s*.8);m.rotation.x=-.32;walk(m,i*1.7);m.A[0].rotation.x=m.A[1].rotation.x=.85;m.A[0].rotation.z=.35*-s;m.A[1].rotation.z=.35*-s}
 else if(t<3.7){const f=gbE((t-2.2)/.6);m.position.set(C.x-1.2,0,C.z+s*.8);m.rotation.x=-.32*(1-f);still(m);m.A[0].rotation.x=m.A[1].rotation.x=.85+2.1*f;if(t>2.9){m.rotation.x=-.25*gbE((t-2.9)/.5)}}
 else{const u=t-3.7,j=Math.abs(Math.sin(u*6+i));m.position.set(C.x-1.2+Math.min(.5,u*.6),j*.75,C.z+s*.8);m.rotation.x=0;m.A[0].rotation.x=m.A[1].rotation.x=2.9+Math.sin(u*9+i)*.15;m.L[0].rotation.x=j*.5;m.L[1].rotation.x=-j*.3}});
// bucket: carried at the hip, raised over coach, tipped onto him, then dropped
const mid=[(b1.position.x+b2.position.x)/2,0,C.z];let bp,brz=0,brx=0;
if(t<2.2)bp=[mid[0]+.75,1.05,mid[2]];else if(t<2.8){const f=gbE((t-2.2)/.6);bp=gbV([C.x-.45,1.05,C.z],[C.x-.7,3.55,C.z],f)}else if(t<3.7){const f=gbE((t-2.8)/.45);bp=[C.x-.7+.25*f,3.55+.15*f,C.z];brz=-2.35*f}
else{const u=Math.min(1,(t-3.7)/.55);bp=[C.x-1.6-u*.6,Math.max(.42,3.7-u*u*3.4),C.z-.9*u];brz=-2.35-u*.5;brx=u*1.2}
bk.position.set(bp[0],bp[1],bp[2]);bk.rotation.set(brx,0,brz);bk.lq.visible=t<3.35;
// the pour: liquid + ice out of the mouth of the bucket
if(t>2.95&&t<3.6){const n=Math.round(dt*240);for(let i=0;i<n;i++){const a=bk.rotation.z,mx=bp[0]-Math.sin(a)*.8,my=bp[1]+Math.cos(a)*.8;gbEmit(G.D,mx,my,bp[2]+(Math.random()-.5)*.5,1.2,-.6,0,1.1)}}
if(t>3.4&&t<6.6&&Math.random()<dt*14)gbEmit(G.D,C.x+(Math.random()-.5)*.6,2.3,C.z+(Math.random()-.5)*.6,0,-.5,0,.4);
gbDropUpd(G.D,dt,{x:C.x,z:C.z});
// coach: watching the game, gets drenched, turns around and laughs it off
co.position.set(C.x,0,C.z);co.rotation.set(0,-Math.PI/2,0);still(co);
if(t<3)co.A[0].rotation.x=co.A[1].rotation.x=t>2.75?.25:.1+Math.sin(now*2)*.05;
else if(t<3.75){const f=gbE((t-3)/.25);co.A[0].rotation.x=co.A[1].rotation.x=2.6*f;co.A[0].rotation.z=-.5*f;co.A[1].rotation.z=.5*f;co.rotation.x=-.35*f;co.position.y=Math.abs(Math.sin((t-3)*14))*.15}
else{const u=t-3.75,f=gbE(u/.5),j=Math.abs(Math.sin(u*5.5));co.rotation.y=-Math.PI/2+Math.PI*f;co.rotation.x=.15;co.position.y=j*.55*Math.min(1,u);co.A[0].rotation.x=co.A[1].rotation.x=2.9+Math.sin(u*8)*.2;co.A[0].rotation.z=co.A[1].rotation.z=0}
// the team: trying not to laugh, then going crazy
L.O.forEach((o,i)=>{if(o.act!='cel'||!o.m)return;if(t<2.95){o.m.position.set(o.x,0,o.z);o.m.rotation.set(0,Math.PI/2,0);const s=Math.sin(now*3+i);o.m.A[0].rotation.x=i%2?2.3+s*.1:.2;o.m.A[1].rotation.x=i%2?.2:2.1+s*.1;o.m.L[0].rotation.x=o.m.L[1].rotation.x=0}else celO(o,L.p,now)});
const pm=L.pm;pm.position.set(L.p.x,0,L.p.z);pm.rotation.set(0,Math.PI/2,0);if(t>2.95){const j=Math.abs(Math.sin(now*5.5+1));pm.position.y=j*.7;pm.A[0].rotation.x=pm.A[1].rotation.x=2.9;pm.L[0].rotation.x=j*.4;pm.L[1].rotation.x=-j*.3}else{pm.A[0].rotation.x=2.3;pm.A[1].rotation.x=.15;pm.L[0].rotation.x=pm.L[1].rotation.x=0}
// camera: in on coach, the pour up close, a quick orbit, then wide on the whole team
const kk=por?1.6:1,c0=[C.x+2.2*kk,2.3+(kk-1)*1.2,C.z+7.4*kk],l0=[C.x-1.1+(kk-1)*1.5,1.6,C.z],c1=[C.x+1.3*kk,2.7+(kk-1),C.z+4.4*kk],l1=[C.x-.45+(kk-1),2.3,C.z];let cp,lk;
if(t<2.2){cp=c0;lk=l0}else if(t<3.6){const f=gbE((t-2.2)/1.2);cp=gbV(c0,c1,f);lk=gbV(l0,l1,f)}else if(t<5.3){const a=.28-((t-3.6)/1.7)*.75,r=por?8.8:5.4;cp=[C.x+Math.sin(a)*r,2.7,C.z+Math.cos(a)*r];lk=[C.x+.4,1.9,C.z]}else{const f=gbE((t-5.3)/1.4),a=-.47,r=por?8.8:5.4,s=[C.x+Math.sin(a)*r,2.7,C.z+Math.cos(a)*r];cp=gbV(s,por?[C.x+3,10,C.z+19]:[C.x+3,7.2,C.z+13],f);lk=gbV([C.x+.4,1.9,C.z],[C.x+2,1,C.z],f)}
cm.fov=por?68:50;cm.position.set(cp[0],cp[1],cp[2]);cm.lookAt(lk[0],lk[1],lk[2]);
const cap=t<2.2?'Shhh... the linemen sneak up with the Gatorade bucket':t<2.95?'Here it comes...':t<5.3?'💦 GATORADE BATH! '+CNM()+' gets soaked!':(G.ch?'CHAMPIONS!':'What a win!');if(cap!=G.cap){G.cap=cap;const e=$('#gbx');if(e)e.textContent=cap}
if(t>=7.1)gbEnd()}
function gbEnd(){const L=LR,G=L&&L.gb;if(!G)return;L.gb=null;const C=G.C,co=G.co;
if(G.D){G.D.ps.forEach(p=>p.on=0);gbDropUpd(G.D,0);if(G.D.parent)G.D.parent.remove(G.D)}
G.bk.position.set(C.x-2.2,.42,C.z-.9);G.bk.rotation.set(1.57,0,-.4);G.bk.lq.visible=false;
[G.b1,G.b2].forEach((m,i)=>{m.position.set(C.x-1.4,0,C.z+(i?1.6:-1.6));(L.cel=L.cel||[]).push({m,cm:'jump',x:C.x-1.4,z:C.z+(i?1.6:-1.6),ph:i*1.3})});
co.act='cel';co.cm='wave';co.wet=1;co.m.rotation.set(0,Math.PI/2,0);co.m.position.y=0;
L.cpos={x:cm.position.x,y:cm.position.y,z:cm.position.z};(G.hid||[]).forEach(o=>o.visible=true);const tp=$('#lrw .top');if(tp)tp.style.display='flex';const hh=$('#lrh');if(hh)hh.style.display='block';$('#lrcap').innerHTML='';if(L.sb){L.sb.last=L.sb.t;sbHint()}
if(!g.fw.gatR){g.fw.gatR=1;const ok=G.ch||Math.random()<.75;S.pop=cl((S.pop||40)+3+(G.ch?2:0),0,100);S.trust=cl((S.trust||50)+(ok?(G.ch?2:1):-1),0,100);save();lrStat();
 talk('coach',CNM(),G.ch?'Soaked in orange and grinning ear to ear. "CHAMPIONS, baby! Go find your family. The crew is setting up the stage."':ok?'Soaked and smiling. "You got me, kid!"':'Soaked. "You are running extra sprints Monday."',ok?'happy':'angry',[[G.ch?"Let's celebrate!":'Worth it','ovHide()']],'Fans + · coach trust '+(ok?'+'+(G.ch?2:1):'-1'))}}
function fwGat(){if(!LR||LR.gb||!LR.field)return;gbStart(LR.champ?1:0)}
// ---- teammates celebrating around the field ----
function celSpawn(){const L=LR;if(!L||L.cel&&L.cel.length>2)return;const T=S.T[0],R0=rost('h.0'),tj={c1:T.c1,c2:T.c2,d:T.d||0,pc:S.jy.pc||'#e8e8e8',nc:lum(T.c1)>.5?'#000':'#fff'};L.cel=L.cel||[];
const spots=[[-11.5,-41,'hug',0],[-11.5,-41,'hug',1],[11,-44,'bump',0],[11,-44,'bump',1],[-15,-52,'jump'],[14.5,-51,'jump'],[7,-39,'dance'],[-1,-35.5,'wave'],[16.5,-40,'hug',0],[16.5,-40,'hug',1]];
spots.forEach(([x,z,cm_,side],i)=>{const r=R0[12+i]||R0[4+(i%6)]||{n:'Teammate',num:40+i},m=mk3(tj,1.2,0,{nm:r.n.split(' ').pop().toUpperCase(),num:r.num},{sk:(i*7)%6,hr:(i+2)%6,hcl:'#1b1b1b',fh:i%4,ht:1,bd:i%3==0?2:1},1);PL.add(m);m.position.set(x,0,z);L.cel.push({m,cm:cm_,x,z,side:side||0,ph:i*.9})})}
function celPose(m,cm_,t,ph,side){m.rotation.x=0;m.rotation.z=0;m.A[0].rotation.z=m.A[1].rotation.z=0;m.L[0].rotation.x=m.L[1].rotation.x=0;let y=0;
if(cm_=='jump'){const j=Math.abs(Math.sin(t*5.5+ph));y=j*.8;m.A[0].rotation.x=m.A[1].rotation.x=2.9+Math.sin(t*9+ph)*.15;m.L[0].rotation.x=j*.5;m.L[1].rotation.x=-j*.3}
else if(cm_=='wave'){y=Math.abs(Math.sin(t*4+ph))*.18;m.A[1].rotation.x=3;m.A[1].rotation.z=Math.sin(t*8+ph)*.45;m.A[0].rotation.x=.3}
else if(cm_=='dance'){y=Math.abs(Math.sin(t*6+ph))*.15;const s=Math.sin(t*3+ph);m.rotation.z=s*.12;m.A[0].rotation.x=1.6+s*1.2;m.A[1].rotation.x=1.6-s*1.2;m.L[0].rotation.x=Math.max(0,s)*.5;m.L[1].rotation.x=Math.max(0,-s)*.5}
else if(cm_=='clap'){const s=Math.abs(Math.sin(t*9+ph));m.A[0].rotation.x=m.A[1].rotation.x=1.25;m.A[0].rotation.z=-.5*s;m.A[1].rotation.z=.5*s;y=Math.abs(Math.sin(t*3+ph))*.05}
else if(cm_=='hug'){m.A[0].rotation.x=m.A[1].rotation.x=1.45;m.A[0].rotation.z=-.62;m.A[1].rotation.z=.62;if(Math.sin(t*1.2+ph)>.6)m.A[side?0:1].rotation.x=1.45+Math.sin(t*14)*.22;m.rotation.z=Math.sin(t*2+ph)*.06}
return y}
function celTick(dt){const L=LR;if(!L||!L.cel||L.gb&&L.gb.t<2.95)return;const t=performance.now()/1000;
L.cel.forEach(c=>{const m=c.m;let x=c.x,z=c.z,ry=c.ry==null?Math.PI/2:c.ry,y;
 if(c.cm=='hug'){x=c.x+(c.side?.45:-.45);ry=c.side?Math.PI/2:-Math.PI/2;y=celPose(m,'hug',t,c.ph,c.side)}
 else if(c.cm=='bump'){const u=((t+c.ph*0)%2.4)/2.4,d=u<.4?2.4-(u/.4)*1.9:u<.55?.5:.5+((u-.55)/.45)*1.9,s=c.side?1:-1;x=c.x+s*d/2;ry=c.side?Math.PI/2:-Math.PI/2;const air=u>.33&&u<.58;y=air?Math.sin((u-.33)/.25*Math.PI)*.9:0;m.rotation.x=0;m.rotation.z=0;m.A[0].rotation.z=m.A[1].rotation.z=0;m.A[0].rotation.x=m.A[1].rotation.x=air?3:1+Math.sin(t*8)*.3;const w=Math.sin(t*9.5);m.L[0].rotation.x=air?.5:u<.4||u>.6?w*.6:0;m.L[1].rotation.x=air?-.3:u<.4||u>.6?-w*.6:0}
 else y=celPose(m,c.cm,t,c.ph,c.side);
 if(L.p&&Math.hypot(L.p.x-x,L.p.z-z)<4&&c.cm!='hug'&&c.cm!='bump')ry=Math.atan2(-(L.p.x-x),-(L.p.z-z));m.position.set(x,y,z);m.rotation.y=ry})}
// interactable people (teammates, family, coach) celebrate too, and face you when you walk up
function celO(o,p,t){const m=o.m,d=Math.hypot(p.x-o.x,p.z-o.z);const y=celPose(m,d<3.2&&o.cm!='clap'?'wave':o.cm,t,(o.ri||0)*.7+o.x,0);m.position.set(o.x,y,o.z);if(d<6){let a=Math.atan2(-(p.x-o.x),-(p.z-o.z))-m.rotation.y;a=Math.atan2(Math.sin(a),Math.cos(a));m.rotation.y+=a*.15}}

// ---- the trophy stage: the crew puts it together while you celebrate ----
const SBN=7;
function sbInit(ci){const T=S.T[0],G=new T3.Group();PL.add(G);const part=()=>{const p=new T3.Group();p.visible=false;G.add(p);return p},P=[];let p;
p=part();bx(9.2,.8,4.6,T.c1,0,.4,-58.6,p);bx(9.4,.12,4.8,T.c2,0,.84,-58.6,p);mrg(p);P.push(p);
p=part();bx(3,.55,.7,0x2b2b2b,0,.27,-55.95,p);bx(3,.28,.6,0x2b2b2b,0,.14,-55.35,p);[-4.4,-1.6,1.6,4.4].forEach(x=>bx(.3,.22,.3,0xfff3b0,x,.15,-56.15,p));mrg(p);P.push(p);
p=part();bx(10,4.2,.25,T.c1,0,2.9,-61,p);[-5.3,5.3].forEach(x=>{bx(.35,6.4,.35,0x9aa3ad,x,3.2,-60.7,p);for(let y=.9;y<6.2;y+=1.3)bx(.4,.1,.6,0x9aa3ad,x,y,-60.7,p)});bx(11,.35,.35,0x9aa3ad,0,6.4,-60.7,p);mrg(p);P.push(p);
p=part();const b=lbl(ci.banner,'#ffe93b',1);b.position.set(0,5.8,-60.8);b.scale.set(12,3,1);p.add(b);[-3.7,3.7].forEach(x=>bx(1.3,2.4,.1,T.c2,x,2.5,-60.82,p));[-2.6,2.6].forEach(x=>{const s=bx(.4,.3,.4,0x333333,x,6.1,-60.3,p);s.castShadow=false;bx(.3,.06,.3,0xfff6b0,x,5.94,-60.3,p)});P.push(p);
p=part();bx(.7,1.1,.7,0x222222,0,1.45,-58.2,p);bx(.06,.5,.06,0x111111,.26,2.25,-58.05,p);bx(.1,.1,.14,0x111111,.26,2.5,-58.12,p);P.push(p);
p=part();const tr=new T3.Group();bx(.9,.25,.9,0xb8860b,0,0,0,tr);bx(.25,.8,.25,0xffd700,0,.5,0,tr);bx(.8,.7,.8,0xffd700,0,1.2,0,tr);if(ci.flash==3){bx(.45,.4,.9,0x8b4513,0,1.8,0,tr)}else bx(.95,.12,.95,0xffe36e,0,1.58,0,tr);tr.position.set(0,2.05,-58.2);p.add(tr);P.push(p);
p=part();const pr=mk3({c1:'#1c2541',c2:'#ffffff',d:0,pc:'#1c2541'},null,{sk:2,hr:1,hcl:'#666666',fh:0,ht:1,bd:1},1);pr.scale.set(1.2,1.2,1.2);pr.position.set(0,.85,-59.6);pr.rotation.y=Math.PI;p.add(pr);P.push(p);
const crew=[[-6.2,-57.5],[6.4,-58.8],[-3.5,-62.6]].map(([x,z],i)=>{const m=mk3({c1:'#1b1b1b',c2:'#3a3a3a',d:0,pc:'#2a2a2a'},null,{sk:(i*3+1)%6,hr:(i%2)?1:5,hcl:'#2b1b12',fh:i%3,ht:1,bd:1},1);m.position.set(x,0,z);PL.add(m);const s=lbl('Stage crew');s.position.set(0,3.4,0);s.scale.set(2.6,.65,1);m.add(s);return{m,x,z,hx:x,hz:z}});
return{G,P,n:0,t:0,last:0,ci,tr,pr,crew,an:null}}
function sbHint(){const L=LR,B=L&&L.sb,e=$('#lrh');if(!B||!e)return;e.textContent=B.n>=SBN?'🏆 The stage is ready! Walk to midfield for the trophy ceremony':'CHAMPIONS! Celebrate with your team and family · the crew is building the stage ('+B.n+'/'+SBN+')'}
function sbAdd(){const L=LR,B=L&&L.sb;if(!B||B.n>=SBN)return;const p=B.P[B.n];p.visible=true;B.an={p,t:0};B.n++;B.last=B.t;if(B.n==1)L.walls=[[-4.8,4.8,-61.2,-56.1]];
if(B.n>=SBN){L.st={G:B.G,tr:B.tr,pr:B.pr};const so={k:'fstage',x:0,z:-55.2,n:'Trophy ceremony'};L.O.push(so);L.all.push(so);B.crew.forEach(c=>{c.hx=c.x<0?-12:12;c.hz=-63});
 const e=$('#lrcap');if(e&&!L.cs){e.innerHTML='<div style="position:absolute;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 70px);text-align:center;font:700 22px VT323,monospace;color:#ffe93b;text-shadow:2px 2px #000;background:#0009;padding:8px;pointer-events:none">🏆 The stage is ready! Head to midfield for the trophy.</div>';setTimeout(()=>{if(LR&&!LR.cs&&e.innerHTML.includes('stage is ready'))e.innerHTML=''},4200)}}
sbHint()}
function sbBump(){const B=LR&&LR.sb;if(!B||B.n>=SBN||LR.gb)return;if(B.t-B.last>1.2)sbAdd()}
function sbTick(dt){const L=LR,B=L.sb;if(!B||L.gb)return;B.t+=dt;if(B.n<SBN&&B.t-B.last>=6.5)sbAdd();const t=performance.now()/1000;
if(B.an){const a=B.an;a.t+=dt;const f=Math.min(1,a.t/.55),bo=f<1?(1-f)*(1-f)*3.5:0;a.p.position.y=bo;a.p.scale.y=f<1?.85+.15*f:1;if(f>=1){a.p.position.y=0;a.p.scale.y=1;B.an=null}}
B.crew.forEach((c,i)=>{const m=c.m,dx=c.hx-c.x,dz=c.hz-c.z,d=Math.hypot(dx,dz);m.rotation.x=0;if(d>.2){const s=2.4*dt;c.x+=dx/d*Math.min(d,s);c.z+=dz/d*Math.min(d,s);m.rotation.y=Math.atan2(-dx,-dz);const w=Math.sin(t*9+i);m.L[0].rotation.x=w*.6;m.L[1].rotation.x=-w*.6;m.A[0].rotation.x=-w*.5;m.A[1].rotation.x=w*.5}
 else{m.L[0].rotation.x=m.L[1].rotation.x=0;m.rotation.y=Math.atan2(-(0-c.x),-(-58.6-c.z));const busy=B.an||B.n<SBN,s=Math.sin(t*(busy?7:2)+i*2);m.A[0].rotation.x=busy?(B.an?2.7:1.1+s*.6):.1;m.A[1].rotation.x=busy?(B.an?2.7:1.1-s*.6):.1}
 m.position.set(c.x,0,c.z)});
if(B.n<SBN&&Math.random()<dt*.25){const c=B.crew[ri(0,B.crew.length-1)],q=SBS[ri(0,SBS.length-1)];c.hx=q[0];c.hz=q[1]}}
const SBS=[[-6.2,-57.5],[6.4,-58.8],[-3.5,-62.6],[3.5,-62.6],[-6.5,-60.5],[6.5,-56.5],[-6,-55],[6,-61.5]];
