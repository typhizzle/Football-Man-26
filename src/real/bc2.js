const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();});await wait(800);
for(let t=0;t<12;t++)console.log(await pg.evaluate((t)=>{SLOT=4;try{newC();start()}catch(e){};const L=tkList();tkGo(L[t*5%L.length].i);ovHide();S.pro.forEach((t,k)=>rost('p.'+k));hub();const seen={};for(const k in S.ro){const R_=S.ro[k];if(Array.isArray(R_))R_.forEach((x,i)=>{if(x)(seen[x.n]=seen[x.n]||[]).push(k+':'+i+':'+x.pos+':'+x.ovr+':'+(x.qp?'qp':'')+':'+(x.npx!=null?'npx':''))})}
 return S.name+' | '+Object.keys(seen).filter(n=>seen[n].length>1&&PKS.some(q=>q[2]==n)).map(n=>n+' '+seen[n].join(' ')).join(' || ')+' | keys '+Object.keys(S.ro).filter(k=>k[0]=='h').length+' p:'+Object.keys(S.ro).filter(k=>k[0]=='p').length},t));
await b.close()})();
