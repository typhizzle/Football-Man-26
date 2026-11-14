# ===================== V43: bug-fix batch 1 =====================
# names
for a,b in [("Pat MaClones","Ricky MaClones"),("Tomm Brodie","Tim Brody"),("Tom Brady","Tim Brody"),("T. Brady","T. Brody")]:h=h.replace(a,b)
h=h.replace("'Brady'","'Brody'")
# full names on the field labels (McCaffrey was cut to McCaffre)
r("((o.nm?o.nm.slice(0,8)+' ':'')+o.num)","((o.nm?o.nm.slice(0,11)+' ':'')+o.num)")
# chew clock: always follows the toggle (no more turning it off and on)
r("const sp=g.auto&&g.cr?4:1;g.pc-=dt*sp;if(g.cr)g.clk=Math.min(g.clk+dt*sp,g.pqe||QE());if(g.auto&&g.cr&&g.pc<=1.2",
  "const ch_=g.chew&&g.cr&&g.tk&&!g.am,sp=ch_?4:1;g.pc-=dt*sp;if(g.cr)g.clk=Math.min(g.clk+dt*sp,g.pqe||QE());if(ch_&&g.pc<=1.2")
# slingshot: a pull that started as a throw never turns into a slide; aim marker always clears
r("if(!aim)aim={id:e.pointerId,ox:x,oy:y,px:0,py:0,t:null,pts:[{x,y,t:performance.now()}]}});",
  "if(!aim){const P_=g.pl,q_=P_&&P_.qb;aim={id:e.pointerId,ox:x,oy:y,px:0,py:0,t:null,pts:[{x,y,t:performance.now()}],thr:!(P_&&P_.run&&P_.car===q_&&q_.y>g.los+.6)}}});")
r("cv.addEventListener('pointerup',e=>{if(swEnd(e))return;","cv.addEventListener('pointerup',e=>{if(swEnd(e)){if(aim&&e.pointerId==aim.id)aim=null;if(joy&&e.pointerId==joy.id)joy=null;if(lk&&e.pointerId==lk.id)lk=null;return}")
r("if(run){if(mg>35)mvmove(a.px,a.py);","if(run&&a.thr){g.flash='Past the line: no throw';g.ft=.8;return}if(run){if(mg>35)mvmove(a.px,a.py);")
# truck: each extra truck on a play works less often; the defender gets knocked back and down
r("if(c.mv>0&&c.mt=='truck'&&R()<(c===P.qb?.15+(S.q.trk||60)*.0045:.4)*(c.eff||1)){d.stun=.6;d.cd=1.1;return}",
  "if(c.mv>0&&c.mt=='truck'&&!c.trkU&&R()<(c===P.qb?.12+(S.q.trk||60)*.004:.34)*(c.eff||1)*Math.pow(.45,c.trkN||0)){c.trkN=(c.trkN||0)+1;c.trkU=1;const vl=Math.hypot(c.vx||0,c.vy||0)||1;d.x+=(c.vx||0)/vl*1.8;d.y+=(c.vy||0)/vl*1.8;d.stun=1.7;d.kd=1;d.kdr=Math.atan2(-(c.vx||0),c.vy||1);d.cd=2.2;g.sh=.35;g.flash='TRUCKED!';g.ft=.7;return}if(c.mv>0&&c.mt=='truck')c.trkU=1;")
r("function mvmove(px,py){const c=g.pl.car;if(c.mv>0||g.pl.t-(c.lm||-9)<1.4)return;","function mvmove(px,py){const c=g.pl.car;if(c.mv>0||g.pl.t-(c.lm||-9)<1.4)return;c.trkU=0;")
r("if(m.ar)artRst(m);\nif(v>.3){","if(m.ar)artRst(m);\nif(o.kd&&o.stun>0){m.rotation.y=o.kdr||0;m.rotation.x=1.45;m.position.y=.3;return}if(o.kd&&!(o.stun>0))o.kd=0;\nif(v>.3){")
# coach grade: running the ball counts (349 rush yards is not an F)
r("gsc=(st,w)=>{const at=Math.max(1,st.att-(st.drp||0));return cl(Math.round(50+(st.cmp/at-.55)*60+st.td*6+st.rtd*5-st.int*10-st.sk*2-st.fum*8+cl((st.yds/at-6)*3,-8,12)+cl(st.ry/12,-3,8)+(w?8:-4)),0,100)}",
  "gsc=(st,w)=>{const at=Math.max(1,st.att-(st.drp||0)),pw=cl(st.att/18,0,1);return cl(Math.round(50+((st.cmp/at-.55)*60+cl((st.yds/at-6)*3,-8,12))*pw+st.td*6+st.rtd*6-st.int*10-st.sk*2-st.fum*8+cl(st.ry/8,-4,32)+(w?8:-4)),0,100)}")
