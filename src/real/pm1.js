// Tyler 2026-11-14: throw power + speed stay where you trained them until 36, then regress on their own age curve
// ("if the player is 45, their throwing power probably wouldn't be over an 85 ... turn 36 ... down to a 96 ... You can
// still upgrade it").
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.PM_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));S.stage='pro';
 const raw=JSON.parse(j);const fresh=()=>{S=mig(JSON.parse(j));S.stage='pro'};
 const run=(age,q)=>{fresh();S.age=age;S.q={...q};S.ss={...Z(),g:17,yds:5300,td:48};S.h100y=null;try{pNext()}catch(e){o.err2=e.message}return {age:S.age,q:{...S.q},hm:String(HM||'')+' '+(ui.innerText||'')}};
 // A: turning 35 -> nothing taken from power/speed
 const a=run(34,{acc:90,pow:95,awr:90,mob:88,sec:90,trk:90});o.A=JSON.stringify(a.q);o.A_untouched=a.q.pow>=95&&a.q.mob>=88;
 // B: turning 36 from 99s -> power 96, speed 94 (its 36 ceiling), the rest 97 (your table)
 const b2=run(35,{acc:99,pow:99,awr:99,mob:99,sec:99,trk:99});o.B=JSON.stringify(b2.q);o.B_36=b2.age===36&&b2.q.pow===96&&b2.q.mob===94&&b2.q.acc===97&&b2.q.trk===97;o.B_msg=/Throw power 99 → 96/.test(b2.hm)&&/Speed 99 → 94/.test(b2.hm);
 // C: turning 45 -> power never over 85, speed never over 67
 const c=run(44,{acc:90,pow:92,awr:90,mob:85,sec:90,trk:90});o.C=JSON.stringify(c.q);o.C_45=c.q.pow===85&&c.q.mob===67;
 // D: you can still train them, up to the age ceiling
 fresh();S.age=45;S.q={acc:80,pow:80,awr:80,mob:60,sec:80,trk:80};o.D_caps=qCap('pow')+'/'+qCap('mob');o.D_train=qCap('pow')===85&&qCap('mob')===67;
 // E: a 100 is never touched by age
 const e=run(39,{acc:100,pow:100,awr:100,mob:100,sec:100,trk:100});o.E_100=e.q.pow===100&&e.q.mob===100&&qo(e.q)===100;

 // F: Tyler's overall list: from 99s, one birthday lands the overall right on his number; the other four get the rest
 const ovAt=a=>{const r=run(a-1,{acc:99,pow:99,awr:99,mob:99,sec:99,trk:99});return qo(r.q)};const L={45:80,46:70,48:60,50:50};
 o.F_ovr=Object.keys(L).map(a=>a+':'+ovAt(+a)).join(',');o.F_onList=Object.keys(L).every(a=>ovAt(+a)===L[a]);
 fresh();S.age=45;S.q={acc:70,pow:70,awr:70,mob:60,sec:70,trk:70};o.F_trainRest=qCap('acc')===82&&qCap('trk')===82;
 S.q={acc:82,pow:85,awr:82,mob:67,sec:82,trk:82};o.F_maxedIs80=qo(S.q)===80;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
