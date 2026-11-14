// Verify the FA pool under league-phase (the broken condition) + screenshot the screen
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const r=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  // BEFORE: base pool with no league phase
  S.lgPh=null; out.basePool=faPool().length;
  // Recreate the exact broken condition: league phase live, S.ro.fa empty
  S.ro=S.ro||{}; S.ro.fa=[];
  S.lgPh={y:yrN(),p:1};
  out.leaguePhaseEmptyFa=faPool().length;
  // And with a couple of real FA players in the pool
  S.ro.fa=[{n:'Test Guy One',pos:'WR',ovr:88,age:27,prev:'KC'},{n:'Test Guy Two',pos:'DE',ovr:84,age:29,prev:'BUF'}];
  const P=faPool();
  out.leaguePhaseWithFa=P.length;
  out.top10=P.slice(0,10).map(p=>p.n+' '+p.pos+' '+p.ovr+(p.real?' [real-FA]':''));
  // make the screen render in FA week
  S.ofs=S.ofs||{};S.ofs.w=3;S.ofs.recs=[];S.ofs.spent=0;
  try{faV('all')}catch(e){out.viewErr=String(e)}
  out.rowsOnScreen=(document.querySelectorAll('#ui .row').length)||0;
  out.uiHasBack=/Back/.test(document.getElementById('ui').innerHTML);
  return out;
 },save);
 console.log(JSON.stringify(r,null,1));
 await pg.screenshot({path:'/home/claude/real/shot_fa.png'});
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
