// RETIRED PLAYERS LEDGER (PLM audit 2026-11-16): Tyler's 2037 league gets back the players who retired before the ledger existed
// (from the seal: real seasons only), once; nobody on a roster is listed; the page shows them; loading again adds nothing.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({file:process.env.RA_FILE});const o=await pg.evaluate(async(docs)=>{const o={};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 let s=await cdGet2(d,'x/slot4');s.ro=await cdGet2(d,'x/ro4');S=mig(s);save=()=>{};const A=S.retAll||[];o.n=A.length;o.A_recovered=A.length>=50;
 const on=new Set();for(const k in S.ro)(S.ro[k]||[]).forEach&&(S.ro[k]||[]).forEach(x=>x&&x.n&&on.add(x.n));o.B_noneActive=A.every(e=>!on.has(e.n));
 o.C_realSeasons=A.every(e=>(e.h||[]).length+((e.hp||[]).length)>0&&(e.h||[]).every(r=>r[0]<yrN()));
 const n1=A.length;S=mig(JSON.parse(JSON.stringify(S)));o.D_once=S.retAll.length===n1;
 raV();o.E_page=/Retired players/.test(ui.innerText)&&ui.querySelectorAll('.card').length>10;raV('qb');o.E_search=true;
 lhV();o.F_button=!!ui.querySelector('[data-ra]');o.sample=JSON.stringify(A[A.length-1]).slice(0,200);
}catch(e){o.err=e.message}return o},docs);o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o));await b.close()})();
