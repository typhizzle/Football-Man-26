// ===================== 🗓 PRO OFFSEASON WEEKS · 🖊 FREE AGENCY · 🌟 DRAFT CLASS FIXES (Oct 30) =====================
const OFFW=[['🏆 Awards week','The season is over. Awards are handed out and everyone heads home for a bit.'],
 ['🛌 Rest & recovery week','Time to heal up. No football this week.'],
 ['⏱ Scouting combine week','The draft class runs, jumps and throws in front of every pro team.'],
 ['🖊 Free agency signing week (1 of 2)','Free agents pick their new teams. If your contract is up, choose where you play next. One of your team\'s 3 best players? Recommend up to 3 free agents to your GM.'],
 ['🖊 Free agency signing week (2 of 2)','Last week of free agency. Unsigned players go back to their teams.'],
 ['🎤 Draft week','The pro draft happens this week: 7 rounds, 224 picks.'],
 ['🏋️ Training week (OTAs)','Organized team workouts. +2 training points.'],
 ['🏕 Training camp','Camp before the season. +2 training points.']];
const offOn=()=>!!(S&&S.stage=='pro'&&S.ofs&&S.psum);
const offFA=()=>offOn()&&(S.ofs.w==3||S.ofs.w==4);
function offStart(){if(!S||S.stage!='pro')return hub();S.ofs={w:0,recs:[],sg:0,log:[]};save();hub()}
function offNext(){if(!offOn())return hub();const o=S.ofs;o.w++;
 if(o.w==3)HM='🖊 Free agency is open.'+(S.ct&&S.ct.yrs<=1&&!o.sg?' Your contract is up: check your offers below.':'');
 if(o.w==5){HM='🎤 Draft week.';try{offDraft()}catch(e){console.warn(e)}}
 if(o.w==6||o.w==7){S.pts=(S.pts||0)+2;HM='🏋️ +2 training points from '+(o.w==6?'OTAs':'training camp')+'.'}
 if(o.w>=OFFW.length)return offEnd();save();hub()}
function offEnd(){const o=S.ofs;S.ofs=null;if(o&&o.sg&&S.ct)S.ct.yrs++;if(S.tkPend){try{offDraft()}catch(e){}}pNext()}
// the takeover draft class plays its season in college and is drafted in Draft week
function offDraft(){if(!S.tkPend)return;S.tkPend=0;OFFDR=1;try{npxDraft(2,0,yrN()+1,1)}finally{OFFDR=0}}
let OFFDR=0;
(()=>{const _d=npxDraft;npxDraft=function(){if(S&&S.tkPend&&!OFFDR)return;return _d.apply(this,arguments)}})();
(()=>{const _g=tkGo;tkGo=function(){if(S)S.tkPend=1;return _g.apply(this,arguments)}})();

// the offseason panel (shows under "Season X complete")
function proOffHtml(){if(!S.ofs)return `<button onclick=offStart()>🗓 Start the offseason</button>`;const o=S.ofs,W_=OFFW[o.w];let x='';
 if(o.w==2&&npxVis())x+=`<button class=g onclick=npxV()>🌟 Draft class</button>`;
 if(o.w==3||o.w==4){if(S.ct&&S.ct.yrs<=1&&!o.sg){if(!o.offers){const seen=new Set([0]),ts=[0];while(ts.length<3){const t=ri(1,31);if(!seen.has(t)){seen.add(t);ts.push(t)}}o.offers=ts.map((ti,k)=>negOffer(ti,k?.9+R()*.3:.95));save()}
   x+=`<div class=card style="margin:6px 0"><b>Your contract is up</b><br><small>Sign now, or wait and the offers come back at the start of next season.</small>${o.offers.map((f,i)=>`<div class=row style="font-size:16px;gap:4px"><span>${tn(S.T[f.ti])}${f.ti==0?' <small>(re-sign)</small>':''}<br><small>$${f.sal}M/yr · ${f.yrs} yrs · ${f.gtd}% gtd · bonus $${f.bonus}M</small></span><button class=g style="width:auto;flex:none" onclick="offSign(${i})">Sign</button></div>`).join('')}</div>`}
  else if(o.sg)x+=`<p><small>✔ You signed your new deal this offseason.</small></p>`;
  x+=`<button class=g onclick=faV()>🖊 Free agents · recommend signings (${3-o.recs.length} left)</button>`}
 if(o.w==5){const ys=Object.keys(S.npb||{}).filter(y=>+y>=yrN());x+=ys.map(y=>`<button class=g onclick="dnWatch(${y})">📺 Watch round 1 of the ${y} draft</button><button class=g onclick="npbV(${y},1)">📋 ${y} draft: all 7 rounds</button>`).join('');if(npxVis())x+=`<button class=g onclick=npxV()>🌟 Draft class</button>`}
 const last=o.w>=OFFW.length-1;
 return `<div class=card style="margin:8px 0;background:#13243a"><b>🗓 Offseason · week ${o.w+1} of ${OFFW.length}</b><br><b>${W_[0]}</b><br><small>${W_[1]}</small>${o.log.length?'<br><small>'+o.log.slice(-3).join('<br>')+'</small>':''}${x}</div><button onclick=offNext()>${last?'🏈 Start season '+(S.py+1):'Next week ▶ '+OFFW[o.w+1][0]}</button>`}
