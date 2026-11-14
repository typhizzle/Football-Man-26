// The make-or-break test. Every roster must end up under its own team, nobody lost,
// nobody renamed, and the player who started this must read correctly.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  // headcount and every name, before
  const roll=()=>{const m=[];Object.keys(S.ro||{}).forEach(k=>{const L=S.ro[k];
    if(Array.isArray(L))L.forEach(x=>{if(x&&x.n)m.push(x.n)})});return m.sort()};
  const before=roll();
  out.peopleBefore=before.length;
  out.auditBefore=roAudit();
  // repair
  const r=roRepair(S);
  out.rostersMoved=r.done;
  out.auditAfter=roAudit();
  const after=roll();
  out.peopleAfter=after.length;
  out.sameExactPeople=(JSON.stringify(before)===JSON.stringify(after));
  // the man who started it
  const find=n=>{for(let i=0;i<S.T.length;i++){const L=S.ro['h.'+i]||[];
    const x=L.find(p=>p&&p.n===n);if(x)return {team:S.T[i].n,ab:TA[i],record:[...new Set((x.h||[]).map(h=>TA[h[1]]))].join('/')}}return null};
  out.axelJean=find('Axel Jean');
  out.tobeyTalarico=find('Tobey Talarico');
  // running it again must be a no-op
  const again=roRepair(S);
  out.secondRunMoves=again.done;
  out.auditAfterSecond=roAudit();
  // and it must survive a save/load round trip
  save();zFlush();const d=load(1);
  const S0=S;S=d;out.auditAfterReload=roAudit();S=S0;
  let n2=0;Object.keys(d.ro||{}).forEach(k=>{if(Array.isArray(d.ro[k]))n2+=d.ro[k].filter(x=>x&&x.n).length});
  out.peopleAfterReload=n2;
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(20),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
