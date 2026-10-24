# PEB-5 · Port the Create a payment page to React

Base branch: main (after PEB-4 is merged)

## Why
Step 3 of 3, continued: the second page.

## Do
- In `src/pages/CreatePayment.jsx`, rebuild the `header`, `alert`, `form`, `actions` and `support` sections with
  `src/components/ui` (Button, Alert `variant="info"`, Input, NativeSelect, Textarea, Label).
  Keep each section's `data-testid` and its content. Help text under a field: `text-sm text-muted-foreground`.
  - Breadcrumb: a small `Button variant="link"` back to `#payouts`, above a `text-2xl font-semibold` title.
  - Disabled "Workplace" field: `<Input disabled />`.
  - Support: a `bg-card` bordered block with the title, text and a default Button.
  - "Cancel" (`Button variant="ghost"`) goes back to `#payouts`.
- Don't edit `src/legacy/templates.js` (the nav still uses it) or any component's look.

## Done when
- Visual diff: every `create-*` screenshot except `create-nav` changes, in every brand and mode. Nothing else changes.
