const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const wait=ms=>new Promise(r=>setTimeout(r,ms));
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.tab='Short';g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));
 window.LOG=[];const de=drvEnd;window.drvEnd=function(nx,tx){LOG.push('drvEnd '+nx+' '+tx);return de.apply(this,arguments)};const af=after;window.after=function(){LOG.push('after '+JSON.stringify(g.out));return af.apply(this,arguments)};const ob=oppBall;window.oppBall=function(){LOG.push('oppBall');return ob.apply(this,arguments)}});
for(let t=0;t<2;t++){
 await pg.evaluate(()=>{ovHide();hut()});await wait(600);
 await pg.evaluate((t)=>{const P=g.pl,q=P.qb;LOG.push('snap ph='+g.ph+' y='+g.y);if(t==0){const d=P.db[0]||P.def[0];intStart(d,{lx:q.x,ly:q.y+12})}else{const d=P.db[0];doThrow(d,d.x,d.y)}},t);
 for(let k=0;k<30;k++){await wait(300);const ph=await pg.evaluate(()=>g.ph+'|'+(ov.style.display!='none'?ov.innerText.slice(0,50):''));if(/have the ball/.test(ph)){break}}
 console.log(t,await pg.evaluate(()=>LOG.splice(0).join(' ; ')+' paused='+g.paused+' cv='+cv.style.display+' dt='+g.dt+' TSG='+!!TSG+' || ph='+g.ph+' ov='+(ov.style.display!='none'?ov.innerText.slice(0,60):'')));
 await pg.evaluate(()=>{try{applyO()}catch(e){LOG.push('applyO err '+e.message)}ovHide()});await wait(1200);
 console.log('  after applyO',await pg.evaluate(()=>LOG.splice(0).join(' ; ')+' || ph='+g.ph+' y='+g.y+' s='+g.s+' ov='+(ov.style.display!='none'?ov.innerText.slice(0,60):'')));
}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));await b.close()})();
