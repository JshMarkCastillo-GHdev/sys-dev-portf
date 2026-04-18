# Full Stack Developer Portfolio

Developer portfolio built with Next.js App Router, Turbopack, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
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

| Variable                    | Required | Purpose                                                  |
| --------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Yes      | Public site URL used for metadata and deployment         |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No       | Optional public email override for the contact section   |
| `NEXT_PUBLIC_RESUME_URL`    | No       | Optional public resume path override                     |

## Production Behavior

- Production uses local portfolio content only.
- No live GitHub API requests are required for the deployed site.
- Project, profile, and contact content are sourced from `src/features/portfolio/data/portfolio-content.ts`.
- GitHub Actions CI runs lint, typecheck, and build on pushes and pull requests.

## Deployment

### Vercel

- Import the GitHub repository into Vercel.
- Set the environment variables from `.env.example`.
- Keep the default Next.js build settings.
- Recommended manual setup:
  1. Import the repository into Vercel.
  2. Set `NEXT_PUBLIC_SITE_URL` to your final production domain.
  3. Optionally set `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_RESUME_URL`.
  4. Deploy using the default Vercel Next.js build settings.
  5. After deployment, verify:
     `/`
     `/about`
     `/skills`
     `/projects`
     `/projects/project_1`
     `/projects/project_2`
     `/projects/project_3`
     `/experience`
     `/contact`
  6. Confirm profile and project images load from `public/assets/...`.

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
- Production assets should live in:
  `public/assets/profile/`
  `public/assets/projects/`
  `public/assets/brand/`
  `public/assets/icons/`
