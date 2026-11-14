// ===================== 🛠 BATCH FIXES (Oct 30) =====================

// ---------- saves: compressed, written a moment after the last change, never lost when storage is tight ----------
let ZPEND=null,ZTM=0;
function save(){try{const jj=SLOT+JSON.stringify({...S,ts:0});if(jj==LASTJ)return;S.v=3;S.ts=Date.now();const js=JSON.stringify(S);LASTJ=jj;ZPEND={slot:SLOT,js};clearTimeout(ZTM);ZTM=setTimeout(zFlush,250)}catch(e){}cloudQ()}
function zFlush(){clearTimeout(ZTM);const P=ZPEND;if(!P)return;ZPEND=null;try{const k=K+'_'+P.slot,o=localStorage.getItem(k),z=ez(P.js);
 if(o){const b=localStorage.getItem(k+'_b');if(b&&!lsSet(k+'_b2',b))localStorage.removeItem(k+'_b2');if(!lsSet(k+'_b',o))localStorage.removeItem(k+'_b')}
 let ok=lsSet(k,z);
 // storage full: drop old raw (uncompressed) backups and the oldest "recently deleted" saves first, then other slots' extra backups
 if(!ok){zSquash();ok=lsSet(k,z)}
 if(!ok){const L=trashL();while(!ok&&L.length){L.pop();try{localStorage.setItem(DELK(),JSON.stringify(L))}catch(e){}ok=lsSet(k,z)}}
 if(!ok)for(const s of [1,2,3,4,5,6]){for(const x of ['_b2','_b']){if(s==P.slot&&x=='_b')continue;localStorage.removeItem(K+'_'+s+x);if(lsSet(k,z)){ok=true;break}}if(ok)break}
 SAVEFAIL=ok?0:1;if(!ok)LASTJ=''}catch(e){}}
// re-store any old uncompressed save so it takes a fraction of the space
function zSquash(){try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k||k.indexOf(K+'_')!=0)continue;const v=localStorage.getItem(k);if(v&&v.length>4000&&v[0]=='{'){try{localStorage.setItem(k,zPack(v))}catch(e){}}}}catch(e){}}
function load(i){try{zFlush()}catch(e){}i=i||SLOT;for(const k of [K+'_'+i,K+'_'+i+'_b',K+'_'+i+'_b2',i==1?K:'',i==1?K+'_b':''])try{if(!k)continue;const s=JSON.parse(dz(localStorage.getItem(k)));if(s&&s.T)return mig(s)}catch(e){}return null}
addEventListener('pagehide',()=>{try{zFlush()}catch(e){}});document.addEventListener('visibilitychange',()=>{if(document.visibilityState=='hidden')try{zFlush()}catch(e){}});addEventListener('beforeunload',()=>{try{zFlush()}catch(e){}});
setTimeout(()=>{try{zSquash()}catch(e){}},1500);
// deleted slots stay deleted (the cloud copy is not allowed to bring them back)
const TOMBK=()=>K+'_tomb',zTomb=()=>{try{return JSON.parse(localStorage.getItem(TOMBK()))||{}}catch(e){return {}}};
function zTombSet(i,v){const t=zTomb();if(v)t[i]=Date.now();else delete t[i];try{localStorage.setItem(TOMBK(),JSON.stringify(t))}catch(e){}}

