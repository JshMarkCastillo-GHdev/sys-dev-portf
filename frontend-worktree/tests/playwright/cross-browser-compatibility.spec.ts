import { test, expect } from "@playwright/test";

/**
 * QA Engineer: Senior Front End QA Engineer
 * Test Suite: Cross-Browser Compatibility Tests
 *
 * Scope: Verify ProjectCard components render consistently across
 * Chrome, Firefox, and Safari browsers.
 *
 * Browsers tested:
 * - Chromium (Chrome)
 * - Firefox
 * - WebKit (Safari)
 */

test.describe("Cross-Browser - Visual Consistency", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
      timeout: 10000,
    });
  });

  test("project cards render with consistent styling across browsers", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    await expect(photoboothCard).toBeVisible();

    // Get computed styles
    const styles = await photoboothCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderRadius: computed.borderRadius,
        backgroundColor: computed.backgroundColor,
        borderColor: computed.borderColor,
        boxShadow: computed.boxShadow,
      };
    });

    // Verify consistent styling regardless of browser
    expect(styles.borderRadius).toBeTruthy();
    expect(styles.backgroundColor).toBeTruthy();
    expect(styles.boxShadow).toBeTruthy();

    // Log browser-specific values for comparison
    console.log(`[${browserName}] Card styles:`, styles);
  });

  test("CSS transitions work consistently across browsers", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    // Get initial transform
    const initialTransform = await photoboothCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return computed.transform;
    });

    // Hover
    await photoboothCard.hover();
    await page.waitForTimeout(350); // Wait for transition

    // Get hover transform
    const hoverTransform = await photoboothCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return computed.transform;
    });

    // Transform should change on hover
    expect(hoverTransform).not.toBe(initialTransform);

    // Move away and check transition back
    await page.mouse.move(0, 0);
    await page.waitForTimeout(350);

    const finalTransform = await photoboothCard.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return computed.transform;
    });

    // Should return to initial state
    expect(finalTransform).toBe(initialTransform);

    console.log(
      `[${browserName}] Transform transition: ${initialTransform} -> ${hoverTransform} -> ${finalTransform}`,
    );
  });

  test("fonts render correctly across browsers", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const title = photoboothCard.locator('[data-testid="project-title"]');

    // Get font properties
    const fontStyles = await title.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        lineHeight: computed.lineHeight,
      };
    });

    // Verify font is applied
    expect(fontStyles.fontFamily).toBeTruthy();
    expect(fontStyles.fontSize).toMatch(/\d+px/);
    expect(parseInt(fontStyles.fontWeight)).toBeGreaterThanOrEqual(400);

    console.log(`[${browserName}] Title font:`, fontStyles);
  });

  test("flexbox layout is consistent across browsers", async ({
    page,
    browserName,
  }) => {
    const cards = await page.locator('[data-testid="project-card"]').all();

    for (const card of cards) {
      // Check flex properties
      const flexStyles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          flexDirection: computed.flexDirection,
        };
      });

      // Should use flex layout
      expect(flexStyles.display).toContain("flex");
      expect(flexStyles.flexDirection).toBe("column");
    }

    console.log(
      `[${browserName}] Flexbox layout verified on ${cards.length} cards`,
    );
  });

  test("image loading handles errors consistently", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const imageContainer = photoboothCard.locator(
      '[data-testid="project-image-container"]',
    );

    // Check if image or placeholder is shown
    const hasImage = await imageContainer
      .locator("img")
      .isVisible()
      .catch(() => false);
    const hasPlaceholder = await imageContainer
      .locator("text=Replace with real info")
      .isVisible()
      .catch(() => false);

    // One of them should be visible
    expect(hasImage || hasPlaceholder).toBe(true);

    if (hasPlaceholder) {
      // Verify placeholder styling
      const placeholderStyles = await imageContainer.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          borderStyle: computed.borderStyle,
        };
      });

      expect(placeholderStyles.backgroundColor).toBeTruthy();
      console.log(
        `[${browserName}] Placeholder rendered with:`,
        placeholderStyles,
      );
    }
  });

  test("tech badge styling is consistent", async ({ page, browserName }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const badges = photoboothCard.locator('[data-testid="tech-badge"]');
    const firstBadge = badges.first();

    const badgeStyles = await firstBadge.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        borderWidth: computed.borderWidth,
        borderRadius: computed.borderRadius,
        padding: computed.padding,
        fontSize: computed.fontSize,
      };
    });

    // Verify badge styling
    expect(badgeStyles.borderWidth).toMatch(/\d+px/);
    expect(badgeStyles.borderRadius).toBeTruthy();
    expect(badgeStyles.padding).toBeTruthy();

    console.log(`[${browserName}] Badge styles:`, badgeStyles);
  });
});

