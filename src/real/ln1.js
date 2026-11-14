const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:500});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();g.paused=0;g.sel=['Run',0];g.stage='line';pui();CAMI=0});
await w(1500);await pg.evaluate(()=>{ovHide();window.idle=null});
// side camera on the line
const cam=async()=>pg.evaluate(()=>{const z=-(g.los||25);window._camOv=1;});
await pg.screenshot({path:SP+'ln_pre.png'});
await pg.evaluate(()=>{hut()});await w(900);await pg.screenshot({path:SP+'ln_snap1.png'});await w(900);await pg.screenshot({path:SP+'ln_snap2.png'});
console.log(await pg.evaluate(()=>'ph '+g.ph+' CAMI '+CAMI));console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));await b.close()})();
