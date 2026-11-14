// ===================== QUICK FIXES (Oct 31) =====================
// Tweeter: a way out at the top (sticky), not just at the bottom
(()=>{const _t=twV;twV=function(){const r=_t.apply(this,arguments);try{const bs=[...ui.querySelectorAll('button')],bk=[...bs].reverse().find(b=>/Back|Close|Phone|menu/i.test(b.textContent));if(bk&&!ui.querySelector('.twtop')){const d=document.createElement('div');d.className='twtop';d.style.cssText='position:sticky;top:0;z-index:3;background:#151a22;padding:6px 0;margin:-4px 0 4px';const b=document.createElement('button');b.className='g';b.textContent='← '+bk.textContent.replace(/^←\s*/,'');b.setAttribute('onclick',bk.getAttribute('onclick')||'hub()');d.appendChild(b);const h=ui.querySelector('h2');(h&&h.parentNode?h.parentNode:ui).insertBefore(d,h?h.nextSibling:ui.firstChild)}}catch(e){}return r}})();
// Paullin Loudherd is white
try{GPA.csv.f.s='#f1c27d';GPA.csv.f.h='#6b4a2b'}catch(e){}
// field goal odds right on the Field Goal play card
(()=>{const _p=pui;pui=function(){const r=_p.apply(this,arguments);try{if(!g||g.y==null)return r;const d=117-g.y,p=Math.round(fgP(d,KKt(0),g.lv)*100);document.querySelectorAll('#ui *, #ov *, body > div *').forEach(el=>{if(el.children.length==0&&/^\s*Field Goal\s*$/.test(el.textContent))el.textContent='Field Goal · '+d+' yds · ~'+p+'%'})}catch(e){}return r}})();
// ===================== 🏈 LINEMEN (rebuilt): real stance, a pop at the snap, then hand-fighting in the trenches =====================
function lnSt(o,m,v){if(!LNP[o.pos]||!g||g.ph=='dead'||g.ph=='wdead')return;const pre=g.ph=='pre',dl=o.pos=='DE'||o.pos=='DT',P=g.pl,t=performance.now()/1000,ph=(o.x||0)*1.7;
 if(pre){// crouched stance: knees bent, chest over the knees, a hand down for the D-line
  m.rotation.x-=dl?.2:.14;m.position.y-=.05;m.L[0].rotation.x=-.55;m.L[1].rotation.x=-.35;m.A[0].rotation.x=dl?.15:.55;m.A[1].rotation.x=dl?-.45:.55;return}
 const st=P?P.t:1;
 if(st<.35){// the pop: both sides fire out low and strike
  const k=st/.35;m.rotation.x-=.15*(1-k)+.1;m.A[0].rotation.x=m.A[1].rotation.x=1.1+.45*k;m.L[0].rotation.x=-.5*(1-k);m.L[1].rotation.x=.4*(1-k);return}
 if(v<2.6){// engaged: hands punching (alternating), feet churning, leaning into the man
  const s=Math.sin(t*8+ph),s2=Math.sin(t*13+ph);m.rotation.x-=.1+s2*.02;m.A[0].rotation.x=1.45+s*.18;m.A[1].rotation.x=1.45-s*.18;m.L[0].rotation.x=s2*.38;m.L[1].rotation.x=-s2*.38;m.position.y=Math.abs(s2)*.03}
 else m.rotation.x-=.08}
