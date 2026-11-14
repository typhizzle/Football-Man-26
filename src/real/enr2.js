const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
const r=await pg.evaluate(async()=>{SLOT=3;newC();start();let n=0;const log=[];
 while((S.stage||'hs')=='hs'&&S.yr<=4&&n++<400){const e=evt();try{if(e.t=='sum'){if(S.yr==4){if(S.off&&S.off.length){const w=[...S.off].sort((a,b)=>a.ovr-b.ovr)[0];commit(w.n)}}nextYr()}else if(e.t=='bye'||e.t=='comp'||e.t=='bench')play();else simUser()}catch(x){log.push('loop '+x.message);break}}
 log.push('yr '+S.yr+' stage '+(S.stage||'hs')+' evt '+JSON.stringify(evt()));hub();log.push([...document.querySelectorAll('#ui button')].map(b=>b.textContent).slice(0,12).join(' | '));return log});
console.log(r);await b.close()})();
