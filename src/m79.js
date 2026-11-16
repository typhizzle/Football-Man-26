// ===================== 🛡 DEFENSE: Cover 0-9, man, zone, man-zone match and blitzes · defenders adjust and rally =====================
// role order: c1 (left CB) c2 (right CB) s1 (strong S, slot side) s2 (free S) o1 (left OLB) m (MLB) o2 (right OLB)
// receivers: 0 left WR, 1 right WR, 2 slot, 3 TE, 4 RB
// assignment: 'm0'..'m4' man · 'z:NAME' zone (deep zones start with D or Q) · 'r' rush · 'spy'
const DZL={D3L:[9,17,1],D3M:[26.5,19,1],D3R:[44,17,1],DHL:[14,18,1],DHR:[39,18,1],Q1:[8,15,1],Q2:[20,17,1],Q3:[33,17,1],Q4:[45,15,1],
 FL:[7,4,0],FR:[46,4,0],CL:[14,8,0],CR:[39,8,0],HL:[20,7,0],HM:[26.5,8,0],HR:[33,7,0],TM:[26.5,13,0]};
const DCV={
 cover0:['Cover 0 blitz','m0 m1 m2 m3 m4 r r',1],
 man:['Cover 1 man','m0 m1 m2 z:D3M z:HM m4 m3',1],
 blitz:['Cover 1 blitz','m0 m1 m2 z:D3M m3 m4 r',1],
 mike:['Mike blitz · Cover 1','m0 m1 m2 z:D3M m4 r m3',1],
 cblitz:['Corner blitz · Cover 1','r m1 m2 m0 z:HM m4 m3',1],
 sblitz:['Safety blitz · Cover 0','m0 m1 r m2 z:HM m4 m3',1],
 spy:['QB spy · Cover 1','m0 m1 m2 z:D3M m4 spy m3',1],
 cover2:['Cover 2','z:FL z:FR z:DHR z:DHL z:CL z:HM z:CR',0],
 tampa:['Tampa 2','z:FL z:FR z:DHR z:DHL z:CL z:TM z:CR',0],
 zone:['Cover 3','z:D3L z:D3R z:CR z:D3M z:CL z:HM z:HR',0],
 c4:['Cover 4 quarters','z:Q1 z:Q4 z:Q3 z:Q2 z:CL z:HM z:CR',0],
 c2m:['Cover 5 · 2-man under','m0 m1 z:DHR z:DHL m2 m4 m3',0],
 c6:['Cover 6 · quarter-quarter-half','z:FL z:Q4 z:Q3 z:DHL z:CL z:HM z:CR',0],
 c7:['Cover 7 · man-zone match','z:Q1 z:Q4 z:Q3 z:Q2 z:CL z:HM z:CR',0,1],
 c8:['Cover 8 · bracket the top receiver','m0 m1 m2 m0 z:HM m4 m3',0],
 c9:['Cover 9 · cloud 3','z:FL z:D3R z:D3M z:D3L z:HL z:HM z:CR',0],
 fz:['Fire zone · 3 deep, 3 under','z:D3L z:D3R z:CR z:D3M r z:HL z:HR',1],
 prevent:['Prevent','z:Q1 z:Q4 z:Q3 z:Q2 z:CL z:HM z:CR',0]};
for(const k in DCV)DCN[k]=DCV[k][0];
// ---- the call: situation, your QB, and what has been working against them ----
defCall=function(sw){const tg=g.tg||10,dn=g.dn||1,y=g.y||25,late=(g.clk||0)>=3300,s=g.s||[0,0],ds=sw?(s[0]-s[1]):(s[1]-s[0]);
 if(tg>12&&(dn>=3||(late&&ds>0))&&R()<.8)return g.ldc='prevent';if(late&&ds>0&&ds<=8&&y<65&&R()<.45)return g.ldc='prevent';
 const w={man:12,zone:16,cover2:10,tampa:4,c4:9,c6:6,c2m:6,c7:6,c8:3,c9:5,blitz:7,mike:5,cblitz:3,sblitz:4,fz:5,cover0:2,spy:4};
 if(dn>=3&&tg>=6){w.c4+=6;w.cover2+=5;w.c6+=3;w.fz+=5;w.blitz+=4;w.sblitz+=3;w.cover0+=2;w.c2m+=3}
 if(dn>=3&&tg<=3){w.man+=8;w.cover0+=4;w.mike+=4;w.c8+=2;w.zone-=6}
 if(dn==1&&tg>=10){w.zone+=4;w.c9+=2;w.man+=2}
 if(y>=80){w.man+=8;w.cover0+=3;w.c7+=4;w.c4-=4;w.c6-=3;w.tampa-=3}
 if(!sw){const mob=(S.q&&S.q.mob)||60;w.spy+=Math.max(0,(mob-60)*.4);if(['Mobile','Scrambling strong arm'].includes(S.arch))w.spy+=5}
 // they adjust: whatever you keep beating, they call less
 if(!sw&&g.dcy)for(const k in w)if(g.dcy[k]!=null)w[k]*=cl(1.15-g.dcy[k]/30,.35,1.3);
 if(g.ldc&&w[g.ldc]!=null)w[g.ldc]*=.45;
 let t=0;for(const k in w){w[k]=Math.max(0,w[k]);t+=w[k]}let x=R()*t;for(const k in w){if((x-=w[k])<=0)return g.ldc=k}return g.ldc='zone'};
