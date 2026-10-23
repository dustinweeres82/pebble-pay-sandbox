// GET /api/me → who is signed in (no token returned). 401 = signed out, 503 = sign-in not set up.
import { configured, session } from "./_lib.js"

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")
  if (!configured()) return res.status(503).json({ signedIn: false, configured: false })
  const s = session(req)
  if (!s) return res.status(401).json({ signedIn: false, configured: true })
  res.status(200).json({ signedIn: true, configured: true, login: s.login, avatar: s.avatar })
}
