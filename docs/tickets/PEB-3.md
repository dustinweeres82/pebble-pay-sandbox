# PEB-3 · Restyle shadcn components to the legacy look

Base branch: main (after PEB-2 is merged)

## Why
Users see the legacy look everywhere except the newer React screens. Give the React
components the same look through the same tokens, keeping shadcn's structure and props.

## Do
- `src/components/ui/button.jsx`: pill (`rounded-full`), 4px border, semibold, `text-xl`, full width at the default size.
  Variants: `default` (primary fill), `secondary`/`outline` (background + primary text), `caution` (new), `destructive`,
  `ghost`, `link`. Hover/active/disabled/focus use the same tokens as the legacy button.
- `src/components/ui/alert.jsx`: 4px top border in `<intent>-emphasis`, `<intent>-subtle` surface, `text-foreground`.
  Variants `default` (info), `success`, `warning`, `destructive`. Add `AlertIcon` and `AlertContent`.
- `src/components/ui/badge.jsx`: status pill. Add `success`, `warning`, `info` variants.
- `src/components/ui/input.jsx`: legacy field (bottom border, `field-*` tokens).
- Update the React column in `src/App.jsx` to use the new variants with the same content as the legacy column.
- Add a legacy ↔ React mapping table to DESIGN.md.

## Done when
- Only react-* screenshots change. In Pebble, each React section looks the same as its legacy section.
