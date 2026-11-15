// ===== 🆓 FREE AGENTS TO START WITH · PLAY AS AN EXISTING FREE-AGENT QB =====
// Tyler, 2026-11-15 (FREE AGENT LIST + "EXISTING FREE-AGENT QUARTERBACK CAREER MODE"): "These are just free agents to start out
// with that can be picked up at any time. Teams don't have to pick them up ... if someone wants to play as a existing free agent
// quarterback, let them." Spec: a FREE AGENT QUARTERBACKS section at the bottom of the existing-QB screen; 2-4 realistic offers
// (role, years, salary, why); sign with one; GSPN treats it as a veteran's second chance; his previous NFL career stays part
// of his history; "Do not invent championships, awards, statistics, or previous teams"; normal pro career afterwards.
// Previous teams below are only the ones I am sure of. No previous-season stats are made up: his game career totals start
// from his first snap in this save, and his card says which teams he played for before. Jake Portals' rating was "TBD": 60.
// [name, pos, ovr, age (2026), previous teams, QB style, his story]
window.FA26=[
 ['James Garo','QB',66,35,'NE, SF, LV, LAR','Field General (balanced)','A former starter with a long winning record as a starter, most recently a veteran backup. He wants one more real shot.'],
 ['Johnny Football','QB',57,34,'CLE','Scrambling strong arm','Once one of the most famous college quarterbacks ever, his NFL run was short. Years away from the league, he wants to prove he still belongs.'],
 ['Kellen Kapper','QB',61,39,'SF','Mobile','A former starter who once took his team all the way to the championship game. Out of the league for years, he says he never stopped training.'],
 ['Rob Griffith III','QB',70,36,'WAS, CLE, BAL','Mobile','A former Offensive Rookie of the Year whose injuries changed his career. He is healthy and wants another chance.'],
 ['Rylan Tannen','QB',69,38,'MIA, TEN','Field General (balanced)','A long-time starter for two teams, now a veteran who wants to help a quarterback room win.'],
 ['Jake Portals','QB',60,34,'JAX, LAR','Scrambling strong arm','A former top-3 pick and former starter trying to revive his career.'],
 ['Cameron Nugent','QB',68,37,'CAR, NE','Scrambling strong arm','A former league MVP who carried his team to the title game. Out of the league since 2021, he wants back in.'],
 ['Nick Parkerman','QB',42,32,'BUF, LV, CHI','Field General (balanced)','A journeyman who has never stuck anywhere. Teams see a camp arm; he wants to prove them wrong.'],
 ['Devin Turner-Robertson','QB',67,26,'CLE','Mobile','A young quarterback with starting experience, looking for a place to compete.'],
 ['Mike Coral','QB',64,27,'CAR','Mobile','A former college star whose rookie year ended before it started with an injury. He is still young and wants his shot.'],
 ['Taylen Hills','QB',76,36,'NO','Mobile','A do-everything veteran (quarterback, runner, receiver, special teams) and a coach\'s favorite, looking for one more team.'],
 ['Tyron Hills','WR',89,32,'KC, MIA','',''],['Jalen Ross','WR',72,31,'CIN, NYG','',''],['KJ Ham','WR',69,27,'DEN','',''],['Lav Shen','WR',71,28,'JAX, CAR','',''],['Desmond Mills','WR',69,29,'NYJ','',''],
 ['Raymond Monster','RB',78,34,'SF, MIA','',''],['Kerry Hunter','RB',77,31,'KC, CLE','',''],
 ['Mason Latimer','CB',86,30,'NO, WAS','',''],['Brett Waggoner','LB',85,36,'SEA, LAR, WAS','',''],['Taco Charles','DE',70,32,'DAL, KC','','']];
window.fa26Make=function(e){const [n,pos,ovr,age,prev,sty,story]=e;return {n,pos,num:(NR[pos]||[1,99])[0],ovr,pot:ovr,age,cls:0,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},prev:prev.split(',')[0].trim(),prevAll:prev,fa:2026,fa26:1,sty:sty||null,story:story||null}};
// every save gets them once (new saves at the start, others the first time they load), never twice, never over a name in use
window.fa26Add=function(s){try{s=s||S;if(!s||s.fa26)return 0;const y=(s.y0||2022)+((s.hist||[]).length);if(y>2028){s.fa26=1;return 0}
 s.ro=s.ro||{};if(!Array.isArray(s.ro.fa))s.ro.fa=[];const used=new Set();for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach(x=>x&&used.add(x.n))}if(s.vetP)used.add(s.vetP.n);
 let n=0;FA26.forEach(e=>{if(used.has(e[0]))return;s.ro.fa.push(fa26Make(e));n++});s.fa26=1;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{fa26Add(s)}catch(e){}return s}}catch(e){}})();
