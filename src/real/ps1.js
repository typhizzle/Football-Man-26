// Tyler 2026-11-14: "throwing power and speed should remain the same all the way until you're turning 36, then it
// starts going down in regression." Rough stretches (3 bad games) used to take 1 off EVERY rating, power and speed too.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.PS_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{S=mig(JSON.parse(j));SLOT=4;LASTJ='';save=()=>{};
 // A: three bad games, four times (the season max) -> power + speed unchanged, overall down exactly 1 each time
 S.ufk=null;const p0=S.q.pow,m0=S.q.mob,o0=qo(S.q);let steps=[];
 for(let n=0;n<4;n++){const w=qo(S.q);for(let g=0;g<3;g++)userForm2(40,false);steps.push(w-qo(S.q))}
 o.A_powSame=S.q.pow===p0;o.A_mobSame=S.q.mob===m0;o.A_steps=steps.join(',');o.A_eachCost1=steps.every(x=>x===1);o.A_otherDropped=qo(S.q)===o0-4;
 o.A_msg=/power and speed are untouched/i.test(S.fmsg||'');
 // B: a 5th rough stretch in the same season does nothing (max 4 kept)
 const q4=JSON.stringify(S.q);for(let g=0;g<3;g++)userForm2(40,false);o.B_max4=JSON.stringify(S.q)===q4;
 // C: a hot stretch raises overall by 1 and leaves power + speed alone
 S.ufk=null;userForm2(99,true);const h0=qo(S.q),hp=S.q.pow,hm=S.q.mob;for(let g=0;g<4;g++)userForm2(99,true);o.C_hotUp1=qo(S.q)===h0+1;o.C_powMobSame=S.q.pow===hp&&S.q.mob===hm;
 // D: a 100 OVR loses the 100 on a rough stretch (rule kept) without touching power/speed
 for(const k in S.q)S.q[k]=100;S.ufk=null;for(let g=0;g<3;g++)userForm2(40,false);o.D_lost100=qo(S.q)===99;o.D_powMob100=S.q.pow===100&&S.q.mob===100;
 // F: it still remembers your last game for the talk shows (S.lgr / S.lgw)
 S._eg=1;S._egtd=3;userForm2(77,true);o.F_lastGame=S.lgr===77&&S.lgw===1&&S.lgtd===3;
 // E: age regression at 36 still lowers power and speed
 o.E_rgt36=JSON.stringify(RGT[36]);o.E_age36hits=RGT[36][0]>0&&!RGT[35];
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
console.log(JSON.stringify(out,null,1));await b.close()})();
