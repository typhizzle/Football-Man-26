const H=require('./h.js');(async()=>{const W=390,Hh=844;const {b,pg,errs}=await H.open({w:W,h:Hh});
const r=await pg.evaluate(async()=>{cv.setPointerCapture=()=>{};SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));CAMI=1;LY=0;LP=-.04;hut();await new Promise(r=>setTimeout(r,1250));
 const log=[],ev=(t,x,y)=>{cv.dispatchEvent(new PointerEvent(t,{pointerId:7,clientX:x,clientY:y,bubbles:true}));log.push(t+' lk:'+(lk?JSON.stringify({p:lk.pend,id:lk.id}):'-')+' swp:'+(swp?swp.pts.length:'-')+' aim:'+(aim?1:0)+' air:'+!!g.pl.air+' ok:'+swOK())};
 const x0=W/2,y0=H*.62;ev('pointerdown',x0,y0);for(let i=1;i<=6;i++){await new Promise(r=>setTimeout(r,20));ev('pointermove',x0,y0-i*30)}ev('pointerup',x0,y0-180);return log});
console.log(r.join('\n'));console.log(JSON.stringify(errs));await b.close()})();
