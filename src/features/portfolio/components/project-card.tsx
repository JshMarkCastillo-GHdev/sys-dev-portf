"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";

import type { ProjectItem } from "@/features/portfolio/types/portfolio";
import { ScrollReveal } from "@/features/portfolio/components/scroll-reveal";
import { getTechBadgeClass } from "@/features/portfolio/lib/badge-styles";
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

const DESCRIPTION_PREVIEW_LIMIT = 240;

export function ProjectCard({ project }: ProjectCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [hasProjectImageError, setHasProjectImageError] = useState(false);
  const hasLongDescription =
    project.description.length > DESCRIPTION_PREVIEW_LIMIT;
  const projectCoverImageSrc =
    project.coverImageSrc ?? project.screenshotImageSrcs?.[0];
  const canRenderProjectImage =
    Boolean(projectCoverImageSrc) && !hasProjectImageError;
  const visibleDescription =
    showFullDescription || !hasLongDescription
      ? project.description
      : `${project.description.slice(0, DESCRIPTION_PREVIEW_LIMIT).trimEnd()}...`;

  return (
    <ScrollReveal>
      <Card className="flex h-full flex-col rounded-[1.85rem] border border-border/70 bg-card/95 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/35">
        <CardHeader className="min-h-[10rem] space-y-4 sm:min-h-[10.75rem]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Project
              </p>
              <CardTitle className="line-clamp-2 min-h-[3.5rem] text-xl leading-tight sm:text-2xl">
                {project.title}
              </CardTitle>
              <p className="line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-muted-foreground">
                {project.summary}
              </p>
            </div>
            {project.featured ? (
              <Badge
                variant="outline"
                className="shrink-0 rounded-full border-border/80 bg-background px-3 py-1 text-xs font-medium sm:text-sm"
              >
                Featured
              </Badge>
            ) : null}
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-5">
          <div className="rounded-[1.45rem] border border-dashed border-border/80 bg-background/80 p-5 sm:p-6">
            <div className="relative min-h-40 overflow-hidden rounded-[1.2rem] border border-border/70 bg-gradient-to-br from-white/6 to-white/2 sm:min-h-44">
              {canRenderProjectImage ? (
                <Image
                  src={projectCoverImageSrc!}
                  alt={`${project.title} preview`}
                  fill
                  onError={() => setHasProjectImageError(true)}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="grid min-h-40 place-items-center sm:min-h-44">
                  <p className="font-sans text-sm text-foreground/72">
                    [ Replace with real info: Project screenshots ]
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Description
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/92">
              {visibleDescription}
            </p>
            {hasLongDescription ? (
              <button
                type="button"
                onClick={() => setShowFullDescription((value) => !value)}
                className="mt-4 inline-flex w-fit items-center rounded-full border border-border/80 bg-background px-3 py-1.5 text-sm text-foreground transition active:scale-[0.99] hover:border-foreground hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            ) : null}
          </div>

          <div className="rounded-[1.45rem] border border-border/70 bg-muted/40 p-5 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className={getTechBadgeClass(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="mt-auto flex flex-col gap-3 bg-transparent px-5 pb-6 pt-5 sm:flex-row sm:flex-wrap">
          <Button
            render={<Link href={`/projects/${project.slug}`} />}
            variant="outline"
            className="w-full rounded-full border-border/80 bg-background sm:w-auto"
          >
            View Project
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
            className="w-full rounded-full sm:w-auto"
          >
            GitHub
            <GitBranch className="size-4" />
          </Button>
          {project.repoUrl ? (
            <Button
              render={
                <Link href={project.repoUrl} target="_blank" rel="noreferrer" />
              }
              variant="ghost"
              className="w-full rounded-full sm:w-auto"
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
