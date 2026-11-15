// ===== 📊 FULL STATISTICS: every stats screen in one place on the player menu =====
// Tyler, 2026-11-15: "put most of the stats things on the player menu in one section, like you tap on that section and then it
// shows you all the stats sections such as the league leaders, the all-time leaders, the records, the awards ... just call it
// full statistics and then it has everything stats wise" + "Your Career stats and legacy leaderboard can go there too."
// The menu now has one "📊 Full statistics" button (where the first stats button used to be). It opens a page with:
// your career stats, league stats & leaders, all-time leaders, the record book, league awards, the Heisman watch (college),
// the GOAT list & legacy leaderboard, and league history. Each screen works exactly as before.
window.FSTAT=[['career()','📇 Your career stats'],['lgsV()','📊 League stats & leaders · pro & college'],['lbV()','📈 All-time leaders'],['recV()','🏆 Record book'],
 ['awV()','🏅 League awards'],['hwV()','🏅 Heisman watch'],['goatV()','🐐 GOAT list & legacy leaderboard'],['lhV()','📜 League history']];
window.fstatV=function(){try{scene('lock')}catch(e){}const have=window.FSTATHAVE||FSTAT.map(x=>x[0]);ui.style.display='block';
 ui.innerHTML=`<div><h2>📊 Full statistics</h2><div class=card><small>Everything stats: your career, the leaders, the records, the awards and the legacy board.</small></div>
 ${FSTAT.filter(x=>have.includes(x[0])).map(x=>`<button onclick="${x[0]}">${x[1]}</button>`).join('')}<button class=g onclick="hub()">↩️ Back to player menu</button></div>`;ui.scrollTop=0};
(()=>{try{const _h=hub;hub=function(){const r=_h.apply(this,arguments);try{const root=ui;if(!root||root.querySelector('[data-fstat]'))return r;const set=FSTAT.map(x=>x[0]);
 const B=[...root.querySelectorAll('button')].filter(b=>{const oc=(b.getAttribute('onclick')||'').trim();if(!set.includes(oc))return false;
   if(oc==='career()')return /^Career stats$/.test(b.textContent.trim());return true});
 if(B.length<2)return r;window.FSTATHAVE=['career()',...B.map(b=>(b.getAttribute('onclick')||'').trim())];
 const nb=document.createElement('button');nb.setAttribute('data-fstat','1');nb.className=B[0].className||'';nb.textContent='📊 Full statistics';nb.setAttribute('onclick','fstatV()');
 B[0].parentNode.insertBefore(nb,B[0]);B.forEach(b=>b.remove())}catch(e){}return r}}catch(e){}})();
