# Backend Tests

This directory contains Jest tests for the GitHub API integration and backend utilities.

## Test Structure

```
backend-worktree/tests/
├── setup.ts                      # Jest setup and global mocks
├── github.test.ts                # Unit tests for GitHub API functions
├── github.integration.test.ts    # Integration tests for full data flow
├── coverage/                     # Test coverage reports (generated)
└── README.md                     # This file
```

## Running Tests

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run tests with verbose output
npx jest --verbose
```

## Test Coverage

Tests cover:

### GitHub API Functions (`src/lib/github.ts`)

| Function                    | Coverage                                                 |
| --------------------------- | -------------------------------------------------------- |
| `getGithubProfile()`        | ✅ Username validation, profile fetching, error handling |
| `getGithubRepos()`          | ✅ URL parsing from allowlist, filtering, sorting        |
| `mergeProjectsWithGithub()` | ✅ Data merging, enrichment, edge cases                  |

### Key Test Scenarios

1. **URL Parsing Fix**: Tests that full URLs in allowlist are properly parsed to extract repo names
2. **POS System Enrichment**: Tests that sys-pos-system gets GitHub data enrichment
3. **External Repo Handling**: Tests photobooth scenario (different owner)
4. **Error Handling**: Tests network failures, rate limiting, empty responses
5. **Data Transformation**: Tests date formatting, highlight limits, topic merging

## Mocking

Tests use Jest mocks for:

- `global.fetch` - GitHub API calls
- `console.error` - Suppressed during tests
- `process.env.GITHUB_TOKEN` - Mock token

## Configuration

Jest config: `jest.config.js` (project root)

Key settings:

- Environment: `node`
- Test location: `backend-worktree/tests/`
- Coverage directory: `backend-worktree/tests/coverage/`
- Module mapping: `@/` → `src/`

## Adding New Tests

```typescript
// Example test structure
describe("Feature Name", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it("should do something specific", () => {
    // Arrange
    const input = "test";

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(expected);
  });
});
```

## CI/CD Integration

Tests run automatically in GitHub Actions workflow (`.github/workflows/ci.yml`).

Add to CI:

```yaml
- name: Run Jest Tests
  run: npm test
```
