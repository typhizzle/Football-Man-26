const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(1500);
console.log(await pg.evaluate(()=>{const L=tkList();const e=L.find(x=>/MaClones/.test(x.n))||L[0];tkGo(e.i);ovHide();hub();return /Contracts & salary cap/.test(ui.innerHTML)}));
console.log(await pg.evaluate(()=>{ctV('all');return ui.innerText.slice(0,1500)}));
console.log(await pg.evaluate(()=>{ctV('EDGE');return ui.innerText.slice(0,700)}));
console.log(await pg.evaluate(()=>{S.py=5;S.extd=0;S.neg=null;negotiate();return ui.innerText.slice(0,600)}));
console.log(await pg.evaluate(()=>{S.hist=[];for(let i=0;i<10;i++)S.hist.push({y:'P'+i});const r=[capMax('QB'),capMax('WR'),mval()];ctV('all');return r.join(',')+' | '+ui.innerText.slice(0,500)}));
console.log(await pg.evaluate(()=>{const x=pkLive('Will Sackerson Jr.');return JSON.stringify(x&&{n:x.n,pos:x.pos,ovr:x.ovr,num:x.num})}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
