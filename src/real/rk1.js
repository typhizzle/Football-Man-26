const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
await pg.evaluate(()=>{let n=0;while(n++<4000&&(S.stage||'hs')!='col'){if(!step())break}});
for(let season=0;season<2;season++){
const out=await pg.evaluate(()=>{const log=[];let prev=null,guard=0;const cy=S.cy;
 while(S.stage=='col'&&S.cy==cy&&guard++<400){const wk=S.wk;step();if(S.wk!=wk&&S.wk>1){CRC=null;const Cc=crCalc(),ord=Cc.ord;if(prev){const P={};prev.forEach((t,k)=>P[t]=k+1);
   prev.slice(0,25).forEach((t,k)=>{const p=k+1,np=Cc.pos[t],nw=Cc.gl[t].filter(x=>x.wk==wk);if(!nw.length)return;const lost=nw.some(x=>!x.w);
    if(!lost&&np>p+2)log.push(`wk${wk} WIN-DROP ${S.T[t].n} #${p}->#${np}`);
    if(lost){const o=nw.find(x=>!x.w).o;log.push(`wk${wk} loss ${S.T[t].n} #${p}->#${np} (lost to #${P[o]||'NR'} ${S.T[o].n}, ${nw[0].s.join('-')}) rankedWins=${Cc.gl[t].filter(x=>x.w&&Cc.pos[x.o]<=25).length}`)}});
   // undefeated w/ 2 ranked wins behind a 1-loss team w/ 0 ranked wins?
   ord.forEach((t,k)=>{if(Cc.L[t]==0&&Cc.gl[t].filter(x=>x.w&&Cc.pos[x.o]<=25).length>=2){const bad=ord.slice(0,k).find(u=>Cc.L[u]==1&&Cc.gl[u].filter(x=>x.w&&Cc.pos[x.o]<=25).length==0);if(bad!=null)log.push('RULE ' +S.T[t].n+' behind '+S.T[bad].n)}})}
  prev=ord.slice(0,40)}}
 return log});
console.log('SEASON',season,'\n'+out.join('\n'));}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
