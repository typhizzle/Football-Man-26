// ===== ☁️ SAVES THAT CAN'T GO MISSING (Tyler, 2026-11-15: "why do I only see two saves? ... still missing Simmons. I asked you to
// cover this earlier so it would never happen again. What happened?") =====
// WHAT HAPPENED: Simmons's cloud copy is two parts (the career + the team rosters). A rosters backup was cut off halfway (the cloud
// said it was full): its new 2nd piece landed, its new 1st piece didn't, so the old 1st piece pointed at a 2nd piece that had been
// replaced. Loading hit "piece missing", the error was swallowed, and the slot showed as "New career" with nothing on screen.
// NOW:
//  1. A backup never touches the copy that's already there: new pieces go under new names, the head switches over last, and only
//     then are the old pieces cleared. A cut-off backup leaves the previous good copy whole.
//  2. Each slot loads on its own and the menu shows it: ⏳ loading, or ⚠️ "didn't come through" with Try again. A slot whose cloud
//     copy exists is never offered as "New career".
//  3. If the rosters piece is broken but this device has a backup copy of the same career (season-end / weekly copies), its
//     rosters are used. Nothing is ever made up.
//  4. Saves coming down from the cloud are stored compressed, so three big careers fit on the phone.
window.cdPut2=async function(d,k,o){const j=JSON.stringify(o),z=await gzS(j);if(!z)throw new Error('could not compress the save');
 const P=cdChunks(z),tag=Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);let old=null;
 try{const sn=await d.doc(k).get();old=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null}catch(e){}
 const put=async()=>{for(let i=1;i<P.length;i++)await d.doc(k+'~'+tag+'~'+i).set({z:P[i],tag});await d.doc(k).set({z:P[0],n:P.length,tag,v:3})};
 const undo=async()=>{for(let i=1;i<P.length;i++){try{await d.doc(k+'~'+tag+'~'+i).delete()}catch(e){}}};
 try{await put()}catch(e){await undo();if(/quota|exceed|full|too large|limit/i.test(String(e&&e.message||e))){try{await cloudSweep()}catch(_){}try{await put()}catch(e2){await undo();throw e2}}else throw e}
 // the new copy is in: clear the old one's pieces
 try{if(old&&old.n>1){for(let i=1;i<old.n;i++){try{await d.doc(old.v===3?k+'~'+old.tag+'~'+i:k+'~'+i).delete()}catch(e){}}}if(old&&old.v!==3)cdOrphans(d,k,1)}catch(e){}};
cdocPut=cdPut2;
window.cdGet2=async function(d,k){const sn=await d.doc(k).get(),dd=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null;if(!dd)return null;
 if(dd.n>1){let z=dd.z;for(let i=1;i<dd.n;i++){const id=dd.v===3?k+'~'+dd.tag+'~'+i:k+'~'+i;const s2=await d.doc(id).get(),p=s2&&s2.exists?(typeof s2.data=='function'?s2.data():s2.data):null;if(!p||(dd.tag&&p.tag!==dd.tag))throw new Error('cloud save piece '+i+' missing');z+=p.z}return JSON.parse(await gunS(z))}
 return dd.z?JSON.parse(await gunS(dd.z)):dd.j?JSON.parse(dd.j):null};
// m186's leftover cleaner must not delete new-style pieces (they are named k~tag~i; it only ever looked at k~i): nothing to change.
// ---- this device's backup copies of a career (IndexedDB, m140) ----
window.kpCopies=async function(i){try{const db=await kpDb();if(!db)return [];const keys=await new Promise(res=>{try{const q=db.transaction('c').objectStore('c').getAllKeys();q.onsuccess=()=>res(q.result||[]);q.onerror=()=>res([])}catch(e){res([])}});
 const out=[];for(const id of keys){if(!new RegExp('^(top|end|wk|pre|cl)_'+i+'(_|$)').test(String(id)))continue;const x=await kpGet(id);if(!x||!x.v)continue;try{const s=JSON.parse(dz(x.v));if(s&&s.T)out.push({id,s})}catch(e){}}return out.sort((a,b)=>(b.s.ts||0)-(a.s.ts||0))}catch(e){return []}};
// ---- store a save on the phone compressed; make room the same way a normal save does ----
window.clStore=function(i,s){const k=K+'_'+i,z=ez(JSON.stringify(s));if(lsSet(k,z))return true;try{zSquash()}catch(e){}if(lsSet(k,z))return true;
 for(const x of ['_b2','_b'])for(const t of [1,2,3,4,5,6]){localStorage.removeItem(K+'_'+t+x);if(lsSet(k,z))return true}
 try{kpPut('cl_'+i,z,{name:s.name,ts:s.ts})}catch(e){}return false};
