// ===================== 🏛 LEAGUE OFFICE: a contract for every player · AI GMs · free agency · releases · trades · a real draft every year · transactions =====================
// Free agents live in S.ro.fa (so every "does he exist?" check sees them); retired players go to S.retd. Nobody is ever deleted.
const LGMAX=46,LGMIN=38,LGN={QB:3,RB:3,WR:6,TE:3,OL:8,DL:8,LB:6,DB:8,K:1};
const lgGrp=p=>/^(LT|LG|C|RG|RT|OL|G|T)$/.test(p)?'OL':/^(DE|DT|DL|EDGE)$/.test(p)?'DL':/^(OLB|MLB|LB|ILB)$/.test(p)?'LB':/^(CB|S|FS|SS|DB)$/.test(p)?'DB':(p=='P'||p=='K')?'K':p;
const LGSL={QB:[0,23,24],RB:[1],WR:[2,3,4],TE:[5],OL:[6,7,8,9,10],DL:[11,12,13,14],LB:[15,16,17],DB:[18,19,20,21],K:[22]};
const lgCap=()=>{const Y=yrN();if(S.lgCapY&&S.lgCapY[0]==Y)return S.lgCapY[1];let avg=0;try{const P=lgTeams().map(T=>lgPay(T.L));avg=P.reduce((a,b)=>a+b,0)/Math.max(1,P.length)}catch(e){}const c=Math.round(Math.max(255*Math.pow(1.055,Math.max(0,Y-2026)),avg*1.1));S.lgCapY=[Y,c];return c};
const lgSeed=k=>rng((S.seed||1)*131+hsh(String(k)));
const lgVal=x=>{const a=x.age||26,o=x.ovr||50,p=x.pot||o;return o+(a<26?(p-o)*.35:0)-(a>30?(a-30)*1.6:0)};
function lgMkt(x){let s=1;try{s=ctEst(x.pos=='EDGE'?'DE':x.pos||'WR',x.ovr||50,x.age||26,capN())}catch(e){}return Math.max(.8,+(+s).toFixed(1))}
const lgStar=n=>PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n);
function lgFA(){S.ro=S.ro||{};if(!Array.isArray(S.ro.fa))S.ro.fa=[];return S.ro.fa}
function lgTeams(){const out=[];if(!S||S.stage!='pro'||!S.T)return out;S.T.forEach((t,i)=>{let L;try{L=rost('h.'+i)}catch(e){return}if(!Array.isArray(L))return;const pi=pIdx(t);out.push({t,i,L,pi,code:pi>=0?TA[pi]:tAb(t)})});return out}
const lgMe=(T,k,x)=>x&&(x.n==S.name||(T.i==0&&k==0));
function lgCtNew(x,yrs,sal,how){const y=yrN();x.ct={sal:+(+sal).toFixed(1),yrs,y:yrs,exp:y+yrs-1,gtd:Math.round(35+Math.min(50,(x.ovr||60)-50)),bonus:+(sal*yrs*.12).toFixed(1),st:'act',how:how||'sign',s:y};return x.ct}
function lgCtInit(x){if(!x||x.ct||x.n==S.name)return;const r=lgSeed('ct'+x.n);let sal=lgMkt(x),left=1+Math.floor(r()*4);
 try{const b=(typeof PKC!='undefined'&&PKC[x.n])||null,q=(typeof QBC!='undefined'&&QBC[x.n])||null,base=b?[b[1],b[2],b[3]]:q?[q[0],q[1],'']:null;if(base){const c=lgCt(x.n,lgGrp(x.pos)=='DL'?'EDGE':x.pos,x.ovr,x.age,base);sal=c.sal;left=Math.max(1,c.left)}}catch(e){}
 if(!(sal>0))sal=1;lgCtNew(x,left+(r()<.3?1:0),sal*(.85+r()*.3),'orig');x.ct.y=left;x.ct.exp=yrN()+left-1}
function lgPay(L){return L.reduce((a,x)=>a+(x&&x.ct&&x.n!=S.name?x.ct.sal:0),0)}
function lgTx(o){S.tx=S.tx||[];o.y=o.y||yrN();o.w=o.w||lgPhaseNm();S.tx.unshift(o);if(S.tx.length>1400){const keep=S.tx.filter((e,i)=>i<700||e.big);S.tx=keep.slice(0,1400)}}
const lgPhaseNm=()=>S.ofs?(OFFW[S.ofs.w]||['Offseason'])[0].replace(/^[^ ]+ /,''):'Offseason';
const lgBig=x=>(x.ovr||0)>=78||lgStar(x.n);
const lgCount=(L,G)=>L.filter((x,k)=>x&&lgGrp(x.pos)==G).length;
function lgWorstStarter(T,G){const ss=LGSL[G].filter(k=>!(G=='QB'&&k>0)||G!='QB');const sl=G=='QB'?[0]:LGSL[G];let w=99,wk=sl[0];sl.forEach(k=>{const x=T.L[k];const o=x?(lgMe(T,k,x)?99:(x.ovr||0)):0;if(o<w){w=o;wk=k}});return{o:w,k:wk}}
function lgRemove(T,x){const k=T.L.indexOf(x);if(k<0)return;if(k>=25){T.L.splice(k,1);return}
 // never leave an empty starting spot: the best backup at that spot steps up (or a tryout guy is signed)
 const G=k>=23||k==0?'QB':lgGrp(POSL[k]);let bi=-1,bo=-1;T.L.forEach((y,i)=>{if(i>=25&&y&&lgGrp(y.pos)==G&&(y.ovr||0)>bo){bo=y.ovr||0;bi=i}});if(bi>=0){T.L[k]=T.L[bi];T.L.splice(bi,1)}else T.L[k]=lgTry(T,G,k)}
