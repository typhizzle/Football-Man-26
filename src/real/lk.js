const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
console.log(await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));const T=[...S.T].sort((a,b)=>a.ovr-b.ovr),lo=T[5],hi=T[T.length-5];const av=t=>{let s=0;for(let i=0;i<400;i++)s+=gfLkRoll({n:'x'+i,team:t.n});return Math.round(s/400)};const a=av(lo),c=av(hi);S.stage='pro';const p=av(lo);S.stage='col';return lo.n+' '+lo.ovr+':'+a+' | '+hi.n+' '+hi.ovr+':'+c+' | pro:'+p},sj));await b.close()})();
