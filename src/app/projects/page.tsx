import type { Metadata } from "next"

import { ProjectCard } from "@/features/portfolio/components/project-card"
import { SectionShell } from "@/features/portfolio/components/section-shell"
import { getPortfolioData } from "@/features/portfolio/lib/project-data"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function ProjectsPage() {
  const { projects } = await getPortfolioData()

  return (
    <SectionShell
      eyebrow="Projects"
      title="Portfolio projects and technical case studies."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  )
}
