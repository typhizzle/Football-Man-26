const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c59330c6-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{localStorage.clear();SLOT=1;const s=await readCode(c);localStorage.setItem(K+'_1',JSON.stringify(s));S=load(1);
 const o=S.col.map((c,ci)=>ci+' '+c.n+' p4='+cfP4(c.n)+' n='+S.T.filter(t=>t.cf==ci).length);
 const T=S.T;const os=T.findIndex(t=>/Ohio State/.test(t.n));o.push('OSU '+T[os].cw+'-'+T[os].cl+' '+T[os].w+'-'+T[os].l);
 // count conference games per team in schedule
 const cc=T.map(()=>0);S.csch.forEach(w=>w.forEach(([a,b])=>{if(T[a].cf==T[b].cf){cc[a]++;cc[b]++}}));const h={};cc.forEach(x=>h[x]=(h[x]||0)+1);o.push('sched conf games hist '+JSON.stringify(h)+' OSU '+cc[os]);
 const gw=T.map(()=>0);(S.gr||[]).forEach((w,wi)=>(w||[]).forEach(([a,b])=>{gw[a]++;gw[b]++}));o.push('OSU games played '+gw[os]+' gr weeks '+(S.gr||[]).length+' csch '+S.csch.length);
 confFix();o.push('after fix OSU '+T[os].cw+'-'+T[os].cl);const W2=colSched();const c2=T.map(()=>0);W2.forEach(w=>w.forEach(([a,b])=>{if(T[a].cf==T[b].cf){c2[a]++;c2[b]++}}));const h2={};c2.forEach(x=>h2[x]=(h2[x]||0)+1);o.push('fresh colSched conf hist '+JSON.stringify(h2));const g2=T.map(()=>0);W2.forEach(w=>w.forEach(([a,b])=>{g2[a]++;g2[b]++}));const h3={};g2.forEach(x=>h3[x]=(h3[x]||0)+1);o.push('games hist '+JSON.stringify(h3));return o.join('\n')},code));await b.close()})();
