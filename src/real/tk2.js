const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
console.log(await pg.evaluate(()=>{return typeof GOAT+' '+(typeof GOAT=='string'?GOAT.slice(0,80):'')+' | '+JSON.stringify(goatOf('Ricky MaClones'))}));await b.close()})();
