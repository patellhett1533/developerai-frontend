import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-error-400/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-base-100 text-base-800 shadow-xs hover:bg-primary/90",
        destructive:
          "bg-error-100 text-base-800 shadow-xs hover:bg-destructive/90 focus-visible:ring-error-400/20 dark:focus-visible:ring-error-400/40 dark:bg-error-400/60",
        outline:
          "border border-border bg-base-50 shadow-xs hover:bg-base-100 hover:text-base-800",
        secondary:
          "bg-base-100 text-base-700 shadow-xs",
        ghost:
          "hover:bg-base-100 hover:text-base-800",
        link: "text-base-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
