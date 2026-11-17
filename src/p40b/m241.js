// ===== 🎮 CLASSIC MADDEN PASSING (default controller mode, Tyler 2026-11-17) =====
// "Give me that tap to throw... classic Madden throwing. Placement... it's under maintenance."
// CLASSIC (default): tap a receiver's button = lob (touch over the top), hold it = bullet (auto-fires at 0.45 s).
//   Left stick while you throw = lead him (up deeper, down shorter, left/right toward that side), up to ~3 yds.
//   LB/L1 held = high, LT/L2 held = low. R3 = throw it away. Accuracy is your QB's ratings: no meter.
// TAP: instant throw on press (simplest). PLACEMENT & ACCURACY: the meter, now faster; marked "under maintenance".
window.CPMN={classic:'Classic (tap lob · hold bullet)',tap:'Tap (instant)',meter:'Placement & Accuracy (under maintenance)'};
window.cpmOf=function(){const m=S&&S.cpm;return CPMN[m]?m:'classic'};
window.cpmT=function(){const o=['classic','tap','meter'];S.cpm=o[(o.indexOf(cpmOf())+1)%3];try{save()}catch(e){}};
window.PAFULL=.75;   // Madden's meter fills quick
window.CLA={i:-1};
(()=>{try{const _p=pm;pm=function(){const r=_p.apply(this,arguments);try{const b=document.getElementById('cpmb');if(b)b.textContent='Controller passing: '+CPMN[cpmOf()]}catch(e){}return r};window.pm=pm}catch(e){}})();
window.claRelease=function(h){const s={...CLA};CLA={i:-1};try{const P=g.pl,q=P.qb,w=ctlRecv()[s.i];if(!w||g.ph!=='live'||P.air||P.car!==q)return;
 const kind=h<.2?'lob':'bullet',v=(16+((S.q&&S.q.pow)||60)*.1)*(kind==='lob'?.8:1.15);let T=Math.hypot(w.x-q.x,w.y-q.y)/v;for(let k=0;k<3;k++)T=Math.hypot(w.x+(w.vx||0)*T-q.x,w.y+(w.vy||0)*T-q.y)/v;
 let lx=w.x+(w.vx||0)*T+(s.sx||0)*2.5,ly=w.y+(w.vy||0)*T-(s.sy||0)*3;const Rg=thrR(),d=Math.hypot(lx-q.x,ly-q.y);if(d>Rg){lx=q.x+(lx-q.x)*Rg/d;ly=q.y+(ly-q.y)*Rg/d}
 g.swp={p:Math.round(Math.min(1,d/Rg)*100),t:performance.now()};doThrow(w,cl(lx,1.4,51.9),ly);
 const A=P.air;if(A){A.T=Math.max(.25,A.T*(kind==='lob'?1.3:.82)*(s.hi?1.1:s.lo?.92:1));A.kind=kind==='lob'?'lob':'bullet';A.hl=s.hi?'high':s.lo?'low':'';g.paLast={kind:A.kind,hl:A.hl};
  try{slRel(innerWidth/2,innerHeight-90,(kind==='lob'?'Lob':'Bullet')+(A.hl?' · '+A.hl:''),true)}catch(e){}}}catch(e){}};
(()=>{try{const _pa=window.ctlPA;window.ctlPA=function(down,edge,lx,ly){try{const P=g.pl,q=P&&P.qb;
 if(cpmOf()==='classic'&&q&&q.y<=g.los+.6&&!optOf(P)&&!edge(11)){
  if(CLA.i<0){for(let i=0;i<5;i++)if(edge(CTL_RB[i])&&ctlRecv()[i]){CLA={i,t0:performance.now()};break}return}
  if(!P||P.air||P.car!==q||g.ph!=='live'){CLA={i:-1};return}
  CLA.hi=CLA.hi||!!down[4];CLA.lo=!CLA.hi&&(CLA.lo||!!down[6]);CLA.sx=lx||0;CLA.sy=ly||0;const h=(performance.now()-CLA.t0)/1000;
  if(!down[CTL_RB[CLA.i]]||h>=.45)claRelease(h);return}
 CLA={i:-1}}catch(e){CLA={i:-1}}return _pa&&_pa.apply(this,arguments)}}catch(e){}})();
(()=>{try{const _g=window.ctlLegend;window.ctlLegend=function(){_g.apply(this,arguments);try{const lg=document.getElementById('ctlleg'),P=g&&g.pl,q=P&&P.qb;if(!lg||!g||g.ph!=='live'||!P||P.car!==q||P.air||ctlRoot()||q.y>g.los+.6||optOf(P))return;
 const ps=CTL.kind==='ps';let t=null;if(cpmOf()==='classic')t=`tap = lob · hold = bullet · L-stick lead · ${ps?'L1':'LB'} high · ${ps?'L2':'LT'} low · R3 throw away`;if(t&&lg.textContent!==t)lg.textContent=t}catch(e){}}}catch(e){}})();
