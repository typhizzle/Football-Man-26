// ===================== 🏟 CONFERENCE SCHEDULES + RECORDS (real conference game counts) =====================
const ccapC=ci=>{try{const n=S.col[ci].n;return /Large 10|South Country|Large 12/.test(n)?9:8}catch(e){return 8}};
const ccap=i=>{try{return ccapC(S.T[i].cf)}catch(e){return 8}};
const cfgKey=()=>(S.cy||0)+'|'+yrN();
// which scheduled games are conference games (decided when the schedule is made)
function cfgBuild(){const T=S.T,W=S.csch||[],cnt=T.map(()=>0),keys=[];W.forEach(wk=>wk.forEach(([a,b])=>{if(T[a]&&T[b]&&T[a].cf!=null&&T[a].cf==T[b].cf&&cnt[a]<ccap(a)&&cnt[b]<ccap(b)){cnt[a]++;cnt[b]++;keys.push(a<b?a+','+b:b+','+a)}}));S.cfg={k:cfgKey(),g:keys}}
// conference record = scheduled conference games + the conference title game only
function confFix(){try{if(!S||S.stage!='col'||!Array.isArray(S.csch))return;if(!S.cfg||S.cfg.k!=cfgKey())cfgBuild();const T=S.T,set=new Set(S.cfg.g),G=(S.grk==grK()&&S.gr)||[],n=S.csch.length;
 T.forEach(t=>{t.cw=0;t.cl=0});
 for(let w=0;w<=n&&w<G.length;w++)(G[w]||[]).forEach(([a,b,sa,sb])=>{if(!T[a]||!T[b])return;const k=a<b?a+','+b:b+','+a,cc=w==n&&T[a].cf==T[b].cf;if(!(w<n&&set.has(k))&&!cc)return;const wi=sa>sb?a:b,li=wi==a?b:a;T[wi].cw++;T[li].cl++})}catch(e){console.warn('confFix',e)}}
(()=>{const _c=colSched;colSched=function(){const W=_c.apply(this,arguments);try{const T=S.T,cnt=T.map(()=>0),keys=[];W.forEach(wk=>wk.forEach(([a,b])=>{if(T[a].cf==T[b].cf){cnt[a]++;cnt[b]++;keys.push(a<b?a+','+b:b+','+a)}}));S.cfg={k:cfgKey(),g:keys}}catch(e){}return W}})();
(()=>{const _w=cWeek;cWeek=function(){const r=_w.apply(this,arguments);confFix();return r}})();
(()=>{const _h=hub;hub=function(){try{confFix()}catch(e){}return _h.apply(this,arguments)}})();

