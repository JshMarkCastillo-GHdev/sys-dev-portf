# Backend Worktree Notes

## Branch
`cascade/backend-worktree`

## Role
Senior Back End Developer

---

## Issues Fixed

### 1. Repo Allowlist Matching Bug (High Priority)
**Location:** `src/lib/github.ts` (lines 106-110)

**Problem:** The `repoAllowlist` in `siteConfig` contained full GitHub URLs like:
- `https://github.com/JshMarkCastillo-GHdev/yolov8-webApp-reactVite`

But the matching code compared these directly to repo names like:
- `yolov8-webApp-reactVite`

This caused **zero matches**, preventing GitHub data enrichment for all projects.

**Solution:** Added URL parsing logic to extract repo names from full URLs before comparison:

```typescript
const allowed = new Set(
  allowlist.map((entry) => {
    const trimmed = entry.trim().toLowerCase()
    if (trimmed.startsWith("http")) {
      try {
        const url = new URL(trimmed)
        const segments = url.pathname.split("/").filter(Boolean)
        return segments[segments.length - 1] || trimmed
      } catch {
        return trimmed
      }
    }
    return trimmed
  })
)
```

**Result:** GitHub enrichment now works for all allowlisted repositories.

---

### 2. Project_4 (Photobooth) External Repo Configuration
**Location:** `src/features/portfolio/data/portfolio-content.ts`

**Problem 1:** Project_4 was missing from `repoAllowlist`, preventing GitHub enrichment.

**Problem 2:** The `githubRepo` field in project_4 referenced `photobotth` under the wrong owner (`JshMarkCastillo-GHdev`). The actual repo is at `ryMGDLT/photobotth`.

**Problem 3:** The `liveUrl` was a placeholder (`https://your-live-project-url.example`) instead of the actual deployment URL.

**Solution:**
1. Added `https://github.com/ryMGDLT/photobotth` to `repoAllowlist`
2. **Removed** the `githubRepo` field from project_4 (repo is under different owner)
3. Updated `repoUrl` to point to correct owner: `https://github.com/ryMGDLT/photobotth`
4. Updated `liveUrl` to actual deployment: `https://photobotth-sand.vercel.app/`

**Result:** project_4 now correctly links to external repo and live preview.

**Note:** Since photobooth is under `ryMGDLT`, GitHub enrichment won't work unless:
- You fork it to your account, OR
- The owner makes it public AND you use a token with access, OR
- You accept static data only (current behavior)

See `REPO_PUBLIC_SETUP.md` for fork instructions.

---

### 3. POS System GitHub Enrichment Setup
**Location:** `src/features/portfolio/data/portfolio-content.ts`

**Problem:** POS System (project_3) was not getting GitHub enrichment because:
- Missing from `repoAllowlist`
- No `githubRepo` field in project config

**Solution:**
1. Added `https://github.com/JshMarkCastillo-GHdev/sys-pos-system` to `repoAllowlist`
2. Added `githubRepo: "sys-pos-system"` to project_3 config

**Result:** POS System will receive GitHub enrichment once the repo is made public.

---

## Data Flow Architecture

### Server-Side Data Pipeline

```
page.tsx (Server Component)
    ↓
getPortfolioData() → project-data.ts
    ↓
[Parallel Fetch]
    ├─ getGithubProfile(username)
    └─ getGithubRepos(username, allowlist)
    ↓
mergeProjectsWithGithub(projects, repos)
    ↓
ProjectCard (Client Component)
```

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/github.ts` | Server-only GitHub API client with caching (1hr revalidate) |
| `src/features/portfolio/lib/project-data.ts` | Data aggregation layer |
| `src/features/portfolio/data/portfolio-content.ts` | Static content source of truth |
| `src/features/portfolio/types/portfolio.ts` | TypeScript contracts |

---

## Frontend Components Wired

The following frontend components (created by Senior Frontend Developer) are now properly wired to backend data:

- **`ProjectCard`** (`src/features/portfolio/components/project-card.tsx`)
  - Receives enriched `ProjectItem` data
  - Handles image loading errors with fallbacks
  - Expandable description with "Show more/less"
  - Links to detail page and external repo

- **`SectionShell`** (`src/features/portfolio/components/section-shell.tsx`)
  - Layout wrapper for consistent section styling

- **Project Detail Page** (`src/app/projects/[slug]/page.tsx`)
  - Static generation via `generateStaticParams`
  - Dynamic metadata via `generateMetadata`
  - Full project details with tech stack badges

---

## GitHub Enrichment Status

| Project | Repo | In Allowlist | `githubRepo` Set | Needs Public | Status |
|---------|------|--------------|------------------|--------------|--------|
| Portfolio | `sys-dev-portf` | ✅ Yes | ✅ Yes | ⏳ Pending | Ready for enrichment |
| YoloV8 | `yolov8-webApp-reactVite` | ✅ Yes | ✅ Yes | ⏳ Pending | Ready for enrichment |
| POS System | `sys-pos-system` | ✅ Yes | ✅ Yes | ⏳ Pending | Ready for enrichment |
| Photobooth | `ryMGDLT/photobotth` | ✅ Yes | ❌ No | ⚠️ External | Static data only |

**Action Required:** Make repos 1-3 public (see `REPO_PUBLIC_SETUP.md`)

---

## Environment Variables Required

```bash
# Optional - increases GitHub API rate limit from 60/hr to 5000/hr
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

No token is required for basic functionality (public repos only).

---

## Testing Verification

To verify the fixes work:

1. **GitHub enrichment:** Visit `/projects` and confirm project cards show:
   - Star counts from GitHub
   - Fork counts
   - Last updated dates
   - Merged tech stacks

2. **project_4 links:**
   - Click "GitHub" button → should open `https://github.com/ryMGDLT/photobotth`
   - Click "Live preview" on detail page → should open `https://photobotth-sand.vercel.app/`

---

## Future Considerations

1. **Cross-owner repos:** The current architecture assumes repos are under `siteConfig.githubUsername`. For repos under different owners (like project_4), we skip GitHub enrichment and use static data only.

2. **Rate limiting:** Without `GITHUB_TOKEN`, the app may hit 60 req/hr limit during development. Production deployments should consider caching strategies.

3. **Contact form:** Currently static. If a form is added later, implement:
   - Zod validation
   - Rate limiting
   - Spam protection
   - Server-side handling only (no client-side secrets)
