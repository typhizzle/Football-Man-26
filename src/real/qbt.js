const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();start()});await wait(500);
console.log(await pg.evaluate(()=>S.pro.map(t=>{const q=QBP[pIdx(t)];return (q?q[0]:'?')+' — '+tn(t)}).join('\n')));await b.close()})();
