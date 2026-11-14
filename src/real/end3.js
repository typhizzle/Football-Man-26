const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844,file:process.argv[2]});
console.log(await pg.evaluate(()=>{SLOT=2;newC();start();try{hub();return 'ok'}catch(e){return e.stack}}));await b.close()})();
