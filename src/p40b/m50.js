
// ===================== YOUR PLACE IN 3D: walk around, use your stuff, see your family =====================
const DOGC={'Cairn Terrier':['#b08d57',.6],'Dachshund':['#7a4a2a',.55],'Corgi':['#d98b3a',.6],'Pit Bull':['#8a8a8a',.85],'Bulldog':['#c9b08a',.75],'German Shepherd':['#6b4a2a',1],'Great Dane':['#4a4a4a',1.35],'Standard Poodle':['#f2efe6',1],'Golden Retriever':['#d9a84a',1],'Siberian Husky':['#9aa3ad',.95],'French Bulldog':['#5a5048',.6]};
function dogM(b,x,z){const G=new T3.Group(),c=DOGC[b]||['#8a6a4a',.8],s=c[1],col=hexC(c[0]);bx(.5*s,.45*s,1.1*s,col,0,.55*s,0,G);bx(.42*s,.4*s,.42*s,col,0,.85*s,.62*s,G);bx(.2*s,.16*s,.2*s,0x222222,0,.8*s,.86*s,G);[[-.18,-.38],[.18,-.38],[-.18,.38],[.18,.38]].forEach(([a,b2])=>bx(.14*s,.4*s,.14*s,col,a*s,.2*s,b2*s,G));bx(.08*s,.3*s,.08*s,col,0,.8*s,-.6*s,G);G.position.set(x,0,z);PL.add(G);return G}
function homeWalk(){ovHide();const id=hzEns()[0],H=hzOf(id),sz=H[5],fam=S.fam||famEns(),own=S.hzi||[],k=wkKey();
 ui.style.display='none';cv.style.display=hud.style.display='none';['#lb','#camb','#pb','#spk'].forEach(s=>{const e=$(s);if(e)e.style.display='none'});scene('field');M='walk';clr(PL);CHR.visible=false;FLD.visible=EZ.visible=false;scn.fog=null;scn.background=new T3.Color(0x9fd3ff);
 const W=id=='garage'?12:id=='parents'?18:id=='dorm'?10:12+sz*4,D=id=='garage'?10:id=='parents'?14:id=='dorm'?8:10+sz*3,z0=-48,x1=-W/2,x2=W/2,zb=z0-D/2,zf=z0+D/2,
  pal=id=='garage'?[0x8c8c8c,0xb0a89a]:id=='parents'?[0xb98b5e,0xf1e3c6]:id=='dorm'?[0x9a8f80,0xdfe7ee]:sz>=6?[0xe8e4dc,0xfaf8f2]:sz>=4?[0x6b4a2b,0xf2efe8]:[0xa47b52,0xe9e1d3],
  mk=(jj,ap,x,z,ry,lb)=>{const m=mk3(jj,1.2,0,null,ap,1);m.position.set(x,0,z);m.rotation.y=ry||0;PL.add(m);if(lb){const s=lbl(lb);s.position.set(0,3.4,0);s.scale.set(3,.75,1);m.add(s)}return m},O=[];
 // the yard / outside, the floor and the walls (front wall has a doorway)
 bx(90,.04,90,id=='tower'?0x5a6470:0x6fbf5a,0,.01,z0,PL);bx(W,.06,D,pal[0],0,.04,z0,PL);
 const hw=[],wl=(w,h,d,x,z,ax,v,sg)=>{const m=bx(w,h,d,pal[1],x,h/2,z,PL);hw.push({m,ax,v,sg,h});return m};
 wl(W,5,.3,0,zb,'z',zb,-1);wl(.3,5,D,x1,z0,'x',x1,-1);wl(.3,5,D,x2,z0,'x',x2,1);wl(W/2-1.5,5,.3,x1/2-.75,zf,'z',zf,1);wl(W/2-1.5,5,.3,x2/2+.75,zf,'z',zf,1);
 try{hmDecor(id,sz,W,D,x1,x2,zb,zf,z0,pal,hw,O)}catch(e){console.warn(e)}
 if(0){for(let i=0;i<6;i++)bx(W-3,.6,.32,0xd0d0d0,0,.5+i*.8,zb+.01,PL);bx(3,1.2,5.5,hexC((S.T&&S.T[0]&&S.T[0].c1)||'#2255aa'),x2-2.2,.7,z0,PL);bx(2,.9,3,0x333333,x2-2.2,1.6,z0,PL);bx(3,1.2,.8,0x7a5a3a,x1+1.8,.6,zb+.8,PL);bx(1,1,1,0xc9a26b,x1+1,0.5,z0+2,PL);bx(.9,.9,.9,0xc9a26b,x1+1,1.4,z0+2.1,PL)}
 {const b=bnr(id=='garage'?"MOM & DAD'S GARAGE":H[1].toUpperCase(),'#ffffff');b.position.set(0,6.2,zb);b.scale.set(10,1.25,1);PL.add(b)}
 const put=(k_,n,x,z,obj)=>{O.push({k:k_,n,x,z,...(obj||{})})};
 // bed
 {const bx_=x1+2.4,bz=zb+2;bx(2.6,.6,3.6,0x5a3a22,bx_,.3,bz,PL);bx(2.4,.3,3.4,id=='garage'?0x1f2233:0xffffff,bx_,.75,bz,PL);bx(2.4,.32,1.6,hexC((S.T&&S.T[0]&&S.T[0].c1)||'#334488'),bx_,.82,bz+.8,PL);bx(1,.3,.6,0xffffff,bx_,1,bz-1.3,PL);put('hbed','Bed',bx_+1.8,bz,{})}
 // couch + TV (TV size follows what you bought)
 if(id!='garage'||own.length){const tvL=own.includes('tv3')?3:own.includes('tv2')?2:own.includes('tv1')||id!='garage'?1:0,tz=z0+1;if(tvL){bx(.3,1+tvL*.5,2+tvL*1.4,0x111111,x2-.6,1.8,tz,PL);bx(.32,.9+tvL*.5,1.8+tvL*1.4,0x2a6bd8,x2-.78,1.8,tz,PL);put('htv','TV',x2-2.6,tz,{})}
  if(id!='garage'&&id!='dorm'){bx(1.2,.8,4,0x3b3b4a,x2-6,.4,tz,PL);bx(.5,1.3,4,0x3b3b4a,x2-6.5,.8,tz,PL)}}
 // kitchen
 if(id!='garage'){bx(4,1.1,1.2,pal[1]-0x101010,x1+4,.55,zf-1.2,PL);bx(1.2,2.4,1.2,0xdcdcdc,x1+1.2,1.2,zf-1.2,PL);put('hfr','Kitchen',x1+3,zf-2.6,{})}
 // owned items
 if(own.includes('gm1')||own.includes('gm2')){const gx=x1+4.5,gz=zb+1.2;bx(2.4,.9,1,0x222222,gx,.45,gz,PL);bx(1.6,1,.1,0x111111,gx,1.5,gz-.3,PL);bx(1.5,.9,.06,own.includes('gm2')?0xff2fd1:0x2ecc71,gx,1.5,gz-.24,PL);put('hgame','Gaming setup',gx,gz+1.6,{})}
 if((own.includes('gy1')||own.includes('gy2'))&&sz>=1){const yx=x2-2.5,yz=zb+2;bx(2.6,.15,.15,0x777777,yx,1.1,yz,PL);bx(.2,.5,.5,0x111111,yx-1.2,1.1,yz,PL);bx(.2,.5,.5,0x111111,yx+1.2,1.1,yz,PL);bx(.6,1.1,.3,0x333333,yx-1,.55,yz,PL);bx(.6,1.1,.3,0x333333,yx+1,.55,yz,PL);put('hgym','Home gym',yx,yz+1.6,{})}
 if(own.includes('pool')&&sz>=4){bx(8,.1,5,0x2a9df4,0,.06,zf+5,PL);bx(8.6,.12,.3,0xffffff,0,.07,zf+2.4,PL);put('hpool','Pool',0,zf+2.2,{})}
 if(own.includes('tr')&&sz>=5){for(let i=0;i<3;i++)bx(.3,.08,3,0xd4af37,x1+.4,1.4+i*.9,z0,PL);const n=(S.tro||[]).filter(t=>t.w).length+(S.aw||[]).length;for(let i=0;i<Math.min(9,n);i++)bx(.25,.5,.25,0xffd700,x1+.5,1.7+((i/3)|0)*.9,z0-1+(i%3),PL);put('htr','Trophy room',x1+1.6,z0,{})}
 if(own.includes('heli')){bx(6,.08,6,0x444444,x2+6,.05,z0,PL);const b=bnr('H','#ffffff');b.position.set(x2+6,.4,z0);b.scale.set(3,.4,1);PL.add(b)}
 // people at home: family (parents' place / garage), the girlfriend if she lives with you or came over, guests you invited this week
 const atParents=id=='parents'||id=='garage',fsk=v=>cl(v||0,0,5);
 if(atParents){if(fam.mom){const m=mk({c1:'#a8336b',c2:'#ffffff',d:0,pc:'#2b2b2b'},{fem:1,sk:fsk(fam.mom.sk),hr:fam.mom.hr!=null?fam.mom.hr:4,hcl:fam.mom.hc||'#3b2a1a',fh:0,ht:0,bd:1},id=='garage'?3.2:-2,id=='garage'?zf-1.8:z0+2.5,Math.PI,'Mom');O.push({k:'hfam',who:'mom',n:fam.mom.n,x:m.position.x,z:m.position.z+.8,m})}
  if(fam.dad){const m=mk({c1:'#3a5a8a',c2:'#ffffff',d:0,pc:'#2b2b2b'},{fem:0,sk:fsk(fam.dad.sk),hr:fam.dad.hr!=null?fam.dad.hr:1,hcl:fam.dad.hc||'#1b1b1b',fh:fam.dad.fh!=null?fam.dad.fh:3,ht:1,bd:2},id=='garage'?4.5:0,id=='garage'?zf-2.4:z0+2.5,Math.PI,'Dad');O.push({k:'hfam',who:'dad',n:fam.dad.n,x:m.position.x,z:m.position.z+.8,m})}
  fam.sibs.forEach((s,i)=>{if(s.age>=18&&!s.gar)return;const sc_=s.age<12?.75:1,m=mk({c1:s.g=='b'?'#2e8b57':'#d35400',c2:'#ffffff',d:0,pc:'#2b2b2b'},{fem:s.g=='s'?1:0,sk:fsk(s.sk),hr:s.hr!=null?s.hr:(s.g=='s'?4:i%3),hcl:s.hc||'#3b2a1a',fh:0,ht:0,bd:s.g=='s'?0:1},2+i*1.6,z0-1,Math.PI,s.n.split(' ')[0]);m.scale.multiplyScalar(sc_);O.push({k:'hfam',who:'s'+i,n:s.n,x:m.position.x,z:m.position.z+.8,m})})}
 (fam.dogs||[]).forEach((d,i)=>{if(!atParents&&!S.dogMine)return;const m=dogM(d.b,-3-i*1.5,z0+3);O.push({k:'hdog',n:d.n,b:d.b,x:-3-i*1.5,z:z0+3.8,dm:m})});
 if(S.gf&&(S.gf.status=='married'||S.gf.home||S.gf.vis==k)){const g_=S.gf,m=mk({c1:'#e84393',c2:'#ffffff',d:0,pc:'#2b2b2b'},{sk:2,hr:4,hcl:g_.hc||'#5a3825',fh:0,ht:0,bd:0},x2-6,z0+3,Math.PI,g_.n.split(' ')[0]);O.push({k:'hgf',n:g_.n,x:x2-6,z:z0+3.8,m})}
 (S.ph&&S.ph.c||[]).filter(c=>c.cameW==k&&c.pers!='gf').slice(0,4).forEach((c,i)=>{const m=mk({c1:'#555555',c2:'#ffffff',d:0,pc:'#2b2b2b'},{sk:Math.abs(hsh(c.n))%6,hr:c.pers=='mom'||/Sister/.test(c.role)?4:1,hcl:'#2b1b12',fh:1,ht:1,bd:1},-5+i*1.8,zf-3,Math.PI,c.n.split(' ')[0]);O.push({k:'hguest',n:c.n,ci:S.ph.c.indexOf(c),x:-5+i*1.8,z:zf-2.2,m})});
 put('hdoor','Front door',0,zf-.4,{});
 const pm=mk3({...DJ(),c1:'#2b2b2b',c2:'#ffffff'},1.2,0,{nm:'',num:''},AP(),1);PL.add(pm);
 LR={p:{x:0,z:zf-2,ry:0},pm,O,all:[...O],walls:[],hw,bd:[x1+.6,x2-.6,zb+.6,zf+(own.includes('pool')&&sz>=4?9:-.4)],field:1,home:1,hk:k,near:null,tg:null,pend:null,joy:null,pd:null};
 const el=$('#lrw');el.innerHTML=`<div class=top><button onclick="hmExit()">Leave</button><div id=lrs></div></div><div id=lrj><div id=lrk></div></div><div id=lra></div><div id=lrh>🏠 ${H[1]}. Walk around and tap things to use them.</div><div id=lrcap></div>`;el.style.display='block';lrPtr();lrStat();save()}
