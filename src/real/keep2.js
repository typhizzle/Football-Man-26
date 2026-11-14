// The pick is one per ACCOUNT and locks in for every character that CLAIMED during the event.
// Characters that never claimed must get nothing.
const H=require('/home/claude/real/h.js'),fs=require('fs');
(async()=>{
 const {b,pg,errs}=await H.open({});
 const save=fs.readFileSync('/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/saveX.json','utf8');
 const o=await pg.evaluate(async(j)=>{
  const out={};
  try{localStorage.removeItem('fm_hwkeep');localStorage.removeItem('fm_hwx2')}catch(e){}
  const base=await readCode(j);
  const mk=(slot,name,claimed)=>{const d=JSON.parse(JSON.stringify(base));d.name=name;
   if(claimed)d.hwd={c:[0]};else delete d.hwd;
   delete d.hwHat;delete d.hwHats;SLOT=slot;S=d;LASTJ='';save();zFlush()};
  mk(1,'Claimed One',true);
  mk(2,'Never Claimed',false);
  mk(3,'Claimed Two',true);
  SLOT=1;S=load(1);LASTJ='';

  out.eligible=hwkElig().map(x=>x.n);          // only the two that claimed
  out.picksLeft=hwPicksLeft();

  hwkOpen(0);hwkShow();HWKI=1;HWPICK=hwHatList()[1][0];
  const want=HWPICK;hwkKeep();
  out.picked=want;

  out.slot1=hwHats(load(1)).join(',');          // gets it
  out.slot2=hwHats(load(2)).join(',');          // must be EMPTY
  out.slot3=hwHats(load(3)).join(',');          // gets it
  out.sameForAllClaimers=(out.slot1===want&&out.slot3===want);
  out.nonClaimerGetsNothing=(out.slot2==='');
  out.picksLeftAfter=hwPicksLeft();
  out.barGone=(hwkBar()==='');

  // a character loaded LATER who claimed also picks it up
  const d4=JSON.parse(JSON.stringify(base));d4.name='Late Claimer';d4.hwd={c:[2]};
  delete d4.hwHat;delete d4.hwHats;SLOT=4;S=d4;LASTJ='';save();zFlush();
  out.lateClaimer=hwHats(load(4)).join(',');
  out.lateClaimerGetsIt=(out.lateClaimer===want);
  // and one loaded later who did NOT claim stays empty
  const d5=JSON.parse(JSON.stringify(base));d5.name='Late Skipper';delete d5.hwd;
  delete d5.hwHat;delete d5.hwHats;SLOT=5;S=d5;LASTJ='';save();zFlush();
  out.lateSkipper=hwHats(load(5)).join(',');
  out.lateSkipperEmpty=(out.lateSkipper==='');

  // the headwear list only offers it to a claimer
  SLOT=2;S=load(2);out.skipperHeadList=hdOpts().length;
  SLOT=1;S=load(1);out.claimerHeadList=hdOpts().length;

  // second pick via the phrase, and it must also fan out to claimers only
  impScreen();$('#xc').value='TYPHIZZLE2';await impS(1);
  out.leftAfterGrant=hwPicksLeft();
  hwkOpen(0);hwkShow();HWKI=4;HWPICK=hwHatList()[4][0];const w2=HWPICK;hwkKeep();
  out.slot1Both=hwHats(load(1)).join(',');
  out.slot3Both=hwHats(load(3)).join(',');
  out.slot2StillEmpty=(hwHats(load(2)).join(',')==='');
  out.bothKept=(out.slot1Both===want+','+w2);
  return out;
 },save);
 Object.keys(o).forEach(k=>console.log(k.padEnd(22),JSON.stringify(o[k])));
 console.log('ERRS:',errs.filter(e=>!/ERR_FAILED/.test(e)).slice(0,4));
 await b.close();
})();
