// ===== Tyler 2026-11-17 batch: ties · retired jerseys · songs/fans · controller menus · schedules · QB need · team overall · unretire =====
// ---------- 1. TIES (pro regular season): a tied game is a tie, not a loss; records read W-L-T ----------
window.isTieG=function(){try{return !!(g&&g.s&&g.s[0]===g.s[1]&&S.stage==='pro'&&g.kind!=='pp'&&g.kind!=='pbg')}catch(e){return false}};
(()=>{try{const _a=addStats;addStats=function(st,w,post){if(!post&&isTieG()){const r=_a.call(this,st,true,post);try{S.ss.w--;S.cs.w--;S.ss.t=(S.ss.t||0)+1;S.cs.t=(S.cs.t||0)+1;const B=S.cst.pro.reg;B.w--;B.t=(B.t||0)+1}catch(e){}return r}return _a.apply(this,arguments)};window.addStats=addStats}catch(e){}})();
(()=>{try{const _p=pWeek;pWeek=function(w,o){if(w!=null&&isTieG()){const r=_p.call(this,true,o);try{const T=S.T;T[0].w--;T[o].l--;T[0].t=(T[0].t||0)+1;T[o].t=(T[o].t||0)+1}catch(e){}return r}return _p.apply(this,arguments)};window.pWeek=pWeek}catch(e){}})();
window.tieReset=function(){try{if(!S||S.stage!=='pro'||!S.T)return;const k=S.py+':'+(S.wk===0?0:1);if(S.wk===0&&S.tRk!==S.py){S.T.forEach(t=>{if(t)t.t=0});S.tRk=S.py}}catch(e){}};
// ---------- 2. RETIRED JERSEYS ----------
try{if(!/Steve Smith/.test(RJ0.CHA))RJ0.CHA+=';89 Steve Smith Sr.'}catch(e){}
// the team he played the most seasons for (rjBest was written but never used); generated players need a 90+ peak
(()=>{try{const _c=cpuRet;cpuRet=function(x,t){const n0=(S.rjc||[]).length;const r=_c.apply(this,arguments);try{const C=S.rjc||[];for(let k=n0;k<C.length;k++){const s=C[k];if(s.n!==x.n)continue;s.code=rjBest(x,t)||s.code;if(isGen(s.n)&&(s.pk||0)<90)s.rec=0}}catch(e){}return r}}catch(e){}})();
window.rjClean=function(){try{if(!S||S.stage!=='pro'||!S.rj)return;const key=yrN()+':'+(S.wk||0)+':'+JSON.stringify(S.rj).length;if(S.rjck===key)return;
 const act=new Set();Object.keys(S.ro||{}).forEach(k=>(S.ro[k]||[]).forEach(x=>{if(x&&x.n)act.add(x.n)}));const A=S.retAll||[];let moved=[];
 Object.keys(S.rj).forEach(code=>{S.rj[code]=(S.rj[code]||[]).filter(x=>{if(x.me)return true;if(act.has(x.n))return false;   /* still playing: no retired number */
   const ra=A.find(a=>a&&a.n===x.n&&Array.isArray(a.h)&&a.h.length);if(ra){const cnt={};ra.h.forEach(r=>{if(r&&r[1]!=null&&r[1]>=0)cnt[r[1]]=(cnt[r[1]]||0)+1});const ks=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);const best=ks.length?TA[+ks[0]]:null;
    if(best&&best!==code&&cnt[ks[0]]>(cnt[TA.indexOf(code)]||0)){S.rj[best]=S.rj[best]||[];if(!rjSet(best).has(+x.num)){S.rj[best].push(x);moved.push(x.n+' → '+best);return false}}}return true})});
 S.rjck=yrN()+':'+(S.wk||0)+':'+JSON.stringify(S.rj).length}catch(e){}};