const hmOnce=(key)=>{S.hwk=S.hwk||{};if(S.hwk[key]==wkKey())return false;S.hwk[key]=wkKey();return true};
function hmAct(o){const F=S.fam;
 if(o.k=='hdoor')return hmExit();
 if(o.k=='hbed')return talk('mate','Your bed',hzEns()[0]=='garage'?'A mattress on the garage floor. It is home.':'Your bed. Nothing like your own pillow.','happy',[['😴 Take a nap','hmNap()'],...(S.gf&&!S.gf.cel&&LR.O.some(x=>x.k=='hgf')?[['❤️ Woo-hoo with '+S.gf.n.split(' ')[0],'hmWoo()']]:[]),['Not now','ovHide()']]);
 if(o.k=='htv')return talk('mate','TV','GSPN is on.','happy',[['📺 Watch GSPN','hmExit(1);gpV()'],['Turn it off','ovHide()']]);
 if(o.k=='hgame')return talk('mate','Gaming setup','One more game. Just one.','happy',[['🎮 Play a few games','hmPlay()'],['Not now','ovHide()']]);
 if(o.k=='hgym')return talk('mate','Home gym','Extra reps while everyone else sleeps.','smug',[['🏋️ Work out','hmLift()'],['Not now','ovHide()']]);
 if(o.k=='hfr')return talk('mate','Kitchen',hzEns()[0]=='parents'?'Mom made plates. Yours is in the microwave.':'Cereal again?','happy',[['🍳 Eat','hmEat()'],['Not hungry','ovHide()']]);
 if(o.k=='hpool')return talk('mate','Pool','Crystal clear water.','happy',[['🏊 Take a swim','hmSwim()'],['Later','ovHide()']]);
 if(o.k=='htr'||o.k=='htrs')return talk('mate',o.k=='htr'?'Trophy room':'Your trophies',troList().length?troList().length+' trophies on the shelf: '+troList().slice(-4).map(t=>esc(t.n)).join(' · ')+(troList().length>4?' and more.':'.'):'Empty shelf. Go win something.','smug',[['🏆 Open the trophy case','hmExit(1);trophyV()'],['Nice','ovHide()']]);
 if(o.k=='hdog')return talk('mate',o.n,o.n+' the '+o.b+' is wagging like crazy.','happy',[['🐕 Pet '+o.n,'hmPet()'],['Good boy','ovHide()']]);
 if(o.k=='hgf'){const g_=S.gf;return talk('gf',g_.n.split(' ')[0],['Hey you ❤️','I missed you today.','Cook me something?','Movie night?'][ri(0,3)],'happy',[['🤗 Hug','hmHug()'],...(LR.O.some(x=>x.k=='hbed')&&!g_.cel?[['❤️ Woo-hoo','hmWoo()']]:[]),['Later','ovHide()']])}
 if(o.k=='hguest'){const c=S.ph.c[o.ci];return talk('mate',o.n,['Nice place!','Thanks for having me.','What we eating?','This is cool, man.'][ri(0,3)],'happy',[['Glad you came','ovHide()']])}
 if(o.k=='hfam'){const p=o.who=='mom'?F.mom:o.who=='dad'?F.dad:F.sibs[+o.who.slice(1)];if(!p)return ovHide();const L=o.who=='mom'?['Did you eat? There is food in the fridge.','I am so proud of you, baby.','Clean that garage!']:o.who=='dad'?['Proud of you, son. Keep working.','That last game? We need to talk about your footwork.','Garage door stays closed, the heating bill is crazy.']:['Can I have your old jersey?','You are so annoying. Love you though.','Get me tickets!'];
  return talk(o.who=='mom'?'mom':o.who=='dad'?'coach':'mate',p.n.split(' ')[0]+(o.who=='mom'?' (Mom)':o.who=='dad'?' (Dad)':''),L[ri(0,L.length-1)],'happy',[['🤗 Hug','hmFam(\''+o.who+'\')'],['Bye','ovHide()']])}}
