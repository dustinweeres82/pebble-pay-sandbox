import * as React from "react"
import { cn } from "../../lib/utils"

// shadcn/ui Label (defaults, without the Radix dependency).
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-src="ui/label"
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
