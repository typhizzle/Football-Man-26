// Every box score adds up (Tyler 2026-11-14: "make sure it calculates each game, how many yards the qbs
// thrown, and who they've throw to, how many times they caught it, how many TDS so they adjust to the
// season stats"). Per game: QB completions = catches, passing yards = receiving yards, passing TD =
// receiving TD. Per season: every team's QB passing TD = his receivers' TD (season = sum of games).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={games:0,bad:[]};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const chk=(x,tag)=>{[x.A,x.B].forEach(A=>{const P=A.pass[0]||{c:0,y:0,td:0},R=A.rec||[];const c=R.reduce((a,p)=>a+p.c,0),y=R.reduce((a,p)=>a+p.y,0),t=R.reduce((a,p)=>a+p.td,0);
   if(c!==P.c||y!==P.y||t!==P.td)out.bad.push(tag+' '+A.ab+' pass '+P.c+'/'+P.y+'/'+P.td+' rec '+c+'/'+y+'/'+t)})};
 // the save's own season so far
 const G=S.gr||{};Object.keys(G).forEach(w=>(G[w]||[]).forEach(gm=>{const x=bxGet(+w,gm[0],gm[1]);if(x){out.games++;chk(x,'wk'+w)}}));
 // plus 300 fresh games at every scoreline
 for(let i=0;i<300;i++){const a=i%32,bb=(i*7+3)%32;if(a===bb)continue;const x=bxMake(20000+i,a,bb,(i*13)%45,(i*29)%41,null);out.games++;chk(x,'g'+i)}
 // season: QB passing TD = sum of his team's receiving TD, from the season ledger
 const D=szGet();let teams=0,off=0;Object.keys(D).forEach(ti=>{const P=Object.values(D[ti]);const pt=P.reduce((a,p)=>a+(p.ptd||0),0),rt=P.reduce((a,p)=>a+(p.rectd||0),0),py=P.reduce((a,p)=>a+(p.py||0),0),ry=P.reduce((a,p)=>a+(p.recy||0),0);teams++;if(pt!==rt||py!==ry){off++;if(out.bad.length<12)out.bad.push('season team '+ti+' passTD '+pt+' recTD '+rt+' passY '+py+' recY '+ry)}});
 out.teams=teams;out.seasonMismatch=off;out.badCount=out.bad.length;out.bad=out.bad.slice(0,8);
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);console.log(JSON.stringify(r,null,1));await b.close()})();
