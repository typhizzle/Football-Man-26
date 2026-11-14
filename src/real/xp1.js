// The extra point must actually play out, and the score must only move when it is good.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={good:0,missed:0,scoredOnGood:0,scoredOnMiss:0,neverAnimated:0,frames:[],msgs:{}};
  for(let n=0;n<40;n++){
   startGame0(1,'reg');
   g.s=[6,0];g.ph='pre';
   const before=g.s[0];
   xp();
   if(g.ph!='kick'||!g.kk){out.neverAnimated++;continue}
   const willBeGood=g.kk.ok,dist=g.kk.d;
   let fr=0,sawMsg='';
   for(let k=0;k<300;k++){
    try{if(g.ph=='kick')kTick(0.03);else if(g.ph=='live')upd(0.03)}catch(e){}
    fr++;
    if(g.msg&&!sawMsg)sawMsg=g.msg;
    if(g.ph!='kick')break;
   }
   out.frames.push(fr);
   if(sawMsg)out.msgs[sawMsg]=(out.msgs[sawMsg]||0)+1;
   const moved=g.s[0]-before;
   if(willBeGood){out.good++;if(moved===1)out.scoredOnGood++}
   else{out.missed++;if(moved!==0)out.scoredOnMiss++}
   out.dist=dist;
  }
  out.hsDist=(()=>{startGame0(1,'reg');g.lv='hs';g.s=[6,0];g.ph='pre';xp();return g.kk?g.kk.d:null})();
  out.avgFramesWatched=Math.round(out.frames.reduce((a,b)=>a+b,0)/out.frames.length);
  delete out.frames;
  // and the pro distance
  startGame0(1,'reg');g.lv='pro';g.s=[6,0];g.ph='pre';xp();out.proDist=g.kk?g.kk.d:null;
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(18),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
