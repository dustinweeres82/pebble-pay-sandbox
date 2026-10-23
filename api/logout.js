// GET /api/logout → forget the session cookie.
import { cookie, SESSION } from "./_lib.js"

export default function handler(req, res) {
  res.setHeader("Set-Cookie", cookie(SESSION, "", 0))
  res.writeHead(302, { Location: "/agent/" })
  res.end()
}
