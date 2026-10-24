import { useEffect, useState } from "react"
import * as legacy from "./legacy/templates"
import { Legacy } from "./shell"
import AppNav from "./components/AppNav"
import PayoutsLegacy from "./pages/PayoutsLegacy"
import PayoutsReact from "./pages/PayoutsReact"
import CreatePaymentLegacy from "./pages/CreatePaymentLegacy"
import CreatePaymentReact from "./pages/CreatePaymentReact"
import Components from "./pages/Components"

// Demo app: two product pages plus the component gallery.
// Partner (new work, stock shadcn) renders the React pages; Pebble still renders the legacy ones.
// The step-3 tickets move Pebble onto the React pages one at a time and delete the legacy files.
// URL: ?brand=pebble|partner&theme=light|dark&inspect=1#payouts|create|components
// The demo toolbar is outside every [data-testid], so it never shows up in the Visual diff.

const PAGES = { payouts: "Off-cycle payouts", create: "Create a payment", components: "Components" }
const params = new URLSearchParams(window.location.search)
const pageFromHash = () => {
  const h = window.location.hash.replace("#", "")
  return PAGES[h] ? h : "payouts"
}

function Segmented({ value, options, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="inline-flex overflow-hidden rounded-md border border-white/20">
      {Object.entries(options).map(([key, text]) => (
        <button
          key={key}
          type="button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
          className={"px-3 py-1.5 text-sm font-medium " + (value === key ? "bg-white text-stone-900" : "text-stone-200 hover:bg-white/10")}
        >
          {text}
        </button>
      ))}
    </div>
  )
}

function Check({ checked, onChange, children }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-stone-200">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {children}
    </label>
  )
}

export default function App() {
  const [page, setPage] = useState(pageFromHash)
  const [brand, setBrand] = useState(params.get("brand") ?? "pebble")
  const [dark, setDark] = useState(params.get("theme") === "dark")
  const [inspect, setInspect] = useState(params.has("inspect"))

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = dark ? "dark" : "light"
    root.dataset.brand = brand
    if (inspect) root.dataset.inspect = ""
    else delete root.dataset.inspect
  }, [brand, dark, inspect])

  useEffect(() => {
    const onHash = () => { setPage(pageFromHash()); window.scrollTo(0, 0) }
    // Legacy templates can't take React handlers, so links carry data-go="<page>".
    const onClick = (e) => {
      const el = e.target.closest("[data-go]")
      if (!el) return
      e.preventDefault()
      window.location.hash = el.dataset.go
    }
    window.addEventListener("hashchange", onHash)
    document.addEventListener("click", onClick)
    return () => { window.removeEventListener("hashchange", onHash); document.removeEventListener("click", onClick) }
  }, [])

  const go = (p) => { window.location.hash = p }
  const active = page === "components" ? "" : "payouts"

  return (
    <div className="flex min-h-screen flex-col">
      <div className="demo-toolbar sticky top-0 z-20 flex flex-wrap items-center gap-x-5 gap-y-2 bg-stone-900 px-5 py-3 text-white">
        <b className="text-sm">Pebble Pay sandbox</b>
        <Segmented label="Page" value={page} options={PAGES} onChange={go} />
        <Segmented label="Brand" value={brand} options={{ pebble: "Pebble", partner: "Partner · stock shadcn" }} onChange={setBrand} />
        <Check checked={dark} onChange={setDark}>Dark</Check>
        <Check checked={inspect} onChange={setInspect}>Show components</Check>
      </div>

      <div className="flex flex-1 bg-background text-foreground">
        {brand === "partner" ? (
          <div data-testid="nav" className="shrink-0"><AppNav active={active} /></div>
        ) : (
          <Legacy id="nav" html={legacy.nav({ active })} className="shrink-0" />
        )}
        <main className="min-w-0 flex-1">
          {page === "payouts" && (brand === "partner" ? <PayoutsReact /> : <PayoutsLegacy />)}
          {page === "create" && (brand === "partner" ? <CreatePaymentReact /> : <CreatePaymentLegacy />)}
          {page === "components" && <Components />}
        </main>
      </div>
    </div>
  )
}
