const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const sj=require('fs').readFileSync('/tmp/claude-0/sv/save.json','utf8');
console.log(await pg.evaluate(j=>{SLOT=1;S=mig(JSON.parse(j));const T=S.T,P=cfpField(),rk=crRank(),cn=i=>S.col[T[i].cf].n;return 'AUTO: '+P.auto.map(i=>'#'+(rk.indexOf(i)+1)+' '+T[i].n+' ('+cn(i)+')').join(' | ')+'\nFIELD size '+P.f.length},sj));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
