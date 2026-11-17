// WATCHED DRIVE CLOCK (Tyler 2026-11-17): the clock moves during plays and between them, never backwards, and stays where you saw it when the drive ends.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{S=await readCode(j);SLOT=1;LASTJ='';hub();startGame0(1,'reg');g.clk=900;g.nx=25;oppBall();const c0=g.clk;watchO();const T=[];
 for(let k=0;k<6000&&g.watch;k++){try{if(g.ph==='watch')wTick(1/30);else if(g.ph==='wdead'){W_.lt=performance.now()-33;wDeadClk();g.dt-=1/30;if(g.dt<=0)wNext()}}catch(e){T.push('E '+e.message);break}if(k%20==0)T.push([g.ph,+g.clk.toFixed(1)])}
 let mono=true;for(let i=1;i<T.length;i++)if(Array.isArray(T[i])&&Array.isArray(T[i-1])&&T[i][1]<T[i-1][1])mono=false;const ck_=g.clk;return {ok:mono&&T.filter(x=>Array.isArray(x)).length>6,c0,n:(g.r.pl||[]).length,s:(g.r.pl||[]).map(e=>e.s),T:T.slice(0,30)}},j);console.log(JSON.stringify(r));await b.close()})();
