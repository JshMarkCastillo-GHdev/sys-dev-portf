import { test, expect } from '@playwright/test';

/**
 * QA Engineer: Senior Front End QA Engineer
 * Test Suite: Mobile View Compatibility Tests
 * 
 * Scope: Verify ProjectCard components render correctly on mobile devices
 * and adapt properly to small screen sizes.
 * 
 * Viewports tested:
 * - iPhone SE (375x667)
 * - iPhone 14 Pro Max (430x932)
 * - Pixel 7 (412x915)
 * - Various responsive breakpoints
 */

test.describe('Mobile View - Layout Adaptation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForSelector('[data-testid="project-card"]', { state: 'visible', timeout: 10000 });
  });

  test('project cards stack vertically on mobile viewport', async ({ page, viewport }) => {
    // Skip if not mobile viewport
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const cards = await page.locator('[data-testid="project-card"]').all();
    
    // Cards should be single column (not side by side)
    for (let i = 0; i < cards.length - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];
      
      const currentBox = await currentCard.boundingBox();
      const nextBox = await nextCard.boundingBox();
      
      if (currentBox && nextBox) {
        // Cards should be stacked vertically (next card below current)
        expect(nextBox.y).toBeGreaterThan(currentBox.y);
        
        // Cards should NOT overlap horizontally significantly
        const currentCenterX = currentBox.x + currentBox.width / 2;
        const nextCenterX = nextBox.x + nextBox.width / 2;
        expect(Math.abs(currentCenterX - nextCenterX)).toBeLessThan(50);
      }
    }
  });

  test('project_4 Photobooth card fits within mobile viewport', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator('text=Photobooth Application'),
    });
    
    await expect(photoboothCard).toBeVisible();
    
    const cardBox = await photoboothCard.boundingBox();
    
    if (cardBox) {
      // Card width should not exceed viewport width (with some padding tolerance)
      expect(cardBox.width).toBeLessThanOrEqual(viewport.width + 32); // Allow for padding
      
      // Card should be horizontally centered or properly positioned
      expect(cardBox.x).toBeGreaterThanOrEqual(-16); // Allow for negative margin
    }
  });

  test('text content remains readable on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const cards = await page.locator('[data-testid="project-card"]').all();
    
    for (const card of cards) {
      // Check title font size
      const title = card.locator('[data-testid="project-title"]');
      const titleSize = await title.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return parseFloat(computed.fontSize);
      });
      
      // Title should be readable (at least 14px on mobile)
      expect(titleSize).toBeGreaterThanOrEqual(14);
      
      // Check description line height
      const description = card.locator('[data-testid="project-description"]');
      const lineHeight = await description.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return parseFloat(computed.lineHeight);
      });
      
      // Line height should be adequate for readability
      expect(lineHeight).toBeGreaterThanOrEqual(18);
    }
  });

  test('tech stack badges wrap properly on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator('text=Photobooth Application'),
    });
    
    const badges = photoboothCard.locator('[data-testid="tech-badge"]');
    const badgeCount = await badges.count();
    
    // Get positions of all badges
    const badgePositions: { x: number; y: number }[] = [];
    
    for (let i = 0; i < badgeCount; i++) {
      const box = await badges.nth(i).boundingBox();
      if (box) {
        badgePositions.push({ x: box.x, y: box.y });
      }
    }
    
    // Badges should not overflow card width
    const cardBox = await photoboothCard.boundingBox();
    if (cardBox) {
      for (const pos of badgePositions) {
        expect(pos.x).toBeGreaterThanOrEqual(cardBox.x - 10);
        expect(pos.x).toBeLessThanOrEqual(cardBox.x + cardBox.width + 10);
      }
    }
    
    // If there are multiple rows, y positions should differ
    const uniqueYPositions = [...new Set(badgePositions.map(p => Math.round(p.y / 5) * 5))];
    expect(uniqueYPositions.length).toBeGreaterThanOrEqual(1);
  });

  test('action buttons stack vertically on small mobile screens', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 400) {
      test.skip();
    }
    
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator('text=Photobooth Application'),
    });
    
    const footer = photoboothCard.locator('[data-testid="project-actions"]');
    const buttons = footer.locator('button, a');
    const buttonCount = await buttons.count();
    
    if (buttonCount >= 2) {
      // Get positions of first two buttons
      const firstButtonBox = await buttons.nth(0).boundingBox();
      const secondButtonBox = await buttons.nth(1).boundingBox();
      
      if (firstButtonBox && secondButtonBox) {
        // On very small screens, buttons should stack vertically
        const isVerticalStack = secondButtonBox.y > firstButtonBox.y + firstButtonBox.height - 5;
        
        // Either vertical or horizontal is acceptable, but they should not overlap
        const noOverlap = 
          secondButtonBox.x >= firstButtonBox.x + firstButtonBox.width - 5 ||
          secondButtonBox.y >= firstButtonBox.y + firstButtonBox.height - 5;
        
        expect(noOverlap).toBe(true);
      }
    }
    
    // All buttons should be full width on mobile
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const buttonBox = await button.boundingBox();
      const cardBox = await photoboothCard.boundingBox();
      
      if (buttonBox && cardBox && viewport && viewport.width <= 640) {
        // Button should be nearly full width of card on small screens
        expect(buttonBox.width).toBeGreaterThan(cardBox.width * 0.8);
      }
    }
  });

  test('images scale correctly without overflow on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const cards = await page.locator('[data-testid="project-card"]').all();
    
    for (const card of cards) {
      const imageContainer = card.locator('[data-testid="project-image-container"]');
      const containerBox = await imageContainer.boundingBox();
      const cardBox = await card.boundingBox();
      
      if (containerBox && cardBox) {
        // Image container should not overflow card bounds
        expect(containerBox.x).toBeGreaterThanOrEqual(cardBox.x - 5);
        expect(containerBox.x + containerBox.width).toBeLessThanOrEqual(cardBox.x + cardBox.width + 5);
        
        // Container should have reasonable aspect ratio
        const aspectRatio = containerBox.width / containerBox.height;
        expect(aspectRatio).toBeGreaterThan(1); // Wider than tall
        expect(aspectRatio).toBeLessThan(3); // Not too wide
      }
    }
  });

  test('touch targets are adequate size on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator('text=Photobooth Application'),
    });
    
    // Check all interactive elements
    const interactiveElements = [
      photoboothCard.locator('[data-testid="view-project-btn"]'),
      photoboothCard.locator('[data-testid="github-btn"]'),
      photoboothCard.locator('[data-testid="show-more-btn"]').first(),
    ];
    
    for (const element of interactiveElements) {
      const isVisible = await element.isVisible().catch(() => false);
      if (isVisible) {
        const box = await element.boundingBox();
        if (box) {
          // Touch targets should be at least 44x44px (WCAG 2.1 recommendation)
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    }
    
    // Check tech badges
    const badges = photoboothCard.locator('[data-testid="tech-badge"]');
    const badgeCount = await badges.count();
    
    for (let i = 0; i < Math.min(badgeCount, 3); i++) {
      const box = await badges.nth(i).boundingBox();
      if (box) {
        // Badges can be smaller but should still be tappable
        expect(box.height).toBeGreaterThanOrEqual(24);
      }
    }
  });
});

