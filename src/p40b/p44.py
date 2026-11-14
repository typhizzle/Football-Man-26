# ===================== V44 batch 1: enrolling, injuries, watch while hurt, resume games, clock, controls =====================
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m24.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# 1) enroll: commitment first, every offer, confirm
r("const L=offSort([...S.off]);ui.innerHTML=`<div><div class=sp></div><h2>High school career complete</h2>","const L=colPick();ui.innerHTML=`<div><div class=sp></div><h2>High school career complete</h2>")
r("${L.length?L.slice(0,30).map(o=>`<div class=row><span>${o.n} <small>${cfShort(o.conf)} ${cfBadge(S.col[o.ci]||cfOf(o.n),1)} · team rating ${o.ovr}${S.commit==o.n?' · your commit':''}</small></span><button class=g onclick=\"enroll('${q_(o.n)}')\">Enroll</button></div>`).join('')",
  "${L.length?L.map(o=>`<div class=row><span>${S.commit==o.n?'✔ ':''}${o.n} <small>${cfShort(o.conf)} ${cfBadge(S.col[o.ci]||cfOf(o.n),1)} · team rating ${o.ovr}${S.commit==o.n?' · <b>your commitment</b>':''}</small></span><button class=\"${S.commit==o.n?'':'g'}\" onclick=\"enrollAsk('${q_(o.n)}')\">Enroll</button></div>`).join('')")
r(":'Finish career'):",":'Finish high school'):")
# 2) injuries: rare, contact only, can be switched off
r("const INJR={se:.018,mj:.12,mn:.2},","const INJR={se:.004,mj:.03,mn:.045},")
r("function injRoll(x,f){const r=R(),","function injRoll(x,f){if(S&&S.noInj)return null;const r=R(),")
r("function injLive(o,P){if(!g||g.injW||g.sw||!P||g.kk)return;const q=P.qb,c=P.car,ctx=o&&o.sk?2.6:(c===q&&!P.passed)?1.8:.7;\n if(!injOut()){const j=injRoll(S,ctx/32);if(j)injSet(j,1)}",
  "function injLive(o,P){if(!g||g.injW||g.sw||!P||g.kk||(S&&S.noInj))return;const q=P.qb,c=P.car,hit_=(o&&o.sk)||(c===q&&!!P.tkr&&!(o&&o.oob));\n if(!injOut()&&hit_){const j=injRoll(S,(o&&o.sk?2:1.4)/32);if(j)injSet(j,1)}if(!P.tkr&&!(o&&o.sk)){S.injCov=g.oi;return}")
r("if(x&&!x.inj){const j=injRoll(x,21/40);","if(x&&!x.inj){const j=injRoll(x,1/40);")
r("<div class=card><b>Graphics</b>","<div class=card><b>Injuries</b><br><small>Injuries are rare and only happen on contact. Turning them off also heals everyone who is hurt right now.</small><div class=row style=\"gap:8px\"><button class=\"${S.noInj?'g':''}\" onclick=\"if(S.noInj)injToggle()\">On</button><button class=\"${S.noInj?'':'g'}\" onclick=\"if(!S.noInj)injToggle()\">Off</button></div></div><div class=card><b>Graphics</b>")
# 3) watch any game while hurt
r("g={oi,kind,o,m:S.T[0],s:[0,0],clk:0,poss:0,y:25,dn:1,tg:10,lv:S.stage||'hs',half:0,ot:0,otr:0,to:[3,3],cr:false,pc:40,tk:0,tab:'Short',st:Z(),rate:3600/(S.dur*60),ph:'pre',msg:'',note:'',two:false,ft:0};",
  "g={oi,kind,o,m:S.T[0],s:[0,0],clk:0,poss:0,y:25,dn:1,tg:10,lv:S.stage||'hs',half:0,ot:0,otr:0,to:[3,3],cr:false,pc:40,tk:0,tab:'Short',st:Z(),rate:3600/(S.dur*60),ph:'pre',msg:'',note:'',two:false,ft:0};if(S._iw){g.injW=1;g.iwF=1;S._iw=0}")
