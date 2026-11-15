# ===== V47: batch 1 — free agents, Ultra Bowl history, draft class, tappability =====

# ---------- FIX 1: free agents list showed ~1 player ----------
# The league-phase wrapper REPLACED the generated 48-player pool with S.ro.fa
# (players who hit FA via release/expiry). In saves where S.ro.fa is empty you
# saw one guy. Merge both pools instead, real FA players first, deduped by name.
r("return lgFA().filter(p=>p.n!=S.name).map(p=>{const li=TA.indexOf(p.prev);",
  "const _base=_f.apply(this,arguments)||[];const _lg=lgFA().filter(p=>p.n!=S.name).map(p=>{const li=TA.indexOf(p.prev);")
r("}).filter(p=>p.li!=me||1).sort((a,b)=>b.ovr-a.ovr)}}catch(e){}return _f.apply(this,arguments)}})();",
  "}).filter(p=>p.li!=me||1);const _sn=new Set();return _lg.concat(_base).filter(p=>p&&!_sn.has(p.n)&&_sn.add(p.n)).sort((a,b)=>b.ovr-a.ovr)}}catch(e){}return _f.apply(this,arguments)}})();")

# ---------- FIX 2: Ultra Bowl history corruption ----------
# The old hardcoded migration stamped an IMPOSSIBLE same-conference final
# (BUF and KC are both AFC) back into the save on every load. Correct it at source.
r("s.hOv[2027]=Object.assign(s.hOv[2027]||{},{ub:'BUF',ru:'KC'});s.hfx2=1",
  "s.hOv[2027]=Object.assign(s.hOv[2027]||{},{ub:'BUF',ru:'CHI'});s.hfx2=1")
# conference integrity + self-healing repair for any save
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m96.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- FIX 3: League office button not tappable ----------
# Root cause: the money-formatting wrappers reassign ui.innerHTML, which re-parses
# the DOM and destroys every JS-attached (.onclick) handler. The button's markup
# survives so it still LOOKS fine, but nothing is listening. Two fixes:
# 3a. only reassign innerHTML when the text actually changed (3 wrappers + salV)
r("ui.innerHTML=ui.innerHTML.replace(/\\$(\\d+\\.\\d{2,})M/g,(m,n)=>'$'+fmtM(+n)+'M')",
  "{const _a=ui.innerHTML,_b=_a.replace(/\\$(\\d+\\.\\d{2,})M/g,(m,n)=>'$'+fmtM(+n)+'M');if(_b!==_a)ui.innerHTML=_b}",3)
r("ui.innerHTML=ui.innerHTML.replace(/\\$(\\d+\\.?\\d*?)M/g,(m,n)=>'$'+fmtM(+n)+'M')",
  "{const _a=ui.innerHTML,_b=_a.replace(/\\$(\\d+\\.?\\d*?)M/g,(m,n)=>'$'+fmtM(+n)+'M');if(_b!==_a)ui.innerHTML=_b}")
# 3b. attach the handler as an inline attribute so it survives any innerHTML round-trip
r("n.onclick=()=>lgV();","n.setAttribute('onclick','lgV()');")

# ---------- FIX 4: draft class grouped by who is declaring ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m97.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- FIX 5: statistical leaders in OPOY / DPOY voting ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m98.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- FIX 6: Ultra Bowl MVP shows that game's line ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m99.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ===================== FLICK PASSING REBUILD =====================
# Your spec: the swipe decides direction and distance. Receivers may influence the
# aim slightly but must NEVER override it, and the ball is caught by whoever is
# actually near where it lands - not by a target chosen before the throw.
#
# 1. kill the m93 screen-space SNAP wrapper (it forced a receiver at up to 0.90)
r("swThrow=function(sx,sy,p,x0,y0,pts,rx,ry){\n try{const P=g&&g.pl,q=P&&P.qb;",
  "swThrow=function(sx,sy,p,x0,y0,pts,rx,ry){return _sw.apply(this,arguments);\n try{const P=g&&g.pl,q=P&&P.qb;")
# 2. remove the soft-swipe override that threw away your aim point entirely
r(" if(p<.5){const dl=[L[0]-q.x,L[1]-q.y],dn=Math.hypot(dl[0],dl[1])||1;let sb=null,ss=-9;P.wr.forEach(w=>{const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T,vx=ex-q.x,vy=ey-q.y,vl=Math.hypot(vx,vy)||1;if(vl>18)return;const al=(vx*dl[0]+vy*dl[1])/(vl*dn);if(al<.55)return;const sc=al-Math.abs(vl-dn)/25;if(sc>ss){ss=sc;sb={w,ex,ey}}});if(sb){best=sb;bd=0;L=[sb.ex,sb.ey]}}\n",
  " // (soft-swipe receiver override removed: a short flick is a short throw, not a dump-off)\n")
# 3. magnet -> light assist. was up to 70% pull inside 4.5yd; now <=28% inside ~2.2yd
r(" const mr=1.2+3.3*aF;if(best&&bd<mr){const k=(.25+.45*aF)*(1-.5*bd/mr);L=[L[0]+(best.ex-L[0])*k,L[1]+(best.ey-L[1])*k]}",
  " const mr=1.0+1.2*aF;if(best&&bd<mr){const k=(.10+.18*aF)*(1-bd/mr);L=[L[0]+(best.ex-L[0])*k,L[1]+(best.ey-L[1])*k]}")
# 4. never cancel a throw just because no receiver is near the aim point
r(" if(!best)return;P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};doThrow(best.w,L[0],L[1]);",
  " P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};doThrow(best?best.w:null,L[0],L[1]);")

# ---------- silence the three.js console spam ----------
# MeshLambertMaterial has no flatShading property in r128, so three.js logged a
# warning for every material created. It was always ignored - removing it changes
# nothing visually and stops the console filling up (which hid real errors).
r("MeshLambertMaterial({color:c,flatShading:true})","MeshLambertMaterial({color:c})")
r("bertMaterial(map?{vertexColors:true,map}:{vertexColors:true,flatShading:true})","bertMaterial(map?{vertexColors:true,map}:{vertexColors:true})")

# 5. the catch is resolved by WHERE THE BALL LANDS, not by a target picked at throw time
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m100.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# 6. 1:1 swipe angle. It was multiplied by .85, so a 60-degree flick threw at 51.
#    The spec is explicit: the game executes your input, it does not re-aim it.
r("a=Math.atan2(sx,-sy)*.85","a=Math.atan2(sx,-sy)")

# ---------- QB rushing shown wherever awards show stats ----------
# sVals() stores a QB as [passYds, passTD, INT, completions, rushYds, rushTD].
# Every display helper read only the first three and stopped, so QB rushing was
# recorded for years and never once shown.
r("return g=='q'?`${v[0]} yds, ${v[1]} TD, ${v[2]} INT`",
  "return g=='q'?`${v[0]} yds, ${v[1]} TD, ${v[2]} INT`+(v[4]?` · ${v[4]} rush yds${v[5]?', '+v[5]+' rush TD':''}`:'')")
r("ln=`${v[0]} yds, ${v[1]} TD, ${v[2]} INT`}",
  "ln=`${v[0]} yds, ${v[1]} TD, ${v[2]} INT`+(v[4]?` · ${v[4]} rush yds${v[5]?', '+v[5]+' rush TD':''}`:'')}")

# ---------- running backs catch passes ----------
# sVals() generated a back's whole season as two numbers: rush yards and rush TDs.
# A back's receiving work simply did not exist in the model. It does now.
r("if(g=='r')return[M(gp*f*(24+(o-60)*2.35+(r()-.5)*44)),M(gp*f*(.15+(o-60)/70)*(.5+r()))];",
  "if(g=='r')return[M(gp*f*(24+(o-60)*2.35+(r()-.5)*44)),M(gp*f*(.15+(o-60)/70)*(.5+r())),M(gp*f*(7.5+(o-60)*.85+(r()-.5)*15)),M(gp*f*(.045+(o-60)/170)*(.4+r()))];")
r("else if(g=='r'){a('ryd',v[0]);a('rtd',v[1])}",
  "else if(g=='r'){a('ryd',v[0]);a('rtd',v[1]);a('cyd',v[2]);a('ctd',v[3])}")
# a back's stat line shows rushing, receiving AND total yards
r(":g=='r'?`${v[0]} rush yds, ${v[1]} TD`",
  ":g=='r'?`${v[0]} rush yds, ${v[1]} TD`+(v[2]?` · ${v[2]} rec yds${v[3]?', '+v[3]+' TD':''} · ${v[0]+v[2]} total yds`:'')")
r("ln=`${v[0]} rush yds, ${v[1]} TD`}",
  "ln=`${v[0]} rush yds, ${v[1]} TD`+(v[2]?` · ${v[2]} rec yds${v[3]?', '+v[3]+' TD':''} · ${v[0]+v[2]} total yds`:'')}")
# and OPOY judges a back on TOTAL yards, the way the award actually works
r("else if(v&&g=='r'){off=v[0]/12+v[1]*6;mv=v[0]/14+v[1]*5+W*3-12;",
  "else if(v&&g=='r'){const _ty=v[0]+(v[2]||0),_td=v[1]+(v[3]||0);off=_ty/12+_td*6;mv=_ty/14+_td*5+W*3-12;")

# backfill RB receiving in existing saves + total-yards / QB-rush leaders
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m101.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# your own award line shows your rushing too (ry / rtd are tracked, never displayed)
r("me={n:S.name,a:abbr(S.name),tm:tAb(S.T[0]),pos:'QB',me:1,ln:`${us.yds} yds, ${us.td} TD, ${us.int} INT`}",
  "me={n:S.name,a:abbr(S.name),tm:tAb(S.T[0]),pos:'QB',me:1,ln:`${us.yds} yds, ${us.td} TD, ${us.int} INT`+(us.ry?` · ${us.ry} rush yds${us.rtd?', '+us.rtd+' rush TD':''}`:'')}")

# ---------- swipe LENGTH decides distance, not swipe speed ----------
# Was 50% finger speed + 50% length, so a short quick flick (a scramble dump-off)
# registered as near-max power and flew 40 yards. Spec: length = power/distance,
# speed = velocity/zip. Length now dominates; speed is a small accent.
r("const p=cl(v/(M*.0095)*.5+Ln/(M*.62)*.5,.1,1.15);",
  "const p=cl(Ln/(M*.55)*.82+v/(M*.0095)*.18,.06,1.15);")

# finer touch at the short end: a small flick should be able to be a 4-6 yard
# checkdown, not a 16-yard floater, while a full swipe still reaches max range.
r("const p=cl(Ln/(M*.55)*.82+v/(M*.0095)*.18,.06,1.15);",
  "const p=cl(Math.pow(cl(Ln/(M*.55),0,2),1.35)*.9+v/(M*.0095)*.12,.045,1.15);")

