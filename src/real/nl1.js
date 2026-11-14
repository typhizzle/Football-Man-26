// Tyler's night list 2026-11-14 (batch after V0008): Frank Castle -> Deep passer, Halloween costumes off fancy events
// + Equip everywhere up top, fans (9B max, up and down by what fans like, real numbers), sponsorships on/off + meter,
// Pot McGee schedule, fumbles follow carrying, skeleton suit keeps his hair.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.NL_FILE});
const fc=fs.readFileSync('/home/claude/specs/col-save-2026.json','utf8'),si=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(fc,si)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};
 // A: Frank Castle
 const raw=JSON.parse(fc);S=mig(JSON.parse(fc));o.A_arch=S.arch;o.A_isDeep=S.arch==='Deep passer';o.A_ovrSame=qo(S.q)===qo(raw.q);o.A_q=JSON.stringify(S.q);
 o.A_powUp=S.q.pow>raw.q.pow;o.A_mobDown=S.q.mob<raw.q.mob;o.A_kept=!!S.fcArchFrom&&JSON.stringify(S.fcArchFrom.q)===JSON.stringify(raw.q);
 o.A_restSame=S.name===raw.name&&JSON.stringify(S.cs)===JSON.stringify(raw.cs)&&JSON.stringify(S.aw)===JSON.stringify(raw.aw)&&S.cy===raw.cy;
 const q1=JSON.stringify(S.q);S=mig(JSON.parse(JSON.stringify(S)));o.A_once=JSON.stringify(S.q)===q1&&S.arch==='Deep passer';
 const sr=JSON.parse(si);S=mig(JSON.parse(si));o.A_othersUntouched=S.arch===sr.arch&&!S.fcArch;
 // B: Halloween + equip everywhere (on Simothy's save)
 S.inv=S.inv||[];const hid=HWALL()[0][0];if(!S.inv.includes(hid))S.inv.push(hid);o.B_hid=hid;
 o.B_evNoCostume=!wrOpts('ev').some(x=>isHwId(x[0]));o.B_casHasCostume=wrOpts('cas').some(x=>x[0]===hid);
 wrEns();S.wear.ev=hid;o.B_fix=hwEvFix(S)===1&&S.wear.ev==='cas';
 wrAll(hid);o.B_allNotEv=S.wear.lock===hid&&S.wear.cas===hid&&S.wear.ev!==hid;
 S.wear.cas='cas';wardV('cas','');o.B_button=!!ui.querySelector('[data-eqall]');
 // C: fans
 S.fanN=1e6;S.fanF=1e12;S.pop=50;S.popSeen=50;S.pop=52;fanTick();o.C_up=S.fanN;o.C_upOk=S.fanN>=1e6+9000;
 const before=S.fanN;S.pop=49;fanTick();o.C_down=S.fanN;o.C_downOk=S.fanN<before;
 S.fanN=8.99e9;S.popSeen=S.pop;S.pop=S.pop+20;fanTick();o.C_cap=S.fanN<=9e9&&S.fanN>=8.99e9;
 S.fanN=5e6;S.fanF=1e9;o.C_holdNoDrop=fanHold(1000,S.pop)===5e6;
 S.fanMsgN=S.fanN;S.popSeen=S.pop;S.pop+=3;const m=fanMsg('Big win. Fans +3');o.C_msg=m;o.C_msgReal=/Fans \+[\d,]{4,}/.test(m)&&!/Fans \+3\b/.test(m);
 // D: sponsorships
 S.stage='pro';S.spOff=0;S.spLv=2;S.spo=null;const n2=spEns().L.length;spSet(0);S.spo=null;const n0=spEns().L.length;o.D_counts=n2+'>'+n0;o.D_meter=n0<n2&&spN()===2;
 S.fmsg='';spToggle();o.D_off=S.spOff===1&&spEns().L.length===0&&/GSPN/.test(S.fmsg);spToggle();o.D_backOn=!S.spOff;
 settings();o.D_settingsCard=!!ui.querySelector('[data-spset]');
 S.pb=null;S.wk=5;S.evc=null;let L=[{k:'pot',n:'x',d:'y'}];L=evcFilter(L);o.D_potNotWk6=!L.some(e=>e.k==='pot');
 S.wk=1;S.evc=null;L=evcFilter([{k:'pot',n:'x',d:'y'}]);o.D_potWk2=L.some(e=>e.k==='pot');
 // E: fumbles
 const perGame=s=>1-Math.pow(1-fumHit(s),10);o.E_g65=+(1/perGame(65)).toFixed(1);o.E_g80=+(1/perGame(80)).toFixed(1);o.E_g99=Math.round(1/perGame(99));
 S.q.sec=65;let f=0;for(let i=0;i<4000;i++)f+=simFum();o.E_sim65=f/4000;S.q.sec=99;f=0;for(let i=0;i<4000;i++)f+=simFum();o.E_sim99=f/4000;
 // F: skeleton suit draws his hair when he isn't wearing the skull
 o.F_skelHair=document.documentElement.innerHTML.includes("S.hat!=null)?1:0);");
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},fc,si);
out.pageErrors=errs.slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
