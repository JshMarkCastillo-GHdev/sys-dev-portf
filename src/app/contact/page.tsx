import type { Metadata } from "next"

import { ContactPanel } from "@/features/portfolio/components/contact-panel"
import { SectionShell } from "@/features/portfolio/components/section-shell"

export const metadata: Metadata = {
  title: "Contact",
  description: "Static contact links for this portfolio.",
}

export default function ContactPage() {
  return (
    <SectionShell
      eyebrow="Contact"
      title="Static reach-out links and resume access."
      description="This contact page is a reusable static template focused on GitHub, email, resume download, and future professional profile links."
    >
      <ContactPanel />
    </SectionShell>
  )
}
