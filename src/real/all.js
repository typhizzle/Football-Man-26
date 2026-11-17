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
 {f:'cq1.js', why:'CLOUD NEVER FILLS: a save that shrinks leaves no leftover pieces; a full cloud cleans deleted slots and leftovers and the backup goes through; if it is still full the player gets one calm note (game safe on the phone), never the scary failure',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_cleaned','B_wentThrough','B_deletedSlotGone','C_calm'])if(d[k]!==true)return k+' = '+d[k]+' '+(d.A_pieces||'')+' '+(d.B_err||'');return null}},
 {f:'ra1.js', why:'NEW PRO PLAYERS + QB NEEDS + COLLEGE: a 2026 save gets all 21 on their real teams once (displaced players to free agency, nobody lost, real draft info, no made-up seasons); a 2037 save is left alone; a new save builds them in; Tyler\'s 2026 QB grades; needy teams take an elite QB, B+ teams under 15%; the yearly rivalries are on every schedule (12 games max); NYPD joins the Penitentiary\'s conference; Wide Receiver U is mid with 88+ receivers',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;const bad=Object.keys(d).filter(k=>/^[A-F]_/.test(k)&&d[k]===false);if(bad.length)return 'failed: '+bad.join(', ')+' '+(d.E_miss||'')+' '+(d.A_lost||'');if(d.F_ok!==true)return 'WRU '+d.F_wru;if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'rtx1.js', why:'RETIREMENTS: a 98 OVR QB at 38 retires about 1 year in 100 (an average QB unchanged); retired players can be brought back up to 3 seasons later (2 if 41+), to their last team, older and a bit rusty, with nobody removed',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_starRare','A_avgSame','B_rules','B_back','C_list','D_most','E_back','E_oldStays','E_once','F_full45','F_capped'])if(d[k]!==true)return k+' = '+d[k]+' '+(d.B_window||'')+' star '+d.A_star38;return null}},
 {f:'mn1.js', why:'MANLING -> MANNY: Pete Manling / P. Manling / Archer Manling become Manny in saves and built-in records; generated players named Manling keep it',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_pete','A_archer','A_elijah','B_generatedKept','C_builtIn','C_goat','C_legacy'])if(d[k]!==true)return k+' = '+d[k];return null}},
 {f:'dt1.js', why:'Draft-day trades: about 2-5 in round 1 and 12-28 overall in the league draft, never forced, the team moving up picks earlier; your own draft trades too, no pick made twice',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.colErr)return d.colErr;for(const k of ['A_rd1Range','B_allRange','C_notForced','D_tradesMoveUp','E_all224Picks','F_inLog','G_colTrades','G_colRd1More1','H_noDoublePicks','I_watchShowsTrade'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'sd1.js', why:'Sideline: both benches stand on the sidelines; a watched drive defaults to your eyes on the sideline, third person shows you from behind, TV is TV; the clock moves the same in every view; the joystick walks you along the sideline (never onto the field); the camera button cycles views and goes back after the drive',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_benches','A_meHidden','B_default','B_onSideline','B_coach','C_sameClock','D_tvIsTv','D_meVisible','D_behind','E_moved','E_staysOff','F_cycles','F_backNormal'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'ctl2.js', why:'Controller polish: picking a play category puts the highlight on its plays, a redraw keeps the highlight in place, watching a drive the left stick walks / Y changes view / A does not skip / X skips, View button changes camera',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_onCard','B_stays','C_walk','C_stops','C_yView','C_legend','C_aDoesNotSkip','C_xSkips','D_viewCam'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'wk1.js', why:'Controller everywhere (Mac pad names too): every walkable place (locker room, home, field, graduation, party, gala, celebrity room, studio, Pot) walks with the stick, turns with the right stick, A next to someone does something; push right = turn right on walks, the sideline and first-person; B leaves (locker room: player menu)',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.problems)return d.problems;for(const k of ['A_macXbox','A_macPS','A_chromeMac','B_allWalkable','C_walkTurnsRight','C_sidelineTurnsRight','D_qbLooks','E_bLeaves'])if(d[k]!==true)return k+' = '+d[k];if(d.places<9)return 'only '+d.places+' places';if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'cl7.js', why:"SAVES CAN'T GO MISSING (Tyler's real cloud, 2026-11-15): a slot shows 'checking your cloud backup' while loading; a cloud copy with a broken piece shows a warning + Try again and is never 'New career'; this device's backup copy fills in broken rosters (and says so); a cut-off backup leaves the old copy whole; old pieces cleared after a good backup; old-format saves still load; restores stored compressed",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_loadingShown','A_three','A_simmonsWarned','A_notNewCareer','E_compressed','B_loaded','B_careerIsNewest','B_told','C_oldIntact','C_noJunk','D_new','D_onlyCurrentPieces','E_oldFormat','F_retry'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'rs1.js', why:"Tyler's real Simmons save: QBs back from retirement start (MaClones, Fallon) with nobody dropped and you never benched; a season-start copy is kept and Restart this season goes back to it (current kept); no copy -> says so and changes nothing; a pro career with no rosters is never opened (it would get brand-new rosters)",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_macStarts','A_fallonStarts','A_oldStartersKept','A_nobodyDropped','A_told','B_userStillStarts','C_startKept','C_backToStart','C_currentKept','D_saysNoCopy','E_notOpened'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'pf1.js', why:"EVERY PLAYER KEEPS HIS SPOT: taking over Jacque Hilton III leaves Barker at RB, Godfrey at TE, you at QB, the old starter as backup, nobody gone, nobody made up, you on the roster once; a roster the old version slid out of place is put back on load with the same players; healthy saves untouched",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_spots','A_rb','A_te','A_you','A_oldStarterBackup','A_nobodyGone','A_nobodyMadeUp','A_once','B_fixed','B_same','C_untouched'])if(d[k]!==true)return k+' = '+d[k]+(d.gone?' gone:'+d.gone:'')+(d.new?' new:'+d.new:'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'yr1.js', why:"NOTHING FROM A SEASON THAT HASN'T HAPPENED: an existing-QB career is in 2026 (not 2030) and holds no line dated 2026+; the save the old build broke is cleaned on load (real earlier seasons kept, totals recomputed, told); loading again changes nothing; the guard removes any future-dated line; a finished season's lines stay; a full season records once as 2026 and next is 2027; normal saves untouched",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_is2026','A_noFuture','A_pagesClean','B_hadInvented','B_is2026','B_clean','B_realKept','B_totals','B_told','B_pagesClean','B_newsIn2026','C_idempotent','D_guard','F_recorded','F_is2027','E_normalUntouched'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'rn1.js', why:'RUSHING LIKE REAL FOOTBALL in a brand-new career (never reloaded): 7-21 backs over 1,000, at most 6 over 1,500, nobody at 2,000, a real spread between backs, no wide receiver piling up rushing yards',
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_thousand','B_fifteen','C_noTwoThousand','D_spread','E_wrNotABack','F_receiving'])if(d[k]!==true)return k+' = '+d[k]+' ('+d.n1000+' over 1000, '+d.n1500+' over 1500, top '+d.top+', WR '+d.wrRushMax+'; receiving '+d.rec1000+' over 1000, '+d.rec1500+' over 1500, top '+d.recTop+')';if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'simbx1.js', why:"YOUR SIMMED GAMES ARE REAL GAMES: sitting behind the veteran leaves box scores with HIM as the passer and you nowhere in them; starting, your season totals == the sum of your box scores == the game-by-game season line; the league stats page opens on this season through this week and its top passer row matches the box scores; a reload changes nothing",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_vetPasses','A_notMe','A_myZero','A_vetHasGames','B_boxEqualsSeason','B_szEquals','B_pageIsThisSeason','B_pageTopMatches','C_vetKept','D_stable'])if(d[k]!==true)return k+' = '+d[k]+' sum='+d.B_sum+' ss='+d.B_ss;if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'swi1.js', why:"THE SWIPE IS THE THROW: a short swipe along the line to a deep man lands short (where the swipe said), a long swipe to him goes to him, a 95 QB gets more help than a 60, the sideline stripe is not a throwaway but 5 yards past it is",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_notDeep','A_landsShort','B_deep','C_betterQbMoreHelp','D_stripeIn','D_farOut'])if(d[k]!==true)return k+' = '+d[k]+' A='+JSON.stringify(d.A)+' C='+JSON.stringify(d.C);if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'spw1.js', why:"ENDORSEMENTS ONE AT A TIME: week 1 shows one offer (Goaty's), more arrive every third week up to the meter's count (Average = 3 a season, Very few = 1, Max = 7), signing signs the shown one, the page says more can come",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_one','A_goatyFirst','B_gradual','C_signed','D_note','E_meter'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'c261.js', why:"Tyler's 2026 college list: every name at his school with his 2026 class and rating, the four missing men added, on real teams; existing saves untouched",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_newWorld','B_smothersSr','B_mansionFr','B_fiftySr','B_speedwayJr','C_teams','D_oldUntouched'])if(d[k]!==true)return k+' = '+d[k]+' '+(d.A_bad||'');if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'q26.js', why:"Quick fixes 2026-11-16 on Tyler's real Cam save: the free-agent career is 2026 and its week-1 games are on the league page; Cam throws/looks like Cam with real awards; one transactions button; exotic skins cost millions; ratings-update page with ▲▼ and the power list off the existing-QB page; Doobie 88; Daejon Love in new-world free agency only; Kenny Fallon on the 49ers with 12 real seasons (late saves skipped); Tannehill gets Miami + Tennessee, Cam gets Charlotte; no backwards throws",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_is2026','A_pageHasRows','A_shapeOk','A_black','A_awards','A_oneTx','B_skins','C_noPowerCardOnPick','C_updPage','C_doobie','C_daejon','C_kf','C_kfSpot','C_tannen','C_camHome','C_signed','C_signYear','C_signLook','C_signAw','D_noDaejonOld','D_kfLateSkipped','D_kfCollegeSave','E_noBack'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'plm1.js', why:"PLAYER LIVES MATTER AUDIT over every one of Tyler's real cloud saves + stored saves + fresh worlds: sane year (takeover = 2026 + seasons played), no stat lines from unplayed seasons, nobody out of position, nobody on two rosters, one man one id, 32 full pro rosters, you at the top of your roster, no future-dated history",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.A_allClean!==true)return (d.problems||[]).slice(0,3).join(' || ');if((d.checked||[]).length<12)return 'only '+(d.checked||[]).length+' checked';if(d.pageErrors&&d.pageErrors.filter(e=>!/ERR_FAILED/.test(e)).length)return d.pageErrors[0];return null}},
 {f:'rx26.js', why:"Tyler's exact ratings: Cam speed 83 exact at HIS overall (71, his upgrades kept) in his real week-8 save (shape kept, stable on reload); Manziel speed 90 exact at 57; Hilton III gets the Joe Milton shape at his own overall; Shiesty +1; ratings page lists everything",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_camSpeed','A_cam68','A_aboveTheStart','A_camShape','A_stable','B_jf','C_hilton','D_shiesty','D_page'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'q27.js', why:"Quick batch 2 (2026-11-16): Charlotte Black Cats in Tyler's real Cam save (no 'Charlotte Queens' left); six made-up celebrities gone; Mia's flirt button has no numbers and a 'stay connected' button, no number below 73; upgrading keeps the page position; subbing out up 32 with 6:08 left is allowed; the QB visibly kneels and the down advances; suffix names on the field (PENITS II, HILTON III, BECKHAM JR.); high school has a shop",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_blackCats','A_noQueens','B_gone','C_noNumbers','C_numberBtn','C_noNumberBelow73','D_scroll','E_subOk','F_phase','F_drawn','F_done','G_suffix','G_nmLast','H_shopBtn','H_shopOpens'])if(d[k]!==true)return k+' = '+d[k];if(d.pageErrors&&d.pageErrors.length)return d.pageErrors[0];return null}},
 {f:'mvl1.js', why:"MVP ladder + Pro Bowl tap votes (2026-11-16): menu section 'MVP ladder · Pro Bowl'; ladder of the season so far after each week with moves since last week (older weeks kept); Pro Bowl voting at the bottom on its own page; 10 votes a week, 1 tap = 1 vote = 1,000 fans (Tyler: keep it simple); fans' votes grow every week; old saves' votes convert",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_menu','A_empty','A_underLeaders','B_header','B_moves','B_qbsLead','C_atBottom','C_page','D_fans','D_fansGrow','E_cap','E_votes','F_old','F_old5','G_newWeek','G_oldKept','G_arrowsSince'])if(d[k]!==true)return k;if(d.D_dots!==false)return 'D_dots (no dots with 1 tap = 1 vote)';if(d.B_rows<8)return 'B_rows '+d.B_rows;if(d.D_4taps!==0||d.D_5taps!==1000)return 'taps '+d.D_4taps+'/'+d.D_5taps;return null}},
 {f:'sc1.js', why:"Named save codes + 8 slots (2026-11-16): the backup card has a name box filled with your last name; the code is saved under that name with you as owner (no random code); it loads from that point; someone else gets 'taken' and a free name (CASTLE2); the owner can update it; the space sweep never deletes it; delete your own; off claude.ai the full code is made; 8 slots on the menu, in Import, and saving to slot 8 works",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_box','A_ok','B_saved','B_shown','B_noRandom','C_moved','C_loads','D_refused','E_updated','F_namedKept','F_oldSwept','G_deleted','H_fallback','I_slot8'])if(d[k]!==true)return k;if(d.I_n!==8||d.I_import!==8||!/true$/.test(d.I_menu))return 'slots '+d.I_n+' '+d.I_import+' '+d.I_menu;return null}},
 {f:'slr1.js', why:"Slingshot release tag (2026-11-16): real drag-and-release shows who and how far at the finger; a forward flick on release uses the full pull-back (and says so); easing off on purpose and holding keeps the shorter throw; a tiny pull says 'pull back further'",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_ok','B_ok','C_ok','D_ok'])if(d[k]!==true)return k+' '+JSON.stringify(d[k[0]]);return null}},
 {f:'sd2.js', why:"Bigger sideline (2026-11-16): stands, wall and lights 11 yards back; 40 a side in their own jersey only (none of the other team on yours); benches behind the team; cheerleaders behind the benches; you can walk the whole team area but not onto the field or into the stands",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_full','A_realRoster','A_ownJersey','A_notInStands','B_cheerBehind','C_walkArea','C_notOnField'])if(d[k]!==true)return k+' '+JSON.stringify(d.info||'');return null}},
 {f:'tr2.js', why:"Chicago Icemen + Dallas Cattle Boys (2026-11-16, all saves): Tyler's real Cam save, an old 2037 save and a brand-new world all have the new names and no old full names anywhere outside rosters",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A','B','C'])if(!(d[k]&&d[k].ice&&d[k].cb&&!d[k].old))return k+' '+JSON.stringify(d[k]);if(!d.A_hadOld||!d.D_names)return 'A_hadOld/D_names';return null}},
 {f:'ubx1.js', why:"Your box scores add up to your real season (2026-11-16): Simmons 2037 box scores said 2,417 yds/16 TD vs real 2,843/27; now equal on every passing and rushing number, every game sane and the same each time it's read (even if the stored box is gone), still equal after each new week, nothing from weeks not played",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_match','B_sane','B_stable','C_w1','C_w2','D_noFuture'])if(d[k]!==true)return k;return null}},
 {f:'bx3.js', why:"Box scores = real season in every one of Tyler's real cloud saves (Frank, Bronny, Simmons, Cam) on att/cmp/yds/TD/INT/rush yds/rush TD",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.allOk)return JSON.stringify(d.saves.filter(r=>!r.ok));return null}},
 {f:'pa1.js', why:"Controller placement & accuracy passing (2026-11-16): hold = lob/touch/bullet (lob floats, bullet fast); blue window (full bullet in, early bullet off); releasing in the window lands much closer to the spot; left stick up = deeper, down = shorter; LB high, LT low; holding too long throws a bullet; meter draws; button guide; touch throwing unchanged",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['H_overWild','A_ok','A_lobFloats','B_inFull','B_offEarly','C_windowMatters','D_ok','E_ok','F_auto','F_draw','F_legend','G_touch'])if(d[k]!==true)return k+' '+JSON.stringify([d.A_speed,d.C_err,d.D_place,d.E_hl]);return null}},
 {f:'wt1.js', why:"Watched drives: no stuttering tackles (2026-11-16): across 14 watched drives the ball carrier never stumbles from missed contact, and no defender hangs on him for more than half a second before the tackle",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.maxStum>0)return 'carrier stumbling '+d.maxStum+'%';if(d.maxClose>40)return 'defender hanging on '+d.maxClose+' frames';return null}},
 {f:'ge1.js', why:"Coverage (2026-11-16): defenders stay on receivers (wide-open receivers at 2.5 s under 20%; was 17, raised when the pick-up defender was moved behind the receiver to give Tyler his swipe back) but passes still complete (50-88% throwing to the most open man; was 82, raised when Tyler asked for 70-75% swipe completions)",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!(d.wideOpen25<20))return 'wide open '+d.wideOpen25+'%';if(!(d.cmpPct>=50&&d.cmpPct<=88))return 'completions '+d.cmpPct+'%';return null}},
 {f:'ge2e.js', why:"QB scrambles to the edge (2026-11-16 'QB rushing seems to be the dominant way to play'): a 99-speed QB running wide averages under 17.5 yards (was 19-24), still positive",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!(d.avg<17.5&&d.avg>3))return 'edge scramble avg '+d.avg;return null}},
 {f:'la1.js', why:"Lookalike names (Tyler's call 2026-11-16): in his real saves, every made-up player with a star's exact name at a different position gets a new random name (14: Frank 5, Bronny 8, Murdock 1); none left; real stars untouched",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.still>0)return d.still+' lookalikes left';if(d.renamed<14)return 'only '+d.renamed+' renamed';return null}},
 {f:'plm2.js', why:"PLAYER LIVES MATTER every update (2026-11-16): no still-in-college prospect on an NFL roster in any takeover/free-agent career (Tyler's real saves and a brand-new takeover); the Nov 10 trades (Kirko MIN with Minnesota's passing line and his own rushing, Nandolorean starts in LV, Efficiency BAL, Epstein CHI, Escort BUF); Simmons 2037 restarted once (week 0, no 2037 lines, career = end of 2036, Fallon and MaClones starting); rating updates applied once",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.err2)return d.err2;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_ok','B_ok','C_ok','D_ok','E_ok'])if(d[k]!==true)return k+' '+JSON.stringify([d.A_bad,d.B_where,d.B_kirko,d.C,d.E_bad,d.E_tr]);return null}},
 {f:'nt1.js', why:"Name tags toggle (names+numbers / numbers only / off; in Settings and the pause menu), sideline free look (stays where you leave it, double-tap back to the ball), and a living bench (some walk around, the rest watch) — Tyler 2026-11-16",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_all','A_num','A_off','A_pause','A_settings','B_stays','B_recenter','C_some'])if(d[k]!==true)return k+' '+(d.C_moved||'');return null}},
 {f:'bx4.js', why:"EVERYONE's box scores = their season (Tyler 2026-11-16 'does everyone's box score do that?'): a fresh league plays a full season; every QB/RB/WR/TE season line equals the sum of his box scores (injured weeks: his backup is in the box score; no scaling; no made-up line for a player who didn't play)",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.allMatch)return d.match+'/'+d.checked+' match: '+(d.bad||[]).slice(0,2).join(' | ');return null}},
 {f:'gst1.js', why:"Games started (Tyler 2026-11-16): a full simulated season: every team has exactly 23 starters every game; every QB's starts = games he wasn't hurt; GS on the league stats page; player cards and your career page show GS by season and career",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_23each','B_ok','C_league','E_card','E_mine'])if(d[k]!==true)return k+' '+JSON.stringify(d.B_qb||'');return null}},
 {f:'yr2.js', why:"Every career mode starts in the right year (Tyler 2026-11-16): new high school 2022; existing pro QB 2026 (2027 after a season); free agent 2026 (2027 after); existing college QB 2026 (2027 after, to the draft)",
  check:o=>{const d=J(o);if(!d)return 'no JSON';const e=[];if(!d.hs||d.hs.year!==2022)e.push('hs '+JSON.stringify(d.hs));['pro','fa'].forEach(m=>{const x=d[m]||{};if(x.year!==2026||x.after1!==2027)e.push(m+' '+x.year+'/'+x.after1)});const c=d.col||{};if(c.year!==2026||c.after1!==2027)e.push('col '+c.year+'/'+c.after1);return e.length?e.join('; '):null}},
 {f:'pn1.js', why:"Punters (Tyler 2026-11-16 'Are there punters ... If not, it should be'): every team in every one of Tyler's real saves (pro, college, high school) has exactly one punter, reloading adds none, and on a punt the punter kicks",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_ok)return JSON.stringify(d.saves.filter(x=>x.withOneP!==x.teams||!x.reloadSame));if(!d.B_ok)return 'punt kicker '+d.B_kicker+' vs punter '+d.B_punter;return null}},
 {f:'lrw1.js', why:"Locker room (Tyler 2026-11-16): a teammate who wants to talk walks up and stops beside you — no walking in place (the old build kept walking ~520 of 600 frames); a small step back doesn't set him off again",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_arrives','A_noStutter','B_calm'])if(d[k]!==true)return k+' walkFrames '+d.walkFrames+' flips '+d.flips;return null}},
 {f:'nob1.js', why:"NOBODY IS EVER BLANKED (2026-11-16): through a full season and the rollover, no roster player and no retiree has an empty name or the stand-in position OUT",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.bad>0)return (d.lines||[]).filter(l=>/: [1-9]/.test(l)).slice(0,2).join(' | ');return null}},
 {f:'sd3.js', why:"Sideline (Tyler 2026-11-16): dragging right turns the view right (was reversed); standing players face the field (were turned away); players who walk face where they walk; nobody near the camera disappears",
  check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_rightTurnsRight','B_ok','C_ok','D_visible'])if(d[k]!==true)return k+' '+JSON.stringify([d.A_dot,d.B_facing+'/'+d.B_standing]);return null}},
 {f:'sl1.js', why:'SLANTS RUN THROUGH: both slant receivers keep going downfield and across from 2.5 s to 4 s', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_running)return 'slant stopped '+d.runs+'/'+d.n;return null}},
 {f:'mtr1.js', why:'THE METER MATTERS: released in the black or held too long costs real catches vs released in the color (touch, bullet, too long, lob)', check:o=>{const d=J(o);if(!d)return 'no JSON';for(const k of ['A_touch','B_bullet','C_tooLong','D_lob'])if(!d[k])return k+' '+JSON.stringify(d).slice(0,200);return null}},
 {f:'pbg1.js', why:'PLAYABLE PRO BOWL: 44 per conference, votes 1/3 fans/players/coaches, Ultra Bowl men keep the selection + replacements recorded, QB 3rd/2nd/1st/1st, WR rotation with top 3 in Q4, full lineups, red vs blue, real game, MVP, first-time only when tracked, nothing in the season changes', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['atPBW','A_intro','B_ok','C_votes','D_ubKeep','D_repRec','E_qb','F_wrAllRotate','F_wrQ4','F_full','G_kind','G_lineup','I_ovr','I_mvp','I_played','J_rosterSame','J_statsSame','J_qSame','J_weekSame','J_noResume','L_firstHonest'])if(d[k]!==true)return k;return null}},
 {f:'pbg2.js', why:'PRO BOWL SIMMED: same rosters and rotations, a result and MVP, everyone who suited up recorded; only the normal season wrap-up touches rosters', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['S_sim','J_rosterSame','J_statsSame'])if(d[k]!==true)return k+' '+(d.J_why||'');return null}},
 {f:'p22.js', why:'REAL PLAYERS CARRY ONLY REAL SEASONS: no made-up pre-2022 seasons for real-counterpart players (hidden copy kept), once, new worlds never make them', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_none','B_kept','D_once','E_newWorld'])if(!d[k])return k;return null}},
 {f:'ctli1.js', why:'CONTROLLER ICONS ON RETINA (MacBook 2x): every receiver icon and the meter drawn right over him at 1x and 2x (they floated up-left at 2x)', check:o=>{const d=J(o);if(!d)return 'no JSON';for(const k of ['x1','x2']){const r=d[k];if(!r)return 'no '+k;if(r.err)return r.err;if(!r.A_onReceivers)return k+' icons '+r.icons;if(!r.B_meter)return k+' meter'}return null}},
 {f:'aud5.js', why:'PLM MULTI-SEASON AUDIT: 4 seasons in a new pro-QB world and a free-agent world: nobody vanishes without a retirement record, no duplicates or shared names, names/positions/past seasons never change, ages +1 a year, career totals = seasons, no college player in the NFL early', check:o=>{const d=J(o);if(!d)return 'no JSON';for(const m of ['pro','fa']){if(!d[m])return 'no '+m;if(d[m].n)return m+': '+d[m].problems.slice(0,2).join(' ; ')}return null}},
 {f:'ra2.js', why:'RETIRED PLAYERS LEDGER: the 2037 league gets back players who retired before the ledger (from the seal, real seasons only), once; none active; page + League history button', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_recovered','B_noneActive','C_realSeasons','D_once','E_page','F_button'])if(!d[k])return k;return null}},
 {f:'dk2.js', why:'DAWSON KINGSLEY: Buffalo box scores from weeks already played are identical before and after he joins', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_same)return 'past boxes changed';return null}},
 {f:'dk1.js', why:'DAWSON KINGSLEY: on Buffalo at TE in saves where he fits, real 2022-2025 seasons, an auto-generated starter replaced or a real one kept on the bench, not added past his playing days', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_oldKept','B_cam','C_simmonsNot'])if(!d[k])return k;return null}},
 {f:'qow1.js', why:'WEIGHTED QB OVERALL: Tyler exact Ricky/Jarsh = 98/97, accuracy counts more than truck, every existing save keeps its overall', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_ok)return 'ricky/jarsh '+d.A_ricky+'/'+d.A_jarsh;if(!d.B_accMore)return 'weights';if(!d.C_kept)return 'existing changed '+JSON.stringify(d.saves);return null}},
 {f:'cca1.js', why:'REAL COLLEGE AWARDS: Cam save shows Heisman + National Champions (once, nothing else changes)', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_heis','A_nc','B_once'])if(!d[k])return k;if(d.C_shown!==true)return 'hub '+d.C_shown;return null}},
 {f:'fwc1.js', why:'FIELD WALK WITH A CONTROLLER: Y leaves, X opens game stats, buttons show the controller letters', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_leaveTag','B_statsTag','C_xStats','D_yLeave'])if(!d[k])return k;return null}},
 {f:'ctlm1.js', why:'CONTROLLER STAYS ON (MacBook): clicks/keys/trackpad do not turn controller mode off while the controller is in use; 10 s after it goes quiet touch takes over', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_stays)return 'A_stays';if(!d.B_handsOff)return 'B_handsOff';return null}},
 {f:'jb1.js', why:'JUMP BALL (Tyler 2026-11-16): a deep catch with the beaten defender on him is never a free walk-in: he gets a tackle try right away, tackled or broken tackle (stagger + BROKE THE TACKLE!)', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_noFreeWalkIn)return 'free walk-ins '+d.free+'/'+d.n;if(!d.B_bothHappen)return 'tackles '+d.tk+' broken '+d.brk;return null}},
 {f:'ovs1.js', why:'EXACT OVERALLS (Tyler 2026-11-16): Lamarcus Action 94, Femmifer Allen 89, Jay Copyright 89 in every save; ratings card keeps its arrows', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(!d.A_ok)return 'A_ok';if(d.B_card!==true)return 'B_card';return null}},
 {f:'ubm1.js', why:'REAL ULTRA BOWL MVPs (Tyler: "why does it say Ultra Bowl MVP Ham Luther in 2025"): every save shows 2025 Kevin Sprinter, 2021 Hooper Bol, 2022-24 as recorded, on the League stats card; a QB of another team is still never shown', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_all2025','B_all2021','C_others','D_card','E_otherQb'])if(d[k]!==true)return k;return null}},
 {f:'rst1.js', why:'REST THE STARTERS once the bye is clinched (Tyler 2026-11-16): option only when nobody in your conference can catch you, coach agrees, you can still play; the backups play (no starter or you in that box score), no stats for you, no first-teamer hurt that week, other teams still get hurt', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;if(d.pageErrors&&d.pageErrors.length)return 'page errors '+d.pageErrors[0];for(const k of ['A_clinched','A_button','A_canPlay','B_notClinched','B_noButton','B_otherConf','C_coach','C_weekDone','C_noUserStats','C_othersHurt','C_msg','D_box'])if(d[k]!==true)return k;if(d.C_noStarterHurt.length)return 'starter hurt '+d.C_noStarterHurt;if(d.D_startersIn.length)return 'starters in box '+d.D_startersIn;if(d.D_userIn)return 'you in box';if(d.D_backupsIn<8)return 'backups '+d.D_backupsIn;return null}},
 {f:'rsm1.js', why:'RESUME WHERE YOU LEFT: left during their drive = the same drive (not a new one); left right after it = your ball, same spot and score; left on 2nd down = 2nd down, same spot, distance, score, clock', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_sameDrive','B_yourBall','C_secondDown'])if(!d[k])return k;return null}},
 {f:'swp1.js', why:'SWIPE STAYS AT 91%: Tyler Simmons save, same swipes at every receiver, played out: 68-79% complete (Tyler: 70-75%), at most 4.5% picked (the live 0010 build: 5%), 95% go to the man swiped at (the 91% version: 69-71%, ~3.5% picks)', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.e)return d.e;for(const k of ['A_ok','B_ok','C_ok'])if(!d[k])return k+' '+d.pct+'% '+d.int+' picks of '+d.n;return null}},
 {f:'sct1.js', why:'short save codes work away from claude.ai: make on one phone, load on another, name taken is refused with a suggestion, update works', check:o=>{const d=J(o);if(!d)return 'no JSON';if(d.err)return d.err;for(const k of ['A_ok','B_ok','C_ok','D_ok'])if(!d[k])return k;return null}},
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
   // PLM 2026-11-17 (m236): a real-counterpart player's made-up pre-2022 seasons come off (a hidden copy is kept). Allowed: history rows before 2022 removed, nothing else.
   {const was=(d.changes||[]).filter(c=>{const m=/HISTORY CHANGED\n\s*was (\[.*\])\n\s*now (\[.*\])/.exec(c);if(!m)return false;try{const W=JSON.parse(m[1]),N=JSON.parse(m[2]);const keep=W.filter(r=>r[0]>=2022);const c4=A=>JSON.stringify(A.map(r=>r.slice(0,4)));const ok=c4(keep)===c4(N.filter(r=>keep.some(k=>k[0]===r[0])))&&N.every(r=>r[0]>=2022)&&W.some(r=>r[0]<2022);if(ok){const nm=/\(([^)]+)\)/.exec(c);if(nm)(d._p22=d._p22||new Set()).add(nm[1]);if(N.some(r=>r.length>(W.find(w=>w[0]===r[0])||r).length))d._p22rb=(d._p22rb||0)+1}return ok}catch(e){return false}}).length;d.changesToExistingData-=was;const tms=(d.changes||[]).filter(c=>{const nm=/\(([^)]+)\): teams/.exec(c);return nm&&d._p22&&d._p22.has(nm[1])}).length;d.changesToExistingData-=tms}
   const KNOWN=32-(d._p22rb||0);   /* an RB that had both the backfill and the pre-2022 fix is counted once, above */
   // Tyler's order 2026-11-15: the Manling family is now Manny in all saves. That rename (and only that) is allowed.
   const ord=(d.changes||[]).filter(c=>/^\S+ name (Pete |P\. |Archer )?Manling -> .*Manny$|name (Eli|E\.) Manning -> .*Manny$/.test(c)).length;d.changesToExistingData-=ord;
   // Tyler's ratings orders 2026-11-16: the ratings update reaches every save, once. A rating change is allowed only if it is
   // exactly that player's listed amount.
   const RD={'Doobie Emmanuel':1,'Kirko Chainz':1,'Franklin Lawford':1,'Number Nine':1,'Drako September':-1,'Jack Mascott':-1,'Joseph Shiesty':1,'Femmifer Allen':1,'No Pix':1,'DaSettlement Won':1};
   const rd=(d.changes||[]).filter(c=>{const m=/^\S+ \(([^)]+)\): rating (\d+) -> (\d+)$/.exec(c);const OV={'Lamarcus Action':94,'Femmifer Allen':89,'Jay Copyright':89};/* Tyler 2026-11-16: exact overalls */return m&&((OV[m[1]]!=null&&+m[3]===OV[m[1]])||(RD[m[1]]!=null&&(+m[3]-+m[2])===RD[m[1]]))}).length;d.changesToExistingData-=rd;
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
   {const OV_=['Lamarcus Action','Femmifer Allen','Jay Copyright'];d.B_ovrUnchanged=(d.B_ovrUnchanged||[]).filter(n=>!OV_.includes(n))}/* Tyler 2026-11-16 exact overalls */if((d.B_ovrUnchanged||[]).length)return 'overall changed: '+d.B_ovrUnchanged.join(', ');
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
