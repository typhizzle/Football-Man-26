// ===== 📋 YOUR BOX SCORES ADD UP TO YOUR REAL SEASON =====
// Tyler, 2026-11-16: "make sure all box scores match all stat seasonal and make sure they update by the week by the game and make sure
// there's no future stats shown."
// WHY THEY DIDN'T: your games' box scores were kept in a list capped at 60; when an old one was dropped, that game's box score was
// rebuilt from scratch with a made-up line for you (2,417 yds / 16 TD on box scores vs your real 2,843 / 27 in Simmons 2037).
// NOW:
//  - your own line from every game is also kept in a tiny per-game record (S.ugl) that is never dropped, and a box score that has to
//    be rebuilt uses it, so the game reads the same every time;
//  - games from before this update that have no record left get your real season totals split across them once (by how that game
//    went), then stored, so the box scores add up exactly to your season page;
//  - only games already played are ever counted (the schedule's results); nothing ahead of the current week shows up.
window.UGF=['att','cmp','yds','td','int','ry','rtd','sk','fum'];
window.uglLine=function(A){try{const p=(A.pass||[]).find(x=>x&&x.n===S.name);if(!p)return null;const r=(A.rush||[]).find(x=>x&&x.n===S.name)||{};
 return {att:p.a|0,cmp:p.c|0,yds:p.y|0,td:p.td|0,int:p.i|0,ry:r.y|0,rtd:r.td|0,sk:A.sk|0,fum:0}}catch(e){return null}};
// copy your line out of every stored box score (never removes anything)
window.uglSync=function(){try{if(!S||!S.bx)return 0;S.ugl=S.ugl||{};let n=0;for(const k in S.bx){if(S.ugl[k])continue;const x=S.bx[k];if(!x||!x.A||!x.B)continue;const A=x.A.ti===0?x.A:x.B.ti===0?x.B:null;if(!A)continue;const L=uglLine(A);if(L){S.ugl[k]=L;n++}}return n}catch(e){return 0}};
// a rebuilt box score of your game uses your stored line
(()=>{try{const _g=bxGet;bxGet=function(w,a,b){try{const k=bxKey(w,a,b);if(!(S.bx&&S.bx[k])&&(a===0||b===0)&&S.ugl&&S.ugl[k]){const r=schRes(w,a,b);if(r)return bxMake(w,a,b,r[0],r[1],S.ugl[k])}}catch(e){}return _g.apply(this,arguments)};window.bxGet=bxGet}catch(e){}})();
// your season totals as the season page shows them
window.uglSeason=function(){try{if(S.stage==='pro'){const s=S.ssrk==='pro'+S.py&&S.ssr&&S.ssr.g?S.ssr:S.ss;return s&&s.g?s:null}if(S.stage==='col')return S.ss&&S.ss.g?S.ss:null}catch(e){}return null};
// your games this season that have been played (from the schedule's results only)
window.uglGames=function(){const out=[];try{const G=S.gr||{};Object.keys(G).map(Number).sort((a,b)=>a-b).forEach(w=>{(G[w]||[]).forEach(gm=>{if(!gm||gm.length<4)return;if(gm[0]!==0&&gm[1]!==0)return;const o=gm[0]===0?gm[1]:gm[0];out.push({w,o,k:bxKey(w,0,o)})})})}catch(e){}return out};
// fill the games that have no record: what's left of the season, split by how each game went; done once per game, then stored
window.uglFill=function(){try{if(!S||!(S.stage==='pro'||S.stage==='col'))return 0;uglSync();const T=uglSeason();if(!T)return 0;const Gs=uglGames();if(!Gs.length)return 0;S.ugl=S.ugl||{};
 const known=Gs.filter(x=>S.ugl[x.k]),miss=Gs.filter(x=>!S.ugl[x.k]);if(!miss.length)return 0;
 const slots=Math.max(0,Math.min(miss.length,(T.g|0)-known.length));if(!slots)return 0;const use=miss.slice(0,slots);
 const left={};UGF.forEach(f=>{left[f]=Math.max(0,(T[f]|0)-known.reduce((s,x)=>s+(S.ugl[x.k][f]|0),0))});
 // weights: the made-up line each game would have had (bigger games get more)
 const base=use.map(x=>{try{const r=schRes(x.w,0,x.o);const bx=bxMake(x.w,0,x.o,r?r[0]:20,r?r[1]:20,null);return uglLine(bx.A.ti===0?bx.A:bx.B)||{}}catch(e){return {}}});
 const split=(tot,ws)=>{const s=ws.reduce((a,b)=>a+b,0);const raw=ws.map(v=>s>0?tot*v/s:tot/ws.length),fl=raw.map(Math.floor);let rem=tot-fl.reduce((a,b)=>a+b,0);raw.map((v,i)=>[v-fl[i],i]).sort((a,b)=>b[0]-a[0]).forEach(([_,i])=>{if(rem>0){fl[i]++;rem--}});return fl};
 const per={};UGF.forEach(f=>{const wf={att:'att',cmp:'att',yds:'yds',td:'td',int:'int',ry:'ry',rtd:'rtd',sk:'sk',fum:'fum'}[f];per[f]=f==='cmp'?null:split(left[f],base.map(b=>Math.max(.5,(b[wf]|0)+1)))});per.cmp=split(left.cmp,per.att.map(v=>v+.01));for(let i=0;i<use.length;i++)if(per.cmp[i]>per.att[i]){const j=per.cmp.findIndex((c,k)=>c<per.att[k]);if(j>=0){per.cmp[j]++;per.cmp[i]--}}
 use.forEach((x,i)=>{const L={};UGF.forEach(f=>L[f]=per[f][i]);L.fill=1;S.ugl[x.k]=L});try{szCache=null}catch(e){}return use.length}catch(e){return 0}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&(S.stage==='pro'||S.stage==='col')){const n=uglFill();if(n)try{save()}catch(e){}}}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
// the season page totals and the box-score totals: the cache key also follows your records
(()=>{try{const _k=window.szKey;window.szKey=function(){return _k.apply(this,arguments)+'|'+Object.keys(S.ugl||{}).length}}catch(e){}})();
