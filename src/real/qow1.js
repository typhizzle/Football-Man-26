// WEIGHTED QB OVERALL (Tyler 2026-11-16): Tyler's exact Ricky / Jarsh ratings come out 98 / 97; Cam 68 save stays 68; every existing
// career keeps its overall; a new career uses the weights; accuracy moves the overall more than truck; no 99s needed.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({file:process.env.QOW_FILE});const o=await pg.evaluate(async(docs)=>{const o={saves:[]};try{
 const mk=(n,q,pt)=>{const s={name:n,tk:n,q,ro:{}};S=s;S.qoNew=1;S.qp=pt;return qo(S.q)};
 o.A_ricky=mk('Ricky MaClones',{acc:97,pow:98,awr:97,mob:87,sec:92,trk:83},{lob:97,tch:99,blt:97});
 o.A_jarsh=mk('Jarsh Fallon',{acc:95,pow:98,awr:93,mob:89,sec:87,trk:96},{lob:98,tch:99,blt:97});
 const base=mk('X',{acc:80,pow:80,awr:80,mob:80,sec:80,trk:80},{lob:80,tch:80,blt:80});S.q.acc+=5;const ua=qo(S.q);S.q.acc-=5;S.q.trk+=5;const ut=qo(S.q);o.B_accMore=ua-base>ut-base;o.Bv=[base,ua,ut];
 const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 for(let i=1;i<=8;i++){if(!('slot'+i in docs))continue;let s=await cdGet2(d,'x/slot'+i);s.ro=await cdGet2(d,'x/ro'+i);const v=[s.q.acc,s.q.pow,s.q.awr,s.q.mob,s.q.sec,s.q.trk==null?s.q.sec:s.q.trk];const before=Math.min(Math.round(v.reduce((a,b)=>a+b,0)/6),99);
  S=mig(s);o.saves.push({i,n:S.name,before,after:qo(S.q)})}
 o.C_kept=o.saves.every(x=>x.after===x.before);
}catch(e){o.err=e.message}return o},docs);o.A_ok=o.A_ricky===98&&o.A_jarsh===97;console.log(JSON.stringify(o));await b.close()})();