function lgToFA(T,x,why){lgRemove(T,x);x.prev=T.code;if(x.ct)x.ct.st='fa';x.fa=yrN();lgFA().push(x);if(why)lgTx({t:why,n:x.n,pos:x.pos,ovr:x.ovr,age:x.age,from:T.code,to:'FA',big:lgBig(x)})}
function lgAdd(T,x){const k=T.L.findIndex((y,i)=>i<25&&!y&&(POSL[i]?lgGrp(POSL[i])==lgGrp(x.pos):i>=23&&x.pos=='QB'));if(k>=0)T.L[k]=x;else T.L.push(x);const used=new Set(T.L.filter(y=>y&&y!==x).map(y=>+y.num));if(used.has(+x.num)){const R_=NR[x.pos]||NR[POSL.find(p=>lgGrp(p)==lgGrp(x.pos))]||[1,99];const r=lgSeed(x.n+T.code);let g=0;do x.num=R_[0]+Math.floor(r()*(R_[1]-R_[0]+1));while(used.has(+x.num)&&g++<60)}x.fa=null;x.prev=null;if(lgStar(x.n)){S.mv=S.mv||{};S.mv[x.n]=[T.pi,x.pos=='QB'?23:Math.max(1,POSL.indexOf(x.pos))];try{mvApply()}catch(e){}}}
// ---------- depth chart = an ordering of the players a team actually has ----------
function lgDepth(T){const L=T.L,all=L.filter(Boolean),me=all.find(x=>x.n==S.name&&T.i==0),out=new Array(25).fill(null);if(me)out[0]=me;const used=new Set(me?[me]:[]);
 Object.keys(LGSL).forEach(G=>{const sl=LGSL[G].filter(k=>!(me&&k==0));const C=all.filter(x=>!used.has(x)&&lgGrp(x.pos)==G).sort((a,b)=>(b.ovr||0)-(a.ovr||0));
  // keep the guy in a slot if he's as good as anyone else for it (no shuffling for nothing)
  sl.forEach((k,j)=>{const c=C[j];if(c){out[k]=c;used.add(c)}})});
 const rest=all.filter(x=>!used.has(x)).sort((a,b)=>lgGrp(a.pos).localeCompare(lgGrp(b.pos))||(b.ovr||0)-(a.ovr||0));T.L.length=0;out.forEach((x,k)=>T.L[k]=x);rest.forEach(x=>T.L.push(x))}
// ---------- a fresh, different-every-save draft class each year ----------
const LGDP=[['QB',.07],['RB',.08],['WR',.14],['TE',.06],['LT',.04],['LG',.04],['C',.04],['RG',.04],['RT',.04],['DE',.08],['DT',.07],['OLB',.07],['MLB',.05],['CB',.1],['S',.07],['K',.01]];
function lgClass(Y){const r=lgSeed('dc'+Y),taken=new Set();for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>x&&taken.add(x.n))}
 const cols=(S.col||[]).flatMap(c=>c.t.map(t=>t.n));const N=320,out=[];
 for(let i=0;i<N;i++){let u=r(),pos='WR';for(const[p,w]of LGDP){if((u-=w)<0){pos=p;break}}
  const tier=i<12?0:i<40?1:i<100?2:i<224?3:4;let o=[[72,80],[67,75],[62,71],[55,66],[45,60]][tier];let ovr=o[0]+Math.floor(r()*(o[1]-o[0]+1));if(tier==0&&r()<.12)ovr=Math.min(87,ovr+2+Math.floor(r()*6));
  const age=21+Math.floor(r()*3),pot=Math.min(99,ovr+6+Math.floor(r()*(tier<2?20:16)));let n,g=0;do n=uNm(r);while(taken.has(n)&&g++<40);taken.add(n);
  out.push({n,pos,ovr,pot,age,col:cols.length?cols[Math.floor(r()*cols.length)]:'',gr:+(ovr+(pot-ovr)*.45+r()*4).toFixed(1)})}
 return out.sort((a,b)=>b.gr-a.gr)}
