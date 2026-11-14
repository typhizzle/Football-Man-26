const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{const {b,pg}=await H.open({});
const j=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
const r=await pg.evaluate(async(j)=>{const out={};try{
 const s=await readCode(j);S=s;SLOT=1;LASTJ='';S=mig(S);taSync(1);
 out.report=sealReport();
 // --- A. attack a player's award counts ---
 let v=null;
 sealWalk(S,x=>{if(!v&&x.aw&&Object.keys(x.aw).some(k=>x.aw[k]>0))v=x});
 if(!v){out.A='nobody has an award'}else{
  const before=JSON.stringify(v.aw);
  const k0=Object.keys(v.aw).filter(k=>v.aw[k]>0);
  v.aw[k0[0]]=0;                      // take a ring away
  delete v.aw[k0[k0.length-1]];       // erase another award entirely
  const mid=JSON.stringify(v.aw);
  const res=awSealCheck(S);
  out.A={player:v.n,before,afterAttack:mid,afterSeal:JSON.stringify(v.aw),
         restoredExactly:JSON.stringify(v.aw)===before,count:res.restored,notes:res.notes.slice(0,4)};
 }
 // --- B. attack a finished season's winners ---
 const pastKeys=Object.keys(S.law).filter(k=>String(k)!==String(S.py));
 if(!pastKeys.length){out.B='no finished seasons'}else{
  const k=pastKeys[0],A=S.law[k];
  const cat=Object.keys(A.w).find(c=>A.w[c]&&A.w[c].n);
  const realWinner=A.w[cat].n, realTm=A.w[cat].tm;
  A.w[cat].n='Imposter McFake'; A.w[cat].tm='ZZZ';
  const res=lawSealCheck(S);
  out.B={season:k,year:A.yr,category:cat,realWinner,realTm,
         nowShows:A.w[cat].n,nowTm:A.w[cat].tm,
         winnerRestored:A.w[cat].n===realWinner, teamRestored:A.w[cat].tm===realTm,
         count:res.restored,notes:res.notes.slice(0,4)};
 }
 // --- C. the CURRENT season must still be overridable by Tyler ---
 const A2=S.law[S.py];
 if(A2&&A2.w){
  const cat=Object.keys(A2.w).find(c=>A2.w[c]&&A2.w[c].n);
  if(cat){A2.w[cat].n='Tylers Own Pick';lawSealCheck(S);
   out.C={category:cat,overrideKept:A2.w[cat].n==='Tylers Own Pick'}}
 } else out.C='no open ballot';
 out.reportAfter=sealReport();
}catch(e){out.err=e.message+' | '+(e.stack||'').split('\n')[1]}return out},j);
console.log(JSON.stringify(r,null,1));await b.close()})();
