# sys-dev-portf

Developer portfolio scaffold built with Next.js App Router, Turbopack, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Live GitHub repository integration
- Deployment targets for Vercel and Render

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and update it:

```bash
cp .env.example .env.local
```

3. Run the app with Turbopack:

```bash
npm run dev
```

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_USERNAME` | Yes | GitHub username used for profile and repository fetching |
| `GITHUB_TOKEN` | No | Optional token for higher GitHub API rate limits |
| `FEATURED_GITHUB_REPOS` | No | Comma-separated allowlist for featured repositories |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for metadata and deployment |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Email shown in the static contact section |

## GitHub Integration

- Portfolio project cards start from local typed content.
- If GitHub data is available, repositories are fetched server-side and merged into those project cards.
- If GitHub fails or rate-limits, the UI stays stable and falls back to local content.
- GitHub Actions CI runs lint, typecheck, and build on pushes and pull requests.

## Deployment

### Vercel

- Import the GitHub repository into Vercel.
- Set the environment variables from `.env.example`.
- Keep the default Next.js build settings.

### Render

- Create a new Web Service from the GitHub repo.
- Render can read `render.yaml` for build and start commands.
- Add the same environment variables used in Vercel.

## Project Structure

```text
src/
  app/
  components/
    layout/
    portfolio/
    ui/
  features/
    portfolio/
      data/
      lib/
  lib/
  types/
```

## Notes

- The portfolio is content-first and does not require a database in v1.
- Contact is intentionally static-only for a simpler and safer public surface.
- Update the placeholder portfolio content in `src/features/portfolio/data/portfolio-content.ts` with your real information.
