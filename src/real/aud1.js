const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 const EXP={q:6,r:4,w:2,d:1,b:2};  // expected value count per group
 const short={},full={},rowYears={};
 const tmIssues=[],players=[];
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{
   if(!x||!x.n)return;
   const g=SG(x.pos);
   players.push(1);
   (x.h||[]).forEach(h=>{
    const vals=h.length-2, want=EXP[g];
    rowYears[h[0]]=(rowYears[h[0]]||0)+1;
    if(want!=null){const k=g+' got'+vals+' want'+want;
     if(vals<want)short[k]=(short[k]||0)+1; else full[k]=(full[k]||0)+1}
   });
   // teams his seasons say he played for, vs what tm claims
   const fromRows=[];
   (x.h||[]).forEach(h=>{const a=tSlot(h[1]);if(a&&fromRows.indexOf(a)<0)fromRows.push(a)});
   const cur=tSlot(i);
   const tm=(x.tm||[]).filter(Boolean);
   const unjustified=tm.filter(a=>fromRows.indexOf(a)<0&&a!==cur);
   const missing=fromRows.filter(a=>tm.indexOf(a)<0);
   if(unjustified.length||missing.length)
    tmIssues.push({n:x.n,pos:x.pos,on:cur,tm,fromRows,rows:(x.h||[]).length,unjustified,missing});
  });}
 out.players=players.length;
 out.rowShapes={short,full};
 out.years=Object.keys(rowYears).sort();
 out.tmIssueCount=tmIssues.length;
 out.tmSample=tmIssues.slice(0,10);
 out.nowYear=(typeof yrN=='function')?yrN():null;
 out.scheduleWeeks=Object.keys(S.gr||{}).length;
 out.storedBoxScores=Object.keys(S.bx||{}).length;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
