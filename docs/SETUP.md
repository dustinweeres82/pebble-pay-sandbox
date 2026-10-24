# Setup (about 20 minutes)

Everything here is free except Anthropic API usage for the agent (a few cents to a few dollars per run).
**Never paste API keys or tokens into chat or tickets** — only into the GitHub settings pages below.

## 1. Run it locally
1. Install Node 20 or newer (nodejs.org).
2. In this folder: `npm install`, then `npm run dev`, and open http://localhost:5173.
3. Try the Mode and Brand toggles.

## 2. Put it on your GitHub
1. On github.com, create a new **empty** repository named `pebble-pay-sandbox` (no README).
2. In this folder:
   ```
   git remote add origin git@github.com:<your-username>/pebble-pay-sandbox.git
   git push -u origin --all
   ```
   That pushes `main` (the "before" state) and the four `step-*` answer-key branches.
3. In the repo: **Issues → Labels → New label** → name it `agent`.

## 3. Preview links (Vercel)
1. Sign in at vercel.com with GitHub → **Add New → Project** → import `pebble-pay-sandbox`.
2. Keep the detected settings (Vite) → **Deploy**.
Every PR now gets a preview link in a comment.

## 4. Agent secrets (GitHub → repo → Settings → Secrets and variables → Actions)
- `ANTHROPIC_API_KEY` — create one at console.anthropic.com → API keys.
- `AGENT_GITHUB_TOKEN` — github.com → Settings → Developer settings → Fine-grained tokens →
  Generate. Repository access: **only** `pebble-pay-sandbox`. Permissions: Contents, Issues,
  Pull requests → Read and write. (PRs opened with this token trigger the visual-diff and review checks.)

If the agent run says it needs the Claude GitHub App, install it from github.com/apps/claude
for this repository only.

## 5. Linear
1. Create a team named **Pebble** with the identifier **PEB** (so tickets are PEB-1 … PEB-4).
2. Settings → Integrations → **GitHub**: connect your account and the `pebble-pay-sandbox` repo.
   - Turn on pull-request linking and status automation (PR opened → In Review, merged → Done).
   - Turn on **GitHub Issues Sync** between the Pebble team and the repo (two-way).
3. Create a label `agent` in the Pebble team.
4. Create PEB-1 … PEB-4 from `docs/tickets/` (title = the heading, description = the rest).

## 6. Dry run
1. Add the `agent` label to PEB-1 in Linear. It syncs to the GitHub issue and starts
   **Actions → Agent — implement ticket**. If the label doesn't sync, add `agent` on the GitHub issue.
2. Within a few minutes: a draft PR `PEB-1 …`, then three checks on it — **Visual diff** (comment:
   "0 of 68 screenshots changed"), the **Vercel** preview link, and **AI review**.
3. Review, mark ready, merge. Linear moves PEB-1 to Done.

Fallback without the agent: open a PR from the matching `step-*` branch into `main`.
