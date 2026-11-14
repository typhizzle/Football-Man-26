// Raising your kids + the athlete path (Tyler 2026-11-14): ages on the clock, his own interest (can't be forced),
// ~33% pro talent with a pro parent, decides at 14, plays HS with a growing rating, enters the real draft at 21 with a record.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.KD_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof kidEns!='function'){o.err='no raising';return o}
 // A: talent: about a third pro-caliber with a pro parent
 let pro=0;for(let i=0;i<3000;i++){const k=kidEns({n:'Kid '+i,g:'b',born:2030+i%9});if(k.tal>=82)pro++}o.proShare=+(pro/3000).toFixed(3);o.A_third=pro/3000>.28&&pro/3000<.38;
 // B: age follows the clock
 const now=calT();S.kids=[{n:'Junior Simmons',g:'b',age:0,born:yrN(),bt:now-14*52-1}];hub();const k=S.kids[0];o.B_age14=kidAge(k)===14&&k.age===14;
 // C: at 14 he decides (most athletes' kids try); things you do raise interest; once a week
 const decided=k.sport!=null;o.C_decided=decided;const i0=k.int,bd0=k.bond;famV();kidDo(0,'catch');const i1=k.int;kidDo(0,'catch');o.C_catchRaises=i1>i0&&k.int===i1&&k.bond>bd0;
 o.C_cardShows=/Loves sports/.test(ui.innerText||'')&&/Play catch/.test(ui.innerText||'');
 // D: not forced: a kid with no interest can choose no sports
 let none=0;for(let i=0;i<400;i++){const x={n:'Q'+i,g:'b',age:0,born:2020,bt:now-14*52-1,int:5,tal:60,bond:50,sport:null,hs:[]};kidYearOf(x,yrN());if(x.sport==='')none++}o.D_canSayNo=none>300;
 // G: sons can be nudged to any men's sport; daughters only women's sports (never football); football = QB
 let gF=0,sOk=0,qb=true,nudged=0;for(let i=0;i<300;i++){const d={n:'D'+i,g:'g',age:0,born:2020,bt:now-14*52-1,int:80,tal:70,bond:50,sport:null,hs:[]};kidYearOf(d,yrN());if(d.sport==='Football')gF++;
  const sn={n:'S'+i,g:'b',age:0,born:2020,bt:now-14*52-1,int:80,tal:70,bond:50,sport:null,hs:[],nudge:'Baseball'};kidYearOf(sn,yrN());if(sn.sport==='Baseball')nudged++;
  const f={n:'F'+i,g:'b',age:0,born:2020,bt:now-14*52-1,int:80,tal:70,bond:50,sport:null,hs:[],nudge:'Football'};kidYearOf(f,yrN());if(f.sport==='Football'&&f.pos!=='QB')qb=false;
  const dn={n:'N'+i,g:'g',age:0,born:2020,bt:now-14*52-1,int:80,tal:70,bond:50,sport:null,hs:[],nudge:'Softball'};kidYearOf(dn,yrN());if(dn.sport==='Softball')sOk++}
 o.G_noGirlsFootball=gF===0;o.G_nudgeWorks=nudged>180&&sOk>180;o.nudgedShare=[nudged,sOk];o.G_footballIsQB=qb;
 // H: no pro career -> a regular job, tracked
 const jb={n:'Job Kid',g:'g',age:0,born:2020,bt:now-22*52-1,int:80,tal:40,bond:50,sport:'Track',hs:[]};kidEns(jb);let jobs=0;for(let i=0;i<50;i++){jb.life=null;kidLife(jb,yrN());if(jb.life&&jb.life.t==='job')jobs++}o.H_jobs=jobs>40;
 const st={n:'Star Kid',g:'g',age:0,born:2020,bt:now-22*52-1,int:80,tal:95,bond:50,sport:'Soccer',hs:[]};kidEns(st);st.tal=95;let pros=0;for(let i=0;i<50;i++){st.life=null;kidLife(st,yrN());if(st.life&&st.life.t==='pro')pros++}o.H_starsGoPro=pros>30;
 // E: high school: a rating that grows
 k.sport='Football';k.pos='WR';k.sch='Lincoln High School';for(let a=15;a<=17;a++){k.bt-=52;delete (k.ly||{})[a];kidsTick()}o.hsRatings=(k.hs||[]).map(x=>x[2]);o.E_grows=(k.hs||[]).length>=3&&k.hs[k.hs.length-1][2]>=k.hs[0][2];
 // F: at 21 he enters the real draft with a high school + college record
 k.bt-=4*52;kidsTick();const Y=k.drq;const C=lgClass(Y);const p=C.find(x=>x.n===k.n);o.F_inDraftClass=!!p;o.F_hasRecord=!!(p&&p.pid&&S.pc.p[p.pid]&&S.pc.p[p.pid].r.some(q=>q[1]==='hs')&&S.pc.p[p.pid].r.some(q=>q[1]==='col'));
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
