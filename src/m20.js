
// ---------------- backup quarterbacks: every pro team carries three ----------------
// [name, ovr, age (in 2026), team index, jersey, rookie in 2026]
const QBB=[['Ferb Nandolorean',79,21,14,15,1],['Famous Dubstin',77,34,19,19,0],['David Pov',73,21,4,2,1],['Hadouken Sandler',76,22,6,2,0],['Clyde Gabriella',75,22,6,8,0],['Markie Goata',79,34,18,8,0],['Mac Dadderson',78,28,28,10,0],['Todd Simperson',76,22,31,15,1]];
// one list of every QB you created: starters 0-31 (by team), backups 32+
const QBX=QBP.concat(QBB.map(b=>[b[0],b[1],b[2]])),QXN=qi=>qi>=32?QBB[qi-32][4]:QNUM[qi],QXT=qi=>qi>=32?QBB[qi-32][3]:qi;
// real NFL lines for the backups (same format as the starters): year team G cmp att yds td int rushYds rushTD
Object.assign(RQS,{33:'2022 NO 3 73 115 858 4 5 16 0;2023 NO 7 25 47 264 2 3 -6 0;2024 CLE 12 181 296 2121 13 12 83 1;2025 NYG 3 37 66 567 2 2 23 1',
 35:'2025 CLE 8 120 212 1400 7 10 169 1',36:'2025 CLE 10 110 185 937 7 2 86 0',
 37:'2022 ATL 13 184 300 2219 15 9 438 4;2023 PHI 3 15 23 164 1 1 52 0;2024 WAS 3 34 44 364 4 0 92 1;2025 WAS 11 139 227 1695 10 7 297 1',
 38:'2022 NE 14 288 442 2997 14 11 102 1;2023 NE 11 224 345 2120 10 12 96 0;2024 JAX 10 171 262 1672 8 8 92 1;2025 SF 11 201 289 2151 13 6 60 0'});
// their college years (schools in your college world; a redshirt year shows as a 0 line so he is on the roster)
Object.assign(RQC,{32:'2022 CAL 0 0 0 0 0 0 0 0;2023 CAL 9 153 243 1708 14 10 92 2;2024 CAL 11 265 386 3004 16 6 105 2;2025 IND 16 273 379 3535 41 6 276 7',
 34:'2024 VAN 13 177 298 2293 20 4 800 8;2025 VAN 13 267 378 3539 29 8 862 10',
 35:'2023 COLO 11 298 430 3230 27 3 -77 4;2024 COLO 13 353 477 4134 37 10 -50 4',
 36:'2022 OU 12 230 367 3168 25 6 317 6;2023 OU 12 266 384 3660 30 6 373 12;2024 ORE 14 326 447 3857 30 6 149 7',
 39:'2022 BAMA 4 4 5 35 0 0 0 0;2023 BAMA 6 11 20 179 0 0 86 2;2024 BAMA 6 14 25 167 0 0 44 1;2025 BAMA 15 305 473 3567 28 5 93 2'});
RCH[2025].hz=32;
// the team's named backup that takes the spare passes in simulated seasons (rookies only from their rookie year)
function qbbOf(ti,Y){for(let k=0;k<QBB.length;k++){const b=QBB[k];if(b[3]==ti&&(Y==null||!b[5]||Y>=2026))return k}return -1}
SLF[23]=.03;SLF[24]=.01;
// make sure a pro roster has QB2 / QB3 (slots 23 and 24), with your named backups on their teams
function qbbEns(a,t,L){if(!S||!L||!L[0]||!t||!t.dv)return;const pi=pIdx(t);if(pi<0)return;const pr=rng((S.seed||1)*577+pi*41),me=a=='h.0'&&S.stage=='pro',st=L[0];
 const used=new Set(L.filter(Boolean).map(x=>+x.num)),num=(n,lo,hi)=>{let v=n,g_=0;while(used.has(v)&&g_++<60)v=lo+(pr()*(hi-lo+1)|0);used.add(v);return v};
 const star=y=>y&&(QBX.some(q=>q[0]==y.n)||PKS.some(q=>q[2]==y.n)),mk=(o,ag,nm,n,named,k)=>{if(named){const c=L.find(y=>y&&+y.num===n&&!star(y));if(c){used.add(n);c.num=num(c.num,(NR[c.pos]||[1,99])[0],(NR[c.pos]||[1,99])[1])}used.add(n)}const x={n:nm,pos:'QB',num:named?n:num(n,1,19),ovr:o,age:ag,cls:0,pot:potOf(o,ag,pr()),qp:1,qn:1,ny:null,h:[],cs:{},tm:[],aw:{}};try{genHist(x,named&&ag>=27?0:k,pi,pr,named?1:0)}catch(e){}if(named)try{uHist(x)}catch(e){}return x};
 const gen=(k)=>{const tv=t.ovr||75,o=cl(Math.round(66+(tv-75)*.4+pr()*8-(k==24?6:0)),52,76),ag=k==23?24+(pr()*11|0):22+(pr()*8|0);return mk(o,ag,uNm(pr),7+(pr()*12|0),0,k)};
 const isNamed=x=>x&&QBB.some(b=>b[0]==x.n),keep=x=>x&&(x.npx!=null||x.pal||isNamed(x));
 for(const k of [23,24])if(!L[k])L[k]=gen(k);
 QBB.forEach((b,bi)=>{if(b[3]!=pi||L.some(x=>x&&x.n==b[0]))return;for(const kk in S.ro){const R_=S.ro[kk];if(kk!==a&&Array.isArray(R_)&&R_.some(x=>x&&x.n==b[0]))return}
  const nx=mk(b[1],b[2],b[0],b[4],1,23);const slot=[23,24].find(k=>!keep(L[k]));if(slot!=null)L[slot]=nx;else L.push(nx)});
 if(L[23]&&L[24]&&L[24].ovr>L[23].ovr&&!L[23].npx)[L[23],L[24]]=[L[24],L[23]]}
