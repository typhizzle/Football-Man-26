const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
await pg.evaluate(()=>{let n=0;while(n++<4000&&(S.stage||'hs')!='col'){if(!step())break}});
for(let s=0;s<2;s++){console.log(await pg.evaluate(()=>{const cy=S.cy;let g=0;const out=[];while(S.stage=='col'&&S.cy==cy&&g++<400){const wk=S.wk;step();if(S.wk!=wk&&(S.wk==6||S.wk==13||(S.wk==12)) ){CRC=null;const Cc=crCalc(),T=S.T;const rw=i=>Cc.gl[i].filter(x=>x.w&&Cc.pos[x.o]<=25).length,p4=i=>cfP4(S.col[T[i].cf].n),cc=new Set(S.cch||[]);
 out.push('--- after week '+S.wk+(S.wk>=13?' (title games done)':''));Cc.ord.slice(0,25).forEach((i,k)=>{const L=Cc.gl[i].filter(x=>!x.w).map(x=>'L#'+(Cc.pos[x.o]>130?'NR':Cc.pos[x.o])+'('+x.m+')').join(' ');out.push((k+1)+'. '+T[i].n+' '+Cc.W[i]+'-'+Cc.L[i]+(p4(i)?' P4':'')+(cc.has(i)&&S.wk>=13?' CHAMP':'')+' rw'+rw(i)+' '+L)});
 if(S.wk>=13){const P=cfpField();out.push('PLAYOFF: '+P.f.map(i=>'#'+Cc.pos[i]+' '+T[i].n.split(' ').slice(0,2).join(' ')+(P.auto.includes(i)?'*':'')).join(', '))}}}return out.join('\n')}))}
await b.close()})();
