// ===== 📋 EVERYONE'S BOX SCORES = EVERYONE'S SEASON =====
// Tyler, 2026-11-16: "My box score adds up to my stats, but does everyone's box score do that? That's a real question."
// Measured: in a fresh league's full season, 20 of 191 players' recorded season lines were lower than their box scores (Jarsh Fallon
// 2,920 vs 3,546). Cause: when a CPU player missed games hurt, the box scores still showed him playing (they didn't know which weeks
// he was out) and the season-end writer then scaled his line down by the games missed. Now every game a player misses is logged by
// week, the box score of that game has his backup in his place (the backup QB, or the next man at his position), and his season line
// is exactly the sum of the games he played. Games missed before this update (no week logged) keep the old handling.
window.gmKey=function(w){try{return grK()+'|'+w}catch(e){return '?|'+w}};
(()=>{try{const _t=injTick;injTick=function(){const pre=new Map();try{for(const k in (S&&S.ro)||{}){if(!/^h\.\d+$/.test(k))continue;(S.ro[k]||[]).forEach(x=>{if(x)pre.set(x,x.gm||0)})}}catch(e){}
 const r=_t.apply(this,arguments);try{const w=S.stage==='col'?(S.wk||0)-1:(S.wk||0),key=gmKey(w);pre.forEach((g0,x)=>{if((x.gm||0)>g0){x.gmW=(x.gmW||[]).slice(-60);if(!x.gmW.includes(key))x.gmW.push(key)}});if(!S.gmSys&&w<=0)S.gmSys=grK()}catch(e){}return r}}catch(e){}})();
window.gmOut=function(x,key){if(!x)return false;if(x.gmW&&x.gmW.includes(key))return true;try{if(x.inj&&!x.inj.nw&&key===gmKey(S.stage==='col'?(S.wk||0)-1:(S.wk||0)))return true}catch(e){}return false};   // hurt right now = out of this week's game (your game's box is saved before the week ticks)
window.gmSub=function(L,k,key){const x=L[k];if(!x)return -1;let g_='';try{g_=lgGrp(x.pos)}catch(e){g_=x.pos}
 const ok=j=>{const y=L[j];if(!y||gmOut(y,key))return false;let gy='';try{gy=lgGrp(y.pos)}catch(e){gy=y.pos}return gy===g_};
 if(k===0){for(const j of [23,24])if(ok(j))return j}for(let j=25;j<L.length;j++)if(ok(j))return j;if(k!==0)for(const j of [23,24])if(ok(j))return j;return -1};
// The roster is NEVER changed while a box score is built (an earlier version swapped players in place, and a copy of the roster
// taken mid-build could keep a blank stand-in — caught in testing, never published). The box score is built as usual, then the
// lines of a player who was out that week are credited to the man who played in his place, by name.
window.gmMerge=function(list,from,to){if(!Array.isArray(list))return;const a=list.findIndex(p=>p&&p.n===from);if(a<0)return;const b=list.findIndex(p=>p&&p.n===to);
 if(b<0){list[a]={...list[a],n:to};return}const A=list[a],B={...list[b]};for(const k in A){if(k!=='n'&&k!=='p'&&typeof A[k]==='number')B[k]=(B[k]||0)+A[k]}list[b]=B;list.splice(a,1)};
(()=>{try{const _b=bxSide;bxSide=function(ti){const R_=_b.apply(this,arguments);try{if(!R_)return R_;const L=rost('h.'+ti);if(!Array.isArray(L))return R_;
  const key=(typeof BXW!=='undefined'&&BXW!=null)?gmKey(BXW):null;const map={};const used=new Set();
  if(key){for(let k=0;k<=22;k++){if(ti===0&&k===0)continue;const x=L[k];if(!x||!gmOut(x,key))continue;const j=gmSub(L,k,key);const y=j>=0?L[j]:null;if(y&&!used.has(y.n)){map[x.n]=y.n;used.add(y.n)}}
   // a hurt man on the bench never shows up either: his lines go to the starter at his position
   for(let k=23;k<L.length;k++){const x=L[k];if(!x||!gmOut(x,key)||map[x.n])continue;let g_='';try{g_=lgGrp(x.pos)}catch(e){g_=x.pos}const st=L.slice(0,23).find(y=>y&&!gmOut(y,key)&&(()=>{try{return lgGrp(y.pos)===g_}catch(e){return y.pos===x.pos}})());if(st)map[x.n]=st.n}}
  for(const f in map)['pass','rush','rec','def'].forEach(c=>gmMerge(R_[c],f,map[f]));
  let st=L.slice(0,23).filter(Boolean).map(x=>map[x.n]||x.n);if(ti===0&&R_.pass&&R_.pass[0]&&R_.pass[0].n&&st[0]===S.name&&R_.pass[0].n!==S.name)st[0]=R_.pass[0].n;R_.gs=st}catch(e){}return R_};window.bxSide=bxSide}catch(e){}})();
// season end: in a season that started with this update the box scores are the record (no scaling); a season already under way
// when the update arrived only scales the games missed before it (not logged by week)
(()=>{try{const _s=seasonEnd;seasonEnd=function(){const st=[];try{const pre=gmKey(0).split('|')[0],full=S.gmSys===pre;for(const k in (S&&S.ro)||{}){if(!/^h\.\d+$/.test(k))continue;(S.ro[k]||[]).forEach(x=>{if(!x||!x.gm)return;if(full){st.push([x,x.gm]);x.gm=0;return}if(!x.gmW)return;const n=x.gmW.filter(q=>q.split('|')[0]===pre).length;if(n){st.push([x,x.gm]);x.gm=Math.max(0,x.gm-n)}})}}catch(e){}
 try{return _s.apply(this,arguments)}finally{st.forEach(([x,g])=>{x.gm=g})}};window.seasonEnd=seasonEnd}catch(e){}})();
// a player with no box-score stats this season gets a zero line (he was on the team, he didn't play) — never a made-up line
(()=>{try{const _a=window.szArchiveV;window.szArchiveV=function(ti,x,g){const r=_a.apply(this,arguments);if(r)return r;try{if(!S||!S.bxv||!x||!x.n)return r;const Z={q:6,r:4,w:2,d:1,b:2}[g];return Z?new Array(Z).fill(0):r}catch(e){return r}}}catch(e){}})();
