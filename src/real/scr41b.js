const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));const sh=async n=>{await wait(250);await pg.screenshot({path:`/home/claude/real/thr/s41b_${n}.png`})};
await pg.evaluate(()=>{SLOT=1;newC();start();S.stars=5;S.yr=3;S.nr=40;hub();gpV('bd')});await sh('rec');await pg.evaluate(()=>{ui.scrollTop=700});await sh('rec2');await pg.evaluate(()=>{ui.scrollTop=1500});await sh('rec3');
await pg.evaluate(()=>{hub();ui.scrollTop=99999});await sh('hubEnd');
console.log(JSON.stringify(errs.filter(e=>!/ERR_FAILED/.test(e))));await b.close()})();
