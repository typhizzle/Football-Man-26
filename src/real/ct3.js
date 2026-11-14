const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(1500);
console.log(await pg.evaluate(()=>{const L=tkList();tkGo(L.find(x=>/Goff/.test(x.n)).i);ovHide();return S.name+' '+tn(S.T[0])}));
console.log(await pg.evaluate(()=>{const out=[];PKS2.forEach(q=>{const x=pkLive(q[2]);if(!x)out.push('MISSING '+q[2])});[12,19,10,18,28].forEach(i=>{const t=S.pro.find(t=>pIdx(t)==i);const L=rost('p.'+S.pro.indexOf(t));out.push(tn(t)+': '+L.filter(x=>PKS.some(q=>q[2]==x.n)).map(x=>x.n+'('+x.pos+' '+x.ovr+' #'+x.num+')').join(', '))});return out.join('\n')}));
console.log(await pg.evaluate(()=>{S.pro.forEach((t,k)=>rost('p.'+k));const out=[];PKS2.forEach(q=>{if(!pkLive(q[2]))out.push('MISSING '+q[2])});return out.join(',')||'all placed'}));
console.log(await pg.evaluate(()=>{ctV('all');return ui.innerText.slice(0,1200)}));
console.log(await pg.evaluate(()=>{ctV('OTH');return ui.innerText.slice(300,900)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
