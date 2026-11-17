// ===== ⏱ NFL OVERTIME WITH A REAL CLOCK · DELAY OF GAME · NO PASSING ON RUNS · XP % · WATCHED XP (Tyler 2026-11-17) =====
// Pro overtime used to be untimed "modified sudden death": the play clock never ran (no delay of game), and the other team's
// drive was simulated with 1 second on the clock, so it ended after one play ("Time expired"). Now pro OT is the NFL's:
// a 10:00 period in the regular season (a tie when it runs out), 15:00 periods in the playoffs; the game clock and play clock run
// exactly like regulation (same speed for both teams); both teams get the ball, then the next score wins.
window.otLen=function(){return (g.kind==='reg'||g.kind==='pro')?600:900};
window.otPlayoff=function(){return !(g.kind==='reg'||g.kind==='pro')};
window.otBegin=function(){g.otT=1;g.otp=1;g.clk=3600-otLen();g.tw2=0;g.cr=false;g.to=otPlayoff()?[3,3]:[2,2];g.otq=0};
(()=>{try{const _o=otStart;otStart=function(){const r=_o.apply(this,arguments);try{if(g.lv==='pro')otBegin()}catch(e){}return r};window.otStart=otStart}catch(e){}})();
// a saved game paused in the old untimed pro OT (nobody has had the ball yet) carries on under the timed rules
window.otMig=function(){try{if(g&&g.ot&&g.lv==='pro'&&!g.otT&&(g.otn||0)===0){otBegin();g.otq=0}}catch(e){}};
// possessions in timed OT: after both teams have had it, the first score (or any lead at the end of a possession) wins
// who had the ball: 0 you, 1 them. After the first possession only a DEFENSIVE score (pick-six, fumble return, safety) ends it.
window.otDone=function(had){g.otq=(g.otq||0)+1;const sc=g.s[0]-g.s[1];if(g.otq>=2&&sc!==0){endGame();return 1}
 if(g.otq===1&&sc!==0&&((had===0&&sc<0)||(had===1&&sc>0))){endGame();return 1}return 0};
(()=>{try{const _a=otAfter;otAfter=function(t,pts){if(!g.otT)return _a.apply(this,arguments);if(otDone(0))return;if(otTime())return;
  // your drive ended: they get it (after a score you kick off; a touchback)
  g.nx=g.nx||25;oppBall()};window.otAfter=otAfter}catch(e){}})();
// their drive ended (watched or simulated): count the possession, then you get the ball
(()=>{try{const _a=applyO;applyO=function(){if(g&&g.otT)g._otAO=1;return _a.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _p=pre;pre=function(){try{if(g&&g.otT&&g._otAO){g._otAO=0;if(otDone(1))return;if(otTime())return}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
// time runs out in an OT period
window.otTime=function(){if(!g.otT||g.clk<3600)return 0;if(g.s[0]!==g.s[1]){endGame();return 1}
 if(!otPlayoff()){g.note='Overtime ends in a tie';endGame();return 1}
 g.otp=(g.otp||1)+1;g.clk=3600-otLen();g.tw2=0;g.cr=false;if(g.otp%2)g.to=[3,3];g.note='End of OT period '+(g.otp-1)+': '+(g.otp)+(g.otp==2?'nd':g.otp==3?'rd':'th')+' overtime';return 0};
(()=>{try{const _c=chk;chk=function(w){if(g&&g.otT){return otTime()}return _c.apply(this,arguments)};window.chk=chk}catch(e){}})();
// a score in a period that isn't the first possession already counted happens inside drvEnd / applyO; a safety etc. go the same way
// ---------- no passing on a running play (there are no RPOs in the playbook) ----------
(()=>{try{const _d=doThrow;doThrow=function(){try{const P=g&&g.pl;if(P&&!g.watch&&P.call&&['run','qbrun','option'].includes(P.call.t)&&P.car===P.qb){g.flash='Run play: no pass';g.ft=.9;return}}catch(e){}return _d.apply(this,arguments)};window.doThrow=doThrow}catch(e){}})();
// ---------- the kicker's chance on the extra-point button ----------
window.xpPct=function(){try{return Math.round(fgP(g.lv=='pro'?33:20,KKt(0),g.lv)*100)}catch(e){return null}};
(()=>{try{const _p=pat;pat=function(){const r=_p.apply(this,arguments);try{const b=[...document.querySelectorAll('#ov button')].find(x=>/^Extra point/.test(x.textContent)),p=xpPct();if(b&&p!=null)b.textContent='Extra point · '+p+'%'}catch(e){}return r};window.pat=pat}catch(e){}})();
// ---------- a watched drive shows their extra point (it was added to the score without being shown) ----------
(()=>{try{const _w=watchO;watchO=function(){const r_=g.r,o=r_&&r_.pl;try{if(o&&o.length){const L=o.slice(),i=L.findIndex(e=>e.td);if(i>=0&&(r_.pts===6||r_.pts===7))L.splice(i+1,0,{k:'fg',ok:r_.pts===7,y0:84,dn:0,tg:0,s:L[i].s,xp:1});r_.pl=L}}catch(e){}
 try{return _w.apply(this,arguments)}finally{if(r_&&o)r_.pl=o}};window.watchO=watchO}catch(e){}})();
(()=>{try{const _e=wEnd;wEnd=function(txt,k){try{const P=g.pl;if(P&&P.e&&P.e.xp)txt=P.e.ok?'EXTRA POINT IS GOOD':'EXTRA POINT NO GOOD'}catch(e){}return _e.call(this,txt,k)};window.wEnd=wEnd}catch(e){}})();

// a game saved in the old untimed pro OT restarts overtime from the coin toss (Tyler 2026-11-17)
(()=>{try{const _p=pre;pre=function(){try{if(g&&g.ot&&g.lv==='pro'&&!g.otT&&!g.otRe){g.otRe=1;g.otn=0;g.otq=0;otStart();return}}catch(e){}return _p.apply(this,arguments)}}catch(e){}})();
