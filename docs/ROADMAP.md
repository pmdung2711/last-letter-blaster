# Roadmap

The goal is **MVP 1.0**: everything marked *MVP* in the [GDD scope table](GDD.md#scope), playtested with the club. Nice-to-haves are listed at the end and stay closed until the playtest says they are needed.

Milestones are ordered so the game stays playable after each one. Tick boxes as work lands on `main`.

## M0 — Documentation ✅

- [x] Repository and documentation set
- [x] GDD snapshot, architecture, constants, save format, test plan, club guide, ADRs

## M1 — Bring in the prototype

Import the shooter prototype and reshape it to the [architecture](ARCHITECTURE.md) without changing behaviour.

- [ ] Add `index.html` (canvas, input, Fire, Pause) and `game.js` from the prototype
- [ ] Move every literal number into the constants block using the names in [CONSTANTS.md](CONSTANTS.md)
- [ ] Gather all mutable data into `state` / `createRun()`; no stray globals
- [ ] Split into the numbered sections; one responsibility per function
- [ ] Move the word list to `WORD_LIST_RAW` at the bottom; `boot()` as the last line
- [ ] Smoke test passes (same behaviour as the prototype)

Already working in the prototype (per GDD): typing, validation, chain; one enemy at a time with speed ramp and 3 types; laser damage by length; 3 lives, pause, auto-pause, resume countdown; no-repeat rule and used-words strip; recap with word chain; 4 of 9 achievements.

## M2 — Complete the run

- [ ] Rare letters: 60% speed, Scout-only spawns, pulsing badge
- [ ] Heavy laser visuals: 2 px beam, 4 px glow, nose flash
- [ ] Mega laser visuals: 3 px beam, wide glow, white core, 2 px shake, impact sparks
- [ ] Enemy hit flash (0.1 s) and knockback (8 px per damage)
- [ ] Scoring: word points with speed multiplier, kill bonus; HUD multiplier
- [ ] Remaining achievements (all 9 working), pop-ups, recap list with counts
- [ ] Ship hit: blink, speed penalty, streak reset, shake, sparks
- [ ] Death explosion 1.2 s → recap; Quit run → recap
- [ ] Starfield: 70 stars, 3 layers, drift follows speed
- [ ] Resolve [Esc interpretation](ARCHITECTURE.md#interpretations-of-the-gdd) and implement

## M3 — Hangar and ships

- [ ] Sprite grids for 4 ship shapes × 2 flame frames; Scout, Fighter, Cruiser; badge; pip; heart
- [ ] `renderGrid` palette swap and `rebuildShipCache`
- [ ] Hangar screen: 4× preview over the real background, Light→Heavy→Mega test-fire loop with sounds
- [ ] Rows: shape, main, second, laser; ◀ ▶, swatches, 🎲 per row, 🎲 All, Club colors
- [ ] Pilot name field (max 12)
- [ ] Save to `llb.ship`; ship used on title and in runs

## M4 — Persistence and meta screens

- [ ] Storage section with try/catch; game runs with storage blocked
- [ ] Personal best on title and recap, New best banner
- [ ] Leaderboard: insert, top 10, ship icons, highlight on recap
- [ ] Word Collection: lifetime set, New Discovery, new-word chips on the recap
- [ ] Word Collection screen: total, A–Z counts, per-letter list
- [ ] Title screen: best, Club Word of the Week, buttons, first-launch How to play card

## M5 — Audio

- [ ] `ensureAudio` on first input; master and keystroke volumes
- [ ] All 12 sounds from the GDD audio table
- [ ] Sound toggle on Title and Pause, saved in settings

## M6 — Mobile

- [ ] Input attributes (autocomplete/autocorrect/autocapitalize/spellcheck off)
- [ ] Fire (56 px) and Pause (44 px) buttons; Go/Enter submits
- [ ] Refocus input on canvas tap; keyboard opens on run start
- [ ] `visualViewport` resize keeps ship, enemy and badge visible above the keyboard
- [ ] Touch navigation on every menu screen

## M7 — Club playtest → 1.0

- [ ] Full test plan in [TESTING.md](TESTING.md) on the browser matrix
- [ ] Set `CLUB_WORD` (`CLUB_COLORS` is set from the club logo)
- [ ] Host it (see [Club leader guide](CLUB_LEADER_GUIDE.md#hosting))
- [ ] Club playtest session; record survival times, device mix, confusing moments
- [ ] Answer the open questions below; update the GDD
- [ ] Tag `v1.0.0`

## Open questions blocking or affecting MVP

| Question | Blocks | Owner |
| --- | --- | --- |
| Word list size: SCOWL level 40 (≈ 45,000 words) is 5× the prototype's list; confirm in the playtest or lower the level in `tools/wordlist/build.mjs` | M7 release | Playtest |
| Final name or working title | Title screen text, repo name | Dung / club |
| Device mix of club members | How much M6 polish | Club survey |
| Learner survival 2–3 min? | Tuning after M7 | Playtest |
| Is 4 shapes / 8 colours / 6 lasers too much? | M3 scope | Dung |
| Licence for this repository | Public hosting | Dung |
| 13 GDD interpretations in [ARCHITECTURE.md](ARCHITECTURE.md#interpretations-of-the-gdd) | Implementation details in M2–M4 | Dung |

## After 1.0 (only if the playtest asks for it)

From the GDD's *Nice-to-have* list, with the trigger that would justify each:

| Feature | Build it if… |
| --- | --- |
| Procedural music that follows speed | Players say it feels empty |
| Two enemies at once late in a run | Fast typists find single enemies dull |
| +1 life every 25 kills (max 3) | Learners' runs are too short |
| Definition pop-up on the recap | Teachers want a vocabulary tool; needs a larger data set |
| Export or share recap as an image | Players want to post scores |
| More ship shapes or decals | The Hangar is popular |

Everything marked *Cut* in the GDD stays out, including ship movement, stat-different ships, bosses, online leaderboard, accounts, unlockables, power-ups, daily seeds and multiplayer.
