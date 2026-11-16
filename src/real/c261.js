// Tyler 2026-11-15: the 2026 college players list ("don't change any current saves, just future ones ... seniors should always declare").
// A new world has every name on the list at his school with Tyler's 2026 class and rating; the four missing men exist; old saves unchanged.
const H=require('/home/claude/real/h.js'),fs=require('fs');
const LIST={'Darnold Mansion':['Miami',1,77],'Jeremy Smothers':['Ohio State',4,87],'Archer Manny':['Texas',4,81],'Ruger Nash':['Georgia',4,76],'Delonte Less':['Oregon',4,73],'Watchu BiSayin':['Ohio State',2,75],'Kiwi Langfield':['Ole Miss',null,82],'Wun-in-da Chamba':['Ole Miss',4,81],'DJ Suspense':['Notre Dame',null,71],'Kashon Tripdub':['Alabama',1,70],'Jordan Tua':['USC',null,70],'Jarvis Hooters':['Indiana',null,69],'Charles Beckham':['Indiana',null,80],'Bruce Undertree':['Michigan',2,66],'Dill Rolley':['Oregon',2,75],'Jade Ball':['Florida',3,73],'Andrew Messmaker':['Oklahoma State',3,68],'Femmifer Coleman':['Alabama',3,79],'Ham Leaver':['LSU',3,68],'Noel Fifty':['Arizona',4,72],'Charles Daphne':['Utah',4,70],'Marshawn Books':['Texas A&M',4,68],'JD Speedway':['Baylor',3,67]};
(async()=>{const {b,pg,errs}=await H.open({file:process.env.C26_FILE});
await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();try{start()}catch(e){}});await new Promise(r=>setTimeout(r,800));
const out=await pg.evaluate(async(LIST)=>{const o={};try{const bad=[];Object.keys(LIST).forEach(n=>{const p=(S.npx||[]).find(x=>x.n===n);const [sch,cls,T]=LIST[n];if(!p){bad.push(n+': missing');return}
  if(p.sch!==sch)bad.push(n+': at '+p.sch+' not '+sch);if(cls!=null&&p.off+1!==cls)bad.push(n+': class '+(p.off+1)+' not '+cls);if(p.T!==T)bad.push(n+': rating '+p.T+' not '+T)});
 o.A_newWorld=bad.length===0;o.A_bad=bad.join(' | ');o.A_count=(S.npx||[]).length;
 // B: play to 2026 (college year 1) and look: the seniors are seniors, the freshmen freshmen, on their teams
 // (npxAt gives class relative to your timeline)
 S.stage='col';S.cy=1;const cl2=n=>{const p=S.npx.find(x=>x.n===n);const w=npxAt(p);return w.lv==='col'?w.y:w.lv};o.B_smothersSr=cl2('Jeremy Smothers')===4;o.B_mansionFr=cl2('Darnold Mansion')===1;o.B_fiftySr=cl2('Noel Fifty')===4;o.B_speedwayJr=cl2('JD Speedway')===3;
 // C: the four new men are on real teams in the college world (team names exist)
 const names=new Set();(S.col||[]).forEach(c=>(c.t||[]).forEach(t=>names.add(t.n)));o.C_teams=['Noel Fifty','Charles Daphne','Marshawn Books','JD Speedway'].every(n=>names.has(S.npx.find(x=>x.n===n).cn));
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},LIST);
// D: existing saves are not touched
const sp=['simothy-2037','col-save-2026','hs-save-2022'].map(n=>fs.readFileSync('/home/claude/specs/'+n+'.json','utf8'));
out.D_oldUntouched=await pg.evaluate(sp=>sp.every(r=>{const a=JSON.parse(r);const nm=n=>String(n).replace('Manling','Manny');const before=JSON.stringify((a.npx||[]).map(p=>[nm(p.n),p.off,p.T]));const m=mig(JSON.parse(r));S=m;try{npxEnsure()}catch(e){}return JSON.stringify((S.npx||[]).map(p=>[nm(p.n),p.off,p.T]))===before&&!S.npx.some(p=>p.n==='Noel Fifty')}),sp);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
