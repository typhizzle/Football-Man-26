// ===================== 🔄 JERSEY SWAPS: they decide, a real swap on the field, and you keep it to wear =====================
// will he swap? his jersey's value, how he feels about you, and whether this is a game he wants to remember
function jsDecide(o){const Lo=rost('h.'+g.oi)||[],me=Lo.find(x=>x&&x.n==o.n)||{},ov=me.ovr||75,big=['pp','po','cfp','cc'].includes(g.kind)||!!(LR&&LR.champ),mg=(g.s?g.s[0]-g.s[1]:0),lost=mg>0,
 riv=!!(S.prv2&&S.prv2[o.n]),fame=cl(Math.log10(Math.max(10,(typeof fans=='function'?fans():1000)))/7,0,1),r=R();
 let p=.72;const why=[];
 if(ov>=90){p-=.18;why.push('val')}
 if(big){p-=.25;why.push('big')}
 if(riv){p-=.35;why.push('riv')}
 if(lost&&mg>=21){p-=.15;why.push('salty')}
 if(Math.abs(mg)<=3){p-=.08;why.push('close')}
 p+=fame*.25;
 const yes=r<cl(p,.08,.95);
 const L_=yes?(ov>=90&&r>.55?'My jersey goes for a LOT, man. But for you? Let\'s do it.':big?'This game? Yeah. I want something to remember it by, and yours is it.':riv?'We go at it every time... but respect. Run it.':'Good game. Yeah, let\'s swap.')
  :why.includes('riv')?'Swap with you? I\'m good.':why.includes('big')?'Nah, I\'m keeping this one. I want to remember this game forever.':why.includes('val')?'Sorry, bro. My jerseys are worth too much to give away. Nothing personal.':why.includes('salty')?'Not tonight. Not after that.':why.includes('close')?'Not after a game like that. I\'m keeping this one to remember this moment.':'Nah, I\'m good. Maybe next time.';
 return{yes,line:L_}}
(()=>{const _f=fwOpp;fwOpp=function(a){const F=g.fw||{};if(a==2&&!F.opp){const o=LR&&LR.O.find(x=>x.k=='fopp');if(o){const d=jsDecide(o);if(!d.yes){F.opp=1;return talk('mate',o.n+' · '+o.team,d.line,'smug',[['Respect 🤝','ovHide()']],'No jersey swap this time.')}g.jsLine=d.line}}
 const n0=(S.coll||[]).length,r=_f.apply(this,arguments);
 try{if(a==2&&(S.coll||[]).length>n0){const o=LR.O.find(x=>x.k=='fopp'),Ot=g.o;S.jsw=S.jsw||[];S.jsw.push({n:o.n,num:o.num,team:o.team,c1:Ot.c1,c2:Ot.c2,d:Ot.d||0,pc:Ot.pc||'#dcdcdc',y:yrN(),wk:S.wk});save()}}catch(e){console.warn(e)}return r}})();
// the swap itself: both jerseys come off over your heads, get tossed across, and go on
(()=>{const _t=jsTick;jsTick=function(dt){const L=LR,J=L&&L.js;if(!J)return;let res;
 try{const t=J.t+dt;if(!J.cl&&t>=1.0){const mine=DJ(),Ot=g.o,mkJ=(c1,c2,num)=>{const G=new T3.Group();bx(.9,.95,.1,hexC(c1),0,0,0,G);bx(.3,.35,.1,hexC(c1),-.58,.2,0,G);bx(.3,.35,.1,hexC(c1),.58,.2,0,G);bx(.9,.08,.11,hexC(c2),0,-.3,0,G);
   const p=new T3.Mesh(new T3.PlaneGeometry(.6,.6),new T3.MeshBasicMaterial({map:tex(String(num),110,'#ffffff'),transparent:true}));p.position.z=.06;G.add(p);const q=p.clone();q.position.z=-.06;q.rotation.y=Math.PI;G.add(q);PL.add(G);return G};
   J.cl=[mkJ(mine.c1,mine.c2,S.num),mkJ(Ot.c1,Ot.c2,J.o.num)];J.cl.forEach(m=>m.visible=false)}
  if(J.cl){const a=L.pm.position,b=J.o.m.position,set=(m,from,to,u,h)=>{m.visible=true;m.position.set(from.x+(to.x-from.x)*u,h,from.z+(to.z-from.z)*u);m.rotation.y=Math.atan2(to.x-from.x,to.z-from.z);m.rotation.z=Math.sin(u*Math.PI)*.6};
   if(t<1.3){const u=(t-1)/.3;set(J.cl[0],a,a,0,1.6+u*1.5);set(J.cl[1],b,b,0,1.6+u*1.5)}
   else if(t<2.0){const u=(t-1.3)/.7,hh=3.1+Math.sin(u*Math.PI)*.9;set(J.cl[0],a,b,u,hh);set(J.cl[1],b,a,u,hh)}
   else if(t<2.25){const u=(t-2)/.25;set(J.cl[0],b,b,0,3.1-u*1.5);set(J.cl[1],a,a,0,3.1-u*1.5)}
   else{J.cl.forEach(m=>PL.remove(m));J.cl=[]}}}catch(e){}
 // (models switch to the other team's jersey at 1.6 inside the original animation)
 res=_t.apply(this,arguments);
 try{if(!L.js&&J.cl&&J.cl.length){J.cl.forEach(m=>PL.remove(m));J.cl=[]}if(!L.js&&g.jsLine){ovHide();const o=J.o;talk('mate',o.n,g.jsLine,'happy',[['Respect 🤝','ovHide()']],'🔄 Jersey swap! It\'s in 👕 Clothing now, ready to wear.');g.jsLine=null}}catch(e){}return res}})();

