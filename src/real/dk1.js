// DAWSON KINGSLEY (Tyler 2026-11-16): on Buffalo at TE (83, #88) in every save he fits; real 2022-2025 seasons on his card; the old
// starter moved to the bench (nobody removed, no history changed); weeks already played keep their box scores; not added past his
// playing days; a new world has him too.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({file:process.env.DK_FILE});const o=await pg.evaluate(async(docs)=>{const o={s:[]};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 for(let i=1;i<=8;i++){if(!('slot'+i in docs))continue;let s=await cdGet2(d,'x/slot'+i);s.ro=await cdGet2(d,'x/ro'+i);const raw=JSON.parse(JSON.stringify(s.ro));let oldTE=null;try{const T0=s.T;}catch(e){}
  // past box scores of Buffalo games this season, before
  S=mig(s);SLOT=i;save=()=>{};try{hub()}catch(e){}const key=dkRoster(S),L=S.ro[key]||[];const x=L.find(y=>y&&y.n==='Dawson Kingsley');const rawL=raw[key]||[];const oldN=rawL[5]&&rawL[5].n;const oldKept=!x||!oldN||L.some(y=>y&&y.n===oldN)||(typeof isGen=='function'&&isGen(oldN));   /* Tyler: an auto-generated starter may be replaced */
  const names0=new Set();for(const k in raw)(raw[k]||[]).forEach&&(raw[k]||[]).forEach(y=>{if(y&&y.n)names0.add(y.n)});
  const names1=new Set();for(const k in S.ro)(S.ro[k]||[]).forEach&&(S.ro[k]||[]).forEach(y=>{if(y&&y.n)names1.add(y.n)});
  const lost=[...names0].filter(n=>!names1.has(n));
  o.s.push({oldN,oldKept,i,n:S.name,yr:yrN(),on:!!x,slot:x?L.indexOf(x):-1,h:x?JSON.stringify(x.h):'',lost:lost.length})}
 o.A_oldKept=o.s.every(r=>r.oldKept);o.B_cam=o.s.some(r=>r.n==='Cameron Nugent'&&r.on&&r.slot===5&&r.h.includes('2025,1,417,4'));o.C_simmonsNot=o.s.some(r=>r.n==='Simothy Simmons'&&!r.on);
}catch(e){o.err=e.message+' '+(e.stack||'').split('\n')[1]}return o},docs);o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o));await b.close()})();
