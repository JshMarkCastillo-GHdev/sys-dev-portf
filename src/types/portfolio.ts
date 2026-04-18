export type NavItem = {
  href: string
  label: string
}

export type HomeAnchorItem = {
  href: string
  label: string
}

export type SocialLink = {
  label: string
  href: string
  value: string
}

export type StatItem = {
  label: string
  value: string
}

export type SkillGroup = {
  title: string
  icon: string
  description: string
  items: string[]
}

export type AboutContent = {
  techJourney: string
  softSkills: string[]
  hobbies: string[]
  profilePlaceholder: {
    label: string
    caption: string
  }
}

export type ProjectItem = {
  slug: string
  title: string
  summary: string
  description: string
  techStack: string[]
  screenshotPlaceholder: {
    label: string
    caption: string
  }
  repoUrl?: string
  liveUrl?: string
  imageHint: string
  featured: boolean
  githubRepo?: string
  highlights: string[]
}

export type ExperienceItem = {
  id: string
  company: string
  role: string
  duration: string
  responsibilities: string[]
  location?: string
  summary?: string
}

export type EducationItem = {
  id: string
  degree: string
  institution: string
  duration: string
  details: string[]
  summary?: string
}

export type SiteConfig = {
  name: string
  role: string
  tagline: string
  location: string
  email: string
  shortBio: string
  longBio: string
  availability: string
  resumeUrl: string
  githubUsername: string
  repoAllowlist: string[]
}

export type GithubProfile = {
  username: string
  displayName: string
  bio: string
  avatarUrl: string
  followers: number
  publicRepos: number
  company?: string
  location?: string
  blog?: string
}

export type GithubProjectRepo = {
  id: number
  name: string
  description: string
  url: string
  homepage?: string
  stars: number
  forks: number
  updatedAt: string
  topics: string[]
  language?: string
}
