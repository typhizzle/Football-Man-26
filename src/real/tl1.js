// Tyler's afternoon list 2026-11-14: Ham Luther's 19 rush TD season lowered (only that), simmed games give 1/3 of
// the training points, instant starter setting, ratings card shows the throwing power update (no Coleridge -1).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.TL_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};
 const raw=JSON.parse(j);S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 const find=s=>{let x=null;for(const k in s.ro){(s.ro[k]||[]).forEach(y=>{if(y&&y.pid==='p1081')x=y})}return x};
 const hl=find(S),row=hl&&hl.h.find(q=>q[0]===2036);o.A_hl2036=row&&row.join(',');o.A_lowered=!!row&&row[7]===2&&row[6]===123&&row[2]===3786&&row[3]===36;
 o.A_sealMatches=S.seal&&S.seal.p1081&&S.seal.p1081.h['2036'][7]===2;
 // only his row changed: every other player's 2036 row is identical to the original save
 const rawP={};for(const k in raw.ro){(raw.ro[k]||[]).forEach(y=>{if(y&&y.pid)rawP[y.pid]=y})}let other=0;for(const k in S.ro){(S.ro[k]||[]).forEach(y=>{if(!y||!y.pid||y.pid==='p1081'||!rawP[y.pid])return;const a=JSON.stringify((y.h||[]).find(q=>q[0]===2036)||null),b2=JSON.stringify((rawP[y.pid].h||[]).find(q=>q[0]===2036)||null);if(a!==b2)other++})}o.A_nothingElseChanged=other===0;
 // survives save + reload (the seal must not put 19 back)
 save();zFlush();const d=mig(JSON.parse(JSON.stringify(S)));const r2=find(d).h.find(q=>q[0]===2036);o.A_staysAfterReload=r2[7]===2;
 const lawTxt=JSON.stringify(Object.values(S.law).filter(a=>a.yr===2036));o.A_ballotText=!lawTxt.includes('123 rush yds, 19 rush TD');
 // B: simmed games give a third
 const _sp=simPts;let got=0,would=0;simPts=function(st,w){would+=2+(w?1:0)+(st&&st.td>=3?1:0)+(st&&st.int?0:1);const v=_sp.apply(this,arguments);got+=v;return v};const p0=S.pts;S.simB=0;for(let i=0;i<9;i++){const e=pevt();if(e.t!='pro'){if(e.t=='bye'){pWeek(null);i--;continue}break}const before=S.pts;psim(e);}
 simPts=_sp;o.B_simGamePts=got;o.B_ifPlayed=would;o.B_third=got===Math.floor(would/3+1e-9)&&would>0;
 // C: instant starter
 S.instS=0;S.sq=qo(S.q)+15;o.C_offBenched=!pStarter();settings();o.C_buttonShown=!!ui.querySelector('[data-inst] button');ui.querySelector('[data-inst] button').click();o.C_onStarts=pStarter()===true&&S.instS===1;
 S.instS=0;
 // D: ratings card
 const t=rupdCard();o.D_throwPower=/throwing power/.test(t);o.D_noColeridgeMinus=!/85\s*→\s*<b>84/.test(t)&&!/-1</.test(t);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
