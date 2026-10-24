# Agent console: GitHub sign-in setup

The console lives at `/agent/` on the Vercel site. Signed out, it's read-only and has 60 GitHub calls an hour.
Signed in, it uses your own GitHub account (5,000 calls an hour) and **Start** adds the `agent` label for you.

Sign-in works on the Vercel production address only, not on `localhost` (plain `npm run dev` has no server functions).

## How it works

- `api/login.js` sends you to GitHub to approve the app.
- `api/callback.js` swaps GitHub's one-time code for a token and keeps it in an encrypted, httpOnly cookie. Page scripts never see it.
- `api/gh.js` calls GitHub as you, but only for this repo, and only these writes: create an issue, add a label, remove the `agent` label.
- `api/me.js` and `api/logout.js` show who's signed in and sign you out.
- `api/reset.js` powers **Reset demo** (repo admins only): closes PEB pull requests, deletes their branches,
  forces `main` back to the `demo-start` tag, removes the `agent` label from PEB tickets and reopens them,
  and closes requests made with "Write a new request". Linear follows through the GitHub sync.
- The app secret lives in Vercel's environment variables, never in the repo.

## 1. Register a GitHub App (about 5 minutes)

1. Go to github.com → your avatar → **Settings → Developer settings → GitHub Apps → New GitHub App**.
2. Fill in:
   - **GitHub App name:** something unique, like `Pebble Agents (dustinweeres82)`
   - **Homepage URL:** `https://<your-project>.vercel.app/agent/`
   - **Callback URL:** `https://<your-project>.vercel.app/api/callback`
   - **Expire user authorization tokens:** leave checked
   - **Request user authorization (OAuth) during installation:** leave unchecked
   - **Webhook → Active:** uncheck
3. **Repository permissions:**
   - Issues: **Read and write**
   - Actions: Read-only
   - Checks: Read-only
   - Deployments: Read-only
   - Pull requests: **Read and write** (Reset demo closes PRs)
   - Contents: **Read and write** (Reset demo moves `main` back and deletes PEB branches)
   - Metadata: Read-only (set automatically)
4. **Where can this GitHub App be installed?** Only on this account.
5. Click **Create GitHub App**.
6. On the app's page, copy the **Client ID**. Then click **Generate a new client secret** and copy it. You only see it once. Don't paste it anywhere except Vercel.
7. In the left menu, click **Install App** → Install → **Only select repositories** → `pebble-pay-sandbox` → Install.

## 2. Add the two values to Vercel (about 2 minutes)

1. vercel.com → the `pebble-pay-sandbox` project → **Settings → Environment Variables**.
2. Add `GITHUB_CLIENT_ID` = the Client ID.
3. Add `GITHUB_CLIENT_SECRET` = the client secret.
4. Go to **Deployments** → the latest production deployment → **⋯ → Redeploy**. Environment variables only apply to new deployments.

## 3. Check it

1. Open `https://<your-project>.vercel.app/agent/`. You should see **Sign in with GitHub** at the top right.
2. Sign in and approve the app. You land back on the console with your avatar showing, and the badge says thousands of calls left.
3. **Ready for an agent** lists open PEB tickets without the `agent` label. Press **Start** on PEB-1 and the run view opens.

## If something's off

| What you see | Fix |
|---|---|
| No sign-in button | The env vars aren't set, or you didn't redeploy after adding them. |
| "Sign-in didn't finish (state-mismatch)" | Start sign-in again from the same address. Don't switch between preview and production addresses. |
| GitHub says the redirect URI isn't associated | The Callback URL in the GitHub App must match your Vercel address exactly, including `https://`. |
| "Couldn't start: Resource not accessible by integration" | The app isn't installed on `pebble-pay-sandbox`, or Issues isn't set to Read and write. |
| Start works but no agent run | Check Actions → Agent — implement ticket. Labels added by your signed-in account trigger it the same way as in Linear. |
