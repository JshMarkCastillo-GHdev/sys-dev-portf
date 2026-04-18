import type { Metadata } from "next"

import { ExperienceCard } from "@/features/portfolio/components/experience-card"
import { SectionShell } from "@/features/portfolio/components/section-shell"
import { educationItems } from "@/features/portfolio/data/portfolio-content"

export const metadata: Metadata = {
  title: "Education",
  description: "Education background and academic highlights.",
}

export default function EducationPage() {
  return (
    <SectionShell
      eyebrow="Education"
      title="Academic foundation and technical training."
      description="Use this section to communicate the background that shaped your engineering perspective."
    >
      <div className="grid gap-5">
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
