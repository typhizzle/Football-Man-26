const H=require('./h.js');(async()=>{const W=+process.argv[2],Hh=+process.argv[3],tag=process.argv[4];const {b,pg,errs}=await H.open({w:W,h:Hh,dpr:2});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await wait(2500);await pg.screenshot({path:`/home/claude/real/tt_${tag}.png`});
await pg.evaluate(()=>{menuMain()});await wait(1500);await pg.screenshot({path:`/home/claude/real/tm_${tag}.png`});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
