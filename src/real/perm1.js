// Nobody gets renamed, nobody gets deleted, and a draft class never changes.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const out={};
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const census=st=>{const m={};Object.keys(st.ro||{}).forEach(k=>{const L=st.ro[k];
    if(Array.isArray(L))L.forEach((x,i)=>{if(x&&x.n)m[k+'#'+i]=x.n})});return m};

  // plant a player who was renamed by the old code, and one that shares a name
  const L0=S.ro['h.1'];
  L0[4].on='Original Guy';L0[4].n='Renamed Guy';
  L0[5].n=L0[6].n;                       // a genuine duplicate
  const dupName=L0[5].n;
  S.nmdup=0;save();zFlush();

  const before=census(S);
  const re=load(1);                      // mig runs here
  const after=census(re);
  out.restoredName=re.ro['h.1'][4].n;              // must be Original Guy
  out.restoredFlagGone=(re.ro['h.1'][4].on===undefined);
  out.duplicateLeftAlone=(re.ro['h.1'][5].n===dupName&&re.ro['h.1'][6].n===dupName);
  out.nobodyElseRenamed=Object.keys(after).filter(k=>after[k]!==before[k]&&k!=='h.1#4').length;
  out.sameHeadcount=(Object.keys(after).length===Object.keys(before).length);

  // load it twice more: nothing may drift
  const a=census(load(1)),c=census(load(1));
  out.stableAcrossLoads=JSON.stringify(a)===JSON.stringify(c);

  // ---- draft classes ----
  S=load(1);SLOT=1;
  const Y=(S.py||0)+2026;
  const c1=lgClass(Y).map(p=>p.n).join('|');
  const c2=lgClass(Y).map(p=>p.n).join('|');
  out.classStableSameSession=(c1===c2);
  out.classFrozenIntoSave=!!(S.clFz&&S.clFz[''+Y]);
  // reload the save and ask again
  S=load(1);SLOT=1;
  const c3=lgClass(Y).map(p=>p.n).join('|');
  out.classStableAfterReload=(c1===c3);
  out.classSize=lgClass(Y).length;
  // a future year is frozen the first time it is looked at too
  const c4=lgClass(Y+3).map(p=>p.n).join('|');S=load(1);SLOT=1;
  out.futureClassStable=(c4===lgClass(Y+3).map(p=>p.n).join('|'));
  out.firstThree=lgClass(Y).slice(0,3).map(p=>p.n);
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(24),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
