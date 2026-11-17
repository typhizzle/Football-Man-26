// CONTROLLER ICONS + METER ON A RETINA SCREEN (Tyler 2026-11-17, MacBook): at 2x pixels the icons were drawn at half their position
// (floating up-left "in space"). Each receiver's icon must be drawn right over him on the real screen, at 1x and 2x, and the meter too.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const out={};for(const dpr of [1,2]){const {b,pg,errs}=await H.open({w:1440,h:900,dpr});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
 out['x'+dpr]=await pg.evaluate(async(j)=>{const o={};try{S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();
  CTL.mode='pad';CTL.on=true;CTL.lastPad=performance.now();CTL.kind='xbox';let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});g.ph='pre';g.y=30;setup(0);snap(pp[0],pp[1]);
  await new Promise(r=>setTimeout(r,700));
  // record where circles land in real screen pixels this frame
  const pts=[];const ar=cx.arc;cx.arc=function(x,y,r){const t=cx.getTransform();pts.push([t.a*x+t.e,t.d*y+t.f,r*t.a]);return ar.apply(this,arguments)};
  PA={i:1,t0:performance.now()-300};await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));cx.arc=ar;
  const d=cv.width/W,R=ctlRecv();o.dpr=d;let near=0;R.forEach(w=>{const s=pj(w.x,w.y,paIconY);const sx=s[0]*d,sy=s[1]*d;if(pts.some(p=>Math.hypot(p[0]-sx,p[1]-sy)<6*d))near++});o.icons=near+'/'+R.length;o.A_onReceivers=near===R.length;
  const w=R[1],s=pj(w.x,w.y,paIconY);o.B_meter=pts.some(p=>p[2]>=25*d&&Math.hypot(p[0]-s[0]*d,p[1]-s[1]*d)<4*d);
 }catch(e){o.err=e.message}return o},j);if(dpr===2)await pg.screenshot({path:process.env.SHOT||'/tmp/claude-0/-home-user-Football-Man-26/5e6d261b-7bbf-5295-ac15-f9b161a4792b/scratchpad/retina.png'});await b.close()}
 console.log(JSON.stringify(out))})();
