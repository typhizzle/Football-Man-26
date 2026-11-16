// ===================== 🎃 HALLOWEEN EVENT (through Nov 6, 11:59 PM) =====================
// 3 more costumes (daily reward, day 7)
const HWX=[['hx1','Cowboy'],['hx2','Horse'],['hx3','Pumpkin Man (Advanced Suit)'],['hx4','Skeleton Suit · Royal Purple'],['hx5','Skeleton Suit · Gold'],['hx6','Skeleton Suit · White'],['hx7','Golden Cowboy · 2026 Exclusive']];
// 💀 skeleton suit colors: purple + gold are 2026-only; white is part of the gift every Halloween
const SKEL={hx4:['#7b2cbf',0x7b2cbf],hx5:['#e8b923',0xe8b923],hx6:['#f2f2f2',0xf2f2f2]};
(()=>{const _cs=cosSvg;cosSvg=function(id){const W=b=>`<svg width=64 height=96 viewBox="0 0 64 96" style="flex:none">${b}</svg>`,body=(t,p,arms)=>`<rect x=20 y=30 width=24 height=30 rx=6 fill="${t}"/><rect x=12 y=32 width=8 height=24 rx=4 fill="${arms||t}"/><rect x=44 y=32 width=8 height=24 rx=4 fill="${arms||t}"/><rect x=21 y=58 width=9 height=30 rx=4 fill="${p}"/><rect x=34 y=58 width=9 height=30 rx=4 fill="${p}"/>`;
 if(SKEL[id]){const c=SKEL[id][0],k='#111111';return W(`${body(k,k,k)}<rect x=12 y=56 width=8 height=6 rx=2 fill="${k}"/><rect x=44 y=56 width=8 height=6 rx=2 fill="${k}"/>
<rect x=31 y=31 width=2 height=24 fill="${c}"/>${[35,40,45,50].map((y,i)=>`<rect x=${23+i} y=${y} width=${8-i} height=2 rx=1 fill="${c}"/><rect x=33 y=${y} width=${8-i} height=2 rx=1 fill="${c}"/>`).join('')}<rect x=24 y=55 width=16 height=4 rx=2 fill="${c}"/>
<rect x=15 y=33 width=2 height=10 fill="${c}"/><rect x=14 y=43 width=4 height=3 fill="${c}"/><rect x=15 y=46 width=2 height=9 fill="${c}"/><rect x=47 y=33 width=2 height=10 fill="${c}"/><rect x=46 y=43 width=4 height=3 fill="${c}"/><rect x=47 y=46 width=2 height=9 fill="${c}"/>
<rect x=24.5 y=60 width=2 height=12 fill="${c}"/><rect x=23.5 y=72 width=4 height=3 fill="${c}"/><rect x=24.5 y=75 width=2 height=12 fill="${c}"/><rect x=37.5 y=60 width=2 height=12 fill="${c}"/><rect x=36.5 y=72 width=4 height=3 fill="${c}"/><rect x=37.5 y=75 width=2 height=12 fill="${c}"/>
<rect x=21 y=6 width=22 height=24 rx=7 fill="${c}"/><ellipse cx=27 cy=16 rx=3.6 ry=4 fill="${k}"/><ellipse cx=37 cy=16 rx=3.6 ry=4 fill="${k}"/><path d="M32 19l-2 4h4z" fill="${k}"/><rect x=25 y=25 width=14 height=1.5 fill="${k}"/>${[27.5,30.5,33.5,36.5].map(x=>`<rect x=${x} y=23.5 width=1 height=4 fill="${k}"/>`).join('')}`)}
 if(id=='hx7')return W(`${body('#e8b923','#b8860b')}<rect x=18 y=30 width=4 height=26 fill="#c9a15a"/><rect x=42 y=30 width=4 height=26 fill="#c9a15a"/><rect x=20 y=56 width=24 height=4 fill="#4a2c14"/><rect x=29 y=55 width=6 height=6 fill="#c0c0c0"/><rect x=21 y=78 width=9 height=10 fill="#4a2c14"/><rect x=34 y=78 width=9 height=10 fill="#4a2c14"/><circle cx=32 cy=18 r=11 fill="#c68642"/><rect x=12 y=8 width=40 height=4 rx=2 fill="#f5f0e1"/><rect x=22 y=-1 width=20 height=11 rx=3 fill="#f5f0e1"/><circle cx=32 cy=34 r=3 fill="#1abc9c"/><circle cx=50 cy=56 r=7 fill=none stroke="#c9a15a" stroke-width=2/>`);
 if(id=='hx1')return W(`${body('#3d6ea8','#2c4a78')}<rect x=20 y=30 width=7 height=28 fill="#a0703f"/><rect x=37 y=30 width=7 height=28 fill="#a0703f"/><rect x=20 y=56 width=24 height=4 fill="#5a3a1a"/><rect x=29 y=55 width=6 height=6 fill="#d4af37"/><rect x=21 y=80 width=9 height=8 fill="#5a3a1a"/><rect x=34 y=80 width=9 height=8 fill="#5a3a1a"/><circle cx=32 cy=18 r=11 fill="#c68642"/><rect x=14 y=8 width=36 height=4 rx=2 fill="#8b5a2b"/><rect x=22 y=0 width=20 height=10 rx=3 fill="#8b5a2b"/><path d="M27 30l5 5 5-5z" fill="#c0392b"/>`);
 if(id=='hx2')return W(`${body('#7b4a24','#6a3d1c')}<rect x=21 y=82 width=9 height=6 fill="#2a1a0e"/><rect x=34 y=82 width=9 height=6 fill="#2a1a0e"/><rect x=20 y=6 width=24 height=26 rx=6 fill="#7b4a24"/><rect x=22 y=22 width=20 height=12 rx=5 fill="#5e3618"/><circle cx=27 cy=30 r=1.6 fill="#111"/><circle cx=37 cy=30 r=1.6 fill="#111"/><circle cx=25 cy=14 r=2.2 fill="#111"/><circle cx=39 cy=14 r=2.2 fill="#111"/><path d="M22 6l3-6 4 6zM35 6l4-6 3 6z" fill="#7b4a24"/><rect x=29 y=2 width=6 height=26 fill="#2a1a0e"/>`);
 if(id=='hx3')return W(`<rect x=12 y=32 width=8 height=22 rx=4 fill="#1b1b1b"/><rect x=44 y=32 width=8 height=22 rx=4 fill="#1b1b1b"/><rect x=21 y=62 width=9 height=26 rx=4 fill="#1b1b1b"/><rect x=34 y=62 width=9 height=26 rx=4 fill="#1b1b1b"/><ellipse cx=32 cy=48 rx=17 ry=17 fill="#ee7a12"/><path d="M24 33q-4 15 0 30M32 31v34M40 33q4 15 0 30" stroke="#c45f08" fill=none stroke-width=1.5 /><ellipse cx=32 cy=18 rx=12 ry=11 fill="#ee7a12"/><path d="M26 9q-3 9 0 18M32 8v20M38 9q3 9 0 18" stroke="#c45f08" fill=none /><rect x=30 y=2 width=4 height=7 fill="#3c6e1f"/><path d="M25 16l3-3 3 3zM33 16l3-3 3 3zM25 21q7 5 14 0" stroke="#3a1a00" stroke-width=1.5 fill="#3a1a00"/>`);
 return _cs.apply(this,arguments)}})();