window.CLST={};window.CLFAIL={};
window.clSlot=async function(i){const d=CL&&CL.d;if(!d)return;CLST[i]='loading';delete CLFAIL[i];clRedraw();try{
 const cs=await cdGet2(d,CL.p+'slot'+i),lr=lraw(i),ls=lr?JSON.parse(dz(lr)):null;
 if(cs&&cs.T&&!((zTomb()[i]||0)>=(cs.ts||0))&&(!ls||(ls.ts||0)<(cs.ts||0))){
  if(ls&&ls.T){(window.CLOFF=window.CLOFF||{})[i]={ts:cs.ts||0,wk:(cs.wk||0)+1,yr:(cs.y0||2022)+((cs.hist||[]).length),name:cs.name||'',my:{wk:(ls.wk||0)+1,yr:(ls.y0||2022)+((ls.hist||[]).length)}};CLST[i]='ok';return}
  let rv=null,why='';try{rv=await cdGet2(d,CL.p+'ro'+i)}catch(e){why=e.message}if(!rv&&cs.ro&&Object.keys(cs.ro).length){rv=cs.ro;why=''}   /* old one-piece backups carry their rosters inside */
  if(!rv&&why){const C=(await kpCopies(i)).filter(x=>sameCareer(x.s,cs)&&x.s.ro);if(C.length){const best=C[0].s;if((best.ts||0)>=(cs.ts||0)){if(!clStore(i,best))throw new Error('no room on this device');CLST[i]='ok';clRedraw();return}rv=best.ro;HM=(HM?HM+' ':'')+'♻️ Slot '+i+' ('+(cs.name||'')+'): the team rosters in the cloud copy were incomplete, so this device\'s backup of them from '+new Date(best.ts||0).toLocaleDateString()+' was used.'}}
  if(!rv&&!why&&(cs.stage==='pro'||cs.stage==='col')){const C=(await kpCopies(i)).filter(x=>sameCareer(x.s,cs)&&x.s.ro);if(C.length)rv=C[0].s.ro;else why='no rosters part'}
  if(!rv&&why){CLST[i]='fail';CLFAIL[i]={name:cs.name,stage:cs.stage,py:cs.py,cy:cs.cy,yr:cs.yr,why:'the team rosters part of the cloud copy is incomplete'};clRedraw();return}
  if(rv)cs.ro=rv;if(!clStore(i,cs)){CLST[i]='fail';CLFAIL[i]={name:cs.name,stage:cs.stage,py:cs.py,why:'this device is out of storage space'};clRedraw();return}CLST[i]='ok';clRedraw();return}
 if(ls&&ls.T&&(!cs||(cs.ts||0)<(ls.ts||0))){
  if(cs&&cs.T&&!sameCareer(ls,cs)&&!((zTomb()[i]||0)>=(cs.ts||0))){try{const rv=await cdGet2(d,CL.p+'ro'+i);if(rv)cs.ro=rv}catch(e){}trashAdd(cs,i,'was in the cloud')}
  const c={...ls},ro=c.ro;delete c.ro;await cdPut2(d,CL.p+'slot'+i,c);if(ro)await cdPut2(d,CL.p+'ro'+i,ro)}
 CLST[i]='ok'}catch(e){CLST[i]=CLST[i]==='ok'?'ok':'fail';if(CLST[i]==='fail'){let nm='';try{const sn=await d.doc(CL.p+'slot'+i).get();nm=sn&&sn.exists?'a career':''}catch(_){}if(nm)CLFAIL[i]={name:'',why:String(e&&e.message||e).slice(0,80)};else CLST[i]='ok'}cloudWarn(e)}finally{clRedraw()}};
cloudInit=async function(){try{if(typeof claude=='undefined'){CLerr='not available in this view';return}const u=await claude.use('user'),d=await claude.use('db');if(!u||!d){CLerr='permission not granted';return}const id=await u.id();if(!id){CLerr='not signed in';return}CL={d,p:'data/users/'+id+'/'};
 [1,2,3,4,5,6].forEach(i=>{if(!load(i))CLST[i]='loading'});clRedraw();await Promise.all([1,2,3,4,5,6].map(i=>clSlot(i)))}catch(e){CLerr=String(e&&e.message||e).slice(0,60)}
 finally{CLREADY=true;try{await trashSync()}catch(e){}clRedraw()}};
window.clRetry=async function(i){await clSlot(i);if(CLST[i]==='ok'&&load(i))HM='✅ Slot '+i+' loaded.';clRedraw()};
// ---- the menu: every slot says what's going on; a slot with a career in the cloud is never "New career" ----
(()=>{try{const _m=menuMain;menuMain=function(){const r=_m.apply(this,arguments);try{const pan=ui.querySelector('.mpan')||ui;[...pan.querySelectorAll('button')].forEach(b=>{const m=(b.getAttribute('onclick')||'').match(/SLOT=(\d);newC\(\)/);if(!m)return;const i=+m[1];
  if(CLFAIL[i]){const f=CLFAIL[i];const c=document.createElement('div');c.className='card';c.style.borderColor='#e5534b';c.innerHTML=`<b>⚠️ Slot ${i}: ${esc(f.name||'your career')}${f.stage=='pro'&&f.py?' · Pro yr '+f.py:''}</b><br><small>It's in your cloud backup, but ${esc(f.why||'it did not finish loading')}. It is not deleted. Open the game on the device you last played it on (that device has the full save and will repair the cloud copy), or try again.</small><br><button onclick="clRetry(${i})">↻ Try again</button>`;b.replaceWith(c)}
  else if(CLST[i]==='loading'){b.disabled=true;b.style.opacity='.7';b.innerHTML='<span class=spin></span> Slot '+i+': checking your cloud backup…'}})}catch(e){}return r}}catch(e){}})();
