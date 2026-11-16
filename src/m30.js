
// ===================== college rankings: a résumé Top 25 + 12-team playoff (5 highest-ranked conference champions + 7 at-large) =====================
// weights (tunable): record 25%, strength of schedule 20%, quality wins 20%, team strength 15%, conference strength 10%, titles/context 10%
let capOfF=null;const CRW={rec:.30,sos:.18,qw:.18,tm:.14,cf:.10,cx:.10};
let CRC=null;
function crGames(){const G=[];if(S.grk==grK()&&Array.isArray(S.gr))S.gr.forEach((wk,w)=>(wk||[]).forEach(x=>G.push({a:x[0],b:x[1],sa:x[2],sb:x[3],w})));return G}
function crCalc(){const T=S.T,n=T.length,G=crGames(),key=grK()+'|'+G.length+'|'+(S.cch||[]).length+'|'+n+'|'+T.reduce((a,t)=>a+(t.w||0),0);if(CRC&&CRC.key===key)return CRC;
 const gl=T.map(()=>[]);G.forEach(x=>{if(T[x.a]&&T[x.b]){gl[x.a].push({o:x.b,m:x.sa-x.sb,w:x.sa>x.sb,wk:x.w,s:[x.sa,x.sb]});gl[x.b].push({o:x.a,m:x.sb-x.sa,w:x.sb>x.sa,wk:x.w,s:[x.sb,x.sa]})}});
 const has=G.length>0,pr=T.map(t=>(teff(t)-70)*.9);
 // team strength: results-based rating (capped margins so nobody gets credit for running it up), preseason prior fades as games are played
 let Rt=pr.slice();for(let it=0;it<14;it++)Rt=T.map((t,i)=>{const L=gl[i],w0=2.2;let s=pr[i]*w0;L.forEach(x=>{s+=Rt[x.o]+cl(x.m,-21,21)*.5+(x.w?3:-3)});return s/(w0+L.length)});
 if(!has)Rt=T.map((t,i)=>pr[i]+((t.w||0)-(t.l||0))*2.2);
 const W=T.map((t,i)=>has?gl[i].filter(x=>x.w).length:(t.w||0)),L=T.map((t,i)=>has?gl[i].filter(x=>!x.w).length:(t.l||0));
 const srt=[...Rt].sort((a,b)=>b-a),r25=srt[24]||0,r10=srt[9]||0,r50=srt[49]||0,r3=srt[2]||0,r30=srt[29]||0;
 const sos=T.map((t,i)=>gl[i].length?gl[i].reduce((a,x)=>a+Rt[x.o],0)/gl[i].length:pr[i]*.3),wp=T.map((t,i)=>(W[i]+L[i])?W[i]/(W[i]+L[i]):.5);
 // quality wins: who you beat (elite wins count most); losses: who you lost to (bad losses hurt most, close losses to elite teams barely)
 const qw=T.map((t,i)=>gl[i].reduce((a,x)=>a+(x.w?cl((Rt[x.o]-r50)/(r10-r50||1),0,2.2)*.8+(Rt[x.o]>=r25?.5:0)+(Rt[x.o]>=r10?.6:0)+(Rt[x.o]>=r3?.9:0):0),0));
 const lp=T.map((t,i)=>gl[i].reduce((a,x)=>a+(x.w?0:(Rt[x.o]>=r30?.6:1)+cl((Rt[i]-Rt[x.o])/8,0,2.5)-(x.m>=-7&&Rt[x.o]>=r10?.3:0)+(x.m<=-17?.35:0)),0));
 const rec=T.map((t,i)=>W[i]-lp[i]*2.2-Math.pow(Math.max(0,L[i]-3),1.3)*1.0+(L[i]==0&&W[i]>=4?2.6+W[i]*.16:0));
 // conference strength from this season's results (top 60% of each conference)
 const cs={};T.forEach((t,i)=>{(cs[t.cf]=cs[t.cf]||[]).push(Rt[i])});const csv={};for(const k in cs){const v=cs[k].sort((a,b)=>b-a),m=Math.max(3,Math.ceil(v.length*.6));csv[k]=v.slice(0,m).reduce((a,b)=>a+b,0)/m}
 const cc=T.map((t,i)=>(S.cch||[]).includes(i)?1:0),z=a=>{const m=a.reduce((x,y)=>x+y,0)/a.length,sd=Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/a.length)||1;return a.map(v=>(v-m)/sd)};
 const gp=Math.max(0,...T.map((t,i)=>W[i]+L[i])),ph=Math.min(1,gp/7),Zr=z(rec),Zs=z(sos.map((v,i)=>v-(1-wp[i])*14)),Zq=z(qw),Zt=z(Rt),Zc=z(T.map(t=>csv[t.cf]||0));
 const sc=T.map((t,i)=>{const res=CRW.rec*Zr[i]+CRW.sos*Zs[i]+CRW.qw*Zq[i]+CRW.tm*Zt[i]+CRW.cf*Zc[i]+CRW.cx*cc[i]*1.4;return ph*(res-Math.max(0,L[i]-4)*.15)+(1-ph)*(Zt[i]*.55+Zc[i]*.1)});
 let ord=T.map((t,i)=>i).sort((a,b)=>sc[b]-sc[a]);
 // close calls: head-to-head winner goes first
 for(let p=0;p<2;p++)for(let k=0;k<Math.min(40,ord.length-1);k++){const a=ord[k],b=ord[k+1];if(sc[a]-sc[b]<(qw[b]>=qw[a]?.4:.15)&&Math.abs((W[a]-L[a])-(W[b]-L[b]))<=2&&gl[b].some(x=>x.o==a&&x.w)&&!gl[a].some(x=>x.o==b&&x.w)){ord[k]=b;ord[k+1]=a}}
 // head-to-head: if you beat a team and your record is as good or better, you go ahead of them
 const h2hP=(capF)=>{for(let p=0;p<4;p++){let ch=0;for(let k=0;k<Math.min(40,ord.length)&&!ch;k++)for(let j=k+1;j<ord.length;j++){const a=ord[k],b=ord[j];if(L[b]<=L[a]&&W[b]>=W[a]-1&&gl[b].some(x=>x.o==a&&x.w)&&!gl[a].some(x=>x.o==b&&x.w)&&(!capF||capF(b)<=k+1)){ord.splice(j,1);ord.splice(k,0,b);ch=1;break}}if(!ch)break}};h2hP();
 // unbeaten first: early in the year any unbeaten team ranks ahead of teams with a loss; later a Power 4 unbeaten stays ahead unless its schedule has been weak
 {const gpx=Math.max(0,...T.map((t,i)=>W[i]+L[i])),sr={};T.map((t,i)=>i).sort((a,b)=>sos[b]-sos[a]).forEach((t,k)=>sr[t]=k+1);const p4=i=>{const c=S.col&&S.col[T[i].cf];return !!(c&&cfP4(c.n))},key=i=>{if(W[i]+L[i]==0||L[i]>0)return 1;return p4(i)?(gpx<=6||sr[i]<=90?0:1):(sr[i]<=60?0:1)};if(has){ord=ord.slice().sort((a,b)=>key(a)-key(b));
  // a Power 4 team with one good loss (to a top-25 team) ranks ahead of any unbeaten team from outside the Power 4
  const p0={};ord.forEach((t,k)=>p0[t]=k+1);const g1=i=>p4(i)&&L[i]==1&&gl[i].some(x=>!x.w&&p0[x.o]<=25&&x.m>-20),gu=i=>!p4(i)&&L[i]==0&&W[i]>0&&gl[i].filter(x=>x.w&&x.m<=7).length<Math.max(2,W[i]*.5),lastG=Math.max(-1,...ord.slice(0,60).map((t,k)=>g1(t)?k:-1));
  if(lastG>=0){const mv=ord.slice(0,lastG).filter(gu);if(mv.length){const keep=ord.filter(t=>!mv.includes(t)),at=keep.indexOf(ord[lastG])+1;ord=[...keep.slice(0,at),...mv,...keep.slice(at)]}}}}
 // smaller schools (outside the Power 4) have to earn the very top: top 3 needs a win over a top-5 team, top 5 a win over a top-10 team, top 10 needs a win over a top-25 team
 {const pos0={},srC={};ord.forEach((t,k)=>pos0[t]=k+1);T.map((t,i)=>i).sort((a,b)=>sos[b]-sos[a]).forEach((t,k)=>srC[t]=k+1);const isP4=i=>{const c=S.col&&S.col[T[i].cf];return !!(c&&cfP4(c.n))},lcap=i=>[1,1,5,16,22,25][Math.min(5,L[i])],capOf=i=>Math.max(lcap(i),capOf0(i)),capOf0=i=>{if(isP4(i))return 1;const b=Math.min(99,...gl[i].filter(x=>x.w).map(x=>pos0[x.o]));const c0=b<=5?1:b<=10?4:b<=25?6:9;return srC[i]>90?Math.max(7,c0):c0};
  capOfF=capOf;const rest=ord.slice(),out=[];while(rest.length){const k=out.length+1,j=rest.findIndex(i=>capOf(i)<=k);out.push(rest.splice(j<0?0:j,1)[0])}ord=out}
 // an unbeaten team keeps a spot in the poll even with a soft schedule (the floor rises as the wins pile up)
 if(has){const p4f=i=>{const c=S.col&&S.col[T[i].cf];return !!(c&&cfP4(c.n))};ord.filter(i=>L[i]==0&&W[i]>=4).sort((a,b)=>W[b]-W[a]).forEach(i=>{const fl=Math.round(p4f(i)?Math.max(5,25-(W[i]-4)*2.5):Math.max(10,40-(W[i]-4)*3.4)),k=ord.indexOf(i);if(k+1>fl){ord.splice(k,1);ord.splice(fl-1,0,i)}})}
 h2hP(typeof capOfF=='function'?capOfF:null);
 const pos={};ord.forEach((t,k)=>pos[t]=k+1);const sosR={};T.map((t,i)=>i).sort((a,b)=>sos[b]-sos[a]).forEach((t,k)=>sosR[t]=k+1);
 CRC={key,ord,pos,sc,Rt,sos,sosR,qw,lp,gl,W,L,csv,cc,has};return CRC}
