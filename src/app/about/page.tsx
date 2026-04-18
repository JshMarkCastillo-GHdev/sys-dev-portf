import type { Metadata } from "next"

import { AboutCard } from "@/features/portfolio/components/about-card"
import { SectionShell } from "@/features/portfolio/components/section-shell"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the developer behind this portfolio.",
}

export default function AboutPage() {
  return (
    <SectionShell
      eyebrow="About"
      title="Developer profile and delivery mindset."
      description="A standalone view of Joshua Mark Castillo's background, working style, and approach to building scalable web applications."
    >
      <AboutCard />
    </SectionShell>
  )
}