h=h.replace("V 0.0.0042","V 0.0.0043")
# ---------- batch 2: quick fixes ----------
# classic slant: two steps, then 45 degrees inside
r("slant:[[x,y+4],[x+s*9,y+12],[x+s*14,y+40]]","slant:[[x,y+2.5],[x+s*11,y+13],[x+s*19,y+21]]")
# receivers who finish a curl/hitch/stick sit in the window instead of drifting back behind the line
r("if(!p){if(w.hold||['run','qbrun','option'].includes(P.call.t)){w.vx=w.vy=0;return}const d=w.ld||[0,1],",
  "if(!p){if(w.hold||['run','qbrun','option'].includes(P.call.t)){w.vx=w.vy=0;return}const d=w.ld||[0,1];if(d[1]<.35&&w.y<g.los+3.5&&!P.passed){w.ld=[d[0]*.6,.8];}else if(d[1]<.35){w.vx=w.vy=0;return}const ")
h=h.replace("const ld||[0,1],","")
# pursuit: when you break free, defensive backs can still close the gap (like Retro Bowl)
r("mv(d,tx,ty,d.sp*(P.lane!=null&&P.car===P.rb?.9:1),dt)}","mv(d,tx,ty,d.sp*(P.lane!=null&&P.car===P.rb?.9:1)*(P.car&&P.car!==P.qb&&P.car.y-d.y>2&&P.car.y>g.los+8?1.13:1),dt)}")
# pause menu: injury report, grade counts runs, shuffle-plays option
r("<p>Coach grade this game: <b>${g.st.att>=3?","${injRep()}<p>Coach grade this game: <b>${g.st.att+(g.st.rc||0)>=3||g.st.ry>=20?")
r("function pause(){if(g.paused","function injRep(){try{const L=rost(g.sw?'h.'+g.oi:'h.0')||[],o=L.filter(p=>p&&p.inj);return '<p><small><b>Injury report:</b> '+(o.length?o.map(p=>p.n+' ('+p.pos+', '+(p.inj.w>=90?'out for season':'out '+p.inj.w+' wk')+')').join(', '):'nobody injured')+'</small></p>'}catch(e){return ''}}\nfunction shOrd(k){const n=PB[k].length,o=[...Array(n).keys()];if(!S.shuf)return o;const r_=rng(Math.floor(g.clk)*13+k.length+(g.dn||0));for(let i=n-1;i>0;i--){const j=Math.floor(r_()*(i+1));[o[i],o[j]]=[o[j],o[i]]}return o}\nfunction pause(){if(g.paused")
r("${PB[g.tab].map((p,i)=>card(g.tab,i,'pick')).join('')}","${shOrd(g.tab).map(i=>card(g.tab,i,'pick')).join('')}")
r("<button onclick=resume()>Resume</button>","<button onclick=resume()>Resume</button><button class=g onclick=\"S.shuf=!S.shuf;save();pm()\">Play order: ${S.shuf?'Shuffled':'Normal'}</button>")
# postgame talk: more lines, moods; teammates can be upset; opponents aren't all polite
r("talk('mate',o.n+' ('+o.pos+')',win?['We ate tonight!','That throw in the 3rd? Crazy.','Celebration at my place? Nah, film first.'][o.ri%3]:['We will get them next week.','Shake it off. I still got your back.','We left points out there. My fault too.'][o.ri%3],win?'happy':'sad',",
  "const mad_=!win&&R()<.3,ln_=win?['We ate tonight!','That throw in the 3rd? Crazy.','Celebration at my place? Nah, film first.',\"You're going pro one day, dude.\",'Can I get your autograph now before you get famous?','Not a bad game, but I felt like I could have been involved more.','Bro you were cooking out there.','Keep feeding me like that and we both get paid.'][R()*8|0]:mad_?[\"I was wide open ALL night. Throw me the ball.\",\"I can't do it all myself out there.\",\"Same thing every week. We need more reps for the guys who actually show up.\",\"That's on the offense. Don't look at me.\"][R()*4|0]:['We will get them next week.','Shake it off. I still got your back.','We left points out there. My fault too.','Film room tomorrow. We fix it.','Head up. One game.'][R()*5|0];talk('mate',o.n+' ('+o.pos+')',ln_,win?'happy':mad_?'angry':'sad',")
