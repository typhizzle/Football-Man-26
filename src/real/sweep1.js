// Glitch hunter: open every screen, look for the defect CLASSES that have bitten before.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({w:390,h:844,dpr:1});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const bad={badText:[],deadButtons:[],wrapped:[],threw:[]};
  const seen={};
  const check=(label)=>{
   const txt=(ui.innerText||ui.textContent||'');
   // 1 - placeholder junk leaking into the UI
   const junk=txt.match(/\b(undefined|NaN|\[object Object\]|null)\b/g);
   if(junk)bad.badText.push(label+' -> '+[...new Set(junk)].join(',')+' x'+junk.length);
   // 2 - buttons with no way to fire (the innerHTML handler-killer class)
   ui.querySelectorAll('button').forEach(btn=>{
    const oc=btn.getAttribute('onclick'),js=btn.onclick;
    if(!oc&&!js)bad.deadButtons.push(label+' -> "'+(btn.textContent||'').trim().slice(0,28)+'"');
   });
   // 3 - a row value on its own line
   ui.querySelectorAll('.row').forEach(r=>{
    const k=r.children;if(k.length<2)return;
    const last=k[k.length-1];if(last.tagName=='BUTTON')return;
    const cs=getComputedStyle(last),lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.3;
    if(last.getBoundingClientRect().height>lh*1.6)
     bad.wrapped.push(label+' -> "'+(last.textContent||'').trim().slice(0,20)+'"');
   });
   seen[label]=txt.length;
  };
  const open=(label,fn)=>{try{fn();check(label)}catch(e){bad.threw.push(label+' -> '+e.message)}};
  open('hub',()=>hub());
  open('rosters',()=>rosv());
  open('one roster',()=>rosT(1));
  open('league office',()=>lgV());
  open('league week',()=>lgWeek(0));
  open('transactions',()=>txV());
  open('shop head',()=>shopV('head'));
  open('shop foot',()=>shopV('foot'));
  open('clothing fits',()=>{WRSEC='fit';wardV('cas','')});
  open('clothing head',()=>{WRSEC='head';wardV('cas','')});
  open('clothing foot',()=>{WRSEC='foot';wardV('cas','')});
  open('phone',()=>phoneV());
  open('keepsake',()=>hwHatV());
  open('main menu',()=>{menu();menuMain()});
  try{const yrs=Object.keys(S.law||{});const py=yrs[yrs.length-1];
   open('award ballot',()=>awPick(py,'OPOY'));
   open('award ballot D',()=>awPick(py,'DPOY'));
  }catch(e){}
  return {screens:Object.keys(seen).length,
          badText:bad.badText.slice(0,10),deadButtons:[...new Set(bad.deadButtons)].slice(0,12),
          wrapped:[...new Set(bad.wrapped)].slice(0,8),threw:bad.threw.slice(0,8)};
 },save);
 console.log('screens opened   ',o.screens);
 console.log('\nplaceholder junk ',o.badText.length?o.badText:'none');
 console.log('\ndead buttons     ',o.deadButtons.length?o.deadButtons:'none');
 console.log('\nwrapped values   ',o.wrapped.length?o.wrapped:'none');
 console.log('\nscreens that threw',o.threw.length?o.threw:'none');
 console.log('\nJS ERRORS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,6));
 await b.close();
})();
