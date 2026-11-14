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
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
