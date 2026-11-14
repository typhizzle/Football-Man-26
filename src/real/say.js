const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:700});await new Promise(r=>setTimeout(r,1200));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/9702da6d-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);hub();const o=['tk '+!!S.tk+' tkPend '+S.tkPend+' py '+S.py+' wk '+S.wk+' yrN '+yrN()+' npb '+Object.keys(S.npb||{})];
 const f=n=>{for(const k in S.ro){const L=S.ro[k];if(Array.isArray(L)){const i=L.findIndex(x=>x&&x.n==n);if(i>=0)return k+':'+i+' '+tn(S.T[+k.slice(2)])+' ovr '+L[i].ovr}}return 'none'};
 o.push('Sayin: '+f('Watchu BiSayin')+' | Hilton: '+f('Jacque Hilton')+' | QBB Hilton '+JSON.stringify(QBB.find(b=>b[0]=='Jacque Hilton')));
 o.push('drafted npx: '+S.npx.filter(p=>p.pro).length+' yrs '+[...new Set(S.npx.filter(p=>p.pro).map(p=>p.pro.yr))]);const phi=S.T.findIndex(t=>pIdx(t)==16);o.push('PHI h.'+phi+' QBs '+rost('h.'+phi).filter((x,k)=>k==0||k>=23).map(x=>x.n+' '+x.ovr).join(', '));
 return o.join('\n')},code));await b.close()})();
