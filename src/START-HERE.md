# Football Man — complete source bundle

Everything needed to build, test and ship the game. Hand this to a coding session.

**Verified complete:** extracted to a clean directory and rebuilt, this produces a
football-man.html that is **byte-for-byte identical** (md5 d7c53c6649e21748f061202e151bbd1a)
to the shipped V230. Nothing in here is missing.

## What's in the box

| Path | What it is |
|---|---|
| `pub/CLAUDE.md` | **READ THIS FIRST.** Permanent project memory: the build system, publishing targets, the save system, Tyler's standing rules, and every trap that has already cost real time. |
| `p40b/` | The build pipeline. `v40pub.html` is the base file; `patch3.py` is the build command; `p41.py`–`p47.py` are the patch chain; `m*.js` / `g*.js` are the 122 modules. |
| `real/` | 323 test harness files. `h.js` is the harness itself (puppeteer-core + SwiftShader WebGL). `all.js` is **the gate**. |
| `football-man.html` | The built game, V230. Playable as-is by opening it in a browser. |

## Set up

Extract so the project root is `/home/claude`, because the pipeline uses absolute paths:

    /home/claude/p40b/...
    /home/claude/real/...
    /home/claude/pub/CLAUDE.md

If you must use a different root, rewrite these three strings across `p40b/*.py`:
`/home/claude/p40b/`, `/home/claude/game.js`, `/mnt/user-data/outputs/`.

Testing needs `puppeteer-core` and a Chromium. `real/` ships without `node_modules`
(it was 147 MB); run `npm i puppeteer-core` in `real/`, or point `h.js` at the
system Chromium if one is already installed.

## Build

    python3 /home/claude/p40b/patch3.py

Writes the game to `/mnt/user-data/outputs/football-man.html` and the raw script to
`/home/claude/game.js`. It prints `ok <script bytes> | syntax checked`, and **refuses to
finish** with `BUILD REFUSED - SYNTAX_FAIL` if the result does not parse. That check exists
because a single missing brace nearly shipped a completely dead game. Do not remove it.

## THE RULE: test before you publish

    node /home/claude/real/all.js

Runs 13 harnesses, each with a check that **can fail**, and prints `GATE OPEN` or
`GATE CLOSED — DO NOT PUBLISH`. Takes about a minute. **Never publish on a closed gate.**

On its very first run it caught a data-destroying bug that had already shipped. Two
regressions happened in a single day and both were found by a test, not by reading code.

## How to change the game

Never edit `football-man.html` or `game.js` directly — they are build output. Add a module
to `p40b/` and inject it from `p47.py`:

    r("addEventListener('resize',resize);addEventListener('orientationchange'",
      M('mNNN.js')+"addEventListener('resize',resize);addEventListener('orientationchange'")

Wrap existing functions rather than rewriting them:

    (()=>{const _f=f; f=function(){ const r=_f.apply(this,arguments); return r; }})();

Two hard constraints, both of which have caused shipped bugs:

1. **Never create a duplicate top-level name** — it breaks the build. `ld.js` checks.
2. **A `const`-declared function cannot be wrapped.** `window.x = function(){...}` against a
   `const` silently does nothing; the game keeps calling the original and the patch looks
   applied. For a `const`, patch the source directly with `r(...)`.

## The three living documents

- **Request Checklist** — every request, its status, and build notes for each open item.
- **Football Man — Build Memory** — the durable copy of `CLAUDE.md`.
- **Glitch ledger** — every bug ever, the recurring ones kept permanently, and Tyler's own
  words verbatim at the bottom.

Every new request goes in the checklist the same day, in his words, before building.

## specs/

- `your-requests-word-for-word.txt` — every big request and spec file Tyler sent, kept
  word for word. Build from these directly; they are the primary source for the free
  agency, housing, wedding, pregnancy, college-rankings, social-media and Pat McAfee
  specs. **Irreplaceable.**
- `tyler-save-snapshot-2026-11-07.json` — a real save, 803 players and 6,227 history
  rows. Every harness in `real/` runs against this. Without it most of them cannot run.