function lgDraft(){const Y=yrN();S.dc=S.dc||{};if(S.dc[Y]&&S.dc[Y].done)return;const TT=lgTeams();if(!TT.length)return;const P=lgClass(Y),r=lgSeed('dord'+Y);
 const ord=TT.slice().sort((a,b)=>{const wa=(a.t.w||0)/Math.max(1,(a.t.w||0)+(a.t.l||0)),wb=(b.t.w||0)/Math.max(1,(b.t.w||0)+(b.t.l||0));return wa-wb||(a.t.ovr||0)-(b.t.ovr||0)});
 const picks=[];for(let rd=1;rd<=7;rd++)ord.forEach((T,j)=>{const need=G=>Math.max(0,LGN[G]-lgCount(T.L,G));let bi=0,bs=-1e9;P.forEach((p,i)=>{if(p.tk||i>60+picks.length)return;const G=lgGrp(p.pos);const sc=p.gr+need(G)*2.2-(G=='QB'&&T.i==0?6:0)-(G=='K'&&rd<5?20:0)+r()*2;if(sc>bs){bs=sc;bi=i}});const p=P[bi];p.tk=1;const no=(rd-1)*ord.length+j+1;
  const x={n:p.n,pos:p.pos,num:(NR[p.pos]||[1,99])[0],ovr:p.ovr,age:p.age,pot:p.pot,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},dr:{y:Y,r:rd,p:no,tm:T.code,col:p.col}};
  lgCtNew(x,4,rd==1?Math.max(1,+(11.5-no*.3).toFixed(1)):rd==2?2:1,'rookie');lgAdd(T,x);picks.push({r:rd,p:no,tm:T.code,n:p.n,pos:p.pos,ovr:p.ovr,pot:p.pot,age:p.age,col:p.col});
  lgTx({t:'draft',n:p.n,pos:p.pos,ovr:p.ovr,age:p.age,to:T.code,d:'Round '+rd+', pick '+no+(p.col?' · '+p.col:''),big:rd<=2})});
 // undrafted free agents: teams that are thin somewhere grab the best of the rest
 const ud=P.filter(p=>!p.tk);let nU=0;TT.forEach(T=>{Object.keys(LGN).forEach(G=>{while(lgCount(T.L,G)<Math.min(LGN[G],G=='K'?1:LGN[G]-1)&&T.L.filter(Boolean).length<LGMAX){const c=ud.find(p=>!p.tk&&lgGrp(p.pos)==G);if(!c)break;c.tk=1;nU++;const x={n:c.n,pos:c.pos,num:(NR[c.pos]||[1,99])[0],ovr:c.ovr,age:c.age,pot:c.pot,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},dr:{y:Y,r:0,tm:T.code,col:c.col}};lgCtNew(x,2,.8,'udfa');lgAdd(T,x);if(c.ovr>=62)lgTx({t:'udfa',n:c.n,pos:c.pos,ovr:c.ovr,age:c.age,to:T.code,d:'Undrafted free agent'})}})});
 S.dc[Y]={done:1,picks,ud:ud.filter(p=>!p.tk).slice(0,40).map(p=>({n:p.n,pos:p.pos,ovr:p.ovr,col:p.col}))};const ks=Object.keys(S.dc).sort();while(ks.length>12)delete S.dc[ks.shift()];return picks}