// ---------- rankings: the poll remembers last week (like real AP voters) ----------
function crCalc(){const C=crCalc0();if(C.inr)return C;C.inr=1;try{crInertia(C)}catch(e){console.warn('crInertia',e)}return C}
function crInertia(C){const H=S.crh&&S.crh.k==grK()?S.crh.w:null;if(!H||!C.has)return;
 const cw=S.wk||0,ks=Object.keys(H).map(Number).filter(w=>cw?w<cw:true).sort((a,b)=>b-a);if(!ks.length)return;const K_=ks[0],PV=H[K_];if(!PV||!PV.length)return;
 const prev={};PV.forEach((t,k)=>prev[t]=k+1);const pos0=C.pos,cap={},mn={};
 const lostT=new Set(C.ord.filter(i=>C.gl[i].some(x=>x.wk>=K_&&!x.w))),lostAhead=p=>PV.slice(0,p-1).filter(t=>lostT.has(t)).length,early=cw&&cw<=3?3:0;
 const rkW=i=>C.gl[i].filter(x=>x.w&&(pos0[x.o]||999)<=25).length;
 C.ord.forEach(i=>{const p=prev[i],nw=C.gl[i].filter(x=>x.wk>=K_);
  if(!p){if(nw.some(x=>x.w)){const bt=Math.min(99,...nw.filter(x=>x.w).map(x=>prev[x.o]||99));mn[i]=bt<=10?8:bt<=25?15:21}return}
  if(!nw.length){cap[i]=p+2;mn[i]=Math.max(1,p-lostAhead(p)-early);return}
  const lost=nw.filter(x=>!x.w);
  if(!lost.length){const big=nw.some(x=>(prev[x.o]||99)<=25),bt=Math.min(99,...nw.map(x=>prev[x.o]||99));cap[i]=p+(big?0:2);mn[i]=Math.max(1,p-lostAhead(p)-(bt<=10?4:bt<=25?2:1)-early);return}
  const op=Math.min(...lost.map(x=>prev[x.o]||60)),mg=Math.min(...lost.map(x=>x.m)),none=rkW(i)==0,gp=C.W[i]+C.L[i];
  let d=op<=10?4:op<=25?7:op<=40?10:14;if(mg>=-7)d-=2;if(mg<=-21)d+=3;if(none)d+=Math.round((gp>=5?1:Math.max(0,(gp-2)/3))*cl(p/2.2,3,10));
  cap[i]=p+d+2;mn[i]=p+Math.max(1,Math.round(d*.45))});
 const rest=C.ord.slice(),out=[];
 while(rest.length){const k=out.length+1;let j=-1,bc=1e9;rest.forEach((i,x)=>{if(cap[i]!=null&&cap[i]<=k+2&&cap[i]<bc){bc=cap[i];j=x}});if(bc>k)j=-1;if(j<0)j=rest.findIndex(i=>(mn[i]||1)<=k);if(j<0)j=0;out.push(rest.splice(j,1)[0])}
 // undefeated with 2+ ranked wins: ahead of any one-loss team with no ranked wins
 const L=C.L,rk2=i=>C.gl[i].filter(x=>x.w&&(pos0[x.o]||999)<=25).length;
 for(let p=0;p<8;p++)out.slice().forEach(i=>{if(L[i]!=0||rk2(i)<2)return;const a=out.indexOf(i),j=out.findIndex((t,k)=>k<a&&L[t]==1&&rk2(t)==0);if(j>=0){out.splice(a,1);out.splice(j,0,i)}});
 C.ord=out;const pos={};out.forEach((t,k)=>pos[t]=k+1);C.pos=pos}

// ---------- in-game: a swipe during an interception return can't end the play as a normal tackle ----------
function mvmove(px,py){const P=g.pl,c=P&&P.car;if(!P||P.ir||!c||![P.qb,P.rb,...(P.wr||[])].includes(c))return;if(c.mv>0||P.t-(c.lm||-9)<1.4)return;c.trkU=0;const ax=Math.abs(px),ay=Math.abs(py);let mt='juke';if(py>0&&ay>ax*1.1)mt='slide';else if(py<0&&ay>ax*1.5)mt='truck';else if(py<0&&ay>ax*.5)mt='spin';
 if(mt=='slide'){g.flash='SLIDE';g.ft=.7;c.sl=1;endPlay(c.y,'SLIDE — ball secured');return}
 c.mu=(c.mu||0)*Math.exp(-(P.t-(c.lm||0))/4.5)+1;c.lm=P.t;c.eff=1/c.mu;c.mt=mt;if(mt=='juke')c.x+=Math.sign(px)*2.2*Math.max(.35,c.eff);if(mt=='spin')c.y+=.8*c.eff;c.mv=.5;g.flash=mt.toUpperCase()+'!';g.ft=.7}

// ---------- training points: tapping +1 keeps you where you are on the page ----------
function up(k){const y=ui.scrollTop;try{up0(k)}finally{requestAnimationFrame(()=>{ui.scrollTop=y});ui.scrollTop=y}}

// ---------- TV at home goes straight to GSPN, and Back takes you home ----------
let GPHOME=0;
(()=>{const _gp=gpV;gpV=function(tab){const r=_gp.apply(this,arguments);if(GPHOME)try{ui.querySelectorAll('button').forEach(b=>{if(b.getAttribute('onclick')=='hub()'){b.setAttribute('onclick','GPHOME=0;homeWalk()');b.textContent='🏠 Back home'}})}catch(e){}return r}})();
(()=>{const _h=hub;hub=function(){GPHOME=0;return _h.apply(this,arguments)}})();

