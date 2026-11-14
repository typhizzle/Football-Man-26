const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
console.log(await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));const C=crCalc(),rk=crRank(),chs=crChamps(),P=cfpField(),T=S.T,cn=i=>S.col[T[i].cf].n;
 const out=['TOP 20:'];rk.slice(0,20).forEach((i,k)=>out.push((k+1)+'. '+T[i].n+' ('+cn(i)+') '+crRec(i)+' conf '+(T[i].cw||0)+'-'+(T[i].cl||0)+(chs.includes(i)?' [conf leader]':'')+(P.f.includes(i)?' IN':'')));
 const acc=S.col.findIndex(c=>/Atlantic/.test(c.n));out.push('ACC teams by rank:');rk.map((i,k)=>[i,k]).filter(([i])=>T[i].cf==acc).slice(0,6).forEach(([i,k])=>out.push('  #'+(k+1)+' '+T[i].n+' '+crRec(i)+' conf '+(T[i].cw||0)+'-'+(T[i].cl||0)+(chs.includes(i)?' LEADER':'')));
 out.push('champs ranked: '+chs.map(i=>rk.indexOf(i)+1+':'+cn(i).slice(0,14)).sort((a,b)=>parseInt(a)-parseInt(b)).slice(0,8).join(', '));return out.join('\n')},sj));
await b.close()})();
