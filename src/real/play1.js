// ACTUAL PLAYTEST: run real downs. Let routes develop, read the field, find the most
// open receiver, throw to him, and see whether he catches it.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const out=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  startGame0(1,'reg');
  const passPlays=[];
  for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')passPlays.push([c,i])});
  const R={plays:0,threw:0,comp:0,int:0,toOpenMan:0,missShort:[],log:[],sepAtThrow:[],err:[]};

  for(let n=0;n<40;n++){
   try{
    const pp=passPlays[n%passPlays.length];
    g.ph='pre';g.y=25;g.dn=1;g.tg=10;
    setup(0);
    snap(pp[0],pp[1]);
    CAMI=1;g.sw=0;LY=0;
    const P=g.pl;if(!P||!P.qb)continue;
    R.plays++;
    // let the routes develop (~1.6s of play)
    for(let k=0;k<55;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done)break}
    if(!g.pl||g.pl.done||g.pl.air||g.pl.car!==g.pl.qb)continue;
    const q=P.qb;
    // READ THE FIELD: who is most open?
    let open=null,bestSep=-1;
    (P.wr||[]).forEach(w=>{
     if(!w||w.out)return;
     if(w.y<q.y-2)return;                       // ignore anyone behind us
     const sep=Math.min(...(P.def||[]).map(d=>Math.hypot(d.x-w.x,d.y-w.y)));
     if(sep>bestSep){bestSep=sep;open=w}
    });
    if(!open)continue;
    // lead him, the way a quarterback would
    const v=16+(S.q.pow||60)*.1;
    const T=Math.max(.25,Math.hypot(open.x-q.x,open.y-q.y)/v);
    const tx=open.x+(open.vx||0)*T, ty=open.y+(open.vy||0)*T;
    const dx=tx-q.x, dy=ty-q.y, d=Math.hypot(dx,dy);
    if(!(d>1))continue;
    // the swipe that aims exactly there
    const a=Math.atan2(dx,dy);
    const sx=Math.sin(a), sy=-Math.cos(a);
    const Rg=thrR(), p=Math.max(.05,Math.min(1,d/Rg));
    const cmp0=(g.st&&g.st.cmp)||0, int0=(g.st&&g.st.int)||0;
    R.sepAtThrow.push(+bestSep.toFixed(1));
    try{swThrow(sx,sy,p,q.x,q.y,null,null,null)}catch(e){R.err.push(e.message);continue}
    if(!P.air){R.log.push('no release');continue}
    R.threw++;
    const aimErr=Math.hypot(P.air.lx-tx,P.air.ly-ty);
    // let the ball fly and the play resolve
    for(let k=0;k<260;k++){try{upd(0.03)}catch(e){}if(!g.pl||g.pl.done||(!g.pl.air&&g.pl.passed))break}
    const cmp1=(g.st&&g.st.cmp)||0, int1=(g.st&&g.st.int)||0;
    const lastMsg=(g.msg||'')+'';
    if(cmp1>cmp0){R.comp++;R.toOpenMan++}
    else if(int1>int0)R.int++;
    else R.missShort.push({sep:+bestSep.toFixed(1),dist:+d.toFixed(1),aimErr:+aimErr.toFixed(1),why:lastMsg.slice(0,22)});
   }catch(e){R.err.push(String(e.message).slice(0,70))}
  }
  R.avgSep=R.sepAtThrow.length?+(R.sepAtThrow.reduce((a,b)=>a+b,0)/R.sepAtThrow.length).toFixed(2):null;
  return R;
 },save);
 const tally={};(out.missShort||[]).forEach(m=>{const k=m.why||'(none)';tally[k]=(tally[k]||0)+1});
 console.log('incompletion reasons:',JSON.stringify(tally));
 console.log('plays run        :',out.plays);
 console.log('throws released  :',out.threw);
 console.log('COMPLETIONS      :',out.comp, out.threw?`(${Math.round(out.comp/out.threw*100)}%)`:'');
 console.log('interceptions    :',out.int);
 console.log('incomplete       :',out.missShort.length);
 console.log('avg separation of the man thrown to:',out.avgSep,'yd');
 if(out.missShort.length)console.log('sample incompletions (sep / throw dist / aim error):',out.missShort.slice(0,8));
 if(out.err.length)console.log('errors:',out.err.slice(0,5));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
