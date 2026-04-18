"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import {
  homeAnchorItems,
  navigationItems,
  siteConfig,
} from "@/features/portfolio/data/portfolio-content"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Container } from "@/components/layout/container"

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-border bg-card font-mono text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              JMC
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-tight">{siteConfig.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {siteConfig.role}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99] ${
                    isActive
                      ? "bg-card text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              render={<Link href="/projects" />}
              variant="outline"
              className="hidden rounded-full border-border/80 bg-card px-4 md:inline-flex"
            >
              View My Works
            </Button>

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border/80 bg-card md:hidden"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] border-l border-border/70 bg-background">
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 border-t border-border/70 pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Home Sections
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {homeAnchorItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-full border border-border/80 px-3 py-2 text-xs transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isHome ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Home
            </span>
            {homeAnchorItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-border/80 bg-card px-3 py-1.5 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </header>
  )
}
