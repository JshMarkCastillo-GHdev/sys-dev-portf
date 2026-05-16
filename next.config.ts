import type { NextConfig } from "next"

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
]

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.225"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/projects/portfolio-command-center",
        destination: "/projects/project_1",
        permanent: true,
      },
      {
        source: "/projects/case-study-library",
        destination: "/projects/project_2",
        permanent: true,
      },
      {
        source: "/projects/team-ops-dashboard",
        destination: "/projects/project_3",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
