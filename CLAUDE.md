# Agent instructions

Read `DESIGN.md` before changing anything in `src/styles/`, `src/legacy/` or `src/components/ui/`.

- Work from the ticket. One ticket = one branch = one draft PR.
- Branch name: `<TICKET-ID>-short-slug` (e.g. `PEB-2-legacy-on-tokens`); PR title starts with the ticket ID.
- Use semantic tokens only. No palette classes (`bg-ocean-600`), no `dark:` color variants.
- Don't edit `src/styles/theme_partner.css`.
- Run `npm run build` before committing; it must pass.
- PR description: what changed, which screenshots should change (or "none"), and any token
  value that moved. CI attaches the visual diff and a Vercel preview.
