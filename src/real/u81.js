const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c59330c6-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);
 const o=[];o.push('stage '+S.stage+' cy '+S.cy+' wk '+S.wk+' team '+S.T[0].n+' grK '+grK()+' crh.k '+(S.crh&&S.crh.k)+' snaps '+Object.keys(S.crh&&S.crh.w||{}));
 const H_=(S.crh||{}).w||{};for(const k in H_){o.push('snap '+k+': me #'+(H_[k].indexOf(0)+1))}o.push('keys '+Object.keys(S).filter(k=>/cr|gr/.test(k)).join(','));
 CRC=null;const B=crCalc0();o.push('base me #'+B.pos[0]);CRC=null;const C=crCalc();o.push('final me #'+C.pos[0]+' W'+C.W[0]+' L'+C.L[0]+' gl '+JSON.stringify(C.gl[0].map(x=>[x.wk,x.w?'W':'L',x.o,x.m])));
 o.push('cch '+JSON.stringify(S.cch)+' csch len '+(Array.isArray(S.csch)?S.csch.length:'?')+' gr len '+(S.gr||[]).length);
 return o.join('\n')},code));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));await b.close()})();
