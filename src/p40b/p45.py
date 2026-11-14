# ===================== V45 batch 4: offers (decline/dream/lean), schedules, homecoming, cheerleaders, locker room, defense calls, new prospects + pro stars =====================
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m27.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
h=h.replace("V 0.0.0044","V 0.0.0045")
# --- offers: decline, dream school on top, lean ---
r("const T=offSort(S.off.map((o,i)=>({o,i,conf:o.conf,ovr:o.ovr})));let sep=0;","const T=offDreamTop(offSort(S.off.map((o,i)=>({o,i,conf:o.conf,ovr:o.ovr}))));let sep=0;")
r("Power 4 programs first. The colored tag","Your dream school first, then Power 4 programs. The colored tag")
r("${o.top?' 🔥 topped your commit':''}","${o.top?' 🔥 topped your commit':''}${offTag(o)}",2)
r("<button class=g onclick=colList()>All college programs</button><button class=g onclick=hub()>Back</button>","${offDecH()}<button class=g onclick=colList()>All college programs</button><button class=g onclick=hub()>Back</button>")
r("<button onclick=\"commit('${q_(o.n)}')\">${S.commit==o.n?'✔ Committed':'Commit to '+o.n}</button>","<button onclick=\"commit('${q_(o.n)}')\">${S.commit==o.n?'✔ Committed':'Commit to '+o.n}</button>${offBtns(i)}",2)
r("<button class=g onclick=\"${bk!=null?'offerView('+bk+')':'colList()'}\">Back</button></div>`;ui.scrollTop=0}","${hs?`<button class=g onclick=\"offDreamC(${ci},${ti},${bk==null?'null':bk})\">${S.dream==t.n?'⭐ Your dream school (tap to clear)':'⭐ Make this my dream school'}</button>`:''}<button class=g onclick=\"${bk!=null?'offerView('+bk+')':'colList()'}\">Back</button></div>`;ui.scrollTop=0}",2)
r("S.commit?' · committed to '+S.commit:''","S.commit?' · committed to '+S.commit:''}${S.lean&&S.lean!=S.commit?' · leaning '+S.lean:''}${S.dream?' · dream school: '+S.dream:''")
r("if(!have.has(t.n))pool.push({","if(!have.has(t.n)&&!(S.dec&&S.dec[t.n]))pool.push({")
r("const got=[];S.inb=S.inb||[];","pool.forEach(p_=>{if(p_.n==S.dream)p_.w*=3});const got=[];S.inb=S.inb||[];")
r("S.off.push(...got);if(S.commit&&!force&&R()<.3)topOffer();","S.off.push(...got);if(S.dream&&got.some(o=>o.n==S.dream))S.inb.unshift({s:S.dream,t:'⭐ Your dream school, '+S.dream+', just offered you!',u:1});if(!force)offExtra();if(S.commit&&!force&&R()<.3)topOffer();")
r("me:1,cm:S.commit||null});L.sort(","me:1,cm:S.commit||null,ln:S.commit?null:(S.lean||null)});L.sort(")
# --- every team's schedule + scores ---
r("mkSched()[S.wk].forEach(([a,b])=>{if(a==0||b==0)return;const s=simGame(teff(T[a]),teff(T[b]));if(s[0]==s[1])s[R()<.5?0:1]++;","mkSched()[S.wk].forEach(([a,b])=>{if(a==0||b==0)return;const s=simGame(teff(T[a]),teff(T[b]));if(s[0]==s[1])s[R()<.5?0:1]++;grRec(a,b,s);")
r("if(w!=null){const o=g.oi;T[w?0:o].w++;T[w?o:0].l++}S.wk++;injTick();addOffers();","if(w!=null){const o=g.oi;T[w?0:o].w++;T[w?o:0].l++;grRec(0,o,g&&g.s?g.s:[w?1:0,w?0:1]);hcApply(w)}S.wk++;injTick();addOffers();")
r("function gm(a,b){const T=S.T,s=simGame(teff(T[a]),teff(T[b]));if(s[0]==s[1])s[R()<.5?0:1]++;","function gm(a,b){const T=S.T,s=simGame(teff(T[a]),teff(T[b]));if(s[0]==s[1])s[R()<.5?0:1]++;grRec(a,b,s);")
r("if(w!=null){const wi=w?0:o,li=w?o:0;T[wi].w++;T[li].l++;if(T[0].cf==T[o].cf){T[wi].cw++;T[li].cl++}}S.wk++;","if(w!=null){const wi=w?0:o,li=w?o:0;T[wi].w++;T[li].l++;if(T[0].cf==T[o].cf){T[wi].cw++;T[li].cl++}grRec(0,o,g&&g.s?g.s:[w?1:0,w?0:1]);hcApply(w)}S.wk++;")
r("if(w!=null){T[w?0:o].w++;T[w?o:0].l++;qbForm(o,!w)}","if(w!=null){T[w?0:o].w++;T[w?o:0].l++;qbForm(o,!w);grRec(0,o,g&&g.s?g.s:[w?1:0,w?0:1])}")
r("<button class=g onclick=staffV()>🧢 Coaches","<button class=g onclick=lgWeek()>📅 Schedules & scores</button><button class=g onclick=staffV()>🧢 Coaches")
r("</div><button class=g onclick=rosv()>Back to teams</button></div>`;ui.scrollTop=0}\nconst LDF=","</div><button onclick=\"schV(${i})\">📅 ${i==0?'Our':'Their'} schedule & results</button><button class=g onclick=rosv()>Back to teams</button></div>`;ui.scrollTop=0}\nconst LDF=")
# --- homecoming ---
r("if(S._iw){g.injW=1;g.iwF=1;S._iw=0}","if(S._iw){g.injW=1;g.iwF=1;S._iw=0}g.hc=hcNow()?1:0;")
r("<p>${g.m.n} vs ${g.o.n}</p><p>${sline(st)}","<p>${g.m.n} vs ${g.o.n}</p>${g.hc?'<p>🏰 <b>Homecoming</b>'+(w?' win! Extra fans are on the way.':'. The alumni will get over it.')+'</p>':''}<p>${sline(st)}")
r("if(S&&S.fmsg&&S.stage!='pro'){","hcHub();if(S&&S.fmsg&&S.stage!='pro'){")
# --- every cheerleader on the sideline can be talked to ---
r("if(c.pf&&c.position.z<-24&&c.position.z>-78)O.push(","if(c.pf)O.push(")
r("bd:[-30.4,30.4,-77,-23]","bd:[-30.4,30.4,-101,-4]")
# --- locker room: 22 teammates ---
r("[7,-14.6,-6.75,0,'jam']].map(([i,x,z,wd,act])=>","[7,-14.6,-6.75,0,'jam'],...LRX].filter(a=>L[a[0]]).map(([i,x,z,wd,act])=>")
# --- defense: different looks (cover 2/3, man, blitzes, safety blitz, cover 0, QB spy, prevent) ---
r("const dc=g.tg>12?'prevent':R()<.22?'blitz':R()<.4?'zone':'man',P=g.pl=","const dc=defCall(sw),P=g.pl=")
r("mz=dc=='man'||dc=='blitz'","mz=['man','blitz','sblitz','cover0','spy'].includes(dc)")
r("if(dc=='blitz'){const b=P.lb.pop()","if(dc=='blitz'||dc=='cover0'){const b=P.lb.pop()")
r("P.def=[...P.dl,...P.db,...P.lb]}","defPost(P,y,o,r);P.def=[...P.dl,...P.db,...P.lb]}")
r("({man:'man',zone:'zone',blitz:'BLITZ',prevent:'prevent'})[P.dc]","(DCN[P.dc]||P.dc)")
# --- the user's future classes (class when you are a freshman; rating = where they start as pros) ---
r("['Charles Beckham','WR','ind',80,3,2]];","['Charles Beckham','WR','ind',80,3,2],['Bruce Undertree','QB','mich',67,19,1],['Dill Rolley','QB','ore',75,9,1],['Jade Ball','QB','mia',73,12,2],['Andrew Messmaker','QB','okst',68,15,2],['Femmifer Coleman','WR','bama',79,8,2],['Ham Leaver','QB','lsu',68,18,2],['Juan MaDeer','QB','ou',71,10,3]];")
r("ind:['Indiana Owls','Indiana','Indiana']};","ind:['Indiana Owls','Indiana','Indiana'],okst:['Oklahoma State Cowpokes','Oklahoma','Oklahoma State'],lsu:['LSU Lions','Louisiana','LSU'],ou:['Oklahoma Laters','Oklahoma','Oklahoma']};")
r("Alabama:'AL',California:'CA'},CLS=","Alabama:'AL',California:'CA',Oklahoma:'OK',Louisiana:'LA'},CLS=")
r("function npxEnsure(){if(S&&S.npx)S.npx.forEach(p=>{if(p.n=='Jeremy Smothers'&&!p.jsF){p.off=2;p.jsF=1}});","function npxEnsure(){if(S&&S.npx)S.npx.forEach(p=>{if(p.n=='Jeremy Smothers'&&!p.jsF){p.off=2;p.jsF=1}});if(S&&S.npx&&S.npv!==NPX0.length){npxFix();S.npv=NPX0.length}")
r("T:cl(T+Math.round((r()-.5)*6.98),40,99),off,gen:gen?1:0,hsi","T,tx:1,off,gen:gen?1:0,hsi")
r("pot:p.gen?99:Math.min(99,p.T+ri(4,12))","pot:npxPot(p)")
r("Pro ratings land close to their projections (±3, different every career).","Each one starts his pro career at his projected rating. How far he climbs after that depends on a hidden potential that is different every career.")
# --- pro stars the user added ---
r("[16,18,'Hooper Dalean',92,24,33]];","[16,18,'Hooper Dalean',92,24,33],[29,3,'Hooper Bol',84,32,10],[31,3,'Lavante Snaggems',95,31,17],[17,3,'Jordan Give-Itt',92,25,3],[17,2,'BB Deer',97,26,88],[28,2,'Kyle Chriss',93,31,5],[28,5,'Jordan Cattle',95,32,85],[28,16,'Ned Brothers',98,28,54],[5,15,'Teej Waddle',98,30,90],[22,15,'Michael Parkins',96,27,11],[11,2,'Peter Lincoln',89,23,11],[9,18,'Saucer Garden',89,25,1],[28,3,'Doobie Emmanuel',87,30,19],[8,3,'Marco Harris',84,23,18],[8,2,'Nigel Ballins',94,27,12],[14,1,'Axel Jean',86,22,2],[24,1,'Dijon Mustardson',98,24,7],[1,1,'Jameson Potts',96,27,4]];")
# named stars start each new career exactly as given (rating, age, jersey); their potential is still different every career
r("if(isGen(x.n)){o=cl(o+Math.round((pr()-.5)*4.98),40,99);ag=Math.max(21,ag+Math.round((pr()-.5)*4.98));Object.assign(x,{n:nm,pos:ps,ovr:o,age:ag,pot:potOf(o,ag,pr())})}","if(isGen(x.n)){pr();pr();Object.assign(x,{n:nm,pos:ps,ovr:o,age:ag,pot:potOf(o,ag,pr())})}")
r("let v=cl(jit(n),lo,hi),g=0;","jit(n);let v=cl(n,lo,hi),g=0;")
# universities stay out of high school: the college rename never touches high school names, and saves it already reached get repaired
r("const keep=[s.commit,s.stage=='col'&&s.T&&s.T[0]?s.T[0].n:null].filter(Boolean),","const keep=[s.commit,s.stage=='col'&&s.T&&s.T[0]?s.T[0].n:null,...((((s.stage||'hs')=='hs'?s.T:(s.hs&&s.hs.T))||[]).map(t=>t&&t.n)),...(s.npx||[]).map(p=>String(p.hs||'').replace(/ HS$/,''))].filter(Boolean),")
r("function mig(s){s=confMig(s);s=nuMig(s);s=goatMig(s);","function mig(s){s=confMig(s);s=nuMig(s);s=hsUniFix(s);s=goatMig(s);")
# rivalries between the new colleges (played every season, even across conferences)
r("const RVC=[['TEX','TAMU','Lone Star Showdown'],","const RVC=[['LBU','MJ','The GOAT Debate'],['MJS','MJ','The Jumpman Bowl'],['MCD','BKU','The Burger Wars'],['GCU','MRV','The Comic Book Classic'],['NYPD','NYCP','The Cops & Robbers Bowl'],['GTA','SPK','The Los Santos Showdown'],['TAMC','TJC','The East Texas Brawl'],['ZWS','ERU','The Gang Green Game'],['KIU','UNV','The Flat Earth Bowl'],['HOM','UOB','The Tailgate Classic'],['XBX','BSU','The Console Wars'],['KLU','ULW','The Halftime Show Bowl'],['TEX','TAMU','Lone Star Showdown'],")
# the hub showed the 0-100 popularity score as "Fans" (it tops out at 100); show the real fan count everywhere
r("<small>· Fans ${S.pop||40} · Coach trust","<small>· Fans ${fans(S.pop||40).toLocaleString()} · Coach trust")
# Drizzy Drake U, Cristiano Ronaldo U, Skipper Baymore U, Coca-Cola U, Dr Pepper U, University of Taco Bell
r("nuGen(col,seed);col.push(...PWC());","nuGen(col,seed);nu2Add(col,seed);col.push(...PWC());")
r("s=nuMig(s);s=hsUniFix(s);","s=nuMig(s);s=nu2Mig(s);s=hsUniFix(s);")
r("const RVC=[['LBU','MJ','The GOAT Debate'],","const RVC=[['DDU','KLU','The Not Like Us Bowl'],['CRU','LMU','El Clásico'],['SBU','SLS','The First Take Debate'],['COKE','DRP','The Soda Wars'],['COKE','SPK','The Cola Clash'],['DRP','SPK','The Fizz Bowl'],['UTB','MCD','The Drive-Thru Showdown'],['LBU','MJ','The GOAT Debate'],")
# high school is four years: a save that kept playing past senior year goes straight to choosing a college
r("return chub();scene('lock');const HM2=injTag(HM);","return chub();if((S.yr||1)>4)return endC();scene('lock');const HM2=injTag(HM);")
r("· Year ${S.yr} of 4 ·","· Year ${Math.min(S.yr||1,4)} of 4 ·")
# QB/K retirement by age table (user's model) with lifers and all-time greats playing longer
r("qk?(a>=44||(a>=39&&R()<.5)||(a>=35&&x.ovr<62)||(a>=33&&x.ovr<50))","qk?qbRet(x)")
r("rb?(a>=33||(a>=30&&R()<.35)||(a>=28&&x.ovr<65)):(a>=(ol?37:36)||(a>=32&&R()<.3)||(a>=31&&x.ovr<58))","othRet(x,rb)")
r("if(rg){x.ovr=Math.max(30,x.ovr-rg[0]);x.rg=rg[0];x.sl=0}","if(rg){const v_=rg[0]*rgK(x),d_=Math.floor(v_)+(R()<v_%1?1:0);x.ovr=Math.max(30,x.ovr-d_);x.rg=d_;x.sl=0}")
# computer players: peak rating remembered; the age caps are yours (they train against them), the league's old players follow their tier instead
r("function cpuDev(x,wins){x.age=(x.age||25)+1;","function cpuDev(x,wins){x.pk=Math.max(x.pk||0,x.ovr||0);x.age=(x.age||25)+1;")
r("const a=x.age,rg=RGT[a],cap=ageCap(a),h=x.hq;","const a=x.age,rg=RGT[a],cap=ageCap(a)<100?99:100,h=x.hq;")
# override retirements (twice per player) and league awards for any pro season
r("if(x.age!=null){cpuDev(x,t.w);cpuRet(x,t)}","if(x.age!=null){cpuDev(x,t.w);retSnap(x,t,i,k)}")
r("function leagueDev(){S.rets=[];","function leagueDev(){S.rets=[];S.retq=[];")
r("${S.ct&&(S.ct.ci||S.ct.gi)?'<button class=g onclick=ownV()>🗣 Talk to the owner</button>':''}","${retBtn()}${S.law&&Object.keys(S.law).length?'<button class=g onclick=awV()>🏅 League awards</button>':''}${S.ct&&(S.ct.ci||S.ct.gi)?'<button class=g onclick=ownV()>🗣 Talk to the owner</button>':''}")
r("'Retired this offseason: '+S.rets.slice(0,5).join(', ')+'.'","'Retired this offseason: '+S.rets.slice(0,5).join(', ')+'. (You can override retirements from the menu.)'")
r("<button class=g onclick=lgWeek()>📅 Schedules & scores</button>","<button class=g onclick=lgWeek()>📅 Schedules & scores</button>${awBtn()}")
r("S.csum={aw,rk,champ:S.cb&&S.cb.champ!=null?S.T[S.cb.champ].n:'-',heis:hs.map(x=>(x.me?'▶ ':'')+x.n)};","S.csum={aw,rk,champ:S.cb&&S.cb.champ!=null?S.T[S.cb.champ].n:'-',heis:hs.map(x=>(x.me?'▶ ':'')+x.n)};try{cawEns()}catch(e){}")
# ---- graduation ceremonies ----
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m28.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(LR&&LR.field){if(LR.sb)sbBump();return fwAct(o)}","if(LR&&LR.grad)return gdAct(o);if(LR&&LR.field){if(LR.sb)sbBump();return fwAct(o)}")
r("fcheer:'Talk to '+(o.pf&&!o.pf.hs?o.pf.n.split(' ')[0]:'the cheerleader')}[o.k]","fcheer:'Talk to '+(o.pf&&!o.pf.hs?o.pf.n.split(' ')[0]:'the cheerleader'),dprin:'🎓 Walk across the stage',dfam:'See Mom & Dad',dcoach:'Talk to '+CNM(),dstu:'Talk to '+o.n}[o.k]")
r("function nextYr(){if(S.yr>4)return endC();","function nextYr(){if(S.yr>4)return gradGo('hs',endC);")
r("S.yr++;if(S.yr>4)return endC();S.wk=0;","S.yr++;if(S.yr>4){save();return gradGo('hs',endC)}S.wk=0;")
r("return chub();if((S.yr||1)>4)return endC();","return chub();if((S.yr||1)>4)return gradGo('hs',endC);")
r("function declare(){gpNews('declare');","function declare(){if((S.cdone||S.cy>=4)&&!(S.grd&&S.grd.col))return gradGo('col',declare);gpNews('declare');")
r("s=goatMig(s);s=v41Mig(s);","s=goatMig(s);s=v41Mig(s);s=hsXtraFix(s);")
# ===== glitch fixes (Oct 23 list #2) =====
# chew clock: works whether or not the clock is running, never takes a delay of game, snaps at :01 even right after you tap something
r("const ch_=g.chew&&g.cr&&g.tk&&!g.am,sp=ch_?4:1;","const ch_=g.chew&&g.tk,sp=ch_?4:1;")
r("if(ch_&&g.pc<=1.2&&Date.now()-g.ui>=400&&g.clk<(g.pqe||QE())){g.auto=0;hut();return}","if(ch_&&g.pc<=1.2&&(!g.cr||g.clk<(g.pqe||QE()))){g.auto=0;g.am=0;g.ui=0;hut();return}")
r("if(g.pc<=0)delay()}","if(g.pc<=0){if(g.chew&&g.tk){g.ui=0;g.am=0;hut();return}delay()}}")
# teammate promises: only for someone who is still your teammate
r("function enroll(n){injClear();","function enroll(n){injClear();S.task=null;S.lrq=null;")
r("function proStart(ti,pk){injClear();","function proStart(ti,pk){injClear();S.task=null;S.lrq=null;")
r("function hub(){relTick();","function hub(){relTick();try{if(S&&S.task){const x=rost('h.0')[S.task.ri];if(!x||x.n!=S.task.nm)S.task=null}}catch(e){}")
# watching a drive: the game clock runs during each play
r("P.qe=g.clk;P.e=e;","P.qe=g.clk;W_.ca=g.clk;W_.cb=W_.c0+W_.dc*((W_.i+1)/Math.max(1,W_.pl.length));P.e=e;")
r("const wq=wConvPre(P);upd(dt);","const wq=wConvPre(P);upd(dt);if(W_.cb!=null)g.clk=W_.ca+(W_.cb-W_.ca)*Math.min(1,t/4.5);")
# routes: receivers keep running after the route ends; at the sideline (or coming back) they work to get open
r("if(d[1]<.35&&w.y<g.los+3.5&&!P.passed){w.ld=[d[0]*.6,.8];}else if(d[1]<.35){w.vx=w.vy=0;return}const nx=w.x+d[0]*4,ny=w.y+d[1]*4;if(nx<2||nx>51.3||ny>106){","if(d[1]<.35&&w.y<g.los+3.5&&!P.passed){w.ld=[d[0]*.6,.8];}const nx=w.x+d[0]*4,ny=w.y+d[1]*4;if(d[1]<-.3||nx<2||nx>51.3||ny>106){")
# the ball is spotted where the ball is when you go down (forward progress), not at your feet
r(",.002,.08),y=c.y;",",.002,.08),y=Math.min(99.4,c.y+(sk||(c.vy||0)<=0?0:cl(.45+(c.vy||0)*.12,.45,1.6)));")
# linemen stand in a real stance instead of lying on the turf
r("m.rotation.x-=(pre&&dl?.85:.7)*k;m.position.y-=(pre?.4:.32)*k;","m.rotation.x-=(pre?(dl?.42:.34):.26)*k;m.position.y-=(pre?.2:.08)*k;")
# interceptions: a real return you can chase down (pick-sixes possible but rare); visible when watching too
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m29.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function upd(dt){const P=g.pl,q=P.qb,a=P.air;P.t+=dt;if(!g.ot)g.clk=Math.min(g.clk+dt*g.rate,P.qe);","function upd(dt){const P=g.pl,q=P.qb,a=P.air;P.t+=dt;if(!g.ot)g.clk=Math.min(g.clk+dt*g.rate,P.qe);if(P.ir)return intTick(P,dt);")
r("if(R()<ip)return endPlay(a.ly,'INTERCEPTED!',{int:1})","if(R()<ip)return intStart(D.d,a)")
r("P.car=db;db.x=a.lx;db.y=a.ly;P.endAt=W_.t+.9;P.endTxt='INTERCEPTED!';P.endK='int'","intStart(db,a,1);P.endAt=W_.t+2.6;P.endTxt='INTERCEPTED!';P.endK='int'")
r("if(o.int){k='to';nx=cl(Math.round(100-ye),1,99);st.int++}","if(o.int){k=o.p6?'p6':'to';nx=cl(Math.round(100-ye),1,99);st.int++}")
r("if(o.k=='to')return drvEnd(o.nx,o.tx);","if(o.k=='p6'){g.s[1]+=7;g.y=25;g.dn=1;g.tg=10;g.note='Pick six. '+g.o.n+' score.';if(chk(0))return;gsnap();save();return pre()}if(o.k=='to')return drvEnd(o.nx,o.tx);")
# ===== college rankings + playoff picture =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m30.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("rankAll=()=>S.T.map((t,i)=>i).sort((a,b)=>csc(b)-csc(a))","rankAll=()=>crRank()")
r("const rk=rankAll(),ch=rk.filter(i=>S.cch.includes(i)).slice(0,5),rest=rk.filter(i=>!ch.includes(i)).slice(0,7),f=[...ch,...rest].sort((a,b)=>rk.indexOf(a)-rk.indexOf(b));","CRC=null;const f=cfpField().f;")
r("S.wk++;injTick();if(S.wk>=12)ccSetup()}","S.wk++;injTick();crSnap();if(S.wk>=12)ccSetup()}")
r("if(k=='cc'){injTick();T[w?0:o].w++;T[w?o:0].l++;","if(k=='cc'){injTick();T[w?0:o].w++;T[w?o:0].l++;grRec(0,o,g&&g.s?g.s:[w?1:0,w?0:1]);")
r("<div class=card><b>Top 12 poll</b>","<button onclick=crV()>🏆 Top 25 & playoff picture</button><div class=card><b>Top 12 poll</b>")
# Heisman: almost always a Power 4 player; a smaller-conference player needs a truly special season
r("c=rk.slice(0,12).filter(i=>i).map(i=>({n:rost('h.'+i)[0].n,s:T[i].w*9+T[i].ovr*.5+(i*31+(S.seed||1))%17}));","c=rk.slice(0,12).filter(i=>i).map(i=>({n:rost('h.'+i)[0].n,s:T[i].w*9+T[i].ovr*.5+(i*31+(S.seed||1))%17-(S.col[T[i].cf]&&cfP4(S.col[T[i].cf].n)?0:(T[i].l==0&&T[i].w>=12?3:16))}));")
r("mine=s.g>2?s.td*2.5+s.yds/55+s.w*6-s.int*3+(rk.indexOf(0)<10?8:0):-99,","mine=s.g>2?s.td*2.5+s.yds/55+s.w*6-s.int*3+(rk.indexOf(0)<10?8:0)-(S.col[T[0].cf]&&cfP4(S.col[T[0].cf].n)?0:(s.td>=40?2:10)):-99,")
# ===== pro league like the NFL: NFL-style 17-game schedule; the Ultra Bowl is always LFC vs RFC =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m31.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("const rs=rng((S.seed||1)*13+(S.py||1)*97),idx=","const rs=rng((S.seed||1)*13+(S.py||1)*97);try{const W_=pSchedNFL(S.T,S.py||1,rs);if(W_)return W_}catch(e){}const idx=")
r("{const W_=T.find(x=>x.ti==rk[0].ti),sq=W_&&W_.q&&W_.q[0];return{ub:rk[0].ti,ru:rk[1].ti,","{const cf_=x=>String((S.pro[x.ti]||{}).dv||'').split(' ')[0],ru_=rk.find(x=>cf_(x)!=cf_(rk[0]))||rk[1],W_=T.find(x=>x.ti==rk[0].ti),sq=W_&&W_.q&&W_.q[0];return{ub:rk[0].ti,ru:ru_.ti,")
# game length 2-10 minutes
h=h.replace("<input type=range min=3 max=15 value=${S.dur}","<input type=range min=2 max=10 value=${Math.min(10,S.dur)}")
r("id=du type=range min=3 max=15 value=5","id=du type=range min=2 max=10 value=5")
r("rate:3600/(S.dur*60),","rate:3600/(cl(S.dur||5,2,10)*60),")
# two-minute warning and CPU timeouts are announced on screen
h=h.replace("g.tw1=1;g.cr=false;g.note='TWO-MINUTE WARNING'","g.tw1=1;g.cr=false;g.note='TWO-MINUTE WARNING';g.flash='⏱ TWO-MINUTE WARNING';g.ft=2.6")
h=h.replace("g.tw2=1;g.cr=false;g.note='TWO-MINUTE WARNING'","g.tw2=1;g.cr=false;g.note='TWO-MINUTE WARNING';g.flash='⏱ TWO-MINUTE WARNING';g.ft=2.6")
r("g.to[1]--;g.cr=false;g.pc=40;g.auto=0;g.note=g.o.n+' call a timeout'","g.to[1]--;g.cr=false;g.pc=40;g.auto=0;g.note=g.o.n+' call a timeout';g.flash='⏸ TIMEOUT: '+g.o.n.toUpperCase()+' ('+g.to[1]+' left)';g.ft=2.4")
# CPU: two-point chart late, and it goes for it on 4th down when trailing late
r("if(y>=100){res='Touchdown';pts=R()<.95?7:6;","if(y>=100){res='Touchdown';pts=tdPts(lead,sec,h2);")
r("while(sec>0&&!res&&n++<40){const lt=h2&&sec<=300;","while(sec>0&&!res&&n++<40){const lt=h2&&(sec<=300||(sec<=600&&lead<=-9));")
# ===== postgame box score + scoring summary + player of the game; jersey swap animation; throwing style toggle =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m32.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function drvEnd(nx,tx){if(S)save();","function drvEnd(nx,tx){spChk(tx);if(S)save();")
r("function applyO(){clearInterval(g.tm);const r=g.r;g.s[1]+=r.pts;","function applyO(){clearInterval(g.tm);const r=g.r;g.s[1]+=r.pts;spChk(g.o.n+': '+r.res);")
r("function applyU(){const r=g.r;g.s[0]+=r.pts;","function applyU(){const r=g.r;g.s[0]+=r.pts;spChk(r.res);")
r("if(o.k=='p6'){g.s[1]+=7;","if(o.k=='p6'){g.s[1]+=7;spChk('Pick six');")
r("fumbles lost</p>${tmsg}","fumbles lost</p>${tmsg}${pgBox(w)}")
r("save();lrStat();talk('mate',o.n,a==3?'Say that again next year.':'Respect.'","save();lrStat();if(a==2)return jsStart(o);talk('mate',o.n,a==3?'Say that again next year.':'Respect.'")
r("if(L.field){cheerTick();confTick(dt);celTick(dt);if(L.sb)sbTick(dt)}if(L.gb)return gbTick(dt);","if(L.field){cheerTick();confTick(dt);celTick(dt);if(L.sb)sbTick(dt)}if(L.js)return jsTick(dt);if(L.gb)return gbTick(dt);")
r("function swOK(){","function swOK(){if(S&&S.thm=='sling')return false;")
r("let b=null,bd=1e9;","if(S.thm=='swipe'&&mg>=28){g.flash='Swipe up to throw (slingshot is off: pause menu)';g.ft=1.2;return}let b=null,bd=1e9;")
r("<button class=g onclick=\"camb();pm()\">","<button class=g onclick=\"thmT();pm()\">Throwing: ${THN[S.thm||'both']}</button><button class=g onclick=\"camb();pm()\">")
# the future draft class can be followed from your freshman year of high school
r("const npxVis=()=>!!(S&&S.npx&&(","const npxVis=()=>!!(S&&S.npx&&((S.stage||'hs')=='hs'||")
r("<h2>🌟 ${S.npxd?'Draft class':'Upcoming pro draft'}</h2>","<h2>🌟 ${S.npxd?'Draft class':(S.stage||'hs')=='hs'?'Future draft class':'Upcoming pro draft'}</h2>")
r("'The pro draft is coming up after this season. Seniors are declaring; underclassmen can still go back to school or transfer.'","((S.stage||'hs')=='hs'?'Every player here is already playing: in high school or college right now. They enter the pro draft after your freshman year of college (underclassmen can wait a year).':'The pro draft is coming up after this season. Seniors are declaring; underclassmen can still go back to school or transfer.')")
# college scoring: about 3% less overall, and big talent gaps (good offense vs bad defense) show up more
r("const L=[],PL=[],df=(o-d)/65;","const L=[],PL=[],cs_=S&&S.stage=='col',df=(o-d)/(cs_?52:65)-(cs_?.022:0);")
# dating: affection fades slower, and barely at all when she really likes you
r("let d=gf.status=='married'?-1:-3;","let d=gf.status=='married'?-1:gf.aff>=75?(R()<.5?0:-1):gf.aff>=50?-1:-2;")
r("const rnd=R()<(gf.status=='married'?.004:.015);","const rnd=R()<(gf.status=='married'?.004:gf.aff>=60?.006:.012);")
# college: 13 weeks, 12 games, one bye week for every team (old saves keep the schedule they already have)
r("W=Array.from({length:12},()=>[]),played=new Set()","W=Array.from({length:13},()=>[]),played=new Set()")
r("rr(L).slice(0,9).forEach((rd,k)=>rd.forEach(([a,b])=>{if(a>=0&&b>=0){W[3+k].push([a,b]);","rr(L).slice(0,9).forEach((rd,k)=>rd.forEach(([a,b])=>{if(a>=0&&b>=0){W[[3,4,5,6,7,8,9,10,11,12].filter(x=>x!=cskW(L))[k]].push([a,b]);")
r("for(let w=0;w<12;w++){const bz=new Set(W[w].flat());","for(let w=0;w<13;w++){const bz=new Set(W[w].flat());")
r("if(wk>=0&&wk!=11){const x=W[wk];W[wk]=W[11];W[11]=x}","if(wk>=0&&wk!=12){const x=W[wk];W[wk]=W[12];W[12]=x}")
r("for(let w=0;w<12;w++){const busy=new Set(W[w].flat()),fr=T.map((t,i)=>i).filter(i=>!busy.has(i))","const gc=T.map(()=>0);W.forEach(wk=>wk.forEach(([a,b])=>{gc[a]++;gc[b]++}));const skw=T.map((t,i)=>cskW(byC[t.cf]||[i]));for(const w of [0,1,2,...[3,4,5,6,7,8,9,10,11,12].sort(()=>rs()-.5)]){const busy=new Set(W[w].flat()),fr=T.map((t,i)=>i).filter(i=>!busy.has(i)&&skw[i]!=w)")
r("for(let i=0;i<fr.length;i++){const a=fr[i];if(busy.has(a))continue;for(let j=i+1;j<fr.length;j++){const b=fr[j];if(busy.has(b)||T[a].cf==T[b].cf||played.has(pk(a,b)))continue;W[w].push([a,b]);busy.add(a);busy.add(b);played.add(pk(a,b));break}}}return W}","for(let i=0;i<fr.length;i++){const a=fr[i];if(busy.has(a)||gc[a]>=12)continue;for(let j=i+1;j<fr.length;j++){const b=fr[j];if(busy.has(b)||gc[b]>=12||T[a].cf==T[b].cf||played.has(pk(a,b)))continue;W[w].push([a,b]);busy.add(a);busy.add(b);played.add(pk(a,b));gc[a]++;gc[b]++;break}}}return W}")
r("if(S.wk<12){const p=S.csch[S.wk]","if(S.wk<S.csch.length){const p=S.csch[S.wk]")
r("crSnap();if(S.wk>=12)ccSetup()}","crSnap();if(S.wk>=(Array.isArray(S.csch)?S.csch.length:13))ccSetup()}")
r("(S.wk||0)>=12))return false;","(S.wk||0)>=(Array.isArray(S.csch)?S.csch.length:13)))return false;")
r("if((S.cch||[]).length&&(S.wk||0)>=12)","if((S.cch||[]).length&&(S.wk||0)>=(Array.isArray(S.csch)?S.csch.length:13))")
r("S.wk>=12?'Final regular season'","S.wk>=(Array.isArray(S.csch)?S.csch.length:13)?'Final regular season'")
# girlfriend in the stands on her team's bye week
r("g.hc=hcNow()?1:0;","g.hc=hcNow()?1:0;g.gfw=gfBye()?1:0;if(g.gfw){g.flash='❤️ '+S.gf.n.split(' ')[0]+' is in the stands today';g.ft=3}")
r("'. The alumni will get over it.')+'</p>':''}","'. The alumni will get over it.')+'</p>':''}${gfwRes(w)}")
# college cheerleaders: class year, graduation, some make a pro squad
r("S.gf={n:f.n,age:f.age,why:f.why,team:f.team,hc:f.hc,skc:f.skc,","S.gf={cls:S.stage=='col'?Math.min(4,Math.max(1,(f.age||19)-18)):0,n:f.n,age:f.age,why:f.why,team:f.team,hc:f.hc,skc:f.skc,")
r("function colNext(){injClear();","function colNext(){injClear();gfYear();")
r("S.py++;S.age=(S.age||22)+1;","S.py++;S.age=(S.age||22)+1;gfYear();")
r("${gf.n}</b>, ${gf.age} · ${gf.team} cheer squad</p>","${gf.n}</b>, ${gf.age} · ${gfTeamTxt(gf)}</p>")
# GOAT lists: counterpart names, no duplicates when the real-life player is in your league, career W-L records
for a,b in [("Patrick Mahomes|KC|3|3|2","Ricky MaClones|KC|3|3|2"),("Aaron Rodgers|GB, NYJ, PIT|1|1|4","Eric Rodney|GB, NYJ, PIT|1|1|4"),("Matthew Stafford|DET, LAR|1|0|1","Matty Gafford|DET, LAR|1|0|1"),("Lamar Jackson|BAL|0|0|2","Lamarcus Action|BAL|0|0|2"),("Josh Allen|BUF|0|0|1","Jarsh Fallon|BUF|0|0|1"),("Joe Burrow|CIN|0|0|0","Joseph Shiesty|CIN|0|0|0"),
 ("Patrick Mahomes|QB|KC|","Ricky MaClones|QB|KC|"),("Aaron Donald|DT|LAR|","Eric Donavan|DT|LAR|"),("Travis Kelce|TE|KC|","Tractor Swift|TE|KC|"),("Matthew Stafford|QB|DET, LAR|","Matty Gafford|QB|DET, LAR|")]:
  r(a,b)
r("B.push({n:S.name,pos:'QB',t:(S.utm||[tAb(S.T[0])]).join(', '),acc:accTxt(L.rings,L.sbm,L.mvp),p:cap({p:L.pts,top:L.top}),raw:L.pts,me:1});","B.push({n:S.name,pos:'QB',t:(S.utm||[tAb(S.T[0])]).join(', '),acc:accTxt(L.rings,L.sbm,L.mvp),p:cap({p:L.pts,top:L.top}),raw:L.pts,me:1,rec:myRec()});")
r("cpuPool().forEach(x=>{if(mode=='qb'&&x.pos!='QB')return;const v=cpuLeg(x);if(v.p>=cut)B.push({n:x.n,pos:x.pos,t:(x.tm||[]).join(', '),acc:accTxt(v.r,v.s,v.m,v.d),p:cap(v),raw:v.p,cpu:1})});","goatFix(B);cpuPool().forEach(x=>{if(mode=='qb'&&x.pos!='QB')return;const v=cpuLeg(x),ex=B.find(z=>!z.me&&!z.cpu&&z.n==x.n);if(ex){ex.cpu=1;if(cap(v)>ex.p){ex.p=cap(v);ex.raw=v.p;ex.acc=accTxt(v.r,v.s,v.m,v.d)}if(x.pos=='QB')ex.rec=cpuRecOf(x)||ex.rec;return}if(v.p>=cut)B.push({n:x.n,pos:x.pos,t:(x.tm||[]).join(', '),acc:accTxt(v.r,v.s,v.m,v.d),p:cap(v),raw:v.p,cpu:1,rec:x.pos=='QB'?cpuRecOf(x):''})});")
r("<br><small>${g.acc}</small>","<br><small>${g.acc}${g.rec?' · '+g.rec+' career record':''}</small>")
r("function grRec(a,b,s){if(!S||!s)return;","function grRec(a,b,s){if(!S||!s)return;qbWL(a,b,s);")
# high school honors in the locker room + division champions are tracked
r("m.position.set(7.95,3.6,-7.57);R3.add(m)}","m.position.set(7.95,3.6,-7.57);R3.add(m)}lrHon(R3);")
r("q.sort(cmp);S.rs={...S.ss};","q.sort(cmp);{const s0=[0,1,2,3,4].sort(cmp);if(s0[0]==0)S.aw.push('Year '+S.yr+': Division Champions')}S.rs={...S.ss};")
# prospects' ratings are on each level's own scale (like yours): seniors highest, the best college players in the 90s; pro number = rookie rating
r("const npxRating=(p,w)=>w.lv=='hs'?cl(Math.round(p.T-6-3*(4-w.y)+(p.gen?3:0)),45,95):w.lv=='col'?cl(Math.round(p.T+4-1.5*Math.max(0,w.toD)+(p.gen?2:0)),55,99):p.T;","const npxRating=(p,w)=>{const c=npxCol(p);return w.lv=='hs'?cl(Math.round(c[0]+6-[20,13,6,0][cl(w.y,1,4)-1]),40,97):w.lv=='col'?cl(Math.round(c[0]+(c[1]-c[0])*(cl(w.y,1,4)-1)/3+((p.dk||1)>1?3:0)),50,99):p.T};")
# college QB rooms: upperclassmen rate higher
r("return npxRoom(t,[{n:nm(),ovr:cl(o+Math.round(rs()*12-4),45,95),cls:2+(rs()*3|0)},{n:nm(),ovr:cl(o-3-Math.round(rs()*7),40,90),cls:1+(rs()*3|0)},{n:nm(),ovr:cl(o-8-Math.round(rs()*8),35,85),cls:1}].sort((a,b)=>b.ovr-a.ovr))","const c1=2+(rs()*3|0),c2=1+(rs()*3|0);return npxRoom(t,[{n:nm(),ovr:cl(o+Math.round(rs()*12-4)+(c1-3)*3,45,97),cls:c1},{n:nm(),ovr:cl(o-3-Math.round(rs()*7)+(c2-2)*3,40,92),cls:c2},{n:nm(),ovr:cl(o-10-Math.round(rs()*8),35,85),cls:1}].sort((a,b)=>b.ovr-a.ovr))")
# redshirts: coaches can redshirt you (and you can say no); extra season of eligibility; offers say when a redshirt is planned
r("hcHub();if(S&&S.fmsg&&S.stage!='pro'){","hcHub();setTimeout(()=>{try{if(S&&S.stage=='col'&&ui.style.display!='none'&&!(OV_open()))rsChk()}catch(e){}},60);if(S&&S.fmsg&&S.stage!='pro'){")
r("R_=['Playing time: '+si.txt,","R_=['Playing time: '+si.txt+(si.pct<20?' Redshirt plan: the staff expects to redshirt you as a freshman, so you would keep all 4 seasons to play.':''),",2)
r("S.cy++;if(S.cy>4){S.cdone=1;save();return hub()}","rsYear();S.cy++;if(S.cy>(S.rsU?5:4)){S.cdone=1;save();return hub()}")
# Darnold Mansion is a redshirt junior when you are a college freshman (4th year in school)
r("['Darnold Mansion','QB','mia',77,14,0]","['Darnold Mansion','QB','mia',77,14,3]")
r("if(S&&S.npx)S.npx.forEach(p=>{if(p.n=='Jeremy Smothers'&&!p.jsF){p.off=2;p.jsF=1}});","if(S&&S.npx)S.npx.forEach(p=>{if(p.n=='Jeremy Smothers'&&!p.jsF){p.off=2;p.jsF=1}if(p.n=='Darnold Mansion'&&!p.dmF){if(!p.pro)p.off=3;p.rs=1;p.dmF=1}});")
r("${p.sch} · ${CLS[cl_-1]}","${p.sch} · ${p.rs&&cl_>=2?'RS '+CLS[cl_-2]:CLS[cl_-1]}")
