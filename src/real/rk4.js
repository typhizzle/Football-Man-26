const H=require('./h.js'),C=require('/home/claude/t41/ctx.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
await pg.evaluate((DRV)=>{(0,eval)(DRV.replace(/\nvar /g,'\nwindow.').replace(/^var /,'window.'));SLOT=1;newC();start()},C.DRV);
console.log(await pg.evaluate(()=>String(crInertia).includes('hard rules')));
await pg.evaluate(()=>{let n=0;while(n++<4000&&(S.stage||'hs')!='col'){if(!step())break}});
const SEAS=+(process.argv[2]||4);let tot={wd:0,big:0,und3:0,rw:0,h2h:0,maxLossDrop:0};
for(let s=0;s<SEAS;s++){const r=await pg.evaluate(()=>{const log=[],st={wd:0,big:0,und3:0,rw:0,h2h:0,mld:0};let prev=null,g=0;const cy=S.cy;
 while(S.stage=='col'&&S.cy==cy&&g++<400){const wk=S.wk;step();if(S.wk!=wk){CRC=null;const Cc=crCalc(),ord=Cc.ord,pos=Cc.pos;
  if(prev){const P={};prev.forEach((t,k)=>P[t]=k+1);
   prev.slice(0,50).forEach((t,k)=>{const p=k+1,np=pos[t],nw=Cc.gl[t].filter(x=>x.wk>=wk);if(!nw.length)return;const lost=nw.some(x=>!x.w);
    if(!lost&&np>p+2){st.wd++;log.push(`wk${wk} WIN-DROP ${S.T[t].n} #${p}->#${np}`)}if(lost)st.mld=Math.max(st.mld,np-p);if(lost&&np-p>20&&p<=25)log.push(`wk${wk} BIGLOSS ${S.T[t].n} #${p}->#${np}`)});
   ord.slice(0,25).forEach((t,k)=>{const p=P[t]||999;if(p>60&&S.wk>3){st.big++;log.push(`wk${wk} JUMP ${S.T[t].n} #${p}->#${k+1}`)}})}
  ord.slice(0,40).forEach((t,k)=>{if(Cc.L[t]>=3){const u=ord.slice(k+1,60).find(x=>Cc.L[x]==0&&Cc.W[x]>=3);if(u!=null){st.und3++}}});
  if(S.wk>=13){const top=ord.slice(0,40),pos=Cc.pos,rwq=i=>Cc.gl[i].filter(x=>x.w&&pos[x.o]<=25).length;top.forEach(b=>Cc.gl[b].filter(x=>x.w).forEach(x=>{const a=x.o;if(Cc.L[a]==Cc.L[b]&&pos[a]<pos[b]&&pos[b]<=40){const aR=Cc.gl[a].filter(y=>!y.w).every(y=>pos[y.o]<=25),bB=Cc.gl[b].some(y=>!y.w&&pos[y.o]>25);const circ=Cc.gl[a].some(y=>y.o==b&&y.w)||ord.slice(pos[a]-1,pos[b]-1).some(t=>t!=a&&Cc.gl[t].some(y=>y.o==b&&y.w))||pos[b]-pos[a]>20;if(!(aR&&bB&&(x.m||0)<=7)&&!circ){st.h2h++;log.push('H2H '+S.T[b].n+' beat '+S.T[a].n+' but #'+pos[b]+' vs #'+pos[a])}}}))}
  prev=ord.slice()}}
 return {st,log:log.slice(0,15)}});
 for(const k in tot)if(r.st[k]!=null)tot[k]+=r.st[k];tot.maxLossDrop=Math.max(tot.maxLossDrop,r.st.mld);console.log('SEASON',s,JSON.stringify(r.st),'\n'+r.log.join('\n'))}
console.log('TOTAL',JSON.stringify(tot));console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
