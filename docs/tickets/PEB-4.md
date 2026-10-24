# PEB-4 · Port the Off-cycle payouts page to React

Base branch: main (after PEB-3 is merged)

## Why
Step 3 of 3: React. With tokens in place on both sides, a page can move from the legacy
templates to the React components without new colors or one-off styles.

## Do
- In `src/pages/Payouts.jsx`, rebuild the `header`, `switcher`, `filters` and `table` sections with
  `src/components/ui` (Button, Badge, NativeSelect, Label, Table, Button `variant="link"`).
  Keep each section's `data-testid` and its content. Use plain layout classes (flex, gap, padding)
  and semantic tokens only.
  - Status badges: `success` (Completed), `warning` (Processing), `destructive` (Failed). BETA: `info`.
  - Page title: `text-2xl font-semibold` (shadcn page heading).
  - "Create new payment" navigates with `onClick={() => (window.location.hash = "create")}`.
- Don't edit `src/legacy/templates.js` (the other page and the nav still use it) or any component's look.

## Done when
- Visual diff: `payouts-header`, `payouts-switcher`, `payouts-filters` and `payouts-table` change
  in every brand and mode (legacy look → shadcn look). Nothing else changes.
- "Show components" on the Payouts page shows only `ui/…` labels outside the nav.
