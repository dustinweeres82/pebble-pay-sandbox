# Pebble Pay design system

Pebble Pay is a fictional brand. This repo is an open sandbox that rehearses a real-world
migration: an older server-rendered component set (`src/legacy/`) and newer React
components (`src/components/ui/`, shadcn/ui) that look different, painted with raw palette
colors. The goal is one token layer that both read, so a design change is made once.

Real-world reference (private): the ZZDS-V2 Figma library documents the same pattern for
ZayZoon. Figma variables mirror the tokens below one to one.

## Principles

1. **Production is the source of truth.** Tokens are set to what users see today.
2. **Semantic over primitive.** Components use roles (`bg-primary`, `text-muted-foreground`),
   never palette colors (`bg-ocean-600`) and never `dark:` color variants.
3. **One name everywhere.** Tokens, props and values are spelled the same in CSS, JS and Figma.
4. **No visual change unless the PR says so.** Refactors must leave every screenshot identical.
   Design changes are separate PRs that change tokens on purpose.

## Files

| Layer | File |
| --- | --- |
| Palette (primitives) | `src/styles/palette.css` |
| Role → Tailwind mapping (+ fallbacks) | `src/styles/shadcn_base.css` |
| Pebble values (default brand) | `src/styles/theme_pebble.css` |
| Partner values (second brand, placeholder) | `src/styles/theme_partner.css` — only shadcn roles; don't edit for design-system work |
| Legacy templates | `src/legacy/templates.js` |
| React components | `src/components/ui/*.jsx` |

Mode and brand are attributes on `<html>`: `data-theme="light|dark"`, `data-brand="pebble|partner"`.

## Migration plan (in order, one PR each)

1. **Tokens, no visual change.** Add the semantic tokens the legacy templates need, with values
   equal to what they render today. Nothing reads them yet.
2. **Legacy templates on tokens, no visual change** for the Pebble brand. Replace palette and
   `dark:` classes with tokens. Expected: the Partner brand now reaches the legacy templates.
3. **shadcn components restyled to the legacy look.** Keep shadcn structure and props
   (`variant`, `size`, `asChild`); add variants where the legacy set has them. Expected:
   only the React column changes, to match the legacy column.
4. **Design changes, through tokens.** One decision per PR (e.g. one yellow instead of two).
   Expected: the change appears in both columns at once.

## Components (legacy ↔ React)

| Legacy template | React (shadcn) | Notes |
| --- | --- | --- |
| `button({ theme: "primary", themeColor })` | `<Button variant>` | general → `default`, secondary theme → `secondary`, caution → `caution`, destruction → `destructive` |
| `alert({ theme })` | `<Alert variant>` + `AlertIcon`, `AlertTitle`, `AlertDescription` | info → `default`, caution → `warning` |
| `badge({ status })` | `<Badge variant>` | paid → `success`, pending → `warning`, overdue → `destructive`, new → `info` |
| `textField(...)` | `<Input>` inside a label | |

## Token naming

- CSS variable `--<role>`; Tailwind utility `bg-<role>` / `text-<role>` / `border-<role>`.
- Text on a fill is `<role>-foreground`. Legacy fills all use `primary-foreground`.
- Intent states: `<intent>-hover`, `<intent>-active` (fills), `<intent>-subtle` (tinted surface),
  `<intent>-emphasis` (accent border/icon on the subtle surface).
- Shared states: `disabled`, `disabled-foreground`, `on-hover`, `on-active`, `focus-border`.
- Fields: `field`, `field-border`, `field-focus`, `field-placeholder`.

## Token values (Pebble, light → dark)

| Token | Value |
| --- | --- |
| `<intent>-hover` | 200 → 200 (`primary` ocean, `info` sky, `success` leaf, `warning` sun, `destructive` ember) |
| `<intent>-active` | 700 → 600 (`warning` 700 → 650) |
| `<intent>-subtle` | 100 → stone-700 |
| `<intent>-emphasis` | 500 → 500 |
| `caution` | sun-650 → sun-400 (legacy caution buttons; `warning` is sun-600) |
| `on-hover`, `on-active` | stone-800, stone-200 → stone-800, stone-900 |
| `focus-border` | stone-600 → stone-50 |
| `disabled`, `disabled-foreground` | stone-200, stone-500 → stone-700, stone-400 |
| `field`, `field-border`, `field-focus` | white, stone-300, sky-600 → stone-900, stone-700, sky-400 |
| `field-placeholder` | stone-500 → stone-500 |

## Rules for code changes

- Write class names in full (Tailwind scans source); no string-built class names.
- A new role is added in three places: `theme_pebble.css` (light **and** dark), `shadcn_base.css`
  (mapping and a fallback derived from shadcn roles), and this file.
- Every PR states which screenshots it expects to change. CI posts the visual diff.
