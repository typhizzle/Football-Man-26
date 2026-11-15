// Tyler 2026-11-15: swipe "took a step back" (a hard swipe left went right), throwaways, and the 2-point flick to the back.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SWX_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};
 // A: the deep fix never sends it across the field, and does nothing when your finger let go above the horizon
 const q={x:10,y:50},sh={n:'SH',x:9,y:54},L8={n:'L',x:8,y:76},R45={n:'R',x:45,y:85};const P0={qb:q,wr:[sh,L8,R45]};const r0={w:sh,how:'ray'};
 const a1=swDeepFix(r0,{d:99,G:null},P0);o.A_noGroundNoChange=a1===r0;
 const a2=swDeepFix(r0,{d:30,G:[8,80]},P0);o.A_leftStaysLeft=a2&&a2.w===L8;
 const a3=swDeepFix(r0,{d:30,G:[10,80]},{qb:q,wr:[sh,R45]});o.A_neverAcross=a3===r0;
 // B + C use the real field and camera
 startGame0(1,'reg');ovHide();let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});
 const fresh=(y)=>{g.ph='pre';g.y=y;setup(0);snap(pp[0],pp[1]);for(let k=0;k<4;k++){try{upd(.03)}catch(e){}}return g.pl};
 await new Promise(r=>setTimeout(r,600));
 // B: a flick toward the back that overshoots him (2-point try) goes to the back
 let P=fresh(97);g.two=true;const O=swBall()||pj(P.qb.x,P.qb.y,1.4),R_=pj(P.rb.x,P.rb.y,1.0);o.B_have=!!O&&!!R_;
 if(O&&R_){const res=[];let all=true;[2.4,3.5,5,7].forEach(f=>{const rx=O[0]+(R_[0]-O[0])*f,ry=O[1]+(R_[1]-O[1])*f;const pk=swPick(rx,ry,O[0],O[1]);res.push(f+':'+(pk&&pk.w?(pk.w===P.rb?'RB':(pk.w.pos||'x'))+'/'+pk.how:'none'));if(!(pk&&pk.w===P.rb))all=false});o.B_pick=res.join(' ');
  // the whole throw (what really happens): flicks of different lengths toward the back
  const thr=[];let ok=true;CAMI=3;await new Promise(r=>setTimeout(r,400));for(const [f,pw] of [[1.2,.25],[2,.3],[3,.4]]){P=fresh(97);g.two=true;await new Promise(r=>setTimeout(r,250));const O3=swBall()||pj(P.qb.x,P.qb.y,1.4),R3=pj(P.rb.x,P.rb.y,1.0);const rx=O3[0]+(R3[0]-O3[0])*f,ry=O3[1]+(R3[1]-O3[1])*f;
   const L_=Math.hypot(rx-O3[0],ry-O3[1])||1;swThrow((rx-O3[0])/L_,(ry-O3[1])/L_,pw,O3[0],O3[1],[],rx,ry);const t=P.air&&P.air.tgt;thr.push(f+':'+(t?(t===P.rb?'RB':t.pos||'x'):'none'));if(t!==P.rb)ok=false}CAMI=0;
  o.B_throws='All-22 2-pt: '+thr.join(' ');o.B_toBack=ok;o.B_dist=Math.hypot(R_[0]-O[0],R_[1]-O[1]).toFixed(0);o.B_wrScreens=(P.wr||[]).map(w=>{const s=pj(w.x,w.y,1.0);return (w===P.rb?'RB':w.pos)+':'+(s?s.map(v=>Math.round(v)).join('/'):'-')}).join(' ')+' W'+W+' H'+H}
 g.two=false;
 // C: let go past the left sideline -> out of bounds, incomplete (no receiver)
 P=fresh(40);await new Promise(r=>setTimeout(r,500));const Q=P.qb;const off=pj(-6,Q.y+8,0);o.C_have=!!off;if(off){const G=swAway(off[0],off[1]);o.C_ground=G&&G.map(v=>+v.toFixed(1)).join(',');
  const O2=swBall()||pj(Q.x,Q.y,1.4);swThrow(-1,-1,1,O2[0],O2[1],[],off[0],off[1]);o.C_air=!!P.air;o.C_outLeft=!!P.air&&P.air.lx<0}
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
