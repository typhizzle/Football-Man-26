// ===================== 🗑 DELETE / RECOVER SAVE SLOTS (6 slots) =====================
const DELK=()=>K+'_trash',DELMAX=5;
function slotKeys(i){return [K+'_'+i,K+'_'+i+'_b',K+'_'+i+'_b2',...(i==1?[K,K+'_b']:[])]}
function trashL(){try{return JSON.parse(localStorage.getItem(DELK()))||[]}catch(e){return []}}
function slotDel(i){const d=load(i);if(!d)return menuMain();if(!window.CF_OK&&!confirm('Delete Slot '+i+' ('+d.name+')? You can still recover it from "Recently deleted" (up to '+DELMAX+' saves are kept).'))return;
 const L=trashL();L.unshift({t:Date.now(),slot:i,n:d.name,s:ez(JSON.stringify(d))});while(L.length>DELMAX)L.pop();
 let ok=false;while(!ok&&L.length){try{localStorage.setItem(DELK(),JSON.stringify(L));ok=true}catch(e){L.pop()}}
 slotKeys(i).forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});try{zTombSet(i,1);if(CL){CL.d.doc(CL.p+'slot'+i).delete();CL.d.doc(CL.p+'ro'+i).delete()}}catch(e){}if(SLOT==i){SLOT=0}menuMain()}
function trashV(){const L=trashL();ui.style.display='block';ui.innerHTML=`<div><h2>♻️ Recently deleted</h2><div class=card><small>The last ${DELMAX} deleted saves are kept here. Recover one into any empty slot.</small></div>
${L.length?L.map((x,j)=>{let s=null;try{s=JSON.parse(dz(x.s))}catch(e){}return `<div class=card><b>${esc(x.n||'Save')}</b> <small>was Slot ${x.slot} · deleted ${new Date(x.t).toLocaleDateString()}${s?' · QB '+qo(s.q):''}</small><br><button onclick="trashRec(${j})">Recover</button><button class=g onclick="trashGone(${j})">Delete forever</button></div>`}).join(''):'<div class=card>Nothing here.</div>'}<button class=g onclick=menuMain()>Back</button></div>`;ui.scrollTop=0}
function trashRec(j){const L=trashL(),x=L[j];if(!x)return trashV();let i=x.slot;if(load(i)){i=0;for(let k=1;k<=NSLOT;k++)if(!load(k)){i=k;break}}if(!i){HM='';alert('All '+NSLOT+' slots are full. Delete one first.');return trashV()}
 try{localStorage.setItem(K+'_'+i,x.s)}catch(e){zSquash();try{localStorage.setItem(K+'_'+i,x.s)}catch(e2){return}}L.splice(j,1);localStorage.setItem(DELK(),JSON.stringify(L));menuMain()}
function trashGone(j){if(!window.CF_OK&&!confirm('Delete this save forever?'))return;const L=trashL();L.splice(j,1);localStorage.setItem(DELK(),JSON.stringify(L));trashV()}
