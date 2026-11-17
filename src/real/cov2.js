// COVERAGE HOLDS WHILE YOU WAIT (Tyler 2026-11-17: zone defenders still have a man; nobody comes off): 150 plays, QB holding the ball; at 2-4 s at most 18% of receivers open (was 20-28%).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.CV_FILE});await pg.evaluate(v=>{window.__dh=v},process.env.DH==null?null:+process.env.DH);const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const R_=await pg.evaluate(async(j)=>{S=mig(JSON.parse(j));if(window.__dh!=null)ZC.dh=window.__dh;save=()=>{};startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();await new Promise(r=>setTimeout(r,400));
 const pps=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pps.push([c,i])});const T=[1,2,3,4,5,6];const acc={};T.forEach(t=>acc[t]={wrOpen:0,n:0,dbNearQB:0,dbs:0,sepAvg:0,why:{}});
 for(let r=0;r<150;r++){const pp=pps[r%pps.length];g.ph='pre';g.y=30;g.dn=1;g.tg=10;setup(0);snap(pp[0],pp[1]);let t=0;
  for(let k=0;k<200;k++){try{inp.x=0;inp.y=0;upd(.03)}catch(e){}t+=.03;const P=g.pl;if(!P||g.ph!=='live'||P.car!==P.qb||P.air)break;
   const ti=T.find(x=>Math.abs(x-t)<.016);if(ti){const A=acc[ti],D=P.db.concat(P.lb),q=P.qb;P.wr.forEach(w=>{if(w.y<g.los+1)return;const s=Math.min(...D.map(d=>Math.hypot(d.x-w.x,d.y-w.y)));A.n++;A.sepAvg+=s;if(s>4)A.wrOpen++});
    P.db.forEach(d=>{A.dbs++;const dq=Math.hypot(d.x-q.x,d.y-q.y);if(dq<8){A.dbNearQB++;const why=(d.blz?'blitz':'')+(d.pk?'pk':'')+(d.mw?'mw':'')+(d.w?'w':'')+(d.spy?'spy':'')+(zcScr(P)?'scr':'')+'|'+(d.cbB||0).toFixed(2);A.why[why]=(A.why[why]||0)+1}})}}}
 const o={};T.forEach(t=>{const A=acc[t];o[t+'s']={open:Math.round(A.wrOpen/Math.max(1,A.n)*100)+'%',sep:+(A.sepAvg/Math.max(1,A.n)).toFixed(1),dbNearQB:Math.round(A.dbNearQB/Math.max(1,A.dbs)*100)+'%',why:JSON.stringify(A.why).slice(0,200)}});return o},j);const pc=k=>parseFloat(R_[k].open);R_.A_ok=pc("2s")<=18&&pc("3s")<=18&&pc("4s")<=18;console.log(JSON.stringify(R_));await b.close()})();
