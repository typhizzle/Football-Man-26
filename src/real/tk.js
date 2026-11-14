const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
console.log(await pg.evaluate(()=>{SLOT=4;newC();tkStart();return 'ok'}));await wait(1500);
console.log(await pg.evaluate(()=>ui.innerText.split('\n').slice(0,8).join(' | ')));
console.log(await pg.evaluate(()=>{const L=tkList();const e=L.find(x=>/MaClones/.test(x.n))||L[0];tkGo(e.i);return [S.name,S.stage,'age '+S.age,'py '+S.py,'QB '+qo(S.q),'team '+tn(S.T[0]),'$'+S.cash.toLocaleString(),'fans '+myFans(),S.aw.join('; '),'house '+S.hz,'ct '+JSON.stringify(S.ct),'vet '+S.vet].join(' | ')}));
await wait(500);console.log(await pg.evaluate(()=>{ovHide();hub();return ui.innerText.slice(0,300)}));
console.log(await pg.evaluate(()=>{career();return ui.innerText.slice(0,300)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
