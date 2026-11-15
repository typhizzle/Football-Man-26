// Tyler 2026-11-15: draft-day trades "about 2 or 3 ... at least in the first round, maybe more ... don't force anything ... make
// the trades make sense". Real NFL: ~5-6 trades with first-round picks, ~30-40 in a draft. Aim a little under: rd1 2-5, all 12-28.
const H=require('/home/claude/real/h.js'),fs=require('fs');const jc=fs.readFileSync('/home/claude/specs/col-save-2026.json','utf8');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.DT_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async([j,jc])=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 let g=0;while(g++<200){const e=pevt();if(e.t=='pro'||e.t=='pp'||e.t=='pbw')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='fa')S.fa=null;else if(e.t=='sum'){if(!S.psum)mkPsum();break}else break}
 pNext();const base=JSON.stringify(S);const Y=yrN();const r1=[],all=[],zero=[];let sense=0,tot=0,picksOk=true;
 const GA=(window.DTSET||[]);if(GA.length){DTG=GA[0];DTA=GA[1];DTP=GA[2]}
 for(let run=0;run<12;run++){S=mig(JSON.parse(base));if(S.dc)delete S.dc[Y];if(S.dtr)delete S.dtr[Y];lgDraft();const t=(S.dtr&&S.dtr[Y])||[];r1.push(t.filter(x=>x.rd==1).length);all.push(t.length);
  if(S.dc[Y].picks.length!==224)picksOk=false;
  t.forEach(x=>{tot++;if(x.up<x.down&&x.from!==x.to)sense++})}
 const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;o.rd1=r1.join(',');o.all=all.join(',');o.rd1Avg=avg(r1);o.allAvg=avg(all);
 o.A_rd1Range=o.rd1Avg>=1&&o.rd1Avg<=4.5&&r1.every(n=>n<=5);o.B_allRange=o.allAvg>=7&&o.allAvg<=18&&all.every(n=>n<=18);o.C_notForced=r1.some(n=>n<=1)||r1.some(n=>n!==r1[0]);
 o.D_tradesMoveUp=tot>0&&sense===tot;
 // watching it: the trade is announced before the team that moved up picks
 {const t=(S.dtr[Y]||[])[0];if(t){const rows=npbRows(Y);DN={src:'board',rows,i:rows.findIndex(r=>r.pk===t.up),yr:Y,t:0};const c=dnSel();DN.cur=c;let el=document.getElementById('dban');if(!el){el=document.createElement('div');el.id='dban';document.body.appendChild(el)}dnBan('',`The ${tn(dnTeam())} are on the clock.`);o.I_watchShowsTrade=!!c.tr&&/TRADE/.test(el.innerHTML)&&TA[c.ti]===t.to;o.I_banner=el.innerText.slice(0,160)}else o.I_watchShowsTrade='no rd1 trade in last run'}o.E_all224Picks=picksOk;o.F_inLog=JSON.stringify(S.lgtx||S.tx||'').includes('Draft-day trade')||(typeof lgTxList!='undefined');
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}
 // your own draft (college -> pros): same logic; no single-trade cap; every pick still made once
 try{TKGO=1;const cb=JSON.stringify(mig(JSON.parse(jc)));const c1=[],ca=[];let dupe=false,meOk=true;
  for(let run=0;run<8;run++){S=mig(JSON.parse(cb));SLOT=1;colNext();S.cy=4;colNext();draftStart();const D=S.dr;let g=0;while(D.pk<224&&g++<400)dPick();
   const n=(D.news||[]).filter(x=>/TRADE/.test(x));c1.push(n.filter(x=>/to pick (\d+)\./.test(x)&&+x.match(/to pick (\d+)\./)[1]<=32).length);ca.push(n.length);
   const names=D.picks.map(p=>p.pi);if(new Set(names).size!==names.length)dupe=true;if(D.P.filter(p=>p.me&&p.tk).length>1)meOk=false}
  o.col_rd1=c1.join(',');o.col_all=ca.join(',');o.G_colTrades=ca.reduce((a,b)=>a+b,0)/ca.length>=2&&ca.every(n=>n<=18)&&c1.every(n=>n<=5);o.G_colRd1More1=c1.some(n=>n>=2);o.H_noDoublePicks=!dupe&&meOk}catch(e){o.colErr=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}
 return o},[j,jc]);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
