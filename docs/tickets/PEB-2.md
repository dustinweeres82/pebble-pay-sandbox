# PEB-2 · Legacy templates on tokens (no visual change for Pebble)

Base branch: main (after PEB-1 is merged)

## Why
Today a color, dark-mode or brand change has to be repeated in every legacy template.
After this, it's made once in the theme.

## Do
- In `src/legacy/templates.js`, replace every palette class and `dark:` variant with semantic tokens:
  - button fills → `bg-<intent>` + `text-primary-foreground`; secondary theme → `bg-background` + `text-<intent>`;
    hover/active → `<intent>-hover` / `<intent>-active` (caution uses `caution` for the fill and `warning-*` for states);
    `on-hover`, `on-active`, `focus-border`, `disabled`, `disabled-foreground`
  - alerts → `<intent>-subtle` surface, `<intent>-emphasis` border and icon, `text-foreground` (caution → warning, destruction → destructive)
  - badges → `bg-success` / `bg-warning` / `bg-destructive` / `bg-info` + `text-primary-foreground`
  - text field → `field`, `field-border`, `field-focus`, `field-placeholder`, `text-foreground`
- Keep the function signatures the same.

## Done when
- `src/legacy/` has no palette classes and no `dark:`.
- Visual diff: **0 Pebble screenshots changed.** Partner · legacy-* screenshots change (expected:
  the second brand now reaches the legacy templates). Nothing in react-* changes.
