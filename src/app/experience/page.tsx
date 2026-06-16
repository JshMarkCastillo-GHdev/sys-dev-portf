import type { Metadata } from "next";

import { ExperienceCard } from "@/features/portfolio/components/experience-card";
import { SectionShell } from "@/features/portfolio/components/section-shell";
import {
  educationItems,
  experienceItems,
} from "@/features/portfolio/data/portfolio-content";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <SectionShell
      eyebrow="Experience"
      title="Industry experience and education."
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
          <ExperienceCard key={item.id} item={item} subtitle="Education" />
        ))}
      </div>
    </SectionShell>
  );
}
