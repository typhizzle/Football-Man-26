// ===== ☁️ Cloud saves that always fit, and never fail silently =====
// Tyler, 2026-11-14: "I simulated, and then now I'm back at the very beginning". Measured: his save's
// cloud backup was 106 KB before the 2026-11-14 updates and 225 KB at week 13 after them (the seal and
// the coach records grew it); one cloud document holds 256 KB. Past that, cdocPut's upload failed and
// cloudQ swallowed the error, so the cloud kept an OLD copy; whenever the device copy was missing,
// cloudInit restored that old copy. Short save codes had the same wall (m94 falls back to the long code).
// Now: every cloud save is split into pieces of 180 KB (written pieces first, head last, so the head never
// points at a missing piece); restore reads the head and puts the pieces back together; old one-piece
// backups still load; and a failed upload is shown on screen instead of being swallowed.
window.CLPART=180000;
window.cdChunks=s=>{const o=[];for(let i=0;i<s.length;i+=CLPART)o.push(s.slice(i,i+CLPART));return o.length?o:['']};
window.cdPut2=async function(d,k,o){const j=JSON.stringify(o),z=await gzS(j);if(!z)throw new Error('could not compress the save');
 const P=cdChunks(z),tag=Date.now().toString(36);
 for(let i=1;i<P.length;i++)await d.doc(k+'~'+i).set({z:P[i],tag});
 await d.doc(k).set({z:P[0],n:P.length,tag,v:2})};
window.cdGet2=async function(d,k){const sn=await d.doc(k).get(),dd=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null;if(!dd)return null;
 if(dd.n>1){let z=dd.z;for(let i=1;i<dd.n;i++){const s2=await d.doc(k+'~'+i).get(),p=s2&&s2.exists?(typeof s2.data=='function'?s2.data():s2.data):null;if(!p||(dd.tag&&p.tag!==dd.tag))throw new Error('cloud save piece '+i+' missing');z+=p.z}return JSON.parse(await gunS(z))}
 return dd.z?JSON.parse(await gunS(dd.z)):dd.j?JSON.parse(dd.j):null};
window.cloudWarn=function(e){try{CLerr=String(e&&e.message||e).slice(0,80);if(S){S.cloudErr=Date.now()}HM=(HM?HM+' ':'')+'⚠️ Cloud backup failed ('+CLerr+'). Your game is saved on this device. Export a save code from the main menu to be safe.'}catch(_){}};
cdocPut=cdPut2;
cloudQ=function(){if(!CL)return;clearTimeout(cq);cq=setTimeout(async()=>{try{const c={...S},ro=c.ro;delete c.ro;const i=SLOT;await cdPut2(CL.d,CL.p+'slot'+i,c);if(ro)await cdPut2(CL.d,CL.p+'ro'+i,ro);if(S)S.cloudOk=Date.now()}catch(e){cloudWarn(e)}},1500)};
cloudInit=async function(){try{if(typeof claude=='undefined'){CLerr='not available in this view';return}const u=await claude.use('user'),d=await claude.use('db');if(!u||!d){CLerr='permission not granted';return}const id=await u.id();if(!id){CLerr='not signed in';return}CL={d,p:'data/users/'+id+'/'};
 for(let i=1;i<=NSLOT;i++){try{const cs=await cdGet2(d,CL.p+'slot'+i),lr=lraw(i),ls=lr?JSON.parse(lr):null;
  // Tyler, 2026-11-14: "Make sure no Cloud backup bullshit restarts my seasons". The cloud NEVER
  // replaces a save that is on this device. If the device has no save in that slot, the cloud copy is
  // brought in. If the cloud's copy is newer (another device), the main menu ASKS, and the device copy
  // is kept as an earlier copy either way.
  if(cs&&cs.T&&!((zTomb()[i]||0)>=(cs.ts||0))&&(!ls||(ls.ts||0)<(cs.ts||0))){
   if(ls&&ls.T){(window.CLOFF=window.CLOFF||{})[i]={ts:cs.ts||0,wk:(cs.wk||0)+1,yr:(cs.y0||2022)+((cs.hist||[]).length),name:cs.name||'',my:{wk:(ls.wk||0)+1,yr:(ls.y0||2022)+((ls.hist||[]).length)}};continue}
   const rv=await cdGet2(d,CL.p+'ro'+i);if(rv)cs.ro=rv;localStorage.setItem(K+'_'+i,JSON.stringify(cs))}
  else if(ls&&ls.T&&(!cs||(cs.ts||0)<(ls.ts||0))){const c={...ls},ro=c.ro;delete c.ro;await cdPut2(d,CL.p+'slot'+i,c);if(ro)await cdPut2(d,CL.p+'ro'+i,ro)}}catch(e){cloudWarn(e)}}
 if(!g&&ui.querySelector('.mpan'))menuMain()}catch(e){CLerr=String(e&&e.message||e).slice(0,60)}};
