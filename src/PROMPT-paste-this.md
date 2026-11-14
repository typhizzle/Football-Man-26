I'm Tyler Phillips (typhizzle). I'm building a game called Football Man and I need you to pick it up exactly where the last session left off. The attached football-man-source.zip is the complete source — 465 files, verified to rebuild the shipped version byte-for-byte.

=== READ THESE FIRST, IN THIS ORDER, BEFORE YOU TOUCH ANYTHING ===

1. START-HERE.md — setup, the build command, and the rule about testing before publishing.
2. pub/CLAUDE.md — the permanent project memory. The build system, how it ships, the save system, my standing rules, and a long TRAPS section listing every bug class that has already cost real time. READ THE WHOLE TRAPS SECTION. Every one of those was a real shipped bug. It also has the stat model (x.h = [year, teamIdx, ...values] with different value counts per position) — know it before you touch stats.

Do not start coding before you've read both. I've had time wasted re-deriving things that are already written down in there.

=== WHAT THE GAME IS ===

A single-file three.js quarterback career game. You create a QB and play high school -> college -> pro: games, seasons, drafts, free agency, awards, relationships, a music career, fashion. One big HTML file that runs in a browser. I play on iPhone Safari as a Home Screen app, so everything has to work on a phone.

Parody names only. No real NFL or player names — "Buffalo Chills", "Cattle Boys", "Simothy". Keep it that way.

It is NOT edited as one HTML file. It's assembled by a Python patch pipeline with 122 small modules. football-man.html and game.js are BUILD OUTPUT — never edit them directly. Every change is a new module in p40b/ plus one line in p47.py. If you start hand-editing the 1.4 MB HTML, the pipeline is dead and I've lost everything.

=== THE THING THAT MATTERS MORE THAN ANYTHING ELSE ===

I call it Every Player's Life Matters. In my own words, and I mean it literally:

"Every player and their lives matter. Everything they do needs to be recorded. Think of every player having its own career mode. Their high school, their college, their pro career, each team they played for, each year they played for them, stats for each year they had. All of it. And more importantly, it cannot change. All awards stick with them. The awards never change. The history never changes. The leagues never change. What happens always happens. It's inevitable. You cannot change it."

The hard rules:

- Nobody is ever deleted. Any auto-generated player, once created, exists in that save forever. He can retire, be cut, sign elsewhere — he is never erased, and what happened to him is written down.
- Names never change once made. Draft classes never change — past, present or future. TWO DIFFERENT MEN ARE ALLOWED TO SHARE A NAME. That is not a bug, do not "fix" it. There's an auto-deduplicator that used to rename one of them; it is switched off on purpose because it was breaking this rule.
- History never changes. A season already in the books is immutable. Awards, Super Bowls, stats, teams — permanent.
- Do not change anything in my existing saves. No moving players, no altering stats, no touching awards or history. New players and new names go to NEW SAVES ONLY.
- A fix must work on every save, self-healing on load — mine, my friends', high school ones, college ones. Don't hand-patch one save. An update should just fix the game itself.

There's already machinery enforcing this. Do not weaken it:

- The record is sealed at the write layer. m121.js snapshots every player's career the first time it sees it; after that a sealed season may not be altered and may not disappear. If one does, it's put straight back. New seasons and clubs are still allowed — the past grows, it never changes. m122.js does the same for awards: a count may only ever go up, and a finished season's winners are immutable (the CURRENT season stays open so my own override still works).
- Identity is x.pid, a permanent id — NEVER the name. Keying by name once merged my two Bacon Millers and wrote one man's 13 seasons onto the other.
- A season is a ROW, not a YEAR. A player traded mid-season has two rows for the same year, on two clubs, with two different stat lines. Keying a season by its year collapses them and destroys one.
- x.hx holds seasons recovered from before the seal existed. It is display-only and no stat code may reach it, because a stat-less row inside x.h got found by an older backfill and filled with invented numbers.

=== NO INVENTED DATA. EVER. ===

"Yes, no data inventions. Go by what I say."

