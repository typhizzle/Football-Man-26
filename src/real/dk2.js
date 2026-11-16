// DAWSON KINGSLEY: Buffalo's box scores from weeks already played are identical before and after he joins (Cam save, mid-2026).
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg}=await H.open({file:process.env.DK_FILE});const o=await pg.evaluate(async(docs)=>{const o={};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 const load=async(skip)=>{let s=await cdGet2(d,'x/slot6');s.ro=await cdGet2(d,'x/ro6');if(skip)s.dk1=1;S=mig(s);save=()=>{};return S};
 const boxes=()=>{const out=[];const G=S.gr||{};Object.keys(G).forEach(w=>(G[w]||[]).forEach(gm=>{if(!gm||gm.length<4)return;const bi=(S.T||[]).findIndex(t=>pIdx(t)===1);if(gm[0]!==bi&&gm[1]!==bi)return;try{szCache=null}catch(e){}const x=bxGet(+w,gm[0],gm[1]);const sd=x.A.ti===bi?x.A:x.B;out.push(w+':'+JSON.stringify([sd.rec,sd.gs]))}));return out};
 await load(1);const a=boxes();await load(0);const bb=boxes();o.n=a.length;o.wk=S.wk;o.A_same=a.length>0&&JSON.stringify(a)===JSON.stringify(bb);if(!o.A_same){o.diff=a.map((v,i)=>v===bb[i]?null:[v.slice(0,300),(bb[i]||'').slice(0,300)]).filter(Boolean).slice(0,1)}
}catch(e){o.err=e.message}return o},docs);console.log(JSON.stringify(o));await b.close()})();
