// The test that matters: what happens in a game must show up in the season stats,
// on the leaderboard, and on the roster screen — for teammates and opponents too.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  const F=szFlat();
  out.playersWithRealStats=F.length;
  out.teamsCovered=new Set(F.map(x=>x.ti)).size;
  out.gamesInSeason=Object.keys(S.gr||{}).reduce((a,w)=>a+((S.gr[w]||[]).length),0);

  // my own receivers and backs must be in there
  const mine=F.filter(x=>x.ti===0).sort((a,b)=>b.recy-a.recy);
  out.myTeamTracked=mine.length;
  out.myTopReceiver=mine[0]?(mine[0].n+' '+mine[0].rec+' rec, '+mine[0].recy+' yds, '+mine[0].rectd+' TD'):'none';
  const backs=F.filter(x=>x.ti===0&&x.car>0).sort((a,b)=>b.car-a.car);
  out.myTopBack=backs[0]?(backs[0].n+' '+backs[0].car+' car, '+backs[0].ry+' yds'):'none';

  // the leaderboard must be built from those, not a formula
  const L=LD();
  out.leaderboardSizes={pass:L.P.length,rush:L.Ru.length,rec:L.Re.length,sack:L.Sk.length};
  out.recLeaders=L.Re.slice(0,4).map(x=>x.n+' '+x.t+' '+x.a+'y '+x.b+'TD');
  out.myReceiverOnBoard=!!L.Re.find(x=>mine[0]&&x.n.split(' ').slice(-1)[0]===mine[0].n.split(' ').slice(-1)[0]);

  // THE proof: change what happened in a stored game, the season total must move
  const key=Object.keys(S.bx||{})[0];
  if(key){
   const bx=S.bx[key];
   const victim=(bx.A.rec||[])[0];
   if(victim){
    const name=victim.n,before=(szFlat().find(x=>x.n===name)||{}).recy||0;
    victim.y+=250;victim.c+=8;victim.td+=3;
    szCache=null;
    const after=(szFlat().find(x=>x.n===name)||{}).recy||0;
    out.changedGameLog={player:name,before,after,moved:after-before};
   }
  } else out.changedGameLog='no stored game yet';

  // roster screen must show the real line
  const D=szTeam(0),names=Object.keys(D);
  const st=rosStat(0,PS(0),rost('h.0'));
  out.rosterLines=[0,1,2,11].map(k=>st[k]).filter(Boolean);
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(22),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
