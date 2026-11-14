// The deep audit: every player, every season row, every roster. Data correctness.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const f={players:0,rows:0,
   teamMismatch:[],badYear:[],negative:[],absurd:[],dupeName:[],noPos:[],
   twoPlaces:[],orphanHistory:[],rowOrder:[]};
  const where={};
  for(let i=0;i<(S.T||[]).length;i++){
   let L;try{L=rost('h.'+i)}catch(e){continue}
   (L||[]).forEach(x=>{
    if(!x||!x.n)return;f.players++;
    if(where[x.n]&&f.twoPlaces.length<6)f.twoPlaces.push(x.n+' on '+where[x.n]+' and '+TA[i]);
    where[x.n]=TA[i];
    if(!x.pos&&f.noPos.length<6)f.noPos.push(x.n);
    // his record must point at teams that exist, in sane years, with sane numbers
    let lastY=-1;
    (x.h||[]).forEach(h=>{
     f.rows++;
     const yr=h[0],ti=h[1],v=h.slice(2);
     if(!(yr>=2024&&yr<=2200)&&f.badYear.length<6)f.badYear.push(x.n+' year '+yr);
     if((ti==null||!S.T[ti])&&f.orphanHistory.length<6)f.orphanHistory.push(x.n+' team index '+ti);
     if(lastY>=0&&yr<lastY&&f.rowOrder.length<6)f.rowOrder.push(x.n+' '+lastY+' then '+yr);
     lastY=yr;
     v.forEach((n,k)=>{
      if(typeof n!=='number'||!isFinite(n)){if(f.negative.length<6)f.negative.push(x.n+' non-number');return}
      if(n<0&&f.negative.length<6)f.negative.push(x.n+' negative '+n);
      if(n>8000&&f.absurd.length<6)f.absurd.push(x.n+' '+n);
     });
    });
    // the team printed for his latest season must be the team his record names
    const H_=x.h||[];const h=H_[H_.length-1];
    if(h&&h[1]!=null&&TA[h[1]]&&(x.tm||[]).length){
     const claim=x.tm[x.tm.length-1];
     if(claim!==TA[h[1]]&&f.teamMismatch.length<8)
      f.teamMismatch.push(x.n+': record '+TA[h[1]]+' vs tm list '+claim);
    }
   });
  }
  const names={};Object.keys(where).forEach(n=>names[n]=(names[n]||0)+1);
  // duplicates across the whole league
  const all=[];for(let i=0;i<(S.T||[]).length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
   (L||[]).forEach(x=>{if(x&&x.n)all.push(x.n)})}
  const cnt={};all.forEach(n=>cnt[n]=(cnt[n]||0)+1);
  f.dupeName=Object.keys(cnt).filter(n=>cnt[n]>1).slice(0,8).map(n=>n+' x'+cnt[n]);
  f.rosterAudit=roAudit();
  return f;
 },save);
 console.log('players audited  ',o.players,'  season rows',o.rows);
 const show=(k,label)=>console.log('\n'+label.padEnd(24),(o[k]&&o[k].length)?o[k]:'clean');
 show('rosterAudit','rosters in wrong slot');
 show('teamMismatch','record vs tm list');
 show('orphanHistory','season on a missing team');
 show('badYear','impossible year');
 show('rowOrder','seasons out of order');
 show('negative','negative or broken stat');
 show('absurd','absurd stat (>8000)');
 show('dupeName','duplicate names');
 show('twoPlaces','on two rosters at once');
 show('noPos','no position');
 console.log('\nJS ERRORS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
