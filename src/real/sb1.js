// The Ultra Bowl MVP ballot is ONE real box score of the final (Tyler 2026-11-14: "Did two quarterbacks play in
// the Super Bowl actually?") + QB rushing TDs fit the QB (Ham Luther "19 rushing touchdowns").
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.UB_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 let g=0;while(g++<200){const e=pevt();if(e.t=='pro'||e.t=='pp'||e.t=='pbw')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='fa')S.fa=null;else if(e.t=='sum'){if(!S.psum)mkPsum();break}else break}
 const A=S.law[S.py];const C=(A&&A.c&&A.c.SBMVP)||[];o.cands=C.map(c=>c.n+' '+c.pos+' · '+c.ln);
 const champ=tAb(S.T[S.pb.champ]);o.A_allChampion=C.every(c=>c.tm===champ);
 o.A_oneQB=C.filter(c=>c.pos==='QB'&&/ yds, \d+ TD, \d+ INT/.test(c.ln)).length<=1;
 const q=C.find(c=>/\d+\/\d+, (\d+) yds/.test(c.ln));const qy=q?+q.ln.match(/\d+\/\d+, (\d+) yds/)[1]:0;let ry=0;C.forEach(c=>{const m=c.ln.match(/(\d+) rec, (\d+) yds/);if(m)ry+=+m[2]});o.A_recWithinQB=ry<=qy;o.qbYds=qy;o.recYds=ry;
 o.A_allFromTheGame=C.filter(c=>!c.me).every(c=>/in the Ultra Bowl/.test(c.ln)&&c.ubr);
 o.A_winnerOnBallot=!A.w.SBMVP||A.w.SBMVP.me||C.some(c=>c.n===A.w.SBMVP.n);
 // QB rushing TDs this season
 const F=szFlat().filter(x=>x.pa>50).sort((a,b)=>b.rtd-a.rtd);o.topQbRush=F.slice(0,4).map(x=>x.n+' '+x.rtd+' TD/'+x.ry+'y');o.B_qbRushOk=!F.length||F[0].rtd<=14;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
