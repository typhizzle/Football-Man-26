const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 try{S=mig(S)}catch(e){out.migerr=e.message}
 out.stage=S.stage; out.myTeam=S.T[0].n; out.name=S.name;
 taSync(1);
 // 1. every slot's label is the club in that slot
 const wrong=[];
 for(let i=0;i<S.T.length;i++){
  let want=null;try{const pi=pIdx(S.T[i]);want=pi>=0?TA[pi]:null}catch(e){}
  if(want&&TAS[i]!==want)wrong.push(i+': TAS='+TAS[i]+' want='+want);
 }
 out.mislabelled=wrong;
 out.slot0=TAS[0]+' = '+S.T[0].n; out.slot8=TAS[8]+' = '+S.T[8].n; out.slot14=TAS[14]+' = '+S.T[14].n;
 out.audit=roAudit();
 // 2. find Axel Jean and ask the game what club it prints for him
 for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  const p=(L||[]).find(x=>x&&/Axel/.test(x.n));
  if(p){(out.axels=out.axels||[]).push({n:p.n,pos:p.pos,slot:i,slotLabel:TAS[i],team:S.T[i].n,tm:p.tm,rows:(p.h||[]).length,resolved:plTeam(p.n,S.yr)})}}
 // 3. the OPOY ballot as the screen renders it
 try{awFillAll();const A=S.law[S.py]||S.law[Object.keys(S.law).pop()];
  out.opoy=(((A||{}).c||{}).OPOY||[]).slice(0,6).map(z=>z.n+' '+z.pos+' · '+z.tm);}catch(e){out.opoyerr=e.message}
 // 4. nothing was written: every history row still reads the same
 out.verify=plVerify();
 out.rows=0;for(let i=0;i<S.T.length;i++){let L;try{L=rost('h.'+i)}catch(e){continue}
  (L||[]).forEach(x=>{if(x&&x.h)out.rows+=x.h.length});}
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
