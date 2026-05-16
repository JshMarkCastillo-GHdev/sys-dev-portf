// Jest setup file for backend tests
// This runs before each test file

// Mock environment variables
process.env.GITHUB_TOKEN = 'mock-github-token-for-testing'

// Global test utilities
global.console = {
  ...console,
  // Suppress console.error during tests unless we want to see them
  error: jest.fn(),
  warn: jest.fn(),
}
