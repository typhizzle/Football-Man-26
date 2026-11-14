const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844,file:process.argv[2]});
console.log(await pg.evaluate(()=>{const o=[];const m={};PKS.forEach(q=>{const k=q[0]+'.'+q[1];(m[k]=m[k]||[]).push(q[2])});for(const k in m)if(m[k].length>1)o.push(k+': '+m[k].join(' / '));
 o.push('QBP10 '+QBP[10]);o.push('PKS slot0 at 10: '+PKS.filter(q=>q[0]==10&&q[1]==0).map(q=>q[2]));o.push('PKS QB slot0: '+PKS.filter(q=>q[1]==0).map(q=>q[0]+':'+q[2]).join(', '));return o.join('\n')}));
await b.close()})();
