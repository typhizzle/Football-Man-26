const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c59330c6-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);confFix();crReplay();CRC=null;const C=crCalc(),T=S.T,sr=window._SR;
 const o=[];const by={};T.forEach((t,i)=>{(by[t.cf]=by[t.cf]||[]).push(sr[i])});o.push(Object.keys(by).map(k=>S.col[k].n.split(' ')[0]+' '+(by[k].reduce((a,b)=>a+b,0)/by[k].length).toFixed(1)).join(' | '));
 // non-conf record by conference
 const nc={};T.forEach((t,i)=>C.gl[i].forEach(x=>{if(T[x.o].cf!=t.cf){const k=S.col[t.cf].n.split(' ')[0];nc[k]=nc[k]||[0,0];nc[k][x.w?0:1]++}}));o.push('nonconf W-L: '+Object.keys(nc).map(k=>k+' '+nc[k].join('-')).join(' | '));
 o.push('top SR: '+T.map((t,i)=>i).sort((a,b)=>sr[b]-sr[a]).slice(0,15).map(i=>T[i].n.split(' ').slice(0,2).join(' ')+' '+sr[i].toFixed(1)).join(', '));
 return o.join('\n')},code));await b.close()})();
