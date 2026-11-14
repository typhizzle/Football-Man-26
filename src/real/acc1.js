// Tyler 2026-11-14: accuracy can drop each season; a 100 OVR has to lose the 100 first; it resets at each new level.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.ACC_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{S=mig(JSON.parse(j));
 {let n=0;const a0=accTick;accTick=function(){n++;return a0.apply(this,arguments)};try{save()}catch(e){}accTick=a0;o.A_wired=n>0}accTick();o.A_noRejudge=S.accH===S.hist.length&&(S.accSw||0)===0;
 S.q.acc=90;S.q.pow=90;const a0=S.q.acc;
 const bad={y:'X',g:17,att:520,cmp:290,yds:3100,td:12,int:21};S.hist.push(bad);accTick();o.A_badDrop=a0-S.q.acc;o.A_bad=S.q.acc<=a0-2&&S.q.acc>=a0-3&&/Accuracy -/.test(S.fmsg||'');
 // capped at -6 per level
 for(let i=0;i<6;i++)S.hist.push(bad);accTick();o.B_floor=a0-S.q.acc;o.B_cap=a0-S.q.acc===6;
 // a season with under 60 passes doesn't count
 const s1=S.q.acc;S.hist.push({g:3,att:40,cmp:10,yds:80,td:0,int:6});accTick();o.C_fewPasses=S.q.acc===s1;
 // new level -> back to trained
 S.accSt='col';accTick();o.D_reset=S.q.acc===a0&&S.accSw===0;
 // a 100 OVR isn't touched
 for(const k in S.q)S.q[k]=100;S.hist.push(bad);accTick();o.E_100kept=qo(S.q)===100;
 // an elite season can add (over many tries, never more than +1 a season, +3 a level)
 for(const k in S.q)S.q[k]=85;S.accSw=0;let ups=0;for(let i=0;i<30;i++){const b=S.q.acc;S.hist.push({g:17,att:560,cmp:420,yds:5200,td:48,int:5});accTick();if(S.q.acc-b>1)ups=99;if(S.q.acc>b)ups++}o.F_ups=ups;o.F_upCap=S.q.acc===88&&ups===3;
 o.G_rtgSane=Math.round(passRtg({att:500,cmp:330,yds:4000,td:30,int:10}));
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
console.log(JSON.stringify(out,null,1));await b.close()})();
