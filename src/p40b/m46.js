
// ===================== WEDDING DAY: pick a date that works for both of you, then walk it (or sim it) =====================
function gfPrefs(gf){if(gf.okWkd==null){const h=Math.abs(hsh(gf.n+'w'));gf.okWkd=h%3!=0?1:0;gf.maxW=6+h%22}return gf}
// her team's open weeks (if she cheers for a college team in your league)
function gfBusy(gf,w){try{if(S.stage!='col'||!Array.isArray(S.csch))return false;const i=S.T.findIndex(t=>t.n==gf.team||tn(t)==gf.team);if(i<=0)return false;return (S.csch[w]||[]).some(p=>p[0]==i||p[1]==i)}catch(e){return false}}
function wedDates(){const gf=gfPrefs(S.gf),out=[],st=S.stage;
 out.push({k:'wkd',lab:'This week, on a weekday',wks:0,ok:gf.okWkd?1:0,why:gf.okWkd?'Works for her.':'"A Tuesday? No. Not my wedding."'});
 if(st=='col'&&Array.isArray(S.csch)){const n=S.csch.length;let w=-1;for(let k=S.wk||0;k<n;k++){const me=(S.csch[k]||[]).some(p=>p[0]==0||p[1]==0);if(!me&&!gfBusy(gf,k)){w=k;break}}
  if(w>=0){const wks=w-(S.wk||0);out.push({k:'bye',w,lab:'Saturday of week '+(w+1)+' (your bye'+(gfBusy(gf,w)?'':', and she is free')+')',wks,ok:wks<=gf.maxW?1:0,why:wks<=gf.maxW?'Works for her.':'"That is way too far from now."'})}
  else out.push({k:'bye',lab:'A Saturday during the season',wks:99,ok:0,why:'No Saturday when you are both free this season.'})
  const off=Math.max(0,n-(S.wk||0))+4;out.push({k:'off',lab:'The off-season (after the season)',wks:off,ok:off<=gf.maxW?1:0,why:off<=gf.maxW?'Works for her.':'"That is way too far from now."'})}
 else{const off=st=='pro'?Math.max(0,18-(S.wk||0))+6:8;out.push({k:'off',lab:'The off-season',wks:off,ok:off<=gf.maxW?1:0,why:off<=gf.maxW?'Works for her.':'"That is way too far from now."'})}
 return out}
function wedDate(i){const gf=S.gf;if(!gf||gf.status!='engaged')return hub();const w=WED[i],pr=S.stage=='pro'?w[3]:w[2];if(S.cash<pr){HM='You need $'+pr.toLocaleString()+' for the '+w[1].toLowerCase()+'.';return wedPlan()}if(!(owns('b1')||owns('b2'))){HM='Buy wedding bands in the Shop first.';return shopV('band')}
 const D=wedDates(),any=D.some(d=>d.ok);
 ui.innerHTML=`<div><h2>📅 Pick the date</h2><div class=card><b>${w[1]}</b> · $${pr.toLocaleString()}<br><small>${gf.n.split(' ')[0]} ${gf.okWkd?'is fine with a weekday':'does NOT want a weekday wedding'} and will not wait more than ${gf.maxW} weeks.</small></div><div class=card>${D.map((d,j)=>`<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span>${d.lab}${d.wks<99?'<br><small>'+(d.wks?d.wks+' week'+(d.wks>1?'s':'')+' away':'right away')+'</small>':''}<br><small>${d.why}</small></span>${d.ok?`<button class=g onclick="wedBook(${i},${j})">Book it</button>`:'<small>❌</small>'}</span></div>`).join('')}</div>${any?'':`<div class=card><b>No date works for her.</b><br><small>She has to decide whether she still wants to do this.</small><button onclick="wedNoDate()">Tell her</button></div>`}<button class=g onclick=wedPlan()>Back</button></div>`;ui.scrollTop=0}
