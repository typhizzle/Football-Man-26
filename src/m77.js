// ===================== 🏈 LIVE FUMBLES: the ball pops loose, bounces, and everyone scrambles for it (you can recover it yourself) =====================
function fumStart(c,y,sk){const P=g.pl;if(P.done||P.fb)return;const a=R()*Math.PI*2,sp=3+R()*4;P.fb={x:c.x,y:Math.min(99,c.y),z:1.2,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,vz:3.5,t:0,sk,rec:null,rt:0,fumbler:c};P.car=null;g.ph='fum';g.flash='FUMBLE!';g.ft=1.2;g.sh=.4;
 try{c.stum=1.2;const m=new T3.Group();bx(.22,.2,.38,0x7a3e17,0,0,0,m);bx(.04,.21,.2,0xffffff,0,0,0,m);DYN.add(m);P.fbm=m}catch(e){}}
function fumTick(dt){const P=g.pl,B=P.fb;if(!B)return(g.ph='live');B.t+=dt;P.t+=dt;
 // the ball: football bounces are unpredictable
 if(!B.rec){B.vz-=14*dt;B.x+=B.vx*dt;B.y+=B.vy*dt;B.z+=B.vz*dt;if(B.z<=.12){B.z=.12;if(Math.abs(B.vz)>1.2){B.vz=-B.vz*.45;const k=(R()-.5)*1.6,c_=Math.cos(k),s_=Math.sin(k),vx=B.vx*c_-B.vy*s_,vy=B.vx*s_+B.vy*c_;B.vx=vx*.7;B.vy=vy*.7}else{B.vz=0;B.vx*=Math.pow(.15,dt);B.vy*=Math.pow(.15,dt)}}B.x=cl(B.x,.5,52.8)}
 if(P.fbm){P.fbm.position.set(B.x-26.5,B.z,-B.y);P.fbm.rotation.x+=dt*(B.rec?0:9);P.fbm.rotation.z+=dt*(B.rec?0:5)}
 const off=[...P.ol,...P.wr,P.qb],def=P.def||[...P.dl,...(P.db||[]),...(P.lb||[])],all=[...off,...def];
 if(!B.rec){all.forEach(o=>{if(o.kd)return;let tx=B.x,ty=B.y;const me=o===P.qb&&!g.sw;const L=(inp&&(inp.x||inp.y))?Math.hypot(inp.x,inp.y):0;
   if(me&&L>.05){o.vx=inp.x/L*o.sp*Math.min(1,L);o.vy=inp.y/L*o.sp*Math.min(1,L)}else{const dx=tx-o.x,dy=ty-o.y,d=Math.hypot(dx,dy)||1,sp=(o.sp||6)*(o===B.fumbler&&o.stum>0?.4:.92);o.vx=dx/d*sp;o.vy=dy/d*sp}
   if(o.stum>0)o.stum-=dt;o.x+=o.vx*dt;o.y+=o.vy*dt});
  if(B.t>.45&&B.z<.6){let best=null,bd=1e9;all.forEach(o=>{const d=Math.hypot(o.x-B.x,o.y-B.y);if(d<bd){bd=d;best=o}});
   if(best&&bd<1.05&&R()<dt*9){B.rec=best;B.rt=0;B.vx=B.vy=B.vz=0;best.x=B.x;best.y=B.y;best.vx=best.vy=0;best.kd=1;best.stun=2;best.kdr=Math.atan2(-(B.x-best.x)||0,1);g.flash=off.includes(best)?(best===P.qb?'YOU FELL ON IT!':'OFFENSE RECOVERS!'):'DEFENSE RECOVERS!';g.ft=1.2}}
  if(B.t>6&&!B.rec){B.rec=P.qb;B.rt=0}}
 else{B.rt+=dt;all.forEach(o=>{if(o===B.rec)return;const dx=B.x-o.x,dy=B.y-o.y,d=Math.hypot(dx,dy)||1;if(d>1.6){o.vx=dx/d*3;o.vy=dy/d*3;o.x+=o.vx*dt;o.y+=o.vy*dt}else o.vx=o.vy=0});
  if(B.rt>1.1){const ofr=off.includes(B.rec),y=cl(B.y,.5,99.5);try{if(P.fbm)DYN.remove(P.fbm)}catch(e){}P.fbm=null;P.fb=null;P.car=B.rec;B.rec.kd=0;g.ph='live';
   if(ofr)endPlay(Math.max(y,0.6),(B.rec===P.qb?'Fumble — you fell on it!':'Fumble — offense recovers it'),{sk:B.sk});else endPlay(y,'FUMBLE! Defense recovers',{fum:1,sk:B.sk})}}}