function hmNap(){ovHide();if(hmOnce('nap'))hapAdd(2);const h=$('#lrh');if(h)h.textContent='😴 You feel rested.'}
function hmPlay(){ovHide();if(hmOnce('game'))hapAdd(3);const h=$('#lrh');if(h)h.textContent='🎮 You went 4-1 online. Happiness up.'}
function hmLift(){ovHide();const pro=(S.hzi||[]).includes('gy2');if(hmOnce('lift')){S.pts=(S.pts||0)+(pro?2:1);hapAdd(1)}const h=$('#lrh');if(h)h.textContent='🏋️ Good lift. +'+(pro?2:1)+' training point'+(pro?'s':'')+' (once a week).'}
function hmEat(){ovHide();if(hmOnce('eat'))hapAdd(1);const h=$('#lrh');if(h)h.textContent='🍳 Fueled up.'}
function hmSwim(){ovHide();if(hmOnce('swim'))hapAdd(2);const h=$('#lrh');if(h)h.textContent='🏊 Refreshing.'}
function hmPet(){ovHide();if(hmOnce('pet'))hapAdd(2);const h=$('#lrh');if(h)h.textContent='🐕 Best friend.'}
function hmHug(){ovHide();if(S.gf&&hmOnce('hug'))S.gf.aff=cl(S.gf.aff+relG(1),0,100);lrStat()}
function hmFam(w){ovHide();const F=S.fam,p=w=='mom'?F.mom:w=='dad'?F.dad:F.sibs[+w.slice(1)];if(p&&hmOnce('fam'+w)){p.like=cl(p.like+1,0,100);hapAdd(1)}}
function hmWoo(){ovHide();const h=$('#lrh');if(h)h.textContent='❤️ ...the lights go out. Hearts everywhere. ❤️'}
function hmExit(skip){try{hmMood(0)}catch(e){}const w=$('#lrw');w.style.display='none';w.innerHTML='';LR=null;FLD.visible=EZ.visible=true;ui.style.display='block';save();if(!skip)homeV()}

