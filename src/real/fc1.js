// One card, a whole career (EPLM): every season in order (HS, college, pro), the awards he won that year, Ultra
// Bowl titles with his team, and the old split lists replaced. Nothing in the save changes.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.FC_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof fullCareerHtml!='function'){o.err='no one-card career';return o}
 const before=JSON.stringify(S);
 const find=n=>{let r=null;S.T.forEach((t,i)=>{(rost('h.'+i)||[]).forEach((x,k)=>{if(x&&x.n===n)r=[i,k,x]})});return r};
 // A: Meters Ferret: every recorded season, his DPOY years marked on the right seasons
 const f=find('Meters Ferret');pCard(f[0],f[1]);const t=ui.innerText||'';o.A_card=!!ui.querySelector('[data-fc]');o.A_oldListsGone=!/Season by season/.test(t);
 const dp=Object.values(S.law||{}).filter(A=>A.w&&A.w.DPOY&&A.w.DPOY.n==='Meters Ferret').map(A=>A.yr);o.ferretDPOY=dp;
 const rows=[...ui.querySelectorAll('[data-fc] .row')].map(r=>r.innerText.replace(/\n/g,' '));o.A_rows=rows.length;
 o.A_dpoyOnRightSeasons=dp.length>0&&dp.every(y=>rows.some(r=>r.startsWith(String(y))&&/DPOY/.test(r)));
 o.A_allSeasons=rows.length===(hxMerge(f[2])||[]).filter(r=>r[0]>=2022).length;
 // B: a champion's season shows the Ultra Bowl title
 const champs=fcChamps();let ch=false;S.T.forEach((t,i)=>{if(ch)return;(rost('h.'+i)||[]).forEach((x,k)=>{if(ch||!x||!x.h)return;const hit=(x.h||[]).find(r=>r[0]>=2026&&champs[r[0]]===TA[r[1]]);if(hit){pCard(i,k);ch=[...ui.querySelectorAll('[data-fc] .row')].some(rw=>rw.innerText.startsWith(String(hit[0]))&&/Ultra Bowl champion/.test(rw.innerText))}})});o.B_championYear=ch;
 // C: nothing in the save changed by opening cards
 o.C_saveUntouched=JSON.stringify(S)===before;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
