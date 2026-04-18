import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

import { SectionShell } from "@/components/portfolio/section-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { featuredProjects } from "@/features/portfolio/data/portfolio-content"
import { getProjectBySlug } from "@/features/portfolio/lib/project-data"

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project not found",
    }
  }

  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <SectionShell
      eyebrow="Project Detail"
      title={project.title}
      description={project.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl">Highlights</CardTitle>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
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
          <CardContent className="space-y-4">
            <p className="text-sm leading-7 text-muted-foreground">
              {project.summary}
            </p>
            <ul className="space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl">Project links</CardTitle>
            <p className="text-sm leading-7 text-muted-foreground">
              Keep this section updated with the live deployment, repository, and
              a short case-study note for each featured project.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {project.liveUrl ? (
              <Button
                render={<Link href={project.liveUrl} target="_blank" rel="noreferrer" />}
                className="w-full rounded-full"
              >
                Live preview
                <ArrowUpRight className="size-4" />
              </Button>
            ) : null}
            {project.repoUrl ? (
              <Button
                render={<Link href={project.repoUrl} target="_blank" rel="noreferrer" />}
                variant="outline"
                className="w-full rounded-full"
              >
                Repository
                <ArrowUpRight className="size-4" />
              </Button>
            ) : null}
            <Button
              render={<Link href="/projects" />}
              variant="ghost"
              className="w-full rounded-full"
            >
              Back to projects
            </Button>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  )
}