function wedBook(i,j){const gf=S.gf,d=wedDates()[j],w=WED[i],pr=S.stage=='pro'?w[3]:w[2];if(!d||!d.ok)return wedDate(i);if(S.cash<pr)return wedDate(i);S.cash-=pr;gf.wsch={i,k:d.k,w:d.w,stage:S.stage,yr:yrN(),wk0:S.wk||0};HM='💒 Booked: '+w[1]+', '+d.lab.toLowerCase()+'.';save();hub()}
function wedNoDate(){const gf=S.gf;if(R()<gf.aff/130){gf.aff=cl(gf.aff-8,0,100);gf.wtry=yrN();save();talk('gf',gf.n.split(' ')[0],'I am not going anywhere. We will find a date next season.','sad',[['OK','ovHide();hub()']],'Still engaged. Relationship -8.')}
 else{(S.exes=S.exes||[]).push(gf.n);S.gf=null;S.pop=cl((S.pop||40)-2,0,100);save();talk('gf',gf.n.split(' ')[0],'If you cannot make time for our wedding, I cannot do this. I am sorry.','sad',[['...','ovHide();hub()']],'She called off the engagement.')}}
// is it the big day?
function wedDue(){const gf=S.gf,ws=gf&&gf.wsch;if(!ws||gf.status!='engaged')return false;if(ws.k=='wkd')return true;if(ws.k=='bye')return S.stage==ws.stage&&yrN()==ws.yr?(S.wk||0)>=ws.w:true;return S.stage!=ws.stage||yrN()!=ws.yr||!!(S.csum||S.psum||S.cdone)}
function wedDayH(){if(!wedDue())return '';return `<div class=card style="border-color:#ffe93b"><b>💒 It's your wedding day!</b><br><small>${WED[S.gf.wsch.i][1]} with ${S.gf.n.split(' ')[0]}.</small><button onclick="wedWalk()">Walk it (live)</button><button class=g onclick="wedSim()">Sim the wedding</button></div>`}
function wedSim(){const ws=S.gf.wsch;WDG={i:ws.i,fit:wedFit(gfTaste(),WED[ws.i][4]),suit:S.suit};S.gf.wsch=null;wedStep(0)}

