import * as React from "react"
import { cn } from "../../lib/utils"

// shadcn/ui Input, restyled to the legacy field with semantic tokens.
const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "w-full rounded-t border-b-2 border-field-border bg-field p-4 text-lg font-light text-foreground shadow placeholder:text-field-placeholder focus:border-field-focus focus:outline-none disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground",
      className,
    )}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"

export { Input }
