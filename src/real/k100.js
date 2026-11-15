// Tyler 2026-11-14: keeping 100 OVR. Under 36: 4,800 total yds + 35 total TD a season, lose it on 3 straight C+-or-lower
// games or 4 straight losses. 36+: 5,000 + 45, 2 straight C+ or 3 straight losses. Age regression never touches a 100.
// Can't become 100 at 36+. Winning it back: 99s maxed + an Ultra Bowl + a regular-season MVP after losing it.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.K100_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));const realSave=save;save=()=>{};S.stage='pro';S.age=30;
 const to100=()=>{for(const k in S.q)S.q[k]=100;S.h100c=0;S.h100l=0;S.ufk=null};
 // A: under 36, C+ streak 3
 to100();userForm2(70,true);userForm2(71,true);userForm2(80,true);o.A_brokenStreakKeeps=qo(S.q)===100;
 userForm2(70,true);userForm2(69,true);o.A_twoStill100=qo(S.q)===100;userForm2(71,true);o.A_threeLoses=qo(S.q)===99&&/Lost 100 OVR/.test(S.aw[S.aw.length-1]);o.A_powMobKept=S.q.pow===100&&S.q.mob===100;
 // B: under 36, losses 4
 to100();for(let i=0;i<3;i++)userForm2(90,false);o.B_threeLossesKeep=qo(S.q)===100;userForm2(90,false);o.B_fourLose=qo(S.q)===99;
 // C: 36+, C+ streak 2, losses 3
 S.age=37;to100();userForm2(70,true);o.C_oneKeeps=qo(S.q)===100;userForm2(70,true);o.C_twoLose=qo(S.q)===99;
 to100();userForm2(90,false);userForm2(90,false);o.C_twoLossKeep=qo(S.q)===100;userForm2(90,false);o.C_threeLose=qo(S.q)===99;
 // D: season checks (age is S.age-1 for the season just finished)
 S.age=31;to100();S.h100H=S.hist.length;S.h100y=S.py;S.h100f=1;S.hist.push({y:'P'+S.py,g:17,yds:4300,ry:400,td:36,rtd:4});h100Tick();o.D_under36Short=qo(S.q)===99;
 to100();S.py++;S.h100y=S.py;S.h100f=1;S.hist.push({y:'P'+S.py,g:17,yds:4500,ry:400,td:33,rtd:3});h100Tick();o.D_under36Keeps=qo(S.q)===100;
 S.age=38;to100();S.py++;S.h100y=S.py;S.h100f=1;S.hist.push({y:'P'+S.py,g:17,yds:4500,ry:400,td:44,rtd:0});h100Tick();o.D_36plusNeeds5000_45=qo(S.q)===99;
 to100();S.py++;S.h100y=S.py;S.h100f=1;S.hist.push({y:'P'+S.py,g:17,yds:4700,ry:400,td:43,rtd:3});h100Tick();o.D_36plusKeeps=qo(S.q)===100;
 to100();S.py++;S.h100y=S.py-5;S.hist.push({y:'P'+S.py,g:17,yds:1000,ry:0,td:5,rtd:0});h100Tick();o.D_notJudgedIfNot100=qo(S.q)===100;
 // E: age regression never touches a 100 (real offseason code path)
 o.E_patched=document.documentElement.innerHTML.includes('rgu=k100_?null:RGT[S.age]');
 // F: can't become 100 at 36+; first time under 36 still 99s + 2 Ultra Bowls
 S.e100=0;for(const k in S.q)S.q[k]=99;S.aw=S.aw.filter(a=>!/Ultra Bowl Champion/.test(a));S.aw.push('Pro yr 1: Ultra Bowl Champion','Pro yr 2: Ultra Bowl Champion');
 S.age=30;o.F_firstUnder36=qCap('acc')===100;S.age=36;o.F_not36=qCap('acc')===99;
 // G: winning it back
 S.age=31;S.e100=1;for(const k in S.q)S.q[k]=99;S.h100lostY=S.py;S.aw=S.aw.filter(a=>!/(Ultra Bowl Champion|: MVP)$/.test(a));
 S.aw.push('Pro yr '+S.py+': MVP');h100Tick();o.G_mvpOnlyNo=qo(S.q)===99;
 S.aw.push('Pro yr '+(S.py-1)+': Ultra Bowl Champion');h100Tick();o.G_oldTitleNo=qo(S.q)===99;
 S.q.acc=98;S.aw.push('Pro yr '+S.py+': Ultra Bowl Champion');h100Tick();o.G_not99sNo=qo(S.q)<100&&S.q.acc===98;
 const hb=hundInfo();o.G_backCard=/Win your 100 back/.test(hb)&&(hb.match(/✅/g)||[]).length===2&&(hb.match(/⬜/g)||[]).length===1;
 S.q.acc=99;S.age=36;h100Tick();o.G_36No=qo(S.q)===99;S.age=31;h100Tick();o.G_back=qo(S.q)===100&&/Earned back 100 OVR/.test(S.aw[S.aw.length-1]);
 // H: the checklist
 S.age=30;to100();S.ss={...Z(),g:8,yds:2500,ry:150,td:20,rtd:2};S.h100f=1;S.h100c=2;S.h100l=1;let h=hundInfo();
 o.H_under36=/4,800/.test(h)&&/at least 35 total touchdowns/i.test(h)&&/2\/3/.test(h)&&/1\/4/.test(h)&&/C\+ or lower/.test(h)&&!/rough stretch/.test(h);
 S.age=37;S.h100c=1;S.h100l=2;h=hundInfo();o.H_36plus=/5,000/.test(h)&&/45 total touchdowns/i.test(h)&&/1\/2/.test(h)&&/2\/3/.test(h);
 o.I_version=/V 0\.0\.1\.0010/.test(document.documentElement.innerHTML);
 // E2: the real offseason at 40 with a 100 keeps it (run last: it moves the save on a year)
 save=realSave;S.age=39;to100();S.ss={...Z(),g:17,yds:5300,ry:300,td:48,rtd:2};S.h100y=S.py;S.h100f=1;try{pNext()}catch(e){o.E_err=e.message}o.E_age=S.age;o.E_kept100=S.age===40&&qo(S.q)===100;o.E_q=JSON.stringify(S.q);o.E_msg=String(S.fmsg||HM||'').slice(-200);
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
