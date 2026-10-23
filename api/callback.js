// GET /api/callback → GitHub sends the person back here. Swap the code for a token and keep it in a sealed cookie.
import { configured, cookie, cookies, origin, seal, SESSION, STATE } from "./_lib.js"

export default async function handler(req, res) {
  const back = (msg) => {
    res.setHeader("Set-Cookie", cookie(STATE, "", 0))
    res.writeHead(302, { Location: `/agent/${msg ? "?signin=" + encodeURIComponent(msg) : ""}` })
    res.end()
  }
  if (!configured()) return back("not-configured")
  const { code, state, error } = req.query || {}
  if (error) return back(String(error))
  if (!code || !state || state !== cookies(req)[STATE]) return back("state-mismatch")

  const r = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${origin(req)}/api/callback`,
    }),
  })
  const data = await r.json().catch(() => ({}))
  if (!data.access_token) return back(data.error || "token-exchange-failed")

  const u = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${data.access_token}`, Accept: "application/vnd.github+json", "User-Agent": "pebble-agents" },
  })
  const user = await u.json().catch(() => ({}))

  const ttl = Math.min(Number(data.expires_in) || 8 * 3600, 8 * 3600) // GitHub App user tokens last 8 hours
  const sealed = seal({ token: data.access_token, login: user.login, avatar: user.avatar_url, expires: Date.now() + ttl * 1000 })
  res.setHeader("Set-Cookie", [cookie(SESSION, sealed, ttl), cookie(STATE, "", 0)])
  res.writeHead(302, { Location: "/agent/" })
  res.end()
}
