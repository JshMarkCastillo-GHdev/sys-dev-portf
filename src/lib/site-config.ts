import { siteConfig } from "@/features/portfolio/data/portfolio-content"

function parseRepoAllowlist(value?: string): string[] {
  if (!value) {
    return siteConfig.repoAllowlist
  }

  return value
    .split(",")
    .map((repo) => repo.trim())
    .filter(Boolean)
}

export function getSiteConfig() {
  return {
    ...siteConfig,
    githubUsername:
      process.env.GITHUB_USERNAME?.trim() || siteConfig.githubUsername,
    repoAllowlist: parseRepoAllowlist(process.env.FEATURED_GITHUB_REPOS),
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || siteConfig.email,
    resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL?.trim() || siteConfig.resumeUrl,
  }
}
