// ===== 🎮 PLACEMENT & ACCURACY PASSING (controller) =====
// Tyler's spec (2026-11-15/16): receiver icons; hold the receiver's button and a meter fills (tap = lob, medium = touch, full =
// bullet); a blue accuracy window in the meter, its size from your QB's accuracy, smaller on the run or under pressure; the left
// stick places the ball (lead him, back shoulder, toward the sideline), how far from your awareness; "L1 does high throw, LT low".
// Touch, swipe and slingshot throwing are unchanged; this is only the controller.
//  - LOB: floats (35% longer in the air), always as accurate as your QB is. TOUCH: normal speed. BULLET: 20% faster.
//  - Release inside the blue window: your QB throws it as if 10 points more accurate. Outside: up to 26 points less.
//  - LB / L1 held = high (over a defender underneath), LT / L2 held = low (under a defender over the top).
//  - Your throw power still sets the range; nothing here throws farther than your QB can.
window.PAFULL=1.0;window.PA={i:-1};
window.paZones=function(){return [['lob',0,.33],['touch',.33,.7],['bullet',.7,1]]};
// the blue part of a zone: its last stretch; bigger with accuracy, smaller on the run / under pressure
window.paWin=function(){try{const Q=S.q||{},P=g.pl,q=P&&P.qb;let f=cl(.3+((Q.acc||60)-60)/100,.18,.7);
 const mov=Math.hypot((inp&&inp.x)||0,(inp&&inp.y)||0)>.2,pr=P&&P.dl&&q&&P.dl.some(d=>d.beat&&Math.hypot(d.x-q.x,d.y-q.y)<3.5);if(mov)f*=.78;if(pr)f*=.7;return f}catch(e){return .35}};
window.paRead=function(m0){const over=m0>1.02;let m=Math.min(1,m0);if(over){const Z=paZones();return {kind:'bullet',z:Z[2],w0:1,inWin:false,over:1,miss:1}}const Z=paZones(),z=Z.find(x=>m<x[2])||Z[2],f=paWin(),w0=z[2]-(z[2]-z[1])*f;return {kind:z[0],z,w0,inWin:z[0]==='lob'||m>=w0,miss:z[0]==='lob'||m>=w0?0:(w0-m)/Math.max(.01,w0-z[1])}};
window.paFill=function(){return PA.i<0?0:(performance.now()-PA.t0)/1000/PAFULL};
// one frame, from ctlStep while you have the ball behind the line
window.ctlPA=function(down,edge,lx,ly){try{const P=g.pl;
 if(PA.i<0){for(let i=0;i<5;i++)if(edge(CTL_RB[i])&&ctlRecv()[i]){PA={i,t0:performance.now()};break}return}
 if(!P||P.air||P.car!==P.qb||g.ph!=='live'){PA={i:-1};return}
 PA.hi=PA.hi||!!down[4];PA.lo=!PA.hi&&(PA.lo||!!down[6]);PA.sx=lx||0;PA.sy=ly||0;PA.m=paFill();
 if(!down[CTL_RB[PA.i]]||PA.m>=1.4)paRelease()}catch(e){PA={i:-1}}};
