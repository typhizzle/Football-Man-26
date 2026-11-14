// ===== 🏆 Every player's awards match the league's own history =====
// Tyler, 2026-11-14: "Shouldn't Meters Ferret have like 2 DPOY at least?" … "just make it accurate for
// everyone. That's part of Player Lives Matter." Measured on the 11-07 save: Meters Ferret's card said
// 1 DPOY; League History has him 2023, 2025 and 2030. 15 players were missing 17 awards.
// Source of truth: the League History screen's own data — LGH0 (history through 2025) plus lhLeague()
// (the simulated seasons, every season you played, and your own corrections). A player's count may only go UP to
// what that history says; it is never lowered. A NAME IS NOT AN IDENTITY: if two men in the save
// share a name, neither is touched (reported in S.awHist.shared). Re-checked once per season.
window.AWHK={mvp:'mvp',opoy:'opoy',dpoy:'dpoy',sbm:'sbm'};
window.awHistFix=function(s){try{if(!s||!s.T||s.stage!=='pro')return null;const o=S;S=s;let out=null;
 try{const y=yrN();if(s.awHist&&s.awHist.y===y)return s.awHist;
  const G=lhLeague()||[],have=new Set(G.map(r=>r.yr)),L=(typeof LGH0!='undefined'?LGH0:[]).filter(r=>!have.has(r.yr)).concat(G),cnt={};
  L.forEach(r=>{Object.keys(AWHK).forEach(k=>{const n=String(r[k]||'').replace(/^▶\s*/,'').trim();if(!n)return;(cnt[n]=cnt[n]||{})[k]=((cnt[n]||{})[k]||0)+1})});
  const all=[],byN={};sealWalk(s,x=>{if(!x||!x.n||x.n===s.name)return;all.push(x);(byN[x.n]=byN[x.n]||new Set()).add(x.pid||x)});
  let raised=0;const shared=[],who=[];
  all.forEach(x=>{const c=cnt[x.n];if(!c)return;if(byN[x.n].size>1){if(!shared.includes(x.n))shared.push(x.n);return}
   x.aw=x.aw||{};Object.keys(c).forEach(k=>{const have=x.aw[k]||0;if(c[k]>have){raised+=c[k]-have;x.aw[k]=c[k];if(who.length<40)who.push(x.n+' '+k.toUpperCase()+' '+have+'→'+c[k])}})});
  out=s.awHist={y,raised:(s.awHist&&s.awHist.raised||0)+raised,shared,last:who};
 }finally{S=o}
 return out}catch(e){return null}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{awHistFix(s)}catch(e){}return s}}catch(e){}})();
