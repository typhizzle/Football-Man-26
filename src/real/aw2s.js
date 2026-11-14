const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 await pg.evaluate(async(j)=>{const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const key=Object.keys(S.law||{}).sort((a,b)=>b-a)[0];
  S.law[key].ldr=0;awAddLeaders(key);
  awPick(key,'OPOY');},save);
 await new Promise(r=>setTimeout(r,500));
 await pg.screenshot({path:'/home/claude/real/shot_opoy.png'});
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
