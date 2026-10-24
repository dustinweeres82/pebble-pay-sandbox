import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { NativeSelect } from "../components/ui/native-select"
import { Textarea } from "../components/ui/textarea"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table"
import { Section } from "../shell"

// The React (shadcn/ui) components the pages will be ported to, in every variant.
// Step 2 aligns these to Pebble's tokens; step 3 uses them on the pages.

export default function Components() {
  return (
    <div className="flex max-w-4xl flex-col gap-8 px-10 py-9">
      <div>
        <h1 className="text-2xl font-semibold">Components</h1>
        <p className="text-muted-foreground">The React components in <code>src/components/ui</code>, in every variant.</p>
      </div>

      <Section id="buttons" title="Button">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section id="badges" title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section id="alerts" title="Alert">
        <Alert>
          <AlertTitle>Payouts arrive within one business day</AlertTitle>
          <AlertDescription>Instant deposits arrive in minutes.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>Reconnect your bank account.</AlertDescription>
        </Alert>
      </Section>

      <Section id="fields" title="Fields">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-email">Recipient email</Label>
            <Input id="c-email" placeholder="name@company.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-disabled">Workplace</Label>
            <Input id="c-disabled" value="Arrow Technologies, Inc." disabled readOnly />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-type">Payout type</Label>
            <NativeSelect id="c-type">
              <option>Please select an option</option>
              <option>Bonus pay</option>
            </NativeSelect>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="c-notes">Notes</Label>
            <Textarea id="c-notes" />
          </div>
        </div>
      </Section>

      <Section id="table" title="Table">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Date</TableHead><TableHead>Employee</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>2026-09-28</TableCell><TableCell>William Jones</TableCell><TableCell>$156</TableCell><TableCell><Badge>Completed</Badge></TableCell></TableRow>
            <TableRow><TableCell>2026-08-05</TableCell><TableCell>Cara Larson</TableCell><TableCell>$111</TableCell><TableCell><Badge variant="secondary">Processing</Badge></TableCell></TableRow>
          </TableBody>
        </Table>
      </Section>
    </div>
  )
}
