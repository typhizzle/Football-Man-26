const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c9f41c92-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{SLOT=1;S=await readCode(c);const T=S.T,byC={};T.forEach((t,i)=>(byC[t.cf]=byC[t.cf]||[]).push(i));const out=[];Object.entries(byC).forEach(([k,L])=>{const R_=confRounds(L,Math.random),cnt={};R_.forEach(rd=>rd.forEach(([a,b])=>{cnt[a]=(cnt[a]||0)+1;cnt[b]=(cnt[b]||0)+1}));const v=L.map(i=>cnt[i]||0);out.push(S.col[k].n.slice(0,12)+' n='+L.length+' rounds='+R_.length+' min='+Math.min(...v)+' max='+Math.max(...v))});return out.join('\n')+'\nrr sample: '+JSON.stringify(rr([1,2,3]).slice(0,3))},code));
await b.close()})();
