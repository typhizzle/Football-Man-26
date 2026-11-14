const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=4;newC();tkStart()});await wait(800);
console.log(await pg.evaluate(()=>{const e=tkList().find(x=>x.n=='Bacon Maple');const o=[];const _r=rescaleTo;const L=tkList();
 S.name=e.n;S.age=e.age;S.dr={done:0,pk:224,P:[],picks:[]};proStart(e.i,-1);o.push('after proStart '+qo(S.q));for(let k=0;k<8&&Math.abs(qo(S.q)-e.ovr)>0;k++){rescaleTo(Math.min(99,qo(S.q)+(e.ovr-qo(S.q))*1.6+(e.ovr>qo(S.q)?1:-1)));o.push(qo(S.q))}
 return o.join(',')+' target '+e.ovr}));
console.log(await pg.evaluate(()=>{SLOT=4;start();const e=tkList().find(x=>x.n=='Bacon Maple');tkGo(e.i);const a=qo(S.q);ovHide();hub();return a+' -> after hub '+qo(S.q)+' q='+JSON.stringify(S.q)}));
await b.close()})();
