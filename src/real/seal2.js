const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 S=mig(S);
 out.pass1=(()=>{const r=sealCheck(S);return {sealed:r.sealed,restored:r.restored,added:r.added,grew:r.grew,notes:r.notes.slice(0,10)}})();
 out.pass2=(()=>{const r=sealCheck(S);return {sealed:r.sealed,restored:r.restored,added:r.added,grew:r.grew,notes:r.notes.slice(0,10)}})();
 out.pass3=(()=>{const r=sealCheck(S);return {sealed:r.sealed,restored:r.restored,added:r.added,grew:r.grew,notes:r.notes.slice(0,10)}})();
 out.totalCorrections=S.sealFix;
 out.verify=plVerify();
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
