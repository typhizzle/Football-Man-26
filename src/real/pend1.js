// A FINISHED GAME IS NEVER LOST (Tyler 2026-11-17): the page closes after the final whistle (during the field walk) -> next open records
// it (W/L, week moves on, stats counted once); a game lost before this fix -> asked for the score, recorded with the right W/L.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const o=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));SLOT=4;let saved=null;save=()=>{saved=JSON.stringify(S)};try{zFlush=()=>{}}catch(e){}
 const e=pevt();const T=S.T[0],w0=T.w,l0=T.l,wk0=S.wk;startGame(e.o,e.t);await new Promise(r=>setTimeout(r,300));g.s=[27,20];endGame();const g0=S.ss.g;
 o.A_pend=!!S.pend;save();const snap=saved;
 // the page closes here (field walk). Next open:
 S=mig(JSON.parse(snap));save=()=>{};hub();o.B_recorded=S.T[0].w===w0+1&&S.wk===wk0+1&&!S.pend;o.B_once=S.ss.g===g0;o.B_msg=/Your last game was saved/.test(HM||ui.innerText);
 // a game lost BEFORE this fix
 S=mig(JSON.parse(snap));delete S.pend;S.lgw=1;save=()=>{};hub();o.C_card=!!ui.querySelector('[data-lost]');document.getElementById('lgA').value=27;document.getElementById('lgB').value=20;lostSave();o.C_recorded=S.T[0].w===w0+1&&S.wk===wk0+1&&S.ss.g===g0;
}catch(e){o.err=e.message+' '+(e.stack||'').split('\n')[1]}return o},j);o.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(o));await b.close()})();
