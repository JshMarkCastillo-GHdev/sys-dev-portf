import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

import type { ProjectItem } from "@/types/portfolio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type ProjectCardProps = {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <p className="text-sm leading-7 text-muted-foreground">
              {project.summary}
            </p>
          </div>
          {project.featured ? (
            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">
              Featured
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-full border-border/70 px-3 py-1"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {project.highlights.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6">
            <Sparkles className="mt-1 size-4 text-primary" />
            <span className="text-muted-foreground">{item}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Button
          render={<Link href={`/projects/${project.slug}`} />}
          variant="outline"
          className="rounded-full"
        >
          Read Case Study
        </Button>
        {project.repoUrl ? (
          <Button
            render={<Link href={project.repoUrl} target="_blank" rel="noreferrer" />}
            className="rounded-full"
          >
            Repository
            <ArrowUpRight className="size-4" />
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