// ratings → on-field ability (small random game-day swing)
function rateApply(o,x,i){const v=x&&x.ovr;if(!(v>0)||i==0)return;const j=()=>(R()-.5)*4;
 if(i>=6&&i<=10){o.blk=cl(v+j(),35,99)}
 else if(i>=11&&i<=14){o.rush=cl(v+j(),35,99);o.str=cl(v+j(),35,99);o.tkl=cl(v-2+j(),35,99)}
 else if(i>=15&&i<=21){o.tkl=cl(v+j(),35,99);if(o.rush!=null)o.rush=cl(v-4+j(),35,99)}
 else if(i==1){o.sp=6.3+(v-60)*.045;o.elu=cl(v+j(),35,99);o.hands=cl(v-4+j(),35,99)}
 else if(i>=2&&i<=5){o.sp=Math.max(o.sp||0,6.9+(v-60)*.035);o.hands=cl(v+j(),35,99);o.elu=cl(v-3+j(),35,99)}}
try{const t=CELB.find(c=>c[0]=='tswiff');if(t&&!/Tractor/.test(t[15]))t[15]='married to Tractor Swift (TE, Kansas City Monarchs); '+t[15]}catch(e){}
// no two players with the same name on one team (renames the extra one), checked when rosters load
function rosDupFix(){try{if(!S||!S.ro)return;const star=n=>n==S.name||PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n);const all=new Set();for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>x&&all.add(x.n))}
 for(const k in S.ro){const L=S.ro[k];if(!Array.isArray(L))continue;const seen=new Set();L.forEach(x=>{if(!x)return;if(seen.has(x.n)&&!star(x.n)){let nn,g_=0;do{nn=uNm(Math.random)}while((all.has(nn)||star(nn))&&g_++<30);x.n=nn;all.add(nn)}seen.add(x.n)})}}catch(e){}}
(()=>{const _r=rost;rost=function(a){const L=_r.apply(this,arguments);try{if(Array.isArray(L)){const seen=new Set();L.forEach(x=>{if(!x)return;if(seen.has(x.n)&&x.n!=S.name&&!PKS.some(q=>q[2]==x.n)){x.n=uNm(Math.random)}seen.add(x.n)})}}catch(e){}return L}})();
(()=>{const _h=hub;hub=function(){try{if(S&&!S.rdf1){rosDupFix();S.rdf1=1}}catch(e){}return _h.apply(this,arguments)}})();
// ===================== 🎃 HALLOWEEN SPONSORSHIPS (during the event only) =====================
const HWDEAL=[['Overtime Pizza · Pumpkin Spice Crust','pop',30,1.1],['Blitz Energy · Blood Orange Blitz','win',2,1.4],['Haunted Harvest Candy Co.','pop',45,1.8],['Spooky Sneaks · Glow-in-the-Dark Cleats','gr',70,2.4],['Gatorbade · Boo-berry Blast','pop',35,1.3]];
function hwDealsEns(){try{if(!S||!Array.isArray(S.deals))return;S.hwdt=S.hwdt||[];const on=typeof hwOn=='function'&&hwOn();
 if(!on){S.deals=S.deals.filter(d=>!d.hw||d.t);return}
 const st=S.stage||'hs',sc=st=='pro'?150:st=='col'?20:1,bm=(1+(S.pop||40)/50)*(st=='pro'?1+Math.max(0,qo(S.q)-70)/15:1);
 HWDEAL.forEach(([b,k,v,m])=>{if(S.deals.some(d=>d.b==b))return;S.deals.push({b,k,v,v2:1,hw:1,a:Math.round(sc*bm*athM()*1500*m/100)*100,t:S.hwdt.includes(b)?1:0})})}catch(e){}}
