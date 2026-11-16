// ===================== V 0.0.1.0 · nicer 3D homes (cutaway walls + decor) =====================
// Walls between the camera and you drop down to a short stub (dollhouse view), so you can always see inside.
function hmCut(L,C){(L.hw||[]).forEach(w=>{const out=w.ax=='z'?(C.z-w.v)*w.sg>-.2:(C.x-w.v)*w.sg>-.2;if(out===w.cut)return;w.cut=out;w.m.scale.y=out?.12:1;w.m.position.y=out?w.h*.06:w.h/2;(w.ex||[]).forEach(e=>e.visible=!out)})}
function hmDecor(id,sz,W,D,x1,x2,zb,zf,z0,pal,hw,O){const P=PL,wb=hw[0],wL=hw[1],wR=hw[2],on=(w,m)=>{(w.ex=w.ex||[]).push(m);return m};
 // baseboards so the rooms read as rooms
 if(id!='garage'){bx(W-.4,.25,.06,0x6b4a2b,0,.13,zb+.18,P);bx(.06,.25,D-.4,0x6b4a2b,x1+.18,.13,z0,P);bx(.06,.25,D-.4,0x6b4a2b,x2-.18,.13,z0,P)}
  if(id=='garage')return hmGarage(W,D,x1,x2,zb,zf,z0,hw,O);
 if(id=='garage'){
  bx(2.2,.02,1.6,0x2a2a2a,x2-2.2,.08,z0+3.4,P);                                   // oil stain
  on(wR,bx(.08,2.4,3.6,0xc8a46a,x2-.2,2.6,z0-2.4,P));for(let i=0;i<5;i++)on(wR,bx(.12,.5,.12,[0xc0392b,0x7f8c8d,0xf1c40f,0x2c3e50,0x27ae60][i],x2-.3,2.4+(i%2)*.7,z0-3.8+i*.7,P)); // pegboard + tools
  bx(.6,2.6,2.6,0x6d6d6d,x1+.5,1.3,z0-1,P);for(let i=0;i<3;i++){bx(.55,.08,2.5,0x8a8a8a,x1+.5,.6+i*.8,z0-1,P);bx(.45,.5,.6,[0xc9a26b,0xb0884f,0xd6b27a][i],x1+.5,.9+i*.8,z0-1.5+i*.4,P)} // shelf with boxes
  for(let i=0;i<9;i++)on(wb,bx(.18,.18,.18,i%2?0xffe066:0xfff3b0,x1+1.2+i*(W-2.4)/8,4.6-Math.abs(4-i)*.08,zb+.25,P)); // string lights
  bx(1.4,.06,1,0x3b6ea5,x1+2.4,.08,zb+4.3,P); // little rug by the mattress
  return}
 // rug + coffee table in the living area
 const rugC=[0x8e3b46,0x2f4f6f,0x6a5acd,0xc49a6c,0x3c6e47][sz%5],rw=Math.min(W*.4,10),rd=Math.min(D*.35,7);bx(rw,.03,rd,rugC,x2-6.5,.07,z0+1,P);bx(rw-.6,.035,rd-.6,0xf5f0e6,x2-6.5,.071,z0+1,P);bx(rw-1,.04,rd-1,rugC,x2-6.5,.072,z0+1,P);
 if(id!='dorm'){bx(1.6,.5,1,0x5a3a22,x2-4.2,.3,z0+1,P);bx(.4,.12,.3,0xffffff,x2-4.2,.6,z0+1.2,P)}
 // plants in the corners
 const plant=(x,z,s)=>{bx(.6*s,.6*s,.6*s,0x8b5a2b,x,.3*s,z,P);bx(.9*s,1.1*s,.9*s,0x2e8b57,x,1.1*s,z,P);bx(.6*s,.7*s,.6*s,0x3cb371,x,1.8*s,z,P)};
 plant(x2-.9,zb+.9,1);plant(x1+.9,zf-.9,sz>=3?1.3:.9);if(sz>=3){plant(x2-.9,zf-.9,1.3);plant(-1.6,zb+.9,1)}
 // windows on the back wall
 const nw=Math.max(1,Math.min(6,Math.floor(W/6)));for(let i=0;i<nw;i++){const x=x1+(i+.5)*W/nw;if(Math.abs(x-(x1+2.4))<1.8)continue;on(wb,bx(2.2,1.8,.08,0xffffff,x,2.3,zb+.2,P));on(wb,bx(1.9,1.5,.1,id=='tower'?0x8fb8de:0xbfe6ff,x,2.3,zb+.22,P));on(wb,bx(.08,1.5,.12,0xffffff,x,2.3,zb+.24,P))}
 try{troShelf(0,3.55,zb+.4,Math.min(W-6,9),1,O,wb)}catch(e){console.warn(e)}
 // framed pictures on the side walls (one of them is you)
 [[x1+.2,z0-2,wL],[x2-.2,z0-3.2,wR]].forEach(([x,z,w],i)=>{on(w,bx(.06,1.3,1.8,0x3b2a1a,x,2.8,z,P));on(w,bx(.08,1.05,1.55,i?0xd98e04:hexC((S.T&&S.T[0]&&S.T[0].c1)||'#2255aa'),x+(i?-.02:.02),2.8,z,P))});
 // floor lamp
 bx(.08,2.4,.08,0x222222,x2-8.6,1.2,z0-1.6,P);bx(.7,.5,.7,0xfff1c1,x2-8.6,2.5,z0-1.6,P);
 if(id=='dorm'){bx(1.6,.6,3,0x5a3a22,x2-1.4,.3,zb+2,P);bx(1.5,.25,2.9,0xdfe6ee,x2-1.4,.7,zb+2,P);bx(2,.1,1,0x9a7b5a,x2-1.2,1.1,z0+1.5,P);bx(.1,1,.1,0x555555,x2-2,.5,z0+1.5,P);bx(.6,.6,.1,0x111111,x2-1.2,1.5,z0+1.3,P)} // roommate bed + desk
 if(sz>=5){ // mansion / estate / tower: columns, a runner from the door, a grand staircase
  [[-4,z0-4],[4,z0-4],[-4,z0+5],[4,z0+5]].forEach(([x,z])=>{bx(.9,.3,.9,0xd8d2c4,x,.15,z,P);bx(.6,4.4,.6,0xffffff,x,2.5,z,P);bx(.9,.3,.9,0xd8d2c4,x,4.8,z,P)});
  bx(2.2,.03,D*.6,0x8e1b2b,0,.075,zf-D*.3,P);bx(1.8,.035,D*.6,0xb22234,0,.076,zf-D*.3,P);
  for(let i=0;i<9;i++)bx(4,.35,1,0xf3eee4,x2-5,.18+i*.35,zb+1+i*.9,P);bx(.12,1,8.4,0xd4af37,x2-7,3.1,zb+4.6,P);
  if(sz>=6){bx(1,.1,1,0xd4af37,0,.08,z0,P);const f=bx(1.6,1.2,1.6,0x9ecfff,0,.7,z0,P)}} // estate fountain
 if(id=='tower'){for(let i=0;i<9;i++){const h=10+((i*37)%25);bx(5,h,5,[0x4a5560,0x5d6b78,0x3f4a55][i%3],-30+i*7.5,h/2,zb-14-(i%3)*6,P)}} // city skyline outside
}
// ===================== girlfriend looks: pro squads are better looking on average =====================
// college/high-school squads: 45-92 · pro squads: 62-99 (worked out once, then saved on her)
function gfLkRoll(p){const h=Math.abs(hsh(String(p.n)+'lk')),pro=p.pro||S.stage=='pro';return pro?62+h%38:45+h%48}
function lkTag(w,nm){try{if(w!='gf'||/Looks/.test(nm)||!(LR&&LR.field)||!(S.stage=='col'||S.stage=='pro')||(S.age||0)<18)return nm;const c=LR.cur;if(!c||!c.n||c.hs)return nm;const p=S.gf&&S.gf.n==c.n?S.gf:c;return nm+' · Looks '+gfLk(p)}catch(e){return nm}}
// ===================== girlfriend: her personality, texts and gifts =====================
const GFTR={sweet:['Sweet','sweet and thoughtful, sends good-morning texts and checks on you'],funny:['Funny','goofy, sends memes and roasts you playfully'],jealous:['Jealous','a little jealous and insecure, asks who you were with and wants attention'],flaky:['Flaky','flaky, slow to reply, sometimes cancels plans last minute'],boujie:['High-maintenance','loves nice things, drops hints about expensive gifts and fancy dinners']};
function gfTr(gf){if(!gf)return 'sweet';if(!gf.tr){const ks=['sweet','funny','jealous','flaky','sweet','funny'];gf.tr=(gfTaste()=='boujie'&&Math.abs(hsh(gf.n+'b'))%2)?'boujie':ks[Math.abs(hsh(gf.n+'tr'))%ks.length]}return gf.tr}
const GFTX={
 sweet:{hi:['Good morning handsome ☀️ have a great practice','I made you a playlist for the bus ride 🎧','Just thinking about you ❤️','Proud of you. Like, really proud.','Drink water today. I mean it 😤❤️'],mid:['Hey you 🙂 how was practice?','Miss you a little','Call me later?'],lo:['Hey. Haven\'t heard from you in a while.','Are we okay?']},
 funny:{hi:['I told my roommate you throw like a girl. She said "so, well?" 😂','Rate my outfit 1-10, wrong answers only','Your teammate tripped on camera and I have it saved forever 💀','If you lose I\'m wearing the other team\'s jersey. Kidding. Mostly.'],mid:['lol saw your highlight, you looked so serious','bored. entertain me'],lo:['k','cool cool cool']},
 jealous:{hi:['Who was that girl in your comments? 🙂','Text me when you get to the hotel. Every time.','You looked at your phone a lot at dinner. Who were you texting?','I love you. Don\'t make me regret it 😘'],mid:['Why did it take you 3 hours to answer?','I saw who liked your post.','You never post me.'],lo:['Must be nice to have time for everyone except me.','Don\'t bother texting back.']},
 flaky:{hi:['omg sorry I fell asleep 😭 still love u','can we do tomorrow instead? something came up','I forgot we had plans lol, next week I promise ❤️'],mid:['sorry was busy','ya maybe'],lo:['…','idk']},
 boujie:{hi:['There\'s a new sushi place downtown 👀 just saying','My friend\'s boyfriend got her a bag. Anyway 😇','Steak or sushi tonight? Kidding. Both.','Pick me up in something nice ✨'],mid:['We never go anywhere nice anymore','Cute. But I like diamonds 💎'],lo:['I deserve better than this.','My ex took me to Paris.']}};
