const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.tab='Short';g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450))});
console.log(await pg.evaluate(()=>{ovHide();hut();for(let i=0;i<20;i++)upd(.033);const P=g.pl,q=P.qb,d=P.db[0]||P.def[0];intStart(d,{lx:q.x,ly:q.y+12});mvmove(0,80);mvmove(60,0);const a=g.ph+' car='+(P.car===d)+' out='+JSON.stringify(g.out&&g.out.k);for(let i=0;i<900&&g.ph=='live';i++)upd(.033);return a+' -> '+g.ph+' '+JSON.stringify(g.out)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));await b.close()})();
