// ===== 🛌 REST THE STARTERS (the bye is locked up) =====
// Tyler, 2026-11-16: "If you've already clinched a bye week and pro, under the play / sim game section, there should be ask coach if he
// can rest the starters. He will say yes because y'all have a bye week anyways, and he doesn't want y'all to get hurt ... the backups
// will be playing that game. You can still play it if you want, obviously, with the starters".
// Clinched = no other team in your conference can reach your win total even if you lose every game left (the top seed gets the bye).
// Resting: the game is simmed, you sit (no stats for you that week), every starter on your side sits too (his backup plays and gets
// the line in the box score and the season totals), and none of the rested starters can get hurt that week. Nothing else changes.
window.restLeft=function(i){let n=0;try{for(let w=S.wk;w<18;w++)if((S.psch[w]||[]).some(p=>p[0]===i||p[1]===i))n++}catch(e){}return n};
window.byeLock=function(){try{if(!S||S.stage!=='pro'||S.pb||!(S.wk<18))return false;const T=S.T,cf=String(T[0].dv||'').slice(0,3);if(!cf)return false;
 const me=T[0].w;for(let i=1;i<T.length;i++){if(String(T[i].dv||'').slice(0,3)!==cf)continue;if(T[i].w+restLeft(i)>=me)return false}return true}catch(e){return false}};
window.restBtn=function(e){try{if(e&&e.t==='pro'&&byeLock()&&!(typeof gsOk=='function'&&gsOk()))return '<button class=g onclick=restAsk()>🛌 Ask coach to rest the starters</button>'}catch(x){}return ''};
window.restAsk=function(){ovShow(`<h2>🛌 Rest the starters?</h2><p><b>Coach:</b> "Yeah, we've got the bye locked up. I don't want anybody getting hurt before the playoffs. Starters sit this one, the backups play."</p><p><small>The game is simmed with the backups. You and the starters don't play, so no stats this week and nobody on the first team gets hurt. You can still play it yourself instead.</small></p><button onclick="ovHide();restGo()">Rest the starters</button><button class=g onclick="ovHide()">Never mind, we'll play</button>`)};
window.restGo=function(){try{const e=pevt();if(!e||e.t!=='pro'||!byeLock())return hub();const key=gmKey(S.wk);S.restK=(S.restK||[]).filter(k=>k.split('|')[0]===key.split('|')[0]);if(!S.restK.includes(key))S.restK.push(key);
 window._restF=1;try{psim(e)}finally{window._restF=0}}catch(x){window._restF=0;try{hub()}catch(_){}}};
// the rested starters are out of that week's game (their backups take their lines); you (slot 0), the kicker and punter are unchanged
window.restNames=function(){try{return (rost('h.0')||[]).slice(1,22).filter(Boolean).map(x=>x.n)}catch(e){return []}};
(()=>{try{const _o=gmOut;window.gmOut=function(x,key){try{if(x&&S&&S.restK&&S.restK.includes(key)&&restNames().includes(x.n))return true}catch(e){}return _o.apply(this,arguments)}}catch(e){}})();
// your own line that week goes to the backup QB who played (you sat)
(()=>{try{const _b=bxSide;bxSide=function(ti){const R_=_b.apply(this,arguments);try{if(R_&&ti===0&&S&&S.restK&&typeof BXW!=='undefined'&&BXW!=null&&S.restK.includes(gmKey(BXW))){const L=rost('h.0')||[];
  const bq=L.slice(23).find(x=>x&&x.pos==='QB'&&x.n!==S.name)||L.find((x,k)=>k>0&&x&&x.pos==='QB'&&x.n!==S.name);if(bq){['pass','rush'].forEach(c=>gmMerge(R_[c],S.name,bq.n));if(Array.isArray(R_.gs)&&R_.gs[0]===S.name)R_.gs[0]=bq.n}
  // a starter still on the sheet (not enough backups at his spot): his snaps go to the backups at that spot, shared out in turn
  const rn=new Set(restNames()),grp=x=>{try{return lgGrp(x.pos)}catch(e){return x.pos}},bench=L.slice(23).filter(x=>x&&x.n!==S.name&&!rn.has(x.n)),turn={};
  L.slice(1,22).forEach(x=>{if(!x||!rn.has(x.n))return;const G=grp(x),B=bench.filter(y=>grp(y)===G);if(!B.length)return;const i=(turn[G]=(turn[G]||0)+1)-1,to=B[i%B.length].n;
   ['pass','rush','rec','def'].forEach(c=>gmMerge(R_[c],x.n,to));if(Array.isArray(R_.gs)){const q=R_.gs.indexOf(x.n);if(q>=0)R_.gs[q]=to}})}}catch(e){}return R_};window.bxSide=bxSide}catch(e){}})();
// nobody on the first team gets hurt in a game he sat out
(()=>{try{const _t=injTick;injTick=function(){if(!window._restF)return _t.apply(this,arguments);const L=(S&&S.ro&&S.ro['h.0'])||[],pre=L.map((x,k)=>k<=21&&x?!!x.inj:null),u0=S.inj;
 const r=_t.apply(this,arguments);try{L.forEach((x,k)=>{if(k<=21&&x&&pre[k]===false&&x.inj){delete x.inj}});if(!u0&&S.inj)S.inj=null}catch(e){}return r}}catch(e){}})();
// the defensive lines are added after the side is built: the same backups (by the starters list of that game) take them
(()=>{try{const _m=bxMake;bxMake=function(w){const R=_m.apply(this,arguments);try{if(R&&S&&S.restK&&S.restK.includes(gmKey(w))){const sd=R.A&&R.A.ti===0?R.A:R.B&&R.B.ti===0?R.B:null;
  if(sd&&Array.isArray(sd.gs)){const L=rost('h.0')||[],rn=new Set(restNames());for(let k=1;k<=21;k++){const x=L[k],to=sd.gs[k];if(x&&rn.has(x.n)&&to&&to!==x.n)['pass','rush','rec','def'].forEach(c=>gmMerge(sd[c],x.n,to))}}}}catch(e){}return R};window.bxMake=bxMake}catch(e){}})();
