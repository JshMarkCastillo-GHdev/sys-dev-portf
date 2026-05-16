# Frontend QA Test Suite - ProjectCard Components

**QA Engineer:** Senior Front End QA Engineer  
**Worktree:** `cascade/frontend-worktree`  
**Test Location:** `frontend-worktree/tests/playwright/`

## Overview

This Playwright test suite validates the UI uniformity, mobile compatibility, and cross-browser functionality of the ProjectCard components, including the newly added **project_4 (Photobooth Application)**.

## Test Coverage

### 1. UI Uniformity Tests (`project-card-uniformity.spec.ts`)
**Scope:** Frontend Only

Validates that all project cards (project_1 through project_4) render with consistent:
- Card dimensions and structure
- Typography and styling
- Tech stack badge rendering
- Image placeholder handling
- Button positioning
- Description expansion behavior
- Hover effects
- Content completeness

**Key Test Cases:**
- ✅ All 4 project cards render with uniform dimensions
- ✅ Project_4 (Photobooth) matches the structure of other cards
- ✅ Featured badges appear correctly (project_1, project_2 featured; project_3, project_4 not featured)
- ✅ Tech stack badges (6 items for Photobooth) render with consistent styling
- ✅ Description truncation/expansion works uniformly
- ✅ Action buttons are properly positioned

### 2. Mobile Compatibility Tests (`mobile-compatibility.spec.ts`)
**Scope:** Frontend Only

Validates responsive behavior across mobile viewports:
- iPhone SE (375x667)
- iPhone 14 Pro Max (430x932)
- Pixel 7 (412x915)
- iPad Pro (1024x1366)
- Custom small mobile (375x667)

**Key Test Cases:**
- ✅ Cards stack vertically on mobile (single column)
- ✅ Project_4 card fits within mobile viewport without overflow
- ✅ Text remains readable (minimum 14px font size)
- ✅ Tech badges wrap properly without horizontal overflow
- ✅ Action buttons stack vertically and are full-width
- ✅ Touch targets meet WCAG 2.1 standards (44x44px minimum)
- ✅ No horizontal scroll required
- ✅ Show more/less toggle works on touch

### 3. Cross-Browser Compatibility Tests (`cross-browser-compatibility.spec.ts`)
**Scope:** Frontend Only

Validates consistent rendering and functionality across:
- Chromium (Chrome)
- Firefox
- WebKit (Safari)

**Key Test Cases:**
- ✅ Visual styling consistency (border-radius, colors, shadows)
- ✅ CSS transitions work correctly
- ✅ Font rendering consistency
- ✅ Flexbox layout stability
- ✅ Image error handling
- ✅ Click and keyboard interactions
- ✅ Navigation functionality
- ✅ Page load performance (< 5 seconds)
- ✅ No layout shifts (CLS monitoring)

## Test Configuration

### Playwright Config (`playwright.config.ts`)

```typescript
Projects:
- Desktop Chrome (1920x1080)
- Desktop Firefox (1920x1080)
- Desktop Safari (1920x1080)
- Mobile iPhone 14 Pro Max
- Mobile iPhone SE
- Mobile Pixel 7
- Tablet iPad Pro
- Mobile Small (375x667)
- Desktop Large (2560x1440)
```

## Running Tests

### Prerequisites
```bash
# Install Playwright browsers
npx playwright install
```

### Run All Tests
```bash
# From frontend-worktree/tests/playwright/
npx playwright test

# From project root
npx playwright test frontend-worktree/tests/playwright/
```

### Run Specific Test Suite
```bash
# UI Uniformity only
npx playwright test project-card-uniformity.spec.ts

# Mobile only
npx playwright test mobile-compatibility.spec.ts

# Cross-browser only
npx playwright test cross-browser-compatibility.spec.ts
```

### Run Specific Browser
```bash
npx playwright test --project="Desktop Chrome"
npx playwright test --project="Mobile iPhone 14 Pro Max"
```

### Debug Mode
```bash
npx playwright test --debug
```

## Test Results

Results are output to:
- HTML Report: `frontend-worktree/test-results/html-report/`
- JSON Results: `frontend-worktree/test-results/test-results.json`
- Screenshots (on failure): `frontend-worktree/test-results/`
- Videos (on failure): `frontend-worktree/test-results/`

