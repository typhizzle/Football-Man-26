// ===== 🛟 Restore an earlier save =====
// After the cloud-restore loss (2026-11-14), the game still keeps the two previous versions of every save
// on the device (K_i_b, K_i_b2) — there was just no way to reach them. This lists every slot with its
// backups (who, season, week, when) and puts a backup back. Nothing is deleted: the save it replaces
// takes the backup's place. The restored save is stamped "now" so an older cloud copy can't win again.
window.bkInfo=function(v){try{const s=JSON.parse(dz(v));if(!s||!s.T)return null;const yr=(s.y0||2022)+((s.hist||[]).length);
 return {name:s.name||'?',stage:s.stage||'hs',yr,wk:(s.wk||0)+1,py:s.py||0,ts:s.ts||0}}catch(e){return null}};
window.bkList=function(){const out=[];for(let i=1;i<=NSLOT;i++){['','_b','_b2'].forEach(suf=>{const v=localStorage.getItem(K+'_'+i+suf);if(!v)return;const f=bkInfo(v);if(f)out.push({i,suf,...f})})}return out};
window.bkV=function(){const L=bkList(),st={hs:'High school',col:'College',draft:'Draft',pro:'Pro'},when=t=>t?new Date(t).toLocaleString():'unknown time';
 const rows=L.map(x=>`<div class=row style="font-size:16px;gap:6px;align-items:flex-start"><span style="min-width:0"><b>Slot ${x.i}</b> ${x.suf?'<small>(earlier copy)</small>':'<small style="color:#7bed9f">(what loads now)</small>'}<br>${esc(x.name)} · ${st[x.stage]||x.stage} · ${x.yr} · week ${x.wk}<br><small>saved ${when(x.ts)}</small></span>${x.suf?`<button class=g style="width:auto;flex:none" onclick="bkUse(${x.i},'${x.suf}')">Restore</button>`:''}</div>`).join('');
 ui.style.display='block';ui.innerHTML=`<div><h2>🛟 Restore an earlier save</h2><div class=card><small>The game keeps the two previous versions of every save on this device. Restoring swaps them: the save you replace becomes the earlier copy, so nothing is lost.</small></div><div class=card>${rows||'<small>No saves on this device.</small>'}</div><button class=g onclick="menuMain()">Back</button></div>`;ui.scrollTop=0};
window.bkUse=function(i,suf){try{const k=K+'_'+i,kb_=k+suf,cur=localStorage.getItem(k),old=localStorage.getItem(kb_);if(!old)return bkV();
 const f=bkInfo(old);if(!confirm('Restore slot '+i+' to '+(f?f.name+', '+f.yr+' week '+f.wk:'this copy')+'? The current one is kept as the earlier copy.'))return;
 const s=JSON.parse(dz(old));s.ts=Date.now();const js=JSON.stringify(s);localStorage.setItem(k,ez(js));if(cur)localStorage.setItem(kb_,cur);
 try{if(CL){const c={...s},ro=c.ro;delete c.ro;cdPut2(CL.d,CL.p+'slot'+i,c).then(()=>ro&&cdPut2(CL.d,CL.p+'ro'+i,ro)).catch(e=>cloudWarn(e))}}catch(e){}
 HM='🛟 Slot '+i+' restored'+(f?' to '+f.yr+' week '+f.wk:'')+'.';bkV()}catch(e){alert('Could not restore: '+e.message)}};
(()=>{try{const _m=menuMain;menuMain=function(){const r=_m.apply(this,arguments);try{const p=ui.querySelector('.mpan');if(p&&!p.querySelector('[data-bk]'))p.insertAdjacentHTML('beforeend','<button class=g data-bk=1 onclick="bkV()">🛟 Restore an earlier save</button>')}catch(e){}return r}}catch(e){}})();
