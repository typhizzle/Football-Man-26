// title screen: keep the title clear of the cover athlete's face on any screen size / font
let TTLC=0;
function ttlFit(){if(!PL.cv||ui.style.display=='none')return;if(++TTLC%5)return;const e=ui.querySelector('.ttl');if(!e)return;const r=e.getBoundingClientRect();if(!r.height)return;
const p=PL.cv.position,top=v3.set(p.x,4.9,p.z).project(cm),hx=(top.x+1)/2*W,hy=(1-top.y)/2*H,over=hx>r.left-50&&hx<r.right+50;PL.dy=PL.dy||0;
if(over&&hy<r.bottom+14)PL.dy=Math.min(1.3,PL.dy+.05);else if((!over||hy>r.bottom+70)&&PL.dy>0)PL.dy=Math.max(0,PL.dy-.02)}