// ---------- 👕 swapped jerseys in Clothing (wear them in the locker room, around town or to events) ----------
(()=>{const _o=wrOpts;wrOpts=function(tab){const o=_o.apply(this,arguments);try{(S.jsw||[]).forEach((j,i)=>o.push(['jsw'+i,'🔄 '+j.n.split(' ').pop()+' #'+j.num+' jersey ('+j.team+', '+j.y+')']))}catch(e){}return o}})();
(()=>{const _n=wrName;wrName=function(id){const m=/^jsw(\d+)$/.exec(String(id));if(m){const j=(S.jsw||[])[+m[1]];if(j)return '🔄 '+j.n+' #'+j.num+' jersey'}return _n.apply(this,arguments)}})();
(()=>{const _m=outfitM;outfitM=function(id){const m=/^jsw(\d+)$/.exec(String(id));if(m){const j=(S.jsw||[])[+m[1]];if(j){const A={...(AP()||{})};return mk3({c1:j.c1,c2:j.c2,d:j.d,pc:'#2b2b33',nc:lum(j.c1)>.5?'#000':'#fff',hc:'#eeeeee'},1.2,0,{nm:j.n.split(' ').pop().toUpperCase(),num:j.num},{...A,fem:0},1)}}return _m.apply(this,arguments)}})();
// wearing a swapped jersey around town isn't a costume
(()=>{const _s=wrSet;wrSet=function(tab,id){const r=_s.apply(this,arguments);try{if(/^jsw/.test(String(id))&&S.cos==id){S.cos=null;save()}}catch(e){}return r}})();
// postgame lines: the "your backup one day" line only from a much worse QB
function fopBk(o){try{const x=(rost('h.'+g.oi)||[]).find(y=>y&&y.n==o.n);return !!x&&x.ovr<=qo(S.q)-10}catch(e){return false}}
// ===================== 🎃 HALLOWEEN LOCKER ROOM (during the event) =====================
function jackO(x,y,z,s,ry,P){const G=new T3.Group();G.position.set(x,y,z);G.rotation.y=ry||0;G.scale.setScalar(s||1);P.add(G);bx(.9,.72,.9,0xee7a12,0,.36,0,G);[-.3,0,.3].forEach(dx=>bx(.06,.74,.92,0xc45f08,dx,.36,0,G));bx(.1,.22,.1,0x3c6e1f,0,.82,0,G);
 const gl=new T3.MeshBasicMaterial({color:0xffd23a}),f=(w,h,dx,dy,rz)=>{const m=new T3.Mesh(new T3.PlaneGeometry(w,h),gl);m.position.set(dx,dy,-.461);m.rotation.set(0,Math.PI,rz||0);G.add(m)};
 f(.17,.15,-.2,.47,.6);f(.17,.15,.2,.47,-.6);f(.1,.1,0,.34,.78);f(.5,.1,0,.18);[-.16,0,.16].forEach(dx=>f(.07,.07,dx,.25));return G}
