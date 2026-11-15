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
 {f:'cl1.js', why:'CLOUD SAVES: a save bigger than one cloud document uploads in pieces, restores exactly (same week, same save), short codes work, failures are shown, old backups still load',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if((d.pageErrors||[]).length)return d.pageErrors[0];
   for(const k of ['A_uploaded','A_noWarning','B_restored','B_sameWeek','B_sameTs','B_padKept','B_rostersBack','C_shortCodeLoads','D_failureShown','E_oldFormatLoads'])if(d[k]!==true)return k+' = '+d[k];
   if(!(d.A_pieces>1))return 'test save did not need pieces';if(d.A_biggestDocKB>250)return 'a cloud piece is '+d.A_biggestDocKB+' KB';return null}},

 {f:'bk1.js', why:'restore an earlier save: menu button, lists backups, restores, stamps it now, nothing deleted',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_buttonOnMenu','B_listsBoth','C_restored','C_stampedNow','D_nothingLost'])if(d[k]!==true)return k+' = '+d[k];return null}},

 {f:'kp1.js', why:'A SAVE NEVER GOES BACKWARDS: replays the year-8 loss (2036 saved, older 2035 written over it): furthest copy kept, menu warns, restore brings 2036 back, season-end kept, same after an update, no false alarms, no slower saves',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_furthestKept','B_menuWarns','C_restoreListsIt','C_restored','C_olderKeptToo','C_warningGone','D_seasonEndKept','E_sameAfterUpdate','F_noFalseAlarm'])if(d[k]!==true)return k+' = '+d[k];if(!(d.G_msPerSave<120))return 'saves slower: '+d.G_msPerSave+'ms';if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'pl2.js', why:'A CARD ONLY LISTS CLUBS A PLAYER REALLY PLAYED FOR: every card checked against his seasons since 2022, the moves log and his club now (Meters Ferret never KC); save untouched',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.A_ferretNoKC!==true)return 'Ferret card: '+d.A_ferretCard;if(d.B_unrecordedClubsShown!==0)return d.B_unrecordedClubsShown+' cards show a club never played for, e.g. '+(d.B_examples||[])[0];if(d.C_currentClubMissing!==0)return d.C_currentClubMissing+' cards miss the current club';if(d.D_saveUntouched!==true)return 'save changed';if(!(d.cards>700))return 'only '+d.cards+' cards rendered';if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'pc1.js', why:'HIGH SCHOOL AND COLLEGE CAREERS KEPT LIKE THE PROS: every player gets each season (club, class, box-score stats), seniors graduate on the record (never erased), committed grads arrive at their college with the same id, college classes move up, nobody removed, survives reload',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_allHaveSeason','B_seniorsKept','B_commitWritten','C_noDuplicate','D_allThere','D_freshmen','E_cardShowsHS','F_allHaveSeason','F_movedUp','F_seniorsLeftOnRecord','F_nobodyRemoved','G_survivesReload'])if(d[k]!==true)return k+' = '+d[k];if(d.A_wrongClub||d.A_wrongStats)return 'wrong club/stats '+d.A_wrongClub+'/'+d.A_wrongStats;if(!(d.sizeZ<120000))return 'record too big '+d.sizeZ;if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'aw5.js', why:'award ballots show every finalist\'s season, never just "99 OVR" (Tyler screenshot 2026-11-14)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.A_noOvrOnlyLines!==true)return d.ovrOnly+' finalists show only OVR, e.g. '+(d.examples||[])[0];if(!(d.finalistsShown>20))return 'only '+d.finalistsShown+' finalists';return null}},

 {f:'sim1.js', why:'NOBODY OWNS THE SIM: 8 simmed seasons from Tyler\'s 99 OVR save: at least 3 different MVPs, nobody wins more than 6 of 8 (the best can win a lot, not all), the 55-TD record beatable but very rare (56+ at most once in 8), you lead passing TDs at most 6 of 8',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.distinct<3)return 'only '+d.distinct+' MVP winners: '+JSON.stringify(d.mvps);if(d.maxShare>6)return 'one man won '+d.maxShare+' of 8: '+JSON.stringify(d.mvps);if(d.seasons&&d.seasons.filter(z=>Math.max(z.me,z.top)>=56).length>=2)return 'record-breaking (56+) seasons twice in 8: too easy';if(d.meLed>6)return 'you led passing TDs '+d.meLed+' of 8 seasons';if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'dr1.js', why:'COLLEGE TO THE PROS: your draft board is the real college players leaving school, each drafted one joins the team that took him with the same id, his pro card shows his college seasons, undrafted ones stay on the record, and the next pro draft is real college players too',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_boardIsReal','A_ratingsKept','B_allThere','C_cardsShowCollege','D_undraftedRecorded','E_classIsReal'])if(d[k]!==true)return k+' = '+d[k]+(d.badCards?' :: '+d.badCards.join(' || '):'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'sb1.js', why:'the Ultra Bowl MVP ballot is one real box score of the final (one QB, receivers within his yards, all from the champion) and QB rushing TDs fit the QB (Tyler: two QBs / Ham Luther 19 rush TD)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_allChampion','A_oneQB','A_recWithinQB','A_allFromTheGame','A_winnerOnBallot','B_qbRushOk'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'ps1.js', why:'THROWING POWER + SPEED ONLY FALL TO AGE: 4 rough stretches cost exactly 1 OVR each but leave power and speed alone, max 4 a season, hot stretch +1 without them, a 100 still loses its 100, age regression from 36',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_powSame||!d.A_mobSame)return 'rough stretch moved power/speed';if(!d.A_eachCost1)return 'rough stretch cost '+d.A_steps;if(!d.A_otherDropped)return 'overall not down 4';if(!d.A_msg)return 'message does not say power/speed untouched';if(!d.B_max4)return '5th rough stretch counted';if(!d.C_hotUp1||!d.C_powMobSame)return 'hot stretch wrong';if(!d.D_lost100||!d.D_powMob100)return '100 rule broken';if(!d.E_age36hits)return 'age regression not at 36';if(d.F_lastGame!==true)return 'last game grade not remembered (talk shows)';return null}},
 {f:'nl1.js', why:'NIGHT LIST: Frank Castle -> Deep passer (same overall, once, nobody else), Halloween costumes off fancy events + Equip everywhere button, fans up AND down by popularity with a 9B cap and real numbers, sponsorships off/meter/GSPN, Pot McGee week 2 only in season, fumbles rare and by carrying (QB 65 ~2-4.5 a season, 80 <=2, 99 almost never; backs/receivers <=0.35 a game), skeleton suit keeps hair',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-F]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ');
   if(!(d.E_season65>=2&&d.E_season65<=4.5))return 'QB carrying 65 fumbles '+d.E_season65+' a season';if(!(d.E_season80<=2))return 'QB carrying 80 fumbles '+d.E_season80+' a season';if(!(d.E_season99<0.1))return 'QB carrying 99 fumbles '+d.E_season99+' a season';if(!(d.E_otherPerGame<=0.35))return 'backs/receivers fumble '+d.E_otherPerGame+' a game';if(!(d.E_sim65>.08&&d.E_sim65<.3))return 'sim fumble rate at 65: '+d.E_sim65;if(d.E_sim99>.01)return 'sim fumble rate at 99: '+d.E_sim99;return null}},
 {f:'dsw1.js', why:'DEEP SWIPE NEVER DUMPS TO THE BACK: aiming 30 yds downfield picks the deep man over a back on the line, short/backward aims still go to the back, the nearest-man fallback skips backs on deep balls; FLIRT WITH MIA on every question she asks (single, college/pro), flirting returns to the question, not when taken',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-E]_/.test(k)&&d[k]===false);return bad.length?'failed: '+bad.join(', '):null}},
 {f:'acc1.js', why:'ACCURACY MOVES SEASON TO SEASON: a bad season costs 2-3, max -6 / +3 per level, under 60 passes ignored, new level resets to trained, a 100 OVR is never touched, old seasons not re-judged',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-F]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ');if(d.G_rtgSane!==102)return 'passer rating formula off: '+d.G_rtgSane;return null}},
 {f:'clk1.js', why:'WATCHED DRIVE = SIMULATED CLOCK: each watched play runs the clock its simulated play used (not equal slices), same total as simulating',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!(d.tried>=10))return 'too few drives';if(!d.A_perPlay)return 'watched plays do not use their own simulated time ('+d.ok+'/'+d.tried+')';if(!d.B_notEqualSlices)return 'still equal slices';if(!d.C_totalSameAsSim)return 'total differs from the sim';return null}},
 {f:'xpl1.js', why:'EXTRA POINT LINES UP: after a touchdown both teams line up at the line for the kick (not where the TD play left them), the kick plays out and the score moves by 0 or 1',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-C]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'hr1.js', why:'SKIN BY HERITAGE: tones named by heritage (no light/dark), Heritage builder (newest fills the rest, 25/25/25/25 works, never over 100), blend/shade/own colour worn everywhere and kept after edit + reload, new parents match (one heritage both, mixed dad first/mom second), existing family only by button and only skin',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-D]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'k100.js', why:'KEEPING 100 OVR: under 36 3 straight C+ games / 4 straight losses / <4,800 yds or <35 TD lose it; 36+ 2 / 3 / 5,000 + 45; age regression never touches a 100 (real offseason at 40); no new 100 at 36+; win back = 99s + Ultra Bowl + MVP after the loss, a season you were not 100 for is not judged, partial seasons are prorated, the upgrade screen shows the checklist + streaks; version 0009',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-I]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'pt1.js', why:'POTENTIAL: hidden (?) until you study him (card button, 3 a week, then next week), roster hides it, CPU teams know ~1/3 exactly and guess the rest within 10 (stable per team, teams differ), potential stays put as he ages, new saves roll new potentials',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-F]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'pace1.js', why:'ONE CLOCK SPEED IN YOUR GAME: at your pace (50 s a play) the other team\'s drives, Sim to the end and the injured-QB sim all use that same pace (no ~41 s cap), your pace carries over from earlier games, CPU games unchanged; AWAY WHITES: away numbers jersey-sized so the white shows, home unchanged',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-D]_(same|reset|fromSave|learned|cpu|awaySmall|homeSame|awayWhite)$/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ')+' '+JSON.stringify(d).slice(0,300);return null}},
 {f:'pm1.js', why:'THROW POWER + SPEED BY AGE: untouched before 36; at 36 from 99s power 96 / speed 94 / the rest 97 with a message; at 45 power never over 85, speed never over 67; trainable up to those ceilings; a 100 never touched; from 99s one birthday lands the overall on Tyler\'s list (45:80, 46:70, 48:60, 50:50), the rest train to their share',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-F]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ')+' '+(d.B||'')+' '+(d.C||'')+' '+(d.F_ovr||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'sv1.js', why:'SAVES NEVER LOOK GONE: while the cloud check runs the menu shows a spinning Loading card and empty-looking slots say loading and cannot be tapped; a cloud-only save (Bronny James) shows when it arrives; a different career in the cloud is kept in Recently deleted before being replaced; Recently deleted keeps 5 (6th pushes out the oldest) and survives the phone storage being wiped (IndexedDB + cloud)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-D]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ')+' '+(d.D_names||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'swx1.js', why:'SWIPE FIX (Tyler: a hard swipe left went right, throwaways, the 2-point flick to the back): the deep fix never changes a pick when your finger let go above the horizon and never sends it across the field; a flick toward the back goes to him even when it overshoots (All-22, 2-point try); letting go past the sideline throws it out of bounds',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_noGroundNoChange','A_leftStaysLeft','A_neverAcross','B_toBack','C_outLeft'])if(d[k]!==true)return k+' = '+d[k]+' '+(d.B_throws||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'mia1.js', why:'MIA AT 90: the flirt button counts to 90, under 90 she will not consider it, at 90+ she still says no about 3 times in 4 because she really likes you but does not date players',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_label','A_under90','B_mostlyNo','B_reason'])if(d[k]!==true)return k+' = '+d[k]+' (no share '+d.B_noShare+')';return null}},
 {f:'fs1.js', why:'FULL STATISTICS: one button on the pro and college menus replaces the separate stats buttons; it lists career stats, league stats & leaders, all-time leaders, the record book, awards / Heisman watch, GOAT & legacy, league history, and every one opens',
  check:o=>{const d=J(o);if(!d)return 'no JSON';for(const f of ['simothy-2037.json','col-save-2026.json']){const x=d[f];if(!x)return 'no '+f;if(x.err)return x.err;for(const k of ['one','goneFromMenu','hasAll','allOpen'])if(x[k]!==true)return f+' '+k+' '+(x.errs||x.list||'')}if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'clk3.js', why:'CLOCK EVERY PLAY: a watched field goal moves the clock while it is in the air (no freeze-then-jump), a watched play runs at your own play speed; college last 2 minutes: the clock starts again once you are set at the line after a first down',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_kickMoves','B_atRate','C_runsAtLine'])if(d[k]!==true)return k+' = '+d[k]+' '+(d.A_seen||'')+' / '+(d.B_seen||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'fa1.js', why:'FREE AGENTS: all 21 in a new career pool; the existing-QB screen lists the 11 free-agent QBs; 2-4 explained offers; signing puts him on that team, the starter stays, nobody on any roster disappears, he leaves the pool and the other 20 stay; GSPN story; previous NFL teams on his card with no made-up stats or awards; old saves get them once; saves past 2028 do not',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_all21','A_tyreek','B_section','B_all11','C_count','C_explained','C_shown','D_onTeam','D_rating','D_notFA','D_nobodyLost','D_starterStays','D_faPoolKept','E_gspn','E_noAwards','E_card','F_once','F_lateSaveNone'])if(d[k]!==true)return k+' = '+d[k]+' '+(d.D_lost||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'tl1.js', why:'Ham Luther 2036 lowered to 2 rush TD (only that row, seal agrees, stays after reload), simmed games give 1/3 the training points, instant starter, ratings card shows throwing power without the Coleridge -1',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_lowered','A_sealMatches','A_nothingElseChanged','A_staysAfterReload','A_ballotText','B_third','C_offBenched','C_buttonShown','C_onStarts','D_throwPower','D_noColeridgeMinus'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'dw1.js', why:'every draft is listed and watchable from its real picks, offered live when it happens; Goatie\'s roster + Yeezers',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_allListed','B_boardIsReal','C_watching','D_liveOffered','D_goneOnceSeen','E_goatie','E_yeezers','F_fixedOnLoad','G_tommyMost'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'ft1.js', why:'former teammates from the real records: every pro who shared a club and a year with you is tagged (and nobody else), his card says so; locker room + home buttons sit under Play/Sim in blue',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_allFound','A_noneWrong','B_cardTag','C_underPlaySim','C_blue'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'gen1.js', why:'every draft prospect has a high school + college career (new players only), better picks had better college seasons, the board and his card show it, fixed after reload',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_allHaveCareer','B_betterPicksBetterStats','C_boardShows','D_cardShows','E_noneForExisting','F_survivesReload'])if(d[k]!==true)return k+' = '+JSON.stringify(d[k])+' '+JSON.stringify(d.B_earlyVsLate||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'fc1.js', why:'one card, a whole career: every recorded season in order (HS, college, pro), awards on the right seasons, Ultra Bowl titles, old split lists replaced, save untouched',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_card','A_oldListsGone','A_dpoyOnRightSeasons','A_allSeasons','B_championYear','C_saveUntouched'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'cm1.js', why:'coaches move between levels in NEW saves only (a winning college coach to a pro opening, on his record, his school replaces him); existing saves never',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_existingUntouched','B_movedUp','B_recordSaysSo','B_schoolReplaced'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'tc1.js', why:'play as an existing college QB: button on the new-career screen, any college starter, his school/class/rating at week 1, the season plays on',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_button','A_list','B_name','B_school','B_class','B_rating','B_notInHisOwnRoom','C_week1','C_simmed','C_hub'])if(d[k]!==true)return k+' = '+d[k];if(d.B_stage!=='col')return 'stage '+d.B_stage;if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'pg1.js', why:'pro calendar 23 + 8 x 3.625 = 52 weeks (Pro Bowl week between the Conference Championship and the Ultra Bowl), pregnancy hidden 2 weeks then told, birth at 39+ weeks across seasons, offseason conception, 15% / 0.1% rolls, one pregnancy at a time, she can say no',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_calendar','B_noDoubleCount','B_pbw','C_yearIs52','D_hiddenAfter1wk','D_toldAt2wks','E_born','E_at39','F_offseasonDiscovery','F_bornFromOffseason','G_tryRate15','G_notTrying','H_onePregnancy','I_canSayNo'])if(d[k]!==true)return k+' = '+d[k];if(d.B_offseasonSteps!==8)return 'offseason steps '+d.B_offseasonSteps;if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'kd1.js', why:'raising kids: ages on the clock, ~33% pro talent, interest you can raise but not force, sons any sport / daughters women\'s sports (no football), football = QB, nudging works, HS rating grows, real draft with a record, other pro careers or a job',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_third','B_age14','C_decided','C_catchRaises','C_cardShows','D_canSayNo','G_noGirlsFootball','G_nudgeWorks','G_footballIsQB','H_jobs','H_starsGoPro','E_grows','F_inDraftClass','F_hasRecord'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'wo1.js', why:'the Woo-hoo scene runs in the 3D home (figures on the bed with censor bars) and puts everything back',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_sceneShown','A_meshesHidden','B_cleanedUp'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];if(!d.C_nameTags)return 'no name tags over them';if(!d.C_mySkin||!d.C_herSkin)return 'skin tones are not their own';if(!d.C_myHair||!d.C_herHair)return 'hair colours are not their own';return null}},

 {f:'gs1.js', why:'your games record who really had the ball: a catch goes to the receiver who made it, a carry to the back who ran it, the box score uses only those plays, season stats add them up (Tyler: inflated catches/carries)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_catch','B_carry','C_onlyRealCatches','C_onlyRealCarries','C_seasonCounts'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];if(d.D_scrambleCounted!==true)return 'your scramble was not counted as one carry (got '+d.D_qcar+')';if(d.D_boxReal!==true)return 'box score QB carries not real: '+d.D_boxQB;if(d.E_stored!==true)return 'whole game: box score not stored from real plays';if(d.E_boxMatchesPlays!==true)return 'whole game: box score differs from the plays: '+d.E_why;if(d.E_seasonAddsExactly!==true)return 'whole game: season stats did not add exactly: '+d.E_swhy;return null}},
 {f:'pb2.js', why:'Pro Bowl voting: your votes count (10 a week), closes after week 17, All-Star rosters per conference, Pro Bowl week for everyone with the game, Ultra Bowl players replaced but still Pro Bowlers, on their record',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_button','B_votesCount','B_weeklyLimit','C_closed','C_rosters','D_pbwHappened','D_game','D_replaced','E_cardShows'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},

 {f:'cl2.js', why:'THE CLOUD NEVER REPLACES A SAVE ON THE DEVICE: it asks; empty slots still come back; the device copy is always kept',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_deviceKept','B_asks','C_keepStaysKept','D_emptySlotRestored','E_useCloud','E_deviceKeptAsBackup'])if(d[k]!==true)return k+' = '+d[k];return null}},

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
   if(d.rush2000_total>3)return d.rush2000_total+' 2,000-yd rushers in 10 seasons';{if(!Array.isArray(d.seasonList))return 'no per-season list';const brk=d.seasonList.filter(z=>z.rushTDlead>28).length;if(brk>=2||d.rushTDlead_max>34)return 'rush TD record (28) broken '+brk+' times in 10 seasons, max '+d.rushTDlead_max+' (too easy)'}   /* Tyler: records beatable, very rare */
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

 {f:'hm1.js', why:'home and away jerseys: half the games at home, exactly one team in white, no clashes, Dallas white at home and in colors on the road (the opposite of everyone), better seed home in playoffs',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.A_games<300)return 'too few games';
   if(d.A_homeShare<.4||d.A_homeShare>.6)return 'home share '+d.A_homeShare;if(d.B_exactlyOneInWhite<.98)return 'one-in-white '+d.B_exactlyOneInWhite;if(d.C_clashes)return d.C_clashes+' jersey clashes';
   for(const k of ['E_dallasHomeWhite','E_dallasRoadColors','F_topSeedHome','F_lowerSeedAway','G_tossAwayWhite','G_tossHomeColours'])if(d[k]!==true)return k+' = '+d[k];return null}},

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
