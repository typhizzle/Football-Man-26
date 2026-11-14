const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:1000,h:460});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();g.paused=0;pick('Short',0)});await w(800);
for(const want of ['Flick view','TV broadcast']){await pg.evaluate(t=>{for(let k=0;k<7&&CN4[CAMI]!=t;k++)camb();ovHide()},want);await w(900);await pg.screenshot({path:SP+'ln_'+want.replace(' ','_')+'.png'})}
const d=await pg.evaluate(()=>{const P=g.pl;return {ol:P.ol.map(o=>o.y.toFixed(2)),dl:P.dl.map(o=>o.y.toFixed(2)),los:(P.los??P.y0??'?')}});console.log(JSON.stringify(d));
await pg.evaluate(()=>hut());await w(700);await pg.screenshot({path:SP+'ln_tv_snap.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
