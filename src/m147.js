// ===== 🏃 QUARTERBACK RUSHING TOUCHDOWNS FIT THE QUARTERBACK =====
// Tyler, 2026-11-14 (screenshot: Ham Luther 123 rush yds, 19 rush TD): "that would be like one of the most
// ever by a quarterback and he's not really a running quarterback ... I don't see him ever scoring more than
// 10, 11, 12 ... if he had a really good rushing season".
// Cause (mine, m135): in simmed games every rushing TD the lead back didn't get (42%) went to the QB,
// whatever kind of QB he was. Now each rushing TD goes to the QB only as often as his style runs it in:
// pocket passer 6%, balanced 12%, scrambler 22%, true runner 34% (so a pocket QB has ~1 a year, a runner
// 5-9, a great running year ~10-12); the rest go to the backs. Same number of dice rolls, so nothing else
// in any box score moves.
window.QBRUNP={'Mobile':.34,'Scrambling strong arm':.22,'Scrambler':.22,'Deep passer':.06,'Field General (balanced)':.12,'Pocket passer':.06};
window.qbRunP=function(n){try{const st=(typeof QBSTY!='undefined'&&QBSTY[n])||'';if(QBRUNP[st]!=null)return QBRUNP[st];return .12}catch(e){return .12}};
// the TDs the QB doesn't get are shared like real backfields: the lead back about two thirds, the rest to the
// other ball carriers (a 34-TD lead back showed up when he got them all; the real record is 28). Same dice.
window.bxRbSplit=function(n,r,qbN){const p=qbRunP(qbN);let rb=0,qb=0,o=0;for(let i=0;i<n;i++){const u=r();if(u<p)qb++;else if(u<p+(1-p)*.66)rb++;else o++}return {rb,qb,o}};
// QB rushing yards in simmed games were (dice-.2)x30 a game for every QB (~50-200 a season, even for runners).
// Now they follow his style too: per game around 6 (pocket), 14 (balanced), 26 (scrambler), 42 (runner),
// so a season lands near 100 / 240 / 450 / 700 yards with good and bad years. Same single dice roll.
window.QBRUNY={'Mobile':42,'Scrambling strong arm':26,'Scrambler':26,'Deep passer':6,'Field General (balanced)':14,'Pocket passer':6};
window.qbRunY=function(n,u){try{const st=(typeof QBSTY!='undefined'&&QBSTY[n])||'';const b=QBRUNY[st]!=null?QBRUNY[st]:14;return Math.round(b*(u*1.8-.15))}catch(e){return Math.round((u-.2)*30)}};
window.QBRUNP['Mobile']=.28;window.QBRUNP['Scrambling strong arm']=.2;window.QBRUNP['Scrambler']=.2;
