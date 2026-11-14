// Identity audit: across repeated loads, nobody may be renamed, deleted, or moved.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';save();zFlush();
  const census=()=>{
   const d=load(1);const m={people:{},where:{},counts:{}};
   (d.T||[]).forEach((t,i)=>{let L;try{const old=S;S=d;L=rost('h.'+i);S=old}catch(e){return}
    (L||[]).forEach((x,k)=>{if(!x||!x.n)return;m.people[x.n]=(m.people[x.n]||0)+1;m.where[x.n]=i+':'+k});
   });
   try{(d.ro&&d.ro.fa||[]).forEach(x=>{if(x&&x.n){m.people[x.n]=(m.people[x.n]||0)+1;m.where[x.n]='FA'}})}catch(e){}
   try{(d.retd||[]).forEach(x=>{if(x&&x.n){m.people[x.n]=(m.people[x.n]||0)+1;m.where[x.n]='retired'}})}catch(e){}
   // friends, family, phone contacts
   try{((d.ph&&d.ph.c)||[]).forEach(c=>{if(c&&c.n){m.people[c.n]=(m.people[c.n]||0)+1;m.where[c.n]='contact'}})}catch(e){}
   m.counts.total=Object.keys(m.people).length;
   return m;
  };
  const A=census(),B=census(),C=census();
  const namesA=Object.keys(A.people),namesB=Object.keys(B.people),namesC=Object.keys(C.people);
  const gone=namesA.filter(n=>!B.people[n]).concat(namesA.filter(n=>!C.people[n]));
  const appeared=namesB.filter(n=>!A.people[n]).concat(namesC.filter(n=>!A.people[n]));
  const moved=namesA.filter(n=>B.people[n]&&A.where[n]!==B.where[n])
               .concat(namesA.filter(n=>C.people[n]&&A.where[n]!==C.where[n]));
  return {
   headcount:[A.counts.total,B.counts.total,C.counts.total],
   disappeared:[...new Set(gone)].slice(0,8),
   appearedFromNowhere:[...new Set(appeared)].slice(0,8),
   changedTeamOrSlot:[...new Set(moved)].slice(0,8).map(n=>n+' '+A.where[n]+' -> '+(B.where[n]||C.where[n])),
   stable:(gone.length===0&&appeared.length===0&&moved.length===0)
  };
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(22),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
