// Tyler 2026-11-15: "it says 2029 stats ... 2029 hasn't happened yet ... I can already see MVP for 2026, 2027, 2028, 2029 ... Do some kind
// of permanent reinforcement to fix stats showing up from games that haven't happened yet." An existing-QB career is in 2026; a save
// the old build broke (specs/hilton-buggy-2030.json, made with the published build) is cleaned; the guard removes any future line.
const H=require('/home/claude/real/h.js'),fs=require('fs');const bug=fs.readFileSync('/home/claude/specs/hilton-buggy-2030.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
const out=await pg.evaluate(async(bug)=>{const o={};try{
 const fut=(s,Y)=>{let n=0;for(const k in s.ro){const L=s.ro[k];if(Array.isArray(L))L.forEach(x=>{if(x&&Array.isArray(x.h))x.h.forEach(r=>{if(r[0]>=Y)n++})})}for(const id in s.seal||{}){const h=s.seal[id]&&s.seal[id].h;if(h&&!Array.isArray(h))for(const y in h)if(+y>=Y)n++}for(const k in s.uFz||{}){const m=/(\d{4})$/.exec(k);if(m&&+m[1]>=Y)n++}return n};
 // A: a new existing-QB career is in 2026 and holds nothing dated 2026 or later, also after games and after opening the stats pages
 const e=tkList().find(x=>/Hilton/.test(x.n));tkGo(e.i);ovHide();const sv=save;o.A_year=yrN();for(let i=0;i<3;i++){const ev=pevt();if(ev.t=='pro')psim(ev)}lgsV();const t1=ui.innerText;lhV();const t2=ui.innerText;
 o.A_is2026=o.A_year===2026&&yrN()===2026;o.A_noFuture=fut(S,2026)===0;o.A_pagesClean=!/202[6-9] season · Ultra Bowl/.test(t2)&&!/Passing · 202[7-9]/.test(t1);
 // B: the save the old build made: was 2030 with invented 2026-2029; now 2026 and clean, real earlier seasons untouched
 const raw=JSON.parse(bug);const pre=raw.ro['h.0'].find(x=>x&&x.n==='Jay-Jay Pain');const real=JSON.stringify(pre.h.filter(r=>r[0]<2026));o.B_hadInvented=Object.values(raw.ro).some(L=>Array.isArray(L)&&L.some(x=>x&&(x.h||[]).some(r=>r[0]>=2026)));
 S=mig(raw);SLOT=5;LASTJ='';const p=S.ro['h.0'].find(x=>x&&x.n==='Jay-Jay Pain');o.B_year=yrN();o.B_is2026=yrN()===2026;o.B_clean=fut(S,2026)===0;o.B_realKept=JSON.stringify(p.h)===real;
 o.B_totals=p.cs.pyd===p.h.reduce((a,r)=>a+r[2],0);o.B_told=/were never played and have been removed/.test(S.fmsg||'');
 hub();lgsV();const t3=ui.innerText;lhV();const t4=ui.innerText;o.B_pagesClean=!/202[6-9] season · Ultra Bowl/.test(t4)&&!/Passing · 202[7-9]/.test(t3)&&!/MVP: .*202[6-9]/.test(t3);   /* 'Passing · 2026' is this season, through this week (m200) */o.B_dated=JSON.stringify([S.evc&&S.evc.y,S.pbv&&S.pbv.y,((S.tw||{}).f||[]).map(x=>x.y).filter((v,i,a)=>a.indexOf(v)===i)]);o.B_newsIn2026=!/20(2[7-9]|3\d)/.test(o.B_dated);
 // C: loading it again changes nothing more
 const hh=s=>{const o=[];for(const k in s.ro)if(Array.isArray(s.ro[k]))s.ro[k].forEach(x=>{if(x&&x.h)o.push(x.n+JSON.stringify(x.h))});return o.sort().join('~')};const j1=hh(S);const s2=mig(JSON.parse(JSON.stringify(S)));o.C_idempotent=hh(s2)===j1;
 // D: the guard: a line dated this year or later cannot stay
 const q=S.ro['h.0'].find(x=>x&&x.n==='Jay-Jay Pain');q.h.push([2026,16,4000,30,10,300,100,1],[2031,16,1,1,1,1,1,1]);S.uFz=S.uFz||{};S.uFz.s2028={x:1};LASTJ='';save();o.D_guard=!q.h.some(r=>r[0]>=2026)&&!S.uFz.s2028&&(S.sgFix||0)>=3;
 // F: play the whole 2026 season: its lines are recorded once, dated 2026, and stay; next season is 2027
 {let g_=0;while(g_++<200){const e2=pevt();if(e2.t=='pro'||e2.t=='pp'||e2.t=='pbw')psim(e2);else if(e2.t=='bye')pWeek(null);else if(e2.t=='ppbye')ppAdv(0);else if(e2.t=='fa')S.fa=null;else if(e2.t=='sum'){if(!S.psum)mkPsum();break}else break}
  try{seasonEnd()}catch(e){}LASTJ='';save();const rows=y=>{let n=0;for(const k in S.ro)if(Array.isArray(S.ro[k]))S.ro[k].forEach(x=>{if(x&&x.h)x.h.forEach(r=>{if(r[0]===y)n++})});return n};o.F_2026rows=rows(2026);o.F_recorded=rows(2026)>200&&rows(2027)===0;
  pNext();LASTJ='';save();o.F_next=yrN();o.F_is2027=yrN()===2027&&rows(2026)===o.F_2026rows&&rows(2027)===0}
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},bug);
const sp=['simothy-2037','simothy-2035','tyler-save-snapshot-2026-11-07','col-save-2026','hs-save-2022'].map(n=>fs.readFileSync('/home/claude/specs/'+n+'.json','utf8'));
out.E_normalUntouched=await pg.evaluate(sp=>sp.every(r=>{const a=JSON.parse(r);const hs=s=>{const o=[];for(const k in s.ro)if(Array.isArray(s.ro[k]))s.ro[k].forEach(x=>{if(x&&x.h)o.push(x.n+JSON.stringify(x.h))});return o.sort().join('~')};const m=mig(JSON.parse(r));return !m.sgFix&&!m.tkyN}),sp);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
