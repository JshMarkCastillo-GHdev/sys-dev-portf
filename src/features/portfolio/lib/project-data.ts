import { featuredProjects } from "@/features/portfolio/data/portfolio-content"
import { getGithubProfile, getGithubRepos, mergeProjectsWithGithub } from "@/lib/github"
import { getSiteConfig } from "@/lib/site-config"

export async function getPortfolioData() {
  const site = getSiteConfig()
  const [profile, repos] = await Promise.all([
    getGithubProfile(site.githubUsername),
    getGithubRepos(site.githubUsername, site.repoAllowlist),
  ])

  return {
    profile,
    projects: mergeProjectsWithGithub(featuredProjects, repos),
  }
}

export async function getProjectBySlug(slug: string) {
  const { projects } = await getPortfolioData()
  return projects.find((project) => project.slug === slug) || null
}