const HWLC=[['skull','💀 Skeleton'],['pumpkin','🎃 Pumpkin head'],['witch','🧙 Witch'],['clown','🤡 Clown']];
(()=>{const _l=lroom;lroom=function(){const r=_l.apply(this,arguments);try{if(!LR||typeof hwOn!='function'||!hwOn())return r;
 // jack-o'-lanterns: carved faces glowing toward the room
 [[-8.5,0,-8.6,1.1],[8.5,0,-8.6,1.1],[-19,0,-3,1],[-19,0,6,.9],[3.5,0,-8.7,.8],[-3.5,0,-8.7,.8],[18.6,0,-6,1]].forEach(([x,y,z,s])=>jackO(x,y,z,s,Math.atan2(-x,-(z-1))+Math.PI,PL));
 // orange / purple / black garland along the back wall, webs and bats
 for(let k=0;k<26;k++){const x=-18+k*1.44;bx(.5,.5,.06,[0xff7a12,0x111111,0x7b2cbf][k%3],x,6.6-Math.sin(k*.9)*.15,-9.1,PL)}
 [[-19.6,7,-9],[19.6,7,-9],[-19.6,7.2,10]].forEach(([x,y,z],i)=>{const w=new T3.Mesh(new T3.PlaneGeometry(2.4,2.4),new T3.MeshBasicMaterial({map:tex('🕸️',110,'#ffffff'),transparent:true,side:T3.DoubleSide}));w.position.set(x+(x<0?.4:-.4),y,z+(z<0?.4:-.4));w.rotation.y=x<0?Math.PI/4:-Math.PI/4;PL.add(w)});
 for(let k=0;k<6;k++){const b=new T3.Sprite(new T3.SpriteMaterial({map:tex('🦇',110,'#ffffff'),transparent:true}));b.position.set(-14+k*5.6,6.9+(k%2)*.5,-3+(k%3)*4);b.scale.set(1.1,1.1,1);PL.add(b)}
 // a few teammates came in costume
 const M_=LR.O.filter(o=>o.k=='mate'&&o.m).slice(0,8);[1,3,5,7].map(i=>M_[i]).filter(Boolean).forEach((o,i)=>{const c=HWLC[i%HWLC.length];try{hatOn(o.m,c[0]);if(c[0]=='skull'){bx(1.12,1.6,.06,0x111111,0,1.25,.33,o.m)}if(c[0]=='witch'){bx(1.12,1.5,.06,0x2b0f3a,0,1.3,.33,o.m)}o.cos=c[1]}catch(e){}});
 }catch(e){console.warn('hw locker',e)}return r}})();
// close-up camera on the swap so you actually see it
(()=>{const _t=jsTick;jsTick=function(dt){const L=LR,J=L&&L.js;const r=_t.apply(this,arguments);try{if(L&&L.js&&J&&J.o&&J.o.m){const a=L.pm.position,b=J.o.m.position,mx=(a.x+b.x)/2,mz=(a.z+b.z)/2,dx=b.x-a.x,dz=b.z-a.z,dl=Math.hypot(dx,dz)||1,nx=-dz/dl,nz=dx/dl;cm.position.set(mx+nx*5.2,2.9,mz+nz*5.2);cm.lookAt(mx,1.9,mz);if(cm.fov!=50){cm.fov=50;cm.updateProjectionMatrix()}}}catch(e){}return r}})();
// sometimes he asks you first, and then it's a yes
(()=>{const _a=fwAct;fwAct=function(o){try{const F=g.fw||(g.fw={});if(o&&o.k=='fopp'&&!F.opp&&!F.ask){F.ask=1;const riv=!!(S.prv2&&S.prv2[o.n]);if(!riv&&R()<.35){g.jsYes=1;return talk('mate',o.n+' · '+o.team,(g.w?'Good game, man. Y\'all earned that one.':'Good game, man.')+' Want to swap jerseys?','happy',[['Trade jerseys','fwOpp(2)'],['Shake hands','fwOpp(1)'],['Not today','ovHide()']])}}}catch(e){}return _a.apply(this,arguments)}})();
(()=>{const _d=jsDecide;jsDecide=function(o){if(g&&g.jsYes){g.jsYes=0;return{yes:true,line:'That\'s going on my wall. Respect.'}}return _d.apply(this,arguments)}})();
// ===================== 🔄 JERSEY SWAPS v3: own flag (works after a handshake), lots of reasons both ways, wider camera with photographers =====================
function jsDecide(o){const Lo=rost('h.'+g.oi)||[],me=Lo.find(x=>x&&x.n==o.n)||{},ov=me.ovr||75,big=['pp','po','cfp','cc'].includes(g.kind)||!!(LR&&LR.champ),mg=(g.s?g.s[0]-g.s[1]:0),riv=!!(S.prv2&&S.prv2[o.n]),trash=!!(g.fw&&g.fw.trash),
 fame=cl(Math.log10(Math.max(10,(typeof fans=='function'?fans():1000)))/7,0,1),first=(S.stage=='pro'&&(S.py||1)<=1&&(S.wk||0)<=1),nice=faHs2(o.n,7)>.55,fanOf=faHs2(o.n,8)>.8&&fame>.55,r=R(),pk=a=>a[Math.floor(R()*a.length)];
 let p=.62+fame*.25+(nice?.12:0)+(g.st&&g.st.td>=3?.06:0);if(ov>=90)p-=.15;if(big)p-=.2;if(first)p-=.12;if(riv)p-=.35;if(trash)p-=.4;if(mg>=21)p-=.15;
 const yes=r<cl(p,.06,.96);
 if(yes){if(fanOf)return{yes,line:pk(['Honestly? I\'m a fan. I was gonna ask YOU. Let\'s do it!','My little brother is gonna lose his mind. Deal!'])};
  if(big)return{yes,line:pk(['A game like this? Yeah, I want yours to remember it by.','Championship game jersey swap. That\'s one for the wall.'])};
  if(first)return{yes,line:'My first game in the league and I get YOUR jersey? Bet.'};
  if(ov>=90)return{yes,line:pk(['My jerseys go for a LOT, but for you? Let\'s do it.','Normally I keep these. You earned it today though.'])};
  if(riv)return{yes,line:'We go at it every time... but respect. Run it.'};
  return{yes,line:pk(['Yeah man, I\'m down. Let\'s do it!','That\'s a good idea. Here you go.','You balled out today. It\'d be an honor.','Bet. Sign it for me too!','Good game. Yeah, let\'s swap.'])}}
 if(trash)return{yes,line:pk(['After all that talking? No way, bro.','Nah. Keep running your mouth though.'])};
 if(riv)return{yes,line:pk(['Swap with you? I\'m good.','Not a chance. We see you next year.'])};
 if(fame<.45)return{yes,line:pk(['Do I even know you, bro?','Who are you again? Nah, I\'m good.'])};
 if(big)return{yes,line:pk(['Nah, I\'m keeping this one. I want to remember this game forever.','Not today. This one is going in a frame.'])};
 if(first)return{yes,line:'It\'s my first game in the league. My mom is getting this one, sorry!'};
 if(ov>=90)return{yes,line:pk(['Sorry, bro. My jerseys are worth too much to give away. Nothing personal.','My agent would kill me. Next time.'])};
 if(mg>=21)return{yes,line:'Not tonight. Not after that.'};
 return{yes,line:pk(['Nah, I\'m good. Maybe next time.','I promised this one to my cousin. Next time for sure.','I already swapped with someone today, sorry!'])}}
