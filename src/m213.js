// ===== Chicago Icemen · Dallas Cattle Boys (all saves) =====
// Tyler, 2026-11-16: "Change chicagos team to the Chicago Icemen And Dallas to the Dallas Cattle Boys. All saves".
// New worlds get the new names (the base league list is patched). Old saves are renamed once on load: the team itself and every
// saved line that spells the old full name (news, history, awards). Abbreviations (CHI, DAL), players and records are untouched.
window.TMRN2=[['Chicago','Gales','Icemen'],['Dallas','Wildcatters','Cattle Boys']];
window.tmRn2=function(s){try{if(!s||s.tmrn2)return 0;s.tmrn2=1;let n=0;const fixT=t=>{if(!t)return;TMRN2.forEach(([c,o,nw])=>{if(t.n===o&&String(t.city||'').indexOf(c)>=0){t.n=nw;if(t.sh===o)t.sh=nw;n++}})};(s.pro||[]).forEach(fixT);(s.T||[]).forEach(fixT);
 const walk=(v,d)=>{if(!v||typeof v!=='object'||d>8)return;for(const k of Object.keys(v)){const x=v[k];if(typeof x==='string'){let y=x;TMRN2.forEach(([c,o,nw])=>{if(y.indexOf(c+' '+o)>=0)y=y.split(c+' '+o).join(c+' '+nw)});if(y!==x){v[k]=y;n++}}else if(x&&typeof x==='object')walk(x,d+1)}};
 for(const k of Object.keys(s)){if(k==='ro'||k==='seal'||k==='pc')continue;walk(s[k],0)}return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)tmRn2(r)}catch(e){}return r}}catch(e){}})();
// Tyler 2026-11-16: "I told you to call Kanye's brand name Yeezers, why is it Westzy" — the celebrity card said Westzy. Saves that
// stored the old name say Yeezers too.
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r&&!r.yzr){r.yzr=1;const walk=(v,d)=>{if(!v||typeof v!=='object'||d>7)return;for(const k of Object.keys(v)){const x=v[k];if(typeof x==='string'&&x.indexOf('Westzy')>=0)v[k]=x.split('Westzy').join('Yeezers');else if(x&&typeof x==='object')walk(x,d+1)}};for(const k of Object.keys(r)){if(k==='ro'||k==='seal')continue;walk(r[k],0)}}}catch(e){}return r}}catch(e){}})();
