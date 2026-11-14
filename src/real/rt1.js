const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:500});await new Promise(r=>setTimeout(r,1200));
console.log(await pg.evaluate(()=>{SLOT=1;newC();start();startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();g.sel=['Run',0];g.stage='line';pui();hut();const P=g.pl,L=rost('h.0');
 return 'OL '+P.ol.map((o,i)=>o.fn+':'+L[6+i].ovr+'->blk '+Math.round(o.blk)).join(', ')+'\nDL '+P.dl.slice(0,4).map(o=>o.fn+' rush '+Math.round(o.rush)).join(', ')+'\nRB '+P.rb.fn+' ovr '+L[1].ovr+' sp '+P.rb.sp.toFixed(2)+' elu '+Math.round(P.rb.elu)}));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
