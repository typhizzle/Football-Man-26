const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
console.log(await pg.evaluate(()=>{SLOT=2;newC();start();save();menuMain();const a=(ui.innerText.match(/Slot \d/g)||[]).length;window.CF_OK=1;slotDel(2);const b=!!load(2);const t=ui.innerText.includes('Recently deleted');trashV();trashRec(0);return [a,b,t,!!load(2),ui.innerText.slice(0,300)].join(' | ')}));
console.log(errs.slice(0,4));await b.close()})();
