import * as React from "react"
import { cn } from "../../lib/utils"

// shadcn/ui-styled native <select> (same look as the Select trigger, no Radix dependency).
const NativeSelect = React.forwardRef(({ className, children, ...props }, ref) => (
  <span data-src="ui/native-select" className={cn("relative block w-full", className)}>
    <select
      ref={ref}
      className="flex h-9 w-full appearance-none rounded-md border border-input bg-transparent py-1 pl-3 pr-9 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      {...props}
    >
      {children}
    </select>
    <svg
      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 opacity-50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </span>
))
NativeSelect.displayName = "NativeSelect"

export { NativeSelect }