// ===================== MOVING IN · WOO-HOO · BABIES (college or pro) =====================
function moveAsk(){const g_=S.gf;if(!g_)return hub();const id=hzEns()[0],F=g_.n.split(' ')[0];let ok,ln;
 if(id=='dorm'){ok=false;ln='In your dorm? Your RA would lose it. Get a real place first.'}
 else if(id=='garage'||id=='parents'){ok=R()<.25&&g_.aff>=70;ln=ok?'Honestly? I do not care where we live as long as it is with you. I am in.':'Move into your '+(id=='garage'?parLbl().toLowerCase()+' garage':'parents\' house')+'? Babe... get us our own place first.'}
 else{ok=R()<cl((g_.aff-35)/50,.1,.95);ln=ok?'YES. I have been waiting for you to ask!':'I love you, but I am not ready to move in yet.'}
 if(ok){g_.home=1;hapAdd(3);g_.aff=cl(g_.aff+relG(3),0,100)}else g_.aff=cl(g_.aff-2,0,100);g_.mvA=wkKey();save();talk('gf',F,ln,ok?'happy':'sad',[['OK','ovHide();hub()']],ok?'🏠 '+F+' moved in with you.':'')}
const moveBtn=()=>{const g_=S.gf;if(!g_||g_.home||g_.status=='married')return '';return g_.mvA==wkKey()?'<p><small>You asked about moving in this week.</small></p>':'<button class=g onclick="moveAsk()">🏠 Ask her to move in</button>'};
function hmWoo(){ovHide();const g_=S.gf;if(!g_)return;talk('gf',g_.n.split(' ')[0],'😏','happy',[['❤️ Woo-hoo (not trying for a baby)','hmWoo2(0)'],['👶 Woo-hoo (trying for a baby)','hmWoo2(1)'],['Not tonight','ovHide()']])}
function hmWoo2(t){ovHide();const g_=S.gf,h=$('#lrh');hapAdd(2);g_.aff=cl(g_.aff+relG(1),0,100);
 if(LR&&LR.pm){const b=bnr('❤️ ❤️ ❤️','#ff4f8b');const bed=LR.O.find(o=>o.k=='hbed');if(bed){b.position.set(bed.x-1.8,2.4,bed.z);b.scale.set(5,.7,1);PL.add(b);setTimeout(()=>{try{PL.remove(b)}catch(e){}},4000)}}
 if(h)h.textContent='❤️ The lights go out... hearts everywhere. ❤️';
 if(t&&!S.preg&&R()<.11){S.preg={g:R()<.5?'b':'g',yr:yrN()};setTimeout(()=>talk('gf',g_.n.split(' ')[0],'Babe... I have something to tell you. I\'m pregnant! 👶','happy',[['😭❤️','ovHide()']],'A baby '+(S.preg.g=='b'?'boy':'girl')+' is on the way. They arrive next season.'),900)}save();lrStat()}
