const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
console.log(await pg.evaluate(()=>{let n=0;while(n++<4000&&(S.stage||'hs')!='col'){if(!step())break}const out=[];let g_=0;const cy=S.cy;
 // force user into a CC: make team 0 conference leader by fiddling? just run the season and log events
 while(S.stage=='col'&&S.cy==cy&&g_++<400){const e=cevt();if(e.t=='cc'){out.push('CC week: pending other CC games '+(S.ccPend||[]).length+', champs so far '+S.cch.length)}if(e.t=='bowl')out.push('BOWL for me: '+gTitle('bowl')+' vs '+S.T[e.o].n);if(e.t=='sum'){out.push('sum: bowls '+(S.bwls||[]).length+' my bowl '+JSON.stringify(S.bwl)+' champs '+S.cch.length+' cb '+!!S.cb);break}step()}
 schV(0);out.push(ui.innerText.split('\n').filter(l=>/Conference Championship|Bowl|Playoff|Postseason/.test(l)).join(' / '));
 // conference records sanity
 const T=S.T,bad=T.filter(t=>t.cw+t.cl>(ccapC(t.cf)+1)).map(t=>t.n+' '+t.cw+'-'+t.cl);out.push('conf rec too many: '+bad.length+' '+bad.slice(0,3));
 return out.join('\n')}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
