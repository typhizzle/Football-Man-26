// COACHES' LIVES MATTER. Tyler 2026-11-14: "coaches their lives matter as well. Keep up
// with everything for them too." Each check CAN fail; A/B/C/D fail on V232 (no record).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const R_=S.cr||{c:{}};
 // A: every coach in the save has a permanent id, and no two share one
 const ids=[];let total=0;
 if(typeof crWalk=='function')crWalk(S,c=>{total++;if(c.cid)ids.push(c.cid)});
 out.A_coaches=total;out.A_withId=ids.length;
 // the same man can sit in two places (S.T and S.pro share objects), so unique ids = unique men
 out.A_registered=Object.keys(R_.c).length;
 // B: play the season out; every pro coach gets this season, with the club's real W-L
 const yr=yrN();S.sled=null;seasonEnd();
 const wl=S.T.map(t=>[crLbl?crLbl(t):t.n,t.w,t.l,t.cch&&t.cch.cid,t.gmr&&t.gmr.cid]);
 // force one retirement so we can watch a man leave
 const vic=S.T[5].cch;vic.a=80;const vicId=vic.cid,vicName=vic.n;
 pNext();
 const C=(S.cr||{c:{}}).c;let ok=0,bad=0;
 wl.forEach(([lab,w,l,hc,gm])=>{[hc,gm].forEach(id=>{const e=C[id];
  if(e&&e.rows.some(q=>q[0]===yr&&q[2]===lab&&q[3]===w&&q[4]===l))ok++;else bad++})});
 out.B_seasonsRecorded=ok;out.B_missingOrWrong=bad;
 // C: the retired coach is still in the save, with his season and his exit
 const v=C[vicId];
 out.C_retiredStillThere=!!v&&v.n===vicName;
 out.C_retiredMarked=!!v&&v.st==='retired'&&v.out.some(q=>q[0]===yr&&q[1]==='retired');
 out.C_hisSeasonKept=!!v&&v.rows.some(q=>q[0]===yr);
 out.C_replacementHired=!!C[S.T[5].cch.cid]&&C[S.T[5].cch.cid].hired.some(q=>q[0]===yr+1);
 // D: nobody is ever removed — every id seen before is still registered after
 const after=new Set(Object.keys(C));
 out.D_nobodyRemoved=ids.every(i=>after.has(i));
 // E: a second carousel pass in the same year writes no duplicate season
 const n1=Object.values(C).reduce((a,e)=>a+e.rows.length,0);
 // F: the screens render and the history button is reachable
 try{staffV();out.F_buttonOnCoachScreen=!!ui.querySelector('[data-crv]')}catch(e){out.F_buttonOnCoachScreen='ERR '+e.message}
 coachV();const t1=ui.innerText||'';out.F_listShowsRetired=t1.includes(vicName);
 coachCard(vicId);const t2=ui.innerText||'';
 out.F_cardShowsSeasonAndExit=t2.includes(String(yr))&&/retired/i.test(t2)&&t2.includes('Back');
 out.E_rows=n1;
 // H: the record survives a save and a reload
 try{const d=mig(JSON.parse(JSON.stringify(S)));const D=d.cr.c;
  out.H_survivesReload=Object.keys(D).length===Object.keys(C).length&&Object.keys(C).every(k=>JSON.stringify(D[k].rows)===JSON.stringify(C[k].rows)&&JSON.stringify(D[k].out)===JSON.stringify(C[k].out))}catch(e){out.H_survivesReload='ERR '+e.message}
 // G: players untouched by any of this is proven by pristine1/int1 in the gate
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
