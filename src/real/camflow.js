const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p';const {b,pg,errs}=await H.open({w:W,h:Hh});
const sh=async n=>{await new Promise(r=>setTimeout(r,1400));await pg.screenshot({path:`/home/claude/real/cf_${n}_${tag}.png`})};
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');CAMI=0;g.sel=['Deep',0];g.stage='line';pui()});await sh('a');
await pg.evaluate(async()=>{hut()});await new Promise(r=>setTimeout(r,700));await pg.evaluate(()=>{g.paused=1});await sh('b');
await pg.evaluate(()=>{const P=g.pl;P.car=P.wr[1];P.passed=true;P.car.y=g.los+18;P.car.x=40;g.paused=1});await sh('c');
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
