import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

// shadcn/ui Button, restyled to the legacy look (pill, 4px border, semibold) through tokens.
// Props stay shadcn's: variant, size, asChild. `caution` matches the legacy caution button.
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-4 font-semibold",
    "focus-visible:outline-none focus-visible:border-focus-border",
    "hover:border-transparent active:border-transparent hover:text-on-hover active:text-on-active",
    "disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary: "border-primary bg-background text-primary hover:bg-primary-hover active:bg-primary-active",
        outline: "border-primary bg-background text-primary hover:bg-primary-hover active:bg-primary-active",
        caution: "border-caution bg-caution text-primary-foreground hover:bg-warning-hover active:bg-warning-active",
        destructive: "border-destructive bg-destructive text-primary-foreground hover:bg-destructive-hover active:bg-destructive-active",
        ghost: "border-transparent bg-transparent text-primary hover:text-foreground",
        link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "w-full px-4 py-3 text-xl",
        sm: "px-3 py-1.5 text-sm",
        lg: "w-full px-6 py-3 text-xl",
        icon: "size-12 p-0",
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
