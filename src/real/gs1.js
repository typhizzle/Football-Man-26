// Your games record who really had the ball (Tyler 2026-11-14): a catch goes to the receiver who made it, a carry
// to the back who ran it, the box score is built from those plays, and season stats add them up.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.GS_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof bxReal!='function'){o.err='box scores still split catches by fixed shares';return o}
 startGame0(1,'reg');let pp=null;for(const c in PB)PB[c].forEach((p,i)=>{if(!pp&&p[1]=='pass')pp=[c,i]});g.ph='pre';g.y=25;setup(0);snap(pp[0],pp[1]);
 for(let k=0;k<5;k++){try{upd(.03)}catch(e){}}
 // A: a 12-yard catch by the TE (roster slot 5)
 const P=g.pl;const te=(P.wr||[]).find(w=>w.ri===5)||(P.wr||[])[0];P.passed=true;P.car=te;g.st.cmp++;const los=g.los;endPlay(los+12,'Caught');
 o.A_catch=!!g.pst&&g.pst[te.ri]&&g.pst[te.ri].rec===1&&g.pst[te.ri].recy===12;
 // B: a 5-yard run by the back
 g.ph='pre';setup(0);snap(pp[0],pp[1]);for(let k=0;k<5;k++){try{upd(.03)}catch(e){}}const P2=g.pl;P2.passed=false;P2.car=P2.rb;endPlay(g.los+5,'Run');
 o.B_carry=g.pst[P2.rb.ri]&&g.pst[P2.rb.ri].car===1&&g.pst[P2.rb.ri].ry===5;
 // C: the box score of that game uses exactly those plays (no fixed split), and the season adds them up
 const w=S.wk||0,oi=g.oi,pst=JSON.parse(JSON.stringify(g.pst));const real={...Z(),att:1,cmp:1,yds:12,td:0,int:0,ry:0};
 const bx=bxReal(bxMake(w,0,oi,7,3,real,null),{w,oi,pst});const L=rost('h.0');
 o.recLines=bx.A.rec.map(z=>z.n+' '+z.c+'/'+z.y);o.C_onlyRealCatches=bx.A.rec.length===1&&bx.A.rec[0].n===L[te.ri].n&&bx.A.rec[0].c===1&&bx.A.rec[0].y===12;
 o.C_onlyRealCarries=bx.A.rush.filter(z=>z.p!=='QB').length===1&&bx.A.rush[0].c===1&&bx.A.rush[0].y===5;
 S.gr=S.gr||{};S.gr[w]=(S.gr[w]||[]).filter(gm=>!(gm[0]===0||gm[1]===0));S.gr[w].push([0,oi,7,3]);S.bx=S.bx||{};S.bx[bxKey(w,0,oi)]=bx;szCache=null;
 const tot=szOne(0,L[te.ri].n);const before=tot?tot.recy:0;delete S.bx[bxKey(w,0,oi)];szCache=null;const without=(szOne(0,L[te.ri].n)||{recy:0}).recy;S.bx[bxKey(w,0,oi)]=bx;szCache=null;
 o.C_seasonCounts=!!tot&&before-without===12-((bxMake(w,0,oi,7,3,real,null).A.rec.find(z=>z.n===L[te.ri].n)||{y:0}).y)||(!!tot&&tot.recy>=12);

 // D: your own scramble is one real carry; a sack is not; the box score shows that count (it was made up: 3-7)
 g.ph='pre';setup(0);snap(pp[0],pp[1]);for(let k=0;k<5;k++){try{upd(.03)}catch(e){}}const P3=g.pl;P3.passed=false;P3.car=P3.qb;endPlay(g.los+7,'Scramble');
 g.ph='pre';setup(0);snap(pp[0],pp[1]);for(let k=0;k<5;k++){try{upd(.03)}catch(e){}}const P4=g.pl;P4.passed=false;P4.car=P4.qb;endPlay(g.los-6,'SACKED',{sk:1});
 o.D_qcar=g.qcar;o.D_scrambleCounted=g.qcar===1;
 const bx2=bxReal(bxMake(w,0,oi,7,3,{...real,ry:7},null),{w,oi,pst,qcar:g.qcar});const qr=bx2.A.rush.find(z=>z.p==='QB');o.D_boxQB=qr&&qr.c+'/'+qr.y;o.D_boxReal=!!qr&&qr.c===1&&qr.y===7;

 // E: a whole game, end to end: several real plays -> endGame() -> the stored box score matches every play exactly
 //    (catches, yards, TDs, carries) -> each player's season line goes up by exactly that game
 startGame0(2,'reg');g.s=[0,0];const oi2=g.oi,w2=S.wk||0;const Lr=rost('h.0');const bef0={};
 const runPlay=(fn)=>{g.ph='pre';setup(0);snap(pp[0],pp[1]);for(let k=0;k<5;k++){try{upd(.03)}catch(e){}}fn(g.pl)};
 const want={};const addW=(ri,k,v)=>{(want[ri]=want[ri]||{rec:0,recy:0,rectd:0,car:0,ry:0,rtd:0})[k]+=v};
 [[5,9],[1,14],[5,22],[2,7]].forEach(([ri,yd])=>runPlay(P=>{const w=(P.wr||[]).find(x=>x.ri===ri);if(!w)return;P.passed=true;P.car=w;g.st.cmp++;g.st.att++;g.st.yds+=yd;endPlay(g.los+yd,'Caught');addW(ri,'rec',1);addW(ri,'recy',yd)}));
 [4,6,-2].forEach(yd=>runPlay(P=>{P.passed=false;P.car=P.rb;endPlay(g.los+yd,'Run');addW(P.rb.ri,'car',1);addW(P.rb.ri,'ry',yd)}));
 Object.keys(want).forEach(ri=>{const x=Lr[+ri];bef0[ri]=x?(szOne(0,x.n)||{rec:0,recy:0,car:0,ry:0}):null});
 g.s=[14,10];g.clk=3600;try{endGame()}catch(e){o.E_endErr=e.message}
 const bxS=(S.bx||{})[bxKey(w2,0,oi2)];o.E_stored=!!bxS&&!!bxS.A.real;
 let ok=!!bxS,why=[];if(bxS)Object.keys(want).forEach(ri=>{const x=Lr[+ri],W=want[ri];if(!x)return;if(W.rec){const r=bxS.A.rec.find(z=>z.n===x.n);if(!r||r.c!==W.rec||r.y!==W.recy){ok=false;why.push(x.n+' rec '+(r?r.c+'/'+r.y:'none')+' want '+W.rec+'/'+W.recy)}}
  if(W.car){const r=bxS.A.rush.find(z=>z.n===x.n);if(!r||r.c!==W.car||r.y!==W.ry){ok=false;why.push(x.n+' rush '+(r?r.c+'/'+r.y:'none')+' want '+W.car+'/'+W.ry)}}});
 o.E_boxMatchesPlays=ok;o.E_why=why.join('; ');
 S.gr=S.gr||{};if(!(S.gr[w2]||[]).some(gm=>(gm[0]===0&&gm[1]===oi2)||(gm[1]===0&&gm[0]===oi2))){(S.gr[w2]=S.gr[w2]||[]).push([0,oi2,14,10])}szCache=null;
 let sOk=true,sw=[];Object.keys(want).forEach(ri=>{const x=Lr[+ri],W=want[ri],b0=bef0[ri];if(!x||!b0)return;const a=szOne(0,x.n)||{};const dRec=(a.rec||0)-(b0.rec||0),dRecy=(a.recy||0)-(b0.recy||0),dCar=(a.car||0)-(b0.car||0),dRy=(a.ry||0)-(b0.ry||0);
  if(dRec!==W.rec||dRecy!==W.recy||dCar!==W.car||dRy!==W.ry){sOk=false;sw.push(x.n+' season +'+dRec+'/'+dRecy+' rec +'+dCar+'/'+dRy+' rush, want +'+W.rec+'/'+W.recy+' +'+W.car+'/'+W.ry)}});
 o.E_seasonAddsExactly=sOk;o.E_swhy=sw.join('; ');
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
