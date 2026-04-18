import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch, ImageIcon } from "lucide-react";

import type { ProjectItem } from "@/features/portfolio/types/portfolio";
import { IconBadge } from "@/features/portfolio/components/icon-badge";
import { ScrollReveal } from "@/features/portfolio/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <ScrollReveal>
      <Card className="h-full rounded-[1.85rem] border border-border/70 bg-card/95 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/35">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Project Template
              </p>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground">
                {project.summary}
              </p>
            </div>
            {project.featured ? (
              <Badge
                variant="outline"
                className="rounded-full border-border/80 bg-background px-3 py-1 font-sans text-sm"
              >
                Featured
              </Badge>
            ) : null}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="rounded-[1.45rem] border border-dashed border-border/80 bg-background/80 p-6">
            <div className="flex items-center gap-3">
              <IconBadge size="md" className="bg-card/80">
                <ImageIcon className="text-foreground/80" />
              </IconBadge>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.screenshotPlaceholder.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.screenshotPlaceholder.caption}
                </p>
              </div>
            </div>
            <div className="mt-5 grid min-h-36 place-items-center rounded-[1.2rem] border border-border/70 bg-gradient-to-br from-white/6 to-white/2">
              <p className="font-sans text-sm text-foreground/72">
                [ Replace with real info: Project screenshots ]
              </p>
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Description
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/92">
              {project.description}
            </p>
          </div>

          <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="rounded-full border-border/80 bg-background px-3 py-1.5 font-sans text-sm font-medium text-foreground transition hover:border-foreground/45 hover:bg-card"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 bg-transparent px-5 pb-6 pt-5">
          <Button
            render={<Link href={`/projects/${project.slug}`} />}
            variant="outline"
            className="rounded-full border-border/80 bg-background"
          >
            View Template
            <ArrowRight className="size-4" />
          </Button>
          <Button
            render={
              <Link
                href={project.repoUrl || "#"}
                target={project.repoUrl ? "_blank" : undefined}
                rel={project.repoUrl ? "noreferrer" : undefined}
              />
            }
            className="rounded-full"
          >
            GitHub Link
            <GitBranch className="size-4" />
          </Button>
          {project.repoUrl ? (
            <Button
              render={
                <Link href={project.repoUrl} target="_blank" rel="noreferrer" />
              }
              variant="ghost"
              className="rounded-full"
            >
              Open Repo
              <ArrowUpRight className="size-4" />
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </ScrollReveal>
  );
}