window.paRelease=function(){const s={...PA};PA={i:-1};try{const P=g.pl,q=P.qb,w=ctlRecv()[s.i];if(!w||g.ph!=='live'||P.air||P.car!==q)return;const Q=S.q,rd=paRead(s.m||0);
 const v=16+((Q&&Q.pow)||60)*.1;let T=Math.hypot(w.x-q.x,w.y-q.y)/v;for(let k=0;k<3;k++)T=Math.hypot(w.x+(w.vx||0)*T-q.x,w.y+(w.vy||0)*T-q.y)/v;
 let lx=w.x+(w.vx||0)*T,ly=w.y+(w.vy||0)*T;
 // placement: the stick moves the spot (up = lead him deeper, down = back shoulder / shorter, left/right = toward that side)
 const aw=(Q&&Q.awr)||60,rl=1.2+aw/50,rd_=1.5+aw/40;lx+=(s.sx||0)*rl;ly+=-(s.sy||0)*rd_;
 const Rg=thrR(),d=Math.hypot(lx-q.x,ly-q.y);if(d>Rg){lx=q.x+(lx-q.x)*Rg/d;ly=q.y+(ly-q.y)*Rg/d}
 const a0=Q.acc;Q.acc=cl(a0+(rd.kind==='lob'?0:rd.inWin?10:-(8+18*Math.min(1,rd.miss)))-(rd.over?30:0),5,99);
 g.swp={p:Math.round(Math.min(1,d/Rg)*100),t:performance.now()};
 try{doThrow(w,cl(lx,1.4,51.9),ly)}finally{Q.acc=a0}
 const A=P.air;if(A){A.T*= {lob:1.35,touch:1,bullet:.8}[rd.kind]*(s.hi?1.1:s.lo?.92:1);A.T=Math.max(.25,A.T);A.kind=rd.kind;A.hl=s.hi?'high':s.lo?'low':'';
  g.paLast={kind:rd.kind,inWin:rd.inWin,hl:A.hl,m:+(s.m||0).toFixed(2)};
  try{slRel(innerWidth/2,innerHeight-90,(rd.kind==='lob'?'Lob':rd.kind==='touch'?'Touch':'Bullet')+(A.hl?' · '+A.hl:'')+(rd.over?' · ✗ held too long, it sails':rd.kind==='lob'?'':rd.inWin?' · ✓ on target':' · ✗ off target'),!rd.over&&(rd.kind==='lob'||rd.inWin))}catch(e){}}}catch(e){}};
// high / low: the defender the throw goes over (high) or under (low) gets less reach; a bullet gives them less time; high/low are a bit harder to catch
(()=>{try{const _l=land;land=function(){const P=g.pl,a=P&&P.air;const und=[];try{if(a&&a.kind){const w=a.tgt,ds=P.db.concat(P.lb).map(d=>({d,e:Math.hypot(d.x-a.lx,d.y-a.ly)})).sort((x,y)=>x.e-y.e),D=ds[0]&&ds[0].d;
  const push=(d,k)=>{const dx=d.x-a.lx,dy=d.y-a.ly,l=Math.hypot(dx,dy)||1;und.push([d,d.x,d.y]);d.x+=dx/l*k;d.y+=dy/l*k};
  if(D){if(a.hl==='high'&&D.y<a.ly-.3)push(D,.9);else if(a.hl==='low'&&D.y>a.ly+.3)push(D,.9);else if(a.kind==='bullet')push(D,.4)}
  if(w&&(a.hl||(a.kind==='bullet'&&Math.hypot(a.lx-a.x0,a.ly-a.y0)<10))){und.push([w,null,null,w.hands]);w.hands=Math.max(30,(w.hands||70)-5)}}}catch(e){}
 try{return _l.apply(this,arguments)}finally{und.forEach(([o,x,y,h])=>{if(h!=null){o.hands=h;return}if(g.pl&&g.pl.car===o)return;o.x=x;o.y=y})}}}catch(e){}})();
