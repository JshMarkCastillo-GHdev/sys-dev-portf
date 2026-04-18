# AGENTS.md

This document defines the engineering standards that all AI agents must follow inside `sys-dev-portf`.

## Project Scope

`sys-dev-portf` is a Developer Portfolio App.

Its purpose is to present:

- developer profile and introduction
- skills and tech stack
- featured and archived projects
- work experience and education
- contact information and optional contact form

This project is not a business operations app, admin dashboard, CRM, ERP, booking system, or workflow platform. Build for content presentation, credibility, performance, maintainability, and safety.

## Core Principles

- Build for a portfolio experience first.
- Keep business logic out of UI components.
- Prefer simple, content-driven architecture over enterprise-style layering.
- Use strict TypeScript. Avoid `any`.
- Keep functions small, readable, and testable.
- Favor clarity over cleverness.
- Reuse shared logic when it is truly shared.
- Validate all external input at the boundary.
- Prefer server-side execution for sensitive logic, secrets, and form handling.
- Optimize for maintainability, responsive UI, and polished UX.

## Required Stack

- Framework: Next.js with App Router
- Language: TypeScript
- Styling: project-approved styling approach
- Validation: Zod for external inputs when needed
- Data source: local content, static config, or project-approved persistence
- API Style: Next.js Route Handlers only when server endpoints are necessary

## Portfolio-First Architecture

Use the lightest structure that matches the feature.

- Static or mostly static portfolio sections do not need backend-heavy layering.
- Presentational and content sections can live in `app/`, `components/`, and feature folders when appropriate.
- If a feature introduces real server logic, organize it cleanly under `features/`.
- Do not create service/controller/repository files unless the feature actually needs them.

Preferred direction:

`page/layout -> feature UI/content helpers -> optional server logic -> optional persistence`

Only introduce deeper layers when there is clear value, such as:

- contact form submission
- protected content management
- analytics ingestion
- project data persistence

## Suggested Folder Intent

```text
sys-dev-portf/
├── app/                         # Next.js App Router (Turbopack ready)
│   ├── layout.tsx               # Global layout (fonts, theme, navbar)
│   ├── page.tsx                 # Landing Page (Home)
│   │
│   ├── about/                   # About Section
│   │   └── page.tsx             # About Info #1
│   │
│   ├── skills/                  # Skills Section
│   │   └── page.tsx             # Skills Info #1
│   │
│   ├── projects/                # Projects Section
│   │   └── page.tsx             # Project Template #1 (reusable)
│   │
│   ├── experience/              # Experience Section
│   │   ├── industry/            # Industry Experience
│   │   │   └── page.tsx         # Work Experience #1 (reusable template)
│   │   └── education/           # Education Experience
│   │       └── page.tsx         # Education Experience #1
│   │
│   ├── contact/                 # Contact Section
│   │   └── page.tsx             # Contact Template (GitHub Link #1, form)
│   │
│   └── globals.css              # TailwindCSS global styles
│
├── components/                  # Reusable UI Components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                 # Landing page hero section
│   ├── AboutCard.tsx            # About card with photo + hobbies
│   ├── SkillsGrid.tsx           # Skills grid with categories
│   ├── ProjectCard.tsx          # Project template card
│   ├── ExperienceCard.tsx       # Experience template card
│   ├── ContactForm.tsx          # Contact form component
│   └── CTAButtons.tsx           # Call-to-action buttons
│
├── lib/                         # Utilities & Config
│   ├── prisma.ts                # Prisma client setup
│   ├── mongodb.ts               # Mongoose connection setup
│   └── api.ts                   # REST API helpers
│
├── public/                      # Static assets
│   ├── profile-placeholder.png  # Placeholder profile photo
│   └── favicon.ico
│
├── prisma/                      # Prisma schema
│   └── schema.prisma
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
└── AGENTS.md
```

## Feature Guidance

Good portfolio feature examples:

- `hero`
- `about`
- `skills`
- `projects`
- `experience`
- `education`
- `contact`
- `testimonials`
- `resume`

Use `features/<feature-name>/` when a section has enough complexity to justify co-location.

Suggested feature structure:

```text
features/<feature-name>/
  components/
  data/
  lib/
  schemas/
  types/
```

Add `routes/`, `controllers/`, `services/`, or `repositories/` only if the feature truly has server-side behavior or persistence needs.

## Next.js Standards

- Use the App Router.
- Prefer Server Components by default.
- Use Client Components only for real interactivity, browser APIs, animation control, or local UI state.
- Keep `page.tsx` and `layout.tsx` thin and focused on composition.
- Prefer server-side data loading when data is not purely client-side.
- Use static generation or cached server rendering where it fits the portfolio content model.
- Keep metadata, Open Graph data, and structured content clean and intentional.
- Do not expose secrets, tokens, or privileged logic to the client.

