const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
await pg.evaluate(()=>{let n=0;while(n++<4000&&(S.stage||'hs')!='col'){if(!step())break}});
for(let s=0;s<3;s++){
console.log(await pg.evaluate(()=>{const log=[];let g=0;const cy=S.cy;while(S.stage=='col'&&S.cy==cy&&S.wk<12&&g++<400)step();
 CRC=null;const A=crCalc(),prev=A.ord.slice(0,40),wk=S.wk;g=0;while(S.wk==wk&&S.stage=='col'&&g++<50)step();
 CRC=null;const B0=crCalc0();CRC=null;const B=crCalc();
 prev.slice(0,25).forEach((t,k)=>{const p=k+1,np=B.pos[t],nw=B.gl[t].filter(x=>x.wk>=wk);if(np>p+2&&!nw.some(x=>!x.w))log.push(`${S.T[t].n} #${p}->#${np} base#${B0.pos[t]} games ${JSON.stringify(B.gl[t].filter(x=>x.wk>=wk-1).map(x=>[x.wk,x.w,prev.indexOf(x.o)+1]))} cch ${(S.cch||[]).includes(t)} L=${B.L[t]} W=${B.W[t]}`)});
 log.push('wk '+wk+'->'+S.wk+' cch '+JSON.stringify((S.cch||[]).slice(0,14))+' snaps '+Object.keys(S.crh.w));
 g=0;while(S.stage=='col'&&S.cy==cy&&g++<400)step();return log.join('\n')}));}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
