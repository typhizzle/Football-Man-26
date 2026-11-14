// Award ballots show every finalist's season (Tyler 2026-11-14: "Doesn't show all stats"). Fails on V0005.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg,errs}=await H.open({file:process.env.AW_FILE});const j=fs.readFileSync(process.env.AW_SAVE||'/home/claude/specs/tyler-save-snapshot-2026-11-07.json','utf8');
const out=await pg.evaluate(async(j)=>{const o={};try{S=j.trim()[0]=='{'?mig(JSON.parse(j)):await readCode(j);SLOT=1;LASTJ='';
 let shown=0,ovrOnly=[],ballots=0;const before=JSON.stringify(S.law);
 for(const y in (S.law||{})){const A=S.law[y];for(const a in (A.c||{})){ballots++;awPick(+y,a);
  [...ui.querySelectorAll('.row > span > small')].forEach(sm=>{shown++;const t=sm.innerText.split('\n').slice(1).join(' ').trim();if(/^\d+\s*OVR$/.test(t)||!t)ovrOnly.push(A.yr+' '+a+': '+sm.closest('.row').innerText.split('\n')[0])})}}
 o.ballots=ballots;o.finalistsShown=shown;o.A_noOvrOnlyLines=ovrOnly.length===0;o.ovrOnly=ovrOnly.length;o.examples=ovrOnly.slice(0,6);
}catch(e){o.err=e.message}return o},j);out.pageErrors=errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3);console.log(JSON.stringify(out,null,1));await b.close()})();
