// EVERY PLAYER'S LIFE MATTERS below the pros (Tyler 2026-11-14: "make sure it goes the same from high school
// to college throughout ... all their stats and awards. And years they've played. And teams they've played for").
// Plays a real high-school save forward through graduation into college and a college season, and checks
// every career. Every check CAN fail; all fail on V 0.0.1.0004 (no record below the pros, seniors erased).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PC_FILE});const j=fs.readFileSync(process.env.PC_SAVE||'/home/claude/specs/hs-save-2022.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};
 S=mig(JSON.parse(j));SLOT=3;LASTJ='';
 if(typeof pcS!='function'){o.err='no career record below the pros';return o}
 const yr0=yrN();
 // everyone on every high-school roster, before the year closes
 const before=[];S.T.forEach((t,i)=>{(rost('h.'+i)||[]).forEach((x,k)=>{if(x&&!(i==0&&k==0))before.push({x,i,club:t.n,gr:x.gr,cm:x.cm,n:x.n})})});
 const D=(szCache=null,szGet());
 nextYr();
 const R_=S.pc.p;
 // A: every high-school player has his season, at the right club, with the box-score totals
 let rows=0,wrongClub=0,wrongStats=0;before.forEach(b=>{const e=R_[b.x.pid];const q=e&&e.r.find(q=>q[0]===yr0&&q[1]==='hs');if(!q)return;rows++;if(q[2]!==b.club)wrongClub++;
  const z=(D[b.i]||{})[b.n];const py=q[4+3]||0,ry=q[4+7]||0,recy=q[4+10]||0;if(z&&(py!==z.py||ry!==z.ry||recy!==z.recy))wrongStats++});
 o.A_players=before.length;o.A_rowsWritten=rows;o.A_allHaveSeason=rows===before.length;o.A_wrongClub=wrongClub;o.A_wrongStats=wrongStats;
 // B: seniors graduated, are still on record, and where they committed is written down
 const sr=before.filter(b=>b.gr===4);const kept=sr.filter(b=>{const e=R_[b.x.pid];return e&&e.n===b.n&&e.o.some(q=>q[1]==='graduated'&&q[0]===yr0)});
 o.B_seniors=sr.length;o.B_notKept=sr.filter(b=>!kept.includes(b)).slice(0,4).map(b=>b.n+' '+b.x.pid+' '+JSON.stringify((R_[b.x.pid]||{}).o)+' regName '+(R_[b.x.pid]||{}).n);o.B_seniorsKept=kept.length===sr.length&&sr.length>0;
 const com=sr.filter(b=>b.cm);o.B_committed=com.length;o.B_commitWritten=com.every(b=>R_[b.x.pid].o.some(q=>q[1]==='graduated'&&q[3]===b.cm));
 // C: nobody's record removed by a second close of the same year
 const n1=Object.keys(R_).length;pcClose('hs');o.C_noDuplicate=Object.values(R_).every(e=>e.r.filter(q=>q[0]===yr0&&q[1]==='hs').length<=1);
 // D: off to college: every committed graduate is on his college's roster, same id, his high-school season with him
 S.yr=5;const pick=com.length?com[0].cm:null;
 const allC=[];S.col.forEach(c=>c.t.forEach(t=>allC.push(t)));const myC=allC.find(t=>t.n!==pick)||allC[0];
 enroll(myC.n);o.D_stage=S.stage;const yr1=yrN();
 let found=0,cls1=0,noCol=0,qbs=0;const miss=[];com.forEach(b=>{const ti=S.T.findIndex(t=>t.n===b.cm);if(ti<0){noCol++;return}if(b.x.pos==='QB'){qbs++}
  const L=rost('h.'+ti);const x=L.find(y=>y&&y.pid===b.x.pid);if(x){found++;if(x.cls===1)cls1++}else miss.push(b.n+' → '+b.cm)});
 o.D_gradsAtCollege=found;o.D_toSmallSchools=noCol;o.D_missing=miss.slice(0,5);o.D_allThere=miss.length===0&&found>0;o.D_freshmen=cls1===found;
 // E: his card shows his high-school season and where he came from
 {const b=com.find(c=>S.T.some(t=>t.n===c.cm));if(b){const ti=S.T.findIndex(t=>t.n===b.cm);const L=rost('h.'+ti);const k=L.findIndex(y=>y&&y.pid===b.x.pid);if(k>0){pCard(ti,k);const t=ui.innerText||'';o.E_cardShowsHS=(t.includes('High school & college record')||t.includes('📇 Career'))&&t.includes(String(yr0))&&t.includes(b.club)&&t.includes(b.cm)}}}
 // F: a college season closes: every college player has his row; classes move up; seniors leave on the record; nobody removed
 const colBefore=[];S.T.forEach((t,i)=>{(rost('h.'+i)||[]).forEach((x,k)=>{if(x&&!(i==0&&k==0))colBefore.push({x,i,club:t.n,cls:x.cls,pid:pcId(x),n:x.n,pos:x.pos,skip:x.npx!=null||x.yq!=null||(k==0&&x.qs)})})});
 const ids0=new Set(Object.keys(R_));
 colNext();
 let crow=0;colBefore.forEach(b=>{const e=R_[b.pid];if(e&&e.r.some(q=>q[0]===yr1&&q[1]==='col'&&q[2]===b.club))crow++});
 o.F_colPlayers=colBefore.length;o.F_allHaveSeason=crow===colBefore.length;
 const mv=colBefore.filter(b=>!b.skip);let upOk=0,leftOk=0,srs=0;mv.forEach(b=>{if((b.cls||1)>=4){srs++;if(R_[b.pid].o.some(q=>q[0]===yr1&&/graduated|left college/.test(q[1])))leftOk++}else{const L=S.ro['h.'+b.i];if(L.some(y=>y&&y.pid===b.pid&&y.cls===(b.cls||1)+1))upOk++}});
 o.F_movedUp=upOk===mv.length-srs;o.F_up=upOk;o.F_seniorsLeftOnRecord=leftOk===srs&&srs>0;o.F_seniors=srs;
 o.F_nobodyRemoved=[...ids0].every(i=>R_[i]);
 // G: the record survives save + reload
 const d=mig(JSON.parse(JSON.stringify(S)));o.G_survivesReload=Object.keys(R_).every(k=>JSON.stringify(d.pc.p[k].r)===JSON.stringify(R_[k].r));
 o.size=JSON.stringify(S.pc).length;o.sizeZ=ez(JSON.stringify(S.pc)).length;o.saveZ=ez(JSON.stringify(S)).length;o.G_dbg=[Object.keys(d.pc.p).length,Object.keys(R_).length,Object.keys(R_).filter(k=>!d.pc.p[k]||JSON.stringify(d.pc.p[k].r)!==JSON.stringify(R_[k].r)).slice(0,3).map(k=>k+' '+JSON.stringify(R_[k].r)+' vs '+JSON.stringify(d.pc.p[k]&&d.pc.p[k].r))];
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,9).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
