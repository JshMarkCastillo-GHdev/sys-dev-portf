import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, Star, GitFork, Calendar } from "lucide-react"

import { SectionShell } from "@/features/portfolio/components/section-shell"
import { getTechBadgeClass } from "@/features/portfolio/lib/badge-styles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { featuredProjects } from "@/features/portfolio/data/portfolio-content"
import { getProjectBySlug } from "@/features/portfolio/lib/project-data"
import type { ProjectItem } from "@/features/portfolio/types/portfolio"

// Extract GitHub stats from enriched highlights
function extractGithubStats(highlights: string[]) {
  const starsMatch = highlights.find(h => h.includes('GitHub stars'))?.match(/(\d+)/);
  const forksMatch = highlights.find(h => h.includes('Forks'))?.match(/(\d+)/);
  const updatedMatch = highlights.find(h => h.includes('Last updated'))?.replace('Last updated: ', '');
  
  return {
    stars: starsMatch ? parseInt(starsMatch[1], 10) : null,
    forks: forksMatch ? parseInt(forksMatch[1], 10) : null,
    updated: updatedMatch || null,
  };
}

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

  // Extract GitHub stats from enriched data
  const githubStats = extractGithubStats(project.highlights || [])
  const hasGithubStats = githubStats.stars !== null || githubStats.forks !== null

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
                  className={getTechBadgeClass(tech)}
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
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {hasGithubStats ? (
            <Card className="rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">GitHub Stats</CardTitle>
                <p className="text-sm leading-7 text-muted-foreground">
                  Live repository metrics from GitHub
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {githubStats.stars !== null ? (
                    <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-muted/30 p-3">
                      <Star className="size-5 text-yellow-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Stars</p>
                        <p className="text-lg font-semibold">{githubStats.stars}</p>
                      </div>
                    </div>
                  ) : null}
                  {githubStats.forks !== null ? (
                    <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-muted/30 p-3">
                      <GitFork className="size-5 text-blue-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Forks</p>
                        <p className="text-lg font-semibold">{githubStats.forks}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
                {githubStats.updated ? (
                  <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-muted/30 p-3">
                    <Calendar className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                      <p className="text-sm font-medium">{githubStats.updated}</p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ) : null}

          <Card className="rounded-[1.75rem] border border-border/60 bg-card/90 shadow-sm">
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl">Project links</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                Review the live deployment, repository, and supporting links for
                this project.
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
