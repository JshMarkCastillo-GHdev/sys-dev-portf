import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Frontend QA Testing
 * Tests: UI Uniformity, Mobile Compatibility, Cross-Browser
 * Scope: ProjectCard component and Projects page
 */
export default defineConfig({
  testDir: '.',
  testMatch: '*.spec.ts',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI for stability */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: '../test-results/html-report' }],
    ['json', { outputFile: '../test-results/test-results.json' }],
    ['list'],
  ],
  
  /* Shared settings for all projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video recording for debugging */
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers and viewports */
  projects: [
    // Desktop - Chrome
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    // Desktop - Firefox
    {
      name: 'Desktop Firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    // Desktop - Safari
    {
      name: 'Desktop Safari',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    // Mobile - iPhone 14 Pro Max
    {
      name: 'Mobile iPhone 14 Pro Max',
      use: { 
        ...devices['iPhone 14 Pro Max'],
      },
    },
    
    // Mobile - iPhone SE
    {
      name: 'Mobile iPhone SE',
      use: { 
        ...devices['iPhone SE'],
      },
    },
    
    // Mobile - Pixel 7
    {
      name: 'Mobile Pixel 7',
      use: { 
        ...devices['Pixel 7'],
      },
    },
    
    // Tablet - iPad Pro
    {
      name: 'Tablet iPad Pro',
      use: { 
        ...devices['iPad Pro'],
      },
    },
    
    // Responsive - Small Mobile
    {
      name: 'Mobile Small (375x667)',
      use: {
        viewport: { width: 375, height: 667 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
      },
    },
    
    // Responsive - Large Desktop
    {
      name: 'Desktop Large (2560x1440)',
      use: {
        viewport: { width: 2560, height: 1440 },
      },
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