function crRank(){return crCalc().ord.slice()}
// weekly snapshots so the poll can show movement
function crSnap(){try{if(S.stage!='col')return;CRC=null;const k=grK();if(!S.crh||S.crh.k!=k)S.crh={k,w:{}};S.crh.w[S.wk]=crCalc().ord.slice(0,40)}catch(e){}}
function crPrev(i){const H=S.crh&&S.crh.k==grK()?S.crh.w:null;if(!H)return null;const ks=Object.keys(H).map(Number).filter(w=>w<(S.wk||0)).sort((a,b)=>b-a);if(!ks.length)return null;const p=H[ks[0]].indexOf(i);return p<0?99:p+1}
// conference champion right now (actual after title games, otherwise the current leader)
function crChamps(){const T=S.T,C=crCalc();if((S.cch||[]).length&&(S.wk||0)>=12)return S.cch.slice();const byC={};T.forEach((t,i)=>(byC[t.cf]=byC[t.cf]||[]).push(i));return Object.values(byC).map(L=>[...L].sort((a,b)=>((T[b].cw||0)-(T[b].cl||0))-((T[a].cw||0)-(T[a].cl||0))||C.pos[a]-C.pos[b])[0])}
function cfpField(){const rk=crRank(),C=crCalc(),chs=crChamps(),auto=rk.filter(i=>chs.includes(i)).slice(0,5);let at=rk.filter(i=>!auto.includes(i)).slice(0,7);
 // an undefeated team with a full season should not be left out
 const und=rk.filter(i=>!auto.includes(i)&&!at.includes(i)&&C.L[i]==0&&C.W[i]>=11).slice(0,2);und.forEach(u=>{const j=[...at].reverse().find(x=>!(C.L[x]==0&&C.W[x]>=11));if(j!=null)at[at.indexOf(j)]=u});
 const f=[...auto,...at].sort((a,b)=>C.pos[a]-C.pos[b]);return{f,auto,at}}