// ---------- the offseason, step by step ----------
function lgPh(){const Y=yrN();if(!S.lgPh||S.lgPh.y!=Y)S.lgPh={y:Y,p:0};return S.lgPh}
function lgOffA(){// expiring deals, extensions, cuts, trades, free agency opens
 const ph=lgPh();if(ph.p>=1)return;ph.p=1;const TT=lgTeams(),Y=ph.y,cap=lgCap(),FA=lgFA();
 TT.forEach(T=>T.L.forEach(x=>{if(x&&x.n!=S.name)lgCtInit(x)}));FA.forEach(x=>{if(!x.ct)lgCtInit(x)});
 let ext=0,left=0,cut=0,trd=0;
 TT.forEach(T=>{const r=lgSeed('ret'+T.code+Y);T.L.slice().forEach((x,k)=>{if(!x||lgMe(T,k,x)||!x.ct||x.ct.dk==Y)return;x.ct.dk=Y;x.ct.y--;if(x.ct.y>0)return;
  const G=lgGrp(x.pos),rk=T.L.filter(y=>y&&lgGrp(y.pos)==G&&(y.ovr||0)>(x.ovr||0)).length,starter=rk<(G=='QB'?1:LGSL[G].length),a=x.age||26,v=lgVal(x),mkt=lgMkt(x);
  const want=(starter&&a<=33&&v>=66)||((x.ovr||0)>=88&&a<=38)||(rk<LGN[G]&&a<=29&&v>=62)||(x.pot>=80&&a<=25);const room=cap-lgPay(T.L)>mkt*.9||(starter&&v>=78);
  let M={money:60,pt:60,win:60,loy:55};try{M=faMot(x.n)}catch(e){}
  if(want&&room&&r()<.82&&r()<.45+M.loy/180){const yrs=a<27?3+Math.floor(r()*3):a<31?2+Math.floor(r()*3):1+Math.floor(r()*2);lgCtNew(x,yrs,mkt*(1+r()*.12),'ext');ext++;lgTx({t:'ext',n:x.n,pos:x.pos,ovr:x.ovr,age:a,from:T.code,to:T.code,d:yrs+' yrs · $'+x.ct.sal+'M/yr',big:lgBig(x)})}
  else{lgToFA(T,x,'leave');left++;const e=S.tx[0];e.d=want?'Turned down the '+T.code+' extension':'Contract expired; not re-signed'}})});
 // cuts: bloated rosters and overpaid vets
 TT.forEach(T=>{const r=lgSeed('cut'+T.code+Y);const bench=()=>T.L.filter((x,k)=>x&&k>=25&&!lgMe(T,k,x));while(T.L.filter(Boolean).length>LGMAX-3){const b=bench().sort((a,c)=>lgVal(a)-lgVal(c))[0];if(!b)break;lgToFA(T,b,'rel');S.tx[0].d='Released (roster cut)';cut++}
  T.L.slice().forEach((x,k)=>{if(!x||lgMe(T,k,x)||!x.ct||x.ct.y<1)return;if((x.age||0)>=30&&x.ct.sal>lgMkt(x)*1.7&&x.ct.sal>4&&r()<.35){lgToFA(T,x,'rel');S.tx[0].d='Released ($'+x.ct.sal+'M/yr was too much for a '+x.ovr+')';cut++}})});
 // trades: a team deep at one spot sends a good backup to a team that needs a starter there, for a player back at a spot the other team is deep at
 const r=lgSeed('trd'+Y),nT=4+Math.floor(r()*6);for(let k=0;k<nT*6&&trd<nT;k++){const A=TT[Math.floor(r()*TT.length)],B=TT[Math.floor(r()*TT.length)];if(A===B)continue;const Gs=Object.keys(LGN).filter(g=>g!='K');const GA=Gs[Math.floor(r()*Gs.length)],GB=Gs[Math.floor(r()*Gs.length)];if(GA==GB)continue;
  const pa=A.L.filter((x,i)=>x&&i>=0&&!lgMe(A,i,x)&&lgGrp(x.pos)==GA&&!LGSL[GA].includes(i)).sort((a,b)=>b.ovr-a.ovr)[0],pb=B.L.filter((x,i)=>x&&!lgMe(B,i,x)&&lgGrp(x.pos)==GB&&!LGSL[GB].includes(i)).sort((a,b)=>b.ovr-a.ovr)[0];if(!pa||!pb)continue;
  const wB=lgWorstStarter(B,GA),wA=lgWorstStarter(A,GB);if(pa.ovr<wB.o+3||pb.ovr<wA.o+3||Math.abs(lgVal(pa)-lgVal(pb))>6)continue;
  lgRemove(A,pa);lgRemove(B,pb);lgAdd(B,pa);lgAdd(A,pb);trd++;lgTx({t:'trade',n:pa.n,pos:pa.pos,ovr:pa.ovr,age:pa.age,from:A.code,to:B.code,d:'Traded for '+pb.n+' ('+pb.pos+', '+pb.ovr+')',big:lgBig(pa)||lgBig(pb)});lgTx({t:'trade',n:pb.n,pos:pb.pos,ovr:pb.ovr,age:pb.age,from:B.code,to:A.code,d:'Traded for '+pa.n+' ('+pa.pos+', '+pa.ovr+')',big:lgBig(pa)||lgBig(pb)})}
 lgMarket(1);lgHoles();S.lgSum=`League offseason: ${ext} extensions, ${left} players hit free agency, ${cut} released, ${trd} trades.`;try{if(S.ofs)S.ofs.log.push('📰 '+S.lgSum)}catch(e){}}
// free agency: every team looks at its needs and its cap; players compare the offers and pick
function lgMarket(round){const TT=lgTeams(),FA=lgFA(),cap=lgCap(),Y=yrN(),r=lgSeed('mkt'+Y+round);let n=0;
 FA.slice().sort((a,b)=>lgVal(b)-lgVal(a)).forEach(p=>{if(p.n==S.name||(p.ret))return;const G=lgGrp(p.pos),mkt=lgMkt(p),a=p.age||26;const offers=[];
  TT.forEach(T=>{if(T.L.filter(Boolean).length>=LGMAX)return;if(G=='QB'&&T.i==0&&(p.ovr||0)<99)return;const w=lgWorstStarter(T,G),cnt=lgCount(T.L,G),start=(p.ovr||0)>w.o+1,depth=cnt<LGN[G]&&(p.ovr||0)>=58;if(!start&&!depth)return;
   const room=cap-lgPay(T.L);const sal=+(mkt*(start?1+r()*.2:.6+r()*.25)).toFixed(1);if(sal>room-1&&!(start&&(p.ovr||0)>=76&&room>-60))return;const yrs=a<27?2+Math.floor(r()*4):a<31?1+Math.floor(r()*3):1+Math.floor(r()*2);offers.push({T,sal,yrs,start})});
  if(!offers.length)return;let M={money:60,pt:60,win:60,loy:50};try{M=faMot(p.n)}catch(e){}const mx=Math.max(...offers.map(o=>o.sal));
  const sc=o=>(M.money*(o.sal/mx)+M.pt*(o.start?1:.3)+M.win*cl(((o.T.t.ovr||70)-60)/35,0,1))/(M.money+M.pt+M.win)+(o.T.code==p.prev?M.loy/400:0)+r()*.08;
  const best=offers.sort((x,y)=>sc(y)-sc(x))[0];const i=FA.indexOf(p);if(i>=0)FA.splice(i,1);lgCtNew(p,best.yrs,best.sal,'fa');const from=p.prev;lgAdd(best.T,p);n++;
  lgTx({t:'sign',n:p.n,pos:p.pos,ovr:p.ovr,age:a,from:from||'FA',to:best.T.code,d:best.yrs+' yrs · $'+best.sal+'M/yr'+(offers.length>1?' · picked over '+(offers.length-1)+' other offer'+(offers.length>2?'s':''):''),big:lgBig(p)})});return n}
