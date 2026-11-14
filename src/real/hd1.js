const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1200));
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();hub();const t=ui.innerText;const m=t.match(/🎃[^\n]*Halloween deal[^\n]*/g)||[];const hw=S.deals.filter(d=>d.hw).map(d=>d.b+' $'+d.a+' ok '+dealOk(d));const i=S.deals.findIndex(d=>d.hw&&dealOk(d));if(i>=0)dealTake(i);return m.length+' shown | '+hw.join(' ; ')+' | taken '+JSON.stringify(S.hwdt)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
