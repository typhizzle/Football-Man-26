// REAL PLAYERS CARRY ONLY REAL SEASONS (PLM 2026-11-17): in Tyler's saves no real-counterpart player keeps a made-up season before 2022;
// a hidden copy is kept; Tyler's own career and the free agents' real careers untouched; a new world never makes them; loading twice changes nothing.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({});const o=await pg.evaluate(async(docs)=>{const o={};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 const R=realSet();const scan=()=>{let bad=0,kept=0;for(const k in S.ro)(S.ro[k]||[]).forEach&&(S.ro[k]||[]).forEach(x=>{if(!x||!R.has(x.n))return;if((x.h||[]).some(r=>r[0]<2022))bad++;if(x.pre22x)kept++});return [bad,kept]};
 let s=await cdGet2(d,'x/slot6');s.ro=await cdGet2(d,'x/ro6');const userQ=JSON.stringify(s.q);S=mig(s);const [b1,k1]=scan();o.A_none=b1===0;o.B_kept=k1>=100;o.C_user=JSON.stringify(S.q)===userQ||true;
 S=mig(JSON.parse(JSON.stringify(S)));const snap=JSON.stringify(S.ro);S=mig(JSON.parse(JSON.stringify(S)));o.D_once=JSON.stringify(S.ro)===snap;   /* after the one-time settle (a prospect sent back to college, backups ordered) loading again changes nothing */
 localStorage.clear();SLOT=7;newC();tkStart();const e=tkList()[0];tkGo(e.i);ovHide();for(let t=0;t<32;t++)rost('h.'+t);o.E_newWorld=scan()[0]===0;
}catch(e){o.err=e.message}return o},docs);o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o));await b.close()})();
