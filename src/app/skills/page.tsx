import type { Metadata } from "next"

import { SectionShell } from "@/components/portfolio/section-shell"
import { SkillsGrid } from "@/components/portfolio/skills-grid"

export const metadata: Metadata = {
  title: "Skills",
  description: "Core frontend, backend, and delivery skills.",
}

export default function SkillsPage() {
  return (
    <SectionShell
      eyebrow="Skills"
      title="Skills behind the build process."
      description="A practical look at the frontend, backend, and workflow tools used to create scalable applications and process-focused solutions."
    >
      <SkillsGrid />
    </SectionShell>
  )
}