// ---------- playing as an existing QB: his name and number on the jersey, no fake draft ----------
let TKGO=0;
const nmLast=n=>{const p=String(n||'').split(' ').filter(Boolean);let l=p.pop()||'';if(/^(II|III|IV|Jr\.?|Sr\.?)$/i.test(l)&&p.length)l=p.pop();return l.toUpperCase().slice(0,12)};
(()=>{const _tk=tkGo;tkGo=function(ti){TKGO=1;let r;try{r=_tk.apply(this,arguments)}finally{TKGO=0}try{const n=QNUM[ti];if(n!=null)S.num=n;S.jy=S.jy||{};S.jy.nm=nmLast(S.name);const L=rost('h.0');if(L&&L[0]&&L[0].n==S.name)L[0].num=S.num;S.tkY=S.py;gpNews&&0;save();hub()}catch(e){}return r}})();

// ---------- Gatorade baths are for championships only ----------
// (the postgame coach talk only offers it when you won a title; see the patch list)

// ---------- celebrities at your games: rare unless they're your fans, and they don't always give you their number ----------
function celFW(O){if(!(S.stage=='col'||S.stage=='pro'))return;const yk=(S.stage||'')+(S.py||S.cy||0);S.celg=S.celg&&S.celg.k==yk?S.celg:{k:yk,n:0,c:{}};const G=S.celg;
 const fansC=CELB.map(celOb).filter(o=>celCanCome(o)||cfGet(o.id)>=50),famous=CELB.map(celOb).filter(o=>!fansC.includes(o)&&myFans()>=CEL_NEED[o.tier]*.6);
 const fanOk=fansC.filter(o=>(G.c[o.id]||0)<5),rand=G.n<2?famous.filter(o=>!G.c[o.id]):[];
 let o=null;if(fanOk.length&&R()<.27)o=fanOk[ri(0,fanOk.length-1)];else if(rand.length&&R()<.09)o=rand[ri(0,rand.length-1)];if(!o)return;
 G.c[o.id]=(G.c[o.id]||0)+1;G.n++;const m=celM(o),x=-14,z=-44;m.position.set(x,0,z);m.rotation.y=Math.atan2(x,z+50);PL.add(m);const s=lbl(o.n);s.position.set(0,3.5,0);s.scale.set(3.2,.8,1);m.add(s);O.push({k:'fceleb',n:o.n,cid:o.id,x,z,m})}
function celNum(id){const c=celBy(id);if(!c)return;S.cnum=S.cnum||{};const P=phEns();if(P.c.some(x=>x.id=='cel:'+c.id))return talk('mate',c.n,'You already got my number 😂','happy',[['Right','ovHide()']]);
 if(S.cnum[id]==wkKey())return talk('mate',c.n,'Didn\'t you just ask me that? 😅','smug',[['My bad','ovHide()']]);S.cnum[id]=wkKey();
 const fr=cfGet(id),fan=celFans().includes(id),fm=Math.log10(Math.max(10,myFans()))/7,ch=cl(.18+fr/160+(fan?.28:0)+fm*.25-(c.tier||0)*.05,.08,.92);
 if(R()<ch){cfOnce(id,'num',6);celContact(c);save();return talk('mate',c.n,['Text me anytime. For real.','Bet, put your number in.','Yeah for sure, hit me up.'][ri(0,2)],'happy',[['Bet','ovHide()']],'📱 '+c.n+' is in your phone now.')}
 cfAdd(id,1);save();return talk('mate',c.n,['Haha I don\'t really give my number out. Maybe next time.','Let\'s link up again first 😅','My manager handles all that, but you\'re cool.'][ri(0,2)],'smug',[['All good','ovHide()']],'Friendship '+cfGet(id)+'/100 · try again another week')}
function celThanks(id){try{cfAdd(id,ri(1,2));save()}catch(e){}ovHide()}

// ---------- 👕 CLOTHING: what you wear in the locker room, around town (casual), and at events ----------
const WR_TABS=[['lock','🏈 Locker room'],['cas','👕 Casual'],['ev','🎩 Events (fancy)']];
const WR_BASE={gear:['🏈 Team gear (jersey & pads)','lock'],cas:['👕 Everyday fit (tee & joggers)','cas,ev']};
const HWALL=()=>[...HWC.map(c=>[c[0],c[1]]),...(typeof COSC!='undefined'?COSC.map(c=>[c[0],c[1]]):[]),...(typeof HWX!='undefined'?HWX:[])];
function wrEns(){S.wear=S.wear||{lock:'gear',cas:S.cos||'cas',ev:(S.suit&&owns(S.suit))?S.suit:'cas'};if(S.cos&&!S.wear.mig){S.wear.cas=S.cos;S.wear.mig=1}return S.wear}
function wrOpts(tab){const o=[];if(tab=='lock')o.push(['gear',WR_BASE.gear[0]]);if(tab!='lock')o.push(['cas',WR_BASE.cas[0]]);
 if(tab=='ev')SHOP.filter(x=>x[1]=='suit'&&owns(x[0])).forEach(x=>o.push([x[0],'🤵 '+x[2]]));
 HWALL().filter(c=>owns(c[0])).forEach(c=>o.push([c[0],'🎃 '+c[1]]));return o}
