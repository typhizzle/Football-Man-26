const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c9f41c92-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{SLOT=1;S=await readCode(c);const T=S.T,W=colSched(),cc=T.map(()=>0),gc=T.map(()=>0);W.forEach(w=>w.forEach(([a,b])=>{gc[a]++;gc[b]++;if(T[a].cf==T[b].cf){cc[a]++;cc[b]++}}));const h={};cc.forEach(x=>h[x]=(h[x]||0)+1);const g={};gc.forEach(x=>g[x]=(g[x]||0)+1);return 'conf games per team: '+JSON.stringify(h)+' total games: '+JSON.stringify(g)+' | you: '+cc[0]+' conf, '+gc[0]+' total'},code));
await b.close()})();
