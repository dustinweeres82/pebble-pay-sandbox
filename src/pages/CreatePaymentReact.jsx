import { Button } from "../components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { NativeSelect } from "../components/ui/native-select"
import { Textarea } from "../components/ui/textarea"

// Create a payment, built with the React (shadcn/ui) components.
// Partner renders this today. PEB-5 moves Pebble onto it too.
// Same sections (data-testid) and content as the legacy version.

const go = (page) => () => { window.location.hash = page }

function Field({ id, label, help, children, className = "" }) {
  return (
    <div className={"flex flex-col gap-2 " + className}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {help && <p className="text-sm text-muted-foreground">{help}</p>}
    </div>
  )
}

export default function CreatePaymentReact() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex max-w-4xl flex-col gap-6 px-8 py-8">
        <div data-testid="header" className="flex flex-col items-start gap-1">
          <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={go("payouts")}>← Off-cycle payouts</Button>
          <h1 className="text-2xl font-semibold tracking-tight">Create a payment</h1>
        </div>

        <div data-testid="alert">
          <Alert>
            <AlertTitle>Payouts arrive within one business day</AlertTitle>
            <AlertDescription>Instant deposits arrive in minutes. The fee is shown before you confirm.</AlertDescription>
          </Alert>
        </div>

        <div data-testid="form" className="grid grid-cols-2 gap-x-6 gap-y-6">
          <Field id="p-workplace" label="Workplace" className="col-span-2">
            <Input id="p-workplace" value="Arrow Technologies, Inc." disabled readOnly />
          </Field>
          <Field id="p-recipient" label="Select recipient" help="Only people in your organization who have set up a Pebble wallet can be selected.">
            <Input id="p-recipient" placeholder="Search by name" />
          </Field>
          <Field id="p-email" label="Recipient email">
            <Input id="p-email" type="email" placeholder="name@company.com" />
          </Field>
          <Field id="p-type" label="Payout type">
            <NativeSelect id="p-type">
              <option>Please select an option</option><option>Bonus pay</option><option>Missing hours</option><option>Emergency pay</option><option>Correction pay</option>
            </NativeSelect>
          </Field>
          <Field id="p-amount" label="Amount" help="The maximum payment is $2,000.00.">
            <Input id="p-amount" placeholder="$0.00" />
          </Field>
          <Field id="p-dest" label="Payout destination" help="Only cash-equivalent wallets can receive an off-cycle payout." className="col-span-2">
            <NativeSelect id="p-dest">
              <option>Please select an option</option><option>Pebble wallet</option><option>Bank account</option>
            </NativeSelect>
          </Field>
          <Field id="p-notes" label="Notes" className="col-span-2">
            <Textarea id="p-notes" rows={4} />
          </Field>
        </div>

        <div data-testid="actions" className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={go("payouts")}>Cancel</Button>
          <Button>Review payment</Button>
        </div>
      </div>

      <div data-testid="support" className="mt-auto px-8 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-6">
          <div>
            <div className="text-lg font-semibold">Have questions?</div>
            <div className="text-sm text-muted-foreground">We're here for you.</div>
          </div>
          <Button>Contact support</Button>
        </div>
      </div>
    </div>
  )
}