# ---------- wide-open receivers have to catch the ball ----------
# The catch chance used ONE base for every pass: .4 + hands*.55, so a receiver with
# nobody within 10 yards dropped 16-23% of dead-on throws. Contested catches keep the
# exact old maths; an uncontested one now behaves like a professional catching a
# well-thrown ball (hands 60 -> ~94%, hands 80 -> ~96%, hands 99 -> ~98%).
r("const pc=cl((.4+w.hands/100*.55)*(cont?.66+w.hands/600-((D.d.cov||70)-65)/450-(sep<1.05?.08:0)-(D.e<dw?.07:0):1)*(1-dw/rc*.2),.1,.97);",
  "const pc=cl((cont?(.4+w.hands/100*.55):(.86+w.hands/100*.12))*(cont?.66+w.hands/600-((D.d.cov||70)-65)/450-(sep<1.05?.08:0)-(D.e<dw?.07:0):1)*(1-dw/rc*.2),.1,.985);")

# no two players share a name (nobody deleted, stats untouched)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m102.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- short throws must stay short ----------
# In the camera views the distance was re-derived from where the finger LIFTED on
# screen (60% of that, 40% of the actual swipe), so lifting high launched a short
# flick deep. The swipe now leads, and the release point can never stretch a throw
# past 1.5x what the swipe asked for.
r("if(rel>2)d=cl(rel*.6+d*.4,5,Rg)",
  "if(rel>2)d=cl(Math.min(rel*.45+d*.55,d*1.5),5,Rg)")
# ---------- out / corner routes: keep the ball inbounds ----------
# Leading a receiver breaking for the sideline put the ball out of bounds. A
# quarterback throws to his inside shoulder instead.
r(" P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};doThrow(best?best.w:null,L[0],L[1]);",
  " L[0]=cl(L[0],1.4,51.9);P.swq=1;g.swp={p:Math.round(Math.min(1,p)*100),t:performance.now()};doThrow(best?best.w:null,L[0],L[1]);")

# ---------- Halloween keepsake: the chosen hat outlives the event ----------
# The cover hat only rendered while the event was live, so every hat vanished the
# moment it ended. A hat you were GIVEN now renders forever.
r("(()=>{const _cp=coverP;coverP=function(){const r=_cp.apply(this,arguments);try{if(!hwOn())return r;const k=HATS[HATI][0];",
  "(()=>{const _cp=coverP;coverP=function(){const r=_cp.apply(this,arguments);try{const _ow=(typeof S!='undefined'&&S&&S.hwHat)||null,_pv=(typeof HWPICK!='undefined'&&HWPICK)||null;if(!hwOn()&&!_ow&&!_pv)return r;const k=hwOn()?HATS[HATI][0]:(_pv||_ow);")
# the claim button keeps showing after the event, until the pick is made
r("const hwBtn=()=>{try{if(!hwOn())return '';",
  "const hwBtn=()=>{try{if(!hwOn())return (typeof hwHatBtn=='function'?hwHatBtn():'');")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m103.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- the game must fill the whole phone ----------
# #hud, #ov and #ui each already add their own safe-area insets. :root was adding
# them AGAIN to the <html> box, shrinking the entire page and letting the light-blue
# background show as bars. Remove the duplicate, and use dvh so Safari's collapsing
# toolbar does not leave a gap either.
r(":root{--ink:#fff;--mut:#c6d2dc;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}",
  ":root{--ink:#fff;--mut:#c6d2dc}")
r("html,body{height:100%;margin:0;background:#7fd0ff;",
  "html,body{height:100%;height:100dvh;width:100%;margin:0;padding:0;background:#7fd0ff;")
r("canvas{position:fixed;inset:0;width:100%;height:100%}",
  "canvas{position:fixed;inset:0;width:100vw;height:100%;height:100dvh}")
# keep menu content clear of the home indicator now that root padding is gone
r("#ui{position:fixed;inset:0;overflow:auto;padding:calc(14px + env(safe-area-inset-top,0px)) 14px 24px}",
  "#ui{position:fixed;inset:0;overflow:auto;padding:calc(14px + env(safe-area-inset-top,0px)) 14px calc(24px + env(safe-area-inset-bottom,0px))}")

# ===================== RECEIVERS GET OPEN =====================
# On a route cut the covering defender "bites" for L seconds. The old numbers made
# an even matchup worth 0.12s - near-perfect mirroring - and a high school corner
# reacted exactly as fast as a pro. Now:
#   - the base bite is bigger, so cuts actually create a window
#   - the ratings term is worth ~1.5x more, so a 90 WR vs a 70 CB is a real mismatch
#   - difficulty scales by level: high school corners are slow and make mistakes,
#     college is tighter, pros are sharpest
r("const cov=d.cov||d.tkl||70;let L=(.12+(rr-cov)/100*1.3+(R()-.5)*.12)*cl(ang/1.57,.45,1.2)*(man?1:.6);L=cl(L,.03,.6);",
  "const cov=d.cov||d.tkl||70;const LVM=(g.lv=='hs')?1.8:(g.lv=='col')?1.28:1;let L=(.19+(rr-cov)/100*2+(R()-.5)*.15)*cl(ang/1.57,.45,1.25)*(man?1:.62)*LVM;L=cl(L,.04,1.05);")

# ===================== PASS PROTECTION =====================
# Measured 76% of high school dropbacks ending in a sack (real football is 6-7%),
# and high school was WORSE than the pros. Each of the 4-5 rushers rolls its own
# shed chance every second, so a 0.06 base compounds enormously, and the escalation
# started at only 2.4s. Now: a smaller base, a later and gentler escalation, a real
# protection window, and difficulty that actually scales - a high school line is not
# a professional pass rush.
r("function rushP(d,b,P){if(P.t<=.7)return 0;const base=cl(.06*Math.pow(2,((d.rush||70)-(b.blk||70))/14),.012,.8),run=P.call.t=='run';if(run)return base*4;if(P.t>6.5)return 40;return base*(1+Math.max(0,P.t-2.4)*1.4)}",
  "function rushP(d,b,P){if(P.t<=.95)return 0;const LVR=(g.lv=='hs')?.42:(g.lv=='col')?.7:1;const base=cl(.038*Math.pow(2,((d.rush||70)-(b.blk||70))/17),.005,.55)*LVR,run=P.call.t=='run';if(run)return base*4;if(P.t>7.5)return 40;return base*(1+Math.max(0,P.t-3.3)*1.05)}")

# ===================== CAMERA-VIEW AIMING =====================
# INVESTIGATED, NOT CHANGED. Measured 31yd aim error here, but three versions of the
# harness gave three different answers (31yd, 31yd, 57yd with 52/55 thrown backwards),
# and a real player would instantly notice throwing backwards every down. The harness
# cannot drive a camera-view swipe correctly, so the original code is left untouched
# rather than "fixed" against an unverified measurement. First-person/flick view IS
# verified good (0.06yd error, 100% to the intended receiver). Needs a human test.

# footwear & headwear shop + the Halloween cleats owed from the endorsement deal
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m104.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- real linebacker speeds, and a much shorter bite ----------
# Every defender was built with one speed formula, so a linebacker ran stride for
# stride with a cornerback. And the cut "bite" was up to 1.05s, long enough that a
# defender committed to a dead spot and looked like he was standing still.
# Separation should come from a SPEED MISMATCH, not from freezing a man.
r("const mkD=(x,yy,ps,n,w,zx,zy)=>({x,y:yy,sp:6.4+r(o)/70,",
  "const mkD=(x,yy,ps,n,w,zx,zy)=>({x,y:yy,sp:(6.4+r(o)/70)*(/LB$/.test(ps)?.942:/^S/.test(ps)?.982:1),")
r("const cov=d.cov||d.tkl||70;const LVM=(g.lv=='hs')?1.8:(g.lv=='col')?1.28:1;let L=(.19+(rr-cov)/100*2+(R()-.5)*.15)*cl(ang/1.57,.45,1.25)*(man?1:.62)*LVM;L=cl(L,.04,1.05);",
  "const cov=d.cov||d.tkl||70;const LVM=(g.lv=='hs')?1.5:(g.lv=='col')?1.2:1;let L=(.13+(rr-cov)/100*1.15+(R()-.5)*.1)*cl(ang/1.57,.45,1.2)*(man?1:.6)*LVM;L=cl(L,.03,.42);")

# ---------- 🎃 keepsake moved to the MAIN MENU, and 👕 Clothing gets three sections ----------
# The treat now lives in an orange panel at the top of the save-file screen: the thank-you
# message first, then Fallon takes his hat off and you flip the treats onto his head one at
# a time, then keep one forever or save it for later. Clothing opens on
# 👕 Outfits · 🧢 Headwear · 👟 Footwear, so the shop's hats and cleats can actually be worn.
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m105.js')+M('m106.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# hwMenuBar is a const, so the keepsake module cannot wrap it: call it from the menu instead
r("<div class=cov style=\"position:static;transform:none;margin:0 0 10px\">⭐ COVER ATHLETE · <b>JARSH FALLON #17</b></div>${hwMenuBar()}",
  "<div class=cov style=\"position:static;transform:none;margin:0 0 10px\">⭐ COVER ATHLETE · <b>JARSH FALLON #17</b></div>${(typeof hwkBar=='function'?hwkBar():'')}${hwMenuBar()}")

# ---------- 🤠 the lasso goes IN HIS HAND ----------
# It was a torus parked at a fixed spot on the body (.68,1.15,0), so it floated beside
# the arm and never moved with it. It now hangs off the right hand, with a short length
# of rope from the grip down into the coil, and it swings when the arm swings.
r("""const R_=new T3.Mesh(new T3.TorusGeometry(.22,.05,6,14),new T3.MeshLambertMaterial({color:lasso}));R_.position.set(.68,1.15,0);R_.rotation.y=Math.PI/2;m.add(R_);const R2=R_.clone();R2.scale.set(.8,.8,.8);R2.position.x=.7;m.add(R2)};""",
  """const _ha=(m.A&&m.A[1])||m;
  const _rm=new T3.MeshLambertMaterial({color:lasso});
  const R_=new T3.Mesh(new T3.TorusGeometry(.2,.045,6,14),_rm);
  if(_ha===m){R_.position.set(.68,1.15,0);R_.rotation.y=Math.PI/2;m.add(R_)}
  else{B(.05,.2,.05,lasso,0,-1.0,-.03,_ha);
   R_.position.set(0,-1.2,-.03);R_.rotation.y=.3;_ha.add(R_);
   const R2=R_.clone();R2.scale.set(.74,.74,.74);R2.position.set(0,-1.17,-.03);R2.rotation.y=.3;_ha.add(R2)}};""")