// ---- the venue you walk around in ----
const WGL=['Congratulations! She looks beautiful.','I cried during the vows, not gonna lie.','Open bar after this, right?','I have known her since we were kids. Treat her right.','Best wedding I have ever been to.','You clean up nice, QB!','Can I get a picture with the couple later?'];
function wedWalk(){const gf=S.gf,ws=gf.wsch,w=WED[ws.i],lvl=w[4];ovHide();ui.style.display='none';cv.style.display=hud.style.display='none';['#lb','#camb','#pb','#spk'].forEach(s=>{const e=$(s);if(e)e.style.display='none'});scene('field');M='walk';clr(PL);CHR.visible=false;
 const mk=(jj,ap,x,z,ry,lb)=>{const m=mk3(jj,1.2,0,null,ap,1);m.position.set(x,0,z);m.rotation.y=ry||0;PL.add(m);if(lb){const s=lbl(lb);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s)}return m},rs=rng(hsh(gf.n)+lvl*7),ap=()=>({sk:rs()*6|0,hr:rs()*6|0,hcl:['#1b1b1b','#5a3825','#c99a5a','#2b1b12','#9a9a9a'][rs()*5|0],fh:rs()*4|0,ht:rs()*3|0,bd:rs()*3|0}),O=[];
 const fl=[0xffb6c1,0xffffff,0xfff0a0,0xff8fab][lvl%4];
 // aisle, chairs, arch, flowers (bigger venue for bigger weddings)
 bx(70,.04,70,lvl>=3?0xeae2d0:0x4f9a3f,0,.015,-48,PL);bx(3,.06,30,0xffffff,0,.03,-48,PL);for(let z=-36;z>=-60;z-=4){bx(.5,.5,.5,fl,-1.9,.25,z,PL);bx(.5,.5,.5,fl,1.9,.25,z,PL)}
 bx(.4,5,.4,0xf5f5f5,-3,2.5,-63,PL);bx(.4,5,.4,0xf5f5f5,3,2.5,-63,PL);bx(6.4,.5,.5,0xf5f5f5,0,5,-63,PL);for(let i=0;i<9;i++)bx(.7,.7,.7,i%2?fl:0xffffff,-3+i*.75,5.4,-63,PL);
 if(lvl>=3){bx(30,.2,34,0xeae2d0,0,.01,-48,PL)}if(lvl>=4)for(let i=0;i<10;i++)bx(.3,4,.3,0xd4af37,(i%2?-14:14),2,-36-i*3,PL);
 {const b=bnr((S.name.split(' ').pop()+' & '+gf.n.split(' ')[0]).toUpperCase(),'#ffffff');b.position.set(0,7,-63.5);b.scale.set(12,1.5,1);PL.add(b)}
 // guests
 const rows=lvl>=3?6:lvl>=1?4:2,per=lvl>=3?4:3;for(let r=0;r<rows;r++)for(let c=0;c<per;c++)for(const sd of[-1,1]){const x=sd*(3+c*1.6),z=-40-r*3.2;bx(.9,.5,.9,0xdedede,x,.25,z+.15,PL);const m=mk(suitJ(['#1d2533','#3a3a3a','#5a2a4a','#2a4a5a','#6b4a2b'][rs()*5|0],['#c9a227','#8a1c1c','#ffffff'][rs()*3|0]),ap(),x,z,Math.PI);sitP(m);if((r+c)%2==0)O.push({k:'wgst',x,z:z+.9,m,n:FN2[rs()*FN2.length|0]})}
 // groomsmen (teammates) and family
 const L=rost('h.0');[1,2,3,5].filter(i=>L[i]).forEach((i,j)=>{const x=3.6+j*1.4,z=-61,m=mk(suitJ('#111111','#'+((lum(S.T[0].c1||'#333')>.5)?'333333':(S.T[0].c1||'#8a1c1c').slice(1))),{sk:(i*7)%6,hr:i%6,hcl:'#1b1b1b',fh:i%4,ht:1,bd:1},x,z,-Math.PI/2,L[i].n.split(' ').pop());O.push({k:'wman',x,z,m,n:L[i].n,pos:L[i].pos})});
 {const m=mk(suitJ('#3a6ea5','#ffffff'),{sk:1,hr:4,hcl:'#3b2a1a',fh:0,ht:0,bd:1},-6,-40,Math.PI,'Mom & Dad');O.push({k:'wfam',x:-6,z:-39,m,n:'Mom & Dad'})}
 {const m=mk(suitJ('#2b2b2b','#d4af37'),{sk:3,hr:2,hcl:'#9a9a9a',fh:2,ht:1,bd:2},6,-40,Math.PI,"Her parents");O.push({k:'wher',x:6,z:-39,m,n:'Her parents'})}
 {const m=mk(suitJ('#111111','#ffffff'),{sk:2,hr:1,hcl:'#9a9a9a',fh:2,ht:1,bd:1},0,-62.2,0,'Officiant');O.push({k:'wofc',x:0,z:-60.4,m,n:'The officiant'})}
 // the bride waits at the back
 const B=mk({c1:'#ffffff',c2:'#ffffff',d:0,pc:'#ffffff',hc:'#ffffff',nc:'#ffffff'},{sk:gf.skc?2:1,hr:4,hcl:gf.hc||'#5a3825',fh:0,ht:0,bd:0,fem:1},0,-31,Math.PI);bx(1.1,1.2,.9,0xffffff,0,.6,0,B);bx(.9,.08,.9,0xffffff,0,2.75,0,B);bx(.85,1.3,.06,0xf8f8ff,0,2.2,.42,B);
 const pm=mk3({...suitJ(WDG_SUIT()),nm:''},1.2,0,null,AP(),1);PL.add(pm);
 LR={p:{x:0,z:-35,ry:0},pm,O,all:[...O],walls:[],bd:[-16,16,-66,-28],field:1,wed:1,wd:{},B,wk:wkKey(),near:null,tg:null,pend:null,joy:null,pd:null};WDG={i:ws.i,fit:wedFit(gfTaste(),lvl),suit:S.suit};
 const el=$('#lrw');el.innerHTML=`<div class=top><button onclick="wedQuit()">Sim the rest</button><div id=lrs></div></div><div id=lrj><div id=lrk></div></div><div id=lra></div><div id=lrh>💒 Your wedding! Say hi to your guests, then meet the officiant at the altar.</div><div id=lrcap></div>`;el.style.display='block';lrPtr();lrStat();save()}
