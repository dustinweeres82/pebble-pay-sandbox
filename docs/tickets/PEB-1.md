# PEB-1 · Add design-system tokens (no visual change)

Base branch: main

## Why
The legacy templates paint with palette classes and `dark:` twins. Before moving them, the
token layer needs every role they use, set to exactly what they render today.

## Do
- In `src/styles/theme_pebble.css`, add these roles to the light block and the dark block (light → dark):
  - per intent (`primary` ocean, `info` sky, `success` leaf, `warning` sun, `destructive` ember):
    `-hover` (200 → 200), `-active` (700 → 600; warning 700 → 650), `-subtle` (100 → stone-700), `-emphasis` (500 → 500)
  - `caution` sun-650 → sun-400
  - `on-hover` stone-800 → stone-800, `on-active` stone-200 → stone-900, `focus-border` stone-600 → stone-50
  - `disabled` stone-200 → stone-700, `disabled-foreground` stone-500 → stone-400
  - `field` white → stone-900, `field-border` stone-300 → stone-700, `field-focus` sky-600 → sky-400, `field-placeholder` stone-500 → stone-500
- Map each in `src/styles/shadcn_base.css` (`@theme inline`) and add a fallback derived from shadcn roles in a `@layer base` block, so the Partner brand still works.
- Add a token table to DESIGN.md.
- Don't change any component or template, and don't edit `theme_partner.css`.

## Done when
- `npm run build` passes.
- Visual diff: **0 of 32 screenshots changed.**
