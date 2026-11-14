const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c59330c6-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);const T=S.T;
 const ns=new Set();try{(typeof NSCH!='undefined'?NSCH:[]).forEach(x=>ns.add(Array.isArray(x)?x[0]:x.n||x))}catch(e){}
 return S.col.map((c,ci)=>{const L=T.filter(t=>t.cf==ci);return {ci,n:c.n,v:L.reduce((a,t)=>a+(t.ovr||60),0)/L.length,L:L.map(t=>t.n)}}).sort((a,b)=>a.v-b.v).map(x=>x.n+' (avg '+x.v.toFixed(1)+', '+x.L.length+' teams): '+x.L.join(', ')).join('\n\n')+'\n\nNS: '+[...ns].slice(0,80).join(', ')},code));await b.close()})();
