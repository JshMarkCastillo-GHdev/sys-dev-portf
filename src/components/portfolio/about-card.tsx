import { UserRound } from "lucide-react"

import {
  aboutContent,
  siteConfig,
} from "@/features/portfolio/data/portfolio-content"
import { ScrollReveal } from "@/components/portfolio/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutCard() {
  return (
    <ScrollReveal>
      <Card className="rounded-[1.9rem] border border-border/70 bg-card/95 shadow-2xl shadow-black/25">
        <CardContent className="grid gap-5 p-0 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="border-b border-border/70 p-5 lg:border-r lg:border-b-0 lg:p-6">
            <div className="rounded-[1.7rem] border border-border/70 bg-background/80 p-5">
              <div className="rounded-[1.5rem] border border-dashed border-border/80 bg-gradient-to-b from-zinc-800 to-zinc-900 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {aboutContent.profilePlaceholder.label}
                </p>
                <div className="mt-5 flex min-h-64 items-center justify-center rounded-[1.35rem] border border-border/70 bg-card/70">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <span className="flex size-20 items-center justify-center rounded-full border border-border/80 bg-background">
                      <UserRound className="size-9 text-zinc-200" />
                    </span>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground">
                        {siteConfig.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {aboutContent.profilePlaceholder.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[1.45rem] border border-border/70 bg-muted/40 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Snapshot
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-200">
                  {siteConfig.longBio}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 lg:p-6">
            <CardHeader className="px-0 pb-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                About Section
              </p>
              <CardTitle className="pt-2 text-3xl font-semibold tracking-tight text-foreground">
                Tech journey, soft skills, and interests.
              </CardTitle>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                A clean profile card that highlights why I build, how I
                collaborate, and what I enjoy outside implementation work.
              </p>
            </CardHeader>

            <div className="mt-5 grid gap-4">
              <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 transition hover:border-foreground/35 hover:bg-accent">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Tech Journey
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-100">
                  {aboutContent.techJourney}
                </p>
              </div>

              <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 transition hover:border-foreground/35 hover:bg-accent">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Soft Skills
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {aboutContent.softSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="rounded-full border-border/80 bg-background px-3 py-1.5 font-sans text-sm font-medium text-foreground transition hover:border-foreground/45 hover:bg-card"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 transition hover:border-foreground/35 hover:bg-accent">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Hobbies
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {aboutContent.hobbies.map((hobby) => (
                    <li
                      key={hobby}
                      className="rounded-[1.2rem] border border-border/70 bg-background/80 px-4 py-3 text-sm text-zinc-100"
                    >
                      {hobby}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.45rem] border border-border/70 bg-background/70 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Availability
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-200">
                  {siteConfig.availability}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}
