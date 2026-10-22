import { useEffect, useState } from "react"
import * as legacy from "./legacy/templates"
import { Button } from "./components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert"
import { Badge } from "./components/ui/badge"
import { Input } from "./components/ui/input"

const params = new URLSearchParams(window.location.search)

function Toggle({ label, value, options, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={
            "rounded-full border px-3 py-1 " +
            (value === o ? "bg-foreground text-background" : "bg-card text-foreground")
          }
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function Section({ id, title, children, html }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {html ? (
        <div data-testid={id} className="flex flex-col gap-3 rounded-lg bg-card p-5" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div data-testid={id} className="flex flex-col gap-3 rounded-lg bg-card p-5">
          {children}
        </div>
      )}
    </section>
  )
}

// ---- Legacy column: server-template output ----
const legacyButtons = [
  legacy.button({ text: "Get paid", theme: "primary", themeColor: "general" }),
  legacy.button({ text: "Not now", theme: "secondary", themeColor: "general" }),
  legacy.button({ text: "Review payout", theme: "primary", themeColor: "caution" }),
  legacy.button({ text: "Cancel advance", theme: "primary", themeColor: "destruction" }),
  legacy.button({ text: "Please wait", theme: "primary", themeColor: "general", disabled: true }),
].join("")

const legacyAlerts = [
  legacy.alert({ theme: "info", title: "Payday is Friday", body: "Advances repay automatically." }),
  legacy.alert({ theme: "destruction", title: "Payment failed", body: "Reconnect your bank account." }),
].join("")

const legacyBadges = `<div class="flex flex-wrap gap-2">${[
  legacy.badge({ status: "paid", label: "Paid" }),
  legacy.badge({ status: "pending", label: "Pending" }),
  legacy.badge({ status: "overdue", label: "Overdue" }),
  legacy.badge({ status: "new", label: "New" }),
].join("")}</div>`

const legacyField = legacy.textField({ label: "Email", description: "We'll send your pay stubs here.", placeholder: "you@example.com" })

export default function App() {
  const [theme, setTheme] = useState(params.get("theme") ?? "light")
  const [brand, setBrand] = useState(params.get("brand") ?? "pebble")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.brand = brand
  }, [theme, brand])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Pebble Pay</h1>
          <p className="text-muted-foreground">Design system sandbox — legacy templates and React components, side by side.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Toggle label="Mode" value={theme} options={["light", "dark"]} onChange={setTheme} />
          <Toggle label="Brand" value={brand} options={["pebble", "partner"]} onChange={setBrand} />
        </div>
      </header>

      <main className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Legacy templates <span className="text-sm font-normal text-muted-foreground">(server-rendered)</span></h2>
          <Section id="legacy-buttons" title="Buttons" html={legacyButtons} />
          <Section id="legacy-alerts" title="Alerts" html={legacyAlerts} />
          <Section id="legacy-badges" title="Badges" html={legacyBadges} />
          <Section id="legacy-field" title="Text field" html={legacyField} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">React <span className="text-sm font-normal text-muted-foreground">(shadcn/ui)</span></h2>
          <Section id="react-buttons" title="Buttons">
            <Button>Get paid</Button>
            <Button variant="outline">Not now</Button>
            <Button variant="secondary">Review payout</Button>
            <Button variant="destructive">Cancel advance</Button>
            <Button disabled>Please wait</Button>
          </Section>
          <Section id="react-alerts" title="Alerts">
            <Alert>
              <AlertTitle>Payday is Friday</AlertTitle>
              <AlertDescription>Advances repay automatically.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>Reconnect your bank account.</AlertDescription>
            </Alert>
          </Section>
          <Section id="react-badges" title="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge>Paid</Badge>
              <Badge variant="secondary">Pending</Badge>
              <Badge variant="destructive">Overdue</Badge>
              <Badge variant="outline">New</Badge>
            </div>
          </Section>
          <Section id="react-field" title="Text field">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Email</span>
              <Input placeholder="you@example.com" />
              <span className="text-sm text-muted-foreground">We'll send your pay stubs here.</span>
            </label>
          </Section>
        </div>
      </main>
    </div>
  )
}
