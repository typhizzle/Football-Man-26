// Awards match League History for everyone (Tyler 2026-11-14: "just make it accurate for everyone").
// Fails on V241: Meters Ferret shows 1 DPOY; League History has 3.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');const raw=JSON.parse(j);
const before={};Object.values(raw.ro).forEach(L=>Array.isArray(L)&&L.forEach(x=>{if(x&&x.n)(before[x.n]=before[x.n]||[]).push(x.aw||{})}));
const r=await pg.evaluate(async(j,before)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';out.Z_fixedOnLoad=JSON.parse(JSON.stringify(S.awHist||null));
 const G=lhLeague(),hv=new Set(G.map(r=>r.yr)),L=LGH0.filter(r=>!hv.has(r.yr)).concat(G),cnt={};L.forEach(r=>['mvp','opoy','dpoy','sbm'].forEach(k=>{const n=String(r[k]||'').replace(/^▶\s*/,'').trim();if(n){cnt[n]=cnt[n]||{};cnt[n][k]=(cnt[n][k]||0)+1}}));
 const all=[];sealWalk(S,x=>{if(x&&x.n&&x.n!==S.name)all.push(x)});const nameN={};all.forEach(x=>nameN[x.n]=(nameN[x.n]||0)+1);
 let short=0,lowered=0;const shortL=[];
 all.forEach(x=>{const c=cnt[x.n];const B=(before[x.n]||[])[0]||{};
  ['mvp','opoy','dpoy','sbm','r','oroy','droy'].forEach(k=>{if(nameN[x.n]===1&&(x.aw||{})[k]<(B[k]||0))lowered++});
  if(!c||nameN[x.n]>1)return;Object.keys(c).forEach(k=>{if(((x.aw||{})[k]||0)<c[k]){short++;shortL.push(x.n+' '+k)}})});
 const f=all.find(x=>x.n==='Meters Ferret');out.A_ferretDPOY=f&&f.aw&&f.aw.dpoy;out.A_historyFerret=(cnt['Meters Ferret']||{}).dpoy;
 out.B_playersShort=short;out.B_list=shortL.slice(0,10);out.C_awardsLowered=lowered;
 const snap=JSON.stringify(all.map(x=>x.aw||{}));S.awHist=null;awHistFix(S);out.D_idempotent=JSON.stringify(all.map(x=>x.aw||{}))===snap;
 out.E_report=S.awHist;
 let ci=-1,cj=-1;for(let i=0;i<S.T.length;i++){const k=rost('h.'+i).findIndex(x=>x&&x.n==='Meters Ferret');if(k>=0){ci=i;cj=k;break}}
 pCard(ci,cj);out.F_cardShowsDPOY3=/DPOY ×3/.test(ui.innerText||'');
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j,before);
console.log(JSON.stringify(r,null,1));await b.close()})();
