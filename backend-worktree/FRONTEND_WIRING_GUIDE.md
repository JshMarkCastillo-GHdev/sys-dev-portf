# Frontend Wiring Guide - GitHub API Integration

**From:** Senior Back End Developer  
**To:** Senior Front End Developer  
**Date:** 2026-05-16  
**Branch:** `cascade/backend-worktree` → `feat/app-development`

---

## Overview

The GitHub API backend integration is **complete and tested**. This guide provides everything you need to wire the frontend components to display live GitHub data.

## What Backend Has Implemented

### 1. GitHub Data Fetching (`src/lib/github.ts`)

Three main functions available:

```typescript
// 1. Fetch GitHub profile
const profile = await getGithubProfile('JshMarkCastillo-GHdev')
// Returns: avatar, bio, followers, publicRepos, etc.

// 2. Fetch GitHub repos with filtering
const repos = await getGithubRepos('JshMarkCastillo-GHdev', [
  'https://github.com/JshMarkCastillo-GHdev/sys-dev-portf',
  'https://github.com/JshMarkCastillo-GHdev/sys-pos-system',
])
// Returns: stars, forks, updatedAt, topics, language, etc.

// 3. Merge GitHub data with projects
const enrichedProjects = mergeProjectsWithGithub(projects, repos)
// Returns: Projects with merged techStack, highlights, live stats
```

### 2. Data Flow Architecture

```
src/lib/github.ts (server-side)
    ↓
getGithubRepos() + getGithubProfile()
    ↓
src/features/portfolio/lib/project-data.ts
    ↓
mergeProjectsWithGithub()
    ↓
ProjectCard, ProjectDetail components
```

### 3. What's Already Configured

| Project | githubRepo Field | In Allowlist | GitHub Enrichment |
|---------|------------------|--------------|-------------------|
| Portfolio (project_1) | `sys-dev-portf` | ✅ Yes | ✅ Active |
| YoloV8 (project_2) | `yolov8-webApp-reactVite` | ✅ Yes | ✅ Active |
| POS System (project_3) | `sys-pos-system` | ✅ Yes | ✅ Active |
| Photobooth (project_4) | ❌ None | ✅ Yes | ⚠️ External (static only) |

---

## Frontend Implementation Tasks

### Task 1: Update ProjectCard Component

**File:** `src/features/portfolio/components/project-card.tsx`

**Current State:** Displays static project data  
**Required Changes:** Display GitHub-enriched fields

#### Changes Needed:

1. **Show GitHub Stats Badges**

```tsx
// In ProjectCard, access enriched data from project prop:
interface ProjectCardProps {
  project: ProjectItem // This now has enriched data
}

// Display stars, forks, last updated from project.highlights
// Example highlights after enrichment:
// [
//   "GitHub stars: 42",
//   "Forks: 5", 
//   "Last updated: Jan 15, 2024",
//   "Original feature 1",
//   "Original feature 2"
// ]
```

2. **Show Merged Tech Stack**

```tsx
// project.techStack now includes:
// - Original tech from portfolio-content.ts
// - GitHub primary language (e.g., "TypeScript")
// - GitHub topics (first 4 only)

// Display as badges or list
```

3. **Update Live URL Priority**

```tsx
// project.liveUrl priority:
// 1. From portfolio-content.ts (if set)
// 2. From GitHub repo homepage (if set)
// 3. "Coming soon" or hide button

// Ensure "Live preview" button uses project.liveUrl
```

### Task 2: Update Project Detail Page

**File:** `src/app/projects/[slug]/page.tsx`

**Required Changes:**

1. **Display GitHub Stats Section**

```tsx
// Add section showing:
// - ⭐ Stars: {extract from highlights}
// - 🍴 Forks: {extract from highlights}  
// - 📅 Last updated: {extract from highlights}
// - 🔗 GitHub repo link (project.repoUrl)
```

2. **Show GitHub Topics**

```tsx
// Display project.techStack with visual distinction:
// - Original tech: solid badges
// - GitHub language: outlined badge
// - GitHub topics: smaller/chip style badges
```

### Task 3: Update Projects List Page

**File:** `src/app/projects/page.tsx`

**Current:** Uses `getPortfolioData()` which calls `mergeProjectsWithGithub()`  
**Status:** ✅ Already receiving enriched data

**Verify:**
```tsx
// Check that projects have highlights array with GitHub stats
console.log(projects[0].highlights)
// Should see: ["GitHub stars: X", "Forks: Y", "Last updated: ..."]
```

### Task 4: Add Loading States

**For Server Components:**
```tsx
// Add loading.tsx for projects page
export default function Loading() {
  return <ProjectCardSkeleton count={4} />
}
```