// the meter: a curved arc right by the receiver (Madden style), so you never look away from him.
// Tyler 2026-11-16: "touch pass blue, lob pass green, bullet pass ... a good purple"; "a little curved bar meter ... by the player".
// LOB green · TOUCH blue · BULLET bright purple; the precision window in each is the bright white band; the fill glows as it charges.
window.PAC={lob:'#3ddc6e',touch:'#3d9bff',bullet:'#b84dff'};
window.paIconY=5.9;   // button icons float above the receiver (not over his face or his defender)
(()=>{try{const _d=draw;draw=function(){const r=_d.apply(this,arguments);try{if(PA.i>=0&&g&&g.ph==='live'&&g.pl&&!g.pl.air){const P=g.pl,q=P.qb,w=ctlRecv()[PA.i];if(!w)return r;
  const m=Math.min(1,paFill()),f=paWin(),s=pj(w.x,w.y,paIconY);if(!s||!isFinite(s[0]))return r;
  cx.save();cx.setTransform(1,0,0,1,0,0);const R=30,a0=Math.PI*1.08,a1=Math.PI*1.92,A=t=>a0+(a1-a0)*t;
  cx.lineCap='butt';cx.lineWidth=10;cx.strokeStyle='#000b';cx.beginPath();cx.arc(s[0],s[1],R,A(0)-.04,A(1)+.04);cx.stroke();
  paZones().forEach(([k,a,b])=>{cx.lineWidth=7;cx.strokeStyle=PAC[k]+'55';cx.beginPath();cx.arc(s[0],s[1],R,A(a)+.01,A(b)-.01);cx.stroke();
   if(m>a){cx.strokeStyle=PAC[k];cx.shadowColor=PAC[k];cx.shadowBlur=8;cx.beginPath();cx.arc(s[0],s[1],R,A(a)+.01,A(Math.min(m,b))-.01);cx.stroke();cx.shadowBlur=0}
   if(k!=='lob'){const w0=b-(b-a)*f;cx.lineWidth=3;cx.strokeStyle='#ffffff';cx.beginPath();cx.arc(s[0],s[1],R+6,A(w0),A(b)-.01);cx.stroke()}});
  if(paFill()>1.02){cx.lineWidth=7;cx.strokeStyle='#ff3b3b';cx.shadowColor='#ff3b3b';cx.shadowBlur=10;cx.beginPath();cx.arc(s[0],s[1],R,A(1)+.03,A(1)+.03+Math.min(.5,(paFill()-1)*1.2));cx.stroke();cx.shadowBlur=0}const ang=A(m);cx.fillStyle='#fff';cx.beginPath();cx.arc(s[0]+Math.cos(ang)*R,s[1]+Math.sin(ang)*R,4.5,0,7);cx.fill();
  const rd=paRead(m);cx.font='bold 11px sans-serif';cx.textAlign='center';cx.fillStyle=PAC[rd.kind];cx.fillText(rd.kind.toUpperCase()+(PA.hi?' · HIGH':PA.lo?' · LOW':''),s[0],s[1]-R-10);
  // the spot the ball is going
  const Q=S.q||{},v=16+(Q.pow||60)*.1,T=Math.hypot(w.x-q.x,w.y-q.y)/v,aw=Q.awr||60;const lx=w.x+(w.vx||0)*T+(PA.sx||0)*(1.2+aw/50),ly=w.y+(w.vy||0)*T-(PA.sy||0)*(1.5+aw/40);const sp=pj(lx,ly,0);
  if(sp&&isFinite(sp[0])){cx.strokeStyle=PAC[rd.kind];cx.lineWidth=3;cx.beginPath();cx.arc(sp[0],sp[1],11,0,7);cx.stroke();cx.beginPath();cx.moveTo(sp[0]-16,sp[1]);cx.lineTo(sp[0]+16,sp[1]);cx.moveTo(sp[0],sp[1]-16);cx.lineTo(sp[0],sp[1]+16);cx.stroke()}
  cx.restore()}}catch(e){}return r}}catch(e){}})();
// the button guide
(()=>{try{const _g=window.ctlLegend;window.ctlLegend=function(){_g.apply(this,arguments);try{const lg=document.getElementById('ctlleg'),P=g&&g.pl;if(lg&&g&&g.ph==='live'&&P&&P.car===P.qb&&!P.air&&!ctlRoot()){const G=k=>ctlGlyph(k),hi=CTL.kind==='ps'?'L1':'LB',lo=CTL.kind==='ps'?'L2':'LT';
  const t=`Hold ${G(0)} ${G(1)} ${G(2)} ${G(3)} ${G(4)}: tap lob · hold bullet · release in the blue · L-stick place · ${hi} high · ${lo} low`;if(lg.textContent!==t)lg.textContent=t}}catch(e){}}}catch(e){}})();
