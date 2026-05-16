import { featuredProjects } from "@/features/portfolio/data/portfolio-content"

export async function getPortfolioData() {
  return {
    profile: null,
    projects: featuredProjects,
  }
}

export async function getProjectBySlug(slug: string) {
  const { projects } = await getPortfolioData()
  return projects.find((project) => project.slug === slug) || null
}
