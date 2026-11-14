# Football Man — Project Memory (CLAUDE.md)

This file is the permanent memory for the game **Football Man**. Any Claude session
(especially Claude Code) should read this FIRST before doing anything. It describes
what the game is, how it's built, how it ships, and the rules for working on it.

The live backlog of every requested feature/fix lives in the **Request Checklist doc**:
https://claude.ai/artifact/UqWcPrEcY3QFTDCZMNJDH5
(Claude Docs container id `e16cb157-5376-4368-9fba-86c43d89fc4c`, body node `a23d5e45-0349`.)
Read it before building. Every new request gets logged there, same day, in the user's
own words, BEFORE building.

---

## What the game is

Football Man is a single-file **three.js** quarterback career game. You create a QB and
play from high school → college → pro, across games, seasons, drafts, free agency,
awards, relationships, music career, fashion, and more. It's one big HTML file that runs
in a browser (desktop + mobile Safari). Parody names throughout (no real NFL/player
names — e.g. "Buffalo Chills", "Cattle Boys", "NFL Youngboy", "Simothy").

The user is **Tyler Phillips** (typhizzle). He plays on mobile (iPhone Safari / Home
Screen PWA) and hosts the game on GitHub Pages + Netlify. He builds this game as a
passion project and tests every change himself.

---

## Architecture & build system

The game is assembled by a Python patch pipeline, NOT edited directly as one HTML file.

- **Base file:** `/home/claude/p40b/v40pub.html`
- **Build command:** `python3 /home/claude/p40b/patch3.py`
  - Writes the final game to `/mnt/user-data/outputs/football-man.html`
  - Also writes the raw script to `/home/claude/game.js`
- **patch3.py** applies a long chain of replacements, then runs, in order:
  `p41.py`, `p42.py`, `p43.py`, `p44.py`, `p45.py`, `p46.py`.
- **Helper functions inside the patches:**
  - `r(a, b, n=1)` — asserted replace: replaces string `a` with `b`, asserts it
    occurred exactly `n` times. If the count is wrong, the build fails loudly. Good.
  - `cut(a, b)` — removes the text from `a` to `b` (used to drop old function bodies
    that a module replaces).
  - `M('mXX.js')` — reads a module file from `/home/claude/p40b/` and returns its text.
- **Module injection:** modules are inserted before the anchor
  `addEventListener('resize',resize);addEventListener('orientationchange'`
  using `r(anchor, M('mXX.js')+anchor)`. The anchor repeats itself after each insert,
  so each module adds another `r(...)` line. Modules load AFTER all three.js objects
  and core functions exist, so they can safely wrap existing functions.
- **Modules** live in `/home/claude/p40b/` as `m00z … m94.js` plus `g1–g4`, etc.
  They are small, self-contained, and mostly wrap/patch existing functions.

### Function-wrapping pattern (used everywhere)

To change behavior without rewriting a function, wrap it:
```js
(()=>{const _f=f; f=function(){ /* ...before... */ const r=_f.apply(this,arguments); /* ...after... */ return r; }})();
```
- **Do NOT create duplicate top-level names** — duplicate top-level declarations break
  the build. Run `ld.js` to check for duplicate declarations if unsure.
- Tests live in `/home/claude/real` (harness `h.js`, uses puppeteer-core with
  SwiftShader WebGL).

---

## Publishing — ALWAYS update all three targets and label each

After every build, publish to ALL of these and tell the user the version label:

