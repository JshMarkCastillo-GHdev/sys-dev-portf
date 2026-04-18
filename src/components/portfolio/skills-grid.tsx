import { skillGroups } from "@/features/portfolio/data/portfolio-content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SkillsGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <Card
          key={group.title}
          className="animate-fade-up rounded-[1.75rem] border border-border/70 bg-card/95 shadow-lg shadow-black/20"
        >
          <CardHeader className="space-y-3">
            <CardTitle>{group.title}</CardTitle>
            <p className="text-sm leading-7 text-muted-foreground">
              {group.description}
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="rounded-full border-border/80 bg-background px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:border-foreground/50 hover:bg-accent"
              >
                {item}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
