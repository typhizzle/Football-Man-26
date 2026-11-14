const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 // capture every note the seal makes during the real load
 const notes=[];const _c=sealCheck;
 window.sealCheck=function(s,o){const r=_c.apply(this,arguments);
  try{if(r&&r.notes&&r.notes.length)notes.push(...r.notes)}catch(e){}
  try{if(r)out.counts=(out.counts||[]).concat([{restored:r.restored,added:r.added,sealed:r.sealed}])}catch(e){}
  return r};
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 S=mig(S);
 out.notesDuringLoad=notes.slice(0,25);
 out.noteCount=notes.length;
 out.sealFix=S.sealFix;
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
