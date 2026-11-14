// ===== 🎓 PLAY AS AN EXISTING COLLEGE QB =====
// Tyler, 2026-11-14: "Another thing cool would be if you can play as existing college QBs as well, starting this
// year ... if someone wants to jump in as a college player, they should be able to ... You're just jumping
// another player". (High school: not needed, no hand-made high-school players.)
// Like "Play as an existing pro QB": the world is built, then you pick any college starting quarterback this
// season and take over his career where it is: his school, his class (freshman to senior), his rating. You start
// at week 1 of this college season. His past seasons were not played in this save, so none are made up.
window.tcList=function(){const out=[];try{(S.col||[]).forEach((c,ci)=>(c.t||[]).forEach(t=>{const q=qroom(t)[0];if(q&&q.n)out.push({n:q.n,ovr:q.ovr,cls:q.cls||1,team:t.n,ci})}))}catch(e){}
 const seen=new Set();return out.filter(x=>!seen.has(x.n)&&seen.add(x.n)).sort((a,b)=>b.ovr-a.ovr)};
window.tcStart=function(){try{start()}catch(e){console.warn(e)}setTimeout(tcPick,60)};
window.tcPick=function(){const L=tcList();ui.style.display='block';ovHide();
 ui.innerHTML=`<div><h2>🎓 Play as an existing college QB</h2><div class=card><small>You take over his college career where it is right now: his school, his class and his rating. Your career starts at week 1 of this college season.</small></div>
 <div class=card>${L.map((e,k)=>`<div class=row style="font-size:16px;gap:6px"><span><b>${esc(e.n)}</b> <small>${esc(e.team)}</small><br><small>QB ${e.ovr} · ${['','Freshman','Sophomore','Junior','Senior'][Math.min(4,e.cls)]}</small></span><button class=g style="width:auto;flex:none" onclick="tcGo(${k})">Play</button></div>`).join('')}</div><button class=g onclick=menuMain()>Back</button></div>`;ui.scrollTop=0};
window.tcGo=function(k){const e=tcList()[k];if(!e)return;try{
 S.name=e.n;S.yr=5;S.grd=S.grd||{};S.grd.hs=1;S.tkc=1;S.y0=2026-(S.hist||[]).length;S.age=17+Math.min(4,e.cls);
 enroll(e.team);ovHide();
 // his rating, from his ratings shape (the same search the pro version uses)
 {const b0={...S.q};let lo=31,hi=160,best=null;for(let i=0;i<30;i++){const m=(lo+hi)/2;S.q={...b0};rescaleTo(m);const o=qo(S.q);if(!best||Math.abs(o-e.ovr)<Math.abs(qo(best)-e.ovr))best={...S.q};if(o<e.ovr)lo=m;else if(o>e.ovr)hi=m;else break}S.q=best}
 S.cy=Math.min(4,e.cls);S.qr=(S.qr||[]).filter(x=>x.n!==e.n);S.sq=S.qr.length?S.qr[0].ovr:50;
 try{const L=rost('h.0');L[0]={n:S.name,pos:'QB',num:+S.num,ovr:qo(S.q),qp:1}}catch(err){}
 HM='🎓 You are '+e.n+', '+['','freshman','sophomore','junior','senior'][S.cy]+' QB at '+e.team+'. Week 1 is up.';save();hub()}catch(err){console.warn(err);hub()}};
