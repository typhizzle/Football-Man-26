// ===== 🏃 YOUR OWN CARRIES ARE REAL TOO =====
// Tyler, 2026-11-14: "Make sure all carrying stats are accurate." Backs/receivers were fixed (m160), but in your
// played games the box score still made up YOUR carries (3 to 7 a game, whatever you did). Now every run or scramble
// you take is counted as it happens (sacks and two-point tries don't count, like the real stat book), and the box
// score shows that number. Your rushing yards and TDs were already real.
(()=>{try{const _e=endPlay;endPlay=function(ye,tx,o){let P=null,was=true;try{P=g&&g.pl;was=!!(P&&P.done)}catch(e){}
 const r=_e.apply(this,arguments);
 try{if(P&&!was&&P.done&&!g.two){o=o||{};if(!o.int&&!o.inc&&!o.sk&&!P.passed&&P.car&&P.car===P.qb){g.qcar=(g.qcar||0)+1}}}catch(e){}
 return r}}catch(e){}})();
(()=>{try{const _b=bxReal;window.bxReal=function(bx,pre){const r=_b.apply(this,arguments);try{if(r&&r.A&&pre&&pre.qcar!=null){const q=(r.A.rush||[]).find(z=>z.p==='QB');
 if(q){q.c=pre.qcar;if(!q.c&&!q.y&&!q.td)r.A.rush=r.A.rush.filter(z=>z!==q)}}}catch(e){}return r}}catch(e){}})();
