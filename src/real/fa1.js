// Tyler 2026-11-15: free agents to start with + play as an existing free-agent QB (offers, signing, GSPN, previous career).
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.FA_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8'),jc=fs.readFileSync('/home/claude/specs/col-save-2026.json','utf8');
const out=await pg.evaluate(async(j,require_col)=>{const o={};try{window.confirm=()=>true;window.alert=()=>{};for(const k of Object.keys(localStorage))localStorage.removeItem(k);SLOT=5;
 // A: a new career starts with all 21 in the free-agent pool
 newC();start();await new Promise(r=>setTimeout(r,100));const F=(S.ro&&S.ro.fa)||[];o.A_n=F.filter(x=>x.fa26).length;o.A_all21=o.A_n===21;
 o.A_tyreek=!!F.find(x=>x.n==='Tyron Hills'&&x.pos==='WR'&&x.ovr===89&&x.age===32);
 // B: the existing-QB screen has the FREE AGENT QUARTERBACKS section with all 11
 tkPick();const sec=ui.querySelector('[data-faq]');o.B_section=!!sec&&/FREE AGENT QUARTERBACKS/.test(sec.innerText);o.B_qbs=sec?[...sec.querySelectorAll('button')].length:0;o.B_all11=o.B_qbs===11;
 // C: offers: 2-4, realistic roles, never from a team with an elite QB room for a 66
 faqGo(encodeURIComponent('James Garo'));const O=FAQ.O;o.C_n=O.length;o.C_count=O.length>=2&&O.length<=4;o.C_roles=O.map(x=>x.role+' '+x.team+' $'+x.sal+'M').join(' | ');
 o.C_explained=O.every(x=>x.why&&x.yrs>=1&&x.sal>0);o.C_shown=(ui.innerText.match(/Sign with/g)||[]).length===O.length;
 // D: sign: he is on that team, the starter stays (unless beaten), he is no longer a free agent, no one else removed
 const before={};for(const k in S.ro){if(!/^p\./.test(k)&&k!=='fa')continue;(S.ro[k]||[]).forEach((x,ix)=>{if(x&&x.n)before[x.n]=k+'#'+ix+' '+x.pos+(x.pid?' '+x.pid:'')})}const pick=O[O.length-1];faqSign(O.length-1);
 o.D_stage=S.stage;o.D_name=S.name;o.D_team=S.ct&&S.ct.team;o.D_onTeam=S.stage==='pro'&&S.name==='James Garo'&&rost('h.0')[0].n==='James Garo';
 o.D_ovr=qo(S.q);o.D_rating=Math.abs(qo(S.q)-66)<=1&&S.age===35;o.D_notFA=!(S.ro.fa||[]).some(x=>x.n==='James Garo');
 const after={};for(const k in S.ro){(S.ro[k]||[]).forEach(x=>{if(x&&x.n)after[x.n]=1})}if(S.vetP)after[S.vetP.n]=1;const lost=Object.keys(before).filter(n=>n!=='James Garo'&&!after[n]);o.D_lost=lost.slice(0,5).map(n=>n+' @'+before[n]).join(', ');o.D_signedAt='p.'+pick.i;o.D_nobodyLost=lost.length===0;
 o.D_starter=S.vetP&&S.vetP.n;o.D_starterStays=!!S.vetP&&S.vetP.n!=='James Garo'&&S.sq>qo(S.q)-3;o.D_faN=(S.ro.fa||[]).filter(x=>x.fa26).length;o.D_faPoolKept=o.D_faN===20;
 // E: GSPN story + previous career card, no made-up stats or awards
 o.E_gspn=!!(S.tw&&JSON.stringify(S.tw).includes('James Garo'))||/GSPN/.test(String(S.fmsg||'')+ui.innerText);o.E_noAwards=(S.aw||[]).length===0&&!S.cst;career();o.E_card=/Before this save: previous NFL career/.test(ui.innerText)&&/NE, SF, LV, LAR/.test(ui.innerText);
 // F: an older save gets them once on load; a save past 2028 does not
 const s1=JSON.parse(j);delete s1.fa26;const m1=mig(s1);o.F_lateSaveNone=!(m1.ro.fa||[]).some(x=>x.fa26);const c1=JSON.parse(require_col);delete c1.fa26;const m2=mig(c1);const n1=(m2.ro.fa||[]).filter(x=>x.fa26).length,n2=(mig(m2).ro.fa||[]).filter(x=>x.fa26).length;o.F_counts=n1+'/'+n2;o.F_once=n1===21&&n2===21;
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j,jc);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
