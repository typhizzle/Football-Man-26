const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();const wait=ms=>new Promise(r=>setTimeout(r,ms));const out={};
const calls=async k=>{await wait(900);out[k]=await pg.evaluate(()=>rd.info.render.calls)};
await pg.evaluate(()=>{SLOT=1;newC();start();hub()});await calls('hub');
await pg.evaluate(()=>{menu()});await calls('cover');
await pg.evaluate(()=>{S=load(1);S.yr=4;addOffers(1);S.yr=5;endC();enroll(S.off[0].n);S.cy=3;mkCsum();declare();cmStart('cb')});await calls('combine');
await pg.evaluate(()=>{cmExit('x');ivStart(0)});await calls('iv');
await pg.evaluate(()=>{ivExit();dnStart()});await calls('draft');
console.log(JSON.stringify(out),errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