r("const st=g.st,w=g.s[0]>g.s[1];g.w=w;addStats(st,w,g.kind=='pp'||g.kind=='po'||g.kind=='cfp'||g.kind=='cc');","const st=g.st,w=g.s[0]>g.s[1];g.w=w;if(!g.iwF)addStats(st,w,g.kind=='pp'||g.kind=='po'||g.kind=='cfp'||g.kind=='cc');")
r("const gsc_=gsc(st,w);(S.gs=S.gs||[]).push(gsc_);","const gsc_=gsc(st,w);if(!g.iwF)(S.gs=S.gs||[]).push(gsc_);")
r("?'🚑 Sim game (you are hurt)':'Play game'}</button>","?'🚑 Sim game (you are hurt)':gsOk()?gsLbl():'Play game'}</button>${e.t!='bye'&&e.t!='sum'&&e.t!='comp'?injWB():''}")
r(":st?'Play game':'Watch from the bench (sim)'}</button>${(e.t=='reg'||e.t=='cc'||e.t=='cfp')&&st?",":st?(gsOk()?gsLbl():'Play game'):'Watch from the bench (sim)'}</button>${e.t!='bye'&&e.t!='sum'&&e.t!='cfpbye'?injWB():''}${(e.t=='reg'||e.t=='cc'||e.t=='cfp')&&st?")
r(":st?'Play game':'Watch from the bench (sim)'}</button>${(e.t=='pro'||e.t=='pp')&&st?",":st?(gsOk()?gsLbl():'Play game'):'Watch from the bench (sim)'}</button>${e.t!='bye'&&e.t!='ppbye'?injWB():''}${(e.t=='pro'||e.t=='pp')&&st?")
# 4) Play resumes a game you left (instead of starting it over)
r("function play(){LRNEXT=1;if(S.stage=='pro')return pplay();if(S.stage=='col')return cplay();","function play(){LRNEXT=1;if(gsOk())return resumeG();if(S.stage=='pro')return pplay();if(S.stage=='col')return cplay();")
r("function cplay(){const e=cevt();","function cplay(){if(gsOk())return resumeG();const e=cevt();")
r("function pplay(){const e=pevt();","function pplay(){if(gsOk())return resumeG();const e=pevt();")
r("function simUser(){LRNEXT=1;","function simUser(){LRNEXT=1;if(S.gsave){revB();S.gsave=null}")
# 5) clock: no instant runoff in the last two minutes of a half; tackled at the sideline = out of bounds
r("g.cr=k=='play'&&!o.oob;if(!g.ot&&g.cr)g.clk=Math.min(g.clk+8,P.qe||QE());","g.cr=k=='play'&&!o.oob;{const tm_=(g.clk>=1680&&g.clk<1800)||g.clk>=3480;if(!g.ot&&g.cr&&!tm_)g.clk=Math.min(g.clk+8,P.qe||QE())}")
r("endPlay(y,sk?'SACKED!':'Tackled',{sk})","endPlay(y,sk?'SACKED!':(c.x<1.1||c.x>52.2)?'Pushed out of bounds':'Tackled',{sk,oob:!sk&&(c.x<1.1||c.x>52.2)})")
# 6) controls never get stuck: a fresh first touch clears any half-finished gesture; also cleared each new play
r("cv.addEventListener('pointerdown',e=>{if(g&&g.paused)return;","cv.addEventListener('pointerdown',e=>{if(e.isPrimary){aim=null;lk=null;joy=null;try{swp=null}catch(_){}}if(g&&g.paused)return;")
r("function pre(){if(g.injP){injShow(pre);return}if(g.injW){injOwn();return}g.pqe=QE();","function pre(){aim=null;lk=null;joy=null;try{swp=null}catch(_){}if(g.injP){injShow(pre);return}if(g.injW){injOwn();return}g.pqe=QE();")
h=h.replace("cv.addEventListener('pointercancel',e=>{","cv.addEventListener('lostpointercapture',e=>{if(aim&&e.pointerId==aim.id)aim=null;if(joy&&e.pointerId==joy.id)joy=null;if(lk&&e.pointerId==lk.id)lk=null});cv.addEventListener('pointercancel',e=>{",1)
# 7) the pro champion is not shown before your own season is over (playoffs included)
r("return S.sum?1:Math.min(1,(S.wk||0)/n)}if(st=='col')return S.csum?1:Math.min(1,(S.wk||0)/((S.csch&&S.csch.length)||12));return 1}","return S.sum?1:Math.min(.97,(S.wk||0)/n)}if(st=='col')return S.csum?1:Math.min(.97,(S.wk||0)/((S.csch&&S.csch.length)||12));return 1}")
h=h.replace("V 0.0.0043","V 0.0.0044")
r("if(S.inj&&S.inj.nw)g.injW=1;if(s","if(S.inj&&S.inj.nw)g.injW=1;else if(injOut()){g.injW=1;g.iwF=1}if(s")
# ---------- new small-college schools ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m25.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("col.push(...PWC());","nuGen(col,seed);col.push(...PWC());")
r("function mig(s){s=confMig(s);","function mig(s){s=confMig(s);s=nuMig(s);")
r("const mn=g&&g.m?g.m.n.split(' ').pop().toUpperCase():'HOME',on=g&&g.o?g.o.n.split(' ').pop().toUpperCase():'AWAY'","const mn=g&&g.m?(g.m.sh||g.m.n.split(' ').pop()).toUpperCase():'HOME',on=g&&g.o?(g.o.sh||g.o.n.split(' ').pop()).toUpperCase():'AWAY'")
# ===================== batch 2: bug fixes =====================
# first person + flick cams: no slingshot zone (it fought with looking around); fast flicks are actions, slow drags are the camera
r("if((CAMI==1||CAMI==2)&&!(y>H*.68&&x>=W*.38)){","if(CAMI==1||CAMI==2){")
r("if(lk&&e.pointerId==lk.id)lk=null;if(joy&&e.pointerId==joy.id)joy=null;if(aim&&e.pointerId==aim.id){const a=aim;","if(lk&&e.pointerId==lk.id){if(lk.mv&&g&&g.ph=='live')mvmove(e.clientX-lk.x0,e.clientY-lk.y0);lk=null}if(joy&&e.pointerId==joy.id)joy=null;if(aim&&e.pointerId==aim.id){const a=aim;")
# corners stay on their man (tighter, faster recovery when beaten); pursuit closes harder on long runs
r("else if(d.w){tx=d.w.x+d.w.vx*.2;ty=d.w.y+2.6}","else if(d.spy){tx=P.qb.x;ty=Math.max(g.los+1.2,P.qb.y+4.5)}else if(d.w){tx=d.w.x+d.w.vx*.4;ty=d.w.y+(d.w.vy||0)*.3+1.7;d.cbB=Math.hypot(tx-d.x,ty-d.y)>2.5}")
r("P.lb.concat(P.db).forEach(d=>{if(d.cd>0)d.cd-=dt;","P.lb.concat(P.db).forEach(d=>{d.cbB=0;if(d.cd>0)d.cd-=dt;")
r("mv(d,tx,ty,d.sp*(P.lane!=null&&P.car===P.rb?.9:1)*(P.car&&P.car!==P.qb&&P.car.y-d.y>2&&P.car.y>g.los+8?1.13:1),dt)}","mv(d,tx,ty,d.sp*(d.cbB&&!P.run?1.1:1)*(P.lane!=null&&P.car===P.rb?.9:1)*(P.car&&P.car!==P.qb&&P.car.y-d.y>2&&P.car.y>g.los+8?1.18:1),dt)}")
# offenses score on about a third of their drives (an average one 30-40%)
r("else if(R()<cl(.4-df*.12,.2,.6))tx='Incomplete pass';","else if(R()<cl(.31-df*.12,.15,.52))tx='Incomplete pass';")
r("gn=Math.max(0,Math.round(gs()*6+7+df*4+(R()<.12?ri(12,35):0)))","gn=Math.max(0,Math.round(gs()*6+8.4+df*4+(R()<.13?ri(12,35):0)))")
r("gn=Math.round(gs()*3+4+df*1.8+(R()<.04?ri(10,30):0))","gn=Math.round(gs()*3+4.6+df*1.8+(R()<.05?ri(10,30):0))")
# CPU drives use about as much clock per play as yours do in that game
r("(lt&&lead<0)?ri(5,14):ri(6,40);let gn=0,tx='';","(lt&&lead<0)?ri(5,14):Math.round(ri(6,40)*SDT);let gn=0,tx='';")
r("g.ph='opp';g.sw=0;gsnap();save();g.r=simDrive(g.o.ovr,g.m.ovr,g.nx,Math.max(1,(g.clk<1800?1800:3600)-g.clk),g.s[1]-g.s[0],g.clk>=1800,KKt(g.oi));",
  "g.ph='opp';g.sw=0;gsnap();save();g.pc0=null;SDT=g.ptN>=3?cl(g.ptS/g.ptN/23,.7,1.8):1;g.r=simDrive(g.o.ovr,g.m.ovr,g.nx,Math.max(1,(g.clk<1800?1800:3600)-g.clk),g.s[1]-g.s[0],g.clk>=1800,KKt(g.oi));SDT=1;")
