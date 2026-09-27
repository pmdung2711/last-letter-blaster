# Save data

All persistence is `localStorage` on the player's device. There is no server and no account (see [ADR 0003](decisions/0003-local-only-persistence.md)).

## Rules

1. Four keys, all prefixed `llb.`. Nothing else is written.
2. Every read and write goes through `loadJson` / `saveJson` and is wrapped in `try/catch`. If storage throws (private mode, quota, blocked cookies), the game keeps playing, sets `state.save.ok = false`, and simply stops saving. The title screen may show a small "Progress not saved on this device" note when `ok` is false.
3. Every stored object carries `v` (the `SAVE_VERSION` it was written with). Loading code must accept a missing or older `v` and fill defaults; it must never throw on bad data.
4. Colours and shapes are stored as **ids** (`'blue'`, `'arrow'`), never hex, so palettes can be retuned without breaking saves. An unknown id falls back to the default.
5. Writes happen only at these moments: Hangar **Save**; end of a run; sound toggle; dismissing the first-launch card. Never during play.

## `llb.ship`

The current Hangar choice.

```json
{
  "v": 1,
  "name": "MINH ANH",
  "shape": "delta",
  "main": "blue",
  "second": "yellow",
  "laser": "cyan"
}
```

| Field | Type | Valid values | Default |
| --- | --- | --- | --- |
| `name` | string | 1–12 chars of `A–Z 0–9` and space | `"PILOT"` |
| `shape` | string | `arrow`, `delta`, `saucer`, `twin` | `arrow` |
| `main`, `second` | string | ids in `SHIP_MAIN_COLORS` | `blue`, `white` |
| `laser` | string | ids in `LASER_COLORS` (`cyan`, `pink`, `lime`, `gold`, `white`, `club`) | `cyan` |

## `llb.leaderboard`

Top 10 runs on this device, sorted by score descending.

```json
{
  "v": 1,
  "entries": [
    {
      "name": "MINH ANH",
      "ship": { "shape": "delta", "main": "blue", "second": "yellow", "laser": "cyan" },
      "score": 4820,
      "chain": 37,
      "date": "2026-10-04"
    }
  ]
}
```

| Field | Notes |
| --- | --- |
| `ship` | A **copy** of the choice at the time of the run, so later Hangar changes don't repaint old entries. |
| `chain` | Number of valid words in the run (`run.chain.length`). |
| `date` | Local date, `YYYY-MM-DD`. |

Insertion: find the first entry with a strictly lower score, insert before it, truncate to 10. Runs scoring 0 are not inserted. The resulting index (or −1) is stored in `run.rank` for the recap highlight.

## `llb.collection`

The lifetime Word Collection.

```json
{
  "v": 1,
  "words": ["able", "about", "rocket", "tiger"]
}
```

- Loaded into `state.save.collection` as a `Set`; written back sorted.
- A word is added the moment it is fired. "New" (for the New Discovery bonus and the recap chip marker) means it was **not** in the set before that shot.
- Upper bound is the word list (≈ 45,000 words, about 500 KB as JSON), well inside the usual 5 MB quota. Real collections will be far smaller.

## `llb.settings`

```json
{
  "v": 1,
  "sound": true,
  "best": 4820,
  "seenHowTo": true
}
```

| Field | Notes |
| --- | --- |
| `sound` | Sound on/off toggle (Title and Pause screens). |
| `best` | Personal best score on this device. |
| `seenHowTo` | Hides the first-launch How to play card once dismissed. Proposed; not in the GDD's key list but belongs to settings. |

## Resetting

For club devices, see [Club leader guide → Resetting scores](CLUB_LEADER_GUIDE.md#resetting-scores). There is no in-game reset in MVP.

## Future migrations

When a shape changes, bump `SAVE_VERSION` and add a `migrateX(data)` function in the storage section that upgrades older objects on load. Never delete a player's collection during a migration.
