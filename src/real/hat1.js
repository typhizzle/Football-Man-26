// Halloween keepsake: eligibility, no auto-grant, one-time, survives the event ending.
// Also renders every hat for a reference image.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const s=await readCode(j);S=s;SLOT=1;LASTJ='';
  const out={hats:HATS.map(h=>h[0]+' = '+h[1])};
  // ---- eligibility ----
  S.hwd={c:[]};out.eligNoClaims=hwHatElig();        // claimed nothing -> not eligible
  S.hwd={c:[2]};out.eligOneClaim=hwHatElig();       // claimed one     -> eligible
  out.doneBefore=hwHatDone();
  // ---- nothing is granted just by LOOKING ----
  hwHatV();out.afterViewing=S.hwHat||null;
  hwHatSel('witch');out.afterSelecting=S.hwHat||null;   // previewing must not grant
  out.previewVar=HWPICK;
  // ---- only the confirm grants it ----
  hwHatKeep();out.afterConfirm=S.hwHat||null;
  out.doneAfter=hwHatDone();
  // ---- one-time: a second attempt must not change it ----
  HWPICK='skull';hwHatKeep();out.afterSecondAttempt=S.hwHat;
  // ---- button hidden once claimed ----
  out.btnAfterClaim=(hwHatBtn()||'').length;
  S.hwHat=null;out.btnWhenUnclaimed=(hwHatBtn()||'').length>0;
  // ---- a save that never claimed an award gets nothing ----
  S.hwd={c:[]};out.btnIneligible=(hwHatBtn()||'').length;
  return out;
 },save);
 console.log('hats:');o.hats.forEach(h=>console.log('   '+h));
 console.log('\neligible with 0 claims :',o.eligNoClaims,'(must be false)');
 console.log('eligible with 1 claim  :',o.eligOneClaim,'(must be true)');
 console.log('granted by opening     :',o.afterViewing,'(must be null)');
 console.log('granted by previewing  :',o.afterSelecting,'(must be null)  preview held =',o.previewVar);
 console.log('granted by CONFIRM     :',o.afterConfirm);
 console.log('second attempt changes :',o.afterSecondAttempt,'(must stay witch)');
 console.log('button len after claim :',o.btnAfterClaim,'(must be 0)');
 console.log('button shown unclaimed :',o.btnWhenUnclaimed,'(must be true)');
 console.log('button len ineligible  :',o.btnIneligible,'(must be 0)');
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
