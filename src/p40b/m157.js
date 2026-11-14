// ===== 🗓 PRO CALENDAR CLOCK · 🌴 PRO BOWL WEEK · 👶 PREGNANCY (pro career) =====
// Tyler, 2026-11-14 (spec "PROFESSIONAL RELATIONSHIP, PREGNANCY, AND CHILDBIRTH SYSTEM" + answers):
//  - "Add a pro bowl week in between the conference championship and Super Bowl" -> in-season = 18 regular
//    (bye included) + Wild Card + Divisional + Conference + Pro Bowl + Ultra Bowl = 23 advances.
//  - a pro year = 52 simulated weeks: each in-season advance = 1 week, each of the 8 offseason advances =
//    (52 - 23) / 8 = 3.625 weeks (computed from the calendar, not hard-coded).
//  - every successful Woo-hoo rolls on its own: 15% when trying, 0.1% when not ("the game should let them know
//    that they had one anyways"). The result is HIDDEN; she finds out ~2 simulated weeks after conception and
//    tells you; the baby is born at ~39 simulated weeks after conception. One pregnancy at a time.
//  - the clock is WHERE YOU ARE in the year (never a count of taps): nothing double-counts or gets skipped, and
//    a jump across several weeks (e.g. knocked out of the playoffs) still crosses every milestone, in order.
// College pregnancy keeps the old behaviour until Tyler sends the college calendar.
window.CAL={reg:18,po:['Wild Card','Divisional','Conference Championship','Pro Bowl week','Ultra Bowl'],off:8,year:52};
window.calIns=function(){return CAL.reg+CAL.po.length};
window.calOffW=function(){return (CAL.year-calIns())/CAL.off};
// position in the year, in simulated weeks from the first regular-season week
window.calPos=function(s){s=s||S;try{const ins=calIns();
 if(s.ofs)return ins+(s.ofs.w||0)*calOffW();
 if(s.pb){const r=Math.min(4,s.pb.r||0),fin=s.pb.done||s.pb.out;let p=CAL.reg+Math.min(r,3);if(r>=3&&(s.pb.pbw||fin))p+=1;if(fin)p=ins;return p}
 return Math.min(CAL.reg,s.wk||0)}catch(e){return 0}};
window.calT=function(s){s=s||S;return ((s.py||1)-1)*CAL.year+calPos(s)};

