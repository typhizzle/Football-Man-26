// ===== 🏈 GAMES STARTED (GS) =====
// Tyler, 2026-11-16: "maybe add a games started stat somewhere so you can know which players are starting and then I can tell if
// you're starting someone you shouldn't ... The games started stat can show up in league stats, and career stats."
// Every box score records its starters (the 22 + the kicker, after a hurt starter's backup takes his place). League stats show
// G and GS for the season so far; every player's card shows GS season by season and his career total; your career page too.
// Box scores saved before this update get their starters from the depth chart as it is now.
(()=>{try{const _g=bxGet;bxGet=function(w,a,b){let x=_g.apply(this,arguments);try{if(x&&x.A&&x.B){x={...x,A:{...x.A},B:{...x.B}};   /* never write into a saved box score: work on a copy */
  [x.A,x.B].forEach(sd=>{if(!sd.gs){const L=rost('h.'+sd.ti);if(Array.isArray(L))sd.gs=L.slice(0,23).filter(Boolean).map(p=>p.n)}
  // a game you sat: the QB who played gets the start, not you
  if(sd.ti===0&&sd.gs&&sd.gs.includes(S.name)&&!(sd.pass||[]).some(p=>p&&p.n===S.name)){const q=(sd.pass||[])[0];sd.gs=sd.gs.map(n=>n===S.name?(q&&q.n)||'':n).filter(Boolean)}})}}catch(e){}return x};window.bxGet=bxGet}catch(e){}})();
// season end: each player's games started for that season stay on his record
(()=>{try{const _s=seasonEnd;seasonEnd=function(){try{if(S&&S.stage==='pro'&&S.sled!==S.py){const yr=yrN();szCache=null;const Z=szGet();
  for(const k in S.ro){if(!/^h\.\d+$/.test(k))continue;const ti=+k.slice(2);(S.ro[k]||[]).forEach(x=>{if(!x||!x.n)return;const z=(Z[ti]||{})[x.n];if(!z)return;x.gsH=x.gsH||{};x.gsH[yr]=z.gs||0})}
  const u=(Z[0]||{})[S.name];if(u){S.gsH=S.gsH||{};S.gsH[yr]=u.gs||0}}}catch(e){}return _s.apply(this,arguments)};window.seasonEnd=seasonEnd}catch(e){}})();
window.gsCard=function(gsH,cur,curYr){const ys=Object.keys(gsH||{}).map(Number).sort((a,b)=>b-a);const rows=[];if(cur!=null&&!(gsH&&gsH[curYr]!=null))rows.push([curYr+' (so far)',cur]);ys.forEach(y=>rows.push([y,gsH[y]]));
 if(!rows.length)return '';const tot=rows.reduce((a,r)=>a+(+r[1]||0),0);return `<div class=card data-gs=1><b>🏈 Games started</b>${rows.map(r=>`<div class=row style="font-size:16px"><span>${r[0]}</span><b>${r[1]} GS</b></div>`).join('')}<div class=row style="font-size:16px;border-top:1px solid #fff3"><span>Career</span><b>${tot} GS</b></div></div>`};
(()=>{try{const _p=pCard;pCard=function(i,j){const r=_p.apply(this,arguments);try{if(S.stage!=='pro'||(i===0&&j===0))return r;const x=(rost('h.'+i)||[])[j];if(!x||ui.querySelector('[data-gs]'))return r;const z=szOne(i,x.n);const h=gsCard(x.gsH,z?z.gs||0:null,yrN());if(!h)return r;const bk=[...ui.querySelectorAll('button')].pop();if(bk)bk.insertAdjacentHTML('beforebegin',h);else (ui.firstElementChild||ui).insertAdjacentHTML('beforeend',h)}catch(e){}return r};window.pCard=pCard}catch(e){}})();
(()=>{try{const _c=career;career=function(){const r=_c.apply(this,arguments);try{if(S.stage!=='pro'||ui.querySelector('[data-gs]'))return r;const z=szOne(0,S.name);const h=gsCard(S.gsH,z?z.gs||0:null,yrN());if(!h)return r;const bk=[...ui.querySelectorAll('button')].pop();if(bk)bk.insertAdjacentHTML('beforebegin',h);else (ui.firstElementChild||ui).insertAdjacentHTML('beforeend',h)}catch(e){}return r};window.career=career}catch(e){}})();
