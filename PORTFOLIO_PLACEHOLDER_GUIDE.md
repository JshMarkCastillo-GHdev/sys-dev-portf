# Portfolio Placeholder Guide

Primary edit file:
- `src/features/portfolio/data/portfolio-content.ts`

Primary asset directories:
- `public/assets/profile/`
- `public/assets/projects/`
- `public/assets/brand/`
- `public/assets/icons/`
- `public/resume/`

## Site Identity

- `siteConfig.name`
  Current value: `Joshua Mark Castillo`
- `siteConfig.role`
  Current value: `Jr. Full Stack Developer`
- `siteConfig.location`
  Current value: `On-site or Remote - Open to opportunities worldwide`
- `siteConfig.email`
  Current value: `joshuamarkcastillo0319@gmail.com`
- `siteConfig.tagline`
  Current value: `Building scalable web applications for innovation and process automation.`

## Hero / Landing

- `siteConfig.shortBio`
  Current value: `Computer Engineering student with a passion for full stack development, focused on building scalable web applications that drive innovation and process automation.`
- `heroStats[0].value`
  Current value: `Intelligent Automation with secure practices`
- `heroStats[1].value`
  Current value: `Streamlining development processes for efficient project delivery and collaboration`
- `heroStats[2].value`
  Current value: `Modern web development stack with a focus on performance and scalability`

## About

- `siteConfig.longBio`
  Current value: your full long-form biography in `portfolio-content.ts`
- `siteConfig.availability`
  Current value: `Available for full-time opportunities. Open to remote, hybrid, or collaborative work environments.`
- `aboutContent.techJourney`
  Current value: your current tech journey statement
- `aboutContent.softSkills`
  Current values: your current soft-skills list
- `aboutContent.hobbies`
  Current values: your current hobbies list
- `siteConfig.profileImageSrc`
  Current value: `/assets/profile/joshua-mark-castillo-profile.jpg`
- `aboutContent.profilePlaceholder.caption`
  Current value: `Recommended path: /assets/profile/joshua-mark-castillo-profile.jpg (1:1, 1200x1200 preferred)`

## Skills

- `skillGroups`
  Current values: your current frontend, backend, databases, tools, deployment, and agents lists

## Projects

- Each project lives under `featuredProjects`
- Replace text fields directly in `portfolio-content.ts`
- Asset paths now support:
  `coverImageSrc`
  `screenshotImageSrcs`

Current project asset paths:
- `featuredProjects[0].coverImageSrc`
  `/assets/projects/portfolio-command-center/cover.png`
- `featuredProjects[0].screenshotImageSrcs`
  `/assets/projects/portfolio-command-center/screen-01.png`
  `/assets/projects/portfolio-command-center/screen-02.png`
- `featuredProjects[1].coverImageSrc`
  `/assets/projects/case-study-library/cover.png`
- `featuredProjects[1].screenshotImageSrcs`
  `/assets/projects/case-study-library/screen-01.png`
  `/assets/projects/case-study-library/screen-02.png`
- `featuredProjects[2].coverImageSrc`
  `/assets/projects/team-ops-dashboard/cover.png`
- `featuredProjects[2].screenshotImageSrcs`
  `/assets/projects/team-ops-dashboard/screen-01.png`
  `/assets/projects/team-ops-dashboard/screen-02.png`

Recommended screenshot sizes:
- Feature screenshots: `16:10`
- Preferred export: `1600x1000`
- Smaller acceptable export: `1280x800`
- Mobile screenshots: around `9:19.5`
- Mobile export: `1080x2340`

## Experience

- `experienceItems`
  Current values: your current internship and freelance/full stack entries
  Replace these directly if your experience changes

## Education

- `educationItems`
  Current values: your current `Computer Engineering` entry and project/thesis detail

## Contact

- `socialLinks`
  Current values: your GitHub, LinkedIn, and email
- `contactLinks`
  Current values: your GitHub, email, Indeed, and resume cards

## Footer

- Footer branding uses `siteConfig.name`
  Current value: `Joshua Mark Castillo`

## Assets

- Profile photo
  Directory: `public/assets/profile/`
  Recommended file: `joshua-mark-castillo-profile.jpg`
  Recommended ratio: `1:1`
  Minimum size: `800x800`
  Preferred size: `1200x1200`

- Project screenshots
  Directory: `public/assets/projects/<project-slug>/`
  Recommended files:
  `cover.png`
  `screen-01.png`
  `screen-02.png`
  `mobile-01.png` if needed

- Brand/logo files
  Directory: `public/assets/brand/`
  Recommended files:
  `logo-mark.svg`
  `logo-wordmark.svg`
  `logo-full.svg`
  `favicon-source.svg`

- Custom SVGs
  Directory: `public/assets/icons/`
  Use for future section graphics, custom icons, or lightweight decorative SVGs

- Resume file
  Path: `public/resume/joshua-mark-castillo-resume.pdf`

## Recommended Next Step

- Add your real profile image to `public/assets/profile/`
- Add screenshot folders under `public/assets/projects/`
- Add brand/logo SVGs later under `public/assets/brand/`
- Keep updating only `src/features/portfolio/data/portfolio-content.ts` for centralized content changes