// ---- 🌴 Pro Bowl week: an advance of its own between the Conference Championship and the Ultra Bowl ----
(()=>{try{const _e=pevt;pevt=function(){const e=_e.apply(this,arguments);try{const B=S.pb;if(B&&B.r===3&&!B.pbw&&!B.done&&!B.out&&e&&(e.t==='pp'||e.t==='ppbye'))return {t:'pbw'}}catch(x){}return e}}catch(e){}})();
window.pbwDo=function(){try{if(S.pb){S.pb.pbw=1;HM='🌴 Pro Bowl week. The league\'s best are in town; the Ultra Bowl is next week.'}save()}catch(e){}return hub()};
(()=>{try{const _p=pplay;pplay=function(){try{if(pevt().t==='pbw')return pbwDo()}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _s=psim;psim=function(e){if(e&&e.t==='pbw')return pbwDo();return _s.apply(this,arguments)}}catch(e){}})();

// ---- 👶 pregnancy ----
window.pgS=function(){S.pg=S.pg||{enc:[],cur:null,hist:[]};return S.pg};
window.pgTick=function(){try{if(!S||S.stage!=='pro')return;const P=pgS(),now=calT();
 // an old-style pregnancy ("arrives next season") moves onto the clock, already told
 if(S.preg&&!P.cur){P.cur={t0:now-2,g:S.preg.g,who:(S.gf&&S.gf.n)||'',disc:1,tr:1,mig:1};S.preg=null}
 const c=P.cur;if(!c)return;
 if(!c.disc&&now-c.t0>=2){c.disc=1;c.dt=now;const F=(c.who||'Babe').split(' ')[0];
  talk('gf',F,c.tr?'Babe... I have something to tell you. I\'m pregnant! 👶':'Babe... sit down. I know we weren\'t trying... but I\'m pregnant. 👶','happy',[['😭❤️','ovHide()']],'A baby '+(c.g=='b'?'boy':'girl')+' is on the way'+(c.tr?'':' (even though you weren\'t trying)')+'. Due in about '+Math.max(1,Math.round(39-(now-c.t0)))+' weeks.');save()}
 if(c.disc&&now-c.t0>=39){const g=c.g,n=(g=='b'?NF[ri(0,NF.length-1)]:FN2[ri(0,FN2.length-1)])+' '+lastN();
  (S.kids=S.kids||[]).push({n,g,age:0,born:yrN(),bt:now,mom:c.who,ct:c.t0});P.hist.push({...c,bt:now,kid:n});P.cur=null;hapAdd(8);
  HM=(HM?HM+' ':'')+'👶 Your '+(g=='b'?'son':'daughter')+' '+n.split(' ')[0]+' was born! Rename them in Family.';save()}}catch(e){}};
(()=>{try{const _h=hub;hub=function(){try{pgTick()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
window.pgPend=function(){return S&&S.pg&&S.pg.cur&&!S.pg.cur.disc?S.pg.cur:null};
// her answer: she can say no, and a no is respected (nothing lost)
window.wooYes=function(){const g_=S.gf;if(!g_)return false;const lastNo=g_.noW===wkKey();return !lastNo&&R()<cl((g_.aff-15)/60,.25,.95)};
(()=>{try{const _w=hmWoo2;hmWoo2=function(t){if(!S||S.stage!=='pro')return _w.apply(this,arguments);
 const g_=S.gf;if(!g_)return;ovHide();
 if(!wooYes()){g_.noW=wkKey();return talk('gf',g_.n.split(' ')[0],['Not tonight, babe. I\'m exhausted.','Rain check? I just want to cuddle tonight.','Not in the mood tonight. Tomorrow, maybe.'][ri(0,2)],'happy',[['❤️ Okay','ovHide()']])}
 hapAdd(2);g_.aff=cl(g_.aff+relG(1),0,100);try{wooScene()}catch(e){}
 const P=pgS(),now=calT(),hit=!P.cur&&R()<(t?.15:.001);P.enc.push([now,t?1:0,hit?1:0]);if(P.enc.length>60)P.enc.shift();
 if(hit)P.cur={t0:now,g:R()<.5?'b':'g',who:g_.n,disc:0,tr:t?1:0};   // hidden: nothing is said until she finds out
 save();lrStat()}}catch(e){}})();

// ---- 🛏 the scene. Tyler: "naked with just like a black censor bar ... show them at least kissing in the bed or
// something, cuddling naked, censor bars, no need to pixelate their entire bodies". Both lie on the bed, turned
// toward each other, heads together (kissing), arms around each other, gently rocking; plain black bars over her
// chest and over both their hips, moving with them. Nothing explicit drawn.
window.wooScene=function(){if(!LR||!LR.O)return;const bed=LR.O.find(o=>o.k=='hbed');if(!bed)return;const bx_=bed.x-1.8,bz=bed.z,h=$('#lrh');
 const gfo=LR.O.find(o=>o.k=='hgf'),pm=LR.pm,hide=[pm,gfo&&gfo.m].filter(Boolean);hide.forEach(m=>m.visible=false);
 // the camera comes in close over the bed for the moment, then goes back exactly where it was
 const cam0={x:LR.p.x,z:LR.p.z,d:LR.dist,p:LR.pitch,y:LR.yaw};LR.p.x=bx_;LR.p.z=bz+.5;LR.dist=-6;LR.pitch=1.0;LR.yaw=.5;
 const G=new T3.Group();PL.add(G);const mat=x=>new T3.MeshLambertMaterial({color:x}),BAR=new T3.MeshBasicMaterial({color:0x000000});
 const bxm=(w,hh,d,c,x,y,z,m)=>{const o=new T3.Mesh(new T3.BoxGeometry(w,hh,d),m||mat(c));o.position.set(x,y,z);G.add(o);return o};
 // two people lying on their sides, face to face (side = -1 his, +1 hers), heads touching: a kiss
 // lying ON the bed (blanket top 0.98, pillow top 1.15): bodies rest on the blanket, heads on the pillow.
 // face to face on their sides; nothing passes through anything: heads touch (no overlap), each one's hair sits
 // on the back of HIS/HER own head, arms rest ON TOP of the other (wrapped over the back), her top leg drapes over his
 // each person looks like THEMSELF: real skin tone and real hair style + colour (yours from your look, hers from her
 // 3D model), hair resting on their own head and nothing passing through anyone; a name tag over each head
 const hairOn=(x,side,style,col,her)=>{const H=[],y=1.37,z=bz-1.15,ox=x+side*.19;   // the back of the head (outer side)
  if(style===0)return H;
  H.push(bxm(.07,.44,.42,col,ox+side*.035,y,z));                                        // over the back
  H.push(bxm(.34,.44,.07,col,x+side*.02,y,z-.235));                                     // over the crown (toward the headboard)
  if(style===2)[[-.1,-.2],[.08,-.2],[0,.12]].forEach(([dy,dz])=>H.push(bxm(.1,.12,.1,col,ox+side*.07,y+dy,z+dz)));   // curls
  if(style===3)[-.13,0,.13].forEach(dy=>H.push(bxm(.1,.1,.12,col,x,y+dy,z-.3)));                                     // spikes
  if(style===4||her)H.push(bxm(.08,.5,her?.75:.6,col,ox+side*.04,y-.02,z+.25));       // long hair down the back
  if(style===5)[-.1,.1].forEach(dy=>H.push(bxm(.06,.06,.55,col,ox+side*.03,y+dy,z+.3)));                             // braids
  return H};
 const person=(side,skin,her)=>{const P=[],x=side*.19;
  P.push(bxm(.36,.42,.4,skin,x,1.37,bz-1.15));                             // head (x .01-.37 from centre: touching, not inside)
  P.push(bxm(.3,.56,1.0,skin,x,1.27,bz-.35));                               // torso on its side
  P.push(bxm(.28,.42,1.1,skin,x,1.2,bz+.72));                               // legs (under the blanket)
  P.push(bxm(.66,.12,.13,skin,-side*.04,1.61,bz-(her?.75:.38)));           // arm lying over the other's back
  return P};
 const ap=S.ap||{},meSk=SK[ap.sk!=null?ap.sk:1]||0xc68642,gfSk=SK[(S.gf&&S.gf.sk!=null)?S.gf.sk:2]||0xd9a066;
 const A=person(-1,meSk,0),B=person(1,gfSk,1);
 A.push(...hairOn(-.19,-1,ap.hr!=null?ap.hr:1,hexC(ap.hcl||'#1b1b1b'),0));B.push(...hairOn(.19,1,(S.gf&&S.gf.hr!=null)?S.gf.hr:4,hexC((S.gf&&S.gf.hc)||'#5a3825'),1));
 try{[[S.name,-.3],[(S.gf&&S.gf.n)||'',.3]].forEach(([n,x])=>{const t=lbl(String(n).split(' ')[0]);t.position.set(x,2.05,bz-1.15);t.scale.set(1.3,.33,1);G.add(t)})}catch(e){}
 const hip=bxm(.95,.04,.42,0,0,1.7,bz+.12,BAR),chest=bxm(.5,.04,.3,0,.2,1.7,bz-.55,BAR);  // censor bars float above everything
 /* a full-width blanket pulled over their legs (tucked in together), resting ON their legs */const sheet=bxm(2.3,.1,1.15,0xf6d6e6,0,1.6,bz+1.05);G.position.x=bx_;sheet.position.x=0;
 let b=null;try{b=bnr('❤️ ❤️ ❤️','#ff4f8b');b.position.set(0,2.6,bz-1.3);b.scale.set(3.5,.6,1);G.add(b)}catch(e){}
 if(h)h.textContent='❤️ ❤️ ❤️';let t=0;const all=[...A,...B,hip,chest],y0=all.map(m=>m.position.y);
 const iv=setInterval(()=>{t+=.08;const s_=Math.sin(t*2.6)*.03;all.forEach((m,k)=>m.position.y=y0[k]+s_);if(b)b.position.y=2.6+Math.sin(t*3)*.15},80);
 setTimeout(()=>{clearInterval(iv);try{PL.remove(G)}catch(e){}hide.forEach(m=>m.visible=true);Object.assign(LR.p,{x:cam0.x,z:cam0.z});LR.dist=cam0.d;LR.pitch=cam0.p;LR.yaw=cam0.y;if(h)h.textContent='❤️ ...'},4500)};
