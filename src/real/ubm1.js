// REAL ULTRA BOWL MVPs STAY REAL (Tyler 2026-11-16: "Why the hell does it say ultra bowl MVP Ham Luther in 2025"). The "never blank"
// check only looked at the champion's QBs, so a non-QB MVP was swapped for the QB in every save. Every save Tyler has, League stats:
// 2025 = Kevin Sprinter, 2021 = Hooper Bol (and 2022-2024 as recorded); a QB of another team is still never shown.
const H=require('/home/claude/real/h.js'),fs=require('fs'),path=require('path');
const dir='/home/claude/specs/cloud-2026-11-16c-flat';const docs={};for(const f of fs.readdirSync(dir)){const d=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));docs[f.replace('.json','').replace(/@/g,'~')]=d.data||d}
(async()=>{const {b,pg,errs}=await H.open({file:process.env.UBM_FILE});
const o=await pg.evaluate(async(docs)=>{const o={saves:[]};try{const d={doc:k=>({get:async()=>{const id=k.split('/').pop();return {exists:id in docs,data:docs[id]}}})};
 for(let i=1;i<=8;i++){if(!('slot'+i in docs))continue;let s=await cdGet2(d,'x/slot'+i);s.ro=await cdGet2(d,'x/ro'+i);S=mig(s);SLOT=i;save=()=>{};
  const r={slot:i,y25:uChamp(2025).sbm,y21:uChamp(2021).sbm,y22:uChamp(2022).sbm,y24:uChamp(2024).sbm};
  try{if(!lgsYears('p').includes(2025))r.card=true;else{lgsV('p',2025);r.card=/Ultra Bowl MVP:\s*Kevin Sprinter/.test(ui.innerText)&&!/Ultra Bowl MVP:\s*Ham Luther/.test(ui.innerText)}}catch(e){r.card='err '+e.message}
  // a wrong name that is another team's QB that season is still replaced
  try{const T=uPro(2025),q=T.find(x=>x.ti!==29&&x.q&&x.q[0]&&!x.q[0].fill);r.otherQbFixed=ubMvpFill(2025,29,q.q[0].n)!==q.q[0].n}catch(e){r.otherQbFixed='err '+e.message}
  o.saves.push(r)}
 o.A_all2025=o.saves.length>0&&o.saves.every(r=>r.y25==='Kevin Sprinter');o.B_all2021=o.saves.every(r=>r.y21==='Hooper Bol');o.C_others=o.saves.every(r=>r.y22==='Ricky MaClones'&&r.y24==='Jay-Jay Pain');
 o.D_card=o.saves.every(r=>r.card===true);o.E_otherQb=o.saves.every(r=>r.otherQbFixed===true);
}catch(e){o.err=e.message}return o},docs);o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o,null,1));await b.close()})();
