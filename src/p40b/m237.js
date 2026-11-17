// ===== 🌺 THE PRO BOWL · HONOLULU (playable) =====
// Tyler's spec "FOOTBALL MAN – PLAYABLE NFL PRO BOWL MODE" (2026-11-16): LFC = NFC in BLUE, RFC = AFC in RED; votes 1/3 fans,
// 1/3 players, 1/3 coaches (season stats + performance, not just overall); 44-man rosters per conference; Ultra Bowl players keep
// their selection but don't play, the next eligible man at the position replaces them and is a Pro Bowler too; QB / RB / WR /
// TE / OL / D rotations by vote rank and quarter; a real game on the normal engine; an MVP from the game; everything recorded
// in career histories (selections, replacement selections, appearances, MVPs, first-time selections, vote ranks).
// Nothing in the season changes: the game uses COPIES of the players, never touches a real roster, adds nothing to season
// stats, and can't be resumed as a normal game.

// ---------- 1. the 44-man structure ----------
// group key, label, how many, which game positions qualify
window.PB44=[['QB','Quarterbacks',3,['QB']],['RB','Running backs',3,['RB']],['FB','Fullback',1,['RB','TE']],['WR','Wide receivers',4,['WR']],['TE','Tight ends',2,['TE']],
 ['OT','Offensive tackles',3,['LT','RT']],['OG','Offensive guards',3,['LG','RG']],['C','Centers',2,['C']],
 ['DE','Defensive ends',3,['DE']],['DT','Interior linemen',3,['DT']],['OLB','Outside linebackers',3,['OLB']],['ILB','Inside linebackers',2,['MLB']],['CB','Cornerbacks',4,['CB']],['S','Safeties',3,['S']],
 ['K','Kicker',1,['K']],['P','Punter',1,['P']],['RS','Return specialist',1,['WR','RB','CB']],['ST','Special teamer',1,['OLB','MLB','S','CB']],['LS','Long snapper',1,['C','TE','LG','RG']]];
window.PBCONF={LFC:{n:'LFC All-Stars',long:'LFC (NFC)',c1:'#1f5fd1',c2:'#ffffff',pc:'#e8eef9',d:0},RFC:{n:'RFC All-Stars',long:'RFC (AFC)',c1:'#c8102e',c2:'#ffffff',pc:'#f9e8ea',d:0}};

// ---------- 2. the vote: 1/3 fans, 1/3 players, 1/3 coaches ----------
// fans: the existing fan count (season + popularity + your taps); players: how he actually played (stats-heavy);
// coaches: how good he is and how he helped his team win. Each is turned into a 0-100 score within his position group and
// conference, then averaged, so a lower-rated man with a great season can beat a higher-rated one.
window.pbPerf=function(x,ti){try{const z=(typeof szOne=='function'&&szOne(ti,x.n))||{},p=x.pos;
 if(p==='QB')return (z.py||0)/25+(z.ptd||0)*5-(z.pint||0)*4+(z.ry||0)/15+(z.rtd||0)*5;
 if(p==='RB')return (z.ry||0)/10+(z.rtd||0)*6+(z.recy||0)/12+(z.rectd||0)*6;
 if(p==='WR'||p==='TE')return (z.recy||0)/10+(z.rectd||0)*6+(z.rec||0)*.4;
 if(/^(DE|DT|OLB|MLB)$/.test(p))return (z.sck||0)*8+(z.tkl||0)*.7+(z.ff||0)*4+(z.intc||0)*6;
 if(p==='CB'||p==='S')return (z.intc||0)*10+(z.pd||0)*2+(z.tkl||0)*.5;
 return (x.ovr||60)*.5+(z.g||0)}catch(e){return 0}};
window.pbPool=function(){const P=[];try{S.T.forEach((t,i)=>{const cf=pbConf(t),L=rost('h.'+i)||[];L.forEach((x,k)=>{if(!x||!x.n)return;if(x.inj&&x.inj.w>=90)return;const me=i===0&&k===0;
  const ovr=me?qo(S.q):(x.ovr||60);P.push({n:me?S.name:x.n,pos:x.pos,ti:i,tm:tAb(t),conf:cf,ovr,me:me?1:0,age:x.age,
   fan:(()=>{try{const c={n:me?S.name:x.n,fan:me?Math.round(qo(S.q)*1.2+((S.ss&&S.ss.yds)||0)/40+((S.ss&&S.ss.td)||0)*4):pbScore(x,i)};return pbVotes(c)}catch(e){return ovr*100}})(),
   perf:me?(((S.ss&&S.ss.yds)||0)/25+((S.ss&&S.ss.td)||0)*5-((S.ss&&S.ss.int)||0)*4+((S.ss&&S.ss.ry)||0)/15+((S.ss&&S.ss.rtd)||0)*5):pbPerf(x,i),
   win:(t.w||0)})})})}catch(e){}return P};
