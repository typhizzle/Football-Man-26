// One DPOY, everywhere. Tyler 2026-11-14: "whenever someone wins a DPOY, it should show up everywhere".
// Every screen that shows award counts must agree with League History, and list each man ONCE.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 const G=lhLeague(),hv=new Set(G.map(r=>r.yr)),HL=LGH0.filter(r=>!hv.has(r.yr)).concat(G);
 const hist=(n,k)=>HL.filter(r=>String(r[k]||'').replace(/^▶\s*/,'').trim()===n).length;
 const who=['Meters Ferret','Jarsh Fallon','Eric Rodney','Mac-Daddy Kelly'];
 const keys={dpoy:'DPOY',mvp:'MVP',sbm:'Ultra Bowl MVP'};
 out.rows=[];let bad=0;
 for(const n of who)for(const k of Object.keys(keys)){const h=hist(n,k);if(!h)continue;
  let x=null,ci=-1,cj=-1;for(let i=0;i<S.T.length&&!x;i++){const q=rost('h.'+i).findIndex(z=>z&&z.n===n);if(q>=0){x=rost('h.'+i)[q];ci=i;cj=q}}
  const rec=x&&x.aw?x.aw[k]||0:0;
  // career card
  pCard(ci,cj);const card=(ui.innerText||'').match(new RegExp((k==='sbm'?'Ultra Bowl MVP':k.toUpperCase())+' ×(\\d+)'));const cardN=card?+card[1]:0;
  // all-time leaders
  const L=lbMerge(LBP(LBS.pro[k]||''),lbIn('pro',k),k).filter(e=>e.n===abbr(n)||e.n===n);
  const lbN=L.map(e=>e.v);
  const ok=rec===h&&cardN===h&&L.length===1&&lbN[0]===h;if(!ok)bad++;
  out.rows.push({n,k,history:h,record:rec,card:cardN,leaders:lbN.join('+')||'none',ok});}
 lbV('pro','dpoy');const t=ui.innerText||'';out.screenFerretLines=(t.match(/M\. Ferret/g)||[]).length;out.screenFerretValue=(t.split('\n').find(l=>/M\. Ferret/.test(l))||'');
 out.mismatches=bad;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
