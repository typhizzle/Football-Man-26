const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 const byLen={};let atCap=0,overNy=0,sample=[];
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{
   if(!x||!x.h)return;const n=x.h.length;
   byLen[n]=(byLen[n]||0)+1;
   if(n===14)atCap++;
   // ny = seasons played. More seasons played than rows kept = seasons already destroyed
   if(x.ny!=null&&x.ny>n){overNy++;
     if(sample.length<10)sample.push({n:x.n,pos:x.pos,played:x.ny,rowsKept:n,
       lost:x.ny-n,span:[x.h[0]&&x.h[0][0],x.h[n-1]&&x.h[n-1][0]]})}
  });}
 out.rowsPerPlayer=byLen;
 out.playersAtThe14Cap=atCap;
 out.playersWhoPlayedMoreSeasonsThanTheyStillHave=overNy;
 out.sample=sample;
 // how many seasons in total have been destroyed by the cap
 let destroyed=0;
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{if(x&&x.h&&x.ny!=null&&x.ny>x.h.length)destroyed+=x.ny-x.h.length});}
 out.totalSeasonsDestroyedByTheCap=destroyed;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
