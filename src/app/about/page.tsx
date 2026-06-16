import type { Metadata } from "next";

import { AboutCard } from "@/features/portfolio/components/about-card";
import { SectionShell } from "@/features/portfolio/components/section-shell";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SectionShell
      eyebrow="About"
      title="Developer profile and delivery mindset."
    >
      <AboutCard />
    </SectionShell>
  );
}
