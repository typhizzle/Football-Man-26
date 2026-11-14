const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c59330c6-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);confFix();crReplay();CRC=null;const C=crCalc(),T=S.T;
 const rw=i=>C.gl[i].filter(x=>x.w&&C.pos[x.o]<=25).length;
 const R_=window._RS,ro=T.map((t,i)=>i).sort((a,b)=>R_[b]-R_[a]);const o=['me poll #'+C.pos[0]+' resume #'+(ro.indexOf(0)+1)];o.push(ro.slice(0,30).map((i,k)=>(k+1)+'. '+T[i].n+' '+C.W[i]+'-'+C.L[i]+' RS '+R_[i].toFixed(1)+(cfP4(S.col[T[i].cf].n)?' P4':'')).join('\n'));return o.join('\n');
 o.push(C.ord.slice(0,30).map((i,k)=>(k+1)+'. '+T[i].n+' '+C.W[i]+'-'+C.L[i]+' rw'+rw(i)+' conf '+T[i].cw+'-'+T[i].cl+(cfP4(S.col[T[i].cf].n)?' P4':'')).join('\n'));
 return o.join('\n')},code));await b.close()})();
