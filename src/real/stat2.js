// "Look at every game, every play. Make sure it all lines up."
// For a sample of players, add up their individual game lines by hand and compare to
// the season total. They must match exactly, for teammates and opponents alike.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={checked:0,mismatches:[],teamTotalsChecked:0,teamMismatches:[]};
  // walk every game by hand, independently of szBuild
  const hand={};
  const add=(ti,n,k,v)=>{const T=hand[ti]=hand[ti]||{};const r=T[n]=T[n]||{};r[k]=(r[k]||0)+(v||0)};
  const G=S.gr||{};let games=0;
  Object.keys(G).forEach(w=>{(G[w]||[]).forEach(gm=>{
   const a=gm[0],b=gm[1];let bx=null;try{bx=bxGet(+w,a,b)}catch(e){}
   if(!bx)return;games++;
   [[a,bx.A],[b,bx.B]].forEach(([ti,A])=>{
    (A.pass||[]).forEach(p=>{if(p.a>0){add(ti,p.n,'py',p.y);add(ti,p.n,'ptd',p.td)}});
    (A.rush||[]).forEach(p=>{if(p.c>0){add(ti,p.n,'car',p.c);add(ti,p.n,'ry',p.y)}});
    (A.rec||[]).forEach(p=>{if(p.c>0){add(ti,p.n,'rec',p.c);add(ti,p.n,'recy',p.y)}});
    (A.def||[]).forEach(p=>{add(ti,p.n,'sck',p.s);add(ti,p.n,'tkl',p.t)});
   });
  })});
  out.gamesWalked=games;
  // compare against the ledger
  const D=szGet();
  Object.keys(hand).forEach(ti=>Object.keys(hand[ti]).forEach(n=>{
   const h=hand[ti][n],z=(D[ti]||{})[n];out.checked++;
   if(!z){out.mismatches.push(n+' MISSING from ledger');return}
   ['py','ptd','car','ry','rec','recy','sck','tkl'].forEach(k=>{
    const a=h[k]||0,c=z[k]||0;
    if(a!==c&&out.mismatches.length<8)out.mismatches.push(n+' '+k+': by hand '+a+' vs ledger '+c);
   });
  }));
  // a team's passing yards should roughly equal its receivers' yards
  Object.keys(D).slice(0,8).forEach(ti=>{
   const L=Object.values(D[ti]);
   const py=L.reduce((a,x)=>a+x.py,0),recy=L.reduce((a,x)=>a+x.recy,0);
   out.teamTotalsChecked++;
   const gap=Math.abs(py-recy);
   if(py>0&&gap/py>0.12)out.teamMismatches.push('team '+ti+': '+py+' pass yds vs '+recy+' rec yds');
  });
  // and the leaderboard leader must equal that player's own ledger row
  const L=LD(),top=L.Re[0];
  const f=szFlat().sort((a,b)=>b.recy-a.recy)[0];
  out.leaderMatchesLedger=!!(top&&f&&top.a===f.recy);
  out.topReceiver=f?(f.n+' '+f.recy+'y in '+f.g+' games'):'none';
  return out;
 },save);
 console.log('games walked      ',o.gamesWalked);
 console.log('player-seasons    ',o.checked);
 console.log('mismatches        ',o.mismatches.length?o.mismatches:'NONE');
 console.log('team pass vs rec  ',o.teamMismatches.length?o.teamMismatches:'all within 12%');
 console.log('leader matches    ',o.leaderMatchesLedger,'|',o.topReceiver);
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
