import { cn } from "@/lib/utils";

const sharedBadgeClasses =
  "h-auto min-h-9 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition sm:min-h-10";

const techBadgeToneMap: Record<string, string> = {
  "Next.js App Router":
    "border-zinc-400/35 bg-zinc-100/10 text-zinc-100 hover:border-zinc-300/55 hover:bg-zinc-100/15",
  "Next.js":
    "border-zinc-400/35 bg-zinc-100/10 text-zinc-100 hover:border-zinc-300/55 hover:bg-zinc-100/15",
  Turbopack:
    "border-orange-400/35 bg-orange-400/12 text-orange-200 hover:border-orange-300/55 hover:bg-orange-400/18",
  React:
    "border-cyan-400/35 bg-cyan-400/12 text-cyan-200 hover:border-cyan-300/55 hover:bg-cyan-400/18",
  ReactJS:
    "border-cyan-400/35 bg-cyan-400/12 text-cyan-200 hover:border-cyan-300/55 hover:bg-cyan-400/18",
  TypeScript:
    "border-sky-400/35 bg-sky-400/12 text-sky-200 hover:border-sky-300/55 hover:bg-sky-400/18",
  "Tailwind CSS":
    "border-teal-400/35 bg-teal-400/12 text-teal-200 hover:border-teal-300/55 hover:bg-teal-400/18",
  TailwindCSS:
    "border-teal-400/35 bg-teal-400/12 text-teal-200 hover:border-teal-300/55 hover:bg-teal-400/18",
  "shadcn/ui":
    "border-slate-300/30 bg-slate-200/10 text-slate-100 hover:border-slate-200/50 hover:bg-slate-200/15",
  ShadcnUI:
    "border-slate-300/30 bg-slate-200/10 text-slate-100 hover:border-slate-200/50 hover:bg-slate-200/15",
  Vite: "border-violet-400/35 bg-violet-400/12 text-violet-200 hover:border-violet-300/55 hover:bg-violet-400/18",
  NodeJS:
    "border-green-400/35 bg-green-400/12 text-green-200 hover:border-green-300/55 hover:bg-green-400/18",
  "Prisma + PostgreSQL":
    "border-cyan-500/35 bg-cyan-500/12 text-cyan-200 hover:border-cyan-400/55 hover:bg-cyan-500/18",
  "Mongoose + MongoDB":
    "border-emerald-400/35 bg-emerald-400/12 text-emerald-200 hover:border-emerald-300/55 hover:bg-emerald-400/18",
  Swagger:
    "border-lime-400/35 bg-lime-400/12 text-lime-200 hover:border-lime-300/55 hover:bg-lime-400/18",
  Postman:
    "border-orange-500/35 bg-orange-500/12 text-orange-200 hover:border-orange-400/55 hover:bg-orange-500/18",
  Git: "border-orange-400/35 bg-orange-400/12 text-orange-200 hover:border-orange-300/55 hover:bg-orange-400/18",
  GitHub:
    "border-slate-300/30 bg-slate-300/10 text-slate-100 hover:border-slate-200/50 hover:bg-slate-300/15",
  "REST APIs":
    "border-indigo-400/35 bg-indigo-400/12 text-indigo-200 hover:border-indigo-300/55 hover:bg-indigo-400/18",
  Vercel:
    "border-zinc-300/30 bg-zinc-300/10 text-zinc-100 hover:border-zinc-200/50 hover:bg-zinc-300/15",
  Render:
    "border-blue-400/35 bg-blue-400/12 text-blue-200 hover:border-blue-300/55 hover:bg-blue-400/18",
  Hostinger:
    "border-fuchsia-400/35 bg-fuchsia-400/12 text-fuchsia-200 hover:border-fuchsia-300/55 hover:bg-fuchsia-400/18",
  Cursor:
    "border-amber-400/35 bg-amber-400/12 text-amber-200 hover:border-amber-300/55 hover:bg-amber-400/18",
  Codex:
    "border-emerald-500/35 bg-emerald-500/12 text-emerald-200 hover:border-emerald-400/55 hover:bg-emerald-500/18",
  YoloV8:
    "border-rose-400/35 bg-rose-400/12 text-rose-200 hover:border-rose-300/55 hover:bg-rose-400/18",
  "ONNX Runtime Web":
    "border-blue-500/35 bg-blue-500/12 text-blue-200 hover:border-blue-400/55 hover:bg-blue-500/18",
  DaisyUI:
    "border-cyan-500/35 bg-cyan-500/12 text-cyan-200 hover:border-cyan-400/55 hover:bg-cyan-500/18",
  "Tesseract.js":
    "border-yellow-400/35 bg-yellow-400/12 text-yellow-200 hover:border-yellow-300/55 hover:bg-yellow-400/18",
  NextAuth:
    "border-violet-500/35 bg-violet-500/12 text-violet-200 hover:border-violet-400/55 hover:bg-violet-500/18",
};

const softSkillToneCycle = [
  "border-sky-400/35 bg-sky-400/12 text-sky-200 hover:border-sky-300/55 hover:bg-sky-400/18",
  "border-emerald-400/35 bg-emerald-400/12 text-emerald-200 hover:border-emerald-300/55 hover:bg-emerald-400/18",
  "border-amber-400/35 bg-amber-400/12 text-amber-200 hover:border-amber-300/55 hover:bg-amber-400/18",
  "border-violet-400/35 bg-violet-400/12 text-violet-200 hover:border-violet-300/55 hover:bg-violet-400/18",
  "border-rose-400/35 bg-rose-400/12 text-rose-200 hover:border-rose-300/55 hover:bg-rose-400/18",
  "border-cyan-400/35 bg-cyan-400/12 text-cyan-200 hover:border-cyan-300/55 hover:bg-cyan-400/18",
  "border-lime-400/35 bg-lime-400/12 text-lime-200 hover:border-lime-300/55 hover:bg-lime-400/18",
];

const fallbackTechBadgeTone =
  "border-border/80 bg-background text-foreground hover:border-foreground/45 hover:bg-card";

export function getTechBadgeClass(label: string) {
  return cn(sharedBadgeClasses, techBadgeToneMap[label] ?? fallbackTechBadgeTone);
}

export function getSoftSkillBadgeClass(index: number) {
  return cn(sharedBadgeClasses, softSkillToneCycle[index % softSkillToneCycle.length]);
}