1. **Private copy (the user's main one):**
   https://claude.ai/artifact/LtXB9HXdF4TUGjX9GXRSNT (link ends in **"NT"**)
   - file_path: `/mnt/user-data/outputs/football-man.html`
   - Capabilities `sample; db; user` carry forward automatically. **Do not clear them.**
     The cloud save system depends on `db` + `user`.
   - This is the ONLY copy where cloud save codes work (it has the artifact DB).
2. **Friends copy:**
   https://claude.ai/artifact/3iDW3H2fmhXR3JtxgV66hr (link ends in **"66hr"**)
   - Copy the build to `/home/claude/pub/football-man-friends.html` first, then publish.
   - Shared "Anyone with the link".
3. **Netlify / GitHub (index.html):**
   - Copy the build to
     `/tmp/claude-0/-home-claude/c57e6934-02ef-509f-85a1-506e72ebaaa1/scratchpad/netlify/index.html`
   - Send it to the user with SendUserFile (display: attach).
   - The user currently uploads this manually. **Auto-deploy is pending** (see below).

**Publishing tip:** if a publish fails with "source file changed", just retry.

### GitHub repo

- Repo: **`typhizzle/Football-Man-26`** (public), has `README.md` + `index.html` on `main`.
- GitHub Pages enabled (deploy from `main`, `/` root). Live at
  `https://typhizzle.github.io/Football-Man-26/`.
- **IMPORTANT:** The GitHub Pages / Netlify versions have NO cloud connection
  (`window.claude` doesn't exist there), so **short save codes do not work there** —
  only on the claude.ai private artifact. GitHub/Netlify fall back to long codes.

### Auto-deploy pipeline (PENDING — user wants this)

Goal: Claude pushes build → GitHub → GitHub Pages (and/or Netlify) auto-rebuilds → live,
with no manual uploads. Requires the user to link their **GitHub account** to Claude
**once, on a computer** (claude.ai → Settings → Connectors — this screen is NOT available
in mobile Safari). After linking, use `mcp__claude-code-remote__add_repo` with
`access: "push"` to attach `typhizzle/Football-Man-26`, then commit + push builds. The
user intends to do the one-time computer link later.

---

## Save system

### Long codes (original)

- `mkCode()` → `"FMZ1"` + base64(gzip(JSON.stringify(S))). Fallback `"FMJ1"` + base64 of
  raw JSON if CompressionStream is unavailable.
- `readCode(t)` → handles `FMZ1`, `FMJ1`, or raw JSON; parses, runs `mig(s)`, returns state.
- Problem: full saves are ~200K chars → impossible to paste on mobile.

### Short cloud codes (added V198–V200, module `m94.js`) — WORKING

- The save data is stored in the artifact DB; the **code is just a lookup key**.
- On **export** (claude.ai only): `mkCode` is wrapped to also upload the gzip+base64 data
  to `codes/<CODE>` in the DB and return a 5-char code (alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`,
  no ambiguous chars). `window._lastShortCode` holds it; `expS` shows it.
- On **import**: `readCode` is wrapped — if the input is a short alphanumeric code (2–10
  chars, not starting with "FM"), it fetches `codes/<CODE>` from the DB, reads
  `snapshot.data().d`, and prepends `FMZ1` before handing to the original `readCode`.
- **The DB `get()` returns a DocumentSnapshot** — must use `snap.exists` and
  `snap.data()`, NOT `snap.d` directly. (This was the V199→V200 bug fix.)
- `impS(i)` is wrapped so import errors show the REAL message, not the generic
  "That code did not work" line.
- 5 chars = ~33M combos; trivially extendable to 6–7 later if needed.
- **Cloud codes only work on the claude.ai private artifact** (needs `window.claude` + `db`).

### Writing a cloud save for the user (from a Claude session)

Use the `ArtifactData` tool on the private artifact URL:
- `action: "set"`, `collection: "codes"`, `doc_id: "<CODE>"`, data `{d: <base64 gzip>, n: <name>, t: <when>}`.
- Document cap is 256 KiB; a full save is ~190 KB base64 — close to the cap. If saves
  grow past it, switch to the asset store (`Artifact` publish with `asset: true`) and
  store the asset id instead of the raw base64 string.
- **Simothy's save is stored under code `SIM`** (career with Frank Castle, Bronny James,
  JJ Payne, the original Timothy Simmons). Do NOT overwrite it.

### Save state facts

- Rosters: `S.ro['h.i']`, POSL slots 0–24 + extras pushed past 24. `S.ro.fa` = free agents.
  `S.retd`, `S.svRet` = retired players.
- History frozen into `S.uFz`; `S.law[py]` = in-game awards; `S.hOv[year]` = user corrections.
- `yrN()` counts pro seasons via `S.py` when history rows are missing (fixes take-over saves).
- Cloud saves also exist at `data/users/me/slotN` and `roN` (per-user private subtree).
- Save slots: 1–5. `impS(i)` sets `SLOT=i; S=s`.

---

## USER PREFERENCES — follow these strictly

- **Replies: very short and clear.** List fixed glitches first. He's on mobile.
- **Only claim fixes you actually tested.** Say "my tests" vs "your test" explicitly.
- **Never tell the user he's wrong.** If he's mistaken, correct gently or just fix it.
- **Own mistakes directly**, no groveling, no over-apologizing. He uses strong language
  and wants direct, honest answers — don't sugarcoat, don't be a sycophant.
- **Ask questions only when truly necessary**, and make them plain and simple.
- **Go step by step when walking him through anything** (he's on a phone; one action at a
  time, confirm, then next). Don't dump all steps if he's clearly lost.
- **Stop wasting usage** — be efficient, no unnecessary searches or re-reads.
- **Version stays `V 0.0.1.0002`** until a big batch of changes.
- **Never delete players or stats.** Never change/regenerate in-game history without
  permission. Don't remove features unless told.
- **Leave / X button on every menu.**
- **Parody names only.**
- **Content limits:** "Woohoo" stays non-graphic. Celebrity remodels must NOT be sexualized.
- **Log every new request to the checklist doc the same day, in his words, before building.**

---

## iPhone PWA save warning (known gotcha)

- Adding the game to the iPhone Home Screen creates ISOLATED storage. **Removing it from
  the Home Screen DELETES that storage** (and its localStorage saves). Safari saves are
  separate from Home Screen saves. This is why cloud backup matters — recommend the user
  export a cloud code before removing from Home Screen.

---

## TRAPS — read before changing anything

These caused real, shipped bugs. Each one cost hours.

### 1. `ui.innerHTML = ui.innerHTML.replace(...)` destroys every JS-attached handler
The money-formatting wrappers rewrote `innerHTML` to clean up `$11.8999M`. Reassigning
`innerHTML` re-parses the DOM and **silently kills every `element.onclick = fn`**. The
button still renders, so it looks fine and is completely dead to taps. This is the root
cause of a whole class of "not tappable" reports.
- Buttons built in JS must use `setAttribute('onclick','fn()')`, not `.onclick =`.
- Never reassign `innerHTML` unless the text actually changed (guard with a comparison).

### 2. Awards/history are SNAPSHOTS, not live views
`S.law[py]` stores candidate lists with pre-rendered stat strings (`ln`). Changing how
stats display does **not** update existing records — they were frozen when built. Any
display change needs a `mig()` backfill for saves already in the wild. Also: awards are
snapshotted *before the season ends*, so a stored line will NOT match the final
`S.hist` row. Match award key N to history row `'P'+N`, never by comparing stat values.

### 3. Never hardcode a fix to one save's seed
A migration keyed to `s.seed == 676914057` force-wrote `hOv[2027] = {ub:'BUF', ru:'KC'}`
on every load — an impossible same-conference final that kept "coming back" no matter
what. Fixes must be **self-healing for any save**: detect the broken state and repair it.
Tyler is the only player whose game can be hand-patched; everyone else needs code that
fixes itself on load.

### 4. The stat model is tiny and position-segmented
`sVals(g,...)` returns a season as a short array, stored as `x.h = [year, teamIdx, ...v]`:
- `q` → `[passYds, passTD, INT, completions, rushYds, rushTD]` (6 values)
- `r` → `[rushYds, rushTD, recYds, recTD]` (receiving ADDED 2026-11-06; older saves
  are backfilled deterministically by `rbRecFill()`)
- `w` → `[recYds, recTD]`   `d` → `[sacks]`   `b` → `[INT, tackles]`
Display helpers historically read only the first 2–3 values, so QB rushing existed in
every save for years and was never shown. **Check what's actually stored before
concluding data is missing.**

### 5. Verify with a test that can FAIL
"Is the MVP field non-blank?" proves nothing. "Is the MVP on the champion's roster?"
can fail — and it did, catching three MVPs awarded to losing teams. When you change a
value, enumerate what reads it (changing the champion silently invalidated the MVP).

### 6. Test the OUTCOME, not just the mechanism
Direction fidelity, power curve and anti-snap all measured perfect while the game still
felt broken. Running 40 actual downs — develop routes with `upd(dt)`, pick the most
open receiver, throw to him — showed only **66% completions to wide-open men with 0.0
yd aim error**. The passing mechanic was fine; the CATCH formula was wrong (one base
rate for contested and uncontested alike, so a wide-open receiver dropped 16-23% of
dead-on throws). Isolated mechanism tests cannot find that class of bug. `play1.js`
in /home/claude/real is the harness; re-run it after any passing/catching change.
Healthy numbers: ~84% completion to the open man, drops 3-5%, rest are broken-up
passes and sideline throws.

### 7. Headless testing gotchas
- The 3D camera isn't live, so `pj()`/`upj()` (world↔screen) return garbage. Test throw
  geometry in first-person mode (`CAMI=1; g.sw=0; LY=0`), which is pure math.
- `S` is a scoped binding, NOT on `window`. Use `typeof S != 'undefined'`, not `window.S`.
- The offseason only starts from a button (`offStart()`), and `offOn()` requires
  `S.psum`. Advancing with `pNext()` skips it entirely — don't conclude the league
  system is broken from that.
- Add `protocolTimeout` to the puppeteer launch; simulating a season exceeds the default.

## Flick passing architecture (rebuilt 2026-11-06)

Per Tyler's spec (modeled on Flick Quarterback). The rule: **the game executes the
player's input, it does not second-guess it.**
- `swEnd()` turns the gesture into direction + power. **Swipe LENGTH drives distance**
  (`Math.pow(Ln/(M*.55),1.35)*.9`), swipe SPEED is only a small accent (`*.12`). These
  were previously 50/50, which made a quick scramble flick fly 40 yards.
- Swipe angle maps **1:1** to throw angle (the old `*.85` compression is gone).
- `swThrow()` computes the aim point. Receiver "assist" is capped at ~28% inside ~2.2yd
  — a touch, never a snap. Measured pull with a receiver beside the aim: **0.07 yd**.
- A throw with no receiver nearby **still releases** (it used to be cancelled outright).
- `land()` resolves the catch against whoever is **actually nearest where the ball came
  down** — not a target chosen at throw time. `P.rb` is `P.wr[4]`, so iterating `P.wr`
  covers every eligible receiver.
- Accuracy is expressed as **dispersion** in `doThrow()`, never by re-picking a receiver.
- DO NOT add another targeting layer on top. Three were stacked (m93 snap, soft-flick
  override, magnet) and all three fought the player. They were removed, not patched.

## Current status snapshot (2026-11-06)

- Latest private artifact version: **V204**. Friends: **V26**.
- Modules added today: `m96` (Ultra Bowl integrity), `m97` (draft class groups),
  `m98` (award statistical leaders), `m99` (Ultra Bowl MVP game line),
  `m100` (catch resolved at landing spot), `m101` (RB receiving backfill + leaders).
  All applied via `p47.py`, which `patch3.py` runs after `p46.py`.

**Shipped and verified today** (each with a test written to fail if wrong):
1. Free agents list — the offseason wrapper discarded the generated 48-player pool and
   showed only `S.ro.fa` (empty in most saves). Now merged, deduped.
2. Ultra Bowl history — 2026 CHI, 2027 BUF over CHI, 2028 BAL. Cross-conference is now
   enforced structurally (TA indices 0-15 AFC, 16-31 NFC) and self-heals any save.
3. Ultra Bowl MVPs — validated against the champion's roster, never blank.
4. Ultra Bowl MVP stat line — that game's line, derived + seeded, season line kept as `szn`.
5. League office button — the innerHTML handler bug (TRAP 1).
6. Draft class — current season, grouped declaring / undecided juniors / staying, with
   per-junior reasons. Pure read, writes nothing to the save.
7. OPOY/DPOY — statistical leaders added to the ballot (it was 100% QBs before).
8. RB receiving + QB rushing now stored and displayed; OPOY judges backs on TOTAL yards.
9. Flick passing rebuild (see architecture section above).
10. Uncontested catch rate — a wide-open receiver dropped 16-23% of perfect throws
    because contested and uncontested shared one base rate. Contested maths untouched;
    uncontested is now `.86 + hands/100*.12`. Completions to the open man went 66% -> ~84%,
    drops down to a realistic 3-5%. Found only by playing 40 downs, not by measuring.

### TRAP: an index is only meaningful in the ordering that wrote it
This caused the Axel Jean bug and three wrong diagnoses before the real one.
- `S.T` is THIS SAVE's league, and the user's own club is deliberately swapped to
  **slot 0** (`cut10`: `[all[0],all[k]]=[all[k],all[0]]`; `proFill`: `me=a=='h.0'&&
  S.stage=='pro'` exists only to skip `L[0]`, the user himself). Rosters are re-keyed
  with it, so `rost('h.'+i)` is ALWAYS the right roster. Nothing is ever misfiled.
- `TA` is a FIXED list in CANONICAL (`S.pro`) order. **19 sites index it canonically
  and are right; 10 indexed it by SLOT and were wrong** the moment the user's club was
  not canonically first. Tyler on Houston => slot 8 held Las Vegas while TA[8] said HOU.
- Fix (V227): `TA` untouched. `TAS[i]`/`tSlot(i)` = the club actually in slot i, rebuilt
  from `S.T` on every load, roster read and save. Only the 10 slot sites changed.
  **Never "fix" this by mutating TA** — that repairs 10 sites and breaks 19.
- A history row's `h[1]` is ALSO a slot number, so an old row read through a new
  ordering silently renames a man's past. Rule now enforced in `plTeam()`: **a season
  may only be attributed to a club the player's own `tm` record says he played for.**
  An index is evidence; the player's own record is authority.
- Labels must be UNIQUE. 40 high-school teams collapsed to 11 duplicate labels on a
  last-word abbreviation, which merges two careers into one. Place first, mascot to
  break ties, deterministic fallback.
- `plVerify()` is the standing check — run it after any change here. It validates award
  labels against each player's own `tm`, NOT against `plTeam`, so it cannot rubber-stamp
  the resolver it audits. Expect `awardMismatches: []`, `rowsNamingAMissingTeam: 0`,
  `misfiledRosters: []`.
- Proof this cannot corrupt a save: it WRITES NOTHING. `int1.js` hashes all 803 players'
  `h`/`tm`/`pos`/`ovr` before and after migration + label sync + roster generation +
  ballot refill + ledger build + register. Hash must be identical. It is.

### Harnesses added V227 (in /home/claude/real)
- `ta1.js`  — slot labels on Tyler's real save; Axel Jean must read LV; OPOY labels.
- `int1.js` — the write-nothing proof (hash before/after must match exactly).
- `shop1.js`— Halloween store closed, costumes owned/wardrobe/keepsake intact.
- `stg1.js` — label uniqueness across high school, college and pro (0 blanks, 0 dupes).

### TRAP: the game was DELETING seasons (found V228)
`seasonEnd` ended with `x.h.push([yr,pi,...v]);if(x.h.length>14)x.h.splice(0,x.h.length-14);`
A career was capped at 14 rows and the OLDEST were thrown away. Play a 15th year and your
rookie season is gone forever. **142 players in Tyler's save sat exactly on that cap.**
The cap is removed. Never re-add a trim to `x.h` for any reason.

### TRAP: a NAME IS NOT AN IDENTITY
Tyler's rule is that two different men may share a name, and his save has two Bacon
Millers (LV and WAS) with separate careers. My first seal keyed the record by name and
merged them — one man's 13 seasons were written onto the other. Every player now carries
a permanent `x.pid`, minted on first sight and never reused. If a roster regeneration
loses the id, he is matched back by name AND position AND first-season year, and ONLY when
exactly one record fits; otherwise he is a new man with a new id, never someone else's
history. **Never key player data by name.**

### The seal (m121) — history is enforced, not just defended
- `sealOf(x)` snapshots pos + tm + every season row. `sealCheck(s)` runs on every load and
  every save: a sealed season may not be altered and may not disappear; if one does it is
  put back and `s.sealFix` counts it. Growth (new season, new club) is always allowed.
- The CURRENT season is never sealed while it is still being played (`sealNow`/`yrN`).
- `sealRecover(s)` runs once per save, BEFORE the first seal, and restores seasons the
  game had already dropped: the year and the club come from the player's own neighbouring
  rows. **It never invents a stat line** — a season whose numbers were never computed is
  restored as a season played with no figures. Where the seasons either side disagree on
  the club it does nothing (68 such cases in Tyler's save; 45 recovered for 16 players).
- `sealReport()` for a readable summary. Attack test is `seal1.js`: it deletes a sealed
  season, rewrites another, erases the team list and changes the position — all four must
  come back, and existing rows must stay byte-identical (6,272 rows, 0 altered, 0 gone).

### V227 CORRECTION — I over-applied the TAS fix, then reverted it
`tmAdd`'s `ti`, `S.utm`'s `ti` and a history row's `h[1]` are **CANONICAL** indices into
`TA`, not slots. Proof on the real save: for the 27 players who have only ever been at one
club, the canonical reading of their last row matches their own `tm` **27/27**, the slot
reading **0/27**. Axel Jean's rows all read index 14 -> canonical LV (his record); the slot
reading gives NYS. Only these are genuinely slot-indexed and belong on `tSlot()`:
the two award-leader builders that loop `S.T` (this is where the HOU came from),
m116's `x.ti` from `szFlat`, and `roAudit`. Everything else stays on `TA`.

### Harnesses added V228
- `seal1.js` — the attack test above, plus byte-identical proof on existing rows.
- `seal2.js` — the seal must settle: repeat passes report 0 restored / 0 added.
- `seal3.js` — captures every correction the seal makes during a real load (expect 2).
- `cap1.js`  — how many players sit on the 14-season cap.
- `lost1.js` / `raw2.js` — lost-season census and the canonical-vs-slot proof.

## Test harnesses in /home/claude/real (re-run these after related changes)
- `play1.js`  — 40 real downs: reads the field, throws to the open man, reports
  completion rate and WHY each incompletion happened. The single most useful test.
- `flick2.js` — anti-snap + 1:1 direction + power curve. Aim must move <0.1 yd when a
  receiver sits beside the aim point.
- `flick3.js` — real gestures through `swEnd()`; short quick flick must be a SHORT throw.
- `mvp1.js`   — every Ultra Bowl MVP must appear on the CHAMPION's roster.
- `ub1.js`    — no same-conference finals; includes a deliberate corruption-repair test.
- `fa2.js`    — free-agent pool size under league phase.
- `rb1.js`    — RB receiving / total yards / QB rushing on the OPOY ballot.
- `npx2.js`   — draft class grouping, ordering and stability.
- `soak2.js`  — full fresh career, 10 pro seasons, invariant checks.
Harness is `h.js` (puppeteer-core + SwiftShader WebGL, `protocolTimeout` raised).

- Pending: auto-deploy pipeline (needs one-time GitHub link on a computer — the
  connector screen is NOT available in mobile Safari).
- Known gap: Buffalo Blizzard → Chills rename still not done.
- Full feature backlog: see the Request Checklist doc (link at top). Remaining
  mega-priorities: lost-game glitch, duplicate names, retired players returning,
  remaining tappability issues, roster-edit saving. Then priority glitches, marriage
  system, then features.

## ⏳ STANDING REQUESTS — do not forget these even a year from now
- **Halloween event is OVER (told 2026-11-07).** Remove every Halloween item from the
  SHOP. Keep the claimable keepsake reward, and keep every costume anyone already owns —
  nobody loses what they earned. Only the store listing goes.
- **Save every costume/headwear idea permanently.** Tyler's words: "save all of those
  ideas for later. If it's possible, save it even from a year from now, because I will
  probably forget who I added." The list of ideas therefore lives in this file, below,
  and is never pruned. Anything he names in future goes in here the same day.

### Costume / headwear idea bank (permanent, append-only)
Carried over from the Halloween build and his later notes:
- Trump wig (fits the pumpkin head fine)
- Pumpkin head, skull mask, wizard hat, horse head, cowboy hat, golden cowboy hat
- Any headwear should fit the skeleton suits and the cowboy suits
- Masks removed in-game should be kept and re-added as headwear items later
- A mask replaces a mask; a hat may sit on top of a mask when it fits

## 🗣 STANDING RULE: Tyler's words go in the ledger the same day, verbatim
The glitch ledger doc has an "In Tyler's own words" section at the bottom, grouped by
subject. Every instruction, rule or complaint he gives is appended there VERBATIM the same
day — never paraphrased, never summarized. Reason: the raw chat log for everything before
2026-11-07 was lost when the conversation compacted, and only ~78 of his 200+ messages
survived (via the compaction summary). That must never happen again. The problems/tables
stay at the top of the doc; his words stay at the bottom.

### TRAP: never put a stat-less row inside `x.h`
V228 recovered lost seasons as `[year, teamIdx]` rows inside `x.h`. An older backfill
(`rbRecFill`) found those incomplete rows and FILLED THEM WITH INVENTED NUMBERS — the one
thing recovery must never do — and it broke `rb1.js`'s idempotency check, which is how it
was caught. Recovered seasons now live in **`x.hx`**, a display-only list no stat code can
reach, merged into the career card by `hxMerge(x)` and shown as "season played · stats not
recorded". The seal protects `x.hx` as well. `firstYr()` deliberately ignores `x.hx`,
because an identity key must never move.

### The award seal (m122)
- `x.aw` counts (r/mvp/opoy/dpoy/sbm/oroy/droy) may only ever GO UP. A ring is never un-won.
- `S.law[py].w` — a finished season's winners are immutable. The CURRENT season
  (`py === S.py`) is deliberately left open so Tyler's own override still works; it seals
  at HIS chosen winner when the season ends. Verified by `aw2.js`.
- Attack test `aw1.js`: erase a player's award and replace a past MVP with a fake name and
  team — all three must come back.

## 🚫 HARD RULE: NO INVENTED DATA (Tyler, 2026-11-07: "Yes, no data inventions. Go by what I say.")
- Never fabricate a stat, a season, a team, an award or a record that the game did not
  actually produce. Not to fill a gap, not to make a screen look complete, not as a
  "reasonable estimate".
- If something was never recorded, it is marked NOT RECORDED and shown as such. A blank
  that is honest beats a number that is invented.
- Recovery may restore only what is derivable from the player's OWN record (the year, and
  the club when his neighbouring seasons agree). Where it is not derivable, do nothing and
  report the count. 68 such cases exist in Tyler's save and they stay untouched.
- The one thing this does NOT mean: a simulated game still produces real numbers from the
  simulation, and the season ledger still sums real game logs. That is the game playing
  itself, not me making figures up.
- Applies to me as well as the code: never report a figure to Tyler I have not measured.

## 🚦 THE GATE — `node /home/claude/real/all.js` — RUN IT BEFORE EVERY PUBLISH
Tyler, 2026-11-07: "it feels like each update you're going to add new glitches. So that's
why I need you to test all of this as you go each time to make sure it never fucks up
again." He is right: two regressions happened in one day and BOTH were found by a test,
not by reading code.

`all.js` runs every harness and applies a CHECK THAT CAN FAIL to each, then prints
`GATE OPEN` or `GATE CLOSED — DO NOT PUBLISH` and exits non-zero. **Never publish on a
closed gate.** Takes about a minute for all 13.

Its first run immediately caught a bug I had already shipped (see below), which is the
whole argument for it.

### TRAP: A YEAR IS NOT A KEY for a season row
Seal v1 keyed a sealed season by its year (`old.h[year]`). A player traded mid-season has
**two rows for the same year**, on two different clubs with two different stat lines —
`Bacon Maple 2022: ti27 [1313,6,6,119,52,1] AND ti31 [850,4,2,82,37,0]`. Keying by year
collapsed them and overwrote the first with the second: my own seal destroying a season.
Seal v2 (`SEALV=2`) holds rows as an ordered LIST of exact rows and matches them as a
MULTISET — pass 1 accounts for exact rows still present, pass 2 treats a sealed row with
no match as ALTERED when a row for the same year AND same club is sitting there, and as
GONE otherwise. Only 2 players in Tyler's save are affected, and both are intact now.
`sealDupScan()` reports any player showing one year twice with identical numbers, which is
the fingerprint of the v1 damage. It reports only — the overwritten numbers are gone and
inventing replacements is forbidden.

Note: the "2 corrections during load" reported for V228/V229 were THIS bug misfiring, not
the game altering data. `correctionsEverMade` is now 0 on a clean load.

## V231 (2026-11-14) — Halloween keepsake is ONE gift
- Tyler: "It's supposed to be a one time gift. I was just given another." Cause: picks-left was
  counted only from browser storage (`fm_hwkeep`), which is per copy of the game / per device.
  A save opened where that storage was empty was offered the treat again.
- `m123.js`: a pick already written into ANY save (`s.hwHats`/`s.hwHat`, current S or slots 1-6)
  counts as used. Read-only — writes nothing to any save; extra picks already owned are kept.
- Harness `hw1.js` (in the gate, now 15): offered until picked, stays after "later", gone after a
  pick, NOT re-offered when browser storage is wiped (fails on V230), menu writes nothing.
- Setup note: harnesses read the save from the old scratchpad path
  `/tmp/claude-0/-home-claude/c57e6934-.../scratchpad/saveX.json` and `/tmp/claude-0/sv/save.json`.
  In a new container, symlink both to `specs/tyler-save-snapshot-2026-11-07.json`. `h.js` now finds
  puppeteer-core in `real/node_modules` and Chromium under `/opt/pw-browsers` automatically.
- Source is also committed to `typhizzle/Football-Man-26` under `src/` (save snapshot and request
  transcript kept OUT — public repo).

## V232 (2026-11-14) — linemen and kickers get a career (m124)
- `seasonEnd` did `if(!g)return;` for SG(pos)=='' (LT/LG/C/RG/RT and K): 192 men in the 11-07
  save had NO season ever recorded. Now each season is written to `x.hp` as `[year, club]`
  (same canonical club index as x.h). Its OWN list — never x.h (stat-less rows in x.h get
  invented numbers). A ROW not a year: two clubs in one year both kept.
- `sealCheck` wrapped: x.hp sealed as a multiset (`seal[pid].hpL`); deleted/wiped seasons come
  back; current season open like x.h. `hxMerge` wrapped to show hp rows; `firstYr` ignores hp.
- `pCard` patched (source, via r()): Season-by-season now shows for positions with no stat group
  ("season played · no stats kept for this position"), and the 16-season display cap is gone.
- Past seasons of linemen/kickers are NOT recreated (years never written down; inventing banned).
- Harness `hp1.js` (gate now 16): fails on V231 (0/192), passes on V232 (192/192).
- Known, not yet fixed: `pEdit` age change slices x.h (seal restores) and generates rows with sVals
  (invented). Seasons only recorded in the PRO stage — HS/college NPC careers are the next gap.

## V233 (2026-11-14) — coaches' lives matter (m125)
- Coaches live in `t.cch` (HC) and `t.gmr` (GM): {n,o,a,y,b,nb,w,l,gm}. 11-07 save: 212 HC + 32 GM
  + 28 in `S.cpool`. No id, no per-season record. `staffYear()` REPLACED retiring coaches (gone
  forever) and the pool is trimmed to 60 (`.slice(-60)` — erased). Only the level being played
  (S.T) runs the carousel; in a pro save the 140 college + 40 HS coaches are frozen.
- `m125.js`: permanent `c.cid` (copies keep it); registry `S.cr.c[cid]` = {n,g,rows:[[yr,lvl,club,W,L]],
  hired,out,st,pre}. Append-only; nobody removed. Rows written in a `staffYear` wrapper from the
  club's own W-L (yrN() at that moment is still the finished season — measured: 2035 before,
  2036 after). Exits: fired (in pool after) / retired / left. `pre` = totals before records began,
  shown as such, never split into invented years. Screens `crV()` / `crCard(cid)`; button added to
  `staffV` with insertAdjacentHTML (no innerHTML reassign — TRAP 1).
- Harness `cr1.js` (gate now 17). NOT done yet: coaches moving between levels (HS→college→pro)
  and the frozen levels progressing — that is a gameplay change; per Tyler, NEW SAVES ONLY.

## V234 (2026-11-14) — clothing brands are rivals (m126)
- Old rule: one deal per CATEGORY (SPB[2]), so Goatie's apparel + Jorton sneakers + Nyk cleats at
  once. 11-07 save holds Goatie's + Jorton — HONOURED until they run out; never cancelled.
- Clothing houses (`BRCLOTH`): Goatie's (all lines), Jorton, Nyk, Over Armored, Liger, Yawnverse,
  Sharts (= Shart Shoes). `brMine()` = houses you're signed with. Rival = clothing offer from a
  house not in brMine(). Wrapped: spOk/spSign/spRenSign (blocked), spEns (non-clothing offers ≥2
  yrs and tier ≥2 — "big deals only"), spEvOffers (brand forced to yours; celeb must be that
  house's or unaffiliated), spV (explainer card, insertAdjacentHTML). Source patches: spWeek runs
  `brWeekFilter(L)` before `S.spe={k,L,done:[]}`; evWalk crowd filtered by `brOkAt(v,id)`.
- Harness `br1.js` (gate 18). Before: 2 rivals signed, 44/137 rival events, 107 wrong-brand celebs.
  After: 0/0/0. Walk-event crowd checked at function level only (3D scene not inspected).

## Publishing change (2026-11-14): GitHub Pages is live from `main`
- Tyler is dropping Netlify and using GitHub: https://typhizzle.github.io/Football-Man-26/
- After every gated build: copy to repo `index.html`, commit on the session branch, then
  `git push origin HEAD:main` (fast-forward). Pages deploys in ~40s ("pages build and deployment").
  The sandbox can't fetch github.io; confirm via the Actions run list instead.
- Brand rule clarified by Tyler: a save already holding two houses keeps both until one ends,
  then one from there (exactly what m126 does).

## V235 (2026-11-14) — 100 OVR = a RECORD season (m127), all saves
- `hist100` thresholds were flat (43 pass TD / 1900 rush / 1880 rec / 20 sacks) and every other
  position had `R()<.04` → hq=1 (a 100 with no stat). Now the bar is `h1R(cat)` = the league's
  own single-season record (`recGet('pro',c,1)`, starts at real records, e.g. 55 TD). Random hq=1
  removed; the 50% "keep 100" (hq=2) path untouched. Existing 100s keep their rating.
- Harness `h100.js` (gate 19): before 43-TD → 100 and 311 random 100s/20 seasons; after none.
- V236: second road to 100 (Tyler: "multiple 2,000 yard seasons in a row"): this season AND last
  season ≥95% of the league record (`h2Run`, `H2CLOSE=.95`). Last season read from his own x.h rows
  (q: row[3] pass TD; r/w/d: row[2]); a row without that stat never counts. h100.js covers both paths.
- V237: QB near-record bar = 46 PASSING TD (ratio 46/55 of the record), two straight seasons. Tyler: "46 passing touchdowns, not just total touchdowns". Must already be 99 OVR (hist100 ok()).
- V238: near-record road needs THREE straight seasons (H2N=3). Tyler: "come close th[ree or] four seasons in a row … It's gonna be a rare thing".
- 2026-11-14: hw2.js (gate 20) — keepsake travels with a save code into a fresh copy. Tyler: keep the claim available as a TEMPORARY feature while friends move to GitHub; remove the claim later when he says.

## V239 (2026-11-14) — made-up colleges rated as small schools (m128), all saves (Tyler: "Overall wise")
- Non-big conferences (not Large 10 / South Country / Large 12 / Atlantic Country, not Metro Valley)
  re-scaled once per save (`s.colRt`): rank kept, ovr = 50 + 30*p^1.6 (max 80, ~1 in 10 above the
  big-name median). Also applied in `mkLg` for new saves. Ratings only — no name, team, record or
  history touched. `col1.js` (gate 21): 19/64 above median and max 92 -> 5/64, max 80.
- OPEN: new saves generate ~40-74 random-name schools (UN+MS) beside Tyler's ~49 names; dropping
  them leaves 1-5-team conferences, so new-save conferences must be rebuilt. Not done.
- V240: draft class screen (m97) said "Your class — …" for the npx followed group (the first class put in the game, 2027-28). Renamed to "First class followed — …" via r(...,5) in p47. ncl1.js (gate 22). Lesson: I first relabelled the TITLE from code-reading and made it worse (the screen is the current 2035 class); the rendered-text test caught it.
- V241 (m129): invite caps per season `S.evc={y,studio,pot,party}` applied in the spWeek invite list
  (wraps window.brWeekFilter): studio 3 and never a song already in S.songs (rbs/hot/pg), Pot McGee 2
  (+1 "Pro Bowl interview" if `Pro yr N: Pro Bowl` for this or last pro year), brand parties 4.
  ev1.js (gate 23): before 6 studio/12 Pot/6 parties a season + 45 repeat songs; after 2/3/4, 0 repeats.
  NOTE yrN is a CONST — tests advance the year by pushing S.hist rows.
- V242 (m130), APPROVED by Tyler 2026-11-14 ("just make it accurate for everyone"): player award
  counts (mvp/opoy/dpoy/sbm) raised to match League History = LGH0 (≤2025) + lhLeague() (2026+ incl.
  sim years and corrections). Only ever raised; a name shared by two men in the save is skipped.
  Once per season (S.awHist). 11-07 save: 30 awards raised across 18 players (Ferret DPOY 1→3,
  Fallon MVP 1→5, Rodney MVP 0→4 …). pristine1 now accepts award RAISES only; aw3.js (gate 24).
  2026-2028 DPOY/OPOY/SBM are blank in League History (never recorded) — not invented.
