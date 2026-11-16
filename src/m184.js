// ===== 🏈 QB NEEDS (Tyler's 2026 grades) and how they drive the draft =====
// Tyler, 2026-11-15: "the grades I give you are the 2026 draft class needs ... C minus or lower, they're almost always looking for
// a quarterback ... if you're one of the best prospects ever ... you're probably going number one no matter what, as long as their
// QB need is C plus or below. B minus is up to the team ... If they have a number one overall pick but their quarterback is
// already a B plus or above ... they would try to trade that pick ... less 10% chance that you get picked by a team with the number
// one overall pick and they have B plus, even if you're maxed ... you're going to have to adjust that yourself for each season".
// Injuries are not modelled as a rating (Tyler: "you don't have to make that adjustments"), they only explain his grades.
// Grades are LG letters: 0 F ... 6 C+, 7 B-, 8 B, 9 B+, 10 A-, 11 A, 12 A+. Order = the league's team order.
window.QBG26=[2,12,4,11,11,4,6,12,7,3,6,11,12,10,9,7,9,8,10,8,12,10,11,6,5,6,8,7,12,9,3,11];
window.QBGWHY={1:'Already possibly the greatest player in their history',7:'One of the best QBs in the league, already paid',12:'Their greatest player of all time',20:'Top-8 QB and one of the youngest',28:'Proven as one of the best QBs in the league',
 0:'Old veteran, not the franchise guy: would take a QB in round 1',30:'Unproven room: wouldn\'t be surprised by a round-1 QB',9:'Richardson hasn\'t committed: could draft a QB in round 1',2:'Flashes, not consistent: could go QB in round 1',5:'Great but close to retirement',
 24:'Flashes, very inconsistent',6:'Decent, not a star; the backup is unknown',10:'Former #1 pick hasn\'t shown it yet',23:'Decent older QB; still needs the franchise guy',25:'Young, good flashes, second year',
 8:'Good young QB who wants a big contract',15:'Has played at MVP level; struggling right now',27:'Young, smart, inconsistent',26:'Just paid; has been pretty good',17:'Good QB, older, very expensive',19:'Decent room, health questions',
 14:'#1 overall pick and Heisman, hasn\'t played yet',16:'MVP talk and a Super Bowl MVP',29:'Top-12 QB, just extended',13:'Good young QB, clutch, winning',18:'Young former Heisman, lots of potential',21:'Good QB, a little older',3:'Already one of the better QBs and young',4:'One of the best when healthy',11:'Former #1 pick, paid, looking like it',22:'Really good, young, paid',31:'Reigning MVP with a first-round QB behind him'};
// this season's grade for each team; from 2027 on it follows how the starter is doing (rating, age, belief in young QBs),
// blended with last year's grade so it moves like a real reputation, not overnight
window.qbgFor=function(ovr,age){let g=ovr>=95?12:ovr>=92?11:ovr>=89?10:ovr>=86?9:ovr>=83?8:ovr>=80?7:ovr>=77?6:ovr>=74?5:ovr>=71?4:ovr>=68?3:ovr>=65?2:ovr>=60?1:0;
 if(age>=37)g-=3;else if(age>=35)g-=2;else if(age>=33)g-=1;if(age<=25&&ovr>=78)g+=1;return cl(g,0,12)};
window.qbStarter=function(pi){try{const t=S.pro[pi];let L=null;if(S.stage==='pro'&&Array.isArray(S.T)){const ix=S.T.indexOf(t);if(ix>=0)L=S.ro['h.'+ix]}if(!L)L=S.ro&&S.ro['p.'+pi];
 if(S.stage==='pro'&&L===S.ro['h.0'])return {ovr:Math.max(qo(S.q),S.sq||0),age:S.age||25};const q=L&&L.find(x=>x&&x.pos==='QB');if(q)return {ovr:q.ovr||70,age:q.age||28};const Q=QBP[pi];return Q?{ovr:Q[1],age:Q[2]}:{ovr:70,age:28}}catch(e){return {ovr:70,age:28}}};
window.qbgEns=function(){try{if(!S||!S.pro)return null;const y=yrN();if(!S.qbg){S.qbg={y:Math.max(2026,y),g:QBG26.slice()};if(y<=2026)return S.qbg}
 while(S.qbg.y<y){S.qbg.y++;S.qbg.g=S.qbg.g.map((g0,pi)=>{const st=qbStarter(pi);return Math.round((g0+qbgFor(st.ovr,st.age))/2)})}return S.qbg}catch(e){return null}};
