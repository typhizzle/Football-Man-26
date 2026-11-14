const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p';const {b,pg,errs}=await H.open({w:W,h:Hh,file:process.argv[5]});
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Deep',0];g.stage='line';pui();await new Promise(r=>setTimeout(r,450));hut();});
for(const c of [0,1,2,3,4,5]){await pg.evaluate(async c=>{CAMI=c;g.paused=1;},c);await new Promise(r=>setTimeout(r,c==0?900:300));await pg.screenshot({path:`/home/claude/real/c${c}_${tag}.png`})}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
