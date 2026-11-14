const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 const missYear={},missTeam={},affected=[];
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{
   if(!x||!x.h||x.h.length<2)return;
   const ys=x.h.map(h=>h[0]).filter(y=>y!=null).sort((a,b)=>a-b);
   const miss=[];for(let y=ys[0];y<=ys[ys.length-1];y++)if(ys.indexOf(y)<0)miss.push(y);
   if(!miss.length)return;
   miss.forEach(y=>missYear[y]=(missYear[y]||0)+1);
   missTeam[tSlot(i)]=(missTeam[tSlot(i)]||0)+1;
   affected.push({n:x.n,pos:x.pos,on:tSlot(i),miss,span:[ys[0],ys[ys.length-1]],
                  tiSet:[...new Set(x.h.map(h=>h[1]))]});
  });}
 out.missingByYear=missYear;
 out.affectedPlayersByCurrentTeam=missTeam;
 out.count=affected.length;
 out.all=affected.slice(0,40);
 // context: what years does the save consider played?
 out.nowYear=(typeof yrN=='function')?yrN():null;
 out.py=S.py; out.yr=S.yr; out.stage=S.stage;
 out.histLen=(S.hist||[]).length;
 out.histYears=(S.hist||[]).map(h=>h.y);
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