function WDG_SUIT(){const it=SHOP.find(x=>x[0]==S.suit&&owns(x[0]));return it?suitC(it).c:'#3a3a3a'}
function wdAct(o){const D=LR.wd,gf=S.gf,F=gf.n.split(' ')[0];
 if(o.k=='wgst')return talk('mate',o.n+' (guest)',WGL[ri(0,WGL.length-1)],'happy',[['Thanks for coming','ovHide()']]);
 if(o.k=='wman')return talk('mate',o.n+' (groomsman)',['You nervous? Do not be. She is lucky to have you.','I got the rings. Relax.','Best man speech is gonna be legendary.','Proud of you, man.'][ri(0,3)],'happy',[['🤝','ovHide()']]);
 if(o.k=='wfam')return talk('mom','Mom','My baby is getting married! Stand up straight.','happy',[['❤️','ovHide()']]);
 if(o.k=='wher')return talk('coach',"Her dad",WDG.fit>=1?'Welcome to the family, son.':'Take care of my little girl. I mean it.',WDG.fit>=1?'happy':'smug',[['Yes sir','ovHide()']]);
 if(o.k=='wofc'){if(D.vows)return talk('staff',o.n,'Go enjoy your reception!','happy',[['🎉 Reception','wdParty()']]);if(Math.hypot(LR.p.x,LR.p.z+60)>3.5)return talk('staff',o.n,'Take your place at the front, son.','smug',[['OK','ovHide()']]);return talk('staff',o.n,'Everyone, please rise.','happy',[['Here comes the bride','wdAisle()']])}}
function wdAisle(){ovHide();LR.p.x=-1;LR.p.z=-60.6;LR.p.ry=Math.PI;const B=LR.B,t0=performance.now();const f=()=>{if(!LR||!LR.wed)return;const t=(performance.now()-t0)/1000,z=-31-Math.min(1,t/7)*28.5;B.position.z=z;B.position.x=Math.min(1,t/7)>=1?1:0;if(t<7)requestAnimationFrame(f);else{LR.wd.here=1;wdVows()}};requestAnimationFrame(f);const h=$('#lrh');if(h)h.textContent='👰 Here comes the bride.'}
function wdVows(){const gf=S.gf;ovShow(`<h2>💬 Your vows</h2><p>${gf.n.split(' ')[0]} takes your hands.</p><button onclick="WDG.v=2;wdKiss()">Heartfelt</button><button onclick="WDG.v=1;wdKiss()">Funny</button><button onclick="WDG.v=0;wdKiss()">Short and sweet</button>`)}
function wdKiss(){LR.wd.vows=1;ovShow(`<h2>💍 Rings</h2><p>You exchange rings. "By the power vested in me... you may kiss the bride!"</p><button onclick="wdKiss2()">💋 Kiss the bride</button>`)}
function wdKiss2(){ovHide();LR.conf=confBuild(300,['#ffffff','#ffd700','#ffb6c1']);S.pop=cl((S.pop||40)+1,0,100);lrStat();const h=$('#lrh');if(h)h.textContent='💍 Just married! Walk around, then talk to the officiant to head to the reception.'}
function wdParty(){ovHide();LR.O.forEach(o=>{if(o.k=='wgst'||o.k=='wman'){o.m.position.y=0;o.m.rotation.y=rng(o.x*99)()*6}});LR.conf=confBuild(240,[S.T[0].c1||'#ffffff',S.T[0].c2||'#ffd700','#ffffff']);ovShow(`<h2>🎉 The reception</h2><p>First dance, cake, and your offensive line owning the dance floor.</p><button onclick="wdDone()">End the night</button>`)}
function wdDone(){const w=$('#lrw');w.style.display='none';w.innerHTML='';LR=null;ui.style.display='block';S.gf.wsch=null;wedEnd()}
function wedQuit(){const w=$('#lrw');w.style.display='none';w.innerHTML='';LR=null;ui.style.display='block';S.gf.wsch=null;if(!WDG.v)WDG.v=1;wedEnd()}
