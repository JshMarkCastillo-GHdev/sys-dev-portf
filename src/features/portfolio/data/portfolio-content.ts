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
} from "@/features/portfolio/types/portfolio"

export const siteConfig: SiteConfig = {
  name: "Joshua Mark Castillo",
  role: "Jr. Full Stack Developer",
  tagline: "Building scalable web applications for innovation and process automation.",
  location: "[ Replace with real info: Work location or preferred setup ]",
  email: "[ Replace with real info: Professional email address ]",
  shortBio:
    "[ Replace with real info: Short professional introduction for the landing page ]",
  longBio:
    "[ Replace with real info: Longer developer bio for the About section snapshot ]",
  availability:
    "[ Replace with real info: Current availability status for work, freelance, or collaboration ]",
  resumeUrl: "/resume/joshua-mark-castillo-resume.pdf",
  githubUsername: "your-github-username",
  repoAllowlist: ["your-featured-repo-1", "your-featured-repo-2"],
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
    href: "https://github.com/your-github-username",
    value: "[ Replace with real info: GitHub username ]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-linkedin-slug",
    value: "[ Replace with real info: LinkedIn profile URL ]",
  },
  {
    label: "Email",
    href: "mailto:your-email@example.com",
    value: "[ Replace with real info: Professional email address ]",
  },
]

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub Link #1",
    href: "https://github.com/your-github-username",
    value: "[ Replace with real info: GitHub profile link ]",
    helperText: "[ Replace with real info: Short note about your GitHub profile or pinned work ]",
    icon: "github",
  },
  {
    label: "Email",
    href: "mailto:your-email@example.com",
    value: "[ Replace with real info: Primary email address ]",
    helperText: "[ Replace with real info: Preferred contact use or response note ]",
    icon: "email",
  },
  {
    label: "Indeed",
    href: "https://www.indeed.com/your-profile",
    value: "[ Replace with real info: Indeed or alternate professional profile URL ]",
    helperText: "[ Replace with real info: Short note about this professional profile ]",
    icon: "briefcase",
  },
  {
    label: "Resume",
    href: "/resume/joshua-mark-castillo-resume.pdf",
    value: "[ Replace with real info: Resume file title or version ]",
    helperText: "[ Replace with real info: Resume summary or last updated note ]",
    icon: "resume",
  },
]

export const heroStats: StatItem[] = [
  { label: "Focus", value: "[ Replace with real info: Core specialization ]" },
  { label: "Workflow", value: "[ Replace with real info: Preferred delivery style ]" },
  { label: "Stack", value: "[ Replace with real info: Primary stack summary ]" },
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
    caption: "[ Replace with real info: Profile photo image ]",
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
    title: "[ Replace with real info: Project title ]",
    summary:
      "[ Replace with real info: Project summary ]",
    description:
      "[ Replace with real info: Project description ]",
    techStack: [
      "[ Replace with real info: Project tech stack item 1 ]",
      "[ Replace with real info: Project tech stack item 2 ]",
      "[ Replace with real info: Project tech stack item 3 ]",
    ],
    screenshotPlaceholder: {
      label: "Screenshots",
      caption: "[ Replace with real info: Project screenshot set or preview image ]",
    },
    repoUrl: "https://github.com/your-github-username/your-project-repo",
    liveUrl: "https://your-live-project-url.example",
    imageHint: "[ Replace with real info: Screenshot style hint ]",
    featured: true,
    githubRepo: "your-project-repo",
    highlights: [
      "[ Replace with real info: Project highlight #1 ]",
      "[ Replace with real info: Project highlight #2 ]",
      "[ Replace with real info: Project highlight #3 ]",
    ],
  },
  {
    slug: "case-study-library",
    title: "[ Replace with real info: Project title ]",
    summary:
      "[ Replace with real info: Project summary ]",
    description:
      "[ Replace with real info: Project description ]",
    techStack: [
      "[ Replace with real info: Project tech stack item 1 ]",
      "[ Replace with real info: Project tech stack item 2 ]",
      "[ Replace with real info: Project tech stack item 3 ]",
    ],
    screenshotPlaceholder: {
      label: "Screenshots",
      caption: "[ Replace with real info: Project screenshot set or preview image ]",
    },
    repoUrl: "https://github.com/your-github-username/your-project-repo",
    liveUrl: "https://your-live-project-url.example",
    imageHint: "[ Replace with real info: Screenshot style hint ]",
    featured: true,
    githubRepo: "your-project-repo",
    highlights: [
      "[ Replace with real info: Project highlight #1 ]",
      "[ Replace with real info: Project highlight #2 ]",
      "[ Replace with real info: Project highlight #3 ]",
    ],
  },
  {
    slug: "team-ops-dashboard",
    title: "[ Replace with real info: Project title ]",
    summary:
      "[ Replace with real info: Project summary ]",
    description:
      "[ Replace with real info: Project description ]",
    techStack: [
      "[ Replace with real info: Project tech stack item 1 ]",
      "[ Replace with real info: Project tech stack item 2 ]",
      "[ Replace with real info: Project tech stack item 3 ]",
    ],
    screenshotPlaceholder: {
      label: "Screenshots",
      caption: "[ Replace with real info: Project screenshot set or preview image ]",
    },
    repoUrl: "https://github.com/your-github-username/your-project-repo",
    liveUrl: "https://your-live-project-url.example",
    imageHint: "[ Replace with real info: Screenshot style hint ]",
    featured: false,
    highlights: [
      "[ Replace with real info: Project highlight #1 ]",
      "[ Replace with real info: Project highlight #2 ]",
      "[ Replace with real info: Project highlight #3 ]",
    ],
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    id: "industry-template-1-remote",
    company: "[ Replace with real info: Company name ]",
    role: "[ Replace with real info: Job title ]",
    duration: "[ Replace with real info: Employment duration ]",
    location: "[ Replace with real info: Work setup or location ]",
    summary:
      "[ Replace with real info: Short summary of your responsibilities or impact ]",
    responsibilities: [
      "[ Replace with real info: Responsibility or achievement #1 ]",
      "[ Replace with real info: Responsibility or achievement #2 ]",
      "[ Replace with real info: Responsibility or achievement #3 ]",
    ],
  },
  {
    id: "industry-template-1-hybrid",
    company: "[ Replace with real info: Company name ]",
    role: "[ Replace with real info: Job title ]",
    duration: "[ Replace with real info: Employment duration ]",
    location: "[ Replace with real info: Work setup or location ]",
    summary:
      "[ Replace with real info: Short summary of your responsibilities or impact ]",
    responsibilities: [
      "[ Replace with real info: Responsibility or achievement #1 ]",
      "[ Replace with real info: Responsibility or achievement #2 ]",
      "[ Replace with real info: Responsibility or achievement #3 ]",
    ],
  },
]

export const educationItems: EducationItem[] = [
  {
    id: "education-template-1-urs-morong",
    degree: "Computer Engineering",
    institution: "University of Rizal System Morong",
    duration: "[ Replace with real info: Education duration ]",
    summary:
      "[ Replace with real info: Education summary or focus area ]",
    details: [
      "Computer Engineering from University of Rizal System Morong",
      "[ Replace with real info: Honors, thesis, capstone, or academic highlight ]",
    ],
  },
]