- Never fabricate a stat, season, team, award or record the game did not actually produce. Not to fill a gap, not to make a screen look complete, not as a reasonable estimate.
- If something was never recorded, MARK IT NOT RECORDED and show it that way. An honest blank beats an invented number.
- Recovery may restore only what's derivable from the player's OWN record. There are 68 seasons in my save where the club genuinely can't be derived — leave them alone and tell me the count.
- This applies to you too: never report a number to me you haven't actually measured.
- KNOWN EXCEPTION, ALREADY DECIDED: rbRecFill (around line 7302 of the built game) invents receiving yards for running backs' old seasons from a seeded random, and rewrites 32 players' history rows on every load. It was built before this rule existed. My decision: LEAVE WHAT IS ALREADY THERE, FREEZE IT, AND NEVER INVENT ANOTHER ONE. Do not extend it, do not apply the same trick anywhere else, and do not delete what it already wrote. Going forward, real catches come from the season ledger summing real games.

=== TEST BEFORE YOU TELL ME ANYTHING IS FIXED ===

Run this before you publish anything:

    node /home/claude/real/all.js

It runs 14 harnesses, each with a check that CAN FAIL, and prints GATE OPEN or GATE CLOSED — DO NOT PUBLISH. About a minute. Never publish on a closed gate. Testing needs "npm i puppeteer-core" in real/ first.

On its very first run it caught a bug that had already shipped. In one day, two regressions happened and BOTH were found by a test rather than by anyone reading the code. That's why it exists.

If you add a feature, add a check for it to all.js. A test that can't fail proves nothing — "is the MVP field non-blank?" proves nothing; "is the MVP on the champion's roster?" caught three MVPs awarded to losing teams.

IMPORTANT ABOUT TESTING: readCode() ends with "return mig(s)", so if you snapshot the save after calling readCode you are measuring AFTER the game's load code has already run. That made an earlier integrity proof circular and hid a bug that was rewriting 32 careers on every load. real/pristine1.js does it correctly — it parses the save as plain JSON first, with no game code involved, and uses that as the baseline. Copy that pattern.

=== HOW TO PUBLISH — USE THESE EXACT LINKS ===

Every update goes to all three, and you tell me the version label. Use the Artifact tool and pass the existing URL so it updates in place. If you publish without the URL you create a NEW link, and I lose my cloud saves and my friends lose their copy.

1. My private copy: https://claude.ai/artifact/LtXB9HXdF4TUGjX9GXRSNT
   file: /mnt/user-data/outputs/football-man.html
   CRITICAL: capabilities "sample; db; user" carry forward automatically. DO NOT CLEAR THEM. My short cloud save codes depend on db + user. This is the only copy where they work.
2. Friends copy: https://claude.ai/artifact/3iDW3H2fmhXR3JtxgV66hr
   Copy the build to pub/football-man-friends.html first. Shared "anyone with the link".
3. Netlify / GitHub: copy the build to index.html and send me the file. I upload it manually. Auto-deploy is pending a one-time GitHub link on a computer.

My three living documents — read and update these, don't make new ones:
- Request Checklist (every request, its status, build notes for each open item): https://claude.ai/artifact/UqWcPrEcY3QFTDCZMNJDH5
- Glitch ledger (every bug ever, recurring ones kept permanently, my own words verbatim at the bottom): https://claude.ai/artifact/BK28CDvDqvjJaHVtvehZys
- Build Memory (durable copy of CLAUDE.md): https://claude.ai/artifact/EvLVDgFmhueLsqnZNyDDXy

=== WHERE THE LAST SESSION KEPT GOING WRONG — LEARN FROM THIS ===

1. It diagnosed the same bug wrong THREE TIMES before getting it right, because it theorised from reading code instead of measuring the actual data in my save. When you have a real save, QUERY IT BEFORE FORMING A THEORY. What finally settled it was one check: for players who'd only ever been at one club, which reading of their record matched — 27 out of 27 one way, 0 the other. Thirty seconds of data beat three rounds of guessing.
2. It fixed ONE LAYER and didn't follow through. A bug like this lives at the display layer, the stored layer and the write layer. It fixed the generator, the test passed, and my screen still showed the wrong thing — because the screen renders the STORED value. Follow a fix through every layer and verify at the rendered-screen level, not at the function.
3. It OVER-APPLIED a fix to three places that were already correct, and shipped that. When you find a pattern, check each site individually. Some looked the same and weren't.
4. It shipped a fix that DESTROYED DATA — its own seal overwrote a season. Caught only by a test. If you write anything that touches saved records, write the attack test FIRST: delete something sealed, alter something sealed, and prove both come back while everything else stays byte-identical.
5. It told me things were tested when they weren't tested properly, and one of its proofs was circular (see the testing note above). If you haven't run it, say you haven't. I'd rather hear "not verified" than a claim I later catch.
6. It didn't tell me the workspace was temporary, so I lost about 120 of my own messages. If something about how you work is going to cost me, tell me on day one.

