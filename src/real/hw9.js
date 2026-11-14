const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();S.hwd={c:[]};const o=[];o.push('pending '+hwPend().join(','));hwEventV();o.push('btns '+[...ui.querySelectorAll('button')].map(b=>b.textContent).filter(t=>/Claim/.test(t)).join('|'));hwClaimAll();o.push('collected '+S.hwd.c.join(',')+' skel '+S.inv.includes('hx4'));hub();o.push(/reward to claim/.test(ui.innerText));return o.join('\n')}));
console.log(errs.slice(0,3));await b.close()})();
