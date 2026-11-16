// Tyler 2026-11-15: "the swipe should not automatically go to the players ... help if your quarterback has the ability ... it throws
// it deep when I'm trying to throw it short ... throws out of bounds where it shouldn't be". A short swipe along the line to a deep
// man lands short; a long swipe to him goes to him; a better QB gets more help; the sideline stripe is not out of bounds.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SWI_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};
 startGame0(1,'reg');ovHide();let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});CAMI=3;
 const fresh=(y)=>{g.ph='pre';g.y=y;setup(0);snap(pp[0],pp[1]);for(let k=0;k<4;k++){try{upd(.03)}catch(e){}}return g.pl};await new Promise(r=>setTimeout(r,600));
 const run=(pw,f,acc)=>{const P=fresh(30);S.q.acc=acc;S.q.awr=acc;const q=P.qb;const deep=(P.wr||[]).filter(w=>w&&w!==P.rb).sort((a,b)=>(b.y-q.y)-(a.y-q.y))[0];
  // push him deep and off the others' lines so the only pick on this line is him
  deep.x=26.5;deep.y=q.y+32;deep.vx=0;deep.vy=0;(P.wr||[]).forEach(w=>{if(w!==deep){w.y=Math.min(w.y,q.y+8);w.x=w.x<26.5?6:47}});
  const O=swBall()||pj(q.x,q.y,1.4),T=pj(deep.x,deep.y,1.0);const rx=O[0]+(T[0]-O[0])*f,ry=O[1]+(T[1]-O[1])*f;const L_=Math.hypot(rx-O[0],ry-O[1])||1;
  swThrow((rx-O[0])/L_,(ry-O[1])/L_,pw,O[0],O[1],[],rx,ry);const A=P.air;return {tgt:A&&A.tgt?(A.tgt===deep?'deep':A.tgt.pos):'none',ly:A?+(A.ly-q.y).toFixed(1):null,meant:+(swMeant(pw,rx,ry)||0).toFixed(1)}};
 // A: a short, weak swipe along the line to a deep man: not him; the ball lands short (near what the swipe meant)
 const a=run(.22,.35,70);o.A=a;o.A_notDeep=a.ly!=null&&a.ly<22;   /* the ball lands short; 'deep' as a label is just the nearest man for the catch contest */o.A_landsShort=a.ly!=null&&a.ly<Math.max(16,a.meant*1.8);
 // B: a long, hard swipe to the same man: him
 const bb=run(.95,.9,70);o.B=bb;o.B_deep=bb.tgt==='deep';
 // C: a medium swipe that falls just outside a 70's window is inside a 95's
 const c1=run(.38,.6,60),c2=run(.38,.6,95);o.C=[c1,c2];o.C_betterQbMoreHelp=c1.ly!=null&&c2.ly!=null&&c1.ly<27&&c2.ly>28;
 // D: the sideline stripe is not a throwaway; 5 yards past it is
 const P=fresh(40);const Q=P.qb;(P.wr||[]).forEach(w=>{w.x=cl(w.x,14,40)});const s1=pj(-1,Q.y+8,0),s2=pj(-6,Q.y+8,0);o.D_stripeIn=!swAway(s1[0],s1[1]);o.D_farOut=!!swAway(s2[0],s2[1]);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