function wrName(id){if(WR_BASE[id])return WR_BASE[id][0];const s=SHOP.find(x=>x[0]==id);if(s)return(s[1]=='suit'?'🤵 ':'🎃 ')+s[2];const h=HWALL().find(c=>c[0]==id);return h?'🎃 '+h[1]:id}
let WRT='lock',WRFROM='';
function wardV(tab,from){wrEns();if(tab)WRT=tab;if(from!=null)WRFROM=from;const W=S.wear,O=wrOpts(WRT),cur=W[WRT];
 const tabs=WR_TABS.map(([k,n])=>`<button class="${k==WRT?'':'g'}" style="flex:1;padding:8px 4px;font-size:14px" onclick="wardV('${k}')">${n}</button>`).join('');
 const body=O.map(([id,n])=>`<div class=row style="font-size:16px;gap:6px">${String(id).startsWith('hw')||id.startsWith('hx')?cosSvg(id):''}<span style="flex:1">${n}${cur==id?' <b style="color:#7bed9f">✔ Equipped</b>':''}</span>${cur==id?'':`<button class=g style="width:auto;flex:none" onclick="wrSet('${WRT}','${id}')">Equip</button>`}</div>`).join('');
 const html=`<h2>👕 Clothing</h2><div class=row style="gap:4px">${tabs}</div><div class=card><small>${WRT=='lock'?'What you wear in the locker room. Games are always in team gear.':WRT=='cas'?'What you wear at home and around town.':'What you wear to parties, galas, the studio and shows.'}</small><br><b>Equipped:</b> ${wrName(cur)}</div><div class=card>${body}</div><small>Buy suits and costumes in the 🛍️ Shop.</small>`;
 if(WRFROM=='walk'){ovShow(html+`<button class=g onclick="ovHide()">Done</button>`)}else{ui.style.display='block';ui.innerHTML=`<div>${html}<button class=g onclick="${WRFROM=='shop'?"shopV('hw')":'hub()'}">Back</button></div>`;ui.scrollTop=0}}
function wrSet(tab,id){wrEns();S.wear[tab]=id;if(tab=='ev'&&SHOP.some(x=>x[0]==id&&x[1]=='suit'))S.suit=id;if(tab=='cas')S.cos=String(id).startsWith('h')&&id!='cas'?id:null;save();
 if(WRFROM=='walk'&&LR){try{lrOutfit(LR.home?'cas':LR.ev||LR.studio||LR.pot?'ev':'lock')}catch(e){}}wardV(tab)}
