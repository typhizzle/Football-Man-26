// ===== 💥 A REAL TRUCK =====
// Tyler, 2026-11-16: "there should be a real truck animation, usually someone on defense falls backward after a successful truck by a
// player. Sometimes to the ground or at least shrugs them off" / "Trucking usually looks more like that".
// Before: the defender teleported 1.8 yards and was instantly flat. Now (same odds of a truck as before):
//  - about 6 in 10: he's KNOCKED DOWN — driven back over a third of a second, falls backward to the ground, lies there, gets up;
//  - the rest: SHRUGGED OFF — he staggers back, arms flung up, stays on his feet but is out of the play for a moment.
window.trkE=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
window.trkPose=function(o,m){try{const t=(performance.now()-o.kdS)/1000,f=o.kbFrom,p=trkE(t/.32);
 if(f){m.position.x=(f[0]+(o.x-f[0])*p)-26.5;m.position.z=-(f[1]+(o.y-f[1])*p)}m.rotation.y=o.kdr||0;
 if(o.kdF){const up=Math.max(0,o.kdU-t);   // seconds left before he's back on his feet
  const down=trkE(t/.34),rise=up<.45?up/.45:1,k=Math.min(down,rise);m.rotation.x=1.45*k;m.position.y=.3*k;
  try{m.A[0].rotation.x=m.A[1].rotation.x=-2.4*k;m.L[0].rotation.x=-.5*k;m.L[1].rotation.x=.3*k}catch(e){}}
 else{const s=Math.sin(Math.min(1,t/.6)*Math.PI);m.rotation.x=.42*s;m.position.y=0;try{m.A[0].rotation.x=-2.6*s;m.A[1].rotation.x=-2.1*s;m.A[0].rotation.z=.5*s;m.A[1].rotation.z=-.5*s;m.L[0].rotation.x=-.4*s;m.L[1].rotation.x=.5*s}catch(e){}}}catch(e){}};
