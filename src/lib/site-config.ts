import { siteConfig } from "@/features/portfolio/data/portfolio-content"
import { env } from "@/lib/env"

export function getSiteConfig() {
  return {
    ...siteConfig,
    email: env.publicContactEmail || siteConfig.email,
    resumeUrl: env.publicResumeUrl || siteConfig.resumeUrl,
  }
}
