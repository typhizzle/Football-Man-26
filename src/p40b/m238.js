// ===== 💾 A FINISHED GAME IS NEVER LOST (Tyler 2026-11-17) =====
// "your update scratched my entire game that I just played, even though I was finished with it and was done walking the field ... the
// game needs to save exactly to the point where you're at. Every time." WHY: the game's stats were added at the final whistle, but the
// result (win/loss, score, the week moving on) was only recorded after the field walk and the coach's talk (fin). A reload anywhere in
// between (an update, the app closing) lost it. NOW: the result is saved at the final whistle (S.pend); fin clears it; if the page
// closes before fin, the next time the career opens the game is recorded right away, exactly as it ended.
// A game lost BEFORE this update (stats added, week never moved on) is detected and recorded with its REAL score, read from the box score
// stored at the final whistle. Only if that box score is missing too is the score asked for.
(()=>{try{const _e=endGame;endGame=function(){const r=_e.apply(this,arguments);try{if(g&&S&&g.kind!=='pbg'&&g.kind!=='pbgDone'&&!g.iwF&&g.s&&g.oi!=null){S.pend={st:g.st?{...g.st}:null,oi:g.oi,kind:g.kind,w:g.s[0]>g.s[1]?1:0,s:[g.s[0],g.s[1]],stage:S.stage||'hs',wk:S.wk||0,yr:yrN(),title:g.title||''};save();try{zFlush()}catch(e){}}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _f=fin;fin=function(){try{if(S)delete S.pend}catch(e){}return _f.apply(this,arguments)}}catch(e){}})();
window.pendDo=function(){try{const p=S&&S.pend;if(!p)return 0;delete S.pend;if((S.stage||'hs')!==p.stage||(S.wk||0)!==p.wk||yrN()!==p.yr){save();return 0}
 g={oi:p.oi,kind:p.kind,w:p.w,s:p.s,o:S.T[p.oi],m:S.T[0],st:p.st||Z(),title:p.title,ph:'ovr'};const o=S.T[p.oi];HM=(HM?HM+' ':'')+'💾 Your last game was saved: '+(p.w?'W ':'L ')+p.s[0]+'-'+p.s[1]+' vs '+(o?o.n:'')+'.';
 try{if(p.st&&p.st.att)GPLS={st:p.st}}catch(e){}window._pendRun=1;try{fin()}finally{window._pendRun=0}return 1}catch(e){window._pendRun=0;return 0}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.pend&&!window._pendRun&&!(g&&g.ph&&g.ph!=='ovr'&&g.oi===S.pend.oi&&cv.style.display==='block'))return pendDo()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// a game lost before this existed: the season's games-played count is one ahead of the record and the week never moved on
window.lostGame=function(){try{if(!S||S.stage!=='pro'||S.pb||S.pend||S.lostAsk===S.wk+'|'+yrN())return null;const T=S.T[0],e=pevt();if(!e||e.t!=='pro'||e.o==null)return null;
 // the sure sign: this week's game has its box score (stored at the final whistle) but no result was recorded. (Counting games played
 // was not reliable: Tyler's Cam save also carried an old 2022-dated entry, so the count was off by two and the game wasn't found.)
 const k=bxKey(S.wk||0,0,e.o),bx=S.bx&&S.bx[k];if(!bx||!bx.s)return null;const res=((S.gr||{})[S.wk]||[]).some(gm=>gm&&gm.length>=4&&((gm[0]===0&&gm[1]===e.o)||(gm[1]===0&&gm[0]===e.o)));if(res)return null;
 if(S.gsave&&S.gsave.oi===e.o&&(S.gsave.clk||0)>0)return null;   /* a replay is under way and actually being played: leave it */
 const mine=bx.A&&bx.A.ti===0?bx.s[0]>bx.s[1]:bx.s[1]>bx.s[0];return {o:e.o,w:mine?1:0}}catch(e){return null}};
window.lostSave=function(){const L=lostGame();if(!L)return hub();const a=+document.getElementById('lgA').value,b=+document.getElementById('lgB').value;if(!(a>=0&&b>=0)||a===b||(a>b)!==!!L.w){const m=document.getElementById('lgM');if(m)m.textContent=L.w?'You won that game: your score has to be higher.':'You lost that game: their score has to be higher.';return}
 g={oi:L.o,kind:'pro',w:L.w,s:[a,b],o:S.T[L.o],m:S.T[0],st:Z(),ph:'ovr'};HM='💾 Recorded: '+(L.w?'W ':'L ')+a+'-'+b+' vs '+S.T[L.o].n+'.';window._pendRun=1;try{fin()}finally{window._pendRun=0}};
// the real score: the box score of that game was stored at the final whistle (score included). Use it; nothing typed, nothing made up.
window.lostAuto=function(){try{const L=lostGame();if(!L)return 0;const k=bxKey(S.wk||0,0,L.o),x=S.bx&&S.bx[k];if(!x||!x.s)return 0;const mine=x.A&&x.A.ti===0?[x.s[0],x.s[1]]:[x.s[1],x.s[0]];
 if(S.gsave&&S.gsave.oi===L.o)S.gsave=null;   /* the same game started over at kickoff: it's this one, already played */
 const side=x.A&&x.A.ti===0?x.A:x.B,pl=(side.pass||[]).find(p=>p.n===S.name)||{},ru=(side.rush||[]).find(p=>p.n===S.name)||{};const st_={...Z(),att:pl.a|0,cmp:pl.c|0,yds:pl.y|0,td:pl.td|0,int:pl.i|0,ry:ru.y|0,rtd:ru.td|0};   /* your real line, so the story knows you played */
 g={oi:L.o,kind:'pro',w:mine[0]>mine[1]?1:0,s:mine,o:S.T[L.o],m:S.T[0],st:st_,ph:'ovr'};HM='💾 Your last game was recovered from its box score: '+(g.w?'W ':'L ')+mine[0]+'-'+mine[1]+' vs '+S.T[L.o].n+'.';try{if(st_.att)GPLS={st:st_}}catch(e){}   /* the story knows you played */window._pendRun=1;try{fin()}finally{window._pendRun=0}return 1}catch(e){window._pendRun=0;return 0}};
window.lostSkip=function(){S.lostAsk=S.wk+'|'+yrN();save();hub()};
(()=>{try{const _h=hub;hub=function(){try{if(!window._pendRun&&lostGame()&&lostAuto())return}catch(e){}const r=_h.apply(this,arguments);try{const L=lostGame();if(L&&ui&&ui.firstElementChild&&!ui.querySelector('[data-lost]')){const d=document.createElement('div');d.className='card';d.setAttribute('data-lost','1');
  d.innerHTML=`<b>💾 Your last game vs ${S.T[L.o].n} was played but not saved</b><br><small>An update interrupted it after the final whistle. Your stats from it are already in your season (a ${L.w?'win':'loss'}). Enter the final score and it's recorded; nothing is made up.</small><div class=row style="gap:6px;margin-top:6px"><input id=lgA type=number min=0 placeholder="You" style="width:30%"><input id=lgB type=number min=0 placeholder="${esc(S.T[L.o].n)}" style="width:30%"><button onclick="lostSave()" style="width:auto">Record it</button></div><small id=lgM></small>`;
  ui.firstElementChild.insertBefore(d,ui.firstElementChild.children[1]||null)}}catch(e){}return r}}catch(e){}})();
// ===== a game counted twice comes off (Tyler 2026-11-17: "it says 17 games, 17 and oh ... I'm in week 18. There's a bye week") =====
// His Cam save: the 16 game lines add up to 4,617 yds / 56 TD, but the season said 4,989 / 61 and 17 games, 17 wins: the interrupted
// week-16 game (9/14, 372, 5 TD, 2 INT) was added twice. Rule: if the season totals equal the sum of this season's game lines PLUS
// exactly one of those lines again (and games played is one too many), that extra copy is taken off the season and career totals.
window.dupGameFix=function(s){try{s=s||S;if(!s||s.stage!=='pro'||!s.ugl||!s.ss)return 0;const pre='pro'+(()=>{const o=S;S=s;try{return yrN()}finally{S=o}})()+'|';const K=Object.keys(s.ugl).filter(k=>k.startsWith(pre));if(!K.length)return 0;
 const F=[['att','att'],['cmp','cmp'],['yds','yds'],['td','td'],['int','int'],['ry','ry'],['rtd','rtd']];const sum={};F.forEach(([a,b])=>sum[a]=K.reduce((t,k)=>t+(+s.ugl[k][b]||0),0));
 if((s.ss.g|0)!==K.length+1)return 0;const diff={};F.forEach(([a])=>diff[a]=(s.ss[a]|0)-sum[a]);let dupK=K.find(k=>F.every(([a,b])=>diff[a]===(+s.ugl[k][b]||0)));
 // played to the end twice (the game before a reload, then again): the extra is the box score's line (the latest complete game). Keep the
 // box score as that week; take the OTHER copy (the stored line) off the totals and store the box score's line in its place.
 if(!dupK){for(const k of K){const x=s.bx&&s.bx[k];if(!x||!x.s)continue;const sd=x.A&&x.A.ti===0?x.A:x.B;const p=(sd.pass||[]).find(q=>q.n===s.name)||{},r=(sd.rush||[]).find(q=>q.n===s.name)||{};
   const bl={att:p.a|0,cmp:p.c|0,yds:p.y|0,td:p.td|0,int:p.i|0,ry:r.y|0,rtd:r.td|0};if(F.every(([a])=>diff[a]===bl[a])){const old=s.ugl[k];s.ugl[k]={...old,...bl,sk:old.sk|0,fum:old.fum|0};const L0=old;
    const w=(()=>{const m=x.A&&x.A.ti===0?x.s:[x.s[1],x.s[0]];return m[0]>m[1]})();const sub=o=>{if(!o)return;F.forEach(([a,b])=>{o[a]=Math.max(0,(o[a]|0)-(+L0[b]||0))});o.g=Math.max(0,(o.g|0)-1);const kk=w?'w':'l';o[kk]=Math.max(0,(o[kk]|0)-1)};
    sub(s.ss);sub(s.cs);try{sub(s.cst&&s.cst.pro&&s.cst.pro.reg)}catch(e){}s.dupFixed=(s.dupFixed||[]).concat([k+'(played twice)']);try{szCache=null}catch(e){}return 1}}return 0}
 const L=s.ugl[dupK];const w=(()=>{try{const x=s.bx&&s.bx[dupK];if(x&&x.s){const m=x.A&&x.A.ti===0?x.s:[x.s[1],x.s[0]];return m[0]>m[1]}}catch(e){}return true})();
 const sub=o=>{if(!o)return;F.forEach(([a,b])=>{o[a]=Math.max(0,(o[a]|0)-(+L[b]||0))});o.g=Math.max(0,(o.g|0)-1);const k=w?'w':'l';o[k]=Math.max(0,(o[k]|0)-1)};
 sub(s.ss);sub(s.cs);try{sub(s.cst&&s.cst.pro&&s.cst.pro.reg)}catch(e){}s.dupFixed=(s.dupFixed||[]).concat([dupK]);return 1}catch(e){return 0}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&!window._pendRun&&dupGameFix(S)){HM=(HM?HM+' ':'')+'🧮 A game that had been counted twice in your season totals was fixed.';save()}}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
