// ===== 👨‍👧 RAISING YOUR KIDS · THE ATHLETE PATH =====
// Tyler, 2026-11-14: "should be able to raise the kids. and should be able to influence them to become an athlete,
// but not every kid is gonna have the athlete gene, and they can still try to be an athlete and just not be as
// good ... if a kid doesn't wanna play sports, they don't have to. I would think most athletes kids at least try
// to play high school sports ... 33% becoming good enough for the pros ... doesn't mean they can't make the pros
// if they're outside of the 33%. That just means they're good enough to be a long-term player."
// Each kid: a hidden talent at birth (with a pro athlete parent: 33% long-term-pro talent, the rest anywhere from
// "can play" to "not his thing"), his OWN interest in sports (you can raise it, never force it), and time you
// spend with him. At 14 he decides whether to play; in high school his rating grows each year with his talent
// and work; at 21 he can enter the real pro draft, with his high school and college on his record (EPLM).
// Ages follow the pro calendar clock (52 simulated weeks a year); kids born before this keep aging once a season.
window.kidEns=function(k){if(!k)return k;if(k.tal==null){const r=rng(hsh(String(k.n)+'|tal|'+(k.born||0)));const pro=S.stage==='pro'||S.py;
  k.tal=pro&&r()<.33?82+Math.floor(r()*14):40+Math.floor(r()*42);k.int=pro?55+Math.floor(r()*30):35+Math.floor(r()*40);k.bond=50;k.sport=null;k.hs=[];k.pos=null}return k};
// Tyler: sons can be nudged toward any sport (football, basketball, baseball, soccer, track); daughters toward
// women's sports (basketball, softball, soccer, volleyball, track); or "play everything". Football is QB for now
// ("I'll eventually add a mode where you can play as your kid ... right now we only have play as quarterback").
window.KSP={b:['Football','Basketball','Baseball','Soccer','Track'],g:['Basketball','Softball','Soccer','Volleyball','Track']};
window.KPRO={Football:'the pros (PFL)',Basketball:'pro basketball',Baseball:'pro baseball',Soccer:'pro soccer',Track:'Olympic track',Softball:'pro softball',Volleyball:'pro volleyball'};
window.KJOBS=['Teacher','Nurse','Engineer','Doctor','Business owner','Firefighter','Chef','Lawyer','High school coach','Sports agent','Physical therapist','Pilot','Police officer','Real estate agent','Music producer'];
window.kidNudge=function(i,sp){const k=kidEns((S.kids||[])[i]);if(!k)return famV();k.nudge=sp||null;HM=sp?('You\'re pushing '+k.n.split(' ')[0]+' toward '+(sp==='all'?'playing every sport they can':sp)+'. It\'s still their choice.'):'No more pushing: '+k.n.split(' ')[0]+' picks for themself.';save();famV()};
window.kidAge=function(k){try{if(k.bt!=null&&S.stage==='pro')return Math.max(0,Math.floor((calT()-k.bt)/52));return k.age||0}catch(e){return k.age||0}};
window.kidTalTxt=function(k){if(kidAge(k)<14)return 'too young to tell';if(!k.sport)return 'not playing';const t=k.tal;return t>=82?'coaches say: pro talent':t>=68?'coaches say: college-level player':t>=55?'coaches say: solid high-school player':'coaches say: plays for the love of it'};
window.kidDo=function(i,what){const k=kidEns((S.kids||[])[i]);if(!k)return famV();S.kwk=S.kwk||{};const key=i+what;if(S.kwk[key]===wkKey()){HM='You already did that this week.';return famV()}S.kwk[key]=wkKey();
 const a=kidAge(k);let msg='';
 if(what==='catch'){k.int=cl(k.int+(a<14?4:2),0,100);k.bond=cl(k.bond+3,0,100);if(k.sport)k.wk=(k.wk||0)+1;msg='🏈 You played catch with '+k.n.split(' ')[0]+'.'}
 else if(what==='time'){k.bond=cl(k.bond+5,0,100);msg='❤️ Quality time with '+k.n.split(' ')[0]+'.'}
 else if(what==='game'){k.int=cl(k.int+6,0,100);k.bond=cl(k.bond+2,0,100);msg='🏟 '+k.n.split(' ')[0]+' came to watch you play and wore your jersey.'}
 try{hapAdd(1)}catch(e){}save();HM=msg;famV()};
