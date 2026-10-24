import * as legacy from "../legacy/templates"
import { Legacy } from "../shell"
import { payouts, STATUS_LABEL } from "./data"

// Off-cycle payouts on the legacy templates. Pebble renders this until PEB-4,
// which moves Pebble onto PayoutsReact.jsx (the version Partner already uses) and deletes this file.


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

export default function PayoutsLegacy() {
  return (
    <div className="flex flex-col gap-9 px-10 py-9">
      <Legacy id="header" html={header} />
      <Legacy id="switcher" html={switcher} />
      <Legacy id="filters" html={filters} />
      <Legacy id="table" html={table} />
    </div>
  )
}
