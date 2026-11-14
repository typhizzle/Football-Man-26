const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:800,h:500});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
await pg.evaluate(async()=>{SLOT=1;newC();start();startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();g.paused=0;g.sel=['Run',0];g.stage='line';pui();CAMI=0});
await w(800);await pg.evaluate(()=>{ovHide();hut()});await w(1500);
console.log(await pg.evaluate(()=>{const P=g.pl;g.paused=1;const c=P.car||P.qb;const st0=g.st.fum;fumStart(c,c.y,false);let n=0,log=[];while(n++<600&&g.ph=='fum'){fumTick(1/60);if(n%30==0){try{draw()}catch(e){log.push('draw err '+e.message)}}}return 'frames '+n+' ph '+g.ph+' done '+P.done+' msg '+(g.msg||'')+' fum stat '+st0+'->'+g.st.fum+' '+log.slice(0,3)}));
await pg.evaluate(()=>{g.paused=0});await w(800);await pg.screenshot({path:SP+'fum.png'});
// visual mid-fumble
await pg.evaluate(()=>{});console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
