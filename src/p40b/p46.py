# ===== V46: real college careers for the named prospects =====
h=h.replace("V 0.0.0045","V 0.0.0046")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m33.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# real classes when you are a college freshman (2026)
for a,b in [("['Watchu BiSayin','QB','osu',75,10,1]","['Watchu BiSayin','QB','osu',75,10,2]"),
            ("['Kashon Tripdub','QB','bama',70,2,0]","['Kashon Tripdub','QB','bama',70,2,1]"),
            ("['Jordan Tua','QB','usc',70,13,2]","['Jordan Tua','QB','usc',70,13,3]"),
            ("['Jarvis Hooters','QB','ind',69,7,2]","['Jarvis Hooters','QB','ind',69,7,3]"),
            ("['Dill Rolley','QB','ore',75,9,1]","['Dill Rolley','QB','ore',75,9,2]"),
            ("['Ham Leaver','QB','lsu',68,18,2]","['Ham Leaver','QB','lsu',68,18,3]")]:
    r(a,b)
r("if(S&&S.npx&&S.npv!==NPX0.length){npxFix();S.npv=NPX0.length}","if(S&&S.npx&&S.npv!==NPX0.length){npxFix();S.npv=NPX0.length}npxReal();")
# labels + real stat lines
r("${p.sch} · ${p.rs&&cl_>=2?'RS '+CLS[cl_-2]:CLS[cl_-1]}","${p.sch} · ${npxCls(p,cl_)}")
r("<br><small>${where}</small></span><b style=\"flex:none\">${lab}</b>","<br><small>${where}</small>${npxRealTxt(p)}</span><b style=\"flex:none\">${lab}</b>")
r("${x.p.pos} · ${clsN[Math.min(4,x.w.y)]}</small>","${x.p.pos} · ${npxCls(x.p,Math.min(4,x.w.y))}</small>")
# recruiting stars set how far a prospect climbs from freshman to senior year
r("return[sr-(p.gen?14:15),sr]}","const st_=(NPXR[p.n]||{}).st;return[sr-(p.gen?14:st_==5?12:st_==4?15:st_==3?17:st_===0?20:15),sr]}")
# Jade Ball = Jadan Baugh, Florida running back
r("['Jade Ball','QB','mia',73,12,2]","['Jade Ball','RB','fla',73,12,2]")
r("ou:['Oklahoma Laters','Oklahoma','Oklahoma']};","ou:['Oklahoma Laters','Oklahoma','Oklahoma'],fla:['Florida Haters','Florida','Florida']};")
# Wun-in-da Chamba = Trinidad Chambliss, Ole Miss
r("['Wun-in-da Chamba','QB','mich',81,6,3]","['Wun-in-da Chamba','QB','ole',81,6,3]")
# ===== Heisman watch + rankings next to college team names =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m34.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("' vs '+T[e.o].n+' (team '","' vs '+tnr(T[e.o])+' (team '")
r("${i==0?'▶ ':''}${T[i].n}</span><small>${T[i].cw}","${i==0?'▶ ':''}${nmr(T[i])}</span><small>${T[i].cw}")
r("${i==0?'▶ ':''}${tn(T[i])}</span>","${i==0?'▶ ':''}${tnr(T[i])}</span>",2)
r("<h2>${tn(T[i])}</h2>","<h2>${tnr(T[i])}</h2>")
r("<h2>${tn(t)} roster</h2>","<h2>${S.T&&S.T.includes(t)?tnr(t):tn(t)} roster</h2>")
r("S.T[e.o].n:'your next opponent'","nmr(S.T[e.o]):'your next opponent'")
r("<p>${g.m.n} vs ${g.o.n}</p>","<p>${(g.rkm?'#'+g.rkm+' ':'')+g.m.n} vs ${(g.rko?'#'+g.rko+' ':'')+g.o.n}</p>")
r("${ab(g.m)} ${g.s[0]}","${g.rkm?'<small>#'+g.rkm+'</small> ':''}${ab(g.m)} ${g.s[0]}",2)
r("${g.s[1]} ${ab(g.o)}","${g.s[1]} ${g.rko?'<small>#'+g.rko+'</small> ':''}${ab(g.o)}",2)
r("startGame0(oi,kind);g.title=gTitle(kind);","startGame0(oi,kind);g.title=gTitle(kind);if((S.stage||'hs')=='col'){g.rkm=crNo(0);g.rko=crNo(oi);const cm_=crMatch(oi);if(cm_)g.title=(g.title?g.title+' · ':'')+cm_}")
r("S.wk++;injTick();crSnap();","S.wk++;injTick();crSnap();hwSnap();")
r("<button onclick=crV()>🏆 Top 25 & playoff picture</button>","<button onclick=crV()>🏆 Top 25 & playoff picture</button><button onclick=hwV()>🏅 Heisman watch</button>")
r("${i==0?'▶ ':''}${T[i].n}</span><small>${T[i].w}-${T[i].l}</small></div>`).join('')}${my>12?","${i==0?'▶ ':''}${T[i].n}</span><small>${T[i].w}-${T[i].l}</small></div>`).join('')}${my>12?")
# GSPN: opponent and your team carry their ranking in college headlines
r("T:gpTN(),O:e.o,RO:(e.rk?'No. '+e.rk+' ':'')+e.o,","T:(e.mrk&&e.mrk<=25?'#'+e.mrk+' ':'')+gpTN(),O:(e.rk?'#'+e.rk+' ':'')+e.o,RO:(e.rk?'No. '+e.rk+' ':'')+e.o,")
r("vs ${o==0?'<b>'+tn(T[o])+'</b>':tn(T[o])}","vs ${o==0?'<b>'+tnr(T[o])+'</b>':tnr(T[o])}")
r("<span>Postseason · vs ${tn(T[o])}</span>","<span>Postseason · vs ${tnr(T[o])}</span>")
r("${RN[k]||'Playoffs'} · vs ${tn(T[o])}","${RN[k]||'Playoffs'} · vs ${tnr(T[o])}")
r("<h2>📅 ${tn(T[i])}</h2>","<h2>📅 ${tnr(T[i])}</h2>")
r("${me?'▶ ':''}${tn(T[a])} <small>${T[a].ovr}</small> vs ${tn(T[b])}","${me?'▶ ':''}${tnr(T[a])} <small>${T[a].ovr}</small> vs ${tnr(T[b])}")
# Marshawn Redd (Marcel Reed), Texas A&M, RS Jr, #10, mobile: 83 now, 71 as a pro rookie, usually returns for his senior year
r("['Ham Leaver','QB','lsu',68,18,3]","['Ham Leaver','QB','lsu',68,18,3],['Marshawn Redd','QB','tamu',71,10,3]")
r("fla:['Florida Haters','Florida','Florida']};","fla:['Florida Haters','Florida','Florida'],tamu:['Texas A&M Lackies','Texas','Texas A&M']};")
r("'Bruce Undertree':[70,85,86]};","'Bruce Undertree':[70,85,86],'Marshawn Redd':[72,83,83]};")
r("if(!force&&k<2&&!p.gen&&cls<3&&npxRnd(p,k,1)<[.45,.35,.25][cls]*(p.T>=82?.5:1)){p.dk=k+1;const yrs=['freshman','sophomore','junior','senior'][Math.min(3,cls+1)];if(npxRnd(p,k,2)<.35){",
  "if(!force&&k<2&&!p.gen&&((cls<3&&npxRnd(p,k,1)<[.45,.35,.25][cls]*(p.T>=82?.5:1))||(cls>=3&&npxRnd(p,k,1)<npxRet(p)))){p.dk=k+1;const yrs=['freshman','sophomore','junior','senior'][Math.min(3,cls+1)];if(!npxRet(p)&&npxRnd(p,k,2)<.35){")
# ===== playoff bowls + trophy case =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m35.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("startGame0(oi,kind);g.title=gTitle(kind);if((S.stage||'hs')=='col'){","startGame0(oi,kind);g.title=gTitle(kind);if(kind=='cfp'&&(S.stage||'hs')=='col'){g.bw=bwCur();if(g.bw){const b_=BWL[g.bw];g.title=b_.ic+' '+b_.n+' · '+(S.cb.r==3?'National Championship':'CFP '+CRN[S.cb.r]);0}}if((S.stage||'hs')=='col'){")
r("if(g.clk>=1800&&!g.half){g.half=1;g.to=[3,3];ovShow(","if(g.clk>=1800&&!g.half){g.half=1;g.to=[3,3];if(bwHalf(w))return 1;ovShow(")
r("onclick=post()>Continue</button>`);if(g.w&&/Championship|Ultra Bowl/.test(g.title||''))fieldWalk(1)}","onclick=post()>Continue</button>`);if(bwPost(w))return;if(g.w&&/Championship|Ultra Bowl/.test(g.title||''))fieldWalk(1)}")
r("function hudU(){if(!g||!g.st||!g.s)return;","function hudU(){if(!g||!g.st||!g.s)return;try{bwTick()}catch(e){}")
r("if(k=='cfp'){cfpAdv(w);return}","if(k=='cfp'){bwRec(w);cfpAdv(w);return}")
r("cdone(w,k);HM=`${w?'W':'L'} ${sg[0]}-${sg[1]} · ${m} `","const bwT_=k=='cfp'?bwSimTxt(w):'';cdone(w,k);HM=bwT_+`${w?'W':'L'} ${sg[0]}-${sg[1]} · ${m} `")
r("cfp:'CFP '+(S.cb?CRN[S.cb.r]:'')","cfp:(bwCur()?bwNm(bwCur())+' · ':'')+'CFP '+(S.cb?CRN[S.cb.r]:'')")
r("<button class=g onclick=gpV()>📺 GSPN","<button class=g onclick=trophyV()>🏆 Trophy case</button><button class=g onclick=gpV()>📺 GSPN",5)
_i=h.find('function cfpSvg');_a='style="width:100%;height:auto;margin-top:6px">${s}</svg></div>`}';_j=h.find(_a,_i);assert 0<_j-_i<4000
h=h[:_j]+'style="width:100%;height:auto;margin-top:6px">${s}</svg>${bwList()}</div>`}'+h[_j+len(_a):]
# ===== punt returns + receivers working open =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m36.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(t>=o.tk){gun.forEach(w=>{if(!r)return;","if(t>=o.tk){prCov(P,o,r,t,dt);gun.forEach(w=>{if(!r||o.dec==2)return;if(w.prE>0){w.prE-=dt;w.vx*=.5;w.vy*=.5;return}")
_a="if(o.dec==2&&r){const go=t-o.rs;if(r.y>o.y1+.2&&go<6){r.vy=-7.6;r.vx=Math.sin(go*2.2)*2.2;r.y+=r.vy*dt;r.x=cl(r.x+r.vx*dt,2,51.3);P.wb=[r.x-26.5+.3,1.2,-r.y]}"
_i=h.find(_a);assert _i>0 and h.count(_a)==1
_j=h.find("if(o.dec&&o.dec!=2&&t>o.rs+.9)end=true;",_i);assert 0<_j-_i<1500
h=h[:_i]+"if(o.dec==2&&r){prRet(P,o,r,t,dt);P.wb=o.dn?[r.x-26.5+.3,.6,-r.y]:[r.x-26.5+.3,1.2,-r.y];if(o.pe){msg=o.pe;o.pe=null}}\n   "+h[_j:]
r("if(K.pt){const y=g.y+K.net-((K.o&&K.o.rety)||0);","if(K.pt){if(K.o&&K.o.td){g.s[1]+=7;try{spChk('Punt return TD')}catch(e){}g.y=25;g.dn=1;g.tg=10;g.note='Punt returned for a touchdown. '+g.o.n+' score.';if(chk(0))return;gsnap();save();return pre()}const y=g.y+K.net-((K.o&&K.o.rety)||0);")
r("const d=w.ld||[0,1];if(d[1]<.35&&w.y<g.los+3.5&&!P.passed){w.ld=[d[0]*.6,.8];}const nx=w.x+d[0]*4,ny=w.y+d[1]*4;if(d[1]<-.3||nx<2||nx>51.3||ny>106){const s=openSpot(w,P);tx=s[0];ty=s[1];sp=w.sp*.7}else{tx=nx;ty=ny}",
  "if(w.sct==null)w.sct=P.t;const d=w.ld||[0,1];if(d[1]<.35&&w.y<g.los+3.5&&!P.passed){w.ld=[d[0]*.6,.8];}const nx=w.x+d[0]*4,ny=w.y+d[1]*4,ob_=d[1]<-.3||nx<2||nx>51.3||ny>106;if(P.passed||(P.t-w.sct<.6&&!ob_)){if(ob_){const s=openSpot(w,P);tx=s[0];ty=s[1];sp=w.sp*.7}else{tx=nx;ty=ny}}else{const s=scrSpot(w,P);tx=s[0];ty=s[1];sp=w.sp*.85;if(Math.hypot(tx-w.x,ty-w.y)<.5){w.vx=w.vy=0;return}}")
