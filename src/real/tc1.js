// Play as an existing college QB (Tyler 2026-11-14): pick any college starting QB, take over his school, class and
// rating at week 1 of this college season; the game plays on.
const H=require('/home/claude/real/h.js');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.TC_FILE});
const out=await pg.evaluate(async()=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};for(const k of Object.keys(localStorage))localStorage.removeItem(k);SLOT=5;
 if(typeof tcStart!='function'){o.err='no college QB option';return o}
 newC();o.A_button=[...ui.querySelectorAll('button')].some(x=>/existing college QB/.test(x.textContent));
 tcStart();await new Promise(r=>setTimeout(r,300));const L=tcList();o.choices=L.length;o.A_list=L.length>=50&&/existing college QB/.test(ui.innerText||'');
 const pick=L.find(x=>x.cls===3)||L[0];tcGo(L.indexOf(pick));
 o.B_stage=S.stage;o.B_name=S.name===pick.n;o.B_school=S.T[0].n===pick.team;o.B_class=S.cy===Math.min(4,pick.cls);o.B_rating=Math.abs(qo(S.q)-pick.ovr)<=1;
 o.B_notInHisOwnRoom=!(S.qr||[]).some(x=>x.n===S.name);o.B_year=yrN();
 // C: the season plays on
 const e=cevt();o.C_week1=S.wk===0&&!!e;try{simUser();o.C_simmed=S.wk===1||S.wk>0}catch(err){o.C_err=err.message}
 hub();o.C_hub=/Play game|Sim game/.test(ui.innerText||'');
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o});
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