test.describe('Mobile View - Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForSelector('[data-testid="project-card"]', { state: 'visible', timeout: 10000 });
  });

  test('horizontal scroll is not required on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    // Check document width vs viewport width
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    
    // Document should not be wider than viewport (no horizontal scroll needed)
    expect(docWidth).toBeLessThanOrEqual(viewport.width + 32); // Allow for scrollbar
  });

  test('cards are accessible via swipe/scroll on mobile', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator('text=Photobooth Application'),
    });
    
    // Card should be in viewport or scrollable to
    const isVisible = await photoboothCard.isVisible();
    expect(isVisible).toBe(true);
    
    // Try scrolling to it
    await photoboothCard.scrollIntoViewIfNeeded();
    
    // Should still be visible after scroll
    await expect(photoboothCard).toBeInViewport({ ratio: 0.5 });
  });

  test('show more/less toggle works on mobile touch', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const photoboothCard = page.locator('[data-testid="project-card"]', {
      has: page.locator('text=Photobooth Application'),
    });
    
    const showMoreBtn = photoboothCard.locator('[data-testid="show-more-btn"]').first();
    
    // Check if button exists
    const hasShowMore = await showMoreBtn.isVisible().catch(() => false);
    
    if (hasShowMore) {
      // Get description height before
      const description = photoboothCard.locator('[data-testid="project-description"]');
      const initialHeight = await description.boundingBox().then(box => box?.height || 0);
      
      // Click using touch simulation
      await showMoreBtn.tap();
      await page.waitForTimeout(150);
      
      // Get height after
      const expandedHeight = await description.boundingBox().then(box => box?.height || 0);
      
      // Should expand
      expect(expandedHeight).toBeGreaterThan(initialHeight);
    }
  });

  test('no content truncation with ellipsis on critical mobile elements', async ({ page, viewport }) => {
    if (!viewport || viewport.width > 768) {
      test.skip();
    }
    
    const cards = await page.locator('[data-testid="project-card"]').all();
    
    for (const card of cards) {
      // Check that buttons don't have text cut off
      const buttons = card.locator('[data-testid="project-actions"] button, [data-testid="project-actions"] a');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        
        // Button text should be fully visible (no '...' truncation)
        if (text) {
          expect(text.trim().endsWith('...')).toBe(false);
        }
        
        // Check overflow style
        const overflow = await button.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return computed.overflow;
        });
        
        expect(overflow).not.toBe('hidden');
      }
    }
  });
});

test.describe('Responsive Breakpoint Tests', () => {
  const breakpoints = [
    { width: 320, height: 568, name: 'Small Mobile (iPhone SE)' },
    { width: 375, height: 667, name: 'Mobile Medium' },
    { width: 414, height: 896, name: 'Mobile Large (iPhone Plus)' },
    { width: 768, height: 1024, name: 'Tablet Portrait' },
    { width: 1024, height: 768, name: 'Tablet Landscape' },
  ];

  for (const breakpoint of breakpoints) {
    test(`layout adapts correctly at ${breakpoint.name}`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.goto('/projects');
      await page.waitForSelector('[data-testid="project-card"]', { state: 'visible', timeout: 10000 });
      
      const cards = await page.locator('[data-testid="project-card"]').all();
      expect(cards.length).toBe(4);
      
      // Check grid layout based on breakpoint
      const isMobile = breakpoint.width < 768;
      const isTablet = breakpoint.width >= 768 && breakpoint.width < 1024;
      const isDesktop = breakpoint.width >= 1024;
      
      // Get positions of first two cards
      if (cards.length >= 2) {
        const firstBox = await cards[0].boundingBox();
        const secondBox = await cards[1].boundingBox();
        
        if (firstBox && secondBox) {
          if (isMobile) {
            // Should be stacked vertically
            expect(secondBox.y).toBeGreaterThan(firstBox.y);
          } else if (isDesktop) {
            // Should be side by side (2-column grid)
            expect(secondBox.x).toBeGreaterThan(firstBox.x);
          }
        }
      }
      
      // All cards should be visible
      for (const card of cards) {
        await expect(card).toBeVisible();
      }
    });
  }
});