function lgOffB(){const ph=lgPh();if(ph.p<1)lgOffA();if(ph.p>=2)return;ph.p=2;lgMarket(2);lgHoles()}
function lgOffC(){// draft, fill every hole, trim, retire the unsigned, set depth charts
 const ph=lgPh();if(ph.p<2)lgOffB();if(ph.p>=3)return;ph.p=3;try{lgDraft()}catch(e){console.warn(e)}lgMarket(3);lgFill();lgHoles();lgDedup()}
function lgHoles(){lgTeams().forEach(T=>{lgDepth(T);const FA=lgFA();for(let k=0;k<25;k++){if(T.L[k])continue;const G=k>=23?'QB':lgGrp(POSL[k]);const c=FA.filter(p=>lgGrp(p.pos)==G&&p.n!=S.name).sort((a,b)=>lgVal(b)-lgVal(a))[0];let x=c;
  if(c){FA.splice(FA.indexOf(c),1);lgCtNew(c,1,Math.max(.9,+(lgMkt(c)*.7).toFixed(1)),'fa');lgTx({t:'sign',n:c.n,pos:c.pos,ovr:c.ovr,age:c.age,from:c.prev||'FA',to:T.code,d:'1 yr · $'+c.ct.sal+'M (filling a hole at '+G+')',big:lgBig(c)});c.fa=null;c.prev=null}
  else{x=lgTry(T,G,k);}T.L[k]=x}})}
function lgUniq(r){const have=new Set();for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>x&&have.add(x.n))}(S.retd||[]).forEach(p=>have.add(p.n));let n,g=0;do n=uNm(r);while(have.has(n)&&g++<60);return n}
function lgTry(T,G,g){const r=lgSeed('fill'+T.code+yrN()+g+G+Math.random()),pos=G=='OL'?['LT','LG','C','RG','RT'][g%5]:G=='DL'?['DE','DT'][g%2]:G=='LB'?['OLB','MLB'][g%2]:G=='DB'?['CB','S'][g%2]:G;const o=50+Math.floor(r()*14),x={n:lgUniq(r),pos,num:(NR[pos]||[1,99])[0],ovr:o,age:22+Math.floor(r()*4),pot:o+Math.floor(r()*12),cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{}};lgCtNew(x,1,.8,'udfa');S.lgTry=(S.lgTry||0)+1;return x}
function lgFill(){const TT=lgTeams(),FA=lgFA(),Y=yrN();
 TT.forEach(T=>{Object.keys(LGN).forEach(G=>{const need=G=='K'?1:Math.max(LGSL[G].length+1,LGN[G]-2);let g=0;while(lgCount(T.L,G)<need&&g++<12){const c=FA.filter(p=>lgGrp(p.pos)==G&&p.n!=S.name).sort((a,b)=>lgVal(b)-lgVal(a))[0];
   if(c){FA.splice(FA.indexOf(c),1);lgCtNew(c,1,Math.max(.9,+(lgMkt(c)*.7).toFixed(1)),'fa');const fr=c.prev;lgAdd(T,c);lgTx({t:'sign',n:c.n,pos:c.pos,ovr:c.ovr,age:c.age,from:fr||'FA',to:T.code,d:'1 yr · $'+c.ct.sal+'M (filling a hole at '+G+')',big:lgBig(c)})}
   else lgAdd(T,lgTry(T,G,g))}});
  while(T.L.filter(Boolean).length>LGMAX){const b=T.L.filter((x,k)=>x&&k>=25&&!lgMe(T,k,x)).sort((a,c)=>lgVal(a)-lgVal(c))[0];if(!b)break;lgToFA(T,b,'rel');S.tx[0].d='Released (final cuts)'}
  {const cap=lgCap();let g=0;while(lgPay(T.L)>cap*1.04&&g++<12){const c=T.L.filter((x,k)=>x&&!lgMe(T,k,x)&&x.ct&&k!=0&&!(LGSL[lgGrp(x.pos)]||[]).slice(0,2).includes(k)).sort((a,b)=>(b.ct.sal-lgMkt(b))-(a.ct.sal-lgMkt(a)))[0];if(!c||c.ct.sal<2)break;lgToFA(T,c,'rel');S.tx[0].d='Released to get under the cap ($'+c.ct.sal+'M/yr)'}}
  lgDepth(T)});
 // free agents nobody wants for a while retire (they stay in the history)
 S.retd=S.retd||[];FA.slice().forEach(p=>{if(p.n==S.name)return;const a=p.age||26,yrs=Y-(p.fa||Y);if(a>=34||(a>=31&&lgVal(p)<62)||yrs>=2||(FA.length>160&&lgVal(p)<58)){FA.splice(FA.indexOf(p),1);S.retd.push({n:p.n,pos:p.pos,ovr:p.ovr,age:a,last:p.prev||'',y:Y});(S.svRet=S.svRet||[]).push(p.n);lgTx({t:'retire',n:p.n,pos:p.pos,ovr:p.ovr,age:a,from:p.prev||'FA',to:'Retired',d:'Retired as an unsigned free agent',big:lgBig(p)})}});
 // the pool stays a real market, not a warehouse: past 200, the least wanted call it a career
 if(FA.length>200){FA.sort((a,b)=>lgVal(b)-lgVal(a));FA.splice(200).forEach(p=>{S.retd.push({n:p.n,pos:p.pos,ovr:p.ovr,age:p.age,last:p.prev||'',y:Y});(S.svRet=S.svRet||[]).push(p.n);if(lgBig(p))lgTx({t:'retire',n:p.n,pos:p.pos,ovr:p.ovr,age:p.age,from:p.prev||'FA',to:'Retired',d:'Retired: no offers',big:1})})}
 if(S.retd.length>600)S.retd=S.retd.slice(-600);if(S.svRet&&S.svRet.length>900)S.svRet=S.svRet.filter(n=>lgStar(n)).concat(S.svRet.filter(n=>!lgStar(n)).slice(-600))}