r("function mv(o,tx,ty,s,dt){const dx=tx-o.x,dy=ty-o.y,d=Math.hypot(dx,dy);if(d<.02){o.vx=o.vy=0;return}const k=Math.min(d,s*dt);o.x+=dx/d*k;o.y+=dy/d*k;o.vx=dx/d*s;o.vy=dy/d*s}",
  "function mv(o,tx,ty,s,dt){const dx=tx-o.x,dy=ty-o.y,d=Math.hypot(dx,dy);if(d<.02){o.vx=o.vy=0;return}const k=Math.min(d,s*dt),sv=dt>0?k/dt:s;o.x+=dx/d*k;o.y+=dy/d*k;o.vx=dx/d*sv;o.vy=dy/d*sv}")
r("kk.x=26.5;kk.y=o.hy;o.tk=.85;o.Tf=2.05;","kk.x=26.5;kk.y=o.hy;o.tk=.85;o.Tf=3.4+R()*.9;")
# ===== your stats: season card, leaderboard spot, season-by-season table =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m37.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("${gsH()}${lrInfo()}","${gsH()}${lrInfo()}${myCard()}",2)
r("${S.gsave?gsH():''}${lrInfo()}","${S.gsave?gsH():''}${lrInfo()}${myCard()}")
r("${[...D[k]].sort((x,y)=>y.a-x.a).slice(0,5).map((x,i)=>lr(x,i,k)).join('')}","${(()=>{const s_=[...D[k]].sort((x,y)=>y.a-x.a),mi=s_.findIndex(x=>x.me);return s_.slice(0,5).map((x,i)=>lr(x,i,k)).join('')+(mi>=5?'<div style=\"opacity:.6;text-align:center\">⋮</div>'+lr(s_[mi],mi,k):'')})()}")
r("S.hist.push({y:S.yr,...S.ss});","(S.htm=S.htm||[])[S.hist.length]=S.T[0].n;S.hist.push({y:S.yr,...S.ss});")
r("S.hist.push({y:'C'+S.cy,...S.ss});","(S.htm=S.htm||[])[S.hist.length]=S.T[0].n;S.hist.push({y:'C'+S.cy,...S.ss});",2)
r("S.hist.push({y:'P'+S.py,...S.ss});","(S.htm=S.htm||[])[S.hist.length]=tn(S.T[0]);S.hist.push({y:'P'+S.py,...S.ss});",2)
# ===== dating: starts at 30-40% (50-60% if she already liked you), activities give less, gains slow down as it gets serious =====
r("team:f.team,hc:f.hc,skc:f.skc,aff:55+ri(0,15),","team:f.team,hc:f.hc,skc:f.skc,aff:relFit(f.why)>=15?50+ri(0,10):30+ri(0,10),af2:1,")
r("let d=gf.status=='married'?-1:gf.aff>=75?(R()<.5?0:-1):gf.aff>=50?-1:-2;","let d=gf.status=='married'?-1:gf.aff>=75?(R()<.5?0:-1):gf.aff>=50?-1:(gf.wks<=4?0:-1);")
r("gf.aff=cl(gf.aff+2,0,100)}ovHide();save();if(LR)lrStat();return}","gf.aff=cl(gf.aff+relG(1),0,100)}ovHide();save();if(LR)lrStat();return}")
r("gf.dw=k;gf.aff=cl(gf.aff+8,0,100);","gf.dw=k;gf.aff=cl(gf.aff+relG(3),0,100);")
r("else{S.cash-=relCost('gift');gf.aff=cl(gf.aff+5,0,100);m='She loved it. (+5)'}","else if(gf.gw==k)m='You already got her something this week.';else{S.cash-=relCost('gift');gf.gw=k;const n_=relG(3);gf.aff=cl(gf.aff+n_,0,100);m='She loved it. (+'+n_+')'}")
r("else{gf.tw=k;gf.aff=cl(gf.aff+4,0,100);m='A quiet night in, phones down. (+4)'}","else{gf.tw=k;const n_=relG(2);gf.aff=cl(gf.aff+n_,0,100);m='A quiet night in, phones down. (+'+n_+')'}")
r("S.gf.aff=cl((S.gf.aff||50)+(w?4:2),0,100)}return '<p>❤️ '+S.gf.n.split(' ')[0]+' came to watch you (her team had a bye this week). Affection +'+(w?4:2)+'</p>'}","S.gf.aff=cl((S.gf.aff||50)+(g.gfwN=relG(w?2:1)),0,100)}return '<p>❤️ '+S.gf.n.split(' ')[0]+' came to watch you (her team had a bye this week). Affection +'+(g.gfwN||1)+'</p>'}")
r("function mig(s){s=confMig(s);","function mig(s){try{relFix(s)}catch(e){}s=confMig(s);")
# ===== GSPN network =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m38.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(e.p)C.segs.push(gpFR(e,v));","if(e.p)C.segs.push(gpFR(e,v));try{C.segs.push(gpX(e,v))}catch(_){}")
r("['op','Opinions'],","['wd','World'],['op','Opinions'],")
r("else if(GPTAB=='bd')body=gpBoardH();","else if(GPTAB=='wd')body=gpWorldH();else if(GPTAB=='bd')body=gpBoardH()+((S.stage||'hs')=='hs'?gp100H():'');")
# conference title game: top two conference records, head-to-head breaks ties, then the rankings
r("Object.values(byC).forEach(L=>{const s=[...L].sort((a,b)=>k(b)-k(a));","Object.values(byC).forEach(L=>{let C_=null;try{CRC=null;C_=crCalc()}catch(e){}const cr=i=>(T[i].cw||0)-(T[i].cl||0),h2=(a,b)=>C_&&C_.gl[a]?C_.gl[a].some(x=>x.o==b&&x.w):false,s=[...L].sort((a,b)=>cr(b)-cr(a)||(h2(a,b)&&!h2(b,a)?-1:h2(b,a)&&!h2(a,b)?1:0)||(C_?C_.pos[a]-C_.pos[b]:k(b)-k(a)));")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m39.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function mig(s){try{relFix(s)}catch(e){}","function mig(s){try{relFix(s)}catch(e){}s=calFix(s);")
# ===== coverage: man defenders keep up (only speed/route-running beats them), corners carry their man in zone too, the spy attacks =====
r("else if(d.spy){tx=P.qb.x;ty=Math.max(g.los+1.2,P.qb.y+4.5)}","else if(d.spy){const q_=P.qb,dd_=Math.hypot(q_.x-d.x,q_.y-d.y);if(P.car===q_&&(dd_<3.5||q_.y>g.los-.3||Math.abs(q_.x-26.5)>5.5)){tx=q_.x+(q_.vx||0)*.25;ty=q_.y+(q_.vy||0)*.25;d.cbB=1.08}else{tx=q_.x;ty=Math.max(g.los+1.2,q_.y+4.5)}}")
r("ty=d.w.y+(d.w.vy||0)*.3+1.7;d.cbB=Math.hypot(tx-d.x,ty-d.y)>2.5}","ty=d.w.y+(d.w.vy||0)*.3+(d.zc||1.2);{const sep_=Math.hypot(tx-d.x,ty-d.y);d.cbB=sep_>1.2?Math.max(1.1,((d.w.sp||8)-cl(((d.w.elu||70)-(d.cov||70))/60,-.3,.6))/d.sp):0}}")
r("d.sp*(d.cbB&&!P.run?1.1:1)","d.sp*(d.cbB&&!P.run?d.cbB:1)")
r("P.lb=[[16,'OLB',50,P.wr[3]],","if(!mz&&dc!='prevent')P.db.slice(0,2).forEach(d=>{d.w=d.w||P.wr[P.db.indexOf(d)];d.zc=2.6});P.lb=[[16,'OLB',50,P.wr[3]],")
# ===== form + development =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m40.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(!g.iwF)(S.gs=S.gs||[]).push(gsc_);","if(!g.iwF){(S.gs=S.gs||[]).push(gsc_);userForm2(gsc_,w)}")
r("const gr=Math.max(0,gsc(st,w)-4);S.gs.push(gr);","const gr=Math.max(0,gsc(st,w)-4);S.gs.push(gr);userForm2(gr,w);",2)
r("else if(x.ovr<100){let g=a<23?ri(1,4):a<26?ri(0,3):a<29?ri(-1,2):ri(-1,1);","else if(x.ovr<100){const gp_=Math.max(0,top()-x.ovr);let g=a<23?(gp_>=10?ri(2,5):gp_>=5?ri(1,3):ri(0,2)):a<26?(gp_>=8?ri(1,4):gp_>=3?ri(1,2):ri(0,1)):a<29?ri(-1,2):ri(-1,1);if(x.ovr>=90&&g>1)g--;")
r("if(!rg&&x.ovr<100&&wins<=5&&R()<.6){","x.sfl=0;x.sfg=0;if(!rg&&x.ovr<100&&a>=26&&wins<=3&&R()<.6){")
# coach lets you sit when the game is really over
r("function subReq(){const d=g.s[0]-g.s[1],ok=(d>=21&&g.clk>=2700)||(d<=-35&&g.clk>=1800);","function subReq(){const d=g.s[0]-g.s[1],rem=3600-g.clk,q4=g.clk>=2700,ok=(q4&&d>=25&&rem<=300)||(q4&&d>=17&&rem<=180)||(d>=34&&g.clk>=2580)||(d>=50&&g.clk>=1800)||(d<=-35&&g.clk>=1800);")
r("S.trust=cl((S.trust||50)+(d>0?2:-3),0,100);simRest();","S.trust=cl((S.trust||50)+(d>0?2:-3),0,100);if(d>0){const k_=(S.stage||'hs')+yrN();if(S.ssubk!=k_){S.ssubk=k_;S.ssub=0}S.ssub=(S.ssub||0)+1}simRest();")
r("vs ${o==0?'<b>'+tnr(T[o])+'</b>':tnr(T[o])}","vs ${o==0?'<b>'+tnrW(o,w,past)+'</b>':tnrW(o,w,past)}")
r("<span>Wk ${x.wk+1} ${x.w?'W':'L'} ${x.s[0]}–${x.s[1]} vs ${C.pos[x.o]<=25?'#'+C.pos[x.o]+' ':''}${T[x.o].n}</span>","<span>Wk ${x.wk+1} ${x.w?'W':'L'} ${x.s[0]}–${x.s[1]} vs ${crAt(x.o,x.wk)?'#'+crAt(x.o,x.wk)+' ':''}${T[x.o].n}</span>")
# money always visible
r("e.innerHTML=`Coach trust ${S.trust||50} · Teammates ${S.tt||50}<br>Fans ${fans(S.pop||40).toLocaleString()}","e.innerHTML=`💵 $${(S.cash||0).toLocaleString()}<br>Coach trust ${S.trust||50} · Teammates ${S.tt||50}<br>Fans ${fans(S.pop||40).toLocaleString()}")
h=h.replace('<h2>${S.name} #${S.num} · QB ${qo(Q)}</h2>','<h2>${S.name} #${S.num} · QB ${qo(Q)}</h2><div style="font-weight:700;color:#7bed9f;margin:-4px 0 4px">💵 $${(S.cash||0).toLocaleString()}</div>')
# 8 conference games + 4 non-conference (from next season's schedule on)
r("Object.values(byC).forEach(L=>rr(L).slice(0,9).forEach((rd,k)=>","Object.values(byC).forEach(L=>rr(L).slice(0,L.length%2?9:8).forEach((rd,k)=>")
r("function colSched(){const T=S.T,","function colSched(){const cc_={},T=S.T,")
r("rd.forEach(([a,b])=>{if(a>=0&&b>=0){W[","rd.forEach(([a,b])=>{if(a>=0&&b>=0&&(cc_[a]||0)<8&&(cc_[b]||0)<8){cc_[a]=(cc_[a]||0)+1;cc_[b]=(cc_[b]||0)+1;W[")
r("rvPairs().forEach(([a,b])=>{if(played.has(pk(a,b)))return;","rvPairs().forEach(([a,b])=>{if(played.has(pk(a,b)))return;if(T[a]&&T[b]&&T[a].cf==T[b].cf&&((cc_[a]||0)>=8||(cc_[b]||0)>=8))return;")
# ===== coin toss, kickoffs, onside kicks, kneel =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m41.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function cont(w){if(w==1)oppBall();","function cont0(w){if(w==1)oppBall();")
r("function otStart(){g.ot=1;g.otn=0;g.otf=R()<.5?0:1;g.ob=0;otPoss()}","function otStart0(){g.ot=1;g.otn=0;g.otf=R()<.5?0:1;g.ob=0;otPoss()}")
r("try{chStadium(/State Championship/.test(g.title||''))","setTimeout(gStartGo,90);try{chStadium(/State Championship/.test(g.title||''))")
r("function oppBall(){if(g.injP){injShow(oppBall);return}","function oppBall(){if(g.injP){injShow(oppBall);return}if(kSc())return;")
r("g.y=r.next;g.dn=1;g.tg=10;g.cr=false;g.note='Their drive: '+r.res+(r.pts?' (+'+r.pts+')':'');","g.y=r.next;g.dn=1;g.tg=10;g.cr=false;g.note='Their drive: '+r.res+(r.pts?' (+'+r.pts+')':'');if(r.pts>0&&!g.ot&&g.kr!=null){const nt_=g.note;koOpp(r);g.note=nt_+' · '+g.note}")
r("if(qchg())return;pre()}","if(qchg())return;if(g.koOn||g._kotd){g.koOn=0;g._kotd=0;return oppBall()}pre()}")
r("else if(g.ph=='kick')kTick(dt)","else if(g.ph=='kick')kTick(dt);else if(g.ph=='kneel')knTick(dt)")
r("ot:g.ot,otn:g.otn,otf:g.otf,","ot:g.ot,otn:g.otn,otf:g.otf,kr:g.kr,_ku:g._ku,")
r("otf:s.otf,cr:s.cr,","otf:s.otf,kr:s.kr,_ku:s._ku,tossD:1,cr:s.cr,")
# ===== text that fits: labels shrink to fit, longer names in game, the scoreboard title wraps =====
r("function lbl(t,col,big){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.font='700 '+(big?80:56)+'px sans-serif';","function lbl(t,col,big){const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.font='700 '+(big?80:56)+'px sans-serif';{const mw_=x.measureText(t).width;if(mw_>488)x.font='700 '+Math.max(18,Math.floor((big?80:56)*488/mw_))+'px sans-serif'}")
h=h.replace(".toUpperCase().slice(0,9)",".toUpperCase().slice(0,13)")
r("((sc>13&&o.nm?o.nm.slice(0,6)+' ':'')+o.num):((o.nm?o.nm.slice(0,11)+' ':'')+o.num)","((sc>13&&o.nm?o.nm.slice(0,9)+' ':'')+o.num):((o.nm?o.nm.slice(0,13)+' ':'')+o.num)")
r("#hud{position:fixed;","#hud>div:first-child{white-space:normal}#hud{position:fixed;")
h=h.replace("V 0.0.0046","V 0.0.0047")
# ===== new schools (applied when a college season starts: next season for current college saves, at enroll for high school saves) =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m42.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(S.cfx)confRebuild();const T=S.T;if(S.xfer!=null){","if(S.cfx)confRebuild();nsApply(S);const T=S.T;if(S.xfer!=null){")
r("function enroll(n){injClear();","function enroll(n){nsApply(S);injClear();")
r("heis:hs.map(x=>(x.me?'▶ ':'')+x.n)};","heis:hs.map(x=>(x.me?'▶ ':'')+x.n)};{const Q_=qbAwards();if(Q_.ga){S.csum.ga=Q_.ga.n;if(Q_.ga.me){aw.push('Golden Arm Award');S.aw.push('College yr '+S.cy+': Golden Arm Award')}}if(Q_.qa){S.csum.qa=Q_.qa.n;if(Q_.qa.me){aw.push(\"O'Brine Award (best QB)\");S.aw.push('College yr '+S.cy+\": O'Brine Award (best QB)\")}}}")
r("Heisman race: ${s.heis.join(', ')}","Heisman race: ${s.heis.join(', ')}${s.ga?'<br>Golden Arm: '+s.ga:''}${s.qa?\"<br>O'Brine Award (best QB): \"+s.qa:''}")
# ===== agents, shop, looks, proposals, weddings, rivalries, redshirts, Tractor Huntley =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m43.js')+M('m44.js')+M('m45.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function colNext(){injClear();","function colNext(){injClear();agYear();")
r("function pNext(){injClear();","function pNext(){injClear();agYear();")
r("<button class=g onclick=trophyV()>🏆 Trophy case</button>","<button class=g onclick=trophyV()>🏆 Trophy case</button>${agBtn()}${shopBtn()}",5)
r("relDo('propose')\">Propose ($${relCost('ring').toLocaleString()} ring)","propose()\">💍 Propose (bring a ring from the Shop)")
r("relDo('wed')\">Plan the wedding ($${relCost('wed').toLocaleString()})","wedPlan()\">💒 Plan the wedding")
r("const ch=cl(25+","const ch=cl(25+(looksEns()-60)*.35+")
r("(S.riv=S.riv||[]).includes(o.team)||S.riv.push(o.team);m='The clip goes viral. Fans +, coach trust -2. You have a new rival: '+o.team+'.'","m='The clip goes viral. Fans +, coach trust -2. '+prvAdd(o)")
r("if(o.k=='fopp'){talk('mate',","if(o.k=='fohc'){return fwHc(o)}if(o.k=='fopp'){talk('mate',")
r("let m=null;if(o.k=='fcoach')","let m=null;if(o.k=='fohc')m=mk({c1:Ot.c1||'#333333',c2:'#333333',d:0,pc:'#3a3a3a'},null,{sk:4,hr:3,hcl:'#777777',fh:2,ht:1,bd:1});else if(o.k=='fcoach')")
r("fopp:'Meet '+o.n+' ('+(o.team||'')+')',","fopp:'Meet '+o.n+' ('+(o.team||'')+')',fohc:'Talk to '+o.n+' ('+(o.team||'')+')',")
r("{k:'fopp',x:6,z:-53,n:Lo[0].n,team:Ot.n,num:Lo[0].num},","{k:'fopp',x:6,z:-53,n:Lo[0].n,team:Ot.n,num:Lo[0].num},{k:'fohc',x:12,z:-49,n:(Ot.cch&&Ot.cch.n?'Coach '+Ot.cch.n.split(' ').pop():'Their head coach'),team:Ot.n},")
r("function rvTag(oi){const rv=rvOf(oi);if(!rv)return '';","function rvTag(oi){return rvTag0(oi)+prvTag(oi)}function rvTag0(oi){const rv=rvOf(oi);if(!rv)return '';")
r("if(!S||!S.T||oi==null||!S.T[oi]||oi==0)return null;const st=S.stage||'hs',T=S.T,o=T[oi],me=T[0];","if(!S||!S.T||oi==null||!S.T[oi]||oi==0)return null;const st=S.stage||'hs',T=S.T,o=T[oi],me=T[0];if(S.trv&&S.trv[o.n])return{nm:'Grudge match vs '+o.n,why:S.trv[o.n].why,op:o.n,k:'trv:'+o.n};")
r("function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;gpGame(oi,w);","function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;gpGame(oi,w);prvRes(oi,w);")
r("pos:POSL[sl]","pos:q[6]||POSL[sl]")
r("if(rk()<.35)Object.assign(P[rk()*3|0],{ovr:84+(rk()*5|0),gen:1});","if(rk()<.35)Object.assign(P[rk()*3|0],{ovr:84+(rk()*5|0),gen:1});wrdbChk(P);")
# CPU teams redshirt freshmen who are not going to play
r("S.qr=qrLeave(S.qr||qroom(T[0])).map(x=>({...x,cls:x.cls+1,ovr:cl(x.ovr+ri(0,3),40,96)})).filter(x=>x.cls<=4);","S.qr=qrLeave(S.qr||qroom(T[0])).map((x,i)=>{const rs_=x.cls==1&&!x.rs&&!x.fc&&x.npx==null&&i>=1;return{...x,rs:x.rs||(rs_?1:0),cls:rs_?x.cls:x.cls+1,ovr:cl(x.ovr+ri(0,3)+(rs_?1:0),40,96)}}).filter(x=>x.cls<=4);")
r("${x.npx!=null?' ⭐':''} <small>${clsN[Math.min(4,x.cls)]}</small>","${x.npx!=null?' ⭐':''} <small>${x.rs?'RS ':''}${clsN[Math.min(4,x.cls)]}</small>")
r("{n:nm(),ovr:cl(o-3-Math.round(rs()*7)+(c2-2)*3,40,92),cls:c2}","{n:nm(),ovr:cl(o-3-Math.round(rs()*7)+(c2-2)*3,40,92),cls:c2,rs:c2>=2&&Math.abs(hsh(t.n+'rs'))%5<2?1:0}")
r("e.innerHTML=`💵 $${(S.cash||0).toLocaleString()}<br>","e.innerHTML=`💵 $${(S.cash||0).toLocaleString()} · Looks ${looksEns()}<br>")
r("function mig(s){try{relFix(s)}catch(e){}s=calFix(s);","function mig(s){try{relFix(s)}catch(e){}s=calFix(s);try{nsApply(s)}catch(e){}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m46.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(LR&&LR.grad)return gdAct(o);","if(LR&&LR.grad)return gdAct(o);if(LR&&LR.wed)return wdAct(o);")
r("dprin:'🎓 Walk across the stage',","dprin:'🎓 Walk across the stage',wgst:'Talk to '+o.n,wman:'Talk to '+o.n,wfam:'See Mom & Dad',wher:'Meet her parents',wofc:'Talk to the officiant',")
r("${gf.status=='engaged'&&gf.wks-(gf.ew||0)>=6?`<button class=g onclick=\"wedPlan()\">💒 Plan the wedding</button>`:''}","${gf.status=='engaged'&&!gf.wsch&&gf.wks-(gf.ew||0)>=6?`<button class=g onclick=\"wedPlan()\">💒 Plan the wedding</button>`:''}${gf.wsch&&!wedDue()?'<p><small>💒 Wedding booked: '+WED[gf.wsch.i][1]+'.</small></p>':''}${wedDayH()}")
# ===== V57: family, homes, happiness =====
h=h.replace("V 0.0.0047","V 0.0.0057")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m47.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("<button class=g onclick=menu()>Save & exit</button>","${lifeBtns()}<button class=g onclick=menu()>Save & exit</button>",5)
r("function nextYr(){if(S.yr>4)return gradGo('hs',endC);injClear();","function nextYr(){if(S.yr>4)return gradGo('hs',endC);injClear();famYearAll();")
r("function colNext(){injClear();agYear();","function colNext(){injClear();agYear();famYearAll();")
r("function pNext(){injClear();agYear();","function pNext(){injClear();agYear();famYearAll();")
r("function enroll(n){nsApply(S);injClear();","function enroll(n){nsApply(S);injClear();if(!S.hz||S.hz=='parents'){S.hz='garage';S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🏠 Mom and Dad moved you into the garage. Check 🏠 Home if you want a dorm or your own place.'}")
r("function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;gpGame(oi,w);prvRes(oi,w);","function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;gpGame(oi,w);prvRes(oi,w);hapAdd(w?2:-2);")
r("e.innerHTML=`💵 $${(S.cash||0).toLocaleString()} · Looks ${looksEns()}<br>","e.innerHTML=`💵 $${(S.cash||0).toLocaleString()} · Looks ${looksEns()} · ${hapTxt(hapEns())}<br>")
r("<label>Game length: <b id=dv>5</b> min","<label>Family <small>(optional: you can do this later from the player menu)</small><select id=fm><option value=rand>Random family (you can replace it once later)<option value=make>I will build my own family after I start</select></label><label>Game length: <b id=dv>5</b> min")
r("S={name:$('#nm').value||'Player',","S={famPick:($('#fm')?$('#fm').value:'rand'),name:$('#nm').value||'Player',")
h=h.replace('<div style="font-weight:700;color:#7bed9f;margin:-4px 0 4px">💵 $${(S.cash||0).toLocaleString()}</div>','<div style="font-weight:700;color:#7bed9f;margin:-4px 0 4px">💵 $${(S.cash||0).toLocaleString()}</div>${relTop()}')
r("${lifeBtns()}<button class=g onclick=menu()>Save & exit</button>","${lifeBtns()}${(S.stage=='col'||S.stage=='pro')?'<button class=g onclick=relV()>❤️ Relationship</button>':''}<button class=g onclick=menu()>Save & exit</button>",5)
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m48.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function dealsHtml(){dealsEns();","function dealsHtml(){dealsEns();badDeals();")
r("function dealTake(i){const d=S.deals[i];if(d.t||!dealOk(d))return;d.t=1;S.cash+=d.a;S.pop=cl((S.pop||40)+2,0,100);save();hub()}","function dealTake(i){const d=S.deals[i];if(d.t||!dealOk(d))return;d.t=1;S.cash+=d.a;if(d.bad){S.pop=cl((S.pop||40)-d.bad,0,100);hapAdd(-2);HM='💸 You signed with '+d.b+'. The money cleared... and the internet is roasting you. Fans down.'}else S.pop=cl((S.pop||40)+2,0,100);save();hub()}")
r("<span>${d.b}<br><small>Pays you <b>$${d.a.toLocaleString()}</b> when you sign<br>${dreq(d)}</small></span>","<span>${d.b}<br><small>Pays you <b>$${d.a.toLocaleString()}</b> when you sign<br>${d.fp?'<i>Fine print: '+d.fp+'</i>':dreq(d)}</small></span>")
r("function fwChat(){const f=LR.cur;talk('gf',f.n.split(' ')[0],'I am '+f.age+'.","function fwChat(){const f=LR.cur;talk('gf',f.n.split(' ')[0]+' · Looks '+gfLk(f),'I am '+f.age+'.")
r("const ch=cl(25+(looksEns()-60)*.35+","const ch=cl(25+(looksEns()-60)*.35-Math.max(0,gfLk(LR.cur)-looksEns())*.45+")
r("<p>${st} <b>${gf.n}</b>, ${gf.age} · ${gfTeamTxt(gf)}</p>","<p>${st} <b>${gf.n}</b>, ${gf.age} · ${gfTeamTxt(gf)}</p><div class=row><span>Her looks</span><b>${gfLk(gf)}</b></div><div class=row><span>Your looks</span><b>${looksEns()}</b></div>")
# ===== phone =====
h=h.replace("V 0.0.0057","V 0.0.1.0")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m49.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function lrAct(o){if(!o||(LR&&LR.gb))return;","function lrAct(o){if(!o||(LR&&LR.gb))return;if(LR)LR.cur=o;")
r("[[first?'Dap him up':'Let us go',\"fwMate(\"+o.ri+\")\"]]","[[first?'Dap him up':'Let us go',\"fwMate(\"+o.ri+\")\"],['📱 Ask for his number',\"phAsk('mate')\"]]")
r("talk('mate',o.n+' ('+o.pos+')',lines[ri(0,lines.length-1)],'smug',[['Let us go','ovHide()']])","talk('mate',o.n+' ('+o.pos+')',lines[ri(0,lines.length-1)],'smug',[['Let us go','ovHide()'],['📱 Ask for his number',\"phAsk('mate')\"]])")
r("['Talk trash','fwOpp(3)']]","['Talk trash','fwOpp(3)'],['📱 Ask for his number',\"phAsk('rival')\"]]")
# ===== 3D homes, moving in, kids =====
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m50.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(LR&&LR.wed)return wdAct(o);","if(LR&&LR.wed)return wdAct(o);if(LR&&LR.home)return hmAct(o);")
r("wgst:'Talk to '+o.n,","hbed:'Use your bed',htv:'Watch TV',hgame:'Play video games',hgym:'Work out',hfr:'Go to the kitchen',hpool:'Go for a swim',htr:'Look at your trophies',hdog:'Pet '+o.n,hgf:'Talk to '+(o.n||'her').split(' ')[0],hguest:'Talk to '+o.n,hfam:'Talk to '+(o.n||'').split(' ')[0],hdoor:'Leave',wgst:'Talk to '+o.n,")
r("function famYearAll(){try{famYear();hzYear()}catch(e){}}","function famYearAll(){try{famYear();hzYear();kidsYear();babyYear()}catch(e){}}")
r("S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🏠 Mom and Dad moved you into the garage. Check 🏠 Home if you want a dorm or your own place.'","S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🏠 '+(S.fam&&!S.fam.dad?'Mom':S.fam&&!S.fam.mom?'Dad':'Mom and Dad')+' moved you into the garage. Check 🏠 Home if you want a dorm or your own place.'")
r("<button class=g onclick=\"if(confirm('Break up with ${gf.n.split(' ')[0]}?'))relDo('break')\">Break up</button>","${moveBtn()}${gf.home?'<p><small>🏠 She lives with you.</small></p>':''}<button class=g onclick=\"if(confirm('Break up with ${gf.n.split(' ')[0]}?'))relDo('break')\">Break up</button>")
# ---- V 0.0.1.0 part: home cutaway/decor, sideline looks, gf texts+gifts, pro-athlete parents
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m51.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("cm.lookAt(p.x,1.6+up+fy_,p.z)}","cm.lookAt(p.x,1.6+up+fy_,p.z);if(L.hw)hmCut(L,C)}")
r("function talk(w,nm,line,mood,btns,ex){","function talk(w,nm,line,mood,btns,ex){nm=lkTag(w,nm);")
r("if(S.rwk==k)return;S.rwk=k;","if(S.rwk==k)return;S.rwk=k;try{gfWeek()}catch(e){}")
assert h.count("S.pts+=2+(w?1:0);")==3
h=h.replace("S.pts+=2+(w?1:0);","S.pts+=athP(2+(w?1:0));")
r("S.pts+=pts;S.cash+=cash;","S.pts+=athP(pts);S.cash+=cash;")
r("const v=Math.min(b*pf,15e6);","const v=Math.min(b*pf*athF(),15e6*athF());")
r("a:Math.round(sc*bm*(400+i*700+ri(0,300))/100)*100","a:Math.round(sc*bm*athM()*(400+i*700+ri(0,300))/100)*100")
# ---- V 0.0.1.0.000: sponsors, celebrities, events, Tweeter
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m52.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("Object.assign(L,k[1],{fem:false})","Object.assign(L,{fem:false},k[1])")
r("function hub(){relTick();","function hub(){relTick();try{spWeek()}catch(e){}")
r("function famYearAll(){try{famYear();hzYear();kidsYear();babyYear()}catch(e){}}","function famYearAll(){try{famYear();hzYear();kidsYear();babyYear()}catch(e){}try{spYear()}catch(e){}}")
r("if(LR&&LR.home)return hmAct(o);","if(LR&&LR.ev)return evAct(o);if(LR&&LR.home)return hmAct(o);")
r("hdoor:'Leave',","hdoor:'Leave',eexit:'Leave',ecarpet:'Walk the red carpet',edj:'Talk to the DJ',")
r("if(!g.fint)O.push({k:'frep',x:-2,z:-40,n:'Reporter Mia'});","if(!g.fint)O.push({k:'frep',x:-2,z:-40,n:'Reporter Mia'});try{celFW(O)}catch(e){}")
r("function fwAct(o){","function fwAct(o){if(o.k=='fceleb')return celAct(o);")
assert h.count("V 0.0.1.0")>=1
h=h.replace("V 0.0.1.0","V 0.0.1.0.000")
# celebrity room + sponsors buttons right on the Endorsements card
r("dealOk(d)?'Sign':'Locked'}</button></div>`).join('')}</div>`}","dealOk(d)?'Sign':'Locked'}</button></div>`).join('')}${typeof SPV_IN!='undefined'&&SPV_IN?'':'<button class=g onclick=spV()>🤝 Sponsors, brand deals & invites</button>'}<button class=g onclick=celRoom()>⭐ Celebrity room (see every celebrity)</button></div>`}")
# ---- Oct 24: popups, captain + coin toss scene, garage, trophies, coverage, clock, labels
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m53.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("draw();hudU()}else idle(dt)","draw();if(TSG)tossTick(dt);hudU()}else idle(dt)")
r("function quitG(){","function quitG(){try{tossClear()}catch(e){}")
r("hdoor:'Leave',","hdoor:'Leave',htrs:'Look at your trophies',pshot:'🏈 Take the charity shot',ppot:'Talk to Pot McGee',")
for a,b in [("📱 Ask for his number","📱 Stay connected"),("📱 Ask for their number","📱 Stay connected"),("📱 Get his number","📱 Stay connected"),("📱 Get their number","📱 Stay connected")]:
  h=h.replace(a,b)
# clock: a runner tackled near (not over) the sideline is in bounds; college first-down stop only in the last 2 minutes of a half (2023+ rule)
r("oob:!sk&&(c.x<1.1||c.x>52.2)})","oob:!sk&&(c.x<.35||c.x>52.95)})")
r("if(g.lv=='col'&&g.cr){g.cr=false;g.note='First down: clock stops (college rule)'}","if(g.lv=='col'&&g.cr&&((g.clk>=1680&&g.clk<1800)||g.clk>=3480)){g.cr=false;g.note='First down: clock stops (college rule, last 2 minutes)'}")
# coverage: zone defenders lead the receiver and close faster, break on the ball sooner, contested catches are harder
r("let zw=null,zd=9;","let zw=null,zd=11;")
r("if(zw){tx=zw.x;ty=zw.y+1.6}","if(zw){tx=zw.x+(zw.vx||0)*.35;ty=zw.y+(zw.vy||0)*.3+1.3;{const s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>1.6?Math.max(1.05,((zw.sp||8)*.95)/d.sp):0}}")
r("a&&Math.hypot(a.lx-d.x,a.ly-d.y)<13&&P.t>a.t0+(100-d.cov)/500","a&&Math.hypot(a.lx-d.x,a.ly-d.y)<16&&P.t>a.t0+(100-d.cov)/650")
r("const pc=cl((.4+w.hands/100*.55)*(cont?.8+w.hands/700:1)*(1-dw/rc*.2),.1,.97);","const pc=cl((.4+w.hands/100*.55)*(cont?.66+w.hands/600-((D.d.cov||70)-65)/450-(sep<1.05?.08:0)-(D.e<dw?.07:0):1)*(1-dw/rc*.2),.1,.97);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m54.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function gfTeamTxt(gf){","function gfTeamTxt(gf){if(gf.cel){const o=celBy(gf.cel);return 'Celebrity'+(o?' · @'+o.h:'')}")
# ---- Oct 24 (late): interview bank, sponsors+, former teammates, better texting
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m55.js')+M('m56.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function hsAlumIn(a,t,L){if(!S.alum||!S.alum.length||a[0]!='c'||!t||!L)return;","function hsAlumIn(a,t,L){if(!S.alum||!S.alum.length||!(a[0]=='c'||S.stage=='col')||!t||!L)return;")
r("try{hsGr(a,L);hsAlumIn(a,t,L)}catch(e){}","try{hsGr(a,L);hsAlumIn(a,t,L)}catch(e){}try{proAlumIn(a,t,L)}catch(e){}")
r("function draftStart(){if(S.stage=='draft'||S.stage=='pro')return hub();","function draftStart(){if(S.stage=='draft'||S.stage=='pro')return hub();try{calumSave()}catch(e){}")
r("try{celFW(O)}catch(e){}","try{celFW(O)}catch(e){}try{exmFW(O)}catch(e){}")
r("function fwAct(o){if(o.k=='fceleb')return celAct(o);","function fwAct(o){if(o.k=='fceleb')return celAct(o);if(o.k=='fexm')return exmAct(o);")
r("function endGame(){S.gsave=null;","function endGame(){S.gsave=null;try{S._eg=1;S._egtd=g&&g.st?g.st.td:null}catch(e){}")
r("function userForm2(gr,w){","function userForm2(gr,w){S.lgr=gr;S.lgw=w?1:0;S.lgtd=S._eg?S._egtd:null;S._eg=0;")
r("function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;","function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;try{if(w&&rvOf(oi))S.lrvW={n:S.T[oi].n,st:S.stage,wk:S.wk||0}}catch(e){}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m57.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function hub(){relTick();","function hub(){try{lkFloor()}catch(e){}relTick();")
r("gfTeamTxt(gf);gf.age=(gf.age||20)+1;","gfTeamTxt(gf);gf.age=(gf.age||20)+1;try{cheerYear(gf)}catch(e){}")
r("<p>${st} <b>${gf.n}</b>, ${gf.age} · ${gfTeamTxt(gf)}</p>","<p>${st} <b>${gf.n}</b>, ${gf.age} · ${gfTeamTxt(gf)}</p>${cheerInfo(gf)}")
r("function hub(){try{lkFloor()}catch(e){}","function hub(){try{lkFloor();cheerFix()}catch(e){}")
r("gf.job=['nursing','teaching','marketing','real estate','her own business','grad school'][ri(0,5)];S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎓 '+gf.n.split(' ')[0]+' graduated! She is starting in '+gf.job+' and can come to more of your games now.'","{const j_=majorJob(gf);gf.job=j_.t;gf.sal=j_.sal}S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎓 '+gf.n.split(' ')[0]+' graduated! She is starting as a'+(/^[aeiou]/i.test(gf.job)?'n ':' ')+gf.job+' ('+salTxt(gf.sal)+') and can come to more of your games now.'")
r("gfTeamTxt(gf);gf.age=(gf.age||20)+1;try{cheerYear(gf)}catch(e){}","gfTeamTxt(gf);gf.age=(gf.age||20)+1;try{cheerYear(gf);jobYear(gf)}catch(e){}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m58.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r(" if(R()<.35&&S.pro&&S.pro.length){const t=S.pro[ri(0,S.pro.length-1)];gf.team=tn(t);gf.pro=1;gf.cls=0;"," if(gfProTry(gf)){")
r("${cheerInfo(gf)}","${cheerInfo(gf)}${colCheerInfo(gf)}${isProCheer(gf)?`<button class=g onclick=\"squadV('${String(gf.team).replace(/'/g,'')}')\">💃 See her squad</button>`:''}")
r("graduated and made the '+tn(t)+' cheer squad!'","graduated and made the '+gf.team+' cheer squad!'")
r("'I am '+f.age+'. I have been on the squad a while.","'I am '+f.age+'. '+(S.stage=='pro'?'I have been on the squad a while.':'I study '+gfMajor(f)+'.')+' Cheer skill '+cSkill(f)+(S.stage=='pro'?'':', pro outlook: '+proHint(proChance(f)))+'.")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m59.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function mk3(j,s,sk,lb,ap,nh,ar){","function mk3(j,s,sk,lb,ap,nh,ar){if(ap&&(ap.fem||(ap.fem==null&&ap.hr==4&&ap.ht===0&&ap.fh!=3)))return femM(j,s,ap,ap.fo);")
# CFP: real rule = the 5 highest-ranked conference champions get auto bids (no Power 4 guarantee)
r("<span>${S.col[T[i].cf]?cfShort(S.col[T[i].cf].n):''}: ${T[i].n} <small>#${C.pos[i]} · ","<span>${S.col[T[i].cf]?cfShort(S.col[T[i].cf].n):''}: ${T[i].n} <small>#${C.pos[i]} · ${crRec(i)} overall, ${T[i].cw||0}-${T[i].cl||0} in conference · ")
# mid-season projected champion = the higher-ranked of the two teams currently in title-game position
r("return Object.values(byC).map(L=>[...L].sort((a,b)=>((T[b].cw||0)-(T[b].cl||0))-((T[a].cw||0)-(T[a].cl||0))||C.pos[a]-C.pos[b])[0])}","const left_=(Array.isArray(S.csch)?S.csch.length:13)-(S.wk||0),tol=left_>=3?1:0;return Object.values(byC).map(L=>{const mL=Math.min(...L.map(i=>T[i].cl||0)),c=L.filter(i=>(T[i].cl||0)<=mL+tol);return [...(c.length?c:L)].sort((a,b)=>C.pos[a]-C.pos[b])[0]})}")
r("<b>Conference champions${(S.wk||0)<12?' (current leaders)':''}</b>","<b>Conference champions${(S.wk||0)<12?' (projected: the highest-ranked team still in the title race)':''}</b>")
# conference schedule: fill anyone left under 8 conference games
r("played.add(pk(a,b))}})));rvPairs()","played.add(pk(a,b))}})));Object.values(byC).forEach(L=>{const sw=cskW(L);for(let p=0;p<3;p++){const need=L.filter(i=>(cc_[i]||0)<8);for(let x=0;x<need.length;x++)for(let y=x+1;y<need.length;y++){const a=need[x],b=need[y];if((cc_[a]||0)>=8||(cc_[b]||0)>=8||played.has(pk(a,b)))continue;const w=[3,4,5,6,7,8,9,10,11,12].find(w=>w!=sw&&!W[w].some(q=>q[0]==a||q[1]==a||q[0]==b||q[1]==b));if(w==null)continue;W[w].push([a,b]);cc_[a]=(cc_[a]||0)+1;cc_[b]=(cc_[b]||0)+1;played.add(pk(a,b))}}});rvPairs()")

r("Object.values(byC).forEach(L=>rr(L).slice(0,L.length%2?9:8).forEach((rd,k)=>","Object.values(byC).forEach(L=>confRounds(L,rs).forEach((rd,k)=>")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m60.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("<button onclick=start()>Start career</button><button class=g onclick=menu()>Back</button>","<button onclick=start()>Start career</button><button class=g onclick=tkStart()>🎭 Play as an existing pro QB</button><button class=g onclick=menu()>Back</button>")

# ---- 💰 cap growth + league contracts
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m61.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("The max is $80M per year for up to 10 years, only for elite quarterbacks.","The max right now is $${capMax('QB')}M per year for up to 10 years, only for elite quarterbacks. ${capNext()}")
r("Demand the max ($80M x 10)","Demand the max ($${capMax('QB')}M x 10)")
r("Object.assign(o,{sal:80,yrs:10,gtd:70,bonus:40})","Object.assign(o,{sal:capMax('QB'),yrs:10,gtd:70,bonus:+(capMax('QB')*.5).toFixed(1)})")
h=h.replace("<button class=g onclick=\"recV()\">🏆 Record book</button>${S.stage=='pro'?'':","<button class=g onclick=\"recV()\">🏆 Record book</button>${S.stage=='pro'?'<button class=g onclick=ctV()>💰 Contracts & salary cap</button>':")
r("'Drako September':[9.2,3]","'Drako September':[9.2,2]")
r("S.name=e.n;S.age=e.age;S.dr={done:0,pk:224,P:[],picks:[]};","S.name=e.n;S.age=e.age;S.y0=2026-(S.hist||[]).length;S.dr={done:0,pk:224,P:[],picks:[]};")

# ---- more counterpart stars + renames
for a,b in [("Tylard Phillipson","Jack Goff"),("Mike Garrison","Meters Ferret"),("Gettin-It Running-Man","Kevin Sprinter")]:h=h.replace(a,b)
r("pos:q[6]||POSL[sl],ovr:q[3]","pos:q[6]||POSL[sl]||x.pos,ovr:q[3]")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m62.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("try{lkFloor();cheerFix()}catch(e){}","try{lkFloor();cheerFix();pkRen()}catch(e){}")
r("if(!L)L=S.ro[a]=genRo(a,t)","if(!L){L=S.ro[a]=genRo(a,t);try{rosDedup(L)}catch(e){}}")

# ---- 6 save slots, delete + recently deleted
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m63.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("function menuMain(){PL.cvm='menu';let s='';for(let i=1;i<=5;i++)","function menuMain(){PL.cvm='menu';let s='';for(let i=1;i<=6;i++)")
r("· QB ${qo(d.q)}</button>`:`<button class=g onclick=\"SLOT=${i};newC()\">Slot ${i}: New career</button>`}","· QB ${qo(d.q)}</button><button class=g style=\"margin-top:-4px;padding:6px;font-size:14px\" onclick=\"slotDel(${i})\">🗑 Delete Slot ${i}</button>`:`<button class=g onclick=\"SLOT=${i};newC()\">Slot ${i}: New career</button>`}if(trashL().length)s+=`<button class=g onclick=trashV()>♻️ Recently deleted (${trashL().length})</button>`;")

# ---- Halloween costumes
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m64.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("${it[1]=='suit'?suitSvg(it):''}<span style=\"flex:1\">${it[2]}${S.suit==it[0]?' <b>(wearing)</b>':''}","${it[1]=='suit'?suitSvg(it):it[1]=='hw'?cosSvg(it[0]):''}<span style=\"flex:1\">${it[2]}${S.suit==it[0]||S.cos==it[0]?' <b>(wearing)</b>':''}")
r("${o?(it[1]=='suit'&&S.suit!=it[0]?","${it[1]=='hw'?(owns(it[0])?`<button class=g onclick=\"cosWear('${it[0]}')\">${S.cos==it[0]?'Take off':'Wear'}</button>`:hwOn()?`<button class=g onclick=\"shopBuy('${it[0]}','${cat}')\">Buy</button>`:'<small>Event over</small>'):o?(it[1]=='suit'&&S.suit!=it[0]?")
r("<p class=tabs style=\"flex-wrap:wrap\">${Object.keys(SHC).map(k=>","${cat=='hw'?`<div class=card style=\"background:#2a1600;border:1px solid #e8730c\"><b>🎃 Halloween event · ${hwLeft()}</b><br><small>On sale through Nov 6, 11:59 PM. Anything you buy is yours forever.</small></div>`:''}<p class=tabs style=\"flex-wrap:wrap\">${Object.keys(SHC).filter(k=>k!='hw'||hwOn()||HWC.some(c=>owns(c[0]))).map(k=>")
r("const once=!(id.startsWith('h')||id=='g1');","const once=!((id.startsWith('h')&&!id.startsWith('hw'))||id=='g1');if(id.startsWith('hw')&&!hwOn())return shopV(cat);")

# ---- ratings update #1
r("['Jay Copyright',92,22]","['Jay Copyright',90,22]");r("['Bacon Maple',87,30]","['Bacon Maple',86,30]");r("['Jort Valentine',84,26]","['Jort Valentine',85,26]")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m65.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
h=h.replace("<button class=g onclick=menuEdit()>Edit rosters &amp; teams</button>","<button class=g onclick=menuEdit()>Edit rosters &amp; teams</button><button class=g onclick=rupdV()>📈 Ratings updates</button>",1)
r("['Just Chillin',85,27]","['Just Chillin',83,27]")
r("|0|0|0|20,810 pass yds · 157 TD · 1 RFC title'","|0|0|0|20,810 pass yds · 157 TD · 1 RFC title;Jay-Jay Pain|PHI|1|1|0;Ham Luther|NYJ, CAR, SF, MIN, SEA|1|0|0'")
r("(G.rings?G.rings+'× champ':'')+(G.mvp?' '+G.mvp+'× MVP':'')","(G.rings?G.rings+'× champ':'')+(G.ubmvp?' '+G.ubmvp+'× Ultra Bowl MVP':'')+(G.mvp?' '+G.mvp+'× MVP':'')")

# ======== Oct 30 batch: playable / tappable fixes ========
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m00z.js')+M('m66.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# storage: compressed reads everywhere
r("const lraw=i=>localStorage.getItem(K+'_'+i)||(i==1?localStorage.getItem(K):null);","const lraw=i=>dz(localStorage.getItem(K+'_'+i)||(i==1?localStorage.getItem(K):null));")
r("for(let i=1;i<=5;i++){const sn=await d.doc(CL.p+'slot'+i).get()","for(let i=1;i<=6;i++){const sn=await d.doc(CL.p+'slot'+i).get()")
r("if(cs&&cs.T&&(!ls||(ls.ts||0)<(cs.ts||0))){","if(cs&&cs.T&&!((zTomb()[i]||0)>=(cs.ts||0))&&(!ls||(ls.ts||0)<(cs.ts||0))){")
r("rsAll=()=>{try{return JSON.parse(localStorage.getItem(RSK))||{}}catch(e){return {}}},rsPut=o=>{try{localStorage.setItem(RSK,JSON.stringify(o));return 1}catch(e){return 0}};","rsAll=()=>{try{return JSON.parse(dz(localStorage.getItem(RSK)))||{}}catch(e){return {}}},rsPut=o=>{const v=ez(JSON.stringify(o));try{localStorage.setItem(RSK,v);return 1}catch(e){try{zSquash();localStorage.setItem(RSK,v);return 1}catch(e2){return 0}}};")
# rankings + bracket
r("function crCalc(){const T=S.T,n=T.length,G=crGames()","function crCalc0(){const T=S.T,n=T.length,G=crGames()")
r("function cfpSvg(){const c=S.cb,","function cfpSvg(c0){const c=c0||S.cb,")
r("<b>College Football Playoff</b> <small>12 teams","<b>College Football Playoff${c0?' · projected bracket':''}</b> <small>12 teams")
r("${s}</svg>${bwList()}</div>`}","${s}</svg>${c0?'':bwList()}</div>`}")
r("body=S.cb?cfpSvg():'';","body=S.cb?cfpSvg():cfpProj();")
# training +1 keeps your place
r("function up(k){const c=tc();","function up0(k){const c=tc();")
# events: Go buttons work (a constant was being reassigned for brand parties)
r("function spEv2(i,sim){const E=S.spe;if(!E||!E.L[i]||E.done.includes(i))return;const e=E.L[i];","function spEv2(i,sim){const E=S.spe;if(!E||!E.L[i]||E.done.includes(i))return;let e=E.L[i];")
# close throws: a short pull still throws (to the receiver you pulled toward)
r("if(mg<28){g.flash='PULL BACK TO THROW';g.ft=.9;return}","if(mg<12){g.flash='PULL BACK TO THROW';g.ft=.9;return}if(mg<28&&a.t){const q0=P.qb,dx=a.t[0]-q0.x,dy=a.t[1]-q0.y,dl=Math.hypot(dx,dy)||1;let bw=null,bs=-9;P.wr.forEach(w=>{const wx=w.x-q0.x,wy=w.y-q0.y,wl=Math.hypot(wx,wy)||1,al=(wx*dx+wy*dy)/(wl*dl),s_=al-wl/60;if(al>.5&&s_>bs){bs=s_;bw=w}});if(bw)a.t=[bw.x,bw.y]}")
# TV: straight to GSPN, Back returns home
r("if(o.k=='htv')return talk('mate','TV','GSPN is on.','happy',[['📺 Watch GSPN','hmExit(1);gpV()'],['Turn it off','ovHide()']]);","if(o.k=='htv'){hmExit(1);GPHOME=1;return gpV()}")
# existing QB: no fake draft, no number prompt
r("gpNews('drafted',{pk,tm:tn(t)});save();hub();numAsk()}","if(!TKGO)gpNews('drafted',{pk,tm:tn(t)});save();if(!TKGO){hub();numAsk()}}")
r("${S.npxd?'The players from the draft after your freshman season.","${S.tk?'This is the league\\'s most recent draft class.':''}${S.npxd&&!S.tk?'The players from the draft after your freshman season.")
# Gatorade bath: championships only
r("[...(win&&!F.gat?[['Gatorade bath on Coach!','fwGat()']]:[]),['Yes, coach','ovHide()']]","[['Yes, coach','ovHide()']]")
# celebrities: thanking them for coming builds the friendship a little
r("...brPitchBtns(c.id),['Thanks for coming!','ovHide()']]","...brPitchBtns(c.id),['Thanks for coming!','celThanks(\\''+c.id+'\\')']]")
# clothing menu buttons
r("shopBtn=()=>(S.stage=='col'||S.stage=='pro')?'<button class=g onclick=\"shopV()\">🛍️ Shop</button>':'';","shopBtn=()=>((S.stage=='col'||S.stage=='pro')?'<button class=g onclick=\"shopV()\">🛍️ Shop</button>':'')+'<button class=g onclick=\"wardV(null,\\'\\')\">👕 Clothing</button>';")
h=h.replace("<small>On sale through Nov 6, 11:59 PM. Anything you buy is yours forever.</small></div>`:''}","<small>On sale through Nov 6, 11:59 PM. Anything you buy is yours forever.</small><button class=g onclick=\"wardV('cas','shop')\">👕 Open Clothing (pick where to wear it)</button></div>`:''}")
# GOAT list: entries past the 25 fixed spots get points too (was crashing the GOAT screen)
r("map((g,i)=>({...g,p:GSC[i]}))","map((g,i)=>({...g,p:GSC[i]!=null?GSC[i]:GSC[GSC.length-1]-14*(i-GSC.length+1)}))")
# walk scenes: the top-left button never gets squished ("Lea ve")
h=h.replace("#lrw button{width:auto;margin:0;pointer-events:auto}","#lrw button{width:auto;margin:0;pointer-events:auto}#lrw .top>button{flex:none;white-space:nowrap;min-width:84px}#lrs{min-width:0}",1)
h=h.replace("bx(.14,.5,.14,0x111111,.5,1.9,-.4,m)","miaMic(m)")
r("else if(o.k=='ffam'){m=mk({c1:'#3a6ea5',c2:'#ffffff',d:0,pc:'#2b2b2b'},null,{sk:S.ap?S.ap.sk%6:1,hr:4,hcl:'#3b2a1a',fh:0,ht:0,bd:1});const m2=mk({c1:'#556b2f',c2:'#ffffff',d:0,pc:'#2b2b2b'},null,{sk:S.ap?S.ap.sk%6:1,hr:1,hcl:'#2b1b12',fh:3,ht:1,bd:2});m2.position.set(o.x+1.4,0,o.z);m2.rotation.y=Math.PI/2}","else if(o.k=='ffam'){m=famFieldM(o,mk)}")
h=h.replace("#lrs{min-width:0}","#lrs{min-width:0;cursor:pointer}#lrs.mini{font-size:13px;padding:3px 8px;max-height:24px;overflow:hidden}",1)
# ratings update: Coleridge Loud -1 (new saves); the latest update shows in the roster editor and the existing-QB list only
r("['Coleridge Loud',85,24]","['Coleridge Loud',84,24]")
h=h.replace("<button class=g onclick=rupdV()>📈 Ratings updates</button>","",1)
r("<button onclick=start()>Start career</button><button class=g onclick=tkStart()>","${rsPick()}<button onclick=start()>Start career</button><button class=g onclick=tkStart()>")
r("<small>QB ${e.ovr} · age ${e.age}","<small>QB ${e.ovr}${rupdTag(e.n)} · age ${e.age}")
r("<div class=card><small>You take over his career where it is right now","${rupdCard()}<div class=card><small>You take over his career where it is right now")
# defenders can catch up on long runs (pursuit angles + closing speed)
r("else{const t=P.car||q;mv(d,t.x+(t.vx||0)*.3,t.y+(t.vy||0)*.3,d.sp,dt)}});","else{const t=P.car||q,dd_=Math.hypot(t.x-d.x,t.y-d.y),ld_=P.run?cl(dd_/(d.sp+.1)*.55,.3,1.1):.3;mv(d,t.x+(t.vx||0)*ld_,t.y+(t.vy||0)*ld_,d.sp*purF(d,t),dt)}});")
r("if(P.run&&t){tx=t.x+(t.vx||0)*.3;ty=t.y+(t.vy||0)*.3}","if(P.run&&t){const dd_=Math.hypot(t.x-d.x,t.y-d.y),ld_=cl(dd_/(d.sp+.1)*.55,.3,1.1);tx=t.x+(t.vx||0)*ld_;ty=t.y+(t.vy||0)*ld_}")
r("(P.car&&P.car!==P.qb&&P.car.y-d.y>2&&P.car.y>g.los+8?1.18:1)","(P.run&&P.car?purF(d,P.car):1)")
# recruiting letters: coach names were "undefined" (picked from a 6-name list with a 20-name range)
r("'Coach '+LN[ri(0,19)]+' at '","'Coach '+LN[ri(0,LN.length-1)]+' at '")
r("function ownV(){const t=S.T[0]","function ownV(){if(S.stage!='pro'||!S.ct)return hub();const t=S.T[0]")

# ======== Oct 30 batch 2 ========
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m67.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(!L){L=S.ro[a]=genRo(a,t);try{rosDedup(L)}catch(e){}}","if(!L){L=S.ro[a]=genRo(a,t);try{rosSide(L,t)}catch(e){}try{rosDedup(L)}catch(e){}}")
# teammates / opponents in walk scenes look like the real players
h=h.replace("{sk:(o.ri*7)%6,hr:o.ri%6,hcl:'#1b1b1b',fh:o.ri%4,ht:1,bd:","{...plAp(o.n,{sk:(o.ri*7)%6,hr:o.ri%6,hcl:'#1b1b1b',fh:o.ri%4}),ht:1,bd:")
h=h.replace("{sk:3,hr:2,hcl:'#1b1b1b',fh:1,ht:1,bd:1}","{...plAp(o.n,{sk:3,hr:2,hcl:'#1b1b1b',fh:1}),ht:1,bd:1}")
r("oj={c1:ot.c1,c2:ot.c2,d:ot.d,hc:'#eeeeee',pc:ot.pc||0xdcdcdc}","oj={c1:ot.c1,c2:ot.c2,d:ot.d,hc:hcOf(ot),pc:ot.pc||0xdcdcdc}")
r("function setMJ(){const mj={...S.jy,pc:S.jy.pc||'#f2f2f2'}","function setMJ(){const mj={...S.jy,pc:S.jy.pc||'#f2f2f2',hc:myHc()}")
r("lkHelm(x,j.hc||'#eeeeee',T.c2,T,R3)","lkHelm(x,myHc(),T.c2,T,R3)")
r("o.nm=x.n.split(' ').pop().toUpperCase().slice(0,13);o.num=x.num;","o.nm=x.n.split(' ').pop().toUpperCase().slice(0,13);o.fn=x.n;o.num=x.num;")
r("if(!o.m){o.sk=SK[Math.random()*6|0];","if(!o.m){o.sk=plSkinOf(o);")
# saved-game card and quarter banner never show NaN / undefined
r("const q=Math.min(4,Math.floor(s.clk/900)+1),r=Math.max(0,Math.ceil(q*900-s.clk));return `<div class=card><b>Game in progress</b>","const ck_=+s.clk||0,q=Math.min(4,Math.floor(ck_/900)+1),r=Math.max(0,Math.ceil(q*900-ck_));return `<div class=card><b>Game in progress</b>")
h=h.replace("ovShow(`<h2>End of the ${QN[q-1]} quarter</h2>","ovShow(`<h2>End of the ${QN[q-1]||'4th'} quarter</h2>")

# ======== Halloween event ========
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m68.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("⭐ COVER ATHLETE · <b>JARSH FALLON #17</b></div>${s}","⭐ COVER ATHLETE · <b>JARSH FALLON #17</b></div>${hwMenuBar()}${s}")
r("shopBtn=()=>((S.stage=='col'||S.stage=='pro')?","shopBtn=()=>hwBtn()+((S.stage=='col'||S.stage=='pro')?")

# ======== Oct 30 part 2: gameplay + polish ========
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m69.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("if(R()<cl(.036*Math.pow(2,(d.rush-b.blk)/14),.005,.6)*(P.call.t=='run'?4:1)*(P.t>.7?1:0)*dt)d.beat=true;","if(R()<rushP(d,b,P)*dt)d.beat=true;")
r("if(Math.hypot(tx-w.x,ty-w.y)<.5){w.vx=w.vy=0;return}","if(Math.hypot(tx-w.x,ty-w.y)<1.2){w.ss=null;w.ssT=0;const s2=scrSpot(w,P);tx=s2[0];ty=s2[1]}")
r("w.ssT=P.t+(near<2.2?.6:1.3)","w.ssT=P.t+(near<2.2?1.0:1.6)")
r(" const fast=now-lk.pts[0].t<160;"," const el_=now-lk.pts[0].t,fast=el_<280||Math.hypot(dx,dy)/Math.max(1,el_)>.3;")
r("cx.ellipse(p[0],p[1],sc*1.3,sc*.55,0,0,7)","cx.ellipse(p[0],p[1],ringR()*1.3,ringR()*.55,0,0,7)")
r("const m=g.ft>0?g.flash:g.msg;if(m){cx.font='700 '+Math.max(14,Math.min(W/22,30))+'px \"Press Start 2P\",monospace';cx.fillStyle='#000';cx.fillText(m,W/2+3,H*.26+3);cx.fillStyle='#ffe93b';cx.fillText(m,W/2,H*.26)}}","const m=g.ft>0?g.flash:g.msg;if(m){fitFlash(m)}}")
# feet point forward
r("bx(.4,.14,.56,0x222222,0,-1,.06,l)}G.add(l);return l});","bx(.4,.14,.56,0x222222,0,-1,-.06,l)}G.add(l);return l});")
h=h.replace("bx(.38,.14,.52,0x141414,0,-1,.05,l)","bx(.38,.14,.52,0x141414,0,-1,-.05,l)")
# Reporter Mia: bare arms so you can see them
h=h.replace("{sk:0,hr:4,hcl:'#ff4fa0',fh:0,ht:0,bd:0}","{sk:0,hr:4,hcl:'#ff4fa0',fh:0,ht:0,bd:0,fo:{bareArms:1}}")
# locker room: people do their own thing; they only turn to you when you're right next to them (or they want to talk)
r("else if(o.wd&&d>3){","else if(o.wd&&d>1.6){")
r("else if(d<8)face=[dx,dz];","else if(d<2.4)face=[dx,dz];")
r("let a=(ed<3.4?Math.atan2(-ex,-ez):0)-o.m.rotation.y;","let a=(ed<2.2?Math.atan2(-ex,-ez):0)-o.m.rotation.y;")
r("if(o.act=='lift'){const s=Math.sin(t*3);o.m.A[0].rotation.x=o.m.A[1].rotation.x=2.35+s*.75;if(d<5)face=[dx,dz];","if(o.act=='lift'){const s=Math.sin(t*3);o.m.A[0].rotation.x=o.m.A[1].rotation.x=2.35+s*.75;if(d<2.4)face=[dx,dz];")
# no more "new schools" notice
r("if(swaps.length)s.fmsg=(s.fmsg?s.fmsg+' ':'')+'🏫 New schools join college football: '+swaps.join(' · ')+'.'","")
# combine buzz (the 🔥 / 🧊 lines) removed
_i=h.find("<p style=\"font-size:14px;text-align:left\"><b>${kind=='cb'?'Combine buzz'");_j=h.find("</p>",_i)+4
assert _i>0 and _j>_i
h=h[:_i]+h[_j:]
# celebrity name fixes
h=h.replace("'Kanye Yeast','yeastzy'","'Kanye Westley','kanyewestley'").replace("'Yeastzy'","'Westzy'").replace("['diddly','Diddly','diddlyy'","['diddly','Didd-E','didde'")
# Tweeter lives in the phone only; "Walk around home" right under the locker room
r("<button class=g onclick=twV()>🐦 Tweeter${twUn()?' · '+twUn()+' new':''}</button>`;","`;")
r("'<button onclick=lroom()>🚪 Enter the locker room</button>'}","'<button onclick=lroom()>🚪 Enter the locker room</button><button class=g onclick=homeWalk()>🏠 Walk around home</button>'}")
# 🗓 pro offseason weeks + free agency
r("<button onclick=pNext()>Start season ${S.py+1}</button>","${proOffHtml()}")
h=h.replace("${npxVis()?'<button class=g onclick=npxV()>🌟 Draft class</button>':''}","${npxVis()?'<button class=g onclick=npxV()>🌟 Draft class</button>':''}${S.stage=='pro'?'<button class=g onclick=faV()>'+(offFA()?'🖊 Free agents · signing week':'📋 Upcoming free agents')+'</button>':''}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m70.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("npxAt=p=>{if(p.pro)return{lv:'pro'};","npxAt=p=>{if(p.pro)return{lv:'pro'};if(S&&S.tkPend&&S.stage=='pro')return{lv:'col',y:4,toD:1};")
# jersey quick-picks can't throw if the number box is gone
h=h.replace("""onclick="$('#jnum').value=${v}\"""","""onclick="const e_=$('#jnum');if(e_)e_.value=${v}\"""")

# rankings arrows use the latest poll even after the season's last week
r("function crPrev(i){const H=S.crh&&S.crh.k==grK()?S.crh.w:null;if(!H)return null;const ks=Object.keys(H).map(Number).filter(w=>w<(S.wk||0))","function crPrev(i){const H=S.crh&&S.crh.k==grK()?S.crh.w:null;if(!H)return null;const ks=Object.keys(H).map(Number).filter(w=>(S.wk||0)?w<S.wk:true)")
# 🔄 jersey swaps
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m71.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r(""""Honestly? I hope I'm good enough to be your backup one day.",""","""(fopBk(o)?"Honestly? I hope I'm good enough to be your backup one day.":"You're the real deal. Good luck the rest of the way."),""")
r("""win?['We ate tonight!','That throw in the 3rd? Crazy.','Celebration at my place? Nah, film first.',"You're going pro one day, dude.",'Can I get your autograph now before you get famous?',""","""win?[...(lv=='pro'?['Good game out there. We were unstoppable.','Nice pass on that deep shot, QB.','That\\'s a big W. Enjoy it tonight.','Celebration at my place? Nah, film first.']:['We ate tonight!','That throw in the 3rd? Crazy.','Celebration at my place? Nah, film first.',"You're going pro one day, dude."]),lv=='pro'?'Film tomorrow, but man, that felt good.':'Can I get your autograph now before you get famous?',""")

# conference schedules: real game counts per conference
_i=h.find('function colSched(){');_j=h.find('\nfunction ',_i+10);_b=h[_i:_j]
_b2=_b.replace("(cc_[a]||0)<8&&(cc_[b]||0)<8","(cc_[a]||0)<ccap(a)&&(cc_[b]||0)<ccap(b)").replace("L.filter(i=>(cc_[i]||0)<8)","L.filter(i=>(cc_[i]||0)<ccap(i))").replace("if((cc_[a]||0)>=8||(cc_[b]||0)>=8||played.has(pk(a,b)))continue;","if((cc_[a]||0)>=ccap(a)||(cc_[b]||0)>=ccap(b)||played.has(pk(a,b)))continue;").replace("((cc_[a]||0)>=8||(cc_[b]||0)>=8))return;","((cc_[a]||0)>=ccap(a)||(cc_[b]||0)>=ccap(b)))return;")
assert _b2.count('ccap(')==7, _b2.count('ccap(')
h=h[:_i]+_b2+h[_j:]
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m72.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# the poll remembers every team, not just the top 40
r("S.crh.w[S.wk]=crCalc().ord.slice(0,40)","S.crh.w[S.wk]=crCalc().ord.slice()")
h=h.replace("V 0.0.1.0.000","V 0.0.1.0000")
# stacked names fix: every frame fully clears the overlay and restores its scale (the coin toss left it wrong)
r("cx.clearRect(0,0,W,H);cx.textAlign='center';","cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);{const d_=cv.width/W||1;cx.setTransform(d_,0,0,d_,0,0)}cx.globalAlpha=1;cx.textAlign='center';")
r("try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height)}catch(e){}TST.t+=dt;","try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);const d_=cv.width/W||1;cx.setTransform(d_,0,0,d_,0,0)}catch(e){}TST.t+=dt;")
# the overlay is cleared at the very start of every frame (no leftover names, ever)
r("function draw(){cheerTick();","function draw(){try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);const d_=cv.width/W||1;cx.setTransform(d_,0,0,d_,0,0)}catch(e){}try{cheerTick()}catch(e){}")
r("}draw();if(TSG)tossTick(dt);hudU()}","}try{draw()}catch(e){try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);cx.setTransform(cv.width/W||1,0,0,cv.width/W||1,0,0)}catch(_){}if(!window._dErr){window._dErr=1;console.warn('draw',e)}}if(TSG)tossTick(dt);hudU()}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m73.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# flick view slingshot box
r("if(CAMI==1||CAMI==2){if(!lk)lk={id:e.pointerId,x,y,x0:x,y0:y,pend:1,pts:[{x,y,t:performance.now()}]};return}","if((CAMI==1||CAMI==2)&&!slBoxHit(x,y)){if(!lk)lk={id:e.pointerId,x,y,x0:x,y0:y,pend:1,pts:[{x,y,t:performance.now()}]};return}if(slBoxHit(x,y)&&!aim){const P_=g.pl,q_=P_&&P_.qb;aim={id:e.pointerId,ox:x,oy:y,px:0,py:0,t:null,box:1,pts:[{x,y,t:performance.now()}],thr:!(P_&&P_.run&&P_.car===q_&&q_.y>g.los+.6)};return}")
r("const qq=P&&P.qb,qx=qq?qq.x-26.5:0;cm.aspect=W/H;let fv=camGame(qq,qx,por);flkUI();","const qq=P&&P.qb,qx=qq?qq.x-26.5:0;cm.aspect=W/H;let fv=camGame(qq,qx,por);flkUI();try{slBoxUI()}catch(e){}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m74.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m75.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# coin toss captains look like themselves
r("{sk:Math.abs(hsh(mate.n))%6,hr:1+Math.abs(hsh(mate.n))%3,hcl:'#1b1b1b',fh:0,ht:1,bd:1},-2.6,-49.4,-Math.PI/2);","{...plAp((cap.me?(L[3]||L[1]).n:mate.n),{sk:Math.abs(hsh(mate.n))%6,hr:1+Math.abs(hsh(mate.n))%3,hcl:'#1b1b1b',fh:0}),ht:1,bd:1},-2.6,-49.4,-Math.PI/2);")
r("{sk:(i*3+2)%6,hr:1+i,hcl:'#1b1b1b',fh:i,ht:1,bd:1},2+i*.6,-50.6+i*1.2,Math.PI/2)","{...plAp(p.n,{sk:(i*3+2)%6,hr:1+i,hcl:'#1b1b1b',fh:i}),ht:1,bd:1},2+i*.6,-50.6+i*1.2,Math.PI/2)")
# Walk around home gets the same color as Enter the locker room
r("<button class=g onclick=homeWalk()>🏠 Walk around home</button>'}","<button onclick=homeWalk()>🏠 Walk around home</button>'}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m76.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# slingshot: always show how far the throw goes and who it's to, even when the spot is off screen
r("if(nb)ring(pj(nb.x,nb.y),nd<7?'#4fd37a':'#ffffff');","if(nb)ring(pj(nb.x,nb.y),nd<7?'#4fd37a':'#ffffff');try{const yd=Math.round(Math.max(0,t[1]-q.y)),tp=pj(t[0],t[1]),off=tp[1]<40||tp[1]>H-20||tp[0]<0||tp[0]>W,lab=yd+' yd throw'+(nb&&nd<7&&nb.n?' → '+String(nb.n).split(' ').pop():'');cx.save();cx.font='700 13px \"Press Start 2P\",monospace';cx.textAlign='center';cx.lineWidth=4;cx.strokeStyle='#000';const lx=cl(bp[0],70,W-70),ly=cl(bp[1]-40,60,H-30);cx.strokeText(lab,lx,ly);cx.fillStyle=far?'#ff5a5a':'#ffe93b';cx.fillText(lab,lx,ly);if(off){const ax=cl(tp[0],24,W-24);cx.fillStyle='#ffe93b';cx.beginPath();cx.moveTo(ax,36);cx.lineTo(ax-12,58);cx.lineTo(ax+12,58);cx.closePath();cx.fill();cx.stroke()}cx.restore()}catch(e){}")
# swipe: a soft, short flick is a touch pass (screen, shovel, quick dump on the run): it goes to the receiver in that direction
r(" const mr=1.2+3.3*aF;if(best&&bd<mr){"," if(p<.5){const dl=[L[0]-q.x,L[1]-q.y],dn=Math.hypot(dl[0],dl[1])||1;let sb=null,ss=-9;P.wr.forEach(w=>{const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T,vx=ex-q.x,vy=ey-q.y,vl=Math.hypot(vx,vy)||1;if(vl>18)return;const al=(vx*dl[0]+vy*dl[1])/(vl*dn);if(al<.55)return;const sc=al-Math.abs(vl-dn)/25;if(sc>ss){ss=sc;sb={w,ex,ey}}});if(sb){best=sb;bd=0;L=[sb.ex,sb.ey]}}\n const mr=1.2+3.3*aF;if(best&&bd<mr){")
# live fumbles
r("if(R()<f)return R()<.55?endPlay(y,'FUMBLE! Defense recovers',{fum:1,sk}):endPlay(y,'Fumble — offense recovers it',{sk});","if(R()<f)return fumStart(c,y,sk);")
r("else if(g.ph=='kneel')knTick(dt);","else if(g.ph=='kneel')knTick(dt);else if(g.ph=='fum')fumTick(dt);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m77.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# every player's own rating drives the play (linemen blocking/rush, RB/WR speed, elusiveness, hands, defenders tackling)
r("ap=(o,L,i)=>{const x=injSub(L,i);o.nm=x.n.split(' ').pop().toUpperCase().slice(0,13);o.fn=x.n;o.num=x.num;if(L===LM&&!sw&&x===L[i])o.ri=i};","ap=(o,L,i)=>{const x=injSub(L,i);o.nm=x.n.split(' ').pop().toUpperCase().slice(0,13);o.fn=x.n;o.num=x.num;if(L===LM&&!sw&&x===L[i])o.ri=i;try{rateApply(o,x,i)}catch(e){}};")
# jersey screen: Start career never errors if a box isn't on screen
r("S.name=$('#pn').value||S.name;S.T[0].n=$('#sn').value||S.T[0].n;","S.name=($('#pn')||{}).value||S.name;S.T[0].n=($('#sn')||{}).value||S.T[0].n;")
# jersey swaps in high school too
r("...(lv!='hs'?[['Trade jerseys','fwOpp(2)']]:[]),","['Trade jerseys','fwOpp(2)'],")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m78.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Costumes section (hero suits, all year): preview, buy, wear like the Halloween ones
r("${it[1]=='suit'?suitSvg(it):it[1]=='hw'?cosSvg(it[0]):''}","${it[1]=='suit'?suitSvg(it):(it[1]=='hw'||it[1]=='cos')?cosSvg(it[0]):''}")
r("${it[1]=='hw'?(owns(it[0])?`<button class=g onclick=\"cosWear('${it[0]}')\">${S.cos==it[0]?'Take off':'Wear'}</button>`:hwOn()?","${(it[1]=='hw'||it[1]=='cos')?(owns(it[0])?`<button class=g onclick=\"cosWear('${it[0]}')\">${S.cos==it[0]?'Take off':'Wear'}</button>`:(hwOn()||it[1]=='cos')?")
# interceptions: the defense can't tackle its own interceptor, and any play ending during a return is an interception
r("function hit(d){const P=g.pl,","function hit(d){if(g.pl&&g.pl.ir)return;const P=g.pl,")
r("function endPlay(ye,tx,o){o=o||{};const P=g.pl;if(P.done)return;","function endPlay(ye,tx,o){o=o||{};const P=g.pl;if(P.done)return;if(P.ir&&!o.int){o={...o,int:1};if(!/INTERCEPT|PICK/.test(tx))tx='INTERCEPTED! Returned to the '+fp(Math.round(cl(ye,1,99)))}")
# names: everyone you've renamed shows up under your name in records, leaders, GOAT and history
for a,b in [('Peyton Manning','Pete Manling'),('P. Manning','P. Manling'),('A. Rodgers','E. Rodney'),('Aaron Rodgers','Eric Rodney'),('M. Stafford','M. Gafford'),('Matthew Stafford','Matty Gafford'),('L. Jackson','L. Action'),('Lamar Jackson','Lamarcus Action'),('P. Mahomes','R. MaClones'),('Patrick Mahomes','Ricky MaClones'),('A. Donald','E. Darnold'),('Aaron Donald','Eric Darnold'),('T. Kelce','T. Swift'),('Travis Kelce','Tractor Swift'),('M. Garrett','M. Ferret'),('Myles Garrett','Meters Ferret'),('Saquon Barkley','Jaquan Barker'),('Eric Donavan','Eric Darnold')]:
    h=h.replace(a,b)
# running backs: elite backs average ~100 rushing yards a game (real NFL feel)
r("if(g=='r')return[M(gp*f*(18+(o-60)*1.95+(r()-.5)*44))","if(g=='r')return[M(gp*f*(24+(o-60)*2.35+(r()-.5)*44))")
# line spacing: lines start on their own side of the ball, and engaged linemen don't share a head
r("P.ol=[22,24.2,26.5,28.8,31].map((x,i)=>({x,y:y-.8,","P.ol=[22,24.2,26.5,28.8,31].map((x,i)=>({x,y:y-1.05,")
r("P.dl=[0,1,3,4].map(k=>({x:P.ol[k].x,y:y+.4,","P.dl=[0,1,3,4].map(k=>({x:P.ol[k].x,y:y+1.3,")
r("d.x=b.x+Math.sin(P.t*4+b.x)*.35;d.y=b.y+1.1}}","d.x=b.x+Math.sin(P.t*4+b.x)*.35;d.y=b.y+2.3}}")
# defense: every coverage + smarter zones + pursuit angles
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m79.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("else{let zw=null,zd=11;P.wr.forEach(w=>{const dd=Math.hypot(w.x-d.zx,w.y-d.zy);if(dd<zd){zd=dd;zw=w}});if(zw){tx=zw.x+(zw.vx||0)*.35;ty=zw.y+(zw.vy||0)*.3+1.3;{const s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>1.6?Math.max(1.05,((zw.sp||8)*.95)/d.sp):0}}else{tx=d.zx;ty=d.zy}}","else{const z_=zoneT(d,P);tx=z_[0];ty=z_[1]}")
r("if(P.run&&t){const dd_=Math.hypot(t.x-d.x,t.y-d.y),ld_=cl(dd_/(d.sp+.1)*.55,.3,1.1);tx=t.x+(t.vx||0)*ld_;ty=t.y+(t.vy||0)*ld_}","if(P.run&&t){const dd_=Math.hypot(t.x-d.x,t.y-d.y),ld_=cl(dd_/(d.sp+.1)*.55,.3,1.1),ip_=icpt(d,t,ld_);tx=ip_[0];ty=ip_[1]}")
r("else{const t=P.car||q,dd_=Math.hypot(t.x-d.x,t.y-d.y),ld_=P.run?cl(dd_/(d.sp+.1)*.55,.3,1.1):.3;mv(d,t.x+(t.vx||0)*ld_,t.y+(t.vy||0)*ld_,d.sp*purF(d,t),dt)}});","else{const t=P.car||q,dd_=Math.hypot(t.x-d.x,t.y-d.y),ld_=P.run?cl(dd_/(d.sp+.1)*.55,.3,1.1):.3,ip_=P.run&&t!==q?icpt(d,t,ld_):[t.x+(t.vx||0)*ld_,t.y+(t.vy||0)*ld_];mv(d,ip_[0],ip_[1],d.sp*purF(d,t),dt)}});")
r("if(R()<rushP(d,b,P)*dt)d.beat=true;d.x=b.x+Math.sin(P.t*4+b.x)*.35;d.y=b.y+2.3}}","if(R()<rushP(d,b,P)*dt)d.beat=true;{const k_=Math.min(1,dt*12);d.x+=(b.x+Math.sin(P.t*4+b.x)*.35-d.x)*k_;d.y+=(b.y+2.3-d.y)*k_}}}")
# a tackle that pops the ball loose ends the tackle check for this frame (no crash on a null ball carrier)
r("if(Math.hypot(d.x-k.x,d.y-k.y)<1.1){hit(d);if(P.done)return}","if(Math.hypot(d.x-k.x,d.y-k.y)<1.1){hit(d);if(P.done||P.car!==k)return}")
r("function hit(d){if(g.pl&&g.pl.ir)return;const P=g.pl,","function hit(d){if(g.pl&&g.pl.ir)return;if(!g.pl||!g.pl.car)return;const P=g.pl,")
# league history screen
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m80.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
h=h.replace('<button class=g onclick="recV()">🏆 Record book</button>','<button class=g onclick="recV()">🏆 Record book</button><button class=g onclick="lhV()">📜 League history</button>')
# Baltimore Admirals -> Baltimore Crows
r("Baltimore|Admirals,","Baltimore|Crows,")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m81.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# retired numbers
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m82.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m83.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# the user's roster list: renames everywhere in the source (old names kept only inside m84's map)
h=h.replace("'Jake Smothers-Ninja'","'James Smothers-Ninja'").replace("Luka Okudah","Nuka Biten").replace("|Jake Smothers-Ninja|","|James Smothers-Ninja|")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m84.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
import re as _re
h=_re.sub(r"Jacque Hilton(?! III)","Jacque Hilton III",h)

# nobody vanishes when someone takes their spot
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m85.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# HS offers back on the hub (m70's pro offHtml had replaced the recruiting card), moved right under the play card + top notices
r("${offHtml()}${relHtml()}${dealsHtml()}${race()}","${relHtml()}${dealsHtml()}${race()}")
r("${gsH()}${lrInfo()}${myCard()}${bracket()}","${offTop()}${gsH()}${lrInfo()}${myCard()}${bracket()}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m86.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# clouds: up above every camera (Behind QB sits at y≈48) and off to the sides of the field, no shadows on the turf
r("for(let i=0;i<10;i++)bx(8+Math.random()*8,2,4+Math.random()*4,0xffffff,(Math.random()-.5)*160,40+Math.random()*10,-Math.random()*130,P);","for(let i=0;i<10;i++){const c_=bx(8+Math.random()*8,2,4+Math.random()*4,0xffffff,(i%2?1:-1)*(55+Math.random()*70),85+Math.random()*20,-Math.random()*130,P);c_.castShadow=false;c_.receiveShadow=false}")
# passing game: cut detection, DB bite/lag, gentler catch-up, small QB-run nerf, slingshot aim that follows the camera
r("if(Math.hypot(tx-w.x,ty-w.y)<.6)w.wp.shift()}","if(Math.hypot(tx-w.x,ty-w.y)<.6){w.wp.shift();try{wrCut(w,P)}catch(e){}}}")
r("else if(d.w){tx=d.w.x+d.w.vx*.4;","else if(d.lag>0&&(d.w||!d.spy)){d.lag-=dt;tx=d.lgx;ty=d.lgy;d.cbB=0}else if(d.w){tx=d.w.x+d.w.vx*.4;")
r("d.cbB=sep_>1.2?Math.max(1.1,((d.w.sp||8)-cl(((d.w.elu||70)-(d.cov||70))/60,-.3,.6))/d.sp):0","d.cbB=sep_>2.0?cl((d.w.sp||8)*(.92+((d.cov||70)-(d.w.rr||d.w.elu||70))/250)/d.sp,1,1.08):0")
r("sp:4.8+Q.mob*.032","sp:4.65+Q.mob*.031")
r("const slt=a=>{const q=g.pl.qb,m=Math.hypot(a.px,a.py)||1,k=slPow(m)*thrR();","const slt=a=>{const q=g.pl.qb,m=Math.hypot(a.px,a.py)||1,k=slPow(m)*thrR();if(CAMI>=3){try{const d_=swDir(-a.px/m,-a.py/m);if(d_)return[q.x+d_[0]*k,q.y+d_[1]*k]}catch(e){}}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m87.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# extra datable people who aren't celebrities at events (Reporter Mia)
r("const celBy=id=>{const c=CELB.find(x=>x[0]==id);","const celBy=id=>{const c=CELB.find(x=>x[0]==id)||(window.XCEL||[]).find(x=>x[0]==id);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m88.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
h=h.replace("V 0.0.1.0000","V 0.0.1.0001")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m89.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m90.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m91.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# the year counter counts pro seasons even when they never got a history row (take-over saves were stuck in 2026 forever)
r("yrN=()=>(S.y0||2022)+(S.hist||[]).length,","yrN=()=>{const H=S.hist||[];let n=H.length;if(S.stage=='pro'&&S.py>1){const p=H.filter(h=>String(h.y)[0]=='P').length;n+=Math.max(0,S.py-1-p)}return (S.y0||2022)+n},")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m92.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m93.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener(\x27resize\x27,resize);addEventListener(\x27orientationchange\x27",M("m94.js")+"addEventListener(\x27resize\x27,resize);addEventListener(\x27orientationchange\x27")
