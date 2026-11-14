// ===== 📇 ONE CARD, A WHOLE CAREER =====
// Tyler (EPLM): "I do like the cards idea cause it keeps up everything" — every player's career on one card:
// high school, college and the pros in order, every season's team and stats, the awards he won that year
// (league awards, Ultra Bowl titles with his team, Heismans, All-Americans), and every move (graduated,
// committed, drafted, left). Only what is recorded is shown; years not played in this save say so.
// It replaces the two separate lists on the card (pro "Season by season" + "High school & college record");
// nothing in any save changes.
window.fcAwardsByYear=function(x){const out={};const add=(y,a)=>{(out[y]=out[y]||[]).push(a)};try{
 const nm=x.n;(LGH0||[]).forEach(r=>{if(!r)return;if(r.mvp===nm)add(r.yr,'MVP');if(r.opoy===nm)add(r.yr,'OPOY');if(r.dpoy===nm)add(r.yr,'DPOY');if(r.sbm===nm)add(r.yr,'Ultra Bowl MVP')});
 for(const k in (S.law||{})){const A=S.law[k];if(!A||!A.yr||!A.w)continue;const lab={MVP:'MVP',OPOY:'OPOY',DPOY:'DPOY',OROY:'Offensive Rookie of the Year',DROY:'Defensive Rookie of the Year',SBMVP:'Ultra Bowl MVP'};
  for(const c in A.w){const w=A.w[c];if(w&&!w.me&&w.n===nm&&lab[c])add(A.yr,lab[c])}}
 const e=x.pid&&S.pc&&S.pc.p&&S.pc.p[x.pid];if(e)(e.a||[]).forEach(q=>add(q[0],q[2]));
}catch(e){}return out};
window.fcChamps=function(){const m={};try{(LGH0||[]).forEach(r=>{if(r&&r.w)m[r.yr]=String(r.w).split('@')[0]});(typeof lhLeague=='function'?lhLeague():[]).forEach(r=>{if(r&&r.fin&&r.fin.wc)m[r.yr]=r.fin.wc})}catch(e){}return m};
window.fcProLine=function(x,r){const g=SG(x.pos),v=r.slice(2),f=n=>(+n||0).toLocaleString();if(!v.length)return '<small style="opacity:.65">season played · no stats kept for this position</small>';
 if(g=='q')return `${f(v[0])} pass yds, ${v[1]||0} TD, ${v[2]||0} INT${v[4]?' · '+f(v[4])+' rush yds'+(v[5]?', '+v[5]+' TD':''):''}`;
 if(g=='r')return `${f(v[0])} rush yds, ${v[1]||0} TD${v[2]?' · '+f(v[2])+' rec yds'+(v[3]?', '+v[3]+' TD':''):''}`;
 if(g=='w')return `${f(v[0])} rec yds, ${v[1]||0} TD`;if(g=='d')return `${v[0]||0} sacks`;if(g=='b')return `${v[0]||0} INT, ${f(v[1])} tackles`;return v.map(f).join(' / ')};
window.fcPcLine=function(q){const s=q.slice(4),v=i=>s[i]||0,f=n=>(n|0).toLocaleString(),p=[];
 if(v(2))p.push(`${f(v(3))} pass yds, ${v(4)} TD, ${v(5)} INT`);if(v(6))p.push(`${f(v(7))} rush yds, ${v(8)} TD`);if(v(9))p.push(`${v(9)} rec, ${f(v(10))} yds, ${v(11)} TD`);
 if(v(12)||v(13)||v(14))p.push(`${v(12)} tkl${v(13)?', '+v(13)+' sacks':''}${v(14)?', '+v(14)+' INT':''}`);return (v(0)?v(0)+' G · ':'')+(p.join(' · ')||'<small style="opacity:.65">no stats in the box scores</small>')};
window.fullCareerHtml=function(x){try{const rows=[];const e=x.pid&&S.pc&&S.pc.p&&S.pc.p[x.pid];const CL=['','Fr','So','Jr','Sr'];
 if(e)e.r.forEach(q=>rows.push({y:q[0],lv:q[1],club:q[2],cls:q[3],line:fcPcLine(q)}));
 const H=(typeof hxMerge=='function'?hxMerge(x):(x.h||[])).filter(r=>r&&r[0]!=null);const y0=typeof uY0=='function'?uY0():2022;
 H.forEach(r=>{if(r[0]<y0)return;rows.push({y:r[0],lv:'pro',club:(typeof r[1]=='number'?(TA[r[1]]||''):r[1]),pi:r[1],line:fcProLine(x,r)})});
 if(!rows.length)return '';rows.sort((a,b)=>a.y-b.y||({hs:0,col:1,pro:2}[a.lv]-{hs:0,col:1,pro:2}[b.lv]));
 const AW=fcAwardsByYear(x),CH=fcChamps(),EV={};(e&&e.o||[]).forEach(o=>{(EV[o[0]]=EV[o[0]]||[]).push(o)});
 const lvN={hs:'🏫 High school',col:'🎓 College',pro:'🏈 Pros'};let last='',html='';
 rows.forEach(r=>{if(r.lv!==last){html+=`<div style="margin-top:8px"><b>${lvN[r.lv]}</b></div>`;last=r.lv}
  const aw=(AW[r.y]||[]).filter((a,i,A)=>A.indexOf(a)===i).slice();if(r.lv==='pro'&&CH[r.y]&&CH[r.y]===r.club)aw.unshift('🏆 Ultra Bowl champion');
  html+=`<div class=row style="font-size:15px;align-items:flex-start"><span>${r.y} ${esc(r.club)}${r.cls?' <small>'+CL[r.cls]+'</small>':''}</span><span style="text-align:right">${r.line}${aw.length?'<br><small style="color:#ffe93b">'+aw.map(esc).join(' · ')+'</small>':''}</span></div>`});
 const ev=(e&&e.o||[]).map(o=>`${o[0]} ${esc(o[1])}${o[1]=='graduated'&&o[3]?' — committed to '+esc(o[3]):o[2]?' — '+esc(o[2]):''}${o[3]&&o[1]!='graduated'?' ('+esc(o[3])+')':''}`);
 const first=rows[0].y,gen=e&&e.gen;
 return `<div class=card data-fc=1><b>📇 Career</b><br><small>${rows.length} season${rows.length>1?'s':''} on record${gen?' · high school and college made when he entered the league':''}</small>${html}${ev.length?`<div style="margin-top:6px"><small>${ev.join(' · ')}</small></div>`:''}<br><small style="opacity:.6">Only seasons recorded in this save are shown${first>y0?'':' (from '+y0+')'}.</small></div>`}catch(e){return ''}};
(()=>{try{const _c=pCard;pCard=function(i,j){const r=_c.apply(this,arguments);try{const L=rost('h.'+i),x=L&&L[j];if(x&&!(i==0&&j==0)){const h=fullCareerHtml(x);const d=ui.firstElementChild;
 if(h&&d&&!d.querySelector('[data-fc]')){const old=[...d.querySelectorAll('.card')].filter(c=>c.hasAttribute('data-pc')||/^Season by season/.test((c.innerText||'').trim()));
  const at=old[0];if(at){at.insertAdjacentHTML('beforebegin',h);old.forEach(c=>c.remove())}else{const back=[...d.querySelectorAll(':scope > button')].pop();if(back)back.insertAdjacentHTML('beforebegin',h);else d.insertAdjacentHTML('beforeend',h)}}}}catch(e){}return r}}catch(e){}})();
