// ===== 🏈 LINEMEN STAND AND BLOCK LIKE LINEMEN (Tyler, 2026-11-15: "the lineman's legs are like going backwards") =====
// Before the snap the stance tilted the legs back behind the body (thigh rotation was negative = feet swung backward), so with the
// forward lean every lineman looked like he was kicking his legs out behind him. And while blocking, a lineman who gave ground
// turned to face the way he was moving (his back to the man he was blocking).
// Now: a real stance (knees bent, feet under the hips, slightly staggered), and in the block linemen keep facing their man while
// they shuffle and give ground: offense faces downfield, defense faces the backfield. Only how they look changes.
(()=>{try{const _l=lnSt;lnSt=function(o,m,v){const r=_l.apply(this,arguments);try{if(!LNP[o.pos]||!g||g.ph==='dead'||g.ph==='wdead')return r;const P=g.pl,dl=o.pos==='DE'||o.pos==='DT';
 if(g.ph==='pre'){m.L[0].rotation.x=dl?.42:.34;m.L[1].rotation.x=dl?.12:.2;return r}
 if(P&&P.car!==o&&v<2.6){const def=P.def&&P.def.includes(o);m.rotation.y=def?Math.PI:0;const st=P.t||1;if(st>=.35){const s=Math.sin(performance.now()/1000*13+(o.x||0)*1.7);m.L[0].rotation.x=.12+s*.3;m.L[1].rotation.x=.12-s*.3}}}catch(e){}return r}}catch(e){}})();
