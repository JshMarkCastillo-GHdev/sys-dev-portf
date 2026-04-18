import Link from "next/link"

import { Container } from "@/components/layout/container"
import { socialLinks } from "@/features/portfolio/data/portfolio-content"
import { getSiteConfig } from "@/lib/site-config"

const siteConfig = getSiteConfig()

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background/95">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Footer
          </p>
          <p className="text-sm text-zinc-100">© {siteConfig.name}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm transition hover:border-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  )
}
