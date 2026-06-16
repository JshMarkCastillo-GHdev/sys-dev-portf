# Repository Public Setup Guide

## Goal

Make your repos public so GitHub API can provide live stats (stars, forks, last updated) to your portfolio.

---

## Repos to Make Public

| Priority | Repo       | GitHub URL                                      | Status            |
| -------- | ---------- | ----------------------------------------------- | ----------------- |
| 1        | Portfolio  | `JshMarkCastillo-GHdev/sys-dev-portf`           | ✅ In allowlist   |
| 2        | YoloV8 App | `JshMarkCastillo-GHdev/yolov8-webApp-reactVite` | ✅ In allowlist   |
| 3        | POS System | `JshMarkCastillo-GHdev/sys-pos-system`          | ✅ In allowlist   |
| 4        | Photobooth | `ryMGDLT/photobotth`                            | ⚠️ External owner |

---

## Step-by-Step Instructions

### Step 1: Make Repos Public

For each repo above (1-3):

1. Go to GitHub → Your repo → **Settings** tab
2. Scroll to **"Danger Zone"** (bottom of page)
3. Click **"Change visibility"** → **"Make public"**
4. Type repo name to confirm

---

### Step 2: Add LICENSE File

For each repo, add a license to protect your code:

#### Quick Way (GitHub UI)

1. Go to repo main page
2. Click **"Add file"** → **"Create new file"**
3. Name it `LICENSE`
4. Click **"Choose a license template"** button
5. Select **"MIT License"** (recommended for portfolio work)
6. Click **"Review and submit"**
7. Commit to main branch

#### What MIT License Means

- ✅ Others can view your code
- ✅ Others can fork/study it
- ❌ Others cannot claim they wrote it
- ❌ Others must include your license if they use it
- ✅ You keep full copyright

---

### Step 3: Clean Sensitive Data

Before making public, remove:

```bash
# Files to add to .gitignore (if not already)
.env
.env.local
.env.production
node_modules/
*.log
dist/
build/
.DS_Store
```

#### Check for secrets in code:

```bash
# Search for potential secrets
grep -r "api_key" .
grep -r "password" .
grep -r "secret" .
grep -r "token" .
```

If you find any:

1. Remove from code
2. Move to `.env` file
3. Add `.env` to `.gitignore`
4. Regenerate new keys at the service (so old ones in git history are useless)

---

### Step 4: Update README

Add this to each repo's README.md:

```markdown
## ⚠️ Portfolio Showcase

This repository is a **portfolio project** demonstrating full-stack development skills.

- Code is provided for educational/review purposes
- Not intended for production deployment as-is
- See LICENSE file for usage terms

## Live Demo

[Link to your Vercel deployment]
```

---

## Special Case: Photobooth

**Repo:** `ryMGDLT/photobotth` (external owner)

Since this repo is under a different GitHub account, you have these options:

### Option A: Fork to Your Account (Recommended)

1. Go to `https://github.com/ryMGDLT/photobotth`
2. Click **"Fork"** button (top right)
3. Fork to `JshMarkCastillo-GHdev`
4. Rename to `photobotth-fork` or keep as-is
5. Update portfolio config:
   - `repoUrl: "https://github.com/JshMarkCastillo-GHdev/photobotth"`
   - `githubRepo: "photobotth"`

### Option B: Keep Linking to Original

- No changes needed
- Portfolio will show static data only (no live stars/forks)
- Original repo must be public for the link to work

### Option C: Create Your Own Version

If you contributed significantly, consider creating a new repo with your implementation:

1. Create new repo: `JshMarkCastillo-GHdev/photobooth-app`
2. Push your branch code there
3. Update portfolio config accordingly

---

## Verification Checklist

After making repos public, verify:

- [ ] All 3 repos show **"Public"** badge on GitHub
- [ ] Each repo has a **LICENSE** file
- [ ] Each repo has a **README** with portfolio disclaimer
- [ ] No `.env` files or secrets in repo
- [ ] Portfolio `/projects` page shows GitHub stats (may take 1 hour due to caching)

---

## Expected Result

Once repos are public and cached refreshes (1 hour), your portfolio will show:

```
Point-of-Sale Generic System
⭐ GitHub stars: 3
🍴 Forks: 1
📅 Last updated: Jan 20, 2025
Tech: Next.js, Prisma, PostgreSQL, TypeScript
```

Instead of just static data.

---

## Rollback Plan

If you change your mind:

1. Go to repo Settings → Danger Zone
2. Click "Change visibility" → "Make private"
3. Portfolio gracefully degrades to static data (no errors)