function cosModelX(id,base,B){let m;
 if(SKEL[id]){const C=SKEL[id][1],K=0x111111,F=-.29,Bk=.29;m=base({c1:'#111111',c2:'#111111',d:0,pc:'#111111'},0);B(1.16,.08,.64,K,0,1.96,0,m);
  // skull
  B(.68,.66,.68,C,0,2.37,0,m);[-.15,.15].forEach(x=>{B(.18,.17,.03,K,x,2.44,-.345,m)});B(.07,.09,.03,K,0,2.3,-.345,m);B(.42,.03,.03,K,0,2.19,-.345,m);[-.13,-.045,.045,.13].forEach(x=>B(.02,.1,.03,K,x,2.19,-.346,m));
  B(.12,.12,.12,C,0,2.03,0,m);
  // ribcage, sternum, collarbones, pelvis (front) + spine and ribs (back)
  B(.07,.62,.03,C,0,1.6,F,m);[-.27,.27].forEach(x=>B(.36,.05,.03,C,x,1.9,F,m));
  [0,1,2,3].forEach(i=>{const y=1.78-i*.14,w=.34-i*.03;[-1,1].forEach(sd=>B(w,.06,.03,C,sd*(.05+w/2),y,F,m));B(.82-i*.06,.06,.03,C,0,y,Bk,m)});
  B(.08,.86,.03,C,0,1.5,Bk,m);[-.22,.22].forEach(x=>B(.26,.3,.03,C,x,1.78,Bk+.002,m));
  B(.6,.1,.03,C,0,1.13,F,m);[-.2,.2].forEach(x=>B(.16,.2,.03,C,x,1.05,F,m));B(.6,.14,.03,C,0,1.12,Bk,m);
  // arm bones + bony gloves
  m.A.forEach(a=>{B(.07,.34,.02,C,0,-.2,-.165,a);B(.11,.08,.02,C,0,-.4,-.165,a);[-.045,.045].forEach(dx=>B(.03,.3,.02,C,dx,-.6,-.175,a));B(.28,.22,.32,K,0,-.86,0,a);[-.085,-.03,.03,.085].forEach(dx=>B(.03,.18,.02,C,dx,-.9,-.165,a));
   B(.07,.34,.02,C,0,-.2,.165,a);[-.045,.045].forEach(dx=>B(.03,.3,.02,C,dx,-.6,.175,a))});
  // leg bones + feet
  m.L.forEach(l=>{B(.08,.42,.02,C,0,-.26,-.215,l);B(.13,.1,.02,C,0,-.52,-.215,l);[-.045,.045].forEach(dx=>B(.035,.28,.02,C,dx,-.72,-.235,l));[-.1,-.03,.04,.11].forEach(dx=>B(.03,.03,.2,C,dx,-.92,-.24,l));
   B(.08,.42,.02,C,0,-.26,.215,l);[-.045,.045].forEach(dx=>B(.035,.28,.02,C,dx,-.72,.235,l))});
  return m}
 const cowExtra=(m,boot,lasso,fr)=>{m.L.forEach(l=>{B(.42,.5,.52,boot,0,-.8,.02,l);B(.44,.08,.56,0x2a1a0e,0,-1.03,.02,l);B(.1,.1,.06,0xc0c0c0,0,-.98,.31,l);[-.2,.2].forEach(dx=>B(.04,.5,.06,fr,dx,-.32,0,l))});
  const R_=new T3.Mesh(new T3.TorusGeometry(.22,.05,6,14),new T3.MeshLambertMaterial({color:lasso}));R_.position.set(.68,1.15,0);R_.rotation.y=Math.PI/2;m.add(R_);const R2=R_.clone();R2.scale.set(.8,.8,.8);R2.position.x=.7;m.add(R2)};
 if(id=='hx7'){m=base({c1:'#e8b923',c2:'#e8b923',d:0,pc:'#c9a15a'},0);B(1.16,.08,.64,0xe8b923,0,1.96,0,m);[-.62,.62].forEach(x=>{for(let k=0;k<5;k++)B(.05,.14,.5,0xc9a15a,x,1.75-k*.16,0,m)});
  B(.86,.12,.56,0x4a2c14,0,1.1,0,m);B(.2,.16,.04,0xc0c0c0,0,1.1,-.29,m);B(.1,.1,.05,0x1abc9c,0,1.88,-.31,m);B(.03,.22,.03,0x2a1a0e,-.05,1.74,-.31,m);B(.03,.22,.03,0x2a1a0e,.05,1.74,-.31,m);
  B(1.36,.06,1.36,0xf5f0e1,0,2.68,0,m);B(.68,.38,.68,0xf5f0e1,0,2.89,0,m);B(.7,.07,.7,0xb8860b,0,2.74,0,m);m.L.forEach(l=>B(.38,.8,.44,0xc9a15a,0,-.3,0,l));cowExtra(m,0x4a2c14,0xc9a15a,0x8b6a3a);return m}
 if(id=='hx1'){m=base({c1:'#3d6ea8',c2:'#3d6ea8',d:0,pc:'#2c4a78'},0);B(1.16,.08,.64,0x3d6ea8,0,1.96,0,m);[-.28,.28].forEach(x=>B(.26,.86,.54,0xa0703f,x,1.5,0,m));B(.86,.12,.56,0x5a3a1a,0,1.1,0,m);B(.18,.16,.04,0xd4af37,0,1.1,-.29,m);
  B(.34,.16,.05,0xc0392b,0,1.94,-.31,m);B(1.3,.06,1.3,0x8b5a2b,0,2.68,0,m);B(.66,.36,.66,0x8b5a2b,0,2.88,0,m);B(.68,.06,.68,0x3a2410,0,2.74,0,m);
  m.L.forEach(l=>{B(.36,.8,.42,0x8b5a2b,0,-.3,0,l)});cowExtra(m,0x5a3a1a,0xc9a15a,0x6b4423);return m}
 if(id=='hx2'){m=base({c1:'#7b4a24',c2:'#7b4a24',d:0,pc:'#6a3d1c'},0);B(1.16,.08,.64,0x7b4a24,0,1.96,0,m);const H=new T3.Group();H.position.set(0,2.45,0);m.add(H);
  B(.66,.78,.72,0x7b4a24,0,0,0,H);B(.5,.42,.5,0x5e3618,0,-.24,-.5,H);[-.13,.13].forEach(x=>{B(.06,.06,.03,0x111111,x,-.2,-.76,H);B(.1,.1,.04,0x111111,x*2.2,.12,-.37,H);B(.12,.26,.1,0x7b4a24,x*1.8,.5,.05,H)});
  B(.14,.9,.5,0x2a1a0e,0,.1,.18,H);B(.14,.6,.2,0x2a1a0e,0,-.5,.4,H);m.L.forEach(l=>B(.4,.18,.5,0x2a1a0e,0,-.95,.04,l));m.A.forEach(a=>B(.3,.18,.34,0x2a1a0e,0,-.9,0,a));return m}
 if(id=='hx3'){m=base({c1:'#1b1b1b',c2:'#1b1b1b',d:0,pc:'#1b1b1b'},0);const P=new T3.Group();P.position.set(0,1.42,0);m.add(P);B(1.3,1.1,1,0xee7a12,0,0,0,P);B(1.14,1.24,.9,0xee7a12,0,0,0,P);[-.42,-.14,.14,.42].forEach(x=>B(.05,1.16,1.04,0xc45f08,x,0,0,P));
  const Hh=new T3.Group();Hh.position.set(0,2.42,0);m.add(Hh);B(.82,.72,.78,0xee7a12,0,0,0,Hh);[-.24,0,.24].forEach(x=>B(.04,.74,.8,0xc45f08,x,0,0,Hh));B(.1,.24,.1,0x3c6e1f,0,.46,0,Hh);B(.22,.06,.06,0x3c6e1f,.1,.52,0,Hh);
  [-.17,.17].forEach(x=>B(.14,.1,.03,0x3a1a00,x,.08,-.4,Hh));B(.4,.07,.03,0x3a1a00,0,-.14,-.4,Hh);return m}
 return null}

