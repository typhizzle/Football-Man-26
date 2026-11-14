const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:420,h:640});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1500);const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
await pg.evaluate(()=>{SLOT=1;newC();start();S.inv=(S.inv||[]).concat(['hx1','hx2','hx3']);save();hub()});
for(const id of ['hx1','hx2','hx3']){await pg.evaluate(id=>{wrSet('lock',id);hub();ui.style.display='none';ov.style.display='none'},id);await w(1200);await pg.screenshot({path:SP+'day7_'+id+'.png'})}
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
