import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// shadcn/ui Alert (defaults).
const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive: "bg-card text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
})

function Alert({ className, variant, ...props }) {
  return <div role="alert" data-src="ui/alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }) {
  return <div className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
}

function AlertDescription({ className, ...props }) {
  return <div className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription }
