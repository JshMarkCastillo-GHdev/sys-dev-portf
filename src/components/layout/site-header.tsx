"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Download, ArrowRight } from "lucide-react";

import {
  homeAnchorItems,
  navigationItems,
  siteConfig,
} from "@/features/portfolio/data/portfolio-content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full px-2.5 py-1.5 transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-border bg-card font-mono text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              JMC
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-tight">
                {siteConfig.name}
              </p>
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
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99] ${
                    isActive
                      ? "bg-card text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              render={
                <a
                  href={siteConfig.resumeUrl}
                  download="joshua-mark-castillo-resume.pdf"
                />
              }
              size="lg"
              variant="outline"
              className="rounded-full border-border/80 bg-card px-5"
            >
              My Resume
              <Download className="size-4" />
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
              <SheetContent
                side="right"
                className="w-70 border-l border-border/70 bg-background"
              >
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="border-b px-4 py-3 my-1 text-sm font-medium transition hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isHome ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Home
            </span>
            {homeAnchorItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-border/80 bg-card px-3.5 py-2 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
