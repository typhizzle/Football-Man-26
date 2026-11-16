// ===================== in-game Yes/No and text boxes (the artifact blocks the browser's popups) =====================
// Any old confirm('...') shows an in-game Yes/No card. Tapping Yes runs the same button again, and that time confirm() answers yes.
let CF_EL=null,CF_OK=null,CF_P=null;
document.addEventListener('pointerdown',e=>{try{CF_EL=e.target&&e.target.closest?e.target.closest('[onclick]'):null}catch(_){}},true);
document.addEventListener('click',e=>{try{const el=e.target&&e.target.closest?e.target.closest('[onclick]'):null;if(el)CF_EL=el}catch(_){}},true);
window.confirm=function(msg){msg=String(msg==null?'':msg);if(CF_OK===msg){CF_OK=null;return true}const el=CF_EL;CF_P={msg,code:el?el.getAttribute('onclick'):null,el};
 ovShow(`<b style="color:#ffe93b">Are you sure?</b><p>${esc(msg)}</p><button onclick="cfYes()">Yes</button><button class=g onclick="cfNo()">No</button>`);return false};
function cfYes(){const p=CF_P;CF_P=null;ovHide();if(!p)return;CF_OK=p.msg;try{if(p.code)(new Function(p.code)).call(p.el);else if(p.el&&p.el.isConnected)p.el.click()}catch(e){console.warn(e)}CF_OK=null}
function cfNo(){CF_P=null;ovHide()}
window.alert=function(msg){ovShow(`<p>${esc(String(msg))}</p><button onclick="ovHide()">OK</button>`)};
// text input card: askText('Title','default',"fnName") calls fnName(value)
function askText(title,def,fn){ovShow(`<b style="color:#ffe93b">${esc(title)}</b><input id=asktx maxlength=30 value="${esc(def||'')}" style="width:100%;margin:8px 0"><button onclick="(function(){const v=(document.querySelector('#asktx').value||'').trim();ovHide();${fn}(v)})()">Save</button><button class=g onclick="ovHide()">Cancel</button>`);setTimeout(()=>{const i=$('#asktx');if(i)i.focus()},50)}
function kidName(i){const k=(S.kids||[])[i];if(!k)return famV();KIDI=i;askText('Name your '+(k.g=='b'?'son':'daughter'),k.n.split(' ')[0],'kidName2')}
let KIDI=0;function kidName2(v){const k=(S.kids||[])[KIDI];if(k&&v)k.n=v.slice(0,20)+' '+lastN();save();famV()}

// ===================== cheerleader looks: college squads look better at bigger schools =====================
// pro squads 64-99 (avg ~82) · college: small school 52-87 (avg ~70), big-time program 62-97 (avg ~80) · some small-school girls are just as good (dream school)
function gfLkRoll(p){const h=Math.abs(hsh(String(p.n)+'lk')),h2=Math.abs(hsh(String(p.n)+'dr'));if(p.pro||S.stage=='pro')return 74+h%26;
 let b=4;try{const t=(S.T||[]).find(x=>x.n==p.team);if(t)b=cl((t.ovr-50)/40,0,1)*10}catch(e){}
 return Math.min(99,Math.round(64+b*.8+h%28+(h2%9==0?6:0)))}
// cheerleaders mostly look good: older saves get bumped up to the new floor (girlfriends too)
function lkFloor(){try{const g_=S.gf;if(g_&&!g_.cel&&g_.lk!=null&&!g_.lkF){g_.lkF=1;const n=gfLkRoll(g_);if(g_.lk<n)g_.lk=n}}catch(e){}}

