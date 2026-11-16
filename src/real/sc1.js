// Named save codes + 8 save slots (Tyler 2026-11-15): type your own code (prefilled with your last name), nobody else can take it,
// it loads from that point, making it again updates it; the cloud's space sweep never deletes it; 8 slots on the main menu.
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SC_FILE});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
const out=await pg.evaluate(async()=>{const o={};try{
 const store=new Map();let uid='u1';const db={doc:p=>({get:async()=>({exists:store.has(p),data:()=>store.get(p)}),set:async v=>{store.set(p,JSON.parse(JSON.stringify(v)))},delete:async()=>{store.delete(p)}})};
 window.claude={use:async k=>k==='db'?db:k==='user'?{id:async()=>uid}:null};try{navigator.clipboard.writeText=async()=>{}}catch(e){}
 const e0=tkList().find(x=>/Hilton/.test(x.n))||tkList()[0];tkGo(e0.i);ovHide();o.name=S.name;
 // A: the backup card has a name box with the last name
 settings();await new Promise(r=>setTimeout(r,50));const inp=$('#scn');o.A_box=!!inp;o.A_default=inp&&inp.value;o.A_ok=!!inp&&/^HILTON/.test(inp.value);
 // B: make it
 inp.value='castle';await scMake();const d0=store.get('codes/CASTLE');o.B_saved=!!d0&&d0.own==='u1'&&d0.named===1;o.B_shown=$('#xc').value==='CASTLE';o.B_msg=$('#xm').textContent.slice(0,90);
 o.B_noRandom=[...store.keys()].filter(k=>/^codes\/[A-Z0-9]{5}$/.test(k)&&k!=='codes/CASTLE').length===0;
 // C: it loads from that point (wk and name), even after the game moved on
 const wk0=S.wk||0,nm0=S.name;for(let i=0;i<2;i++){const ev=pevt();if(ev.t=='pro')psim(ev);else if(ev.t=='bye')pWeek(null)}o.C_moved=(S.wk||0)>wk0;
 const L=await readCode('castle');o.C_loads=!!L&&L.name===nm0&&(L.wk||0)===wk0;
 // D: someone else can't take it; a free name is offered
 const myNamed=localStorage.getItem(K+'_named');uid='u2';localStorage.removeItem(K+'_named');settings();await new Promise(r=>setTimeout(r,50));
 $('#scn').value='CASTLE';const tagBefore=store.get('codes/CASTLE').tag;await scMake();o.D_refused=/taken/.test($('#xm').textContent)&&$('#scn').value==='CASTLE2'&&store.get('codes/CASTLE').tag===tagBefore;
 // E: the owner updates it to now
 uid='u1';localStorage.setItem(K+'_named',myNamed);settings();await new Promise(r=>setTimeout(r,50));$('#scn').value='CASTLE';await new Promise(r=>setTimeout(r,5));await scMake();
 const L2=await readCode('CASTLE');o.E_updated=store.get('codes/CASTLE').tag!==tagBefore&&(L2.wk||0)===(S.wk||0);
 // F: the cloud space sweep (which clears old random codes) never deletes a named code
 CL={d:db,p:'data/users/u1/'};store.set('codes/OLD11',{d:'x',n:1});store.set('codes/OLD22',{d:'x',n:1});localStorage.setItem(K+'_codes',JSON.stringify(['OLD11','OLD22']));
 await cloudSweep();o.F_namedKept=store.has('codes/CASTLE');o.F_oldSwept=!store.has('codes/OLD11');
 // G: delete your own
 await scDel('CASTLE');o.G_deleted=!store.has('codes/CASTLE')&&!scNamed().some(x=>x.c==='CASTLE');
 // H: off claude.ai: the full code instead
 delete window.claude;settings();await new Promise(r=>setTimeout(r,50));$('#scn').value='ZED';await scMake();await new Promise(r=>setTimeout(r,300));o.H_fallback=!store.has('codes/ZED')&&/^(FM|[A-Z0-9]{5}$)/.test($('#xc').value);   /* 2026-11-16: off claude.ai the name goes online (m226); when the online save can't be reached (no network here), the full backup code is shown instead */
 // I: 8 slots
 o.I_n=NSLOT;const keep=JSON.stringify(S);SLOT=8;S.name='Eight Slot';LASTJ='';save();menuMain();o.I_menu=(ui.innerText.match(/Slot \d/g)||[]).length+' / '+/Slot 8/.test(ui.innerText);const l8=load(8);o.I_slot8=!!l8&&l8.name==='Eight Slot';
 impScreen();o.I_import=[...ui.querySelectorAll('button')].filter(x=>/Import into slot/.test(x.textContent)).length;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o});
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
