import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// shadcn/ui Button, restyled to the legacy look with semantic tokens.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-4 text-center text-xl font-semibold transition-colors focus:outline-none focus:border-focus-border hover:border-transparent active:border-transparent hover:text-on-hover active:text-on-active disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled",
  {
    variants: {
      variant: {
        default: "bg-primary border-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary: "bg-background border-primary text-primary hover:bg-primary-hover active:bg-primary-active",
        outline: "bg-background border-primary text-primary hover:bg-primary-hover active:bg-primary-active",
        caution: "bg-caution border-caution text-primary-foreground hover:bg-warning-hover active:bg-warning-active",
        destructive: "bg-destructive border-destructive text-primary-foreground hover:bg-destructive-hover active:bg-destructive-active",
        ghost: "border-transparent bg-transparent text-primary hover:bg-primary-hover active:bg-primary-active",
        link: "border-transparent text-primary underline-offset-4 hover:bg-transparent hover:underline",
      },
      size: {
        default: "w-full px-4 py-3",
        sm: "px-3 py-1 text-base",
        lg: "w-full px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