# real gold on the Golden Cowboy suit (Lambert has no specular, so it could never shine)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m107.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# dressing a model has to be repeatable: three wrappers were each adding the hat and cleats
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m108.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🪢 the lasso is rope-coloured, not gold ----------
# It read as the shiniest thing on the suit, which pulled the eye off the gold.
r("cowExtra(m,0x4a2c14,0xc9a15a,0x8b6a3a);return m}",
  "cowExtra(m,0x4a2c14,0xe6d9b8,0x8b6a3a);return m}")
r("cowExtra(m,0x5a3a1a,0xc9a15a,0x6b4423);return m}",
  "cowExtra(m,0x5a3a1a,0xe6d9b8,0x6b4423);return m}")

# ---------- "Rosters & stats" is just "Rosters" ----------
r("<button class=g onclick=rosv()>Rosters & stats</button>",
  "<button class=g onclick=rosv()>Rosters</button>",5)
r("'Your PFL seasons are under Rosters & stats.':'Your college seasons are under Rosters & stats.'",
  "'Your PFL seasons are under Rosters.':'Your college seasons are under Rosters.'")

# ---------- a stat line for every position that has stats ----------
r("s=PS(i),st={0:s&&(i==0?`${S.ss.yds}y ${S.ss.td}TD ${S.ss.int}INT`:`${s.P.a}y ${s.P.b}TD ${s.P.c}INT`),1:s&&`${s.Ru.a}y ${s.Ru.b}TD`,2:s&&`${s.Re.a}y ${s.Re.b}TD`,11:s&&`${s.Sk.a} sk`};",
  "s=PS(i),st=(typeof rosStat=='function')?rosStat(i,s,L):{0:s&&(i==0?`${S.ss.yds}y ${S.ss.td}TD ${S.ss.int}INT`:`${s.P.a}y ${s.P.b}TD ${s.P.c}INT`),1:s&&`${s.Ru.a}y ${s.Ru.b}TD`,2:s&&`${s.Re.a}y ${s.Re.b}TD`,11:s&&`${s.Sk.a} sk`};")

r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m109.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- the Top 12 poll must never wrap a team's record onto its own line ----------
r("""<div class=row style="font-size:18px"><span>${n+1}. ${i==0?'▶ ':''}${T[i].n}</span><small>${T[i].w}-${T[i].l}</small></div>""",
  """<div class=row style="font-size:18px;gap:6px"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0">${n+1}. ${i==0?'▶ ':''}${T[i].n}</span><small style="flex:none;white-space:nowrap">${T[i].w}-${T[i].l}</small></div>""")
r("""<div class=row><span>${my}. ▶ ${m.n}</span><small>${m.w}-${m.l}</small></div>""",
  """<div class=row style="gap:6px"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0">${my}. ▶ ${m.n}</span><small style="flex:none;white-space:nowrap">${m.w}-${m.l}</small></div>""")

r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m110.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- the box score must use the handoffs that actually happened ----------
# g.rc counts every real carry by roster index, and endGame already captured it — then
# threw it away. bxSide invented a carry count instead, with a hard floor of 14 and an
# RB floor of 8, so handing off five times still printed 24 carries. For YOUR games the
# real counts are used, and the rushing yards are built from them. CPU games are
# untouched: nothing is tracked for those, so they still get a plausible line.
r(""" if(real&&isMe){const st=real;qbN=S.name;att=st.att;cmp=st.cmp;py=st.yds;pTD=st.td;int=st.int;qry=st.ry||0;qrtd=st.rtd||0;sk=st.sk||0;fum=st.fum||0;rTD=Math.max(0,tds-pTD-qrtd);ry=Math.max(qry+20,Math.round(ry));tot=py+ry}
 else if(isMe&&S.stage!='hs'&&!real){}
 const car=Math.max(14,Math.round((ry-qry)/(3.6+r()*1.6))),rbCar=Math.max(8,Math.round(car*(.72+r()*.12))),rb2Car=Math.max(0,car-rbCar);
 const rbY=Math.round((ry-qry)*rbCar/Math.max(1,car)),rb2Y=ry-qry-rbY;const rbTD=Math.max(0,rTD-qrtd);""",
""" const RC=(opts&&opts.rc)||null,useReal=!!(real&&isMe&&RC);
 if(real&&isMe){const st=real;qbN=S.name;att=st.att;cmp=st.cmp;py=st.yds;pTD=st.td;int=st.int;qry=st.ry||0;qrtd=st.rtd||0;sk=st.sk||0;fum=st.fum||0;rTD=Math.max(0,tds-pTD-qrtd);
  if(!useReal){ry=Math.max(qry+20,Math.round(ry))}
  tot=py+ry}
 else if(isMe&&S.stage!='hs'&&!real){}
 let car,rbCar,rb2Car,rbY,rb2Y;
 if(useReal){
  rbCar=Math.max(0,RC[1]|0);rb2Car=Math.max(0,RC[3]|0);qcar=Math.max(0,(RC[0]|0)||(qry!=0?1:0));
  car=rbCar+rb2Car;
  rbY=rbCar?Math.round(rbCar*(3.3+r()*2.5)):0;
  rb2Y=rb2Car?Math.round(rb2Car*(3.8+r()*3.2)):0;
  ry=qry+rbY+rb2Y;tot=py+ry;
 }else{
  car=Math.max(14,Math.round((ry-qry)/(3.6+r()*1.6)));rbCar=Math.max(8,Math.round(car*(.72+r()*.12)));rb2Car=Math.max(0,car-rbCar);
  rbY=Math.round((ry-qry)*rbCar/Math.max(1,car));rb2Y=ry-qry-rbY;
 }
 const rbTD=Math.max(0,rTD-qrtd);""")

# carry the real counts from the whistle through to the box score
r("function bxMake(w,a,b,sa,sb,real){const r=bxRng(bxHash(bxKey(w,a,b)+'|'+sa+'-'+sb));const A=bxSide(a,sa,{},r,real),B=bxSide(b,sb,{},r,null);",
  "function bxMake(w,a,b,sa,sb,real,rc){const r=bxRng(bxHash(bxKey(w,a,b)+'|'+sa+'-'+sb));const A=bxSide(a,sa,{rc:rc||null},r,real),B=bxSide(b,sb,{},r,null);")
r("const bx=bxMake(pre.w,0,pre.oi,g.s[0],g.s[1],pre.st&&pre.st.att!=null&&g.st&&!g.iwF?pre.st:null);",
  "const bx=bxMake(pre.w,0,pre.oi,g.s[0],g.s[1],pre.st&&pre.st.att!=null&&g.st&&!g.iwF?pre.st:null,pre.rc||null);")

# g.rc counts catches as well as handoffs, so it is a TOUCH counter and cannot be used
# as carries. A dedicated counter is incremented only where the ball is actually handed off.
r("P.handed=1;P.car=P.rb;if(P.rb.ri!=null)(g.rc=g.rc||{})[P.rb.ri]=(g.rc[P.rb.ri]||0)+1;",
  "P.handed=1;P.car=P.rb;if(P.rb.ri!=null){(g.rc=g.rc||{})[P.rb.ri]=(g.rc[P.rb.ri]||0)+1;(g.rcar=g.rcar||{})[P.rb.ri]=(g.rcar[P.rb.ri]||0)+1}")
r("try{pre={w:S.wk||0,oi:g.oi,st:{...g.st},rc:{...(g.rc||{})}}}catch(e){}",
  "try{pre={w:S.wk||0,oi:g.oi,st:{...g.st},rc:{...(g.rc||{})},rcar:{...(g.rcar||{})}}}catch(e){}")
r("const bx=bxMake(pre.w,0,pre.oi,g.s[0],g.s[1],pre.st&&pre.st.att!=null&&g.st&&!g.iwF?pre.st:null,pre.rc||null);",
  "const bx=bxMake(pre.w,0,pre.oi,g.s[0],g.s[1],pre.st&&pre.st.att!=null&&g.st&&!g.iwF?pre.st:null,pre.rcar||null);")

# ---------- linebackers must never stand still ----------
# An underneath zone defender searched for a route within 9 yards of his landing spot.
# If nobody was there he returned that spot as his target and simply stood on it, so any
# play with the routes deep or outside left three or four linebackers rooted. A real
# linebacker keeps his feet: he opens toward the nearest route, mirrors the quarterback,
# and keeps sinking as the play extends.
r(""" if(zw){const tx=zw.x+(zw.vx||0)*.3,ty=Math.min(zw.y+(zw.vy||0)*.2+.8,d.zy+5),s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>1.6?Math.max(1.05,((zw.sp||8)*.9)/d.sp):0;return[tx,ty]}
 return[d.zx*.85+(q?q.x:26.5)*.15,d.zy]}""",
""" if(zw){const tx=zw.x+(zw.vx||0)*.3,ty=Math.min(zw.y+(zw.vy||0)*.2+.8,d.zy+5),s_=Math.hypot(tx-d.x,ty-d.y);d.cbB=s_>1.6?Math.max(1.05,((zw.sp||8)*.9)/d.sp):0;return[tx,ty]}
 // nobody in my area: open toward the nearest route instead of parking on the spot
 const qx=q?q.x:26.5;let nw=null,nd=1e9;
 P.wr.forEach(w=>{if(!w||w.out)return;const dd=Math.hypot(w.x-d.zx,w.y-d.zy);if(dd<nd){nd=dd;nw=w}});
 const sink=Math.min(5.2,Math.max(0,(P.t||0)-.5)*1.5);       // keep dropping as it develops
 let tx=d.zx+(qx-d.zx)*.2,ty=d.zy+sink;
 if(nw){const k=cl((nd-5)/16,.1,.34);
  tx=d.zx+(nw.x-d.zx)*k+(qx-d.zx)*.1;
  ty=d.zy+sink+(nw.y-d.zy)*k*.3;
  d.cbB=Math.hypot(tx-d.x,ty-d.y)>1.6?Math.max(1.02,((nw.sp||8)*.85)/d.sp):0;
 }
 // he widens and sinks, he does NOT abandon the middle to chase
 tx=cl(tx,d.zx-6.5,d.zx+6.5);ty=cl(ty,d.zy-1,d.zy+6);
 return[cl(tx,-2,55),ty]}""")