function cosWear(id){wrEns();const on=S.wear.cas==id;S.wear.cas=on?'cas':id;S.cos=on?null:id;save();HM=on?'Took it off.':'Wearing it around town now. Change outfits anytime in 👕 Clothing.';shopV('hw')}
// build the player model for an outfit
function outfitM(id){const A={...(AP()||{})};const base=(j,hair)=>mk3({nc:'#ffffff',hc:'#eeeeee',...j},1.2,0,{nm:'',num:''},{...A,fem:0,hr:hair?A.hr:0,fh:hair?A.fh:0},1);
 const B=(w,h,d,c,x,y,z,p)=>bx(w,h,d,c,x,y,z,p);let m;const top=(c,mm)=>B(1.16,.08,.64,c,0,1.96,0,mm);
 if(id=='cas')return base({...DJ(),c1:'#2b2b2b',c2:'#ffffff',d:0,pc:'#3a3a44'},1);
 const st=SHOP.find(x=>x[0]==id&&x[1]=='suit');
 if(st){const c=suitC(st);m=base({c1:c.c,c2:c.c,d:0,pc:c.c},1);B(.3,.55,.03,0xffffff,0,1.62,-.26,m);B(.1,.42,.035,hexC(c.t||'#8a1c1c'),0,1.6,-.28,m);B(.36,.12,.04,0x111111,0,1.03,-.26,m);return m}
 if(id=='hw1'){const N=0x141a2e,G_=0x29e6ff,SV=0xb8c4d0;m=base({c1:'#141a2e',c2:'#141a2e',d:0,pc:'#141a2e'});B(1.16,.08,.64,N,0,1.96,0,m);
  B(1.24,.22,.66,SV,0,1.88,0,m);[-.62,.62].forEach(x=>B(.34,.2,.4,SV,x,1.93,0,m));
  B(.68,.68,.68,N,0,2.35,0,m);B(.6,.12,.05,G_,0,2.42,-.345,m);B(.7,.06,.7,SV,0,2.7,0,m);B(.06,.2,.06,G_,-.36,2.36,0,m);B(.06,.2,.06,G_,.36,2.36,0,m);
  {const e=new T3.Group();e.position.set(0,1.56,-.27);m.add(e);B(.34,.34,.03,SV,0,0,0,e);B(.26,.26,.035,N,0,0,-.004,e);B(.14,.14,.04,G_,0,0,-.008,e);e.rotation.z=Math.PI/4}
  [-.3,.3].forEach(x=>B(.035,.7,.04,G_,x,1.45,-.27,m));B(.86,.1,.56,SV,0,1.14,0,m);B(.16,.12,.04,G_,0,1.14,-.29,m);
  m.L.forEach(l=>{B(.4,.44,.48,SV,0,-.82,.02,l);B(.04,.5,.43,G_,l.position.x<0?-.17:.17,-.35,0,l)});m.A.forEach(a=>{B(.3,.28,.34,SV,0,-.82,0,a);B(.04,.5,.32,G_,a.position.x<0?-.14:.14,-.35,0,a)});return m}
 if(id=='hw2'){const P_=0x4b1d78,GD=0xe0b33a,CB=0x111111;m=base({c1:'#4b1d78',c2:'#4b1d78',d:0,pc:'#4b1d78'},1);B(1.16,.08,.64,P_,0,1.96,0,m);
  B(1.08,1.8,.06,CB,0,1.16,.33,m);B(1.14,.06,.07,GD,0,.27,.33,m);[-.55,.55].forEach(x=>B(.05,1.8,.07,GD,x,1.16,.33,m));B(1.16,.22,.2,CB,0,1.98,.24,m);
  [-.62,.62].forEach(x=>B(.36,.22,.42,GD,x,1.93,0,m));B(.62,.5,.04,GD,0,1.6,-.27,m);
  {const st=new T3.Mesh(new T3.PlaneGeometry(.4,.4),new T3.MeshBasicMaterial({map:tex('★',110,'#4b1d78'),transparent:true}));st.position.set(0,1.6,-.295);m.add(st)}
  B(.88,.14,.58,GD,0,1.15,0,m);B(.2,.16,.05,CB,0,1.15,-.3,m);B(.5,.12,.04,CB,0,2.42,-.335,m);[-.12,.12].forEach(x=>B(.08,.05,.045,0xffffff,x,2.42,-.34,m));
  m.L.forEach(l=>{B(.4,.46,.48,GD,0,-.8,.02,l);B(.42,.08,.5,CB,0,-.58,.02,l)});m.A.forEach(a=>{B(.3,.3,.34,GD,0,-.8,0,a)});return m}
 if(id=='hw3'){m=base({c1:'#3b2a1e',c2:'#4a3626',d:0,pc:'#2b2b2b'});top(0x3b2a1e,m);B(.72,.7,.72,0x4a3626,0,2.36,0,m);B(.34,.24,.32,0x3a2a1c,0,2.24,-.48,m);B(.13,.09,.06,0x111111,0,2.33,-.65,m);[-.22,.22].forEach(x=>{B(.15,.26,.08,0x3b2a1e,x,2.82,0,m);B(.11,.07,.03,0xffcf33,x*.68,2.46,-.37,m);B(.04,.08,.04,0xffffff,x*.4,2.08,-.6,m)});
  [-.5,.5].forEach(x=>B(.34,.24,.6,0x5a4330,x,1.92,0,m));B(.86,.24,.56,0x5a4330,0,1.15,0,m);m.A.forEach(a=>{B(.3,.24,.34,0x2a1d14,0,-.86,0,a);[-.08,0,.08].forEach(dx=>B(.03,.12,.03,0xdddddd,dx,-1.02,-.12,a))});return m}
 if(id=='hw4'){m=base({c1:'#151515',c2:'#151515',d:0,pc:'#111111'});top(0x151515,m);B(1.16,1.72,.06,0x111111,0,1.25,.33,m);B(1.06,1.62,.02,0x8b0000,0,1.25,.3,m);[-.32,.32].forEach(x=>{B(.32,.5,.06,0x111111,x,2.27,.2,m);B(.26,.44,.02,0x8b0000,x,2.27,.17,m)});
  B(.3,.55,.03,0xffffff,0,1.62,-.26,m);B(.2,.1,.04,0x8b0000,0,1.86,-.28,m);B(.64,.62,.64,0xe8e4ea,0,2.35,0,m);B(.68,.16,.68,0x111111,0,2.69,0,m);B(.16,.12,.04,0x111111,0,2.6,-.335,m);
  [-.15,.15].forEach(x=>{B(.1,.07,.03,0x7a0010,x,2.42,-.335,m);B(.035,.08,.03,0xffffff,x*.45,2.17,-.335,m)});B(.24,.04,.03,0x7a0010,0,2.21,-.335,m);return m}
 if(id=='hw5'){m=base({c1:'#111111',c2:'#b0001e',d:1,pc:'#b0001e'});top(0x111111,m);B(.64,.62,.64,0xf2f2f2,0,2.35,0,m);[-.42,.42].forEach(x=>B(.34,.36,.4,0xb0001e,x,2.58,0,m));B(.5,.14,.5,0xb0001e,0,2.72,0,m);
  B(.13,.13,.08,0xd0001e,0,2.32,-.36,m);[-.15,.15].forEach(x=>{B(.13,.16,.03,0x111111,x,2.43,-.335,m);B(.04,.18,.02,0x111111,x,2.28,-.336,m)});B(.42,.07,.03,0xb0001e,0,2.17,-.335,m);[-.21,.21].forEach(x=>B(.06,.12,.03,0xb0001e,x,2.22,-.335,m));
  B(1.2,.14,.7,0xffffff,0,2.02,0,m);[-.2,0,.2].forEach((x,k)=>B(.14,.14,.05,k==1?0x111111:0xb0001e,0,1.66-k*.18,-.27,m));return m}
 if(id=='hw6'){m=base({c1:'#141414',c2:'#141414',d:0,pc:'#141414'});top(0x141414,m);const P=new T3.Group();P.position.set(0,2.45,0);m.add(P);B(.96,.8,.9,0xe8730c,0,0,0,P);[-.3,0,.3].forEach(x=>B(.08,.82,.92,0xc85a00,x,0,0,P));B(.1,.22,.1,0x3c6e1f,0,.5,0,P);B(.2,.06,.06,0x3c6e1f,.1,.55,0,P);
  {const c=document.createElement('canvas');c.width=c.height=128;const t=c.getContext('2d');t.fillStyle='#ffd84a';t.shadowColor='#ffb000';t.shadowBlur=14;t.beginPath();t.moveTo(20,52);t.lineTo(44,26);t.lineTo(56,54);t.fill();t.beginPath();t.moveTo(72,54);t.lineTo(84,26);t.lineTo(108,52);t.fill();t.beginPath();t.moveTo(16,74);for(let i=0;i<=8;i++)t.lineTo(16+i*12,i%2?96:80);t.lineTo(112,74);t.lineTo(100,108);t.lineTo(28,108);t.closePath();t.fill();
   const f=new T3.Mesh(new T3.PlaneGeometry(.86,.72),new T3.MeshBasicMaterial({map:new T3.CanvasTexture(c),transparent:true}));f.position.set(0,0,-.465);f.rotation.y=Math.PI;P.add(f)}return m}
 if(typeof cosModelX=='function'){const x=cosModelX(id,base,B);if(x)return x}
 return null}
