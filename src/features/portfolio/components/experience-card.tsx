import { BriefcaseBusiness, GraduationCap } from "lucide-react"

import type {
  EducationItem,
  ExperienceItem,
} from "@/features/portfolio/types/portfolio"
import { IconBadge } from "@/features/portfolio/components/icon-badge"
import { ScrollReveal } from "@/features/portfolio/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ExperienceCardProps = {
  item: ExperienceItem | EducationItem
  subtitle: string
}

export function ExperienceCard({ item, subtitle }: ExperienceCardProps) {
  const isIndustry = "company" in item
  const heading = isIndustry ? item.role : item.degree
  const secondary = isIndustry ? item.company : item.institution
  const duration = item.duration
  const details = isIndustry ? item.responsibilities : item.details
  const summary = item.summary

  return (
    <ScrollReveal>
      <Card className="rounded-[1.85rem] border border-border/70 bg-card/95 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/35">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {subtitle}
              </p>
              <CardTitle className="text-2xl break-words">{heading}</CardTitle>
              <p className="break-words text-sm text-muted-foreground">{secondary}</p>
            </div>
            <IconBadge size="lg">
              {isIndustry ? (
                <BriefcaseBusiness className="size-5" />
              ) : (
                <GraduationCap className="size-5" />
              )}
            </IconBadge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Duration
            </p>
            <p className="mt-3 break-words text-sm text-foreground/92">{duration}</p>
          </div>

          {summary ? (
            <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Overview
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/92">{summary}</p>
            </div>
          ) : null}

          <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {isIndustry ? "Responsibilities" : "Education Details"}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/92">
              {details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-foreground/85" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}
