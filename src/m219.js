// ===== 🪪 THE LOOKALIKES GET THEIR OWN NAMES (Tyler's call, 2026-11-16) =====
// Tyler: "If the made-up players are just sharing the names and nothing else, then I would just change their names to one of the
// auto-generated last and first names I gave you ... if they're directly identical [to the stars I gave you], change their names."
// Made-up players who carry the exact name of one of Tyler's stars but play a different position (a college left tackle named
// Christopher McCunngingham while the real one is a pro running back) get a new random name from Tyler's first/last name lists,
// once per save. Everything they did stays theirs (their seasons are on their own record and move with them; their sealed history
// and card follow by their id). The real stars, a star's own younger self (same position; WR and TE count as the same) and your
// own player are never touched. The name is never one of Tyler's stars and never a name already in that save.
window.laStars=function(){const star={};try{PKS.forEach(q=>star[q[2]]=POSL[q[1]])}catch(e){}try{QBB.forEach(q=>star[q[0]]='QB')}catch(e){}try{QBP.forEach(q=>star[q[0]]='QB')}catch(e){}
 try{ADD26.forEach(q=>star[q[2]]=POSL[q[1]])}catch(e){}try{FA26.forEach(q=>star[q[0]]=q[1])}catch(e){}try{Object.entries(PKC).forEach(([n,v])=>{if(!star[n])star[n]=v[0]})}catch(e){}return star};
window.laGrp=function(p){let g_=p;try{g_=lgGrp(p)}catch(e){}return (g_==='WR'||g_==='TE'||p==='WR'||p==='TE')?'REC':g_};
window.laFix=function(s){try{if(!s||!s.ro||s.la1)return 0;s.la1=1;const star=laStars(),taken=new Set(),hits=[];
 for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x&&x.n)taken.add(x.n)})}Object.values(s.seal||{}).forEach(o=>o&&o.n&&taken.add(o.n));
 for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x||!x.n||x.n===s.name||!(x.n in star))return;if(laGrp(x.pos)===laGrp(star[x.n]))return;hits.push(x)})}
 if(!hits.length)return 0;const r=rng(((s.seed||1)*97+7)>>>0),M=myNames();s.laLog=s.laLog||[];
 hits.forEach(x=>{let n='',k=0;do{n=NF[r()*NF.length|0]+' '+NL[r()*NL.length|0];k++}while((M.has(n)||taken.has(n)||n in star)&&k<200);if(!n||k>=200)return;
  const old=x.n;taken.add(n);x.n=n;try{const id=x.pid;if(id!=null){if(s.seal&&s.seal[id]&&s.seal[id].n===old)s.seal[id].n=n;if(s.pc&&s.pc.p&&s.pc.p[id]&&s.pc.p[id].n===old)s.pc.p[id].n=n}}catch(e){}
  s.laLog.push({was:old,now:n,pos:x.pos,t:Date.now()})});return s.laLog.length}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)laFix(r)}catch(e){}return r}}catch(e){}})();
