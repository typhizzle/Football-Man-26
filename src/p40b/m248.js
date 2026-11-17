// ===== ⏱ TWO-MINUTE CLOCK ON SIMULATED + WATCHED DRIVES: out of bounds, incompletions and TIMEOUTS stop it (Tyler 2026-11-17) =====
// Inside the last 2:00 of a half, a drive now plays like a real two-minute drill: an incompletion or a play that goes out of bounds
// stops the clock (only the play itself runs off, 4-8 s), and a team that is tied or behind (offense) calls a timeout to stop a
// running clock and take the lead or tie; the defense calls timeouts when the offense is ahead and the clock is running.
// Timeouts come out of the same 3-per-half the game keeps (g.to = [yours, theirs]). Early in a half the drive keeps your own pace.
window.SDTO=null;
(()=>{try{const _s=simDrive;simDrive=function(o,d,y,sec,lead,h2,kk){let ctx=0,themOff=1;try{ctx=(g&&g.ph==='opp'&&Array.isArray(g.to)&&!g.ot&&g.kind!=='pbg')?1:0;themOff=!g._ownSim}catch(e){}
 if(ctx)SDTO={a:themOff?g.to[1]:g.to[0],d:themOff?g.to[0]:g.to[1]};else SDTO=null;
 try{return _s.apply(this,arguments)}finally{try{if(ctx&&SDTO){if(themOff){g.to[1]=SDTO.a;g.to[0]=SDTO.d}else{g.to[0]=SDTO.a;g.to[1]=SDTO.d}}}catch(e){}SDTO=null}};window.simDrive=simDrive}catch(e){}})();
(()=>{try{const _i=injOwn;injOwn=function(){try{g._ownSim=1}catch(e){}try{return _i.apply(this,arguments)}finally{try{g._ownSim=0}catch(e){}}};window.injOwn=injOwn}catch(e){}})();
// one play inside the two-minute zone: how much clock the play really used (called from simDrive)
window.sdStop=function(used,tx,gn,lead,pre){try{if(pre>120)return {t:used,s:0};const T=SDTO,short=ri(4,8);
 const inc=tx=='Incomplete pass',oob=!inc&&tx!='Sack'&&tx!='Intercepted!'&&gn>0&&R()<(lead<=0?(tx.startsWith('Pass')?.4:.22):.06);
 if(inc||oob)return {t:Math.min(used,short),s:1,oob:oob?1:0};
 if(T&&used>short){
  if(lead<=0&&T.a>0&&pre<=120&&R()<.9){T.a--;return {t:short,s:1,to:1}}          // offense: tied or behind, spends a timeout to stop the clock
  if(lead>0&&T.d>0&&pre<=120&&R()<.85){T.d--;return {t:short,s:1,to:2}}}           // defense: behind, saves time
 return {t:used,s:0}}catch(e){return {t:used,s:0}}};
