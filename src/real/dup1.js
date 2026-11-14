const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);
 out.scan=sealDupScan();
 // who in this save has two rows for one year at all? those are the only ones at risk
 const two=[];
 sealWalk(S,x=>{const byY={};
  (x.h||[]).forEach(r=>{if(r&&r[0]!=null)(byY[r[0]]=byY[r[0]]||[]).push(r)});
  Object.keys(byY).forEach(y=>{if(byY[y].length>1)
   two.push(x.n+' '+y+': '+byY[y].map(r=>'ti'+r[1]+' ['+r.slice(2).join(',')+']').join('  AND  '))});
 });
 out.playersWithTwoClubsInOneYear=two;
 out.report=sealReport();
}catch(e){out.err=e.message}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
