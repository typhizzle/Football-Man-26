// Tyler 2026-11-16: Cam 83 speed exact at 68; Manziel 90 speed exact at 57; Hilton III = Joe Milton (62/99/57/84/68/73 = 74); Shiesty +1.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cam-cloud-2026-11-16b';   /* his week-8 save: Cam upgraded to 71 */const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({});
const out=await pg.evaluate(async(docs)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};
 const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};const s=await cdGet2(d,'x/slot6');s.ro=await cdGet2(d,'x/ro6');
 const before=(q=>Math.round([q.acc,q.pow,q.awr,q.mob,q.sec,q.trk==null?q.sec:q.trk].reduce((a,b)=>a+b,0)/6))(s.q);   /* 2026-11-16: the old (plain average) overall, which an existing career keeps */S=mig(s);o.cam=JSON.stringify(S.q);o.camBefore=before;o.A_camSpeed=S.q.mob===83&&S.q.pow===83&&S.q.trk===84;const v68=qbExact('Cameron Nugent',68);o.v68=JSON.stringify(v68);o.A_aboveTheStart=['acc','pow','awr','mob','sec','trk'].every(k=>S.q[k]>=v68[k]);o.A_cam68=qo(S.q)===before&&before===71;   /* keeps HIS overall (71), never back to 68 */o.A_camShape=S.q.sec>S.q.acc&&S.q.acc>S.q.awr;
 const S2=mig(JSON.parse(JSON.stringify(S)));o.A_stable=JSON.stringify(S2.q)===JSON.stringify(S.q);
 localStorage.clear();SLOT=5;newC();tkStart();await new Promise(r=>setTimeout(r,1500));
 const L=faqList();const jf=L.find(x=>x.n==='Johnny Football');faqGo(encodeURIComponent(jf.n));faqSign(0);o.jf=JSON.stringify(S.q);o.B_jf=S.q.mob===90&&S.q.pow===75&&S.q.sec===74&&qo(S.q)===57;
 localStorage.clear();SLOT=5;newC();tkStart();await new Promise(r=>setTimeout(r,1500));const e=tkList().find(x=>/Hilton/.test(x.n));tkGo(e.i);ovHide();o.hil=JSON.stringify(S.q);
 o.C_hilton=(qo(S.q)===73||qo(S.q)===74)&&S.q.pow===99&&S.q.mob===84&&S.q.trk===73&&S.q.acc<=62&&S.q.awr<=57&&S.q.sec<=68;
 o.D_shiesty=(QBP.find(x=>x[0]==='Joseph Shiesty')||[])[1]===97;rupdV();const t=ui.innerText;o.D_page=/Joseph Shiesty/.test(t)&&/Exact ratings/.test(t)&&/Oct 24/.test(t)&&/★Speed 83/.test(t)&&/★Throw power 83/.test(t);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},docs);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