**For GitHub Stats Display:**
```tsx
// If no highlights (repo not public yet), show:
<span className="text-muted-foreground">Stats unavailable</span>
```

### Task 5: Handle Error States

```tsx
// If project.highlights doesn't include GitHub stats:
const hasGithubStats = project.highlights?.some(h => 
  h.includes('GitHub stars')
)

if (!hasGithubStats) {
  // Show static content or "Make repo public to see stats"
}
```

---

## Data Schema Reference

### ProjectItem (Enriched)

```typescript
interface ProjectItem {
  slug: string
  title: string
  summary: string           // ← May be updated from GitHub description
  description: string
  techStack: string[]       // ← Merged: original + GitHub lang + topics
  repoUrl: string          // ← Updated from GitHub
  liveUrl?: string         // ← May be updated from GitHub homepage
  githubRepo?: string      // ← Field that triggers enrichment
  highlights: string[]     // ← NEW: ["GitHub stars: X", "Forks: Y", ...]
  featured: boolean
  // ... other fields
}
```

### How to Access GitHub Data

```typescript
// Method 1: From highlights array (recommended)
const githubStats = {
  stars: project.highlights.find(h => h.includes('stars'))?.match(/\d+/)?.[0],
  forks: project.highlights.find(h => h.includes('Forks'))?.match(/\d+/)?.[0],
  updated: project.highlights.find(h => h.includes('Last updated'))?.replace('Last updated: ', ''),
}

// Method 2: Parse from techStack (GitHub language is included)
const githubLanguage = project.techStack.find(t => 
  // This is the primary language from GitHub
  // You'll need to compare against known languages
  ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust'].includes(t)
)
```

---

## Testing Checklist for Frontend

### Visual Testing

- [ ] Project cards show ⭐ stars count
- [ ] Project cards show 🍴 forks count  
- [ ] Project cards show 📅 last updated date
- [ ] Tech stack includes GitHub language + topics
- [ ] "Live preview" button uses correct URL
- [ ] "View on GitHub" button links to correct repo
- [ ] Photobooth project links to ryMGDLT/photobotth (external)

### Responsive Testing

- [ ] GitHub stats display correctly on mobile
- [ ] Stats don't overflow on small screens
- [ ] Badges wrap properly

### Data Testing

```bash
# Run these checks:
1. Visit /projects - verify all 4 projects show stats
2. Click each project - verify detail page has GitHub section
3. Check photobooth - should link to ryMGDLT, not your account
4. Verify POS system shows stars/forks (sys-pos-system repo)
```

---

## Common Issues & Solutions

### Issue 1: No GitHub Stats Showing

**Cause:** Repos not public yet  
**Solution:** 
1. Check `src/features/portfolio/data/portfolio-content.ts`
2. Verify repos are in `repoAllowlist`
3. Make repos public (see `REPO_PUBLIC_SETUP.md`)

### Issue 2: Wrong Repo Linked

**Cause:** `githubRepo` field mismatch  
**Solution:**
```typescript
// Ensure project.githubRepo matches GitHub repo name:
// ❌ githubRepo: "sys-pos-system-wrong"
// ✅ githubRepo: "sys-pos-system"
```

### Issue 3: External Repo (Photobooth) Shows Wrong Stats

**Cause:** Trying to fetch external repo data  
**Solution:** ✅ Already handled - photobooth has NO `githubRepo` field, so it gets static data only

---

## Environment Variables

Ensure `.env.local` has:
```bash
GITHUB_TOKEN=github_pat_11...your_token_here
```

Without token:
- API rate limit: 60 requests/hour
- May fail in development with frequent refreshes

With token:
- API rate limit: 5,000 requests/hour
- Required for production deployment

---

## Files You Need to Modify

| File | Changes |
|------|---------|
| `src/features/portfolio/components/project-card.tsx` | Add GitHub stats display |
| `src/app/projects/[slug]/page.tsx` | Add GitHub section in detail view |
| `src/app/projects/page.tsx` | Verify data flow (already receiving enriched data) |
| `src/app/projects/loading.tsx` | Add loading skeleton (optional) |

---

## Questions?

If you encounter issues:
1. Check browser console for errors
2. Verify `project.highlights` array exists and has content
3. Run `npm test` to verify backend tests pass
4. Review `src/lib/github.ts` for data structure reference

---

## Backend QA Test Results

```
Test Suites: 2 passed, 2 total
Tests:       28 passed, 28 total
Coverage:    97.95% statements, 92.85% branches

All GitHub API functions tested and working ✅
```

---

**Status:** Backend complete, ready for frontend wiring 🎉

**Next Step:** Implement UI changes in `cascade/frontend-worktree` and merge to `feat/app-development`
