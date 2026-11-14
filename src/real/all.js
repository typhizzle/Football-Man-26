// ===== THE GATE =====
// Tyler: "it feels like each update you're going to add new glitches. So that's why I
// need you to test all of this as you go each time to make sure it never fucks up again."
//
// He is right. Two regressions shipped or nearly shipped in one day, and BOTH were found
// by a test rather than by me reading the code:
//   • the label fix over-applied to three already-correct sites — caught by a check that
//     compares every single-club player's last season against his own record (27/27)
//   • recovered seasons being filled with invented numbers — caught only because rb1's
//     idempotency assertion went from true to false
//
// So this runs EVERY harness and prints one PASS/FAIL table. Nothing is published unless
// this is green. Run it as: node /home/claude/real/all.js
//
// Each entry carries a CHECK that can fail. A harness that merely runs without throwing
// proves nothing — the check has to assert the actual invariant.

const {execFileSync}=require('child_process');
const path='/home/claude/real/';

const J=o=>{try{return JSON.parse(o.slice(o.indexOf('{'),o.lastIndexOf('}')+1))}catch(e){return null}};

const TESTS=[
 // ---- the record and the seal ----
 {f:'int1.js',  why:'label + resolver work writes NOTHING to any save',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   if(d.before.hash!==d.after.hash)return 'HASH CHANGED — something wrote to the save';
   if(d.lostCount)return d.lostCount+' player rows lost';
   if(d.newCount)return d.newCount+' player rows appeared';
   return null}},

 {f:'seal1.js', why:'a deleted/altered season, erased teams and changed position all come back; existing rows byte-identical',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   const a=d.A_existingRows||{};
   if(a.altered)return a.altered+' existing rows were ALTERED';
   if(a.disappeared)return a.disappeared+' existing rows DISAPPEARED';
   const b=d.B_afterSeal||{};
   for(const k of ['killedSeasonRestored','alteredSeasonRestored','teamsRestored','positionRestored'])
    if(!b[k])return k+' = false';
   if(!d.C_growthAllowed)return 'growth was blocked';
   if(!d.C_growthNotReverted)return 'a NEW season was reverted — the seal is eating growth';
   return null}},

 {f:'seal2.js', why:'the seal SETTLES: repeat passes make no corrections',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   for(const p of ['pass1','pass2','pass3']){
    const r=d[p]||{};
    if(r.restored||r.added)return p+' still correcting ('+r.restored+'/'+r.added+') — it is fighting the game';
   }
   const v=d.verify||{};
   if((v.awardMismatches||[]).length)return 'award mismatches: '+v.awardMismatches.length;
   if(v.rowsNamingAMissingTeam)return v.rowsNamingAMissingTeam+' rows name a missing team';
   if((v.misfiledRosters||[]).length)return 'misfiled rosters: '+v.misfiledRosters.join(', ');
   return null}},

 {f:'aw1.js',   why:'an erased award and a rewritten past MVP are both restored',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   if(!d.A||!d.A.restoredExactly)return 'player award counts not restored exactly';
   if(!d.B||!d.B.winnerRestored)return 'a past winner was not restored';
   if(!d.B.teamRestored)return "a past winner's team was not restored";
   return null}},

 {f:'aw2.js',   why:"the open ballot stays Tyler's to override, then seals at HIS pick",
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   if(d.openSealed)return 'the CURRENT season was sealed — his override would be blocked';
   if(d.overrideKept!=='Tylers Own Pick')return 'his override did not stick';
   if(!d.nowSealed)return 'a finished season did not seal';
   if(d.afterSealAttempt!=='Tylers Own Pick')return 'a sealed winner was changed';
   return null}},

 // ---- the honest baseline ----
 {f:'pristine1.js', why:'loading the save must not change data the player already owned',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   if(d.playersChecked<800)return 'only '+d.playersChecked+' players checked';
   // KNOWN AND PENDING TYLER'S DECISION: rbRecFill rewrites every RB's history rows on
   // load, inventing receiving yards from a seeded random. 32 players, one per team.
   // Until he rules on it this is tolerated at exactly that count and no more, so a NEW
   // source of history rewriting still fails the gate.
   const KNOWN=32;
   if(d.changesToExistingData>KNOWN)
    return (d.changesToExistingData-KNOWN)+' NEW change(s) to existing data beyond the known RB backfill: '+(d.changes[0]||'');
   if(d.changesToExistingData<KNOWN)
    return 'fewer changes than expected ('+d.changesToExistingData+' vs '+KNOWN+') — if the RB backfill was removed on purpose, lower KNOWN in all.js';
   const a=d.addedByTheLoad||{};
   if(a.sealCorrections)return 'the seal had to make '+a.sealCorrections+' correction(s) on a clean load';
   return null}},

 // ---- labels and identity ----
 {f:'ta1.js',   why:'Axel Jean reads LV; every slot labelled by the club in it; 0 award mismatches',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   if((d.mislabelled||[]).length)return 'mislabelled slots: '+d.mislabelled.join(' | ');
   const axel=(d.axels||[]).find(a=>a.n==='Axel Jean');
   if(!axel)return 'Axel Jean not found';
   if(!axel.resolved||axel.resolved.ab!=='LV')return 'Axel Jean resolves to '+(axel.resolved&&axel.resolved.ab);
   if(!(d.opoy||[]).some(s=>/Axel Jean .* LV/.test(s)))return 'the OPOY ballot does not read Axel Jean · LV';
   const v=d.verify||{};
   if((v.awardMismatches||[]).length)return 'award mismatches: '+v.awardMismatches.length;
   return null}},

 {f:'stg1.js',  why:'team labels unique and non-blank in high school, college and pro',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   for(const st of ['hs','col','pro']){
    const s=d[st];if(!s)return 'no '+st+' result';
    if(s.blanks)return st+': '+s.blanks+' blank labels';
    if(s.dupes)return st+': '+s.dupes+' duplicate labels — two clubs reading as one';
   }
   return null}},

 // ---- the shop ----
 {f:'hw1.js', why:'Halloween keepsake is ONE gift: waits in the menu until picked, never offered again even if browser storage forgets',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   for(const k of ['A_offered','D_stillWaitingAfterLater','B_hidden','B_secondKeepBlocked','B_saveHoldsPick','C_notOfferedAgain','C2_freshDeviceNotOffered','E_bothKept','F_menuWritesNothing'])
    if(d[k]!==true)return k+' = '+d[k];
   return null}},

 {f:'shop1.js', why:'Halloween out of the store; owned costumes, wardrobe and keepsake intact',
  check:o=>{const d=J(o);if(!d)return 'no JSON';
   if(d.err)return d.err;
   if(d.halloweenTab)return 'the Halloween tab is still in the shop';
   if((d.halloweenItemsInStore||[]).length)return 'Halloween items still on sale';
   if(!(d.ownedKept||[]).length)return 'owned costumes were lost';
   if(d.wardrobeStillKnowsThem<13)return 'the wardrobe forgot items ('+d.wardrobeStillKnowsThem+'/13)';
   if(!d.keepsakeStillClaimable)return 'the keepsake is no longer claimable';
   if((d.screenErrors||[]).length)return 'screens threw: '+d.screenErrors.join('; ');
   return null}},

 // ---- the classics: these must not regress ----
 {f:'sweep1.js',why:'16 screens: no dead buttons, no placeholder junk, no wrapped values, nothing throws',
  check:o=>{
   if(!/screens that threw\s+none/.test(o))return 'a screen threw';
   if(!/dead buttons\s+none/.test(o))return 'a dead button';
   if(!/wrapped values\s+none/.test(o))return 'a wrapped value';
   if(!/placeholder junk\s+none/.test(o))return 'placeholder junk';
   if(!/JS ERRORS: \[\]/.test(o))return 'JS errors on load';
   return null}},

 {f:'rb1.js',   why:'RB receiving on the ballot, and the backfill stays idempotent',
  check:o=>{
   if(!/Backfill idempotent: true/.test(o))return 'BACKFILL NOT IDEMPOTENT — something is writing invented numbers';
   if(!/ERRS: \[\]/.test(o))return 'errors reported';
   return null}},

 {f:'mvp1.js',  why:'every Ultra Bowl MVP is on the champion roster',
  check:o=>{
   if(/-> NOT on winner/.test(o))return 'an MVP is not on the champion';
   if(!/ERRS: \[\]/.test(o))return 'errors reported';
   return null}},

 {f:'ub1.js',   why:'no same-conference finals, and corruption self-repairs',
  check:o=>{
   if(!/SAME-CONFERENCE FINALS: NONE/.test(o))return 'a same-conference final exists';
   if(!/ERRS: \[\]/.test(o))return 'errors reported';
   return null}},

 {f:'npx2.js',  why:'draft classes group, order and stay stable',
  check:o=>{const d=J(o);
   if(d&&d.stable===false)return 'draft class is NOT stable';
   if(d&&d.order&&d.order.correct===false)return 'draft class ordering wrong';
   if(!/ERRS: \[\]/.test(o))return 'errors reported';
   return null}},
];