# a CPU running back should not carry it 32 times either
r("car=Math.max(14,Math.round((ry-qry)/(3.6+r()*1.6)));rbCar=Math.max(8,Math.round(car*(.72+r()*.12)));rb2Car=Math.max(0,car-rbCar);",
  "car=cl(Math.round((ry-qry)/(3.6+r()*1.6)),13,30);rbCar=cl(Math.round(car*(.68+r()*.12)),7,24);rb2Car=Math.max(0,car-rbCar);")

# ---------- 🎯 the swipe follows your finger (screen-space targeting + hit boxes) ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m111.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- names are permanent; draft classes are frozen once generated ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m112.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- a record must NEVER break onto its own line — everywhere, not one screen ----------
# Tyler reported this on the Top 12 poll and again on the conference standings. Patching
# each screen as it turns up just leaves the next one broken, so the rule goes in the
# stylesheet and covers every row in the game: the value on the right of a row keeps its
# own width and never wraps. The label on the left is untouched and still wraps freely.
r(".row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:3px 0}",
  ".row{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:3px 0}"
  ".row>*:last-child:not(:first-child){flex:0 0 auto;white-space:nowrap}"
  ".row>*:first-child:not(:last-child){min-width:0}")

# ---------- 🏈 the extra point is a kick you watch, not a coin flip ----------
# Field goals already play out on the field — there is a whole kick animation. The extra
# point skipped all of it: one hidden random roll and the score moved. It now runs the
# same kick, from the right distance for the level, and the result lands when the ball does.
r("function xp(){ovHide();if(R()<fgP(g.lv=='pro'?33:20,KKt(0),g.lv))g.s[0]++;drvEnd(25,'Touchdown')}",
  "function xp(){ovHide();$('#lb').style.display='none';$('#spk').style.display='none';"
  "const d=g.lv=='pro'?33:20;g.y=117-d;g.los=g.y;g.tk=0;g.ph='kick';"
  "g.kk={t:0,ok:R()<fgP(d,KKt(0),g.lv),d,sd:R()<.5?-1:1,xp:1};g.msg=''}")

r("if(K.t>1.9&&!K.sh){K.sh=1;g.msg=K.ok?'FIELD GOAL IS GOOD! ('+K.d+' yds)':'NO GOOD ('+K.d+' yds)'}",
  "if(K.t>1.9&&!K.sh){K.sh=1;g.msg=K.xp?(K.ok?'EXTRA POINT IS GOOD!':'NO GOOD!'):(K.ok?'FIELD GOAL IS GOOD! ('+K.d+' yds)':'NO GOOD ('+K.d+' yds)')}")

r("if(K.t>3.3){const ok=K.ok,d=K.d;g.kk=null;g.ph='pre';g.msg='';if(P){P.wb=null;P.fy=null}if(ok){g.s[0]+=3;drvEnd(25,'Field goal good ('+d+' yds)')}else drvEnd(Math.max(100-g.los,20),'Field goal missed ('+d+' yds)')}}",
  "if(K.t>3.3){const ok=K.ok,d=K.d,isXP=!!K.xp;g.kk=null;g.ph='pre';g.msg='';if(P){P.wb=null;P.fy=null}"
  "if(isXP){if(ok)g.s[0]++;return drvEnd(25,ok?'Touchdown, extra point good':'Touchdown, extra point missed')}"
  "if(ok){g.s[0]+=3;drvEnd(25,'Field goal good ('+d+' yds)')}else drvEnd(Math.max(100-g.los,20),'Field goal missed ('+d+' yds)')}}")

# the live kick handler is the one a later module installed, not the original — patch THAT
r("else if(K.ok){g.s[0]+=3;drvEnd(25,'Field goal good ('+K.d+' yds)')}",
  "else if(K.xp){if(K.ok)g.s[0]++;return drvEnd(25,K.ok?'Touchdown, extra point good':'Touchdown, extra point missed')}"
  "else if(K.ok){g.s[0]+=3;drvEnd(25,'Field goal good ('+K.d+' yds)')}")
r("msg=o.ok?'IT\\'S GOOD! ('+o.d+' yds)':o.short?'NO GOOD: short ('+o.d+' yds)':'NO GOOD: wide '+(o.sd<0?'left':'right')+' ('+o.d+' yds)'",
  "msg=(K.xp?(o.ok?'EXTRA POINT IS GOOD!':o.short?'NO GOOD: short':'NO GOOD: wide '+(o.sd<0?'left':'right')):(o.ok?'IT\\'S GOOD! ('+o.d+' yds)':o.short?'NO GOOD: short ('+o.d+' yds)':'NO GOOD: wide '+(o.sd<0?'left':'right')+' ('+o.d+' yds)'))")

# ---------- 🏅 player of the year: leaders with their real numbers, nothing truncated ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m113.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🦬 Buffalo Blizzard -> Buffalo Chills ----------
r("Buffalo|Blizzard","Buffalo|Chills")
r("'Go Blizzard!'","'Go Chills!'")
r("Buffalo Blizzard · QB","Buffalo Chills · QB")

# ---------- 📣 the fan ceiling was 15 million ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m114.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# fans() is a const arrow function, so a wrapper never replaces it — the ceiling and the
# legacy multiplier go straight into the formula. 15 million was the hard cap before.
r("const v=Math.min(b*pf*athF(),15e6*athF());",
  "const v=Math.min(b*pf*athF()*((typeof fanLegacy=='function')?fanLegacy():1),9e9*athF());")

# existing saves still carry the old team name
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  "(()=>{try{if(typeof mig!='function')return;const _m=mig;mig=function(s){s=_m.apply(this,arguments);"
  "try{(s.T||[]).forEach(t=>{if(t&&t.n&&/Blizzard/.test(t.n))t.n=t.n.replace(/Blizzard/g,'Chills')})}catch(e){}"
  "return s}}catch(e){}})();"
  "addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- ✏️ roster edits must survive leaving the editor ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m115.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 📊 season stats = the sum of every game log, for every player ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m116.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# the permanent history row must be the season that was actually played
r("""let v;
if(s&&k==0)v=[s.P.a,s.P.b,s.P.c,Math.round(s.P.a/(10.8+r()*1.6)),...sVals('q',x.ovr,gp,1,r,(x.rs||0)*agQ(x.age)).slice(4)];else if(s&&k==1)""",
  """let v;
const _zv=(typeof szArchiveV=='function')?szArchiveV(i,x,g):null;
if(_zv)v=_zv;else if(s&&k==0)v=[s.P.a,s.P.b,s.P.c,Math.round(s.P.a/(10.8+r()*1.6)),...sVals('q',x.ovr,gp,1,r,(x.rs||0)*agQ(x.age)).slice(4)];else if(s&&k==1)""")

# ---------- 🧾 nobody disappears; every move is a recorded transaction ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m117.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# a way into the transactions wire
r("<button class=g onclick=rosv()>Rosters</button>",
  "<button class=g onclick=rosv()>Rosters</button><button class=g onclick=txV()>🧾 Transactions</button>",5)

# ---------- 🔁 rosters filed under the wrong team ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m118.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🧬 EVERY PLAYER'S LIFE MATTERS: the slot-indexed abbreviation table ----------
# TA is canonical order but 29 call sites index it with a SLOT. The user's club sits at
# slot 0 by design, so every one of those printed the wrong team. TAC keeps the canonical
# order for tAb; TA is kept in step with S.T. Nothing is written to any save.
# the ten SLOT-indexed reads of TA. Every one of these takes its index from a loop over
# S.T, from an 'h.N' roster key, or from a history row's h[1] — all slot numbers. They
# now read the slot table. The nineteen canonical reads (TA[pIdx(t)], indexes into
# S.pro, the record book's .ti) are deliberately left alone: they were always right.

# NOT CHANGED, DELIBERATELY: tmAdd's `ti`, S.utm's `ti` and a history row's h[1] are
# CANONICAL indices into TA, not roster slots. Proven on a real save: for the 27 players
# who have only ever been at one club, the canonical reading of their last row matches
# their own `tm` record 27 times out of 27 and the slot reading 0 times. Axel Jean's rows
# all read index 14 -> canonical LV, which is his record; the slot reading gives NYS.
# Changing these broke correct code in V227 and is reverted. Only genuinely slot-indexed
# reads belong on tSlot().

# the award-leader builders, both of which loop over S.T
r("if(!best[k]||val>best[k].val)best[k]={val,x,line,tm:(TA[i]",
  "if(!best[k]||val>best[k].val)best[k]={val,x,line,tm:((typeof tSlot=='function'?tSlot(i):TA[i])",2)

r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m119.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🎃 the Halloween event is over: out of the store, kept in the wardrobe ----------
# Costumes already owned stay owned, the keepsake stays claimable, and HWALL still knows
# every item so the wardrobe can render it. Only the storefront closes — and it closes by
# the event's own end date, so a future event opens it again with no code change.
r("try{HWC.forEach(c=>SHOP.push([c[0],'hw',c[1],c[2],c[2],0,{fans:1}]));COSC.forEach(c=>SHOP.push([c[0],'cos',c[1],c[2],c[2],0,{fans:1}]));SHC.hw='🎃 Halloween';SHC.cos='🦸 Costumes'}catch(e){}",
  "try{if(hwOn()){HWC.forEach(c=>SHOP.push([c[0],'hw',c[1],c[2],c[2],0,{fans:1}]));SHC.hw='🎃 Halloween'}COSC.forEach(c=>SHOP.push([c[0],'cos',c[1],c[2],c[2],0,{fans:1}]));SHC.cos='🦸 Costumes'}catch(e){}")

# ---------- 🧬 one resolver for a player's club, and a standing verifier ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m120.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🔒 the 14-season cap that was DELETING a player's oldest seasons ----------
# x.h.push([yr,pi,...v]);if(x.h.length>14)x.h.splice(0,x.h.length-14)
# Play a fifteenth year and your rookie season is gone forever. 142 players in Tyler's
# save sit exactly on that cap. Nothing is trimmed now; a career keeps every season.
r("x.h.push([yr,pi,...v]);if(x.h.length>14)x.h.splice(0,x.h.length-14);",
  "x.h.push([yr,pi,...v]);")

# ---------- 🔒 the record is sealed: the past may grow, it may never change ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m121.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🏅 awards are sealed: a ring is never un-won, a winner never changes ----------
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m122.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# ---------- 🧾 a recovered season shows on the career card, honestly ----------
# x.hx holds seasons the game had already dropped: the year and the club are known, the
# stat line never existed. They are merged into the card for display only, marked so it
# is clear the numbers were never recorded rather than being zero.
r("const T=S.T[i],g=SG(x.pos),H=(x.h||[]).slice().reverse(),c=x.cs||{},a=x.aw||{};",
  "const T=S.T[i],g=SG(x.pos),H=((typeof hxMerge=='function')?hxMerge(x):(x.h||[]).slice().reverse()),c=x.cs||{},a=x.aw||{};")

