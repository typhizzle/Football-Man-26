// ===== ❤️ PLAYER LIVES MATTER: COLLEGE PLAYERS STAY IN COLLEGE · TRADES HAPPEN · SIMMONS 2037 RESTARTS =====
// Tyler, 2026-11-16: "Why the hell do I see Darnold Mansion on a team? ... it's 2026 season on my save ... if they're supposed to be
// in college, let them play their season in college before they enter the NFL. Remember, I'm supposed to watch them get drafted."
// "Kirko Chainz just got traded to the Vikings. Jake Efficiency got traded to the Ravens. Ben Epstein got traded to Chicago. Manny
// Escort got traded to Buffalo" (2026-11-10, saves made after that). "get rid of Kyler Murray's stats. Kirk, just take away the
// rushing yards ... give him Kyler Murray's passing stats ... the same receiving stats for all of his receivers. And for Nandolorean,
// whatever you think's best." "you could just restart my whole season ... back to the beginning of the season where all the players
// that aren't retired yet should be playing."
//
// 1) WHY college players were in the NFL: in a takeover / free-agent career the game treated every named college prospect as
//    already in the pros (that is only true for a career that started in high school in 2022). Now in those careers a prospect's
//    class follows the real calendar (Tyler's list: his class in 2026), he stays in college until he's eligible, then he's in that
//    year's league draft class (you can watch him get picked). Any still-in-college prospect found on an NFL roster (every load,
//    every menu) goes back to college and his NFL spot goes to that team's best free agent at the position (or a made-up backup).
//    The season's NFL box scores are rebuilt from the rosters, so his snaps go to the man in his spot.
// 2) The Nov 10 trades: NEW saves only, plus Tyler's Cam save ("those trades are for future saves only. If I told you to fix it in a
//    league, you can"); only where the player is still on his original team: Kirko Chainz <-> Kyle Kerr (Minnesota's QB);
//    in Las Vegas, Ferb Nandolorean starts and Kerr backs him up. Jake Efficiency <-> Baltimore's backup QB. Ben Epstein <->
//    Chicago's lowest-rated DT. Manny Escort <-> Buffalo's lowest-rated safety. Every roster stays full, nobody is invented.
//    This season's games so far: Minnesota's QB line (Kerr's passing, receivers unchanged) is Kirko's now and his runs follow his
//    own legs; Las Vegas's QB line is Nandolorean's; your stored box scores against them say so too.
// 3) Simmons 2037 (Tyler's real save only, once): back to week 1 of 2037 with everyone who hasn't retired (Ricky MaClones, Jarsh
//    Fallon) playing. Undone: every 2037 stat line, your 2037 season, standings, results, box scores, playoffs, 2037 awards and
//    Pro Bowl. Everything before 2037 stays exactly as it was.
window.NPXY0=2026;
window.npxTk=function(p){try{if(!S||!S.tk||S.stage!=='pro'||p.tkDr)return null;const cy=(p.off|0)+1+(yrN()-NPXY0);return cy<=4?{lv:'col',y:Math.max(1,cy),toD:Math.max(0,4-cy)}:{lv:'col',y:4,toD:0}}catch(e){return null}};
window.npxOut=function(s){try{s=s||S;if(!s||!s.tk||s.stage!=='pro'||!s.npx||!s.ro)return 0;const S0=S;S=s;let n=0;try{const Y_=yrN(),col=p=>!p.tkDr&&((p.off|0)+1+(Y_-NPXY0))<=4;s.npx.forEach(p=>{if(col(p)&&p.pro){p.pro=0;p.tkUn=1}});const nm=new Map(s.npx.filter(col).map(p=>[p.n,p]));
 for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L)||!/^h\.\d+$/.test(k))continue;const ti=+String(k).split('.')[1];L.forEach((x,j)=>{if(!x||!x.n||x.n===s.name)return;const p=nm.get(x.n);if(!p)return;
  // a free agent at his position, else a made-up backup
  let rep=null;try{const F=lgFA();const g_=lgGrp(x.pos);const c=F.filter(f=>f&&lgGrp(f.pos)===g_&&!f.npx).sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];if(c){const i=F.indexOf(c);rep=c;if(i>=0)F.splice(i,1)}}catch(e){}
  if(!rep){const r=rng(((s.seed||1)*31+j*7+ti*131)>>>0);let nn,g=0;const M=myNames();do nn=NF[r()*NF.length|0]+' '+NL[r()*NL.length|0];while(M.has(nn)&&g++<30);rep={n:nn,pos:x.pos,num:x.num,ovr:Math.max(55,Math.min(72,(x.ovr|0)-8)),age:24+(r()*6|0),pot:70,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{}}}
  rep.pos=rep.pos||x.pos;if(rep.num==null)rep.num=x.num;L[j]=rep;n++;(s.npxLog=s.npxLog||[]).push({n:x.n,from:k,slot:j,by:rep.n,t:Date.now()})})}}finally{S=S0}try{szCache=null}catch(e){}return n}catch(e){return 0}};
