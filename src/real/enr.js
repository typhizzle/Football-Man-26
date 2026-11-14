const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const r=await pg.evaluate(async()=>{SLOT=3;newC();start();let n=0;const log=[];
 while((S.stage||'hs')=='hs'&&S.yr<=4&&n++<400){const e=evt();try{if(e.t=='sum'){if(S.yr==4){if(S.off&&S.off.length){const w=[...S.off].sort((a,b)=>a.ovr-b.ovr)[0];commit(w.n)}}nextYr()}else if(e.t=='bye'||e.t=='comp'||e.t=='bench')play();else simUser()}catch(x){log.push('loop '+x.message);break}}
 endC();log.push('screen:'+(document.querySelector('#ui h2')||{}).textContent+' commit '+S.commit);return log});
console.log(r);
const btn=await pg.$$eval('#ui button',bs=>bs.map(b=>b.textContent).filter(t=>/Enroll/.test(t)).length);console.log('enroll buttons',btn);
await pg.evaluate(()=>{const b=[...document.querySelectorAll('#ui button')].find(b=>/Enroll/.test(b.textContent));b.click()});await wait(500);
console.log('ov:',await pg.evaluate(()=>getComputedStyle(document.querySelector('#ov')).display+' '+document.querySelector('#ov').textContent.slice(0,80)));
await pg.evaluate(()=>{const b=[...document.querySelectorAll('#ov button')].find(b=>/Yes, enroll/.test(b.textContent));b.click()});await wait(800);
console.log('after:',await pg.evaluate(()=>S.stage+' | '+(document.querySelector('#ui h2')||{}).textContent+' | ov '+getComputedStyle(document.querySelector('#ov')).display));
await pg.screenshot({path:'/tmp/claude-0/enr.png'});console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
