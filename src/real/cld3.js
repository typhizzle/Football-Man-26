const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate(async()=>{SLOT=1;newC();start();scene("field");startGame0(1,"reg");g.sel=["Deep",0];g.stage="line";pui();await new Promise(r=>setTimeout(r,500));CAMI=0;hut();});
for(const t of [600,1500,2600,4000]){await new Promise(r=>setTimeout(r,t==600?600:900));await pg.screenshot({path:`/home/claude/real/cl3_${t}.png`});}
console.log(await pg.evaluate(()=>'cam '+camera.position.toArray().map(v=>v.toFixed(1))+' st '+g.stage));await b.close()})();
