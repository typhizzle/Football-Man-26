// Hand off a known number of times; the box score must print THAT number.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  const runPlays=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='run')runPlays.push([c,i])});
  const passPlays=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')passPlays.push([c,i])});
  const trial=(handoffs)=>{
   startGame0(1,'reg');g.rc={};g.rcar={};
   for(let n=0;n<handoffs;n++){
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
    snap(runPlays[n%runPlays.length][0],runPlays[n%runPlays.length][1]);
    for(let k=0;k<120;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
   }
   // a few dropbacks so the passing line is not empty
   for(let n=0;n<6;n++){
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);
    snap(passPlays[n%passPlays.length][0],passPlays[n%passPlays.length][1]);
    for(let k=0;k<60;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
   }
   const rcar={...(g.rcar||{})};
   const bx=bxMake(1,0,3,24,17,{att:20,cmp:12,yds:240,td:2,int:1,ry:18,rtd:0,sk:1,fum:0},rcar);
   const rb=(bx.A.rush||[]).find(x=>x.p=='RB');
   return {handoffs,counted:rcar[1]|0,printed:rb?rb.c:0,yards:rb?rb.y:0,
           touches:(g.rc||{})[1]|0};
  };
  out.fiveHandoffs=trial(5);
  out.zeroHandoffs=trial(0);
  out.twentyHandoffs=trial(20);
  // the CPU side must still get a believable line
  const bx=bxMake(1,0,3,24,17,null,null);
  out.cpuRB=(bx.B.rush||[]).find(x=>x.p=='RB');
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(16),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