r("""<span>${r[0]} ${TA[r[1]]||''}</span><span>${r.slice(2,g=='q'?7:4).map(n=>n.toLocaleString()).join(' / ')}</span>""",
  """<span>${r[0]} ${TA[r[1]]||''}</span><span>${r.length<3?'<small style="opacity:.65">season played · stats not recorded</small>':r.slice(2,g=='q'?7:4).map(n=>n.toLocaleString()).join(' / ')}</span>""")

# m123: Halloween keepsake is one gift - a pick already in any save counts as used
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m123.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# version label bump (Tyler, 2026-11-14: "You can change it to V 0.0.1.0002")
assert h.count("V 0.0.1.0001")==3, h.count("V 0.0.1.0001")
h=h.replace("V 0.0.1.0001","V 0.0.1.0002")

# m124: linemen and kickers get a career (x.hp rows written at season end, sealed, shown)
r("tmAdd(x,pi);if(!g)return;let v;",
  "tmAdd(x,pi);if(!g){try{hpAdd(x,yr,pi)}catch(e){}return}let v;")
r("""${g&&H.length?`<div class=card><b>Season by season</b><br><small>${hd}</small>${H.slice(0,16).map(r=>`<div class=row style="font-size:16px"><span>${r[0]} ${TA[r[1]]||''}</span><span>${r.length<3?'<small style="opacity:.65">season played · stats not recorded</small>'""",
  """${H.length?`<div class=card><b>Season by season</b><br><small>${hd}</small>${H.map(r=>`<div class=row style="font-size:16px"><span>${r[0]} ${TA[r[1]]||''}</span><span>${r.length<3?(g?'<small style="opacity:.65">season played · stats not recorded</small>':'<small style="opacity:.65">season played · no stats kept for this position</small>')""")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m124.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m125: coaches' lives matter - permanent id + career record for every coach and GM
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m125.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m126: clothing brands are rivals - one house at a time, own events, own celebrities
r("S.spe={k,L,done:[]};if(L.length)S.fmsg",
  "try{if(typeof brWeekFilter=='function')brWeekFilter(L)}catch(e){}S.spe={k,L,done:[]};if(L.length)S.fmsg")
r("const fansC=CELB.map(celOb).filter(celCanCome),others=CELB.map(celOb).filter(o=>!fansC.some(x=>x.id==o.id)&&",
  "const fansC=CELB.map(celOb).filter(celCanCome).filter(o=>typeof brOkAt!='function'||brOkAt(v,o.id)),others=CELB.map(celOb).filter(o=>(typeof brOkAt!='function'||brOkAt(v,o.id))&&!fansC.some(x=>x.id==o.id)&&")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m126.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m127: 100 OVR "historic season" = the league's single-season record, no random 100s
r("chk(0,s.P.b,43,37,","chk(0,s.P.b,h1R('ptd',43),37,")
r("chk(1,s.Ru.a,1900,1700,","chk(1,s.Ru.a,h1R('ryd',1900),1700,")
r("chk(2,s.Re.a,1880,1650,","chk(2,s.Re.a,h1R('cyd',1880),1650,")
r("chk(11,s.Sk.a,20,15,","chk(11,s.Sk.a,h1R('sk',20),15,")
r("const v=R();x.hq=v<.04?1:v<.5?2:0;","const v=R();x.hq=v<.5?2:0;")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m127.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m127b: or two straight seasons within 5% of the record
r("x.hq=v>=hi?1:v>=el?2:0;if(x.hq==1&&x.ovr<100)out.push(`${x.n} (${t.n} ${x.pos}, ${lab})`)",
  "x.hq=(v>=hi||(typeof h2Run=='function'&&h2Run(x,v,hi)))?1:v>=el?2:0;if(x.hq==1&&x.ovr<100)out.push(`${x.n} (${t.n} ${x.pos}, ${lab}${v<hi?', 3rd straight near-record season':''})`)")

# m128: made-up colleges rated as the small schools (ratings only, once per save)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m128.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# draft class screen: the followed group is NOT Tyler's class (Tyler 2026-11-14: "It says my class, but
# that's not my class. That's just the first class that I put in the game.")
r("Your class — ","First class followed — ",5)

# m129: no invite spam - studio 3/yr and each song once, Pot McGee 2/yr (+Pro Bowl interview), parties 4/yr
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m129.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m130: every player's award counts match League History (only ever raised; shared names untouched)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m130.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m131: all-time leaders list each man once for award categories
r("const L=LBP(LBS[LBV.lv][LBV.c]||'').concat(lbIn(LBV.lv,LBV.c))",
  "const L=(typeof lbMerge=='function'?lbMerge(LBP(LBS[LBV.lv][LBV.c]||''),lbIn(LBV.lv,LBV.c),LBV.c):LBP(LBS[LBV.lv][LBV.c]||'').concat(lbIn(LBV.lv,LBV.c)))")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m131.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# version label bump (Tyler, 2026-11-14: "Next update, make it 0003. I want to see if the updates on my home screen app")
assert h.count("V 0.0.1.0002")==3, h.count("V 0.0.1.0002")
h=h.replace("V 0.0.1.0002","V 0.0.1.0003")

# m132: real pro playoff bracket with seeds + records; records added to HS and CFP brackets
r("lab=i=>i==null?'TBD':(P.sd&&P.sd[i]?P.sd[i]+' ':'')+T[i].n.split(' ')[0].slice(0,7),",
  "lab=i=>i==null?'TBD':(P.sd&&P.sd[i]?P.sd[i]+' ':'')+T[i].n.split(' ')[0].slice(0,6)+' '+(T[i].w||0)+'-'+(T[i].l||0),")
