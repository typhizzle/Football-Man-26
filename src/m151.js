// ===== 🤝 FORMER TEAMMATES, FROM THE REAL RECORDS =====
// Tyler (EPLM): "former college teammate, former high school teammate, former pro teammate ... have them wait
// after the game." The game only knew the handful of teammates it had copied over by hand (x.al). Now a former
// teammate is anyone whose recorded season shares a club and a year with one of yours: high school and
// college from the career record (S.pc), the pros from his season rows. His card says so, and when you play
// his team he waits for you after the game (the existing meet-up), saying where you played together.
window.ftMine=function(){const out=[];try{const y0=S.y0||2022;(S.hist||[]).forEach((h,i)=>{const y=String(h.y);const lv=/^C/.test(y)?'col':/^P/.test(y)?'pro':'hs';const c=(S.htm||[])[i];if(c)out.push([y0+i,lv,c])});
 if(S.T&&S.T[0])out.push([yrN(),S.stage=='pro'?'pro':S.stage=='col'?'col':'hs',S.stage=='pro'?tn(S.T[0]):S.T[0].n])}catch(e){}return out};
window.ftOf=function(x){try{if(!x||!x.n||x.n===S.name)return null;const M=ftMine();if(!M.length)return null;const cur=M[M.length-1];
 const rows=[];const e=x.pid&&S.pc&&S.pc.p&&S.pc.p[x.pid];if(e)e.r.forEach(q=>rows.push([q[0],q[1],q[2]]));
 (x.h||[]).forEach(q=>{if(q&&q[0]>=2022&&S.pro&&S.pro[q[1]])rows.push([q[0],'pro',tn(S.pro[q[1]])])});
 const hit={};rows.forEach(r=>{if(r[0]===cur[0]&&r[2]===cur[2])return;   // this season, same team: a teammate, not a former one
  if(M.some(m=>m[0]===r[0]&&m[2]===r[2])){const k=r[1]+'|'+r[2];(hit[k]=hit[k]||{lv:r[1],club:r[2],yrs:[]}).yrs.push(r[0])}});
 const H=Object.values(hit);if(!H.length){if(x.al==2)return {lv:'col',club:'',yrs:[]};if(x.al==1)return {lv:'hs',club:'',yrs:[]};return null}
 const ord={pro:3,col:2,hs:1};H.sort((a,b)=>Math.max(...b.yrs)-Math.max(...a.yrs)||ord[b.lv]-ord[a.lv]);return H[0]}catch(e){return null}};
window.ftAl=function(x){const f=ftOf(x);return f?({hs:1,col:2,pro:3})[f.lv]:0};
window.ftTxt=function(f){if(!f)return '';const lv={hs:'high school',col:'college',pro:'pro'}[f.lv];const y=f.yrs.length?(Math.min(...f.yrs)===Math.max(...f.yrs)?' '+Math.min(...f.yrs):' '+Math.min(...f.yrs)+'–'+Math.max(...f.yrs)):'';return `Former ${lv} teammate${f.club?' · '+f.club:''}${y}`};
window.ftWhere=function(n){try{let x=null;S.T.forEach((t,i)=>{(rost('h.'+i)||[]).forEach(y=>{if(y&&y.n===n)x=y})});const f=x&&ftOf(x);if(!f)return null;return f.lv=='pro'?'back on the '+f.club:f.lv=='col'?'at '+(f.club||'college'):'back in high school'}catch(e){return null}};
(()=>{try{const _c=pCard;pCard=function(i,j){const r=_c.apply(this,arguments);try{const L=rost('h.'+i),x=L&&L[j];const f=x&&!(i==0&&j==0)&&ftOf(x);if(f){const h2=ui.querySelector('h2');if(h2&&!ui.querySelector('[data-ft]'))h2.insertAdjacentHTML('afterend',`<p data-ft=1><b style="color:#ffe93b">🤝 ${esc(ftTxt(f))}</b></p>`)}}catch(e){}return r}}catch(e){}})();
