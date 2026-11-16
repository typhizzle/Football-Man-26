// ===== 🔁 FRANK CASTLE → DEEP PASSER (Tyler asked, 2026-11-14) =====
// "Would you be willing to change my Frank Castle save into a strong arm quarterback? Literally just take everything
// that's already there and just change Field General to strong arm quarterback, and then you can adjust my ratings
// accordingly ... as long as it fits my archetype and my overall currently" -> "Deep passer" (his pick).
// Only the save named Frank Castle that is a Field General, once. His ratings are reshaped from the Field General
// shape to the Deep passer shape (more throw power, a little more accuracy/awareness, slower) and then evened out
// so his overall is EXACTLY what it was. Everything else in the save is untouched.
window.fcArchFix=function(s){try{if(!s||s.fcArch||String(s.name||'').trim().toLowerCase().replace(/\s+/g,' ')!=='frank castle'||!/field general/i.test(String(s.arch||''))||!s.q)return 0;
 const F=AR.find(a=>a.n==='Field General (balanced)').a,D=AR.find(a=>a.n==='Deep passer').a,o0=qo(s.q),q={};
 for(const k in s.q)q[k]=cl(s.q[k]-(F[k]||0)+(D[k]||0),30,99);
 let g=0;while(qo(q)!==o0&&g++<200){const up=qo(q)<o0,ks=Object.keys(q).sort((a,b)=>up?(D[b]||0)-(D[a]||0):(D[a]||0)-(D[b]||0));for(const k of ks){if(up&&q[k]<99){q[k]++;break}if(!up&&q[k]>30){q[k]--;break}}}
 s.fcArchFrom={arch:s.arch,q:{...s.q}};s.q=q;s.arch='Deep passer';s.fcArch=1;return 1}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{fcArchFix(s)}catch(e){}return s}}catch(e){}})();
