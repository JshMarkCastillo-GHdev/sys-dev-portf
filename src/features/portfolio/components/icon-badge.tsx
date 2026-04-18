import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type IconBadgeProps = {
  children: ReactNode
  className?: string
  size?: "md" | "lg"
}

const sizeClasses = {
  md: "size-11 rounded-2xl [&_svg]:size-5",
  lg: "size-12 rounded-[1.15rem] [&_svg]:size-5",
} as const

export function IconBadge({
  children,
  className,
  size = "md",
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border border-border/80 bg-background/85 text-foreground shadow-sm shadow-black/10 transition",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}
