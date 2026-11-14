const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
console.log(await pg.evaluate(()=>{const o=[];const mk=(slot,f)=>{SLOT=slot;newC();start();f(S);save()};
 for(let i=1;i<=6;i++){try{localStorage.removeItem(K+'_'+i)}catch(e){}}
 const blocked=()=>{SLOT=5;tkStart();return /Finish a season with your existing QB/.test(ui.innerText)};
 mk(1,s=>{s.tk=1;s.stage='pro';s.py=1});o.push('tk in 1st season -> blocked '+blocked());
 mk(1,s=>{s.tk=1;s.stage='pro';s.py=2});o.push('tk finished a season -> blocked '+blocked());
 mk(1,s=>{s.tk=1;s.stage='pro';s.py=1});mk(2,s=>{s.stage='pro';s.py=2});o.push('created QB finished pro season -> blocked '+blocked());
 return o.join('\n')}));console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
