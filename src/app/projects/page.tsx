import type { Metadata } from "next"

import { ProjectCard } from "@/components/portfolio/project-card"
import { SectionShell } from "@/components/portfolio/section-shell"
import { getPortfolioData } from "@/features/portfolio/lib/project-data"

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured and archived portfolio projects with live GitHub enrichment.",
}

export default async function ProjectsPage() {
  const { projects } = await getPortfolioData()

  return (
    <SectionShell
      eyebrow="Projects"
      title="Portfolio projects and technical case studies."
      description="Featured entries combine local content with public GitHub data when available, while keeping the UI stable if the API is unavailable."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  )
}
