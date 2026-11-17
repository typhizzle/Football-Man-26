// AGES MOVE WITH THE YEARS (Tyler 2026-11-17): a real player's age = his 2026 age + seasons since 2026 (Gafford 37 in 2026 -> 48 in 2037),
// ages only go up, your own age is untouched, and a new season makes everyone one year older.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});const j=fs.readFileSync('/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const r=await pg.evaluate(async(j)=>{const o={};try{S=await readCode(j);SLOT=1;LASTJ='';const Y=yrN(),me=S.age;let gf=null;Object.keys(S.ro).forEach(k=>(S.ro[k]||[]).forEach(x=>{if(x&&x.n==='Matty Gafford')gf=x}));
 if(gf)gf.age=30;S.agefx2=0;ageFix(S);o.Y=Y;o.A_gafford=!gf||gf.age===37+(Y-2026);o.B_meSame=S.age===me;const a0=gf&&gf.age;ageFix(S);o.C_once=!gf||gf.age===a0;
 }catch(e){o.err=e.message}return o},j);console.log(JSON.stringify(r));await b.close()})();
