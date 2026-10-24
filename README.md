# Pebble Pay — design system sandbox

An open, fictional sandbox for two demos:

- **A. Migration order.** Semantic tokens first (no visual change) → shadcn components on those
  tokens → pages ported to React, one PR each.
- **B. Agent workflow.** Linear ticket → AI agent opens a draft PR → CI posts a visual diff and
  a preview link → a person reviews and merges. Watch it at `/agent/`.

```
npm install
npm run dev        # http://localhost:5173
```

The app has two product pages (Off-cycle payouts, Create a payment) and a Components page.
The toolbar switches page, brand (Pebble, or Partner on stock shadcn), dark mode, and
"Show components", which labels every element as a legacy template or a React component.
URL parameters work too: `?brand=partner&theme=dark&inspect=1#create`.

- `DESIGN.md` — the design-system contract and migration plan.
- `CLAUDE.md` — instructions the agent follows.
- `docs/tickets/` — PEB-1 … PEB-6, the tickets to create in Linear.
- `docs/SETUP.md`, `docs/AGENT-CONSOLE.md` — GitHub, Vercel, Linear, agent and console setup.
- `docs/DEMO.md` — the demo script.
