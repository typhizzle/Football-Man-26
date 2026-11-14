// Former teammates from the real records (EPLM) + locker room/home buttons under Play/Sim in blue (Tyler 2026-11-14).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.FT_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};S=mig(JSON.parse(j));SLOT=4;LASTJ='';
 if(typeof ftOf!='function'){o.err='no former-teammate record';return o}
 // A: every pro who shares a club AND a year with Tyler's seasons (not this season's team) is found, and nobody else
 const M=ftMine();o.mySeasons=M.length;let found=0,shouldBe=0,wrong=0;const ex=[];
 S.T.forEach((t,i)=>{if(!i)return;(rost('h.'+i)||[]).forEach(x=>{if(!x||!x.h)return;const share=(x.h||[]).some(q=>q[0]>=2022&&S.pro[q[1]]&&M.some(m=>m[0]===q[0]&&m[2]===tn(S.pro[q[1]])&&!(m[0]===M[M.length-1][0])));const f=ftOf(x);if(share){shouldBe++;if(f&&f.lv==='pro'){found++;if(ex.length<3)ex.push(x.n+': '+ftTxt(f))}}else if(f&&f.lv==='pro')wrong++})});
 o.A_shouldBe=shouldBe;o.A_found=found;o.A_allFound=found===shouldBe&&shouldBe>0;o.A_noneWrong=wrong===0;o.examples=ex;
 // B: his card says so
 let shown=false;S.T.forEach((t,i)=>{if(shown||!i)return;(rost('h.'+i)||[]).forEach((x,k)=>{if(shown||!x)return;if(ftOf(x)&&ftOf(x).lv==='pro'){pCard(i,k);shown=/Former pro teammate/.test(ui.innerText||'')}})});o.B_cardTag=shown;
 // C: locker room + home buttons under Play/Sim, blue
 LRNEXT=0;M_='';hub();const B=[...ui.querySelectorAll('button')];const iS=B.findIndex(b=>/simUser\(\)|^play\(\)/.test(b.getAttribute('onclick')||''));const iL=B.findIndex(b=>(b.getAttribute('onclick')||'')==='lroom()'),iH=B.findIndex(b=>(b.getAttribute('onclick')||'')==='homeWalk()');
 const sim=B.findIndex(b=>/simUser\(\)/.test(b.getAttribute('onclick')||''));const anchor=sim>=0?sim:iS;
 o.C_underPlaySim=iL===anchor+1&&iH===anchor+2;o.C_blue=iL>=0&&B[iL].style.background.includes('47, 111, 214')&&B[iH].style.background.includes('47, 111, 214');
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
