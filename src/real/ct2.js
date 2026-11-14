const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(1500);
console.log(await pg.evaluate(()=>{const L=tkList();const e=L.find(x=>/MaClones/.test(x.n))||L[0];tkGo(e.i);ovHide();hub();hub();return /ctV/.test(ui.innerHTML)+" "+/Contracts/.test(ui.innerText)}));
console.log(await pg.evaluate(()=>{const t=S.pro.find(t=>pIdx(t)==8);const k=S.pro.indexOf(t);const L=rost('p.'+k);return JSON.stringify(L.slice(9,16).map(x=>x&&[x.n,x.pos,x.ovr,x.num]))}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
