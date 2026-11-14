// ===== Tyler's list, 2026-11-14 (afternoon) =====

// ---- 1. Ham Luther's 2036: 19 rushing TDs came from the QB-rushing bug (m147). Tyler: "I would also change it
// in that season ... You can lower them". Only HIS row (pid p1081, Ham Luther, 2036 row reading 123 rush yds /
// 19 rush TD) is changed, to 2 rush TD (his other 14 seasons: 0-3), together with its seal copy, his career
// total and the award-ballot text. Done once; nothing else in the season moves.
window.fixHL36=function(s){try{if(!s||s.fixHL36||!s.ro)return 0;let n=0;
 for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x||x.n!=='Ham Luther'||x.pid!=='p1081'||!Array.isArray(x.h))return;
  const r=x.h.find(q=>q[0]===2036&&q[6]===123&&q[7]===19);if(!r)return;r[7]=2;if(x.cs&&x.cs.rtd>=17)x.cs.rtd-=17;n++;
  const sl=s.seal&&s.seal[x.pid];if(sl){if(sl.h&&sl.h['2036']&&sl.h['2036'][7]===19)sl.h['2036'][7]=2;if(Array.isArray(sl.hL))sl.hL=sl.hL.map(t=>t==='[2036,29,3786,36,11,317,123,19]'?'[2036,29,3786,36,11,317,123,2]':t)}})}
 if(n){for(const k in (s.law||{})){const A=s.law[k];if(!A||A.yr!==2036)continue;const fix=c=>{if(c&&c.n==='Ham Luther'&&typeof c.ln=='string')c.ln=c.ln.replace('123 rush yds, 19 rush TD','123 rush yds, 2 rush TD')};
  for(const c in (A.c||{}))(A.c[c]||[]).forEach(fix);for(const c in (A.w||{}))fix(A.w[c])}
  for(const k in (s.lb||{})){}s.fixHL36=1}
 return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{fixHL36(s)}catch(e){}return s}}catch(e){}})();

// ---- 2. Simmed games give a third of the training points the same game gives when you play it.
// Tyler: "it should take three games of simming to get that training point". Played: 2 + win + (3+ TD) +
// (no INT). Simmed: the same formula, divided by three, carried over in fractions so nothing is lost.
window.simPts=function(st,w){try{const full=2+(w?1:0)+(st&&st.td>=3?1:0)+(st&&st.int?0:1);S.simB=(S.simB||0)+full/3;const b=Math.floor(S.simB+1e-9);S.simB-=b;return b}catch(e){return 1}};

// ---- 3. Instant starter (player menu → Settings). Off by default. On: you start every game whoever is ahead
// of you, and you are never benched for grades. Tyler: "you start no matter what ... Only when it's on though".
window.instToggle=function(){S.instS=S.instS?0:1;if(S.instS)S.bench=null;save();settings()};
(()=>{try{const _s=settings;settings=function(){const r=_s.apply(this,arguments);try{const d=ui.firstElementChild;if(d&&!d.querySelector('[data-inst]')){const c=document.createElement('div');c.className='card';c.setAttribute('data-inst','1');
 c.innerHTML=`<b>Instant starter</b><br><small>${S.instS?'ON: you start every game, whoever is ahead of you, and you are never benched.':'OFF: you earn the starting job with your ratings (the normal game).'}</small><button class=${S.instS?'':'g'} onclick="instToggle()">${S.instS?'Turn instant starter OFF':'Turn instant starter ON'}</button>`;
 const back=[...d.querySelectorAll(':scope > button')].pop();if(back)d.insertBefore(c,back);else d.appendChild(c)}}catch(e){}return r}}catch(e){}})();

// ---- 4. Ratings update card on "Play as an existing QB": the latest update is the throwing power list Tyler
// gave (m133); Coleridge Loud's old "85 → 84, -1" line is gone (his overall stays 84, as it is now).
rupdCard=function(){try{const L=Object.keys(PWNAMES).map(n=>[n,PWNAMES[n][0],PWNAMES[n][1]]).sort((a,b)=>b[1]-a[1]);
 return `<div class=card><b>📈 Ratings update · Nov 14, 2026 · throwing power</b><br><small>Max throw distance in the pros (high school throws 85% of it, college 93.5%).</small>${L.map(x=>`<div class=row style="font-size:16px"><span>${esc(x[0])}</span><span>💪 ${x[1]} · <b>${x[2]} yds</b></span></div>`).join('')}</div>`}catch(e){return ''}};
rupdTag=function(n){try{const p=PWNAMES[n];return p?` <small>💪 ${p[0]} arm</small>`:''}catch(e){return ''}};