// roster screens list the quarterbacks together
const rOrd=L=>{const o=[0];for(let k=23;k<L.length;k++)if(L[k])o.push(k);for(let k=1;k<23&&k<L.length;k++)if(L[k])o.push(k);return o};

// ---------------- injuries (no rating: everyone gets a hidden durability roll) ----------------
const INJN={mn:['sprained ankle','bruised ribs','tight hamstring','jammed finger','stinger','sore shoulder','hip pointer','bone bruise'],
 mj:['high ankle sprain','hamstring strain','sprained knee (MCL)','broken hand','separated shoulder','concussion','turf toe','cracked ribs','groin strain'],
 se:['torn ACL','broken leg','torn Achilles','torn pectoral','Lisfranc fracture']};
// average per season: a few-weeks injury 0.12 (2-3 in a long career), a 1-2 week knock 0.2 (about every 5 seasons), season-ending 0.018 (rarer still)
const INJR={se:.018,mj:.12,mn:.2},injGP=()=>{const st=S.stage||'hs';return st=='pro'?17:st=='col'?12:10};
const injIP=x=>x.ip!=null?x.ip:(x.ip=+Math.exp(gs()*.55-.15).toFixed(2));
function injMk(k){const w=k=='mn'?ri(1,2):k=='mj'?(R()<.8?ri(3,5):ri(6,8)):99;const L=INJN[k];return{k,w,t:L[ri(0,L.length-1)],nw:1}}
// f = share of one game's risk (1 = a full game)
function injRoll(x,f){const r=R(),s=(f==null?1:f)*injIP(x)/injGP();let acc=0;for(const k of ['se','mj','mn']){acc+=INJR[k]*s;if(r<acc)return injMk(k)}return null}
const injOut=()=>!!(S&&S.inj&&S.inj.w>0),injWk=j=>j.w>=90?'out for the season':j.w==1?'out about 1 week':'out about '+j.w+' weeks';
const injLeft=()=>S.inj?(S.inj.w>=90?'Out for the season ('+S.inj.t+').':'Back in '+S.inj.w+' week'+(S.inj.w==1?'':'s')+' ('+S.inj.t+').'):'';
const injTag=h=>S&&S.inj&&S.inj.w>0?(h?h+' ':'')+'🚑 Injured: '+S.inj.t+' — '+(S.inj.w>=90?'out for the season':S.inj.w+' more week'+(S.inj.w==1?'':'s'))+'. '+injBU().n+' starts.':h;
const injBadge=p=>p&&p.inj?` <small style="color:#ff6b6b">🚑 ${p.inj.w>=90?'season':p.inj.w+'wk'}</small>`:'';
// your backup right now
function injBU(){const st=S.stage||'hs';if(st=='pro'){const L=S.ro&&S.ro['h.0'];if(Array.isArray(L)){const b=[23,24,25].map(k=>L[k]).filter(x=>x&&!x.inj).sort((a,b)=>b.ovr-a.ovr)[0];if(b)return{n:b.n,ovr:b.ovr,num:b.num}}return{n:S.vet||'Backup QB',ovr:S.sq||66,num:9}}
 if(st=='col'){const b=(S.qr||[]).slice().sort((a,b)=>b.ovr-a.ovr)[0];if(b)return{n:b.n,ovr:b.ovr,num:10+(hsh(b.n)%9)};return{n:'Backup QB',ovr:S.sq||60,num:12}}
 return{n:(S.bu&&S.bu.n)||'Backup QB',ovr:(S.bu&&S.bu.ovr)||55,num:12}}
