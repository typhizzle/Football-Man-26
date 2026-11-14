const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c59330c6-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);confFix();crReplay();CRC=null;const C=crCalc(),T=S.T,P=cfpField();
 const o=['eligible: '+cfpConfs().map(ci=>S.col[ci].n).join(', '),'mine: '+S.col[T[0].cf].n+' eligible '+cfpEl(0)];
 o.push('FIELD: '+P.f.map(i=>'#'+C.pos[i]+' '+T[i].n+(P.auto.includes(i)?' (auto)':'')).join(' | '));
 o.push('champs: '+crChamps().map(i=>'#'+C.pos[i]+' '+T[i].n+' '+S.col[T[i].cf].n).join(' | '));
 crV('t25');o.push('T25 view: '+ui.innerText.slice(0,500).replace(/\n/g,' / '));return o.join('\n')},code));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));await b.close()})();
