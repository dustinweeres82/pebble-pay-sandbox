# PEB-3 · Align shadcn components to Pebble's tokens

Base branch: main (after PEB-2 is merged)

## Why
Step 2 of 3. Before any page moves to React, the React components should speak the same token
language as the legacy templates. We keep shadcn's shapes, sizes and structure (stock look),
and only point colors and states at the semantic tokens, so Partner stays off-the-shelf shadcn.

## Do
- `src/components/ui/badge.jsx`: add `success`, `warning`, `info` variants
  (`bg-<intent> text-primary-foreground`, same shape as `default`).
- `src/components/ui/alert.jsx`: add `info`, `success`, `warning` variants using `<intent>-subtle`
  surface and `<intent>-emphasis` border; point `destructive` at `destructive-subtle` / `destructive-emphasis`.
  Keep the stock radius, border width and padding.
- `src/components/ui/button.jsx`: add a `caution` variant (`bg-caution text-primary-foreground`, stock shape).
- `input.jsx`, `native-select.jsx`, `textarea.jsx`: background `bg-field`, border `border-field-border`,
  placeholder `placeholder:text-field-placeholder`, focus ring `ring-field-focus`. Keep stock height and radius.
- On the Components page (`src/pages/Components.jsx`), add one example of each new variant.
- Add a "shadcn on Pebble tokens" table to DESIGN.md (component → variant → tokens).
- Don't change shapes, sizes or the existing variants' structure, and don't touch `src/legacy/` or the product pages.

## Done when
- Visual diff: only `components-*` screenshots change.
  - Pebble: field borders and the new variant rows change.
  - Partner: only the new variant rows appear; existing variants look the same (stock shadcn).