// ---------- 🗓 daily rewards: one per day, Oct 30 – Nov 5 (be there each day to collect that day's prize) ----------
const HWD0=new Date(2026,9,30).getTime(),HWDN=[['💵 Cash','cash'],['💀 Halloween: Skeleton Suits (White, Royal Purple, Gold) + 📣 Fans','skel'],['🏠 Haunted porch decor for your house','house'],['🐕 Pumpkin bandana for your dog','dog'],['📣 Even more fans','fans2'],['💰 Even more cash','cash2'],['🎃 Costumes: Cowboy, 🤠 Golden Cowboy (2026 exclusive), Horse, Pumpkin Man (Advanced Suit)','cos']];
function hwDay(){const d=new Date(),m=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();return Math.round((m-HWD0)/864e5)}
const hwCash=k=>{const st=S.stage||'hs';return (st=='pro'?250000:st=='col'||st=='draft'?20000:500)*(k=='cash2'?2:1)};
const hwPend=()=>{try{if(!S||!hwOn())return[];const t=Math.min(6,hwDay()),c=(S.hwd&&S.hwd.c)||[],o=[];for(let i=0;i<=t;i++)if(!c.includes(i))o.push(i);return o}catch(e){return[]}};
function hwClaimAll(){const P=hwPend(),M=[];P.forEach(i=>{HM='';hwClaim(i,1);M.push(HM)});HM=M.join(' ');hwEventV()}
function hwClaim(i,quiet){const t=hwDay(),d=i==null?Math.min(6,t):i;if(!S||d<0||d>6||d>t||!hwOn())return;S.hwd=S.hwd||{c:[]};if(S.hwd.c.includes(d))return quiet?0:hwEventV();const k=HWDN[d][1];let msg='';
 if(k=='cash'||k=='cash2'){const c=hwCash(k);S.cash=(S.cash||0)+c;msg='+$'+c.toLocaleString()}
 else if(k=='fans'||k=='fans2'){const f=k=='fans'?3:5;S.pop=cl((S.pop||40)+f,0,100);msg='Fans +'+f}
 else if(k=='skel'){S.inv=S.inv||[];['hx4','hx5','hx6'].forEach(id=>{if(!S.inv.includes(id))S.inv.push(id)});S.hwg=1;S.pop=cl((S.pop||40)+3,0,100);msg='💀 Skeleton Suits (White, Royal Purple, Gold) are in 👕 Clothing. Fans +3'}
 else if(k=='house'){S.hwdec=1;msg='Your house is decorated for Halloween (jack-o\'-lanterns and webs by the door).'}
 else if(k=='dog'){S.dogBand=1;msg=(famEns().dogs||[]).length?'Your dog wears a pumpkin bandana now. 🐕':'Saved for when you get a dog. 🐕'}
 else if(k=='cos'){S.inv=S.inv||[];HWX.forEach(c=>{if(!S.inv.includes(c[0]))S.inv.push(c[0])});msg='Cowboy, 🤠 Golden Cowboy (2026 exclusive), Horse and Pumpkin Man (Advanced Suit) are in 👕 Clothing.'}
 S.hwd.c.push(d);save();HM='🎁 Day '+(d+1)+' reward: '+msg;if(!quiet)hwEventV()}
