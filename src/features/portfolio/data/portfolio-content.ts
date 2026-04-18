import type {
  AboutContent,
  EducationItem,
  ExperienceItem,
  HomeAnchorItem,
  NavItem,
  ProjectItem,
  SiteConfig,
  SkillGroup,
  SocialLink,
  StatItem,
} from "@/types/portfolio"

export const siteConfig: SiteConfig = {
  name: "Joshua Mark Castillo",
  role: "Jr. Full Stack Developer",
  tagline: "Building scalable web applications for innovation and process automation.",
  location: "Remote / Asia",
  email: "hello@example.dev",
  shortBio:
    "Jr. full stack developer focused on scalable web applications, practical automation, and clean user experiences.",
  longBio:
    "I build modern web experiences with a strong focus on maintainability, thoughtful interfaces, and process automation. I enjoy turning operational pain points into reliable products that help teams move faster with less friction.",
  availability: "Open to junior full stack opportunities and collaborative product work.",
  resumeUrl: "/resume/joshua-mark-castillo-resume.pdf",
  githubUsername: "octocat",
  repoAllowlist: ["hello-world", "Spoon-Knife"],
}

export const navigationItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
]

export const homeAnchorItems: HomeAnchorItem[] = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
]

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/octocat",
    value: "@octocat",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile",
    value: "linkedin.com/in/your-profile",
  },
  {
    label: "Email",
    href: "mailto:hello@example.dev",
    value: "hello@example.dev",
  },
]

export const heroStats: StatItem[] = [
  { label: "Focus", value: "Scalable Web Apps" },
  { label: "Workflow", value: "Process Automation" },
  { label: "Stack", value: "Next.js + TypeScript" },
]

export const aboutContent: AboutContent = {
  techJourney:
    "I chose Full Stack Development to eliminate tiring processes and become one of the stepping stones to full automations.",
  softSkills: [
    "Team Communication",
    "Project Collaboration",
    "Critical Problem Solving",
    "Proper Escalation",
    "Technical Documentation",
  ],
  hobbies: [
    "Game Development",
    "Fantasy Genre Animes Streaming",
  ],
  profilePlaceholder: {
    label: "Profile Photo",
    caption: "Placeholder image for now",
  },
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    description: "Interfaces that stay responsive, readable, and comfortable to use across screen sizes.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend Thinking",
    description: "Practical server-side patterns for integrations, API flows, and maintainable logic.",
    items: ["Node.js", "Route Handlers", "REST", "Validation", "Auth-aware design"],
  },
  {
    title: "Delivery Workflow",
    description: "A developer workflow built around dependable shipping and iterative improvement.",
    items: ["GitHub Actions", "Vercel", "Render", "Testing strategy", "DX tooling"],
  },
]

export const featuredProjects: ProjectItem[] = [
  {
    slug: "portfolio-command-center",
    title: "Portfolio Command Center",
    summary:
      "A modular portfolio shell with live GitHub enrichment and reusable section architecture.",
    description:
      "Built to tell a developer story clearly while keeping content typed, sections reusable, and deployment friction low.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    repoUrl: "https://github.com/octocat/hello-world",
    liveUrl: "https://example.dev",
    imageHint: "dashboard gradients",
    featured: true,
    githubRepo: "hello-world",
    highlights: [
      "Server-rendered portfolio sections with typed content modules.",
      "Reusable cards and layout primitives for fast iteration.",
      "Live GitHub repo enrichment with graceful fallback behavior.",
    ],
  },
  {
    slug: "case-study-library",
    title: "Case Study Library",
    summary:
      "A project archive focused on presenting outcomes, architecture decisions, and technical depth.",
    description:
      "Designed to make project storytelling stronger with a flexible template for highlights, stack, and delivery notes.",
    techStack: ["React", "TypeScript", "MDX", "Design Systems"],
    repoUrl: "https://github.com/octocat/Spoon-Knife",
    imageHint: "notebook cards",
    featured: true,
    githubRepo: "Spoon-Knife",
    highlights: [
      "Structured content model for case-study style portfolio entries.",
      "Mobile-first layout that keeps content easy to scan.",
      "Focused on clarity over visual noise.",
    ],
  },
  {
    slug: "team-ops-dashboard",
    title: "Team Ops Dashboard",
    summary:
      "An internal-facing dashboard prototype showing metrics, workflows, and release status.",
    description:
      "A concept project used to explore how data-heavy interfaces can still feel calm and navigable.",
    techStack: ["Next.js", "Charts", "UX Writing", "Component Systems"],
    repoUrl: "https://github.com/octocat/octocat.github.io",
    imageHint: "analytics board",
    featured: false,
    highlights: [
      "Component-driven information architecture.",
      "Sharp hierarchy for denser data surfaces.",
      "Optimized for maintainability under iteration.",
    ],
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    title: "Frontend Developer",
    organization: "Product Studio",
    location: "Remote",
    period: "2023 - Present",
    summary:
      "Building responsive product interfaces and reusable systems for client and internal products.",
    bullets: [
      "Shipped reusable UI foundations to reduce repeated feature work.",
      "Improved developer handoff by standardizing component patterns.",
      "Balanced visual polish with maintainable implementation choices.",
    ],
  },
  {
    title: "Full-Stack Developer",
    organization: "Startup Lab",
    location: "Hybrid",
    period: "2021 - 2023",
    summary:
      "Worked across product flows, APIs, and deployment pipelines with a strong bias for clarity and delivery.",
    bullets: [
      "Built end-to-end features from schema planning to UI release.",
      "Introduced cleaner routing and shared utility patterns.",
      "Supported deployment workflows across multiple environments.",
    ],
  },
]

export const educationItems: EducationItem[] = [
  {
    school: "State University",
    credential: "B.S. in Computer Science",
    period: "2017 - 2021",
    summary:
      "Focused on software engineering, systems design, and practical application development.",
    bullets: [
      "Completed capstone work around full-stack application architecture.",
      "Built a foundation in algorithms, data structures, and databases.",
    ],
  },
]