// swap the walking model in the current scene for the equipped outfit
function lrOutfit(ctx){if(!LR||!LR.pm)return;wrEns();const id=S.wear[ctx];if(!id||(ctx=='lock'&&id=='gear'))return;let m=null;try{m=outfitM(id)}catch(e){m=null}if(!m)return;const o=LR.pm;m.position.copy(o.position);m.rotation.copy(o.rotation);if(o.parent)o.parent.remove(o);PL.add(m);LR.pm=m}
(()=>{const W=(name,ctx)=>{try{const f=window[name];if(typeof f!='function')return;window[name]=function(){const r=f.apply(this,arguments);try{lrOutfit(ctx)}catch(e){}return r}}catch(e){}};W('homeWalk','cas');W('evWalk','ev');W('studioWalk','ev');W('potWalk','ev');
 const _lr=lroom;lroom=function(){const r=_lr.apply(this,arguments);try{if(LR&&!LR.O.some(o=>o.k=='mylock')){const o={k:'mylock',x:-5.8,z:-7.3,n:'Your locker'};LR.O.push(o);LR.all&&LR.all.push(o)}lrOutfit('lock')}catch(e){}return r}})();
(()=>{const _lb=lrLabel;lrLabel=function(o){if(o&&o.k=='mylock')return '👕 Look in your locker';return _lb.apply(this,arguments)}})();
(()=>{const _la=lrAct;lrAct=function(o){if(o&&o.k=='mylock')return wardV('lock','walk');return _la.apply(this,arguments)}})();