window.pbNorm=function(L,f){if(!L.length)return;const v=L.map(f),lo=Math.min(...v),hi=Math.max(...v);L.forEach((c,i)=>{c._n=hi>lo?(v[i]-lo)/(hi-lo)*100:50});return L.map(c=>c._n)};
window.pbRank=function(pool,G,cf){const Gd=PB44.find(g=>g[0]===G);const L=pool.filter(c=>c.conf===cf&&Gd[3].includes(c.pos));if(!L.length)return [];
 const fa=pbNorm(L,c=>c.fan),pl=pbNorm(L,c=>c.perf+(c.ovr||60)*.35),co=pbNorm(L,c=>(c.ovr||60)*1.0+c.win*1.2+c.perf*.25);
 L.forEach((c,i)=>{c.vF=Math.round(fa[i]);c.vP=Math.round(pl[i]);c.vC=Math.round(co[i]);c.vT=+((fa[i]+pl[i]+co[i])/3).toFixed(1)});return L.sort((a,b)=>b.vT-a.vT||b.ovr-a.ovr)};

// ---------- 3. selections (44 per conference) + Ultra Bowl replacements (both recognized) ----------
window.pbBuild44=function(){const V=pbS();if(V.r44)return V;const pool=pbPool(),R={LFC:{},RFC:{}},rk={};const taken=new Set();
 PB44.forEach(([G,lab,n])=>['LFC','RFC'].forEach(cf=>{const L=pbRank(pool,G,cf).filter(c=>!taken.has(c.n));R[cf][G]=L.slice(0,n).map((c,j)=>({n:c.n,pos:c.pos,tm:c.tm,ti:c.ti,ovr:c.ovr,me:c.me,rank:j+1,vF:c.vF,vP:c.vP,vC:c.vC,vT:c.vT,orig:1}));R[cf][G].forEach(c=>{taken.add(c.n);rk[c.n]=cf+' '+G+' #'+c.rank});R[cf]['_'+G]=L.slice(n,n+8).map(c=>({n:c.n,pos:c.pos,tm:c.tm,ti:c.ti,ovr:c.ovr,me:c.me,vT:c.vT,vF:c.vF,vP:c.vP,vC:c.vC}))}));
 V.r44=R;V.rk44=rk;S.pbr=S.pbr||{};const y=V.y,before=new Set();for(const yy in S.pbr)if(+yy<y)(S.pbr[yy].orig||[]).concat(S.pbr[yy].rep||[]).forEach(n=>before.add(n));for(const yy in (S.pbh||{}))if(+yy<y)(S.pbh[yy]||[]).forEach(n=>before.add(n));
 const orig=[];['LFC','RFC'].forEach(cf=>PB44.forEach(([G])=>(R[cf][G]||[]).forEach(c=>orig.push(c.n))));
 const tracked=Object.keys(S.pbh||{}).some(yy=>+yy<y)||Object.keys(S.pbr).some(yy=>+yy<y),meBefore=(S.aw||[]).some(a=>/Pro Bowl/.test(a)&&!/^Pro yr (\d+)/.test(a)?false:/Pro Bowl/.test(a)&&+((/^Pro yr (\d+)/.exec(a)||[])[1]||99)<(S.py||1));
 S.pbr[y]=Object.assign(S.pbr[y]||{},{orig,rep:[],played:[],mvp:null,rank:rk,first:tracked?orig.filter(n=>!before.has(n)&&!(n===S.name&&meBefore)):[],tracked:tracked?1:0});   /* 'first Pro Bowl' only once earlier seasons are on record (they weren't for league players before this season) */
 S.pbh=S.pbh||{};S.pbh[y]=[...new Set((S.pbh[y]||[]).concat(orig))];return V};
