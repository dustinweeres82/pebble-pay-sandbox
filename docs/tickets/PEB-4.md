# PEB-4 · Port the Off-cycle payouts page to React

Base branch: main (after PEB-3 is merged)

## Why
Step 3 of 3: React. Partner already renders Off-cycle payouts with the React components
(`src/pages/PayoutsReact.jsx`). Now that those components speak Pebble's tokens, Pebble can use the
same page, and the legacy version goes away.

## Do
- In `src/App.jsx`, render `<PayoutsReact />` for every brand on the `payouts` page.
- Delete `src/pages/PayoutsLegacy.jsx`.
- If anything on the page looks off in Pebble, fix it with tokens or the component's variants,
  not with one-off colors. Keep every `data-testid` and the content.
- Don't edit `src/legacy/templates.js` (the other page and the nav still use it).

## Done when
- Visual diff: Pebble's `payouts-header`, `payouts-switcher`, `payouts-filters` and `payouts-table` change
  (light and dark; legacy look → shadcn on Pebble's tokens). Nothing changes for Partner.
- "Show components" on Pebble's Payouts page shows `ui/…` labels everywhere except the nav.
