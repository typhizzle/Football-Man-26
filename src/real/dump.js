const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});await new Promise(r=>setTimeout(r,1500));
const d=await pg.evaluate(()=>({PKS:PKS.map(q=>[TA[q[0]],q[1],POSL[q[1]],q[2],q[3],q[4],q[5],q[6]||'']),QBB:QBB.map(b=>[TA[b[3]],...b]),QBP:QBP.map((q,i)=>[TA[i],...q])}));
require('fs').writeFileSync('/home/claude/real/roster_dump.json',JSON.stringify(d,null,0));console.log(d.PKS.length,d.QBB.length,d.QBP.length);await b.close()})();
