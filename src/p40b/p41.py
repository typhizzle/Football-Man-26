# ===== V41 patches (applied inside patch3.py; r() / cut() / h are in scope) =====
# --- QB models get elbows and knees (only quarterbacks: a few extra draw calls) ---
r("function mk3(j,s,sk,lb,ap,nh){","function mk3(j,s,sk,lb,ap,nh,ar){")
r("G.L=[-.2,.2].map(x=>{const l=new T3.Group();l.position.set(x,1.05,0);bx(.34,1.05,.4,pc,0,-.52,0,l);bx(.06,.9,.42,tc,x<0?-.18:.18,-.5,0,l);bx(.38,.2,.44,tc,0,-.82,0,l);bx(.4,.14,.56,0x222222,0,-1,.06,l);G.add(l);return l});",
  "G.L=[-.2,.2].map(x=>{const l=new T3.Group();l.position.set(x,1.05,0);if(ar)artLeg(l,x,pc,tc);else{bx(.34,1.05,.4,pc,0,-.52,0,l);bx(.06,.9,.42,tc,x<0?-.18:.18,-.5,0,l);bx(.38,.2,.44,tc,0,-.82,0,l);bx(.4,.14,.56,0x222222,0,-1,.06,l)}G.add(l);return l});")
r("G.A=[-.64,.64].map(x=>{const a=new T3.Group();a.position.set(x,1.85,0);bx(.26,.78,.3,j.c1,0,-.38,0,a);bx(.28,.12,.32,tc,0,-.6,0,a);bx(.26,.2,.3,sk,0,-.86,0,a);G.add(a);return a});",
  "G.A=[-.64,.64].map(x=>{const a=new T3.Group();a.position.set(x,1.85,0);if(ar)artArm(a,j.c1,tc,sk);else{bx(.26,.78,.3,j.c1,0,-.38,0,a);bx(.28,.12,.32,tc,0,-.6,0,a);bx(.26,.2,.3,sk,0,-.86,0,a)}G.add(a);return a});")
