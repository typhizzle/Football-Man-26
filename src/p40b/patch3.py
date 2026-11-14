import re
P='/mnt/user-data/outputs/football-man.html'
h=open('/home/claude/p40b/v40pub.html').read()
def r(a,b,n=1):
    global h
    c=h.count(a);assert c==n,(c,a[:140]);h=h.replace(a,b)
def cut(a,b):
    global h
    i=h.find(a);j=h.find(b,i+1);assert i>0 and j>i,(a,b,i,j);h=h[:i]+h[j:]
M=lambda f:open('/home/claude/p40b/'+f).read()
# remove the old versions that the new modules replace
cut("\nfunction confBuild(","\nfunction stageBuild(")
cut("\nfunction fpBuild(","\nfunction setMJ(")
cut("\nfunction fwGat(","\nfunction fwMate(")
# new modules at the end of the script (after three.js objects exist)
r("addEventListener('resize',resize);addEventListener('orientationchange'",M('m9n.js')+M('m15.js')+M('m10.js')+M('m11.js')+M('m12.js')+M('m13.js')+M('g1.js')+M('g2.js')+M('g2b.js')+M('g3.js')+M('g4.js')+M('m16.js')+M('m17.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# --- performance ---
r("G.rotation.order='YXZ';G.scale.set(s*[.9,1,1.15][A.bd],s*[.92,1,1.1][A.ht],s*[.9,1,1.15][A.bd]);return G}","G.rotation.order='YXZ';G.scale.set(s*[.9,1,1.15][A.bd],s*[.92,1,1.1][A.ht],s*[.9,1,1.15][A.bd]);G.ar=!!ar;mrgM(G);return G}")
r("G.scale.set(k*bd,k*ht,k*bd);if(P)P.add(G);return G}","G.scale.set(k*bd,k*ht,k*bd);mrgM(G);if(P)P.add(G);return G}")
r("G.position.set(x,0,z);G.rotation.y=ry;G.ph=i*.7;G.L.forEach(l=>l.rotation.order='XYZ');CHR.add(G)};","G.position.set(x,0,z);G.rotation.y=ry;G.ph=i*.7;G.L.forEach(l=>l.rotation.order='XYZ');mrgM(G);noSh(G);CHR.add(G)};")
r("frz(P,[LOSm,FDm,P.ch1,P.ch2])}","mrg(P,[LOSm,FDm,P.ch1,P.ch2]);frz(P,[LOSm,FDm,P.ch1,P.ch2])}")
r("clr=o=>{while(o.children.length)o.remove(o.children[0])}","clr=o=>{while(o.children.length){const c=o.children[0];dsp(c);o.remove(c)}}")
r("function newDyn(){scn.remove(DYN);DYN=new T3.Group();scn.add(DYN)}","function newDyn(){scn.remove(DYN);dsp(DYN);DYN=new T3.Group();scn.add(DYN)}")
r("rd.shadowMap.type=T3.PCFSoftShadowMap","rd.shadowMap.type=T3.PCFShadowMap")
# --- cameras ---
i=h.find("let fv=por?80:52;cm.aspect=W/H;");j=h.find("cm.lookAt(fxs*.6,0,-cam-(por?14:9))}",i);assert i>0 and j>i and j-i<1600
h=h[:i]+"cm.aspect=W/H;let fv=camGame(qq,qx,por);flkUI();"+h[j+len("cm.lookAt(fxs*.6,0,-cam-(por?14:9))}"):]
r("if(P.air){const a=P.air,f=a.t/a.T;if(f>.65&&Math.hypot(o.x-a.lx","lnSt(o,m,v);if(P.air){const a=P.air,f=a.t/a.T;if(f>.65&&Math.hypot(o.x-a.lx")
r("function idle(dt){if(FPA)FPA.visible=false;","function idle(dt){if(FPA)FPA.visible=false;if(FPB)FPB.visible=false;flkUI();")
# --- spike never covers the play list ---
r("function spkShow(){const b=$('#spk');b.style.display='block';clearTimeout(g.spT);g.spT=setTimeout(()=>{b.style.display='none'},2600)}","function spkShow(){}")
r("<button class=g onclick=to()>Timeout ${g.to[0]}</button>","${spkOk()?'<button onclick=spike() style=\"background:#c0392b\">⚡ Spike</button>':''}<button class=g onclick=to()>Timeout ${g.to[0]}</button>")
r("else{ovHide();$('#lb').style.display='flex';return}","else{ovHide();$('#lb').style.display='flex';$('#spk').style.display=spkOk()?'block':'none';return}")
r("function ovShow(h){ov.innerHTML=","function ovShow(h){{const sp_=$('#spk');if(sp_)sp_.style.display='none'}ov.innerHTML=")
# --- championship: Gatorade bath first, celebrate, stage goes up piece by piece ---
r("LR.st=stageBuild(ci);LR.walls=[[-4.8,4.8,-61.2,-56.1]];const so={k:'fstage',x:0,z:-55.2,n:'Trophy ceremony'};O.push(so);LR.all.push(so);","LR.sb=sbInit(ci);")
r("if(ch)talk('mate','Your teammates','WE WON IT ALL! The Gatorade bucket is full. Dump it on '+CNM()+'?','happy',[['Dump it on him!','fwGat()'],['Not yet','ovHide()']])}","if(ch){celSpawn();gbStart(1)}}")
r("if(L.field){cheerTick();confTick(dt);gatTick()}if(L.cs)return csTick(dt);","if(L.field){cheerTick();confTick(dt);celTick(dt);if(L.sb)sbTick(dt)}if(L.gb)return gbTick(dt);if(L.cs)return csTick(dt);")
r("if(o.act=='sit')return;","if(o.act=='sit')return;if(o.act=='cel'){celO(o,p,t);return}")
r("[...(LR.champ&&!F.gat?[['Gatorade bath on Coach!','fwGat()']]:[]),['Yes, coach','ovHide()']]","[...(win&&!F.gat?[['Gatorade bath on Coach!','fwGat()']]:[]),['Yes, coach','ovHide()']]")
r("function lrAct(o){if(!o)return;if(o.k=='exit')return lrExit();if(LR&&LR.field)return fwAct(o);","function lrAct(o){if(!o||(LR&&LR.gb))return;if(o.k=='exit')return lrExit();if(LR&&LR.field){if(LR.sb)sbBump();return fwAct(o)}")

# --- locker rooms: new helmets, tiers, merged meshes ---
cut("\nfunction lkHelm(","\nconst CNM=")
r("function lroom(){const L=rost('h.0'),T=S.T[0],wk=wkKey();","function lroom(){const L=rost('h.0'),T=S.T[0],wk=wkKey();LRT=S.stage=='pro'?2:S.stage=='col'||S.stage=='draft'?1:0;")
r("WC=lrMix(T.c1,'#2b3038',.8),PC=lrMix(T.c1,'#3c434c',.84)","WC=LRT==0?'#c9c2b3':LRT==2?'#2a1d15':lrMix(T.c1,'#2b3038',.8),PC=LRT==0?'#bdb6a7':LRT==2?'#33241a':lrMix(T.c1,'#3c434c',.84)")
r("bx(40,.5,23,0x8a6b4a,0,-.25,1.5,R3);","bx(40,.5,23,LRT==0?0x8f9396:LRT==2?0x231e1c:0x8a6b4a,0,-.25,1.5,R3);")
r("bx(40.6,.3,23.6,0x1b2733,0,8.15,1.5,R3);","bx(40.6,.3,23.6,LRT==0?0xd6d2c8:LRT==2?0x121212:0x1b2733,0,8.15,1.5,R3);")
r("dc=dk_(T.c1);bx(2.6,6,.15,0x1c2833,x,3,-9.1,R3);","dc=LRT==0?'#6c787f':LRT==2?'#3b2617':dk_(T.c1);bx(2.6,6,.15,LRT==0?0x7f8b92:LRT==2?0x0f0d0c:0x1c2833,x,3,-9.1,R3);")
r("[-11.5,-1.5].forEach(bq=>{bx(8,.5,1.2,0x1b1b1b,bq,.25,-5.4,R3);bx(8,.18,1.4,T.c1,bq,.59,-5.4,R3);","[-11.5,-1.5].forEach(bq=>{bx(8,.5,1.2,LRT==0?0x707a80:0x1b1b1b,bq,.25,-5.4,R3);bx(8,.18,1.4,LRT==0?0xa0703f:T.c1,bq,.59,-5.4,R3);")
r("lrDecor(DG,T,PR_);noSh(DG);","lrDecor(DG,T,PR_);lrTier(DG,T,PR_);noSh(DG);")
r("const pm=mk(j,{nm:j.nm,num:S.num},AP());frz(R3);LR={p:{x:-1,z:10.5,ry:0}","const pm=mk(j,{nm:j.nm,num:S.num},AP());mrg(R3);R3.children.forEach(c=>{if(c.isGroup)mrg(c)});frz(R3);LR={p:{x:-1,z:10.5,ry:0}")
r("const cp=lrMix(c1,'#101418',.55);bx(29.4,.04,11.1,cp,-5.2,.02,-3.65,R3);bx(19.4,.04,11,cp,0,.02,7.5,R3);","if(LRT>0){const cp=LRT==2?lrMix(c1,'#0a0a0a',.72):lrMix(c1,'#101418',.55);bx(29.4,.04,11.1,cp,-5.2,.02,-3.65,R3);bx(19.4,.04,11,cp,0,.02,7.5,R3)}")
r("for(let i=0;i<12;i++){const a=i/12*Math.PI*2;bx(.7,.05,.25,0xfff4d6,-1+Math.cos(a)*4.2,7.96,4.5+Math.sin(a)*4.2,R3).rotation.y=-a}","if(LRT==1)for(let i=0;i<12;i++){const a=i/12*Math.PI*2;bx(.7,.05,.25,0xfff4d6,-1+Math.cos(a)*4.2,7.96,4.5+Math.sin(a)*4.2,R3).rotation.y=-a}")
r("bx(.14,2.2,3.8,0x0b0b0b,9.84,4.7,-7.4,R3);pl(cv(512,288,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#0b1a2e');g.addColorStop(1,lrMix(c1,'#000000',.45));","bx(.14,2.2,3.8,LRT==0?0x7a5230:0x0b0b0b,9.84,4.7,-7.4,R3);pl(cv(512,288,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,LRT==0?'#22402e':'#0b1a2e');g.addColorStop(1,LRT==0?'#1b3325':lrMix(c1,'#000000',.45));")
r("else idle(dt);rd.render(scn,cm)}","else idle(dt);shU();rd.render(scn,cm)}")

# --- name variety for generated (not your teammates, not edited) players ---
r("nflMig(s);faceFix(s);s.v=2;return s}","nflMig(s);faceFix(s);nmMig(s);s.v=2;return s}")
r("function genRo(a,t){const rs=rng((S.seed||1)+a.split('').reduce((x,c)=>x+c.charCodeAt(0)*31,7));","function genRo(a,t){const rs=rng((S.seed||1)*7919+hsh(a+'|'+((t&&t.n)||'')));")
r("p.n=$('#rn'+i).value||p.n;","{const nv=$('#rn'+i).value;if(nv&&nv!=p.n){p.n=nv;p.ed=1}}")
r("S.ro[key]=R_.ro[k].map(x=>({...x}))","S.ro[key]=R_.ro[k].map(x=>({...x,ed:1}))")

# --- title screen: really tap to start, title never on Jarsh's face, lighter title colors ---
r("if(!g&&ui.querySelector('.ttl'))menu()","if(!g&&ui.querySelector('.mpan'))menuMain()")
r("cm.fov=fv;cm.position.set(cx,cy,cz);cm.lookAt(F[0]-rx*dl*nx*th*asp,F[1]-dl*ny*th,F[2]-rz*dl*nx*th*asp)}","cm.fov=fv;cm.position.set(cx,cy,cz);cm.lookAt(F[0]-rx*dl*nx*th*asp,F[1]-dl*(ny-(PL.dy||0))*th,F[2]-rz*dl*nx*th*asp);cm.updateMatrixWorld();cm.updateProjectionMatrix();ttlFit()}")
r(".t1{background:linear-gradient(#fff6b0,#ffd23b 45%,#ff8a1f 55%,#d9480f);",".t1{background:linear-gradient(#fffdf0,#fff3a8 42%,#ffd84d 58%,#ffbe3b);")
r("background:linear-gradient(#ffffff,#d6e6ff 45%,#7fb2ff 55%,#2a5fd8);","background:linear-gradient(#ffffff,#f0f7ff 42%,#c4e1ff 58%,#9ccdff);")
r(".ttl{display:inline-block;transform:skewY(-5deg);margin-top:2vh;filter:drop-shadow(0 7px 0 #000)}",".ttl{display:inline-block;transform:skewY(-5deg);margin-top:2vh;filter:drop-shadow(0 6px 0 #000) drop-shadow(0 0 14px rgba(150,200,255,.55))}")

import re as _re
h=_re.sub(r"\.t1\{background:linear-gradient\(#fffdf0[^}]*\}",".t1{color:#ffe36b;text-shadow:0 2px 0 #b8860b}",h,count=1)
h=_re.sub(r"(\.ttl \.t2\{font-size:clamp\(46px,min\(22vw,19vh\),130px\);)background:linear-gradient\(#ffffff[^}]*\}",r"\1color:#eaf5ff;text-shadow:0 3px 0 #5a8fd8}",h,count=1)
assert '.t1{color:#ffe36b' in h and 'color:#eaf5ff' in h

# --- GSPN ---
r("try{recUser(st,post)}catch(e){}}","try{recUser(st,post)}catch(e){}GPLS={st:{...st},w,post}}")
r("function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;","function rvRes(oi,w){if(oi==null||w==null||!S.T||!S.T[oi])return;gpGame(oi,w);")
r("function adv(uw){if(uw!=null&&g&&g.oi!=null)rvRes(g.oi,uw);","function adv(uw){if(uw!=null&&g&&g.oi!=null&&!(S.po&&S.po.out))rvRes(g.oi,uw);")
r("function hudU(){if(!g||!g.st||!g.s)return;","function hudU(){if(!g||!g.st||!g.s)return;{const d_=g.s[1]-g.s[0];if(g.clk>=2700&&d_>(g.q4d||0))g.q4d=d_;if(g._pd!=null&&g._pd>=0&&d_<0&&(g.clk>=3480||g.ot))g.gwd=1;g._pd=d_}")
r("S.rec+=Math.round(S.stars*6+S.yr*2+s.yds/80+s.td*.8+s.w+aw.length*8);S.sum={aw,ch,q:P.q};S.sum.no=genOffers().length}","S.rec+=Math.round(S.stars*6+S.yr*2+s.yds/80+s.td*.8+s.w+aw.length*8);S.sum={aw,ch,q:P.q};S.sum.no=genOffers().length;gpSeason(aw)}")
r("heis:hs.map(x=>(x.me?'▶ ':'')+x.n)}}","heis:hs.map(x=>(x.me?'▶ ':'')+x.n)};gpSeason(aw)}")
r("try{lgAwards(aw)}catch(e){console.log('awards',e)}}","try{lgAwards(aw)}catch(e){console.log('awards',e)}gpSeason(aw)}")
r("function commit(n){S.commit=n;","function commit(n){if(S.commit!=n)gpNews('commit',n);S.commit=n;")
r("Object.assign(S.jy,{c1:me.c1,c2:me.c2,d:me.d});save();hub()}","Object.assign(S.jy,{c1:me.c1,c2:me.c2,d:me.d});gpNews('enroll',me.n);save();hub()}")
r("function xfer(i){S.xfer=i;","function xfer(i){if(S.xfer!=i)gpNews('xfer',S.T[i].n);S.xfer=i;")
r("function declare(){","function declare(){gpNews('declare');")
r("function colNext(){","function colNext(){if(S.cy==3&&!S.cdone)gpNews('return');")
r("HM='Welcome to the '+tn(t)+'.';save();hub();numAsk()}","HM='Welcome to the '+tn(t)+'.';gpNews('drafted',{pk,tm:tn(t)});save();hub();numAsk()}")
r("HM='Signed with the '+tn(S.T[0])+': $'+o.sal+'M per year for '+o.yrs+' years.';","HM='Signed with the '+tn(S.T[0])+': $'+o.sal+'M per year for '+o.yrs+' years.';gpNews('sign',tn(S.T[0]));")
r("HM='Extension signed: $'+o.sal+'M per year, '+S.ct.yrs+' years.';","HM='Extension signed: $'+o.sal+'M per year, '+S.ct.yrs+' years.';gpNews('ext',HM);")
r("if(S.trade){moveTo(ri(1,31));S.trade=0;HM='Trade complete: you now play for the '+tn(T[0])+'.'}","if(S.trade){moveTo(ri(1,31));S.trade=0;HM='Trade complete: you now play for the '+tn(T[0])+'.';gpNews('trade',tn(T[0]))}")
r("function retire(m){S.ret=1;","function retire(m){if(!S.ret)gpNews('retire');S.ret=1;")
r("b.gs.push(bg);b.g++;g={oi:o};","b.gs.push(bg);b.g++;g={oi:o,s:sg};")
r("<button class=g onclick=rosv()>Rosters & stats</button>","<button class=g onclick=gpV()>📺 GSPN${gpNew()?' <span class=gnew>NEW</span>':''}</button><button class=g onclick=rosv()>Rosters & stats</button>",5)
r("#pb{position:fixed;right:140px;",".glogo{display:inline-block;font:900 italic 30px Impact,'Arial Black',sans-serif;color:#fff;background:linear-gradient(135deg,#ff5e3a,#e84118 45%,#8c1c0a);padding:2px 14px;border:3px solid #000;border-radius:8px;letter-spacing:2px;box-shadow:3px 3px 0 #000;transform:skewX(-8deg)}.gsh{display:flex;align-items:center;gap:10px;margin:4px 0 6px}.gsh small{font:9px 'Press Start 2P',monospace;line-height:1.5;opacity:.9}.gtk{overflow:hidden;white-space:nowrap;background:#c23616;border:2px solid #000;margin:6px 0;font:15px VT323,monospace;color:#fff}.gtkr{display:inline-block;padding:3px 0;animation:gtk 45s linear infinite}@keyframes gtk{from{transform:translateX(0)}to{transform:translateX(-50%)}}.gseg{background:#101820ee;border:3px solid #000;border-radius:10px;margin:10px 0;overflow:hidden}.gsb{padding:5px 10px;font:10px 'Press Start 2P',monospace;color:#fff;letter-spacing:1px}.gst{padding:7px 10px 2px;font-weight:700;color:#ffe93b}.gln{display:flex;gap:8px;align-items:flex-start;padding:6px 8px}.gfc{flex:none;border:2px solid #000;border-radius:10px}.gnm{display:inline-block;background:#fff;color:#111;font:700 12px sans-serif;padding:1px 6px;border-left:5px solid #e84118;margin-bottom:3px}.gtx{font-size:15px;line-height:1.35}.gmb{margin:4px 8px 8px!important;width:calc(100% - 16px)!important}.ghl{background:#0d1117dd;border:2px solid #000;border-radius:8px;padding:7px 9px;margin:6px 0;font-size:15px;line-height:1.35}.gch{display:inline-block;font:8px 'Press Start 2P',monospace;padding:3px 5px;border-radius:4px;color:#fff;vertical-align:middle}.grw{display:grid;grid-template-columns:104px 1fr 28px;gap:6px;align-items:center;padding:1px 10px}.grw small{font-size:12px;white-space:nowrap}.gbr{height:8px;background:#ffffff22;border-radius:4px;overflow:hidden}.gbr div{height:100%}.gsig{margin:6px 8px 8px;padding:8px;background:#ffffff10;border-left:4px solid #6c5ce7;border-radius:6px;font-size:14px}.gnew{background:#e84118;color:#fff;font:8px 'Press Start 2P',monospace;padding:2px 5px;border-radius:4px}.gsp h3{margin:12px 0 4px}#pb{position:fixed;right:140px;")
# --- CSS ---
r("#pb{position:fixed;right:140px;","#flk{position:fixed;right:8px;top:calc(env(safe-area-inset-top,0px) + 80px);display:none;gap:4px;z-index:5}#flk button{width:auto;margin:0;padding:7px 9px;font-size:11px}#pb{position:fixed;right:140px;")
exec(open('/home/claude/p40b/p41.py').read())
exec(open('/home/claude/p40b/p42.py').read())
exec(open('/home/claude/p40b/p43.py').read())
exec(open('/home/claude/p40b/p44.py').read())
exec(open('/home/claude/p40b/p45.py').read())
exec(open('/home/claude/p40b/p46.py').read())
exec(open('/home/claude/p40b/p47.py').read())
open(P,'w').write(h)
m=re.search(r'<script>\n(.*)</script>',h,re.S);open('/home/claude/game.js','w').write(m.group(1))
# A syntax error here ships a game that does not start at all, so the build refuses to
# finish until node can parse the script.
import subprocess as _sp
_chk=_sp.run(['node','-e','const fs=require("fs");try{new Function(fs.readFileSync("/home/claude/game.js","utf8"));console.log("SYNTAX_OK")}catch(e){console.log("SYNTAX_FAIL "+e.message);process.exit(1)}'],capture_output=True,text=True)
if 'SYNTAX_OK' not in _chk.stdout:
    raise SystemExit('BUILD REFUSED - '+(_chk.stdout+_chk.stderr).strip())
print('ok',len(h),'| syntax checked')
