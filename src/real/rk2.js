const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
await pg.evaluate(()=>{let n=0;while(n++<4000&&(S.stage||'hs')!='col'){if(!step())break}});
console.log(await pg.evaluate(()=>{const log=[];let guard=0,prev=null;const cy=S.cy;while(S.stage=='col'&&S.cy==cy&&guard++<400){const wk=S.wk,cch=(S.cch||[]).length;step();if(S.wk!=wk||(S.cch||[]).length!=cch){CRC=null;const Cc=crCalc();const keys=Object.keys(S.crh&&S.crh.w||{}).join(',');log.push('wk '+wk+'->'+S.wk+' cch='+(S.cch||[]).length+' snaps='+keys+' inr='+Cc.inr+' grLen='+(S.gr||[]).length+' gamesThisWk='+((S.gr||[])[wk]||[]).length+' top5='+Cc.ord.slice(0,5).map(i=>S.T[i].n.split(' ')[0]).join(','))}}return log.join('\n')}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
