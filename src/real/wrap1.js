// No row value anywhere may be taller than one line. Sweep real screens at phone width.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({w:390,h:844,dpr:1});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const bad=[],seen={};
  const sweep=(label)=>{
   let n=0,wrapped=0;
   document.querySelectorAll('.row').forEach(r=>{
    const kids=r.children;if(kids.length<2)return;
    const last=kids[kids.length-1];
    if(last.tagName=='BUTTON'||last.querySelector&&last.querySelector('button'))return;
    const cs=getComputedStyle(last),lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.3;
    n++;
    if(last.getBoundingClientRect().height>lh*1.6){wrapped++;
     if(bad.length<6)bad.push(label+' :: '+(last.textContent||'').trim().slice(0,22))}
   });
   seen[label]=n+' rows, '+wrapped+' wrapped';
  };
  hub();sweep('hub');
  try{rosv();sweep('rosters')}catch(e){}
  try{rosT(1);sweep('one roster')}catch(e){}
  try{lgV();sweep('league office')}catch(e){}
  try{S.stage='col';chub();sweep('college hub: poll + standings')}catch(e){}
  try{shopV('head');sweep('shop')}catch(e){}
  try{WRSEC='head';wardV('cas','');sweep('clothing')}catch(e){}
  return {seen,bad};
 },save);
 Object.keys(o.seen).forEach(k=>console.log(k.padEnd(18),o.seen[k]));
 console.log('\nwrapped values:',o.bad.length?o.bad:'none');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,3));
 await b.close();
})();
