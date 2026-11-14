// NOBODY OWNS THE SIM (Tyler 2026-11-14: "make sure that that's not OP ... other players actually at least have
// a chance to win MVP in the sim"). Sims 8 full seasons from his real 2035 save (99 OVR) and checks the spread.
// On V0006 Drako September won 9 of 16 and Tyler's sims hit 54-60 TD.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.SM_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2035.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={seasons:[]};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 for(let s=0;s<8;s++){if(S.psum)pNext();let g=0;while(g++<200){const e=pevt();if(e.t=='pro'||e.t=='pp'||e.t=='pbw')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='fa')S.fa=null;else if(e.t=='sum'){if(!S.psum)mkPsum();break}else break}
  const F=szFlat().filter(x=>x.py>0&&!(x.ti===0&&x.n===S.name)).sort((a,b)=>b.ptd-a.ptd);const L=S.law&&S.law[S.py];
  o.seasons.push({me:S.ss.td,top:F[0]?F[0].ptd:0,topN:F[0]?F[0].n:'',mvp:L&&L.w&&L.w.MVP?L.w.MVP.n:'?'})}
 const M={};o.seasons.forEach(z=>M[z.mvp]=(M[z.mvp]||0)+1);o.mvps=M;o.distinct=Object.keys(M).length;o.maxShare=Math.max(...Object.values(M));
 o.maxTD=Math.max(...o.seasons.map(z=>Math.max(z.me,z.top)));o.meLed=o.seasons.filter(z=>z.me>=z.top).length;
}catch(e){o.err=e.message}return o},j);out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out));await b.close()})();