// ---- short save codes: the same pieces ----
(()=>{try{const _mc=mkCode;mkCode=async function(){const full=await _mc.apply(this,arguments);
 try{if(!window._lastShortCode&&!window._scNoRand&&full&&full.startsWith('FMZ1')&&window.claude&&claude.use){const db=await claude.use('db');if(db){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let code='';for(let i=0;i<5;i++)code+=chars[Math.floor(Math.random()*chars.length)];
  const P=cdChunks(full.slice(4)),tag=Date.now().toString(36);for(let i=1;i<P.length;i++)await db.doc('codes/'+code+'~'+i).set({d:P[i],tag});await db.doc('codes/'+code).set({d:P[0],n:P.length,tag,t:Date.now(),n2:(S&&S.name)||''});window._lastShortCode=code}}}catch(e){cloudWarn(e)}
 return full}}catch(e){}})();
(()=>{try{const _rc=readCode;readCode=async function(t){t=(t||'').trim();
 if(t&&t.length>=2&&t.length<=10&&/^[A-Za-z0-9]+$/.test(t)&&!t.startsWith('FM')&&window.claude&&claude.use){try{const db=await claude.use('db'),C=t.toUpperCase();if(db){const sn=await db.doc('codes/'+C).get(),dd=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null;
  if(dd&&dd.n>1){let z=dd.d;for(let i=1;i<dd.n;i++){const s2=await db.doc('codes/'+C+'~'+i).get(),p=s2&&s2.exists?(typeof s2.data=='function'?s2.data():s2.data):null;if(!p||(dd.tag&&p.tag!==dd.tag))throw new Error('Code "'+C+'" is missing a piece. Try again in a moment.');z+=p.d}return _rc.call(this,'FMZ1'+z)}}}catch(e){if(/missing a piece/.test(e.message))throw e}}
 return _rc.apply(this,arguments)}}catch(e){}})();

// the choice, on the main menu: nothing changes until he picks
window.cloOffer=async function(i,use){try{const o=(window.CLOFF||{})[i];if(!o)return menuMain();delete window.CLOFF[i];
 if(use&&CL){const cs=await cdGet2(CL.d,CL.p+'slot'+i);if(cs&&cs.T){const rv=await cdGet2(CL.d,CL.p+'ro'+i);if(rv)cs.ro=rv;const k=K+'_'+i,cur=localStorage.getItem(k);if(cur){const b=localStorage.getItem(k+'_b');if(b)localStorage.setItem(k+'_b2',b);localStorage.setItem(k+'_b',cur)}localStorage.setItem(k,JSON.stringify(cs));HM='☁️ Slot '+i+' now uses the cloud copy. Your device copy is kept under 🛟 Restore an earlier save.'}}
 else if(CL){const lr=lraw(i),ls=lr?JSON.parse(lr):null;if(ls&&ls.T){ls.ts=Date.now();localStorage.setItem(K+'_'+i,ez(JSON.stringify(ls)));const c={...ls},ro=c.ro;delete c.ro;await cdPut2(CL.d,CL.p+'slot'+i,c);if(ro)await cdPut2(CL.d,CL.p+'ro'+i,ro)}HM='📱 Kept this device\'s save for slot '+i+'.'}
 menuMain()}catch(e){cloudWarn(e);menuMain()}};
(()=>{try{const _m=menuMain;menuMain=function(){const r=_m.apply(this,arguments);try{const O=window.CLOFF||{},p=ui.querySelector('.mpan');if(p)Object.keys(O).forEach(i=>{if(p.querySelector('[data-clo="'+i+'"]'))return;const o=O[i];
 p.insertAdjacentHTML('afterbegin',`<div class=card data-clo="${i}" style="border-color:#ffe93b;text-align:left"><b>☁️ Slot ${i}: a different save is in the cloud</b><br><small>This device: ${o.my.yr} week ${o.my.wk}. Cloud (from another device): ${esc(o.name)} ${o.yr} week ${o.wk}. Nothing changes unless you pick.</small><button onclick="cloOffer(${i},0)">📱 Keep this device's save</button><button class=g onclick="cloOffer(${i},1)">☁️ Use the cloud copy</button></div>`)})}catch(e){}return r}}catch(e){}})();
