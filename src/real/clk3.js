// Tyler 2026-11-15: "clock should move for every single play in the game ... no slowdowns" + college first down: the clock
// starts again once you're set at the line (last 2 minutes).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.CLK3_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');ovHide();
 const run=(pl,sec0)=>{g.clk=600;const rem=1800-g.clk;g.r={pts:0,next:25,sec:pl[pl.length-1].s,res:'x',log:[],pl};watchO();const c0=g.clk;const seen=[];for(let i=0;i<20;i++){try{wTick(.25)}catch(e){}seen.push(+g.clk.toFixed(1))}return {c0,seen}};
 // A: a field goal moves the clock while it is in the air (it used to freeze, then jump)
 const a=run([{k:'fg',ok:true,y0:70,dn:4,tg:3,s:1170}]);o.A_seen=a.seen.slice(0,6).join(',');o.A_kickMoves=a.seen[3]>a.c0&&a.seen[3]<a.c0+30;
 skipW();
 // B: a normal play runs at your own play speed (g.rate game-seconds per real second), not spread over 4.5 seconds
 const r_=g.rate;const b2=run([{k:'run',gn:4,y0:30,dn:1,tg:10,s:1140}]);o.B_rate=r_;o.B_seen=b2.seen.slice(0,8).join(',');o.B_atRate=Math.abs((b2.seen[1]-b2.seen[0])-.25*r_)<.6&&b2.seen[19]===b2.c0+60;
 skipW();
 // C: college, last 2 minutes: a first down stops the clock, and setting up at the line starts it again
 g.lv='col';g.fdStop=1;g.cr=false;g.ph='pre';g.tk=1;pick('Short',0);o.C_runsAtLine=g.cr===true&&!g.fdStop;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
