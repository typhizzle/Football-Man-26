// THE ANTI-SNAP TEST: throw the identical swipe twice - once with a receiver sitting
// right next to the aim line, once with the field empty. If the aim jumps toward him,
// the game is still overriding the player. It must barely move.
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
  const aim=(wrPos,sx,sy,pw)=>{
   P.air=null;P.car=P.qb;P.passed=false;g.ph='live';CAMI=1;g.sw=0;LY=0;
   P.qb.x=26.6;P.qb.y=20;
   P.wr.forEach((w,i)=>{if(!w)return;const p=wrPos[i]||[200,200];w.x=p[0];w.y=p[1];w.vx=0;w.vy=0;w.out=false});
   try{swThrow(sx,sy,pw,P.qb.x,P.qb.y,null,null,null)}catch(e){return null}
   return P.air?[P.air.lx,P.air.ly]:null;
  };
  const far=[[200,200],[200,200],[200,200],[200,200],[200,200]];
  const res={};
  // identical swipe: empty field vs a receiver planted right by the aim point
  const A=aim(far,0,-1,0.5);
  const B=aim([[27,45],[200,200],[200,200],[200,200],[200,200]],0,-1,0.5);
  res.emptyField=A?[+A[0].toFixed(1),+A[1].toFixed(1)]:null;
  res.receiverNear=B?[+B[0].toFixed(1),+B[1].toFixed(1)]:null;
  res.pullDistance=(A&&B)?+Math.hypot(B[0]-A[0],B[1]-A[1]).toFixed(2):null;

  // a receiver planted far OFF the swipe line must not drag the ball sideways at all
  const C=aim([[48,40],[200,200],[200,200],[200,200],[200,200]],0,-1,0.5);
  res.receiverOffLine=C?[+C[0].toFixed(1),+C[1].toFixed(1)]:null;
  res.sidewaysPull=(A&&C)?+Math.abs(C[0]-A[0]).toFixed(2):null;

  // direction fidelity: swipe angle vs resulting throw angle
  res.angles=[];
  [[0,-1,'straight'],[0.5,-0.87,'30 right'],[-0.5,-0.87,'30 left'],[0.87,-0.5,'60 right']].forEach(([sx,sy,nm])=>{
   const L=aim(far,sx,sy,0.7);if(!L)return;
   const swipeDeg=Math.atan2(sx,-sy)*180/Math.PI;
   const throwDeg=Math.atan2(L[0]-26.6,L[1]-20)*180/Math.PI;
   res.angles.push(`${nm}: swipe ${swipeDeg.toFixed(0)}deg -> throw ${throwDeg.toFixed(0)}deg`);
  });
  // power monotonicity
  res.power=[0.2,0.4,0.6,0.8,1.0].map(p=>{const L=aim(far,0,-1,p);return L?+Math.hypot(L[0]-26.6,L[1]-20).toFixed(1):null});
  return res;
 },save);
 console.log('same swipe, empty field  :',out.emptyField);
 console.log('same swipe, receiver near:',out.receiverNear);
 console.log('  -> aim moved by        :',out.pullDistance,'yd   (small = player is in control)');
 console.log('receiver far OFF the line:',out.receiverOffLine);
 console.log('  -> sideways pull       :',out.sidewaysPull,'yd   (should be ~0)');
 console.log('\nDirection fidelity:');out.angles.forEach(a=>console.log('  '+a));
 console.log('\nPower -> distance (yd):',out.power);
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
