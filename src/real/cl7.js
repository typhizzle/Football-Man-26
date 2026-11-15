// Tyler 2026-11-15: "why do I only see two saves? ... still missing Simmons. I asked you to cover this earlier so it would never
// happen again." Uses his REAL cloud backup from that moment (specs/cloud-2026-11-15): Simmons's rosters piece was cut off mid-backup.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-15';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace('@','~')]=d.data||d}
const sp=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({});
const out=await pg.evaluate(async([docs,sp])=>{const o={};try{window.confirm=()=>true;
 const mkDb=(store,opt={})=>({doc:k=>{const id=k.split('/').pop();return {get:async()=>{await new Promise(r=>setTimeout(r,opt.slow&&id.startsWith('slot4')?600:20));return {exists:id in store,data:store[id]}},set:async v=>{if(opt.failHead&&id===opt.failHead)throw new Error(opt.quota?'The quota has been exceeded.':'network lost');store[id]=v},delete:async()=>{delete store[id]}}}});
 const boot=async(store,opt)=>{localStorage.clear();for(const k in CLST)delete CLST[k];for(const k in CLFAIL)delete CLFAIL[k];const d=mkDb(store,opt);window.claude={use:async w=>w==='user'?{id:async()=>'u1'}:d};CLREADY=false;g=null;ui.style.display='block';menuMain();const p=cloudInit();return {p,d}};
 const txt=()=>[...ui.querySelectorAll('button,.card')].map(b=>b.textContent.replace(/\s+/g,' ').trim()).join(' | ');
 // A: his real cloud: three careers load, Simmons shows as not-loaded (never "New career"), and while loading it says so
 let {p}=await boot({...docs},{slow:1});await new Promise(r=>setTimeout(r,250));o.A_loadingShown=/Slot 4: checking your cloud backup/.test(txt());await p;const t=txt();
 o.A_three=/Slot 1: Frank Castle/.test(t)&&/Slot 2: Bronny James/.test(t)&&/Slot 3: Matt Murdock/.test(t);o.A_simmonsWarned=/⚠️ Slot 4: Simothy Simmons/.test(t)&&/not deleted/.test(t);o.A_notNewCareer=!/Slot 4: New career/.test(t);
 let tot=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);tot+=localStorage.getItem(k).length}o.E_compressed=tot<1000000;o.E_chars=tot;
 // B: this device has a backup copy of Simmons (same career, older): its rosters are used, the career is the newer cloud one
 localStorage.clear();const cp=JSON.parse(sp);await kpPut('end_4_2037_t',JSON.stringify(cp),{name:cp.name,ts:cp.ts});({p}=await boot({...docs}));await p;const s4=load(4);
 o.B_loaded=!!(s4&&s4.name==='Simothy Simmons'&&s4.ro&&Object.keys(s4.ro).length>=30);o.B_careerIsNewest=!!(s4&&s4.ts===docs.slot4&&false)||!!(s4&&s4.wk===18);o.B_told=/rosters in the cloud copy were incomplete/.test(HM||'');
 await kpDel('end_4_2037_t');
 // C: a backup cut off before the head switches over leaves the previous copy whole
 const st={};const d1=mkDb(st);await cdPut2(d1,'x/slot5',{name:'Old',T:[1],v:1,big:'a'.repeat(400000)});const d2=mkDb(st,{failHead:'slot5'});let threw=false;try{await cdPut2(d2,'x/slot5',{name:'New',T:[1],big:'b'.repeat(500000)})}catch(e){threw=true}
 const back=await cdGet2(d1,'x/slot5');o.C_oldIntact=threw&&back&&back.name==='Old';o.C_noJunk=Object.keys(st).length===Object.keys(st).filter(k=>k==='slot5'||k.startsWith('slot5~')).length&&Object.keys(st).length<=4;
 // D: a normal backup replaces it and clears the old pieces
 await cdPut2(d1,'x/slot5',{name:'New',T:[1],big:'c'.repeat(300000)});const nw=await cdGet2(d1,'x/slot5');o.D_new=nw&&nw.name==='New';const n=(st.slot5||{}).n||1;o.D_onlyCurrentPieces=Object.keys(st).filter(k=>k.startsWith('slot5~')).length===n-1;
 // E2: old-style (v2) cloud saves still load
 o.E_oldFormat=!!(await cdGet2(mkDb({...docs}),'x/slot1'));
 // F: Try again works once the cloud copy is whole (repair the rosters piece the way the other device would)
 ({p}=await boot({...docs}));await p;const st2=(await (async()=>{const dd=window.claude&&await claude.use('db');return dd})());await cdPut2(st2,'data/users/u1/ro4',JSON.parse(sp).ro);await clRetry(4);o.F_retry=!!load(4)&&!CLFAIL[4];
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},[docs,sp]);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