function hwEventV(){const d=hwDay(),c=(S&&S.hwd&&S.hwd.c)||[];ui.style.display='block';ui.innerHTML=`<div><h2>🎃 Halloween Event</h2><div class=card style="background:#2a1600;border:1px solid #e8730c"><b>${hwLeft()}</b><br><small>Daily rewards: a new prize unlocks each day. Missed a day? No problem: every unlocked prize stays here until the event ends, so you can collect them all at once. Games you play in October give +5% cash and fans. Costumes are in the 🛍️ Shop until Nov 6.</small></div>${HM?'<div class=card><b>'+HM+'</b></div>':''}${hwGiftCard()}
 ${hwPend().length>1?'<button onclick=hwClaimAll()>🎁 Claim all ('+hwPend().length+')</button>':''}<div class=card>${HWDN.map((r,i)=>{const st=c.includes(i)?'<b style="color:#7bed9f">✔ Collected</b>':i<=d?`<button style="width:auto;flex:none" onclick=hwClaim(${i})>Claim</button>`:false?'':'<small>🔒 '+new Date(2026,9,30+i).toLocaleDateString(undefined,{month:'short',day:'numeric'})+'</small>';return `<div class=row style="font-size:16px;gap:6px"><span><b>Day ${i+1}</b> · ${r[0]}${i==0||i==5?' <small>($'+hwCash(r[1]).toLocaleString()+')</small>':''}</span>${st}</div>`}).join('')}</div><button class=g onclick="HM='';hub()">Back</button></div>`;HM='';ui.scrollTop=0}
