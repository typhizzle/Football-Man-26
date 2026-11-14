// Simulate REAL finger gestures through swEnd() (the actual power formula),
// not swThrow directly. Short quick flick must be a SHORT throw.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  startGame0(1,'reg');
  let cat=null,idx=0;for(const c in PB){const i=PB[c].findIndex(p=>p[1]=='pass');if(i>=0){cat=c;idx=i;break}}
  snap(cat,idx);
  const P=g.pl;
  // gesture: swipe `len` px straight up over `ms` milliseconds
  const gesture=(name,len,ms,dirx)=>{
   P.air=null;P.car=P.qb;P.passed=false;g.ph='live';CAMI=1;g.sw=0;LY=0;
   P.qb.x=26.6;P.qb.y=20;
   P.wr.forEach(w=>{if(w){w.x=200;w.y=200;w.vx=0;w.vy=0;w.out=false}});
   const x0=W/2,y0=H*0.75,N=8,t0=performance.now()-ms;
   const pts=[];
   for(let i=0;i<N;i++){const f=i/(N-1);
    pts.push({x:x0+(dirx||0)*len*f,y:y0-len*f,t:t0+ms*f});}
   swp={id:1,x0,y0,pts:pts.slice(0,N-1)};
   const last=pts[N-1];
   try{swEnd({pointerId:1,clientX:last.x,clientY:last.y})}catch(e){return{name,err:e.message}}
   const a=P.air;
   if(!a)return{name,len,ms,err:'no throw'};
   return{name,len,ms,power:g.swp?g.swp.p:null,
          dist:+Math.hypot(a.lx-26.6,a.ly-20).toFixed(1)};
  };
  const R=[];
  R.push(gesture('quick dump-off  (50px / 60ms)',50,60,0));
  R.push(gesture('quick flick     (80px / 70ms)',80,70,0));
  R.push(gesture('medium swipe    (150px/150ms)',150,150,0));
  R.push(gesture('long slow swipe (260px/420ms)',260,420,0));
  R.push(gesture('long fast swipe (260px/120ms)',260,120,0));
  R.push(gesture('short SLOW      (60px /400ms)',60,400,0));
  return R;
 },save);
 out.forEach(r=>{
  if(r.err){console.log(`  ${r.name}  -> ERROR ${r.err}`);return}
  console.log(`  ${r.name}  -> power ${String(r.power).padStart(3)}  distance ${r.dist} yd`);
 });
 console.log('\nERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
