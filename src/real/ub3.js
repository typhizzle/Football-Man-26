const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const info=await pg.evaluate(async(j)=>{const s=await readCode(j);S=s;SLOT=1;LASTJ='';lhV('sb');
  // find the DOM block containing the 2028 season and scroll it into view
  const u=document.getElementById('ui');
  const blocks=[...u.querySelectorAll('div')].filter(d=>/2028 season/.test(d.textContent)&&d.children.length<6);
  if(blocks.length){const t=blocks[blocks.length-1];u.scrollTop=Math.max(0,t.offsetTop-40)}
  return {scroll:u.scrollTop,found:blocks.length};},save);
 await new Promise(r=>setTimeout(r,600));
 await pg.screenshot({path:'/home/claude/real/shot_ub_fixed.png'});
 console.log(JSON.stringify(info),'ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
