// ===== ⏳ YOUR SAVES: shown as LOADING until every one is in · nothing can be covered while loading · deleted saves kept safe =====
// Tyler, 2026-11-15: "I'm not seeing my Bronny James save ... It shouldn't be ever removed ever ... If it's just taking a while
// to load, it needs to load. And it needs to be seen as loading ... put the little moving circle thing ... Anything recently
// deleted, I would say it should go up to 5 files, but those 5 files should stay there until there's another deleted file,
// and then it would replace the oldest file that was deleted."
// WHAT HAPPENED: the menu showed the save list the instant the game opened, from the phone's own storage. Phones (iPhone
// Safari especially) clear a website's storage when it hasn't been opened for a while, so the save was only in your cloud
// backup, which the game fetched slot by slot a few seconds later. Until it arrived the slot looked EMPTY ("New career").
// Nothing was deleted, but tapping "New career" there before it arrived could have covered it.
// NOW:
//  - until the cloud check is done, the menu shows a spinning "Loading your saves…" card and every empty-looking slot says
//    "loading…" and can't be tapped. The list redraws as each save arrives. All slots are fetched at once (faster).
//  - if the cloud takes over 30 seconds, empty slots unlock, but starting a career there asks first.
//  - the cloud never overwrites a different career: if the phone and the cloud hold two different careers in one slot, the
//    cloud's one goes to Recently deleted before anything is written.
//  - Recently deleted keeps the last 5 (a 6th pushes out the oldest), and the list is kept in three places: the phone's
//    storage, the phone's larger storage (IndexedDB, which the browser doesn't clear the same way) and your cloud backup.
window.CLREADY=false;window.CLSLOW=false;
(()=>{try{const st=document.createElement('style');st.textContent='.spin{display:inline-block;width:16px;height:16px;border:3px solid #ffffff44;border-top-color:#fff;border-radius:50%;animation:spn .9s linear infinite;vertical-align:middle;margin-right:6px}@keyframes spn{to{transform:rotate(360deg)}}';document.head.appendChild(st)}catch(e){}})();
window.clRedraw=function(){try{if(!g&&ui.querySelector('.mpan'))menuMain()}catch(e){}};
// ---- Recently deleted: 5 kept, mirrored to IndexedDB + the cloud ----
window.trashMerge=function(...lists){const m={};lists.forEach(L=>(Array.isArray(L)?L:[]).forEach(x=>{if(x&&x.t&&x.s)m[x.t+'|'+(x.n||'')]=x}));return Object.values(m).sort((a,b)=>b.t-a.t).slice(0,DELMAX)};
// the master list lives in IndexedDB (big) + the cloud (one doc per deleted save); the phone's small storage is just a quick copy
window.TRASHM=null;
const trashLocal=()=>{try{return JSON.parse(localStorage.getItem(DELK()))||[]}catch(e){return []}};
trashL=function(){return trashMerge(trashLocal(),TRASHM||[])};
window.trashDelCloud=async function(t){try{if(!CL)return;const k=CL.p+'trash_'+t,sn=await CL.d.doc(k).get(),dd=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null;const n=(dd&&dd.n)||1;for(let i=1;i<Math.max(n,8);i++){try{await CL.d.doc(k+'~'+i).delete()}catch(e){}}await CL.d.doc(k).delete()}catch(e){}};
window.trashPut=function(L){const prev=TRASHM||[];L=trashMerge(L);TRASHM=L;try{if(CL)prev.filter(x=>!L.some(y=>y.t===x.t)).forEach(x=>trashDelCloud(x.t))}catch(e){}   /* a 6th pushes the oldest out everywhere */
 
 let C=L.slice();while(C.length&&JSON.stringify(C).length>1500000)C.pop();   /* the quick copy never crowds out real saves */
 while(C.length){try{localStorage.setItem(DELK(),JSON.stringify(C));break}catch(e){C.pop()}}if(!C.length){try{localStorage.removeItem(DELK())}catch(e){}}
 try{kpPut('trash',JSON.stringify(L),{n:L.length})}catch(e){}
 try{if(CL){const up=window.TRASHUP=window.TRASHUP||{};L.forEach(x=>{if(!up[x.t]){up[x.t]=1;cdPut2(CL.d,CL.p+'trash_'+x.t,x).catch(()=>{delete up[x.t]})}});CL.d.doc(CL.p+'trashidx').set({j:JSON.stringify(L.map(x=>({t:x.t,n:x.n,slot:x.slot})))})}}catch(e){}return L};
window.trashSync=async function(){try{let L=trashLocal();try{const k=await kpGet('trash');if(k&&k.v)L=trashMerge(L,JSON.parse(k.v))}catch(e){}
 try{if(CL){const sn=await CL.d.doc(CL.p+'trashidx').get(),dd=sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null,idx=dd&&dd.j?JSON.parse(dd.j):[];
  const got=await Promise.all(idx.filter(x=>!L.some(y=>y.t===x.t)).map(async x=>{try{return await cdGet2(CL.d,CL.p+'trash_'+x.t)}catch(e){return null}}));L=trashMerge(L,got.filter(Boolean))}}catch(e){}
 return trashPut(trashMerge(L,TRASHM||[]))}catch(e){return []}};
