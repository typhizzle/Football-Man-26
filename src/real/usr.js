const H=require('./h.js');(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
const code=require('fs').readFileSync('/mnt/user-data/attachments/c57e6934-02ef-509f-85a1-506e72ebaaa1/c9f41c92-attachment.txt','utf8').trim();
console.log(await pg.evaluate(async c=>{SLOT=1;S=await readCode(c);CRC=null;const C=crCalc(),rk=C.ord,chs=crChamps(),P=cfpField(),T=S.T,cn=i=>S.col[T[i].cf].n;const o=['stage '+S.stage+' wk '+S.wk+' cch '+JSON.stringify(S.cch)];
 o.push('LEADERS: '+chs.map(i=>'#'+C.pos[i]+' '+T[i].n+' ['+cn(i)+'] conf '+(T[i].cw||0)+'-'+(T[i].cl||0)).sort((a,b)=>parseInt(a.slice(1))-parseInt(b.slice(1))).join('\n  '));
 o.push('AUTO: '+P.auto.map(i=>'#'+C.pos[i]+' '+T[i].n).join(', '));o.push('FIELD: '+P.f.map(i=>'#'+C.pos[i]+' '+T[i].n).join(', '));
 const acc=S.col.findIndex(c=>/Atlantic/.test(c.n));o.push('ACC by rank: '+rk.filter(i=>T[i].cf==acc).slice(0,6).map(i=>'#'+C.pos[i]+' '+T[i].n+' '+(T[i].cw||0)+'-'+(T[i].cl||0)+' cf='+T[i].cf).join(' | '));
 o.push('LOU: '+(()=>{const i=T.findIndex(t=>/Louisville/.test(t.n));return crRec(i)+' '+crWhy(i)})());return o.join('\n')},code));
console.log(errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));await b.close()})();
