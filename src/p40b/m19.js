
// ---------------- V 0.0.0041: saves, renames, new stars, swipe-to-throw, HUD buttons ----------------
// the generic part of a college QB room (named players get added on top by npxRoom / qroomArr)
function qroomG(t){const rs=rng(hsh(t.n)+(S.seed||1)),o=t.ovr,nm=()=>NF[rs()*NF.length|0]+' '+NL[rs()*NL.length|0];return[{n:nm(),ovr:cl(o+Math.round(rs()*12-4),45,95),cls:2+(rs()*3|0)},{n:nm(),ovr:cl(o-3-Math.round(rs()*7),40,90),cls:1+(rs()*3|0)},{n:nm(),ovr:cl(o-8-Math.round(rs()*8),35,85),cls:1}].sort((a,b)=>b.ovr-a.ovr)}
// ---- old saves: the calendar moves back 4 years (high school now starts in 2022), the two pro conferences become LFC (left) and RFC (right), Jake Smothers-Ninja ----
function v41Mig(s){if(!s||typeof s!='object')return s;
 if(!s.lfc||!s.jsn){try{const A_='A'+'FC',N_='N'+'FC',j=JSON.stringify(s).replace(new RegExp('\\b'+A_+'\\b','g'),'RFC').replace(new RegExp('\\b'+N_+'\\b','g'),'LFC').split('Ja'+'mes Smothers-Ninja').join('Jake Smothers-Ninja');s=JSON.parse(j)}catch(e){}s.lfc=1;s.jsn=1}
 if(s.y0==null){try{yrShift(s,4)}catch(e){}s.y0=2022}return s}
