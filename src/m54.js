// ===================== CELEBRITY FRIENDS & DATING =====================
// Friendship 0-100 with each celebrity. You build it by meeting them at events, after games, in the studio, on Tweeter and by texting.
function cfGet(id){return (S.cf&&S.cf[id])||0}
const cfLvl=v=>v>=80?'Close friends':v>=50?'Friends':v>=20?'Cool with you':v>0?'Met':'Never met';
function cfAdd(id,n){const o=celBy(id);if(!o||!n)return;S.cf=S.cf||{};const a=S.cf[id]||0,b=cl(a+n,0,100);S.cf[id]=b;
 if(a<50&&b>=50){S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🤝 You and '+o.n+' are friends now.';S.pop=cl((S.pop||40)+1,0,100)}if(a<80&&b>=80)S.fmsg=(S.fmsg?S.fmsg+' ':'')+'⭐ You and '+o.n+' are close friends.';return b}
// once a week per celebrity per kind of thing
function cfOnce(id,k,n){S.cfw=S.cfw||{};const key=id+':'+k;if(S.cfw[key]==wkKey())return 0;S.cfw[key]=wkKey();return cfAdd(id,n)}
// a friend comes to your games even before you are famous
function celFriendsNear(){return CELB.map(celOb).filter(o=>cfGet(o.id)>=50)}
// ---------- dating: the bigger the star, the higher her standards ----------
// [fans you need, looks you need] by star tier (1 = rising, 2 = big, 3 = superstar)
const CDATE=[0,[150000,55],[600000,62],[2500000,70]];
const celAskOk=id=>{const o=celBy(id);return !!(o&&o.fem&&(S.stage=='col'||S.stage=='pro')&&(S.age||0)>=18&&!(S.gf&&S.gf.cel==id))};
function celStd(o){const n=CDATE[o.tier];return 'She dates guys with '+n[0].toLocaleString()+'+ fans and looks '+n[1]+'+.'}
function celAsk(id){const o=celBy(id);if(!o||!celAskOk(id))return;
 if(S.gf)return talk('gf',o.n,'Aren\'t you with '+S.gf.n.split(' ')[0]+'? 👀','smug',[['Right...','ovHide()']]);
 S.cask=S.cask||{};if(S.cask[id]==wkKey())return talk('gf',o.n,'You already asked me this week 😅','smug',[['My bad','ovHide()']]);
 const fr=cfGet(id);if(fr<40)return talk('gf',o.n,'You\'re sweet, but we barely know each other. Let\'s be friends first.','smug',[['Fair','ovHide()']],'Friendship '+fr+'/100: you need 40+ to ask her out. '+celStd(o));
 S.cask[id]=wkKey();const nd=CDATE[o.tier],f=myFans(),lk=looksEns();
 let ch=.12+(fr-40)/120+cl(Math.log2(Math.max(1,f)/nd[0]),-2,2)*.14+(lk-nd[1])/90+(S.stage=='pro'?.05:0)+(celFans().includes(id)?.08:0);if(f<nd[0]*.4)ch=Math.min(ch,.04);ch=cl(ch,.02,.85);
 if(R()<ch){const sk=SK[o.sk]||0xd9a066;S.gf={cel:id,cls:0,n:o.n,age:24+Math.abs(hsh(o.n))%10,why:'fame',team:'Celebrity',hc:o.hcl,skc:'#'+sk.toString(16).padStart(6,'0'),aff:42+ri(0,10),af2:1,wks:0,status:'dating',f0:fans(),lk:86+Math.abs(hsh(o.n+'lk'))%13};
  S.pop=cl((S.pop||40)+5,0,100);hapAdd(4);cfAdd(id,5);twAdd({a:'Ivan Rapsheesh',h:'rapsheesh',v:1,t:'Sources: @'+meH()+' and @'+o.h+' are officially dating. 👀'});save();
  return talk('gf',o.n,'Okay... yes. Let\'s do this. 😊 But you better not embarrass me on the internet.','happy',[['❤️','ovHide()']],'You are now dating '+o.n+'. Fans +5.')}
 cfAdd(id,-3);save();const low=f<nd[0]||lk<nd[1];talk('gf',o.n,low?['You\'re cute, but I need someone on my level right now.','Maybe when you\'re a little more famous 😅','I don\'t think we\'re there yet.'][ri(0,2)]:['I like being friends. Let\'s keep it that way for now.','Not right now, but don\'t stop texting me.'][ri(0,1)],'smug',[['OK','ovHide()']],low?celStd(o):'')}
// ---------- the celebrity friends card (Sponsors page) ----------
function cfCard(){const L=CELB.map(celOb).filter(o=>cfGet(o.id)>0).sort((a,b)=>cfGet(b.id)-cfGet(a.id));if(!L.length)return '<div class=card><b>⭐ Celebrity friends</b><br><small>Meet celebrities at events, after games, in the studio and on Tweeter. Friendship grows every time you link up.</small></div>';
 return `<div class=card><b>⭐ Celebrity friends</b>${L.slice(0,12).map(o=>`<div class=row style="font-size:15px;gap:6px"><span>${esc(o.n)} <small>${cfLvl(cfGet(o.id))} · ${cfGet(o.id)}/100</small></span>${celAskOk(o.id)&&!S.gf?`<button class=g style="width:auto;flex:none" onclick="celAsk('${o.id}')">❤️ Ask out</button>`:''}</div>`).join('')}</div>`}

// ===================== 🎙️ THE POT McGEE SHOW (3D set: brick gym, stage with the desks, a basketball court) =====================
function brickMat(rx,ry){const c=document.createElement('canvas');c.width=128;c.height=64;const t=c.getContext('2d');t.fillStyle='#d8cfc4';t.fillRect(0,0,128,64);for(let r=0;r<4;r++)for(let i=-1;i<4;i++){const x=i*32+(r%2?16:0);t.fillStyle=['#8e3b2a','#9c4430','#7f3324','#a14a36'][(r+i+4)%4];t.fillRect(x+1,r*16+1,30,14)}const tx=new T3.CanvasTexture(c);tx.wrapS=tx.wrapT=T3.RepeatWrapping;tx.repeat.set(rx,ry);return new T3.MeshLambertMaterial({map:tx})}
function woodMat(rx,ry){const c=document.createElement('canvas');c.width=128;c.height=128;const t=c.getContext('2d');for(let i=0;i<16;i++){t.fillStyle=['#a8743f','#9c6a37','#b07c47','#a36f3c'][i%4];t.fillRect(0,i*8,128,8);t.fillStyle='rgba(0,0,0,.08)';t.fillRect((i*37)%128,i*8,2,8)}const tx=new T3.CanvasTexture(c);tx.wrapS=tx.wrapT=T3.RepeatWrapping;tx.repeat.set(rx,ry);return new T3.MeshLambertMaterial({map:tx})}
function truss(x,z,h){const G=new T3.Group();[[-.3,-.3],[.3,-.3],[-.3,.3],[.3,.3]].forEach(([a,b])=>bx(.08,h,.08,0x111111,a,h/2,b,G));for(let y=.6;y<h;y+=.9){bx(.66,.06,.06,0x111111,0,y,-.3,G);bx(.66,.06,.06,0x111111,0,y,.3,G);bx(.06,.06,.66,0x111111,-.3,y,0,G);bx(.06,.06,.66,0x111111,.3,y,0,G)}G.position.set(x,0,z);PL.add(G);return G}
function potWalk(){ovHide();ui.style.display='none';cv.style.display=hud.style.display='none';['#lb','#camb','#pb','#spk'].forEach(s=>{const e=$(s);if(e)e.style.display='none'});scene('field');M='walk';clr(PL);CHR.visible=false;FLD.visible=EZ.visible=false;scn.fog=null;scn.background=new T3.Color(0x111114);
 const z0=-48,W=30,D=30,x1=-W/2,x2=W/2,zb=z0-D/2,zf=z0+D/2,O=[],sh=.7,sz=zb+10;
 bx(120,.04,120,0x161616,0,.01,z0,PL);
 // hardwood court + lines, putting green
 {const f=new T3.Mesh(new T3.BoxGeometry(W,.06,D-10),woodMat(6,6));f.position.set(0,.04,z0+5);PL.add(f)}
 [[W-1,.02,.08,0,zf-.6],[W-1,.02,.08,0,sz+.6],[.08,.02,D-11.2,x1+.5,z0+5],[.08,.02,D-11.2,x2-.5,z0+5],[.08,.02,D-11.2,0,z0+5]].forEach(a=>bx(a[0],a[1],a[2],0xffffff,a[3],.08,a[4],PL));
 bx(4.6,.03,3.2,0x111111,x1+3.2,.075,z0+5,PL);bx(4.4,.04,3,0x5f8f3e,x1+3.2,.08,z0+5,PL);[[x1+1.6,z0+4],[x1+4.8,z0+6]].forEach(([x,z])=>{bx(.04,1,.04,0xffffff,x,.55,z,PL);bx(.3,.18,.02,0xffe93b,x+.15,1,z,PL)});
 // brick walls (they drop low when they block the camera)
 const hw=[],bm=(w,h)=>brickMat(Math.max(1,w/2.2),Math.max(1,h/1.1)),wl=(w,h,d,x,z,ax,vv,sg)=>{const m=new T3.Mesh(new T3.BoxGeometry(w,h,d),bm(Math.max(w,d),h));m.position.set(x,h/2,z);PL.add(m);hw.push({m,ax,v:vv,sg,h});return m};
 wl(W,8,.3,0,zb,'z',zb,-1);wl(.3,8,D,x1,z0,'x',x1,-1);wl(.3,8,D,x2,z0,'x',x2,1);wl(W/2-2,8,.3,x1/2-1,zf,'z',zf,1);wl(W/2-2,8,.3,x2/2+1,zf,'z',zf,1);
 // the stage: dark carpet, a step, black trim
 bx(W-1,sh,10,0x2a2c33,0,sh/2,zb+5,PL);bx(W-1,.06,10,0x23252b,0,sh+.03,zb+5,PL);bx(W-1,sh*.5,1,0x1b1d22,0,sh*.25,sz+.5,PL);bx(W-1,.08,.1,0x111111,0,sh+.02,sz-.02,PL);
 // the big screen, black beams, the neon sign, framed jerseys, plants
 bx(10.4,7,.25,0x0a0a0a,0,4.2,zb+.3,PL);
 posterM(10,6.6,(t,w,h)=>{const g2=t.createLinearGradient(0,0,0,h);g2.addColorStop(0,'#0a1a4a');g2.addColorStop(1,'#160a2a');t.fillStyle=g2;t.fillRect(0,0,w,h);t.fillStyle='#1c6b2a';t.fillRect(0,0,w,34);t.fillStyle='#ffe93b';t.font='bold 26px sans-serif';t.textAlign='center';t.strokeStyle='#5a3a00';t.lineWidth=3;t.strokeText('A.C. HAWK',w/2,26);t.fillText('A.C. HAWK',w/2,26);
  const x0=w*.2,y0=44,ww=w*.6,hh=h*.62;t.fillStyle='#6b3a1a';t.fillRect(x0,y0,ww,hh);const bc=['#c0392b','#2e86de','#f1c40f','#27ae60','#8e44ad','#e67e22','#ecf0f1'];for(let r=0;r<4;r++)for(let i=0;i<14;i++){t.fillStyle=bc[(r*5+i)%7];t.fillRect(x0+4+i*(ww-8)/14,y0+4+r*hh/4,(ww-8)/14-2,hh/4-8)}
  const cx=w/2,cy=y0+hh*.62;t.fillStyle='#e8c872';t.fillRect(cx-30,cy-46,60,70);t.fillStyle='#f1c9a5';t.fillRect(cx-20,cy-36,40,44);t.fillStyle='#c9a24a';t.fillRect(cx-22,cy+2,44,16);t.fillStyle='#222';t.fillRect(cx-12,cy-24,6,5);t.fillRect(cx+6,cy-24,6,5);t.fillStyle='#1b1b1b';t.fillRect(cx-46,cy+18,92,40);t.fillStyle='#333';t.fillRect(cx+18,cy-6,10,40);
  t.strokeStyle='#7fb6ff';t.lineWidth=2;for(let i=0;i<4;i++){t.beginPath();let x=30+i*60,y=y0+hh+6;t.moveTo(x,y);for(let k=0;k<4;k++){x+=(Math.random()-.5)*18;y+=8;t.lineTo(x,y)}t.stroke()}t.fillStyle='#ff6be6';t.font='bold 13px sans-serif';t.fillText('THE POT McGEE SHOW',w/2,h-10)},0,4.2,zb+.45,0,hw[0]);
 [-8.5,8.5].forEach(x=>{bx(1,8,.6,0x151515,x,4,zb+.4,PL)});bx(W-1,.5,.5,0x151515,0,6.6,zb+.5,PL);
 posterM(4,2.6,(t,w,h)=>{t.fillStyle='rgba(0,0,0,0)';t.clearRect(0,0,w,h);t.strokeStyle='#ff2a2a';t.lineWidth=5;t.shadowColor='#ff2a2a';t.shadowBlur=10;t.strokeRect(70,8,w-80,h-16);t.shadowColor='#3bd5ff';t.fillStyle='#e8fbff';t.font='italic bold 22px sans-serif';t.fillText('the',14,40);t.font='bold 46px sans-serif';t.fillText('POT',70,74);t.font='bold 34px sans-serif';t.fillText('McGEE',62,112);t.font='bold 22px sans-serif';t.fillText('show',150,146)},11.2,4.6,zb+.4,0,hw[0]);{const l=new T3.PointLight(0x3bd5ff,.9,10);l.position.set(11,4.6,zb+2);PL.add(l)}
 [[-11.5,'40'],[-4,'12'],[11.5,'9']].forEach(([x,n],i)=>posterM(1.1,1.4,(t,w,h)=>{t.fillStyle='#222';t.fillRect(0,0,w,h);t.fillStyle=['#ffffff','#ffd700','#1e3a8a'][i];t.fillRect(w*.18,h*.12,w*.64,h*.76);t.fillStyle=i==2?'#fff':'#111';t.font='bold 70px sans-serif';t.textAlign='center';t.fillText(n,w/2,h*.65)},x,7,zb+.4,0,hw[0]));
 [[x1+1.2,zb+1.2],[x2-1.2,zb+1.2],[x1+1.2,sz+1.5]].forEach(([x,z])=>{bx(.7,.7,.7,0x3a2a1a,x,(z<sz?sh:0)+.35,z,PL);bx(1.2,1.6,1.2,0x2e7d32,x,(z<sz?sh:0)+1.4,z,PL);bx(.8,1,.8,0x3cb371,x,(z<sz?sh:0)+2.5,z,PL)});
 truss(-12.6,sz+1.4,8);truss(12.6,sz+1.4,8);
 // left desk (crew) and right desk (Pot's), props on top
 const desk=(x,red)=>{bx(4.2,1.3,1.4,0xf2f2f2,x,sh+.65,zb+5.6,PL);if(red)bx(1.6,1.3,1.42,0xb3001b,x+1.3,sh+.65,zb+5.6,PL);bx(4.3,.08,1.5,0xffffff,x,sh+1.32,zb+5.6,PL);
  bx(.6,.45,.5,0xffd700,x-1.2,sh+1.58,zb+5.5,PL);bx(.3,.2,.45,0x7a3b1a,x-.3,sh+1.46,zb+5.5,PL);bx(.12,.3,.12,0x2e86de,x+.4,sh+1.5,zb+5.6,PL);bx(.5,.35,.3,0x111111,x+1.1,sh+1.53,zb+5.6,PL);bx(.06,.5,.06,0x222222,x-.6,sh+1.6,zb+5.9,PL);bx(.15,.15,.15,0x222222,x-.6,sh+1.9,zb+5.8,PL)};
 desk(-5.2,0);desk(6,0);{const tx=-10.4;bx(2.6,1.3,1.4,0xb3001b,tx,sh+.65,zb+3.6,PL);bx(2.7,.08,1.5,0xffffff,tx,sh+1.32,zb+3.6,PL);bx(.5,.4,.4,0xd4af37,tx-.6,sh+1.55,zb+3.5,PL);bx(.12,.3,.12,0x2e86de,tx+.5,sh+1.5,zb+3.6,PL)}
 // the crew at the left desk (cowboy hat guy, cap guy) + A.C. Hawk, and Pot McGee by his desk
 const crew=[{c1:'#2a2a2a',c2:'#2a2a2a',pc:'#3b4a6b',sk:1,hr:1,hcl:'#3b2a1a',fh:3,ht:1,bd:2,acc:['cowboy'],fem:0,x:-10.4,z:zb+2.2,n:'Cowboy Tone'},{c1:'#1b1b1b',c2:'#1b1b1b',pc:'#3b4a6b',sk:0,hr:1,hcl:'#3b2a1a',fh:1,ht:1,bd:2,acc:['cap'],fem:0,x:-6.4,z:zb+4.2,n:'Boston Bobby'},{c1:'#7a1f2b',c2:'#ffffff',pc:'#2a2a2a',sk:0,hr:1,hcl:'#1b1b1b',fh:0,ht:1,bd:1,acc:[],fem:0,x:-4,z:zb+4.2,n:'Ty'}];
 crew.forEach(o=>{const m=celM(o);m.position.set(o.x,sh,o.z);m.rotation.y=Math.PI;PL.add(m);bx(.8,.1,.8,0x222222,o.x,sh+.7,o.z-.1,PL);const s=lbl(o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);O.push({k:'pcrew',n:o.n,x:o.x,z:sz+1.6,dm:m})});O.push({k:'pach',n:'A.C. Hawk',x:0,z:sz+1.6});
 const pot=celM(celBy('potmcgee'));pot.position.set(8.7,sh,zb+5.4);pot.rotation.y=Math.PI*1.15;PL.add(pot);{const s=lbl('Pot McGee');s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);pot.add(s)}
 O.push({k:'ppot',n:'Pot McGee',x:8.4,z:sz+1.6,dm:pot});
 // the hoop on the court + the spot for the charity shot
 const hx=x1+1.4,hz=z0+8;bx(.25,4.2,.25,0x222222,hx-.6,2.1,hz,PL);bx(.12,1.2,1.8,0xffffff,hx-.4,3.6,hz,PL);bx(.06,.04,.9,0xff4d00,hx+.1,3.05,hz,PL);bx(.9,.04,.06,0xff4d00,hx+.5,3.05,hz-.45,PL);bx(.9,.04,.06,0xff4d00,hx+.5,3.05,hz+.45,PL);bx(.06,.04,.9,0xff4d00,hx+.95,3.05,hz,PL);bx(.8,.5,.8,0xf5f5f5,hx+.5,2.78,hz,PL);
 const sx=x1+8.5;bx(1.2,.03,1.2,0xffd700,sx,.08,hz,PL);O.push({k:'pshot',n:'the charity shot',x:sx,z:hz});
 [[2,zf-3],[2.5,zf-3.3],[-9,zf-2.5]].forEach(([x,z],i)=>{const b=new T3.Mesh(new T3.SphereGeometry(.24,10,8),new T3.MeshLambertMaterial({color:i==2?0x7a3b1a:0xe36a1a}));b.position.set(x,.3,z);PL.add(b)});
 // lights
 {const a=new T3.PointLight(0xfff2d6,.8,26);a.position.set(0,7,zb+8);PL.add(a);const b=new T3.PointLight(0xfff2d6,.6,26);b.position.set(0,7,z0+8);PL.add(b)}
 O.push({k:'eexit',n:'Exit',x:0,z:zf-.4});
 const pm=mk3({...DJ(),c1:'#2b2b2b',c2:'#ffffff'},1.2,0,{nm:'',num:''},AP(),1);PL.add(pm);
 LR={p:{x:0,z:zf-3,ry:0},pm,O,all:[...O],walls:[],hw,bd:[x1+.8,x2-.8,sz+1,zf-.4],field:1,ev:'pot',pot:1,hoop:{x:hx+.5,z:hz},evMet:[],near:null,tg:null,pend:null,joy:null,pd:null};
 const el=$('#lrw');el.innerHTML=`<div class=top><button onclick="evExit()">Leave</button><div id=lrs></div></div><div id=lrj><div id=lrk></div></div><div id=lra></div><div id=lrh>🎙️ The Pot McGee Show is LIVE. Talk to Pot for the interview, then hit the gold spot on the court for the charity shot.</div><div id=lrcap></div>`;el.style.display='block';lrPtr();lrStat();save()}
function potAct(o){if(o.k=='eexit')return evExit();
 if(o.k=='ppot'){if(LR.potDone)return talk('reporter','Pot McGee','That was ELECTRIC, baby! Now get on that court and hit the charity shot!','happy',[['🤙','ovHide()']]);return talk('reporter','Pot McGee','There he is! We are LIVE, baby! Sit down, let\'s talk!','happy',[['🎙️ Start the interview','ovHide();potShow()'],['One sec','ovHide()']])}
 if(o.k=='pach')return talk('mate','A.C. Hawk (on the big screen)',['Hawk here. Big fan of the tape, man.','You ready? Pot is fired up today.','Respect the grind, brother.'][ri(0,2)],'happy',[['🤙','ovHide()']]);
 if(o.k=='pcrew')return talk('mate',o.n,['LET\'S GOOO! The QB is in the building!','You gonna hit the charity shot or what?','Pot has been hyping you up all week.'][ri(0,2)],'happy',[['🤙','ovHide()']]);
 if(o.k=='pshot'){if(LR.shotDone)return talk('reporter','Pot McGee','One shot per visit, baby! Come back next time!','happy',[['🤙','ovHide()']]);const pro=S.stage=='pro',$$=pro?[50000,150000,1000000]:[5000,15000,50000];
  return talk('reporter','Pot McGee','CHARITY SHOT! Throw the football through the hoop and the show donates to charity. Pick your shot!','happy',[['🏈 Free-throw line: $'+$$[0].toLocaleString(),'potShot(0)'],['🏈 Three-point line: $'+$$[1].toLocaleString(),'potShot(1)'],['🏈 Half court: $'+$$[2].toLocaleString()+'!!','potShot(2)'],['Not yet','ovHide()']])}}
const PSD=[4.6,7.2,13.1],PSN=['the free-throw line','the three-point line','HALF COURT'];
function potShot(d){ovHide();if(!LR||!LR.pot||LR.shotDone)return;const H=LR.hoop;LR.p.x=H.x+PSD[d];LR.p.z=H.z;LR.p.ry=Math.PI/2;LR.yaw=Math.PI/2;LR.tg=null;LR.pend=null;LR.shotD=d;
 const o=document.createElement('div');o.id='pswp';o.style.cssText='position:fixed;inset:0;z-index:40;touch-action:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:120px;color:#fff;font:20px VT323,monospace;text-shadow:0 2px 0 #000;pointer-events:auto';
 o.innerHTML='<div style="background:#000a;border:3px solid #000;border-radius:12px;padding:10px 14px;text-align:center;max-width:340px">🏈 <b>'+PSN[d]+'</b><br>Swipe UP toward the hoop to throw.<br><small>Longer swipe = more power. Swipe straight to aim true.</small></div><svg id=pswl width=100% height=100% style="position:fixed;inset:0;pointer-events:none"></svg>';
 document.body.appendChild(o);let st=null;const ln=o.querySelector('#pswl');
 o.addEventListener('pointerdown',e=>{st={x:e.clientX,y:e.clientY,t:performance.now()};try{o.setPointerCapture(e.pointerId)}catch(_){}});
 o.addEventListener('pointermove',e=>{if(!st)return;const p=Math.min(1.3,Math.max(0,(st.y-e.clientY)/(innerHeight*.5)));ln.innerHTML=`<line x1="${st.x}" y1="${st.y}" x2="${e.clientX}" y2="${e.clientY}" stroke="${p>1?'#ff4d4d':'#ffe93b'}" stroke-width="6" stroke-linecap="round"/>`});
 o.addEventListener('pointerup',e=>{if(!st)return;const dy=st.y-e.clientY,dx=e.clientX-st.x;o.remove();potThrow(d,Math.min(1.3,Math.max(0,dy/(innerHeight*.5))),Math.max(-1,Math.min(1,dx/(innerWidth*.5))))});
 const h=$('#lrh');if(h)h.textContent='🏈 Swipe up to shoot from '+PSN[d]+'.'}
function potThrow(d,pw,aim){if(!LR||!LR.pot||LR.shotDone)return;LR.shotDone=1;const Q=S.q||{},acc=Q.acc||70,arm=Q.pow||70,tgt=[.42,.62,.95][d],eff=pw*(.9+(arm-70)/300),tolP=.08+(acc-60)/600,tolA=.1+(acc-60)/500,eP=eff-tgt,eA=aim;
 let make=Math.abs(eP)<=tolP&&Math.abs(eA)<=tolA;if(!make&&Math.abs(eP)<=tolP*1.4&&Math.abs(eA)<=tolA*1.4&&R()<.35)make=true;
 const why=make?'':Math.abs(eP)/tolP>Math.abs(eA)/tolA?(eP<0?'short':'long'):(eA<0?'left':'right'),amt=(S.stage=='pro'?[50000,150000,1000000]:[5000,15000,50000])[d];
 const H=LR.hoop,x0=LR.p.x,z0=LR.p.z,dist=PSD[d],f=make?1:Math.max(.35,eff/tgt),ang=make?0:eA*.45,tx=x0-Math.cos(ang)*dist*f,tz=z0-Math.sin(ang)*dist*f,b=new T3.Group();bx(.22,.22,.42,0x7a3b1a,0,0,0,b);bx(.23,.03,.2,0xffffff,0,.1,0,b);PL.add(b);
 const T=.9+dist*.06,t0=performance.now(),apex=2.2+dist*.35;
 const step=()=>{if(!LR||!LR.pot){try{PL.remove(b)}catch(e){}return}const t=(performance.now()-t0)/1000;if(t<T){const k=t/T;b.position.set(x0+(tx-x0)*k,2.2+(3.15-2.2)*k+Math.sin(Math.PI*k)*apex,z0+(tz-z0)*k);b.rotation.z=k*14;requestAnimationFrame(step)}
  else if(t<T+.8){const k=(t-T)/.8;b.position.set(tx+(make?0:(tx-x0)*.06*k),Math.max(.15,3.15-k*(make?1.6:3.2)),tz);requestAnimationFrame(step)}else{setTimeout(()=>{try{PL.remove(b)}catch(e){}},1500);potShotEnd(d,make,amt,why)}};requestAnimationFrame(step);
 const h=$('#lrh');if(h)h.textContent='🏈 The whole studio is on its feet...'}
function potShotEnd(d,make,amt,why){if(make)S.viral='hitting the charity shot from '+PSN[d]+' on the Pot McGee Show';try{cfAdd('potmcgee',make?6:2)}catch(e){}const f=make?[3,6,12][d]:1;S.pop=cl((S.pop||40)+f,0,100);hapAdd(make?3:1);(S.char=S.char||[]).push({amt:make?amt:Math.round(amt*.1),y:yrN()});
 if(make)twAdd({a:'Pot McGee',h:'patmcgeeshow',v:1,t:['@'+meH()+' JUST DRILLED THE CHARITY SHOT!!! $'+amt.toLocaleString()+' TO CHARITY BABY!!! 🏈🔥','UNREAL. @'+meH()+' from '+['the free-throw line','downtown','HALF COURT'][d]+'. $'+amt.toLocaleString()+' for the kids! 🙌'][ri(0,1)]});
 save();lrStat();const h=$('#lrh');if(h)h.textContent=make?'🎉 BUCKETS! $'+amt.toLocaleString()+' to charity!':'😬 Off the rim. Pot still donates $'+Math.round(amt*.1).toLocaleString()+'.';
 talk('reporter','Pot McGee',make?(d==2?'HALF COURT!!! ARE YOU KIDDING ME?! THE STUDIO IS LOSING IT!':'BANG! He hits it! $'+amt.toLocaleString()+' to charity, baby!'):'Ohhh, '+(why=='short'?'SHORT! Needed more on it!':why=='long'?'too much juice, it sailed long!':why?'it drifted '+why+'!':'right off the rim!')+' We still give $'+Math.round(amt*.1).toLocaleString()+' because we love you!','happy',[['🤙','ovHide()']],'Fans +'+f+(make?' · the clip is going viral':''))}
