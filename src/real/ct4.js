const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(1500);
await pg.evaluate(()=>{const L=tkList();tkGo(L.find(x=>/Goff/.test(x.n)).i);ovHide();S.pro.forEach((t,k)=>rost('p.'+k))});
console.log(await pg.evaluate(()=>[17,30,12,19,10,3,31,28].map(i=>{const t=S.pro.find(t=>pIdx(t)==i);const L=rost('p.'+S.pro.indexOf(t));return tn(t)+': '+L.map((x,j)=>j+':'+x.n+'('+x.pos+' '+x.ovr+')').filter(s=>PKS.some(q=>s.includes(q[2]))||/^(0|23|24):/.test(s)).join(', ')}).join('\n')));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
