# ===================== V42: backup QBs, injuries, recruiting names, POY race, scroll hint =====================
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m20.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# --- rosters: three QBs on pro teams, listed together; injury badges ---
r("yqRost(a,t,L);pkIns(a,t,L);uRost(a,t,L);","yqRost(a,t,L);pkIns(a,t,L);qbbEns(a,t,L);uRost(a,t,L);")
r("${L.map((p,j)=>`<div class=row style=\"gap:6px;font-size:17px;white-space:nowrap;cursor:pointer\" onclick=\"pCard(${i},${j})\"><span style=\"overflow:hidden;text-overflow:ellipsis;min-width:0\">#${p.num} ${p.n} <small>",
  "${rOrd(L).map(j=>[L[j],j]).map(([p,j])=>`<div class=row style=\"gap:6px;font-size:17px;white-space:nowrap;cursor:pointer\" onclick=\"pCard(${i},${j})\"><span style=\"overflow:hidden;text-overflow:ellipsis;min-width:0\">#${p.num} ${p.n}${injBadge(p)} <small>")
r("<h2>#${x.num} ${x.n}</h2>","<h2>#${x.num} ${x.n}</h2>${x.inj?`<p style=\"color:#ff6b6b\">🚑 ${x.inj.t} · ${x.inj.w>=90?'out for the season':'out '+x.inj.w+' more week'+(x.inj.w==1?'':'s')}</p>`:''}")
# season stats: games missed come off a player's line; QB2 picks up the starter's missed games
r("else v=sVals(g,x.ovr,gp,(SLF[k]||.4)*agF(x.age,g),r,x.rs);","else v=sVals(g,x.ovr,gp,(k==23?.03+cl(((i==0?S.injg:(L[0]&&L[0].gm))||0)/gp,0,1):(SLF[k]||.4))*agF(x.age,g),r,x.rs);if(x.gm>0)v=v.map(n=>Math.round(n*Math.max(0,gp-x.gm)/gp));")
# --- injuries: team strength, in-game subs, models ---
r("teff=t=>{const lv=t.dv?'pro':lvOf(t),m=LVM[lv];return m+","teff=t=>{const lv=t.dv?'pro':lvOf(t),m=LVM[lv];return injPen(t)+m+")
r("ap=(o,L,i)=>{o.nm=nn(L,i);o.num=L[i].num;if(L===LM&&!sw)o.ri=i}","ap=(o,L,i)=>{const x=injSub(L,i);o.nm=x.n.split(' ').pop().toUpperCase().slice(0,9);o.num=x.num;if(L===LM&&!sw&&x===L[i])o.ri=i}")
r("const mine=q&&!g.sw;","const mine=q&&!g.sw&&!g.injW;")
# live games: risk on every snap you take; after an injury you watch the backup or sim to the end
r("if(!g.ot&&g.cr)g.clk=Math.min(g.clk+8,P.qe||QE())}","if(!g.ot&&g.cr)g.clk=Math.min(g.clk+8,P.qe||QE());try{injLive(o,P)}catch(e){}}")
r("function pre(){g.pqe=QE();","function pre(){if(g.injP){injShow(pre);return}if(g.injW){injOwn();return}g.pqe=QE();")
r("function oppBall(){g.ph='opp';","function oppBall(){if(g.injP){injShow(oppBall);return}g.ph='opp';")
r("setup(1);const P=g.pl;","setup(W_.own?0:1);if(W_.own)injQB(g.pl.qb);const P=g.pl;")
r("function wFin(){","function wFin(){const own_=W_&&W_.own;")
r("buildEZ(g.mj.c1,g.oj.c1);ovHide();applyO()}","buildEZ(g.mj.c1,g.oj.c1);ovHide();own_?applyU():applyO()}")
r("if(s.opp)oppBall();else pre()}","if(S.inj&&S.inj.nw)g.injW=1;if(s.opp)oppBall();else pre()}")
# injured weeks: your games are simmed with the backup
r("function play(){LRNEXT=1;if(S.stage=='pro')return pplay();if(S.stage=='col')return cplay();const e=evt();","function play(){LRNEXT=1;if(S.stage=='pro')return pplay();if(S.stage=='col')return cplay();const e=evt();if(injOut()&&(e.t=='reg'||e.t=='po'||e.t=='bench'))return injG(e);")
r("function simUser(){LRNEXT=1;if(S.stage=='pro')return psim(pevt());if(S.stage=='col')return csim(cevt());const e=evt(),","function simUser(){LRNEXT=1;if(S.stage=='pro')return psim(pevt());if(S.stage=='col')return csim(cevt());if(injOut()){const e0=evt();if(e0.t=='reg'||e0.t=='po'||e0.t=='bench')return injG(e0)}const e=evt(),")
r("addStats(st,w,e.t=='po'||e.t=='cfp'||e.t=='cc');","addStats(st,w,e.t=='po'||e.t=='cfp'||e.t=='cc');const ij=injSimG();")
r("HM=`Simmed: ${w?'W':'L'} ${sg[0]}-${sg[1]}","HM=(ij||'')+`Simmed: ${w?'W':'L'} ${sg[0]}-${sg[1]}")
r("if(isStarter())return startGame(e.o,e.t=='reg'?'col':e.t);csim(e)}","if(isStarter()&&!injOut())return startGame(e.o,e.t=='reg'?'col':e.t);csim(e)}")
r("const T=S.T,st0=isStarter(),k=e.t=='reg'?'col':e.t,","const T=S.T,st0=isStarter()&&!injOut(),k=e.t=='reg'?'col':e.t,")
r("m=`${cmp}/${att}, ${yds} yds, ${st.td} TD, ${st.int} INT · grade ${gl(gr)}`}else{S.pts+=1;m='You sat; '","m=`${cmp}/${att}, ${yds} yds, ${st.td} TD, ${st.int} INT · grade ${gl(gr)}`+injSimG()}else{S.pts+=1;m=injOut()?'🚑 You sat out hurt. '+injLeft():'You sat; '")
r("if(pStarter())return startGame(e.o,e.t);psim(e)}","if(pStarter()&&!injOut())return startGame(e.o,e.t);psim(e)}")
r("const T=S.T,st0=pStarter(),k=e.t,","const T=S.T,st0=pStarter()&&!injOut(),k=e.t,")
r("m=`${cmp}/${att}, ${yds} yds, ${st.td} TD, ${st.int} INT · grade ${gl(gr)}`}else{S.pts+=1;m='You sat behind '","m=`${cmp}/${att}, ${yds} yds, ${st.td} TD, ${st.int} INT · grade ${gl(gr)}`+injSimG()}else{S.pts+=1;m=injOut()?'🚑 You sat out hurt. '+injLeft():'You sat behind '")
# a week goes by (regular season and every playoff round)
r("S.wk++;addOffers();if(S.wk>=7)setupPO()}","S.wk++;injTick();addOffers();if(S.wk>=7)setupPO()}")
r("S.wk++;if(S.wk>=12)ccSetup()}","S.wk++;injTick();if(S.wk>=12)ccSetup()}")
r("regainWk();S.wk++;if(S.wk>=18)ppSetup()}","regainWk();injTick();S.wk++;if(S.wk>=18)ppSetup()}")
r("function adv(uw){","function adv(uw){injTick();")
r("function cfpAdv(uw){","function cfpAdv(uw){injTick();")
r("function ppAdv(uw){","function ppAdv(uw){injTick();")
r("if(k=='cc'){","if(k=='cc'){injTick();")
# offseason heals
r("function nextYr(){ceilAdj();","function nextYr(){injClear();ceilAdj();")
r("function colNext(){","function colNext(){injClear();")
r("function pNext(){","function pNext(){injClear();")
r("function enroll(n){","function enroll(n){injClear();")
r("function proStart(ti,pk){try{uHistAll()}catch(e){}","function proStart(ti,pk){injClear();try{uHistAll()}catch(e){}")
# hubs show your injury
r("HM2=HM;","HM2=injTag(HM);")
r("st=isStarter(),H2=HM;HM='';","st=isStarter(),H2=injTag(HM);HM='';")
r("H2=HM,c=tc()","H2=injTag(HM),c=tc()")
r(":'Play game'}</button>${e.t=='reg'||e.t=='po'?'<button class=g onclick=simUser()>Sim this game</button>':''}",":injOut()&&e.t!='bye'&&e.t!='sum'&&e.t!='comp'?'🚑 Sim game (you are hurt)':'Play game'}</button>${(e.t=='reg'||e.t=='po')&&!injOut()?'<button class=g onclick=simUser()>Sim this game</button>':''}")
# --- State Player of the Year race: no duplicate names ---
r("L.push({n:FN[i%6]+' '+LN[(i*5)%6]+' ('+T[i].n.split(' ')[0]+')'","L.push({n:poyN(i)+' ('+T[i].n.split(' ')[0]+')'")
# --- scroll hint: never over the locker room or a game ---
r("const show=ui.style.display!='none'&&","const show=ui.style.display!='none'&&!(typeof LR!='undefined'&&LR)&&cv.style.display!='block'&&")
r("V 0.0.0041</small>","V 0.0.0042</small>",2)
# --- slingshot: how much it helps you hit a receiver depends on your accuracy ---
r("if(Math.hypot(ex-t0,ey-t1)<7){t0=t0*.3+ex*.7;t1=t1*.3+ey*.7}","{const aF=accF(),rr_=4+aF*5,bl=.5+aF*.38;if(Math.hypot(ex-t0,ey-t1)<rr_){t0=t0*(1-bl)+ex*bl;t1=t1*(1-bl)+ey*bl}}")
# --- flick throws: the QB winds up while you swipe; curved flicks bend the ball's flight ---
h=h.replace("a.x0+(a.lx-a.x0)*f","afx(a,f)").replace("a.y0+(a.ly-a.y0)*f","afy(a,f)")
r("pl=mg>=14&&P.car===o&&!P.air?Math.min(1,mg/(Math.min(W,H)*SLL)):0","pl=swp&&P.car===o&&!P.air?Math.min(1,swpL()/(Math.min(W,H)*.12)):mg>=14&&P.car===o&&!P.air?Math.min(1,mg/(Math.min(W,H)*SLL)):0")
r("mg=aim&&has?Math.min(1,Math.hypot(aim.px,aim.py)/(Math.min(W,H)*SLL)):0","mg=swp&&has?Math.min(1,swpL()/(Math.min(W,H)*.12)):aim&&has?Math.min(1,Math.hypot(aim.px,aim.py)/(Math.min(W,H)*SLL)):0")
h=h.replace("Math.sin(Math.PI*f)*Math.min(6,a.T*5)","Math.sin(Math.PI*f)*Math.min(6,a.T*5)*(a.hz||1)")
# ===================== watch mode and kicks =====================
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m21.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(o.mv>0&&car){if(o.mt=='spin')","kPose(o,m);if(o.mv>0&&car){if(o.mt=='spin')")
r("W_.t+=dt;const t=W_.t;upd(dt);","W_.t+=dt;const t=W_.t;if(k=='fg'||k=='punt')return wKick(P,e,t,dt);const wq=wConvPre(P);upd(dt);wConvPost(P,e,dt,wq);")
r("if(P.car===P.rb){P.rb.sp=Math.max(P.rb0,(Math.max(e.gn,2)+3)/3.2);if(e.gn<=0&&t>1.8){P.car.y=P.endY;wEnd('Run for '+e.gn,'tk')}else if(P.car.y>=P.endY-.3||t>7)",
  "if(P.car===P.rb){if(!P.wSlow)P.rb.sp=Math.max(P.rb0,(Math.max(e.gn,2)+3)/3.2);if(P.car.y>=P.endY-.3||t>7)")
r("P.tkr=[...P.def].sort((a,b)=>Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y))[0];g.sh=k=='sk'?.5:.2}","P.tkr=P.wTk||[...P.def].sort((a,b)=>Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y))[0];g.sh=k=='sk'?.5:.2}")
r("const db=[...P.db,...P.lb].sort((x,y)=>Math.hypot(x.x-a.lx,x.y-a.ly)-Math.hypot(y.x-a.lx,y.y-a.ly))[0];","const db=P.wInt||[...P.db,...P.lb].sort((x,y)=>Math.hypot(x.x-a.lx,x.y-a.ly)-Math.hypot(y.x-a.lx,y.y-a.ly))[0];")
r("if(P.car===P.wr[P.ti]&&P.car.y>=P.endY-.3)wEnd(","if(P.car===P.wr[P.ti]&&(P.car.y>=P.endY-.3||t>10))wEnd(")