(()=>{const _e=dealsEns;dealsEns=function(){const r=_e.apply(this,arguments);hwDealsEns();return r}})();
(()=>{const _t=dealTake;dealTake=function(i){const d=S.deals&&S.deals[i];const r=_t.apply(this,arguments);try{if(d&&d.hw&&d.t){S.hwdt=S.hwdt||[];if(!S.hwdt.includes(d.b))S.hwdt.push(d.b);save()}}catch(e){}return r}})();
(()=>{const _h=dealsHtml;dealsHtml=function(){let h=_h.apply(this,arguments);try{(S.deals||[]).filter(d=>d.hw).forEach(d=>{h=h.split('<span>'+d.b+'<br>').join('<span><b style="color:#ff8c1a">🎃 '+d.b+'</b> <small style="color:#ff8c1a">Halloween deal</small><br>')})}catch(e){}return h}})();
(()=>{const _a=askQ;askQ=function(){try{if(g&&!g.st)g.st=Z()}catch(e){}return _a.apply(this,arguments)}})();
// Name & jersey: saving works even if some boxes aren't on this screen (pro, etc.)
function jr(){const v=(id,d)=>{const e=$(id);return e?e.value:d},J=S.jy||{},A=S.ap||{};S.jy={c1:v('#j1',J.c1),c2:v('#j2',J.c2),hc:v('#jh',J.hc),nc:v('#jc',J.nc),pc:v('#jp',J.pc),d:+v('#jd',J.d||0),nm:String(v('#jn',J.nm||'')).toUpperCase().slice(0,12)};S.num=cl(+v('#jb',S.num)||0,0,99);S.ap={...A,sk:+v('#as',A.sk||0),hr:+v('#ah',A.hr||0),hcl:v('#ac',A.hcl),fh:+v('#af',A.fh||0),ht:+v('#at',A.ht||0),bd:+v('#ab',A.bd||0)};try{lockP()}catch(e){}}
// existing saves: renamed stars get their new names on rosters too; no active player shares a legend's name (that's where Reggie White's ★ came from)
(()=>{const _h=hub;hub=function(){try{if(S&&S.ro&&!S.gren2){const GR={['Eric Dona'+'van']:'Eric Darnold'};let leg=[];try{leg=GOAT.split(';').map(x=>x.split('|')[0])}catch(e){}
 for(const k in S.ro){const L=S.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x)return;if(GR[x.n])x.n=GR[x.n];else if(leg.includes(x.n)&&!PKS.some(q=>q[2]==x.n)&&!QBB.some(b=>b[0]==x.n)&&!QBP.some(q=>q[0]==x.n)&&x.n!=S.name){x.n=uNm(Math.random)}})}S.gren2=1}}catch(e){}return _h.apply(this,arguments)}})();
try{GOAT.split(';').forEach(x=>NRES.add(x.split('|')[0]))}catch(e){}
// ===================== roster fixes for takeover saves =====================
try{const b=QBB.find(x=>x[0]=='Jacque Hilton');if(b){b[3]=16;b[1]=73}}catch(e){}
function rosFix1(){try{if(!S||S.stage!='pro'||!S.ro||S.rfx1)return;S.rfx1=1;const yr=yrN(),gen=(x)=>{x.n=uNm(Math.random);delete x.npx;x.h=[];x.cs={};x.tm=[];x.ny=0;x.aw={};x.age=x.age||24};
 // the class that was drafted the moment a takeover began goes back to college until Draft week
 if(S.tk&&!S.tkPend&&S.npb&&S.npb[yr]&&S.npx){S.npx.forEach(p=>{if(!p.pro||p.pro.yr!=yr)return;for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x&&x.npx===p.id)gen(x)})}p.pro=null;p.ins=0});delete S.npb[yr];S.tkPend=1;S.npdk=1}
 // Jacque Hilton is the Philadelphia backup (76, big arm)
 const phi=S.T.findIndex(t=>pIdx(t)==16);if(phi>=0){let src=null;for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L)){const i=L.findIndex(x=>x&&x.n=='Jacque Hilton');if(i>=0)src={L,i}}}const P=rost('h.'+phi);if(src&&!(src.L===P&&src.i==23)){const hj=src.L[src.i],cur=P[23];P[23]=hj;src.L[src.i]=cur;if(cur&&src.L!==P){}else if(cur)gen(cur)}if(P[23]&&P[23].n=='Jacque Hilton'){P[23].ovr=73;P[23].pw=99}}
 save()}catch(e){console.warn('rosFix1',e)}}
(()=>{const _h=hub;hub=function(){try{rosFix1()}catch(e){}return _h.apply(this,arguments)}})();
// bye week: your agent checks in with a tip (better agents give more useful tips)
(()=>{const _p=phub;phub=function(){try{const e=pevt();if(e&&e.t=='bye'&&S.agent&&S.byeTip!==S.py+':'+S.wk){S.byeTip=S.py+':'+S.wk;const A=S.agent,sk=A.sk||A.s||70,nm=(A.n||'Your agent').split(' ').pop(),tips=[];
 if((S.pts||0)>=2)tips.push(`you have ${S.pts} training points sitting there. Spend them.`);
 try{if((S.deals||[]).some(d=>!d.t&&dealOk(d)))tips.push('there are endorsement deals you can sign right now.')}catch(_){}
 if(S.ct&&S.ct.yrs<=1)tips.push('your contract is almost up. Start thinking about an extension.');
 tips.push('get a workout in this week.','check your social media, the fans want to hear from you.');
 const n=sk>=85?3:sk>=70?2:1;HM=(HM?HM+' ':'')+'📞 Bye week · '+nm+': '+tips.slice(0,n).join(' Also, ')}}catch(_){}return _p.apply(this,arguments)}})();
