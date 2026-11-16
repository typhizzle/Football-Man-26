// ===== 📅 AN EXISTING-QB CAREER STARTS IN 2026, AND NOTHING IS RECORDED FOR A SEASON THAT HASN'T BEEN PLAYED =====
// Tyler, 2026-11-15: "it says 2029 stats. How many times have we went over that 2029 hasn't happened yet? ... I can already see MVP
// for 2026, 2027, 2028, 2029. I can see all the stats ... it's saying JJ Pain played ... Do some kind of permanent reinforcement to
// fix stats showing up from games that haven't happened yet."
// WHAT HAPPENED: an earlier fix ("take-over saves were stuck in 2026 forever") made the calendar count every pro season of the
// player's age (Hilton, 5th year = 2030). The game then filled in the four seasons "before" 2030 for the whole league (2026-2029
// stat lines, champions, MVPs) from a simulation. None of it was ever played.
// NOW (p47 patches the calendar): the year = 2026 + seasons YOU have played since taking him over.
// CLEANUP, once per affected save: every season dated inside the never-played gap is removed (player histories, their sealed
// copies, frozen league seasons, league history); anything really played under the wrong year label moves to its right year.
// PERMANENT GUARD (statGuard, every load and every save): no player may hold a season line dated this year or later, and no league
// season may be frozen for a year that isn't finished. Anything found is removed and counted in S.sgFix.
window.tkYearFix=function(s){try{if(!s||!s.tk||!(s.tkY>1)||s.tkyf)return 0;s.tkyf=1;const sh=s.tkY-1,B=(s.y0||2026)+((s.hist||[]).filter(h=>String(h.y)[0]!='P').length),E=B+sh;let n=0;
 const fixRows=h=>{if(!Array.isArray(h))return h;const out=[];h.forEach(r=>{if(!Array.isArray(r)||typeof r[0]!='number'){out.push(r);return}if(r[0]>=E){r[0]-=sh;out.push(r)}else if(r[0]>=B){n++}else out.push(r)});return out};
 const reTot=x=>{try{const g=SG(x.pos);if(!g)return;x.cs={};x.tm=[];(x.h||[]).forEach(h=>{csAdd(x,g,h.slice(2));tmAdd(x,h[1])});x.ny=(x.h||[]).length}catch(e){}};
 const YK=new Set(['y','exp','s','fa','Y','year']);
 const deep=(v,d)=>{if(v==null||typeof v!='object'||d>9)return;if(Array.isArray(v)){for(let i=v.length-1;i>=0;i--){const x=v[i];if(x&&typeof x=='object'&&!Array.isArray(x)&&typeof x.y=='number'&&x.y>=B&&x.y<E){v.splice(i,1);n++;continue}deep(x,d+1)}return}
  for(const k of Object.keys(v)){const x=v[k];if(typeof x=='number'&&YK.has(k)&&Number.isInteger(x)&&x>=E&&x<=E+80)v[k]=x-sh;else if(/^(19|20)\d\d$/.test(k)&&+k>=B){if(+k<E){delete v[k];n++}else{const nk=String(+k-sh);if(v[nk]===undefined){v[nk]=x;delete v[k];deep(x,d+1)}}}else deep(x,d+1)}};
 // rosters
 for(const k in s.ro||{}){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x)return;const b=(x.h||[]).length,m=n;if(Array.isArray(x.h)){x.h=fixRows(x.h);if(n!==m||x.h.length!==b)reTot(x)}if(Array.isArray(x.hx))x.hx=fixRows(x.hx);['ct','dr','inj'].forEach(f=>deep(x[f],0));if(typeof x.fa=='number'&&x.fa>=E)x.fa-=sh})}
 // the sealed copies
 for(const id in s.seal||{}){const o=s.seal[id];if(!o)continue;if(o.h&&typeof o.h=='object'&&!Array.isArray(o.h)){const nh={};for(const y in o.h){const r=o.h[y];if(+y>=E){if(Array.isArray(r))r[0]=+y-sh;nh[+y-sh]=r}else if(+y>=B){n++}else nh[y]=r}o.h=nh}
  if(Array.isArray(o.hL))o.hL=o.hL.filter(t=>{const m=/^\[(\d{4}),/.exec(String(t));return !(m&&+m[1]>=B&&+m[1]<E)}).map(t=>{const m=/^\[(\d{4}),/.exec(String(t));return m&&+m[1]>=E?String(t).replace(/^\[\d{4},/,'['+(+m[1]-sh)+','):t})}
 // the registry (high school / college / pro lines by person)
 try{for(const id in (s.pc&&s.pc.p)||{}){const e=s.pc.p[id];if(e&&Array.isArray(e.r))e.r=fixRows(e.r)}}catch(e){}
 // frozen league seasons
 if(s.uFz){for(const k of Object.keys(s.uFz)){const m=/^([a-z]+)(\d{4})$/.exec(k);if(!m)continue;const Y=+m[2];if(Y>=B&&Y<E){delete s.uFz[k];n++}else if(Y>=E){const nk=m[1]+(Y-sh);s.uFz[nk]=s.uFz[k];delete s.uFz[k];deep(s.uFz[nk],0)}}}
 // everything else that carries a year (news, transactions, draft classes, league history, awards votes...)
 for(const k of Object.keys(s)){if(['ro','seal','pc','uFz','hist','T','pro','col','q','ap','jy'].includes(k))continue;const v=s[k];if(v&&typeof v=='object')deep(v,0)}
 s.tkyN=n;if(n)s.fmsg=(s.fmsg?s.fmsg+' ':'')+'📅 Fixed: this career is in '+(B+Math.max(0,(s.py||1)-s.tkY))+'. '+n+' season lines and league results dated '+B+'–'+(E-1)+' were never played and have been removed.';return n}catch(e){return 0}};
// ---- permanent guard: nothing dated this year or later, ever ----
window.statGuard=function(s){try{s=s||S;if(!s||!s.ro||s.stage!=='pro')return 0;const S0=S;let Y;try{S=s;Y=yrN()}finally{S=S0}if(!(Y>2000))return 0;if(s.sled===s.py)Y++;   /* this season is finished and recorded: its lines are real */
 let n=0;const fut=[];
 for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x||!Array.isArray(x.h)||!x.h.length)return;const b=x.h.length;const keep=x.h.filter(r=>!(Array.isArray(r)&&typeof r[0]=='number'&&r[0]>=Y&&r[0]<Y+200));if(keep.length!==b){n+=b-keep.length;fut.push(x.n);x.h=keep;try{const g=SG(x.pos);if(g){x.cs={};x.tm=[];x.h.forEach(h=>{csAdd(x,g,h.slice(2));tmAdd(x,h[1])});x.ny=x.h.length}}catch(e){}}})}
 for(const id in s.seal||{}){const o=s.seal[id];if(o&&o.h&&typeof o.h=='object'&&!Array.isArray(o.h))for(const y in o.h)if(+y>=Y){delete o.h[y];n++}}
 if(s.uFz)for(const k of Object.keys(s.uFz)){const m=/^([a-z]+)(\d{4})$/.exec(k);if(m&&+m[2]>=Y){delete s.uFz[k];n++}}
 if(n){s.sgFix=(s.sgFix||0)+n;s.sgWho=fut.slice(0,5)}return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r){tkYearFix(r);statGuard(r)}}catch(e){}return r}}catch(e){}})();
(()=>{try{const _s=save;save=function(){try{if(S&&S.T)statGuard(S)}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
