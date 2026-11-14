// Test what is ON THE SCREEN, not what a function returns. Open the real Change OPOY
// screen and read the rendered text, exactly as Tyler sees it.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({w:390,h:844,dpr:1});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={};
  const yrs=Object.keys(S.law||{});const py=yrs[yrs.length-1];const A=S.law[py];
  out.year=A.yr;
  // find and open the real override screen the same way the game does
  let opened='';
  for(const fn of ['lawPick','awPick','lawHtml','lawV','awV']){
   if(typeof window[fn]=='function'){try{window[fn](py,'OPOY');opened=fn;break}catch(e){
     try{window[fn](py);opened=fn;break}catch(e2){}}}
  }
  out.openedWith=opened||'none';
  const txt=(ui.innerText||ui.textContent||'');
  out.screenHasChangeOPOY=/OPOY/i.test(txt);
  // THE check: what team is printed next to each man, vs what his record says
  const wrong=[],checked=[];
  (A.c.OPOY||[]).concat(A.c.DPOY||[]).forEach(z=>{
   if(!z||!z.n)return;
   for(let i=0;i<S.T.length;i++){
    let L;try{L=rost('h.'+i)}catch(e){continue}
    const p=(L||[]).find(q=>q&&q.n===z.n);if(!p||!p.h)continue;
    const h=p.h.find(q=>q[0]==A.yr);if(!h)continue;
    const want=TA[h[1]];checked.push(z.n);
    if(z.tm!==want)wrong.push(z.n+': screen says '+z.tm+', record says '+want);
    break;
   }
  });
  out.namesChecked=checked.length;
  out.wrongOnScreen=wrong;
  // and the literal rendered text for the man who started this
  const i=txt.indexOf('Axel Jean');
  out.axelAsRendered=i>=0?txt.slice(i,i+120).replace(/\s+/g,' '):'not on this screen';
  out.screenMentionsHOUnextToAxel=/Axel Jean[^\n]{0,20}HOU/.test(txt);
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(26),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
