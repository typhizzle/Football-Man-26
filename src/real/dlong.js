const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const OLD=process.argv[2]=='old';
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');await new Promise(r=>setTimeout(r,450))});
const r=await pg.evaluate(async(OLD)=>{if(OLD){icpt=(d,t,ld)=>[t.x+(t.vx||0)*ld,t.y+(t.vy||0)*ld]}const L=[];let long=0,n=0;
 for(let k=0;k<300;k++){g.ph='pre';g.watch=0;g.sw=0;g.y=25;g.dn=1;g.tg=10;g.clk=600;setup(0);g.sel=['Run',k%6];g.stage='line';g.ui=0;hut();const P=g.pl;if(P.call.t!='run')continue;n++;let i=0;for(;i<1200&&g.ph=='live'&&!P.done;i++)upd(.033);
  if(P.t>9){long++;if(L.length<5)L.push(['t',P.t.toFixed(1),'car',P.car&&P.car.pos,P.car&&P.car.x.toFixed(1),P.car&&P.car.y.toFixed(1),'done',P.done,'dc',P.dc,'near',Math.min(...P.def.map(d=>Math.hypot(d.x-P.car.x,d.y-P.car.y))).toFixed(1)].join(' '))}}
 return {n,long,L}},OLD);console.log(JSON.stringify(r,null,1));await b.close()})();
