const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const info=await pg.evaluate(async(j)=>{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  lhV('sb');
  const txt=document.getElementById('ui').innerText;
  const yrs=(txt.match(/20\d\d season/g)||[]);
  const grab=Y=>{const m=txt.match(new RegExp(Y+' season[^\\n]*\\n([^\\n]*)\\n','m'));return m?m[1]:'(not on screen)'};
  return {yearsShown:yrs.slice(0,14),s2026:grab(2026),s2027:grab(2027),s2028:grab(2028)};
 },save);
 console.log(JSON.stringify(info,null,1));
 // now filter to 2027 using the game's own search and shoot it
 await pg.evaluate(()=>{LHV.q='2027';lhV()});
 await new Promise(r=>setTimeout(r,500));
 await pg.screenshot({path:'/home/claude/real/shot_2027.png'});
 await pg.evaluate(()=>{LHV.q='2026';lhV()});
 await new Promise(r=>setTimeout(r,500));
 await pg.screenshot({path:'/home/claude/real/shot_2026.png'});
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