function offSign(i){const o=S.ofs;if(!o||!o.offers)return hub();const f=o.offers[i];if(f.ti)moveTo(f.ti);S.ct={yrs:f.yrs,sal:f.sal,gtd:f.gtd,inc:f.inc,team:S.T[0].n,ci:f.ci,gi:f.gi};S.ctn=(S.ctn||1)+1;const b=Math.round(f.bonus*1e6);S.cash+=b;S.earn=(S.earn||0)+b;o.sg=1;o.offers=null;
 HM=(f.ti?'Signed with the ':'Re-signed with the ')+tn(S.T[0])+': $'+f.sal+'M per year for '+f.yrs+' years.';try{gpNews('sign',tn(S.T[0]))}catch(e){}save();hub()}

// ---------- free agents: who, what they want (money / playing time / winning), and where they'd go ----------
const faHs=(s,n)=>{let h=2166136261;s=String(s)+'|'+n;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return ((h>>>0)%10000)/10000};
function faMot(nm){const a=30+Math.round(faHs(nm,1)*69),b=30+Math.round(faHs(nm,2)*69),c=30+Math.round(faHs(nm,3)*69),k=Math.floor(faHs(nm,4)*3),m=[a,b,c];m[k]=Math.max(m[k],85+Math.round(faHs(nm,5)*14));return{money:m[0],pt:m[1],win:m[2],loy:25+Math.round(faHs(nm,6)*74)}}
const teamByL=li=>(S.T||[]).find(t=>pIdx(t)==li);
const capRoom=li=>Math.round(8+faHs('cap'+li,S.py||1)*60);
function rosFind(nm){for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L)){const s=L.findIndex(y=>y&&y.n==nm);if(s>=0)return{k,s,L,x:L[s]}}}return null}
const slotsFor=pos=>pos=='QB'?[23,24]:POSL.map((p,k)=>p==pos?k:-1).filter(k=>k>=0);
function faPool(){if(!S||S.stage!='pro')return[];try{(S.T||[]).forEach((t,i)=>rost('h.'+i))}catch(e){}S.fas=S.fas||{};const me=pIdx(S.T[0]),out=[];
 const add=(nm,li,slot,ovr,age,base)=>{if(nm==S.name||S.fas[nm]||li==me)return;const f=rosFind(nm);if(!f)return;const pos=slot>=23?'QB':POSL[slot];if(!pos)return;const c=lgCt(nm,capGrp(pos),f.x.ovr||ovr,age,base);if(c.left>1)return;const o_=f.x.ovr||ovr,a_=f.x.age||age;out.push({n:nm,pos,slot,li,ovr:o_,age:a_,sal:Math.max(1,ctEst(capGrp(pos),o_,a_+1,capN()+1))})};
 PKS.forEach(q=>{const b=PKC[q[2]];add(q[2],q[0],q[1],q[3],q[4],b?[b[1],b[2],b[3]]:null)});
 try{QBB.forEach(b=>{const r=PKC[b[0]];add(b[0],b[3],23,b[1],b[2],r?[r[1],r[2],r[3]]:null)})}catch(e){}
 const seen=new Set();return out.filter(p=>!seen.has(p.n)&&seen.add(p.n)).sort((a,b)=>b.ovr-a.ovr)}
function starterAt(L,pos){const S_=slotsFor(pos).map(k=>L[k]).filter(Boolean);if(!S_.length)return{o:0,k:slotsFor(pos)[0]};let w=S_[0],wk=slotsFor(pos)[0];slotsFor(pos).forEach(k=>{if(L[k]&&L[k].ovr<w.ovr){w=L[k];wk=k}});return{o:w.ovr||0,k:wk}}
function faFit(p,li,pitch){const t=teamByL(li);if(!t)return 0;const M=faMot(p.n),L=rost('h.'+tix(t)),st=starterAt(L,p.pos),pt=p.ovr>=st.o?1:cl(1-(st.o-p.ovr)/10,0,1),win=cl((t.ovr-60)/35,0,1),mon=cl(capRoom(li)/(p.sal*1.2+5),0,1);
 return (M.money*mon+M.pt*pt+M.win*win)/(M.money+M.pt+M.win)+(li==p.li?.02+M.loy/100*.22:0)+(pitch||0)+(faHs(p.n+li,S.py||1)-.5)*.06}
