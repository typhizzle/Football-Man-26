const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 // A. is h[1] a SLOT index or a CANONICAL index? decisive distribution
 let same=0,diff=0;
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{(x&&x.h||[]).forEach(h=>{h[1]===i?same++:diff++})});}
 out.A_rowIndexEqualsSlot={same,diff};
 // for players who have only ever been one place (tm length 1), which reading matches tm?
 let slotWins=0,canonWins=0,neither=0;
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{if(!x||!x.h||!x.h.length)return;
   const tm=(x.tm||[]).filter(Boolean); if(tm.length!==1)return;
   const h=x.h[x.h.length-1]; if(h[1]==null)return;
   const sA=tSlot(h[1]), cA=TA[h[1]];
   if(cA===tm[0]&&sA!==tm[0])canonWins++;
   else if(sA===tm[0]&&cA!==tm[0])slotWins++;
   else if(sA!==tm[0]&&cA!==tm[0])neither++;
  });}
 out.B_lastRowMatchesTm={canonWins,slotWins,neither};
 // B2. Axel Jean specifically
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  const p=(L||[]).find(x=>x&&x.n==='Axel Jean');
  if(p){out.B2_axel={slot:i,slotAb:tSlot(i),tm:p.tm,
    rows:(p.h||[]).map(h=>h[0]+':ti'+h[1]+' slot='+tSlot(h[1])+' canon='+TA[h[1]])};break}}
 // C. LOST SEASONS: gaps inside a player's own career
 const gaps=[];let totalMissing=0,withGaps=0;
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{
   if(!x||!x.h||x.h.length<2)return;
   const ys=x.h.map(h=>h[0]).filter(y=>y!=null).sort((a,b)=>a-b);
   const miss=[];
   for(let y=ys[0];y<=ys[ys.length-1];y++)if(ys.indexOf(y)<0)miss.push(y);
   if(miss.length){withGaps++;totalMissing+=miss.length;
    if(gaps.length<12)gaps.push({n:x.n,pos:x.pos,on:tSlot(i),have:ys,missing:miss,ny:x.ny})}
  });}
 out.C_lostSeasons={playersWithGaps:withGaps,totalMissingSeasons:totalMissing,sample:gaps};
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
