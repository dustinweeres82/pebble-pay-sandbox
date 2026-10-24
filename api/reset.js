// POST /api/reset → put the sandbox back to the start of the demo, as the signed-in person.
//   1. Close open PRs from PEB-* branches and delete those branches.
//   2. Force main back to the `demo-start` tag (the legacy pages, no tickets applied).
//   3. Tickets: remove the `agent` label from every PEB-* issue and reopen it (Linear syncs both).
//      Other agent-labelled issues (REQ-* requests made in the console) are closed.
// Only repo admins can run it. Needs the GitHub App's Contents and Pull requests set to Read and write.
import { REPO, session } from "./_lib.js"

const TICKET = /\b(PEB-\d+)\b/

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store")
  if (req.method !== "POST") return res.status(405).json({ message: "Use POST" })
  const s = session(req)
  if (!s) return res.status(401).json({ message: "Sign in first." })
  const host = req.headers["x-forwarded-host"] || req.headers.host
  if (req.headers.origin && new URL(req.headers.origin).host !== host) return res.status(403).json({ message: "Wrong origin." })
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}
  if (body.confirm !== "RESET") return res.status(400).json({ message: "Missing confirmation." })

  const gh = async (method, path, payload) => {
    const r = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${s.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "pebble-agents",
        ...(payload ? { "Content-Type": "application/json" } : {}),
      },
      body: payload ? JSON.stringify(payload) : undefined,
    })
    const data = r.status === 204 ? null : await r.json().catch(() => null)
    if (!r.ok && !(method === "DELETE" && r.status === 404)) {
      const err = new Error(`${method} ${path}: ${data?.message || r.status}`)
      err.status = r.status
      throw err
    }
    return data
  }

  const log = []
  try {
    const perm = await gh("GET", `/collaborators/${encodeURIComponent(s.login)}/permission`)
    if (perm?.permission !== "admin") return res.status(403).json({ message: "Only repo admins can reset the demo." })

    // The commit the demo starts from.
    let ref = (await gh("GET", "/git/ref/tags/demo-start")).object
    if (ref.type === "tag") ref = (await gh("GET", `/git/tags/${ref.sha}`)).object
    const start = ref.sha

    // 1. PRs and branches.
    const pulls = await gh("GET", "/pulls?state=open&per_page=100")
    for (const p of pulls.filter((p) => TICKET.test(p.head.ref))) {
      await gh("PATCH", `/pulls/${p.number}`, { state: "closed" })
      log.push(`Closed PR #${p.number}`)
    }
    const branches = await gh("GET", "/branches?per_page=100")
    for (const b of branches.filter((b) => /^PEB-\d+/.test(b.name))) {
      await gh("DELETE", `/git/refs/heads/${encodeURIComponent(b.name)}`)
      log.push(`Deleted branch ${b.name}`)
    }

    // 2. main back to demo-start.
    await gh("PATCH", "/git/refs/heads/main", { sha: start, force: true })
    log.push(`Reset main to demo-start (${start.slice(0, 7)})`)

    // 3. Tickets.
    const issues = (await gh("GET", "/issues?state=all&per_page=100")).filter((i) => !i.pull_request)
    for (const i of issues) {
      const isTicket = TICKET.test(i.title) || /Ticket:\s*`?PEB-\d+/.test(i.body || "") || /linear\.app\/[^\s]*\/issue\/PEB-\d+/i.test(i.body || "")
      const labelled = i.labels.some((l) => l.name === "agent")
      // Leave issues closed as duplicates or "not planned" alone (old copies of a ticket, past requests).
      if (i.state === "closed" && ["duplicate", "not_planned"].includes(i.state_reason)) continue
      if (isTicket) {
        if (labelled) { await gh("DELETE", `/issues/${i.number}/labels/agent`); log.push(`Removed agent label from #${i.number}`) }
        if (i.state === "closed") { await gh("PATCH", `/issues/${i.number}`, { state: "open" }); log.push(`Reopened #${i.number}`) }
      } else if (labelled || i.state === "open") {
        // Anything else is a one-off: a console request (REQ-…) or a test ticket deleted in Linear,
        // which leaves its GitHub copy open. Close it so the console's lists stay clean.
        if (labelled) await gh("DELETE", `/issues/${i.number}/labels/agent`)
        if (i.state === "open") await gh("PATCH", `/issues/${i.number}`, { state: "closed", state_reason: "not_planned" })
        log.push(`Closed #${i.number} (not a PEB ticket)`)
      }
    }
    res.status(200).json({ ok: true, log })
  } catch (e) {
    const hint = e.status === 403
      ? " The GitHub App needs Contents and Pull requests set to Read and write (and you need to accept the new permissions)."
      : ""
    res.status(e.status === 403 ? 403 : 500).json({ ok: false, message: e.message + hint, log })
  }
}