r("if(g.injW){injOwn();return}g.pqe=QE();","if(g.injW){injOwn();return}if(g.pc0!=null&&g.clk>g.pc0&&g.clk-g.pc0<150){g.ptS=(g.ptS||0)+g.clk-g.pc0;g.ptN=(g.ptN||0)+1}g.pc0=g.clk;g.pqe=QE();")
# watched passes are never caught out the back of the end zone
r("w.wp=[[w.x,e.y0+P.cd]];","P.cd=Math.max(2,Math.min(P.cd,108-e.y0));w.wp=[[w.x,e.y0+P.cd]];")
# teammates only ask for a promise when there is another game with you this season; promises don't carry over
r("if(!S.task&&R()<.6){","if(!S.task&&R()<.6&&lrGameNext()){")
r("function nextYr(){injClear();","function nextYr(){injClear();S.task=null;")
r("function colNext(){injClear();","function colNext(){injClear();S.task=null;")
r("function pNext(){injClear();","function pNext(){injClear();S.task=null;")
# labels: team ovr, conference tier explained, long names wrap instead of getting cut off
h=h.replace(" · team ${o.ovr} · "," · team ovr ${o.ovr} · ").replace(" · team ${t.ovr} · "," · team ovr ${t.ovr} · ")
r("${cfP4(c.n)?'POWER 4 · ':''}${t[1]}${mini?'':","${cfP4(c.n)?'POWER 4 · ':''}${t[1]} conf${mini?'':")
r("Power 4 programs first. Tap one for the QB room you'd join, who's leaving, who committed, and the pay.","Power 4 programs first. The colored tag is how good that school's conference is: Elite, Strong, Solid, Mid-major, then Developing. Tap one for the QB room you'd join, who's leaving, who committed, and the pay.")
r(".row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:3px 0}",".row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:3px 0}.row>span{white-space:normal!important;overflow-wrap:anywhere;min-width:0}.row>span:first-child{text-overflow:clip!important}")
# better offenses score more (not always)
r("const L=[],PL=[],df=(o-d)/90;","const L=[],PL=[],df=(o-d)/65;")

