// ===================== 🐦 Baltimore's pro team is the Baltimore Crows (every save) =====================
function crowsFix(s){try{if(!s||typeof s!='object'||s.crw)return s;const seen=new Set(),w=o=>{if(!o||typeof o!='object'||seen.has(o))return;seen.add(o);for(const k in o){const v=o[k];if(typeof v=='string'){if(v.includes('Admirals'))o[k]=v.split('Admirals').join('Crows')}else if(v&&typeof v=='object')w(v)}};w(s);s.crw=1}catch(e){}return s}
(()=>{const _m=mig;mig=function(s){s=_m.apply(this,arguments);return crowsFix(s)}})();
try{if(typeof S!='undefined'&&S)crowsFix(S)}catch(e){}
