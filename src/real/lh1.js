const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
const info=await pg.evaluate(()=>{SLOT=1;newC();start();hub();const hasBtn=[...ui.querySelectorAll('button')].some(b=>/League history/.test(b.textContent));lhV('sb');return {hasBtn,pro:!!S.pro,n:ui.querySelectorAll('.card').length,first:ui.querySelectorAll('.card')[0].innerText,last:[...ui.querySelectorAll('.card')].pop().innerText}});console.log(JSON.stringify(info,null,1));
await pg.screenshot({path:SP+'lh_sb.png'});
await pg.evaluate(()=>lhV('aw'));await pg.screenshot({path:SP+'lh_aw.png'});
await pg.evaluate(()=>lhV('tm'));await pg.screenshot({path:SP+'lh_tm.png'});console.log(await pg.evaluate(()=>ui.innerText.slice(0,600)));
await pg.evaluate(()=>{LHV.q='Brody';lhV('sb')});console.log('search',await pg.evaluate(()=>ui.querySelectorAll('.card').length));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));await b.close()})();
