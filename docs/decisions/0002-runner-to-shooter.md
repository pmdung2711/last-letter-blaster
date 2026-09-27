# 0002 — Runner redesigned as a typing space shooter

- **Status:** Accepted
- **Date:** 2026-09-27
- **Supersedes:** the *Last Letter Runner* concept

## Context

The first prototype was a runner (*Last Letter Runner*) built on the same last-letter word chain. In play it felt flat. The shooter design answers that by giving word length a visible, mechanical payoff, in line with the pillar "Longer words, stronger lasers".

*(Dung: add any specific playtest notes about the runner here so the reasoning is on record.)*

## Decision

Redesign as *Last Letter Blaster*, an endless space shooter:

- One enemy at a time flies at a fixed ship carrying the target letter and 1–3 armor.
- A valid word fires a laser that always hits; **word length sets damage** (1 / 2 / 3).
- Enemies speed up over time; three hits end the run.
- The character creator becomes the **Hangar** (cosmetic ship shape and colours).

The last-letter chain, validation rules, word list, no-repeat rule and recap carry over unchanged.

## Consequences

- **Good:** longer words now visibly pay off (bigger laser, faster kill), which matches the club's goal.
- **Good:** armor creates a small decision (a short safe word vs. a long strong one) without adding any new control.
- **Good:** most prototype systems (typing, validation, chain, lives, pause, recap) are reused.
- **Cost:** Heavy and Mega laser visuals, more achievements and the Hangar are new work.
- The project GDD file is still named *Last Letter Runner — Game Design Doc.md*; its content is the shooter. Rename it when the final title is decided.