// next season: the baby arrives
function babyYear(){if(!S.preg)return;const g=S.preg.g,n=(g=='b'?NF[ri(0,NF.length-1)]:FN2[ri(0,FN2.length-1)])+' '+lastN();(S.kids=S.kids||[]).push({n,g,age:0,born:yrN()});S.preg=null;hapAdd(8);S.fmsg=(S.fmsg?S.fmsg+' ':'')+'👶 Your '+(g=='b'?'son':'daughter')+' '+n.split(' ')[0]+' was born! Rename them in Family.';}
function kidsHtml(){const K=S.kids||[];if(!K.length&&!S.preg)return '';return `<div class=card><b>👶 Your kids</b>${S.preg?'<p><small>A baby '+(S.preg.g=='b'?'boy':'girl')+' is on the way.</small></p>':''}${K.map((k,i)=>`<div class=row style="font-size:16px"><span>${esc(k.n)} <small>${k.g=='b'?'Son':'Daughter'} · age ${k.age}</small></span><button class=g onclick="kidName(${i})">Rename</button></div>`).join('')}</div>`}
function kidName(i){const k=(S.kids||[])[i];if(!k)return famV();const n=prompt('Name your '+(k.g=='b'?'son':'daughter')+':',k.n.split(' ')[0]);if(n&&n.trim())k.n=n.trim().slice(0,20)+' '+lastN();save();famV()}
function kidsYear(){(S.kids||[]).forEach(k=>k.age++)}
