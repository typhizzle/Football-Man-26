// Tyler 2026-11-14: "are all the times matching up ... no matter where you're watching playing or simming it ... they should
// move as fast as each other" + "I haven't noticed home and away jerseys yet ... Still see color jerseys".
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PACE_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};
 const seen=[];const sd0=simDrive;
 // A: your pace is 50 game-seconds a play -> every simulated drive in your game runs at that pace (no cap at ~41)
 startGame0(1,'reg');g.ptS=500;g.ptN=10;const want=typeof sdtNow=='function'?sdtNow():null;o.A_want=want;
 simDrive=function(){seen.push(SDT);return sd0.apply(this,arguments)};
 try{oppBall()}catch(e){o.A_e1=e.message}const s1=seen.length;o.A_opp=seen[0];
 g.clk=1000;try{simRest()}catch(e){o.A_e2=e.message}o.A_rest=seen[s1];
 startGame0(1,'reg');g.ptS=500;g.ptN=10;g.clk=1000;try{injRest(0)}catch(e){o.A_e3=e.message}o.A_inj=seen[seen.length-1];
 simDrive=sd0;
 o.A_same=want>1.8&&Math.abs(o.A_opp-want)<1e-9&&Math.abs(o.A_rest-want)<1e-9&&Math.abs(o.A_inj-want)<1e-9;o.A_reset=SDT===1;
 // B: before 3 plays in a game, your pace from earlier games is used; endGame learns it
 startGame0(1,'reg');S.pace=40;g.ptN=0;o.B_fromSave=Math.abs(sdtNow()-40/23)<1e-9;
 startGame0(1,'reg');S.pace=null;g.ptS=330;g.ptN=11;g.s=[7,3];g.clk=3600;try{endGame()}catch(e){}o.B_learned=S.pace===30;
 // C: CPU-vs-CPU games still use the league pace
 o.C_cpu=SDT===1;
 // D: away whites: smaller numbers so the white shows; home unchanged
 let away=null,home=null;for(let oi=1;oi<=12;oi++){startGame0(oi,'reg');if(hmHome()&&home==null)home=oi;if(!hmHome()&&away==null)away=oi}
 const numW=(oi,mine)=>{startGame0(oi,'reg');ovHide();setup(0);const P=g.pl;const x=P.ol[0];sy(x,g.mj,0);let w=[];x.m.traverse(m=>{if(m.geometry&&m.geometry.type==='PlaneGeometry'&&m.material&&m.material.map)w.push(+m.geometry.parameters.width.toFixed(2))});return w};
 o.D_awayW=numW(away).join(',');o.D_homeW=numW(home).join(',');o.D_awayWhite=(()=>{startGame0(away,'reg');return g.mj.c1==='#f4f4f4'&&g.mj.aw===1})();
 o.D_awaySmall=/0\.56/.test(o.D_awayW)&&!/(^|,)1(,|$)/.test(o.D_awayW);o.D_homeSame=/(^|,)1(,|$)/.test(o.D_homeW);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
