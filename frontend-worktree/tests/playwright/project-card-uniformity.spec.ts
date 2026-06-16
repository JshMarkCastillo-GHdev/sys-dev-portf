import { test, expect } from "@playwright/test";

/**
 * QA Engineer: Senior Front End QA Engineer
 * Test Suite: Project Card UI Uniformity Tests
 *
 * Scope: Verify all project cards (including project_4 - Photobooth)
 * render with consistent styling, layout, and behavior.
 *
 * Tests cover:
 * - Card dimensions uniformity
 * - Typography consistency
 * - Tech stack badge rendering
 * - Image placeholder handling
 * - Button positioning
 * - Description truncation/expansion
 */

test.describe("Project Card UI Uniformity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
    // Wait for page to fully load
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
      timeout: 10000,
    });
  });

  test("all project cards have uniform dimensions and structure", async ({
    page,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    // Expected count: 4 projects (project_1, project_2, project_3, project_4 - Photobooth)
    expect(cards.length).toBe(4);

    // Collect dimensions for uniformity check
    const cardDimensions: { width: number; height: number; index: number }[] =
      [];

    for (let i = 0; i < cards.length; i++) {
      const box = await cards[i].boundingBox();
      if (box) {
        cardDimensions.push({ width: box.width, height: box.height, index: i });
      }
    }

    // All cards should have the same width (within 2px tolerance)
    const widths = cardDimensions.map((d) => d.width);
    const minWidth = Math.min(...widths);
    const maxWidth = Math.max(...widths);

    expect(maxWidth - minWidth).toBeLessThanOrEqual(2);

    // Verify card structure elements are present in each card
    for (const card of cards) {
      // Header elements
      await expect(card.locator('[data-testid="project-title"]')).toBeVisible();
      await expect(
        card.locator('[data-testid="project-summary"]'),
      ).toBeVisible();

      // Content elements
      await expect(
        card.locator('[data-testid="project-image-container"]'),
      ).toBeVisible();
      await expect(
        card.locator('[data-testid="project-description"]'),
      ).toBeVisible();
      await expect(
        card.locator('[data-testid="project-tech-stack"]'),
      ).toBeVisible();

      // Footer elements
      await expect(
        card.locator('[data-testid="project-actions"]'),
      ).toBeVisible();
    }
  });

  test("project_4 Photobooth card matches uniform structure", async ({
    page,
  }) => {
    // Find project_4 specifically by slug or title
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    await expect(photoboothCard).toBeVisible();

    // Verify all structural elements exist
    await expect(
      photoboothCard.locator('[data-testid="project-title"]'),
    ).toContainText("Photobooth Application");
    await expect(
      photoboothCard.locator('[data-testid="project-summary"]'),
    ).toContainText("photobooth");
    await expect(
      photoboothCard.locator('[data-testid="project-description"]'),
    ).toContainText("camera");

    // Verify tech stack badges are rendered
    const techBadges = photoboothCard.locator('[data-testid="tech-badge"]');
    await expect(techBadges).toHaveCount(6); // React, TypeScript, Next.js, Tailwind CSS, shadcn/ui, Camera API

    // Verify action buttons
    const imageLink = photoboothCard.locator(
      '[data-testid="project-image-link"]',
    );
    const githubButton = photoboothCard.locator('[data-testid="github-btn"]');

    await expect(imageLink).toBeVisible();
    await expect(imageLink).toHaveAttribute("role", "link");
    await expect(imageLink).toHaveAttribute("tabindex", "0");
    await expect(githubButton).toBeVisible();
  });

  test("tech stack badges render with consistent styling across all cards", async ({
    page,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      const badges = card.locator('[data-testid="tech-badge"]');
      const badgeCount = await badges.count();

      // Each card should have at least one tech badge
      expect(badgeCount).toBeGreaterThan(0);

      // Check that all badges have consistent styling
      for (let i = 0; i < badgeCount; i++) {
        const badge = badges.nth(i);
        const className = await badge.getAttribute("class");

        // All badges should have outline variant styling
        expect(className).toContain("border");
        expect(className).toContain("rounded");
      }
    }
  });

  test("image containers maintain consistent aspect ratio", async ({
    page,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();
    const aspectRatios: number[] = [];

    for (const card of cards) {
      const imageContainer = card.locator(
        '[data-testid="project-image-container"]',
      );
      const box = await imageContainer.boundingBox();

      if (box && box.height > 0) {
        const ratio = box.width / box.height;
        aspectRatios.push(ratio);
      }
    }

    // All aspect ratios should be similar (within 0.1 tolerance)
    const avgRatio =
      aspectRatios.reduce((a, b) => a + b, 0) / aspectRatios.length;

    for (const ratio of aspectRatios) {
      expect(Math.abs(ratio - avgRatio)).toBeLessThan(0.1);
    }
  });

  test("description expansion works uniformly across all cards", async ({
    page,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      const description = card.locator('[data-testid="project-description"]');
      const showMoreBtn = card.locator('[data-testid="show-more-btn"]');

      // Check if button exists (only for long descriptions)
      const hasShowMore = await showMoreBtn.isVisible().catch(() => false);

      if (hasShowMore) {
        // Get initial height
        const initialHeight = await description
          .boundingBox()
          .then((box) => box?.height || 0);

        // Click to expand
        await showMoreBtn.click();
        await page.waitForTimeout(100); // Allow animation

        // Get expanded height
        const expandedHeight = await description
          .boundingBox()
          .then((box) => box?.height || 0);

        // Expanded should be taller
        expect(expandedHeight).toBeGreaterThan(initialHeight);

        // Click to collapse
        const showLessBtn = card.locator('[data-testid="show-more-btn"]', {
          hasText: /Show less/i,
        });
        await showLessBtn.click();
        await page.waitForTimeout(100);

        // Check collapsed text
        const collapsedHeight = await description
          .boundingBox()
          .then((box) => box?.height || 0);
        expect(collapsedHeight).toBeLessThan(expandedHeight);
      }
    }
  });

  test("featured badge appears only on featured projects consistently", async ({
    page,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      const featuredBadge = card.locator('[data-testid="featured-badge"]');
      const title = await card
        .locator('[data-testid="project-title"]')
        .textContent();

      // Check if this card should be featured based on title
      const isFeaturedProject =
        title?.includes("Portfolio") || title?.includes("YoloV8");
      const hasFeaturedBadge = await featuredBadge
        .isVisible()
        .catch(() => false);

      // Photobooth and POS should NOT have featured badge
      if (title?.includes("Photobooth") || title?.includes("Point-of-Sale")) {
        expect(hasFeaturedBadge).toBe(false);
      } else {
        expect(hasFeaturedBadge).toBe(isFeaturedProject);
      }

      // Featured badge should have consistent styling
      if (hasFeaturedBadge) {
        const className = await featuredBadge.getAttribute("class");
        expect(className).toContain("rounded-full");
      }
    }
  });

  test("card hover effects are consistent across all project cards", async ({
    page,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      // Get initial box shadow
      const initialStyles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          boxShadow: computed.boxShadow,
          transform: computed.transform,
        };
      });

      // Hover over card
      await card.hover();
      await page.waitForTimeout(300); // Wait for transition

      // Get hover styles
      const hoverStyles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          boxShadow: computed.boxShadow,
          transform: computed.transform,
        };
      });

      // Verify hover effect is applied (transform should change)
      expect(hoverStyles.transform).not.toBe(initialStyles.transform);
    }
  });

  test("button positioning is consistent in card footers", async ({ page }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      const footer = card.locator('[data-testid="project-actions"]');
      const buttons = footer.locator("button, a").all();

      // All cards should have at least 1 action button (GitHub)
      expect((await buttons).length).toBeGreaterThanOrEqual(1);

      // Check footer layout
      const footerBox = await footer.boundingBox();
      if (footerBox) {
        // Footer should have consistent height
        expect(footerBox.height).toBeGreaterThan(40);
      }
    }
  });
});

