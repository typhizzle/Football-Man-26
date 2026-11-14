// Why does lgDraft() never produce a class? Call it directly and watch.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const warns=[];pg.on('console',m=>{if(m.type()=='warning'||m.type()=='warn')warns.push(m.text())});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const o={yr:yrN(),stage:S.stage};
  o.teamsLen=(()=>{try{return lgTeams().length}catch(e){return 'ERR '+e.message}})();
  o.classLen=(()=>{try{const P=lgClass(yrN());return Array.isArray(P)?P.length:typeof P}catch(e){return 'ERR '+e.message}})();
  o.classSample=(()=>{try{return (lgClass(yrN())||[]).slice(0,4).map(p=>p.n+' '+p.pos+' '+p.ovr)}catch(e){return []}})();
  // call the draft directly and report the exact failure if any
  try{const res=lgDraft();o.draftReturn=Array.isArray(res)?('picks:'+res.length):String(res)}
  catch(e){o.draftThrew=e.message+' | '+(e.stack||'').split('\n')[1]}
  o.dcAfter=Object.keys(S.dc||{});
  o.dcPicks=o.dcAfter.map(y=>y+':'+((S.dc[y].picks||[]).length));
  o.lgPh=S.lgPh;
  return o;
 },save);
 console.log(JSON.stringify(out,null,1));
 console.log('console.warn:',warns.slice(0,5));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