window.pbRep44=function(){const V=pbBuild44();if(V.rep44)return V;const F=pbFinalists();if(!F.length)return V;const R=V.r44,rec=S.pbr[V.y];const taken=new Set();['LFC','RFC'].forEach(cf=>PB44.forEach(([G])=>(R[cf][G]||[]).forEach(c=>taken.add(c.n))));
 ['LFC','RFC'].forEach(cf=>PB44.forEach(([G])=>{const L=R[cf][G]||[];L.filter(c=>c.orig&&F.includes(c.tm)&&!c.ub).forEach(c=>{c.ub=1;
   const alt=(R[cf]['_'+G]||[]).find(z=>!F.includes(z.tm)&&!taken.has(z.n));if(!alt)return;taken.add(alt.n);const r={...alt,rank:c.rank,rep:1,for:c.n};delete r.orig;L.push(r);rec.rep.push(alt.n);rec.rank[alt.n]=cf+' '+G+' replacement for '+c.n;if(!(S.pbh[V.y]||[]).includes(alt.n))S.pbh[V.y].push(alt.n)})}));
 const before=new Set();for(const yy in S.pbr)if(+yy<V.y)(S.pbr[yy].orig||[]).concat(S.pbr[yy].rep||[]).forEach(n=>before.add(n));if(rec.tracked)rec.rep.forEach(n=>{if(!before.has(n)&&!rec.first.includes(n))rec.first.push(n)});
 V.rep44=1;return V};
// the players who actually suit up (Ultra Bowl men sit; their replacements play), in vote order within each group
window.pbPlay=function(cf,G){const V=pbS(),L=((V.r44||{})[cf]||{})[G]||[];return L.filter(c=>!c.ub).sort((a,b)=>a.rank-b.rank)};

// ---------- 4. rotations ----------
// q = quarter 1-4, w = 5-play window number. Higher vote-getters get more snaps; the 4th quarter belongs to the top men.
window.pbPick=function(L,k,q,w,cyc){if(L.length<=k)return L.slice(0,k);if(q>=4)return L.slice(0,k);const c=cyc[w%cyc.length];const sit=Array.isArray(c)?c:[c];return L.filter((x,i)=>!sit.includes(i)).slice(0,k)};
window.PBCYC={3:[2,1,2,0,2,1],4:[3,2,3,1,3,0,2,3,1],'4of2':[[2,3],[0,3],[1,2],[1,3],[0,2],[2,3],[0,1]],2:[1,0,1,1,0,1]};
window.pbLine=function(cf,q,w){const P=G=>pbPlay(cf,G);const out=new Array(25).fill(null);const put=(k,x)=>{if(x)out[k]=x};
 const QB=P('QB');put(0,q===1?(QB[2]||QB[1]||QB[0]):q===2?(QB[1]||QB[0]):QB[0]);
 const RB=P('RB');put(1,q===1?(RB[2]||RB[1]||RB[0]):q===2?(RB[1]||RB[0]):RB[0]);
 pbPick(P('WR'),3,q,w,PBCYC[4]).forEach((x,i)=>put(2+i,x));
 const TE=P('TE');put(5,q>=3?TE[0]:(w%3===2?TE[0]:(TE[1]||TE[0])));
 const OT=pbPick(P('OT'),2,q,w,PBCYC[3]),OG=pbPick(P('OG'),2,q,w,PBCYC[3]),Cs=P('C');put(6,OT[0]);put(10,OT[1]);put(7,OG[0]);put(9,OG[1]);put(8,q>=4?Cs[0]:(PBCYC[2][w%6]&&Cs[1]?Cs[1]:Cs[0]));
 const DE=pbPick(P('DE'),2,q,w,PBCYC[3]),DT=pbPick(P('DT'),2,q,w,PBCYC[3]);put(11,DE[0]);put(14,DE[1]);put(12,DT[0]);put(13,DT[1]);
 const OL=pbPick(P('OLB'),2,q,w,PBCYC[3]),IL=P('ILB');put(15,OL[0]);put(17,OL[1]);put(16,q>=4?IL[0]:(PBCYC[2][w%6]&&IL[1]?IL[1]:IL[0]));
 const CB=pbPick(P('CB'),2,q,w,PBCYC['4of2']),SS=pbPick(P('S'),2,q,w,PBCYC[3]);put(18,CB[0]);put(19,CB[1]);put(20,SS[0]);put(21,SS[1]);
 put(22,P('K')[0]);const qbs=QB.filter(x=>x!==out[0]);put(23,qbs[0]);put(24,qbs[1]);
 const used=new Set(out.filter(Boolean));const bench=[];PB44.forEach(([G])=>P(G).forEach(x=>{if(!used.has(x)){used.add(x);bench.push(x)}}));
 // fill any hole from the bench at a compatible spot (never an incompatible position)
 for(let k=0;k<=22;k++){if(out[k])continue;const want=POSL[k];const j=bench.findIndex(x=>lgGrp(x.pos)===lgGrp(want));if(j>=0)out[k]=bench.splice(j,1)[0]}
 return out.concat(bench)};