// each new year of his life: at 14 he decides; in high school he plays and grows; at 21 he can enter the draft
window.kidYearOf=function(k,yr){kidEns(k);const a=kidAge(k);k.ly=k.ly||{};if(k.ly[a])return;k.ly[a]=1;
 if(a>=14&&k.sport==null){const r=R(),L=KSP[k.g==='b'?'b':'g'],nud=k.nudge&&k.nudge!=='all'&&L.includes(k.nudge)?k.nudge:null;
  const plays=(k.int>=40&&r<.92)||(k.int>=25&&r<.5)||(k.nudge&&k.int>=20&&r<.6);
  k.sport=plays?(nud&&R()<.75?nud:L[Math.floor(R()*L.length)]):'';if(plays&&k.nudge==='all')k.multi=L.filter(x=>x!==k.sport).slice(0,2);
  if(k.sport==='Football')k.pos='QB';
  k.sch=k.sch||(HSN[Math.floor(R()*HSN.length)]+' High School');S.fmsg=(S.fmsg?S.fmsg+' ':'')+(k.sport?'🏫 '+k.n.split(' ')[0]+' is trying out for '+k.sport+' at '+k.sch+'!':'🎨 '+k.n.split(' ')[0]+' decided sports aren\'t for them. That\'s okay.')}
 if(k.sport&&a>=14&&a<=17){const base=Math.round(k.tal*.62+(a-14)*5+(k.wk||0)*.4+(k.int-50)*.05);k.ovr=cl(base+Math.round((R()-.5)*6),35,90);k.hs.push([yr,a,k.ovr]);k.wk=0}
 if(k.sport==='Football'&&a>=18&&a<=21){k.col=k.col||(k.tal>=68?((S.col||[]).flatMap(c=>c.t.map(t=>t.n)).sort(()=>R()-.5)[0]):'')||'State University';k.ovr=cl((k.ovr||55)+2+Math.round((k.tal-60)/12),40,92)}
 if(k.sport==='Football'&&a>=21&&!k.dr&&!k.drq){k.drq=yr+1}};
