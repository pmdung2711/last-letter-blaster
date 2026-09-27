# Changelog

All notable changes to this project are recorded here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow the milestones in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## [Unreleased]

### Added

- Repository created with full documentation, ahead of any code:
  README, CONTRIBUTING, GDD snapshot (2026-09-27), architecture, constants reference, save-data format, roadmap, test plan, club leader guide and three ADRs.
- `tools/sprite-kit.html`: dev-only sprite kit with every ship, enemy, UI, laser, explosion and proposed power-up sprite as string grids, a Hangar palette preview, a live run-screen mock-up, and grid/PNG/sprite-sheet/atlas export. Grids are ready to paste into `game.js` for M3.
- `tools/screens.html`: dev-only mock-ups of all eight screens (Title, How to play, Hangar, Run HUD, Pause, Recap, Leaderboard, Word Collection) at desktop 960×540 and mobile 390×844, with sample data.

### Design

- 2026-09-27 — Design moved from a side-scrolling runner to a typing space shooter, renamed *Last Letter Blaster* (see [ADR 0002](docs/decisions/0002-runner-to-shooter.md)).
- 2026-09-27 — GDD snapshot synced from the project.
