// PLAYER LIVES MATTER — multi-season audit (Tyler 2026-11-16: "we're not to 90% yet ... there's likely more bugs").
// Plays several full seasons in a fresh existing-pro-QB world (and a free-agent world) and checks after every season:
//  1 nobody disappears without a retirement record (retq/seal), nobody duplicated (same pid twice / same name on two teams)
//  2 names and positions never change, 3 past seasons never change once written, 4 nothing dated in the future,
//  5 every team keeps a full lineup in the right positions, 6 ages go up by exactly one a year,
//  7 career totals = sum of seasons, 8 college prospects only enter the NFL through the draft at/after eligibility.
const H=require('/home/claude/real/h.js');
(async()=>{const res={};for(const mode of ['pro','fa']){const {b,pg,errs}=await H.open({file:process.env.AU_FILE});
 await pg.evaluate(()=>{window.confirm=()=>true;window.alert=()=>{};localStorage.clear();SLOT=5;newC();tkStart()});await new Promise(r=>setTimeout(r,1500));
 res[mode]=await pg.evaluate(async(mode)=>{const P=[],note=(t)=>{if(P.length<60)P.push(t)};const o={};try{save=()=>{};
  if(mode==='pro'){const e=tkList()[0];tkGo(e.i)}else{const L=faqList();faqGo(encodeURIComponent(L[0].n));faqSign(0)}ovHide();
  const all=()=>{const M=new Map();for(const k in S.ro){if(!/^h\.\d+$/.test(k))continue;(S.ro[k]||[]).forEach((x,j)=>{if(x&&x.n&&x.n!==S.name&&!x.pnt)(M.get(x.pid||('n:'+x.n))||M.set(x.pid||('n:'+x.n),[]).get(x.pid||('n:'+x.n))).push({x,k,j})})}return M};
  const archived=n=>{try{return (S.retAll||[]).some(e=>e.n===n)||JSON.stringify(S.retd||[]).indexOf('"'+n+'"')>=0||JSON.stringify(S.retq||[]).indexOf('"'+n+'"')>=0||Object.values(S.seal||{}).some(e=>e&&e.n===n&&e.ret)||JSON.stringify(S.retArc||[]).indexOf('"'+n+'"')>=0}catch(e){return false}};
  const ok5=()=>{let bad=0;for(const k in S.ro){if(!/^h\.\d+$/.test(k))continue;const L=S.ro[k];if(!Array.isArray(L))continue;for(let j=0;j<=22;j++){const x=L[j];if(!x){bad++;note('S5 empty starter '+k+'#'+j);continue}let want=POSL[j],have=x.pos;try{if(lgGrp(want)!==lgGrp(have)){bad++;note('S5 '+k+'#'+j+' '+x.n+' is '+have+' in a '+want+' spot')}}catch(e){}}}return bad};
  let prev=null;const seasons=+o.n||4;o.years=[];
  for(let yr=0;yr<4;yr++){const Y=yrN();o.years.push(Y);
   let g_=0;while(g_++<70){const e=pevt();if(e.t=='pro'||e.t=='pp'||e.t=='pbw')psim(e);else if(e.t=='bye')pWeek(null);else if(e.t=='ppbye')ppAdv(0);else break;try{hub()}catch(x){}}
   try{if(!S.psum)mkPsum()}catch(e){note('mkPsum '+e.message)}
   // after season end: snapshot
   const cur=all();const snap=new Map();cur.forEach((arr,id)=>{const {x}=arr[0];snap.set(id,{k:arr[0].k,j:arr[0].j,ovr:x.ovr,n:x.n,pos:x.pos,age:x.age,h:JSON.stringify((x.h||[]).filter(r=>r[0]<Y)),cs:JSON.stringify(x.cs||{}),hAll:(x.h||[])})});
   // 1 duplicates
   cur.forEach((arr,id)=>{if(arr.length>1)note('S1 duplicate '+arr[0].x.n+' on '+arr.map(a=>a.k+'#'+a.j+' pid='+a.x.pid+' '+a.x.pos+' age'+a.x.age+' ovr'+a.x.ovr+' ny'+a.x.ny+(a.x.dr?' dr'+JSON.stringify(a.x.dr):'')).join(' | ')+' Y'+Y)});
   const names=new Map();cur.forEach((arr)=>{const n=arr[0].x.n;names.set(n,(names.get(n)||0)+1)});names.forEach((c,n)=>{if(c>1)note('S1 two different players named '+n)});
   // 4 future
   cur.forEach(arr=>{const x=arr[0].x;(x.h||[]).forEach(r=>{if(r[0]>Y)note('S4 future line '+x.n+' '+r[0])})});
   // 7 career totals = sum of seasons (for groups with cs)
   cur.forEach(arr=>{const x=arr[0].x;const g=SG(x.pos);if(!g||!x.cs||!x.h||!x.h.length)return;const t={};try{const y={cs:{}};x.h.forEach(h=>csAdd(y,g,h.slice(2)));if(JSON.stringify(y.cs)!==JSON.stringify(x.cs))note('S7 career totals off '+x.n+' '+JSON.stringify(x.cs).slice(0,60)+' vs '+JSON.stringify(y.cs).slice(0,60))}catch(e){}});
   ok5();
   if(prev){prev.forEach((p,id)=>{const now=snap.get(id);
     if(!now){if(!archived(p.n)&&!(S.ro.fa||[]).some(x=>x&&(x.pid===id||x.n===p.n))){const nowIn=(S.ro[p.k]||[])[p.j];note('S1 vanished '+p.n+' '+p.pos+' age'+p.age+' ovr'+p.ovr+' from '+p.k+'#'+p.j+' Y'+Y+' id='+id+' now there: '+(nowIn?nowIn.n+' '+nowIn.pos+' age'+nowIn.age+' pid='+nowIn.pid:'empty')+' | log:'+JSON.stringify((S.tlog||S.trx||[]).filter(t=>JSON.stringify(t).includes(p.n)).slice(-2)).slice(0,200))}return}
     if(now.n!==p.n)note('S2 renamed '+p.n+' -> '+now.n);if(now.pos!==p.pos&&lgGrp(now.pos)!==lgGrp(p.pos))note('S2 position '+p.n+' '+p.pos+' -> '+now.pos);
     if(p.age!=null&&now.age!=null&&now.age-p.age!==1)note('S6 age '+p.n+' '+p.age+' -> '+now.age+' was '+p.k+'#'+p.j+' now '+(cur.get(id)||[{}])[0].k+' faBefore:'+(p.fa?1:0)+' retq:'+JSON.stringify(S.retq||[]).includes(p.n)+' retArc:'+JSON.stringify(S.retArc||[]).includes(p.n)+' tx:'+JSON.stringify((S.tx||[]).filter(t=>t&&t.n===p.n).slice(0,3)).slice(0,250));
     const was=JSON.parse(p.h),isNow=now.hAll.filter(r=>r[0]<Y-1);const w2=was.filter(r=>r[0]<Y-1);if(JSON.stringify(w2)!==JSON.stringify(isNow))note('S3 history changed '+p.n+' '+JSON.stringify(w2).slice(0,80)+' -> '+JSON.stringify(isNow).slice(0,80))})}
   // 8 prospects
   (S.npx||[]).forEach(p=>{const cy=(p.off|0)+1+(Y-2026);let on=null;for(const k in S.ro){if(!/^h\.\d+$/.test(k))continue;if((S.ro[k]||[]).some(x=>x&&x.n===p.n))on=k}if(on&&!p.tkDr&&cy<=4)note('S8 college player in NFL '+p.n+' class '+cy+' '+Y)});
   prev=snap;try{offStart();let gg=0;while(S.ofs&&gg++<20)offNext();if(S.ofs)pNext()}catch(e){note('offseason '+e.message);break}   /* the real offseason: free agency, the draft, camp */}
 }catch(e){note('ERR '+e.message+' | '+(e.stack||'').split('\n')[1])}o.problems=P;o.n=P.length;return o},mode);
 res[mode].pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);await b.close()}
 console.log(JSON.stringify(res,null,1))})();
