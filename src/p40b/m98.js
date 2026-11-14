// ===================== 🏅 award voting: put the statistical leaders in the pool =====================
// OPOY usually goes to a back or receiver having a historic year while the QB is just
// very good. The old candidate list could miss those guys entirely. This adds every
// category leader to the OPOY / DPOY pools (keeping the existing picks), and tags each
// one so you can see WHY he is there when you decide.
window.awLeaders=function(yr){
 const best={};
 try{(S.T||[]).forEach((t,i)=>{
  let L;try{L=rost('h.'+i)}catch(e){return}
  (L||[]).forEach(x=>{
   if(!x||!x.h)return;
   const h=(x.h||[]).find(e=>e[0]==yr);if(!h)return;
   const v=h.slice(2),g=SG(x.pos);
   const put=(k,val,line)=>{if(!(val>0))return;if(!best[k]||val>best[k].val)best[k]={val,x,line,tm:(TA[i]||tAb(t)),pi:i}};
   if(g=='q'){const l=`${v[0]} yds, ${v[1]} TD, ${v[2]} INT`;put('passing yards',v[0],l);put('passing TDs',v[1],l)}
   else if(g=='r'){const l=`${v[0]} rush yds, ${v[1]} TD`;put('rushing yards',v[0],l);put('rushing TDs',v[1],l)}
   else if(g=='w'){const l=`${v[0]} rec yds, ${v[1]} TD`;put('receiving yards',v[0],l);put('receiving TDs',v[1],l)}
   else if(g=='d'){put('sacks',v[0],`${v[0]} sacks`)}
   else if(g=='b'){const l=`${v[0]} INT, ${v[1]} tackles`;put('interceptions',v[0],l);put('tackles',v[1],l)}
  });
 })}catch(e){}
 return best;
};

window.awAddLeaders=function(py){
 const A=S&&S.law&&S.law[py];
 if(!A||!A.c||A.ldr)return;            // only once per season
 const L=awLeaders(A.yr);
 const OFF=['passing yards','passing TDs','rushing yards','rushing TDs','receiving yards','receiving TDs'],
       DEF=['sacks','interceptions','tackles'];
 const add=(cat,keys)=>{
  A.c[cat]=A.c[cat]||[];
  keys.forEach(k=>{
   const bst=L[k];if(!bst||!bst.x)return;
   const tag='🔝 '+k+' leader';
   const ex=A.c[cat].find(z=>z&&z.n===bst.x.n);
   if(ex){ // already a candidate: give him his real stat line and say why he stands out
    ex.ln=(bst.line||ex.ln||'');
    if(ex.ln.indexOf(tag)<0)ex.ln+=' · '+tag;
    return;
   }
   A.c[cat].push({n:bst.x.n,a:(typeof abbr=='function'?abbr(bst.x.n):bst.x.n),tm:bst.tm,
                  pos:bst.x.pos,pi:bst.pi,ln:(bst.line||'')+' · '+tag,s:-1,ldr:1});
  });
  if(A.c[cat].length>14)A.c[cat]=A.c[cat].slice(0,14);
 };
 try{add('OPOY',OFF);add('DPOY',DEF);A.ldr=1}catch(e){}
};

(()=>{if(typeof lgAwards!='function')return;
 const _a=lgAwards;lgAwards=function(){const r=_a.apply(this,arguments);try{awAddLeaders(S.py)}catch(e){}return r};
})();
// older saves already have their awards built, so backfill the pools on load
(()=>{if(typeof mig!='function')return;
 const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&s.law)Object.keys(s.law).forEach(k=>{const A=s.law[k];if(A&&A.c)A.ldr=0})}catch(e){}return s};
})();
