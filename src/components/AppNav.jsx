import { Badge } from "./ui/badge"
import { cn } from "../lib/utils"

// The app's side navigation in React, on shadcn's sidebar roles and sizing.
// Partner uses it today; Pebble moves to it in PEB-6.

const ICONS = {
  home: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 20c0-2.5 1.5-4.5 4-4.5" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>,
  gift: <><rect x="3" y="8" width="18" height="13" rx="1" /><path d="M12 8v13M3 12h18" /></>,
  dollar: <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
}

const ITEMS = [
  ["home", "Home"], ["grid", "Dashboard"], ["chart", "Reports"], ["people", "Manage team"],
  ["card", "Off-cycle payouts", "payouts", true],
  ["gift", "Rewards"], ["dollar", "Tips"], ["gear", "Settings"],
]

export default function AppNav({ active }) {
  return (
    <nav data-src="ui/app-nav" className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-5 py-4 text-base font-semibold">
        <span className="size-6 rounded-md bg-sidebar-primary" />
        Pebble Pay
      </div>
      <div className="flex flex-col gap-1 px-3">
        {ITEMS.map(([icon, label, page, beta]) => (
          <a
            key={label}
            href={`#${page || ""}`}
            data-go={page}
            className={cn(
              "flex h-9 items-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium hover:bg-sidebar-accent",
              page && page === active && "bg-sidebar-accent",
            )}
          >
            <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{ICONS[icon]}</svg>
            {label}
            {beta && <Badge variant="outline" className="ml-auto">BETA</Badge>}
          </a>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-3 border-t border-sidebar-border px-5 py-4">
        <span className="grid size-8 place-items-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar">JS</span>
        <span className="flex flex-col text-sm leading-tight">
          <span className="font-medium">Jordan Smith</span>
          <span className="text-sidebar-muted">View profile</span>
        </span>
      </div>
    </nav>
  )
}
