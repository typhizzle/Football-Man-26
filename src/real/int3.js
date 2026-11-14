const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.tab='Short';g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));
 window.LOG=[];const de=drvEnd;window.drvEnd=function(nx,tx){LOG.push('drvEnd '+nx+' '+tx);return de.apply(this,arguments)};
 window.STEP=(n)=>{for(let i=0;i<n;i++){if(g.ph=='live')upd(.033);else if(g.ph=='dead'){g.dt-=.033;if(g.dt<=0){after();return 'after'}}else return g.ph}return g.ph}});
for(let t=0;t<4;t++){
 const r=await pg.evaluate((t)=>{ovHide();if(g.ph!='pre'){return 'not pre: '+g.ph}const y0=g.y;hut();for(let i=0;i<20;i++)upd(.033);const P=g.pl,q=P.qb;
  if(t%2==0){const d=P.db[0]||P.def[0];intStart(d,{lx:q.x,ly:q.y+12})}else{const d=P.db[0];P.wInt=d;doThrow(d,d.x,d.y)}
  const s=STEP(900);return 'y0='+y0+' end='+s+' out='+JSON.stringify(g.out)+' LOG='+LOG.splice(0).join(';')+' ph='+g.ph+' ov='+(ov.style.display!='none'?ov.innerText.slice(0,50):'')},t);
 console.log(t,r);
 await pg.evaluate(()=>{try{if(g.ph=='opp')applyO()}catch(e){console.log('ERR',e.message)}const bt=[...ov.querySelectorAll('button')];if(ov.style.display!='none'&&bt.length)bt[0].click()});await wait(300);
 console.log('  now',await pg.evaluate(()=>g.ph+' y='+g.y+' dn='+g.dn+' s='+g.s+' ov='+(ov.style.display!='none'?ov.innerText.slice(0,70):'')));
}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));await b.close()})();