const faHs2=(s,n)=>{let h=2166136261;s=String(s)+'|'+n;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return ((h>>>0)%10000)/10000};
// trading has its own flag: you can still ask after shaking hands (but not after he says no, or after you already swapped)
(()=>{const _f=fwOpp;fwOpp=function(a){const F=g.fw||(g.fw={});if(a==3)F.trash=1;if(a==2){if(F.sw)return talk('mate',(LR.O.find(x=>x.k=='fopp')||{}).n||'',F.swOk?'You already got my jersey, bro!':'I said no, man. Respect it.','smug',[['OK','ovHide()']]);F.sw=1;const keep=F.opp;F.opp=0;const r=_f.apply(this,arguments);if(LR&&LR.js)F.swOk=1;else F.opp=keep||F.opp;return r}return _f.apply(this,arguments)}})();
// wider shot, and a couple of photographers with flashes
(()=>{const _s=jsStart;jsStart=function(o){const r=_s.apply(this,arguments);try{if(LR&&LR.js){const a=LR.pm.position,ph=[];[[-1,1],[1,1]].forEach(([sx,sz],k)=>{const m=mk3({c1:'#2b2b2b',c2:'#555555',d:0,pc:'#2b2b33'},1.1,0,null,{sk:k*3%6,hr:1,hcl:'#1b1b1b',fh:0,ht:1,bd:1},1);const cam_=new T3.Group();bx(.35,.25,.25,0x111111,0,0,0,cam_);bx(.15,.15,.2,0x333333,0,0,-.2,cam_);cam_.position.set(0,2.2,-.45);m.add(cam_);m.A[0].rotation.x=m.A[1].rotation.x=1.5;m.position.set(a.x+sx*3.2,0,a.z+3.5+k*.4);m.lookAt(a.x,0,a.z);PL.add(m);const fl=new T3.Mesh(new T3.SphereGeometry(.18,6,6),new T3.MeshBasicMaterial({color:0xffffff}));fl.position.set(0,2.25,-.6);fl.visible=false;m.add(fl);ph.push({m,fl})});LR.js.ph=ph}}catch(e){}return r}})();
(()=>{const _t=jsTick;jsTick=function(dt){const L=LR,J=L&&L.js;const r=_t.apply(this,arguments);try{if(J&&J.ph){J.ph.forEach((p,k)=>{p.fl.visible=Math.sin((J.t+k*.37)*9)>.92});if(L&&L.js&&J.o&&J.o.m){const a=L.pm.position,b=J.o.m.position,mx=(a.x+b.x)/2,mz=(a.z+b.z)/2,dx=b.x-a.x,dz=b.z-a.z,dl=Math.hypot(dx,dz)||1,nx=-dz/dl,nz=dx/dl;cm.position.set(mx+nx*8.5,3.6,mz+nz*8.5);cm.lookAt(mx,1.6,mz);if(cm.fov!=55){cm.fov=55;cm.updateProjectionMatrix()}}if(!L.js)J.ph.forEach(p=>PL.remove(p.m))}}catch(e){}return r}})();
