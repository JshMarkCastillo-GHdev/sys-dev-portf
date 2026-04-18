import Link from "next/link"
import { ArrowRight, GitBranch, MapPin } from "lucide-react"

import { heroStats, socialLinks } from "@/features/portfolio/data/portfolio-content"
import type { GithubProfile } from "@/types/portfolio"
import { getSiteConfig } from "@/lib/site-config"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

type HeroSectionProps = {
  profile: GithubProfile | null
}

const siteConfig = getSiteConfig()

export function HeroSection({ profile }: HeroSectionProps) {
  const githubLink =
    socialLinks.find((item) => item.label === "GitHub")?.href ||
    `https://github.com/${siteConfig.githubUsername}`

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.16),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.15),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.7),_rgba(255,255,255,0.92))]" />
      <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
        <div className="space-y-7">
          <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/15">
            {siteConfig.availability}
          </Badge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Building portfolio experiences that look sharp and stay easy to
              maintain.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteConfig.longBio}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2">
              <MapPin className="size-4 text-primary" />
              {profile?.location || siteConfig.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2">
              <GitBranch className="size-4 text-primary" />
              {profile ? `${profile.publicRepos} public repos` : "GitHub ready"}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/projects" />}
              size="lg"
              className="rounded-full px-5"
            >
              Explore Projects
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="/contact" />}
              size="lg"
              variant="outline"
              className="rounded-full px-5"
            >
              Let&apos;s Connect
            </Button>
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-border/60 bg-background/90 p-5 shadow-sm shadow-primary/5 backdrop-blur">
          <div className="rounded-[1.5rem] border border-border/60 bg-gradient-to-br from-primary/5 via-background to-orange-500/5 p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Live GitHub profile
            </p>
            <div className="mt-4 space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                {profile?.displayName || siteConfig.name}
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {profile?.bio || siteConfig.shortBio}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl bg-muted/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Followers
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {profile?.followers ?? "--"}
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    GitHub
                  </p>
                  <Link
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-base font-semibold transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-border/60 bg-background p-4"
              >
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
