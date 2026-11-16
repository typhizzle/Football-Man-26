// REST THE STARTERS (Tyler 2026-11-16): once the bye is clinched, "ask coach if he can rest the starters" under Play / Sim; the
// backups play that game (they get the stats), you and the starters don't, nobody on the first team gets hurt; you can still play.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.RST_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';save=()=>{};
 if(typeof byeLock!='function'){o.err='no rest option';return o}
 // a week near the end with your game this week
 let w=15;while(w<18&&!(S.psch[w]||[]).some(p=>p[0]===0||p[1]===0))w++;S.wk=w;S.inj=null;const T=S.T,cf=String(T[0].dv).slice(0,3);
 for(let k=0;k<w;k++)S.gr=S.gr||{};
 T.forEach((t,i)=>{if(i===0){t.w=w;t.l=0}else{t.w=Math.floor(w/2);t.l=w-t.w}});
 o.A_clinched=byeLock();hub();o.A_button=[...ui.querySelectorAll('button')].some(x=>/rest the starters/i.test(x.textContent));o.A_canPlay=[...ui.querySelectorAll('button')].some(x=>/Play game|Resume/.test(x.textContent));
 // B: one team in your conference can still catch you: no option
 const rival=T.findIndex((t,i)=>i>0&&String(t.dv).slice(0,3)===cf);const keep=T[rival].w;T[rival].w=w-1;o.B_notClinched=!byeLock();hub();o.B_noButton=![...ui.querySelectorAll('button')].some(x=>/rest the starters/i.test(x.textContent));T[rival].w=keep;
 // a team in the OTHER conference with more wins doesn't matter
 const other=T.findIndex((t,i)=>i>0&&String(t.dv).slice(0,3)!==cf);const k2=T[other].w;T[other].w=w+3;o.B_otherConf=byeLock();T[other].w=k2;
 // C: rest them: every roll injures (to prove rested starters are protected while others still get hurt)
 const L=S.ro['h.0'],starters=L.slice(1,22).filter(Boolean).map(x=>x.n),ss0=JSON.stringify(S.ss),g0=(S.ss&&S.ss.g)||0,wk0=S.wk,opp=(S.psch[wk0].find(p=>p[0]===0||p[1]===0)||[]).find(x=>x!==0);
 L.slice(1,22).forEach(x=>{if(x)delete x.inj});const ir=injRoll;injRoll=()=>({w:3,d:'test'});
 restAsk();o.C_coach=/locked up/.test(document.getElementById('ov').innerText);restGo();injRoll=ir;
 o.C_weekDone=S.wk===wk0+1;o.C_noUserStats=JSON.stringify(S.ss)===ss0||((S.ss&&S.ss.g)||0)===g0;
 o.C_noStarterHurt=L.slice(1,22).filter(x=>x&&x.inj).map(x=>x.n);o.C_othersHurt=(S.ro['h.'+opp]||[]).some(x=>x&&x.inj);
 o.C_msg=/Starters rested/.test(HM||'')||/Starters rested/.test(ui.innerText);
 // D: that game's box score: your starters (not the kicker/punter) have no lines; backups do
 const bx=bxGet(wk0,0,opp)||bxGet(wk0,opp,0);const side=bx&&(bx.A.ti===0?bx.A:bx.B);const names=side?['pass','rush','rec','def'].flatMap(c=>(side[c]||[]).map(x=>x.n)):[];
 o.D_box=!!side;o.D_startersIn=starters.filter(n=>names.includes(n));o.D_backupsIn=names.filter(n=>!starters.includes(n)).length;o.D_userIn=names.includes(S.name);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