// ===================== 🗳 THE POLL (rebuilt): starts from last week's full poll and moves teams by rules =====================
function crInertia(C){const T=S.T,cw=S.wk||0,gl=C.gl,L=C.L,W=C.W;
 const H=S.crh&&S.crh.k==grK()?S.crh.w:null;let PV=null,K_=-1;if(H){const ks=Object.keys(H).map(Number).filter(w=>cw?w<cw:true).sort((a,b)=>b-a);if(ks.length){K_=ks[0];PV=H[K_]}}
 const p4=i=>{try{return cfP4(S.col[T[i].cf].n)}catch(e){return false}},gp=i=>W[i]+L[i],wp=i=>gp(i)?W[i]/gp(i):.5,q=o=>.5*wp(o)+(p4(o)?.5:.08);
 // résumé: every win is worth more against a better team; losses cost a lot, more to weak teams and by big margins
 const base=T.map((t,i)=>gl[i].reduce((s,x)=>s+(x.w?(.25+q(x.o))*2.5:-(7+(1-q(x.o))*6+Math.min(28,Math.abs(x.m||0))/7)),0)+(p4(i)?8:0)+(t.ovr||60)*.02);
 const r0={};T.map((t,i)=>i).sort((a,b)=>base[b]-base[a]).forEach((t,k)=>r0[t]=k+1);const top25=o=>r0[o]<=25,top10=o=>r0[o]<=10;
 const rw=i=>gl[i].filter(x=>x.w&&top25(x.o)).length,t10=i=>gl[i].filter(x=>x.w&&top10(x.o)).length;
 const chmp=new Set((S.cch||[]).length&&(S.wk||0)>=(Array.isArray(S.csch)?S.csch.length:13)?S.cch:[]);
 const RS=T.map((t,i)=>base[i]+rw(i)*2.5+t10(i)*1.5+(chmp.has(i)?4:0));try{window._RS=RS}catch(e){}
 const rr={};T.map((t,i)=>i).sort((a,b)=>RS[b]-RS[a]).forEach((t,k)=>rr[t]=k+1);
 let ord;
 if(!PV){const lf=(S.crLast&&S.crLast.n)||[],pre=i=>{const k=lf.indexOf(T[i].n);return Math.max((T[i].ovr||60)+(p4(i)?6:0),k>=0?(T[i].ovr||60)*.5+(p4(i)?3:0)+47-k*1.1:0)};ord=T.map((t,i)=>i).sort((a,b)=>(gp(a)+gp(b)==0)?pre(b)-pre(a):RS[b]-RS[a])}
 else{const prev=PV.slice(),inP=new Set(prev);T.map((t,i)=>i).filter(i=>!inP.has(i)).sort((a,b)=>RS[b]-RS[a]).forEach(i=>prev.push(i));const pr={};prev.forEach((t,k)=>pr[t]=k+1);
  const wPrev=cl(.75-cw*.05,.25,.75),tg={},win={},lc={};
  T.forEach((t,i)=>{const p=pr[i],nw=gl[i].filter(x=>x.wk>=K_),ls=nw.filter(x=>!x.w),bl=p*wPrev+rr[i]*(1-wPrev);
   if(p>30){if(ls.length){tg[i]=Math.max(bl,26,p+2)+.5;lc[i]=p+14}else{if(nw.length)win[i]=p;tg[i]=Math.min(bl,p+1)}return}
   if(!nw.length){tg[i]=bl;return}
   if(!ls.length){win[i]=p;tg[i]=Math.min(bl,p+1);return}
   const op=Math.min(...ls.map(x=>pr[x.o]||999)),mg=Math.min(...ls.map(x=>x.m||0));let d=op<=10?4:op<=25?6:op<=50?8:11;if(mg>=-7)d-=2;if(mg<=-21)d+=3;if(rw(i)==0)d+=2;
   tg[i]=Math.max(bl,p+Math.max(1,Math.round(d*.5)))+.5;lc[i]=p+d+3});
  ord=T.map((t,i)=>i).sort((a,b)=>tg[a]-tg[b]||RS[b]-RS[a]);C._win=win;C._lc=lc}
 const ahead=(a,b)=>ord.indexOf(a)<ord.indexOf(b),mv=(i,j)=>{const a=ord.indexOf(i);ord.splice(a,1);ord.splice(ord.indexOf(j),0,i)};
 // your rules
 const lostNow=new Set(PV?T.map((t,i)=>i).filter(i=>gl[i].some(x=>x.wk>=K_&&!x.w)):[]);const moved=new Set(lostNow);for(let pass=0;pass<6;pass++){let ch=0;const top=ord.slice(0,60).filter(i=>!moved.has(i));
  // same losses: a team with a ranked win over a team without one
  if(cw>=5)top.forEach(i=>{if(rw(i)<1)return;const j=ord.find(t=>t!=i&&L[t]==L[i]&&rw(t)==0&&ahead(t,i)&&ord.indexOf(i)-ord.indexOf(t)<=10);if(j!=null){mv(i,j);moved.add(i);ch=1}});
  // same losses: Power Four over a small-conference team (unless the small-conference team has 2+ more ranked wins)
  top.forEach(i=>{if(!p4(i)||lostNow.has(i))return;const j=ord.find(t=>t!=i&&!p4(t)&&L[t]==L[i]&&ahead(t,i)&&rw(t)<rw(i)+2&&ord.indexOf(i)-ord.indexOf(t)<=10);if(j!=null){mv(i,j);moved.add(i);ch=1}});
  // small-conference teams: fewer losses first (unless the other has 2+ more ranked wins)
  top.forEach(i=>{if(p4(i)||lostNow.has(i))return;const j=ord.find(t=>t!=i&&!p4(t)&&L[t]>L[i]&&ahead(t,i)&&rw(t)<rw(i)+2&&ord.indexOf(i)-ord.indexOf(t)<=10);if(j!=null){mv(i,j);moved.add(i);ch=1}});
  // head-to-head with the same number of losses (unless the loser only lost to ranked teams, the winner lost to an unranked team, and it was close)
  top.forEach(b=>{if(lostNow.has(b))return;gl[b].filter(x=>x.w).forEach(x=>{const a=x.o;if(L[a]!=L[b]||!ahead(a,b)||ord.indexOf(b)>50)return;const aRanked=gl[a].filter(y=>!y.w).every(y=>top25(y.o)),bBad=gl[b].some(y=>!y.w&&!top25(y.o));if(aRanked&&bBad&&(x.m||0)<=7)return;mv(b,a);ch=1})});
  if(!ch)break}
 // a team that won never falls more than 2 spots; a loss never drops a team more than its set amount
 const win=C._win||{},lc=C._lc||{};for(let pass=0;pass<12;pass++){Object.keys(win).map(Number).sort((a,b)=>win[a]-win[b]).forEach(i=>{const k=ord.indexOf(i),cap=win[i]+1;if(k>cap){ord.splice(k,1);ord.splice(cap,0,i)}});
  Object.keys(lc).map(Number).sort((a,b)=>lc[a]-lc[b]).forEach(i=>{const k=ord.indexOf(i),cap=lc[i]-1;if(k>cap&&cap<ord.length){ord.splice(k,1);ord.splice(cap,0,i)}})}
 // after that: same record, but they just beat a ranked team this week and you didn't → they can pass you even though you won
 if(PV)ord.slice(0,60).forEach(i=>{if(lostNow.has(i))return;const nw=gl[i].filter(x=>x.wk>=K_&&x.w&&top25(x.o));if(!nw.length)return;const j=ord.find(t=>t!=i&&L[t]==L[i]&&W[t]==W[i]&&!gl[t].some(x=>x.wk>=K_&&x.w&&top25(x.o))&&rw(t)<rw(i)&&ahead(t,i)&&ord.indexOf(i)-ord.indexOf(t)<=6);if(j!=null)mv(i,j)});
 // a Power Four champion with ranked wins and 2 or fewer losses ranks over a small-conference team with no ranked wins
 try{const chs=new Set((S.cch||[]).length&&(S.wk||0)>=(Array.isArray(S.csch)?S.csch.length:13)?S.cch:[]);ord.slice(0,30).forEach(i=>{if(!chs.has(i)||!p4(i)||L[i]>2||rw(i)<1)return;const j=ord.find(t=>t!=i&&!p4(t)&&rw(t)==0&&ahead(t,i)&&ord.indexOf(i)-ord.indexOf(t)<=4);if(j!=null)mv(i,j)})}catch(e){}
 // undefeated teams always over teams with 3+ losses
 ord.slice(0,80).forEach(i=>{if(L[i]!=0||gp(i)<3)return;const j=ord.find(t=>L[t]>=3&&ahead(t,i));if(j!=null)mv(i,j)});
 // last word: head-to-head between teams with the same losses (your exceptions apply; split series and circles are left alone)
 for(let pass=0;pass<4;pass++){let ch=0;ord.slice(0,50).forEach(b=>{gl[b].filter(x=>x.w).forEach(x=>{const a=x.o;if(L[a]!=L[b]||!ahead(a,b))return;const ia=ord.indexOf(a),ib=ord.indexOf(b);if(ib-ia>20||ib>50)return;if(gl[a].some(y=>y.o==b&&y.w))return;
  const between=ord.slice(ia,ib);if(between.some(t=>t!=a&&gl[t].some(y=>y.o==b&&y.w)))return;const aR=gl[a].filter(y=>!y.w).every(y=>top25(y.o)),bB=gl[b].some(y=>!y.w&&!top25(y.o));if(aR&&bB&&(x.m||0)<=7)return;mv(b,a);ch=1})});if(!ch)break}
 C.ord=ord;const pos={};ord.forEach((t,k)=>pos[t]=k+1);C.pos=pos}
