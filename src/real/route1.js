// OUT ROUTES and CORNER ROUTES specifically: breaking toward the sideline is the
// hardest case for a swipe system (the ball tends to sail out or hang inside).
// Classify each target by how he is MOVING at the throw, then score by route type.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  startGame0(1,'reg');
  const pp=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pp.push([c,i])});
  const K={};const add=(k,f)=>{K[k]=K[k]||{att:0,comp:0,right:0,oob:0,aim:[]};K[k][f]++};
  for(let n=0;n<90;n++){
   try{
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;setup(0);snap(pp[n%pp.length][0],pp[n%pp.length][1]);
    CAMI=1;g.sw=0;LY=0;
    let P=g.pl;if(!P||!P.qb)continue;
    // let routes break (out/corner breaks happen later than 1.6s)
    for(let k=0;k<70;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
    P=g.pl;if(!P||P.done||P.air||P.car!==P.qb)continue;
    const q=P.qb;
    const elig=(P.wr||[]).map((w,i)=>({w,i})).filter(o=>o.w&&!o.w.out&&o.w.y>q.y-2);
    if(!elig.length)continue;
    const pick=elig[n%elig.length],t=pick.w;
    // classify by motion at the moment of the throw
    const vx=t.vx||0,vy=t.vy||0,sp=Math.hypot(vx,vy);
    const lateral=Math.abs(vx), toSideline=(t.x>26.6?vx>0:vx<0);
    let kind='other';
    if(sp>1.5&&lateral>Math.abs(vy)*1.1&&toSideline)kind=(vy>1.2?'corner':'out');
    else if(sp>1.5&&vy>lateral*1.4)kind='vertical';
    else if(sp>1.0)kind='inside/crosser';
    const v=16+(S.q.pow||60)*.1,T=Math.max(.25,Math.hypot(t.x-q.x,t.y-q.y)/v);
    const tx=t.x+vx*T,ty=t.y+vy*T,dx=tx-q.x,dy=ty-q.y,d=Math.hypot(dx,dy);
    if(!(d>1))continue;
    const a=Math.atan2(dx,dy),p=Math.max(.05,Math.min(1,d/thrR()));
    const c0=(g.st&&g.st.cmp)||0;
    try{swThrow(Math.sin(a),-Math.cos(a),p,q.x,q.y,null,null,null)}catch(e){continue}
    if(!P.air)continue;
    add(kind,'att');K[kind].aim.push(+Math.hypot(P.air.lx-tx,P.air.ly-ty).toFixed(2));
    const landedOut=(P.air.lx<0||P.air.lx>53.3);
    for(let k=0;k<260;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
    if(landedOut)add(kind,'oob');
    if(((g.st&&g.st.cmp)||0)>c0){add(kind,'comp');
      if((P.wr||[]).indexOf(g.pl&&g.pl.car)===pick.i)add(kind,'right')}
   }catch(e){}
  }
  Object.keys(K).forEach(k=>{const A=K[k].aim;K[k].avgAim=A.length?+(A.reduce((x,y)=>x+y,0)/A.length).toFixed(2):null;delete K[k].aim});
  return K;
 },save);
 Object.keys(out).forEach(k=>{
  const r=out[k];
  const pct=r.att?Math.round(r.comp/r.att*100):0;
  console.log(`${k.padEnd(16)} att ${String(r.att).padStart(3)}  completions ${String(r.comp).padStart(3)} (${pct}%)  to intended ${r.right}  out-of-bounds ${r.oob}  aim err ${r.avgAim}`);
 });
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
