const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
console.log(await pg.evaluate(()=>{localStorage.clear();SLOT=1;newC();start();const L=tkList();tkGo(L[0].i);try{hub();return 'ok'}catch(e){return e.stack}}));await b.close()})();
