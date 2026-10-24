# PEB-3 · Align shadcn components to Pebble's tokens

Base branch: main (after PEB-2 is merged)

## Why
Step 2 of 3. Partner's pages are already built with the React (shadcn) components. Before Pebble
moves onto them, they need the intents Pebble uses (success, warning, info, caution) and the field
tokens, so they look right in Pebble without one-off styles. Shapes, sizes and structure stay stock.

## Do
- `src/components/ui/badge.jsx`: add `success`, `warning`, `info` variants
  (`bg-<intent> text-primary-foreground`, same shape as `default`).
- `src/components/ui/alert.jsx`: add `info`, `success`, `warning` variants using `<intent>-subtle`
  surface and `<intent>-emphasis` border; point `destructive` at `destructive-subtle` / `destructive-emphasis`.
  Keep the stock radius, border width and padding.
- `src/components/ui/button.jsx`: add a `caution` variant (`bg-caution text-primary-foreground`, stock shape).
- `input.jsx`, `native-select.jsx`, `textarea.jsx`: background `bg-field`, border `border-field-border`,
  placeholder `placeholder:text-field-placeholder`, focus ring `ring-field-focus`. Keep stock height and radius.
- Use the new variants in the React pages: in `PayoutsReact.jsx` status badges `success` (Completed),
  `warning` (Processing), `destructive` (Failed) and the BETA badge `info`; in `CreatePaymentReact.jsx` the alert
  `info`; in `src/components/AppNav.jsx` the BETA badge `info`.
- On the Components page, add one example of each new variant.
- Add a "shadcn on Pebble tokens" table to DESIGN.md (component → variant → tokens).
- Don't change shapes or sizes, and don't touch `src/legacy/` or the legacy pages.

## Done when
- Visual diff: `components-*` change in both brands. Partner's `payouts-header`, `payouts-table`,
  `create-alert` and `*-nav` change (intent colors on badges and the alert). Pebble's product pages don't change.
