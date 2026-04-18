import type { Metadata } from "next"

import { ContactPanel } from "@/features/portfolio/components/contact-panel"
import { SectionShell } from "@/features/portfolio/components/section-shell"

export const metadata: Metadata = {
  title: "Contact",
  description: "Professional contact links and resume access.",
}

export default function ContactPage() {
  return (
    <SectionShell
      eyebrow="Contact"
      title="Professional links and resume access."
      description="Connect through GitHub, email, resume download, and career profiles from one place."
    >
      <ContactPanel />
    </SectionShell>
  )
}