const crRec=i=>{const C=crCalc(),t=S.T[i];return C.has?C.W[i]+'-'+C.L[i]:(t.w||0)+'-'+(t.l||0)};
function crWhy(i){const C=crCalc(),q=C.gl[i].filter(x=>x.w&&C.pos[x.o]<=25).length,bad=C.gl[i].filter(x=>!x.w&&C.pos[x.o]>40).length,b=[];if(C.L[i]==0&&C.W[i]>=3)b.push('undefeated');b.push('SOS #'+C.sosR[i]);if(q)b.push(q+' ranked win'+(q>1?'s':''));if(bad)b.push(bad+' bad loss'+(bad>1?'es':''));if(C.cc[i])b.push('conf champ');return b.join(' · ')}
let CRV='t25';
function crV(v){if(v)CRV=v;const T=S.T,C=crCalc(),rk=C.ord,P=cfpField(),tabs=`<p class=tabs><button class="${CRV=='t25'?'':'g'}" onclick="crV('t25')">Top 25</button><button class="${CRV=='cfp'?'':'g'}" onclick="crV('cfp')">Playoff picture</button><button class="${CRV=='all'?'':'g'}" onclick="crV('all')">All teams</button></p>`;
 const row=(i,k)=>{const pv=crPrev(i),mv=pv==null?'':pv==99?'<small style="color:#7bed9f">NEW</small>':pv>k+1?`<small style="color:#7bed9f">▲${pv-k-1}</small>`:pv<k+1?`<small style="color:#ff7675">▼${k+1-pv}</small>`:'<small style="opacity:.6">–</small>',cf=S.col[T[i].cf],inP=P.f.includes(i);
  return `<div class=row onclick="crTeam(${i})" style="font-size:15px;gap:6px;cursor:pointer;align-items:flex-start${i==0?';background:#ffe93b22':''}"><span style="min-width:0"><b>${k+1}.</b> ${i==0?'▶ ':''}${T[i].n} <b>${crRec(i)}</b> ${mv}<br><small style="font-size:12px;opacity:.85">${cf?cfShort(cf.n):''} ${(T[i].cw||0)}-${(T[i].cl||0)} conf${inP?' · 🎟 '+(P.auto.includes(i)?'auto bid':'at-large'):''}<br>${crWhy(i)}</small></span></div>`};
 let body='';
 if(CRV=='t25')body=`<div class=card><b>College Football Top 25 · ${S.wk>=12?'Final regular season':'Week '+((S.wk||0)+1)}</b>${rk.slice(0,25).map(row).join('')}</div>${rk.indexOf(0)>=25?`<div class=card>${row(0,rk.indexOf(0))}</div>`:''}`;
 else if(CRV=='all')body=`<div class=card><b>Every FBS team</b>${rk.map(row).join('')}</div>`;
 else{const f=P.f,sd=i=>f.indexOf(i)+1,lab=i=>`#${C.pos[i]} ${T[i].n} (${crRec(i)})`;body=S.cb?cfpSvg():'';
  body+=`<div class=card><b>${S.cb?'Playoff field':'If the season ended today'}</b><br><small style="font-size:12px;opacity:.85">12 teams: the 5 highest-ranked conference champions get automatic bids, then the 7 best-ranked teams left. Seeds go by the rankings, and seeds 1-4 get a bye.</small>${f.map(i=>`<div class=row style="font-size:15px;gap:6px${i==0?';background:#ffe93b22':''}"><span><b>${sd(i)}.</b> ${T[i].n} <b>${crRec(i)}</b><br><small style="font-size:12px;opacity:.85">Ranked #${C.pos[i]} — ${P.auto.includes(i)?'Playoff Qualifier (Conference Champion)':'At-large'}</small></span></div>`).join('')}</div>
  <div class=card><b>First round</b>${[[5,12],[6,11],[7,10],[8,9]].map(([a,b])=>`<div class=row style="font-size:15px"><span>${sd(f[a-1])?a+'. '+T[f[a-1]].n:''} vs ${b}. ${T[f[b-1]]?T[f[b-1]].n:'TBD'}</span></div>`).join('')}<small>Byes: ${f.slice(0,4).map((i,k)=>(k+1)+'. '+T[i].n).join(', ')}</small></div>
  <div class=card><b>Conference champions${(S.wk||0)<12?' (current leaders)':''}</b>${crChamps().sort((a,b)=>C.pos[a]-C.pos[b]).map(i=>`<div class=row style="font-size:14px"><span>${S.col[T[i].cf]?cfShort(S.col[T[i].cf].n):''}: ${T[i].n} <small>#${C.pos[i]} · ${P.auto.includes(i)?'auto bid':f.includes(i)?'at-large':'out'}</small></span></div>`).join('')}</div>`}
 ui.innerHTML=`<div><h2>🏆 College rankings</h2>${tabs}${body}<p><small>Rankings weigh the whole résumé: record, strength of schedule, who you beat, who you lost to, how good the team really is, and how strong the conference has been this season. An undefeated team with an easy schedule can rank behind a one- or two-loss team that beat elite opponents, and a lower-ranked conference champion can still get an automatic bid.</small></p><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
function crTeam(i){const T=S.T,C=crCalc(),t=T[i],gl=C.gl[i],W=Array.isArray(S.csch)?S.csch:[],cf=S.col[t.cf],cfT=T.map((x,k)=>k).filter(k=>T[k].cf==t.cf).sort((a,b)=>((T[b].cw||0)-(T[b].cl||0))-((T[a].cw||0)-(T[a].cl||0))||C.pos[a]-C.pos[b]);
 const res=gl.map(x=>`<div class=row style="font-size:14px"><span>Wk ${x.wk+1} ${x.w?'W':'L'} ${x.s[0]}–${x.s[1]} vs ${C.pos[x.o]<=25?'#'+C.pos[x.o]+' ':''}${T[x.o].n}</span></div>`).join('')||'<small>No results saved yet this season.</small>',
  rem=W.map((wk,w)=>{if(w<(S.wk||0))return '';const p=wk.find(x=>x[0]==i||x[1]==i);if(!p)return '';const o=p[0]==i?p[1]:p[0];return `<div class=row style="font-size:14px"><span>Wk ${w+1} vs ${C.pos[o]<=25?'#'+C.pos[o]+' ':''}${T[o].n}</span></div>`}).join('')||'<small>Regular season complete.</small>';
 const qwL=gl.filter(x=>x.w&&C.pos[x.o]<=40).map(x=>'#'+C.pos[x.o]+' '+T[x.o].n),lL=gl.filter(x=>!x.w).map(x=>'#'+C.pos[x.o]+' '+T[x.o].n+' ('+x.s[0]+'–'+x.s[1]+')');
 ui.innerHTML=`<div><h2>#${C.pos[i]} ${t.n}</h2><p><small>${crRec(i)} · ${cf?cf.n:''} ${(t.cw||0)}-${(t.cl||0)} · team rating ${t.ovr}</small></p>
 <div class=card><b>Résumé</b><p>Strength of schedule: #${C.sosR[i]} of ${T.length}<br>Ranked wins: ${gl.filter(x=>x.w&&C.pos[x.o]<=25).length}<br>Best wins: ${qwL.slice(0,5).join(', ')||'none yet'}<br>Losses: ${lL.join(', ')||'none'}<br>Conference standing: ${cfT.indexOf(i)+1} of ${cfT.length}${C.cc[i]?' · conference champion':''}<br>Conference strength this season: #${Object.keys(C.csv).sort((a,b)=>C.csv[b]-C.csv[a]).indexOf(String(t.cf))+1} of ${Object.keys(C.csv).length}</p></div>
 <div class=card><b>Results</b>${res}</div><div class=card><b>Remaining schedule</b>${rem}</div><button class=g onclick="crV()">Back to rankings</button></div>`;ui.scrollTop=0}
