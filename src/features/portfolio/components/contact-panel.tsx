import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileDown,
  GitBranch,
  Mail,
} from "lucide-react";

import {
  contactLinks,
  siteConfig,
} from "@/features/portfolio/data/portfolio-content";
import { IconBadge } from "@/features/portfolio/components/icon-badge";
import { ScrollReveal } from "@/features/portfolio/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  github: GitBranch,
  email: Mail,
  briefcase: BriefcaseBusiness,
  resume: FileDown,
} as const;

export function ContactPanel() {
  const githubContactLink =
    contactLinks.find((link) => link.icon === "github") ?? contactLinks[0];

  return (
    <ScrollReveal>
      <Card className="rounded-[1.9rem] border border-border/70 bg-card/95 shadow-2xl shadow-black/25">
        <CardContent className="grid gap-5 p-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-border/70 p-5 lg:border-b-0 lg:border-r lg:p-6">
            <div className="rounded-[1.65rem] border border-border/70 bg-background/80 p-6">
              <div className="rounded-[1.45rem] border border-border/70 bg-muted/35 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Contact
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  Reach Joshua Mark Castillo
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Connect through GitHub, email, resume access, and professional
                  profiles while keeping the portfolio simple and secure.
                </p>
              </div>

              <div className="mt-5 rounded-[1.45rem] border border-border/70 bg-muted/35 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Quick Access
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/80 bg-background px-3 py-1.5 font-sans text-sm font-medium"
                  >
                    GitHub
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/80 bg-background px-3 py-1.5 font-sans text-sm font-medium"
                  >
                    Email
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/80 bg-background px-3 py-1.5 font-sans text-sm font-medium"
                  >
                    Resume
                  </Badge>
                </div>
              </div>

              <div className="mt-5 rounded-[1.45rem] border border-border/70 bg-muted/35 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Portfolio Signature
                </p>
                <p className="mt-3 text-sm text-foreground/92">
                  &copy; {siteConfig.name}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 lg:p-6">
            <CardHeader className="px-0 pb-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Contact Links
              </p>
              <CardTitle className="pt-2 text-3xl font-semibold tracking-tight text-foreground">
                Professional links and resume access.
              </CardTitle>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                Find the main places to view projects, send a message, and
                review current career information.
              </p>
            </CardHeader>

            <div className="mt-5 grid gap-3">
              {contactLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                const isExternal = link.href.startsWith("http");
                const isDownload = link.href.endsWith(".pdf");

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    download={
                      isDownload ? "joshua-mark-castillo-resume.pdf" : undefined
                    }
                    className="group rounded-[1.4rem] border border-border/70 bg-muted/35 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <IconBadge
                          size="md"
                          className="shrink-0 group-hover:border-foreground/40"
                        >
                          <Icon className="size-5" />
                        </IconBadge>
                        <div>
                          <p className="text-base font-semibold text-foreground">
                            {link.label}
                          </p>
                          <p className="mt-1 text-sm text-foreground/92">
                            {link.value}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {link.helperText}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="mt-1 size-4 text-muted-foreground transition group-hover:text-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                render={
                  <Link
                    href="/resume/joshua-mark-castillo-resume.pdf"
                    download="joshua-mark-castillo-resume.pdf"
                  />
                }
                className="rounded-full"
              >
                Download Resume
                <FileDown className="size-4" />
              </Button>
              <Button
                render={
                  <Link
                    href={githubContactLink.href}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                variant="outline"
                className="rounded-full border-border/80 bg-background"
              >
                {githubContactLink.label}
                <GitBranch className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
}
