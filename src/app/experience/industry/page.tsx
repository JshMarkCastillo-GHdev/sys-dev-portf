import type { Metadata } from "next"

import { ExperienceCard } from "@/features/portfolio/components/experience-card"
import { SectionShell } from "@/features/portfolio/components/section-shell"
import { experienceItems } from "@/features/portfolio/data/portfolio-content"

export const metadata: Metadata = {
  title: "Industry Experience",
  description: "Industry roles and contributions.",
}

export default function IndustryExperiencePage() {
  return (
    <SectionShell
      eyebrow="Industry"
      title="Professional roles and product impact."
      description="This page isolates industry experience when you want to highlight commercial work separately from education."
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
