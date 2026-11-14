const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1200));
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
console.log(await pg.evaluate(()=>{let k=0;while(k++<30&&(S.stage||'hs')=='hs'&&(S.wk||0)<4){if(!step())break}hub();return 'stage '+S.stage+' wk '+S.wk+' yr '+S.yr+' buttons '+document.querySelectorAll('#ui button').length+' | '+ui.innerText.slice(0,300).replace(/\n/g,' / ')}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
