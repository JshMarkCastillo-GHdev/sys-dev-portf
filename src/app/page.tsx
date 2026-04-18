import Link from "next/link"
import { ArrowRight, Download, Sparkles } from "lucide-react"

import { AboutCard } from "@/components/portfolio/about-card"
import { SectionShell } from "@/components/portfolio/section-shell"
import { SkillsGrid } from "@/components/portfolio/skills-grid"
import {
  heroStats,
  homeAnchorItems,
  siteConfig,
} from "@/features/portfolio/data/portfolio-content"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div className="space-y-7">
            <div className="animate-fade-up space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Home / Portfolio Landing
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {siteConfig.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border/80 bg-card px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                  {siteConfig.role}
                </span>
                <span className="rounded-full border border-border/80 bg-card px-4 py-2">
                  {siteConfig.location}
                </span>
              </div>
            </div>

            <div className="animate-fade-up animate-delay-1 space-y-5">
              <p className="max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">
                {siteConfig.tagline}
              </p>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                I build maintainable full stack experiences that help teams move
                faster through cleaner systems, better user flows, and thoughtful
                automation.
              </p>
            </div>

            <div className="animate-fade-up animate-delay-2 flex flex-col gap-3 sm:flex-row">
              <Button
                render={<Link href="/projects" />}
                size="lg"
                className="rounded-full bg-foreground px-5 text-background hover:bg-zinc-200"
              >
                View My Works
                <ArrowRight className="size-4" />
              </Button>
              <Button
                render={
                  <a href={siteConfig.resumeUrl} download="joshua-mark-castillo-resume.pdf" />
                }
                size="lg"
                variant="outline"
                className="rounded-full border-border/80 bg-card px-5"
              >
                Download My Resume
                <Download className="size-4" />
              </Button>
            </div>

            <div className="animate-fade-up animate-delay-3 flex flex-wrap gap-2">
              {homeAnchorItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-border/80 bg-card px-4 py-2 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-fade-up animate-delay-2 rounded-[2rem] border border-border/70 bg-card/95 p-5 shadow-2xl shadow-black/30">
            <div className="rounded-[1.5rem] border border-border/70 bg-background p-5">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Technical snapshot
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    Comfortable with full stack delivery
                  </p>
                </div>
                <Sparkles className="size-5 text-zinc-300" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-border/70 bg-card p-4 transition hover:border-foreground/40 hover:bg-accent"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[1.4rem] border border-border/70 bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Preferred workflow
                </p>
                <div className="mt-4 space-y-3 text-sm text-zinc-200">
                  <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-3">
                    <span>Frontend systems</span>
                    <span className="font-mono text-muted-foreground">
                      Next.js / Tailwind
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-3">
                    <span>Backend mindset</span>
                    <span className="font-mono text-muted-foreground">
                      APIs / automation
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Delivery style</span>
                    <span className="font-mono text-muted-foreground">
                      Clean + scalable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell
        id="about"
        eyebrow="About"
        title="Developer profile, approach, and working style."
        description="A concise introduction to the way Joshua approaches scalable products, maintainable code, and user-facing delivery."
      >
        <AboutCard />
      </SectionShell>

      <SectionShell
        id="skills"
        eyebrow="Skills"
        title="Core tools for web delivery and automation."
        description="A practical stack focused on maintainability, speed of iteration, and building products that support operational workflows."
        className="border-y border-border/70 bg-background/60"
      >
        <SkillsGrid />
      </SectionShell>
    </>
  )
}