const hwBtn=()=>{try{if(!hwOn())return '';const d=hwDay(),gift=d==1&&S&&!S.hwg&&!((S.hwd&&S.hwd.c)||[]).includes(1),can=hwPend().length>0;return `<button onclick="hwEventV()" style="background:#e8730c">🎃 Halloween Event${can?' · 🎁 reward to claim!':d<6?' · 🎁 new reward tomorrow':''}</button>`}catch(e){return ''}};

// ---------- October games: +5% cash and fans (event only) ----------
(()=>{const _eg=endGame;endGame=function(){const c0=S?S.cash||0:0,wk=S?S.wk||0:0;const r=_eg.apply(this,arguments);try{if(hwOn()&&wk>=4&&wk<=8&&S.stage!='draft'){const got=Math.max(0,(S.cash||0)-c0),pay=S.stage=='pro'&&S.ct?S.ct.sal*1e6/17:0,b=Math.round(Math.max(got,pay)*.05);S.cash+=b;S.pop=cl((S.pop||40)+1,0,100);save();const c=ov.querySelector('.card');if(c&&b)c.insertAdjacentHTML('beforeend',`<p style="color:#ffb347"><b>🎃 October bonus:</b> +$${b.toLocaleString()} and +5% fans</p>`)}}catch(e){}return r}})();