# enrolling: no stale popups over the college list; finishing high school twice can't happen; clear welcome
r("function endC(){scene('lock');","function endC(){ovHide();scene('lock');")
r("function nextYr(){injClear();S.task=null;","function nextYr(){if(S.yr>4)return endC();injClear();S.task=null;")
r("gpNews('enroll',me.n);save();hub()}","gpNews('enroll',me.n);HM='🎓 Welcome to '+me.n+'! Your college career starts now. Tap Play game for week 1.';save();hub()}")
# ===================== batch 3 =====================
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m26.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
cut("function face(w,m){const c=FC[w]","\nfunction talk(")
r("function talk(w,nm,line,mood,btns,ex){ovShow(`<div style=\"display:flex;gap:10px;align-items:center\"><div style=\"flex:none;border:3px solid #000;background:#fff3;border-radius:12px;padding:2px\">${face(w,mood)}</div>",
  "function talk(w,nm,line,mood,btns,ex){ovShow(`<div style=\"display:flex;gap:10px;align-items:center\"><div style=\"flex:none;border:3px solid #000;background:#fff3;border-radius:12px;padding:2px\">${face(w,mood,nm)}</div>")
# interview answers follow the question
r("function askQ(tt){const st=g.st,w=g.w,L=[...(w?QP.win:QP.loss)];if(st.int>=2)L.push(...QP.int);if(st.sk>=3)L.push(...QP.sk);if(st.td>=3)L.push(...QP.td);if(g.rv){const X=RVQ[w?'w':'l'].map(s=>s.replace(/RIV/g,g.rv.op).replace('RNAME',g.rv.nm));L.length=0;L.push(...X)}",
  "function askQ(tt){const st=g.st,w=g.w,L=[...(w?QP.win:QP.loss)];if(st.int>=2)L.push(...QP.int);if(st.sk>=3)L.push(...QP.sk);if(st.td>=3)L.push(...QP.td);if(g.rv){const X=RVQ[w?'w':'l'].map(s=>s.replace(/RIV/g,g.rv.op).replace('RNAME',g.rv.nm));L.length=0;L.push(...X)}const qcat=q=>g.rv?(w?'rvw':'rvl'):QP.int.includes(q)?'int':QP.sk.includes(q)?'sk':QP.td.includes(q)?'td':w?'win':/play calling/.test(q)?'call':/fans/.test(q)?'fans':/season/.test(q)?'season':'loss';")
