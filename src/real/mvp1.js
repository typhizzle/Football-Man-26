// Does the filled Ultra Bowl MVP actually play for the WINNING team that season?
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const rows=[];
  for(let Y=2026;Y<=yrN()-1;Y++){
   try{
    const c=uChamp(Y);if(!c||c.ub==null)continue;
    const T=uPro(Y);
    const W=T.find(x=>x.ti===c.ub);          // winning team entry
    const L=T.find(x=>x.ti===c.ru);          // losing team entry
    const wq=(W&&W.q?W.q:[]).map(q=>q.n).filter(Boolean);
    const lq=(L&&L.q?L.q:[]).map(q=>q.n).filter(Boolean);
    const m=c.sbm||'';
    rows.push({Y,win:TA[c.ub],lose:TA[c.ru],mvp:m,
      onWinner:wq.includes(m),onLoser:lq.includes(m),
      winnerQBs:wq.slice(0,3),loserQBs:lq.slice(0,3)});
   }catch(e){rows.push({Y,err:String(e)})}
  }
  return rows;
 },save);
 out.forEach(r=>{
  if(r.err){console.log(r.Y,'ERR',r.err);return}
  const verdict=r.onWinner?'OK (on winner)':r.onLoser?'*** ON THE LOSING TEAM ***':'*** NOT ON EITHER TEAM ***';
  console.log(`${r.Y}  ${r.win} over ${r.lose}  MVP="${r.mvp}"  -> ${verdict}`);
  console.log(`        winner QBs: ${r.winnerQBs.join(', ')||'(none)'}`);
 });
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
