// THE METER MATTERS (Tyler 2026-11-17: 'the meter seems to have no effect on the throw whatsoever'): the same throw released in the color vs in the black vs held too long; the black and too-long must cost real catches.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.MT_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const R_=await pg.evaluate(async(j)=>{S=mig(JSON.parse(j));save=()=>{};startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();CTL.mode='pad';
 let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});const out={};
 for(const m of [.05,.2,.32,.45,.6,.69,.8,.95,1.2]){let miss=0,cmp=0,n=0;const rd=paRead(m);
  for(let t=0;t<60;t++){g.ph='pre';g.y=30;setup(0);snap(pp[0],pp[1]);for(let k=0;k<45;k++)upd(.03);const P=g.pl;if(P.car!==P.qb||P.air)continue;const w=ctlRecv()[1];PA={i:1,t0:performance.now()};PA.m=m;PA.sx=0;PA.sy=0;
   const T0=w;paRelease();const A=P.air;if(!A)continue;n++;let k=0;const lx=A.lx,ly=A.ly;while(P.air&&k++<200)upd(.03);miss+=Math.hypot(lx-w.x,ly-w.y);if(P.car===w)cmp++}
  out[m]={kind:rd.kind,inWin:rd.inWin,n,miss:+(miss/Math.max(1,n)).toFixed(2),cmp:Math.round(cmp/Math.max(1,n)*100)}}
 out.win={lob:ptWin('lob'),touch:ptWin('touch'),bullet:ptWin('bullet')};return out},j);const g_=k=>R_[k].cmp;R_.A_touch=g_('0.45')<=g_('0.6')-15;R_.B_bullet=g_('0.8')<=g_('0.95')-15;R_.C_tooLong=g_('1.2')<=20;R_.D_lob=g_('0.05')<g_('0.2');console.log(JSON.stringify(R_));await b.close()})();
