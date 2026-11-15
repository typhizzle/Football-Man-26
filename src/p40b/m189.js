// ===== ✏️ THE MANLING FAMILY IS NOW "MANNY" (names only, every save) =====
// Tyler, 2026-11-15: "The Manling family is now Manny, change their last name in all saves. Any auto generated people can keep
// the last name Manling". The family = the named ones: Pete Manling ("P. Manling" in the record books) and Archer Manling.
// Built-in data is renamed at build time (p47); saves are renamed in place on load (only these exact names; nothing else moves).
window.MANNY=[['Pete Manling','Pete Manny'],['P. Manling','P. Manny'],['Archer Manling','Archer Manny']];
window.mannyFix=function(s){try{if(!s||s.manny)return 0;let n=0;const seen=new Set();const walk=o=>{if(!o||typeof o!=='object'||seen.has(o))return;seen.add(o);
 for(const k of Object.keys(o)){const v=o[k];if(typeof v==='string'){let w=v;MANNY.forEach(([a,b])=>{if(w.indexOf(a)>=0)w=w.split(a).join(b)});if(w!==v){o[k]=w;n++}}else if(v&&typeof v==='object')walk(v)}
 };walk(s);s.manny=1;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{mannyFix(s)}catch(e){}return s}}catch(e){}})();
