import "server-only"



import type {

  GithubProfile,

  GithubProjectRepo,

  ProjectItem,

} from "@/features/portfolio/types/portfolio"



type GithubProfileResponse = {

  avatar_url: string

  bio: string | null

  blog: string | null

  company: string | null

  followers: number

  location: string | null

  login: string

  name: string | null

  public_repos: number

}



type GithubRepoResponse = {

  id: number

  name: string

  description: string | null

  html_url: string

  homepage: string | null

  stargazers_count: number

  forks_count: number

  updated_at: string

  topics?: string[]

  language: string | null

  archived: boolean

  fork: boolean

}



function getGithubHeaders(): HeadersInit {

  const headers: HeadersInit = {

    Accept: "application/vnd.github+json",

    "User-Agent": "sys-dev-portf",

  }



  const token = process.env.GITHUB_TOKEN?.trim()



  if (token) {

    headers.Authorization = `Bearer ${token}`

  }



  return headers

}



async function fetchGithubJson<T>(url: string): Promise<T> {

  const response = await fetch(url, {

    headers: getGithubHeaders(),

    next: { revalidate: 3600 },

  })



  if (!response.ok) {

    throw new Error(`GitHub request failed with status ${response.status}`)

  }



  return (await response.json()) as T

}



export async function getGithubProfile(

  username: string

): Promise<GithubProfile | null> {

  if (!username) {

    return null

  }



  try {

    const profile = await fetchGithubJson<GithubProfileResponse>(

      `https://api.github.com/users/${username}`

    )



    return {

      username: profile.login,

      displayName: profile.name || profile.login,

      bio: profile.bio || "GitHub profile connected for live repository data.",

      avatarUrl: profile.avatar_url,

      followers: profile.followers,

      publicRepos: profile.public_repos,

      company: profile.company || undefined,

      location: profile.location || undefined,

      blog: profile.blog || undefined,

    }

  } catch (error) {

    console.error("Failed to fetch GitHub profile", error)

    return null

  }

}



export async function getGithubRepos(

  username: string,

  allowlist: string[]

): Promise<GithubProjectRepo[]> {

  if (!username) {

    return []

  }



  try {

    const repos = await fetchGithubJson<GithubRepoResponse[]>(

      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`

    )



    // Extract repo names from allowlist (handles both full URLs and plain repo names)

    const allowed = new Set(

      allowlist.map((entry) => {

        const trimmed = entry.trim().toLowerCase()

        // If it's a URL, extract the repo name from the last path segment

        if (trimmed.startsWith("http")) {

          try {

            const url = new URL(trimmed)

            const segments = url.pathname.split("/").filter(Boolean)

            return segments[segments.length - 1] || trimmed

          } catch {

            return trimmed

          }

        }

        return trimmed

      })

    )



    return repos

      .filter((repo) => !repo.archived && !repo.fork)

      .filter((repo) => allowed.size === 0 || allowed.has(repo.name.toLowerCase()))

      .map((repo) => ({

        id: repo.id,

        name: repo.name,

        description: repo.description || "No repository description provided.",

        url: repo.html_url,

        homepage: repo.homepage || undefined,

        stars: repo.stargazers_count,

        forks: repo.forks_count,

        updatedAt: repo.updated_at,

        topics: repo.topics || [],

        language: repo.language || undefined,

      }))

      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))

  } catch (error) {

    console.error("Failed to fetch GitHub repositories", error)

    return []

  }

}



export function mergeProjectsWithGithub(

  projects: ProjectItem[],

  repos: GithubProjectRepo[]

): ProjectItem[] {

  const repoMap = new Map(

    repos.map((repo) => [repo.name.toLowerCase(), repo])

  )



  return projects.map((project) => {

    const matchedRepo = project.githubRepo

      ? repoMap.get(project.githubRepo.toLowerCase())

      : undefined



    if (!matchedRepo) {

      return project

    }



    const repoTopics = matchedRepo.topics.slice(0, 4)

    const mergedStack = Array.from(

      new Set([

        ...project.techStack,

        ...(matchedRepo.language ? [matchedRepo.language] : []),

        ...repoTopics,

      ])

    )



    return {

      ...project,

      summary: matchedRepo.description || project.summary,

      repoUrl: matchedRepo.url,

      liveUrl: project.liveUrl || matchedRepo.homepage,

      techStack: mergedStack,

      highlights: [

        `GitHub stars: ${matchedRepo.stars}`,

        `Forks: ${matchedRepo.forks}`,

        `Last updated: ${new Date(matchedRepo.updatedAt).toLocaleDateString("en-US", {

          month: "short",

          day: "numeric",

          year: "numeric",

        })}`,

        ...project.highlights,

      ].slice(0, 5),

    }

  })

}

