// ===== 🔒 A SAVE NEVER GOES BACKWARDS =====
// Tyler, 2026-11-14: "tell me what you're going to do to make sure every season saves exactly the week
// that it's at ... even in future updates" / "You already fucked up. Fix it".
// What went wrong: his year-8 (2036) save was overwritten by an older 2035 copy (the old cloud restore),
// and the backups rotated away. Nothing in the game knew how far a save had got.
//
// Now, at the lowest level (every write to a slot goes through localStorage.setItem, whatever code does
// it — saving, the cloud, an import, a restore, or anything a future update adds):
//  - each slot remembers the FURTHEST point its career reached (season + week), apart from the save.
//  - if anything writes an OLDER point of the same career over it, the furthest copy is first put away
//    in the phone's larger storage (IndexedDB) and kept until the career passes it again. A warning shows
//    on the main menu and the restore screen offers it.
//  - checkpoints: the save as it was at the end of every season, and every 4 weeks (the 3 latest kept),
//    are put away the same way. Season-end checkpoints are never removed.
// It only ADDS copies; it never changes what is in a save.

window.KP={db:null,wait:[]};
window.kpDb=function(){return new Promise(res=>{if(KP.db)return res(KP.db);try{const q=indexedDB.open('fmkeep',1);
 q.onupgradeneeded=()=>{try{q.result.createObjectStore('c')}catch(e){}};q.onsuccess=()=>{KP.db=q.result;res(KP.db)};q.onerror=()=>res(null)}catch(e){res(null)}})};
window.kpPut=function(id,val,meta){const p=kpDb().then(db=>new Promise(res=>{if(!db)return res(false);try{const t=db.transaction('c','readwrite');t.objectStore('c').put({v:val,m:meta,t:Date.now()},id);t.oncomplete=()=>res(true);t.onerror=()=>res(false)}catch(e){res(false)}}));KP.wait.push(p);return p};
window.kpGet=function(id){return kpDb().then(db=>new Promise(res=>{if(!db)return res(null);try{const q=db.transaction('c').objectStore('c').get(id);q.onsuccess=()=>res(q.result||null);q.onerror=()=>res(null)}catch(e){res(null)}}))};
window.kpDel=function(id){return kpDb().then(db=>new Promise(res=>{if(!db)return res(false);try{const t=db.transaction('c','readwrite');t.objectStore('c').delete(id);t.oncomplete=()=>res(true);t.onerror=()=>res(false)}catch(e){res(false)}}))};
window.kpAll=function(){return kpDb().then(db=>new Promise(res=>{if(!db)return res([]);try{const out=[],q=db.transaction('c').objectStore('c').openCursor();q.onsuccess=()=>{const c=q.result;if(c){out.push({id:c.key,...c.value});c.continue()}else res(out)};q.onerror=()=>res(out)}catch(e){res([])}}))};
window.kpFlush=function(){const w=KP.wait;KP.wait=[];return Promise.all(w)};

// where a save is: one number that only grows while one career is played
window.kpInfo=function(s){try{if(!s||!s.T)return null;const h=s.hist||[];
 return {key:(s.name||'')+'|'+(s.y0||2022)+'|'+(h[0]?[h[0].yds,h[0].td,h[0].att].join(','):'new'),p:h.length*100+(s.wk||0),yr:(s.y0||2022)+h.length,wk:(s.wk||0)+1,name:s.name||'?',stage:s.stage||'hs'}}catch(e){return null}};
window.kpInfoV=function(v){try{return kpInfo(JSON.parse(dz(v)))}catch(e){return null}};
window.kpHw=function(i){try{return JSON.parse(localStorage.getItem(K+'_hw'+i)||'null')}catch(e){return null}};
window.KPWARN={};
const _kpSet=Storage.prototype.setItem,_kpGet=Storage.prototype.getItem;
const kpHwSet=(i,f)=>{try{_kpSet.call(localStorage,K+'_hw'+i,JSON.stringify({key:f.key,p:f.p,yr:f.yr,wk:f.wk,name:f.name,ts:Date.now()}))}catch(e){}};
window.kpSlotOf=function(k){if(typeof k!=='string'||typeof K!=='string'||k.indexOf(K+'_')!==0)return 0;const m=/^_([1-9])$/.exec(k.slice(K.length));return m&&+m[1]<=NSLOT?+m[1]:0};
Storage.prototype.setItem=function(k,v){
 const i=this===localStorage?kpSlotOf(k):0;
 if(i){try{
  const f=(window.KPCUR&&KPCUR.slot===i)?KPCUR.f:kpInfoV(v);   // during the game's own save the slot's only write is S
  const hw=kpHw(i),old=_kpGet.call(localStorage,k);
  if(f&&hw&&hw.key===f.key&&f.p<hw.p){
   // GOING BACKWARDS. Put the furthest copy away before it can be lost (the slot holds it unless it was already lost).
   const of=old?kpInfoV(old):null;
   if(old&&of&&of.key===hw.key&&of.p>=hw.p)kpPut('top_'+i,old,of);
   KPWARN[i]={had:hw,now:f};
  }else if(f){
   // forward (or a new career in this slot): checkpoints, then the new furthest point.
   // What the slot holds now is the furthest point (hw), so it isn't unpacked on every save.
   const of=(old&&hw&&hw.key===f.key)?hw:null,tag=f.key.replace(/[^A-Za-z0-9]/g,'').slice(0,24);
   if(of&&of.yr<f.yr)kpPut('end_'+i+'_'+of.yr+'_'+tag,old,of);          // end of every season, kept for good
   if(of&&of.yr===f.yr&&Math.floor(of.wk/4)!==Math.floor(f.wk/4))kpPut('wk_'+i+'_'+(of.yr*100+of.wk),old,of).then(()=>kpTrim(i));
   if(!hw||hw.key!==f.key||f.p>=hw.p){kpHwSet(i,f);delete KPWARN[i]}
   if(hw&&hw.key===f.key&&f.p>=hw.p)kpGet('top_'+i).then(t=>{if(t&&t.m&&t.m.key===f.key&&t.m.p<=f.p)kpDel('top_'+i)});
  }
 }catch(e){}}
 return _kpSet.call(this,k,v)};
