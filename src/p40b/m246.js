// ===== 🎂 AGES MOVE WITH THE YEARS (Tyler 2026-11-17: "check the year in each save and make sure the age moves with it, just like
// your character does") =====
// Some leagues fell behind: in the Simmons league (2037) Matty Gafford was 37 and Eric Rodney 42 although they entered the league in
// 2009 and 2005. One correction per save: a player's age is at least 22 + the seasons since his first pro season (his first row,
// including the pre-2022 rows kept aside). Ages only go up, never down; your own age is untouched. From then on everyone gets one
// year older each season (the one-birthday-a-year rule), and the normal aging/regression and retirement rules do the rest.
window.ageFirstYr=function(x){let f=1e9;[x.pre22x,x.h].forEach(H=>(Array.isArray(H)?H:[]).forEach(r=>{const y=Array.isArray(r)?+r[0]:null;if(y&&y>1950&&y<f)f=y}));return f<1e9?f:null};
// a real player's 2026 age from the game's own data (QBs: QBP, everyone else: PKS); age = that + seasons since 2026
window.age26=function(){if(window._A26)return _A26;const m={};try{(QBP||[]).forEach(q=>{if(q&&q[0]&&q[2])m[q[0]]=q[2]})}catch(e){}try{(PKS||[]).forEach(p=>{if(p&&p[2]&&p[4]&&m[p[2]]==null)m[p[2]]=p[4]})}catch(e){}return window._A26=m};
window.ageFix=function(s){try{if(!s||s.agefx||s.stage!=='pro'||!s.ro)return 0;const Y=(()=>{try{return yrN()}catch(e){return null}})();if(!Y)return 0;s.agefx2=1;let n=0;const seen=new Set();
 Object.keys(s.ro).forEach(k=>{if(!/^h\.|^fa$/.test(k))return;(s.ro[k]||[]).forEach((x,i)=>{if(!x||!x.n||(k==='h.0'&&i===0)||x.n===s.name||seen.has(x))return;seen.add(x);const a26=age26()[x.n];let want=null;if(a26!=null)want=a26+(Y-2026);else{const f=ageFirstYr(x);if(f)want=22+(Y-f)}if(want==null)return;if(want>(x.age||0)+1&&want<=55){x.age=want;n++}})});
 s.agefxN=n;return n}catch(e){return 0}};
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.stage==='pro'&&!S.agefx2){const n=ageFix(S);if(n)S.fmsg=(S.fmsg?S.fmsg+' ':'')+'🎂 League ages caught up with the calendar: '+n+' players were younger than their years in the league.'}}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