# --- title screen: Jarsh runs the real motion ---
r("m=mk3(j,1.7,SK[0],{nm:'FALLON',num:17},{sk:0,hr:1,hcl:'#6b4a2b',fh:0,ht:2,bd:1});","m=mk3(j,1.7,SK[0],{nm:'FALLON',num:17},{sk:0,hr:1,hcl:'#6b4a2b',fh:0,ht:2,bd:1},0,1);")
r("PL.cb=bx(.24,.19,.4,0x8b4a1e,0,-1.02,0,m.A[1]);","PL.cb=bx(.24,.19,.4,0x8b4a1e,0,1.5,-.5,m);PL.fbN=-1;PL.fbS=null;")
i=h.find("function coverTick(t,por,dt){const m=PL.cv;if(!m)return;const u=t%4.6;");j=h.find("else{PL.fbS=null;PL.fb.visible=false}\n",i);assert i>0 and j>i and j-i<1500,(i,j)
h=h[:i]+"function coverTick(t,por,dt){const m=PL.cv;if(!m)return;coverQB(m,t);\n"+h[j+len("else{PL.fbS=null;PL.fb.visible=false}\n"):]
# --- practice field (behind career creation / roster editor) ---
r("add=(jj,x,z,r,l,ap,nh)=>{const m=mk3(jj,1.1,SK[Math.random()*6|0],l,ap,nh);","add=(jj,x,z,r,l,ap,nh,ar)=>{const m=mk3(jj,1.1,SK[Math.random()*6|0],l,ap,nh,ar);")
r("PL.q=add(j,0,-46,0,{nm:j.nm,num:S?S.num:7},AP(),1);","PL.q=add(j,0,-46,0,{nm:j.nm,num:S?S.num:7},AP(),1,1);PL.prN=-1;PL.prS=null;")
r("w.L[0].rotation.x=s;w.L[1].rotation.x=-s;PL.b.position.set(w.position.x*f,1.6+Math.sin(Math.PI*f)*3,-46+(w.position.z+46)*f)}","w.L[0].rotation.x=s;w.L[1].rotation.x=-s;if(PL.q.ar)practQB(t);else PL.b.position.set(w.position.x*f,1.6+Math.sin(Math.PI*f)*3,-46+(w.position.z+46)*f)}")
# --- in games ---
r("o.m=mk3(j,1.1,o.sk,{nm:mine?j.nm:(o.nm||''),num:mine?S.num:(o.num==null?'':o.num)},mine&&S.ap);","o.m=mk3(j,1.1,o.sk,{nm:mine?j.nm:(o.nm||''),num:mine?S.num:(o.num==null?'':o.num)},mine&&S.ap,0,q?1:0);")
r("m.position.set(o.x-26.5,v>.3?Math.abs(Math.sin(t*14))*.14:0,-o.y);m.rotation.x=0;m.rotation.z=0;m.A[0].rotation.z=m.A[1].rotation.z=0;","m.position.set(o.x-26.5,v>.3?Math.abs(Math.sin(t*14))*.14:0,-o.y);m.rotation.x=0;m.rotation.z=0;m.A[0].rotation.z=m.A[1].rotation.z=0;if(m.ar)artRst(m);")
r("if(car){m.rotation.x=-.28;m.rotation.z=s*.06;m.A[ia].rotation.x=1.3;m.A[1-ia].rotation.x=-s*1.3}else{m.A[0].rotation.x=-s*.8;m.A[1].rotation.x=s*.8}}","if(car){m.rotation.x=-.28;m.rotation.z=s*.06;m.A[ia].rotation.x=1.3;m.A[1-ia].rotation.x=-s*1.3}else{m.A[0].rotation.x=-s*.8;m.A[1].rotation.x=s*.8}if(m.ar){for(const l of m.L)l.S.rotation.x=-.25-Math.max(0,-l.rotation.x)*1.1;for(const a_ of m.A)a_.F.rotation.x=1.25}}")
r("if(!P.spk&&!(g.ph=='dead'||g.ph=='wdead'))qbPose(m,qa,tw!=null&&tw<.95?tw:null,pl,v>.3)}}","if(!P.spk&&!(g.ph=='dead'||g.ph=='wdead'))qbGame(o,m,qa,P,tw,pl,v)}}")
r("if(!P.bm)P.bm=bx(.4,.32,.66,0x8b4a1e,0,0,0,DYN);const a=P.air,c=P.car||P.qb;\nif(a){","if(!P.bm)P.bm=bx(.4,.32,.66,0x8b4a1e,0,0,0,DYN);const a=P.air,c=P.car||P.qb;P.bm.visible=true;\nif(qbBallG(P,a,c)){}else if(a){")
# --- combine throwing drill ---
r("},S.ap,1);PL.add(me3);","},S.ap,1,1);PL.add(me3);")
r("const hb=bx(.22,.17,.36,0x8b4a1e,0,-1.0,0,me3.A[ia]);","const hb=bx(.22,.17,.36,0x8b4a1e,0,1.5,-.5,me3);")
r("function cmSet(k){const m=CMB.m,ia=CMB.ia;m.rotation.set(0,0,0);m.position.set(0,0,0);m.A.forEach(a=>a.rotation.set(0,0,0));m.L.forEach(l=>l.rotation.set(0,0,0));","function cmSet(k){const m=CMB.m,ia=CMB.ia;m.rotation.set(0,0,0);m.position.set(0,0,0);m.A.forEach(a=>a.rotation.set(0,0,0));m.L.forEach(l=>l.rotation.set(0,0,0));artRst(m);m.twid=null;")
r("if(C.tw!=null){C.tw+=dt;m.rotation.set(0,0,0);m.A.forEach(a=>a.rotation.set(0,0,0));m.L.forEach(l=>l.rotation.set(0,0,0));qbPose(m,ia,C.tw<.95?C.tw:null,0,0);",
  "if(m.ar&&C.tw==null)qbCmb(m,ia,C,wr,null);if(C.tw!=null){C.tw+=dt;if(m.ar)qbCmb(m,ia,C,wr,C.tw);else{m.rotation.set(0,0,0);m.A.forEach(a=>a.rotation.set(0,0,0));m.L.forEach(l=>l.rotation.set(0,0,0));qbPose(m,ia,C.tw<.95?C.tw:null,0,0)}")
