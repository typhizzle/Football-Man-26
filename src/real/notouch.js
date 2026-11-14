// Loading an EXISTING save must change nothing: no player, no team, no stat, no award.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);
  // the untouched original, straight from the code, before anything runs on it
  const raw=JSON.parse(JSON.stringify(s));
  S=s;SLOT=1;LASTJ='';save();zFlush();
  const d=load(1);            // mig + plSync + every module have now run twice
  const out={};
  const sig=o2=>{const m={};
   Object.keys(o2.ro||{}).forEach(k=>{const L=o2.ro[k];if(!Array.isArray(L))return;
    L.forEach((x,i)=>{if(x&&x.n)m[k+'#'+i]=x.n+'|'+(x.pos||'')+'|'+(x.ovr||0)+'|'+JSON.stringify(x.h||[])})});
   return m};
  const A=sig(raw),B=sig(d);
  const changed=Object.keys(A).filter(k=>A[k]!==B[k]);
  const lost=Object.keys(A).filter(k=>!(k in B));
  out.rosterEntries=Object.keys(A).length;
  out.entriesChanged=changed.length;
  out.whatChanged=changed.slice(0,5).map(k=>k+': '+A[k].slice(0,40)+' -> '+(B[k]||'GONE').slice(0,40));
  out.entriesLost=lost.length;
  // awards
  const aw=o2=>JSON.stringify(Object.keys(o2.law||{}).map(k=>[k,(o2.law[k].w||{})]));
  out.awardsChanged=(aw(raw)!==aw(d));
  // the user's own season and career
  out.myStatsChanged=(JSON.stringify(raw.ss)!==JSON.stringify(d.ss));
  out.myHistoryChanged=(JSON.stringify(raw.hist||[])!==JSON.stringify(d.hist||[]));
  out.ultraBowlChanged=(JSON.stringify(raw.hOv||{})!==JSON.stringify(d.hOv||{}));
  out.teamNames=(JSON.stringify((raw.T||[]).map(t=>t.n))!==JSON.stringify((d.T||[]).map(t=>t.n)));
  // what WAS added (metadata only is fine)
  out.newKeys=Object.keys(d).filter(k=>!(k in raw));
  out.transactionsLogged=(d.txn||[]).length;
  out.registerSize=Object.keys(d.allp||{}).length;
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(20),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
