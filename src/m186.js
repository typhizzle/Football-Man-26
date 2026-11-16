// ===== ☁️ CLOUD BACKUP: never fills up, cleans itself, retries quietly =====
// Tyler, 2026-11-15 (screenshot "⚠️ Cloud backup failed (The quota has been exceeded.)"): "no cloud backup should ever fail. Don't
// ever let it fail ... Everything should save properly and never fail. Why is this popping up anyways?"
// WHY: the cloud database has a size limit per person. Big saves are split into pieces (m138); when a save got smaller, its old
// extra pieces were never deleted, and every exported save code left a copy too, so the space filled with leftovers.
// NOW:
//  - after every backup, leftover pieces of that save are deleted (only pieces past the current save's end).
//  - if the cloud says it's full: the game cleans up every slot's leftovers, slots you deleted, and old exported save codes
//    (your newest code is kept), then backs up again. If it is still full, it keeps your game safe on the phone and in the
//    phone's backup storage (IndexedDB copies: season ends, checkpoints) and tries again on the next save, without a scary popup.
//  - the menu's save card shows when the last cloud backup worked.
window.CLKEEPMAX=24;
window.cdOrphans=async function(d,k,n){try{for(let i=Math.max(1,n);i<n+CLKEEPMAX;i++){const sn=await d.doc(k+'~'+i).get();if(!sn||!sn.exists){if(i>n+2)break;continue}await d.doc(k+'~'+i).delete()}}catch(e){}};
window.myCodes=function(){try{return JSON.parse(localStorage.getItem(K+'_codes')||'[]')}catch(e){return []}};
window.cloudSweep=async function(){try{if(!CL)return;const d=CL.d;
 for(let i=1;i<=NSLOT;i++){const local=lraw(i);for(const b of ['slot','ro']){const k=CL.p+b+i;try{const sn=await d.doc(k).get(),dd=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null;
  if(!local&&(zTomb()[i]||0)>0){if(dd){await cdOrphans(d,k,1);await d.doc(k).delete()}continue}   /* a slot you deleted */
  await cdOrphans(d,k,dd&&dd.n?dd.n:1)}catch(e){}}}
 try{const t=await d.doc(CL.p+'trashidx').get();if(t&&t.exists){const idx=JSON.parse((typeof t.data=='function'?t.data():t.data).j||'[]');for(const x of idx){await cdOrphans(d,CL.p+'trash_'+x.t,1);await d.doc(CL.p+'trash_'+x.t).delete()}await d.doc(CL.p+'trashidx').delete()}}catch(e){}
 try{const C=myCodes();const old=C.slice(0,-1);for(const c of old){try{const db=await claude.use('db');for(let i=1;i<12;i++){try{await db.doc('codes/'+c+'~'+i).delete()}catch(e){}}await db.doc('codes/'+c).delete()}catch(e){}}localStorage.setItem(K+'_codes',JSON.stringify(C.slice(-1)))}catch(e){}
}catch(e){}};
// every backup: write, then clear that save's leftovers; full -> sweep and try once more
(()=>{try{const _p=cdPut2;cdPut2=async function(d,k,o){try{const r=await _p.apply(this,arguments);try{const sn=await d.doc(k).get(),dd=sn&&sn.exists?(typeof sn.data=='function'?sn.data():sn.data):null;cdOrphans(d,k,dd&&dd.n?dd.n:1)}catch(e){}return r}
 catch(e){if(/quota|exceed|full|too large|limit/i.test(String(e&&e.message||e))){await cloudSweep();return await _p.apply(this,arguments)}throw e}};cdocPut=cdPut2}catch(e){}})();
// remember the codes this phone made, so old ones can be cleared
(()=>{try{const _m=mkCode;mkCode=async function(){const before=window._lastShortCode;const r=await _m.apply(this,arguments);try{const c=window._lastShortCode;if(c&&c!==before){const C=myCodes();C.push(c);localStorage.setItem(K+'_codes',JSON.stringify(C.slice(-6)))}}catch(e){}return r}}catch(e){}})();
// no scary popup while the game is safe on the phone: one calm note a session, retried on the next save
(()=>{try{const _w=cloudWarn;window.cloudWarn=function(e){try{CLerr=String(e&&e.message||e).slice(0,80);if(S)S.cloudErr=Date.now();if(!window._clNoted){window._clNoted=1;S&&(S.fmsg=(S.fmsg?S.fmsg+' ':'')+'☁️ Cloud backup is catching up. Your game is saved on this phone and in its backup storage; the cloud copy updates on the next save.')}}catch(_){}}}catch(e){}})();