(()=>{try{const _s=start;start=function(){const r=_s.apply(this,arguments);try{if(S&&!S.fa26){fa26Add(S);save()}}catch(e){}return r}}catch(e){}})();
// the free-agent pool survives the move to the pros (proStart rebuilds the rosters from the pro teams only)
(()=>{try{const _p=proStart;proStart=function(){const fa=(S&&S.ro&&Array.isArray(S.ro.fa))?S.ro.fa:null;const r=_p.apply(this,arguments);try{if(fa&&S.ro){if(!Array.isArray(S.ro.fa))S.ro.fa=[];const have=new Set(S.ro.fa.map(x=>x&&x.n));fa.forEach(x=>{if(x&&!have.has(x.n))S.ro.fa.push(x)})}}catch(e){}return r}}catch(e){}})();
// ---- the existing-QB screen: FREE AGENT QUARTERBACKS at the bottom ----
window.faqList=function(){try{return (S.ro&&Array.isArray(S.ro.fa)?S.ro.fa:[]).filter(x=>x&&x.pos==='QB').slice().sort((a,b)=>(b.ovr||0)-(a.ovr||0))}catch(e){return []}};
(()=>{try{const _t=tkPick;tkPick=function(){const r=_t.apply(this,arguments);try{const L=faqList();if(!L.length)return r;const d=ui.firstElementChild;const back=d&&[...d.querySelectorAll(':scope > button')].pop();
 const c=document.createElement('div');c.className='card';c.setAttribute('data-faq','1');
 c.innerHTML=`<b>🆓 FREE AGENT QUARTERBACKS</b><br><small>Veterans without a team. You keep his age, rating and history, and get offers from teams that need a quarterback.</small>`+L.map(x=>`<div class=row style="font-size:16px;gap:6px"><span><b>${esc(x.n)}</b> <small>QB · age ${x.age} · ${x.ovr} OVR${x.prevAll||x.prev?' · formerly '+esc(x.prevAll||x.prev):''}</small></span><button class=g style="width:auto;flex:none" onclick="faqGo('${encodeURIComponent(x.n)}')">Play</button></div>`).join('');
 if(back)d.insertBefore(c,back);else(d||ui).appendChild(c)}catch(e){}return r}}catch(e){}})();
// ---- the offers ----
window.faqTeams=function(ovr,age){const out=[];(S.pro||[]).forEach((t,i)=>{try{/* read only: a roster is never built here (building it early let later steps replace people it had just made) */const L=(S.ro&&S.ro['p.'+i])||[];const q=QBP[pIdx(t)];let st=L[0]&&L[0].pos==='QB'?L[0]:L.find(x=>x&&x.pos==='QB');if(!st&&q)st={n:q[0],ovr:q[1],age:q[2]};const qbs=L.filter(x=>x&&x.pos==='QB'&&x!==st);const bk=qbs.slice().sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];
 const so=st?st.ovr||70:60,bo=bk?bk.ovr||55:(55+Math.abs(hsh(String(S.seed)+'bk'+t.n))%14),old=st&&(st.age||0)>=36?6:0;let role=null,fit=0,why='';
 if(ovr>=so-3){role='Competing for the starting job';fit=12+(ovr-so)+old;why=`Their starter${st?' '+st.n:''} is rated ${so}${old?' and getting old':''}. They want real competition at quarterback.`}
 else if(ovr>=bo+2){role='Backup quarterback';fit=6+(ovr-bo)+old-(so>=88?2:0);why=`Their backup is rated ${bo}. They want a veteran behind ${st?st.n:'their starter'}.`}
 else if(ovr>=bo-3&&age<38){role='Depth (QB3), compete in camp';fit=2+(ovr-bo)/2;why='They want an experienced arm in the quarterback room.'}
 if(!role||(so>=88&&bo>=ovr))return;const comp=role[0]==='C',yrs=age<30?2:1,sal=+(comp?Math.max(1.5,(ovr-55)*.45+Math.max(0,fit-12)*.15):role[0]==='B'?Math.max(1.2,(ovr-55)*.2+Math.max(0,fit-6)*.12):1.2).toFixed(1);
 out.push({i,team:tn(t),code:tAb(t),role,yrs,sal,why,fit:fit+((Math.abs(hsh(String(S.seed)+t.n))%100)/100)})}catch(e){}});
 out.sort((a,b)=>b.fit-a.fit);let L=out.slice(0,4);if(L.length>2)L=L.filter((x,k)=>k<2||x.fit>=out[0].fit-12);return L};
window.FAQ=null;
window.faqGo=function(nEnc){const n=decodeURIComponent(nEnc);const x=faqList().find(p=>p.n===n);if(!x)return;const O=faqTeams(x.ovr,x.age);FAQ={n,O};
 ui.style.display='block';ui.innerHTML=`<div><h2>🆓 ${esc(n)}</h2><div class=card><small>QB · age ${x.age} · ${x.ovr} OVR · formerly ${esc(x.prevAll||x.prev||'')}</small><br>${esc(x.story||'A veteran quarterback looking for another chance.')}</div>
 <div class=card><b>Teams calling</b><br><small>${O.length} team${O.length==1?'':'s'} want to talk. Pick one.</small></div>
 ${O.map((o,k)=>`<div class=card><b>${esc(o.team)}</b> <small>(${esc(o.code||'')})</small><br><small><b>${o.role}</b> · ${o.yrs} year${o.yrs>1?'s':''} · $${o.sal}M a year</small><br><small>${esc(o.why)}</small><button onclick="faqSign(${k})">Sign with ${esc(o.team)}</button></div>`).join('')||'<div class=card>No team needs him right now.</div>'}
 <button class=g onclick=tkPick()>Back</button></div>`;ui.scrollTop=0};