test.describe("Cross-Browser - Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
      timeout: 10000,
    });
  });

  test("click interactions work in all browsers", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    // Test project image link click
    const imageLink = photoboothCard.locator(
      '[data-testid="project-image-link"]',
    );
    await expect(imageLink).toBeVisible();
    await expect(imageLink).toHaveAttribute("role", "link");

    // Click should navigate
    await imageLink.click();

    // Should navigate to project detail
    await page.waitForURL(/\/projects\/project_4/, { timeout: 5000 });

    // Verify we're on the correct page
    expect(page.url()).toContain("/projects/project_4");

    console.log(`[${browserName}] Navigation successful to: ${page.url()}`);

    // Go back to projects page
    await page.goto("/projects");
  });

  test("keyboard navigation works in all browsers", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    // Focus on image link
    const imageLink = photoboothCard.locator(
      '[data-testid="project-image-link"]',
    );
    await imageLink.focus();

    // Verify image link is focused
    await expect(imageLink).toBeFocused();

    // Press Enter to navigate
    await imageLink.press("Enter");

    // Should navigate to project detail
    await page.waitForURL(/\/projects\/project_4/, { timeout: 5000 });

    console.log(
      `[${browserName}] Keyboard navigation successful to: ${page.url()}`,
    );
  });

  test("show more/less toggle works in all browsers", async ({
    page,
    browserName,
  }) => {
    await page.goto("/projects");
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
      timeout: 10000,
    });

    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const showMoreBtn = photoboothCard
      .locator('[data-testid="show-more-btn"]')
      .first();

    // Check if button exists
    const hasShowMore = await showMoreBtn.isVisible().catch(() => false);

    if (hasShowMore) {
      const description = photoboothCard.locator(
        '[data-testid="project-description"]',
      );
      const initialHeight = await description
        .boundingBox()
        .then((box) => box?.height || 0);

      // Click to expand
      await showMoreBtn.click();
      await page.waitForTimeout(200);

      const expandedHeight = await description
        .boundingBox()
        .then((box) => box?.height || 0);
      expect(expandedHeight).toBeGreaterThan(initialHeight);

      console.log(
        `[${browserName}] Description expanded: ${initialHeight}px -> ${expandedHeight}px`,
      );
    } else {
      console.log(
        `[${browserName}] No show more button - description may be short`,
      );
    }
  });

  test("link targets open correctly in all browsers", async ({
    page,
    browserName,
  }) => {
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator("text=Photobooth Application"),
    });

    const githubBtn = photoboothCard.locator('[data-testid="github-btn"]');
    const link = githubBtn.locator("a");

    // Get link attributes
    const linkAttrs = await link.evaluate((el) => ({
      href: el.getAttribute("href"),
      target: el.getAttribute("target"),
      rel: el.getAttribute("rel"),
    }));

    expect(linkAttrs.href).toContain("github.com");

    if (linkAttrs.target === "_blank") {
      expect(linkAttrs.rel).toContain("noreferrer");
    }

    console.log(`[${browserName}] Link attributes:`, linkAttrs);
  });
});

test.describe("Cross-Browser - Performance", () => {
  test("page loads within acceptable time across browsers", async ({
    page,
    browserName,
  }) => {
    const startTime = Date.now();

    await page.goto("/projects");
    await page.waitForSelector('[data-testid="project-card"]', {
      state: "visible",
      timeout: 15000,
    });

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);

    console.log(`[${browserName}] Page load time: ${loadTime}ms`);
  });

  test("all project cards render without layout shifts", async ({
    page,
    browserName,
  }) => {
    // Navigate and wait for stable state
    await page.goto("/projects");

    // Get initial card positions
    const initialPositions = await page.evaluate(() => {
      const cards = document.querySelectorAll('[data-testid="project-card"]');
      return Array.from(cards).map((card) => ({
        top: card.getBoundingClientRect().top,
        left: card.getBoundingClientRect().left,
      }));
    });

    // Wait a bit
    await page.waitForTimeout(1000);

    // Get final positions
    const finalPositions = await page.evaluate(() => {
      const cards = document.querySelectorAll('[data-testid="project-card"]');
      return Array.from(cards).map((card) => ({
        top: card.getBoundingClientRect().top,
        left: card.getBoundingClientRect().left,
      }));
    });

    // Positions should be stable (no significant layout shifts)
    for (let i = 0; i < initialPositions.length; i++) {
      const shift = Math.abs(initialPositions[i].top - finalPositions[i].top);
      expect(shift).toBeLessThan(50); // Allow 50px tolerance
    }

    console.log(`[${browserName}] Layout stable - no significant CLS detected`);
  });
});
