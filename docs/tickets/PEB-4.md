# PEB-4 · One yellow

Base branch: main (after PEB-3 is merged)

## Why
Caution buttons use sun-650 while warning badges and alerts use sun-600. Two yellows for one
meaning. Decision: use sun-600 everywhere.

## Do
- In `src/styles/theme_pebble.css`, set `--caution` in the light block to `var(--color-sun-600)`. Dark stays sun-400.
- Update the `caution` row in DESIGN.md and add a "Decisions" entry for PEB-4.
- Change nothing else.

## Done when
- Visual diff: **2 of 32 screenshots changed** — `pebble · light · legacy-buttons` and
  `pebble · light · react-buttons` (the "Review payout" button). One token, both stacks.
