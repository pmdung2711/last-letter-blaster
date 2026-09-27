# Testing

The game has no automated test suite: it is one file with no build step, and most of what can break is feel, timing and layout. Testing is a short smoke test on every change, a full manual pass before a club session, and a tuning simulation whenever difficulty numbers change.

## Smoke test (5 minutes)

Run before every merge to `main`.

1. Open `index.html`. Title shows, no console errors.
2. **Play.** Input is focused; first enemy appears after about 1 s with a letter badge.
3. Type a valid 3-letter word → Light laser, enemy (Scout) destroyed, new target is the word's last letter.
4. Type a wrong-letter word → "Must start with …", input shakes, text kept, no life lost.
5. Type the same valid word twice → second time flashes red in the used-words strip.
6. Press Esc → pause overlay hides the enemy; Resume → 3-2-1 → play continues.
7. Let three enemies hit the ship → explosion → recap with the word chain.
8. Enter on the recap → a new run starts.

## Full test plan

Run before each milestone is closed and before every club session.

### Validation

| Target | Input | Expected |
| --- | --- | --- |
| R | `re` | "Too short" |
| R | `apple` | "Must start with R" |
| R | `rocket` (already used) | Red flash in strip, no life lost |
| R | `rxqzt` | "Not in word list" |
| R | `Rocket!` | Normalised to `rocket`, accepted |
| R | `rocket` while no enemy on screen | "Wait for the next enemy", word not used up |
| any | `CLUB_WORD` starting with the target | Accepted even if not in the list; Club Spirit +300 once |

### Lasers and damage

| Word length | Expected |
| --- | --- |
| 3–4 | Light, 1 damage, thin beam 0.12 s |
| 5–6 | Heavy, 2 damage, glow, 0.15 s |
| 7+ | Mega, 3 damage, white core, 2 px shake, 0.2 s; one-shots any enemy |
| Hit that leaves armor | Enemy flashes white 0.1 s, knocked back 8 px × damage, pips update |

### Scoring (check with the console helpers)

| Case | Expected |
| --- | --- |
| `wordPoints(6, 60)` | 60 |
| `wordPoints(6, 160)` | 90 |
| `wordPoints(6, 260)` | 120 |
| `wordPoints(3, 110)` | 38 (37.5 rounds up) |
| `killBonus(1)`, `killBonus(2)`, `killBonus(3)` | 25, 50, 75 |

### Enemies and speed

- [ ] 0–30 s: Scouts only. Fighters appear after 30 s, Cruisers after 60 s.
- [ ] Target Q, X or Z: badge pulses orange, warning tone, enemy visibly slower, any new spawn is a Scout.
- [ ] Speed multiplier in the HUD rises from ×1.0 toward ×2.0; stars drift faster.
- [ ] After a hit: speed drops (multiplier falls by 0.1), target letter unchanged, next enemy after 1.0 s.
- [ ] After a kill: next enemy after 0.4 s.

### Achievements

| Achievement | How to trigger |
| --- | --- |
| Long Shot | Any valid 8+ letter word |
| One Shot | Mega word on a full-armor Cruiser |
| Rare Letter | Valid word starting with Q, X or Z |
| Chain Master | 10 valid words without being hit; again at 20 |
| Double Trouble | `happy`, `apple`, `coffee` |
| Club Spirit | `CLUB_WORD`; only once per run |
| New Discovery | Any word not yet in the Word Collection |
| Speed Demon | Survive to top speed (about 3 min 42 s with no hits); dev helper `?dev` can set speed |
| Full Shields | 60 s without a hit; only once per run |

Each shows a 1.0 s pop-up beside the ship and appears with its count on the recap.

### Screens

