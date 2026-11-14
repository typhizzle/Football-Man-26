// NO STAT INFLATION (Tyler 2026-11-14). Plays whole pro seasons of CPU box scores and compares the
// leaders to real NFL history. Fails on V246 (2,000-yd rushers every season, 25+ rushing TD, 20+ rec TD).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');const OLD=!!process.env.OLD;
const r=await pg.evaluate(async(j,OLD)=>{const out={};try{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 // games already played keep their box score: week 0 built under the save's own marker vs the old formula
 {const G=S.gr||{},w0=Object.keys(G)[0],gm=G[w0]&&G[w0][0];if(gm){const keep=S.bxv;out.markerSetOnLoad=!!keep&&keep.y===yrN();out.seasonRedone=keep&&keep.w===0&&keep.re===1;const a1=JSON.stringify(bxGet(+w0,gm[0],gm[1]));S.bxv={y:99999,w:0};const a0=JSON.stringify(bxGet(+w0,gm[0],gm[1]));S.bxv=keep;out.playedGamesNowRealistic=a1!==a0}}
 S.bxv=OLD?{y:99999,w:0}:{y:0,w:0};S.bx={};
 const NS=10,seasons=[];
 for(let sn=0;sn<NS;sn++){const tot={};const add=(ti,n,k,v)=>{const key=ti+'|'+n;(tot[key]=tot[key]||{n,ry:0,rtd:0,ptd:0,py:0,recy:0,rectd:0})[k]+=v||0};
  let pts=0,gms=0;
  for(let wk=0;wk<17;wk++){const T=[...Array(32).keys()].sort(()=>Math.random()-.5);
   for(let i=0;i<32;i+=2){const a=T[i],bb=T[i+1];let sc=simGame(teff(S.T[a]),teff(S.T[bb]));if(sc[0]==sc[1])sc[0]+=3;pts+=sc[0]+sc[1];gms+=2;
    const x=bxMake(10000+sn*40+wk,a,bb,sc[0],sc[1],null);
    [[a,x.A],[bb,x.B]].forEach(([ti,A])=>{(A.rush||[]).forEach(p=>{add(ti,p.n,'ry',p.y);add(ti,p.n,'rtd',p.td)});(A.pass||[]).forEach(p=>{add(ti,p.n,'ptd',p.td);add(ti,p.n,'py',p.y)});(A.rec||[]).forEach(p=>{add(ti,p.n,'recy',p.y);add(ti,p.n,'rectd',p.td)})})}}
  const P=Object.values(tot),mx=k=>Math.max(...P.map(x=>x[k])),cnt=(k,v)=>P.filter(x=>x[k]>=v).length;
  seasons.push({ppg:+(pts/gms).toFixed(1),rush2000:cnt('ry',2000),rushLead:mx('ry'),rushTDlead:mx('rtd'),pass40:cnt('ptd',40),passTDlead:mx('ptd'),rec20:cnt('rectd',20),recTDlead:mx('rectd'),recYlead:mx('recy'),rec1500:cnt('recy',1500),passYlead:mx('py')})}
 const avg=k=>+(seasons.reduce((a,x)=>a+x[k],0)/NS).toFixed(1),sum=k=>seasons.reduce((a,x)=>a+x[k],0),max=k=>Math.max(...seasons.map(x=>x[k]));
 Object.assign(out,{seasons:NS,ppg:avg('ppg'),rush2000_total:sum('rush2000'),rushLead_avg:avg('rushLead'),rushLead_max:max('rushLead'),rushTDlead_avg:avg('rushTDlead'),rushTDlead_max:max('rushTDlead'),
  pass40_perSeason:avg('pass40'),passTDlead_avg:avg('passTDlead'),passTDlead_max:max('passTDlead'),passYlead_avg:avg('passYlead'),rec20_total:sum('rec20'),recTDlead_avg:avg('recTDlead'),recYlead_avg:avg('recYlead'),rec1500_perSeason:avg('rec1500')});
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j,OLD);
console.log(JSON.stringify(r,null,1));await b.close()})();
