const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:500});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const r=await pg.evaluate(async()=>{const o=[];const sl=ms=>new Promise(r=>setTimeout(r,ms));SLOT=1;newC();start();startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();g.paused=0;
 // field goal from the Special menu
 g.y=70;g.los=70;g.dn=4;g.tg=5;g.stage='call';g.cat='Special';pui();const btn=[...document.querySelectorAll('button')].find(e=>/^Special/.test(e.textContent.trim()));if(btn)btn.click();await sl(100);const fgCard=[...document.querySelectorAll('*')].find(e=>e.children.length==0&&/Field Goal/.test(e.textContent));o.push('FG card: '+(fgCard?fgCard.textContent:'none'));pick('Special',1);await sl(450);hut();o.push('after hut ph '+g.ph+' kk '+!!g.kk);let n=0;while(n++<400&&g.ph=='kick'){kTick(1/60)}o.push('kick resolved, ph '+g.ph+' msg '+(g.msg||g.note||''));
 // punt
 ovHide();g.ph='pre';g.y=30;g.los=30;g.dn=4;g.tg=8;pick('Special',0);await sl(450);hut();o.push('punt ph '+g.ph+' kk '+!!g.kk);n=0;while(n++<600&&g.ph=='kick'){kTick(1/60)}o.push('punt resolved, ph '+g.ph);
 return o.join('\n')});console.log(r);
// interception return: force an INT and steer the QB into the returner
console.log(await pg.evaluate(()=>{try{ovHide();g.ph='pre';g.y=40;g.los=40;g.dn=1;g.tg=10;g.sel=['Short',0];g.stage='line';setup(0);g.ui=0;pui();hut();const P=g.pl;const d=P.db[0];P.ir={d,t:0,tk:0};d.x=P.qb.x;d.y=P.qb.y+12;let n=0;while(n++<900&&!P.done){const dx=d.x-P.qb.x,dy=d.y-P.qb.y,l=Math.hypot(dx,dy)||1;inp={x:dx/l,y:dy/l};intTick(P,1/60)}return 'INT return over: done '+P.done+' msg '+(g.msg||'')}catch(e){return 'INT err '+e.message}}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
