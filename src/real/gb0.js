const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();startGame0(1,'reg');g.s=[21,14];g.w=true;fieldWalk()});await wait(500);
const r0=await pg.evaluate(()=>{const co=LR.O.find(o=>o.k=='fcoach');fwAct(co);return document.querySelector('#ov').innerText.slice(0,200)});
await pg.evaluate(()=>{fwGat()});await wait(400);await pg.evaluate(()=>{LR.gb.t=6.9});for(let i=0;i<40;i++){await wait(500);if(await pg.evaluate(()=>!LR.gb))break}
const r1=await pg.evaluate(()=>({gb:!!LR.gb,cel:(LR.cel||[]).length,ov:document.querySelector('#ov').innerText.slice(0,160)}));
await pg.evaluate(()=>{ovHide();fwExit()});await wait(300);
console.log(JSON.stringify({r0,r1}),errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
