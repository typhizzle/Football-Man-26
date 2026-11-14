// A CARD ONLY LISTS CLUBS A PLAYER REALLY PLAYED FOR (Tyler 2026-11-14: "Miles Garrett's not playing for
// the Chiefs when he never played for the Chiefs ... make sure that doesn't happen to any other player").
// Renders EVERY player's card and checks each club printed against his recorded seasons, the transactions
// log and his current club. Fails on V 0.0.1.0004 (Meters Ferret's card says KC).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PL_FILE});const j=fs.readFileSync(process.env.PL_SAVE||'/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{
 const s=j.trim()[0]=='{'&&j.includes('"T"')&&!j.includes('FMZ')?mig(JSON.parse(j)):await readCode(j);S=s;SLOT=1;LASTJ='';
 const before=JSON.stringify(S);
 let cards=0,bad=[],curMissing=[];let ferret=null;
 for(let i=0;i<S.T.length;i++){const L=rost('h.'+i)||[];for(let k=0;k<L.length;k++){const x=L[k];if(!x||(i==0&&k==0))continue;
  pCard(i,k);const t=ui.innerText||'';const m=t.match(/Career\s*\n?\s*([^\n·]*)·/);if(!m)continue;cards++;
  const shown=m[1].split(',').map(z=>z.trim()).filter(Boolean);
  const rows=((typeof hxMerge=='function'?hxMerge(x):x.h)||[]).filter(r=>r&&r[0]!=null&&r[0]>=2022);
  const cur=tAb(S.T[i]);const ok=new Set(rows.map(r=>typeof r[1]=='number'?TA[r[1]]:r[1]));ok.add(cur);
  (S.tx||[]).forEach(e=>{if(e&&e.n===x.n){ok.add(e.from);ok.add(e.to)}});
  const extra=shown.filter(a=>!ok.has(a));if(extra.length)bad.push(x.n+' shows '+extra.join(',')+' (played '+[...ok].join(',')+')');
  if(!shown.includes(cur))curMissing.push(x.n+' on '+cur+' shows '+shown.join(','));
  if(x.n==='Meters Ferret')ferret=shown.join(', ')}}
 o.cards=cards;o.A_ferretCard=ferret;o.A_ferretNoKC=!!ferret&&!/\bKC\b/.test(ferret)&&/CLE/.test(ferret)&&/LAG/.test(ferret);
 o.B_unrecordedClubsShown=bad.length;o.B_examples=bad.slice(0,8);
 o.C_currentClubMissing=curMissing.length;o.C_examples=curMissing.slice(0,5);
 o.D_saveUntouched=JSON.stringify(S)===before;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