// prospects enter the league draft when they're eligible (takeover / free-agent careers): seniors, plus juniors of 84+ who declare
(()=>{try{const _c=lgClass;lgClass=function(Y){const out=_c.apply(this,arguments);try{if(S&&S.tk&&S.npx){const add=[];S.npx.forEach(p=>{if(p.tkDr)return;const cyLast=(p.off|0)+1+((Y-1)-NPXY0);let go=cyLast>=4;if(!go&&cyLast===3&&(p.T||0)>=84){const r=rng(((S.seed||1)*13+p.id*101+Y)>>>0);go=r()<.5}if(!go)return;
   let ovr=p.T||70;try{ovr=npxRating(p,{lv:'col',y:4,toD:0})}catch(e){}const pot=Math.min(99,ovr+8);add.push({n:p.n,pos:p.pos,ovr,pot,age:22,col:p.sch||p.cn||'',gr:+(ovr+(pot-ovr)*.45+3).toFixed(1),npxId:p.id})});
  if(add.length){const nm=new Set(add.map(a=>a.n));const rest=out.filter(o=>!nm.has(o.n));return add.concat(rest).sort((a,b)=>b.gr-a.gr)}}}catch(e){}return out};window.lgClass=lgClass}catch(e){}})();
(()=>{try{const _d=lgDraft;lgDraft=function(){const r=_d.apply(this,arguments);try{if(S&&S.tk&&S.npx){const by=new Map(S.npx.filter(p=>!p.tkDr).map(p=>[p.n,p]));for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L))L.forEach(x=>{const p=x&&by.get(x.n);if(p&&x.dr){p.pro=1;p.tkDr=1;x.npx=p.id;if(p.num!=null)x.num=p.num}})}}}catch(e){}return r};window.lgDraft=lgDraft}catch(e){}})();
// ---- the Nov 10 trades ----
window.trFind=function(s,pred){for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;const ti=+String(k).split('.')[1];if(!(ti>=0))continue;const t=s.T&&s.T[ti];if(!t||t.city==null)continue;for(let j=0;j<L.length;j++){const x=L[j];if(x&&pred(x,t,ti,j))return {k,L,ti,j,x,t}}}return null};
window.trTeam=function(s,city){const ti=(s.T||[]).findIndex(t=>t&&String(t.city||'').indexOf(city)>=0);return ti>=0?{ti,L:s.ro['h.'+ti],t:s.T[ti]}:null};
window.trSwap=function(a,b){const t=a.L[a.j];a.L[a.j]=b.L[b.j];b.L[b.j]=t};
window.tr1110=function(s,fresh){try{if(!s||s.tr1110||s.stage!=='pro'||!s.ro||!s.T)return 0;const S0=S;S=s;let Y=0;try{Y=yrN()}finally{S=S0}if(!fresh&&!(s.seed===774428715&&s.tk==='Cameron Nugent'))return 0;   /* Tyler 2026-11-16: trades are for new saves only, plus the league he told me to fix (his Cam save) */const onT=(h,city)=>!!h&&String(h.t.city||'').indexOf(city)>=0;s.tr1110=1;const done=[];
 const at=(ti,j)=>({L:s.ro['h.'+ti],j});
 // Kirko Chainz <-> Kyle Kerr; Nandolorean starts in Las Vegas, Kerr backs him up
 const kc=trFind(s,x=>x.n==='Kirko Chainz'),mn=trTeam(s,'Minneapolis');if(kc&&mn&&mn.L&&kc.ti!==mn.ti&&onT(kc,'Las Vegas')){const ker=mn.L[0];if(ker&&ker.n!==s.name){trSwap({L:kc.L,j:kc.j},{L:mn.L,j:0});done.push('Kirko Chainz -> Minnesota');
  const lv=kc.L,nd=lv.findIndex(x=>x&&x.n==='Ferb Nandolorean');if(kc.j===0&&nd>0){const kk=lv[0];lv[0]=lv[nd];lv[nd]=kk;done.push('Ferb Nandolorean starts in Las Vegas, '+(kk&&kk.n)+' backs him up')}
  s.trRen=Object.assign(s.trRen||{},{[mn.ti]:{[ker.n]:'Kirko Chainz'}});if(nd>0&&kc.j===0)s.trRen[kc.ti]={'Kirko Chainz':'Ferb Nandolorean'}}}
 // Jake Efficiency <-> Baltimore's backup QB
 const je=trFind(s,x=>x.n==='Jake Efficiency'),bal=trTeam(s,'Baltimore');if(je&&bal&&bal.L&&je.ti!==bal.ti&&bal.L[23]&&onT(je,'Phoenix')){trSwap({L:je.L,j:je.j},{L:bal.L,j:23});done.push('Jake Efficiency -> Baltimore')}
 // Ben Epstein <-> Chicago's lowest DT; Manny Escort <-> Buffalo's lowest safety
 const low=(T,re,sl)=>{let b=-1,bo=1e9;sl.forEach(j=>{const x=T.L[j];if(x&&re.test(x.pos||'')&&x.n!==s.name&&(x.ovr||0)<bo){bo=x.ovr||0;b=j}});return b};
 const be=trFind(s,x=>x.n==='Ben Epstein'),chi=trTeam(s,'Chicago');if(be&&chi&&chi.L&&be.ti!==chi.ti&&onT(be,'Nashville')){let j=low(chi,/^DT$/,[11,12,13,14]);if(j<0)j=low(chi,/^(DT|DE|NT)$/,[11,12,13,14]);if(j>=0){trSwap({L:be.L,j:be.j},{L:chi.L,j});done.push('Ben Epstein -> Chicago')}}
 const me_=trFind(s,x=>x.n==='Manny Escort'),buf=trTeam(s,'Buffalo');if(me_&&buf&&buf.L&&me_.ti!==buf.ti&&onT(me_,'Nashville')){const j=low(buf,/^(S|FS|SS)$/,[18,19,20,21]);if(j>=0){trSwap({L:me_.L,j:me_.j},{L:buf.L,j});done.push('Manny Escort -> Buffalo')}}
 // your stored box scores of this season name the new QBs
 try{const R=s.trRen||{};for(const key in s.bx||{}){const x=s.bx[key];[x.A,x.B].forEach(sd=>{const m=sd&&R[sd.ti];if(!m)return;['pass','rush','rec'].forEach(f=>(sd[f]||[]).forEach(p=>{if(p&&m[p.n])p.n=m[p.n]}))})}}catch(e){}
 s.trLog=(s.trLog||[]).concat(done.map(d=>({d,t:Date.now()})));try{szCache=null}catch(e){}return done.length}catch(e){return 0}};
