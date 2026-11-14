// Tyler 2026-11-14: skin named by heritage (not light/dark), mixed race by any percents (newest fills the rest), your own
// colour, and parents who match you ("my dad is black even though I think I'm white").
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.HR_FILE,w:390,h:844});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{window.confirm=()=>true;S=mig(JSON.parse(j));save=()=>{};
 o.A_names=SKN.slice(0,6).join('|');o.A_noDarkLight=!SKN.slice(0,6).some(n=>/^(Light|Fair|Tan|Brown|Dark|Deep)$/.test(n))&&!FY_SKN.some(n=>/^(Very light|Light|Medium|Tan|Brown|Dark)$/.test(n));
 o.A_hasRaces=['White','Black','Asian','Mexican','Indian','Egyptian'].every(k=>RACES.some(r=>r[0].includes(k)));
 // B: the builder in the look editor
 jersey(0);await new Promise(r=>setTimeout(r,300));o.B_box=!!$('#hrbox')&&/Heritage/.test($('#hrbox').textContent);
 HRE={race:[],shade:0,own:null};hrAdd(0);o.B_first100=HRE.race[0].p===100;hrAdd(1);o.B_newFillsRest=HRE.race[0].p===100&&HRE.race[1].p===0;
 hrPct(0,25);o.B_rest75=HRE.race[1].p===75;hrAdd(2);hrPct(1,25);o.B_three=HRE.race.map(x=>x.p).join(',');o.B_threeOk=o.B_three==='25,25,50';
 hrAdd(3);hrPct(2,25);o.B_four=HRE.race.map(x=>x.p).join(',');o.B_fourOk=o.B_four==='25,25,25,25';
 hrPct(0,90);o.B_capped=HRE.race.reduce((a,x)=>a+x.p,0)===100;
 // C: use it -> your player wears the blend everywhere SK is read; survives the editor + a reload
 HRE.race=[{r:0,p:50},{r:1,p:50}];HRE.shade=0;HRE.own=null;hrUse();const want=parseInt(hrBlend(HRE.race,0).slice(1),16);
 o.C_sk=S.ap.sk===17&&SK[17]===want;try{jr()}catch(e){}o.C_keptByEditor=S.ap.sk===17&&S.ap.race&&S.ap.race.length===2;
 const s2=JSON.parse(JSON.stringify(S));SK[17]=0;mig(s2);o.C_reload=SK[17]===want;
 const mid=hrBlend([{r:0,p:50},{r:1,p:50}],0),w_=hrBlend([{r:0,p:100}],0),b_=hrBlend([{r:1,p:100}],0);const lum=h=>parseInt(h.slice(1,3),16);o.C_blendBetween=lum(mid)<lum(w_)&&lum(mid)>lum(b_);
 o.C_shade=lum(hrBlend([{r:0,p:100}],2))<lum(w_)&&lum(hrBlend([{r:0,p:100}],-2))>lum(w_);
 HRE.own='#123456';hrUse();o.C_own=S.ap.skc==='#123456'&&SK[17]===0x123456;
 // D: parents. One heritage -> both parents match. Mixed -> dad first, mom second. Existing family only changes by button.
 S.ap={sk:17,race:[{r:0,p:100}],shade:0,skc:hrBlend([{r:0,p:100}],0),hr:1,hcl:'#000000'};S.fam=null;const F1=famRand();const wI=hrFy(RACES[0][1]),bI=hrFy(RACES[1][1]);
 o.D_whiteFamily=(!F1.mom||F1.mom.sk===wI)&&(!F1.dad||F1.dad.sk===wI);o.D_wI=wI;o.D_bI=bI;
 S.ap.race=[{r:1,p:50},{r:0,p:50}];const F2=famRand();o.D_mixed=(!F2.dad||F2.dad.sk===bI)&&(!F2.mom||F2.mom.sk===wI);
 S.ap.race=[{r:0,p:100}];S.fam={mode:'random',locked:1,mom:{n:'Mom X',sk:wI,hc:'#333',like:70},dad:{n:'Dad X',sk:6,hc:'#333',like:70},sibs:[],dogs:[],par:'both'};
 famV();o.D_button=!!ui.querySelector('[data-hrmatch]');o.D_untouched=S.fam.dad.sk===6;hrMatchParents();o.D_matched=S.fam.dad.sk===wI&&S.fam.dad.n==='Dad X';
}catch(e){o.err=e.message+' | '+(e.stack||'').split('\n')[1]}return o},j);
out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
