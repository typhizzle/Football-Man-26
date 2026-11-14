const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c9f41c92-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{SLOT=1;S=await readCode(c);CRC=null;const C=crCalc(),T=S.T,i=0;return T[0].n+' overall '+crRec(0)+' (T.w-l '+T[0].w+'-'+T[0].l+') conf '+T[0].cw+'-'+T[0].cl+' rank #'+C.pos[0]+' | '+crWhy(0)+' | sched conf games: '+(S.csch||[]).filter(w=>(w||[]).some(([a,b])=>(a==0||b==0)&&T[a].cf==T[b].cf)).length},code));
await b.close()})();
