const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
console.log(await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));spV();celRoom();return LR.O.length},sj));await wait(1500);await pg.screenshot({path:'bw/cr1.png'});
console.log(await pg.evaluate(()=>{LR.p.z-=14;return 1}));await wait(1500);await pg.screenshot({path:'bw/cr2.png'});
console.log(await pg.evaluate(()=>{evExit();return ui.innerText.slice(0,30)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
