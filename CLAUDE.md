# Agent instructions

Read `DESIGN.md` before changing anything in `src/styles/`, `src/legacy/`, `src/components/` or `src/pages/`.

- Work from the ticket. One ticket = one branch = one draft PR.
- Branch name: `<TICKET-ID>-short-slug` (e.g. `PEB-2-legacy-on-tokens`); PR title starts with the ticket ID.
- Use semantic tokens only. No palette classes (`bg-ocean-600`), no `dark:` color variants.
  (The demo toolbar in `src/App.jsx` is exempt.)
- Don't edit `src/styles/theme_partner.css`. Partner must keep looking like stock shadcn.
- Pages come in two versions: `*Legacy.jsx` (Pebble today) and `*React.jsx` (Partner today). Keep their
  `data-testid`s and content identical. Porting a page means Pebble switches to the React version.
- Run `npm run build` before committing; it must pass.
- PR description: what changed, which screenshots should change (brand · mode · page-section, or "none"),
  and any token value that moved. CI attaches the visual diff and a Vercel preview.
