import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// shadcn/ui Badge, restyled to the legacy status pill with semantic tokens.
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium leading-tight transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-primary-foreground",
        success: "bg-success text-primary-foreground",
        warning: "bg-warning text-primary-foreground",
        info: "bg-info text-primary-foreground",
        outline: "border border-field-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
