// Tyler 2026-11-15: the Manling family is now Manny in all saves (names only); generated "Manling" last names stay.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({file:process.env.MN_FILE});const j=fs.readFileSync('/home/claude/specs/simothy-2037.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{const raw=JSON.parse(j);raw.ro['h.5']=raw.ro['h.5']||[];raw.testA={n:'Pete Manling',t:'MVP: P. Manling'};raw.testB={n:'Jordan Manling'};raw.testC={n:'Archer Manling'};raw.testD={n:'Eli Manning',t:'E. Manning'};raw.testE={n:'Colt Manning'};delete raw.manny;
 const s=mig(raw);o.A_pete=s.testA.n==='Pete Manny'&&s.testA.t==='MVP: P. Manny';o.A_archer=s.testC.n==='Archer Manny';o.B_generatedKept=s.testB.n==='Jordan Manling'&&s.testE.n==='Colt Manning';o.A_elijah=s.testD.n==='Elijah Manny'&&s.testD.t==='E. Manny';o.C_legacy=document.documentElement.innerHTML.includes('Elijah Manny|NYG');
 o.C_builtIn=!document.documentElement.innerHTML.includes('Pete Manling')||/MANNY=\[\['Pete Manling'/.test(document.documentElement.innerHTML);o.C_goat=document.documentElement.innerHTML.includes('Pete Manny|IND, DEN');
}catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(out,null,1));await b.close()})();
