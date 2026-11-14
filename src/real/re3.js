const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
console.log(await pg.evaluate(()=>{localStorage.clear();document.body.insertAdjacentHTML('beforeend','<input id=rsn value="My Set">');SLOT=1;newC();start();rost('p.12')[1].n='Testy';rsSave();newC();$('#rosel').value='My Set';const v=$('#rosel').value;SLOT=2;const _a=rsApplyQ;let called='no';window.rsApplyQ=function(n){called='yes '+n;try{return _a(n)}catch(e){called+=' ERR '+e.message}};start();return 'v='+v+' called='+called+' RSEDIT='+RSEDIT}));
await b.close()})();
