// /api/gh?path=/repos/<owner>/<repo>/... → calls the GitHub API as the signed-in person.
// Locked to this one repo and to the few writes the console needs, so it can't be used as an open proxy.
import { REPO, session } from "./_lib.js"

const base = `/repos/${REPO}`
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const ALLOWED = {
  GET: [new RegExp(`^${esc(base)}(/|\\?|$)`)],
  POST: [new RegExp(`^${esc(base)}/issues$`), new RegExp(`^${esc(base)}/issues/\\d+/labels$`)],
  DELETE: [new RegExp(`^${esc(base)}/issues/\\d+/labels/agent$`)],
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")
  const s = session(req)
  if (!s) return res.status(401).json({ message: "Signed out" })

  const path = String((req.query || {}).path || "")
  const method = req.method || "GET"
  if (!path.startsWith("/") || path.includes("..") || !(ALLOWED[method] || []).some(rx => rx.test(path))) {
    return res.status(403).json({ message: `Not allowed: ${method} ${path}` })
  }

  const headers = {
    Authorization: `Bearer ${s.token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "pebble-agents",
  }
  if (req.headers["if-none-match"]) headers["If-None-Match"] = req.headers["if-none-match"]
  let body
  if (method !== "GET" && method !== "DELETE") {
    headers["Content-Type"] = "application/json"
    body = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {})
  }

  const r = await fetch("https://api.github.com" + path, { method, headers, body })
  for (const h of ["etag", "x-ratelimit-remaining", "x-ratelimit-reset", "x-ratelimit-limit"]) {
    const v = r.headers.get(h)
    if (v) res.setHeader(h, v)
  }
  if (r.status === 304 || r.status === 204) return res.status(r.status).end()
  res.status(r.status)
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.send(await r.text())
}