// ---------- house + dog extras from the daily rewards ----------
(()=>{const _hw=homeWalk;homeWalk=function(){const r=_hw.apply(this,arguments);try{if(!LR||!LR.home)return r;const zf=LR.bd?LR.bd[3]:-40;
 if(S.hwdec){[-2.4,2.4].forEach(x=>{const P=new T3.Group();P.position.set(x,0,zf+1.6);PL.add(P);bx(.6,.5,.6,0xee7a12,0,.25,0,P);bx(.08,.14,.08,0x3c6e1f,0,.56,0,P);bx(.12,.08,.02,0xffd84a,-.12,.3,-.31,P);bx(.12,.08,.02,0xffd84a,.12,.3,-.31,P);bx(.3,.05,.02,0xffd84a,0,.16,-.31,P)});
  const web=new T3.Mesh(new T3.PlaneGeometry(1.6,1.6),new T3.MeshBasicMaterial({map:tex('🕸️',110,'#ffffff'),transparent:true}));web.position.set(-1.2,4.2,zf-.2);PL.add(web)}
 if(S.dogBand)LR.O.forEach(o=>{if(o.k=='hdog'&&o.dm){const s=(DOGC[o.b]||['',.8])[1];bx(.46*s,.12*s,.16*s,0xff7518,0,.7*s,.42*s,o.dm);bx(.1*s,.16*s,.04*s,0x111111,0,.62*s,.52*s,o.dm)}})}catch(e){}return r}})();

