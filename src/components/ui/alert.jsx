import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// shadcn/ui Alert, restyled to the legacy look with semantic tokens.
const alertVariants = cva("relative flex w-full gap-3 border-t-4 px-3 pt-3 pb-4 text-base text-foreground", {
  variants: {
    variant: {
      default: "border-info-emphasis bg-info-subtle [&_[data-alert-icon]]:text-info-emphasis",
      success: "border-success-emphasis bg-success-subtle [&_[data-alert-icon]]:text-success-emphasis",
      warning: "border-warning-emphasis bg-warning-subtle [&_[data-alert-icon]]:text-warning-emphasis",
      destructive: "border-destructive-emphasis bg-destructive-subtle [&_[data-alert-icon]]:text-destructive-emphasis",
    },
  },
  defaultVariants: { variant: "default" },
})

function Alert({ className, variant, ...props }) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertIcon({ className, ...props }) {
  return <span aria-hidden="true" data-alert-icon className={cn("w-8 px-2 text-2xl font-bold", className)} {...props} />
}

function AlertContent({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

function AlertTitle({ className, ...props }) {
  return <div className={cn("text-base font-bold", className)} {...props} />
}

function AlertDescription({ className, ...props }) {
  return <div className={cn("text-foreground", className)} {...props} />
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription }
