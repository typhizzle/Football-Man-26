const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();startGame0(1,'reg');g.y=70;g.dn=4;g.tg=5;pre();});await wait(500);
const t0=Date.now();await pg.evaluate(()=>{fg()});let r;for(let i=0;i<60;i++){await wait(500);r=await pg.evaluate(()=>[g.ph,g.kk?+g.kk.t.toFixed(2):null,g.s.join('-'),g.msg]);if(r[0]!='kick')break}
console.log('after',(Date.now()-t0)/1000,'s',JSON.stringify(r),errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
