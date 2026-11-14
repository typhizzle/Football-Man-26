// FLICK PASSING: does the ball go where you swiped?
// Runs the scenarios from the spec with receivers placed at known spots.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const log=[];
  try{startGame0(1,'reg')}catch(e){return{fatal:'startGame0 '+e.message}}
  // find a pass play in the book
  let cat=null,idx=0;
  for(const c in PB){const i=PB[c].findIndex(p=>p[1]=='pass');if(i>=0){cat=c;idx=i;break}}
  if(!cat)return{fatal:'no pass play found'};
  try{snap(cat,idx)}catch(e){return{fatal:'snap '+e.message}}
  const P=g.pl;
  if(!P||!P.qb)return{fatal:'no play state'};
  log.push(`play live: ph=${g.ph} wr=${(P.wr||[]).length} qb=(${P.qb.x.toFixed(1)},${P.qb.y.toFixed(1)})`);

  // helper: place receivers, flick, read where the ball is actually aimed
  const shot=(name,wrPos,sx,sy,power)=>{
   P.air=null;P.car=P.qb;P.passed=false;g.ph='live';
   CAMI=1;g.sw=0;LY=0;            // first-person / flick view: pure math, no camera projection
   P.qb.x=26.6;P.qb.y=g.los!=null?g.los-4:20;
   wrPos.forEach((p,i)=>{if(P.wr[i]){P.wr[i].x=p[0];P.wr[i].y=p[1];P.wr[i].vx=0;P.wr[i].vy=0;P.wr[i].out=false}});
   try{swThrow(sx,sy,power,P.qb.x,P.qb.y,null,null,null)}catch(e){return{name,err:e.message}}
   const a=P.air;
   if(!a)return{name,err:'NO THROW (ball never left)'};
   const dx=a.lx-P.qb.x,dy=a.ly-P.qb.y,dist=Math.hypot(dx,dy);
   // which receiver is nearest where it landed
   let near='none',nd=1e9;
   P.wr.forEach((w,i)=>{if(!w)return;const d=Math.hypot(w.x-a.lx,w.y-a.ly);if(d<nd){nd=d;near='WR'+i}});
   return{name,aim:[+a.lx.toFixed(1),+a.ly.toFixed(1)],dist:+dist.toFixed(1),
          nearest:near,nearestDist:+nd.toFixed(1),tgt:a.tgt?('WR'+P.wr.indexOf(a.tgt)):'null'};
  };

  const R=[];
  // 1. two receivers right side, aim at the FARTHER one (deep right)
  R.push(shot('deep right past a short right',[[40,24],[44,46],[12,30],[20,28],[24,18]],0.55,-0.84,1.0));
  // 2. short flick straight ahead must stay SHORT, not snap to the back
  R.push(shot('short flick straight (must not dump to RB)',[[34,34],[44,46],[12,30],[20,28],[25,16]],0.0,-1.0,0.25));
  // 3. aim at the LEFT sideline receiver with one inside
  R.push(shot('left sideline over an inside man',[[8,38],[24,32],[40,30],[20,28],[25,17]],-0.72,-0.69,0.85));
  // 4. throw into EMPTY space (nobody near) - must still release
  R.push(shot('into open grass, no receiver near',[[2,20],[4,22],[6,24],[8,26],[10,18]],0.6,-0.8,0.9));
  // 5. long vs short with identical direction - distance must scale with power
  R.push(shot('power 1.0 straight',[[26,60],[30,40],[20,40],[22,30],[25,17]],0.0,-1.0,1.0));
  R.push(shot('power 0.35 straight',[[26,60],[30,40],[20,40],[22,30],[25,17]],0.0,-1.0,0.35));
  return{log,R};
 },save);
 if(out.fatal){console.log('FATAL:',out.fatal);await b.close();return}
 out.log.forEach(l=>console.log(l));
 console.log('');
 out.R.forEach(r=>{
  if(r.err){console.log(`  ${r.name}\n      ERROR: ${r.err}`);return}
  console.log(`  ${r.name}`);
  console.log(`      aim=(${r.aim[0]},${r.aim[1]}) dist=${r.dist}yd  nearest=${r.nearest}@${r.nearestDist}yd  tgt=${r.tgt}`);
 });
 console.log('\nERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
