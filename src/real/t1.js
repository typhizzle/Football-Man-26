const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open();
console.log(await pg.evaluate(()=>typeof THREE+' '+THREE.REVISION+' gl:'+!!rd.getContext()));
await pg.screenshot({path:'/home/claude/real/menu.png'});
const r=await pg.evaluate(()=>{SLOT=1;newC();start();startGame0(1,'reg');return 'ok '+M});console.log(r);
await new Promise(r=>setTimeout(r,1500));
console.log(await pg.evaluate(()=>JSON.stringify(rd.info.render)+' '+JSON.stringify(rd.info.memory)));
await pg.screenshot({path:'/home/claude/real/game0.png'});
console.log(errs);await b.close()})();