(()=>{const _e=endPlay;endPlay=function(ye,tx,o){try{const P=g.pl;if(P&&!P.done&&P.dc&&!g.sw&&!g.watch&&g.los!=null){g.dcy=g.dcy||{};const gn=(o&&(o.int||o.inc))?(o.int?-15:0):cl(ye-g.los,-10,40);g.dcy[P.dc]=(g.dcy[P.dc]||0)*.55+gn*.45}}catch(e){}return _e.apply(this,arguments)}})();
// ---- lining them up ----
defPost=function(P,y,o,r){const dc=P.dc,V=DCV[dc]||DCV.zone,as=V[1].split(' '),press=V[2],match=V[3],deepX=dc=='prevent'?5:0;
 const R0={c1:P.db[0],c2:P.db[1],s1:P.db[2],s2:P.db[3],o1:P.lb[0],m:P.lb[1],o2:P.lb[2]||P.dl[4]},RN=['c1','c2','s1','s2','o1','m','o2'];
 if(RN.some(k=>!R0[k]))return;const dl=P.dl.slice(0,4),db=[],lb=[];P.mcl=new Set();
 // the best receiver on the outside gets the bracket in Cover 8
 let bk=0;if(dc=='c8'){const v=w=>(w.elu||70)+(w.hands||70)+(w.sp||8)*6;bk=v(P.wr[1])>v(P.wr[0])?1:0}
 RN.forEach((k,i)=>{const d=R0[k];let a=as[i];if(dc=='c8'&&k=='s2')a='m'+bk;const isDB=k[0]=='c'||k[0]=='s';
  Object.assign(d,{w:null,zx:null,zy:null,dz:0,mt:0,mw:null,fs:0,spy:0,zc:null});
  if(a=='r'){Object.assign(d,{rush:d.rush||r(o),beat:false,pb:null,delay:k[0]=='c'?1.05:k[0]=='s'?1.2:1,sp:Math.max(d.sp||7,7.05),w:null});
   if(k[0]=='c'){d.x=P.wr[0].x+1.2;d.y=y+1.8}else if(k[0]=='s'){d.y=y+5;d.x=cl(d.x,20,36)}else{d.y=y+2.8;d.x=cl(d.x,21,32)}dl.push(d);return}
  delete d.rush;d.beat=undefined;d.delay=0;
  if(a=='spy'){d.spy=1;d.x=26.5;d.y=y+4.5;lb.push(d);return}
  if(a[0]=='m'){const w=P.wr[+a[1]];d.w=w;
   if(dc=='c8'&&k=='s2'){d.zc=3.6}else if(dc=='c8'&&a=='m'+bk&&d.pos=='CB'){d.zc=-.4}
   else d.zc=press&&d.pos=='CB'?1:1.2;
   const sd=w.x<26.5?1:-1;if(d.pos=='CB'){d.x=w.x+sd*.7;d.y=y+(press?1.7:5)}else if(d.pos=='S'){d.x=w.x+sd*.6;d.y=y+(d.zc>3?12:5.5)}else{d.x=cl(w.x,14,39);d.y=y+4.2}
   (isDB?db:lb).push(d);return}
  const Z=DZL[a.slice(2)]||DZL.HM;d.zx=Z[0];d.zy=Math.min(108,y+Z[1]+(Z[2]?deepX:deepX*.6));d.dz=Z[2];d.mt=match?1:0;if(a=='z:D3M'&&!as.includes('z:DHL'))d.fs=1;
  if(d.pos=='CB'){const w=P.wr[k=='c1'?0:1];d.x=w.x+(w.x<26.5?1:-1);d.y=y+(Z[2]?7.5:5)}else if(d.pos=='S'){d.x=Z[2]?Z[0]:cl(Z[0],12,41);d.y=y+(Z[2]?12.5:6.5)}else{d.x=cl(Z[0],14,39);d.y=y+4.3}
  (isDB?db:lb).push(d)});
 // the center (and then the back) picks up the first extra rusher; a sixth rusher comes free
 const ex=dl.slice(4);if(ex[0]&&P.ol[2]){ex.sort((u,v)=>Math.abs(u.x-26.5)-Math.abs(v.x-26.5));const f=ex[0];f.pb=P.ol[2];f.delay=0;f.beat=false;f.pkU=1}
 P.dl=dl;P.db=db;P.lb=lb};