r("const o=Object.keys(ST).sort(()=>R()-.5).slice(0,3);talk('reporter','Reporter Mia · '+tt,q,w?'happy':'sad',o.map(k=>[ST[k][0]+': \"'+ST[k][1][ri(0,1)]+'\"',\"ans('\"+k+\"')\"]))}",
  "const o=Object.keys(ST).sort(()=>R()-.5).slice(0,3),cat=g.rv?(w?'rvw':'rvl'):qcat(S.lq),AQ=QAN[cat]||QAN[w?'win':'loss'],fx=s=>s.replace(/RIV/g,g.rv?g.rv.op:'them').replace(/RNAME/g,g.rv?g.rv.nm:'the trophy');talk('reporter','Reporter Mia · '+tt,q,w?'happy':'smug',o.map(k=>[ST[k][0]+': \"'+fx(AQ[k][ri(0,AQ[k].length-1)])+'\"',\"ans('\"+k+\"')\"]))}")
# completion %: over 50% is decent; shown on the game line
r("return cl(Math.round(50+((st.cmp/at-.55)*60+cl((st.yds/at-6)*3,-8,12))*pw","return cl(Math.round(50+((st.cmp/at-.5)*45+cl((st.yds/at-6)*3,-8,12))*pw")
r("sline=s=>`${s.cmp}/${s.att} · ","sline=s=>`${s.cmp}/${s.att}${s.att?' ('+Math.round(s.cmp/s.att*100)+'%)':''} · ")
# Ultra Bowl MVPs (real years, then the champion's QB)
r("const RCH={2022:{ub:12,ru:16,mvp:12,nc:'UGA',hz:20},2023:{ub:12,ru:28,mvp:4,nc:'MICH',hz:18},2024:{ub:16,ru:12,mvp:1,nc:'OSU'},2025:{ub:29,ru:3,mvp:31,nc:'IND'}};",
  "const RCH={2021:{ub:31,ru:7,mvp:5,sbm:'Hooper Bol'},2022:{ub:12,ru:16,mvp:12,sbm:'Ricky MaClones',nc:'UGA',hz:20},2023:{ub:12,ru:28,mvp:4,sbm:'Ricky MaClones',nc:'MICH',hz:18},2024:{ub:16,ru:12,mvp:1,sbm:'Jay-Jay Pain',nc:'OSU'},2025:{ub:29,ru:3,mvp:31,sbm:'Gettin-It Running-Man',nc:'IND'}};")
r("function uChamp(Y){const T=uPro(Y),R=RCH[Y];if(R)return{ub:R.ub,ru:R.ru,mvp:R.mvp};","function uChamp(Y){const T=uPro(Y),R=RCH[Y];if(R)return{ub:R.ub,ru:R.ru,mvp:R.mvp,sbm:R.sbm};")
r("return{ub:rk[0].ti,ru:rk[1].ti,mvp:L[0]?L[0].q.qi:null}}","{const W_=T.find(x=>x.ti==rk[0].ti),sq=W_&&W_.q&&W_.q[0];return{ub:rk[0].ti,ru:rk[1].ti,mvp:L[0]?L[0].q.qi:null,sbm:sq?sq.n:null}}}")
r("<b>🏅 MVP:</b> ${ch.mvp!=null?QBX[ch.mvp][0]+' · '+TA[uMvpT(Y,ch.mvp)]:'—'}","<b>🏅 MVP:</b> ${ch.mvp!=null?QBX[ch.mvp][0]+' · '+TA[uMvpT(Y,ch.mvp)]:'—'}${ch.sbm?'<br><b>⭐ Ultra Bowl MVP:</b> '+ch.sbm:''}")
# Portland -> Los Angeles Flying Goats
r("Portland|Loggers","Los Angeles|Flying Goats")
h=h.replace("'PHX','POR']","'PHX','LAG']")
r("function mig(s){s=confMig(s);s=nuMig(s);","function mig(s){s=confMig(s);s=nuMig(s);s=goatMig(s);")
