# Pebble Pay design system

Pebble Pay is a fictional brand. This repo is an open sandbox that rehearses a real-world
migration: an older server-rendered component set (`src/legacy/`) and newer React
components (`src/components/ui/`, shadcn/ui), painted differently. The goal is one token
layer that both read, then one set of React components on every page.

Real-world reference (private): the ZZDS-V2 Figma library documents the same pattern for
ZayZoon. Figma variables mirror the tokens below one to one.

## Principles

1. **Production is the source of truth.** Tokens are set to what users see today.
2. **Semantic over primitive.** Components use roles (`bg-primary`, `text-muted-foreground`),
   never palette colors (`bg-ocean-600`) and never `dark:` color variants.
3. **One name everywhere.** Tokens, props and values are spelled the same in CSS, JS and Figma.
4. **No visual change unless the PR says so.** Refactors leave every screenshot identical.
5. **The second brand stays stock.** Partner uses stock shadcn values and shapes. Pebble work must
   not change how Partner's existing components look.

## The app

| Page | Route | Pebble starts on | Partner renders | Visual diff sections |
| --- | --- | --- | --- | --- |
| Off-cycle payouts | `#payouts` | `PayoutsLegacy.jsx` (legacy templates) | `PayoutsReact.jsx` | `nav`, `header`, `switcher`, `filters`, `table` |
| Create a payment | `#create` | `CreatePaymentLegacy.jsx` | `CreatePaymentReact.jsx` | `nav`, `header`, `alert`, `form`, `actions`, `support` |
| Components | `#components` | React (shadcn/ui) | same | `nav`, `buttons`, `badges`, `alerts`, `fields`, `table` |

The nav is `legacy.nav` for Pebble and `src/components/AppNav.jsx` for Partner. Partner is new work,
so it's built with shadcn from the start; Pebble is the existing product on the legacy templates.
Both versions of a page share section names and content, so a port shows up as a clean visual diff.

Each section is a `data-testid`. CI screenshots every section in 2 brands × 2 modes:
**68 screenshots**, named `<brand>-<mode>-<page>-<section>`.

The demo toolbar (page, brand, Dark, Show components) sits outside every section, so it never
appears in a screenshot. "Show components" outlines each element with its source:
`legacy.<template>` or `ui/<component>`.

## Files

| Layer | File |
| --- | --- |
| Palette (primitives) | `src/styles/palette.css` |
| Role → Tailwind mapping (+ fallbacks) | `src/styles/shadcn_base.css` |
| Pebble values (default brand) | `src/styles/theme_pebble.css` |
| Partner values (stock shadcn) | `src/styles/theme_partner.css` — don't edit for design-system work |
| Legacy templates | `src/legacy/templates.js` |
| React components | `src/components/ui/*.jsx` |
| Pages | `src/pages/*Legacy.jsx` (Pebble, legacy) and `src/pages/*React.jsx` (Partner, then both), shell in `src/App.jsx` |
| React nav | `src/components/AppNav.jsx` |

Mode and brand are attributes on `<html>`: `data-theme="light|dark"`, `data-brand="pebble|partner"`.

## Migration plan (in order, one PR each)

**Step 1 — Semantic token alignment**
1. **PEB-1 Tokens, no visual change.** Add every role the legacy templates need, valued at what they render today.
2. **PEB-2 Legacy templates on tokens.** No visual change (0 of 68).

**Step 2 — shadcn components on Pebble's tokens**
3. **PEB-3** Point shadcn colors and states at the tokens, add the intent variants (success, warning,
   info, caution) and use them on the React pages. Stock shapes stay. Expected: `components-*` and
   Partner's badges and alert change; Pebble's product pages don't.

**Step 3 — React**
4. **PEB-4** Pebble moves onto `PayoutsReact.jsx`; delete the legacy page.
5. **PEB-5** Pebble moves onto `CreatePaymentReact.jsx`; delete the legacy page.
6. **PEB-6** Pebble moves onto `AppNav`; delete `src/legacy/`.
   Expected for each: only Pebble's sections for that page (or the nav) change. Partner doesn't change.

Design changes (for example, one yellow instead of two) come after, one token per PR.

## Token naming

- CSS variable `--<role>`; Tailwind utility `bg-<role>` / `text-<role>` / `border-<role>`.
- Text on a fill is `<role>-foreground`. Legacy fills all use `primary-foreground`.
- Intent states: `<intent>-hover`, `<intent>-active` (fills), `<intent>-subtle` (tinted surface),
  `<intent>-emphasis` (accent border/icon on the subtle surface).
- Shared states: `disabled`, `disabled-foreground`, `on-hover`, `on-active`, `focus-border`.
- Fields: `field`, `field-border`, `field-focus`, `field-placeholder`, `field-help`.
- Navigation: shadcn's `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`,
  `sidebar-border`, plus `sidebar-muted`.

## Rules for code changes

- Write class names in full (Tailwind scans source); no string-built class names.
- A new role is added in three places: `theme_pebble.css` (light **and** dark), `shadcn_base.css`
  (mapping, plus a fallback derived from shadcn roles when Partner doesn't define it), and this file.
- Keep `data-testid` names and section content identical between a page's legacy and React versions.
- Every PR states which screenshots it expects to change. CI posts the visual diff.