window.qbG=function(pi){const Q=qbgEns();return Q&&Q.g[pi]!=null?Q.g[pi]:6};
window.qbGL=function(pi){return LG[qbG(pi)]};
// how much a team wants a QB prospect (college -> pro draft and the yearly league draft)
window.qbAdj=function(pi,p){if(!p||p.pos!=='QB')return 0;const g=qbG(pi),elite=(p.ovr||0)>=95||p.gen;if(g<=6)return elite?14:6;if(g<=8)return elite?4:-2;return R()<.08?0:-15};
// the college -> pro draft: pick by grade; a B+ or better team holding the #1 pick with an elite QB on top usually trades it
dSel=function(){const D=S.dr;if(D.pk>=224)return null;D.swap=D.swap||{};let ti=D.swap[D.pk]!=null?D.swap[D.pk]:D.ord[D.pk%32];
 if(D.guar&&!D.mine&&D.pk==D.guar*32-1)return{ti,i:D.P.findIndex(p=>p.me)};
 const all=D.P.map((p,i)=>({p,i})).filter(x=>!x.p.tk).sort((a,b)=>dsc(b.p)-dsc(a.p)),top=all[0];
 if(window.DTONE&&top&&top.p.pos==='QB'&&((top.p.ovr||0)>=95||top.p.gen)&&qbG(ti)>=9&&D.pk<32&&!D.tr1){D.tr1=1;const u=R();
  if(u<.7){let j=-1;for(let k=D.pk+1;k<32;k++){const t2=D.swap[k]!=null?D.swap[k]:D.ord[k];if(qbG(t2)<=6){j=k;break}}
   if(j>0){const t2=D.swap[j]!=null?D.swap[j]:D.ord[j];D.swap[D.pk]=t2;D.swap[j]=ti;(D.news=D.news||[]).push(`🔁 TRADE: the ${tn(S.pro[ti])} (QB need ${qbGL(ti)}) trade pick ${D.pk+1} to the ${tn(S.pro[t2])} (QB need ${qbGL(t2)}) for pick ${j+1}.`);ti=t2}}}
 const av=all.slice(0,12),mi=all.findIndex(x=>x.p.me);if(mi>=12&&mi<24)av.push(all[mi]);let best=av[0],bs=-1e9;
 av.forEach(x=>{const s=dsc(x.p)+(typeof potKnowAdj=='function'&&!x.p.me?potKnowAdj(ti,x.p,.35):0)+qbAdj(ti,x.p)+(x.p.me?((D.int||{})[ti]||0):0)+(R()-.5)*7;if(s>bs){bs=s;best=x}});return{ti,i:best.i}};
// "on the clock" shows the right team after a trade, and the QB need
(()=>{try{const _h=dhub;dhub=function(){const r=_h.apply(this,arguments);try{const D=S.dr;if(!D)return r;const ti=D.swap&&D.swap[D.pk]!=null?D.swap[D.pk]:D.ord[D.pk%32];const b=[...ui.querySelectorAll('b')].find(x=>/^Pick \d+ of 224/.test(x.textContent));
 if(b&&D.pk<224){const host=b.parentNode;host.innerHTML=host.innerHTML.replace(/On the clock: [^<]+/,'On the clock: '+tn(S.pro[ti])+' (QB need '+qbGL(ti)+')')}
 if(D.news&&D.news.length&&!ui.querySelector('[data-drnews]')){const c=document.createElement('div');c.className='card';c.setAttribute('data-drnews','1');c.innerHTML=D.news.map(esc).join('<br>');const d=ui.firstElementChild||ui;d.insertBefore(c,d.children[1]||null)}}catch(e){}return r}}catch(e){}})();
// a page with every team's QB need (in Full statistics)
window.qbnV=function(){qbgEns();const L=(S.pro||[]).map((t,pi)=>({t,pi,g:qbG(pi)})).sort((a,b)=>a.g-b.g);ui.style.display='block';
 ui.innerHTML=`<div><h2>🏈 QB needs ${yrN()}</h2><div class=card><small>How much each team believes in its quarterback. C+ or lower: looking for a QB. B- / B: they'll think about it. B+ and up: they have their guy.</small></div>
 ${L.map(x=>`<div class=row style="font-size:15px"><span><b>${esc(tn(x.t))}</b>${yrN()<=2026&&QBGWHY[x.pi]?'<br><small>'+esc(QBGWHY[x.pi])+'</small>':''}</span><b style="color:${x.g<=6?'#ff7675':x.g<=8?'#ffd166':'#7bed9f'}">${LG[x.g]}</b></div>`).join('')}<button class=g onclick="typeof fstatV=='function'?fstatV():hub()">↩️ Back</button></div>`;ui.scrollTop=0};
try{if(window.FSTAT&&!FSTAT.some(x=>x[0]==='qbnV()'))FSTAT.push(['qbnV()','🏈 QB needs (every team)'])}catch(e){}
(()=>{try{const _f=fstatV;window.fstatV=function(){if(window.FSTATHAVE&&!FSTATHAVE.includes('qbnV()'))FSTATHAVE.push('qbnV()');return _f.apply(this,arguments)}}catch(e){}})();
