import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AboutCard } from "@/features/portfolio/components/about-card";
import { IconBadge } from "@/features/portfolio/components/icon-badge";
import { SectionShell } from "@/features/portfolio/components/section-shell";
import { SkillsGrid } from "@/features/portfolio/components/skills-grid";
import {
  heroStats,
  homeAnchorItems,
  siteConfig,
} from "@/features/portfolio/data/portfolio-content";

export function LandingPage() {
  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div className="space-y-7 lg:pb-90 sm:pb-0">
            <div className="animate-fade-up space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Home / Overview
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
              <p className="max-w-3xl text-lg leading-8 text-foreground/90 sm:text-xl">
                {siteConfig.tagline}
              </p>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {siteConfig.shortBio}
              </p>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-2 rounded-[2rem] border border-border/70 bg-card/95 p-6 shadow-2xl shadow-black/30">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/90 p-6">
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Core strengths
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    Comfortable with full stack delivery
                  </p>
                </div>
                <IconBadge size="md">
                  <Sparkles className="text-foreground/80" />
                </IconBadge>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-rows-3">
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-border/70 bg-card p-5 transition hover:border-foreground/40 hover:bg-accent"
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

              <div className="mt-5 rounded-[1.4rem] border border-border/70 bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Working style
                </p>
                <div className="mt-4 space-y-3 text-sm text-foreground/84">
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
  );
}