function yrShift(s,D){const inR=v=>typeof v=='number'&&v>=2026&&v<=2090,sv=v=>inR(v)?v-D:v,YK=new Set(['yr','cls','rbC','yr0']),AK=new Set(['po','ub']),
 RX=/(^|[^\d,.$#])(20[2-8]\d)(?![\d,%])(?!\s*(?:yds|yards|yd|pass|rush|rec|receiving|passing|rushing|pts|points|lbs|ft))/g,
 ss=t=>t.indexOf('20')<0?t:t.replace(RX,(m,a,y)=>{const n=+y;return n>=2026&&n<=2090?a+(n-D):m}),
 walk=(o,d)=>{if(d>16||!o||typeof o!='object')return;if(Array.isArray(o)){for(let i=0;i<o.length;i++){const v=o[i];if(typeof v=='string')o[i]=ss(v);else if(v&&typeof v=='object')walk(v,d+1)}return}
  for(const k of Object.keys(o)){const v=o[k];if(typeof v=='number'){if(YK.has(k))o[k]=sv(v)}else if(typeof v=='string'){if(k!='n'&&k!='name'&&k!='vet')o[k]=ss(v)}
   else if(Array.isArray(v)&&k=='h'&&v.length&&Array.isArray(v[0])){v.forEach(e=>{if(Array.isArray(e)&&typeof e[0]=='number'&&e[0]>=1980&&e[0]<=2090)e[0]-=D})}
   else if(Array.isArray(v)&&AK.has(k)){for(let i=0;i<v.length;i++)v[i]=sv(v[i])}else if(v&&typeof v=='object')walk(v,d+1)}};
 walk(s,0);if(s.npb&&typeof s.npb=='object'){const n={};for(const k in s.npb){const y=+k;n[inR(y)?y-D:k]=s.npb[k]}s.npb=n}}
// ---- the stars added in this version join their pro teams in saves that already built those rosters ----
let PK41S=null,PK41=null;
function pkIns(a,t,L){if(!S||!L||!L[0]||!L[0].qp||!t||!t.dv)return;if(PK41S!==S){PK41S=S;PK41=new Set()}if(PK41.has(a))return;PK41.add(a);const pi=pIdx(t);if(pi<0)return;const me=a=='h.0'&&S.stage=='pro';
 PKS.forEach((q,k)=>{if(k<11||q[0]!=pi||L.some(x=>x&&x.n==q[2]))return;for(const kk in S.ro){const R_=S.ro[kk];if(Array.isArray(R_)&&R_.some(x=>x&&x.n==q[2]))return}
  const sl=q[1],x=L[sl];if(!x||(sl==0&&me)||x.npx!=null||x.n==S.name||(S.pal&&S.pal.n==x.n)||PKS.some(p=>p[2]==x.n)||QBP.some(p=>p[0]==x.n))return;
  const pr=rng((S.seed||1)*313+k*71),nx={...x,n:q[2],pos:POSL[sl],ovr:q[3],age:q[4],num:q[5],pot:potOf(q[3],q[4],pr()),qp:1,ny:null,h:[],cs:{},tm:[],aw:{}};delete nx.yq;
  try{genHist(nx,sl,pi,pr,1)}catch(e){}try{uHist(nx)}catch(e){}L[sl]=nx;
  L.forEach(y=>{if(y&&y!==nx&&+y.num===+nx.num){const rg=NR[y.pos]||[1,99];let v=y.num,gg=0;do v=rg[0]+(pr()*(rg[1]-rg[0]+1)|0);while(L.some(z=>z&&z!==y&&+z.num===v)&&++gg<60);y.num=v}})})}
// during high school and college the pro stars' career lines keep up with the calendar
function uRost(a,t,L){if(!S||a[0]!='p'||(S.stage||'hs')=='pro'||!L||!L[0]||!L[0].qp)return;const k=yrN();if(L.uhk===k)return;L.uhk=k;L.forEach(x=>{if(x&&(QBX.some(q=>q[0]==x.n)||PKS.some(q=>q[2]==x.n)))try{uHist(x)}catch(e){}})}
// ---------------- throwing: longer slingshot, swipe-to-throw (like Flick QB) ----------------
const accF=()=>cl((((S&&S.q&&S.q.acc)||60)-40)/55,0,1),SLL=.26,thrR=()=>14+((S&&S.q&&S.q.pow)||60)*.55,slPow=m=>Math.pow(Math.min(1,m/(Math.min(W,H)*SLL)),.75);
let swp=null,swLast=null;
function swOK(){const P=g&&g.pl;if(!P||g.ph!='live'||g.paused||g.watch||P.wf)return false;const q=P.qb,t=P.call&&P.call.t;return P.car===q&&!P.air&&!P.passed&&q.y<=g.los+.6&&t!='run'&&t!='option'&&t!='qbrun'}
// a touch that starts as "look" (first person / flick cam) turns into a swipe when it heads up the screen
const lkRun=()=>{const P=g&&g.pl;return !!(P&&g.ph=='live'&&P.car===P.qb&&(P.run||(P.call&&P.call.t=='qbrun')))};
function swLk(e){if(!lk)return false;if(lk.mv)return true;if(!lk.pend)return false;const x=e.clientX,y=e.clientY,now=performance.now();lk.pts.push({x,y,t:now});const dx=x-lk.x0,dy=y-lk.y0;if(Math.hypot(dx,dy)<14)return true;
 const fast=now-lk.pts[0].t<160;
 if(fast&&dy<0&&-dy>=Math.abs(dx)*.6&&swOK()){swp={id:lk.id,x0:lk.x0,y0:lk.y0,pts:lk.pts};lk=null;return true}
 if(fast&&lkRun()){lk.mv=1;lk.pend=0;return true}
 lk.pend=0;lk.x=lk.x0;lk.y=lk.y0;return false}
// a pull that starts going up instead of back is a swipe too (every camera)
function swAim(e){if(!aim||aim.id!=e.pointerId||aim.dec)return;const x=e.clientX,y=e.clientY;(aim.pts=aim.pts||[{x:aim.ox,y:aim.oy,t:performance.now()-16}]).push({x,y,t:performance.now()});const dx=x-aim.ox,dy=y-aim.oy;if(Math.hypot(dx,dy)<14)return;
 if(dy<0&&-dy>=Math.abs(dx)*.18&&swOK()){swp={id:aim.id,x0:aim.ox,y0:aim.oy,pts:aim.pts};aim=null;return}aim.dec=1}
function swMove(e){if(!swp||e.pointerId!=swp.id)return;swp.pts.push({x:e.clientX,y:e.clientY,t:performance.now()});if(swp.pts.length>60)swp.pts.splice(1,1)}
const SWV=typeof T3!='undefined'?new T3.Vector3():null,SWD=typeof T3!='undefined'?new T3.Vector3():null;
function upj(sx,sy){if(!SWV||!cm)return null;SWV.set(sx/W*2-1,-(sy/H*2-1),.5).unproject(cm);SWD.copy(SWV).sub(cm.position).normalize();if(SWD.y>-.004)return null;const k=-cm.position.y/SWD.y;return[cm.position.x+SWD.x*k+26.5,-(cm.position.z+SWD.z*k)]}
// screen spot of the ball in your hand
function swBall(){const q=g.pl.qb;if(CAMI==1)return[W/2,H*.88];return pj(q.x,q.y,1.6)}
function swDir(sx,sy){const q=g.pl.qb,b=swBall();for(let R0=Math.min(W,H)*.22;R0>8;R0*=.5){const G=upj(b[0]+sx*R0,b[1]+sy*R0);if(G){const dx=G[0]-q.x,dy=G[1]-q.y,l=Math.hypot(dx,dy);if(l>.5&&dy>-l*.2)return[dx/l,dy/l]}}
 const yw=CAMI==1||CAMI==2?LY:0,F=[Math.sin(yw),Math.cos(yw)],Rt=[Math.cos(yw),-Math.sin(yw)],f=-sy,r=sx*1.15,l=Math.hypot(f,r)||1;return[(F[0]*f+Rt[0]*r)/l,(F[1]*f+Rt[1]*r)/l]}
function swEnd(e){if(!swp||e.pointerId!=swp.id)return false;const s=swp;swp=null;const x=e.clientX,y=e.clientY,now=performance.now(),pts=s.pts.concat([{x,y,t:now}]);swLast={pts,t:now};
 if(!swOK())return true;const dx=x-s.x0,dy=y-s.y0,Ln=Math.hypot(dx,dy);if(Ln<34||dy>-18){g.flash='FLICK UP TO THROW';g.ft=.9;return true}
 let i=pts.length-1;while(i>0&&now-pts[i-1].t<100)i--;const a=pts[Math.max(0,i-1)],dt=Math.max(16,now-a.t),v=Math.hypot(x-a.x,y-a.y)/dt,M=Math.min(W,H);
 // how hard you flicked: mostly the finger's speed at the end, a little the length
 // how hard you flicked: half the finger's speed at the end, half how long the swipe was (a long, quick swipe = full power)
 const p=cl(v/(M*.0095)*.5+Ln/(M*.62)*.5,.1,1.15);
 // the direction is where your finger was heading (the last 3/4 of the swipe, so a wobbly start doesn't matter)
 const k0=pts[Math.min(pts.length-2,Math.floor(pts.length*.25))]||pts[0],ddx=x-k0.x,ddy=y-k0.y,dl=Math.hypot(ddx,ddy);const ux=dl>20?ddx/dl:dx/Ln,uy=dl>20?ddy/dl:dy/Ln;
 swThrow(ux,uy,p,s.x0,s.y0,pts,x,y);return true}
// where the ground is along a line on the screen, at a given distance from the QB
function swGround(ox,oy,sx,sy,d){const q=g.pl.qb;let last=null,lastD=0;
 for(let s=4;s<Math.max(W,H)*2.5;s+=4){const G=upj(ox+sx*s,oy+sy*s);if(!G)break;const dd=Math.hypot(G[0]-q.x,G[1]-q.y);
  if(dd>=d){if(!last)return G;const f=(d-lastD)/Math.max(1e-3,dd-lastD);return[last[0]+(G[0]-last[0])*f,last[1]+(G[1]-last[1])*f]}last=G;lastD=dd}
 if(last&&lastD>.5)return[q.x+(last[0]-q.x)/lastD*d,q.y+(last[1]-q.y)/lastD*d];const dir=swDir(sx,sy);return[q.x+dir[0]*d,q.y+dir[1]*d]}
// Flick-QB style: the ball goes exactly along the line you flicked (from the QB on your screen), the speed of the flick is the distance,
// a curved flick curves the ball; accuracy adds spray (doThrow) and, for good passers, a little pull toward a receiver they were close to
function swThrow(sx,sy,p,x0,y0,pts,rx,ry){const P=g.pl,q=P.qb,Rg=thrR(),aF=accF();let d=Math.max(5,Math.min(1,p)*Rg);
 let O=CAMI==1&&!g.sw?[W/2,H]:pj(q.x,q.y,0);if(CAMI!=1&&v3.z>1)O=swBall();
 // started on/near your QB? then the ball heads for the spot your finger let go over (it follows your finger)
 if(rx!=null&&!(CAMI==1&&!g.sw)&&Math.hypot(x0-O[0],y0-O[1])<Math.min(W,H)*.22){const ex=rx-O[0],ey=ry-O[1],el=Math.hypot(ex,ey);if(el>30&&ey<0){sx=ex/el;sy=ey/el;const G=upj(rx,ry);if(G){const rel=Math.hypot(G[0]-q.x,G[1]-q.y);if(rel>2)d=cl(rel*.6+d*.4,5,Rg)}}}
 let L;if(CAMI==1&&!g.sw){const yw=LY,F=[Math.sin(yw),Math.cos(yw)],Rt=[Math.cos(yw),-Math.sin(yw)],a=Math.atan2(sx,-sy)*.85;L=[q.x+(F[0]*Math.cos(a)+Rt[0]*Math.sin(a))*d,q.y+(F[1]*Math.cos(a)+Rt[1]*Math.sin(a))*d]}else L=swGround(O[0],O[1],sx,sy,d);
 let best=null,bd=1e9;P.wr.forEach(w=>{const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T,z=Math.hypot(ex-L[0],ey-L[1]);if(z<bd){bd=z;best={w,ex,ey}}});
 const mr=1.2+3.3*aF;if(best&&bd<mr){const k=(.25+.45*aF)*(1-.5*bd/mr);L=[L[0]+(best.ex-L[0])*k,L[1]+(best.ey-L[1])*k]}
 // curve: how much the flick turned between its first and last part
 let cv=0;if(pts&&pts.length>=5){const n=pts.length,i1=Math.max(1,Math.floor(n*.4)),i2=Math.min(n-2,Math.floor(n*.6)),a0=[pts[i1].x-pts[0].x,pts[i1].y-pts[0].y],a1=[pts[n-1].x-pts[i2].x,pts[n-1].y-pts[i2].y];
  if(Math.hypot(a0[0],a0[1])>14&&Math.hypot(a1[0],a1[1])>14)cv=cl(Math.atan2(a0[0]*a1[1]-a0[1]*a1[0],a0[0]*a1[0]+a0[1]*a1[1]),-.8,.8)}
 if(!best)return;P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};doThrow(best.w,L[0],L[1]);
 const A=P.air;if(A)A.hz=cl(1.05-p*.45,.55,1);if(A&&Math.abs(cv)>.08){const dd=Math.hypot(A.lx-A.x0,A.ly-A.y0),ang=Math.atan2(A.lx-A.x0,A.ly-A.y0)-cv*.55;A.cx=A.x0+Math.sin(ang)*dd*.5;A.cy=A.y0+Math.cos(ang)*dd*.5}}
// the flight path (straight, or bent when the flick curved)
const afx=(a,f)=>a.cx==null?a.x0+f*(a.lx-a.x0):(1-f)*(1-f)*a.x0+2*(1-f)*f*a.cx+f*f*a.lx,afy=(a,f)=>a.cy==null?a.y0+f*(a.ly-a.y0):(1-f)*(1-f)*a.y0+2*(1-f)*f*a.cy+f*f*a.ly;
const swpL=()=>swp&&swp.pts.length?Math.hypot(swp.pts[swp.pts.length-1].x-swp.x0,swp.pts[swp.pts.length-1].y-swp.y0):0;
// swipe trail + power readout on the game overlay
function swDraw(cx){const now=performance.now(),tr=(pts,al)=>{if(!pts||pts.length<2)return;cx.lineCap='round';cx.lineJoin='round';for(let i=1;i<pts.length;i++){const f=i/pts.length;cx.globalAlpha=al*(.25+.75*f);cx.strokeStyle='#ffe93b';cx.lineWidth=3+f*7;cx.beginPath();cx.moveTo(pts[i-1].x,pts[i-1].y);cx.lineTo(pts[i].x,pts[i].y);cx.stroke()}cx.globalAlpha=1};
 if(swp)tr(swp.pts,.9);else if(swLast&&now-swLast.t<380)tr(swLast.pts,.9*(1-(now-swLast.t)/380));
 if(g&&g.swp&&now-g.swp.t<1100){const al=1-(now-g.swp.t)/1100;cx.globalAlpha=al;cx.font='700 '+Math.max(10,Math.min(W/34,16))+'px "Press Start 2P",monospace';cx.textAlign='center';cx.fillStyle='#000';cx.fillText('FLICK '+g.swp.p+'%',W/2+2,H*.72+2);cx.fillStyle='#ffe93b';cx.fillText('FLICK '+g.swp.p+'%',W/2,H*.72);cx.globalAlpha=1}}
// ---------------- HUD buttons: camera + pause sit together in the top-right corner ----------------
(function(){try{let c=document.getElementById('tbr');if(!c){c=document.createElement('div');c.id='tbr';document.body.appendChild(c)}['camb','pb'].forEach(id=>{const e=document.getElementById(id);if(e&&e.parentNode!==c)c.appendChild(e)})}catch(e){}})();