// what the engine sees: copies of the real players (never the real objects), with the all-star's own number
window.pbCopy=function(c){try{const L=(window._rostRaw||rost)('h.'+c.ti)||[];const x=c.me?L[0]:L.find(y=>y&&y.n===c.n);const o=x?JSON.parse(JSON.stringify(x)):{n:c.n,pos:c.pos,ovr:c.ovr};o.n=c.n;o.pos=c.pos;o.ovr=c.ovr;o.pbc=1;delete o.inj;return o}catch(e){return {n:c.n,pos:c.pos,ovr:c.ovr,pbc:1}}};

// ---------- 5. the game ----------
window.PBGM=null;   // live Pro Bowl game state (null outside it)
window.pbMyConf=function(){const V=pbS();if(!V.r44)return pbConf(S.T[0]);for(const cf of ['LFC','RFC'])for(const [G] of PB44)if((V.r44[cf][G]||[]).some(c=>c.me&&!c.ub))return cf;return pbConf(S.T[0])};
window.pbIamUB=function(){const V=pbS();try{for(const cf of ['LFC','RFC'])for(const [G] of PB44)if((V.r44[cf][G]||[]).some(c=>c.me&&c.ub))return true}catch(e){}return pbFinalists().includes(tAb(S.T[0]))&&(S.pbr&&S.pbr[V.y]&&(S.pbr[V.y].orig||[]).includes(S.name))};
window.pbQ=function(){try{return Math.min(4,Math.floor((g.clk||0)/900)+1)}catch(e){return 1}};
window.pbLineNow=function(cf){const G_=PBGM;const q=pbQ(),w=Math.floor((G_.plays||0)/5);const key=cf+'|'+q+'|'+w;if(G_.lc[key])return G_.lc[key];const L=pbLine(cf,q,w).map(c=>c?pbCopy(c):null);
 L.slice(0,23).forEach(x=>{if(x&&x.n)G_.played.add(x.n)});G_.lc[key]=L;return L};
// the engine asks for "your roster" / "their roster": during the Pro Bowl it gets the all-star lineup for this quarter and window
(()=>{try{const _r=rost;window._rostRaw=_r;const w=function(a){try{if(PBGM&&g&&g.kind==='pbg'){if(a==='h.0')return pbLineNow(PBGM.me);if(a==='h.'+g.oi)return pbLineNow(PBGM.them)}}catch(e){}return _r.apply(this,arguments)};window.rost=w;rost=w}catch(e){}})();
// the man taking the snap: his own arm (you, if it's your quarter)
window.pbQBset=function(){try{if(!PBGM)return;const L=pbLineNow(PBGM.me),x=L[0];if(!x)return;if(x.n===S.name){S.q=PBGM.q0;S.qp=PBGM.qp0;return}
 let q=null;try{q=qbShape(x.n,x.ovr)}catch(e){}if(!q){const o=x.ovr||80;q={acc:o,pow:Math.min(99,o+2),awr:o,mob:Math.max(55,o-12),sec:o-4,trk:Math.max(50,o-15)}}S.q={...PBGM.q0,...q};S.qp=typeof ptBase=='function'?ptBase(S.q):S.qp;g.pbQB=x.n}catch(e){}};
