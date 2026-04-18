import type {
  AboutContent,
  ContactLink,
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

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub Link #1",
    href: "https://github.com/your-placeholder-profile",
    value: "@your-placeholder-profile",
    helperText: "Primary public portfolio and code repository link.",
    icon: "github",
  },
  {
    label: "Email",
    href: "mailto:hello@example.dev",
    value: "hello@example.dev",
    helperText: "Direct email contact for professional opportunities.",
    icon: "email",
  },
  {
    label: "Indeed",
    href: "https://www.indeed.com",
    value: "Indeed profile placeholder",
    helperText: "Professional profile placeholder for future job visibility.",
    icon: "briefcase",
  },
  {
    label: "Resume",
    href: "/resume/joshua-mark-castillo-resume.pdf",
    value: "Download current resume",
    helperText: "Use this to review the latest resume snapshot.",
    icon: "resume",
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
    title: "Frontend",
    icon: "frontend",
    description:
      "Building responsive interfaces with modern React tooling and a clean component workflow.",
    items: [
      "NextJS Turbopack",
      "ReactJS",
      "TypeScript",
      "TailwindCSS",
      "ShadcnUI",
    ],
  },
  {
    title: "Backend",
    icon: "backend",
    description:
      "Comfortable with server-side JavaScript for building APIs, integrations, and application logic.",
    items: ["NodeJS"],
  },
  {
    title: "Databases",
    icon: "databases",
    description:
      "Familiar with relational and document-oriented data stacks for structured and flexible application data.",
    items: ["Prisma + PostgreSQL", "Mongoose + MongoDB"],
  },
  {
    title: "Tools",
    icon: "tools",
    description:
      "Daily tools that support API testing, collaboration, version control, and documentation.",
    items: ["Swagger", "Postman", "Git", "GitHub", "REST APIs"],
  },
  {
    title: "Deployment",
    icon: "deployment",
    description:
      "Comfortable shipping and maintaining applications on modern hosting platforms.",
    items: ["Vercel", "Render"],
  },
  {
    title: "Agents familiar with",
    icon: "agents",
    description:
      "AI-assisted development tools I am familiar with for code generation and workflow acceleration.",
    items: ["Cursor", "Codex"],
  },
]

export const featuredProjects: ProjectItem[] = [
  {
    slug: "portfolio-command-center",
    title: "Project Template #1",
    summary:
      "Placeholder project description for introducing the project scope, goals, and expected outcome.",
    description:
      "Use this template to present a project title, a concise description, the stack used, screenshot slots, and relevant links.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    screenshotPlaceholder: {
      label: "Screenshots",
      caption: "Place UI previews or product screenshots here.",
    },
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
    title: "Project Template #1",
    summary:
      "Placeholder summary for another reusable project card entry within the same portfolio template system.",
    description:
      "This blank-style project card can be reused by updating only the content fields for links, screenshots, and stack details.",
    techStack: ["React", "TypeScript", "MDX", "Design Systems"],
    screenshotPlaceholder: {
      label: "Screenshots",
      caption: "Use this area for visual snapshots or walkthrough images.",
    },
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
    title: "Project Template #1",
    summary:
      "Placeholder summary for a future project card that still follows the same reusable layout.",
    description:
      "Keep this template ready for later project additions by filling in screenshots, stack details, and repository links.",
    techStack: ["Next.js", "Charts", "UX Writing", "Component Systems"],
    screenshotPlaceholder: {
      label: "Screenshots",
      caption: "Reserve this panel for dashboard or product screenshots.",
    },
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
    id: "industry-template-1-remote",
    company: "Company Placeholder",
    role: "Industry Experience Template #1",
    duration: "Duration Placeholder",
    location: "Remote",
    summary:
      "Use this template card to present company, role, duration, and the core responsibilities for industry experience.",
    responsibilities: [
      "Responsibility placeholder #1",
      "Responsibility placeholder #2",
      "Responsibility placeholder #3",
    ],
  },
  {
    id: "industry-template-1-hybrid",
    company: "Company Placeholder",
    role: "Industry Experience Template #1",
    duration: "Duration Placeholder",
    location: "Hybrid",
    summary:
      "Another reusable blank card for adding more industry experience entries later.",
    responsibilities: [
      "Responsibility placeholder #1",
      "Responsibility placeholder #2",
      "Responsibility placeholder #3",
    ],
  },
]

export const educationItems: EducationItem[] = [
  {
    id: "education-template-1-urs-morong",
    degree: "Computer Engineering",
    institution: "University of Rizal System Morong",
    duration: "Education Experience #1",
    summary:
      "Reusable education template entry for academic background and foundational engineering studies.",
    details: [
      "Computer Engineering from University of Rizal System Morong",
      "Use this template to add honors, projects, or academic highlights later.",
    ],
  },
]
