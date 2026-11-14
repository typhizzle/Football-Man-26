// Made-up colleges sit below the big names (Tyler 2026-11-14). Fails on V238: 20/64 above median, one at 92.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');const raw=JSON.parse(j);
const r=await pg.evaluate(async(j,raw)=>{const out={};try{
 const BIG=['Large 10 Conference','South Country Conference','Large 12 Conference','Atlantic Country Conference'];
 const chk=(col,tag,before)=>{const big=col.filter(c=>BIG.includes(c.n)).flatMap(c=>c.t).map(t=>t.ovr).sort((a,b)=>a-b),med=big[big.length>>1];
  const mu=col.filter(c=>!BIG.includes(c.n)&&c.n!=='Metro Valley Conference').flatMap(c=>c.t);
  out[tag+'_madeUp']=mu.length;out[tag+'_aboveBigMedian']=mu.filter(t=>t.ovr>med).length;out[tag+'_max']=Math.max(...mu.map(t=>t.ovr));out[tag+'_bigMedian']=med;
  if(before){const B={};before.filter(c=>!BIG.includes(c.n)&&c.n!=='Metro Valley Conference').flatMap(c=>c.t).forEach(t=>B[t.n]=t.ovr);
   let inv=0;mu.forEach(a=>mu.forEach(b2=>{if(B[a.n]<B[b2.n]&&a.ovr>b2.ovr)inv++}));out[tag+'_orderBroken']=inv;
   const BB={};before.filter(c=>BIG.includes(c.n)).flatMap(c=>c.t).forEach(t=>BB[t.n]=t.ovr);
   out[tag+'_bigChanged']=col.filter(c=>BIG.includes(c.n)).flatMap(c=>c.t).filter(t=>BB[t.n]!==t.ovr).length;
   out[tag+'_namesChanged']=JSON.stringify(col.map(c=>c.t.map(t=>t.n)))!==JSON.stringify(before.map(c=>c.t.map(t=>t.n)))}};
 const s=await readCode(j);S=s;chk(S.col,'A_mySave',raw.col);
 const again=JSON.stringify(S.col.map(c=>c.t.map(t=>t.ovr)));const s2=mig(JSON.parse(JSON.stringify(S)));
 out.B_runsOnce=JSON.stringify(s2.col.map(c=>c.t.map(t=>t.ovr)))===again;
 const L=mkLg(12345);chk(L.col,'C_newSave');
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j,raw);
console.log(JSON.stringify(r,null,1));await b.close()})();