## UI and UX Rules

- The UI must feel intentional, professional, and mobile-friendly.
- Every page and section must work well on mobile, tablet, and desktop.
- Use strong hierarchy, clear spacing, and accessible contrast.
- Keep content easy to scan.
- Avoid overengineering animations; motion should support polish, not distract.
- Buttons and interactive elements should include sensible hover, focus, and active states by default.
- Prefer reusable presentational components in `components/`.
- Keep domain logic out of React components.

## Content Modeling Rules

- Treat portfolio content as structured data, not scattered hardcoded strings.
- Use typed objects for projects, skills, experience entries, and social links.
- Normalize repeatable content shapes so sections stay easy to maintain.
- Store only the fields needed for rendering.
- Prefer stable slugs for project detail pages when applicable.

Example content shape:

```ts
export type ProjectItem = {
  slug: string;
  title: string;
  summary: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
};
```

## When Route Handlers Are Appropriate

Only add route handlers when the portfolio actually needs server behavior, such as:

- contact form submission
- email forwarding
- newsletter signup
- protected admin content updates
- analytics/event ingestion

Rules:

- Validate every request with Zod or an equivalent project-approved schema.
- Keep route files thin.
- Never put secrets or provider credentials in client code.
- Return stable, minimal response shapes.
- Use proper HTTP status codes.
- Never leak internal error details to the client.

## Security Rules

Security still matters even for a portfolio app.

- Never trust request input.
- Validate and sanitize form input at the server boundary.
- Keep secrets in environment variables and never expose them to the client.
- Do not leak stack traces, provider errors, tokens, or raw database errors.
- Protect any admin-only or write-capable routes on the server.
- Rate-limit or otherwise protect abuse-prone endpoints when applicable, especially contact forms.
- Prevent spam vectors in contact forms through validation, server checks, and provider-safe handling.
- Avoid rendering unsafe HTML. If rich text is used, sanitize it.
- Do not expose private email addresses, phone numbers, or personal identifiers unless intentionally approved by the user.
- Avoid unnecessary third-party scripts and trackers.
- Load only trusted external assets and libraries.

## Data and Persistence Rules

- Prefer static content or typed local data unless persistence is actually required.
- If a database is introduced, Prisma is the only database access layer.
- Use a single Prisma client instance from `lib/prisma.ts`.
- Keep queries explicit and minimal.
- Select only the fields needed.
- Use migrations for schema changes.
- Do not add a database just to store simple portfolio content that can live safely in code or content files.

## Validation Rules

- Use Zod for request body, query param, and route param validation when external input exists.
- Infer TypeScript types from schemas where practical.
- Normalize external input before business logic runs.
- Skip unnecessary validation layers for purely static internal content.

## Performance Rules

- Optimize for fast initial page load and smooth navigation.
- Favor static rendering for stable portfolio content.
- Use optimized images and appropriately sized media.
- Keep bundle size small by limiting client components and heavy libraries.
- Avoid N+1 patterns if server data or database access is introduced.
- Cache only where correctness and freshness are preserved.

## SEO and Discoverability Rules

- Provide meaningful page titles and metadata.
- Use semantic headings and accessible markup.
- Include descriptive alt text for meaningful images.
- Keep project pages linkable and shareable.
- Prefer clean URLs and stable slugs.

## Testing Standards

- Add tests when changing behavior that has meaningful logic or risk.
- Prioritize tests for utilities, schemas, route handlers, and complex rendering logic.
- For form features, cover validation and failure states.
- Do not add heavy test structure for purely static markup unless there is a clear reason.

## Naming Conventions

- Folders: kebab-case
- Components: PascalCase
- Variables and functions: camelCase
- Types and interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE for true constants
- Source files: use clear, intention-revealing names

Examples:

- `project-card.tsx`
- `ProjectCard.tsx`
- `contact-form.schema.ts`
- `projects.data.ts`
- `project.types.ts`

## Code Quality Standards

- Use ESLint and Prettier project rules.
- Keep imports clean and ordered.
- Delete dead code.
- Prefer explicit types for exported functions and shared utilities.
- Document only non-obvious decisions with short comments.
- Avoid broad refactors unless explicitly requested.
- Prefer incremental, reviewable changes.

## Agent Execution Rules

All AI agents working in this project must:

- keep the app focused on a developer portfolio use case
- avoid introducing enterprise patterns unless the feature truly requires them
- preserve type safety end to end
- keep UI responsive across screen sizes
- add hover, focus, and active states to new interactive controls
- reuse existing components and utilities before creating new ones
- keep route handlers and server logic minimal
- respect security boundaries even for simple features
- add or update tests when behavior changes in a meaningful way
- choose clarity over cleverness
- choose maintainability over speed
- choose security over convenience

## Final Rule

After implementing a feature or fix, provide a brief, clear instruction as if guiding a junior developer.
