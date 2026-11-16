// Pro Bowl voting (Tyler 2026-11-14): voting during the season, closes after week 17, All-Star rosters per conference,
// your votes count, Pro Bowl week for everyone with the All-Star game, Ultra Bowl players replaced but still listed, cards show it.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PB_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof pbV!='function'){o.err='no Pro Bowl voting';return o}
 hub();o.A_button=[...ui.querySelectorAll('button')].some(x=>/Pro Bowl/.test(x.textContent));   /* 2026-11-16: inside the MVP ladder section */
 // B: your votes move a player up
 const V=pbS();pbV('WR');const P=pbBallot();const wr=(P.WR||[]).filter(c=>c.conf==='RFC').sort((a,b)=>pbVotes(b)-pbVotes(a));const tgt=wr[7];const before=wr.indexOf(tgt);
 for(let i=0;i<50;i++)pbVote(tgt.n);const after=(pbBallot().WR||[]).filter(c=>c.conf==='RFC').sort((a,b)=>pbVotes(b)-pbVotes(a)).findIndex(c=>c.n===tgt.n);o.B_votesCount=after<before;pbVote(tgt.n);o.B_weeklyLimit=(V.u[tgt.n]||0)===10&&(V.t[tgt.n]||0)===10;   /* 2026-11-16 later: 10 votes a week, 1 tap = 1 vote = 1k */
 // C: play to the end of the regular season: voting closes, rosters per conference
 let g=0;while(g++<40&&!S.pb){const e=pevt();if(e.t=='pro')psim(e);else if(e.t=='bye')pWeek(null);else break;hub()}
 const V2=pbS();o.C_closed=!!V2.closed;o.C_rosters=['RFC','LFC'].every(cf=>Object.keys(PBSL).every(k=>(V2.r[cf][k]||[]).length>=PBSL[k]));
 // D: Pro Bowl week happens (for everyone), All-Star game played, Ultra Bowl players replaced but still Pro Bowlers
 g=0;let sawPbw=false;while(g++<20){const e=pevt();if(e.t=='pbw'){sawPbw=true;psim(e);hub();break}if(e.t=='pp')psim(e);else if(e.t=='ppbye')ppAdv(0);else if(e.t=='sum')break;hub()}
 o.D_pbwHappened=sawPbw;o.D_game=!!pbS().g;const F=pbFinalists();const Vr=pbS();let ub=0,alt=0,okBoth=true;['RFC','LFC'].forEach(cf=>{for(const k in Vr.r[cf])Vr.r[cf][k].forEach(c=>{if(c.ub){ub++;if(!(S.pbh[Vr.y]||[]).includes(c.n))okBoth=false}if(c.alt){alt++;if(F.includes(c.tm)||!(S.pbh[Vr.y]||[]).includes(c.n))okBoth=false}})});
 o.finalists=F;o.ubPlayers=ub;o.replacements=alt;o.D_replaced=ub>0&&alt===ub&&okBoth;
 // E: a Pro Bowler's card shows it
 const pbn=(S.pbh[Vr.y]||[]).find(n=>n!==S.name);let shown=false;S.T.forEach((t,i)=>(rost('h.'+i)||[]).forEach((x,k)=>{if(!shown&&x&&x.n===pbn){shown=(fcAwardsByYear(x)[Vr.y]||[]).includes('Pro Bowl')}}));o.E_cardShows=shown;   // the season row is written at season end; the award is on his record for that year
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
