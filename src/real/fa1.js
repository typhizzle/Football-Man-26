// Inspect the real free-agent pool in Tyler's save
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const r=await pg.evaluate(async(j)=>{
  try{
   const s=await readCode(j);
   S=s;SLOT=1;LASTJ='';save();
   const out={stage:S.stage,yr:(typeof yrN=='function'?yrN():null),
    ofs:S.ofs?{w:S.ofs.w,recs:(S.ofs.recs||[]).length}:null,
    lgPh:S.lgPh||null,
    roFaLen:(S.ro&&Array.isArray(S.ro.fa))?S.ro.fa.length:'NOT-ARRAY',
    offFA:(typeof offFA=='function')?offFA():null,
    poolLen:null,poolSample:[]};
   try{const P=faPool();out.poolLen=P.length;out.poolSample=P.slice(0,8).map(p=>p.n+' '+p.pos+' '+p.ovr)}catch(e){out.poolErr=String(e)}
   try{out.roFaSample=(S.ro.fa||[]).slice(0,8).map(p=>p.n+' '+p.pos+' '+p.ovr)}catch(e){}
   return out;
  }catch(e){return{err:String(e)}}
 },save);
 console.log(JSON.stringify(r,null,1));
 console.log('ERRS:',errs.slice(0,5));
 await b.close();
})();
