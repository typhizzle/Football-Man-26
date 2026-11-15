// ===== 🏃 RUSHING NUMBERS LIKE REAL FOOTBALL (second pass; the Nov 14 fix did not hold) =====
// Tyler, 2026-11-15: "how many 1,000-yard seasons are there really in a season? Look at rushing and receiving. There's a lot of people
// close to 2,000". Measured: a simmed 2026 had all 32 lead backs over 1,500 (top 2,125); his 2036 had 32 over 1,000 and 11 over 1,500.
// Real NFL: about 12-16 backs over 1,000 a year, 1-3 over 1,500, 2,000 has happened 9 times ever.
// Cause: every lead back got ~2/3 of a team rushing total that ran ~130 a game, whoever he was, and the leftover yards were credited
// to the No. 2 wide receiver as "3 carries".
// Now: a back's share of the carries and what he gets per carry depend on how good he is (plus a little team tendency that stays
// the same all season), team rushing comes down ~14%, and the rest of the carries go to the backup running back when the team has
// one (a receiver only gets a real end-around or two).
// Like the first fix: starts with games played after this update (S.bxv2); a season still being played is redone from week 1.
window.bxNew2=function(){try{if(!S.bxv2)S.bxv2={y:yrN(),w:0};const v=S.bxv2,y=yrN(),w=BXW==null?(S.wk||0):BXW;return y>v.y||(y===v.y&&w>=v.w)}catch(e){return false}};
window.bxRush2=function(ti,L,ry,qry,car,r){try{if(typeof bxNew!='function'||!bxNew()||!bxNew2())return null;const rb=L[1];if(!rb)return null;
 const rs=bxRng(bxHash('work|'+ti+'|'+yrN()+'|'+(S.seed||1))),t1=rs(),t2=rs(),ov=rb.ovr||75;
 const sh=cl(.5+(ov-80)*.012+(t1-.5)*.16,.38,.8),eff=cl(.9+(ov-80)*.012,.78,1.14)*(.93+t2*.14);
 const base=Math.max(20,ry-qry)*.86*eff,c1=cl(Math.round(car*sh),6,27),y1=Math.round(base*sh*(.75+r()*.5));
 const rb2=L.find((x,k)=>k!==1&&k>=23&&x&&x.pos==='RB'&&!x.inj)||null;let c2,y2;
 if(rb2){c2=Math.max(1,car-c1);y2=Math.round(base*(1-sh)*(.7+r()*.6))}else{c2=Math.min(3,Math.round(r()*2.6));y2=c2?Math.round(c2*(3+r()*6)):0}
 return {c1,y1,c2,y2,n2:rb2}}catch(e){return null}};
(()=>{try{const _m=mig;mig=function(s){s=_m.apply(this,arguments);try{if(s&&!s.bxv2){const o=S;S=s;let y=0;try{y=yrN()}catch(e){}S=o;const closed=s.stage==='pro'&&s.sled===s.py;s.bxv2={y,w:closed?(s.wk||0)+99:0}}}catch(e){}return s}}catch(e){}})();
// a career started in this session had no formula version yet, so its games used the OLD (inflated) formulas until the next reload
(()=>{try{const _n=bxNew;window.bxNew=function(){try{if(S&&!S.bxv)S.bxv={y:yrN(),w:0,v:BXV,re:1}}catch(e){}return _n.apply(this,arguments)}}catch(e){}})();
