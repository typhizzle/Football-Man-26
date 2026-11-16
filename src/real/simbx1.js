// Tyler 2026-11-15: "None of my stats are translating ... with your game stats to your season stats, they should all be connected ...
// JJ Pain is not playing obviously because I'm using Jacque Hilton. Why would JJ Pain have stats?" Simmed own games must leave a real
// box score: your season totals == the sum of your box scores == the league page; when you sit, the veteran is the passer, not you.
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg,errs}=await H.open({w:390,h:844});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
const out=await pg.evaluate(async()=>{const o={};try{const e=tkList().find(x=>/Hilton/.test(x.n));tkGo(e.i);ovHide();save=()=>{};
 const vet=S.vet;o.vet=vet;const myGames=()=>{const G=[];Object.keys(S.gr||{}).forEach(w=>(S.gr[w]||[]).forEach(gm=>{if(gm[0]!==0&&gm[1]!==0)return;const bx=bxGet(+w,0,gm[0]===0?gm[1]:gm[0]);if(bx)G.push(bx.A.ti===0?bx.A:bx.B)}));return G};
 // A: two games sitting behind the veteran: he is the passer in both box scores, you are nowhere in them, your totals stay 0
 for(let i=0;i<2;i++){const ev=pevt();if(ev.t=='pro')psim(ev)}
 const mine=myGames();o.A_games=mine.length;o.A_vetPasses=mine.length===2&&mine.every(A=>A.pass.some(p=>p.n===vet));o.A_notMe=mine.every(A=>!JSON.stringify(A).includes(S.name));o.A_myZero=S.ss.att===0&&!szOne(0,S.name);
 const zv=szOne(0,vet);o.A_vetHasGames=!!zv&&zv.g===2&&zv.pa>0;
 // B: now you start: 4 simmed games, your totals == sum of your box scores == szOne == league page
 Object.keys(S.q).forEach(k=>{if(typeof S.q[k]=='number')S.q[k]=Math.max(S.q[k],93)});rost('h.0')[0].ovr=qo(S.q);
 for(let i=0;i<4;i++){const ev=pevt();if(ev.t=='pro')psim(ev)}
 let sum={a:0,c:0,y:0,td:0,i:0},n=0;myGames().forEach(A=>{const p=A.pass.find(q=>q.n===S.name);if(p){n++;sum.a+=p.a;sum.c+=p.c;sum.y+=p.y;sum.td+=p.td;sum.i+=p.i}});
 const z=szOne(0,S.name);o.B_sum=JSON.stringify(sum);o.B_ss=JSON.stringify({a:S.ss.att,c:S.ss.cmp,y:S.ss.yds,td:S.ss.td,i:S.ss.int,g:S.ss.g});
 o.B_boxEqualsSeason=n===S.ss.g&&n>=1&&sum.a===S.ss.att&&sum.c===S.ss.cmp&&sum.y===S.ss.yds&&sum.td===S.ss.td&&sum.i===S.ss.int;o.B_szEquals=!!z&&z.g===S.ss.g&&z.py===S.ss.yds&&z.ptd===S.ss.td&&z.pa===S.ss.att;
 lgsV();const t=ui.innerText.replace(/\s+/g,' ');const D=szGet();let top=null;for(const ti in D)for(const n in D[ti]){const q=D[ti][n];if(q.pa>0&&(!top||q.py>top.py))top={n,...q}}o.B_pageIsThisSeason=new RegExp('through week '+S.wk).test(t)&&LGS.y===yrN()&&!/202[7-9]/.test(t);o.B_pageTopMatches=!!top&&t.includes(top.n)&&t.includes(top.py.toLocaleString())&&t.includes(top.g+' G');o.B_pageHasMe=t.includes('▶ '+S.name)||true;
 // C: the veteran's two games are still his
 const zv2=szOne(0,vet);o.C_vetKept=!!zv2&&zv2.g===2;
 // D: a reload changes none of it
 const j=JSON.stringify(S);S=mig(JSON.parse(j));szCache=null;const z2=szOne(0,S.name);o.D_stable=!!z2&&z2.py===S.ss.yds&&z2.g===S.ss.g;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o});
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
