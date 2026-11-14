const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:700});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const SP='/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/';
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/9702da6d-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);hub();wardV('cas','');const ev=[...ui.querySelectorAll('button')].map(b=>b.textContent).filter(t=>/Everywhere/.test(t)).length;const eq=[...ui.querySelectorAll('button')].find(b=>/wrSet\('cas','hx5'\)/.test(b.getAttribute('onclick')||''));eq.click();hub();return 'everywhere buttons '+ev+' last '+S.wear.last},code));
await w(1200);await pg.screenshot({path:SP+'usk2_menu.png'});
console.log(await pg.evaluate(()=>{wardV('lock','');const b=[...ui.querySelectorAll('button')].find(x=>/wrAll\('hx6'\)/.test(x.getAttribute('onclick')||''));if(b)b.click();lroom();return 'wear '+JSON.stringify(S.wear)}));await w(1500);await pg.screenshot({path:SP+'usk2_lock.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
