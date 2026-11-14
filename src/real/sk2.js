const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:700});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
await pg.evaluate(()=>{SLOT=1;newC();start();S.hwd={c:[]};hwClaim();wardV('cas','');wrSet('cas','hx5');hub()});await w(1500);await pg.screenshot({path:SP+'sk_menu.png'});
await pg.evaluate(()=>{homeWalk()});await w(1800);await pg.screenshot({path:SP+'sk_home.png'});
await pg.evaluate(()=>{lrExit();wrSet&&0;wardV('lock','');wrSet('lock','hx4');lroom()});await w(1800);await pg.screenshot({path:SP+'sk_lock.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