const myRank=()=>{const L=rost('h.0'),me=qo(S.q);return 1+L.filter((x,k)=>x&&k&&x.n!=S.name&&x.ovr>me).length};
const pitchB=()=>cl((qo(S.q)-75)/250,0,.08);
function faTop(p,pitch){let best=-1,bl=null;(S.T||[]).forEach(t=>{const li=pIdx(t);const s=faFit(p,li,li==pIdx(S.T[0])?pitch:0);if(s>best){best=s;bl=li}});return bl}
function faGM(p){const L=rost('h.0'),st=starterAt(L,p.pos),room=capRoom(pIdx(S.T[0]))-((S.ofs&&S.ofs.spent)||0);
 if(p.ovr<=st.o)return{ok:0,why:`We're set at ${p.pos} (${L[st.k]?L[st.k].n+', '+st.o:''}).`};if(p.sal>room)return{ok:0,why:`Can't afford him ($${room}M cap room).`};return{ok:1,why:`Wants him: upgrade over ${L[st.k]?L[st.k].n+' ('+st.o+')':'our depth'}.`,k:st.k}}
let FAF='all';
function faV(f){if(f)FAF=f;const P=faPool(),o=S.ofs,live=offFA(),top3=myRank()<=3,mine=pIdx(S.T[0]),Lst=P.filter(p=>FAF=='all'||p.pos==FAF||(FAF=='D'&&!['QB','RB','WR','TE'].includes(p.pos)&&!/^(LT|LG|C|RG|RT)$/.test(p.pos))||(FAF=='OL'&&/^(LT|LG|C|RG|RT)$/.test(p.pos)));
 const tabs=[['all','All'],['QB','QB'],['RB','RB'],['WR','WR'],['TE','TE'],['OL','OL'],['D','Defense']].map(([k,l])=>`<button class="${FAF==k?'':'g'}" style="width:auto;flex:1;padding:6px 2px;font-size:13px" onclick="faV('${k}')">${l}</button>`).join('');
 const rows=Lst.map(p=>{const M=faMot(p.n),gm=faGM(p),tp=faTop(p,pitchB()),t=teamByL(p.li),it=tp==mine?'<b style="color:#7bed9f">High</b>':faFit(p,mine,pitchB())>faFit(p,tp,0)-.06?'<b style="color:#ffd84a">Medium</b>':'<b style="color:#ff7675">Low</b>';
  const done=(o&&o.recs||[]).find(r=>r.n==p.n);const can=live&&top3&&o.recs.length<3&&!done;
  return `<div class=row style="font-size:15px;gap:6px;align-items:flex-start"><span style="min-width:0;flex:1"><b>${esc(p.n)}</b> <small>${p.pos} · ${p.ovr} OVR · age ${p.age} · ${t?esc(tn(t)):''}</small><br><small>Wants about $${p.sal}M/yr · 💰 Money ${M.money} · ⏱ Playing time ${M.pt} · 🏆 Winning ${M.win} · 🏠 Loyalty ${M.loy}</small><br><small>Interest in your team: ${it} · GM: ${gm.ok?'<span style="color:#7bed9f">'+gm.why+'</span>':'<span style="color:#ff7675">'+gm.why+'</span>'}</small>${done?'<br><small><b>'+done.r+'</b></small>':''}</span>${can?`<button class=g style="width:auto;flex:none" onclick="faRec('${String(p.n).replace(/'/g,"\\'")}')">Recommend</button>`:''}</div>`}).join('')||'<small>No one in this group.</small>';
 const head=live?`<b>🖊 Free agency signing week</b><br><small>${top3?`You're one of your team's 3 best players (#${myRank()}), so the GM listens to you. Recommendations left: <b>${3-o.recs.length}</b>. The GM has to want the player, and your team has to be the player's top choice.`:`Only your team's 3 best players can recommend signings. You're #${myRank()} on the roster right now.`}</small>`:`<b>📋 Upcoming free agents</b><br><small>These players' contracts are up after this season. Free agency happens during the offseason (Free agency signing week). Every player has his own motivations: 💰 money, ⏱ playing time, 🏆 winning and 🏠 loyalty (loyal players like staying with their team, fans and city).</small>`;
 ui.style.display='block';ui.innerHTML=`<div><h2>${live?'🖊 Free agents':'📋 Upcoming free agents'}</h2><div class=card>${head}</div><div class=row style="gap:3px">${tabs}</div><div class=card>${rows}</div><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
function faRec(nm){const o=S.ofs;if(!offFA()||myRank()>3||o.recs.length>=3)return faV();const p=faPool().find(x=>x.n==nm);if(!p)return faV();const gm=faGM(p);
 if(!gm.ok){HM='';return talk('gm','GM',`I hear you, but no on ${p.n}. ${gm.why}`,'smug',[['OK','ovHide();faV()']])}
 const tp=faTop(p,pitchB());let r;
 if(tp==pIdx(S.T[0])){faMove(p,gm.k);o.spent=(o.spent||0)+p.sal;r=`✔ Signed with your team ($${p.sal}M/yr).`;o.log.push(`🖊 ${p.n} (${p.pos}) signed with the ${tn(S.T[0])} on your recommendation.`);try{gpNews('sign',p.n)}catch(e){}}
 else{const t=teamByL(tp);r=`✖ Chose the ${t?tn(t):'other team'} instead.`;o.log.push(`${p.n} picked the ${t?tn(t):'other team'} over you.`);S.fas[p.n]=1}
 o.recs.push({n:p.n,r});save();talk('gm','GM',r.startsWith('✔')?`Done. ${p.n} is ours. Good call.`:`We made our pitch, but ${p.n} ${r.slice(2).toLowerCase()}`,'smug',[['OK','ovHide();faV()']])}
// move the signed player onto your roster; the player he replaces signs with the old team
function faMove(p,k){const f=rosFind(p.n),L0=rost('h.0');if(!f)return;const out=L0[k];L0[k]=f.x;f.L[f.s]=out;S.fas[p.n]=1;S.mv=S.mv||{};S.mv[p.n]=[pIdx(S.T[0]),k];if(out)S.mv[out.n]=[p.li,f.s];mvApply()}
function mvApply(){if(!S||!S.mv)return;for(const nm in S.mv){const [li,k]=S.mv[nm];PKS.forEach(q=>{if(q[2]==nm){q[0]=li;if(k<23)q[1]=k}});try{QBB.forEach(b=>{if(b[0]==nm)b[3]=li})}catch(e){}}}
(()=>{const _p=pkRen;pkRen=function(){try{mvApply()}catch(e){}return _p.apply(this,arguments)}})();
(()=>{const _n=pNext;pNext=function(){if(S)S.ofs=null;const r=_n.apply(this,arguments);try{if(S)S.fas={}}catch(e){}return r}})();

// ---------- 🌟 draft class: no overalls (unless he's your college teammate), only scout projections; no draft before it happens ----------
const npxProj=p=>{const t=p.T+(p.gen?20:0);return t>=86?'Proj: top 10 pick':t>=80?'Proj: 1st round':t>=76?'Proj: 2nd round':t>=72?'Proj: 3rd round':t>=68?'Proj: rounds 4-7':'Proj: undrafted'};
(()=>{const _v=npxV;npxV=function(){const r=_v.apply(this,arguments);try{if(!ui.innerHTML.includes('🌟'))return r;const mySch=S.stage=='col'&&S.T&&S.T[0]?S.T[0].n:'';
 const rows=ui.querySelectorAll('.card .row');const list=[...S.npx].sort((a,b)=>(a.pro?a.pro.pk:999)-(b.pro?b.pro.pk:999)||b.T-a.T);
 rows.forEach((row,i)=>{const p=list[i];if(!p)return;const lab=row.querySelector(':scope>b');if(!lab)return;if(p.pro){return}if(mySch&&p.sch&&mySch.indexOf(p.sch)==0)return;lab.textContent=npxProj(p);lab.style.fontSize='13px';lab.style.color='#ffd84a'});
 const c=ui.querySelector('.card small');if(c&&S.tkPend)c.textContent='These players are in college right now, playing their final season. The pro draft is in the offseason (Draft week). Overall ratings stay hidden until a player is drafted; you only see where scouts project him.';
 else if(c&&!S.npxd)c.textContent+=' Overall ratings are hidden (you see them for your own college teammates); scouts\' projections are shown instead.'}catch(e){console.warn(e)}return r}})();
// real-life loyalty and motivations for known players (others are randomized)
const MOTR={'Ricky MaClones':{loy:98},'Jarsh Fallon':{loy:99},'Eric Darnold':{loy:99,win:99},'Tractor Swift':{loy:97},'Mac-Daddy Kelly':{loy:88},'Matty Gafford':{loy:93},'Eric Rodney':{loy:82,win:92},'Meters Ferret':{loy:72,money:90},'DaSettlement Won':{loy:62,money:92},'Kirko Chainz':{loy:68,money:88},'Daryl Henny':{loy:91},'Lamarcus Action':{loy:83,money:96},'Teej Waddle':{loy:85}};
(()=>{const _m=faMot;faMot=function(nm){const r=_m.apply(this,arguments);try{const o=MOTR[nm];if(o)Object.assign(r,o);const x=pkLive(nm);if(x&&(x.age||0)>=33&&!(o&&o.win)){r.win=Math.max(r.win,88)}}catch(e){}return r}})();
