import type { Metadata } from "next"

import { ContactPanel } from "@/components/portfolio/contact-panel"
import { SectionShell } from "@/components/portfolio/section-shell"

export const metadata: Metadata = {
  title: "Contact",
  description: "Static contact links for this portfolio.",
}

export default function ContactPage() {
  return (
    <SectionShell
      eyebrow="Contact"
      title="Reach out through direct, intentional channels."
      description="This version keeps the contact flow simple and secure with static links only."
    >
      <ContactPanel />
    </SectionShell>
  )
}
