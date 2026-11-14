const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
console.log(await pg.evaluate(()=>{localStorage.clear();SLOT=1;newC();start();save();zFlush();const before=localStorage.getItem(K+'_1').length;menuMain();menuEdit();const a=ui.innerText.slice(0,300);
 const L=rost('p.12');const old=L[0].n;L[1].n='Testy McTest';L[1].ed=1;document.body.insertAdjacentHTML('beforeend','<input id=rsn value="My Set">');rsSave();const b1=Object.keys(rsAll());rsExit();zFlush();const after=localStorage.getItem(K+'_1').length;
 newC();const hasSel=!!$('#rosel');$('#rosel').value='My Set';SLOT=2;start();const L2=rost('p.12');return a.replace(/\n/g,' | ')+'\nsets='+b1+' slot1 unchanged='+(before==after)+' sel='+hasSel+' applied='+L2[1].n+' rset='+S.rset}));
console.log(await pg.evaluate(()=>{rsets();return ui.innerText.slice(0,400).replace(/\n/g,' | ')}));
console.log(await pg.evaluate(()=>{SLOT=3;newC();tkStart();return 1}));await wait(800);console.log(await pg.evaluate(()=>ui.innerText.slice(0,500).replace(/\n/g,' | ')));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,8));await b.close()})();