(async()=>{
 const only=process.argv.slice(2);
 const list=only.length?TESTS.filter(t=>only.some(o=>t.f.indexOf(o)>=0)):TESTS;
 const rows=[];let failed=0;
 for(const t of list){
  let out='',err=null;
  const t0=Date.now();
  try{
   out=execFileSync('node',[path+t.f],{encoding:'utf8',timeout:600000,maxBuffer:64*1024*1024});
  }catch(e){
   out=(e.stdout||'')+(e.stderr||'');
   err='harness crashed: '+String(e.message).split('\n')[0];
  }
  if(!err){try{err=t.check(out)}catch(e){err='check threw: '+e.message}}
  const secs=((Date.now()-t0)/1000).toFixed(0);
  rows.push({f:t.f,ok:!err,why:t.why,err,secs});
  if(err)failed++;
  console.log((err?'FAIL  ':'pass  ')+t.f.padEnd(11)+' '+secs+'s'+(err?'   <-- '+err:''));
 }
 console.log('\n'+'='.repeat(72));
 rows.filter(r=>!r.ok).forEach(r=>console.log('FAILED  '+r.f+'\n        expected: '+r.why+'\n        got:      '+r.err));
 console.log('='.repeat(72));
 console.log(failed?('GATE CLOSED — '+failed+' of '+rows.length+' failed. DO NOT PUBLISH.')
                   :('GATE OPEN — all '+rows.length+' passed. Safe to publish.'));
 process.exit(failed?1:0);
})();