- [ ] Title: best score, Club Word, idle ship, all buttons by mouse, arrows + Enter, and touch.
- [ ] First launch (clear storage): How to play card appears once.
- [ ] Hangar: every row cycles, 🎲 and 🎲 All work, Club colors sets main + second, name capped at 12, Save persists after reload, preview fires 3 laser tiers with sound.
- [ ] Recap: score, New best banner only when earned, chips with new-word markers, achievements with counts, rank.
- [ ] Leaderboard: 10 rows max, ship icons match each entry's ship at the time, new entry highlighted.
- [ ] Word Collection: total and A–Z counts match; selecting a letter lists words alphabetically.

### Input and focus

- [ ] Typing a letter while the input is unfocused puts it in the input.
- [ ] Double Esc within 0.4 s clears the input and does not pause.
- [ ] Switching tabs or clicking outside the window auto-pauses.
- [ ] Autocorrect, autocapitalise and suggestions are off on iOS and Android keyboards.

### Mobile layout

- [ ] Keyboard opens on run start.
- [ ] With the keyboard open, the ship, enemy and badge stay visible (`visualViewport`).
- [ ] Fire and Pause buttons are tappable and don't overlap the input.
- [ ] Go/Enter on the on-screen keyboard fires.

### Storage and resilience

- [ ] Private/incognito window: game plays fully; nothing saved; no errors.
- [ ] Corrupt a key in DevTools (e.g. `localStorage.setItem('llb.ship', '{bad')`): game loads with defaults.
- [ ] Unknown colour id in `llb.ship`: falls back to default.
- [ ] Reload after a run: leaderboard, collection, best and sound setting persist.

### Audio

- [ ] No sound before the first click or key press; no console autoplay warnings after it.
- [ ] Each event in the GDD audio table plays; keystroke is quiet.
- [ ] Sound toggle mutes everything and persists.

## Browser matrix

| Browser | Device | Priority |
| --- | --- | --- |
| Chrome (latest) | Windows / macOS laptop | Must pass |
| Edge (latest) | Windows laptop | Must pass |
| Safari (latest) | macOS | Must pass |
| Chrome | Android phone | Must pass |
| Safari | iPhone | Must pass |
| Firefox (latest) | Desktop | Should pass |

Update priorities once the club's device mix is known (open question).

## Tuning simulation

The GDD's tuning check models three typists. Re-run it whenever speed, spawn delays, armor, lives or damage change.

**Model**

- A typist has a *think time* `T` (seconds before the first key) and a *per-letter time* `L`.
- For each shot, the typist picks a random unused word from the word list that starts with the target letter; the shot lands `T + L × length` seconds after the enemy appears or after the previous shot.
- Everything else follows the real rules: speed ramp, spawn table, knockback, rare-letter slowdown, hit penalty, 3 lives.
- Run 200 simulated runs per typist and report the median survival time.

**Expected results** (from the GDD, prototype values)

| Typist | T | L | Median survival |
| --- | --- | --- | --- |
| Slow learner | 3.0 s | 0.4 s | about 1 min 30 s |
| Typical learner | 2.0 s | 0.3 s | about 2 min 18 s |
| Fast typist | 0.8 s | 0.12 s | over 5 min |

**Where it lives:** a `simulateRun(thinkS, perLetterS, runs)` function in the Run logic section that uses the same update functions with a fixed `dt`, exposed on `window.llbDev` only when the page is opened with `?dev`. It must not change `state` outside a temporary run object.

## Dev helpers (`?dev` only)

| Helper | Purpose |
| --- | --- |
| `llbDev.simulate(T, L, n)` | Tuning simulation above |
| `llbDev.setSpeed(px)` | Jump base speed, e.g. to test Speed Demon |
| `llbDev.setTarget('q')` | Force a target letter, e.g. to test rare letters |
| `llbDev.spawn('cruiser')` | Replace the current enemy |
| `wordPoints`, `killBonus`, `speedMultiplier`, `laserForLength` | Pure helpers, always callable from the console |

Dev helpers are wired in one small block at the end of the Main loop section and do nothing without `?dev`.
