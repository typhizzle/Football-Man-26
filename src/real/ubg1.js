// Ultra Bowl MVP must show a single-GAME line, stable across loads, not season totals.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={rows:[],seasonLeak:[]};
  Object.keys(S.law||{}).sort((a,b)=>a-b).forEach(k=>{
   const A=S.law[k];if(!A||!A.c)return;
   (A.c.SBMVP||[]).slice(0,3).forEach(c=>{
    out.rows.push(`${A.yr} ${c.n} ${c.pos} | season: ${c.szn||'(n/a)'} | game: ${c.ln}`);
    // a game line must be far smaller than the season line
    const sy=(String(c.szn||'').match(/(\d[\d,]*)\s*(?:rush |rec )?yds/)||[])[1];
    const gy=(String(c.ln||'').match(/(\d[\d,]*)\s*(?:rush |rec )?yds/)||[])[1];
    if(sy&&gy&&+gy.replace(/,/g,'')>=+sy.replace(/,/g,''))out.seasonLeak.push(`${A.yr} ${c.n}: game ${gy} >= season ${sy}`);
   });
  });
  // stability: regenerate and compare
  const re=ubGameLine('Test Guy','4000 yds, 30 TD, 8 INT',2030);
  const re2=ubGameLine('Test Guy','4000 yds, 30 TD, 8 INT',2030);
  out.stable=(re===re2); out.sample=re;
  out.winner=Object.keys(S.law).sort((x,y)=>y-x).slice(0,3).map(k=>{const A=S.law[k];const w=A.w&&A.w.SBMVP;return w?`${A.yr} ${w.n}: ${w.ln}`:`${A.yr} (no SBMVP)`});
  return out;
 },save);
 console.log('--- Ultra Bowl MVP lines ---');o.rows.slice(0,12).forEach(r=>console.log('  '+r));
 console.log('\nWinners:',o.winner);
 console.log('Season totals leaking into game line:',o.seasonLeak.length?o.seasonLeak:'NONE');
 console.log('Deterministic:',o.stable,'| sample:',o.sample);
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
