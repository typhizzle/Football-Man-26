// ===== 💯 KEEPING 100 OVR: a checklist to keep it, the ways to lose it, and how to win it back =====
// Tyler, 2026-11-14: "3 C+ games or lower in a row loses you 100 overall. Also, if you're a QB ... at least get 4800 total
// yards passing or rushing, and then, at least 35 total touchdowns as well to keep it ... a little checklist ... how many
// C+ or lower games you've had in a row maybe four losses in a row".
// Then: "you have to get 5000 total yards and 45 total touchdowns to keep it and you can't lose three in a row or have two
// games with a C plus or lower in a row, that's for when you turn 36 and beyond. If they don't ever do those things that
// lose them, their 100 overall, then they can keep it until they retire ... regression rules don't necessarily apply to
// 100 overalls ... for 36, it's basically impossible to become 100 overall. After the first time you become 100 overall,
// and then you lose it, the way you can get it back is having your 99s maxed again and then winning a Super Bowl and a
// regular season MVP ... You can get it in the same year ... the first time should still say the same 99s maxed and 2
// Super Bowls won".
// While you are 100 OVR (pros):
//              under 36                         36 and older
//   keep it:   4,800 total yds + 35 total TDs   5,000 total yds + 45 total TDs   (by season's end; prorated if you
//                                                                                 became 100 partway through a season)
//   lose it:   3 games in a row graded C+ or lower / 2 games in a row graded C+ or lower
//              4 losses in a row                / 3 losses in a row
// Age regression no longer touches a 100: keep it and you keep it until you retire. Lose it and regression works on you
// from where you are, as for everyone. You can't BECOME a 100 at 36 or older.
// Losing it takes the 100 off accuracy, awareness, carrying and truck (throwing power and speed stay where you trained them).
// Winning it back (after the first time): every rating maxed at 99 + an Ultra Bowl title + a regular-season MVP, both won
// after you lost it (same season is fine). The first time is unchanged: 99s maxed + 2 Ultra Bowls.
window.k100=function(age){return (age!=null?age:(S.age||0))>=36?{yds:5000,td:45,cRow:2,lRow:3}:{yds:4800,td:35,cRow:3,lRow:4}};
window.K100C=72;   // C+ or lower = a grade under 72 (B-)
window.h100Bar=function(age){const f=S.h100f!=null?S.h100f:1,k=k100(age);return {yds:Math.round(k.yds*f),td:Math.round(k.td*f)}};
window.h100Lose=function(why){if(qo(S.q)<100)return 0;for(const k in S.q)if(S.q[k]>=100&&k!=='pow'&&k!=='mob')S.q[k]=99;if(qo(S.q)>=100)for(const k in S.q)if(S.q[k]>=100)S.q[k]=99;
 S.rgp=Math.max(S.rgp||0,99);S.h100c=0;S.h100l=0;S.ubs=0;   /* losing the 100 IS the hit for this stretch: no extra rough-stretch point on top */
 S.h100lostY=S.py||1;S.was100=0;
 S.aw=S.aw||[];S.aw.push('Pro yr '+(S.py||1)+': Lost 100 OVR ('+why+')');S.fmsg=(S.fmsg?S.fmsg+' ':'')+'💯➡️99 You lost your 100 OVR: '+why+'. '+((S.age||0)>=36?'At 36 and older it can\'t come back.':'To win it back: 99s maxed + an Ultra Bowl + a regular-season MVP.');return 1};
// every game: the two streaks (only count while you are 100, in the pros)
(()=>{try{const _u=userForm2;userForm2=function(gr,w){try{if(S&&S.stage=='pro'&&qo(S.q)>=100){const k=k100();
  S.h100c=gr<K100C?(S.h100c||0)+1:0;S.h100l=w?0:(S.h100l||0)+1;
  if(S.h100c>=k.cRow)h100Lose(k.cRow+' games in a row graded C+ or lower');else if(S.h100l>=k.lRow)h100Lose(k.lRow+' losses in a row')}}catch(e){}
 return _u.apply(this,arguments)}}catch(e){}})();
// titles won since you lost it
window.h100Since=function(){const y=S.h100lostY||0,yr=a=>{const m=/^Pro yr (\d+): /.exec(a);return m?+m[1]:-1},A=(S.aw||[]).filter(a=>yr(a)>=y);
 return {ub:A.some(a=>/: Ultra Bowl Champion$/.test(a)),mvp:A.some(a=>/: MVP$/.test(a))}};
