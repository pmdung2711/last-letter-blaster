# Contributing

Last Letter Blaster is deliberately small. These rules keep it that way.

## Before you change anything

1. **Check the GDD.** Every behaviour, number and screen is specified in [`docs/GDD.md`](docs/GDD.md). If your change isn't there, it's a design change: update the project GDD first, then re-sync the snapshot.
2. **Check the scope table.** Anything marked *Nice-to-have* waits until the MVP has been playtested with the club. Anything marked *Cut* stays cut. Finishing the MVP beats adding features.

## Code rules

These come straight from the project brief and are not optional.

| Rule | What it means in practice |
| --- | --- |
| **One `state` object** | All mutable game data lives in `state`. No module-level `let` variables, no state hidden in closures. Caches that can be rebuilt (pre-rendered sprites, the word `Set`) live under `state.cache`. |
| **Constants at the top** | Every number from the GDD is a named `const` in the constants block at the top of `game.js`, `UPPER_SNAKE_CASE`. No magic numbers in functions. See [`docs/CONSTANTS.md`](docs/CONSTANTS.md) for names. |
| **Single responsibility per function** | A function either *updates* state, *draws*, *plays a sound*, *reads/writes storage* or *handles input*, never two of these. Name it for what it does: `updateEnemy`, `drawHud`, `playLaser`, `saveLeaderboard`. |
| **No external assets** | No image, audio, font or library files; no CDN links. Sprites are string grids, sound is WebAudio, text is system `monospace`. The one data blob, the word list, is a string constant. |
| **One JavaScript file** | `game.js`, target ~2,000 lines (the word list string is excluded from that count). |

### Style

- Plain modern JavaScript (ES2020), `'use strict'`, no build step, no frameworks.
- 2-space indent, semicolons, single quotes (see `.editorconfig`).
- `const` by default; `let` only for loop counters, local temporaries and the single `let state`.
- Pure helpers (`laserForLength(len)`, `speedMultiplier(speed)`) are preferred: they are easy to test from the browser console.
- Time is always in **seconds** and distance in **internal pixels** (480 × 270 space). Suffix names when it helps: `spawnDelayS`, `knockbackPx`.
- Each section of `game.js` starts with a banner comment, in the order listed in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#file-layout-of-gamejs).

### Storage

Every `localStorage` read and write goes through `loadJson` / `saveJson` in the storage section and is wrapped in `try/catch`. The game must play with storage disabled. See [`docs/SAVE_DATA.md`](docs/SAVE_DATA.md).

## Workflow

- `main` is always playable. Work on short branches: `feat/hangar`, `fix/rare-letter-speed`, `docs/save-format`.
- Commit messages: imperative, short subject, optional body. Prefix with the area when useful: `hud: show speed multiplier`.
- Before merging, run the smoke test in [`docs/TESTING.md`](docs/TESTING.md#smoke-test-5-minutes).
- Tick the matching box in [`docs/ROADMAP.md`](docs/ROADMAP.md) and add a line to [`CHANGELOG.md`](CHANGELOG.md) under *Unreleased*.

## Changing a tuning number

1. Change the constant in `game.js`.
2. Update the value in [`docs/CONSTANTS.md`](docs/CONSTANTS.md).
3. If it changes difficulty (speed, spawn delays, armor, lives), re-run the tuning check in [`docs/TESTING.md`](docs/TESTING.md#tuning-simulation) and update the GDD's tuning note.

## Recording decisions

For any choice someone might later ask "why?" about, add a short ADR in `docs/decisions/` using the next number. Copy the format of an existing one.
