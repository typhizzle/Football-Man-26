// ===== 🏆 THE ULTRA BOWL MVP BALLOT IS THE REAL GAME =====
// Tyler, 2026-11-14 (screenshot: Bacon Maple QB 378 yds AND Puka Frost QB 155 yds, both TB, "in the Ultra
// Bowl"): "Did two quarterbacks play in the Super Bowl actually? ... That's a lot of stats for two quarterbacks".
// They did not. m99 made a separate "big game" for each finalist from his season average, so every man on the
// champion's ballot got his own invented line (two QBs, receivers whose yards add up to more than the passer
// threw). From the next Ultra Bowl on, the ballot is ONE box score of the actual final (its real score and
// the two teams, built the same way as every other game's box score): one quarterback per team, receivers
// whose catches add up to his passing line, defenders whose sacks and picks match the other side's line.
// The finalists are the men who actually did something in it; the MVP stays the man voted, unless he
// did not play in that game, in which case it goes to the best line in it. Past seasons are not rewritten.
window.ubFinal=function(){try{const B=S.pb;if(!B||B.champ==null||!B.hist||!B.hist.length)return null;const H=B.hist[B.hist.length-1];
 const g=H.find(x=>x[2]===B.champ)||H[0];if(!g)return null;const [a,b,w,sa,sb]=g;return {a,b,w,sa,sb}}catch(e){return null}};
window.ubBox=function(f){try{return bxMake(99,f.a,f.b,f.sa,f.sb,null)}catch(e){return null}};
window.ubCands=function(f,bx){const side=f.w===f.a?bx.A:bx.B,T=S.T[f.w],tm=tAb(T),pi=typeof pIdx=='function'?pIdx(T):f.w,out=[];const L=rost('h.'+f.w)||[];
 const pos=n=>{const x=L.find(y=>y&&y.n===n);return x?x.pos:''};const mk=(n,ln,s)=>{if(!n||n==='—')return;const o=out.find(c=>c.n===n);if(o){o.ln=o.ln.replace(' · in the Ultra Bowl','')+'; '+ln+' · in the Ultra Bowl';o.s+=s;return}
  out.push({n,a:typeof abbr=='function'?abbr(n):n,tm,pos:pos(n)||'',pi,ln:ln+' · in the Ultra Bowl',s,ubg:1,ubr:1})};
 const q=(side.pass||[])[0];if(q&&q.a)mk(q.n,`${q.c}/${q.a}, ${q.y} yds, ${q.td} TD, ${q.i} INT`,q.y/25+q.td*5-q.i*3+8);
 (side.rush||[]).filter(x=>x.c>0).sort((x,y)=>y.y-x.y).slice(0,2).forEach(x=>mk(x.n,`${x.c} car, ${x.y} rush yds, ${x.td} TD`,x.y/10+x.td*6));
 (side.rec||[]).filter(x=>x.c>0).sort((x,y)=>y.y-x.y).slice(0,3).forEach(x=>mk(x.n,`${x.c} rec, ${x.y} yds, ${x.td} TD`,x.y/10+x.td*6));
 (side.def||[]).slice(0,3).forEach(x=>{const p=[];if(x.t)p.push(x.t+' tkl');if(x.s)p.push(x.s+' sack'+(x.s==1?'':'s'));if(x.i)p.push(x.i+' INT');if(x.ff)p.push(x.ff+' FF');mk(x.n,p.join(', '),x.s*6+x.i*8+x.t*.6+(x.ff||0)*4)});
 return out.sort((x,y)=>y.s-x.s)};
window.ubReal=function(py){try{const A=S&&S.law&&S.law[py];if(!A||A.ubr)return false;if(A.yr!==yrN())return false;
 const f=ubFinal();if(!f)return false;const bx=ubBox(f);if(!bx)return false;const C=ubCands(f,bx);if(!C.length)return false;
 const old=(A.c&&A.c.SBMVP)||[],me=old.filter(c=>c.me);
 // your own line in a game you played is yours: keep it, and don't list a made-up one for you
 const list=[...me,...C.filter(c=>!me.some(m=>m.n===c.n))];
 A.c=A.c||{};A.c.SBMVP=list;
 const W=A.w&&A.w.SBMVP;
 if(W&&!W.me&&!list.some(c=>c.n===W.n)){const nw=C[0];
  // the voted man did not play in the final: the award goes to the best line in it (counts follow)
  try{const L=rost('h.'+f.w)||[];const xo=L.find(y=>y&&y.n===W.n),xn=L.find(y=>y&&y.n===nw.n);if(xo&&xo.aw&&xo.aw.sbm)xo.aw.sbm--;if(xn){xn.aw=xn.aw||{};xn.aw.sbm=(xn.aw.sbm||0)+1}}catch(e){}
  A.w.SBMVP={...nw}}
 else if(W&&!W.me){const c=list.find(c=>c.n===W.n);if(c)A.w.SBMVP={...W,ln:c.ln,ubg:1,ubr:1}}
 A.ubr=1;S.ubf=S.ubf||{};S.ubf[A.yr]=f;return true}catch(e){return false}};
(()=>{try{const _a=lgAwards;lgAwards=function(){const r=_a.apply(this,arguments);try{ubReal(S.py)}catch(e){}return r}}catch(e){}})();
