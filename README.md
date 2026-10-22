# Pebble Pay — design system sandbox

An open, fictional sandbox for two demos:

- **A. Migration order.** Tokens first (no visual change) → legacy templates on tokens →
  React (shadcn) restyled to match → design changes through tokens.
- **B. Agent workflow.** Linear ticket → AI agent opens a draft PR → CI posts a visual diff and
  a preview link → a person reviews and merges.

```
npm install
npm run dev        # http://localhost:5173  (?theme=dark&brand=partner also works)
```

- `DESIGN.md` — the design-system contract.
- `CLAUDE.md` — instructions the agent follows.
- `docs/SETUP.md` — GitHub, Vercel, Linear and agent setup (about 20 minutes).
- `docs/DEMO.md` — the demo script.
- `docs/tickets/` — the four migration tickets to create in Linear.

Branches `step-1-tokens` … `step-4-one-yellow` hold a finished version of each step
(the answer key), so the demo still works if the live agent run is slow.
