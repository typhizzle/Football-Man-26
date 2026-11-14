const H=require('./h.js');(async()=>{const W=+process.argv[2]||390,Hh=+process.argv[3]||844,tag=process.argv[4]||'p';const {b,pg,errs}=await H.open({w:W,h:Hh});
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');g.sel=['Short',0];g.stage='line';pui();CAMI=1;await new Promise(r=>setTimeout(r,450));hut();await new Promise(r=>setTimeout(r,500));g.paused=1});
const P=['ready','hold','aim','rel','fin','tuck','hand'];
for(const p of P){await pg.evaluate(p=>{const x=FPP[p];FPA.force={R:x.R,L:x.L,B:x.B||null,ball:!!x.B}},p);await new Promise(r=>setTimeout(r,450));await pg.screenshot({path:`/home/claude/real/fp/${p}_${tag}.png`})}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)));await b.close()})();