// after school: a pro career in his/her sport (tracked year by year), or a regular job. Football QBs go through the real PFL draft.
window.kidLife=function(k,yr){const a=kidAge(k);if(a<22||k.life)return;
 if(k.sport&&k.sport!=='Football'){const p=k.tal>=88?.85:k.tal>=80?.55:k.tal>=72?.2:.04;if(R()<p){k.life={t:'pro',what:KPRO[k.sport]||k.sport,y0:yr,seasons:[]};
   if(k.g!=='b'&&k.sport==='Soccer'&&k.tal>=88)k.life.nt=1;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🏆 '+k.n.split(' ')[0]+' made it to '+k.life.what+'!'+(k.life.nt?' Called up to the national team!':'');return}}
 // a football son: drafted and in the PFL = his pro career is the league's own record; not taken = he moves on to a job
 if(k.sport==='Football'){if(!k.dr||yr<=k.dr)return;if(kidInLeague(k)){k.life={t:'pfl',what:'the PFL',y0:k.dr};return}}
 k.life={t:'job',what:KJOBS[Math.floor(R()*KJOBS.length)],y0:yr};S.fmsg=(S.fmsg?S.fmsg+' ':'')+'💼 '+k.n.split(' ')[0]+' started a career as a '+k.life.what.toLowerCase()+'.'};
window.kidInLeague=function(k){try{for(const key in S.ro){const L=S.ro[key];if(Array.isArray(L)&&L.some(x=>x&&x.n===k.n&&x.pid))return true}}catch(e){}return false};
window.kidProYear=function(k,yr){if(!k.life||k.life.t!=='pro'||k.life.seasons.some(q=>q[0]===yr))return;const q=k.tal,a=kidAge(k);if(a>36){k.life.done=k.life.done||yr;return}
 const f=cl(1-Math.abs(a-28)/14,.35,1),sp=k.sport,v=x=>Math.round(x*(.8+R()*.4)*f);
 const line=sp==='Basketball'?v(6+q*.18)+' ppg':sp==='Baseball'?'.'+String(v(220+q*.7)).padStart(3,'0')+' avg':sp==='Soccer'?v(q/12)+' goals':sp==='Softball'?'.'+String(v(240+q*.8)).padStart(3,'0')+' avg':sp==='Volleyball'?v(q*2)+' kills':sp==='Track'?(R()<q/180?'🥇 medal':'finalist'):'';
 k.life.seasons.push([yr,line])};
window.kidsTick=function(){try{const yr=yrN();(S.kids||[]).forEach(k=>{const a=kidAge(k);k.age=a;kidYearOf(k,yr);kidLife(k,yr);if(k.life&&k.life.t==='pro')kidProYear(k,yr)})}catch(e){}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.kids&&S.kids.length)kidsTick()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// your kid in the pro draft: a real prospect, with his own record (EPLM)
(()=>{try{const _lc=lgClass;lgClass=function(Y){const out=_lc.apply(this,arguments);try{(S.kids||[]).forEach(k=>{if(!k.drq||k.drq>Y||k.dr)return;
  const pro=k.tal>=82,ovr=pro?66+Math.floor(R()*12):52+Math.floor(R()*10),pot=pro?Math.min(99,ovr+14+Math.floor(R()*10)):ovr+4+Math.floor(R()*8);
  const p={n:k.n,pos:k.pos||'WR',ovr,pot,age:kidAge(k),col:k.col||'State University',gr:+(ovr+(pot-ovr)*.45+2).toFixed(1)};
  const id=pcGenCareer(p,Y,'kid');if(id){p.pid=id;LGPID[p.n]=id;const e=S.pc.p[id];e.kid=1;e.r.forEach(q=>{if(q[1]==='hs')q[2]=k.sch||q[2]})}
  out.push(p);out.sort((a,b)=>b.gr-a.gr);k.dr=Y;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎤 '+k.n.split(' ')[0]+' declared for the '+Y+' draft!'})}catch(e){}return out}}catch(e){}})();
// the Family card: every kid, his age, his interest, what he's doing, and things you can do together
(()=>{try{kidsHtml=function(){const K=S.kids||[];const pend=S.pg&&S.pg.cur&&S.pg.cur.disc;const old=S.preg;if(!K.length&&!pend&&!old)return '';
 return `<div class=card><b>👶 Your kids</b>${pend||old?'<p><small>A baby '+((pend?S.pg.cur.g:old.g)=='b'?'boy':'girl')+' is on the way'+(pend?' · about '+Math.max(1,Math.round(39-(calT()-S.pg.cur.t0)))+' weeks to go':'')+'.</small></p>':''}${K.map((k0,i)=>{const k=kidEns(k0),a=kidAge(k);
  return `<div style="margin:6px 0"><div class=row style="font-size:16px"><span><b>${esc(k.n)}</b> <small>${k.g=='b'?'Son':'Daughter'} · age ${a}</small></span><button class=g style="width:auto" onclick="kidName(${i})">Rename</button></div>
  <small>Loves sports: ${k.int}/100 · Bond with you: ${k.bond}/100${a>=14?' · '+(k.sport?k.sport+(k.pos?' ('+k.pos+')':'')+' at '+esc(k.sch||'')+(k.ovr?' · OVR '+k.ovr:''):'not playing sports'):''}${a>=14?'<br>'+kidTalTxt(k):''}${k.dr?'<br>🎤 Entered the '+k.dr+' draft'+(kidInLeague(k)?' · now in the PFL (you might face him)':''):''}${k.life?'<br>'+(k.life.t==='pfl'?'🏈 Playing in the PFL (his card has every season)':k.life.t==='pro'?'🏆 '+k.life.what+(k.life.nt?' · national team':'')+(k.life.seasons.length?' · '+k.life.seasons.slice(-3).map(q=>q[0]+': '+q[1]).join(', '):''):'💼 '+k.life.what):''}${k.multi?'<br>Also plays: '+k.multi.join(', '):''}</small>
  ${a<18?`<div><small>Nudge toward: </small><select style="font-size:15px" onchange="kidNudge(${i},this.value)"><option value="">their choice</option>${KSP[k.g==='b'?'b':'g'].map(x=>`<option ${k.nudge===x?'selected':''}>${x}</option>`).join('')}<option value="all" ${k.nudge==='all'?'selected':''}>Play everything</option></select></div>`:''}
  <div style="display:flex;gap:4px;flex-wrap:wrap">${a>=3?`<button class=g style="width:auto" onclick="kidDo(${i},'catch')">🏈 Play catch</button>`:''}<button class=g style="width:auto" onclick="kidDo(${i},'time')">❤️ Spend time</button>${a>=4&&S.stage==='pro'?`<button class=g style="width:auto" onclick="kidDo(${i},'game')">🏟 Bring to your game</button>`:''}</div></div>`}).join('')}</div>`}}catch(e){}})();
