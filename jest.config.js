/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/backend-worktree/tests"],
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/backend-worktree/tests/**/*.test.ts",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^server-only$": "<rootDir>/backend-worktree/tests/mocks/server-only.ts",
  },
  setupFiles: ["<rootDir>/backend-worktree/tests/setup.ts"],
  collectCoverageFrom: ["src/lib/**/*.ts", "!src/lib/**/__tests__/**"],
  coverageDirectory: "backend-worktree/tests/coverage",
  verbose: true,
};

module.exports = config;
