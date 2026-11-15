// Tyler 2026-11-15: "how many 1,000-yard seasons are there really in a season? ... a lot of people close to 2,000". A brand-new career
// (never reloaded) sims a whole 2026: rushing must look like real football (about 12-16 backs over 1,000; a few over 1,500; nobody at
// 2,000), and no wide receiver piles up rushing yards as the "other back".
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg,errs}=await H.open({});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
const out=await pg.evaluate(async()=>{const o={};try{const e=tkList().find(x=>/Hilton/.test(x.n));tkGo(e.i);ovHide();save=()=>{};
 let g_=0;while(g_++<200){const e2=pevt();if(e2.t=='pro'||e2.t=='pp'||e2.t=='pbw')psim(e2);else if(e2.t=='bye')pWeek(null);else if(e2.t=='ppbye')ppAdv(0);else if(e2.t=='fa')S.fa=null;else if(e2.t=='sum'){if(!S.psum)mkPsum();break}else break}
 let wrRush=0;for(let i=0;i<S.T.length;i++)rost('h.'+i).forEach(x=>{if(!x)return;const z=szOne(i,x.n);if(z&&lgGrp(x.pos)==='WR'&&z.ry>wrRush)wrRush=z.ry});
 try{seasonEnd()}catch(e){}const R=[];for(const k in S.ro)if(Array.isArray(S.ro[k]))S.ro[k].forEach(x=>{if(!x||!x.h)return;const r=x.h.find(q=>q[0]===2026);if(r&&lgGrp(x.pos)=='RB')R.push(r[2])});R.sort((a,b)=>b-a);
 o.n1000=R.filter(v=>v>=1000).length;o.n1500=R.filter(v=>v>=1500).length;o.top=R.slice(0,5).join(',');o.wrRushMax=wrRush;
 o.A_thousand=o.n1000>=7&&o.n1000<=21;o.B_fifteen=o.n1500<=6;o.C_noTwoThousand=R[0]<2000;o.D_spread=R[0]-R[Math.min(31,R.length-1)]>600;o.E_wrNotABack=wrRush<260;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o});
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
