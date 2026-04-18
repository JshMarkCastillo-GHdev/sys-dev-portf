import type { EducationItem, ExperienceItem } from "@/types/portfolio"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ExperienceCardProps = {
  item: ExperienceItem | EducationItem
  subtitle: string
}

export function ExperienceCard({ item, subtitle }: ExperienceCardProps) {
  const heading = "title" in item ? item.title : item.school
  const secondary = "organization" in item ? item.organization : item.credential

  return (
    <Card className="rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="space-y-2">
        <p className="text-sm font-medium text-primary">{subtitle}</p>
        <CardTitle className="text-xl">{heading}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {secondary} • {item.period}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-7 text-muted-foreground">{item.summary}</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-2 size-1.5 rounded-full bg-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