// ===================== team captain (the coach decides) =====================
// Every season the head coach names the team captain. Each coach weighs it differently: some care most about overall,
// some about seniority (years in the program), some about how much they trust you. Only the captain calls the coin toss.
function capYrs(){const st=S.stage||'hs';if(st=='hs')return S.yr||1;if(st=='col')return S.cy||1;return ((S.hist||[]).filter(x=>/^P/.test(String(x.y||''))).length||0)+1}
function captEns(){const st=S.stage||'hs',k=st+yrN();if(S.capt&&S.capt.k==k)return S.capt;let cn='';try{cn=CNM()}catch(e){}
 const r=rng(hsh(cn||'coach')+7),wO=.5+r()*.6,wS=2+r()*5,wT=r()*.35,L=rost('h.0');
 const me={n:S.name,me:1,sc:qo(S.q)*wO+capYrs()*wS+((S.trust||50)-50)*wT+4};
 const C=L.slice(1,16).map(x=>({n:x.n,pos:x.pos,sc:(x.ovr||60)*wO+((x.cls!=null?x.cls+1:1+Math.abs(hsh(x.n))%(st=='pro'?9:4)))*wS+(Math.abs(hsh(x.n+'ld'))%8)}));
 const best=[me,...C].sort((a,b)=>b.sc-a.sc)[0],why=wS*2>wO*15?'seniority':wT>.22?'trust':'overall';
 S.capt={k,n:best.n,me:!!best.me,pos:best.pos||'QB',why};if(best.me){S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🅲 Coach named you TEAM CAPTAIN this season!';S.trust=cl((S.trust||50)+2,0,100)}return S.capt}
const capWhy=c=>({seniority:'Coach values seniority most.',trust:'Coach picks the guy he trusts most.',overall:'Coach picks his best player.'})[c.why]||'';

// ===================== coin toss at midfield =====================
let TSG=null,TST=null;
function tossBuild(){tossClear();const T=g.m,O_=g.o,G=new T3.Group(),cap=captEns();TSG=G;scn.add(G);
 const mk=(j,lb,ap,x,z,ry)=>{const m=mk3(j,1.2,0,lb,ap,1);m.position.set(x,0,z);m.rotation.y=ry;G.add(m);return m};
 const tj={c1:T.c1,c2:T.c2,d:T.d||0,pc:S.jy&&S.jy.pc||'#e8e8e8',nc:lum(T.c1)>.5?'#000':'#fff'},oj={c1:O_.c1,c2:O_.c2,d:O_.d||0,pc:O_.pc||'#dcdcdc',nc:lum(O_.c1)>.5?'#000':'#fff'};
 // the ref
 const rf=mk({c1:'#ffffff',c2:'#111111',d:1,pc:'#111111'},null,{sk:2,hr:1,hcl:'#555555',fh:0,ht:1,bd:1},0,-51.3,0);[-.3,.3].forEach(x=>bx(.1,.82,.52,0x111111,x,1.5,0,rf));bx(.68,.14,.68,0xffffff,0,2.72,0,rf);bx(.5,.05,.3,0xffffff,0,2.66,-.42,rf);rf.rotation.y=Math.PI;
 // your captains (you + the captain, or you as the captain + a teammate) and theirs
 const L=rost('h.0'),mate=L.find(x=>x.n==cap.n)||L[2]||L[1];
 const me=mk(DJ(),{nm:(S.jy&&S.jy.nm)||'',num:S.num},AP(),-2,-50.6,-Math.PI/2);
 const m2=mk(tj,{nm:String((cap.me?(L[3]||L[1]).n:mate.n).split(' ').pop()).toUpperCase().slice(0,10),num:(cap.me?(L[3]||L[1]).num:mate.num)},{sk:Math.abs(hsh(mate.n))%6,hr:1+Math.abs(hsh(mate.n))%3,hcl:'#1b1b1b',fh:0,ht:1,bd:1},-2.6,-49.4,-Math.PI/2);
 const lo=rost('h.'+g.oi);[0,1].forEach(i=>{const p=lo[i]||{n:'Captain',num:i+1};mk(oj,{nm:String(p.n).split(' ').pop().toUpperCase().slice(0,10),num:p.num},{sk:(i*3+2)%6,hr:1+i,hcl:'#1b1b1b',fh:i,ht:1,bd:1},2+i*.6,-50.6+i*1.2,Math.PI/2)});
 const cn=new T3.Group();bx(.34,.05,.34,0xd4af37,0,0,0,cn);bx(.2,.06,.2,0xffe07a,0,0,0,cn);cn.position.set(0,1.6,-51);G.add(cn);G.coin=cn;
 [me,m2].forEach(m=>{m.A[1].rotation.x=-.2});TST={t:0,flip:-1,cap};}
function tossClear(){if(TSG){scn.remove(TSG);TSG=null}TST=null}
function tossTick(dt){if(!TSG||!TST)return;try{cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height)}catch(e){}TST.t+=dt;const t=TST.t,a=Math.sin(t*.25)*.5;cm.position.set(Math.sin(a)*10,4.3,-51+Math.cos(a)*10);cm.lookAt(0,1.6,-50.6);
 const c=TSG.coin;if(TST.flip>=0){const f=(t-TST.flip)/1.6;if(f<1){c.position.y=1.6+Math.sin(Math.PI*f)*3.2;c.rotation.x=f*Math.PI*14}else{c.position.y=.06;c.rotation.x=TST.res?Math.PI:0;if(!TST.done){TST.done=1;tossRes()}}}else{c.position.y=1.6;c.rotation.x=0}}
function gToss(){g.paused=1;try{tossBuild()}catch(e){console.warn(e)}const cap=TST?TST.cap:captEns();
 if(cap.me)ovShow(`<h2>🪙 Coin toss</h2><p>Captains meet the ref at midfield. ${cap.k&&!S.capSeen?'<b>Coach named you team captain.</b> ':''}You make the call.</p><button onclick="tossCall(0)">Heads</button><button onclick="tossCall(1)">Tails</button>`);
 else ovShow(`<h2>🪙 Coin toss</h2><p>Captains meet the ref at midfield. Your team captain is <b>${esc(cap.n)}</b> (${esc(cap.pos||'')}). ${capWhy(cap)} He makes the call.</p><button onclick="tossCall(${R()<.5?0:1})">Watch the toss</button>`);S.capSeen=cap.k}
function tossCall(c){ovHide();const r=R()<.5?0:1;if(!TST){return gTossC(c)}TST.call=c;TST.res=r;TST.flip=TST.t;const cap=TST.cap;ovShow('<h2>🪙 '+(cap.me?'You call ':esc(cap.n.split(" ")[0])+' calls ')+['heads','tails'][c]+'...</h2><p>The coin is in the air.</p>');setTimeout(()=>{if(TST&&!TST.done){TST.done=1;tossRes()}},2600)}
function tossRes(){const c=TST.call,r=TST.res,nm=['Heads','Tails'][r],cap=TST.cap,who=cap.me?'You':cap.n.split(' ')[0];
 if(c==r)ovShow(`<h2>🪙 ${nm}!</h2><p>${who} called it. Your team wins the toss.</p><button onclick="tossClear();gTossD(1)">Receive</button><button class=g onclick="tossClear();gTossD(0)">Defer (kick now, get the ball to open the 2nd half)</button>`);
 else{const recv=R()<.72?1:0;ovShow(`<h2>🪙 ${nm}.</h2><p>${who} called ${['heads','tails'][c]}. ${g.o.n} win the toss and ${recv?'defer: you get the ball first':'take the ball'}.</p><button onclick="tossClear();gTossD(${recv})">Kickoff</button>`)}}
// pro overtime: only the captain calls it
function otStart(){if(g.lv!='pro')return otStart0();g.ot=1;g.otn=0;g.ob=0;const cap=captEns();if(cap.me)ovShow(`<h2>🪙 Overtime coin toss</h2><p>You are the captain. Call it.</p><button onclick="otToss(0)">Heads</button><button onclick="otToss(1)">Tails</button>`);else ovShow(`<h2>🪙 Overtime coin toss</h2><p>Your captain ${esc(cap.n)} makes the call.</p><button onclick="otToss(${R()<.5?0:1})">Watch the toss</button>`)}

// ===================== trophies you can see at home =====================
function troList(){const A=(S.aw||[]).filter(a=>!/graduate|Drafted|Signed|Enrolled|Commit/i.test(a)).map(a=>({n:a,t:/Champion|National Champ|CFP|Super Bowl|Title/i.test(a)?'cup':/MVP/i.test(a)?'ball':/Player of the Year|Heisman|Golden Arm|O.Brine|Award|Rookie of the Year/i.test(a)?'fig':'plq'}));
 const B=(S.tro||[]).filter(t=>t.w).map(t=>({n:t.n,t:'bowl'}));return [...B,...A]}
function trophyM(t,P){const G=new T3.Group(),gold=0xd4af37,lt=0xffe07a;
 if(t=='cup'){bx(.36,.14,.36,0x2a2a2a,0,.07,0,G);bx(.1,.3,.1,gold,0,.29,0,G);bx(.34,.34,.34,gold,0,.6,0,G);bx(.38,.06,.38,lt,0,.8,0,G);bx(.06,.18,.06,gold,-.22,.62,0,G);bx(.06,.18,.06,gold,.22,.62,0,G)}
 else if(t=='bowl'){bx(.34,.14,.34,0x3b2a1a,0,.07,0,G);bx(.1,.24,.1,gold,0,.26,0,G);bx(.3,.26,.3,0xc0c8d0,0,.5,0,G);bx(.32,.05,.32,0xffffff,0,.65,0,G)}
 else if(t=='ball'){bx(.3,.16,.3,0x2a2a2a,0,.08,0,G);bx(.08,.22,.08,gold,0,.27,0,G);bx(.2,.16,.32,gold,0,.46,0,G)}
 else if(t=='fig'){bx(.32,.12,.32,0x2a2a2a,0,.06,0,G);bx(.26,.12,.26,0x5a3a22,0,.18,0,G);bx(.12,.34,.12,gold,0,.42,0,G);bx(.1,.1,.1,lt,0,.64,0,G);bx(.22,.06,.06,gold,.08,.5,0,G)}
 else{bx(.34,.44,.06,0x5a3a22,0,.25,0,G);bx(.26,.3,.07,gold,0,.26,0,G)}
 P.add(G);return G}
// a shelf of your real trophies on a wall; returns the spot to stand to look at them
function troShelf(x,y,z,w,face,O,wallObj){const L=troList(),per=Math.max(4,Math.floor(w/.62)),rows=Math.min(2,Math.ceil(L.length/per)||1);const on=m=>{if(wallObj)(wallObj.ex=wallObj.ex||[]).push(m);return m};
 for(let r=0;r<rows;r++){on(bx(w,.08,.5,0x1b1b1b,x,y+r*.85,z,PL));on(bx(.06,.3,.06,0x555555,x-w/2+.3,y-.15+r*.85,z-.15,PL));on(bx(.06,.3,.06,0x555555,x+w/2-.3,y-.15+r*.85,z-.15,PL))}
 L.slice(0,per*rows).forEach((t,i)=>{const r=(i/per)|0,c=i%per,m=trophyM(t.t,PL);m.position.set(x-w/2+.35+c*((w-.7)/Math.max(1,per-1)),y+.04+r*.85,z);on(m)});
 if(O&&!O.some(o=>o.k=='htr'||o.k=='htrs'))O.push({k:'htrs',n:'Trophies',x,z:z+(face||1)*1.8});return L.length}
// canvas posters and signs
function posterM(w,h,draw,x,y,z,ry,wallObj){const c=document.createElement('canvas');c.width=256;c.height=Math.round(256*h/w);const t=c.getContext('2d');draw(t,c.width,c.height);const tx=new T3.CanvasTexture(c);const m=new T3.Mesh(new T3.PlaneGeometry(w,h),new T3.MeshBasicMaterial({map:tx}));m.position.set(x,y,z);m.rotation.y=ry||0;PL.add(m);if(wallObj)(wallObj.ex=wallObj.ex||[]).push(m);return m}
const glowB=(w,h,d,col,x,y,z,wallObj)=>{const m=new T3.Mesh(new T3.BoxGeometry(w,h,d),new T3.MeshBasicMaterial({color:col}));m.position.set(x,y,z);PL.add(m);if(wallObj)(wallObj.ex=wallObj.ex||[]).push(m);return m};
// ===================== the garage (based on your photos) =====================
let HM_LT=null;
function hmMood(on){try{const hm=scn.children.find(c=>c.isHemisphereLight);if(on){if(!HM_LT)HM_LT={h:hm?hm.intensity:.95,s:sun.intensity};if(hm)hm.intensity=.38;sun.intensity=.16}else if(HM_LT){if(hm)hm.intensity=HM_LT.h;sun.intensity=HM_LT.s;HM_LT=null}}catch(e){}}
function hmGarage(W,D,x1,x2,zb,zf,z0,hw,O){const P=PL,wb=hw[0],wL=hw[1],wR=hw[2],T=(S.T&&S.T[0])||{n:'TEAM',c1:'#2255aa',c2:'#ffffff'},c1=T.c1||'#2255aa',c2=T.c2||'#ffffff',tn=String(T.n||'TEAM');
 hmMood(1);scn.background=new T3.Color(0x0d0d14);
 // concrete floor + area rug + coffee table snacks
 bx(W-.4,.02,D-.4,0x55565c,0,.075,z0,P);bx(5.2,.03,3.4,0x26262c,.2,.09,z0+1.2,P);bx(1.4,.035,.9,hexC(c1),.2,.1,z0+1.2,P);
 bx(2.2,.08,1.1,0x151515,.2,.62,z0+1.2,P);[[-.95,-.45],[.95,-.45],[-.95,.45],[.95,.45]].forEach(([a,b])=>bx(.08,.55,.08,0x151515,.2+a,.32,z0+1.2+b,P));bx(.5,.12,.38,0xff7f11,-.3,.72,z0+1.1,P);bx(.12,.24,.12,0xb3001b,.4,.78,z0+1.3,P);bx(.32,.08,.2,0x111111,.75,.7,z0+.95,P);
 // bean bag + box fan by the bed
 bx(1.3,.7,1.2,0x1a1a1f,-2.3,.35,zb+5,P);bx(1.1,.3,1,0x24242a,-2.3,.75,zb+5,P);
 {const f=bx(1.1,1.1,.3,0xe8e8e8,-5.2,.62,zb+4.7,P);bx(.9,.9,.32,0x9a9a9a,-5.2,.62,zb+4.7,P);bx(.3,.3,.34,0xd0d0d0,-5.2,.62,zb+4.7,P)}
 // nightstand + lamp (warm light)
 bx(.8,.9,.7,0x1b1b1b,-5.5,.45,zb+.6,P);bx(.18,.4,.18,0x333333,-5.5,1.1,zb+.6,P);glowB(.4,.32,.4,0xffc27a,-5.5,1.45,zb+.6);{const l=new T3.PointLight(0xffb060,1.2,7);l.position.set(-5.3,1.8,zb+1.2);P.add(l)}
 // back wall: team banner, DREAM BIG, neon logo, trophy shelf, TV + gaming desk + chair, mini fridge
 posterM(2.6,1.9,(t,w,h)=>{t.fillStyle='#111';t.fillRect(0,0,w,h);t.fillStyle=c1;t.font='bold 72px sans-serif';t.textAlign='center';t.fillText(tn.split(' ').map(s=>s[0]).join('').slice(0,3),w/2,h*.45);t.fillStyle='#fff';t.font='bold 26px sans-serif';const nm=tn.toUpperCase();t.fillText(nm.length>16?nm.slice(0,16):nm,w/2,h*.78)},-4.3,3.2,zb+.2,0,wb);
 posterM(1.2,1.2,(t,w,h)=>{t.fillStyle='#1d1d1d';t.fillRect(0,0,w,h);t.fillStyle='#fff';t.font='bold 58px sans-serif';t.textAlign='center';t.fillText('DREAM',w/2,h*.42);t.fillText('BIG',w/2,h*.78)},-2.2,2.5,zb+.2,0,wb);
 posterM(.9,1,(t,w,h)=>{t.fillStyle='#000';t.fillRect(0,0,w,h);t.shadowColor='#ff2a2a';t.shadowBlur=24;t.fillStyle='#ff4040';t.font='bold 170px sans-serif';t.textAlign='center';t.fillText(tn[0],w/2,h*.78)},-.9,2.6,zb+.2,0,wb);{const l=new T3.PointLight(0xff2a2a,.8,5);l.position.set(-.9,2.6,zb+.8);P.add(l)}
 troShelf(.6,3.45,zb+.35,6.2,1,O,wb);
 on_(wb,bx(2.8,1.6,.1,0x0a0a0a,2.2,2.25,zb+.22,P));posterM(2.6,1.42,(t,w,h)=>{t.fillStyle='#2e7d32';t.fillRect(0,0,w,h);t.strokeStyle='#fff';t.lineWidth=2;for(let i=1;i<10;i++){t.beginPath();t.moveTo(i*w/10,0);t.lineTo(i*w/10,h);t.stroke()}t.fillStyle=c1;t.fillRect(10,h*.4,14,14);t.fillStyle='#ddd';t.fillRect(w*.6,h*.45,14,14);t.fillStyle='rgba(0,0,0,.6)';t.fillRect(0,h-26,w,26);t.fillStyle='#fff';t.font='bold 18px sans-serif';t.fillText('GSPN  ·  LIVE',8,h-8)},2.2,2.25,zb+.28,0,wb);
 bx(2.8,.08,1,0x161616,2.2,.95,zb+.8,P);bx(.08,.9,.9,0x161616,.9,.47,zb+.8,P);bx(.08,.9,.9,0x161616,3.5,.47,zb+.8,P);bx(.5,.2,.15,0x111111,2.2,1.05,zb+.6,P);glowB(2.6,.03,.03,0x3b5bff,2.2,.92,zb+1.28);
 bx(.7,.12,.7,0xb3001b,2.2,.6,zb+1.9,P);bx(.7,.9,.12,0x1a1a1a,2.2,1.1,zb+2.25,P);bx(.12,.5,.12,0x333333,2.2,.3,zb+1.9,P);bx(.66,.5,.06,0xb3001b,2.2,1.2,zb+2.32,P);
 bx(.95,1.3,.8,0x101010,4.4,.65,zb+.55,P);glowB(.75,1.05,.02,0x6fd6ff,4.4,.67,zb+.96);[[-.2,.95],[0,.95],[.2,.95],[-.2,.55],[.1,.55]].forEach(([a,b])=>bx(.1,.22,.08,[0xb3001b,0xff7f11,0x1e88e5][Math.abs(a*10)%3|0],4.4+a,b,zb+.9,P));{const l=new T3.PointLight(0x48c8ff,.9,5);l.position.set(4.4,1,zb+1.6);P.add(l)}
 // right wall: dumbbell rack + bench, framed jersey, GOOD VIBES ONLY
 bx(.7,.9,2.4,0x161616,x2-.6,.45,z0-.4,P);for(let r=0;r<2;r++)for(let i=0;i<5;i++){bx(.22,.2,.2,0x2a2a2a,x2-.75,.65+r*.35,z0-1.3+i*.45,P);bx(.22,.2,.2,0x2a2a2a,x2-.45,.65+r*.35,z0-1.3+i*.45,P)}
 bx(.6,.12,1.8,0x161616,x2-2,.55,z0+2.2,P);bx(.1,.5,.1,0x333333,x2-2,.25,z0+1.5,P);bx(.1,.5,.1,0x333333,x2-2,.25,z0+2.9,P);
 posterM(1.3,1.6,(t,w,h)=>{t.fillStyle='#2b2b2b';t.fillRect(0,0,w,h);t.fillStyle=(S.jy&&S.jy.c1)||c1;t.fillRect(w*.2,h*.12,w*.6,h*.76);t.fillStyle='#fff';t.font='bold 26px sans-serif';t.textAlign='center';t.fillText(String(S.name||'').split(' ').pop().toUpperCase().slice(0,10),w/2,h*.3);t.font='bold 110px sans-serif';t.fillText(String(S.num||''),w/2,h*.72)},x2-.2,2.6,z0-3.3,-Math.PI/2,wR);
 posterM(1.2,1,(t,w,h)=>{t.fillStyle='#111';t.fillRect(0,0,w,h);t.fillStyle='#fff';t.font='bold 46px sans-serif';t.textAlign='center';t.fillText('GOOD',w/2,h*.33);t.fillText('VIBES',w/2,h*.6);t.fillText('ONLY',w/2,h*.87)},x2-.2,2.6,z0-1.1,-Math.PI/2,wR);
 // left wall: your poster + a photo
 posterM(1.5,2,(t,w,h)=>{const g2=t.createLinearGradient(0,0,0,h);g2.addColorStop(0,'#222');g2.addColorStop(1,c1);t.fillStyle=g2;t.fillRect(0,0,w,h);t.fillStyle='#e0b48a';t.fillRect(w*.38,h*.12,w*.24,h*.16);t.fillStyle=(S.jy&&S.jy.c1)||c1;t.fillRect(w*.25,h*.3,w*.5,h*.4);t.fillStyle='#fff';t.font='bold 70px sans-serif';t.textAlign='center';t.fillText(String(S.num||''),w/2,h*.6);t.font='bold 24px sans-serif';t.fillText(String(S.name||'').toUpperCase().slice(0,14),w/2,h*.9)},x1+.2,2.7,z0+.2,Math.PI/2,wL);
 posterM(.9,.7,(t,w,h)=>{t.fillStyle='#5a3a22';t.fillRect(0,0,w,h);t.fillStyle='#89a';t.fillRect(12,12,w-24,h-24);t.fillStyle=c1;for(let i=0;i<9;i++)t.fillRect(24+i*24,h*.55,14,30)},x1+.2,2.5,z0+2.3,Math.PI/2,wL);
 // laundry basket, slides, backpack
 bx(.8,.6,.6,0xf0f0f0,x2-1,.3,zf-1.6,P);bx(.7,.12,.5,0x777777,x2-1,.62,zf-1.6,P);bx(.25,.06,.5,0x111111,1.6,.1,zf-1.4,P);bx(.25,.06,.5,0x111111,1.95,.1,zf-1.35,P);bx(.6,.7,.35,0xb3001b,-1.9,.35,zb+.5,P);bx(.6,.25,.37,0x111111,-1.9,.5,zb+.5,P);
 // LED strips (purple on the back wall, blue on the sides) + ceiling garage-door rails
 glowB(W-.6,.06,.06,0x7b5cff,0,4.75,zb+.2,wb);glowB(.06,.06,D-.6,0x3b6bff,x1+.2,4.75,z0,wL);glowB(.06,.06,D-.6,0x3b6bff,x2-.2,4.75,z0,wR);
 {const a=new T3.PointLight(0x7b5cff,1.1,12);a.position.set(0,4.3,zb+1.5);P.add(a);const b=new T3.PointLight(0x3b6bff,.8,10);b.position.set(x2-1,4,z0);P.add(b);const c=new T3.PointLight(0xbfc8ff,.5,14);c.position.set(0,5,z0+2);P.add(c)}
 O.push({k:'hfr',n:'Mini fridge',x:4.4,z:zb+2.1})}
function on_(w,m){(w.ex=w.ex||[]).push(m);return m}
