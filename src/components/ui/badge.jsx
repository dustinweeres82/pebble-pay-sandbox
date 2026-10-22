import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// shadcn/ui Badge, restyled to the legacy status pill. Status variants added to match legacy.
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium leading-tight text-primary-foreground",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
        info: "bg-info",
        secondary: "bg-muted text-foreground",
        outline: "border border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