// ---- signing: he joins the team, the starter stays the starter (unless he beats him), nobody is removed ----
window.faqSign=function(k){const F=FAQ;if(!F)return;const o=F.O[k];if(!o)return;const fa=S.ro.fa,ix=fa.findIndex(p=>p.n===F.n);if(ix<0)return;const x=fa[ix];
 TKGO=1;try{S.name=x.n;S.age=x.age;S.dr={done:0,pk:224,P:[],picks:[]};S.npxd=1;proStart(o.i,-1)}catch(e){console.warn(e)}finally{TKGO=0}
 S.ro.fa=S.ro.fa||fa;const k2=S.ro.fa.findIndex(p=>p.n===x.n);if(k2>=0)S.ro.fa.splice(k2,1);   /* he is the player now (one person, not two) */
 try{const A=AR.find(a=>a.n===x.sty);if(A)S.arch=A.n;const b0={...S.q};let lo=31,hi=160,best=null;for(let i=0;i<30;i++){const m=(lo+hi)/2;S.q={...b0};rescaleTo(m);const ov=qo(S.q);if(!best||Math.abs(ov-x.ovr)<Math.abs(qo(best)-x.ovr))best={...S.q};if(ov<x.ovr)lo=m;else if(ov>x.ovr)hi=m;else break}S.q=best}catch(e){}
 const L=rost('h.0');/* the team's starter: proStart already kept him (S.vetP, his own id); he stays the starter until beaten */if(!S.vetP||S.vetP.n===x.n){const st=(S.pro[o.i]&&rost('h.0').find(y=>y&&y.pos==='QB'&&y.n!==x.n))||null;if(st)S.vetP={...st}}S.vet=S.vetP?S.vetP.n:'Starter';S.sq=S.vetP?S.vetP.ovr:60;
 L[0]={n:x.n,pos:'QB',num:x.num||ri(1,19),ovr:qo(S.q),age:x.age,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},pid:x.pid||null,fa26:1};S.num=L[0].num;S.jy=S.jy||{};S.jy.nm=String(x.n).split(' ').pop().toUpperCase().slice(0,12);
 S.py=Math.max(2,x.age-21);S.tkY=S.py;S.tk=x.n;S.ct={yrs:o.yrs,sal:o.sal,gtd:0,inc:0,team:tn(S.T[0])};S.cash=Math.round(Math.max(1,(x.ovr-55))*.35*1e6/1000)*1000;S.pop=cl(40+Math.round((x.ovr-60)*.8)+(/Football|Nugent|Griffith/.test(x.n)?12:0),30,90);S.aw=[];S.cst=null;
 S.prevNFL={teams:x.prevAll||x.prev||'',story:x.story||'',role:o.role,y:yrN()};
 const hl=[`A Second Chance: ${x.n} returns with the ${o.team}`,`${o.team} take a chance on veteran QB ${x.n}`,`Can ${x.n} revive his career in ${o.team.split(' ')[0]}?`][Math.abs(hsh(x.n))%3];
 const body=`${x.n} (${x.age}, formerly ${x.prevAll||x.prev}) signs a ${o.yrs}-year deal worth $${o.sal}M a year. Role: ${o.role.toLowerCase()}. ${x.story||''}`;
 try{twAdd({a:'GSPN',h:'GSPN',v:1,t:hl+' · '+body})}catch(e){}S.fmsg=(S.fmsg?S.fmsg+' ':'')+'📺 GSPN: '+hl;
 HM=`🆓 You are ${x.n}, signed by the ${o.team}: ${o.role.toLowerCase()}. ${S.sq>qo(S.q)+2?S.vet+' ('+S.sq+') is the starter: outplay him in practice to win the job.':'You can win the starting job right away.'}`;save();hub()};
// his card: the previous NFL career, kept apart from this one
(()=>{try{const _c=career;career=function(){const r=_c.apply(this,arguments);try{if(S&&S.prevNFL&&!ui.querySelector('[data-prev]')){const d=ui.firstElementChild||ui;const c=document.createElement('div');c.className='card';c.setAttribute('data-prev','1');
 c.innerHTML=`<b>📜 Before this save: previous NFL career</b><br><small>Teams: ${esc(S.prevNFL.teams)}. ${esc(S.prevNFL.story||'')}<br>His game stats here start from his first snap with the ${esc(S.ct&&S.ct.team||'')} (no earlier seasons are made up).</small>`;
 const h=d.querySelector('h2');if(h)h.after(c);else d.prepend(c)}}catch(e){}return r}}catch(e){}})();
