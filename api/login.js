// GET /api/login → sends the person to GitHub to approve the Pebble Agents app.
import crypto from "node:crypto"
import { configured, cookie, origin, STATE } from "./_lib.js"

export default function handler(req, res) {
  if (!configured()) return res.status(503).send("Sign-in isn't set up: add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel.")
  const state = crypto.randomBytes(16).toString("hex")
  const url = new URL("https://github.com/login/oauth/authorize")
  url.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID)
  url.searchParams.set("redirect_uri", `${origin(req)}/api/callback`)
  url.searchParams.set("state", state)
  res.setHeader("Set-Cookie", cookie(STATE, state, 600))
  res.setHeader("Cache-Control", "no-store")
  res.writeHead(302, { Location: url.toString() })
  res.end()
}
