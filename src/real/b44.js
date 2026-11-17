// TYLER 2026-11-17 BATCH: pro ties are ties (W-L-T), no retired number for anyone still playing, jersey goes to the team he played
// most for (generated players need a 90+ peak), Steve Smith Sr. #89 Carolina, no repeat remix, song fans move by real numbers,
// Schedules page + button, QB need re-evaluated each season (not stuck on 2026), team overall follows the roster.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{S=await readCode(j);SLOT=1;LASTJ='';hub();
 if(S.stage!=='pro'){o.skipStage=S.stage}
 o.A_steveSmith=/89 Steve Smith Sr/.test(RJ0.CHA);
 // tie
 const T=S.T;S.stage='pro';g={oi:1,kind:'reg',s:[31,31]};const w0=T[0].w,l0=T[0].l,t0=T[0].t||0;S.psch=S.psch||[];try{pWeek(false,1)}catch(e){}o.B_tie=T[0].w===w0&&T[0].l===l0&&(T[0].t||0)===t0+1;
 // jersey: a player on a roster loses a retired number
 const L=rost('h.3'),x=L.find(y=>y&&y.num);S.rj={[rjCode(T[3])||'BUF']:[{num:x.num,n:x.n,pos:x.pos,yr:2030}]};S.rjck=null;rjClean();o.C_activeNoRetired=!Object.values(S.rj).some(v=>v.some(y=>y.n===x.n));
 // songs
 S.songs=[{n:'Hot Boys (Remix)',k:'hot',st:1,y:2030}];S.songY=null;const p0=S.pop;songMake('hot','hard',1);ovHide();o.D_noRepeat=S.songs.filter(s=>s.k==='hot').length===1;o.D_fansReal=!/fans \+[0-9]\b/.test(document.body.innerText)&&Math.abs(fans(S.pop)-fans(p0))!==3;
 // schedules
 hub();o.E_schedBtn=!!ui.querySelector('[data-sched]')||S.stage!=='pro';schV('team');o.E_schedPage=/Schedules/.test(ui.innerText);hub();
 // QB need: a save first graded after 2026 isn't stuck on the 2026 list
 S.qbg={y:2037,g:QBG26.slice()};S.qbg.y=2036;qbgEns();o.F_qbgMoves=JSON.stringify(S.qbg.g)!==JSON.stringify(QBG26);
 // team overall follows the roster
 S.tovk=null;tovUpd();const a=T[2].ovr;rost('h.2').slice(0,23).forEach(y=>{if(y)y.ovr=Math.max(40,(y.ovr||60)-15)});S.tovk=null;tovUpd();o.G_teamOvrFollows=T[2].ovr<a;
 }catch(e){o.err=e.message+' '+e.stack.slice(0,200)}return o},j);console.log(JSON.stringify(r));await b.close()})();
