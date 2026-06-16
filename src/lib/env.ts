function parsePublicSiteUrl(rawValue?: string): string {
  const fallback = "http://localhost:3000";
  const value = rawValue?.trim() || fallback;

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function parseOptionalString(rawValue?: string): string | undefined {
  const value = rawValue?.trim();
  return value ? value : undefined;
}

export const env = {
  publicSiteUrl: parsePublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  publicContactEmail: parseOptionalString(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  ),
  publicResumeUrl: parseOptionalString(process.env.NEXT_PUBLIC_RESUME_URL),
} as const;
