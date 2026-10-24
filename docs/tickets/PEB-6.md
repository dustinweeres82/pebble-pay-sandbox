# PEB-6 · Port the navigation and remove the legacy templates

Base branch: main (after PEB-5 is merged)

## Why
Step 3 of 3, finished. The nav is the last piece on the legacy templates. Once it moves,
`src/legacy/` can be deleted and every brand renders from one set of components.

## Do
- Add `src/components/AppNav.jsx`: the same items, icons, BETA badge (`Badge variant="info"`) and profile
  block, built with plain markup and the `sidebar*` tokens (`bg-sidebar`, `text-sidebar-foreground`,
  `bg-sidebar-accent` for the active item, `text-sidebar-muted`, `border-sidebar-border`, `bg-sidebar-primary`).
  Use shadcn's sidebar sizing: `w-64`, `text-sm font-medium` items, `rounded-md` active item inside `px-3`.
- In `src/App.jsx`, render `<AppNav active=… />` inside the `data-testid="nav"` wrapper instead of `legacy.nav`.
- Delete `src/legacy/templates.js` and any import of it. Remove the legacy rows from DESIGN.md.

## Done when
- `npm run build` passes and nothing imports `src/legacy/`.
- Visual diff: only the `*-nav` screenshots change (every page, brand and mode).
