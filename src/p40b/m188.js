// ===== 📉 CPU PLAYERS GET THE SAME AGE MAXIMUMS (Tyler 2026-11-15: "All those regression rules apply to every player") =====
// CPU players took the yearly drop (greats a bit less, from offseason work) but kept a 99 cap at any age, so a 45-year-old
// could still be 93. Now after every birthday from 36 a CPU player is held to the same maximum as you (45: 80, 50: 50).
(()=>{try{const _c=cpuDev;cpuDev=function(x,wins){const r=_c.apply(this,arguments);try{if(x&&(x.age||0)>=36&&(x.ovr||0)<100){const c=ageCap(x.age);if(c<100&&x.ovr>c)x.ovr=c;if(x.pot!=null&&x.pot>Math.max(c,x.ovr))x.gcap=Math.min(x.gcap||99,c)}}catch(e){}return r}}catch(e){}})();
