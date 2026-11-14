// The cloud never replaces a save on the device (Tyler 2026-11-14: "Make sure no Cloud backup bullshit
// restarts my seasons"). Fails on V253: a newer-stamped cloud copy silently replaced the device save.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const store={};const DB={doc:k=>({get:async()=>({exists:k in store,data:()=>store[k]}),set:async o=>{if(JSON.stringify(o).length>256*1024)throw new Error('too large');store[k]=JSON.parse(JSON.stringify(o))}})};
 window.claude={use:async k=>k==='user'?{id:async()=>'tyler'}:k==='db'?DB:null};for(const k of Object.keys(localStorage))localStorage.removeItem(k);
 const base=JSON.parse(j);const mk=(wk,ts)=>{const c=JSON.parse(JSON.stringify(base));c.wk=wk;c.ts=ts;return c};
 // device: week 14 of his season. cloud: an OLD copy (week 1) that carries a newer timestamp
 localStorage.setItem(K+'_1',ez(JSON.stringify(mk(13,1000))));
 const cl=mk(0,999999);const ro=cl.ro;delete cl.ro;await cdPut2(DB,'data/users/tyler/slot1',cl);await cdPut2(DB,'data/users/tyler/ro1',ro);
 await cloudInit();out.A_deviceKept=load(1).wk===13;
 S=null;menuMain();out.B_asks=!!ui.querySelector('[data-clo="1"]');
 await cloOffer(1,0);out.C_keepStaysKept=load(1).wk===13&&!ui.querySelector('[data-clo="1"]');
 // a slot that is EMPTY on this device still comes back from the cloud
 const c2=mk(9,5000);const r2=c2.ro;delete c2.ro;await cdPut2(DB,'data/users/tyler/slot2',c2);await cdPut2(DB,'data/users/tyler/ro2',r2);
 await cloudInit();const s2=load(2);out.D_emptySlotRestored=!!s2&&s2.wk===9;
 // choosing the cloud keeps the device copy as an earlier copy
 localStorage.setItem(K+'_3',ez(JSON.stringify(mk(5,100))));const c3=mk(11,9e9);const r3=c3.ro;delete c3.ro;await cdPut2(DB,'data/users/tyler/slot3',c3);await cdPut2(DB,'data/users/tyler/ro3',r3);
 await cloudInit();await cloOffer(3,1);out.E_useCloud=load(3).wk===11;out.E_deviceKeptAsBackup=JSON.parse(dz(localStorage.getItem(K+'_3_b'))).wk===5;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
r.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(r));await b.close()})();