// ---- in coverage: deep zones stay over the top, underneath zones sit in the lanes, match zones carry who comes to them ----
function zoneT(d,P){const los=g.los,q=P.qb;d.cbB=0;
 const chase=(w,dy)=>{const tx=w.x+(w.vx||0)*.35,ty=w.y+(w.vy||0)*.3+dy,s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>1.6?Math.max(1.05,((w.sp||8)*.95)/d.sp):0;return[tx,ty]};
 if(d.mt){if(d.mw&&(Math.abs(d.mw.x-d.zx)>(d.dz?16:13)||(!d.dz&&d.mw.y>d.zy+9))){P.mcl.delete(d.mw);d.mw=null}
  if(!d.mw){let b=null,bd=d.dz?9:7;P.wr.forEach(w=>{if(P.mcl.has(w)||(d.dz&&w.y<los+6))return;const dd=Math.hypot(w.x-d.zx,w.y-d.zy);if(dd<bd){bd=dd;b=w}});if(b){d.mw=b;P.mcl.add(b)}}
  if(d.mw)return chase(d.mw,d.dz?2.2:1)}
 if(d.dz){// deep: only routes that threaten deep; the single-high safety helps on the deepest one anywhere
  let zw=null,zd=d.fs?99:13;P.wr.forEach(w=>{if(w.y<los+7)return;const dd=d.fs?-w.y:Math.hypot(w.x-d.zx,(w.y-d.zy)*.6);if(dd<zd){zd=dd;zw=w}});
  if(zw){const ty=Math.max(zw.y+2.8,Math.min(d.zy,zw.y+7)),tx=d.fs?zw.x*.65+d.zx*.35:zw.x*.8+d.zx*.2,s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>2.5&&zw.y>d.y-4?Math.max(1.05,((zw.sp||8)*.95)/d.sp):0;return[tx,ty]}
  return[d.zx,d.zy]}
 // underneath: the closest route in my area, staying between it and the QB
 let zw=null,zd=9;P.wr.forEach(w=>{const dd=Math.hypot(w.x-d.zx,w.y-d.zy);if(dd<zd){zd=dd;zw=w}});
 if(zw){const tx=zw.x+(zw.vx||0)*.3,ty=Math.min(zw.y+(zw.vy||0)*.2+.8,d.zy+5),s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>1.6?Math.max(1.05,((zw.sp||8)*.9)/d.sp):0;return[tx,ty]}
 return[d.zx*.85+(q?q.x:26.5)*.15,d.zy]}
// ---- angles: aim where the ball carrier is going, not where he is ----
function icpt(d,t,ld){try{const vx=t.vx||0,vy=t.vy||0,s=d.sp*purF(d,t),dx=t.x-d.x,dy=t.y-d.y,a=vx*vx+vy*vy-s*s,b=2*(dx*vx+dy*vy),c=dx*dx+dy*dy;let T=null;if(t.y-g.los<7||c<25)return[t.x+vx*ld,t.y+vy*ld];
 if(Math.abs(a)<1e-6){if(b<0)T=-c/b}else{const D=b*b-4*a*c;if(D>=0){const q=Math.sqrt(D),r1=(-b-q)/(2*a),r2=(-b+q)/(2*a);T=[r1,r2].filter(v=>v>0).sort((x,y)=>x-y)[0];if(T==null)T=null}}
 if(T==null||!isFinite(T))return[t.x+vx*ld,t.y+vy*ld];T=Math.min(T,d.y>t.y+1?2.4:1.3);return[cl(t.x+vx*T,0,53.3),Math.min(t.y+vy*T,110)]}catch(e){return[t.x,t.y]}}
// ---- catch-up: the longer the run, the harder the whole defense runs it down ----
purF=function(d,t){try{if(!g||!g.pl||!g.pl.run||!t)return 1;const gain=t.y-g.los,behind=t.y-d.y;if(gain<5)return 1;const db_=d.pos=='CB'||d.pos=='S';
 if(behind<0)return 1+cl((gain-12)/140,0,.08);return 1+cl(behind/32,0,db_?.24:.18)+cl((gain-10)/110,0,db_?.12:.07)}catch(e){return 1}};
// ---- DB and LB speed come from their ratings ----
(()=>{const _r=rateApply;rateApply=function(o,x,i){const r=_r.apply(this,arguments);try{const v=x&&x.ovr;if(v>0){if(i>=18&&i<=21)o.sp=Math.max(o.sp||0,7.05+(v-60)*.042);else if(i>=15&&i<=17)o.sp=Math.max(o.sp||0,6.75+(v-60)*.032);if(i>=18&&i<=21)o.cov=cl(v+(R()-.5)*4,35,99)}}catch(e){}return r}})();
