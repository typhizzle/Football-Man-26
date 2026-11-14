// ============ 📣 fans: the ceiling was 15 million ============
// fans() capped at 15e6 no matter what you did, which is why a decorated career stalled
// at "15,000,000". The ceiling is 9 billion now, and getting near it takes an actual
// legacy — rings, MVPs, years in the league — not just a high rating.
window.FANMAX=9e9;
window.fanLegacy=function(){try{
 if(!S)return 1;
 if((S.stage||'hs')!='pro')return 1;   // a high schooler has no league legacy
 let rings=0,mvp=0,poy=0;
 try{Object.keys(S.law||{}).forEach(k=>{const A=S.law[k];if(!A)return;
  if(A.w&&A.w.MVP===S.name)mvp++;
  if(A.w&&(A.w.OPOY===S.name||A.w.DPOY===S.name))poy++;
 })}catch(e){}
 try{rings=(S.rings|0)||((S.hOv?Object.keys(S.hOv):[]).length?0:0)}catch(e){}
 try{if(Array.isArray(S.ubw))rings=S.ubw.length}catch(e){}
 const yrs=(S.py|0);
 // a long, decorated career is worth far more than one good season
 return 1+rings*1.1+mvp*1.6+poy*.7+Math.min(2.5,yrs*.16);
}catch(e){return 1}};
(()=>{try{if(typeof fans!='function')return;const _f=fans;
 window.fans=function(p){
  try{
   const st=(S&&S.stage)||'hs';
   const v=_f.apply(this,arguments);
   if(st!='pro')return v;                    // school and college ceilings are fine
   const boost=fanLegacy();
   let n=v*boost;
   const af=(typeof athF=='function')?athF():1;
   n=Math.min(n,FANMAX*af);
   return n<1000?Math.round(n/10)*10:n<1e5?Math.round(n/100)*100:
          n<1e7?Math.round(n/1000)*1000:Math.round(n/1e5)*1e5;
  }catch(e){return _f.apply(this,arguments)}
 }}catch(e){}})();
