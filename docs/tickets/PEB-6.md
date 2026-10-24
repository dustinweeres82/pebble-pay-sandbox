# PEB-6 · Port the navigation and remove the legacy templates

Base branch: main (after PEB-5 is merged)

## Why
Step 3 of 3, finished. The nav is the last piece on the legacy templates. Partner already uses the
React nav (`src/components/AppNav.jsx`). Once Pebble does too, `src/legacy/` can be deleted and every
brand renders from one set of components.

## Do
- In `src/App.jsx`, render `<AppNav />` (inside the `data-testid="nav"` wrapper) for every brand.
- Delete `src/legacy/templates.js`, the `Legacy` helper in `src/shell.jsx` if nothing uses it, and any import of them.
- Remove the legacy rows from DESIGN.md.

## Done when
- `npm run build` passes and nothing imports `src/legacy/`.
- Visual diff: only Pebble's `*-nav` screenshots change (every page, light and dark). Nothing changes for Partner.
