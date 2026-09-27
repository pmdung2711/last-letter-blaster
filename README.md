# Last Letter Blaster

An endless 2D pixel space shooter for the English Club where **every shot is an English word**. Type a word that starts with the enemy's letter to fire; the word's last letter becomes the next target. Longer words fire stronger lasers.

> **Status:** documentation phase. The design is locked for MVP (see [`docs/GDD.md`](docs/GDD.md)); the shooter prototype exists outside this repo and will be brought in as `game.js` during Milestone 1 of the [roadmap](docs/ROADMAP.md).

## How to play

1. An enemy flies toward your ship carrying a letter, for example **R**.
2. Type a word that starts with that letter (`rocket`) and press **Enter**.
3. Your laser always hits. 3–4 letters = Light (1 damage), 5–6 = Heavy (2), 7+ = Mega (3).
4. The last letter of your word (`t`) is the new target.
5. Don't repeat a word in the same run. Three enemies reaching your ship ends the run.

Invalid words never cost a life, so learners can take their time; the enemies just keep coming.

## Running the game

No build step, no dependencies, no asset files.

```text
Open index.html in any modern browser.
```

For club use, host the folder on any static host (GitHub Pages works). See the [Club leader guide](docs/CLUB_LEADER_GUIDE.md).

## Planned repository layout

```text
last-letter-blaster/
├── index.html          # Page shell: <canvas>, <input>, Fire and Pause buttons, minimal CSS
├── game.js             # The whole game (~2,000 lines): constants → state → systems → loop
├── README.md
├── CONTRIBUTING.md     # Coding rules and workflow
├── CHANGELOG.md
└── docs/
    ├── GDD.md                  # Game Design Doc (snapshot of the project copy)
    ├── ARCHITECTURE.md         # How game.js is organised, the state object, the frame loop
    ├── CONSTANTS.md            # Every tuning number with its planned constant name
    ├── SAVE_DATA.md            # localStorage keys, JSON shapes, migration rules
    ├── ROADMAP.md              # MVP milestones and task checklists
    ├── TESTING.md              # Manual test plan, tuning simulation, browser matrix
    ├── CLUB_LEADER_GUIDE.md    # Changing the Word of the Week, hosting, resetting scores
    └── decisions/              # Architecture decision records (ADRs)
```

Only the files under `docs/` and the root Markdown files exist today.

## Documentation map

| If you want to… | Read |
| --- | --- |
| Understand the game | [GDD](docs/GDD.md) |
| Start coding | [Architecture](docs/ARCHITECTURE.md), then [Contributing](CONTRIBUTING.md) |
| Change a number (speed, damage, score) | [Constants](docs/CONSTANTS.md) |
| Touch saving or the leaderboard | [Save data](docs/SAVE_DATA.md) |
| Know what to build next | [Roadmap](docs/ROADMAP.md) |
| Check a build before a club session | [Testing](docs/TESTING.md) |
| Update the Club Word of the Week | [Club leader guide](docs/CLUB_LEADER_GUIDE.md) |
| Know why something is the way it is | [Decisions](docs/decisions/) |

## Design pillars

- **Typing is the trigger.** No aiming or dodging; a valid word always hits.
- **Longer words, stronger lasers.** Vocabulary pays off directly.
- **Learners survive, experts shine.** A typical learner lasts 2–3 minutes, fast typists 5+.
- **Vocabulary you can see grow.** Every new word lands in a lifetime Word Collection.
- **Small enough to finish.** One JS file, one `state` object, constants at the top, no external assets.

## Tech at a glance

- HTML5 canvas, fixed internal resolution 480 × 270, drawn at 2× with smoothing off.
- One DOM `<input>` for typing (autocorrect off).
- Saves in `localStorage` (keys prefixed `llb.`).
- Sound synthesized with WebAudio; no audio files.
- Plain ES2020 JavaScript, no frameworks, no bundler.

## Open questions

Tracked in the [GDD](docs/GDD.md#open-questions) and the [Roadmap](docs/ROADMAP.md#open-questions-blocking-or-affecting-mvp). The most pressing: a licence for this repo itself (none chosen yet).

## Credits

Design and development: Dung Pham, for the English Club.
