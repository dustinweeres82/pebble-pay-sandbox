import * as legacy from "../legacy/templates"
import { Legacy } from "../shell"

// Off-cycle payouts (list). Every section starts on the legacy templates.
// Step 3 tickets port these sections to src/components/ui, one page per ticket.

const payouts = [
  ["2026-09-28", "William Jones", "Missing hours", "$156", "Instant deposit", "$0.00", "completed"],
  ["2026-09-15", "Cara Larson", "Bonus pay", "$111", "Instant deposit", "$0.00", "completed"],
  ["2026-08-05", "William Jones", "Bonus pay", "$111", "", "", "processing"],
  ["2026-07-28", "William Jones", "Emergency pay", "$222", "", "", "processing"],
  ["2026-07-27", "William Jones", "Correction pay", "$123", "", "", "processing"],
  ["2026-07-27", "Sally Jenkins", "Bonus pay", "$111", "", "", "failed"],
]
const STATUS_LABEL = { completed: "Completed", processing: "Processing", failed: "Failed" }

const header = `<div class="flex flex-wrap items-center gap-4">
  ${legacy.titleText({ text: "Off-cycle payouts" })}
  ${legacy.badge({ status: "new", label: "BETA" })}
  <div class="ml-auto flex gap-4">
    ${legacy.button({ text: "Invite employees", theme: "secondary", inline: true })}
    ${legacy.button({ text: "Create new payment", inline: true, go: "create" })}
  </div>
</div>`

const switcher = `<div class="flex">
  ${legacy.select({ options: ["Arrow Technologies, Inc.", "Birch Coffee Co."], width: "w-96" })}
  ${legacy.button({ text: "Switch", size: "base", inline: true, joinStart: true })}
</div>`

const filters = `<div class="flex flex-wrap items-end gap-4">
  ${legacy.select({ label: "Status", options: ["All statuses", "Completed", "Processing", "Failed"], width: "w-72" })}
  ${legacy.select({ label: "Payout type", options: ["All payout types", "Bonus pay", "Missing hours", "Emergency pay", "Correction pay"], width: "w-72" })}
  ${legacy.button({ text: "Filter", inline: true })}
</div>`

const table = legacy.table({
  columns: ["Date", "Employee", "Payout type", "Amount", "Method", "Fee", "Status", "Actions"],
  rows: payouts.map(([date, name, type, amount, method, fee, status]) => [
    date, name, type, amount, method, fee,
    legacy.badge({ status, label: STATUS_LABEL[status] }),
    legacy.textButton({ text: "View payment" }),
  ]),
})

export default function Payouts() {
  return (
    <div className="flex flex-col gap-9 px-10 py-9">
      <Legacy id="header" html={header} />
      <Legacy id="switcher" html={switcher} />
      <Legacy id="filters" html={filters} />
      <Legacy id="table" html={table} />
    </div>
  )
}