r("talk('mate',o.n+' · '+o.team,win?'Good game, man. You were tough to stop.':'Good game. You made us work for it.','smug',",
  "talk('mate',o.n+' · '+o.team,(win?['Good game, man. You were tough to stop.','Lucky. Real lucky.','Enjoy it. We see you next year.','Respect. Keep your eyes downfield, your feet were sloppy on that third down though.',\"Honestly? I hope I'm good enough to be your backup one day.\",'Refs gave you that one.']:['Good game. You made us work for it.','That all you got?','Tip: you stare down your first read. We knew where it was going.','Not bad. Not good either.',\"You're better than your stats said tonight. Keep going.\",'Easy money. Thanks for the W.'])[R()*6|0],win?'smug':'smug',")
# Jeremy Smothers: a junior when you're a high school freshman (old saves too)
r("['Jeremy Smothers','WR','osu',87,4,3,1]","['Jeremy Smothers','WR','osu',87,4,2,1]")
r("function npxEnsure(){if(!S||S.npx)return;","function npxEnsure(){if(S&&S.npx)S.npx.forEach(p=>{if(p.n=='Jeremy Smothers'&&!p.jsF){p.off=2;p.jsF=1}});if(!S||S.npx)return;")
# prospect rank: you have to earn #1 (picks hurt, awards count less, underclassmen start behind the top names)
r("function prospectRank(){const s=S.cs,pf=s.td*.5+s.yds/120+S.aw.length*6+(qo(S.q)-60)*1.5;return cl(Math.round(500*Math.exp(-(S.stars*.55+pf/25))),1,600)}",
  "function prospectRank(){const s=S.cs,yr=Math.min(S.yr||1,4),A=(S.aw||[]).join('|'),cnt=re=>(A.match(re)||[]).length,tal=.6*cl(((S.stars||1)-1)/4,0,1)+.4*cl((qo(S.q)-50)/40,0,1),st=cl((s.td*6+s.yds/25-(s.int||0)*12)/(400*Math.max(1,Math.min(yr,4)-.5)),0,1),awd=cl(cnt(/Player of the Year/g)*.35+cnt(/State Champ/g)*.3+cnt(/National Champ/g)*.35+cnt(/All-/g)*.08,0,1),t0=(S.T&&S.T[0])||{w:0,l:0},wp=(t0.w+t0.l)?t0.w/(t0.w+t0.l):.5,play=st*.4+awd*.4+wp*.2,tot=.6*tal+.4*play;return cl(Math.round(2500*Math.exp(-8*tot)*[1,1.5,1.25,1.1,1][yr]+((S.seed||1)*7+yr*3)%4),yr>=4?1:yr==3?2:3,3000)}")
h=h.replace("S.nr||prospectRank()","prospectRank()")
# ---------- high school grades, graduation, commitments, alumni ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m22.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("let L=S.ro[a];if(!L)L=S.ro[a]=genRo(a,t);proFill(a,t,L);","let L=S.ro[a];if(!L)L=S.ro[a]=genRo(a,t);proFill(a,t,L);try{hsGr(a,L);hsAlumIn(a,t,L)}catch(e){}")
r("S.hist.push({y:S.yr,...S.ss});const td=S.ss.td;S.yr++;","S.hist.push({y:S.yr,...S.ss});const td=S.ss.td;try{hsAge()}catch(e){}S.yr++;")
r("<small>${p.pos}${p.age&&!(i==0&&j==0)?\" · \"+p.age+\"y\":\"\"}</small>","<small>${p.pos}${p.age&&!(i==0&&j==0)?\" · \"+p.age+\"y\":\"\"}${hsOn()?hsTag(p):(S.stage=='col'&&p.cls?' · '+clsN[Math.min(4,p.cls)]+(p.al?' · your HS teammate':''):'')}</small>")
r("<h2>#${x.num} ${x.n}</h2>${x.inj?","<h2>#${x.num} ${x.n}</h2>${hsOn()&&x.gr?`<p>${clsN[x.gr]}${x.gr>=3?(x.cm?' · committed to '+x.cm:x.gr==4&&x.cm===null?' · no scholarship offers':' · uncommitted'):''}</p>`:''}${x.inj?")
# ---------- championship stadium + hype intro ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m23.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("startGame0(oi,kind);g.title=gTitle(kind);if(rv){g.rv=rv;g.title=(g.title?g.title+' · ':'')+'⚔️ '+rv.nm}}",
  "startGame0(oi,kind);g.title=gTitle(kind);if(rv){g.rv=rv;g.title=(g.title?g.title+' · ':'')+'⚔️ '+rv.nm}try{chStadium(/State Championship/.test(g.title||''));if(/Championship|Ultra Bowl/.test(g.title||''))hype()}catch(e){}}")
