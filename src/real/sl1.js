// SLANTS RUN THROUGH (Tyler 2026-11-17: "my receiver didn't follow his slant route all the way. He stopped after the slant route was
// done. He's supposed to continue his route"): on Quick Slants, both slant receivers keep going downfield AND across (along the slant) from 2.5 s to 4 s, not drifting off into a hole.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.SL_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const o=await pg.evaluate(async(j)=>{const o={runs:0,n:0};try{S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(p[0]==='Quick Slants')pp=[c,i]});
 for(let t=0;t<20;t++){g.ph='pre';g.y=30;setup(0);snap(pp[0],pp[1]);let p1=null;for(let k=0;k<133;k++){try{upd(.03)}catch(e){}if(g.pl.air||g.ph!=='live')break;if(k===83)p1=[0,1].map(i=>[g.pl.wr[i].x,g.pl.wr[i].y])}const P=g.pl;if(!P||g.ph!=='live'||!p1)continue;[0,1].forEach(i=>{const w=P.wr[i];o.n++;const dy=w.y-p1[i][1],dx=Math.abs(w.x-26.5)-Math.abs(p1[i][0]-26.5);if(dy>3&&dx<0)o.runs++})}
 o.A_running=o.n>0&&o.runs/o.n>=.8}catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(o));await b.close()})();
