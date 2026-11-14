
// ===================== LOOKS · THE BIG SHOP · PROPOSALS · WEDDINGS =====================
function looksEns(){if(S.looks==null){const r=rng((S.seed||1)*59+7);S.looks=cl(Math.round(45+r()*40),20,95)}return S.looks}
const lkTxt=v=>v>=90?'Stunning':v>=80?'Very attractive':v>=70?'Good looking':v>=55?'Average':'Plain';
// [id, category, name, price (college), price (pro), looks bonus, extra]
const SHOP=[
 ['r1','ring','Promise-style ring (0.5 ct)',1500,15000,0,{wow:1}],['r2','ring','Classic solitaire (1 ct)',4000,40000,0,{wow:2}],['r3','ring','Halo diamond (2 ct)',12000,120000,0,{wow:3}],['r4','ring','Oval diamond (3 ct)',35000,300000,0,{wow:4}],['r5','ring','Celebrity rock (5 ct)',90000,900000,0,{wow:5}],
 ['b1','band','Gold wedding bands (pair)',600,5000,0,{}],['b2','band','Platinum wedding bands (pair)',2500,25000,0,{}],
 ['s1','suit','Navy off-the-rack suit',300,1500,2,{c:'#1d2533',t:'#8a1c1c'}],['s4','suit','Gray plaid suit',600,4000,3,{c:'#7a7f87',t:'#1d2533'}],['s5','suit','Tan summer suit',700,5000,3,{c:'#c8a97e',t:'#ffffff'}],
 ['s2','suit','Charcoal tailored suit',1200,8000,4,{c:'#3a3a3a',t:'#c9a227'}],['s8','suit','Royal blue statement suit',1500,12000,4,{c:'#1e4fd8',t:'#ffd700'}],['s10','suit','Pinstripe power suit',1800,14000,4,{c:'#22263a',t:'#c0c0c0'}],
 ['s6','suit','Burgundy velvet blazer',2000,15000,5,{c:'#6d1a2a',t:'#111111'}],['s9','suit','Green draft-night suit',2500,20000,5,{c:'#1f5c3a',t:'#d4af37'}],['s7','suit','White tux',3000,25000,5,{c:'#f2f2f2',t:'#111111'}],
 ['s3','suit','Black designer tux',4000,30000,6,{c:'#0b0b0b',t:'#0b0b0b'}],['s11','suit','Custom suit in your team colors',5000,40000,6,{team:1}],['s12','suit','Gold red-carpet tux',8000,90000,7,{c:'#b8860b',t:'#111111'}],
 ['j1','jewelry','Silver chain',250,2000,1,{fans:0}],['j2','jewelry','Diamond studs',1500,15000,2,{fans:1}],['j3','jewelry','Iced-out chain',6000,80000,3,{fans:2}],['j4','jewelry','Luxury watch',9000,120000,3,{fans:2}],
 ['g1','groom','Fresh haircut & lineup (weekly look)',40,200,1,{wk:1}],['g2','groom','Skincare routine',150,800,2,{}],['g3','groom','Personal stylist (season)',2000,40000,5,{}],
 ['h1','her','Flowers & a handwritten note',60,500,0,{aff:2}],['h2','her','Designer handbag',1500,20000,0,{aff:4}],['h3','her','Diamond necklace for her',5000,60000,0,{aff:6}]];
