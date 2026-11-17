// TWO-MINUTE DRILL + QB NEED CONTRACTS (Tyler 2026-11-17): in the last 2:00 of a half an incompletion/out-of-bounds stops the clock
// (a drive gets more plays in the same time than a no-stop drive), tied/trailing offenses call timeouts (3 per half, taken from g.to),
// leading-offense drives never spend the offense's timeouts; QB Need reads the starter's contract.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{S=await readCode(j);SLOT=1;LASTJ='';hub();
 const N=300;let dto=0,plays=0,used=0,tos=0,oobs=0,stopped=0,tos_lead=0;
 for(let k=0;k<N;k++){startGame0(1,'reg');g.ph='opp';g.to=[3,3];g.clk=1680;g.nx=30;g.s=[17,20];const r=simDrive(80,80,30,120,-3,false,{kp:70,ka:70});plays+=r.pl.length;used+=120-r.sec;oobs+=r.pl.filter(p=>p.oob).length;tos+=r.pl.filter(p=>p.to===1).length;
  g.ph='opp';g.to=[3,3];const r2=simDrive(80,80,30,120,7,false,{kp:70,ka:70});tos_lead+=r2.pl.filter(p=>p.to===1).length;dto+=r2.pl.filter(p=>p.to===2).length}
 o.A_stoppages=oobs>0;o.A_offTimeouts=tos>0;o.A_leadNoOffTO=tos_lead===0;o.A_defTimeouts=dto>0;o.stat={plays:plays/N,oobs:oobs/N,tos:tos/N,tosLead:tos_lead/N};
 // timeouts are taken out of the game's 3 per half
 startGame0(1,'reg');g.ph='opp';g.to=[3,3];g.clk=1700;g.nx=25;g.s=[14,17];g.o.ovr=80;let mn=3;for(let k=0;k<60;k++){g.ph='opp';g.to=[3,3];simDrive(g.o.ovr,g.m.ovr,30,110,-3,false,{kp:70,ka:70});mn=Math.min(mn,g.to[1])}o.B_timeoutsSpent=mn<3;o.B_neverNegative=g.to[1]>=0&&g.to[0]>=0;
 // QB need reads the contract: same QB, last year of a deal vs a long fresh extension
 const pi=S.pro.findIndex(t=>t),pj=7;const R0=qbRoom(pj);if(R0){const x=rost(S.T.indexOf(S.pro[pj])>=0?'h.'+S.T.indexOf(S.pro[pj]):'p.'+pj);const q=x.find(y=>y&&y.pos==='QB');if(q){q.ct={sal:30,yrs:1,y:1,exp:yrN(),how:'orig'};const a=qbgTarget(pj);q.ct={sal:40,yrs:5,y:5,exp:yrN()+4,how:'ext'};const b2=qbgTarget(pj);o.C_contractMatters=b2>a;o.C_vals=[a,b2]}else o.C_contractMatters='noqb'}
 }catch(e){o.err=e.message+' '+e.stack.slice(0,200)}return o},j);console.log(JSON.stringify(r));await b.close()})();