// run the right piece in the right offseason week; never twice
(()=>{const _n=offNext;offNext=function(){const w0=S&&S.ofs?S.ofs.w:-1;try{if(S&&S.stage=='pro'&&S.ofs){const w=w0+1;if(w==3)lgOffA();else if(w==4)lgOffB();else if(w==5)lgOffC()}}catch(e){console.warn(e)}return _n.apply(this,arguments)}})();
(()=>{const _e=offEnd;offEnd=function(){try{if(S&&S.stage=='pro')lgOffC()}catch(e){console.warn(e)}return _e.apply(this,arguments)}})();
// the user changing teams: the starter you replace stays on the roster (QB2), and the team you leave promotes its best QB
(()=>{const _m=moveTo;moveTo=function(j){if(!j)return _m.apply(this,arguments);const old=S.ro&&S.ro['h.0'];S.vetP=null;const r=_m.apply(this,arguments);try{const L=S.ro['h.0'];if(L&&L[0]&&L[0].n!=S.name){const vet=L[0];L[0]={n:S.name,pos:'QB',num:S.num,ovr:qo(S.q),age:S.age,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},pot:qo(S.q)};const o23=L[23],o24=L[24];L[23]=vet;if(o23){L[24]=o23;if(o24)L.push(o24)}S.vet=vet.n;S.sq=vet.ovr}
  if(old&&old!==L){const me=old.findIndex(x=>x&&x.n==S.name);const qs=old.filter((x,k)=>x&&x.pos=='QB'&&x.n!=S.name).sort((a,b)=>(b.ovr||0)-(a.ovr||0));if(me>=0&&qs[0]){const k=old.indexOf(qs[0]);if(k<25)old[k]=null;else old.splice(k,1);old[me]=qs[0]}else if(me>=0)old[me]=null;
   const k2=Object.keys(S.ro).find(k=>S.ro[k]===old);const T={t:S.T[+String(k2).split('.')[1]],i:+String(k2).split('.')[1],L:old};if(k2&&T.t)lgDepth(T)}
  lgTx({t:'sign',n:S.name,pos:'QB',ovr:qo(S.q),age:S.age,from:old?'':'' ,to:tAb(S.T[0]),d:'You signed with the '+tn(S.T[0]),big:1})}catch(e){console.warn(e)}return r}})();
// free agents and retired players can't be "brought back" by the old star-fixers
(()=>{const gone=n=>{try{return lgFA().some(p=>p.n==n)||(S.retd||[]).some(p=>p.n==n)||(S.svRet||[]).includes(n)}catch(e){return false}};
 const _p=pkIns;pkIns=function(){const sv=[];PKS.forEach(q=>{if(gone(q[2])){sv.push([q,q[0]]);q[0]=-99}});try{return _p.apply(this,arguments)}finally{sv.forEach(([q,v])=>q[0]=v)}};
 const _q=qbbEns;qbbEns=function(){const sv=[];QBB.forEach(b=>{if(gone(b[0])){sv.push([b,b[3]]);b[3]=-99}});try{return _q.apply(this,arguments)}finally{sv.forEach(([b,v])=>b[3]=v)}}})();
