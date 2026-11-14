const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
console.log(await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));CRC=null;const C=crCalc();let bad=[];C.ord.forEach((i,k)=>{if(C.pos[i]!=k+1)bad.push(S.T[i].n+' ord#'+(k+1)+' pos#'+C.pos[i])});return bad.length+' mismatches: '+bad.slice(0,10).join(' | ')},sj));
await b.close()})();
