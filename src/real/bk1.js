// Restore an earlier save (after the 2026-11-14 loss). Nothing may be deleted by a restore.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{window.confirm=()=>true;for(const k of Object.keys(localStorage))localStorage.removeItem(k);
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const put=(suf,wk,ts)=>{const c=JSON.parse(JSON.stringify(S));c.wk=wk;c.ts=ts;localStorage.setItem(K+'_1'+suf,ez(JSON.stringify(c)))};
 put('_b',14,1000);put('',1,2000);   // newer progress in the backup, a stale copy loaded on top
 S=null;menuMain();out.A_buttonOnMenu=!!ui.querySelector('[data-bk]');
 bkV();const t=ui.innerText||'';out.B_listsBoth=/week 15/.test(t)&&/week 2/.test(t);
 bkUse(1,'_b');const now=load(1);out.C_restored=now&&now.wk===14;out.C_stampedNow=now&&now.ts>Date.now()-60000;
 const kept=JSON.parse(dz(localStorage.getItem(K+'_1_b')));out.D_nothingLost=kept&&kept.wk===1;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
r.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(r));await b.close()})();
