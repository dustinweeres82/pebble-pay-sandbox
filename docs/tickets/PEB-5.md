# PEB-5 · Port the Create a payment page to React

Base branch: main (after PEB-4 is merged)

## Why
Step 3 of 3, continued: the second page moves Pebble onto `src/pages/CreatePaymentReact.jsx`,
which Partner already uses.

## Do
- In `src/App.jsx`, render `<CreatePaymentReact />` for every brand on the `create` page.
- Delete `src/pages/CreatePaymentLegacy.jsx`.
- Fix anything that looks off in Pebble with tokens or variants only. Keep every `data-testid` and the content.
- Don't edit `src/legacy/templates.js` (the nav still uses it).

## Done when
- Visual diff: Pebble's `create-header`, `create-alert`, `create-form`, `create-actions` and `create-support`
  change (light and dark). Nothing changes for Partner.
