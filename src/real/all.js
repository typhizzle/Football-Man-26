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
 {f:'h100.js', why:'100 OVR only for a season that is the league single-season record; no random 100s',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(d.A_43tdNot100!==true)return 'a 43-TD season (below the record) still made a 100';
   if(d.B_recordSeasonIs100!==true)return 'a record season did NOT make a 100';
   if(!d.C_candidates)return 'no candidates to test random 100s';
   if(d.C_randomHundreds)return d.C_randomHundreds+' random 100s';
   if(d.D_twoStraightNearRecordIs100!==true)return 'three straight near-record seasons did NOT make a 100';
   if(d.E_qb46TwiceIs100!==true)return 'QB with 46+ pass TD three years running did NOT make a 100';
   if(d.F_qbOnlyTwoStraightNot100!==true)return 'two straight near-record seasons made a 100 (needs three)';
   if(d.E_qb46OnceNot100!==true)return 'QB with 46 pass TD once made a 100';
   if(d.D_oneGoodYearNot100!==true)return 'one near-record season after a normal one made a 100';
   return null}},

 {f:'col1.js', why:'made-up colleges rated as the small schools: mostly below the big names, a few above, order kept, nothing else touched',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   for(const t of ['A_mySave','C_newSave']){const n=d[t+'_madeUp'],a=d[t+'_aboveBigMedian'];
    if(!n)return t+': no made-up schools found';if(a>n*.15)return t+': '+a+'/'+n+' above the big-name median';if(a<1)return t+': none above (a few should be)';
    if(d[t+'_max']>80)return t+': max '+d[t+'_max']}
   if(d.A_mySave_orderBroken)return 'pecking order broken '+d.A_mySave_orderBroken;
   if(d.A_mySave_bigChanged)return d.A_mySave_bigChanged+' big-name ratings changed';
   if(d.A_mySave_namesChanged!==false)return 'school names changed';
   if(d.B_runsOnce!==true)return 'rating pass runs more than once';
   return null}},

 {f:'ncl1.js', why:'the draft class screen does not call the first followed class "your class"',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   for(const k of ['A_noYourClass','B_labelledFollowed','C_titleIsThisSeason','D_hasBack'])if(d[k]!==true)return k+' = '+d[k];return null}},

 {f:'ev1.js', why:'no invite spam: studio max 3/season and each song once, Pot McGee 2 (+1 Pro Bowl interview), parties 4',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(d.seasons<10)return 'too few seasons simulated';
   if(d.dupSong)return d.dupSong+' songs recorded twice';if(d.maxStudio>3)return 'studio '+d.maxStudio+' in a season';
   if(d.maxParty>4)return 'parties '+d.maxParty+' in a season';
   if(d.maxPot>2&&!(d.maxPot===3&&d.pbInterview>0))return 'Pot McGee '+d.maxPot+' in a season';
   return null}},

 {f:'aw3.js', why:'every player award count matches League History (only ever raised; shared names untouched); the card shows it',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(d.A_ferretDPOY!==d.A_historyFerret||!d.A_historyFerret)return 'Meters Ferret DPOY '+d.A_ferretDPOY+' vs history '+d.A_historyFerret;
   if(d.B_playersShort)return d.B_playersShort+' awards still short: '+d.B_list.join(', ');
   if(d.C_awardsLowered)return d.C_awardsLowered+' awards LOWERED';
   if(d.D_idempotent!==true)return 'not idempotent';if(d.F_cardShowsDPOY3!==true)return 'career card does not show DPOY x3';
   return null}},

 {f:'aw4.js', why:'award counts agree everywhere: League History, career card, All-time leaders (one line per man)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.rows||!d.rows.length)return 'nothing checked';
   if(d.mismatches)return d.mismatches+' disagreements: '+d.rows.filter(r=>!r.ok).map(r=>r.n+' '+r.k+' hist '+r.history+' rec '+r.record+' card '+r.card+' leaders '+r.leaders).join('; ');
   if(d.screenFerretLines!==1)return 'leaders screen shows Meters Ferret '+d.screenFerretLines+' times';
   return null}},

 {f:'pb1.js', why:'pro playoffs have a real bracket: all 14 seeds with records, every score, the champion',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(d.B_seeds!==14)return 'seeds '+d.B_seeds;if(d.C_games!==13)return 'games '+d.C_games;
   for(const k of ['A_hasBracket','B_allSeedsWithRecord','C_champShown','C_everyScoreShown','D_onScreen'])if(d[k]!==true)return k+' = '+d[k];return null}},

 {f:'nm1.js', why:'no new module reuses a name the game already has (crV, PWC, PWN, AWK all bit us)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(!d.checked)return 'nothing scanned';if(d.clashes.length)return d.clashes.slice(0,4).join('; ');
   const L=d.live||{};for(const k of ['collegeTop25NotCoach','coachHistory','powerConfIsFn','awkHasRing'])if(L[k]!==true)return k+' = '+L[k];return null}},

 {f:'thr1.js', why:'throwing power: his table (99=85 yds, 72=54), HS -15%, college -6.5%, named QBs set, overalls untouched, archetype costs, power/speed never cut',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if((d.pageErrors||[]).length)return 'page errors: '+d.pageErrors[0];
   if(d.A_pro99!==85||d.A_pro72!==54||d.A_pro82!==59)return 'distance curve wrong '+d.A_pro99+'/'+d.A_pro82+'/'+d.A_pro72;
   if(Math.abs(d.A_hs99-72.25)>.2||Math.abs(d.A_col99-79.5)>.2)return 'level scaling wrong '+d.A_hs99+'/'+d.A_col99;
   if(String(d.B_hilton)!=='99,85'||String(d.B_fallon)!=='98,83'||String(d.B_williams)!=='96,77')return 'named QB ratings wrong';
   if((d.B_ovrUnchanged||[]).length)return 'overall changed: '+d.B_ovrUnchanged.join(', ');
   if(d.C_mobile.mob!==3||d.C_mobile.pow!==6||d.C_deep.pow!==3||d.C_deep.mob!==6||d.C_fg.acc!==1||d.C_scr.acc!==3)return 'archetype costs wrong';
   if(Math.abs(d.F_mid-40.4)>1||d.F_full!==85)return 'swipe feel wrong: medium '+d.F_mid+' full '+d.F_full;if(d.F_slingUsesIt!==true)return 'slingshot not on the same distance rule';
   if(d.D_kept!==true)return 'power/speed cut at level change';if(d.E_card!==true)return 'QB card does not show the arm';return null}},

 {f:'sw2.js', why:'m111 swipe intent: swipes that END on a receiver (straight, curved, short; first-person and Flick view) land on him',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if((d.err||[]).length)return d.err[0];if((d.pageErrors||[]).length)return d.pageErrors[0];
   let n=0,ok=0;Object.entries(d.cases||{}).forEach(([k,v])=>{if(/over/.test(k))return;n+=v.n;ok+=v.ok});
   if(n<20)return 'only '+n+' swipes tested';if(ok/n<.85)return ok+'/'+n+' swipes landed on the man they ended on';return null}},

 {f:'st1.js', why:'NO STAT INFLATION: 10 simulated seasons of box scores look like real football; the inflated in-progress season is redone once; closed seasons untouched',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(d.markerSetOnLoad!==true)return 'played-games marker not set on load';if(d.seasonRedone!==true)return 'the inflated in-progress season was not redone';if(d.playedGamesNowRealistic!==true)return 'played games of the inflated season still use the old formula';
   if(d.rush2000_total>3)return d.rush2000_total+' 2,000-yd rushers in 10 seasons';if(d.rushTDlead_max>27)return 'rush TD leader '+d.rushTDlead_max;
   if(d.pass40_perSeason>2)return d.pass40_perSeason+' QBs/season with 40+ pass TD';if(d.pass40_maxOneSeason>4)return d.pass40_maxOneSeason+' QBs with 40+ pass TD in one season (real max 3)';if(d.passTDlead_max>52)return 'pass TD leader '+d.passTDlead_max;
   if(d.rec20_total>3)return d.rec20_total+' 20+ rec TD seasons';if(d.recTDlead_avg>19)return 'rec TD leader avg '+d.recTDlead_avg;
   if(d.rushLead_avg<1400||d.passTDlead_avg<32||d.recYlead_avg<1300)return 'stats DEFLATED too far';return null}},

 {f:'hat1.js', why:'skeleton outfit: No headwear really takes the skull mask off',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_skullWhenNeverChose','B_noSkullWithNoHeadwear'])if(d[k]!==true)return k+' = '+d[k];return null}},

 {f:'bx1.js', why:'every box score adds up: QB completions/yards/TD = what his receivers caught, every game and every season',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.games<300)return 'only '+d.games+' games checked';
   if(d.badCount)return d.badCount+' games/seasons do not add up: '+d.bad[0];if(d.seasonMismatch)return d.seasonMismatch+' teams season totals off';return null}},

 {f:'ctl1.js', why:'controller phase 1: Xbox/PS detection, menu highlight + D-pad + A select + B back, overlays, keyboard takes over, QB stick, A/B/X/Y/RB throws, locker-room walk + look',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if((d.pageErrors||[]).length)return d.pageErrors[0];
   for(const k of ['A_xboxIsXbox','A_padMode','A_highlight','B_movedDown','C_aOpensSettings','D_bGoesBack','E_overlayOpen','E_highlightInOverlay','E_bClosesOverlay','F_keyboardTakesOver','G_ps','H_stickMoves','H_stickReleases','I_throwToA','J_inWalk','J_walks','J_looks','J_stops','K_rbThrows'])
    if(d[k]!==true)return k+' = '+d[k];return null}},

 {f:'br1.js', why:'clothing brands are rivals: one house at a time, only its events, its own celebrities; existing deals untouched',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(!d.B_rivalOffersSeen)return 'no rival offers generated to test against';
   if(d.B_rivalSigned)return d.B_rivalSigned+' rival brands signed you';
   if(!d.E_brandEvents||!d.F_signedOffers||!d.F_unsignedOffers)return 'no events generated to test against';
   for(const k of ['E_rivalEvents','E_wrongCelebrity','F_signedRival','F_signedWrongCel','F_unsignedWrongCel'])if(d[k])return k+' = '+d[k];
   if((d.G_celebsInTwoHouses||[]).length)return 'celebs in two houses: '+d.G_celebsInTwoHouses.join(', ');
   for(const k of ['A_existingDealsUntouched','B_rivalOfferLocked','B_sameBrandStillOk','C_unsignedCanSignAny','D_allMultiYear','H_rivalRenewalRefused','I_screenSaysSigned'])
    if(d[k]!==true)return k+' = '+d[k];
   return null}},

 {f:'cr1.js', why:'every coach has a permanent id and career; seasons recorded with real W-L; retired coaches kept, never removed',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(!d.A_coaches||d.A_withId!==d.A_coaches)return 'coaches without id: '+(d.A_coaches-d.A_withId);
   if(!d.B_seasonsRecorded)return 'no coach seasons recorded';
   if(d.B_missingOrWrong)return d.B_missingOrWrong+' coach seasons missing or wrong W-L';
   for(const k of ['C_retiredStillThere','C_retiredMarked','C_hisSeasonKept','C_replacementHired','D_nobodyRemoved','F_buttonOnCoachScreen','F_listShowsRetired','F_cardShowsSeasonAndExit','H_survivesReload'])
    if(d[k]!==true)return k+' = '+d[k];
   return null}},

 {f:'hp1.js', why:'linemen and kickers get every season recorded (x.hp), sealed row by row, shown on the card; nothing old altered',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   if(!d.A_linemenAndKickers)return 'no linemen/kickers found';
   if(d.A_gotThisSeason!==d.A_linemenAndKickers)return d.A_gotThisSeason+'/'+d.A_linemenAndKickers+' got this season';
   if(d.A_onTheirOwnClub!==d.A_linemenAndKickers)return 'season filed on the wrong club';
   if(d.C_oldRowsLost)return d.C_oldRowsLost+' old rows LOST';
   if(d.C_recordsAltered)return d.C_recordsAltered+' records ALTERED';
   for(const k of ['B_noStatlessRowInH','B_qbsStillRecorded','D_deletedSeasonBack','D_wipedCareerBack','D_twoClubsOneYearBothKept','E_settles','F_linemanCardShowsSeason','F_kickerCardShowsSeason','F_noInventedNumbers','G_firstYrIgnoresHp'])
    if(d[k]!==true)return k+' = '+d[k];
   return null}},

 {f:'hw1.js', why:'Halloween keepsake is ONE gift: waits in the menu until picked, never offered again even if browser storage forgets',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   for(const k of ['A_offered','D_stillWaitingAfterLater','B_hidden','B_secondKeepBlocked','B_saveHoldsPick','C_notOfferedAgain','C2_freshDeviceNotOffered','E_bothKept','F_menuWritesNothing'])
    if(d[k]!==true)return k+' = '+d[k];
   return null}},

 {f:'hw2.js', why:'Halloween keepsake travels with the save code into a brand-new copy (GitHub or a friend phone): offered if never picked, kept and not re-offered if picked',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;
   for(const k of ['A_newCopyOffersTreat','C_notOfferedTwice','C_keepsakeCameWithSave'])if(d[k]!==true)return k+' = '+d[k];
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
