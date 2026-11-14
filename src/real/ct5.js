const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(1500);
await pg.evaluate(()=>{const L=tkList();tkGo(L.find(x=>/Goff/.test(x.n)).i);ovHide();S.pro.forEach((t,k)=>rost('p.'+k))});
console.log(await pg.evaluate(()=>{const L=rost('p.12');const x=L[23];return JSON.stringify({n:x.n,npx:x.npx,qp:x.qp,QBX:QBX.some(q=>q[0]==x.n)})+' BUF:'+rost('p.1').slice(0,12).map(x=>x.n).join(',')}));
await b.close()})();
