// ===================== 🧓 retired means retired · 👯 one player, one name =====================
// stars who retired (S.alum / S.rets / S.svRet / S.retd) can never be put back on a roster by the old star-fixers; any already back are re-retired
const RETN=()=>{const s=new Set([].concat(S.rets||[],(S.alum||[]).map(a=>a&&a.n),S.svRet||[],(S.retd||[]).map(a=>a&&a.n)).filter(Boolean));return s};
(()=>{const isStar=n=>PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n);
 const _p=pkIns;pkIns=function(){const G=RETN(),sv=[];PKS.forEach(q=>{if(G.has(q[2])){sv.push([q,q[0]]);q[0]=-99}});try{return _p.apply(this,arguments)}finally{sv.forEach(([q,v])=>q[0]=v)}};
 const _q=qbbEns;qbbEns=function(){const G=RETN(),sv=[];QBB.forEach(b=>{if(G.has(b[0])){sv.push([b,b[3]]);b[3]=-99}});try{return _q.apply(this,arguments)}finally{sv.forEach(([b,v])=>b[3]=v)}};
 // saves where a retired star came back: send him back into retirement (his career stays in history)
 window.retBackFix=function(){try{if(!S||!S.ro||S.rbf1)return;const G=RETN(),back=[];for(const k in S.ro){const L=S.ro[k];if(!Array.isArray(L)||k=='fa')continue;L.slice().forEach(x=>{if(!x||x.n==S.name||!G.has(x.n)||!isStar(x.n))return;if((S.retOk||[]).includes(x.n))return;
   const T={L,code:''};try{if(typeof lgRemove=='function')lgRemove(T,x);else{const i=L.indexOf(x);if(i>=25)L.splice(i,1)}}catch(e){}back.push(x.n);(S.svRet=S.svRet||[]).includes(x.n)||S.svRet.push(x.n)})}
  S.rbf1=1;if(back.length)S.rbMsg='🧓 Retired players who had come back by mistake are retired again: '+back.join(', ')+'.'}catch(e){}};
 const _h=hub;hub=function(){try{retBackFix();if(S&&S.rbMsg){HM=(HM?HM+' ':'')+S.rbMsg;S.rbMsg=''}}catch(e){}return _h.apply(this,arguments)}})();
// a retirement you override (talked out of retirement) stays allowed
(()=>{const _k=retKeep;retKeep=function(j){try{const e=(S.retq||[])[j];if(e&&e.s&&e.s.n){S.retOk=S.retOk||[];S.retOk.push(e.s.n);if(S.svRet)S.svRet=S.svRet.filter(n=>n!=e.s.n)}}catch(e){}return _k.apply(this,arguments)}})();
// two names for one real player → one player. Jordan Give-Itt is NFL Youngboy (#3); Famous Dubstin is JJ Crablegs (#19)
const DUPM={'Jordan Give-Itt':['NFL Youngboy',3],'Famous Dubstin':['JJ Crablegs',19]};
try{PKS.forEach(q=>{if(DUPM[q[2]])q[0]=-99});QBB.forEach(b=>{if(DUPM[b[0]])b[3]=-99})}catch(e){}
(()=>{const hide=L=>Array.isArray(L)?L.filter(x=>!(x&&DUPM[x.n])):L;
 try{const _a=lgCts;lgCts=function(){return hide(_a.apply(this,arguments))}}catch(e){}
 try{const _t=tkList;tkList=function(){return hide(_t.apply(this,arguments))}}catch(e){}})();
