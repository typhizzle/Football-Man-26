const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
console.log(await pg.evaluate(()=>{localStorage.clear();document.body.insertAdjacentHTML('beforeend','<input id=rsn value="My Set">');SLOT=1;newC();start();rost('p.12')[1].n='Testy';rsSave();newC();const e=$('#rosel');return start.toString().slice(0,120)+' | sel='+(e&&e.value)+' opts='+(e?[...e.options].map(o=>o.value).join(','):'')}));
console.log(await pg.evaluate(()=>{$('#rosel').value='My Set';SLOT=2;try{start()}catch(e){return 'ERR '+e.message}return 'rset='+S.rset+' '+rost('p.12')[1].n}));
await b.close()})();
