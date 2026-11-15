// Tyler 2026-11-15: "I'm not seeing my Bronny James save ... If it's just taking a while to load ... it needs to be seen as
// loading ... It shouldn't be ever removed ever ... recently deleted ... up to 5 files ... replace the oldest".
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SV_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};
 for(const k of Object.keys(localStorage))localStorage.removeItem(k);
 const base=JSON.parse(j);const mk=(name,seed,ts)=>{const s=JSON.parse(j);s.name=name;s.seed=seed;s.ts=ts;delete s.ro;return s};
 // a fake cloud that answers slowly; slot 3 holds "Bronny James" (the phone has nothing); slot 2: phone and cloud hold DIFFERENT careers
 const store={},put=(k,v)=>store['data/users/u1/'+k]={j:JSON.stringify(v)};
 put('slot3',mk('Bronny James',333,1000));put('slot2',mk('Cloud Guy',222,500));
 localStorage.setItem(K+'_2',JSON.stringify(mk('Phone Guy',999,2000)));
 let release;const gate=new Promise(r=>release=r);
 window.claude={use:async w=>w==='user'?{id:async()=>'u1'}:{doc:k=>({get:async()=>{await gate;return {exists:!!store[k],data:store[k]}},set:async v=>{store[k]=v},delete:async()=>{delete store[k]}})}};
 CLREADY=false;CLSLOW=false;CL=null;menuMain();
 const t0=ui.innerText;o.A_spinner=!!ui.querySelector('[data-clload] .spin')&&/Loading your saves/.test(t0);
 const s3=[...ui.querySelectorAll('button')].find(x=>/Slot 3/.test(x.textContent));o.A_slot3Waits=!!s3&&s3.disabled&&/loading/.test(s3.textContent);
 const p=cloudInit();await new Promise(r=>setTimeout(r,200));o.A_stillLoading=!CLREADY&&!!ui.querySelector('[data-clload]');
 release();await p;await new Promise(r=>setTimeout(r,200));
 o.B_ready=CLREADY===true&&!ui.querySelector('[data-clload]');o.B_bronnyShows=/Slot 3: Bronny James/.test(ui.innerText);
 o.B_noDisabled=![...ui.querySelectorAll('button')].some(x=>x.disabled);
 // C: the cloud's different career in slot 2 was kept in Recently deleted before the phone's career went up
 const T=trashL();o.C_trash=T.map(x=>x.n).join(' | ');o.C_cloudGuyKept=T.some(x=>/Cloud Guy/.test(x.n));{const v=store['data/users/u1/slot2'];o.C_phoneGuyUp=!!v&&(!!v.z||JSON.parse(v.j).name==='Phone Guy')}
 // D: 5 kept, the 6th pushes out the oldest; the list survives the phone's storage being cleared (IndexedDB + cloud)
 [2,3,5,6].forEach(i=>localStorage.removeItem(K+'_'+i));localStorage.removeItem(DELK());TRASHM=null;for(let i=0;i<6;i++){localStorage.setItem(K+'_4',JSON.stringify(mk('Del '+i,400+i,3000+i)));slotDel(4);await new Promise(r=>setTimeout(r,30))}
 const D=trashL();o.D_n=D.length;o.D_names=D.map(x=>x.n).join(',');o.D_five=D.length===5&&/Del 5/.test(D[0].n)&&!D.some(x=>x.n==='Del 0');
 await new Promise(r=>setTimeout(r,300));localStorage.removeItem(DELK());TRASHM=null;o.D_wiped=trashL().length===0;await trashSync();o.D_back=trashL().length===5;o.D_inCloud=!Object.keys(store).some(k=>/trash/.test(k)); /* deleted saves stay off the cloud (size limit), kept on the phone + IndexedDB */
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
