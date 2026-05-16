# Project Audit

This audit captures the current structure, feature surface, security posture, UI/UX quality, vibe-coded areas, and technical debt for `sys-dev-portf`.

## Executive Summary

`sys-dev-portf` is a content-first developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and shadcn-style UI primitives. The project mostly follows `AGENTS.md`: it avoids unnecessary backend layers, keeps portfolio content centralized, and uses server-only GitHub enrichment for public repository data.

The main issues are documentation drift, visible placeholder content, a likely GitHub repository allowlist mismatch, and missing stronger security headers for a public-facing site.

## Structure Review

```text
sys-dev-portf/
  .github/workflows/ci.yml
  public/
    assets/
    resume/
  src/
    app/
      about/
      contact/
      experience/
      projects/
      skills/
      layout.tsx
      page.tsx
    components/
      layout/
      ui/
    features/portfolio/
      components/
      data/
      lib/
      types/
    lib/
  AGENTS.md
  PORTFOLIO_PLACEHOLDER_GUIDE.md
  README.md
  next.config.ts
  render.yaml
```

## Important Features

- **Static portfolio pages**: App Router pages present home, about, skills, projects, experience, education, and contact content.
- **Centralized content model**: `src/features/portfolio/data/portfolio-content.ts` stores profile, navigation, social, skills, projects, experience, education, and contact data.
- **Typed content contracts**: `src/features/portfolio/types/portfolio.ts` defines reusable content shapes.
- **GitHub enrichment**: `src/lib/github.ts` fetches public profile and repository data server-side and merges it with local project cards.
- **Project detail pages**: `src/app/projects/[slug]/page.tsx` statically generates project routes from local project slugs.
- **Static contact surface**: Contact currently uses links and resume download only; no public write endpoint or contact form exists.
- **Deployment support**: `render.yaml` supports Render deployment, and README covers Vercel deployment.
- **CI validation**: `.github/workflows/ci.yml` runs install, lint, typecheck, and build.

## AGENTS.md Compliance

- **Portfolio-first scope**: Compliant. The app remains a developer portfolio, not an admin or business operations app.
- **Light architecture**: Compliant. No service/controller/repository layering is introduced unnecessarily.
- **Server-side sensitive logic**: Mostly compliant. GitHub token use is server-only through `server-only`.
- **Static content preference**: Compliant. No database is used for simple portfolio content.
- **UI/UX responsiveness**: Mostly compliant. Layout uses responsive Tailwind classes and accessible focus states.
- **Validation**: Acceptable for current scope because there are no external write endpoints. Environment-derived config still needs clearer documented formats.

## Security Findings

### Medium

- **Missing CSP and Permissions-Policy**: `next.config.ts` has basic headers (`nosniff`, `Referrer-Policy`, `X-Frame-Options`) but no Content-Security-Policy or Permissions-Policy.
- **Public personal contact data**: Email is intentionally exposed in static content. Keep this deliberate and avoid adding more private identifiers without approval.

### Low

- **External links use `noreferrer`**: Existing external links generally avoid opener leakage. This is acceptable.
- **No public mutation endpoints**: Good current posture. If a contact form is added later, it should use Zod validation, rate limiting, spam controls, and minimal stable responses.
- **GitHub errors logged server-side**: Current logs are generic enough and do not expose tokens.

## UI/UX Findings

### Strengths

- **Responsive layout**: Pages use mobile-first grid and spacing patterns.
- **Interactive states**: Buttons and links include hover, focus-visible, and active states.
- **Motion accessibility**: Scroll reveal respects reduced-motion preferences.
- **Scan-friendly sections**: Cards, badges, section shells, and clear headings support portfolio browsing.

### Gaps

- **Visible placeholders**: Some placeholder text and example URLs can reduce credibility in a production portfolio.
- **Image fallback copy**: Project cards show `[ Replace with real info: Project screenshots ]` when images fail or are missing.
- **Generic copy**: Some project and hero phrasing feels broad and could be more specific to real achievements.

## Vibe-Coded Indicators

- **Placeholder strings**: `imageHint` values and screenshot fallback text still say `Replace with real info`.
- **Example URLs**: `https://your-live-project-url.example` and `https://www.indeed.com/your-profile` remain in public content.
- **Template IDs**: IDs such as `industry-template-1-remote`, `industry-template-1-hybrid`, and `education-template-1-urs-morong` look scaffolded.
- **Broad claims**: Several descriptions emphasize scalability and automation without concrete metrics, screenshots, or outcomes.

## Technical Debt

### High

- **Repository allowlist mismatch**: `siteConfig.repoAllowlist` contains full GitHub URLs, while `getGithubRepos` compares each allowlist entry to `repo.name`. This likely prevents intended live enrichment for allowlisted repositories.

### Medium

- **Missing `.env.example`**: No `.env.example` file is present. README now instructs Windows users to create `.env.local` directly, but a tracked example file would still improve onboarding.
- **Environment variable synchronization risk**: README and `render.yaml` now include `NEXT_PUBLIC_RESUME_URL`; future env changes should keep both files aligned.
- **Documentation drift risk**: README structure has been aligned with the current tree; future folder moves should update the documentation in the same change.

### Low

- **Client component footprint**: `ProjectCard`, `SiteHeader`, and `ScrollReveal` appropriately need interactivity, but future components should remain Server Components by default.
- **No tests**: Current behavior is mostly static. Tests become more important if route handlers, schemas, or content normalization are added.

## Recommended Follow-Ups

1. Normalize `repoAllowlist` to repo names or update matching to support full URLs.
2. Consider adding `.env.example` and keep it synchronized with README and `render.yaml` if added.
3. Replace public placeholder links, image hints, and template IDs before production promotion.
4. Consider adding CSP and Permissions-Policy headers after confirming external asset and API needs.
5. Keep contact static unless a real form is needed; if added, implement Zod validation, spam protection, and rate limiting.
6. Tighten portfolio copy with concrete outcomes, project screenshots, and real live URLs.