// ---------- the 12-team bracket, always visible (projected until the playoff starts) ----------
function cfpProj(){try{const P=cfpField(),f=P.f;if(f.length<12)return '';return cfpSvg({sd:f,hist:[],r:0,pairs:[[f[4],f[11]],[f[5],f[10]],[f[6],f[9]],[f[7],f[8]]],done:0,proj:1})}catch(e){return ''}}

// ---------- Reporter Mia holds her mic in her hand ----------
function miaMic(m){try{const a=m.A&&m.A[1];if(!a){bx(.14,.5,.14,0x111111,.5,1.9,-.40,m);return}a.rotation.x=-.85;a.rotation.z=.32;bx(.07,.24,.07,0x111111,0,-.74,-.02,a);bx(.13,.13,.13,0x3a3a3a,0,-.9,-.02,a);bx(.14,.04,.14,0xff4fa0,0,-.8,-.02,a)}catch(e){}}
// ---------- your parents after the game look like the parents you made ----------
function famFieldM(o,mk){const F=famEns(),mo=F.mom,da=F.dad,ap=(p,fem)=>fem?{fem:1,sk:cl(p.sk||0,0,5),hr:p.hr!=null?p.hr:4,hcl:p.hc||'#3b2a1a',fh:0,ht:0,bd:1}:{sk:cl(p.sk||0,0,5),hr:p.hr!=null?p.hr:1,hcl:p.hc||'#1b1b1b',fh:p.fh!=null?p.fh:3,ht:1,bd:2};
 let m=null;if(mo)m=mk({c1:'#3a6ea5',c2:'#ffffff',d:0,pc:'#2b2b2b'},null,ap(mo,1));if(da){const m2=mk({c1:'#556b2f',c2:'#ffffff',d:0,pc:'#2b2b2b'},null,ap(da,0));if(m){m2.position.set(o.x+1.4,0,o.z);m2.rotation.y=Math.PI/2}else m=m2}
 if(!m)m=mk({c1:'#3a6ea5',c2:'#ffffff',d:0,pc:'#2b2b2b'},null,{sk:1,hr:1,hcl:'#2b1b12',fh:0,ht:1,bd:1});return m}
// ---------- phone contacts always show your family's real names ----------
(()=>{const _pe=phEns;phEns=function(){const P=_pe.apply(this,arguments);try{const F=famEns();P.c.forEach(c=>{if(c.id=='mom'&&F.mom)c.n=F.mom.n;else if(c.id=='dad'&&F.dad)c.n=F.dad.n;else if(/^sib\d+$/.test(c.id)){const s=F.sibs[+c.id.slice(3)];if(s)c.n=s.n}})}catch(e){}return P}})();
// ---------- Pot McGee: Pot stops you at the door if you haven't taken the charity shot ----------
(()=>{const _pa=potAct;potAct=function(o){if(o&&o.k=='eexit'&&LR&&LR.pot&&!LR.shotDone&&!LR.exitAsk){LR.exitAsk=1;return talk('reporter','Pot McGee','WHOA WHOA WHOA! You are not leaving this set without taking the charity shot, baby! The kids are counting on you!','happy',[['🏀 Okay, take me to the shot','ovHide();potGoShot()'],['I have to go','ovHide();evExit()']])}return _pa.apply(this,arguments)}})();
function potGoShot(){try{const s=LR.O.find(o=>o.k=='pshot');if(s){LR.p.x=s.x;LR.p.z=s.z+1.2;potAct(s)}}catch(e){}}
// ---------- the stats box in walk scenes folds up when you tap it (so it never covers signs like A.C. Hawk's) ----------
document.addEventListener('click',e=>{const t=e.target&&e.target.closest&&e.target.closest('#lrs');if(t){t.classList.toggle('mini');try{localStorage.setItem('fm_lrsmini',t.classList.contains('mini')?'1':'0')}catch(_){}}});
(()=>{const _ls=lrStat;lrStat=function(){const r=_ls.apply(this,arguments);try{const e=$('#lrs');if(e){let mini=null;try{mini=localStorage.getItem('fm_lrsmini')}catch(_){}if(mini=='1'||(mini==null&&LR&&LR.pot))e.classList.add('mini')}}catch(_){}return r}})();