// one-time: rebuild this season's weekly polls with the new rules (old history came from the broken system)
function crReplay(){try{if(!S||S.stage!='col'||!S.crh||S.crh.v==2||S.crh.k!=grK())return;const G=S.gr||[],wk0=S.wk||0,H={};S.crh={k:grK(),w:H,v:2};
 for(let w=0;w<=wk0;w++){S.gr=G.slice(0,w);S.wk=w;CRC=null;H[w]=crCalc().ord.slice()}S.gr=G;S.wk=wk0;CRC=null;save()}catch(e){console.warn('crReplay',e)}}
(()=>{const _s=crSnap;crSnap=function(){const r=_s.apply(this,arguments);try{if(S.crh)S.crh.v=2}catch(e){}return r}})();
(()=>{const _h=hub;hub=function(){try{crReplay()}catch(e){}return _h.apply(this,arguments)}})();
// ===================== 🎟 PLAYOFF: only teams from the top 10 conferences can make it =====================
function cfpConfs(){const k=grK();if(S.cfpE&&S.cfpE.k==k)return S.cfpE.c;const T=S.T,by={};T.forEach(t=>{(by[t.cf]=by[t.cf]||[]).push(t.ovr||60)});
 const sc=Object.keys(by).map(Number).map(ci=>({ci,v:by[ci].reduce((a,b)=>a+b,0)/by[ci].length+(cfP4(S.col[ci].n)?100:0)})).sort((a,b)=>b.v-a.v);const c=sc.slice(0,10).map(x=>x.ci);S.cfpE={k,c};return c}