window.kpTrim=function(i){return kpAll().then(L=>{const w=L.filter(x=>String(x.id).indexOf('wk_'+i+'_')===0).sort((a,b)=>b.t-a.t);return Promise.all(w.slice(3).map(x=>kpDel(x.id)))})};

// the game's own saving tells the guard what it is writing (so it doesn't have to unpack it again)
(()=>{try{const _zf=zFlush;zFlush=function(){try{const P=ZPEND;window.KPCUR=(P&&S&&SLOT===P.slot)?{slot:P.slot,f:kpInfo(S)}:null;return _zf.apply(this,arguments)}finally{window.KPCUR=null}}}catch(e){}})();

// on start: learn the furthest point of saves that are already on the phone (no rewrite of anything)
(()=>{try{for(let i=1;i<=NSLOT;i++){const v=_kpGet.call(localStorage,K+'_'+i);if(!v)continue;const f=kpInfoV(v);const hw=kpHw(i);if(f&&(!hw||hw.key!==f.key||f.p>hw.p))kpHwSet(i,f);
 if(f&&hw&&hw.key===f.key&&f.p<hw.p)KPWARN[i]={had:hw,now:f}}}catch(e){}})();

// ---- main menu: say it out loud when a slot is behind where it got to ----
(()=>{try{const _m=menuMain;menuMain=function(){const r=_m.apply(this,arguments);try{const p=ui.querySelector('.mpan');if(p)Object.keys(KPWARN).forEach(i=>{if(p.querySelector('[data-kpw="'+i+'"]'))return;const w=KPWARN[i];
 p.insertAdjacentHTML('afterbegin',`<div class=card data-kpw="${i}" style="border-color:#ff6b6b"><b>⚠️ Slot ${i} is behind where you got to</b><br><small>${esc(w.had.name)} reached ${w.had.yr} week ${w.had.wk}; the slot now holds ${w.now.yr} week ${w.now.wk}. Your furthest copy is kept.</small><button class=g onclick="bkV()">🛟 See saved copies</button></div>`)})}catch(e){}return r}}catch(e){}})();

// ---- restore screen: the furthest copy and the checkpoints, below the device backups ----
const kpLbl=id=>id.indexOf('top_')===0?'⭐ furthest you reached':id.indexOf('end_')===0?'end of season':id.indexOf('pre_')===0?'before a restore':'checkpoint';
(()=>{try{const _v=bkV;window.bkV=function(){const r=_v.apply(this,arguments);try{const host=ui.querySelector('.card:last-of-type')||ui.firstElementChild;
 kpAll().then(L=>{if(!L.length||!host||!host.isConnected)return;L.sort((a,b)=>(b.m&&b.m.p||0)-(a.m&&a.m.p||0));
  const rows=L.filter(x=>x.m).map(x=>{const i=String(x.id).split('_')[1];return `<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>Slot ${i}</b> <small>(${kpLbl(String(x.id))})</small><br>${esc(x.m.name)} · ${x.m.yr} · week ${x.m.wk}<br><small>kept ${new Date(x.t).toLocaleString()}</small></span><button class=g style="width:auto;flex:none" onclick="kpUse('${x.id}')">Restore</button></div>`}).join('');
  if(rows&&!ui.querySelector('[data-kpl]'))host.insertAdjacentHTML('afterend',`<div class=card data-kpl=1><b>Kept copies</b><br><small>The furthest point each career reached, every season end, and recent checkpoints.</small>${rows}</div>`)})}catch(e){}return r}}catch(e){}})();

window.kpUse=async function(id){try{const x=await kpGet(id);if(!x||!x.m)return bkV();const i=+String(id).split('_')[1];
 if(!confirm('Restore slot '+i+' to '+x.m.name+', '+x.m.yr+' week '+x.m.wk+'? What is in the slot now is kept too.'))return;
 const k=K+'_'+i,cur=_kpGet.call(localStorage,k);if(cur){const cf=kpInfoV(cur);if(cf)await kpPut('pre_'+i+'_'+Date.now(),cur,cf)}
 const s=JSON.parse(dz(x.v));s.ts=Date.now();localStorage.setItem(k,ez(JSON.stringify(s)));
 try{if(CL){const c={...s},ro=c.ro;delete c.ro;cdPut2(CL.d,CL.p+'slot'+i,c).then(()=>ro&&cdPut2(CL.d,CL.p+'ro'+i,ro)).catch(e=>cloudWarn(e))}}catch(e){}
 if(SLOT===i&&S&&S.name===s.name){S=load(i);LASTJ=''}
 HM='🛟 Slot '+i+' restored to '+x.m.yr+' week '+x.m.wk+'.';bkV()}catch(e){alert('Could not restore: '+e.message)}};
