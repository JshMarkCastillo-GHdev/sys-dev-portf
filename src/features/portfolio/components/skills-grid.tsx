import { Bot, Boxes, Braces, Database, Rocket, Wrench } from "lucide-react";

import { skillGroups } from "@/features/portfolio/data/portfolio-content";
import { IconBadge } from "@/features/portfolio/components/icon-badge";
import { ScrollReveal } from "@/features/portfolio/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  frontend: Braces,
  backend: Boxes,
  databases: Database,
  tools: Wrench,
  deployment: Rocket,
  agents: Bot,
} as const;

export function SkillsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {skillGroups.map((group) => (
        <ScrollReveal key={group.title}>
          <Card className="h-full rounded-[1.8rem] border border-border/70 bg-card/95 shadow-lg shadow-black/25 transition hover:border-foreground/35 hover:bg-accent/70">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <IconBadge size="lg">
                    {(() => {
                      const Icon = iconMap[group.icon as keyof typeof iconMap];
                      return <Icon className="size-5" />;
                    })()}
                  </IconBadge>
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      Expertise
                    </p>
                    <CardTitle className="text-2xl">{group.title}</CardTitle>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                {group.description}
              </p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2.5 pb-1">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="rounded-full border-border/80 bg-background px-3 py-1.5 font-sans text-sm font-medium text-foreground transition hover:border-foreground/45 hover:bg-card"
                >
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}
