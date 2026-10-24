import * as legacy from "../legacy/templates"
import { Legacy } from "../shell"

// Create a payment (form). Every section starts on the legacy templates.

const header = `<div class="flex flex-col gap-1">
  ${legacy.breadcrumb({ text: "Off-cycle payouts", go: "payouts" })}
  ${legacy.titleText({ text: "Create a payment" })}
</div>`

const alert = legacy.alert({
  theme: "info",
  title: "Payouts arrive within one business day",
  body: "Instant deposits arrive in minutes. The fee is shown before you confirm.",
})

const form = `<div class="grid grid-cols-2 gap-x-8 gap-y-9">
  <div class="col-span-2">${legacy.textField({ label: "Workplace", value: "Arrow Technologies, Inc.", disabled: true })}</div>
  ${legacy.textField({ label: "Select recipient", placeholder: "Search by name", help: "Only people in your organization who have set up a Pebble wallet can be selected." })}
  ${legacy.textField({ label: "Recipient email", type: "email", placeholder: "name@company.com" })}
  ${legacy.select({ label: "Payout type", options: ["Please select an option", "Bonus pay", "Missing hours", "Emergency pay", "Correction pay"] })}
  ${legacy.textField({ label: "Amount", placeholder: "$0.00", help: "The maximum payment is $2,000.00." })}
  <div class="col-span-2">${legacy.select({ label: "Payout destination", options: ["Please select an option", "Pebble wallet", "Bank account"], help: "Only cash-equivalent wallets can receive an off-cycle payout." })}</div>
  <div class="col-span-2">${legacy.textArea({ label: "Notes" })}</div>
</div>`

const actions = `<div class="flex items-center justify-end gap-6">
  ${legacy.textButton({ text: "Cancel", go: "payouts" })}
  ${legacy.button({ text: "Review payment", inline: true })}
</div>`

const support = legacy.supportBanner({ title: "Have questions?", body: "We're here for you.", action: "Contact support" })

export default function CreatePayment() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex max-w-5xl flex-col gap-8 px-10 py-9">
        <Legacy id="header" html={header} />
        <Legacy id="alert" html={alert} />
        <Legacy id="form" html={form} />
        <Legacy id="actions" html={actions} />
      </div>
      <Legacy id="support" html={support} className="mt-auto" />
    </div>
  )
}
