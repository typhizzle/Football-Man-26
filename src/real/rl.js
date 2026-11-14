const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(1500);
console.log(await pg.evaluate(()=>{const L=tkList();tkGo(L[0].i);ovHide();return S.pro.map((t,k)=>k+':'+pIdx(t)+':'+tn(t)).join(' | ')}));
console.log(await pg.evaluate(()=>{const L=rost('p.3');return L.length+' '+L.map((x,i)=>i+x.pos).join(',')}));
await b.close()})();
