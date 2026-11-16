// ===== 🏫 Tyler's made-up colleges are the SMALL schools =====
// Tyler, 2026-11-14: "Most of them should be lower than the actual colleges. Maybe a few can be
// higher than some of them, but for the most part, they should be pretty low because they're
// smaller colleges and not the big name colleges." Then: "Overall wise" — ratings only, all saves.
// Measured on the 11-07 save: made-up schools averaged 69.5 vs 75.5 for the big names, but 20 of 64
// sat above the big-name median and one was 92.
// Each made-up school keeps its PLACE in the pecking order (the best stays the best); only the
// scale changes: lowest 50, highest 80, most of them in the 50s and 60s, roughly 1 in 10 above a
// typical big-name school. Big-name schools are not touched. Names, schedules, records, history:
// untouched. Runs once per save (s.colRt).
window.COLBIG=['Large 10 Conference','South Country Conference','Large 12 Conference','Atlantic Country Conference'];
window.colRate=function(col){try{if(!Array.isArray(col))return 0;const skip=new Set([...COLBIG,'Metro Valley Conference']);
 const T=col.filter(c=>c&&!skip.has(c.n)).flatMap(c=>c.t||[]).filter(Boolean);if(T.length<2)return 0;
 const o=T.slice().sort((a,b)=>(a.ovr||0)-(b.ovr||0)||String(a.n).localeCompare(String(b.n)));
 o.forEach((t,i)=>{const p=i/(o.length-1);t.ovr=Math.round(50+30*Math.pow(p,1.6))});return o.length}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);
 try{if(s&&s.col&&!s.colRt){colRate(s.col);s.colRt=1}}catch(e){}return s}}catch(e){}})();
(()=>{try{const _l=mkLg;mkLg=function(){const L=_l.apply(this,arguments);try{if(L&&L.col){colRate(L.col);L.colRt=1}}catch(e){}return L}}catch(e){}})();
