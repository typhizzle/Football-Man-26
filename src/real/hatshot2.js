const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 await pg.setViewport({width:520,height:620,deviceScaleFactor:3});
 const names=await pg.evaluate(()=>HATS.map(h=>h[1]));
 for(let i=0;i<names.length;i++){
  await pg.evaluate((n)=>{HATI=n;HWPICK=HATS[n][0];try{coverP()}catch(e){}},i);
  await new Promise(r=>setTimeout(r,800));
  await pg.screenshot({path:`/home/claude/real/hb_${i}.png`});
 }
 fs.writeFileSync('/home/claude/real/hatnames.json',JSON.stringify(names));
 console.log('ok',names.length,'ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,2));
 await b.close();
})();
