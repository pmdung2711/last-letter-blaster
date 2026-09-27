# 0003 — Local-only persistence for MVP

- **Status:** Accepted
- **Date:** 2026-09-27

## Context

Players want a leaderboard, a personal best and a lifetime Word Collection. An online leaderboard would need a server, sign-in (Google was considered), moderation of pilot names and handling of student data.

## Decision

MVP stores everything in `localStorage` under four `llb.` keys, with a per-device top 10. Every storage call is wrapped in `try/catch`; the game plays normally when storage is unavailable. Online leaderboard, accounts and cloud save are *Cut* for MVP and deferred to a possible version 2.

## Consequences

- **Good:** no server, no cost, no personal data leaves the device; nothing to moderate.
- **Good:** a shared club laptop naturally becomes "the club leaderboard".
- **Cost:** scores and collections don't follow a player between devices or browsers; clearing browser data loses them.
- **Cost:** no cross-device competition until version 2.
- Save objects carry a version field so a later migration (or export to a server) can read them. See [SAVE_DATA.md](../SAVE_DATA.md).
