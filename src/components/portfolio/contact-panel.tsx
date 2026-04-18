import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { socialLinks } from "@/features/portfolio/data/portfolio-content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactPanel() {
  return (
    <Card className="rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="space-y-3">
        <CardTitle className="text-2xl">Static contact section</CardTitle>
        <p className="text-sm leading-7 text-muted-foreground">
          This portfolio keeps contact intentionally simple: direct links, no
          client-side form, and no exposed write endpoint.
        </p>
      </CardHeader>
      <CardContent className="grid gap-3">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between rounded-[1.25rem] border border-border/70 bg-background px-4 py-4 transition hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
          >
            <div>
              <p className="font-medium">{link.label}</p>
              <p className="text-sm text-muted-foreground">{link.value}</p>
            </div>
            <ArrowUpRight className="size-4 text-primary" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