function dupMerge(s){try{if(!s||!s.ro||s.dpm1)return;for(const drop in DUPM){const [keep,num]=DUPM[drop];if(s.name==drop)continue;let D=[],K=null;for(const k in s.ro){const L=s.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>{if(!x)return;if(x.n==drop)D.push({x,L});if(x.n==keep&&!K)K={x,L}})}
  D.forEach(({x,L})=>{if(!K){x.n=keep;x.num=num;K={x,L};return}const a=K.x.aw=K.x.aw||{};for(const f in (x.aw||{}))a[f]=(a[f]||0)+x.aw[f];const cs=K.x.cs=K.x.cs||{},sum=o=>Object.values(o||{}).reduce((p,v)=>p+(+v||0),0);if(sum(x.cs)>sum(cs)){K.x.cs=x.cs;K.x.h=x.h}
   const i=L.indexOf(x);if(i>=25)L.splice(i,1);else if(typeof lgRemove=='function'){const prev=S;try{lgRemove({L,code:''},x)}catch(e){L[i]=null}}else L[i]=null});
  if(K)K.x.num=num;
  const rn=o=>{if(!o)return o;return JSON.parse(JSON.stringify(o).split('"'+drop+'"').join('"'+keep+'"'))};['law','tx','uFz','hOv'].forEach(f=>{if(s[f])s[f]=rn(s[f])})}
 s.dpm1=1}catch(e){}}
(()=>{const _h=hub;hub=function(){try{if(S&&!S.dpm1)dupMerge(S)}catch(e){}return _h.apply(this,arguments)}})();
// ---------- awards that look like the real league ----------
// non-QB MVP: only once every 15–40 years · OPOY: QBs weighted down so a 2,000-yard WR or RB can win · DROY always handed out
(()=>{const _la=lgAwards;lgAwards=function(){const had=!!(S.law&&S.law[S.py]);const r=_la.apply(this,arguments);try{if(had||!S.law||!S.law[S.py])return r;const A=S.law[S.py],yr=A.yr,W=A.w,C=A.c||{};
 const swap=(a,c)=>{const o=W[a];if(!c||(o&&o.n==c.n))return;if(o&&!o.me)try{lawBump(o,a,-1)}catch(e){}W[a]=c;try{lawBump(c,a,1)}catch(e){}};
 if(S.nqm==null)S.nqm=2012+15+Math.floor(R()*26);
 const mv=W.MVP;if(mv&&!mv.me&&mv.pos!='QB'){if(yr<S.nqm){const q=(C.MVP||[]).find(z=>z.pos=='QB'&&!z.me);if(q)swap('MVP',q)}else S.nqm=yr+15+Math.floor(R()*26)}
 // OPOY: build candidates from ALL offensive players, weight QBs down, exclude MVP
 const mvpN=W.MVP&&W.MVP.n;const OC=[];S.T.forEach((t,i)=>{const pi=pIdx(t);rost('h.'+i).forEach((x,k)=>{if(!x||(i==0&&k==0))return;const g=SG(x.pos);if(!(g=='o'||x.pos=='QB'||/^(WR|RB|TE|OL|C|OT|OG|FB)$/.test(x.pos)))return;if(x.n==mvpN)return;const sc=x.ovr+(x.cs&&x.cs.td?x.cs.td*3:0)+(x.cs&&x.cs.yd?x.cs.yd/50:0);OC.push({n:x.n,a:abbr(x.n),tm:TA[pi]||tAb(t),pos:x.pos,pi,k,s:sc,me:x.n==S.name,ln:x.ovr+' OVR'})})});
 const adj=z=>z.s*(z.pos=='QB'?.62:1);OC.sort((a,b)=>adj(b)-adj(a));if(OC.length){C.OPOY=OC.slice(0,6);A.c=C;const best=OC.find(z=>!z.me);const op=W.OPOY;if(best&&(!op||!op.me||(op.n==mvpN)))swap('OPOY',best)}
 if(!W.DROY){const D=[];S.T.forEach((t,i)=>{const pi=pIdx(t);rost('h.'+i).forEach((x,k)=>{if(!x||(i==0&&k==0))return;const g=SG(x.pos);if(!(g=='d'||g=='b'||/^(DE|DT|OLB|MLB|CB|S)$/.test(x.pos)))return;if(!((x.ny!=null&&x.ny<=1)||(x.dr&&x.dr.y==yr)))return;D.push({n:x.n,a:abbr(x.n),tm:TA[pi]||tAb(t),pos:x.pos,pi,k,s:x.ovr,ln:x.ovr+' OVR rookie'})})});D.sort((a,b)=>b.s-a.s);if(D.length){C.DROY=D.slice(0,6);A.c=C;swap('DROY',D[0])}}
 save()}catch(e){console.warn(e)}return r}})();