r("if(C.tw>=.2&&!C.fl){C.hb.visible=false;const h=handW(m,ia);","if(C.tw>=(m.ar?m.relT:.2)&&!C.fl){C.hb.visible=false;const h=m.ar?qbBallW(m).toArray():handW(m,ia);")
# ===================== V41 part 2: league universe, recruiting screens, timeline, stars, throwing input, HUD =====================
# --- new modules (league stats + migration / swipe) ---
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m18.js')+M('m19.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# --- stars: four new ones, Jake Smothers-Ninja ---
r("[31,2,'Luka Okudah',99,24,12]];","[31,2,'Luka Okudah',99,24,12],[9,1,'Tay Johnson',96,29,28],[4,1,'Daryl Henny',95,32,22],[23,2,'Jacob Jackson',96,29,18],[16,18,'Hooper Dalean',92,24,33]];")
r("[29,2,'James Smothers-Ninja',98,24,11]","[29,2,'Jake Smothers-Ninja',98,24,11]")
# --- defensive backs get a stat line: interceptions + tackles ---
r("(p=='DE'||p=='DT'||p=='OLB'||p=='MLB')?'d':''","(p=='DE'||p=='DT'||p=='OLB'||p=='MLB')?'d':(p=='CB'||p=='S')?'b':''")
r("if(g=='d')return[M(gp*f*(.1+(o-60)/55)*(.45+r()*1.15))];return[]}","if(g=='d')return[M(gp*f*(.1+(o-60)/55)*(.45+r()*1.15))];if(g=='b'){const ff=Math.min(1,f*2);return[M(gp*ff*(.04+(o-60)/260)*(.4+r()*1.2)),M(gp*ff*(2.4+(o-60)/22)*(.75+r()*.5))]}return[]}")
r("else if(g=='d')a('sk',v[0])}","else if(g=='d')a('sk',v[0]);else if(g=='b'){a('dint',v[0]);a('tkl',v[1])}}")
r("g=='d'?'Sacks':'',cl=","g=='d'?'Sacks':g=='b'?'INT / Tackles':'',cl=")
r("g=='d'?`${c.sk||0} sacks`:'';","g=='d'?`${c.sk||0} sacks`:g=='b'?`${c.dint||0} INT · ${(c.tkl||0).toLocaleString()} tackles`:'';")
r("else if(g=='w'){sv.cyd=v[0];sv.ctd=v[1]}else sv.sk=v[0];","else if(g=='w'){sv.cyd=v[0];sv.ctd=v[1]}else if(g=='d')sv.sk=v[0];")
r("df=(v?v[0]*9:0)+x.ovr*.6+W+R()*6-(g=='d'?0:8);ln=v?`${v[0]} sacks`:`${x.ovr} OVR`}","df=(v?v[0]*(g=='b'?15:9):0)+x.ovr*.6+W+R()*6-(g=='d'?0:8);ln=v?(g=='b'?`${v[0]} INT, ${v[1]} tackles`:`${v[0]} sacks`):`${x.ovr} OVR`}")
r("g=='d'?f((c.sk||0)/1.2):0;","g=='d'?f((c.sk||0)/1.2):g=='b'?f((c.dint||0)*1.2)+f((c.tkl||0)/90):0;")
# --- calendar: high school 2022-2025, college from 2026 ---
r("yrN=()=>2026+(S.hist||[]).length","yrN=()=>(S.y0||2022)+(S.hist||[]).length")
r("a=i<0?yrN():2026+i","a=i<0?yrN():(S.y0||2022)+i")
r("npxDraft(1,1,2026+(c1>=0?c1+1:5),1)","npxDraft(1,1,(S.y0||2022)+(c1>=0?c1+1:5),1)")
r("S.age=14;S.earn=0;","S.age=14;S.earn=0;S.y0=2022;S.lfc=1;S.jsn=1;")
r("function mig(s){s=confMig(s);","function mig(s){s=confMig(s);s=v41Mig(s);")
# --- recruiting / QB rooms ---
r("S.qr=qroom(me)","S.qr=qroomE(me)")
r("S.qr=(S.qr||qroom(T[0])).map(","S.qr=qrLeave(S.qr||qroom(T[0])).map(")
r("${relHtml()}${dealsHtml()}${leaders()}","${qrCard()}${relHtml()}${dealsHtml()}${leaders()}")
r("<button class=g onclick=rosv()>Rosters & stats</button>","${lgsB()}<button class=g onclick=rosv()>Rosters & stats</button>",5)
r("${Object.keys(G).map(k=>`<div class=card><b>${k}</b>${G[k].map(i=>","${Object.keys(G).sort((a,b)=>S.stage=='col'?cfKey(a)-cfKey(b):0).map(k=>`<div class=card><b>${k}</b>${S.stage=='col'?' '+cfBadge(S.col.find(c=>c.n==k),1):''}${G[k].map(i=>")
r("else if(k=='c')S.col.forEach((c,ci)=>h+=`<div class=card><b>${c.n}</b> <small>${c.t.length} schools</small>","else if(k=='c')cfOrd().map(ci=>[S.col[ci],ci]).forEach(([c,ci])=>h+=`<div class=card><b>${c.n}</b> ${cfBadge(c,1)} <small>${c.t.length} schools</small>")
r("const L=[...S.off].sort((a,b)=>b.ovr-a.ovr);ui.innerHTML=`<div><div class=sp></div><h2>High school career complete</h2>","const L=offSort([...S.off]);ui.innerHTML=`<div><div class=sp></div><h2>High school career complete</h2>")
r("<small>${o.conf.replace(' Conference','')} · team rating ${o.ovr}${S.commit==o.n?' · your commit':''}","<small>${cfShort(o.conf)} ${cfBadge(S.col[o.ci]||cfOf(o.n),1)} · team rating ${o.ovr}${S.commit==o.n?' · your commit':''}")
r("if(S.npx){npxRost(a,t,L);npxIns(a,t,L)}","if(S.npx){npxRost(a,t,L);npxIns(a,t,L)}yqRost(a,t,L);pkIns(a,t,L);uRost(a,t,L);")
r("if(x.ny==null)genHist(x,k,pi,pr,!isGen(x.n))","if(x.ny==null){genHist(x,k,pi,pr,!isGen(x.n));uHist(x)}")
r("function proStart(ti,pk){","function proStart(ti,pk){try{uHistAll()}catch(e){}")
# named prospects: the plans you're shown are the decisions they make
r("R()<[.45,.35,.25][cls]*(p.T>=82?.5:1)","npxRnd(p,k,1)<[.45,.35,.25][cls]*(p.T>=82?.5:1)")
r("if(R()<.35){const nt=npxXfer(p);","if(npxRnd(p,k,2)<.35){const nt=npxXfer(p,k);")
r("function npxXfer(p){","function npxXfer(p,k){")
r("pw[ri(0,pw.length-1)]","pw[Math.floor(npxRnd(p,k||1,3)*pw.length)]")
# --- GOAT: Warner above Big Ben; career numbers for the ones without awards ---
r("Ben Roethlisberger|PIT|2|0|0;Kurt Warner|STL, NYG, ARI|1|1|2","Kurt Warner|STL, NYG, ARI|1|1|2;Ben Roethlisberger|PIT|2|0|0")
r("Jim Kelly|BUF|0|0|0","Jim Kelly|BUF|0|0|0|35,467 pass yds · 237 TD · 4 RFC titles")
r("Warren Moon|HOU, MIN, SEA, KC|0|0|0","Warren Moon|HOU, MIN, SEA, KC|0|0|0|49,325 pass yds · 291 TD")
r("Philip Rivers|LAC, IND|0|0|0","Philip Rivers|LAC, IND|0|0|0|63,984 pass yds · 425 TD")
r("Joe Burrow|CIN|0|0|0'","Joe Burrow|CIN|0|0|0|20,810 pass yds · 157 TD · 1 RFC title'")
r("const[n,t,r,s,m]=e.split('|');return{n,t,r:+r,s:+s,m:+m}","const[n,t,r,s,m,x]=e.split('|');return{n,t,r:+r,s:+s,m:+m,x}")
r("acc:accTxt(g.r,g.s,g.m)})","acc:g.x||accTxt(g.r,g.s,g.m)})")
# --- throwing input: swipe-to-throw everywhere, longer slingshot ---
r("if((CAMI==1||CAMI==2)&&!(y>H*.68&&x>=W*.38)){if(!lk)lk={id:e.pointerId,x,y};return}","if((CAMI==1||CAMI==2)&&!(y>H*.68&&x>=W*.38)){if(!lk)lk={id:e.pointerId,x,y,x0:x,y0:y,pend:1,pts:[{x,y,t:performance.now()}]};return}")
r("if(!aim)aim={id:e.pointerId,ox:x,oy:y,px:0,py:0,t:null}});","if(!aim)aim={id:e.pointerId,ox:x,oy:y,px:0,py:0,t:null,pts:[{x,y,t:performance.now()}]}});")
r("cv.addEventListener('pointermove',e=>{if(joy&&e.pointerId==joy.id){","cv.addEventListener('pointermove',e=>{swMove(e);swAim(e);if(joy&&e.pointerId==joy.id){")
r("if(lk&&e.pointerId==lk.id){LY=cl(","if(lk&&e.pointerId==lk.id&&!swLk(e)){LY=cl(")
r("const LM=Math.min(W,H)*.36;","const LM=Math.min(W,H)*SLL;")
r("cv.addEventListener('pointerup',e=>{if(lk&&e.pointerId==lk.id)lk=null;","cv.addEventListener('pointerup',e=>{if(swEnd(e))return;if(lk&&e.pointerId==lk.id)lk=null;")
r("cv.addEventListener('pointercancel',e=>{","cv.addEventListener('pointercancel',e=>{if(swp&&e.pointerId==swp.id)swp=null;")
r("const slt=a=>{const q=g.pl.qb,L=Math.min(W,H)*.36,m=Math.hypot(a.px,a.py)||1,k=Math.min(1,m/L)*S.q.pow*.6;","const slt=a=>{const q=g.pl.qb,m=Math.hypot(a.px,a.py)||1,k=slPow(m)*thrR();")
r("const mx=Q.pow*.6,dd=","const mx=thrR(),dd=")
r("Math.min(1,mg/(Math.min(W,H)*.36))","Math.min(1,mg/(Math.min(W,H)*SLL))")
r("Math.min(1,Math.hypot(aim.px,aim.py)/(Math.min(W,H)*.36))","Math.min(1,Math.hypot(aim.px,aim.py)/(Math.min(W,H)*SLL))")
r("far=Math.hypot(t[0]-q.x,t[1]-q.y)>S.q.pow*.6,","far=Math.hypot(t[0]-q.x,t[1]-q.y)>thrR()+.5,")
r("if(joy){cx.strokeStyle='#fff8';","swDraw(cx);if(joy){cx.strokeStyle='#fff8';")
r("'PULL BACK & RELEASE TO THROW'","'PULL BACK OR SWIPE UP TO THROW'",2)
r("g.pl.call.t!='run'&&g.pl.t<3){cx.globalAlpha=.9;","g.pl.call.t!='run'&&g.pl.t<3&&!swp&&CAMI!=1&&CAMI!=2){cx.globalAlpha=.9;")
r("if((CAMI==1||CAMI==2)&&g.ph=='live'&&!aim){","if((CAMI==1||CAMI==2)&&g.ph=='live'&&!aim&&!swp){")
r("cx.font='700 '+Math.max(11,Math.min(W/30,20))+'px \"Press Start 2P\",monospace';cx.fillStyle='#000';cx.fillText('PULL BACK OR","cx.font='700 '+Math.max(10,Math.min(W/33,20))+'px \"Press Start 2P\",monospace';cx.fillStyle='#000';cx.fillText('PULL BACK OR")
r("'DRAG = LOOK · PULL FROM BOTTOM = THROW'","'SWIPE ↑ THROW · DRAG LOOK · PULL ↓ AIM'",2)
# --- HUD: camera + pause together in the corner ---
r("'CAM: '+CN4[CAMI]","'🎥 '+CN4[CAMI]",3)
r(">CAM: Behind QB<",">🎥 Behind QB<")
r("#flk{position:fixed;right:8px;top:calc(env(safe-area-inset-top,0px) + 80px);","#flk{position:fixed;right:6px;top:calc(env(safe-area-inset-top,0px) + 78px);")
r("#lb{position:fixed;left:8px;top:calc(env(safe-area-inset-top,0px) + 40px);","#lb{position:fixed;left:6px;top:calc(env(safe-area-inset-top,0px) + 40px);")
r("#pb{position:fixed;right:140px;","#tbr{position:fixed;right:6px;top:calc(env(safe-area-inset-top,0px) + 40px);display:flex;gap:6px;align-items:stretch;z-index:5;pointer-events:none}#tbr>button{pointer-events:auto;position:static!important;margin:0!important;opacity:.92}#tbr #camb{font-size:9px;padding:7px 9px}#tbr #pb{font-size:14px;padding:5px 11px}.cfb{display:inline-block;font-size:11px;border:1px solid;border-radius:6px;padding:0 5px;margin:2px 0;white-space:nowrap;vertical-align:middle}.qpc{display:inline-block;font-size:11px;color:#111;border-radius:6px;padding:0 6px;margin-top:2px;white-space:nowrap}#pb{position:fixed;right:140px;")
# --- the two pro conferences: LFC (left) and RFC (right); division names stay ---
h=h.replace('AFC','RFC').replace('NFC','LFC')
# --- version ---
r("V 0.0.0040</small>","V 0.0.0041</small>",2)
