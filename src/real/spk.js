const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(()=>{SLOT=1;newC();start();startGame0(1,'reg');g.cr=true;g.dn=2;pre()});await wait(600);
const a=await pg.evaluate(()=>({ovOn:getComputedStyle($('#ov')).display,spkFloat:getComputedStyle($('#spk')).display,spkInCard:!!document.querySelector('#ov button[onclick="spike()"]')}));
await pg.screenshot({path:'/home/claude/real/spk_call.png'});
await pg.evaluate(()=>{pick('Short',0)});await wait(500);
const b2=await pg.evaluate(()=>({ovOn:getComputedStyle($('#ov')).display,spkFloat:getComputedStyle($('#spk')).display}));
await pg.evaluate(()=>{g.stage='call';pui()});await wait(300);const c=await pg.evaluate(()=>({spkFloat:getComputedStyle($('#spk')).display}));
console.log(JSON.stringify({call:a,line:b2,backToCall:c}),errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
