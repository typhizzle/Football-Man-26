const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate(async()=>{SLOT=1;newC();start();scene("field");startGame0(1,"reg");g.sel=["Deep",0];g.stage="line";pui();await new Promise(r=>setTimeout(r,500));CAMI=0;hut();});
await new Promise(r=>setTimeout(r,700));
console.log(await pg.evaluate(()=>'cam '+cm.position.toArray().map(v=>v.toFixed(1))+' fov '+cm.fov+' rot '+cm.rotation.toArray().slice(0,3).map(v=>(+v).toFixed(2))));
await b.close()})();