const GFGIFT=[['a hoodie with your number on it',2],['homemade cookies 🍪',1],['a framed photo of you two',2],['a custom phone case with your face on it 😂',1],['concert tickets for the off-week',3],['a new pair of slides',1],['a hand-written letter',3],['a cologne she picked out',2],['a chain she saved up for',3],['a mini trophy that says "World\'s Best Boyfriend"',2]];
function phUn(){try{return (S.ph&&S.ph.c||[]).reduce((a,c)=>a+(c.un||0),0)}catch(e){return 0}}
function gfWeek(){const gf=S.gf;if(!gf||!(S.stage=='col'||S.stage=='pro'))return;const P=phEns(),c=P.c.find(x=>x.pers=='gf'&&x.n==gf.n);if(!c)return;const tr=gfTr(gf),T=GFTX[tr],a=gf.aff,tier=a>=70?'hi':a>=45?'mid':'lo';
 // she texts on her own most weeks (less when things are cold, and flaky girls go quiet more)
 if(R()<(tier=='hi'?.8:tier=='mid'?.6:.45)*(tr=='flaky'?.6:1)){const L=T[tier],rc=c.th.slice(-6).map(x=>x.t),av=L.filter(t=>!rc.includes(t)),pk=av.length?av:L;c.th.push({f:'them',t:pk[ri(0,pk.length-1)]});c.un=(c.un||0)+1}
 // gifts: only when she really likes you (flaky ones forget, high-maintenance ones expect gifts back)
 const gch=a>=85?.3:a>=65?.18:0;if(gch&&(gf.wks||0)>=2&&R()<gch*(tr=='flaky'?.4:tr=='boujie'?.5:tr=='sweet'?1.3:1)){const G=GFGIFT[ri(0,GFGIFT.length-1)];(gf.gifts=gf.gifts||[]).push({n:G[0],y:yrN()});hapAdd(G[1]);c.th.push({f:'them',t:'Left something for you 🎁 '+G[0]+'. Don\'t say I never do anything for you ❤️'});c.un=(c.un||0)+1;S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎁 '+gf.n.split(' ')[0]+' got you '+G[0]+'.'}
 if(c.th.length>80)c.th.splice(0,c.th.length-80)}
// what you have learned about her (shown on the Relationship page)
function gfInfo(){const gf=S.gf;if(!gf||!(S.stage=='col'||S.stage=='pro'))return '';const tr=gfTr(gf),wk=gf.wks||0,G=gf.gifts||[];
 return `<div class=card><b>💭 What you know about ${esc(gf.n.split(' ')[0])}</b><br><small>Looks ${gfLk(gf)} (${lkTxt(gfLk(gf))}) · ${wk>=3?'Personality: <b>'+GFTR[tr][0]+'</b>':'Personality: you are still getting to know her (3 weeks)'}</small>${G.length?`<br><small>🎁 Gifts from her: ${G.slice(-6).map(g=>esc(g.n)).join(', ')}${G.length>6?' + '+(G.length-6)+' more':''}</small>`:'<br><small>🎁 No gifts from her yet. She gives gifts when she really likes you.</small>'}<br><small>Read her texts in 📱 Phone → Messages.</small></div>`}
// ===================== son of a pro athlete =====================
const FY_SPORT=['Football','Basketball','Baseball','Soccer','Track','Tennis','Boxing','Volleyball'];
function athN(){const F=S.fam;if(!F||!F.ath||F.ath=='none')return 0;return F.ath=='both'?((F.mom?1:0)+(F.dad?1:0)):F.ath=='mom'?(F.mom?1:0):(F.dad?1:0)}
const athF=()=>1+.25*athN(),athM=()=>1+.15*athN();
// a small bump to training points from games: +2% with one pro parent, +4% with two. Partial points add up and pay out as whole points.
function athP(n){const k=athN();if(!k)return n;S.athB=(S.athB||0)+n*(k>=2?.04:.02);const b=Math.floor(S.athB);S.athB-=b;return n+b}
function athTxt(F){if(!F||!F.ath||F.ath=='none')return '';const s=F.athS||{},m=F.mom&&(F.ath=='mom'||F.ath=='both')?'your mom played pro '+(s.mom||'basketball').toLowerCase():'',d=F.dad&&(F.ath=='dad'||F.ath=='both')?'your dad played pro '+(s.dad||'football').toLowerCase():'';const t=[m,d].filter(Boolean).join(' and ');return t?'🏅 Son of a pro athlete: '+t+'. Fans +'+athN()*25+'%, sponsor money +'+athN()*15+'%, training points from games +'+(athN()>=2?4:2)+'%.':''}
