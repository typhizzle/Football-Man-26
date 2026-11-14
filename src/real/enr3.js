const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const r=await pg.evaluate(async()=>{SLOT=3;newC();start();let n=0;const log=[];
 while((S.stage||'hs')=='hs'&&S.yr<=4&&n++<400){const e=evt();try{if(e.t=='sum'){if(S.yr==4){if(S.off&&S.off.length){const w=[...S.off].sort((a,b)=>a.ovr-b.ovr)[0];commit(w.n)}}nextYr()}else if(e.t=='bye'||e.t=='comp'||e.t=='bench')play();else simUser()}catch(x){log.push('loop '+x.message);break}}
 ovHide();endC();const btns=[...document.querySelectorAll('#ui button')].filter(b=>/Enroll/.test(b.textContent));log.push('n '+btns.length+' first: '+btns.slice(0,3).map(b=>b.outerHTML.slice(0,160)).join(' ## '));
 try{btns[0].click()}catch(x){log.push('click err '+x.message)}log.push('ov after click: '+document.querySelector('#ov').textContent.slice(0,90));
 const y=[...document.querySelectorAll('#ov button')].find(b=>/Yes, enroll/.test(b.textContent));log.push('yes onclick: '+(y&&y.getAttribute('onclick')));if(y)y.click();
 log.push('after: '+S.stage+' | '+(document.querySelector('#ui h2')||{}).textContent);return log});
console.log(r.join('\n'));console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