const SHC={ring:'💍 Engagement rings',band:'💒 Wedding bands',suit:'🤵 Suits & tuxes',jewelry:'⛓️ Jewelry & watches',groom:'💈 Grooming',her:'🎁 Gifts for her'};
const shP=it=>S.stage=='pro'?it[4]:it[3];
const owns=id=>(S.inv||[]).includes(id);
const suitC=it=>{const x=it[6];if(x.team){const T=S.T&&S.T[0]||{};return{c:T.c1||'#333',t:T.c2||'#fff'}}return{c:x.c,t:x.t}};
function suitSvg(it,sz){const c=suitC(it),k=lum(c.c)>.6?'#333':'#ffffff';sz=sz||46;return `<svg viewBox="0 0 40 60" width="${sz*.67}" height="${sz}" style="vertical-align:middle;flex:none"><circle cx="20" cy="9" r="7" fill="#c68642"/><rect x="9" y="17" width="22" height="24" rx="3" fill="${c.c}"/><polygon points="16,17 24,17 20,30" fill="#ffffff"/><rect x="19" y="19" width="2.4" height="11" fill="${c.t}"/><rect x="11" y="41" width="8" height="17" fill="${c.c}"/><rect x="21" y="41" width="8" height="17" fill="${c.c}"/><rect x="6" y="18" width="4" height="18" rx="2" fill="${c.c}"/><rect x="30" y="18" width="4" height="18" rx="2" fill="${c.c}"/></svg>`}
function suitWear(id){S.suit=id;save();shopV('suit')}
function shopV(cat){looksEns();cat=cat||'ring';const L=SHOP.filter(x=>x[1]==cat),gf=S.gf;
 ui.innerHTML=`<div><h2>🛍️ The Shop</h2><p><small>💵 $${(S.cash||0).toLocaleString()} · Looks ${S.looks} (${lkTxt(S.looks)})</small></p><p class=tabs style="flex-wrap:wrap">${Object.keys(SHC).map(k=>`<button class="${k==cat?'':'g'}" onclick="shopV('${k}')">${SHC[k]}</button>`).join('')}</p><div class=card>${L.map(it=>{const o=owns(it[0])&&!['h','g1'].some(p=>it[0].startsWith(p)&&it[0]!='g2'&&it[0]!='g3');return `<div class=row style="font-size:16px;gap:6px">${it[1]=='suit'?suitSvg(it):''}<span style="flex:1">${it[2]}${S.suit==it[0]?' <b>(wearing)</b>':''}<br><small>$${shP(it).toLocaleString()}${it[5]?' · looks +'+it[5]:''}${it[6].aff?' · her +'+it[6].aff:''}${it[6].fans?' · fans +':''}${it[6].wow?' · '+'💎'.repeat(it[6].wow):''}</small></span>${o?(it[1]=='suit'&&S.suit!=it[0]?`<button class=g onclick="suitWear('${it[0]}')">Wear</button>`:'<small>Owned</small>'):`<button class=g onclick="shopBuy('${it[0]}','${cat}')">Buy</button>`}</div>`}).join('')}</div>${cat=='her'&&!gf?'<p><small>You are not seeing anyone right now.</small></p>':''}<button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
function shopBuy(id,cat){const it=SHOP.find(x=>x[0]==id);if(!it)return shopV(cat);const p=shP(it);if(S.cash<p){HM='Not enough cash for '+it[2]+'.';return shopV(cat)}const once=!(id.startsWith('h')||id=='g1');if(once&&owns(id))return shopV(cat);
 if(cat=='her'&&!S.gf)return shopV(cat);S.cash-=p;if(once)(S.inv=S.inv||[]).push(id);looksEns();
 if(it[5]){const k=wkKey();if(id=='g1'){if(S.cutW!=k){S.cutW=k;S.looks=cl(S.looks+1,0,99)}}else if(it[1]=='suit'){const add=Math.max(0,it[5]-(S.lkSuit||0));S.lkSuit=Math.max(S.lkSuit||0,it[5]);S.looks=cl(S.looks+add,0,99);S.suit=id}else S.looks=cl(S.looks+it[5],0,99)}
 if(it[6].fans)S.pop=cl((S.pop||40)+it[6].fans,0,100);if(it[6].aff&&S.gf){S.gf.aff=cl(S.gf.aff+relG(it[6].aff),0,100)}save();shopV(cat)}
const shopBtn=()=>(S.stage=='col'||S.stage=='pro')?'<button class=g onclick="shopV()">🛍️ Shop</button>':'';

// her wedding taste: boujie wants big, fancy wants nice-but-not-crazy, simple takes anything you give her
const GTASTE=['boujie','fancy','simple'],GTT={boujie:'She wants it BIG. Boujie all the way.',fancy:'She wants it fancy, but not over the top.',simple:'"Whatever wedding you give me, I am happy."'};
function gfTaste(){const gf=S.gf;if(gf&&!gf.taste)gf.taste=GTASTE[Math.abs(hsh(gf.n))%3];return gf&&gf.taste}
const WED=[['court','Courthouse wedding',500,5000,0],['yard','Backyard wedding',4000,40000,1],['church','Church wedding',15000,150000,2],['ball','Ballroom wedding',40000,400000,3],['dest','Destination wedding',70000,700000,4],['gala','Celebrity gala',150000,1500000,5]];
function wedFit(t,lvl){return t=='boujie'?(lvl>=4?2:lvl==3?1:lvl>=2?-1:-3):t=='fancy'?(lvl==2||lvl==3?2:lvl==4?1:lvl==5?0:-2):(lvl<=1?2:1)}
// proposal: you need a ring you bought; a better ring for a boujie girl matters
function propose(){const gf=S.gf;if(!gf)return hub();gfTaste();const rings=SHOP.filter(x=>x[1]=='ring'&&owns(x[0]));if(!rings.length){talk('gf','Proposal plan',"You don't have a ring yet. Go to the Shop and pick one out.",'smug',[['Go to the Shop',"ovHide();shopV('ring')"],['Not yet','ovHide()']]);return}
 const r=rings.sort((a,b)=>b[6].wow-a[6].wow)[0],w=r[6].wow,need=gf.taste=='boujie'?4:gf.taste=='fancy'?2:1,p=cl(gf.aff/100+(w-need)*.08,.05,.97);
 S.inv=S.inv.filter(x=>x!=r[0]);if(R()<p){gf.status='engaged';gf.ew=gf.wks;gf.ring=r[2];gf.aff=cl(gf.aff+3,0,100);S.pop=cl((S.pop||40)+2,0,100);save();talk('gf',gf.n.split(' ')[0],(w>=need?'YES! Oh my gosh, YES! Look at this ring!':'Yes... yes! (She keeps glancing at the ring.)')+' 💍','happy',[['💍','ovHide();hub()']],'You are engaged! '+GTT[gf.taste])}
 else{gf.aff=cl(gf.aff-10,0,100);(S.inv=S.inv||[]).push(r[0]);save();talk('gf',gf.n.split(' ')[0],"I... I'm not ready. I'm sorry.",'sad',[['OK','ovHide();hub()']],'Relationship -10. You kept the ring.')}}
function wedPlan(){const gf=S.gf;if(!gf||gf.status!='engaged')return hub();const t=gfTaste();
 ui.innerHTML=`<div><h2>💒 Plan the wedding</h2><p><small>💵 $${(S.cash||0).toLocaleString()}</small></p><div class=card><b>${gf.n.split(' ')[0]}</b>: ${GTT[t]}</div><div class=card>${WED.map((w,i)=>{const pr=S.stage=='pro'?w[3]:w[2];return `<div class=row style="font-size:16px;gap:6px"><span>${w[1]}<br><small>$${pr.toLocaleString()}</small></span><button class=g onclick="wedDate(${i})">Choose</button></div>`}).join('')}</div><p><small>You will need wedding bands (Shop) and a suit helps. ${owns('b1')||owns('b2')?'✔ Bands ready.':'❌ No bands yet.'} ${['s1','s2','s3'].some(owns)?'✔ Suit ready.':'❌ No suit yet.'}</small></p><button class=g onclick="shopV('band')">Go to the Shop</button><button class=g onclick=hub()>Back</button></div>`;ui.scrollTop=0}
let WDG=null;
function wedGo(i){const gf=S.gf,w=WED[i],pr=S.stage=='pro'?w[3]:w[2];if(S.cash<pr){HM='You need $'+pr.toLocaleString()+' for the '+w[1].toLowerCase()+'.';return wedPlan()}if(!(owns('b1')||owns('b2'))){HM='Buy wedding bands in the Shop first.';return shopV('band')}
 S.cash-=pr;WDG={i,fit:wedFit(gfTaste(),w[4]),suit:S.suit};wedStep(0)}
function wedStep(k){const gf=S.gf,w=WED[WDG.i],F=gf.n.split(' ')[0],s=SHOP.find(x=>x[0]==WDG.suit);const steps=[
 [`🎶 The ${w[1].toLowerCase()} begins. You stand at the front${s?' in your '+s[2].toLowerCase():''}. Your teammates are your groomsmen.`,[['Here she comes','wedStep(1)']]],
 [`👰 ${F} walks down the aisle. ${WDG.fit>=2?'She is glowing. This is exactly the wedding she dreamed of.':WDG.fit>=1?'She looks happy.':WDG.fit>=0?'She smiles, but you can tell she pictured something different.':'She whispers: "This is it?"'}`,[['Say your vows','wedStep(2)']]],
 ['💬 Your vows:',[['Heartfelt',"WDG.v=2;wedStep(3)"],['Funny',"WDG.v=1;wedStep(3)"],['Short and sweet',"WDG.v=0;wedStep(3)"]]],
 [`💍 You exchange rings. "You may kiss the bride!" 💋 The crowd goes wild.`,[['Reception! 🎉','wedStep(4)']]],
 [`🎉 First dance, a cake, and your offensive line taking over the dance floor.${w[4]>=4?' The pictures go viral.':''}`,[['Finish','wedEnd()']]]];
 const st=steps[k];ovShow(`<h2>💒 ${w[1]}</h2><p>${st[0]}</p>${st[1].map(b=>`<button onclick="${b[1]}">${b[0]}</button>`).join('')}`)}
function wedEnd(){const gf=S.gf,w=WED[WDG.i],d=6+WDG.fit*3+(WDG.v==2?2:WDG.v==1?1:0);gf.status='married';gf.home=1;gf.aff=cl(gf.aff+d,0,100);gf.wed=w[1];gf.wy=yrN();S.pop=cl((S.pop||40)+1+w[4],0,100);S.aw.push((S.stage=='pro'?'Pro yr '+S.py:'College yr '+S.cy)+': Married '+gf.n+' ('+w[1]+')');save();WDG=null;ovHide();talk('gf',gf.n.split(' ')[0],'Husband! I still cannot believe it. ❤️','happy',[['❤️','ovHide();hub()']],'Married! Relationship +'+d+'.')}
