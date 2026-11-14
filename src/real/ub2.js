const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 await pg.evaluate(async(j)=>{const s=await readCode(j);S=s;SLOT=1;LASTJ='';lhV('sb');
  // scroll to the earliest seasons (bottom of the list) where the wrong ones were
  const u=document.getElementById('ui');u.scrollTop=u.scrollHeight;},save);
 await new Promise(r=>setTimeout(r,600));
 await pg.screenshot({path:'/home/claude/real/shot_ub_bottom.png'});
 await pg.evaluate(()=>{const u=document.getElementById('ui');u.scrollTop=0});
 await new Promise(r=>setTimeout(r,400));
 await pg.screenshot({path:'/home/claude/real/shot_ub_top.png'});
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,5));
 await b.close();
})();
