/**
 * GitHub API Integration Tests
 * 
 * These tests verify:
 * - URL parsing from allowlist (handles full URLs vs repo names)
 * - GitHub profile fetching
 * - GitHub repo fetching with filtering
 * - Project merging with GitHub data
 */

import {
  getGithubProfile,
  getGithubRepos,
  mergeProjectsWithGithub,
} from '@/lib/github'
import type { GithubProjectRepo, ProjectItem } from '@/features/portfolio/types/portfolio'

// Mock the global fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('GitHub API Integration', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    jest.clearAllMocks()
  })

  describe('getGithubProfile', () => {
    it('should return null for empty username', async () => {
      const result = await getGithubProfile('')
      expect(result).toBeNull()
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should fetch and transform GitHub profile correctly', async () => {
      const mockProfile = {
        login: 'testuser',
        name: 'Test User',
        bio: 'A test bio',
        avatar_url: 'https://example.com/avatar.jpg',
        followers: 100,
        public_repos: 25,
        company: 'TestCo',
        location: 'Test City',
        blog: 'https://testuser.com',
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfile,
      })

      const result = await getGithubProfile('testuser')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/testuser',
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: 'application/vnd.github+json',
            'User-Agent': 'sys-dev-portf',
          }),
        })
      )

      expect(result).toEqual({
        username: 'testuser',
        displayName: 'Test User',
        bio: 'A test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        followers: 100,
        publicRepos: 25,
        company: 'TestCo',
        location: 'Test City',
        blog: 'https://testuser.com',
      })
    })

    it('should use login as displayName when name is null', async () => {
      const mockProfile = {
        login: 'testuser',
        name: null,
        bio: null,
        avatar_url: 'https://example.com/avatar.jpg',
        followers: 0,
        public_repos: 0,
        company: null,
        location: null,
        blog: null,
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfile,
      })

      const result = await getGithubProfile('testuser')

      expect(result?.displayName).toBe('testuser')
      expect(result?.bio).toBe('GitHub profile connected for live repository data.')
    })

    it('should return null on fetch error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getGithubProfile('testuser')

      expect(result).toBeNull()
      expect(console.error).toHaveBeenCalled()
    })

    it('should return null on HTTP error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      const result = await getGithubProfile('nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('getGithubRepos', () => {
    it('should return empty array for empty username', async () => {
      const result = await getGithubRepos('', [])
      expect(result).toEqual([])
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should extract repo names from full URLs in allowlist', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          description: 'Test repo 1',
          html_url: 'https://github.com/test/repo1',
          homepage: 'https://repo1.com',
          stargazers_count: 10,
          forks_count: 5,
          updated_at: '2024-01-15T00:00:00Z',
          topics: ['typescript', 'react'],
          language: 'TypeScript',
          archived: false,
          fork: false,
        },
        {
          id: 2,
          name: 'repo2',
          description: 'Test repo 2',
          html_url: 'https://github.com/test/repo2',
          homepage: null,
          stargazers_count: 20,
          forks_count: 10,
          updated_at: '2024-01-10T00:00:00Z',
          topics: [],
          language: 'JavaScript',
          archived: false,
          fork: false,
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      // Allowlist with full URLs - the key fix we're testing
      const allowlist = [
        'https://github.com/test/repo1',
        'https://github.com/test/repo2',
      ]

      const result = await getGithubRepos('test', allowlist)

      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('repo1')
      expect(result[1].name).toBe('repo2')
    })

    it('should handle plain repo names in allowlist', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'my-repo',
          description: null,
          html_url: 'https://github.com/test/my-repo',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-01T00:00:00Z',
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      // Allowlist with plain repo names
      const result = await getGithubRepos('test', ['my-repo'])

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('my-repo')
    })

    it('should filter out archived and forked repos', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'active',
          description: 'Active repo',
          html_url: 'https://github.com/test/active',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-01T00:00:00Z',
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
        {
          id: 2,
          name: 'archived',
          description: 'Archived repo',
          html_url: 'https://github.com/test/archived',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-01T00:00:00Z',
          topics: [],
          language: null,
          archived: true,
          fork: false,
        },
        {
          id: 3,
          name: 'forked',
          description: 'Forked repo',
          html_url: 'https://github.com/test/forked',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-01T00:00:00Z',
          topics: [],
          language: null,
          archived: false,
          fork: true,
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      const result = await getGithubRepos('test', ['active', 'archived', 'forked'])

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('active')
    })

    it('should return empty allowlist means allow all', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'repo1',
          description: 'Repo 1',
          html_url: 'https://github.com/test/repo1',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-01T00:00:00Z',
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      const result = await getGithubRepos('test', [])

      expect(result).toHaveLength(1)
    })

    it('should sort repos by updated date descending', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'older',
          description: 'Older',
          html_url: 'https://github.com/test/older',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-01T00:00:00Z',
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
        {
          id: 2,
          name: 'newer',
          description: 'Newer',
          html_url: 'https://github.com/test/newer',
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2024-01-15T00:00:00Z',
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      })

      const result = await getGithubRepos('test', ['older', 'newer'])

      expect(result[0].name).toBe('newer')
      expect(result[1].name).toBe('older')
    })

    it('should return empty array on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API error'))

      const result = await getGithubRepos('test', [])

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('mergeProjectsWithGithub', () => {
    it('should return original project when no matching repo', () => {
      const projects: ProjectItem[] = [
        {
          slug: 'test-project',
          title: 'Test Project',
          summary: 'A test project',
          description: 'Description',
          techStack: ['React', 'TypeScript'],
          screenshotPlaceholder: { label: 'Test', caption: 'Test caption' },
          imageHint: 'Test hint',
          featured: true,
          highlights: ['Feature 1', 'Feature 2'],
        },
      ]

      const repos: GithubProjectRepo[] = []

      const result = mergeProjectsWithGithub(projects, repos)

      expect(result[0]).toEqual(projects[0])
    })

    it('should merge GitHub data when repo matches', () => {
      const projects: ProjectItem[] = [
        {
          slug: 'my-project',
          title: 'My Project',
          summary: 'Original summary',
          description: 'Description',
          techStack: ['React'],
          screenshotPlaceholder: { label: 'Test', caption: 'Test caption' },
          imageHint: 'Test hint',
          featured: true,
          githubRepo: 'my-project',
          highlights: ['Original highlight'],
        },
      ]

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: 'my-project',
          description: 'GitHub description',
          url: 'https://github.com/test/my-project',
          homepage: 'https://my-project.com',
          stars: 50,
          forks: 20,
          updatedAt: '2024-01-15T00:00:00Z',
          topics: ['typescript', 'nextjs'],
          language: 'TypeScript',
        },
      ]

      const result = mergeProjectsWithGithub(projects, repos)

      expect(result[0].summary).toBe('GitHub description')
      expect(result[0].repoUrl).toBe('https://github.com/test/my-project')
      expect(result[0].liveUrl).toBe('https://my-project.com')
      expect(result[0].techStack).toContain('TypeScript')
      expect(result[0].techStack).toContain('typescript')
      expect(result[0].techStack).toContain('nextjs')
      expect(result[0].highlights[0]).toContain('GitHub stars: 50')
      expect(result[0].highlights[1]).toContain('Forks: 20')
    })

    it('should merge unique topics only', () => {
      const projects: ProjectItem[] = [
        {
          slug: 'test',
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: ['TypeScript', 'React'], // TypeScript already in techStack
          screenshotPlaceholder: { label: 'Test', caption: 'Test caption' },
          imageHint: 'Test hint',
          featured: false,
          githubRepo: 'test',
          highlights: [],
        },
      ]

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: 'test',
          description: 'Test',
          url: 'https://github.com/test/test',
          stars: 0,
          forks: 0,
          updatedAt: '2024-01-01T00:00:00Z',
          topics: ['react'], // react lowercase, React in techStack
          language: 'TypeScript',
        },
      ]

      const result = mergeProjectsWithGithub(projects, repos)

      // Should not duplicate TypeScript or React (case insensitive Set)
      const typescriptCount = result[0].techStack.filter(t => 
        t.toLowerCase() === 'typescript'
      ).length
      expect(typescriptCount).toBe(1)
    })

    it('should handle case-insensitive repo matching', () => {
      const projects: ProjectItem[] = [
        {
          slug: 'test',
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          screenshotPlaceholder: { label: 'Test', caption: 'Test caption' },
          imageHint: 'Test hint',
          featured: false,
          githubRepo: 'My-Project', // uppercase
          highlights: [],
        },
      ]

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: 'my-project', // lowercase
          description: 'Test',
          url: 'https://github.com/test/my-project',
          stars: 10,
          forks: 5,
          updatedAt: '2024-01-01T00:00:00Z',
          topics: [],
        },
      ]

      const result = mergeProjectsWithGithub(projects, repos)

      expect(result[0].highlights[0]).toContain('GitHub stars: 10')
    })

    it('should use original summary if repo has no description', () => {
      const projects: ProjectItem[] = [
        {
          slug: 'test',
          title: 'Test',
          summary: 'Original summary',
          description: 'Test',
          techStack: [],
          screenshotPlaceholder: { label: 'Test', caption: 'Test caption' },
          imageHint: 'Test hint',
          featured: false,
          githubRepo: 'test',
          highlights: [],
        },
      ]

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: 'test',
          description: '', // Empty description
          url: 'https://github.com/test/test',
          stars: 0,
          forks: 0,
          updatedAt: '2024-01-01T00:00:00Z',
          topics: [],
        },
      ]

      const result = mergeProjectsWithGithub(projects, repos)

      expect(result[0].summary).toBe('Original summary')
    })

    it('should keep original liveUrl if repo has no homepage', () => {
      const projects: ProjectItem[] = [
        {
          slug: 'test',
          title: 'Test',
          summary: 'Test',
          description: 'Test',
          techStack: [],
          screenshotPlaceholder: { label: 'Test', caption: 'Test caption' },
          imageHint: 'Test hint',
          featured: false,
          githubRepo: 'test',
          liveUrl: 'https://original-url.com',
          highlights: [],
        },
      ]

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: 'test',
          description: 'Test',
          url: 'https://github.com/test/test',
          homepage: undefined, // No homepage
          stars: 0,
          forks: 0,
          updatedAt: '2024-01-01T00:00:00Z',
          topics: [],
        },
      ]

      const result = mergeProjectsWithGithub(projects, repos)

      expect(result[0].liveUrl).toBe('https://original-url.com')
    })
  })
})
