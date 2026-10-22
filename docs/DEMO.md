# Demo script (10–12 minutes)

## Before the demo
- PEB-1, PEB-2 and PEB-3 are merged (run them through the agent the day before, or open PRs
  from the `step-*` branches and merge them in order). Keep their PRs to show.
- PEB-4 is in Linear, unlabelled. The app (`main`) is deployed on Vercel.
- Tabs open: Linear board, the GitHub repo, the Vercel production URL, ZZDS-V2 in Figma.

## 1. The problem (2 min)
- Open the app at the **before** state: in Vercel → Deployments, open the deployment of the
  "Before" commit (or run `git checkout a62adaa && npm run dev` locally). Legacy and React columns look different; switch Brand to Partner — the legacy
  column ignores it.
- "This is our situation in miniature: Echo is the legacy column, shadcn is the React column."

## 2. The order of migration (4 min) — show the merged PRs
- **PEB-1 Tokens**: visual diff comment "0 of 32 changed". "We added the vocabulary without touching a pixel."
- **PEB-2 Legacy on tokens**: "0 Pebble screenshots changed"; Partner legacy sections changed —
  "the second brand now reaches the old templates for free."
- **PEB-3 React restyled**: only the React column changed, and now matches the legacy column.
- ZZDS-V2 in Figma: same token names, same components. "Figma mirrors production."

## 3. The agent, live (4 min)
- In Linear, add the `agent` label to **PEB-4 · One yellow**. Talk through the ticket while it runs:
  it says what to change, what *not* to change, and what the visual diff should show.
- When the draft PR appears: one-line diff in `theme_pebble.css` + DESIGN.md.
  Visual diff: **2 of 32 changed — the caution button in both columns.** Open the Vercel preview.
  Read the AI review comment.
- Merge. Linear moves PEB-4 to Done.

## 4. The pitch (1 min)
- Small, single-purpose PRs with automatic previews and proof of "no visual change".
- The agent holds scoped repo access; people review and merge.
- Ask: run this on design-system tickets in `web-app`, starting with Echo on tokens.

If the live run is slow: open the PR from `step-4-one-yellow` and walk through the same checks.
