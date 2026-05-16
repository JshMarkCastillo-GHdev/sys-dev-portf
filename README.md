# Full Stack Developer Portfolio

Developer portfolio built with Next.js App Router, Turbopack, React, TypeScript, Tailwind CSS, and shadcn-style UI primitives.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn-style UI primitives
- Live GitHub repository integration
- Deployment targets for Vercel and Render

## Important Features

- **Portfolio pages**: App Router pages for home, about, skills, projects, experience, education, and contact.
- **Centralized content**: Profile, navigation, social links, skills, projects, experience, education, and contact entries live in `src/features/portfolio/data/portfolio-content.ts`.
- **Typed content model**: Portfolio data shapes live in `src/features/portfolio/types/portfolio.ts`.
- **GitHub enrichment**: Public GitHub profile and repository data is fetched server-side and merged with local project content.
- **Project detail routes**: Project pages are generated from stable local slugs under `src/app/projects/[slug]/`.
- **Static contact surface**: Contact uses public links and resume download only; no public write endpoint is exposed.
- **CI and deployment**: GitHub Actions validates lint, typecheck, and build. Render deployment is configured in `render.yaml`.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file and update it:

```bash
copy NUL .env.local
```

3. Run the app with Turbopack:

```bash
npm run dev
```

## Environment Variables

| Variable                    | Required | Purpose                                                                 |
| --------------------------- | -------- | ----------------------------------------------------------------------- |
| `GITHUB_USERNAME`           | Yes      | GitHub username used for profile and repository fetching                |
| `GITHUB_TOKEN`              | No       | Optional server-only token for higher GitHub API rate limits            |
| `FEATURED_GITHUB_REPOS`     | No       | Comma-separated repository allowlist used for featured repository fetches |
| `NEXT_PUBLIC_SITE_URL`      | Yes      | Public site URL for metadata and deployment                             |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No       | Email shown in the static contact section                               |
| `NEXT_PUBLIC_RESUME_URL`    | No       | Public resume path or URL used by header/contact resume links           |

Keep `.env.local`, deployment environment variables, and `render.yaml` aligned when adding or removing configuration.

## GitHub Integration

- Portfolio project cards start from local typed content.
- If GitHub data is available, repositories are fetched server-side and merged into those project cards.
- If GitHub fails or rate-limits, the UI stays stable and falls back to local content.
- GitHub Actions CI runs lint, typecheck, and build on pushes and pull requests.
- `GITHUB_TOKEN` must stay server-only and must not use the `NEXT_PUBLIC_` prefix.
- The repository allowlist should be documented and configured consistently with the matching logic in `src/lib/github.ts`.

## Deployment

### Vercel

- Import the GitHub repository into Vercel.
- Set the environment variables from the table above.
- Keep the default Next.js build settings.

### Render

- Create a new Web Service from the GitHub repo.
- Render can read `render.yaml` for build and start commands.
- Add the same environment variables used in Vercel.

## Project Structure

```text
src/
  app/
    about/
    contact/
    experience/
    projects/
    skills/
  components/
    layout/
    ui/
  features/
    portfolio/
      components/
      data/
      lib/
      types/
  lib/
```

## Documentation

- `PROJECT_AUDIT.md` summarizes current architecture, security posture, UI/UX review, vibe-coded areas, and technical debt.
- `PORTFOLIO_PLACEHOLDER_GUIDE.md` lists the main content and asset fields that should be replaced before production use.
- `AGENTS.md` defines implementation rules for keeping the app portfolio-first, secure, maintainable, and content-driven.

## Notes

- The portfolio is content-first and does not require a database in v1.
- Contact is intentionally static-only for a simpler and safer public surface.
- Update the placeholder portfolio content in `src/features/portfolio/data/portfolio-content.ts` with your real information.
- Replace public placeholder URLs, screenshot fallbacks, and template IDs before promoting the site as production-ready.