// ---- Simmons 2037: back to week 1 (Tyler's real save only, once) ----
window.simRs37=function(s){try{if(!s||s.rs37||s.name!=='Simothy Simmons'||s.seed!==676914057||s.py!==9||s.sled!==9||!s.psum)return 0;s.rs37=Date.now();
 const ss=s.ss||{};if(s.cs)for(const k in ss)if(typeof ss[k]==='number'&&typeof s.cs[k]==='number')s.cs[k]-=ss[k];
 for(const k in ss)if(typeof ss[k]==='number')ss[k]=0;if(s.ssr)for(const k in s.ssr)if(typeof s.ssr[k]==='number')s.ssr[k]=0;s.ssrk='';
 (s.T||[]).forEach(t=>{if(t){t.w=0;t.l=0;if(t.t)t.t=0}});s.wk=0;s.gr={};s.pb=null;s.psum=null;s.sled=8;s.gs=[];
 const pre=(()=>{const S0=S;S=s;try{return grK()+'|'}catch(e){return null}finally{S=S0}})();if(pre){for(const k of Object.keys(s.bx||{}))if(k.startsWith(pre))delete s.bx[k];for(const k of Object.keys(s.ugl||{}))if(k.startsWith(pre))delete s.ugl[k]}
 if(s.law)delete s.law[9];if(s.pbh)delete s.pbh[2037];s.pbv=null;s.mvl=null;if(s.dc)delete s.dc[2037];s.inj=null;s.injg=0;
 const sg0=s.sgFix||0,S0=S;S=s;try{statGuard(s)}finally{S=S0}s.rs37n=(s.sgFix||0)-sg0;if(sg0)s.sgFix=sg0;else delete s.sgFix;   // removes every 2037 line (the season is no longer finished) and recounts careers; logged as the restart's, not as invented lines
 return 1}catch(e){return 0}};
// ---- every load: in order ----
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r){simRs37(r);npxOut(r);tr1110(r)}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.tk&&S.stage==='pro'&&npxOut(S))save()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// new leagues get the trades as soon as their rosters exist
(()=>{try{const _p=proStart;proStart=function(){const r=_p.apply(this,arguments);try{tr1110(S,1)}catch(e){}return r   /* college prospects are moved out on the next menu, once signing/takeover has finished placing everyone (doing it mid-signing could let the signing overwrite a player it had just placed) */}}catch(e){}})();
