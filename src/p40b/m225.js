// ===== 🦶 PUNTERS =====
// Tyler, 2026-11-16: "Are there punters in the game? Is that a position? If not, it should be."
// There weren't: the kicker (K) also punted. Now every team (pro, college, high school) has a punter (P) on its roster, in the
// reserve spots so no starting spot moves. A team without one signs a new man (a name from Tyler's name lists, rated for his
// level, no past seasons, so nothing is made up). The league keeps kickers AND punters (needs 2 at K/P), draft classes include
// punters, and on punts it's the punter who comes out and kicks.
try{LGN.K=2}catch(e){}
try{if(!LGDP.some(x=>x[0]==='P'))LGDP.push(['P',.01])}catch(e){}
window.pnMake=function(s,L,ti,lv){const r=rng((((s.seed||1)*131+ti*977+(L.length||0)*7))>>>0),M=myNames(),taken=new Set();for(const k in s.ro){(s.ro[k]||[]).forEach&&(s.ro[k]||[]).forEach(x=>{if(x&&x.n)taken.add(x.n)})}
 let n,g=0;do n=NF[r()*NF.length|0]+' '+NL[r()*NL.length|0];while((M.has(n)||taken.has(n))&&g++<60);
 const nums=new Set(L.filter(Boolean).map(x=>+x.num));let num=1+(r()*19|0),k=0;while(nums.has(num)&&k++<30)num=1+(r()*19|0);
 const [lo,hi]=lv==='pro'?[62,84]:lv==='col'?[50,76]:[40,65];const ovr=lo+(r()*(hi-lo+1)|0),age=lv==='pro'?23+(r()*12|0):lv==='col'?18+(r()*4|0):15+(r()*3|0);
 return {n,pos:'P',num,ovr,age,pot:Math.min(99,ovr+(r()*10|0)),cls:lv==='pro'?0:1+(r()*4|0),qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{},pnt:1}};
window.pnEnsure=function(s){try{s=s||S;if(!s||!s.ro)return 0;const lv=s.stage==='pro'||s.stage==='draft'?'pro':s.stage==='col'?'col':'hs';let n=0;
 for(const k in s.ro){if(!/^h\.\d+$/.test(k))continue;const L=s.ro[k];if(!Array.isArray(L)||L.length<23)continue;{const q=L.find(x=>x&&x.pos==='P'&&x.pnt&&!x.pid);if(q){q.pid='p'+(s.pidN=(s.pidN||0)+1);n++}}if(L.some(x=>x&&x.pos==='P'))continue;const ti=+k.slice(2);
  const p=pnMake(s,L,ti,lv);p.pid='p'+(s.pidN=(s.pidN||0)+1);let at=-1;for(let j=25;j<L.length;j++)if(!L[j]){at=j;break}if(at<0){if(L.length<25){while(L.length<25)L.push(null)}const prev=L[L.length-1];if(prev){['dn','qn','qp'].forEach(f=>{if(prev[f]!==undefined)p[f]=prev[f]})}L.push(p)}else L[at]=p;n++}   // the roster's last player carries its 'built' markers
 if(n)s.pnN=(s.pnN||0)+n;return n}catch(e){return 0}};
(()=>{try{const _m=mig;mig=function(s){const r=_m.apply(this,arguments);try{if(r)pnEnsure(r)}catch(e){}return r}}catch(e){}})();
(()=>{try{const _h=hub;hub=function(){try{if(S&&S.ro)pnEnsure(S)}catch(e){}return _h.apply(this,arguments)}}catch(e){}})();
