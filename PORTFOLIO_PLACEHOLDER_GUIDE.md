# Portfolio Placeholder Guide

Primary edit file:
- `src/features/portfolio/data/portfolio-content.ts`

Primary asset paths:
- `public/resume/joshua-mark-castillo-resume.pdf`
- `public/profile-placeholder.png` or your final profile image path

## Site Identity

- `siteConfig.name`
  Current value: `Joshua Mark Castillo`
  Replace if needed with your final public developer name.
- `siteConfig.role`
  Current value: `Jr. Full Stack Developer`
  Replace if your preferred title changes.
- `siteConfig.location`
  Current value: `[ Replace with real info: Work location or preferred setup ]`
- `siteConfig.email`
  Current value: `[ Replace with real info: Professional email address ]`

## Hero / Landing

- `siteConfig.tagline`
  Current value: `Building scalable web applications for innovation and process automation.`
  Replace if you want a different headline.
- `siteConfig.shortBio`
  Current value: `[ Replace with real info: Short professional introduction for the landing page ]`
- `heroStats[0].value`
  Current value: `[ Replace with real info: Core specialization ]`
- `heroStats[1].value`
  Current value: `[ Replace with real info: Preferred delivery style ]`
- `heroStats[2].value`
  Current value: `[ Replace with real info: Primary stack summary ]`

## About

- `siteConfig.longBio`
  Current value: `[ Replace with real info: Longer developer bio for the About section snapshot ]`
- `siteConfig.availability`
  Current value: `[ Replace with real info: Current availability status for work, freelance, or collaboration ]`
- `aboutContent.techJourney`
  Current value: `I chose Full Stack Development to eliminate tiring processes and become one of the stepping stones to full automations.`
  Replace only if you want different wording.
- `aboutContent.softSkills`
  Current values:
  `Team Communication`
  `Project Collaboration`
  `Critical Problem Solving`
  `Proper Escalation`
  `Technical Documentation`
- `aboutContent.hobbies`
  Current values:
  `Game Development`
  `Fantasy Genre Animes Streaming`
- `aboutContent.profilePlaceholder.caption`
  Current value: `[ Replace with real info: Profile photo image ]`

## Skills

- `skillGroups`
  Current skills are already filled with your requested stack.
  Replace only if you want to change or expand categories and technologies.

## Projects

- `featuredProjects[0].title`
  Current value: `[ Replace with real info: Project title ]`
- `featuredProjects[0].summary`
  Current value: `[ Replace with real info: Project summary ]`
- `featuredProjects[0].description`
  Current value: `[ Replace with real info: Project description ]`
- `featuredProjects[0].techStack`
  Current values:
  `[ Replace with real info: Project tech stack item 1 ]`
  `[ Replace with real info: Project tech stack item 2 ]`
  `[ Replace with real info: Project tech stack item 3 ]`
- `featuredProjects[0].screenshotPlaceholder.caption`
  Current value: `[ Replace with real info: Project screenshot set or preview image ]`
- `featuredProjects[0].repoUrl`
  Current value: `https://github.com/your-github-username/your-project-repo`
- `featuredProjects[0].liveUrl`
  Current value: `https://your-live-project-url.example`
- `featuredProjects[0].imageHint`
  Current value: `[ Replace with real info: Screenshot style hint ]`
- `featuredProjects[0].githubRepo`
  Current value: `your-project-repo`
- `featuredProjects[0].highlights`
  Current values:
  `[ Replace with real info: Project highlight #1 ]`
  `[ Replace with real info: Project highlight #2 ]`
  `[ Replace with real info: Project highlight #3 ]`

- `featuredProjects[1]`
  Replace the same fields as project 1.
- `featuredProjects[2]`
  Replace the same fields as project 1.

## Experience

- `experienceItems[0].company`
  Current value: `[ Replace with real info: Company name ]`
- `experienceItems[0].role`
  Current value: `[ Replace with real info: Job title ]`
- `experienceItems[0].duration`
  Current value: `[ Replace with real info: Employment duration ]`
- `experienceItems[0].location`
  Current value: `[ Replace with real info: Work setup or location ]`
- `experienceItems[0].summary`
  Current value: `[ Replace with real info: Short summary of your responsibilities or impact ]`
- `experienceItems[0].responsibilities`
  Current values:
  `[ Replace with real info: Responsibility or achievement #1 ]`
  `[ Replace with real info: Responsibility or achievement #2 ]`
  `[ Replace with real info: Responsibility or achievement #3 ]`

- `experienceItems[1]`
  Replace the same fields as experience item 1 if you want a second role listed.

## Education

- `educationItems[0].degree`
  Current value: `Computer Engineering`
- `educationItems[0].institution`
  Current value: `University of Rizal System Morong`
- `educationItems[0].duration`
  Current value: `[ Replace with real info: Education duration ]`
- `educationItems[0].summary`
  Current value: `[ Replace with real info: Education summary or focus area ]`
- `educationItems[0].details[0]`
  Current value: `Computer Engineering from University of Rizal System Morong`
- `educationItems[0].details[1]`
  Current value: `[ Replace with real info: Honors, thesis, capstone, or academic highlight ]`

## Contact

- `socialLinks[0].href`
  Current value: `https://github.com/your-github-username`
- `socialLinks[0].value`
  Current value: `[ Replace with real info: GitHub username ]`
- `socialLinks[1].href`
  Current value: `https://www.linkedin.com/in/your-linkedin-slug`
- `socialLinks[1].value`
  Current value: `[ Replace with real info: LinkedIn profile URL ]`
- `socialLinks[2].href`
  Current value: `mailto:your-email@example.com`
- `socialLinks[2].value`
  Current value: `[ Replace with real info: Professional email address ]`

- `contactLinks[0]`
  Label: `GitHub Link #1`
  Replace `href`, `value`, and `helperText`.
- `contactLinks[1]`
  Label: `Email`
  Replace `href`, `value`, and `helperText`.
- `contactLinks[2]`
  Label: `Indeed`
  Replace `href`, `value`, and `helperText`.
- `contactLinks[3]`
  Label: `Resume`
  Replace `value` and `helperText` if desired.

## Footer

- Footer branding uses `siteConfig.name`
  Current value: `Joshua Mark Castillo`

## Assets

- Resume file
  Replace `public/resume/joshua-mark-castillo-resume.pdf` with your final resume PDF.
- Profile photo
  Add your real image file and update the About section to use it when ready.
- Project screenshots
  Add real screenshots for each project and replace the current screenshot placeholder text.

## Recommended Next Step

- Start by updating `siteConfig`, `socialLinks`, and `contactLinks`.
- Then fill `featuredProjects`.
- Then finish `experienceItems` and `educationItems`.
- Finally replace the resume PDF and add your profile photo/screenshots.
