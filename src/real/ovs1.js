// EXACT OVERALLS (Tyler 2026-11-16): Lamarcus Action 94, Femmifer Allen 89, Jay Copyright 89 in every save; the ratings-update card
// (with its arrows) is unchanged; their other ratings untouched.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({file:process.env.OVS_FILE});
const o=await pg.evaluate(async(docs)=>{const o={s:[]};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 for(let i=1;i<=8;i++){if(!('slot'+i in docs))continue;let s=await cdGet2(d,'x/slot'+i);s.ro=await cdGet2(d,'x/ro'+i);S=mig(s);const f={};
  for(const k in S.ro)(S.ro[k]||[]).forEach&&(S.ro[k]||[]).forEach(x=>{if(x&&OVSET.some(e=>e[0]===x.n))f[x.n]=x.ovr});o.s.push({i,f})}
 o.A_ok=o.s.every(r=>Object.entries(r.f).every(([n,v])=>v===OVSET.find(e=>e[0]===n)[1]))&&o.s.some(r=>Object.keys(r.f).length);
 try{rupdV();o.B_card=/▲|▼/.test(ui.innerText)}catch(e){o.B_card='err'}
}catch(e){o.err=e.message}return o},docs);console.log(JSON.stringify(o));await b.close()})();
