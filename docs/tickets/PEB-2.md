# PEB-2 · Legacy templates on tokens (no visual change for Pebble)

Base branch: main (after PEB-1 is merged)

## Why
Step 1 of 3, continued. Today a color, dark-mode or brand change has to be repeated in every
legacy template. After this, it's made once in the theme, the same way the React components already work.

## Do
- In `src/legacy/templates.js`, replace every palette class and `dark:` variant with semantic tokens:
  - buttons → `bg-<intent>` + `text-primary-foreground`; secondary theme → `bg-background` + `text-<intent>`;
    hover/active → `<intent>-hover` / `<intent>-active` (caution uses `caution` for the fill and `warning-*` for states);
    `on-hover`, `on-active`, `focus-border`, `disabled`, `disabled-foreground`
  - text button, breadcrumb → `text-primary`; title, labels, table text → `text-foreground`
  - alerts → `<intent>-subtle` surface, `<intent>-emphasis` border and icon, `text-foreground`
    (caution → warning, destruction → destructive)
  - badges → `bg-success` / `bg-warning` / `bg-destructive` / `bg-info` + `text-primary-foreground`
  - fields and selects → `field`, `border`, `field-border`, `field-focus`, `field-placeholder`, `field-help`, `disabled*`
  - table → `border`, striped rows `bg-card`
  - nav → `sidebar`, `sidebar-foreground`, `sidebar-muted`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`
  - support banner → `bg-muted`
- Keep every function signature the same. Don't touch `src/pages/` or `src/components/ui/`.

## Done when
- `src/legacy/` has no palette classes and no `dark:`.
- Visual diff: **0 of 68 screenshots changed.** Pebble's legacy pages look exactly the same, and
  Partner doesn't use the legacy templates (it renders the React pages).