const injOff=()=>Math.round(g.m.ovr+(injBU().ovr-qo(S.q))*.4);
// the user got hurt (live play or a simulated game)
function injSet(j,live){if(!j)return;S.inj=j;S.injn=(S.injn||0)+1;(S.injh=S.injh||[]).push([yrN(),S.stage||'hs',j.t,j.w]);if(live){g.injP=j}}
// a simulated game you played in: one game of risk
function injSimG(){if(injOut())return '';const j=injRoll(S,1);if(!j)return '';injSet(j,0);return ` 🚑 You got hurt late in the game: ${j.t}, ${injWk(j)}.`}
// every live snap you take: about one game of risk spread over ~32 snaps, more on sacks and runs
function injLive(o,P){if(!g||g.injW||g.sw||!P||g.kk)return;const q=P.qb,c=P.car,ctx=o&&o.sk?2.6:(c===q&&!P.passed)?1.8:.7;
 if(!injOut()){const j=injRoll(S,ctx/32);if(j)injSet(j,1)}
 // one of the other 21 players on the field
 const L0=rost('h.0'),L1=rost('h.'+g.oi),pool=[...[1,2,3,4,5,6,7,8,9,10].map(k=>[L0,k]),...[11,12,13,14,15,16,17,18,19,20,21].map(k=>[L1,k])],pk=pool[ri(0,pool.length-1)],x=pk[0][pk[1]];
 if(x&&!x.inj){const j=injRoll(x,21/40);if(j){j.nw=1;x.inj=j;x.ign=1;g.msg=(g.msg?g.msg+' · ':'')+'🚑 #'+x.num+' '+x.n.split(' ').pop().toUpperCase()+' is hurt ('+j.t+')'}}
 S.injCov=g.oi}
// after the play: tell the user, then watch the rest or sim to the end
function injShow(next){const j=g.injP;g.injP=null;g.paused=0;g.tk=0;const b=injBU();window.__injN=next;
 ovShow(`<h2>🚑 ${S.name} is hurt</h2><p>${j.t[0].toUpperCase()+j.t.slice(1)} · ${injWk(j)}.</p><p><small>${b.n} (${b.ovr}) comes in at quarterback. ${g.m.n} ${g.s[0]} – ${g.s[1]} ${g.o.n}</small></p><button onclick="g.injW=1;ovHide();(window.__injN||pre)()">Watch the rest of the game</button><button class=g onclick="injRest(${next===oppBall?1:0})">Sim to the end</button>`)}
// your possessions with the backup in
function injOwn(){g.ph='opp';g.tk=0;g.sw=0;g.pl=null;const b=injBU(),rem=Math.max(1,(g.clk<1800?1800:3600)-g.clk);
 g.r=simDrive(injOff(),g.o.ovr,g.y,rem,g.s[0]-g.s[1],g.clk>=1800,KKt(0));
 ovShow(`<h2>Your ball · ${b.n} at QB</h2><p>${g.note?g.note+' · ':''}your ${fp(g.y)} · ${g.s[0]}–${g.s[1]}</p><button onclick=watchU()>Watch drive</button><button class=g onclick=applyU()>Simulate drive</button><button class=g onclick="injRest(0)">Sim to the end</button>`);g.note=''}
function applyU(){const r=g.r;g.s[0]+=r.pts;g.clk+=Math.max(0,(g.clk<1800?1800:3600)-g.clk-r.sec);g.nx=r.next;g.note='Your drive: '+r.res+(r.pts?' (+'+r.pts+')':'');if(chk(1))return;oppBall()}
function watchU(){g.watch=1;g.ph='watch';g.tk=0;W_={i:0,t:0,pl:g.r.pl||[],own:1};g.pcam=CAMI;CAMI=5;$('#camb').textContent='🎥 '+CN4[CAMI];buildEZ(g.mj.c1,g.oj.c1);ovShow('<button class=g onclick=skipW()>Skip drive</button>');wStart()}
// the backup's name and number on the field
function injQB(q){const b=injBU();q.nm=b.n.split(' ').pop().toUpperCase().slice(0,9);q.num=b.num}
// sim the rest with the backup (p = 0: your ball, 1: theirs)
function injRest(p){ovHide();g.injW=1;g.paused=0;g.tk=0;g.pl=null;let s=Math.max(0,3600-g.clk),y=p?(g.nx||25):g.y;const o=injOff();
 while(s>0){const r=simDrive(p?g.o.ovr:o,p?g.m.ovr:g.o.ovr,y,s,0);g.s[p]+=r.pts;s=r.sec;y=r.next;p^=1}g.clk=3600;if(g.s[0]==g.s[1])g.s[R()<cl(.5+(o-g.o.ovr)/60,.2,.8)?0:1]+=3;endGame()}
