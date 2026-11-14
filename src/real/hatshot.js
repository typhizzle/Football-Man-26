const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 await pg.setViewport({width:520,height:620,deviceScaleFactor:2});
 const keys=await pg.evaluate(()=>HATS.map(h=>h[0]));
 const names=await pg.evaluate(()=>HATS.map(h=>h[1]));
 for(let i=0;i<keys.length;i++){
  await pg.evaluate((k)=>{HWPICK=k;try{coverP()}catch(e){}},keys[i]);
  await new Promise(r=>setTimeout(r,700));
  await pg.screenshot({path:`/home/claude/real/hat_${i}.png`});
 }
 fs.writeFileSync('/home/claude/real/hatnames.json',JSON.stringify(names));
 console.log('rendered',keys.length,'hats');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
