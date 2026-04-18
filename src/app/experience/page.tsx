import type { Metadata } from "next"

import { ExperienceCard } from "@/components/portfolio/experience-card"
import { SectionShell } from "@/components/portfolio/section-shell"
import {
  educationItems,
  experienceItems,
} from "@/features/portfolio/data/portfolio-content"

export const metadata: Metadata = {
  title: "Experience",
  description: "Industry and education experience.",
}

export default function ExperiencePage() {
  return (
    <SectionShell
      eyebrow="Experience"
      title="Industry experience and education."
      description="A concise timeline of roles, impact, and academic background."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {experienceItems.map((item) => (
          <ExperienceCard
            key={item.id}
            item={item}
            subtitle={item.location || "Industry"}
          />
        ))}
        {educationItems.map((item) => (
          <ExperienceCard
            key={item.id}
            item={item}
            subtitle="Education"
          />
        ))}
      </div>
    </SectionShell>
  )
}
