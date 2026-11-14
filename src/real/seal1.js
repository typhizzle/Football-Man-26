const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';
 // ---- A. snapshot EXISTING rows before mig runs the seal/recovery ----
 const snapRows=()=>{const o={};for(let i=0;i<(S.T||[]).length;i++){
   const L=(S.ro||{})['h.'+i];if(!Array.isArray(L))continue;
   L.forEach(x=>{if(x&&x.n)(x.h||[]).forEach(h=>{o[x.n+'|'+h[0]]=JSON.stringify(h)})})}
  return o};
 const before=snapRows();
 S=mig(S);taSync(1);
 const after=snapRows();
 // every row that existed before must be byte-identical now
 let changed=0,missing=0;const ex=[];
 Object.keys(before).forEach(k=>{
  if(!(k in after)){missing++;if(ex.length<6)ex.push('GONE '+k)}
  else if(after[k]!==before[k]){changed++;if(ex.length<6)ex.push('CHANGED '+k+' '+before[k]+' -> '+after[k])}});
 out.A_existingRows={had:Object.keys(before).length,now:Object.keys(after).length,
                     altered:changed,disappeared:missing,examples:ex};
 out.A_recovered=S.sealRec;
 out.A_report=sealReport();
 // ---- B. attack it: delete a season, alter another, drop a team ----
 let victim=null;
 for(let i=0;i<S.T.length&&!victim;i++){const L=rost('h.'+i);
  const p=(L||[]).find(x=>x&&x.h&&x.h.length>=4&&SG(x.pos));if(p)victim={p,i}}
 if(!victim){out.B='no victim found';return out}
 const p=victim.p;
 out.B_victim=p.n;
 const killedYear=p.h[1][0], alteredYear=p.h[2][0];
 const origKilled=JSON.stringify(p.h[1]), origAltered=JSON.stringify(p.h[2]);
 p.h.splice(1,1);                       // delete a sealed season outright
 const t=p.h.find(h=>h[0]==alteredYear); t[2]=999999;   // rewrite a sealed season
 const origTm=(p.tm||[]).slice(); p.tm=[];              // erase his team record
 const origPos=p.pos; p.pos='K';                        // change who he is
 out.B_afterAttack={rows:p.h.length,hasKilledYear:p.h.some(h=>h[0]==killedYear),
                    alteredVal:t[2],tm:p.tm,pos:p.pos};
 const res=sealCheck(S);
 const back=p.h.find(h=>h[0]==killedYear), fixed=p.h.find(h=>h[0]==alteredYear);
 out.B_afterSeal={
  killedSeasonRestored: !!back && JSON.stringify(back)===origKilled,
  alteredSeasonRestored: !!fixed && JSON.stringify(fixed)===origAltered,
  teamsRestored: JSON.stringify(p.tm)===JSON.stringify(origTm),
  positionRestored: p.pos===origPos,
  sealCounts:{restored:res.restored,added:res.added},
  correctionsLogged:S.sealFix};
 // ---- C. growth must still be allowed ----
 const futureY=(yrN()||2034)+1;
 p.h.push([futureY,p.h[0][1],1,2,3,4]);
 const res2=sealCheck(S);
 out.C_growthAllowed=p.h.some(h=>h[0]==futureY);
 out.C_growthNotReverted=!!p.h.find(h=>h[0]==futureY&&h[2]===1);
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