// ---------- 🎃 main menu: pumpkins in the sky + Fallon's Halloween headwear (◀ ▶) ----------
const HATS=[['helmet','🏈 Helmet'],['pumpkin','🎃 Pumpkin hat'],['witch','🧙 Witch hat'],['clown','🤡 Clown wig'],['rock','🎸 Rockstar wig'],['swoop','💛 Golden swoop wig'],['skull','💀 Skull mask']];
let HATI=(()=>{try{return +(localStorage.getItem('fm_hat')||0)||0}catch(e){return 0}})();
function hatSet(d){HATI=(HATI+d+HATS.length)%HATS.length;try{localStorage.setItem('fm_hat',HATI)}catch(e){}try{coverP()}catch(e){}const e=$('#hatn');if(e)e.textContent=HATS[HATI][1]}
function hatOn(m,k){const B=(w,h,d,c,x,y,z)=>bx(w,h,d,c,x,y,z,m);
 if(k=='pumpkin'){B(.84,.52,.84,0xee7a12,0,2.86,0);[-.22,0,.22].forEach(x=>B(.04,.54,.86,0xc45f08,x,2.86,0));B(.1,.22,.1,0x3c6e1f,0,3.2,0)}
 if(k=='witch'){B(1.2,.05,1.2,0x1b1b1b,0,2.68,0);B(.66,.3,.66,0x1b1b1b,0,2.85,0);B(.68,.08,.68,0x7b2cbf,0,2.74,0);B(.46,.3,.46,0x1b1b1b,.04,3.12,.02);B(.28,.3,.28,0x1b1b1b,.1,3.38,.06);B(.14,.24,.14,0x1b1b1b,.18,3.6,.1)}
 if(k=='clown'){B(.66,.16,.66,0xe74c3c,0,2.7,0);[[-.42,0x3498db],[.42,0x2ecc71]].forEach(([x,c])=>B(.36,.4,.46,c,x,2.55,0));B(.5,.3,.5,0xf1c40f,0,2.86,0);B(.14,.14,.08,0xd0001e,0,2.32,-.36)}
 if(k=='rock'){B(.7,.16,.7,0x111111,0,2.7,0);B(.72,.9,.2,0x111111,0,2.22,.34);[-.36,.36].forEach(x=>B(.08,.7,.5,0x111111,x,2.32,.08));B(.72,.08,.72,0xd7263d,0,2.6,0)}
 if(k=='swoop'){B(.7,.18,.7,0xf2c94c,0,2.7,0);B(.74,.16,.3,0xf2c94c,.06,2.66,-.3);B(.2,.3,.66,0xf2c94c,-.32,2.52,0)}
 if(k=='skull'){B(.68,.66,.68,0xf2f2f2,0,2.35,0);[-.15,.15].forEach(x=>B(.16,.14,.04,0x111111,x,2.42,-.35));B(.06,.1,.04,0x111111,0,2.28,-.35);B(.36,.04,.04,0x111111,0,2.16,-.35)}}
(()=>{const _cp=coverP;coverP=function(){const r=_cp.apply(this,arguments);try{if(!hwOn())return r;const k=HATS[HATI][0];
 if(k!='helmet'&&PL.cv){const o=PL.cv,j={c1:'#00338d',c2:'#c60c30',d:1,hc:'#ffffff',nc:'#ffffff',pc:'#ffffff'},m=mk3(j,1.7,SK[0],{nm:'FALLON',num:17},{sk:0,hr:1,hcl:'#6b4a2b',fh:0,ht:2,bd:1},1,1);m.position.copy(o.position);m.rotation.copy(o.rotation);if(PL.cb&&PL.cb.parent===o){o.remove(PL.cb);m.add(PL.cb)}PL.remove(o);PL.add(m);PL.cv=m;hatOn(m,k)}
 // pumpkins instead of sparkles, and an orange/purple night
 (PL.sp||[]).forEach((s,i)=>{s.scale.set(3.2,2.8,3.2);try{s.material=s.material.clone();s.material.color.setHex(i%5==0?0x7b2cbf:0xff7a12)}catch(e){}});
 (PL.bm||[]).forEach((b,i)=>{try{b.material=b.material.clone();b.material.color.setHex(i%2?0xff8a1f:0x8e44ad);b.material.opacity=.1}catch(e){}});
 for(let i=0;i<10;i++){const P=new T3.Group(),x=(R()-.5)*16,y=4+R()*6;P.position.set(x,y,-50-R()*8);bx(.5,.42,.5,0xee7a12,0,0,0,P);bx(.07,.14,.07,0x3c6e1f,0,.28,0,P);bx(.1,.06,.02,0xffd84a,-.1,.04,-.26,P);bx(.1,.06,.02,0xffd84a,.1,.04,-.26,P);PL.add(P);P.v=.15+R()*.25;P.castShadow=false;(PL.sp=PL.sp||[]).push(P)}
 scn.background=new T3.Color(0x1a0b2e)}catch(e){}return r}})();
