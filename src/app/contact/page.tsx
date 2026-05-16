import type { Metadata } from "next"

import { ContactPanel } from "@/features/portfolio/components/contact-panel"
import { SectionShell } from "@/features/portfolio/components/section-shell"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  return (
    <SectionShell
      eyebrow="Contact"
      title="Professional links and resume access."
    >
      <ContactPanel />
    </SectionShell>
  )
}
