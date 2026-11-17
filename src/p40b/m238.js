// ===== 💾 A FINISHED GAME IS NEVER LOST (Tyler 2026-11-17) =====
// "your update scratched my entire game that I just played, even though I was finished with it and was done walking the field ... the
// game needs to save exactly to the point where you're at. Every time." WHY: the game's stats were added at the final whistle, but the
// result (win/loss, score, the week moving on) was only recorded after the field walk and the coach's talk (fin). A reload anywhere in
// between (an update, the app closing) lost it. NOW: the result is saved at the final whistle (S.pend); fin clears it; if the page
// closes before fin, the next time the career opens the game is recorded right away, exactly as it ended.
// A game lost BEFORE this update (stats added, week never moved on) is detected and recorded with its REAL score, read from the box score
// stored at the final whistle. Only if that box score is missing too is the score asked for.
(()=>{try{const _e=endGame;endGame=function(){const r=_e.apply(this,arguments);try{if(g&&S&&g.kind!=='pbg'&&g.kind!=='pbgDone'&&!g.iwF&&g.s&&g.oi!=null){S.pend={oi:g.oi,kind:g.kind,w:g.s[0]>g.s[1]?1:0,s:[g.s[0],g.s[1]],stage:S.stage||'hs',wk:S.wk||0,yr:yrN(),title:g.title||''};save();try{zFlush()}catch(e){}}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _f=fin;fin=function(){try{if(S)delete S.pend}catch(e){}return _f.apply(this,arguments)}}catch(e){}})();
window.pendDo=function(){try{const p=S&&S.pend;if(!p)return 0;delete S.pend;if((S.stage||'hs')!==p.stage||(S.wk||0)!==p.wk||yrN()!==p.yr){save();return 0}
 g={oi:p.oi,kind:p.kind,w:p.w,s:p.s,o:S.T[p.oi],m:S.T[0],st:Z(),title:p.title,ph:'ovr'};const o=S.T[p.oi];HM=(HM?HM+' ':'')+'💾 Your last game was saved: '+(p.w?'W ':'L ')+p.s[0]+'-'+p.s[1]+' vs '+(o?o.n:'')+'.';
 window._pendRun=1;try{fin()}finally{window._pendRun=0}return 1}catch(e){window._pendRun=0;return 0}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.pend&&!window._pendRun&&!(g&&g.ph&&g.ph!=='ovr'&&g.oi===S.pend.oi&&cv.style.display==='block'))return pendDo()}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// a game lost before this existed: the season's games-played count is one ahead of the record and the week never moved on
window.lostGame=function(){try{if(!S||S.stage!=='pro'||S.pb||S.pend||S.lostAsk===S.wk+'|'+yrN())return null;const T=S.T[0],e=pevt();if(!e||e.t!=='pro'||e.o==null)return null;
 const played=(S.ss&&S.ss.g)||0,rec=(T.w||0)+(T.l||0)+(T.t||0);if(played!==rec+1)return null;return {o:e.o,w:S.lgw?1:0}}catch(e){return null}};
window.lostSave=function(){const L=lostGame();if(!L)return hub();const a=+document.getElementById('lgA').value,b=+document.getElementById('lgB').value;if(!(a>=0&&b>=0)||a===b||(a>b)!==!!L.w){const m=document.getElementById('lgM');if(m)m.textContent=L.w?'You won that game: your score has to be higher.':'You lost that game: their score has to be higher.';return}
 g={oi:L.o,kind:'pro',w:L.w,s:[a,b],o:S.T[L.o],m:S.T[0],st:Z(),ph:'ovr'};HM='💾 Recorded: '+(L.w?'W ':'L ')+a+'-'+b+' vs '+S.T[L.o].n+'.';window._pendRun=1;try{fin()}finally{window._pendRun=0}};
// the real score: the box score of that game was stored at the final whistle (score included). Use it; nothing typed, nothing made up.
window.lostAuto=function(){try{const L=lostGame();if(!L)return 0;const k=bxKey(S.wk||0,0,L.o),x=S.bx&&S.bx[k];if(!x||!x.s)return 0;const mine=x.A&&x.A.ti===0?[x.s[0],x.s[1]]:[x.s[1],x.s[0]];
 g={oi:L.o,kind:'pro',w:mine[0]>mine[1]?1:0,s:mine,o:S.T[L.o],m:S.T[0],st:Z(),ph:'ovr'};HM='💾 Your last game was recovered from its box score: '+(g.w?'W ':'L ')+mine[0]+'-'+mine[1]+' vs '+S.T[L.o].n+'.';window._pendRun=1;try{fin()}finally{window._pendRun=0}return 1}catch(e){window._pendRun=0;return 0}};
window.lostSkip=function(){S.lostAsk=S.wk+'|'+yrN();save();hub()};
(()=>{try{const _h=hub;hub=function(){try{if(!window._pendRun&&lostGame()&&lostAuto())return}catch(e){}const r=_h.apply(this,arguments);try{const L=lostGame();if(L&&ui&&ui.firstElementChild&&!ui.querySelector('[data-lost]')){const d=document.createElement('div');d.className='card';d.setAttribute('data-lost','1');
  d.innerHTML=`<b>💾 Your last game vs ${S.T[L.o].n} was played but not saved</b><br><small>An update interrupted it after the final whistle. Your stats from it are already in your season (a ${L.w?'win':'loss'}). Enter the final score and it's recorded; nothing is made up.</small><div class=row style="gap:6px;margin-top:6px"><input id=lgA type=number min=0 placeholder="You" style="width:30%"><input id=lgB type=number min=0 placeholder="${esc(S.T[L.o].n)}" style="width:30%"><button onclick="lostSave()" style="width:auto">Record it</button></div><small id=lgM></small>`;
  ui.firstElementChild.insertBefore(d,ui.firstElementChild.children[1]||null)}}catch(e){}return r}}catch(e){}})();