window.h100BackOk=function(){if(!S||S.stage!='pro'||!S.e100||qo(S.q)>=100||(S.age||0)>=36)return false;if(!Object.values(S.q).every(v=>v>=99))return false;const s=h100Since();return s.ub&&s.mvp};
// the season check + winning it back: runs once per finished season (each new season line), after the accuracy check
window.h100Tick=function(){try{if(!S||!S.q||!Array.isArray(S.hist))return;try{accTick()}catch(e){}
 if(S.h100H==null){S.h100H=S.hist.length;if(S.e100&&qo(S.q)<100&&S.h100lostY==null)S.h100lostY=S.py||1;S.was100=qo(S.q)>=100?1:0;return}
 while(S.h100H<S.hist.length){const e=S.hist[S.h100H++];if(!e||!/^P/.test(String(e.y))||qo(S.q)<100)continue;if(S.h100y!==+String(e.y).slice(1))continue;   /* only a season you were actually 100 during */
  const was=S.h100f!=null?S.h100f:1;if(was<.25){S.h100f=1;S.h100y=S.py;continue}const age=(S.age||1)-1,b=h100Bar(age),yd=(e.yds||0)+(e.ry||0),td=(e.td||0)+(e.rtd||0);S.h100f=1;S.h100y=S.py;
  if(yd<b.yds||td<b.td)h100Lose('the season ended with '+yd.toLocaleString()+' total yards and '+td+' total TDs (needed '+b.yds.toLocaleString()+' and '+b.td+')')}
 // lost some other way (e.g. a rough stretch): remember when, so only titles won after it count
 if(S.was100&&qo(S.q)<100&&S.h100lostY!==S.py)S.h100lostY=S.py||1;
 if(h100BackOk()){for(const k in S.q)S.q[k]=100;S.aw.push('Pro yr '+S.py+': Earned back 100 OVR');S.fmsg=(S.fmsg?S.fmsg+' ':'')+'💯 Ultra Bowl + MVP with your 99s maxed: you earned your 100 OVR back.';S.h100c=0;S.h100l=0}
 // remember how much of THIS season you were a 100 for
 if(S.stage=='pro'&&qo(S.q)>=100&&S.h100y!==S.py){S.h100y=S.py;const g0=(S.ss&&S.ss.g)||0;S.h100f=g0>=2?Math.max(0,1-g0/17):1}
 S.was100=qo(S.q)>=100?1:0}catch(e){}};
(()=>{try{const _s=save;save=function(){try{h100Tick()}catch(e){}return _s.apply(this,arguments)}}catch(e){}})();
// you can't become a 100 at 36 or older (a 100 you already have is yours to keep)
(()=>{try{const _q=qCap;qCap=function(k){const c=_q.apply(this,arguments);try{if(c>=100&&(S.age||0)>=36&&qo(S.q)<100)return 99}catch(e){}return c}}catch(e){}})();
// the upgrade screen
(()=>{try{const _h=hundInfo;hundInfo=function(){let r=_h.apply(this,arguments);try{if(!S||S.stage!='pro')return r;const o=qo(S.q),age=S.age||0;if(o<99)return r;
 const ck=v=>v?'✅':'⬜';
 if(o>=100){r='';const ss=S.ss||{},yd=(ss.yds||0)+(ss.ry||0),td=(ss.td||0)+(ss.rtd||0),b=h100Bar(),k=k100(),c=S.h100c||0,l=S.h100l||0;
  r=`<div class=card style="margin:6px 0"><b>💯 Keeping your 100${age>=36?' (36 and older: harder)':''}</b><br><small>Keep it until you retire by doing this every season:</small>
  <div>${ck(yd>=b.yds)} At least ${b.yds.toLocaleString()} total yards (passing + rushing) · <b>${yd.toLocaleString()}</b> so far</div>
  <div>${ck(td>=b.td)} At least ${b.td} total touchdowns · <b>${td}</b> so far</div>
  <small>Ways to lose it:</small>
  <div>❌ ${k.cRow} games in a row graded C+ or lower · <b>${c}/${k.cRow}</b> now</div>
  <div>❌ ${k.lRow} losses in a row · <b>${l}/${k.lRow}</b> now</div>
  <div>❌ Missing the yards or touchdowns when the season ends</div>
  ${age<36?'<small>From age 36 it gets harder: 5,000 yards, 45 TDs, and 2 C+ games or 3 losses in a row take it. Age regression never touches a 100.</small>':'<small>Age regression doesn\'t touch a 100. Once it\'s gone at 36 or older, it can\'t come back.</small>'}</div>`;return r}
 if(age>=36)return r+'<p><small>💯 At 36 and older you can\'t become a 100.</small></p>';
 if(S.e100){const s=h100Since(),mx=Object.values(S.q).every(v=>v>=99);
  return `<div class=card style="margin:6px 0"><b>💯 Win your 100 back</b><br><small>All three, after you lost it (the same season is fine):</small>
  <div>${ck(mx)} Every rating maxed at 99</div><div>${ck(s.ub)} Win an Ultra Bowl</div><div>${ck(s.mvp)} Win regular-season MVP</div></div>`}}catch(e){}return r}}catch(e){}})();
