// Every draft prospect has a high school + college career (Tyler 2026-11-14: "they all need stats if they're
// getting drafted. Therefore, you can know if they're getting drafted at the right spot"). New players only.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.GN_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 const existing=new Set();for(const k in S.ro){(S.ro[k]||[]).forEach(x=>{if(x&&x.n)existing.add(x.n)})}
 let g=0;while(g++<200){const e=pevt();if(e.t=='pro'||e.t=='pp')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='fa')S.fa=null;else if(e.t=='sum'){if(!S.psum)mkPsum();break}else break}
 pNext();const Y=yrN();if(!(S.dc&&S.dc[Y]&&S.dc[Y].done))lgDraft();const dc=S.dc[Y];o.year=Y;o.picks=dc.picks.length;
 if(typeof pcByName!='function'){o.err='prospects have no careers';return o}
 // A: every pick has a high school + college career
 let withCareer=0;const sum={};dc.picks.forEach(p=>{const id=pcByName(p.n);const e=id&&S.pc.p[id];if(e&&e.r.some(q=>q[1]==='hs')&&e.r.some(q=>q[1]==='col'))withCareer++;
  if(e&&p.pos){const G=lgGrp(p.pos);const last=e.r.filter(q=>q[1]==='col').slice(-1)[0]||[];const v=G=='QB'?last[7]:G=='RB'?last[11]:G=='WR'||G=='TE'?last[14]:G=='DL'?last[17]:G=='DB'?last[18]:0;const rd=p.r<=2?'early':p.r>=6?'late':'mid';(sum[G+'|'+rd]=sum[G+'|'+rd]||[]).push(v||0)}});
 o.A_allHaveCareer=withCareer===dc.picks.length;o.withCareer=withCareer;
 // B: better picks had better college seasons (for each position group with both early and late picks)
 const avg=a=>a.reduce((x,y)=>x+y,0)/Math.max(1,a.length);let cmp=0,ok=0;const tab={};['QB','RB','WR','TE','DL','DB'].forEach(G=>{const e=sum[G+'|early'],l=sum[G+'|late'];if(e&&l&&e.length&&l.length){cmp++;tab[G]=Math.round(avg(e))+' vs '+Math.round(avg(l));if(avg(e)>avg(l))ok++}});
 o.B_earlyVsLate=tab;o.B_betterPicksBetterStats=cmp>=3&&ok===cmp;
 // C: the draft board shows it
 npbV(Y,1);o.C_boardShows=/College \(\d yr/.test(ui.innerText||'');
 // D: the rookie's card shows his high school and college seasons
 let shown=false;S.T.forEach((t,i)=>{if(shown)return;(rost('h.'+i)||[]).forEach((x,k)=>{if(shown||!x||!x.dr||x.dr.y!==Y)return;pCard(i,k);const tx=ui.innerText||'';shown=tx.includes('High school & college record')&&/High School/.test(tx)})});o.D_cardShows=shown;
 // E: nobody who already existed was given a made-up past
 const gen=Object.values(S.pc.p).filter(e=>e.gen);o.E_noneForExisting=gen.every(e=>!existing.has(e.n));o.generated=gen.length;
 // F: fixed forever: same after save + reload
 const d=mig(JSON.parse(JSON.stringify(S)));o.F_survivesReload=gen.every(e=>{const id=Object.keys(S.pc.p).find(k=>S.pc.p[k]===e);return JSON.stringify(d.pc.p[id].r)===JSON.stringify(e.r)});
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
