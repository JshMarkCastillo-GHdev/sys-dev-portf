import type { Metadata } from "next";

import { SectionShell } from "@/features/portfolio/components/section-shell";
import { SkillsGrid } from "@/features/portfolio/components/skills-grid";

export const metadata: Metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return (
    <SectionShell eyebrow="Skills" title="Skills behind the build process.">
      <SkillsGrid />
    </SectionShell>
  );
}
