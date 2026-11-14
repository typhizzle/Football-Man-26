// 100 OVR only for a RECORD season. Tyler 2026-11-14: "43 touchdowns isn't really historic".
// Fails on V234: a 43-TD QB (below the 55 record) becomes 100, and random 100s appear.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const rec=recGet('pro','ptd',1)[0];out.recordPassTD=rec;
 // put a 99 QB on team 3 with a 43-TD season, and a 99 QB on team 4 with a record season
 const mk=(i,td)=>{const q=rost('h.'+i)[0];q.ovr=99;q.age=27;delete q.hq;const P=PS(i);P.P.b=td;return q};
 const _ps=PS;const fake={};
 [3,4].forEach(i=>{const p=_ps(i)||{};fake[i]=JSON.parse(JSON.stringify(p));if(!fake[i].P)fake[i].P={a:4000,b:0,c:10};if(!fake[i].Ru)fake[i].Ru={a:0,b:0};if(!fake[i].Re)fake[i].Re={a:0,b:0};if(!fake[i].Sk)fake[i].Sk={a:0}});
 PS=function(i){return fake[i]||_ps.apply(this,arguments)};
 fake[3].P.b=43;fake[4].P.b=rec+1;
 const q3=rost('h.3')[0],q4=rost('h.4')[0];[q3,q4].forEach(q=>{q.ovr=99;q.age=27;delete q.hq});
 // and every non-stat starter at 99, to catch any random 100
 let n99=0;for(let i=5;i<32;i++)rost('h.'+i).forEach((x,k)=>{if(k>2&&k!=11&&x&&!/^(LT|LG|C|RG|RT|K)$/.test(x.pos)){x.ovr=99;x.age=27;delete x.hq;n99++}});
 let rnd=0;for(let t=0;t<20;t++){hist100();for(let i=5;i<32;i++)rost('h.'+i).forEach((x,k)=>{if(k>2&&k!=11&&x&&x.hq===1)rnd++})}
 // sustained: an RB at 2,005 this year after 2,010 last year -> 100; after 1,500 last year -> not
 const yr=yrN();const rbA=rost('h.6')[1],rbB=rost('h.7')[1];
 fake[6]=JSON.parse(JSON.stringify(_ps(6)||{}));fake[7]=JSON.parse(JSON.stringify(_ps(7)||{}));
 [6,7].forEach(i=>{const f=fake[i];f.P=f.P||{a:3000,b:10,c:10};f.Ru=f.Ru||{a:0,b:0};f.Re=f.Re||{a:0,b:0};f.Sk=f.Sk||{a:0};f.P.b=10;f.Ru.a=2005});
 [rbA,rbB].forEach(x=>{x.ovr=99;x.age=26;delete x.hq;x.h=(x.h||[]).filter(r=>r[0]!==yr-1)});
 rbA.h=rbA.h.filter(r=>r[0]!==yr-2);rbA.h.push([yr-2,0,2001,11,250,1],[yr-1,0,2010,12,300,2]);rbB.h.push([yr-1,0,1500,9,200,1]);
 // QB: 46 passing TD two years running -> 100; 46 this year after 40 last year -> not
 const qA=rost('h.8')[0],qB=rost('h.9')[0];
 [8,9].forEach(i=>{const f=fake[i]=JSON.parse(JSON.stringify(_ps(i)||{}));f.P=f.P||{a:4500,b:0,c:10};f.Ru=f.Ru||{a:0,b:0};f.Re=f.Re||{a:0,b:0};f.Sk=f.Sk||{a:0};f.P.b=46});
 [qA,qB].forEach(x=>{x.ovr=99;x.age=27;delete x.hq;x.h=(x.h||[]).filter(r=>r[0]!==yr-1)});
 qA.h=qA.h.filter(r=>r[0]!==yr-2);qA.h.push([yr-2,0,4700,47,8,390,250,1],[yr-1,0,4800,46,9,400,300,2]);qB.h.push([yr-1,0,4300,40,9,380,300,2]);
 const qC=rost('h.10')[0];{const f=fake[10]=JSON.parse(JSON.stringify(_ps(10)||{}));f.P=f.P||{a:4500,b:0,c:10};f.Ru=f.Ru||{a:0,b:0};f.Re=f.Re||{a:0,b:0};f.Sk=f.Sk||{a:0};f.P.b=46}
 qC.ovr=99;qC.age=27;delete qC.hq;qC.h=(qC.h||[]).filter(r=>r[0]!==yr-1&&r[0]!==yr-2);qC.h.push([yr-2,0,4000,30,9,300,200,1],[yr-1,0,4800,46,9,400,300,2]);
 hist100();PS=_ps;
 out.A_43tdNot100=q3.hq!==1&&!(S.h100||[]).some(s=>s.startsWith(q3.n+' '));
 out.B_recordSeasonIs100=q4.hq===1&&(S.h100||[]).some(s=>s.startsWith(q4.n+' '));
 out.D_twoStraightNearRecordIs100=rbA.hq===1;out.D_oneGoodYearNot100=rbB.hq!==1;
 out.E_qb46TwiceIs100=qA.hq===1;out.E_qb46OnceNot100=qB.hq!==1;
 out.F_qbOnlyTwoStraightNot100=qC.hq!==1;
 out.C_randomHundreds=rnd;out.C_candidates=n99;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