window.trashAdd=function(d,slot,why){try{const L=trashL();L.unshift({t:Date.now(),slot,n:(d.name||'Save')+(why?' ('+why+')':''),s:ez(JSON.stringify(d))});trashPut(L)}catch(e){}};
// delete: the save goes to the master list FIRST (all 5 kept), then the slot is cleared exactly as before
(()=>{try{const _d=slotDel;window.slotDel=function(i){const d=load(i);if(!d)return _d.apply(this,arguments);const keep=trashL();
 const r=_d.apply(this,arguments);try{if(!load(i)){const loc=trashLocal(),x=loc.find(y=>y.slot===i&&y.n===d.name&&Date.now()-y.t<60000)||{t:Date.now(),slot:i,n:d.name,s:ez(JSON.stringify(d))};trashPut([x,...keep])}}catch(e){}return r}}catch(e){}})();
window.trashRec=function(j){const L=trashL(),x=L[j];if(!x)return trashV();let i=x.slot;if(load(i)){i=0;for(let k=1;k<=6;k++)if(!load(k)){i=k;break}}if(!i){alert('All 6 slots are full. Delete one first.');return trashV()}
 try{localStorage.setItem(K+'_'+i,x.s)}catch(e){try{zSquash();localStorage.setItem(K+'_'+i,x.s)}catch(e2){alert('Not enough room on this phone to recover it right now. It stays in Recently deleted.');return trashV()}}
 try{zTombSet(i,0)}catch(e){}L.splice(j,1);trashPut(L);try{trashDelCloud(x.t)}catch(e){}menuMain()};
window.trashGone=function(j){if(!window.CF_OK&&!confirm('Delete this save forever?'))return;const L=trashL(),x=L[j];L.splice(j,1);trashPut(L);try{if(x)trashDelCloud(x.t)}catch(e){}trashV()};
window.sameCareer=function(a,b){try{return !!a&&!!b&&(a.seed!=null&&b.seed!=null?a.seed===b.seed:a.name===b.name)}catch(e){return false}};
// ---- the cloud check: all slots at once, the menu shows it's loading until it's done ----
// (same rules as m138: split cloud pieces, the cloud never replaces a save already on this phone, a newer cloud copy is
//  offered on the menu) but every slot at once, and the menu shows it's loading until all six are done
cloudInit=async function(){try{if(typeof claude=='undefined'){CLerr='not available in this view';return}const u=await claude.use('user'),d=await claude.use('db');if(!u||!d){CLerr='permission not granted';return}const id=await u.id();if(!id){CLerr='not signed in';return}CL={d,p:'data/users/'+id+'/'};
 await Promise.all([1,2,3,4,5,6].map(async i=>{try{const cs=await cdGet2(d,CL.p+'slot'+i),lr=lraw(i),ls=lr?JSON.parse(lr):null;
  if(cs&&cs.T&&!((zTomb()[i]||0)>=(cs.ts||0))&&(!ls||(ls.ts||0)<(cs.ts||0))){
   if(ls&&ls.T){(window.CLOFF=window.CLOFF||{})[i]={ts:cs.ts||0,wk:(cs.wk||0)+1,yr:(cs.y0||2022)+((cs.hist||[]).length),name:cs.name||'',my:{wk:(ls.wk||0)+1,yr:(ls.y0||2022)+((ls.hist||[]).length)}};return}
   const rv=await cdGet2(d,CL.p+'ro'+i);if(rv)cs.ro=rv;localStorage.setItem(K+'_'+i,JSON.stringify(cs));clRedraw()}
  else if(ls&&ls.T&&(!cs||(cs.ts||0)<(ls.ts||0))){
   // a DIFFERENT career in the cloud is never just overwritten: it goes to Recently deleted first
   if(cs&&cs.T&&!sameCareer(ls,cs)&&!((zTomb()[i]||0)>=(cs.ts||0))){try{const rv=await cdGet2(d,CL.p+'ro'+i);if(rv)cs.ro=rv}catch(e){}trashAdd(cs,i,'was in the cloud')}
   const c={...ls},ro=c.ro;delete c.ro;await cdPut2(d,CL.p+'slot'+i,c);if(ro)await cdPut2(d,CL.p+'ro'+i,ro)}}catch(e){cloudWarn(e)}}))}catch(e){CLerr=String(e&&e.message||e).slice(0,60)}
 finally{CLREADY=true;try{await trashSync()}catch(e){}clRedraw()}};
setTimeout(()=>{if(!CLREADY){CLSLOW=true;clRedraw()}},30000);
// ---- the menu while loading ----
(()=>{try{const _m=menuMain;menuMain=function(){const r=_m.apply(this,arguments);try{if(!CLREADY){const pan=ui.querySelector('.mpan');if(pan){
  const sp=document.createElement('div');sp.className='card';sp.setAttribute('data-clload','1');sp.style.textAlign='left';
  sp.innerHTML=CLSLOW?'<span class=spin></span><b>Still loading your saves…</b><br><small>The cloud is slow right now. Empty slots are unlocked, but the game will ask before starting a career in one.</small>':'<span class=spin></span><b>Loading your saves…</b><br><small>Getting your careers from your cloud backup. Empty slots unlock when it\'s done.</small>';
  const first=pan.querySelector('button');if(first)pan.insertBefore(sp,first);else pan.appendChild(sp);
  pan.querySelectorAll('button').forEach(b=>{const oc=b.getAttribute('onclick')||'';if(/newC\(\)/.test(oc)){if(CLSLOW){b.setAttribute('onclick',`if(confirm('Your saves are still loading from the cloud. A career might still be on its way to this slot. Start a new career here anyway?')){${oc}}`)}else{b.disabled=true;b.style.opacity='.6';b.innerHTML='<span class=spin></span>'+b.textContent.replace(/New career/,'loading…')}}})}}}catch(e){}return r}}catch(e){}})();
// no cloud in this view: nothing to wait for
setTimeout(()=>{try{if(typeof claude=='undefined'){CLREADY=true;trashSync();clRedraw()}}catch(e){}},0);
