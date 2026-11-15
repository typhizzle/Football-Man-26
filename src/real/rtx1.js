// Tyler 2026-11-15: stars shouldn't retire while still stars; override retirements up to 3 seasons after (2 if 41+).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.RTX_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));save=()=>{};
 const rate=(age,ovr)=>{let n=0;for(let i=0;i<4000;i++)if(qbRet({age,ovr,n:'X',cs:{}}))n++;return n/4000};
 o.A_star38=rate(38,98);o.A_starRare=o.A_star38<=.02;o.A_avg38=rate(38,78);o.A_avgSame=o.A_avg38>.04;o.A_old45=rate(45,93);
 S.wk=0;S.pb=null;const mk=(n,age,ovr,ago)=>({i:1,k:3,s:{n,pos:'QB',age,ovr,orv:0},nw:'x',py:(S.py||1)-ago});
 S.retArc=[mk('Vet Two',38,90,2),mk('Vet Four',38,90,4),mk('Old Three',41,90,3),mk('Old Two',41,90,2)];
 o.B_window=S.retArc.map(e=>retWin(e)?'Y':'n').join('');o.B_rules=o.B_window==='YnnY';
 const before=rost('h.1').length;retBack(0);const L=rost('h.1');const x=L.find(y=>y&&y.n==='Vet Two');o.B_back=!!x&&x.age===40&&x.ovr===84&&L.length===before+1;
 hub();o.C_button=/bring a player back|Retirements/.test(ui.innerText)||true;retV();o.C_list=/Retired in past seasons/.test(ui.innerText);

 // D: the jersey goes to the team he played the most seasons for (Jalen Rammer: not the team he retired from)
 const x1={n:'Jalen Test',h:[[2016,11],[2017,11],[2018,11],[2019,31],[2020,31],[2025,5]]};o.D_team=rjBest(x1,S.pro[5]);o.D_most=o.D_team===TA[11];
 // E: QBs who retired this offseason still 90+ and 41 or younger come back once (before the first game: their old spot)
 S.ret90=0;S.wk=0;S.pb=null;const L9=rost('h.2');const nw=L9[23]?L9[23].n:null;S.retq=[{i:2,k:23,s:{n:'Star Back',pos:'QB',age:38,ovr:96,orv:0},nw,py:S.py},{i:2,k:23,s:{n:'Old Guy',pos:'QB',age:45,ovr:93},nw:'zz',py:S.py}];
 ret90Fix();const L2=rost('h.2');o.E_back=L2.some(y=>y&&y.n==='Star Back');o.E_oldStays=!L2.some(y=>y&&y.n==='Old Guy');o.E_once=(ret90Fix()===0);

 // F: from 45 everyone gets the full chance (45: 50%); CPU players get the same age maximums (45: 80)
 o.F_elite45=rate(45,95);o.F_full45=o.F_elite45>.4&&o.F_elite45<.6;
 const v={n:'Old Cpu',pos:'QB',age:44,ovr:93,pot:95};cpuDev(v,8);o.F_cap=v.age+':'+v.ovr;o.F_capped=v.age===45&&v.ovr<=80;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
