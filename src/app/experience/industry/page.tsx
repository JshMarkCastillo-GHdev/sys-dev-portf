import type { Metadata } from "next"

import { ExperienceCard } from "@/features/portfolio/components/experience-card"
import { SectionShell } from "@/features/portfolio/components/section-shell"
import { experienceItems } from "@/features/portfolio/data/portfolio-content"

export const metadata: Metadata = {
  title: "Industry Experience",
}

export default function IndustryExperiencePage() {
  return (
    <SectionShell
      eyebrow="Industry"
      title="Professional roles and product impact."
    >
      <div className="grid gap-5">
        {experienceItems.map((item) => (
          <ExperienceCard
            key={item.id}
            item={item}
            subtitle={item.location || "Industry"}
          />
        ))}
      </div>
    </SectionShell>
  )
}