// (which 5 conferences sit out is still being decided, so every conference is eligible for now)
const CFP10=false;const cfpEl=i=>{if(!CFP10)return true;try{return cfpConfs().includes(S.T[i].cf)}catch(e){return true}};
function cfpField(){const rk=crRank().filter(cfpEl),C=crCalc(),chs=crChamps(),auto=rk.filter(i=>chs.includes(i)).slice(0,5);let at=rk.filter(i=>!auto.includes(i)).slice(0,7);
 const und=rk.filter(i=>!auto.includes(i)&&!at.includes(i)&&C.L[i]==0&&C.W[i]>=11).slice(0,2);und.forEach(u=>{const j=[...at].reverse().find(x=>!(C.L[x]==0&&C.W[x]>=11));if(j!=null)at[at.indexOf(j)]=u});
 const f=[...auto,...at].sort((a,b)=>C.pos[a]-C.pos[b]);return{f,auto,at}}

// remember the final poll for next year's preseason
(()=>{const _n=colNext;colNext=function(){try{if(S&&S.stage=='col'){CRC=null;const C=crCalc();S.crLast={n:C.ord.slice(0,25).map(i=>S.T[i].n)}}}catch(e){}return _n.apply(this,arguments)}})();

// ===================== 🏟 10 CONFERENCES (5 smaller ones are gone) =====================
const C10DROP=['Gulf Conference','Capital Conference','Piedmont Conference','Pacific Conference','Lakes Conference'],C10ALT=['Harbor Conference','Mountain Conference'];
function cut10(inCol){try{if(!S||!Array.isArray(S.col)||S.c10)return false;let keep=null;
 if(inCol&&S.T&&S.T[0]&&S.col[S.T[0].cf])keep=S.col[S.T[0].cf].n;else if(S.commit){const c=S.col.find(c=>c.t.some(t=>t.n==S.commit));if(c)keep=c.n}
 const need=Math.max(0,S.col.length-10);let drop=C10DROP.filter(n=>n!=keep&&S.col.some(c=>c.n==n));for(const a of C10ALT){if(drop.length>=need)break;if(a!=keep&&S.col.some(c=>c.n==a))drop.push(a)}
 // weakest other small conferences if the names differ in this save
 if(drop.length<need){const P=/Large|South Country|Atlantic Country/;S.col.map(c=>({n:c.n,v:c.t.reduce((x,t)=>x+(t.ovr||60),0)/c.t.length})).filter(c=>!P.test(c.n)&&c.n!=keep&&!drop.includes(c.n)).sort((a,b)=>a.v-b.v).forEach(c=>{if(drop.length<need)drop.push(c.n)})}
 drop=drop.slice(0,need);
 // teams you named in a removed conference move into a remaining conference, taking a generic team's spot (name, colors, strength)
 try{const me=S.T&&S.T[0]?S.T[0].n:null,keepC=S.col.filter(c=>!drop.includes(c.n)),lost=S.col.filter(c=>drop.includes(c.n)).flatMap(c=>c.t).filter(t=>{const w=String(t.n).split(' ');return !(w.length==2&&UN.includes(w[0])&&MS.includes(w[1]))});
  const P4=/Large|South Country|Atlantic Country/,gen=n=>{const w=String(n).split(' ');return w.length==2&&UN.includes(w[0])&&MS.includes(w[1])},slots=keepC.filter(c=>!P4.test(c.n)).map(c=>({c,L:c.t.filter(t=>gen(t.n)&&t.n!=me&&!NSKEEP.includes(t.n)&&!(((S.crLast||{}).n)||[]).includes(t.n)).sort((x,y)=>(x.ovr||60)-(y.ovr||60))})).filter(x=>x.L.length);let k=0;
  lost.forEach(u=>{for(let tries=0;tries<slots.length;tries++){const sl=slots[(k+tries)%slots.length];if(sl.L.length){const t=sl.L.shift();const was=t.n;['n','ab','sh','mas','c1','c2','d','ovr','cch','hc'].forEach(f=>{if(u[f]!=null)t[f]=u[f]});k=(k+tries+1)%slots.length;(S.c10mv=S.c10mv||[]).push(u.n+' → '+sl.c.n.replace(' Conference','')+' (replaces '+was+')');return}}});
 }catch(e){console.warn('c10 move',e)}
 if(!S.col.some(c=>drop.includes(c.n))){S.c10=1;return false}
 if(!inCol){S.col=S.col.filter(c=>!drop.includes(c.n));const names=new Set(S.col.flatMap(c=>c.t.map(t=>t.n)));if(Array.isArray(S.off))S.off=S.off.filter(o=>names.has(o.n));S.c10=1;return true}
 const oldT=S.T,xn=S.xfer!=null&&oldT[S.xfer]?oldT[S.xfer].n:null;S.col=S.col.filter(c=>!drop.includes(c.n));const all=[];S.col.forEach((c,ci)=>c.t.forEach(t=>{t.cf=ci;all.push(t)}));const k=all.indexOf(oldT[0]);if(k<0)return false;[all[0],all[k]]=[all[k],all[0]];
 const ro={};for(const key in S.ro){if(key.startsWith('h.')){const ni=all.indexOf(oldT[+key.slice(2)]);if(ni>=0)ro['h.'+ni]=S.ro[key]}else ro[key]=S.ro[key]}S.ro=ro;S.T=all;S.xfer=xn!=null?all.findIndex(t=>t.n==xn):null;if(S.xfer<0)S.xfer=null;
 S.csch=colSched();S.cfg=null;S.cfpE=null;CRC=null;S.c10=1;HM=(HM?HM+' ':'')+'🏟 College football is down to 10 conferences this season.';return true}catch(e){console.warn('cut10',e);return false}}
// new careers and high school saves: right away; college saves: when the next season starts
(()=>{const _s=start;start=function(){const r=_s.apply(this,arguments);try{if(S&&(S.stage||'hs')=='hs'){cut10(false);save()}}catch(e){}return r}})();
(()=>{const _n=colNext;colNext=function(){const cy0=S&&S.cy;const r=_n.apply(this,arguments);try{if(S&&S.stage=='col'&&S.cy!=cy0&&(S.wk||0)==0&&!S.c10){if(cut10(true)){save();hub()}}}catch(e){}return r}})();
(()=>{const _h=hub;hub=function(){try{if(S&&(S.stage||'hs')=='hs'&&!S.c10)cut10(false)}catch(e){}return _h.apply(this,arguments)}})();