// ---------- the screen: transactions, free-agent pool, draft classes ----------
let LOFF='all',LOFY=null;
function lgV(f,y){if(f)LOFF=f;if(y!=null)LOFY=+y;const Ys=[...new Set((S.tx||[]).map(e=>e.y))].sort((a,b)=>b-a);if(LOFY==null||!Ys.includes(LOFY))LOFY=Ys[0]||yrN();
 const tabs=[['all','All'],['big','Big moves'],['sign','Signings'],['ext','Extensions'],['rel','Releases'],['trade','Trades'],['draft','Draft'],['retire','Retired'],['fa','Free agents'],['dc','Draft classes']].map(([k,l])=>`<button class="${LOFF==k?'':'g'}" style="width:auto;flex:1 1 30%;padding:6px 2px;font-size:13px" onclick="lgV('${k}')">${l}</button>`).join('');
 let body='';
 if(LOFF=='fa'){const F=lgFA().slice().sort((a,b)=>(b.ovr||0)-(a.ovr||0));body=`<div class=card><b>🖊 Free-agent pool: ${F.length}</b><br><small>Every team can sign these players. Unsigned for 2 years (or too old) = retired.</small>${F.slice(0,80).map(p=>`<div class=row style="font-size:15px"><span>${esc(p.n)} <small>${p.pos} · age ${p.age} · last: ${p.prev||'-'}</small></span><b>${p.ovr}</b></div>`).join('')||'<br><small>Nobody right now.</small>'}</div>`}
 else if(LOFF=='dc'){const ks=Object.keys(S.dc||{}).sort().reverse();const y=ks.includes(String(LOFY))?String(LOFY):ks[0];
  if(!ks.length){body='<div class=card><small>The first draft class is picked in Draft week of your first pro offseason.</small></div>'}
  else{const dc=S.dc[y],nTeams=Math.max(1,(dc.picks||[]).filter(p=>p.r==1).length);
  body=`<div class=card><b>🎤 ${y} Draft</b> <select onchange="LOFY=+this.value;lgV('dc')" style="font-size:16px">${ks.map(k=>`<option ${k==y?'selected':''}>${k} Draft</option>`).join('')}</select>`+
  [1,2,3,4,5,6,7].map(rd=>{const rp=(dc.picks||[]).filter(p=>p.r==rd).sort((a,b)=>a.p-b.p);if(!rp.length)return'';return`<div style="margin-top:12px"><b style="font-size:16px">Round ${rd}</b></div>`+rp.map((p,j)=>{const rdPk=j+1;const isFirst=p.p==1;return`<div class=row style="font-size:14px;${isFirst?'background:#FFD70022;border:1px solid #FFD700;border-radius:8px;padding:6px 4px':''}"><span>${isFirst?'⭐ ':''}#${p.p} <b>${p.tm}</b> · ${esc(p.n)} <small>${p.pos}${p.col?' · '+esc(p.col):''}${p.age?' · age '+p.age:''}</small></span><b>${p.ovr}<small style="opacity:.6">/${p.pot}</small></b></div>`}).join('')}).join('')+
  ((dc.ud||[]).length?`<div style="margin-top:12px"><b style="font-size:16px">Undrafted free agents</b></div>`+dc.ud.slice(0,30).map(p=>`<div class=row style="font-size:14px"><span>${esc(p.n)} <small>${p.pos}${p.col?' · '+esc(p.col):''}</small></span><b>${p.ovr}</b></div>`).join(''):'')+
  `</div>`}}
 else{const L=(S.tx||[]).filter(e=>e.y==LOFY&&(LOFF=='all'||(LOFF=='big'?e.big:LOFF=='sign'?(e.t=='sign'||e.t=='udfa'):LOFF=='rel'?(e.t=='rel'||e.t=='leave'):e.t==LOFF)));const ic={sign:'🖊',udfa:'🖊',ext:'🤝',rel:'✂️',leave:'🚪',trade:'🔁',draft:'🎤',retire:'🧓'};
  body=`<div class=card><b>📰 Transactions</b> ${Ys.length?`<select onchange="lgV(null,this.value)" style="font-size:16px">${Ys.map(y=>`<option ${y==LOFY?'selected':''} value=${y}>${y} offseason</option>`).join('')}</select>`:''}<br><small>${esc(S.lgSum||'Moves show up here once your first pro offseason starts (Free agency week).')}</small>${L.slice(0,150).map(e=>`<div style="font-size:15px;margin:6px 0;border-top:1px solid #fff2;padding-top:4px">${ic[e.t]||'•'} <b>${esc(e.n)}</b> <small>${e.pos||''}${e.ovr?' · '+e.ovr:''}${e.age?' · age '+e.age:''}</small><br><small>${e.from&&e.from!=e.to?esc(e.from)+' → ':''}${esc(e.to||'')}${e.d?' · '+esc(e.d):''} · ${esc(e.w||'')}</small></div>`).join('')||'<br><small>Nothing here yet.</small>'}</div>`}
 ui.style.display='block';ui.innerHTML=`<div><button class=g onclick=hub() style="position:sticky;top:0;z-index:5">✕ Close</button><h2>🏛 League office</h2><div class=row style="gap:3px;flex-wrap:wrap">${tabs}</div>${body}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
(()=>{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{if(S&&S.stage=='pro'&&!document.getElementById('lgob')){const b=[...ui.querySelectorAll('button')].find(x=>/Contracts & salary cap/.test(x.textContent));if(b){const n=document.createElement('button');n.className='g';n.id='lgob';n.textContent='🏛 League office: transactions, free agents, draft classes';n.onclick=()=>lgV();b.parentNode.insertBefore(n,b.nextSibling)}}}catch(e){}return r}})();
// the old "recommend a free agent" screen now uses the real pool, and a player who picks another team really goes there
(()=>{const _f=faPool;faPool=function(){try{if(S&&S.stage=='pro'&&S.lgPh&&S.lgPh.y==yrN()&&S.lgPh.p>=1){const me=pIdx(S.T[0]);return lgFA().filter(p=>p.n!=S.name).map(p=>{const li=TA.indexOf(p.prev);return{n:p.n,pos:p.pos,slot:p.pos=='QB'?23:Math.max(1,POSL.indexOf(p.pos)),li:li>=0?li:-1,ovr:p.ovr,age:p.age,sal:lgMkt(p),real:1}}).filter(p=>p.li!=me||1).sort((a,b)=>b.ovr-a.ovr)}}catch(e){}return _f.apply(this,arguments)}})();
(()=>{const _r=faRec;faRec=function(nm){try{const o=S.ofs;if(offFA()&&myRank()<=3&&o.recs.length<3){const p=lgFA().find(x=>x.n==nm);if(p){const P=faPool().find(x=>x.n==nm),gm=faGM(P);if(!gm.ok)return _r.apply(this,arguments);const tp=faTop(P,pitchB()),TT=lgTeams(),T=TT.find(T=>T.pi==tp)||TT[0],FA=lgFA();FA.splice(FA.indexOf(p),1);const yrs=(p.age||26)<29?3:2;lgCtNew(p,yrs,P.sal,'fa');const fr=p.prev;lgAdd(T,p);lgDepth(T);
  const mine=T.i==0,r=mine?`✔ Signed with your team ($${P.sal}M/yr).`:`✖ Chose the ${tn(T.t)} instead.`;if(mine)o.spent=(o.spent||0)+P.sal;lgTx({t:'sign',n:p.n,pos:p.pos,ovr:p.ovr,age:p.age,from:fr||'FA',to:T.code,d:yrs+' yrs · $'+P.sal+'M/yr'+(mine?' (your recommendation)':' (picked them over you)'),big:1});o.log.push(mine?`🖊 ${p.n} (${p.pos}) signed with the ${tn(S.T[0])} on your recommendation.`:`${p.n} picked the ${tn(T.t)} over you.`);
  o.recs.push({n:p.n,r});save();return talk('gm','GM',mine?`Done. ${p.n} is ours. Good call.`:`We made our pitch, but ${p.n} chose the ${tn(T.t)}.`,'smug',[['OK','ovHide();faV()']])}}}catch(e){console.warn(e)}return _r.apply(this,arguments)}})();

function lgDedup(){const by={};for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x)(by[x.n]=by[x.n]||[]).push(x)})}
 for(const n in by){const A=by[n];if(A.length<2||n==S.name||lgStar(n))continue;A.sort((a,b)=>((b.cs&&Object.keys(b.cs).length)||0)-((a.cs&&Object.keys(a.cs).length)||0)||(b.age||0)-(a.age||0));A.slice(1).forEach(x=>{x.n=lgUniq(lgSeed('dd'+n+Math.random()))})}}
// a retirement mid-roster: the new young player gets his own rookie deal (not the old man's contract) and it goes in the log
(()=>{const _c=cpuRet;cpuRet=function(x,t){const n=x&&x.n,o=x&&x.ovr,a=x&&x.age,p=x&&x.pos,r=_c.apply(this,arguments);try{if(r&&x&&x.n!=n&&S.stage=='pro'){let dupN=0;for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(y=>{if(y&&y!==x&&y.n==x.n)dupN++})}if(dupN||lgStar(x.n)||(S.retd||[]).some(q=>q.n==x.n))x.n=lgUniq(lgSeed('cr'+n));(S.retd=S.retd||[]).push({n,pos:p,ovr:o,age:a,y:yrN()});lgCtNew(x,3,.9,'udfa');x.ct.how='rookie';lgTx({t:'retire',n,pos:p,ovr:o,age:a,from:(lgTeams().find(T=>T.L.includes(x))||{}).code||'',to:'Retired',d:'Retired · replaced by rookie '+x.n,big:(o||0)>=80})}}catch(e){}return r}})();
(()=>{const _l=leagueDev;leagueDev=function(){const r=_l.apply(this,arguments);try{if(S&&S.stage=='pro')lgDedup()}catch(e){}return r}})();