// injured: high school games are simmed with your backup
function injG(e){const T=S.T,b=injBU(),sg=simGame(teff(T[0])+(b.ovr-qo(S.q))/4,teff(T[e.o])+(rvOf(e.o)?2:0)),w=sg[0]>sg[1]||(sg[0]==sg[1]&&R()<.5);if(sg[0]==sg[1])sg[w?0:1]++;g={oi:e.o,kind:e.t,w,s:sg};
 if(e.t=='po')adv(w);else weekDone(w);HM=`🚑 You sat out hurt. ${b.n} started: ${w?'W':'L'} ${sg[0]}-${sg[1]}. `+injLeft();save();hub()}
// a week goes by: injuries heal, new ones happen around the league (only rosters that exist)
function injTick(){if(!S)return;const cov=S.injCov;S.injCov=null;
 if(S.inj){if(S.inj.nw){S.inj.nw=0}else{S.injg=(S.injg||0)+1;if(S.inj.w<90){S.inj.w--;if(S.inj.w<=0){S.inj=null;HM=(HM?HM+' ':'')+'✅ You are cleared to play.'}}}}
 const T=S.T||[];for(let i=0;i<T.length;i++){const L=S.ro&&S.ro['h.'+i];if(!Array.isArray(L))continue;
  for(let k=0;k<L.length;k++){const x=L[k];if(!x||(i==0&&k==0))continue;
   if(x.inj){if(x.inj.nw){x.inj.nw=0;continue}x.gm=(x.gm||0)+1;if(x.inj.w<90&&--x.inj.w<=0)delete x.inj;continue}
   if(cov&&((i==0&&k>=1&&k<=10)||(i==cov&&k>=11&&k<=21)))continue;
   const j=injRoll(x,k==0||k<23?1:.25);if(j){j.nw=0;x.inj=j;x.gm=(x.gm||0)}}}}
// offseason: everyone heals
function injClear(){if(!S)return;S.inj=null;S.injCov=null;S.injg=0;for(const k in (S.ro||{})){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x){delete x.inj;delete x.gm;delete x.ign}})}}
// CPU teams without their starting QB (or with several starters out) are a little worse in simulated games
function injPen(t){if(!S||!S.ro||!S.T)return 0;const i=S.T.indexOf(t);if(i<0)return 0;const L=S.ro['h.'+i];if(!Array.isArray(L))return 0;let p=0;
 if(i>0&&L[0]&&L[0].inj){const b=[23,24].map(k=>L[k]).filter(x=>x&&!x.inj).sort((a,b)=>b.ovr-a.ovr)[0],bo=b?b.ovr:L[0].ovr-14;p-=cl((L[0].ovr-bo)*.3,0,7)}
 for(let k=1;k<23;k++)if(L[k]&&L[k].inj)p-=.3;return p}
// in-game: an injured player's spot goes to a backup
function injSub(L,i){const x=L[i];if(!x||!x.inj)return x;if(i==0){const b=[23,24].map(k=>L[k]).filter(y=>y&&!y.inj).sort((a,b)=>b.ovr-a.ovr)[0];if(b)return b}
 const r=rng(hsh(x.n)+i*31),used=new Set(L.filter(Boolean).map(y=>+y.num)),rg=NR[x.pos]||[1,99];let n=rg[0]+(r()*(rg[1]-rg[0]+1)|0),g_=0;while(used.has(n)&&g_++<40)n=rg[0]+(r()*(rg[1]-rg[0]+1)|0);return{n:uNm(r),num:n,pos:x.pos,ovr:Math.max(40,x.ovr-12)}}
// ---------------- State Player of the Year race: real names, no repeats ----------------
let POYC=null;function poyN(i){const key=(S.seed||1)+':'+S.yr;if(!POYC||POYC.k!==key)POYC={k:key,m:{},u:new Set([S.name])};if(POYC.m[i])return POYC.m[i];const L=S.ro&&S.ro['h.'+i];let n=L&&L[0]&&L[0].n;const r=rng((S.seed||1)*977+i*131+(S.yr||1)*7);let g_=0;while((!n||POYC.u.has(n))&&g_++<30)n=uNm(r);POYC.u.add(n);return POYC.m[i]=n}
// ---------------- the "scroll for more" hint never shows over the locker room or games ----------------
setInterval(()=>{try{scrH()}catch(e){}},500);