window.pbRestore=function(){try{if(S&&S.pbq0){S.q=S.pbq0.q;S.qp=S.pbq0.qp;S.num=S.pbq0.num;delete S.pbq0}}catch(e){}PBGM=null};
// a save left in the middle of a Pro Bowl never keeps someone else's ratings
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r&&r.pbq0){r.q=r.pbq0.q;r.qp=r.pbq0.qp;r.num=r.pbq0.num;delete r.pbq0}if(r&&r.gsave&&r.gsave.kind==='pbg')r.gsave=null}catch(e){}return r}}catch(e){}})();
(()=>{try{const _p=pre;pre=function(){try{if(PBGM&&g&&g.kind==='pbg'){pbQBset();S.num=((pbLineNow(PBGM.me)[0]||{}).num)||S.num}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _s=gsnap;gsnap=function(){if(g&&g.kind==='pbg'){S.gsave=null;return}return _s.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _a=addStats;addStats=function(){if(g&&g.kind==='pbg')return;return _a.apply(this,arguments)}}catch(e){}})();
// play counter (for the 5-play rotation windows) + the box score of the game, by player
(()=>{try{const _e=endPlay;endPlay=function(ye,tx,o){const P=g&&g.pl;const was=P&&!P.done;const r=_e.apply(this,arguments);try{if(PBGM&&g.kind==='pbg'&&was&&P&&P.done){PBGM.plays=(PBGM.plays||0)+1;const B=PBGM.box,add=(n,k,v)=>{if(!n)return;B[n]=B[n]||{n,cf:PBGM.me,py:0,ptd:0,int:0,ry:0,rtd:0,recy:0,rec:0,rectd:0};B[n][k]+=v};
  const qb=g.pbQB||S.name,gn=Math.round(Math.min(ye,100)-g.los),k=g.out&&g.out.k,o_=o||{};const c=P.car;const nm=x=>x&&(x.fn||x.n||(x===P.qb?qb:null));
  if(o_.int){add(qb,'int',1)}else if(!o_.inc&&!o_.sk){if(P.passed&&c&&c!==P.qb){add(qb,'py',gn);add(nm(c),'recy',gn);add(nm(c),'rec',1);if(k==='td'){add(qb,'ptd',1);add(nm(c),'rectd',1)}}else if(c){const who=c===P.qb?qb:nm(c);add(who,'ry',gn);if(k==='td')add(who,'rtd',1)}}}}catch(e){}return r}}catch(e){}})();
// their drives (simulated, as always): credit their quarterback of that quarter
(()=>{try{const _a=applyO;applyO=function(){try{if(PBGM&&g.kind==='pbg'&&g.r){const L=pbLineNow(PBGM.them),qb=(L[0]||{}).n,rb=(L[1]||{}).n,B=PBGM.box;const r=g.r;if(qb){B[qb]=B[qb]||{n:qb,cf:PBGM.them,py:0,ptd:0,int:0,ry:0,rtd:0,recy:0,rec:0,rectd:0};B[qb].py+=Math.max(0,Math.round((r.yds||40)*.7));if(r.pts>=6){if(/run/i.test(r.res||'')&&rb){B[rb]=B[rb]||{n:rb,cf:PBGM.them,py:0,ptd:0,int:0,ry:0,rtd:0,recy:0,rec:0,rectd:0};B[rb].rtd++}else B[qb].ptd++}}}}catch(e){}return _a.apply(this,arguments)}}catch(e){}})();

window.pbgTeam=function(cf){const C=PBCONF[cf],L=pbLine(cf,4,0).filter(Boolean).slice(0,23);const ovr=Math.round(L.reduce((a,c)=>a+(c.ovr||80),0)/Math.max(1,L.length));return {...C,ovr,w:0,l:0,city:'Honolulu'}};
window.pbgStart=function(){try{pbRep44();const me=pbMyConf(),them=me==='LFC'?'RFC':'LFC';S.pbq0={q:{...S.q},qp:S.qp?{...S.qp}:null,num:S.num};
 PBGM={me,them,plays:0,lc:{},box:{},played:new Set(),q0:{...S.q},qp0:S.qp?{...S.qp}:null};const oi=S.T.length>1?1:0;
 startGame0(oi,'pbg');g.title='🌺 Pro Bowl · Honolulu, Hawaii';g.m=pbgTeam(me);g.o=pbgTeam(them);g.pbg=1;
 try{const mj={...g.mj,c1:PBCONF[me].c1,c2:PBCONF[me].c2,pc:PBCONF[me].pc,d:0},oj={...g.oj,c1:PBCONF[them].c1,c2:PBCONF[them].c2,pc:PBCONF[them].pc,d:0,nc:'#fff'};mj.nc='#fff';g.mj=mj;g.oj=oj;buildEZ(mj.c1,oj.c1);cheerBuild(mj,oj)}catch(e){}
 g.flash='🌺 Aloha! The Pro Bowl in Honolulu';g.ft=3;try{hype()}catch(e){}}catch(e){console.warn('pbg',e);pbRestore();hub()}};
// the end: an MVP from what actually happened, everything recorded, then back to Pro Bowl week (the Ultra Bowl is next)
window.pbMVP=function(box,winCf){const sc=b=>b.py/25+b.ptd*6-b.int*4+b.ry/10+b.rtd*6+b.recy/10+b.rectd*6;const A=Object.values(box).filter(b=>b.cf===winCf&&sc(b)>0).sort((a,b)=>sc(b)-sc(a));if(A[0])return A[0].n;const q=pbPlay(winCf,'QB')[0];return q?q.n:null};   /* nothing much happened: the winners' top quarterback (he played the second half) */
(()=>{try{const _g=endGame;endGame=function(){if(!(g&&g.kind==='pbg'))return _g.apply(this,arguments);try{S.gsave=null;g.ph='ovr';revB()}catch(e){}
 const G_=PBGM,V=pbS(),rec=S.pbr[V.y];const me=G_.me,them=G_.them,s=g.s,winCf=s[0]>=s[1]?me:them;const mvp=pbMVP(G_.box,winCf);pbRestore();
 rec.played=[...G_.played];rec.mvp=mvp;rec.score={[me]:s[0],[them]:s[1]};rec.mode='played';V.g=`${me} ${s[0]} · ${them} ${s[1]}. MVP: ${mvp?esc(mvp):'—'}.`;
 const myLine=G_.box[S.name];save();
 ovShow(`<h2>🌺 Pro Bowl final</h2><p><b style="color:${PBCONF[me].c1}">${PBCONF[me].long} ${s[0]}</b> · <b style="color:${PBCONF[them].c1}">${PBCONF[them].long} ${s[1]}</b></p><p>🏅 <b>Pro Bowl MVP: ${mvp?esc(mvp):'—'}</b></p>${myLine?`<p><small>You: ${myLine.py} pass yds · ${myLine.ptd} TD · ${myLine.int} INT · ${myLine.ry} rush yds</small></p>`:''}<p><small>${rec.played.length} all-stars played. Nothing here counts toward season stats.</small></p><button onclick="ovHide();pbgDone()">Continue</button>`)}}catch(e){}})();
window.pbgDone=function(){try{LRNEXT=1;cv.style.display=hud.style.display='none';['#spk','#lb','#camb','#pb'].forEach(q=>{const e=$(q);if(e)e.style.display='none'});ovHide();g.ph='ovr';g.kind='pbgDone'}catch(e){}try{pbwDo()}catch(e){hub()}};   /* never fin(): that would record a normal game and move the week */
// sim it instead: same rosters, same rotations, a scored result and an MVP; everyone who'd have suited up is recorded as playing
window.pbgSim=function(){try{pbRep44();const V=pbS(),rec=S.pbr[V.y];const r=rng(hsh('pbs'+V.y+(S.seed||1))),a=14+Math.floor(r()*28),b=14+Math.floor(r()*28);
 const pl=new Set();['LFC','RFC'].forEach(cf=>[1,2,3,4].forEach(q=>[0,1,2,3,4,5].forEach(w=>pbLine(cf,q,w).slice(0,23).forEach(c=>c&&pl.add(c.n)))));
 const win=a>=b?'LFC':'RFC',qb=pbPlay(win,'QB')[0];rec.played=[...pl];rec.mvp=qb?qb.n:null;rec.score={LFC:a,RFC:b};rec.mode='simmed';V.g=`LFC ${a} · RFC ${b}. MVP: ${qb?esc(qb.n):'—'}.`;save()}catch(e){}return pbwDo()};

// ---------- 6. Pro Bowl week: the intro (Hawaii), rosters by conference, play or sim ----------
window.pbIntro=function(){try{['lrw','lrcap'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none'});const e2=document.getElementById('lrs');if(e2)e2.style.display='none'}catch(e){}const V=pbRep44(),R=V.r44,rec=S.pbr[V.y],me=pbMyConf(),ub=pbIamUB();
 const col=cf=>`<div class=card style="text-align:left;border:2px solid ${PBCONF[cf].c1}"><b style="color:${PBCONF[cf].c1}">${cf==='LFC'?'🔵':'🔴'} ${PBCONF[cf].long}</b>${PB44.map(([G,lab])=>{const L=(R[cf][G]||[]).slice().sort((a,b)=>a.rank-b.rank||(a.rep?1:-1));return `<div style="font-size:13px;margin-top:4px"><b>${lab}</b>${L.map(c=>`<br>${c.rep?'↪':c.rank+'.'} ${c.me?'▶ ':''}${esc(c.n)} <small>${c.pos} · ${c.tm} · ${c.ovr} OVR${c.ub?' · <b>in the Ultra Bowl</b> (still a Pro Bowler)':''}${c.rep?' · <b>replacement</b> for '+esc(c.for):''}${(rec.first||[]).includes(c.n)?' · ⭐ first Pro Bowl':''} · votes ${c.vT} (fans ${c.vF} · players ${c.vP} · coaches ${c.vC})</small>`).join('')}</div>`}).join('')}</div>`;
 ui.style.display='block';ui.innerHTML=`<div><div style="background:linear-gradient(180deg,#ff9a3c,#ff5e7e 45%,#2a9df4);border-radius:14px;padding:14px;margin:6px 0;color:#fff;text-shadow:1px 1px 0 #0006"><h2 style="margin:0">🌺 ${V.y} Pro Bowl · Honolulu 🌴</h2><small>Aloha Stadium · the league's best, voted by the fans, the players and the coaches (1/3 each)</small></div>
 ${ub?`<div class=card>🏆 You're in the Ultra Bowl, so you keep your Pro Bowl selection but sit this one out (your replacement is a Pro Bowler too).</div>`:`<div class=card><b>You suit up for the ${PBCONF[me].long}.</b> <small>Quarterbacks rotate by votes: 3rd place 1st quarter, 2nd place 2nd quarter, the top vote-getter the second half. Everyone else rotates automatically.</small></div>`}
 ${ub?'':`<button onclick="pbgStart()">🌺 Play the Pro Bowl</button>`}<button class=g onclick="pbgSim()">⏩ Sim the Pro Bowl</button>${col('LFC')}${col('RFC')}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0};
// Pro Bowl week now opens the intro instead of skipping ahead
(()=>{try{const _p=pplay;pplay=function(){try{if(pevt().t==='pbw'){const V=pbS();if(!(S.pbr&&S.pbr[V.y]&&S.pbr[V.y].mode))return pbIntro()}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _s=psim;psim=function(e){try{if(e&&e.t==='pbw'){const V=pbS();if(!(S.pbr&&S.pbr[V.y]&&S.pbr[V.y].mode))return pbgSim()}}catch(x){}return _s.apply(this,arguments)}}catch(e){}})();
// the rosters screen shows the 44-man rosters once they exist
(()=>{try{const _v=pbV;window.pbV=function(g_){const V=pbS();if(V.closed&&V.r44)return pbIntro();return _v.apply(this,arguments)}}catch(e){}})();
// at close: build the 44-man rosters too
(()=>{try{const _c=pbClose;window.pbClose=function(){const V=_c.apply(this,arguments);try{if(V&&V.closed&&!V.r44)pbBuild44()}catch(e){}return V}}catch(e){}})();

// ---------- 7. career histories ----------
(()=>{try{const _a=fcAwardsByYear;window.fcAwardsByYear=function(x){const o=_a.apply(this,arguments);try{for(const y in (S.pbr||{})){const r=S.pbr[y];if(!r)continue;const n=x.n;if(!n)continue;const A=(o[y]=o[y]||[]);
  if((r.rep||[]).includes(n)){const i=A.indexOf('Pro Bowl');if(i>=0)A.splice(i,1);A.push('Pro Bowl (replacement)')}
  if((r.first||[]).includes(n))A.push('First Pro Bowl');if(r.mode==='played'&&(r.played||[]).includes(n))A.push('Played in the Pro Bowl');if(r.mvp===n)A.push('Pro Bowl MVP');if(r.rank&&r.rank[n])A.push('Pro Bowl vote: '+r.rank[n])}}catch(e){}return o}}catch(e){}})();
window.pbCareer=function(n){const o={sel:0,orig:0,rep:0,games:0,mvp:0,first:null};try{for(const y in (S.pbh||{}))if((S.pbh[y]||[]).includes(n))o.sel++;for(const y in (S.pbr||{})){const r=S.pbr[y];if((r.orig||[]).includes(n))o.orig++;if((r.rep||[]).includes(n))o.rep++;if((r.played||[]).includes(n))o.games++;if(r.mvp===n)o.mvp++;if((r.first||[]).includes(n))o.first=+y}}catch(e){}return o};