test.describe("Project Card Content Uniformity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
      timeout: 10000,
    });
  });

  test("all project cards have complete data fields", async ({ page }) => {
    const expectedProjects = [
      {
        slug: "project_1",
        title: "Full Stack Developer Portfolio",
        featured: true,
      },
      {
        slug: "project_2",
        title: "YoloV8 App with React/Vite",
        featured: true,
      },
      {
        slug: "project_3",
        title: "Point-of-Sale Generic System",
        featured: false,
      },
      { slug: "project_4", title: "Photobooth Application", featured: false },
    ];

    for (const project of expectedProjects) {
      const card = page.locator('[data-testid="project-card"]', {
        has: page.locator(`text=${project.title}`),
      });

      await expect(card).toBeVisible();

      // Verify all required fields are present
      const title = await card
        .locator('[data-testid="project-title"]')
        .textContent();
      const summary = await card
        .locator('[data-testid="project-summary"]')
        .textContent();
      const description = await card
        .locator('[data-testid="project-description"]')
        .textContent();

      expect(title).toBeTruthy();
      expect(summary).toBeTruthy();
      expect(description).toBeTruthy();
      expect(title?.length).toBeGreaterThan(5);
      expect(summary?.length).toBeGreaterThan(10);
      expect(description?.length).toBeGreaterThan(20);
    }
  });

  test("project_4 Photobooth has correct tech stack", async ({ page }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const expectedTech = [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Camera API",
    ];
    const badges = photoboothCard.locator('[data-testid="tech-badge"]');

    for (const tech of expectedTech) {
      const badge = badges.filter({ hasText: tech });
      await expect(badge).toBeVisible();
    }
  });

  test("repository links are present and clickable", async ({ page }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      const githubBtn = card.locator('[data-testid="github-btn"]');
      await expect(githubBtn).toBeVisible();
      await expect(githubBtn).toBeEnabled();

      // Check link href
      const link = githubBtn.locator("a");
      const href = await link.getAttribute("href");
      expect(href).toContain("github.com");
    }
  });

  test("project image links navigate correctly via click", async ({ page }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const imageLink = photoboothCard.locator(
      '[data-testid="project-image-link"]',
    );

    // Verify it has correct ARIA attributes
    await expect(imageLink).toHaveAttribute("role", "link");
    await expect(imageLink).toHaveAttribute("tabindex", "0");
    await expect(imageLink).toHaveAttribute(
      "aria-label",
      "View Photobooth Application project details",
    );

    // Click and verify navigation
    await imageLink.click();
    await expect(page).toHaveURL("/projects/project_4");
  });

  test("project image links are keyboard accessible", async ({ page }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const imageLink = photoboothCard.locator(
      '[data-testid="project-image-link"]',
    );

    // Focus the image link
    await imageLink.focus();

    // Verify it's focused
    await expect(imageLink).toBeFocused();

    // Press Enter and verify navigation
    await imageLink.press("Enter");
    await expect(page).toHaveURL("/projects/project_4");
  });
});