const hwMenuBar=()=>hwOn()?`<div class=card style="background:#2a1600cc;border:1px solid #e8730c;margin:0 0 8px"><b>🎃 HALLOWEEN EVENT</b> <small>· ${hwLeft()}</small><div class=row style="justify-content:center;gap:6px;margin-top:4px"><button class=g style="width:auto;flex:none;padding:4px 12px" onclick="event.stopPropagation();hatSet(-1)">◀</button><small id=hatn style="min-width:130px;text-align:center">${HATS[HATI][1]}</small><button class=g style="width:auto;flex:none;padding:4px 12px" onclick="event.stopPropagation();hatSet(1)">▶</button></div><small>Fallon's headwear</small></div>`:'';

// ---------- 🎁 Halloween gift: Skeleton Suit in Royal Purple + Gold (2026 only) ----------
function hwGiftCard(){if(!S)return '';const got=!!S.hwg;return `<div class=card style="background:#1a0b2e;border:2px solid #e8b923"><b>🎁 Halloween Day Reward: 💀 Skeleton Suits</b><br><small>White, Royal Purple and Gold. Purple and Gold are this year only.</small>
 <div class=row style="justify-content:center;gap:10px;margin:6px 0">${cosSvg('hx4')}${cosSvg('hx5')}${cosSvg('hx6')}</div>
 ${got?'<b style="color:#7bed9f">✔ All 3 are in 👕 Clothing</b> <button class=g style="width:auto;flex:none" onclick="wardV(\'cas\',\'\')">👕 Wear one</button>':(hwDay()==1&&!((S.hwd&&S.hwd.c)||[]).includes(1)?'<b>🎃 It\'s Halloween! Claim Day 2 below to get them.</b>':hwDay()<1?'<b>🔒 Day 2 reward: open the game on Halloween (Oct 31) and claim it.</b>':'<small style="color:#ff7675">Missed: this was the Halloween (Day 2) reward.</small>')}
 <br><small>💀 The White Skeleton Suit comes back every Halloween.</small></div>`}
function hwGift(){if(!S||S.hwg||!hwOn())return hwEventV();S.inv=S.inv||[];['hx4','hx5','hx6'].forEach(id=>{if(!S.inv.includes(id))S.inv.push(id)});S.hwg=1;save();HM='🎁 Skeleton Suits (White, Royal Purple + Gold) added to 👕 Clothing. Equip it under Casual or Events.';hwEventV()}

// suits handed out early by the old free-gift button go away until they're claimed on Halloween (Day 2)
function hwFix(){try{if(!S||!S.hwg)return;const c=(S.hwd&&S.hwd.c)||[];if(c.includes(1))return;const X=['hx4','hx5','hx6'];S.inv=(S.inv||[]).filter(i=>!X.includes(i));S.hwg=0;wrEns();['lock','cas','ev'].forEach(t=>{if(X.includes(S.wear[t]))S.wear[t]=t=='lock'?'gear':'cas'});if(X.includes(S.cos))S.cos=null;save()}catch(e){}}
(()=>{const _e=hwEventV;hwEventV=function(){hwFix();return _e.apply(this,arguments)}})();
(()=>{const _w=wardV;wardV=function(){hwFix();return _w.apply(this,arguments)}})();
(()=>{const _h=hub;hub=function(){hwFix();return _h.apply(this,arguments)}})();
(()=>{const _l=lockP;lockP=function(){hwFix();return _l.apply(this,arguments)}})();
