const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:700});const w=ms=>new Promise(r=>setTimeout(r,ms));await w(1200);
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/9702da6d-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);const o=[];
 o.push('stage '+S.stage+' name '+S.name+' inv '+JSON.stringify(S.inv)+' wear '+JSON.stringify(S.wear)+' cos '+S.cos+' hwd '+JSON.stringify(S.hwd)+' hwg '+S.hwg+' ap '+JSON.stringify(S.ap));
 hub();o.push('after hub inv '+JSON.stringify(S.inv)+' wear '+JSON.stringify(S.wear));
 const id=(S.wear&&S.wear.cas)||'hx4';let m=null;try{m=outfitM(id)}catch(e){o.push('outfitM err '+e.message)}o.push('outfitM('+id+') '+!!m);
 return o.join('\n')},code));
await w(1200);await pg.screenshot({path:'/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/usk_menu.png'});
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