Two technical traps that silently ate patches:
- A const-declared function CANNOT be wrapped. window.x = function(){...} against a const does nothing — the game keeps calling the original and the patch looks applied. This cost two versions. For a const, patch the source directly.
- Reassigning innerHTML silently kills every handler attached from JavaScript. The button renders perfectly and is dead to taps. That's the cause of a whole class of "not tappable" reports.

=== HOW I WANT YOU TO WORK WITH ME ===

- Short, clear replies. I'm on a phone. Fixed items first.
- Say "my tests" vs "your test" explicitly. Don't blur them.
- Own mistakes directly. No groveling, no long apologies. I use strong language; just give me straight answers.
- Ask a question only when the answer changes what you build. Then make it plain. Don't dump a pile of technical detail on me and ask me to decide — tell me what you'd pick and why, in plain words.
- If you're not going to fix it, don't test it. That uses extra. Don't burn my usage measuring something you're not about to fix.
- Every request I send goes in the Request Checklist the same day, in my words, BEFORE you build. Every glitch goes in the glitch ledger the same day, and my words go in verbatim.
- Version label stays V 0.0.1.0001 until a big batch.
- A Leave or X button on every menu.
- Content limits: "Woohoo" stays non-graphic and implied. Celebrity remodels must NOT be sexualized. No real player photos in the game.
- I send screenshots from the latest version. If a team or player looks wrong, I'll give you the name — trace it from the name.
- Keep telling me a real PERCENTAGE on Every Player's Life Matters, and move it when your information changes. Up for a real fix, down when you discover something new. It's at 86% right now.

=== WHERE I'M HEADING ===

Near term, in order:

1. Finish Every Player's Life Matters. The single biggest blocker: no harness can advance a fresh career from high school to the pros, so "a career carries its record through all three stages" sits at 35% and can't be claimed verified. pNext() isn't the advancer; the offseason only starts from offStart() and offOn() needs S.psum. SOLVE THAT FIRST — it unlocks verifying everything else.
2. Offensive linemen have no career recorded at all. The game returns before writing a row for any position without stats. By my own rule their seasons should exist.
3. Make everything watchable. My extra point is done; the opponent's is still an automatic +7. Still open: CPU drives, kickoffs, onside kicks, overtime, fumble physics with a visible recovery. And ONE CLOCK SPEED FOR BOTH TEAMS — if I watched a whole game it should take about 5 minutes.
4. The slingshot box in first person, with separate toggles for slingshot throwing and for the thumb box, and every other slingshot route removed. Do NOT add another targeting layer on top of m111.js — I confirmed that one at 70% completions and it's the foundation. Three were once stacked and all three fought the player.
5. Retired players coming back when they shouldn't; the remaining dead buttons (Play/Sim, Met Gala, the chat box, Kirko Chainz, the locker-room clothes menu won't close); DROY missing; the lost-game glitch.

Longer term: marriage and kids, the housing system, a full draft room, difficulty levels, trade requests, the GSPN fantasy section, the phone and contacts build-out. It's all in the checklist with build notes.

The direction overall: I want a game where every player in the league has a life that's recorded and permanent, where I can watch anything that happens, and where nothing I've built ever silently disappears.

=== DO NOT LOSE MY DATA ===

This is what I'm most worried about. Everything in my saves has taken months.

- Never write a migration that alters existing records. Detect and repair a broken state, don't rewrite a good one. There's a trap in CLAUDE.md about a migration hardcoded to one save's seed that kept re-breaking it on every load.
- Before you ship anything that touches saved data, prove it with real/pristine1.js — it hashes every player's history, team list, position, rating and awards against a baseline taken before any game code runs. 803 players, and nothing a player already owned may change.
- If you must change save data, tell me first and say exactly what will change.
- My saves export as short cloud codes. Simothy's save is stored under code SIM — DO NOT OVERWRITE IT.
- specs/tyler-save-snapshot-2026-11-07.json in the zip is a real save with 803 players. Most harnesses need it. Don't delete it.
- Phone gotcha: adding the game to the iPhone Home Screen creates isolated storage, and removing it from the Home Screen DELETES that storage and its saves. Remind me to export a cloud code before I ever do that.

Start by reading START-HERE.md and pub/CLAUDE.md, then tell me what you understand the state of the project to be and what you'd do first. Don't write code in your first reply.
