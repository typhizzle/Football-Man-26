// REAL COLLEGE AWARDS (Tyler 2026-11-16): Cam's save shows his Heisman and national title; added once, nothing else changes.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({});const o=await pg.evaluate(async(docs)=>{const o={};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 let s=await cdGet2(d,'x/slot6');s.ro=await cdGet2(d,'x/ro6');const n0=(s.aw||[]).length;S=mig(s);o.name=S.name;o.A_heis=S.aw.includes('College yr 4: Heisman Trophy');o.A_nc=S.aw.includes('College yr 4: National Champions');
 const n1=S.aw.length;S=mig(JSON.parse(JSON.stringify(S)));o.B_once=S.aw.length===n1;o.added=n1-n0;try{hub();o.C_shown=true}catch(e){o.C_shown=e.message}}catch(e){o.err=e.message}return o},docs);console.log(JSON.stringify(o));await b.close()})();
