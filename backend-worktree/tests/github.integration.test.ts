/**
 * GitHub API Integration Tests
 *
 * These tests verify the actual API behavior with mock responses.
 * They test the full data flow from fetching to merging.
 */

import {
  getGithubProfile,
  getGithubRepos,
  mergeProjectsWithGithub,
} from "@/lib/github";
import type {
  GithubProjectRepo,
  ProjectItem,
} from "@/features/portfolio/types/portfolio";

// Integration-style tests with more realistic scenarios
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("GitHub API Integration - End-to-End", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.clearAllMocks();
  });

  describe("Portfolio Data Flow", () => {
    it("should complete full portfolio data enrichment flow", async () => {
      // Mock GitHub profile
      const mockProfile = {
        login: "JshMarkCastillo-GHdev",
        name: "Joshua Mark Castillo",
        bio: "Full Stack Developer",
        avatar_url: "https://avatars.githubusercontent.com/u/123456",
        followers: 50,
        public_repos: 10,
        company: null,
        location: "Philippines",
        blog: null,
      };

      // Mock repos including ones from allowlist
      const mockRepos = [
        {
          id: 1,
          name: "sys-dev-portf",
          description: "Developer portfolio built with Next.js",
          html_url: "https://github.com/JshMarkCastillo-GHdev/sys-dev-portf",
          homepage: "https://joshua-fs-dev.vercel.app/",
          stargazers_count: 5,
          forks_count: 2,
          updated_at: "2024-01-20T00:00:00Z",
          topics: ["nextjs", "react", "typescript"],
          language: "TypeScript",
          archived: false,
          fork: false,
        },
        {
          id: 2,
          name: "sys-pos-system",
          description: "Point-of-sale system with Next.js",
          html_url: "https://github.com/JshMarkCastillo-GHdev/sys-pos-system",
          homepage: null,
          stargazers_count: 3,
          forks_count: 1,
          updated_at: "2024-01-18T00:00:00Z",
          topics: ["nextjs", "prisma"],
          language: "TypeScript",
          archived: false,
          fork: false,
        },
        {
          id: 3,
          name: "some-other-repo",
          description: "Not in allowlist",
          html_url: "https://github.com/JshMarkCastillo-GHdev/some-other-repo",
          homepage: null,
          stargazers_count: 100,
          forks_count: 50,
          updated_at: "2024-01-25T00:00:00Z",
          topics: [],
          language: "Python",
          archived: false,
          fork: false,
        },
      ];

      // Mock fetch responses
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockProfile,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRepos,
        });

      // Allowlist with full URLs (the key scenario we fixed)
      const allowlist = [
        "https://github.com/JshMarkCastillo-GHdev/sys-dev-portf",
        "https://github.com/JshMarkCastillo-GHdev/sys-pos-system",
      ];

      // Fetch profile
      const profile = await getGithubProfile("JshMarkCastillo-GHdev");
      expect(profile).not.toBeNull();
      expect(profile?.username).toBe("JshMarkCastillo-GHdev");

      // Fetch repos (this tests URL parsing fix)
      const repos = await getGithubRepos("JshMarkCastillo-GHdev", allowlist);

      // Should only return repos in allowlist (2, not 3)
      expect(repos).toHaveLength(2);
      expect(repos.map((r) => r.name)).toContain("sys-dev-portf");
      expect(repos.map((r) => r.name)).toContain("sys-pos-system");
      expect(repos.map((r) => r.name)).not.toContain("some-other-repo");

      // Test merging with projects
      const projects: ProjectItem[] = [
        {
          slug: "project_1",
          title: "Portfolio",
          summary: "Original summary",
          description: "Portfolio description",
          techStack: ["Next.js", "React"],
          screenshotPlaceholder: { label: "Test", caption: "Test" },
          imageHint: "Test",
          featured: true,
          githubRepo: "sys-dev-portf",
          highlights: ["Feature 1"],
        },
        {
          slug: "project_3",
          title: "POS System",
          summary: "POS summary",
          description: "POS description",
          techStack: ["Next.js", "Prisma"],
          screenshotPlaceholder: { label: "Test", caption: "Test" },
          imageHint: "Test",
          featured: false,
          githubRepo: "sys-pos-system",
          highlights: ["Feature 1"],
        },
      ];

      const enriched = mergeProjectsWithGithub(projects, repos);

      // Verify enrichment worked
      expect(enriched[0].summary).toBe(
        "Developer portfolio built with Next.js",
      );
      expect(enriched[0].liveUrl).toBe("https://joshua-fs-dev.vercel.app/");
      expect(enriched[0].highlights[0]).toContain("GitHub stars: 5");

      expect(enriched[1].highlights[0]).toContain("GitHub stars: 3");
    });

    it("should handle external repos (different owner)", async () => {
      // Test photobooth scenario - external owner
      // When fetching JshMarkCastillo-GHdev's repos, GitHub returns only their repos
      // photobotth is under ryMGDLT, so it's NOT in this list
      const mockRepos = [
        {
          id: 1,
          name: "sys-dev-portf",
          description: "Developer portfolio",
          html_url: "https://github.com/JshMarkCastillo-GHdev/sys-dev-portf",
          homepage: "https://joshua-fs-dev.vercel.app/",
          stargazers_count: 5,
          forks_count: 2,
          updated_at: "2024-01-20T00:00:00Z",
          topics: ["nextjs", "react"],
          language: "TypeScript",
          archived: false,
          fork: false,
        },
        // Note: photobotth is NOT here because it belongs to ryMGDLT
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      });

      // Trying to fetch repos from your account, but photobotth is under ryMGDLT
      const repos = await getGithubRepos("JshMarkCastillo-GHdev", [
        "https://github.com/ryMGDLT/photobotth",
      ]);

      // Should return empty because ryMGDLT/photobotth is not in JshMarkCastillo-GHdev's repos
      expect(repos).toEqual([]);
    });

    it("should handle rate limiting gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("API rate limit exceeded"));

      const repos = await getGithubRepos("testuser", []);

      expect(repos).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        "Failed to fetch GitHub repositories",
        expect.any(Error),
      );
    });

    it("should handle network failures", async () => {
      mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

      const profile = await getGithubProfile("testuser");

      expect(profile).toBeNull();
    });
  });

  describe("URL Parsing Edge Cases", () => {
    it("should handle URLs with trailing slashes", async () => {
      const mockRepos = [
        {
          id: 1,
          name: "test-repo",
          description: "Test",
          html_url: "https://github.com/user/test-repo",
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: "2024-01-01T00:00:00Z",
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      });

      // URL with trailing slash
      const repos = await getGithubRepos("user", [
        "https://github.com/user/test-repo/",
      ]);

      expect(repos).toHaveLength(1);
      expect(repos[0].name).toBe("test-repo");
    });

    it("should handle mixed case in URLs and repo names", async () => {
      const mockRepos = [
        {
          id: 1,
          name: "My-Repo",
          description: "Test",
          html_url: "https://github.com/user/My-Repo",
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: "2024-01-01T00:00:00Z",
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      });

      // URL with different casing than returned repo name
      const repos = await getGithubRepos("user", [
        "https://github.com/user/my-repo", // lowercase in URL
      ]);

      expect(repos).toHaveLength(1);
    });

    it("should handle invalid URLs gracefully", async () => {
      const mockRepos = [
        {
          id: 1,
          name: "valid-repo",
          description: "Test",
          html_url: "https://github.com/user/valid-repo",
          homepage: null,
          stargazers_count: 0,
          forks_count: 0,
          updated_at: "2024-01-01T00:00:00Z",
          topics: [],
          language: null,
          archived: false,
          fork: false,
        },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos,
      });

      // Invalid URL + valid repo name
      const repos = await getGithubRepos("user", [
        "not-a-valid-url", // Should be treated as repo name
        "valid-repo",
      ]);

      expect(repos).toHaveLength(1);
      expect(repos[0].name).toBe("valid-repo");
    });
  });

  describe("Data Transformation", () => {
    it("should properly format dates in highlights", () => {
      const projects: ProjectItem[] = [
        {
          slug: "test",
          title: "Test",
          summary: "Test",
          description: "Test",
          techStack: [],
          screenshotPlaceholder: { label: "Test", caption: "Test" },
          imageHint: "Test",
          featured: false,
          githubRepo: "test",
          highlights: [],
        },
      ];

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: "test",
          description: "Test",
          url: "https://github.com/test/test",
          stars: 10,
          forks: 5,
          updatedAt: "2024-01-15T00:00:00Z",
          topics: [],
        },
      ];

      const result = mergeProjectsWithGithub(projects, repos);

      // Date should be formatted as "Jan 15, 2024"
      expect(result[0].highlights[2]).toBe("Last updated: Jan 15, 2024");
    });

    it("should limit highlights to 5 items", () => {
      const projects: ProjectItem[] = [
        {
          slug: "test",
          title: "Test",
          summary: "Test",
          description: "Test",
          techStack: [],
          screenshotPlaceholder: { label: "Test", caption: "Test" },
          imageHint: "Test",
          featured: false,
          githubRepo: "test",
          highlights: ["1", "2", "3", "4", "5", "6", "7"], // 7 items
        },
      ];

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: "test",
          description: "Test",
          url: "https://github.com/test/test",
          stars: 0,
          forks: 0,
          updatedAt: "2024-01-01T00:00:00Z",
          topics: [],
        },
      ];

      const result = mergeProjectsWithGithub(projects, repos);

      // Should have 5 highlights: stars, forks, date, + 2 original
      expect(result[0].highlights).toHaveLength(5);
    });

    it("should handle repos with many topics", () => {
      const projects: ProjectItem[] = [
        {
          slug: "test",
          title: "Test",
          summary: "Test",
          description: "Test",
          techStack: ["React"],
          screenshotPlaceholder: { label: "Test", caption: "Test" },
          imageHint: "Test",
          featured: false,
          githubRepo: "test",
          highlights: [],
        },
      ];

      const repos: GithubProjectRepo[] = [
        {
          id: 1,
          name: "test",
          description: "Test",
          url: "https://github.com/test/test",
          stars: 0,
          forks: 0,
          updatedAt: "2024-01-01T00:00:00Z",
          topics: ["topic1", "topic2", "topic3", "topic4", "topic5", "topic6"],
          language: "TypeScript",
        },
      ];

      const result = mergeProjectsWithGithub(projects, repos);

      // Should only take first 4 topics
      expect(result[0].techStack).toContain("topic1");
      expect(result[0].techStack).toContain("topic2");
      expect(result[0].techStack).toContain("topic3");
      expect(result[0].techStack).toContain("topic4");
      expect(result[0].techStack).not.toContain("topic5");
    });
  });
});
