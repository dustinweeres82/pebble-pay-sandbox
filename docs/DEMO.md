# Demo script (12–15 minutes)

## Before the demo
- Reset: press **Reset demo** at the bottom of the console home page (signed in). It puts `main` back to the
  legacy pages and the PEB tickets back to unstarted. (`reset-pebble-demo.sh` still works from the terminal.)
- Decide how far to pre-run. Suggested: run PEB-1 and PEB-2 the day before and merge them; keep their PRs open in tabs.
- Tabs: the Vercel production site, the agent console (`/agent/`, signed in), Linear, ZZDS-V2 in Figma.

## 1. The problem (2 min)
- Open the production site on **Off-cycle payouts**. Turn on **Show components**: every label is `legacy.…`.
- Switch Brand to **Partner · stock shadcn**: the same page, built with shadcn (labels are `ui/…`). That's how
  new partner work is built. Same content, two component sets, two looks.
- "That's our situation: Echo on the existing product, shadcn for new partner work. The goal is one set of
  components, with Partner staying stock."

## 2. Step 1 — semantic tokens (3 min), from the merged PRs
- **PEB-1**: Visual diff "0 of 68 changed". "We added the vocabulary without touching a pixel."
- **PEB-2**: 0 of 68 changed again. The legacy templates now read the same tokens as the React components.

## 3. The agent, live — step 2 (4 min)
- In the console, press **Start** on **PEB-3 · Align shadcn components to Pebble's tokens**. Narrate the run.
- When the PR lands: the Components page and Partner's status badges changed; Pebble's pages didn't.
  Open the sandbox link and toggle brands.

## 4. Step 3 — React (3 min)
- Start **PEB-4 · Port the Off-cycle payouts page**. While it runs, show the ticket: same sections, same content,
  different components.
- Visual diff: only Pebble's payouts sections changed; Partner's didn't. On the preview, Pebble's page labels
  are now `ui/…` — it's the same page Partner uses, in Pebble's tokens.
- PEB-5 and PEB-6 finish the job; the last one deletes the legacy templates.

## 5. The pitch (1 min)
- Small, single-purpose PRs, each with a preview and proof of what changed visually.
- The second brand stays off-the-shelf at every step.
- Ask: run this on design-system tickets in `web-app`, starting with Echo on tokens.

If a live run is slow, open the console's demo mode (`/agent/?demo=1#run/PEB-1`) to show the flow.
