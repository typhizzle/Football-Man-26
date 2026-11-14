const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();hub();const o=[document.querySelector('#ui').innerText.match(/.*Halloween Event.*/)[0]];hwEventV();o.push(document.querySelector('#ui').innerText.slice(150,520));
 const _d=hwDay;hwDay=()=>1;hwEventV();o.push([...document.querySelectorAll('#ui button')].map(b=>b.textContent+':'+b.getAttribute('onclick')).join(' | '));hwClaim();o.push(JSON.stringify([S.inv,S.hwg,S.hwd]));o.push(HM||document.querySelector('#ui').innerText.slice(0,400));return o}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
