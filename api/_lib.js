// Shared helpers for the agent console's sign-in. Files starting with "_" are not routes on Vercel.
// Env vars (Vercel → Settings → Environment Variables):
//   GITHUB_CLIENT_ID      from your GitHub App
//   GITHUB_CLIENT_SECRET  from your GitHub App (never commit it)
//   AGENT_REPO            optional, defaults to dustinweeres82/pebble-pay-sandbox
import crypto from "node:crypto"

export const REPO = process.env.AGENT_REPO || "dustinweeres82/pebble-pay-sandbox"
export const SESSION = "pa_session"
export const STATE = "pa_state"

export function configured() {
  return Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
}

// The GitHub token is kept in an encrypted, httpOnly cookie, so page scripts never see it.
function key() {
  return crypto.createHash("sha256").update("pebble-agents:" + process.env.GITHUB_CLIENT_SECRET).digest()
}
export function seal(value) {
  const iv = crypto.randomBytes(12)
  const c = crypto.createCipheriv("aes-256-gcm", key(), iv)
  const body = Buffer.concat([c.update(JSON.stringify(value), "utf8"), c.final()])
  return Buffer.concat([iv, c.getAuthTag(), body]).toString("base64url")
}
export function unseal(text) {
  try {
    const buf = Buffer.from(text, "base64url")
    const d = crypto.createDecipheriv("aes-256-gcm", key(), buf.subarray(0, 12))
    d.setAuthTag(buf.subarray(12, 28))
    return JSON.parse(Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8"))
  } catch {
    return null
  }
}

export function cookies(req) {
  const out = {}
  for (const part of (req.headers.cookie || "").split(";")) {
    const i = part.indexOf("=")
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim())
  }
  return out
}
export function cookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`
}

export function origin(req) {
  const proto = req.headers["x-forwarded-proto"] || "https"
  return `${proto}://${req.headers["x-forwarded-host"] || req.headers.host}`
}

export function session(req) {
  const raw = cookies(req)[SESSION]
  const s = raw && unseal(raw)
  if (!s || !s.token) return null
  if (s.expires && Date.now() > s.expires) return null
  return s
}