## Test Data Attributes

The tests rely on the following data attributes being present in the ProjectCard component:

```
[data-testid="project-card"]          - Card container
[data-testid="project-title"]         - Project title
[data-testid="project-summary"]       - Project summary
[data-testid="project-description"]   - Project description
[data-testid="project-image-container"] - Image/placeholder container
[data-testid="project-tech-stack"]      - Tech stack section
[data-testid="tech-badge"]            - Individual tech badge
[data-testid="project-actions"]         - Action buttons container
[data-testid="view-project-btn"]       - View Project button
[data-testid="github-btn"]            - GitHub button
[data-testid="show-more-btn"]         - Show more/less toggle
[data-testid="featured-badge"]        - Featured badge (if featured)
```

### Required Component Updates

**Note:** The ProjectCard component (`src/features/portfolio/components/project-card.tsx`) needs data-testid attributes added for full test coverage. The tests include fallbacks but optimal coverage requires:

```tsx
// Add to Card component
<Card data-testid="project-card" ...>

// Add to title
<CardTitle data-testid="project-title" ...>

// Add to summary
<p data-testid="project-summary" ...>

// Add to description section
<p data-testid="project-description" ...>

// Add to image container
<div data-testid="project-image-container" ...>

// Add to tech stack section
<div data-testid="project-tech-stack" ...>
  {project.techStack.map((tech) => (
    <Badge data-testid="tech-badge" key={tech} ...>
  ))}
</div>

// Add to footer
<CardFooter data-testid="project-actions" ...>
  <Button data-testid="view-project-btn" ...>
  <Button data-testid="github-btn" ...>
</CardFooter>

// Add to show more button
<button data-testid="show-more-btn" ...>

// Add to featured badge (if applicable)
<Badge data-testid="featured-badge" ...>
```

## Out of Scope (Requires Other Roles)

### Backend Integration Tests
**Role Required:** Backend QA Engineer

These tests are NOT covered as they require backend coordination:
- GitHub API integration (fetching repo data)
- Dynamic content loading from database
- Form submission handling (contact form)
- Server-side rendering validation
- API endpoint testing

### Security Audit Tests
**Role Required:** Security QA Engineer

Not covered in this frontend-focused suite:
- XSS vulnerability testing
- CSRF protection validation
- Content Security Policy enforcement
- Authentication flow testing
- Authorization boundary testing

### Performance Benchmark Tests
**Role Required:** Performance QA Engineer

Advanced performance testing not covered:
- Lighthouse CI integration
- Core Web Vitals threshold validation
- Bundle size analysis
- Asset optimization validation
- CDN performance testing

### Accessibility Audit Tests
**Role Required:** Accessibility QA Engineer

While basic touch targets are checked, full a11y audit requires:
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation flows
- Color contrast ratio validation (WCAG AA)
- ARIA attribute correctness
- Focus management validation

### Visual Regression Tests
**Role Required:** UI/Visual QA Engineer

Pixel-perfect comparison testing:
- Screenshot comparison baselines
- Component-level visual diffing
- Design system token compliance
- Cross-browser pixel parity

## Known Limitations

1. **Empty Project_4 Folder:** The `public/assets/projects/project_4/` folder exists but is empty. Tests will verify placeholder rendering.

2. **Live URL Placeholder:** Project_4 has a placeholder liveUrl. Tests verify the link structure but not external site loading.

3. **GitHub Rate Limiting:** Tests accessing GitHub API may be rate-limited. Tests include timeouts and fallbacks.

## Test Maintenance

When adding new projects or modifying the ProjectCard component:

1. Update expected project count in uniformity tests
2. Add new project-specific assertions if needed
3. Verify data-testid attributes are preserved
4. Re-run full suite across all browsers
5. Update this README with new test coverage details

## CI/CD Integration

```yaml
# Example GitHub Actions workflow
- name: Run Playwright Tests
  run: |
    npx playwright test frontend-worktree/tests/playwright/
    
- name: Upload Test Results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: frontend-worktree/test-results/
```

## Contact

For questions about test coverage or to request additional test scenarios, contact the **Senior Front End QA Engineer** assigned to the `cascade/frontend-worktree` branch.
