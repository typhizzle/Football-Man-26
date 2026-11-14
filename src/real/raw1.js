const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 out.slotMap={}; [0,5,8,14,16].forEach(i=>{out.slotMap[i]=S.T[i].n+' | slot='+tSlot(i)+' canon='+TA[i]});
 const look=['Nigel Ballins','Tobey Talarico','Axel Jean','Marco Harris','Simothy Simmons'];
 out.players=[];
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{if(!x||look.indexOf(x.n)<0)return;
   out.players.push({n:x.n,pos:x.pos,slot:i,slotAb:tSlot(i),canonAb:TA[i],
    tm:x.tm,dr:x.dr,ny:x.ny,
    rawRows:(x.h||[]).map(h=>({y:h[0],ti:h[1],asSlot:tSlot(h[1]),asCanon:TA[h[1]]}))});});}
 // and the distribution of h[1] values across ALL rows, vs the slot the player sits on
 let same=0,diff=0;const diffPairs={};
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{(x&&x.h||[]).forEach(h=>{
   if(h[1]===i)same++;else{diff++;const k=i+'<-'+h[1];diffPairs[k]=(diffPairs[k]||0)+1}});});}
 out.rowIndexVsSlot={same,diff};
 out.topDiffs=Object.entries(diffPairs).sort((a,b)=>b[1]-a[1]).slice(0,12);
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
