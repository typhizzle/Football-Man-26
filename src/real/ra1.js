// Tyler 2026-11-15: new pro players (with counterparts, nobody replaced, PLM kept), QB needs + draft logic, college schedules.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.RA_FILE});const jc=fs.readFileSync('/home/claude/specs/col-save-2026.json','utf8'),js=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(jc,js)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};save=()=>{};
 // A: a current 2026 save (built rosters, the 21 not in them yet): all 21 join their real teams once; the players they
 //    displaced are free agents; nobody disappears
 for(const k of Object.keys(localStorage))localStorage.removeItem(k);SLOT=5;newC();start();for(let i=0;i<32;i++)rost('p.'+i);
 const snap=JSON.parse(JSON.stringify(S));for(const k in snap.ro){(snap.ro[k]||[]).forEach((x,j)=>{if(x&&ADD26N.has(x.n))snap.ro[k][j]={n:'Gen Filler'+j+k,pos:x.pos,ovr:60,age:25,qp:1,qn:1,ny:0,h:[],cs:{},tm:[],aw:{}}})}delete snap.add26;delete snap.add26t;
 const names0=new Set();for(const k in snap.ro){(snap.ro[k]||[]).forEach(x=>x&&names0.add(x.n))}
 S=mig(snap);const where={};for(const k in S.ro){(S.ro[k]||[]).forEach(x=>{if(x&&ADD26N.has(x.n))(where[x.n]=where[x.n]||[]).push(k)})}
 o.A_built=Object.keys(where).length;o.A_onTeam=ADD26.every(e=>(where[e[2]]||[]).length===1&&where[e[2]][0]==='p.'+e[0]);
 const names1=new Set();for(const k in S.ro){(S.ro[k]||[]).forEach(x=>x&&names1.add(x.n))}o.A_lost=[...names0].filter(n=>!names1.has(n)&&!(typeof isGen=='function'&&isGen(n)&&(S.dk1&&[...Object.values(S.ro)].some(R=>Array.isArray(R)&&R.some(y=>y&&y.n==='Dawson Kingsley')))))   /* Tyler 2026-11-16: an auto-generated man replaced by a real player (Dawson Kingsley) may vanish */.slice(0,5).join(', ');o.A_nobodyLost=o.A_lost==='';
 const e0=ADD26[1];const p0=S.ro['p.'+e0[0]].find(x=>x.n===e0[2]);o.A_history=!!p0&&p0.dr&&p0.dr.y===2021&&p0.dr.p===112&&(p0.h||[]).length===0;
 // B: a 2037 save is left alone (2026 ages)
 S=mig(JSON.parse(js));let any=0;for(const k in S.ro){(S.ro[k]||[]).forEach(x=>{if(x&&ADD26N.has(x.n))any++})}o.B_lateSaveAlone=any===0;
 // C: a new save: the roster gets him when it is built, with his real draft and no made-up seasons
 for(const k of Object.keys(localStorage))localStorage.removeItem(k);SLOT=5;newC();start();const L=rost('p.21');const asg=L.find(x=>x&&x.n==='Apollo St. Gold');o.C_newSave=!!asg&&asg.ovr===96&&asg.dr&&asg.dr.r===4&&(asg.h||[]).length===0;
 // D: QB needs: Tyler's 2026 grades, and the college->pro draft follows them
 o.D_grades=qbGL(12)==='A+'&&qbGL(0)==='D'&&qbGL(30)==='D+'&&qbGL(23)==='C+';
 const P={pos:'QB',ovr:99,gen:1};let low=0,high=0;for(let i=0;i<400;i++){if(qbAdj(0,P)>0)low++;if(qbAdj(12,P)>=0)high++}o.D_needyTakes=low===400;o.D_set=high/400;o.D_setRare=high/400<.15;
 // E: college: the yearly rivalries are on every schedule; NYPD moves into the Penitentiary's conference after the season
 S=mig(JSON.parse(jc));const T=S.T,ix={};T.forEach((t,i)=>{if(t.ab)ix[t.ab]=i});let miss=[];for(let y=0;y<3;y++){S.cy=1+y;const W=colSched();const met=(a,b)=>W.some(wk=>wk.some(([x,z])=>(x==a&&z==b)||(x==b&&z==a)));
  RVYEAR.forEach(([a,b])=>{if(ix[a]!=null&&ix[b]!=null&&!met(ix[a],ix[b]))miss.push(a+'-'+b)});const gc=T.map(()=>0);W.forEach(wk=>wk.forEach(([a,b])=>{gc[a]++;gc[b]++}));if(Math.max(...gc)>12)miss.push('13 games')}
 o.E_miss=miss.slice(0,6).join(',');o.E_rivalriesYearly=miss.length===0;
 nypdMove();let ca=-1,cb=-1;S.col.forEach((c,ci)=>(c.t||[]).forEach(t=>{if(t.ab==='NYPD')ca=ci;if(t.ab==='NYCP')cb=ci}));o.E_sameConf=ca>=0&&ca===cb;
 // F: Wide Receiver U: mid team, great receivers
 S=mig(JSON.parse(jc));let W_=null,k_=null;S.col.forEach((c,ci)=>(c.t||[]).forEach((t,j)=>{if(t.ab==='WRU'){W_=t;k_=S.T.indexOf(t)}}));if(W_){const R_=rost('h.'+k_);const wr=R_.filter(x=>x&&x.pos==='WR').map(x=>x.ovr).sort((a,b)=>b-a);o.F_wru=W_.ovr+' / WR '+wr.slice(0,3).join(',');o.F_ok=W_.ovr<=68&&wr[0]>=88}else o.F_ok='no WRU';
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},jc,js);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