// ---------- 3. SONGS: no repeat remixes; fans move by a real amount (up or down), never "+3" ----------
window.sfD=function(f){try{const d=Math.round(fans(S.pop||40)-fans((S.pop||40)-f));return (d>=0?'+':'−')+Math.abs(d).toLocaleString()}catch(e){return (f>=0?'+':'')+f}};
(()=>{try{const _m=songMake;songMake=function(k,fl,sim){try{if(k!=='new'&&(S.songs||[]).some(s=>s.k===k))k='new'}catch(e){}return _m.call(this,k,fl,sim)};window.songMake=songMake}catch(e){}})();
// ---------- 4. CONTROLLER MENUS ----------
// A on a checkbox ticks it; after a menu redraws (an upgrade), the highlight stays on the same button (or the nearest one),
// and A presses right after a redraw that lost the button are ignored (no more jumping to another screen)
(()=>{try{const _p=ctlPress;window.ctlPress=function(){try{const el=CTL.sel;if(el&&el.isConnected){CTL.lastOcT=performance.now();const rc=el.getBoundingClientRect();CTL.lastY=rc.top;CTL.lastX=rc.left;
  if(performance.now()-(CTL.selFallT||0)<350)return;if(el.tagName==='INPUT'&&/checkbox|radio/i.test(el.type)){el.click();return}if(el.tagName==='LABEL'){el.click();return}}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
window.ctlKeep=function(C){try{
 // title screen: start on your last-used save slot (not on the event button above the list), so one press of X loads it
 const sl=C.filter(el=>/^Slot \d+: (?!New career)/.test((el.textContent||'').trim()));if(sl.length&&C.some(el=>/Delete Slot/.test(el.textContent||''))&&(!CTL.lastOcT||performance.now()-CTL.lastOcT>2500)){const want=CTL.slotMem||(typeof SLOT!='undefined'?SLOT:0);const hit=sl.find(el=>new RegExp('^Slot '+want+':').test((el.textContent||'').trim()))||sl[0];try{hit.scrollIntoView({block:'center'})}catch(e){}return hit}
 if(!CTL.lastOcT||performance.now()-CTL.lastOcT>2500)return null;const oc=CTL.lastOc||'',tx=CTL.lastTx||'';
 if(/^g\.tab=/.test(oc)){const c=C.find(el=>el.classList&&el.classList.contains('pc'));if(c)return c}
 let m=oc&&C.find(el=>(el.getAttribute('onclick')||'')===oc)||C.find(el=>(el.textContent||'').trim()===tx);if(m)return m;
 CTL.selFallT=performance.now();let b=null,bd=1e9;C.forEach(el=>{const r=el.getBoundingClientRect(),d=Math.abs(r.top-(CTL.lastY||0))*2+Math.abs(r.left-(CTL.lastX||0));if(d<bd){bd=d;b=el}});return b}catch(e){return null}};
// the legend says the right stick scrolls
(()=>{try{const _g=window.ctlLegend;window.ctlLegend=function(){_g.apply(this,arguments);try{const lg=document.getElementById('ctlleg');if(lg&&ctlRoot()&&!/R-stick/.test(lg.textContent))lg.textContent+=' · R-stick scroll'}catch(e){}}}catch(e){}})();
// ---------- 5. SCHEDULES (player menu, above Full statistics) ----------
window.schOf=function(){try{return S.stage==='pro'?S.psch:S.stage==='col'?S.csch:mkSched()}catch(e){return null}};
window.schV=function(mode,wk){const W=schOf()||[],T=S.T,G=(S.grk==grK()&&S.gr)||[],nm=i=>esc(i===0?tn(T[0]):tn(T[i]||{n:'?'}));mode=mode||'team';
 const res=(w,a,b)=>{const r=(G[w]||[]).find(x=>(x[0]==a&&x[1]==b)||(x[0]==b&&x[1]==a));if(!r)return '';const sa=r[0]==a?r[2]:r[3],sb=r[0]==a?r[3]:r[2];return ` <b>${sa}-${sb}</b>${sa===sb?' T':''}`};
 let body='';
 if(mode==='team'){body=W.map((wk_,w)=>{const p=(wk_||[]).find(x=>x[0]==0||x[1]==0);if(!p)return `<div class=row><span>Week ${w+1}</span><small>BYE</small></div>`;const o=p[0]==0?p[1]:p[0];
   const r=(G[w]||[]).find(x=>(x[0]==0&&x[1]==o)||(x[1]==0&&x[0]==o));let t='';if(r){const me=r[0]==0?r[2]:r[3],op=r[0]==0?r[3]:r[2];t=` <b>${me>op?'W':me<op?'L':'T'} ${me}-${op}</b>`}
   return `<div class=row style="font-size:15px"><span>Week ${w+1}${w===S.wk?' ◀':''}</span><span>${p[0]==0?'vs':'@'} ${nm(o)}${t}</span></div>`}).join('')}
 else{const w=wk==null?Math.min(S.wk||0,W.length-1):wk;body=`<div class=row><button class=g onclick="schV('lg',${Math.max(0,w-1)})">◀</button><b>Week ${w+1}</b><button class=g onclick="schV('lg',${Math.min(W.length-1,w+1)})">▶</button></div>`+((W[w]||[]).map(([a,b])=>`<div class=row style="font-size:14px"><span>${nm(a)} vs ${nm(b)}</span><span>${res(w,a,b)}</span></div>`).join(''))}
 ui.style.display='block';ui.innerHTML=`<div><h2>📅 Schedules</h2><p class=tabs><button class="${mode==='team'?'':'g'}" onclick="schV('team')">My team</button><button class="${mode!=='team'?'':'g'}" onclick="schV('lg')">${S.stage==='col'?'All of college':'League'}</button></p><div class=card style="text-align:left">${body||'<small>No schedule yet.</small>'}</div><button class=g onclick=hub()>↩️ Back</button></div>`;ui.scrollTop=0};
// ---------- 6. QB NEED: Tyler's 2026 baseline, re-evaluated every season and whenever a team's QB changes ----------
window.QBG26=[2,12,4,11,12,4,6,11,7,3,6,11,12,10,9,7,9,8,10,8,12,10,11,6,5,6,8,7,12,9,3,11];
window.qbRoom=function(pi){try{const t=S.pro[pi];let L=null;const ix=S.T.indexOf(t);if(ix>=0)L=S.ro['h.'+ix];if(!L)L=S.ro['p.'+pi];if(!L)return null;
 const Q=L.filter(x=>x&&x.pos==='QB').map(x=>x===L[0]&&ix===0&&S.stage==='pro'?{n:S.name,ovr:Math.max(qo(S.q),S.sq||0),age:S.age||25,pot:99,ny:S.py||1,ctx:S.ct?{exp:yrN()+(S.ct.yrs||1)-1,how:'me',y:S.ct.yrs}:null}:{n:x.n,ovr:x.ovr||60,age:x.age||28,pot:x.pot||x.ovr||60,ny:(x.h||[]).length,ctx:x.ct?{exp:x.ct.exp,how:x.ct.how,y:x.ct.y}:null});
 if(!Q.length)return null;const st=Q[0],bk=Q.slice(1).sort((a,b)=>(b.pot+b.ovr)-(a.pot+a.ovr))[0]||null;return {st,bk}}catch(e){return null}};
// what the team believes about its QB room (0 F ... 12 A+)
window.qbgTarget=function(pi){const R_=qbRoom(pi);if(!R_){const s=qbStarter(pi);return qbgFor(s.ovr,s.age)}const {st,bk}=R_;
 let g=st.ovr>=95?12:st.ovr>=92?11:st.ovr>=89?10:st.ovr>=86?9:st.ovr>=83?8:st.ovr>=80?7:st.ovr>=77?6:st.ovr>=74?5:st.ovr>=71?4:st.ovr>=68?3:st.ovr>=65?2:st.ovr>=60?1:0;
 const heir=bk&&bk.age<=27&&(bk.pot>=86||bk.ovr>=80);                       // a successor already in the building
 if(st.age>=38)g-=heir?1:4;else if(st.age>=36)g-=heir?0:3;else if(st.age>=34)g-=heir?0:1;   // aging: start planning, gradually
 if(st.age<=24&&st.ny<=2&&st.pot>=84)g=Math.max(g,6);                      // a young QB who deserves time
 if(st.ny<=1&&st.age<=24)g=Math.min(g,9);                                   // a rookie hasn't earned an A yet
 if(st.age<=26&&st.ovr>=86)g+=1;                                            // young franchise QB
 if(bk&&bk.ovr>=st.ovr+3&&bk.age<=30)g=Math.max(g,qbgFor(bk.ovr,bk.age)-1); // the better man takes over
 // contract: a long, fresh deal means the team has committed; the last year of a deal (not an extension yet) means it hasn't
 try{const c=st.ctx,Y=yrN();if(c&&c.exp!=null){const left=c.exp-Y+1;if(left<=1&&st.ovr<88)g-=1;else if(left<=1&&st.ovr>=88&&st.age>=34)g-=1;else if(left>=4&&st.ovr>=80)g+=1;if(c.how==='ext'&&left>=3)g+=1}}catch(e){}
 return cl(g,0,12)};
window.qbgEns=function(){try{if(!S||!S.pro)return null;const y=yrN();
 if(!S.qbg||!S.qbg.v2){const old=S.qbg;S.qbg={y:2026,g:QBG26.slice(),v2:1,st:[]};if(y>2026||(old&&old.y>2026)){S.qbg.y=y;S.qbg.g=S.qbg.g.map((g0,pi)=>Math.round(g0*.25+qbgTarget(pi)*.75))}}
 const Q=S.qbg;while(Q.y<y){Q.y++;Q.g=Q.g.map((g0,pi)=>Math.round((g0+qbgTarget(pi))/2))}   // every new season: re-evaluated (moves like a reputation)
 Q.ck=Q.ck||{};(S.pro||[]).forEach((t,pi)=>{const R_=qbRoom(pi),n=R_&&R_.st.n,c=R_&&R_.st.ctx,key=c?c.exp+':'+(c.how||''):'';if(n&&Q.st[pi]&&Q.st[pi]!==n)Q.g[pi]=Math.round(Q.g[pi]*.3+qbgTarget(pi)*.7);
  else if(n&&Q.ck[pi]!=null&&Q.ck[pi]!==key)Q.g[pi]=Math.round(Q.g[pi]*.5+qbgTarget(pi)*.5);   /* an extension, or the deal reaching its last year: re-evaluated */
  if(n)Q.st[pi]=n;Q.ck[pi]=key});   // a new starter: re-evaluated now
 return Q}catch(e){return null}};
window.qbAdj=function(pi,p){if(!p||p.pos!=='QB')return 0;const g=qbG(pi),elite=(p.ovr||0)>=95||p.gen,late=S.dr&&S.dr.pk>=32,R_=qbRoom(pi),old=R_&&R_.st.age>=33;
 if(late&&old)return 5;                                                     // a developmental QB to learn behind the vet
 if(g<=3)return elite?18:10;if(g<=6)return elite?13:5;if(g<=8)return elite?4:-3;if(g<=10)return R()<.06?0:-12;return R()<.02?0:-22};
// ---------- 7. TEAM OVERALL: ~88% roster, ~12% coach, re-rated as the roster changes ----------
const TOVW={QB:2,RB:1,WR:1,TE:1,LT:1,LG:1,C:1,RG:1,RT:1,DE:1,DT:1,OLB:1,MLB:1,CB:1,S:1,K:.3};
window.tovRoster=function(i){try{const L=S.ro['h.'+i];if(!L)return null;let s=0,n=0;for(let k=0;k<23;k++){const x=L[k];if(!x)continue;const w=TOVW[POSL[k]]||1,o=i===0&&k===0?78:(x.ovr||60)   /* your own QB rating is added on top in every sim of your games; counting it here too doubled it */;s+=o*w;n+=w}return n?s/n:null}catch(e){return null}};
window.tovUpd=function(){try{if(!S||S.stage!=='pro'||!S.T)return;const key=S.py+':'+(S.wk||0);if(S.tovk===key)return;S.tovk=key;const R_=S.T.map((t,i)=>tovRoster(i));if(R_.some(v=>v==null))return;
 if(!S.tov0){const o=S.T.map(t=>t.ovr||75),m=o.reduce((a,b)=>a+b,0)/o.length,sd=Math.sqrt(o.reduce((a,b)=>a+(b-m)**2,0)/o.length)||4;const rm=R_.reduce((a,b)=>a+b,0)/R_.length,rs=Math.sqrt(R_.reduce((a,b)=>a+(b-rm)**2,0)/R_.length)||3;S.tov0={m,sd,rm,rs}}
 const Z_=S.tov0;S.T.forEach((t,i)=>{const sc=Z_.m+(R_[i]-Z_.rm)/Z_.rs*Z_.sd;let co=75;try{co=stf(t).o||75}catch(e){}t.ovr=cl(Math.round(sc*.88+(Z_.m+(co-75)*.6)*.12),40,99)})}catch(e){}};
// ---------- 8. UNRETIREMENT DURING THE SEASON (nobody retires mid-season) ----------
// A player who retired in the last 3 seasons, still good, with fewer than 2 comebacks, can sign with a team that needs him at his
// position (about once every few weeks league-wide). Like Philip Rivers.
window.unretWk=function(){try{if(!S||S.stage!=='pro'||!Array.isArray(S.retq)||(S.wk||0)<1||(S.wk||0)>14||R()>.12)return;
 const act=new Set();Object.keys(S.ro).forEach(k=>(S.ro[k]||[]).forEach(x=>{if(x&&x.n)act.add(x.n)}));
 const C=S.retq.filter(e=>e&&e.s&&!e.done&&(S.py-(e.py||0))<=3&&(e.s.unr||0)<2&&(e.s.ovr||0)>=76&&(e.s.age||40)<=42&&!act.has(e.s.n)&&e.s.n!==S.name);if(!C.length)return;
 const e=C[ri(0,C.length-1)],x=e.s,pk=POSL.indexOf(x.pos);if(pk<0)return;let best=-1,gap=3;
 S.T.forEach((t,i)=>{if(i===0)return;const L=S.ro['h.'+i];const s=L&&L[pk];const o=s?(s.ovr||60):50;if(x.ovr-o>gap){gap=x.ovr-o;best=i}});if(best<0)return;
 const p=JSON.parse(JSON.stringify(x));p.unr=(x.unr||0)+1;S.ro['h.'+best].push(p);e.done=1;x.unr=p.unr;
 if(S.rets)S.rets=S.rets.filter(n=>n!==x.n);if(S.retAll)S.retAll=S.retAll.filter(a=>a.n!==x.n);
 S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🔙 '+x.n+' ('+x.pos+', '+x.ovr+' OVR) comes out of retirement to sign with the '+tn(S.T[best])+'.'}catch(e){}};
(()=>{try{const _p=pWeek;pWeek=function(){const r=_p.apply(this,arguments);try{unretWk();tovUpd()}catch(e){}return r};window.pWeek=pWeek}catch(e){}})();
// ---------- hub: keep everything current; the Schedules button ----------
(()=>{try{const _h=hub;hub=function(){try{tieReset();rjClean();tovUpd();if(S&&S.pro)qbgEns()}catch(e){}const r=_h.apply(this,arguments);try{const f=ui.querySelector('[data-fstat]');if(f&&!ui.querySelector('[data-sched]')){const b=document.createElement('button');b.className=f.className;b.setAttribute('data-sched','1');b.textContent='📅 Schedules';b.setAttribute('onclick',"schV('team')");f.parentNode.insertBefore(b,f)}}catch(e){}return r}}catch(e){}})();
// ---------- 9. STANDINGS behind one button (Tyler: the division cards sat between your upgrades and Relationship) ----------
window.STDH='';window.stdV=function(){ui.style.display='block';ui.innerHTML=`<div><h2>🏆 Standings</h2>${STDH}<button class=g onclick=hub()>↩️ Back</button></div>`;ui.scrollTop=0};
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{const C=[...ui.querySelectorAll('.card')].filter(c=>/^(RFC|LFC) (East|West|North|South)\b/.test((c.innerText||'').trim())||/standings \(conference record\)/.test(c.innerText||''));
 if(C.length){STDH=C.map(c=>c.outerHTML).join('');const b=document.createElement('button');b.className='g';b.setAttribute('data-std','1');b.textContent='🏆 Standings';b.setAttribute('onclick','stdV()');C[0].parentNode.insertBefore(b,C[0]);C.forEach(c=>c.remove())}}catch(e){}return r}}catch(e){}})();
// ---------- 10. PRO BOWL SIDELINE: the whole all-star roster stands on each sideline (both are conference teams, not in the league list) ----------
(()=>{try{const _r=slRoster;window.slRoster=function(T){try{if(typeof PBGM!=='undefined'&&PBGM&&g&&g.kind==='pbg'){const cf=T===g.m?PBGM.me:T===g.o?PBGM.them:null;if(cf){const V=pbS(),R44=(V.r44||{})[cf]||{};
 return PB44.flatMap(([G,_l,n])=>(R44[G]||[]).filter(c=>!c.ub).sort((a,b)=>(a.rank||0)-(b.rank||0)).slice(0,n||99)).filter(c=>!(c.me)).map(c=>{try{return pbCopy(c)}catch(e){return {n:c.n,pos:c.pos,ovr:c.ovr}}})}}}catch(e){}return _r.apply(this,arguments)}}catch(e){}})();

// remember which save slot the highlight is on, so a redraw of the list (the cloud check finishing) doesn't throw it back to the top
(()=>{try{const _s=window.ctlSet;window.ctlSet=function(el){try{const m=el&&/^Slot (\d+):/.exec((el.textContent||'').trim());if(m)CTL.slotMem=+m[1]}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