// ---------- ✏️ main-menu roster editor: edits rosters for your NEXT career only (never an existing save) ----------
let RSEDIT=0,RSPREV=null;
function menuEdit(){RSPREV={S,SLOT};RSEDIT=1;SLOT=0;try{newC();start()}catch(e){}RSEDIT=1;ovHide();rsHome()}
function rsHome(){const w=$('#lrw');if(w){w.style.display='none';LR=null}scene('lock');ui.style.display='block';ui.innerHTML=`<div><h2>✏️ Rosters for your next career</h2><div class=card><small>Edit the pro league here, then save it as a roster set. When you start a new career, you pick which roster set to use (or the default rosters). This never changes careers you already started.</small></div>${rupdCard()}<button onclick="lg('p')">Edit pro teams &amp; players</button><button class=g onclick=rsets()>💾 Save / load roster sets</button><button class=g onclick=rsExit()>Back to main menu</button></div>`;ui.scrollTop=0}
function rsExit(){RSEDIT=0;S=RSPREV?RSPREV.S:null;SLOT=RSPREV&&RSPREV.SLOT?RSPREV.SLOT:1;RSPREV=null;menuMain()}
(()=>{const _h=hub;hub=function(){if(RSEDIT)return rsHome();return _h.apply(this,arguments)}})();
(()=>{const _sv=save;save=function(){if(RSEDIT)return;return _sv.apply(this,arguments)}})();
(()=>{const _rs=rsets;rsets=function(msg){const r=_rs.apply(this,arguments);try{if(!RSEDIT){ui.querySelectorAll('button').forEach(b=>{if(/rsLoad\(/.test(b.getAttribute('onclick')||''))b.remove()});const c=ui.querySelector('.card');if(c)c.insertAdjacentHTML('beforebegin','<div class=card><small>To use a roster set, pick it when you start a new career (or edit sets from the main menu → Edit rosters &amp; teams). Loading a set into a career you already started is turned off so nobody\'s stats get mixed up.</small></div>')}}catch(e){}return r}})();
function rsPick(){const A=rsAll(),ks=Object.keys(A).sort((a,b)=>A[b].ts-A[a].ts);if(!ks.length)return '';return `<div class=card><label>Pro rosters<select id=rosel><option value="">Default rosters</option>${ks.map(k=>`<option value="${q_(k)}">${q_(k)}</option>`).join('')}</select></label></div>`}
function rsApplyQ(n){const A=rsAll(),R_=A[n];if(!R_)return;S.ro=S.ro||{};S.pro.forEach((t,i)=>{const k='p.'+i,tm=R_.tm[k];if(tm)Object.assign(t,tm);if(R_.ro[k]){const ix=S.stage=='pro'?S.T.indexOf(t):-1,key=ix>=0?'h.'+ix:k;S.ro[key]=R_.ro[k].map(x=>({...x,ed:1}))}})}
(()=>{const _st=start;start=function(){let sel='';try{const e=$('#rosel');sel=e?e.value:''}catch(e){}const r=_st.apply(this,arguments);if(sel&&!RSEDIT){try{rsApplyQ(sel);S.rset=sel;save()}catch(e){}}return r}})();
// ---------- 📈 ratings updates (only the latest one is shown) ----------
const RUPD2={d:'Oct 30, 2026',L:[['Coleridge Loud','QB',85,84]]};
function rupdCard(){const u=RUPD2;return `<div class=card><b>📈 Ratings update · ${u.d}</b>${u.L.map(x=>{const d=x[3]-x[2];return `<div class=row style="font-size:16px"><span>${esc(x[0])} <small>${x[1]}</small></span><span>${x[2]} → <b>${x[3]}</b> <b style="color:${d>0?'#7bed9f':'#ff6b6b'}">${d>0?'+':''}${d}</b></span></div>`}).join('')}<small>Applies to new careers only.</small></div>`}
function rupdTag(n){const x=RUPD2.L.find(y=>y[0]==n);if(!x)return '';const d=x[3]-x[2];return ` <b style="color:${d>0?'#7bed9f':'#ff6b6b'}">${d>0?'▲ +':'▼ '}${d}</b>`}
// ---------- pursuit: on long runs defenders take angles and close ground (like Madden / Retro Bowl) ----------
function purF(d,t){try{if(!g||!g.pl||!g.pl.run||!t)return 1;const gain=t.y-g.los,behind=t.y-d.y;if(gain<6||behind<0)return 1;return 1+cl(behind/40,0,.18)+cl((gain-10)/150,0,.08)}catch(e){return 1}}
