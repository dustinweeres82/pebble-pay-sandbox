import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Label } from "../components/ui/label"
import { NativeSelect } from "../components/ui/native-select"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table"
import { payouts, STATUS_LABEL } from "./data"

// Off-cycle payouts, built with the React (shadcn/ui) components.
// Partner renders this today. PEB-4 moves Pebble onto it too.
// Same sections (data-testid) and content as the legacy version.

const STATUS_VARIANT = { completed: "default", processing: "secondary", failed: "destructive" }
const go = (page) => () => { window.location.hash = page }

export default function PayoutsReact() {
  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      <div data-testid="header" className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Off-cycle payouts</h1>
        <Badge variant="outline">BETA</Badge>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">Invite employees</Button>
          <Button onClick={go("create")}>Create new payment</Button>
        </div>
      </div>

      <div data-testid="switcher" className="flex items-center gap-2">
        <NativeSelect className="w-72" aria-label="Company">
          <option>Arrow Technologies, Inc.</option>
          <option>Birch Coffee Co.</option>
        </NativeSelect>
        <Button variant="secondary">Switch</Button>
      </div>

      <div data-testid="filters" className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-status">Status</Label>
          <NativeSelect id="f-status" className="w-56">
            <option>All statuses</option><option>Completed</option><option>Processing</option><option>Failed</option>
          </NativeSelect>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="f-type">Payout type</Label>
          <NativeSelect id="f-type" className="w-56">
            <option>All payout types</option><option>Bonus pay</option><option>Missing hours</option><option>Emergency pay</option><option>Correction pay</option>
          </NativeSelect>
        </div>
        <Button>Filter</Button>
      </div>

      <div data-testid="table" className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {["Date", "Employee", "Payout type", "Amount", "Method", "Fee", "Status", "Actions"].map((c) => (
                <TableHead key={c} className="px-4">{c}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map(([date, name, type, amount, method, fee, status], i) => (
              <TableRow key={i}>
                <TableCell className="px-4">{date}</TableCell>
                <TableCell className="px-4">{name}</TableCell>
                <TableCell className="px-4">{type}</TableCell>
                <TableCell className="px-4 tabular-nums">{amount}</TableCell>
                <TableCell className="px-4">{method}</TableCell>
                <TableCell className="px-4 tabular-nums">{fee}</TableCell>
                <TableCell className="px-4"><Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge></TableCell>
                <TableCell className="px-4"><Button variant="link" className="h-auto p-0">View payment</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
