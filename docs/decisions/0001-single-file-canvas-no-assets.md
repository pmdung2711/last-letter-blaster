# 0001 — One JavaScript file, canvas, no external assets

- **Status:** Accepted
- **Date:** 2026-09-27

## Context

The game is built by one developer for a school English club. It must run from a USB stick, a shared laptop or a static host, on desktop and in mobile browsers. The biggest risk to the project is not finishing it.

## Decision

- The whole game is `index.html` plus one `game.js` (~2,000 lines, excluding the word list).
- All mutable data lives in a single `state` object; all tuning numbers are constants at the top of the file.
- Rendering is a 480 × 270 HTML5 canvas drawn at 2× with smoothing off.
- Sprites are string grids in the source, recoloured by palette swap. Sound is synthesized with WebAudio. Text uses the system `monospace` font.
- No frameworks, no bundler, no npm dependencies, no image/audio/font files, no CDN.

## Consequences

- **Good:** opens by double-click; nothing to install, build or break; trivial to host; the club leader can edit one line to change the Word of the Week; every number is findable in one place.
- **Good:** palette-swapped grids make the Hangar's cosmetic choices almost free.
- **Cost:** one long file needs discipline: numbered sections, strict function prefixes (see [ARCHITECTURE.md](../ARCHITECTURE.md)).
- **Cost:** no module system means no automated unit tests beyond calling pure helpers in the console.
- **Cost:** pixel art made of strings is slower to draw than in an editor; acceptable at these sprite sizes (≤ 20 × 20).
- Revisit only if the file grows well past ~2,500 lines or a second developer joins.
