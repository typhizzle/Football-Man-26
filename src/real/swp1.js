// SWIPE STAYS WHERE TYLER HAD IT (2026-11-16, "I had it like 91% ... now ... 65%"): his Simmons save, the same swipes at every
// receiver at varied times, played out. The 91% version: 69-71% complete, 20-22 picks per 600. Tyler: 70-75% is where he likes it -> held at 68-79% (600 swipes, noise +-3) and at most 4.5% picks (the regressed build threw 5%).
// Same swipes on every build: at 1.5s after the snap, swipe at the most open receiver (power by distance), play it out.
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg,errs}=await H.open({file:(process.env.F||'/mnt/user-data/outputs/football-man.html'),w:390,h:844});
const J_=require('fs').readFileSync('/home/claude/specs/simothy-2037.json','utf8');const out=await pg.evaluate(async([N,process_ZC,J_])=>{const o={n:0,cmp:0,int:0,inc:0,err:[],ly:[],sep:[]};try{window.confirm=()=>true;window.alert=()=>{};SLOT=1;try{if(process_ZC){if(process_ZC.rs)window.RSIT=process_ZC.rs;if(process_ZC.old)window.ROLD=1;Object.assign(ZC,process_ZC)}}catch(e){}S=mig(JSON.parse(J_));o.who=S.name;o.q=[S.q.acc,S.q.pow,S.q.awr].join("/");save=()=>{};
 startGame0(1,'reg');try{tossClear()}catch(e){}ovHide();const pps=[];for(const c in PB)PB[c].forEach((p,i)=>{if(p[1]=='pass')pps.push([c,i])});CAMI=3;await new Promise(r=>setTimeout(r,600));
 let rs=12345;Math.random=()=>{rs=(rs*16807)%2147483647;return (rs-1)/2147483646};
 for(let t=0;t<N;t++){const pp=pps[t%pps.length];g.ph='pre';g.y=25+(t*7)%40;g.dn=1;g.ds=10;setup(0);snap(pp[0],pp[1]);const nk=30+(t*13)%45;for(let k=0;k<nk;k++){try{upd(.03)}catch(e){}}
  const P=g.pl;if(!P||P.air||P.car!==P.qb||g.ph!=='live'){o.err.push('state');continue}const q=P.qb;const D=P.db.concat(P.lb);
  const R=(P.wr||[]).concat(P.te?[P.te]:[]).filter(Boolean);const sep=w=>Math.min(...D.map(d=>Math.hypot(d.x-w.x,d.y-w.y)));
  const w=R[t%R.length];o.sep.push(+sep(w).toFixed(1));
  const O=swBall()||pj(q.x,q.y,1.4),Tg=pj(w.x,w.y,1.0);const dist=Math.hypot(w.x-q.x,w.y-q.y);const pw=Math.min(1,.25+dist/40);o.opp=o.opp||[P.db,P.lb].flat().map(d=>d.nm).join(",");
  const L_=Math.hypot(Tg[0]-O[0],Tg[1]-O[1])||1;swThrow((Tg[0]-O[0])/L_,(Tg[1]-O[1])/L_,pw,O[0],O[1],[],Tg[0],Tg[1]);
  const A=P.air;if(!A){o.err.push('nothrow');continue}o.n++;if(A.tgt===w)o.right=(o.right||0)+1;const yd=w.y-g.los;o.byd=o.byd||{};const bk=yd<6?"short":yd<15?"mid":"deep";o.byd[bk]=o.byd[bk]||[0,0];o.byd[bk][0]++;A._bk=bk;const lx=A.lx,ly=A.ly;
  let k=0;while(P.air&&k++<200){try{upd(.03)}catch(e){break}}for(let j=0;j<5;j++){try{upd(.03)}catch(e){}}
  const c=P.car;o.ly.push(+Math.hypot(lx-w.x,ly-w.y).toFixed(1));if(c&&R.includes(c)||c===P.rb){o.cmp++;o.byd[A._bk][1]++}else if(c&&D.concat(P.dl||[]).includes(c))o.int++;else o.inc++}
}catch(e){o.e=e.message}o.zc=typeof ZC!="undefined"?1:0;o.pct=Math.round(o.cmp/Math.max(1,o.n)*100);o.err=o.err.length;o.avgMiss=+(o.ly.reduce((a,b)=>a+b,0)/Math.max(1,o.ly.length)).toFixed(2);o.avgSep=+(o.sep.reduce((a,b)=>a+b,0)/Math.max(1,o.sep.length)).toFixed(2);delete o.ly;delete o.sep;return o},[+process.env.N||600,JSON.parse(process.env.ZCJ||"null"),J_]);
out.A_ok=out.pct>=68&&out.pct<=79;out.B_ok=out.int/Math.max(1,out.n)<=.045;out.C_ok=out.right/Math.max(1,out.n)>=.95;delete out.opp;console.log(JSON.stringify(out));await b.close()})();
