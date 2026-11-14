// ===================== 🛟 nobody vanishes: a star who loses his spot stays on the team (or the league) =====================
// Coleridge Loud vanished when you took Houston's starting job; NSH's starter vanished when a named prospect took his. This
// sweeps every built pro roster and puts any missing star back (QB → QB2/QB3, others → their slot or the depth chart).
function svTeamOf(n,def){try{if(S.mv&&S.mv[n])return S.mv[n][0]}catch(e){}return def}
function svFix(){try{if(!S||!S.ro||!S.pro)return 0;const keyOf={},have=new Set();
 for(const k in S.ro){const L=S.ro[k];if(!Array.isArray(L))continue;L.forEach(x=>x&&have.add(x.n));let t;try{t=gt(k)}catch(e){t=null}const pi=t?pIdx(t):-1;if(pi>=0&&(!keyOf[pi]||k[0]=='h'))keyOf[pi]=k}
 const gone=new Set([].concat(S.rets||[],(S.alum||[]).map(a=>a.n),S.svRet||[]));if(S.name)have.add(S.name);
 const dy=Math.max(0,(typeof yrN=='function'?yrN():2026)-2026),fixed=[];
 const star=n=>n==S.name||PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n);
 const want=[];QBP.forEach((q,pi)=>want.push({n:q[0],pi:svTeamOf(q[0],pi),k:0,o:q[1],ag:q[2],pos:'QB',num:(typeof QNUM!='undefined'&&QNUM[pi])||null}));
 QBB.forEach(b=>want.push({n:b[0],pi:svTeamOf(b[0],b[3]),k:23,o:b[1],ag:b[2],pos:'QB',num:b[4]}));
 PKS.forEach(q=>want.push({n:q[2],pi:svTeamOf(q[2],q[0]),k:q[1],o:q[3],ag:q[4],pos:q[6]||POSL[q[1]],num:q[5]}));
 want.forEach(w=>{if(have.has(w.n)||gone.has(w.n))return;const key=keyOf[w.pi];if(!key)return;const L=S.ro[key];if(!L||!L[0])return;
  const age=w.ag+dy,qk=w.pos=='QB'||w.pos=='K';if(age>(qk?41:35)){(S.svRet=S.svRet||[]).push(w.n);return}// he'd have hung it up by now
  const pr=rng((S.seed||1)*733+hsh(w.n)),o=cl(Math.round(w.o-(age>31?(age-31)*1.5:0)*(dy?1:0)),45,99);
  const used=new Set(L.filter(Boolean).map(x=>+x.num));let num=w.num||(w.pos=='QB'?10:40);if(used.has(+num)){const R_=(typeof NR!='undefined'&&NR[w.pos])||[1,99];let g_=0;do{num=R_[0]+(pr()*(R_[1]-R_[0]+1)|0)}while(used.has(num)&&g_++<80)}
  const x={n:w.n,pos:w.pos,num,ovr:o,age,cls:0,pot:Math.max(o,potOf(o,age,pr())),qp:1,qn:1,ny:null,h:[],cs:{},tm:[],aw:{},sv:1};
  try{genHist(x,w.k,w.pi,pr,1)}catch(e){}try{uHist(x)}catch(e){}
  const me=key=='h.0'&&S.stage=='pro',free=k=>L[k]&&isGen(L[k].n)&&!L[k].npx&&!L[k].pal&&!star(L[k].n)&&!(me&&k==0);
  const cascade=(ks,v)=>{let cur=v;for(const k of ks){const old=L[k];L[k]=cur;if(!old)return;cur=old}L.push(cur)};
  if(w.pos=='QB'){if(w.k==0&&free(0))cascade([0,23,24],x);else cascade([23,24],x)}
  else if(free(w.k))cascade([w.k],x);else L.push(x);
  have.add(w.n);fixed.push(w.n)});
 if(fixed.length){S.svLog=(S.svLog||[]).concat(fixed).slice(-60)}return fixed.length}catch(e){return 0}}
(()=>{const _h=hub;hub=function(){try{svFix()}catch(e){}return _h.apply(this,arguments)}})();
(()=>{const _p=proStart;proStart=function(){const r=_p.apply(this,arguments);try{S.T.forEach((t,i)=>rost('h.'+i));svFix()}catch(e){}return r}})();
// every star retirement is written down, so a retired star never comes back by accident
(()=>{const _c=cpuRet;cpuRet=function(x,t){const n=x&&x.n,r=_c.apply(this,arguments);try{if(r&&n&&x.n!=n&&(PKS.some(q=>q[2]==n)||QBB.some(b=>b[0]==n)||QBP.some(q=>q[0]==n))){S.svRet=S.svRet||[];if(!S.svRet.includes(n))S.svRet.push(n)}}catch(e){}return r}})();
