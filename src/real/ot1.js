// NFL OVERTIME (Tyler 2026-11-17): pro OT is timed (10:00 regular, 15:00 playoffs), the play clock runs (delay of game), both teams
// get the ball (a first-drive TD doesn't end it), a defensive score on the first possession does, opponent drives have real clock.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{S=await readCode(j);SLOT=1;hub();let ended=0;const _e=endGame;endGame=function(){ended++};
 const go=k=>{startGame0(1,k);g.lv='pro';g.s=[21,21];g.clk=3600;ended=0;otStart();ovHide();g.y=25;g.dn=1;g.tg=10};
 go('pp');o.A_playoff15=g.otT===1&&g.clk===2700;g.ph='pre';g.tk=1;g.pc=.01;preTick(.05);o.B_delayOfGame=/Delay of game/.test(g.note||'');
 g.s[0]+=7;drvEnd(25,'TD');o.C_firstTDnotOver=ended===0&&g.ph==='opp';o.D_oppDriveHasClock=g.r&&g.r.pl.length>1;
 g.r={pts:0,sec:600,res:'Punt',next:20,pl:[]};applyO();o.E_stopThemWins=ended===1;
 go('reg');o.F_reg10=g.clk===3000;g.s[1]+=7;drvEnd(25,'Pick six');o.G_pick6Ends=ended===1;
 go('reg');g.clk=3600;g.s=[24,24];o.H_regTie=chk(0)===1&&ended===1;
 go('pp');g.clk=3600;g.s=[24,24];chk(0);o.I_playoffNewPeriod=ended===0&&g.clk===2700&&g.otp===2;
 }catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(r));await b.close()})();