r("lab=i=>i==null?'TBD':sn(i)+' '+T[i].n.split(' ')[0].slice(0,7);",
  "lab=i=>i==null?'TBD':sn(i)+' '+T[i].n.split(' ')[0].slice(0,6)+' '+(T[i].w||0)+'-'+(T[i].l||0);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m132.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m133: throwing power table + level scaling + archetype upgrade costs + power/speed never drop pre-regression
r("""onclick="up('${k}')">+1</button>""","""onclick="up('${k}')">+1${typeof upCostTxt=='function'?upCostTxt(k):''}</button>""",3)
r("thrR=()=>14+((S&&S.q&&S.q.pow)||60)*.55","thrR=()=>(typeof pwYds=='function'?pwYds((S&&S.q&&S.q.pow)||60)*pwLv():14+((S&&S.q&&S.q.pow)||60)*.55)")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m133.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m133b: short/medium swipes keep their old distance; only full swipes reach the new max (swipe + slingshot)
r("let d=Math.max(5,Math.min(1,p)*Rg);","let d=Math.max(5,typeof thrD=='function'?thrD(p):Math.min(1,p)*Rg);")
r("k=slPow(m)*thrR();","k=(typeof thrD=='function'?thrD(slPow(m)):slPow(m)*thrR());")

# m135: no stat inflation in CPU box scores (new games only; games already played keep their lines)
r("const tds=Math.max(0,Math.floor(pts/7)-(pts%7==6?0:0)),fg=Math.floor((pts-tds*7)/3);",
  "const _N=typeof bxNew=='function'&&bxNew(),tds=_N?bxTds(pts,r):Math.max(0,Math.floor(pts/7)-(pts%7==6?0:0)),fg=Math.floor((pts-tds*7)/3);")
r("let tot=Math.round(cl(185+pts*7.2+(r()-.5)*90,110,640))","let tot=Math.round(cl((_N?160+pts*6.4:185+pts*7.2)+(r()-.5)*90,110,640))")
r("rbCar=cl(Math.round(car*(.68+r()*.12)),7,24)","rbCar=cl(Math.round(car*(_N?.6+r()*.12:.68+r()*.12)),7,24)")
r("const rbTD=Math.max(0,rTD-qrtd);","const _rbT=Math.max(0,rTD-qrtd),rbTD=_N&&!(real&&isMe)?bxRbTd(_rbT,r):_rbT;if(_N&&!(real&&isMe)&&_rbT>rbTD)qrtd+=_rbT-rbTD;")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m135.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("let pTD=Math.round(tds*(.5+r()*.25)),rTD=tds-pTD;","let pTD=Math.round(tds*(_N?.46+r()*.18:.5+r()*.25)),rTD=tds-pTD;")
r("recT=bxSplit(pTD,[.34,.24,.12,.22,.08],r)","recT=(_N&&typeof bxPick=='function'?bxPick(pTD,[.34,.24,.12,.22,.08],r):bxSplit(pTD,[.34,.24,.12,.22,.08],r))")

# skeleton outfits: the built-in skull is a MASK. Tyler 2026-11-14: "I picked no headwear, but my skull
# mask is still on." Drawn only if he has never chosen headwear (old look kept); "No headwear" shows his
# face; the Skull mask headwear (hatOn) still puts the skull on.
r("B(.68,.66,.68,C,0,2.37,0,m);[-.15,.15].forEach(x=>{B(.18,.17,.03,K,x,2.44,-.345,m)});B(.07,.09,.03,K,0,2.3,-.345,m);B(.42,.03,.03,K,0,2.19,-.345,m);[-.13,-.045,.045,.13].forEach(x=>B(.02,.1,.03,K,x,2.19,-.346,m));",
  "if(typeof S=='undefined'||!S||S.hat==null){B(.68,.66,.68,C,0,2.37,0,m);[-.15,.15].forEach(x=>{B(.18,.17,.03,K,x,2.44,-.345,m)});B(.07,.09,.03,K,0,2.3,-.345,m);B(.42,.03,.03,K,0,2.19,-.345,m);[-.13,-.045,.045,.13].forEach(x=>B(.02,.1,.03,K,x,2.19,-.346,m))}")

# m136: controller support phase 1 (menus everywhere, walking, QB movement, run moves, basic receiver-button throws)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m136.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m137: home and away jerseys (Dallas wears white at home)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m137.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m138: cloud saves split into pieces (any size fits), failures shown, short codes for big saves
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m138.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m139: restore an earlier save (the device's two backups per slot), from the main menu
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m139.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m140: a save never goes backwards (Tyler 2026-11-14: "every season saves exactly the week that it's at ... even in future updates" / "Fix it")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m140.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
assert h.count("V 0.0.1.0003")==3, h.count("V 0.0.1.0003")
h=h.replace("V 0.0.1.0003","V 0.0.1.0004")

# m141: a card only lists clubs a player really played for (Tyler 2026-11-14: "Miles Garrett's not playing for the Chiefs when he never played for the Chiefs")
r("(x.tm&&x.tm.length?x.tm:[tAb(T)]).join(', ')","(typeof plClubs=='function'?plClubs(x,T):(x.tm&&x.tm.length?x.tm:[tAb(T)])).join(', ')")
assert h.count("t:(x.tm||[]).join(', ')")==2, h.count("t:(x.tm||[]).join(', ')")
h=h.replace("t:(x.tm||[]).join(', ')","t:(typeof plClubs=='function'?plClubs(x):(x.tm||[])).join(', ')")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m141.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m142: high school and college careers kept like the pros (Tyler 2026-11-14: "make sure it goes the same from high school to college throughout")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m142.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
assert h.count("V 0.0.1.0004")==3, h.count("V 0.0.1.0004")
h=h.replace("V 0.0.1.0004","V 0.0.1.0005")

# m143: award ballots show every finalist's season (Tyler 2026-11-14 screenshot: "Doesn't show all stats")
assert h.count("${c.ln||''}")==2, h.count("${c.ln||''}")
h=h.replace("${c.ln||''}","${(typeof awLn=='function'?awLn(c,A.yr||yrN()):(c.ln||''))}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m143.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
assert h.count("V 0.0.1.0005")==3, h.count("V 0.0.1.0005")
h=h.replace("V 0.0.1.0005","V 0.0.1.0006")

# m144: season form for every team's passing game, CPU and your simmed games (Tyler 2026-11-14: "make sure that that's not OP")
r("let pTD=Math.round(tds*(_N?.46+r()*.18:.5+r()*.25)),rTD=tds-pTD;",
  "let pTD=Math.min(tds,Math.round(tds*(_N?.46+r()*.18:.5+r()*.25)*(typeof bxForm=='function'?bxForm(ti):1))),rTD=tds-pTD;")
r("td:Math.min(5,Math.round(sg[0]/12+gs()*.5)),int:R()<.5?ri(0,2):0,sk:ri(0,4),ry:ri(0,30),fum:R()<.12?1:0};addStats(st,w,k=='pp')",
  "td:(typeof simTd=='function'?simTd(sg[0],gs(),Math.min(5,Math.round(sg[0]/12+gs()*.5))):Math.min(5,Math.round(sg[0]/12+gs()*.5))),int:R()<.5?ri(0,2):0,sk:ri(0,4),ry:ri(0,30),fum:R()<.12?1:0};addStats(st,w,k=='pp')")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m144.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
assert h.count("V 0.0.1.0006")==3, h.count("V 0.0.1.0006")
h=h.replace("V 0.0.1.0006","V 0.0.1.0007")

# m144+: simmed passing yards also follow the pass catchers (Tyler 2026-11-14: "receivers and tight ends really do play a big part")
r("sh=.5+r()*.18,py=Math.round(tot*sh)","sh=cl((.5+r()*.18)*(typeof bxRecv=='function'?(1+(bxRecv(ti)-1)*.6):1),.4,.75),py=Math.round(tot*sh)")

# m145: college to the pros — draft classes are the real college players (Tyler 2026-11-14: "make sure it goes the same from high school to college throughout")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m145.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m146: the Ultra Bowl MVP ballot is one real box score of the final (Tyler 2026-11-14: "Did two quarterbacks play in the Super Bowl actually?")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m146.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("  if(r.at==='lost')return;\n  // a college player who is no longer on a roster",
  "  if(r.at==='lost'||r.at==='away'||(typeof pcAway=='function'&&pcAway(s,n)))return;\n  // a college player who is no longer on a roster")

# m147: QB rushing TDs follow the QB's style (Tyler 2026-11-14: Ham Luther "19 rushing touchdowns ... he's not really a running quarterback")
r("const _rbT=Math.max(0,rTD-qrtd),rbTD=_N&&!(real&&isMe)?bxRbTd(_rbT,r):_rbT;if(_N&&!(real&&isMe)&&_rbT>rbTD)qrtd+=_rbT-rbTD;",
  "const _rbT=Math.max(0,rTD-qrtd),_sp=_N&&!(real&&isMe)?(typeof bxRbSplit=='function'?bxRbSplit(_rbT,r,qbN):{rb:bxRbTd(_rbT,r),qb:0}):{rb:_rbT,qb:0},rbTD=_sp.rb;if(_N&&!(real&&isMe)&&typeof bxRbSplit!='function'&&_rbT>rbTD)qrtd+=_rbT-rbTD;else qrtd+=_sp.qb;")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m147.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("let qbN=nm(0),qry=Math.round((r()-.2)*30),qrtd=0","let qbN=nm(0),qry=(_N&&typeof qbRunY=='function')?qbRunY(nm(0),r()):Math.round((r()-.2)*30),qrtd=0")

# m148: Ham Luther 2036 fix, simmed training points 1/3, instant starter, ratings card (Tyler 2026-11-14 afternoon)
assert h.count("S.pts+=athP(2+(w?1:0));")==3, h.count("S.pts+=athP(2+(w?1:0));")
h=h.replace("S.pts+=athP(2+(w?1:0));","S.pts+=athP(typeof simPts=='function'?simPts(st,w):2+(w?1:0));")
assert h.count("if(!S.bench&&S.gs.length>=3")==2, h.count("if(!S.bench&&S.gs.length>=3")
h=h.replace("if(!S.bench&&S.gs.length>=3","if(!S.bench&&!S.instS&&S.gs.length>=3")
r("isStarter=()=>qo(S.q)>=S.sq-2,","isStarter=()=>!!S.instS||qo(S.q)>=S.sq-2,")
r("pStarter=()=>qo(S.q)>=S.sq-2,","pStarter=()=>!!S.instS||qo(S.q)>=S.sq-2,")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m148.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m149: Goatie's roster + Yeezers (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m149.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m150: every draft listed and watchable, live when it happens (Tyler 2026-11-14)
r("const ys=Object.keys(S.npb||{}).filter(y=>+y>=yrN());x+=ys.map(y=>`<button class=g onclick=\"dnWatch(${y})\">📺 Watch round 1 of the ${y} draft</button><button class=g onclick=\"npbV(${y},1)\">📋 ${y} draft: all 7 rounds</button>`).join('');",
  "x+=(typeof drBtns=='function'?drBtns():'');")
r("   yrs.map(y=>`<button onclick=\"dnWatch(${y})\">📺 Watch round 1 of the ${y} draft</button><button class=g onclick=\"npbV(${y},1)\">📋 ${y} draft: all 7 rounds (224 picks)</button>`).join('')+",
  "   (typeof drBtns=='function'?drBtns():yrs.map(y=>`<button onclick=\"dnWatch(${y})\">📺 Watch round 1 of the ${y} draft</button>`).join(''))+")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m150.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m147+: the rushing TDs the QB and lead back don't get go to the other ball carrier (st1 caught a 34-TD back)
r("...(rb2Car>2?[{n:nm(3),p:'WR',c:Math.min(3,rb2Car),y:rb2Y,td:0}]:[])]",
  "...((rb2Car>2||(typeof _sp!='undefined'&&_sp.o))?[{n:nm(3),p:'WR',c:Math.max(1,Math.min(3,rb2Car)),y:rb2Y,td:(typeof _sp!='undefined'&&_sp.o)||0}]:[])]")


# Tyler 2026-11-14: "Goaty's is the correct spelling" (after every module is in). Single-quoted spots get an escaped quote.
h=h.replace("Goatie\\'s","Goaty\\'s").replace("Goaties","Goaty\\'s").replace("Goatie's","Goaty's")
assert "Goatie" not in h

# m151: former teammates from the real records (EPLM)
r("const A=Lo.filter(x=>x&&x.al).slice(0,2);","const A=Lo.filter(x=>x&&(x.al||(typeof ftOf=='function'&&ftOf(x)))).slice(0,2);")
r("O.push({k:'fexm',n:p.n,pos:p.pos,al:p.al,x,z,m})","O.push({k:'fexm',n:p.n,pos:p.pos,al:p.al||(typeof ftAl=='function'?ftAl(p):1)||1,x,z,m})")
r("where=o.al==2?'at '+((S.calum||[]).find(x=>x.n==o.n)||{}).col:'back in high school'","where=(typeof ftWhere=='function'&&ftWhere(o.n))||(o.al==2?'at '+((S.calum||[]).find(x=>x.n==o.n)||{}).col:'back in high school')")
r("role:'Former teammate ('+(al==2?'college':'high school')+', '+pos+')'","role:'Former teammate ('+(al==3?'pro':al==2?'college':'high school')+', '+pos+')'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m151.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m152: locker room + home buttons right under Play / Sim, in blue (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m152.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m153: every draft prospect has a high school + college career (Tyler 2026-11-14: "they all need stats if they're getting drafted")
r("<small>${x.s}</small>","<small>${x.s}</small>${x.cs?'<br><small style=\"opacity:.8\">'+x.cs+'</small>':''}")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m153.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m154: one card, a whole career (EPLM)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m154.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m155: coaches move between levels, new saves only (Tyler: "progress from high school to college to pro")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m155.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m156: play as an existing college QB (Tyler 2026-11-14)
r("<button class=g onclick=tkStart()>🎭 Play as an existing pro QB</button>","<button class=g onclick=tkStart()>🎭 Play as an existing pro QB</button><button class=g onclick=tcStart()>🎓 Play as an existing college QB</button>")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m156.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m157: pro calendar clock, Pro Bowl week, pregnancy + birth on the clock, Sims-style scene (Tyler 2026-11-14 spec)
r("const nx=e.t=='bye'?'Bye week':e.t=='ppbye'?'Playoff bye (No. 1 seed)':",
  "const nx=e.t=='pbw'?'🌴 Pro Bowl week · the Ultra Bowl is next week':e.t=='bye'?'Bye week':e.t=='ppbye'?'Playoff bye (No. 1 seed)':")
r("<button onclick=play()>${e.t=='bye'||e.t=='ppbye'?'Continue':",
  "<button onclick=play()>${e.t=='bye'||e.t=='ppbye'||e.t=='pbw'?'Continue':")
r("${e.t!='bye'&&e.t!='ppbye'?injWB():''}${(e.t=='pro'||e.t=='pp')&&st?",
  "${e.t!='bye'&&e.t!='ppbye'&&e.t!='pbw'?injWB():''}${(e.t=='pro'||e.t=='pp')&&st?")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m157.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m158: raising your kids + the athlete path (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m158.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# m159: Pro Bowl voting + All-Star rosters + Pro Bowl week for everyone (Tyler 2026-11-14)
r("if(sc>=135||(S.gs.length&&avg(S.gs)>=78))aw.push('Pro Bowl')",
  "if((typeof pbMe=='function'&&pbMe()!==null)?pbMe():(sc>=135||(S.gs.length&&avg(S.gs)>=78)))aw.push('Pro Bowl')")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m159.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Tyler 2026-11-14: "Once you add kids, you can move the version number again"
assert h.count("V 0.0.1.0007")==3, h.count("V 0.0.1.0007")
h=h.replace("V 0.0.1.0007","V 0.0.1.0008")

# m160: your games record who really had the ball (Tyler 2026-11-14)
r("rcar:{...(g.rcar||{})}}}catch(e){}const r=_e.apply(this,arguments);",
  "rcar:{...(g.rcar||{})},pst:JSON.parse(JSON.stringify(g.pst||{}))}}catch(e){}const r=_e.apply(this,arguments);")
r("S.bx=S.bx||{};S.bx[bxKey(pre.w,0,pre.oi)]=bx;","S.bx=S.bx||{};S.bx[bxKey(pre.w,0,pre.oi)]=(typeof bxReal=='function'?bxReal(bx,pre):bx);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m160.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

# Tyler 2026-11-14: "I have it selected as buzz cut, and I'm still bald ... That should never happen unless I pick bald".
# The skeleton suit built the body with no hair (the skull used to cover the head); with no skull (no headwear / a hat),
# his own hair is drawn.
r("if(SKEL[id]){const C=SKEL[id][1],K=0x111111,F=-.29,Bk=.29;m=base({c1:'#111111',c2:'#111111',d:0,pc:'#111111'},0);",
  "if(SKEL[id]){const C=SKEL[id][1],K=0x111111,F=-.29,Bk=.29;m=base({c1:'#111111',c2:'#111111',d:0,pc:'#111111'},(typeof S!='undefined'&&S&&S.hat!=null)?1:0);")
# m161: Frank Castle -> Deep passer (Tyler asked)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m161.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m162: Equip everywhere up top + Halloween costumes off the fancy-event list (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m162.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m163: fans = one running total that only goes up, max 9 billion, real numbers in messages (Tyler 2026-11-14)
r("const v=Math.min(b*pf*athF()*((typeof fanLegacy=='function')?fanLegacy():1),9e9*athF());return v<1000",
  "let v=Math.min(b*pf*athF()*((typeof fanLegacy=='function')?fanLegacy():1),9e9*athF());if(typeof fanHold=='function')v=fanHold(v,p);return v<1000")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m163.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m164: sponsorships on/off + 5-step meter (middle = the old 7 offers); Pot McGee week 2 + playoffs (Tyler 2026-11-14)
r("pool.forEach(b=>{if(pick.length<7&&!pick.includes(b))pick.push(b)});","pool.forEach(b=>{if(pick.length<(typeof spN=='function'?spN():7)&&!pick.includes(b))pick.push(b)});")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m164.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m165: fumbles follow the carrying rating, played and simmed (Tyler 2026-11-14)
r("const f=cl(.011*Math.pow(d.str/70,1.5)*(70/(isq?S.q.sec:c.hands))*(sk?1.7:1)*(isq?1+Math.max(0,S.q.pow-65)*.008:1),.002,.08)",
  "const f=cl((typeof fumHit=='function'?fumHit(isq?S.q.sec:c.hands)*Math.pow(d.str/70,1.2)*(sk?1.4:1):.011*Math.pow(d.str/70,1.5)*(70/(isq?S.q.sec:c.hands))*(sk?1.7:1)*(isq?1+Math.max(0,S.q.pow-65)*.008:1)),.0002,.08)")
assert h.count("fum:R()<.12?1:0")>=1 and h.count("fum:R()<.15?1:0")>=1
h=h.replace("fum:R()<.12?1:0","fum:(typeof simFum=='function'?simFum():(R()<.12?1:0))").replace("fum:R()<.15?1:0","fum:(typeof simFum=='function'?simFum():(R()<.15?1:0))")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m165.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m166: throwing power + speed only fall to age regression (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m166.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m167: flirt with Mia whenever she talks to you (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m167.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m168: a deep swipe never dumps it to the running back (Tyler 2026-11-14)
r("P.wr.forEach(w=>{const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T,z=Math.hypot(ex-L[0],ey-L[1]);if(z<bd){",
  "P.wr.forEach(w=>{const T=Math.hypot(w.x-q.x,w.y-q.y)/(16+S.q.pow*.1),ex=w.x+w.vx*T,ey=w.y+w.vy*T,z=Math.hypot(ex-L[0],ey-L[1]);if(z<bd&&(typeof swOkT!='function'||swOkT(w,L,q,P.wr))){")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m168.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m169: accuracy moves season to season, resets at each new level (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m169.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m170: your own carries are real (Tyler 2026-11-14)
r("pst:JSON.parse(JSON.stringify(g.pst||{}))}}catch(e){}const r=_e.apply(this,arguments);",
  "pst:JSON.parse(JSON.stringify(g.pst||{})),qcar:(g.qcar||0)}}catch(e){}const r=_e.apply(this,arguments);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m170.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m171: watched drives run the simulated clock play by play (Tyler 2026-11-14)
r("PL.push({k:'fg',ok,y0:y,dn,tg})","PL.push({k:'fg',ok,y0:y,dn,tg,s:sec})")
r("PL.push({k:'punt',y0:y,net,dn,tg})","PL.push({k:'punt',y0:y,net,dn,tg,s:sec})")
r("PL.push({k:ky,gn,y0:y,dn,tg,fum:res=='Fumble',td:!res&&y+gn>=100})","PL.push({k:ky,gn,y0:y,dn,tg,fum:res=='Fumble',td:!res&&y+gn>=100,s:sec})")
r("g.clk=W_.c0+W_.dc*(W_.i/Math.max(1,W_.pl.length))","g.clk=(typeof wClk=='function'?wClk(W_.i):W_.c0+W_.dc*(W_.i/Math.max(1,W_.pl.length)))")
r("W_.cb=W_.c0+W_.dc*((W_.i+1)/Math.max(1,W_.pl.length))","W_.cb=(typeof wClk=='function'?wClk(W_.i+1):W_.c0+W_.dc*((W_.i+1)/Math.max(1,W_.pl.length)))")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m171.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Tyler 2026-11-14: "Extra point is broken. When you watch it, you don't see any of the players on the field. They're just
# kind of standing in random spots. Should simulate an actual field goal attempt every time you kick ... Extra point or field
# goal." The extra point reused the touchdown play's players wherever they ended up; now both teams line up for the kick.
r("const d=g.lv=='pro'?33:20;g.y=117-d;g.los=g.y;g.tk=0;g.ph='kick';",
  "const d=g.lv=='pro'?33:20;g.y=117-d;g.los=g.y;try{g.dn=1;g.tg=Math.min(10,100-g.y);setup(0);g.pl.xp=1;g.flash='';g.ft=0}catch(e){}g.tk=0;g.ph='kick';")
# m172: skin by heritage, mixed race by percent, own colour, parents who match (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m172.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m173: keeping 100 OVR: yards/TD checklist, C+ and losing streaks (Tyler 2026-11-14)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m173.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Tyler 2026-11-14: "The number can continue to move in the next artifact."
assert h.count("V 0.0.1.0008")==3, h.count("V 0.0.1.0008")
h=h.replace("V 0.0.1.0008","V 0.0.1.0009")
# m173: a 100 is never touched by age regression (Tyler 2026-11-14: "regression rules don't necessarily apply to 100 overalls")
r("const f=gf(),rgu=RGT[S.age],cpU=ageCap(S.age),o0=qo(S.q);","const k100_=qo(S.q)>=100,f=gf(),rgu=k100_?null:RGT[S.age],cpU=k100_?100:ageCap(S.age),o0=qo(S.q);")
# m173: winning it back is Ultra Bowl + MVP with 99s maxed (h100Tick), not MVP alone
r("if(aw.includes('MVP')&&S.e100&&qo(S.q)==99&&ageCap(S.age||0)>=100){","if(typeof h100BackOk!='function'&&aw.includes('MVP')&&S.e100&&qo(S.q)==99&&ageCap(S.age||0)>=100){")
# m174: potential hidden until studied; CPU teams draft on their own guesses (Tyler 2026-11-14)
r("${x.ovr}${x.pot!=null?'/'+x.pot:''} OVR","${x.ovr}${x.pot!=null?'/'+(typeof potVis=='function'?potVis(x):x.pot):''} OVR")
r('${p.pot!=null&&!(i==0&&j==0)?"/"+p.pot:""}','${p.pot!=null&&!(i==0&&j==0)?"/"+(typeof potVis=="function"?potVis(p):p.pot):""}')
r("${q.ovr} / ${q.me?'?':q.pot}","${q.ovr} / ${q.me?'?':(typeof potVis=='function'?potVis(q,1):q.pot)}")
r('<b>${p.ovr}<small style="opacity:.6">/${p.pot}</small></b>','<b>${p.ovr}<small style="opacity:.6">/${typeof potVis=="function"?potVis(p):p.pot}</small></b>')
r("const sc=p.gr+need(G)*2.2","const sc=p.gr+(typeof potKnowAdj=='function'?potKnowAdj(T.code||T.i,p,.45):0)+need(G)*2.2")
r("av.forEach(x=>{const s=dsc(x.p)+","av.forEach(x=>{const s=dsc(x.p)+(typeof potKnowAdj=='function'&&!x.p.me?potKnowAdj(ti,x.p,.35):0)+")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m174.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m175: one clock speed in your games; away whites (Tyler 2026-11-14)
r("SDT=g.ptN>=3?cl(g.ptS/g.ptN/23,.7,1.8):1;","SDT=(typeof sdtNow=='function'?sdtNow():(g.ptN>=3?cl(g.ptS/g.ptN/23,.7,1.8):1));")
r("mk(tex(String(lb.num),80,nc),1.45,1,1,.27,0);","mk(tex(String(lb.num),80,nc),1.45,j.aw?.56:1,j.aw?.56:1,.27,0);")
r("mk(tex(String(lb.num),80,nc),1.55,.5,.5,-.27,Math.PI)","mk(tex(String(lb.num),80,nc),1.55,j.aw?.4:.5,j.aw?.4:.5,-.27,Math.PI)")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m175.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m176: throw power + speed have their own regression from 36 (Tyler 2026-11-14)
r("for(const k in S.q){const d=rgu?-rgu[0]:Math.round(ri(0,2)*f);S.q[k]=cl(S.q[k]+d,25,Math.min(cpU,S.q[k]>=100?100:99))}",
  "for(const k in S.q){if(rgu&&typeof rgPM=='function'&&rgPM(k,S.age))continue;const d=rgu?-rgu[0]:Math.round(ri(0,2)*f);S.q[k]=cl(S.q[k]+d,25,Math.min(cpU,S.q[k]>=100?100:99))}")
r("${S.age==50?' This is your final season.':''}`:'';","${S.age==50?' This is your final season.':''}${S._rgpm||''}`:'';S._rgpm='';")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m176.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m176: the regression message talks about Tyler's overall list (each rating has its own ceiling now)
r("' Ratings now max out at '+cpU+'.'","' Your overall now maxes out at '+cpU+'.'")
r("Age ${S.age}: ratings max out at ${c}.","Age ${S.age}: your overall maxes out at ${c}.")
# m177: saves shown as loading until the cloud check is done; recently deleted kept in 3 places (Tyler 2026-11-15)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m177.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m178: swipe back to how it felt + throwaways + flick to a nearby back (Tyler 2026-11-15)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m178.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m179: fumbles rare, per carrier type (Tyler 2026-11-15)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m179.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Tyler 2026-11-15 (screenshot: coin toss, both teams in colour): "we're still getting color versus color matchups. It should
# default to home and away jerseys." The coin toss built its captains from each team's own colours and your custom jersey,
# not from the game's home/away jerseys (g.mj / g.oj, m137). Now the toss uses the same jerseys as the game.
r("const tj={c1:T.c1,c2:T.c2,d:T.d||0,pc:S.jy&&S.jy.pc||'#e8e8e8',nc:lum(T.c1)>.5?'#000':'#fff'},oj={c1:O_.c1,c2:O_.c2,d:O_.d||0,pc:O_.pc||'#dcdcdc',nc:lum(O_.c1)>.5?'#000':'#fff'};",
  "const tj=g.mj?{...g.mj}:{c1:T.c1,c2:T.c2,d:T.d||0,pc:S.jy&&S.jy.pc||'#e8e8e8',nc:lum(T.c1)>.5?'#000':'#fff'},oj=g.oj?{...g.oj}:{c1:O_.c1,c2:O_.c2,d:O_.d||0,pc:O_.pc||'#dcdcdc',nc:lum(O_.c1)>.5?'#000':'#fff'};")
r("const me=mk(DJ(),{nm:(S.jy&&S.jy.nm)||'',num:S.num},AP(),-2,-50.6,-Math.PI/2);",
  "const me=mk(g.mj?{...g.mj,nm:(S.jy&&S.jy.nm)||g.mj.nm||''}:DJ(),{nm:(S.jy&&S.jy.nm)||'',num:S.num},AP(),-2,-50.6,-Math.PI/2);")
# m180: Full statistics section (Tyler 2026-11-15)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m180.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Tyler 2026-11-15: "clock should move for every single play in the game, every single one. There shouldn't be any kind of
# slowdowns ... The only time it's going slow is when you're at the line" -> a watched play runs the game clock at the same
# speed as your own plays (g.rate), kicks included (they used to freeze the clock, then jump).
r("if(k=='fg'||k=='punt')return wKick(P,e,t,dt);const wq=wConvPre(P);upd(dt);if(W_.cb!=null)g.clk=W_.ca+(W_.cb-W_.ca)*Math.min(1,t/4.5);",
  "if(W_.cb!=null)g.clk=Math.min(W_.cb,W_.ca+t*(g.rate||12));if(k=='fg'||k=='punt')return wKick(P,e,t,dt);const wq=wConvPre(P);upd(dt);if(W_.cb!=null)g.clk=Math.min(W_.cb,W_.ca+t*(g.rate||12));")
# "after you get a first down in college ... once you're at the line the game clock will start moving" (last 2 minutes rule)
r("g.cr=false;g.note='First down: clock stops (college rule, last 2 minutes)'","g.cr=false;g.fdStop=1;g.note='First down: clock stops until the ball is set (college rule, last 2 minutes)'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m181.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m182: free agents to start with + play as an existing free-agent QB (Tyler 2026-11-15)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m182.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# EPLM: a new draft prospect never gets the name of anyone the save has ever known (current rosters were checked; players who
# retired or left during the season were not, so a rare prospect could share a retired player's name). gen1 caught it.
r("function lgClass(Y){const r=lgSeed('dc'+Y),taken=new Set();",
  "function lgClass(Y){const r=lgSeed('dc'+Y),taken=new Set();try{Object.values(S.seal||{}).forEach(o=>o&&o.n&&taken.add(o.n));Object.values((S.pc&&S.pc.p)||{}).forEach(e=>e&&e.n&&taken.add(e.n));if(S.vetP)taken.add(S.vetP.n)}catch(e){}")
# m183: existing roster additions (Tyler 2026-11-15)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m183.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m184: QB needs drive the drafts (Tyler 2026-11-15)
r("const sc=p.gr+(typeof potKnowAdj=='function'?potKnowAdj(T.code||T.i,p,.45):0)+need(G)*2.2","const sc=p.gr+(typeof potKnowAdj=='function'?potKnowAdj(T.code||T.i,p,.45):0)+(typeof qbAdj=='function'?qbAdj(pIdx(T.t),p)*.6:0)+need(G)*2.2")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m184.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m185.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m186.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m187.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("code:rjCode(t)};const r=_c.apply(this,arguments);","code:(typeof rjBest=='function'?rjBest(x,t):rjCode(t))};const r=_c.apply(this,arguments);")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m188.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# Tyler 2026-11-15: "whenever you give me this artifact, it's V 0.0.1.0010"
assert h.count("V 0.0.1.0009")==3, h.count("V 0.0.1.0009")
h=h.replace("V 0.0.1.0009","V 0.0.1.0010")
# Tyler 2026-11-15: the Manling family is now Manny (named family only; generated "Manling" last names stay)
for a,b in [('Pete Manling','Pete Manny'),('P. Manling','P. Manny'),('Archer Manling','Archer Manny'),('Eli Manning','Elijah Manny'),('E. Manning','E. Manny')]:
    h=h.replace(a,b)
assert 'Pete Manling' not in h and 'Archer Manling' not in h and 'P. Manling' not in h and 'Eli Manning' not in h and 'E. Manning' not in h
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m189.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m190: draft-day trades in the yearly league draft
r("for(let rd=1;rd<=7;rd++)ord.forEach((T,j)=>{","for(let rd=1;rd<=7;rd++){const ordR=ord.slice();ordR.forEach((T0,j)=>{const T=(typeof dtLg=='function'?dtLg(ordR,j,rd,P,Y):T0)||T0;")
r("big:rd<=2})});","big:rd<=2})})};")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m190.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m191: the sideline (both benches, you walking it, sideline / third-person / TV views while a drive is watched)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m191.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m192: controller polish (menus keep their place, watching a drive with a pad, camera button)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m192.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m193: saves that can't go missing (atomic cloud backups, per-slot loading/failed status, device backup rosters, compressed cloud restores)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m193.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m194: returning QBs start; restart a season from the device's copy; never open a pro career without its rosters
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m194.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m195: every player keeps his roster spot and position (no cutting starting spots; broken rosters put back in order)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m195.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# takeover of a backup QB: his own roster record becomes you (history kept), instead of being renamed into a made-up player
r("L.forEach((x,k)=>{if(k>0&&x&&x.n==S.name)x.n=uNm(Math.random)});",
  "L.forEach((x,k)=>{if(k>0&&x&&x.n==S.name)x._me2=1});{const d_=L.find(x=>x&&x._me2);if(d_&&L[0]){['h','cs','tm','aw','pid','dr'].forEach(f=>{if(d_[f]!=null&&(L[0][f]==null||(f=='h'&&!(L[0].h||[]).length)||(f=='tm'&&!(L[0].tm||[]).length)))L[0][f]=d_[f]})}for(let k_=L.length-1;k_>0;k_--)if(L[k_]&&L[k_]._me2)L.splice(k_,1)}")
# m196: linemen stance and blocking look right (legs under them, facing their man)
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m196.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# m197: made-up players never get the name of one of Tyler's players
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m197.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
# the calendar of an existing-QB career: 2026 + seasons played since the takeover (it was counting every pro year of his age)
r("n+=Math.max(0,S.py-1-p)}return (S.y0||2022)+n}","n+=Math.max(0,S.py-1-p-(S.tk&&S.tkY>1?S.tkY-1:0))}return (S.y0||2022)+n}")
r("try{const n=QNUM[ti];if(n!=null)S.num=n;S.jy=S.jy||{};S.jy.nm=nmLast(S.name);const L=rost('h.0');if(L&&L[0]&&L[0].n==S.name)L[0].num=S.num;S.tkY=S.py;","try{const n=QNUM[ti];if(n!=null)S.num=n;S.jy=S.jy||{};S.jy.nm=nmLast(S.name);const L=rost('h.0');if(L&&L[0]&&L[0].n==S.name)L[0].num=S.num;S.tkY=S.py;S.tkyf=1;")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m198.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
r("S.py=yrs;S.age=e.age;const L=rost('h.0'),bu=","S.py=yrs;S.tkY=yrs;S.tk=e.n;S.tkyf=1;S.age=e.age;const L=rost('h.0'),bu=")
# m199: rushing split by how good the back is; leftover carries to the backup RB, not a wide receiver
r("  rbY=Math.round((ry-qry)*rbCar/Math.max(1,car));rb2Y=ry-qry-rbY;\n }",
  "  rbY=Math.round((ry-qry)*rbCar/Math.max(1,car));rb2Y=ry-qry-rbY;\n }\n var _rb2=null;if(!useReal&&!(real&&isMe)&&typeof bxRush2=='function'){const R2=bxRush2(ti,L,ry,qry,car,r);if(R2){rbCar=R2.c1;rbY=R2.y1;rb2Car=R2.c2;rb2Y=R2.y2;_rb2=R2.n2||0;ry=qry+rbY+rb2Y;tot=py+ry}}")
r("...((rb2Car>2||(typeof _sp!='undefined'&&_sp.o))?[{n:nm(3),p:'WR',c:Math.max(1,Math.min(3,rb2Car)),y:rb2Y,td:(typeof _sp!='undefined'&&_sp.o)||0}]:[])]",
  "...(_rb2?(rb2Car>0?[{n:_rb2.n,p:'RB',c:rb2Car,y:rb2Y,td:(typeof _sp!='undefined'&&_sp.o)||0}]:[]):((rb2Car>(_rb2===0?0:2)||(typeof _sp!='undefined'&&_sp.o))?[{n:nm(3),p:'WR',c:Math.max(1,Math.min(3,rb2Car)),y:rb2Y,td:(typeof _sp!='undefined'&&_sp.o)||0}]:[]))]")
r("addEventListener('resize',resize);addEventListener('orientationchange'",
  M('m199.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")
